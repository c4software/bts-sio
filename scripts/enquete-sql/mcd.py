#!/usr/bin/env python3
"""Génère le MCD (Merise) du TP Enquête SQL : tp/php/sql/res/enquete_schema.svg"""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "tp", "php", "sql", "res", "enquete_schema.svg")
W, LH, HH = 220, 17, 26
COL = {"id": "#3b5bdb", "sport": "#e8590c", "ev": "#7048e8", "enq": "#2f9e44", "sol": "#868e96"}
E = {
 "PERSONNE": (390, 250, "id", ["id", "nom", "numero_rue", "nom_rue", "nir"], "id", "personne"),
 "PERMIS DE CONDUIRE": (40, 40, "id", ["id", "age", "taille", "couleur_yeux", "couleur_cheveux", "genre", "immatriculation", "marque_voiture", "modele_voiture"], "id", "permis_conduire"),
 "REVENU": (760, 40, "id", ["nir", "revenu_annuel"], "nir", "revenu"),
 "MEMBRE DE LA SALLE": (40, 330, "sport", ["id", "nom", "date_debut_abonnement", "statut_abonnement"], "id", "salle_sport_membre"),
 "PASSAGE À LA SALLE": (40, 560, "sport", ["date_passage", "heure_entree", "heure_sortie"], None, "salle_sport_passage"),
 "ÉVÉNEMENT": (760, 330, "ev", ["evenement_id", "nom_evenement"], "evenement_id", "evenement_participation"),
 "INTERROGATOIRE": (390, 560, "enq", ["transcription"], None, "interrogatoire"),
 "RAPPORT DE POLICE": (40, 740, "enq", ["date", "type", "description", "ville"], None, "rapport_police"),
 "SOLUTION": (760, 740, "sol", ["utilisateur", "valeur"], None, "solution"),
}
def H(a): return HH + LH * len(a) + 24
def box(name, x, y, g, attrs, ident, table):
    h = H(attrs); c = COL[g]
    s = f'<rect x="{x+3}" y="{y+3}" width="{W}" height="{h}" rx="4" fill="#000" opacity="0.08"/>'
    s += f'<rect x="{x}" y="{y}" width="{W}" height="{h}" rx="4" fill="#fff" stroke="{c}" stroke-width="1.5"/>'
    s += f'<rect x="{x}" y="{y}" width="{W}" height="{HH}" rx="4" fill="{c}"/><rect x="{x}" y="{y+HH-4}" width="{W}" height="4" fill="{c}"/>'
    s += f'<text x="{x+W/2}" y="{y+18}" class="tn">{name}</text>'
    for i, a in enumerate(attrs):
        yy = y + HH + 15 + LH * i
        s += f'<text x="{x+14}" y="{yy}" class="{"pk" if a == ident else "c"}">{a}</text>'
        if a == ident:
            s += f'<line x1="{x+14}" y1="{yy+2}" x2="{x+14+len(a)*6.6}" y2="{yy+2}" stroke="#212529" stroke-width="1"/>'
    s += f'<text x="{x+W/2}" y="{y+h-8}" class="tbl">table : {table}</text>'
    return s
def edge(e, side, frac=0.5):
    x, y, g, a, i, t = E[e]; h = H(a)
    return {"l": (x, y + h * frac), "r": (x + W, y + h * frac), "t": (x + W * frac, y), "b": (x + W * frac, y + h)}[side]
A = ""
def assoc(name, a, sa, ca, b, sb, cb, elbow_x=None, elbow_y=None, attr=None, fa=0.5, fb=0.5):
    global A
    pa = edge(a, sa, fa); pb = edge(b, sb, fb)
    if elbow_x is not None:
        pts = [pa, (elbow_x, pa[1]), (elbow_x, pb[1]), pb]; mid = (elbow_x, (pa[1] + pb[1]) / 2)
    elif elbow_y is not None:
        pts = [pa, (pa[0], elbow_y), (pb[0], elbow_y), pb]; mid = ((pa[0] + pb[0]) / 2, elbow_y)
    else:
        pts = [pa, pb]; mid = ((pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2)
    A += f'<polyline points="{" ".join(f"{x},{y}" for x, y in pts)}" class="l"/>'
    rx, ry = (62, 22) if not attr else (66, 30)
    A += f'<ellipse cx="{mid[0]}" cy="{mid[1]}" rx="{rx}" ry="{ry}" fill="#fff" stroke="#495057" stroke-width="1.4"/>'
    A += f'<text x="{mid[0]}" y="{mid[1]+(4 if not attr else -3)}" class="an">{name}</text>'
    if attr:
        A += f'<text x="{mid[0]}" y="{mid[1]+13}" class="aa">{attr}</text>'
    def lab(p, side, c):
        dx = {"l": -6, "r": 6, "t": 8, "b": 8}[side]; dy = {"l": -6, "r": -6, "t": -6, "b": 14}[side]
        anch = {"l": "end", "r": "start", "t": "start", "b": "start"}[side]
        return f'<text x="{p[0]+dx}" y="{p[1]+dy}" class="card" text-anchor="{anch}">{c}</text>'
    A += lab(pa, sa, ca) + lab(pb, sb, cb)
assoc("Posséder", "PERSONNE", "l", "0,1", "PERMIS DE CONDUIRE", "r", "1,1", elbow_x=325, fa=0.3)
assoc("Percevoir", "PERSONNE", "t", "0,1", "REVENU", "l", "1,1", elbow_y=150, fa=0.5)
assoc("Être inscrit", "MEMBRE DE LA SALLE", "r", "1,1", "PERSONNE", "l", "0,1", fb=0.75)
assoc("Participer", "PERSONNE", "r", "0,n", "ÉVÉNEMENT", "l", "0,n", attr="date")
assoc("Effectuer", "PASSAGE À LA SALLE", "t", "1,1", "MEMBRE DE LA SALLE", "b", "0,n")
assoc("Déposer", "INTERROGATOIRE", "t", "1,1", "PERSONNE", "b", "0,n")
LEG = [("id", "Identité et véhicule", 30), ("sport", "Salle de sport « Forme Express »", 200), ("ev", "Événements", 400), ("enq", "L'enquête : rapports et dépositions", 530), ("sol", "Validation", 800)]
legend = "".join(f'<rect x="{x}" y="10" width="12" height="12" rx="3" fill="{COL[g]}"/><text x="{x+18}" y="21" class="lg">{t}</text>' for g, t, x in LEG)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1020 890" font-family="system-ui, sans-serif" font-size="12">
<style>
.tn{{fill:#fff;font-weight:700;text-anchor:middle;font-size:13px}} .c{{fill:#343a40}} .pk{{fill:#212529;font-weight:700}}
.tbl{{fill:#868e96;font-size:10px;font-family:ui-monospace,monospace;text-anchor:middle}} .l{{fill:none;stroke:#495057;stroke-width:1.6}}
.an{{fill:#212529;font-weight:700;text-anchor:middle;font-size:12px}} .aa{{fill:#495057;font-style:italic;text-anchor:middle;font-size:11px}}
.card{{fill:#c92a2a;font-size:11px;font-weight:700;paint-order:stroke;stroke:#f8f9fa;stroke-width:4px}}
.lg{{fill:#495057;font-size:11px}} .sep{{stroke:#adb5bd;stroke-dasharray:6 5}} .note{{fill:#868e96;font-size:11px;font-style:italic}}
</style>
<rect width="1020" height="890" rx="12" fill="#f8f9fa"/>
{legend}
{A}
{"".join(box(n, *v) for n, v in E.items())}
<line x1="30" y1="710" x2="990" y2="710" class="sep"/>
<text x="510" y="728" text-anchor="middle" class="note">Deux entités isolées : le rapport de police se lit seul, la solution sert à accuser quelqu'un.</text>
<text x="510" y="880" text-anchor="middle" class="note">MCD (Merise) : entités en rectangle, identifiant souligné, associations en ovale avec leurs cardinalités. Sous chaque entité, la table SQL correspondante.</text>
</svg>'''
open(OUT, "w").write(svg)
print("MCD écrit :", OUT)
