#!/usr/bin/env python3
"""Convertit les fichiers .gift du dossier en versions imprimables et en ligne.

Usage : python3 gift2md.py
Pour chaque <nom>.gift, génère :
  - print/<nom>.md            : sujet imprimable + corrigé (saut de page)
  - ../public/quiz/<nom>.gift : copie servie au composant VitePress <QuizGift>
Ainsi que ../public/quiz/index.json : la liste des quiz disponibles
(utilisée par le sélecteur de la page /moodle/).

Note : le .gift publié contient les réponses (nécessaire pour la correction
côté client). Ces quiz en ligne sont des outils d'entraînement, pas d'évaluation.
"""

import hashlib
import json
import re
import shutil
from pathlib import Path

# Les caractères spéciaux GIFT échappés sont remplacés par des sentinelles
# le temps du découpage, puis restaurés dans le texte final.
ESCAPES = {"\\=": "\x00", "\\:": "\x01", "\\{": "\x02", "\\}": "\x03",
           "\\~": "\x04", "\\#": "\x05", "\\;": "\x06"}


def protect(text):
    for k, v in ESCAPES.items():
        text = text.replace(k, v)
    return text


def restore(text):
    for k, v in ESCAPES.items():
        text = text.replace(v, k[1])
    return text.strip()


def md(text):
    """Restaure puis échappe les chevrons pour que <?php survive au rendu HTML."""
    return restore(text).replace("<", "&lt;").replace(">", "&gt;")


def shuffle(items, seed):
    """Mélange déterministe (même sujet imprimé à chaque génération)."""
    key = lambda pair: hashlib.md5(f"{seed}|{pair[0]}".encode()).hexdigest()
    return [item for _, item in sorted(enumerate(items), key=key)]


def strip_feedback(answer):
    parts = answer.split("#")
    return parts[0].strip(), (parts[1].strip() if len(parts) > 1 else "")


def parse_question(chunk):
    m = re.match(r"::(.*?)::(.*)", chunk, re.S)
    title, body = (m.group(1), m.group(2)) if m else ("", chunk)
    m = re.match(r"(.*?)\{(.*)\}(.*)", body, re.S)
    if not m:
        return None
    return {"title": restore(title), "before": m.group(1).strip(),
            "answers": m.group(2).strip(), "after": m.group(3).strip()}


def parse_answers(raw):
    """Retourne (type, liste). Chaque entrée : (correct, texte, feedback)."""
    if raw.startswith("#"):
        text, fb = strip_feedback(raw[1:].strip())
        return "numerical", [(True, text, fb)]
    if re.match(r"^(TRUE|FALSE|T|F)\b", raw):
        m = re.match(r"^(TRUE|FALSE|T|F)(.*)", raw, re.S)
        correct = m.group(1) in ("TRUE", "T")
        fb = m.group(2).lstrip("#").split("#")[0].strip() if m.group(2) else ""
        return "truefalse", [(correct, "Vrai" if correct else "Faux", fb)]
    items, prefixes = [], []
    for m in re.finditer(r"[=~](%-?[\d.]+%)?([^=~]+)", raw, re.S):
        weight, text = m.group(1), m.group(2).strip()
        prefixes.append(raw[m.start()])
        text, fb = strip_feedback(text)
        correct = float(weight.strip("%")) > 0 if weight else raw[m.start()] == "="
        items.append(("multi" if weight else "single", correct, text, fb))
    entries = [(c, t, f) for _, c, t, f in items]
    if all(p == "=" for p in prefixes):
        if all("->" in t for _, t, _ in entries):
            return "matching", entries
        return "shortanswer", entries
    if any(i[0] == "multi" for i in items):
        return "multichoice-multi", entries
    return "multichoice", entries


def display_title(title):
    """Retire l'identifiant technique (PHP-L1-Q1) du titre."""
    parts = title.split(" ", 1)
    return parts[1] if len(parts) > 1 else title


def render(qnum, q):
    """Rend une question en Markdown : (sujet, ligne de corrigé)."""
    qtype, entries = parse_answers(q["answers"])
    text, after = md(q["before"]), md(q["after"])
    subject = [f"**Question {qnum} — {display_title(q['title'])}**", ""]
    letters = "abcdefgh"

    if qtype == "matching":
        subject += [text, ""]
        lefts = [md(t.split("->", 1)[0]) for _, t, _ in entries]
        rights = [md(t.split("->", 1)[1]) for _, t, _ in entries]
        subject.append("| | À relier à… |")
        subject.append("|---|---|")
        for l, r in zip(lefts, shuffle(rights, q["title"])):
            subject.append(f"| {l} → ______ | • {r} |")
        answer_key = " ; ".join(f"{l} → {r}" for l, r in zip(lefts, rights))
    elif qtype in ("shortanswer", "numerical"):
        subject.append(f"{text} ______ {after}" if after else text)
        subject += ["", "Réponse : " + "_" * 40]
        accepted = [md(t) for _, t, _ in entries]
        answer_key = accepted[0] + (
            f" (accepté aussi : {', '.join(accepted[1:])})" if len(accepted) > 1 else "")
        if entries[0][2]:
            answer_key += f" — *{md(entries[0][2])}*"
    elif qtype == "truefalse":
        subject += [text, "", "☐ Vrai  ☐ Faux"]
        answer_key = "Vrai" if entries[0][0] else "Faux"
        if entries[0][2]:
            answer_key += f" — *{md(entries[0][2])}*"
    elif after:  # mot manquant
        subject += [f"{text} ______ {after}", ""]
        opts = [(letters[i], c, md(t))
                for i, (c, t, _) in enumerate(shuffle(entries, q["title"]))]
        subject.append(" / ".join(f"({l}) {t}" for l, _, t in opts))
        answer_key = " ; ".join(f"({l}) {t}" for l, c, t in opts if c)
    else:
        subject.append(text)
        if qtype == "multichoice-multi":
            subject += ["", "*Plusieurs réponses possibles.*"]
        subject.append("")
        keys, fbs = [], []
        for i, (correct, t, fb) in enumerate(shuffle(entries, q["title"])):
            subject.append(f"- ☐ **{letters[i]}.** {md(t)}")
            if correct:
                keys.append(f"({letters[i]}) {md(t)}")
                if fb:
                    fbs.append(md(fb))
        answer_key = " ; ".join(keys)
        if fbs:
            answer_key += f" — *{' / '.join(fbs)}*"
    subject.append("")
    return "\n".join(subject), answer_key


def convert(path, printdir, webdir):
    raw = protect(path.read_text(encoding="utf-8"))
    lines = [l for l in raw.splitlines() if not l.strip().startswith("$CATEGORY")]
    title = next((l[2:].strip() for l in lines if l.startswith("// Questionnaire")),
                 path.stem)
    title = title.removeprefix("Questionnaire ").strip()
    lines = [l for l in lines if not l.strip().startswith("//")]
    chunks = [c.strip() for c in re.split(r"\n\s*\n", "\n".join(lines)) if c.strip()]
    questions = [q for q in (parse_question(c) for c in chunks) if q]

    subject_parts = [f"# {title}", "",
                     "Nom : ______________________  Prénom : ______________________", ""]
    key_parts = ['<div style="page-break-before: always;"></div>', "", "## Corrigé", ""]
    for qnum, q in enumerate(questions, 1):
        subject, key = render(qnum, q)
        subject_parts.append(subject)
        key_parts += [f"**{qnum}.** {key}", ""]
    (printdir / (path.stem + ".md")).write_text(
        "\n".join(subject_parts + [""] + key_parts), encoding="utf-8")

    shutil.copy(path, webdir / path.name)
    return title, len(questions)


if __name__ == "__main__":
    here = Path(__file__).parent
    printdir = here / "print"
    printdir.mkdir(exist_ok=True)
    webdir = here.parent / "public" / "quiz"
    webdir.mkdir(parents=True, exist_ok=True)
    manifest = []
    for gift in sorted(here.glob("*.gift")):
        title, n = convert(gift, printdir, webdir)
        manifest.append({"src": gift.stem, "title": title, "questions": n})
        print(f"{gift.name} : {n} questions -> print/ + public/quiz/")
    (webdir / "index.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"index.json : {len(manifest)} quiz référencés")
