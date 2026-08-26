#!/usr/bin/env python3
"""
Moteur du TP « Enquête PHP » (déclinaison algorithmique de l'Enquête SQL du repo).

Usage : python3 scripts/enquete-algo/generate.py [--force] [histoire.toml ...]
        (sans argument : toutes les histoires de scripts/enquete-algo/histoires/)
Un fichier de données déjà présent n'est JAMAIS régénéré sans --force : les histoires publiées
restent stables (les indices du TP en dépendent). Ce script n'est pas appelé par le build du site.
Sortie : public/enquete-algo/<id>.php + index.json + solutions/<id>.md + corriges.json

Une histoire = un fichier TOML (voir README.md pour le format et la procédure). Le moteur :
  1. construit un monde aléatoire réduit (500 habitants, véhicules, témoignages, passages) ;
  2. y injecte les personnages de l'histoire, avec leurs traits (indices) ;
  3. ajoute, pour chaque indice, un leurre qui coche tout SAUF cet indice (chaque indice est donc nécessaire) ;
  4. rédige les textes (rapport, témoignages) à partir de gabarits de phrases ;
  5. vérifie en Python (les mêmes filtres que ceux attendus en PHP) que chaque personnage est unique ;
  6. écrit le fichier PHP des données, en saveur « procedural » (tableaux) ou « poo » (objets).
Le résultat est déterministe (seed du TOML).
"""
import hashlib
import json
import os
import random
import re
import sys
import tomllib

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "public", "enquete-algo")

# ---------------------------------------------------------------- données de base

PRENOMS = """Adam Adèle Adrien Agathe Alain Albert Alexandre Alice Aline Amandine Ambre Amélie Anaïs André Anne
Annie Antoine Arnaud Arthur Aurélie Axel Baptiste Bastien Benjamin Benoît Bernard Bertrand Brigitte Bruno Camille
Capucine Carole Caroline Catherine Cécile Céline Charles Charlotte Chloé Christian Christine Christophe Claire Claude
Clément Colette Constance Corinne Cyril Damien Daniel David Delphine Denis Didier Dominique Dorian Édith Édouard Élise
Élodie Émile Emma Emmanuel Éric Estelle Étienne Eva Fabien Fabrice Fanny Florence Florian François Françoise Frédéric
Gabriel Gaëlle Gaston Geneviève Georges Gérard Gilles Guillaume Hélène Henri Hervé Hugo Inès Isabelle Jacques Jade
Jean Jeanne Jérôme Joël Joséphine Jules Julie Julien Juliette Justine Karim Karine Laura Laure Laurent Léa Léon
Léonie Lise Louis Louise Luc Lucie Ludovic Madeleine Maëlle Manon Marc Marcel Margaux Marie Marine Marion Martine
Mathieu Mathilde Maxime Mélanie Michel Michèle Mickaël Monique Morgane Nadia Nathalie Nathan Nicole Noémie Olivier
Océane Pascal Patrick Paul Pauline Philippe Pierre Quentin Raphaël Rémi Renaud René Robert Roger Romain Rose Sabine
Samuel Sandrine Sarah Sébastien Serge Simon Solène Sophie Stéphane Stéphanie Sylvain Sylvie Théo Thierry Thomas
Timothée Tom Valentin Valérie Véronique Victor Vincent Virginie Xavier Yann Yasmine Yves Zoé""".split()

NOMS = """Martin Bernard Thomas Petit Robert Richard Durand Dubois Moreau Laurent Simon Michel Lefebvre Leroy Roux
David Bertrand Morel Fournier Girard Bonnet Dupont Lambert Fontaine Rousseau Vincent Muller Lefevre Faure Andre
Mercier Blanc Guerin Boyer Garnier Chevalier Francois Legrand Gauthier Garcia Perrin Robin Clement Morin Nicolas
Henry Roussel Mathieu Gautier Masson Marchand Duval Denis Dumont Marie Lemaire Noel Meyer Dufour Meunier Brun
Blanchard Giraud Joly Riviere Lucas Brunet Gaillard Barbier Arnaud Martinez Gerard Roche Renard Schmitt Roy Leroux
Colin Vidal Caron Picard Roger Fabre Aubert Lemoine Renaud Dumas Lacroix Olivier Philippe Bourgeois Pierre Benoit
Rey Leclerc Payet Rolland Leclercq Guillaume Lecomte Lopez Jean Dupuy Guillot Hubert Berger Carpentier Sanchez
Dupuis Moulin Louis Deschamps Huet Vasseur Perez Boucher Fleury Royer Klein Jacquet Adam Paris Poirier Marty Aubry
Guyot Carre Charles Renault Charpentier Menard Maillard Baron Bertin Bailly Herve Schneider Fernandez Le_Gall Collet
Leger Bouvier Julien Prevost Millet Perrot Daniel Le_Roux Cousin Germain Breton Besson Langlois Remy Le_Goff Pelletier
Leveque Perrier Leblanc Barre Lebrun Marchal Weber Mallet Hamon Boulanger Jacob Monnier Michaud Chapuis Prieur Boivin
Chauvin Lopes Ferreira Da_Silva Tessier Delaunay Bazin Rocher Guichard Humbert Delmas Pasquier Vallet Gay Cordier""".replace("_", " ").split()

RUES_PREFIX = ["Rue", "Rue", "Rue", "Avenue", "Boulevard", "Allée", "Impasse", "Chemin", "Place"]
RUES_SUFFIX = ["de la Paix", "des Lilas", "Victor-Hugo", "Pasteur", "Voltaire", "de la Gare", "de l'Église",
               "des Écoles", "du Moulin", "des Tilleuls", "Jean-Jaurès", "Gambetta", "de la République", "du Stade",
               "des Roses", "du Château", "Émile-Zola", "des Peupliers", "de Verdun", "du Général-de-Gaulle",
               "Saint-Michel", "du Port", "des Acacias", "de la Fontaine", "du Parc", "Molière"]

TRANSCRIPTIONS = [
    "Je n'ai rien vu, j'étais en train de regarder mon téléphone.",
    "Je ne comprends pas pourquoi vous me posez la question, je dormais.",
    "J'ai entendu du bruit mais j'ai cru que c'était les voisins qui déménageaient.",
    "Je ne dirai rien sans mon avocat.",
    "Je jure que ce n'est pas moi, demandez à ma mère.",
    "Il faisait sombre, je crois que la personne portait une capuche.",
    "Je ne me souviens plus de cette soirée, c'était il y a longtemps.",
    "Je ne connais personne dans ce quartier, je ne fais qu'y travailler.",
    "J'ai vu quelqu'un courir mais je n'ai pas pu voir son visage.",
    "Vous devriez plutôt interroger le boulanger, il sait tout sur tout le monde.",
    "J'étais au cinéma, j'ai encore mon ticket si vous voulez.",
    "Mon chien a aboyé vers deux heures du matin, c'est tout ce que je sais.",
    "Je me suis fait voler mon vélo la semaine dernière, vous n'avez rien fait.",
    "Franchement, je n'ai rien à déclarer.",
    "J'ai croisé une voiture grise qui roulait beaucoup trop vite.",
    "Si vous cherchez un coupable, ce n'est pas moi, je n'ai même pas le permis.",
    "Je suis nouveau dans la ville, je ne connais pas encore les gens.",
    "Vous savez, moi, les histoires des autres, ça ne m'intéresse pas.",
    "J'ai vu de la lumière chez le voisin, ce qui est rare à cette heure-là.",
    "Je travaillais de nuit, je peux vous montrer ma fiche de paie.",
    "C'est la troisième fois que vous m'interrogez, je commence à me vexer.",
    "Je n'étais pas là, j'étais à un mariage à Bordeaux.",
    "Il y avait beaucoup de monde, impossible de reconnaître qui que ce soit.",
    "Je préfère ne pas me mêler de ça.",
    "Tout ce que je sais, c'est ce que j'ai lu dans le journal.",
    "Je n'ai pas de commentaire, mais bon courage pour votre enquête.",
    "J'ai peut-être vu quelque chose, mais je ne suis sûr de rien.",
    "Ma voisine m'a dit que c'était un homme avec un chapeau, mais elle invente souvent.",
]

LIEUX = ["Gymnase municipal", "Médiathèque Jean-Moulin", "Piscine des Lilas", "Marché couvert",
         "Théâtre de la Passerelle", "Cinéma Le Central", "Musée des Beaux-Arts", "Salle des fêtes",
         "Stade Léo-Lagrange", "Patinoire d'Algoville"]

MARQUES = {
    "Peugeot": ["208", "308", "3008", "2008", "508"], "Renault": ["Clio", "Megane", "Captur", "Twingo", "Scenic"],
    "Citroën": ["C3", "C4", "Berlingo", "C5 Aircross"], "Tesla": ["Model S", "Model 3", "Model Y"],
    "Toyota": ["Yaris", "Corolla", "Aygo", "RAV4"], "Volkswagen": ["Golf", "Polo", "Tiguan", "Passat"],
    "BMW": ["Serie 1", "Serie 3", "X1"], "Mercedes": ["Classe A", "Classe C", "GLA"], "Audi": ["A1", "A3", "Q3"],
    "Ford": ["Fiesta", "Focus", "Puma"], "Fiat": ["500", "Panda", "Tipo"], "Dacia": ["Sandero", "Duster", "Logan"],
    "Kia": ["Picanto", "Sportage"], "Hyundai": ["i20", "Tucson"], "Opel": ["Corsa", "Astra"],
    "Skoda": ["Fabia", "Octavia"], "Nissan": ["Micra", "Qashqai"], "Mini": ["Cooper"], "Seat": ["Ibiza", "Leon"],
    "Honda": ["Jazz", "Civic"],
}
CHEVEUX = ["brun", "châtain", "blond", "noir", "roux", "gris", "blanc", "chauve"]
GENRES = ["homme", "femme"]
LETTRES = "ABCDEFGHJKLMNPQRSTUVWXYZ"
VILLE = "Algoville"

MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre",
        "novembre", "décembre"]

N_HABITANTS = 500

# ---------------------------------------------------------------- utilitaires

def date_fr(d):
    y, m, j = d // 10000, (d // 100) % 100, d % 100
    return f"{'1er' if j == 1 else j} {MOIS[m - 1]} {y}"


def mois_fr(m):
    return f"{MOIS[m % 100 - 1]} {m // 100}"


def heure_fr(h):
    hh, mm = divmod(h, 100)
    return f"{hh}h{mm:02d}" if mm else f"{hh}h"


def rand_date(rng, y1, y2):
    return rng.randint(y1, y2) * 10000 + rng.randint(1, 12) * 100 + rng.randint(1, 28)


def rand_plate(rng):
    return "".join(rng.choice(LETTRES) for _ in range(2)) + "".join(rng.choice("0123456789") for _ in range(3)) \
        + "".join(rng.choice(LETTRES) for _ in range(2))


def php_str(s):
    return '"' + str(s).replace("\\", "\\\\").replace('"', '\\"').replace("$", "\\$") + '"'


def sha(nom):
    return hashlib.sha256(nom.lower().encode()).hexdigest()


class ConfigError(Exception):
    pass


# ---------------------------------------------------------------- le monde

class World:
    """Monde réduit : 500 habitants « à plat », véhicules, témoignages et passages (registre d'entrées)."""

    def __init__(self, seed, annee):
        self.rng = random.Random(seed)
        rng = self.rng
        self.annee = annee
        self.habitants = {}
        self.vehicules = {}       # habitant_id -> {marque, modele, plaque}
        self.temoignages = {}     # habitant_id -> texte
        self.passages = []        # {habitant_id, lieu, date, heure}
        self.rues = sorted({f"{rng.choice(RUES_PREFIX)} {s}" for s in RUES_SUFFIX})
        self.noms_utilises = set()

        for i in range(N_HABITANTS):
            self.new_habitant()
        habitants = list(self.habitants.values())
        for h in rng.sample(habitants, int(N_HABITANTS * 0.6)):
            self.new_vehicule(h)
        for h in rng.sample(habitants, int(N_HABITANTS * 0.4)):
            self.temoignages[h["id"]] = rng.choice(TRANSCRIPTIONS)
        for _ in range(1500):
            self.add_passage(rng.choice(habitants)["id"], rand_date(rng, annee - 1, annee))

    # -- fabriques
    def new_nom(self, prenom=None):
        while True:
            n = f"{prenom or self.rng.choice(PRENOMS)} {self.rng.choice(NOMS)}"
            if n not in self.noms_utilises:
                self.noms_utilises.add(n)
                return n

    def new_habitant(self, nom=None):
        rng = self.rng
        hid = max(self.habitants, default=0) + 1
        if nom:
            self.noms_utilises.add(nom)
        d = {"id": hid, "nom": nom or self.new_nom(), "genre": rng.choice(GENRES),
             "age": rng.randint(18, 85), "taille": rng.randint(150, 200), "cheveux": rng.choice(CHEVEUX),
             "rue": rng.choice(self.rues), "numero": rng.randint(1, 80),
             "revenu": rng.choice([rng.randint(10, 60), rng.randint(15, 120), rng.randint(20, 400)]) * 1000}
        self.habitants[hid] = d
        return d

    def new_vehicule(self, h, marque=None, modele=None, plaque=None):
        rng = self.rng
        m = marque or rng.choice(list(MARQUES))
        self.vehicules[h["id"]] = {"habitant_id": h["id"], "marque": m,
                                   "modele": modele or rng.choice(MARQUES[m]), "plaque": plaque or rand_plate(rng)}
        return self.vehicules[h["id"]]

    def add_passage(self, hid, date, lieu=None, heure=None):
        rng = self.rng
        self.passages.append({"habitant_id": hid, "lieu": lieu or rng.choice(LIEUX), "date": date,
                              "heure": heure if heure is not None else
                              rng.randint(8, 21) * 100 + rng.choice([0, 15, 30, 45])})

    def melange_ids(self):
        """Renumérote les habitants au hasard : les personnages ajoutés ne sont plus repérables à leur id.
        RNG dédié pour ne pas modifier le tirage des indices."""
        rng = random.Random(4242)
        n = len(self.habitants)
        ids = rng.sample(range(1, n + 1), n)
        map_h = dict(zip(sorted(self.habitants), ids))
        self.habitants = {map_h[k]: {**v, "id": map_h[k]} for k, v in self.habitants.items()}
        self.vehicules = {map_h[k]: {**v, "habitant_id": map_h[k]} for k, v in self.vehicules.items()}
        self.temoignages = {map_h[k]: v for k, v in self.temoignages.items()}
        for p in self.passages:
            p["habitant_id"] = map_h[p["habitant_id"]]
        rng.shuffle(self.passages)


# ---------------------------------------------------------------- traits (indices)
#
# Chaque groupe de traits sait : compléter les valeurs "?" (draw), appliquer le trait à un habitant (apply,
# avec fail=<champ> pour un leurre), produire les phrases (text) et le prédicat Python de vérification (pred),
# équivalent des filtres attendus en PHP.

def draw_physique(rng, t):
    t = dict(t)
    if t.get("genre") == "?":
        t["genre"] = rng.choice(GENRES)
    if t.get("cheveux") == "?":
        t["cheveux"] = rng.choice(CHEVEUX[:5])
    if t.get("taille") == "?":
        base = rng.randint(155, 195)
        t["taille"] = [base, base + rng.choice([2, 3, 4])]
    if t.get("age") == "?":
        base = rng.randint(20, 70)
        t["age"] = [base, base + rng.choice([4, 5, 9])]
    return t


def apply_physique(w, h, t, fail=None):
    rng = w.rng
    if "genre" in t:
        h["genre"] = t["genre"]
    if "cheveux" in t:
        h["cheveux"] = t["cheveux"]
    if "taille" in t:
        h["taille"] = rng.randint(*t["taille"])
    if "age" in t:
        h["age"] = rng.randint(*t["age"])
    if fail == "genre":
        h["genre"] = "femme" if t["genre"] == "homme" else "homme"
    elif fail == "cheveux":
        h["cheveux"] = rng.choice([c for c in CHEVEUX if c != t["cheveux"]])
    elif fail == "taille":
        h["taille"] = t["taille"][1] + rng.randint(3, 10)
    elif fail == "age":
        h["age"] = t["age"][1] + rng.randint(3, 10)


def text_physique(rng, t, ctx):
    frags = []
    pron = "Elle" if t.get("genre", ctx.get("genre")) == "femme" else "Il"
    if "genre" in t:
        frags.append(rng.choice(["C'était {g}.", "Il s'agissait d'{g}.", "J'ai bien vu {g}."]).format(
            g="une femme" if t["genre"] == "femme" else "un homme"))
    if "age" in t:
        frags.append(rng.choice(["{p} a entre {a} et {b} ans.", "{p} doit avoir dans les {a} à {b} ans."]).format(
            p=pron, a=t["age"][0], b=t["age"][1]))
    if "taille" in t:
        frags.append(rng.choice(["{p} mesure entre {a} et {b} cm.", "Sa taille : entre {a} et {b} cm, pas plus."]).format(
            p=pron, a=t["taille"][0], b=t["taille"][1]))
    if "cheveux" in t:
        c = t["cheveux"]
        frags.append(rng.choice(["{p} a les cheveux {c}.", "Je me souviens de ses cheveux : {c}."]).format(
            p=pron, c=c + "s" if c in ("brun", "blond", "noir", "gris", "blanc") else c))
    return " ".join(frags)


def pred_physique(t):
    def f(w, h):
        return (("genre" not in t or h["genre"] == t["genre"])
                and ("cheveux" not in t or h["cheveux"] == t["cheveux"])
                and ("taille" not in t or t["taille"][0] <= h["taille"] <= t["taille"][1])
                and ("age" not in t or t["age"][0] <= h["age"] <= t["age"][1]))
    return f


def draw_vehicule(rng, t):
    t = dict(t)
    if t.get("marque") == "?":
        t["marque"] = rng.choice(list(MARQUES))
    if t.get("modele") == "?":
        t["modele"] = rng.choice(MARQUES[t.get("marque") or rng.choice(list(MARQUES))])
    for k in ("plaque_debut", "plaque_fin", "plaque_contient"):
        if t.get(k) == "?":
            t[k] = rng.choice("0123456789") + rng.choice(LETTRES) + rng.choice("0123456789") + rng.choice(LETTRES)
    return t


def apply_vehicule(w, h, t, fail=None):
    rng = w.rng
    marque = t.get("marque")
    if "modele" in t and not marque:
        marque = next(m for m, mods in MARQUES.items() if t["modele"] in mods)
    plaque = rand_plate(rng)
    if "plaque_debut" in t:
        plaque = t["plaque_debut"] + plaque[len(t["plaque_debut"]):]
    if "plaque_fin" in t:
        plaque = plaque[:-len(t["plaque_fin"])] + t["plaque_fin"]
    if "plaque_contient" in t:
        frag = t["plaque_contient"]
        pos = rng.randint(0, len(plaque) - len(frag))
        plaque = plaque[:pos] + frag + plaque[pos + len(frag):]
    v = w.new_vehicule(h, marque=marque, modele=t.get("modele"), plaque=plaque)
    if fail == "marque":
        m = rng.choice([m for m in MARQUES if m != marque])
        v["marque"], v["modele"] = m, rng.choice(MARQUES[m])
    elif fail == "modele":
        others = [m for m in MARQUES[marque] if m != t["modele"]]
        if others:
            v["modele"] = rng.choice(others)
        else:
            m = rng.choice([m for m in MARQUES if m != marque])
            v["marque"], v["modele"] = m, rng.choice(MARQUES[m])
    elif fail in ("plaque_debut", "plaque_fin", "plaque_contient"):
        v["plaque"] = rand_plate(rng)


def text_vehicule(rng, t, ctx):
    voiture = "une voiture"
    if t.get("marque") and t.get("modele"):
        voiture = f"une {t['marque']} {t['modele']}"
    elif t.get("marque"):
        voiture = f"une {t['marque']}"
    elif t.get("modele"):
        marque = next(m for m, mods in MARQUES.items() if t["modele"] in mods)
        voiture = f"une {marque} {t['modele']}"
    s = rng.choice(["{s} est parti{e} dans {v}", "{s} conduit {v}", "{s} est monté{e} dans {v}"]).format(
        s="Elle" if ctx.get("genre") == "femme" else "Il", e="e" if ctx.get("genre") == "femme" else "", v=voiture)
    if "plaque_debut" in t:
        s += f" dont la plaque commençait par « {t['plaque_debut']} »"
    elif "plaque_fin" in t:
        s += f" dont la plaque se terminait par « {t['plaque_fin']} »"
    elif "plaque_contient" in t:
        s += f" dont la plaque contenait « {t['plaque_contient']} »"
    return s + "."


def pred_vehicule(t):
    def f(w, h):
        v = w.vehicules.get(h["id"])
        return (v is not None
                and (not t.get("marque") or v["marque"] == t["marque"])
                and (not t.get("modele") or v["modele"] == t["modele"])
                and ("plaque_debut" not in t or v["plaque"].startswith(t["plaque_debut"]))
                and ("plaque_fin" not in t or v["plaque"].endswith(t["plaque_fin"]))
                and ("plaque_contient" not in t or t["plaque_contient"] in v["plaque"]))
    return f


def draw_passage(rng, t, annee):
    t = dict(t)
    if t.get("lieu") == "?":
        t["lieu"] = rng.choice(LIEUX)
    if t.get("fois") == "?":
        t["fois"] = rng.randint(2, 3)
    if t.get("mois") == "?":
        t["mois"] = annee * 100 + rng.randint(1, 12)
    if t.get("date") == "?":
        t["date"] = rand_date(rng, annee, annee)
    if t.get("entre") == "?":
        heure = rng.randint(8, 20) * 100
        t["entre"], t["et"] = heure, heure + 100
    return t


def _dates_passage(rng, t, n):
    if "date" in t:
        return [t["date"]] * n
    if "mois" in t:
        return [t["mois"] * 100 + d for d in sorted(rng.sample(range(1, 29), n))]
    return [rand_date(rng, 2020, 2024) for _ in range(n)]


def apply_passage(w, h, t, fail=None):
    rng = w.rng
    n = t.get("fois", 1)
    dates = _dates_passage(rng, t, n)
    lieu = t["lieu"]
    if fail == "fois":
        dates = dates[:n - 1] if n > 1 else dates + [dates[0]]
    elif fail in ("mois", "date"):
        dates = [d + 100 if (d // 100) % 100 < 12 else d - 1100 for d in dates]
    elif fail == "lieu":
        lieu = rng.choice([x for x in LIEUX if x != t["lieu"]])
    for d in dates:
        heure = None
        if "entre" in t:
            heure = rng.randint(t["entre"] // 100, t["et"] // 100 - 1) * 100 + rng.choice([0, 15, 30, 45])
            if fail == "entre":
                heure = (t["et"] // 100 + rng.randint(1, 2)) * 100
        w.add_passage(h["id"], d, lieu=lieu, heure=heure)


def text_passage(rng, t, ctx):
    pron = "Elle" if ctx.get("genre") == "femme" else "Il"
    e = "e" if ctx.get("genre") == "femme" else ""
    n = t.get("fois", 1)
    fois = {1: "", 2: " deux fois", 3: " trois fois", 4: " quatre fois"}.get(n, f" {n} fois")
    s = rng.choice(["{p} est passé{e}{f} à « {l} »", "Je l'ai croisé{e}{f} à « {l} »",
                    "Son badge a été enregistré{f} à l'entrée de « {l} »"]).format(
        p=pron, e=e, f=fois, l=t["lieu"])
    if "date" in t:
        s += f" le {date_fr(t['date'])}"
    elif "mois" in t:
        s += f" en {mois_fr(t['mois'])}"
    if "entre" in t:
        s += f", entre {heure_fr(t['entre'])} et {heure_fr(t['et'])}"
    return s + "."


def pred_passage(t):
    def f(w, h):
        n = 0
        for p in w.passages:
            if (p["habitant_id"] == h["id"] and p["lieu"] == t["lieu"]
                    and ("date" not in t or p["date"] == t["date"])
                    and ("mois" not in t or p["date"] // 100 == t["mois"])
                    and ("entre" not in t or t["entre"] <= p["heure"] <= t["et"])):
                n += 1
        return n == t.get("fois", 1) if "fois" in t else n >= 1
    return f


def draw_revenu(rng, t):
    t = dict(t)
    if t.get("min") == "?":
        t["min"] = rng.choice([100, 150, 200, 250]) * 1000
    if t.get("max") == "?":
        t["max"] = rng.choice([15, 20, 25]) * 1000
    return t


def apply_revenu(w, h, t, fail=None):
    rng = w.rng
    lo, hi = t.get("min", 10000), t.get("max", 400000)
    h["revenu"] = rng.randint(lo // 1000 + 1, max(lo // 1000 + 2, hi // 1000 - 1)) * 1000
    if fail:
        h["revenu"] = (t["min"] - rng.randint(5, 50) * 1000) if "min" in t else (t["max"] + rng.randint(5, 50) * 1000)


def text_revenu(rng, t, ctx):
    pron = "Elle" if ctx.get("genre") == "femme" else "Il"
    if "min" in t:
        return rng.choice(["{p} gagne plus de {v} € par an.", "{p} a beaucoup d'argent : plus de {v} € par an."]).format(
            p=pron, v=f"{t['min']:,}".replace(",", " "))
    return rng.choice(["{p} gagne moins de {v} € par an.", "{p} n'est pas riche, moins de {v} € par an."]).format(
        p=pron, v=f"{t['max']:,}".replace(",", " "))


def pred_revenu(t):
    def f(w, h):
        return ("min" not in t or h["revenu"] > t["min"]) and ("max" not in t or h["revenu"] < t["max"])
    return f


def draw_adresse(rng, t):
    t = dict(t)
    if t.get("rue") == "?":
        t["rue"] = f"{rng.choice(RUES_PREFIX)} {rng.choice(RUES_SUFFIX)}"
    if t.get("numero") == "?":
        base = rng.randint(1, 40)
        t["numero"] = [base, base + rng.choice([10, 20])]
    return t


def apply_adresse(w, h, t, fail=None):
    rng = w.rng
    h["rue"] = t["rue"]
    if t["rue"] not in w.rues:
        w.rues.append(t["rue"])
    if "numero" in t:
        h["numero"] = rng.randint(*t["numero"])
    if fail == "numero":
        h["numero"] = t["numero"][1] + rng.randint(5, 40)
    elif fail == "rue":
        h["rue"] = rng.choice([r for r in w.rues if r != t["rue"]])


def text_adresse(rng, t, ctx):
    pron = "Elle" if ctx.get("genre") == "femme" else "Il"
    s = rng.choice(["{p} habite « {r} »", "Je sais qu'{pp} habite « {r} »"]).format(p=pron, pp=pron.lower(), r=t["rue"])
    if "numero" in t:
        s += f", à un numéro compris entre {t['numero'][0]} et {t['numero'][1]}"
    return s + "."


def pred_adresse(t):
    def f(w, h):
        return h["rue"] == t["rue"] and ("numero" not in t or t["numero"][0] <= h["numero"] <= t["numero"][1])
    return f


GROUPES = {
    "physique": (draw_physique, apply_physique, text_physique, pred_physique),
    "vehicule": (draw_vehicule, apply_vehicule, text_vehicule, pred_vehicule),
    "passage": (None, apply_passage, text_passage, pred_passage),  # draw_passage a besoin de l'année
    "revenu": (draw_revenu, apply_revenu, text_revenu, pred_revenu),
    "adresse": (draw_adresse, apply_adresse, text_adresse, pred_adresse),
}


def draw_groupe(rng, g, t, annee):
    if g == "passage":
        return draw_passage(rng, t, annee)
    return GROUPES[g][0](rng, t)


# ---------------------------------------------------------------- repérage (comment on trouve un témoin)
#
# position = "dernier" | "premier" : numéro max/min de la rue
# prenom = true (+ numero = [a, b]) : prénom unique sur la rue
# revenu = "max" | "min"           : revenu extrême de la rue


def apply_reperage(w, h, r):
    rng = w.rng
    rue = r["rue"]
    if rue not in w.rues:
        w.rues.append(rue)
    voisins = [x for x in w.habitants.values() if x["rue"] == rue and x["id"] != h["id"]]
    if len(voisins) < 8:  # on peuple un peu la rue
        for _ in range(8 - len(voisins)):
            v = w.new_habitant()
            v["rue"] = rue
            v["numero"] = rng.randint(1, 60)
            voisins.append(v)
    h["rue"] = rue
    if r.get("position") == "dernier":
        h["numero"] = max(v["numero"] for v in voisins) + rng.randint(2, 15)
    elif r.get("position") == "premier":
        h["numero"] = 1
        for v in voisins:
            v["numero"] = max(v["numero"], 2)
    elif "prenom" in r:
        prenom = h["nom"].split()[0]
        if "numero" in r:
            h["numero"] = rng.randint(*r["numero"])
            # homonymes hors intervalle
            for num in (r["numero"][0] - rng.randint(1, 10), r["numero"][1] + rng.randint(1, 15)):
                v = w.new_habitant(w.new_nom(prenom))
                v["rue"], v["numero"] = rue, max(1, num)
        for v in voisins:
            if v["nom"].split()[0] == prenom:
                v["rue"] = rng.choice([x for x in w.rues if x != rue])
        # un homonyme ailleurs en ville
        w.new_habitant(w.new_nom(prenom))
    elif r.get("revenu") in ("max", "min"):
        vals = [v["revenu"] for v in voisins]
        h["revenu"] = (max(vals) + rng.randint(5, 40) * 1000) if r["revenu"] == "max" \
            else max(1000, min(vals) - rng.randint(1, 5) * 1000)
    else:
        raise ConfigError(f"reperage inconnu : {r}")


def text_reperage(rng, h, r):
    rue = r["rue"]
    if r.get("position") == "dernier":
        return rng.choice(["habite la dernière maison de « {r} »", "vit au dernier numéro de « {r} »"]).format(r=rue)
    if r.get("position") == "premier":
        return rng.choice(["habite au plus petit numéro de « {r} »", "vit au tout premier numéro de « {r} »"]).format(r=rue)
    if "prenom" in r:
        s = f"se prénomme {h['nom'].split()[0]} et habite "
        if "numero" in r:
            s += f"« {rue} » à un numéro compris entre {r['numero'][0]} et {r['numero'][1]}"
        else:
            s += f"quelque part sur « {rue} »"
        return s
    if r.get("revenu") == "max":
        return f"est la personne au revenu le plus élevé de « {rue} »"
    return f"est la personne au revenu le plus faible de « {rue} »"


def reperage_resultat(w, r):
    """Rejoue le repérage sur les tableaux, comme le fera l'étudiant en PHP. Retourne les noms trouvés."""
    dans_rue = [h for h in w.habitants.values() if h["rue"] == r["rue"]]
    if r.get("position") == "dernier":
        m = max(h["numero"] for h in dans_rue)
        return [h["nom"] for h in dans_rue if h["numero"] == m]
    if r.get("position") == "premier":
        m = min(h["numero"] for h in dans_rue)
        return [h["nom"] for h in dans_rue if h["numero"] == m]
    if "prenom" in r:
        res = [h for h in dans_rue if h["nom"].split()[0] == r["prenom"]]
        if "numero" in r:
            res = [h for h in res if r["numero"][0] <= h["numero"] <= r["numero"][1]]
        return [h["nom"] for h in res]
    m = max(h["revenu"] for h in dans_rue) if r["revenu"] == "max" else min(h["revenu"] for h in dans_rue)
    return [h["nom"] for h in dans_rue if h["revenu"] == m]


def traits_resultat(w, traits):
    """Applique la conjonction des prédicats des groupes révélés, comme le fera l'étudiant en PHP."""
    preds = [GROUPES[g][3](t) for g, t in traits.items()]
    return [h["nom"] for h in w.habitants.values() if all(p(w, h) for p in preds)]


# ---------------------------------------------------------------- code PHP des solutions
#
# Les corrigés sont GÉNÉRÉS (jamais écrits à la main) : un bloc PHP par étape, en deux styles
# (procédural : boucles sur les tableaux ; POO : objets, méthodes de Ville, ou critères selon le niveau).

def php_cond_habitant(t_par_groupe, var="$h", poo=False):
    """Conditions directes sur un habitant (physique, adresse, revenu)."""
    acc = (lambda k: f"{var}->{k}") if poo else (lambda k: f'{var}["{k}"]')
    c = []
    for g, t in t_par_groupe.items():
        if g == "physique":
            if "genre" in t:
                c.append(f'{acc("genre")} === {php_str(t["genre"])}')
            if "cheveux" in t:
                c.append(f'{acc("cheveux")} === {php_str(t["cheveux"])}')
            if "taille" in t:
                c.append(f'{acc("taille")} >= {t["taille"][0]} && {acc("taille")} <= {t["taille"][1]}')
            if "age" in t:
                c.append(f'{acc("age")} >= {t["age"][0]} && {acc("age")} <= {t["age"][1]}')
        elif g == "adresse":
            c.append(f'{acc("rue")} === {php_str(t["rue"])}')
            if "numero" in t:
                c.append(f'{acc("numero")} >= {t["numero"][0]} && {acc("numero")} <= {t["numero"][1]}')
        elif g == "revenu":
            if "min" in t:
                c.append(f'{acc("revenu")} > {t["min"]}')
            if "max" in t:
                c.append(f'{acc("revenu")} < {t["max"]}')
    return c


def php_cond_vehicule(t, var="$v", poo=False):
    acc = (lambda k: f"{var}->{k}") if poo else (lambda k: f'{var}["{k}"]')
    c = []
    if t.get("marque"):
        c.append(f'{acc("marque")} === {php_str(t["marque"])}')
    if t.get("modele"):
        c.append(f'{acc("modele")} === {php_str(t["modele"])}')
    if "plaque_debut" in t:
        c.append(f'str_starts_with({acc("plaque")}, {php_str(t["plaque_debut"])})')
    if "plaque_fin" in t:
        c.append(f'str_ends_with({acc("plaque")}, {php_str(t["plaque_fin"])})')
    if "plaque_contient" in t:
        c.append(f'str_contains({acc("plaque")}, {php_str(t["plaque_contient"])})')
    return c


def php_cond_passage(t, var="$p", poo=False):
    acc = (lambda k: f"{var}->{k}") if poo else (lambda k: f'{var}["{k}"]')
    c = [f'{acc("lieu")} === {php_str(t["lieu"])}']
    if "date" in t:
        c.append(f'{acc("date")} === {t["date"]}')
    elif "mois" in t:
        c.append(f'intdiv({acc("date")}, 100) === {t["mois"]}')
    if "entre" in t:
        c.append(f'{acc("heure")} >= {t["entre"]} && {acc("heure")} <= {t["et"]}')
    return c


def _indent(lines, n=1):
    return ["    " * n + l if l else l for l in lines]


def php_reperage(r, mode):
    """Code PHP qui identifie un témoin, puis affiche son témoignage."""
    poo = mode == "poo"
    rue = php_str(r["rue"])
    it = "$ville->habitants()" if poo else "$habitants"
    acc = (lambda v, k: f"{v}->{k}") if poo else (lambda v, k: f'{v}["{k}"]')
    l = []
    if r.get("position") in ("dernier", "premier"):
        op, init = (">", "0") if r["position"] == "dernier" else ("<", "PHP_INT_MAX")
        l += ["$temoin = null;", f"$record = {init};",
              f"foreach ({it} as $h) {{",
              f'    if ({acc("$h", "rue")} === {rue} && {acc("$h", "numero")} {op} $record) {{',
              f'        $record = {acc("$h", "numero")};',
              "        $temoin = $h;",
              "    }", "}"]
    elif "prenom" in r:
        cond = [f'{acc("$h", "rue")} === {rue}',
                f'str_starts_with({acc("$h", "nom")}, {php_str(r["prenom"] + " ")})']
        if "numero" in r:
            cond.append(f'{acc("$h", "numero")} >= {r["numero"][0]} && {acc("$h", "numero")} <= {r["numero"][1]}')
        l += ["$temoin = null;", f"foreach ({it} as $h) {{",
              f"    if ({' && '.join(cond)}) {{", "        $temoin = $h;", "    }", "}"]
    else:
        op, init = (">", "0") if r["revenu"] == "max" else ("<", "PHP_INT_MAX")
        l += ["$temoin = null;", f"$record = {init};",
              f"foreach ({it} as $h) {{",
              f'    if ({acc("$h", "rue")} === {rue} && {acc("$h", "revenu")} {op} $record) {{',
              f'        $record = {acc("$h", "revenu")};',
              "        $temoin = $h;",
              "    }", "}"]
    l.append(f'echo {acc("$temoin", "nom")} . "\\n";')
    if poo:
        l.append('echo $ville->temoignageDe($temoin) . "\\n";')
    else:
        l += ["foreach ($temoignages as $t) {",
              '    if ($t["habitant_id"] === $temoin["id"]) {',
              '        echo $t["texte"] . "\\n";',
              "    }", "}"]
    return "\n".join(l)


def php_traits_procedural(traits):
    directs = {g: t for g, t in traits.items() if g in ("physique", "adresse", "revenu")}
    l = []
    if "passage" in traits:
        l += ["$compteur = [];", "foreach ($passages as $p) {",
              f"    if ({' && '.join(php_cond_passage(traits['passage']))}) {{",
              '        $compteur[$p["habitant_id"]] = ($compteur[$p["habitant_id"]] ?? 0) + 1;',
              "    }", "}"]
    if "vehicule" in traits:
        l += ["$vehiculeDe = [];", "foreach ($vehicules as $v) {",
              '    $vehiculeDe[$v["habitant_id"]] = $v;', "}"]
    cond = php_cond_habitant(directs)
    if "passage" in traits:
        n = traits["passage"].get("fois", 1)
        cond.append(f'($compteur[$h["id"]] ?? 0) === {n}' if "fois" in traits["passage"]
                    else f'($compteur[$h["id"]] ?? 0) >= 1')
    if "vehicule" in traits:
        cond.append('isset($vehiculeDe[$h["id"]])')
        cond += php_cond_vehicule(traits["vehicule"], var='$vehiculeDe[$h["id"]]')
    l += ["foreach ($habitants as $h) {"]
    l += _indent(["if (" + ("\n    && ".join(cond) if len(cond) > 2 else " && ".join(cond)) + ") {",
                  '    echo $h["nom"] . "\\n";', "}"])
    l += ["}"]
    return "\n".join(l)


def php_traits_poo(traits, niveau, key):
    if niveau >= 3:
        return php_traits_criteres(traits, key)
    directs = {g: t for g, t in traits.items() if g in ("physique", "adresse", "revenu")}
    cond = php_cond_habitant(directs, poo=True)
    l = []
    corps = []
    if "vehicule" in traits:
        corps += ["$v = $ville->vehiculeDe($h);"]
        cond = ["$v !== null"] + cond + php_cond_vehicule(traits["vehicule"], poo=True)
    if "passage" in traits:
        t = traits["passage"]
        corps += ["$nb = 0;", "foreach ($ville->passagesDe($h) as $p) {",
                  f"    if ({' && '.join(php_cond_passage(t, poo=True))}) {{", "        $nb++;", "    }", "}"]
        n = t.get("fois", 1)
        cond.append(f"$nb === {n}" if "fois" in t else "$nb >= 1")
    boucle = ["foreach ($ville->habitants() as $h) {"] \
        + _indent(corps) \
        + _indent(["if (" + ("\n    && ".join(cond) if len(cond) > 2 else " && ".join(cond)) + ") {",
                   '    echo $h->nom . "\\n";', "}"]) + ["}"]
    if niveau == 2:
        # une classe par étape (EnqueteCoupable, EnqueteCerveau…) : les blocs de la solution
        # peuvent être copiés-collés ensemble sans « cannot redeclare »
        classe = "Enquete" + "".join(m.capitalize() for m in key.split("_"))
        l += [f"final class {classe}", "{", "    public function __construct(private Ville $ville)", "    {", "    }", "",
              "    /** @return Habitant[] */", "    public function suspects(): array", "    {",
              "        $ville = $this->ville;", "        $resultat = [];"]
        interieur = ["foreach ($ville->habitants() as $h) {"] \
            + _indent(corps) \
            + _indent(["if (" + (" && ".join(cond)) + ") {", "    $resultat[] = $h;", "}"]) + ["}"]
        l += _indent(interieur, 2)
        l += ["        return $resultat;", "    }", "}", "",
              f"$enquete = new {classe}($ville);",
              "foreach ($enquete->suspects() as $suspect) {", '    echo $suspect->nom . "\\n";', "}"]
        return "\n".join(l)
    return "\n".join(boucle)


# Critères paramétrés du niveau 3 : chaque classe n'est émise qu'une fois par histoire
# (CRITERES_EMIS est vidé au début de chaque build), les blocs de la solution restent donc
# copiables-collables ensemble sans « cannot redeclare ».
CRITERES_EMIS = set()

CRITERES = {
    "GenreEst": "final class GenreEst implements Critere\n{\n    public function __construct(private string $genre)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        return $h->genre === $this->genre;\n    }\n}",
    "CheveuxDeCouleur": "final class CheveuxDeCouleur implements Critere\n{\n    public function __construct(private string $couleur)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        return $h->cheveux === $this->couleur;\n    }\n}",
    "TailleEntre": "final class TailleEntre implements Critere\n{\n    public function __construct(private int $min, private int $max)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        return $h->taille >= $this->min && $h->taille <= $this->max;\n    }\n}",
    "AgeEntre": "final class AgeEntre implements Critere\n{\n    public function __construct(private int $min, private int $max)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        return $h->age >= $this->min && $h->age <= $this->max;\n    }\n}",
    "HabiteRue": "final class HabiteRue implements Critere\n{\n    public function __construct(private string $rue, private int $min = 0, private int $max = PHP_INT_MAX)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        return $h->rue === $this->rue && $h->numero >= $this->min && $h->numero <= $this->max;\n    }\n}",
    "RevenuSuperieurA": "final class RevenuSuperieurA implements Critere\n{\n    public function __construct(private int $seuil)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        return $h->revenu > $this->seuil;\n    }\n}",
    "RevenuInferieurA": "final class RevenuInferieurA implements Critere\n{\n    public function __construct(private int $seuil)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        return $h->revenu < $this->seuil;\n    }\n}",
    "MarqueDeVoiture": "final class MarqueDeVoiture implements Critere\n{\n    public function __construct(private Ville $ville, private string $marque)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        $v = $this->ville->vehiculeDe($h);\n        return $v !== null && $v->marque === $this->marque;\n    }\n}",
    "ModeleDeVoiture": "final class ModeleDeVoiture implements Critere\n{\n    public function __construct(private Ville $ville, private string $modele)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        $v = $this->ville->vehiculeDe($h);\n        return $v !== null && $v->modele === $this->modele;\n    }\n}",
    "PlaqueCommencePar": "final class PlaqueCommencePar implements Critere\n{\n    public function __construct(private Ville $ville, private string $fragment)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        $v = $this->ville->vehiculeDe($h);\n        return $v !== null && str_starts_with($v->plaque, $this->fragment);\n    }\n}",
    "PlaqueTerminePar": "final class PlaqueTerminePar implements Critere\n{\n    public function __construct(private Ville $ville, private string $fragment)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        $v = $this->ville->vehiculeDe($h);\n        return $v !== null && str_ends_with($v->plaque, $this->fragment);\n    }\n}",
    "PlaqueContient": "final class PlaqueContient implements Critere\n{\n    public function __construct(private Ville $ville, private string $fragment)\n    {\n    }\n\n    public function accepte(Habitant $h): bool\n    {\n        $v = $this->ville->vehiculeDe($h);\n        return $v !== null && str_contains($v->plaque, $this->fragment);\n    }\n}",
}


def php_traits_criteres(traits, key):
    """Niveau 3 : une classe Critere par indice, combinées par filtrer()."""
    classes, instances = [], []

    def emet(nom):
        if nom not in CRITERES_EMIS:
            CRITERES_EMIS.add(nom)
            classes.append(CRITERES[nom])

    for g, t in traits.items():
        if g == "physique":
            if "genre" in t:
                emet("GenreEst")
                instances.append(f"new GenreEst({php_str(t['genre'])})")
            if "cheveux" in t:
                emet("CheveuxDeCouleur")
                instances.append(f"new CheveuxDeCouleur({php_str(t['cheveux'])})")
            if "taille" in t:
                emet("TailleEntre")
                instances.append(f"new TailleEntre({t['taille'][0]}, {t['taille'][1]})")
            if "age" in t:
                emet("AgeEntre")
                instances.append(f"new AgeEntre({t['age'][0]}, {t['age'][1]})")
        elif g == "adresse":
            emet("HabiteRue")
            if "numero" in t:
                instances.append(f"new HabiteRue({php_str(t['rue'])}, {t['numero'][0]}, {t['numero'][1]})")
            else:
                instances.append(f"new HabiteRue({php_str(t['rue'])})")
        elif g == "revenu":
            if "min" in t:
                emet("RevenuSuperieurA")
                instances.append(f"new RevenuSuperieurA({t['min']})")
            if "max" in t:
                emet("RevenuInferieurA")
                instances.append(f"new RevenuInferieurA({t['max']})")
        elif g == "vehicule":
            if t.get("marque"):
                emet("MarqueDeVoiture")
                instances.append(f"new MarqueDeVoiture($ville, {php_str(t['marque'])})")
            if t.get("modele"):
                emet("ModeleDeVoiture")
                instances.append(f"new ModeleDeVoiture($ville, {php_str(t['modele'])})")
            if "plaque_debut" in t:
                emet("PlaqueCommencePar")
                instances.append(f"new PlaqueCommencePar($ville, {php_str(t['plaque_debut'])})")
            if "plaque_fin" in t:
                emet("PlaqueTerminePar")
                instances.append(f"new PlaqueTerminePar($ville, {php_str(t['plaque_fin'])})")
            if "plaque_contient" in t:
                emet("PlaqueContient")
                instances.append(f"new PlaqueContient($ville, {php_str(t['plaque_contient'])})")
        elif g == "passage":
            # les conditions de passage sont propres à chaque étape : classe nommée d'après l'étape
            classe = "Passages" + "".join(m.capitalize() for m in key.split("_"))
            conds = php_cond_passage(t, var="$p", poo=True)
            n = t.get("fois", 1)
            test = f"$nb === {n}" if "fois" in t else "$nb >= 1"
            classes.append(f"final class {classe} implements Critere\n{{\n    public function __construct(private Ville $ville)\n    {{\n    }}\n\n"
                           "    public function accepte(Habitant $h): bool\n    {\n        $nb = 0;\n"
                           "        foreach ($this->ville->passagesDe($h) as $p) {\n"
                           "            if (" + " && ".join(conds) + ") {\n                $nb++;\n            }\n        }\n"
                           "        return " + test + ";\n    }\n}")
            instances.append(f"new {classe}($ville)")
    l = classes + [""] if classes else []
    l += ["$suspects = filtrer(", "    $ville,"]
    l += [f"    {i}," for i in instances]
    l += [");", "foreach ($suspects as $suspect) {", '    echo $suspect->nom . "\\n";', "}"]
    return "\n".join(l)


def php_traits(traits, mode, niveau, key):
    if mode == "poo":
        return php_traits_poo(traits, niveau, key)
    return php_traits_procedural(traits)


# ---------------------------------------------------------------- écriture du fichier PHP des données

ENTETE = """<?php
// Fichier généré par scripts/enquete-algo/generate.py : ne pas modifier à la main.
// Enquête « {titre} » ({id}) : les données de la ville d'{ville}.
"""

VERIFIER = """
function verifier(string $nom): void
{{
    $messages = [
{messages}
    ];
    $empreinte = hash('sha256', strtolower(trim($nom)));
    echo "\\n[[ENQUETE:" . (isset($messages[$empreinte]) ? $empreinte : "KO") . "]]\\n";
    if (isset($messages[$empreinte])) {{
        echo $messages[$empreinte] . "\\n";
    }} else {{
        echo "Ce n'est pas la bonne personne. Essayez encore !\\n";
    }}
}}
"""

CLASSES_POO = """
final class Habitant
{
    public function __construct(
        public readonly int $id,
        public readonly string $nom,
        public readonly string $genre,
        public readonly int $age,
        public readonly int $taille,
        public readonly string $cheveux,
        public readonly string $rue,
        public readonly int $numero,
        public readonly int $revenu,
    ) {
    }

    public function prenom(): string
    {
        return explode(" ", $this->nom)[0];
    }

    public function habite(string $rue): bool
    {
        return $this->rue === $rue;
    }
}

final class Vehicule
{
    public function __construct(
        public readonly int $habitantId,
        public readonly string $marque,
        public readonly string $modele,
        public readonly string $plaque,
    ) {
    }

    public function appartientA(Habitant $h): bool
    {
        return $this->habitantId === $h->id;
    }
}

final class Passage
{
    public function __construct(
        public readonly int $habitantId,
        public readonly string $lieu,
        public readonly int $date,
        public readonly int $heure,
    ) {
    }

    public function estA(string $lieu): bool
    {
        return $this->lieu === $lieu;
    }
}

final class Ville
{
    /** @var Habitant[] */
    private array $habitants = [];
    /** @var Vehicule[] */
    private array $vehicules = [];
    /** @var array<int, string> */
    private array $temoignages = [];
    /** @var Passage[] */
    private array $passages = [];

    public function __construct(private string $rapport, array $habitants, array $vehicules, array $temoignages, array $passages)
    {
        foreach ($habitants as $h) {
            $this->habitants[] = new Habitant(...$h);
        }
        foreach ($vehicules as $v) {
            $this->vehicules[] = new Vehicule(...$v);
        }
        foreach ($temoignages as [$id, $texte]) {
            $this->temoignages[$id] = $texte;
        }
        foreach ($passages as $p) {
            $this->passages[] = new Passage(...$p);
        }
    }

    public function rapport(): string
    {
        return $this->rapport;
    }

    /** @return Habitant[] */
    public function habitants(): array
    {
        return $this->habitants;
    }

    public function vehiculeDe(Habitant $h): ?Vehicule
    {
        foreach ($this->vehicules as $v) {
            if ($v->appartientA($h)) {
                return $v;
            }
        }
        return null;
    }

    public function temoignageDe(Habitant $h): ?string
    {
        return $this->temoignages[$h->id] ?? null;
    }

    /** @return Passage[] */
    public function passagesDe(Habitant $h): array
    {
        $resultat = [];
        foreach ($this->passages as $p) {
            if ($p->habitantId === $h->id) {
                $resultat[] = $p;
            }
        }
        return $resultat;
    }
}

interface Critere
{
    public function accepte(Habitant $h): bool;
}

/** @return Habitant[] */
function filtrer(Ville $ville, Critere ...$criteres): array
{
    $resultat = [];
    foreach ($ville->habitants() as $h) {
        $ok = true;
        foreach ($criteres as $critere) {
            if (!$critere->accepte($h)) {
                $ok = false;
                break;
            }
        }
        if ($ok) {
            $resultat[] = $h;
        }
    }
    return $resultat;
}
"""


def _lignes_habitant(h, positionnel):
    vals = [str(h["id"]), php_str(h["nom"]), php_str(h["genre"]), str(h["age"]), str(h["taille"]),
            php_str(h["cheveux"]), php_str(h["rue"]), str(h["numero"]), str(h["revenu"])]
    if positionnel:
        return "[" + ", ".join(vals) + "]"
    cles = ["id", "nom", "genre", "age", "taille", "cheveux", "rue", "numero", "revenu"]
    return "[" + ", ".join(f'"{k}" => {v}' for k, v in zip(cles, vals)) + "]"


def _lignes_vehicule(v, positionnel):
    vals = [str(v["habitant_id"]), php_str(v["marque"]), php_str(v["modele"]), php_str(v["plaque"])]
    if positionnel:
        return "[" + ", ".join(vals) + "]"
    cles = ["habitant_id", "marque", "modele", "plaque"]
    return "[" + ", ".join(f'"{k}" => {v}' for k, v in zip(cles, vals)) + "]"


def _lignes_passage(p, positionnel):
    vals = [str(p["habitant_id"]), php_str(p["lieu"]), str(p["date"]), str(p["heure"])]
    if positionnel:
        return "[" + ", ".join(vals) + "]"
    cles = ["habitant_id", "lieu", "date", "heure"]
    return "[" + ", ".join(f'"{k}" => {v}' for k, v in zip(cles, vals)) + "]"


def ecrire_php(w, h, path, messages):
    mode = h.get("mode", "procedural")
    poo = mode == "poo"
    w.melange_ids()
    habitants = [w.habitants[k] for k in sorted(w.habitants)]
    vehicules = sorted(w.vehicules.values(), key=lambda v: v["habitant_id"])
    temoignages = sorted(w.temoignages.items())
    rapport = h["rapport_rendu"]

    msg = "\n".join(f"        {php_str(empreinte)} => {php_str(texte)}," for empreinte, texte in messages)
    lignes = [ENTETE.format(titre=h["titre"], id=h["id"], ville=VILLE)]
    if poo:
        lignes.append(CLASSES_POO)
        lignes.append(VERIFIER.format(messages=msg))
        lignes.append("$ville = new Ville(")
        lignes.append("    " + php_str(rapport) + ",")
        for nom_bloc, elems, rend in (("habitants", habitants, _lignes_habitant),
                                      ("vehicules", vehicules, _lignes_vehicule)):
            lignes.append("    [ // " + nom_bloc)
            for e in elems:
                lignes.append("        " + rend(e, True) + ",")
            lignes.append("    ],")
        lignes.append("    [ // temoignages")
        for hid, texte in temoignages:
            lignes.append(f"        [{hid}, {php_str(texte)}],")
        lignes.append("    ],")
        lignes.append("    [ // passages")
        for p in w.passages:
            lignes.append("        " + _lignes_passage(p, True) + ",")
        lignes.append("    ],")
        lignes.append(");")
    else:
        lignes.append(f"$rapport = {php_str(rapport)};\n")
        lignes.append("$habitants = [")
        for e in habitants:
            lignes.append("    " + _lignes_habitant(e, False) + ",")
        lignes.append("];\n")
        lignes.append("$vehicules = [")
        for v in vehicules:
            lignes.append("    " + _lignes_vehicule(v, False) + ",")
        lignes.append("];\n")
        lignes.append("$temoignages = [")
        for hid, texte in temoignages:
            lignes.append(f'    ["habitant_id" => {hid}, "texte" => {php_str(texte)}],')
        lignes.append("];\n")
        lignes.append("$passages = [")
        for p in w.passages:
            lignes.append("    " + _lignes_passage(p, False) + ",")
        lignes.append("];\n")
        lignes.append(VERIFIER.format(messages=msg))
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lignes) + "\n")


# ---------------------------------------------------------------- indices et solutions (markdown inclus dans le TP)

SOL_DIR = os.path.join(OUT, "solutions")


def indice_reperage(r, mode):
    parcours = "`$ville->habitants()`" if mode == "poo" else "`$habitants`"
    if r.get("position") == "dernier":
        return f"le numéro le plus grand de « {r['rue']} » : parcourez {parcours}, gardez le plus grand `numero` de la rue"
    if r.get("position") == "premier":
        return f"le numéro le plus petit de « {r['rue']} » : parcourez {parcours}, gardez le plus petit `numero` de la rue"
    if "prenom" in r:
        s = f"un prénom sur « {r['rue']} » : `str_starts_with(...nom..., \"{r['prenom']} \")` en plus du test sur la rue"
        if "numero" in r:
            s += f", et un `numero` entre {r['numero'][0]} et {r['numero'][1]}"
        return s
    return (f"le revenu le plus {'élevé' if r['revenu'] == 'max' else 'faible'} de « {r['rue']} » : "
            "même technique que pour un plus grand numéro, mais sur `revenu`")


INDICE_GROUPE_PROC = {
    "physique": "la description (genre, cheveux, âge, taille) est directement dans `$habitants` ; "
                "les intervalles se testent avec `>=` et `<=`",
    "vehicule": "la voiture est dans `$vehicules`, reliée par `habitant_id` ; un fragment de plaque se teste avec "
                "`str_starts_with`, `str_ends_with` ou `str_contains`",
    "passage": "les passages sont dans `$passages`, reliés par `habitant_id` ; pour « n fois », comptez avec un "
               "tableau compteur : `$compteur[$p[\"habitant_id\"]] = ($compteur[$p[\"habitant_id\"]] ?? 0) + 1;`",
    "revenu": "le `revenu` est directement dans `$habitants`",
    "adresse": "la `rue` (et le `numero`) sont directement dans `$habitants`",
}

INDICE_GROUPE_POO = {
    "physique": "la description (genre, cheveux, âge, taille) est portée par les propriétés de `Habitant`",
    "vehicule": "demandez `$ville->vehiculeDe($h)` (qui peut renvoyer `null`) puis testez la plaque avec "
                "`str_starts_with`, `str_ends_with` ou `str_contains`",
    "passage": "comptez les objets de `$ville->passagesDe($h)` qui correspondent (lieu, date, heure)",
    "revenu": "la propriété `revenu` de `Habitant`",
    "adresse": "les propriétés `rue` et `numero` de `Habitant` (ou la méthode `habite()`)",
}


def ecrire_solutions(h, persos, corriges):
    """Fichier markdown : indices dégressifs puis solution complète, à inclure dans le TP."""
    os.makedirs(SOL_DIR, exist_ok=True)
    mode = h.get("mode", "procedural")
    # ordre narratif : témoins dans l'ordre du rapport, puis chaîne des réponses, fausses pistes à leur place
    ordre = [c for c, _ in PLACEHOLDER.findall(h["rapport"])]
    for txt_key in list(ordre):
        for c, _ in PLACEHOLDER.findall(persos[txt_key].get("dit", "")):
            if c not in ordre:
                ordre.append(c)
    for key in persos:
        if key not in ordre:
            ordre.append(key)
    reveles = {}
    for key, pc in persos.items():
        for c, g in PLACEHOLDER.findall(pc.get("dit", "")):
            if g:
                reveles.setdefault(c, {}).setdefault(key, set()).add(g)

    lignes = []
    temoins = [k for k in ordre if "reperage" in persos[k]]
    suspects = [k for k in ordre if "traits" in persos[k]]
    structure = f"{len(temoins)} témoin{'s' if len(temoins) > 1 else ''}"
    for k in suspects:
        pc = persos[k]
        role = "une fausse piste" if "message" in pc and "reponse" not in pc else \
            f"un personnage à identifier (réponse {pc['reponse']})"
        structure += f", puis {role}"
    lignes.append(f"Structure : {structure}.\n")

    indice_groupe = INDICE_GROUPE_POO if mode == "poo" else INDICE_GROUPE_PROC
    n = 0
    if temoins:
        n += 1
        lignes.append(f"::: details Indice {n} : les témoins")
        for k in temoins:
            lignes.append(f"- {indice_reperage(dict(persos[k]['reperage'], prenom=persos[k]['nom'].split()[0]), mode)}.")
        if mode == "poo":
            lignes.append("\nUne fois trouvés, lisez leur témoignage avec `$ville->temoignageDe($temoin)`.")
        else:
            lignes.append("\nUne fois trouvés, lisez leur témoignage : parcourez `$temoignages` en comparant "
                          "`habitant_id` avec l'`id` du témoin.")
        lignes.append(":::\n")
    for k in suspects:
        n += 1
        pc = persos[k]
        titre = "la fausse piste" if "message" in pc and "reponse" not in pc else \
            ("le coupable" if pc.get("reponse") == 1 else "la personne derrière tout ça")
        lignes.append(f"::: details Indice {n} : {titre}")
        qui = ", ".join(f"{persos[q].get('nom')} ({', '.join(sorted(gs))})" for q, gs in reveles.get(k, {}).items())
        lignes.append(f"Les indices viennent de : {qui}.\n")
        for g in pc["traits"]:
            lignes.append(f"- **{g}** : {indice_groupe[g]}.")
        lignes.append("\nCumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste "
                      "affichée doit raccourcir.")
        if pc.get("dit") and PLACEHOLDER.search(pc["dit"]):
            lignes.append("Une fois validé, lisez son témoignage : l'enquête continue.")
        lignes.append(":::\n")

    lignes.append("::: details Voir l'une des solutions possibles")
    lignes.append("```php")
    for k in temoins:
        lignes.append(f"// Témoin : {persos[k]['nom']}")
        lignes.append(corriges[f"{k} (repérage)"] + "\n")
    for k in suspects:
        pc = persos[k]
        lignes.append(f"// {'Fausse piste' if 'reponse' not in pc else 'Réponse ' + str(pc['reponse'])} : {pc['nom']}")
        lignes.append(corriges[f"{k} (indices)"])
        if "message" in pc:
            lignes.append(f"\nverifier({php_str(pc['nom'])});\n")
    lignes.append("```")
    lignes.append(":::")
    with open(os.path.join(SOL_DIR, f"{h['id']}.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lignes) + "\n")


# ---------------------------------------------------------------- construction d'une histoire

PLACEHOLDER = re.compile(r"\{(\w+)(?::(\w+))?\}")


def entree_index(h, persos):
    reponses = sorted((pc["reponse"], key) for key, pc in persos.items() if "reponse" in pc)
    empreintes = [sha(persos[key]["nom"]) for _, key in reponses]
    return {"empreintes": empreintes, "ordre": h.get("ordre", 99), "id": h["id"], "titre": h["titre"],
            "fichier": f"{h['id']}.php", "mode": h.get("mode", "procedural"),
            "date": date_fr(h["date"]), "type": h["type"], "brief": h["brief"],
            "etapes": [key for _, key in reponses]}


def build(cfg_path, force=False):
    with open(cfg_path, "rb") as f:
        cfg = tomllib.load(f)
    h = cfg["histoire"]
    persos = cfg.get("personnage", {})
    mode = h.get("mode", "procedural")
    niveau = h.get("niveau_poo", 1)
    path = os.path.join(OUT, f"{h['id']}.php")
    if os.path.exists(path) and not force:
        print(f"--  {h['id']}.php existe déjà, conservé (utilisez --force pour le régénérer)")
        return entree_index(h, persos), None
    annee = h["date"] // 10000
    w = World(h.get("seed", 1), annee)
    rng = w.rng

    # 1. tirage des valeurs "?" et création des personnages
    people, traits, reperages = {}, {}, {}
    for key, pc in persos.items():
        nom = pc.get("nom") or w.new_nom()
        p = w.new_habitant(nom)
        people[key] = p
        traits[key] = {g: draw_groupe(rng, g, t, annee) for g, t in pc.get("traits", {}).items()}
        if "reperage" in pc:
            reperages[key] = dict(pc["reperage"])
            if "prenom" in reperages[key]:
                reperages[key]["prenom"] = nom.split()[0]
        else:
            reperages[key] = None
        if "genre" in pc:
            p["genre"] = pc["genre"]

    # 2. quels groupes sont révélés, et par qui ? (scan des textes)
    reveles = {k: set() for k in persos}
    textes = {"__rapport__": h["rapport"]}
    for key, pc in persos.items():
        if pc.get("dit"):
            textes[key] = pc["dit"]
    for txt in textes.values():
        for cible, groupe in PLACEHOLDER.findall(txt):
            if cible not in persos:
                raise ConfigError(f"personnage inconnu dans un texte : {cible}")
            if groupe:
                if groupe not in traits[cible]:
                    raise ConfigError(f"{cible} n'a pas de trait « {groupe} »")
                reveles[cible].add(groupe)
    for key in persos:
        oublies = set(traits[key]) - reveles[key]
        if oublies:
            print(f"   avertissement : traits de {key} jamais révélés : {', '.join(sorted(oublies))}")

    # 3. application des traits + leurres (un leurre par indice révélé, qui coche tout sauf cet indice)
    for key, p in people.items():
        for g, t in traits[key].items():
            GROUPES[g][1](w, p, t)
        rev = sorted(reveles[key])
        for g_fail in rev:
            t_fail = traits[key][g_fail]
            for champ in [c for c in t_fail
                          if c != "et"                                            # « et » va avec « entre »
                          and not (c == "fois" and t_fail["fois"] == 1)           # « une fois » : pas contredisable
                          and not (c == "marque" and "modele" in t_fail)]:        # marque implicite du modèle
                leurre = w.new_habitant()
                for g in rev:
                    GROUPES[g][1](w, leurre, traits[key][g], fail=(champ if g == g_fail else None))
        if reperages[key]:
            apply_reperage(w, p, reperages[key])

    # 4. rédaction
    genre_ctx = {k: {"genre": persos[k].get("genre", traits[k].get("physique", {}).get("genre", "homme"))}
                 for k in persos}

    def render(txt):
        def sub(m):
            cible, groupe = m.group(1), m.group(2)
            if groupe:
                return GROUPES[groupe][2](rng, traits[cible][groupe], genre_ctx[cible])
            return text_reperage(rng, people[cible], reperages[cible])
        return PLACEHOLDER.sub(sub, txt).replace("  ", " ")

    h["rapport_rendu"] = render(h["rapport"])
    for key, pc in persos.items():
        if pc.get("dit"):
            w.temoignages[people[key]["id"]] = render(pc["dit"])

    # 5. messages de vérification (empreinte sha256 -> message ; fausses pistes incluses)
    reponses = sorted((pc["reponse"], key) for key, pc in persos.items() if "reponse" in pc)
    if not reponses:
        raise ConfigError("aucun personnage avec `reponse = n`")
    messages = [(sha(people[key]["nom"]), pc["message"]) for key, pc in persos.items() if "message" in pc]

    # 6. vérifications : on rejoue en Python les filtres attendus en PHP
    CRITERES_EMIS.clear()
    corriges = {}
    for key in persos:
        if reperages[key]:
            obtenu = reperage_resultat(w, reperages[key])
            if obtenu != [people[key]["nom"]]:
                raise AssertionError(f"{h['id']} / {key} (repérage) : attendu [{people[key]['nom']!r}], "
                                     f"obtenu {obtenu}\n{reperages[key]}")
            corriges[f"{key} (repérage)"] = php_reperage(reperages[key], mode)
        if reveles[key]:
            tr = {g: t for g, t in traits[key].items() if g in reveles[key]}  # ordre du TOML (déterministe)
            obtenu = traits_resultat(w, tr)
            if obtenu != [people[key]["nom"]]:
                raise AssertionError(f"{h['id']} / {key} (indices) : attendu [{people[key]['nom']!r}], "
                                     f"obtenu {obtenu}\n{tr}")
            corriges[f"{key} (indices)"] = php_traits(tr, mode, niveau, key)
    assert sha("Personne Inconnue") not in dict(messages)

    # 7. écriture (le mélange des ids arrive ici, après les vérifications)
    ecrire_php(w, h, path, messages)
    print(f"OK  {h['id']}.php ({os.path.getsize(path) // 1024} Ko, mode {mode})")

    return entree_index(h, persos), corriges


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    force = "--force" in sys.argv
    tous = sorted(os.path.join(HERE, "histoires", f) for f in os.listdir(os.path.join(HERE, "histoires"))
                  if f.endswith(".toml"))
    cibles = {os.path.abspath(a) for a in sys.argv[1:] if a != "--force"} or {os.path.abspath(f) for f in tous}
    corriges_path = os.path.join(HERE, "corriges.json")
    corriges = json.load(open(corriges_path, encoding="utf-8")) if os.path.exists(corriges_path) else {}
    index = []
    for f in tous:  # l'index liste toujours toutes les histoires ; seules les cibles sont (re)générées
        entry, sols = build(f, force and os.path.abspath(f) in cibles)
        index.append(entry)
        if sols is not None:
            corriges[entry["id"]] = sols
    for f in tous:
        with open(f, "rb") as fh:
            cfg = tomllib.load(fh)
        if cfg["histoire"]["id"] in corriges:
            ecrire_solutions(cfg["histoire"], cfg.get("personnage", {}), corriges[cfg["histoire"]["id"]])
    index.sort(key=lambda e: (e.pop("ordre"), e["id"]))
    with open(os.path.join(OUT, "index.json"), "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    with open(corriges_path, "w", encoding="utf-8") as f:
        json.dump(corriges, f, ensure_ascii=False, indent=2)
    print("index.json, corriges.json et solutions/*.md écrits")
    print("Pour une nouvelle histoire, ajoutez dans le TP concerné :")
    print("  <!--@include: ../../public/enquete-algo/solutions/<id>.md-->")
