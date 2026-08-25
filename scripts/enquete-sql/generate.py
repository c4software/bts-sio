#!/usr/bin/env python3
"""
Moteur du TP « Enquête SQL » (inspiré de SQL Murder Mystery, NUKnightLab).

Usage : python3 scripts/enquete-sql/generate.py [--force] [histoire.toml ...]
        (sans argument : toutes les histoires de scripts/enquete-sql/histoires/)
Une base déjà présente n'est JAMAIS régénérée sans --force : les histoires publiées restent stables
(les indices du TP en dépendent). Ce script n'est pas appelé par le build du site.
Sortie : public/sqlite/enquete/<id>.sqlite + index.json

Une histoire = un fichier TOML (voir histoires/README.md pour le format). Le moteur :
  1. construit un monde aléatoire (10 000 personnes, permis, revenus, salle de sport, événements) ;
  2. y injecte les personnages de l'histoire, avec leurs traits (indices) ;
  3. ajoute, pour chaque indice, un leurre qui coche tout SAUF cet indice (chaque indice est donc nécessaire) ;
  4. rédige les textes (rapport, interrogatoires) à partir de gabarits de phrases ;
  5. vérifie par SQL que chaque personnage est identifiable de façon unique.
Le résultat est déterministe (seed du TOML).
"""
import json
import os
import random
import re
import sqlite3
import sys
import tomllib

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "public", "sqlite", "enquete")

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
               "Saint-Michel", "du Port", "de Bretagne", "des Acacias", "de la Fontaine", "du Parc", "Molière",
               "Lamartine", "de l'Industrie", "des Vignes", "du Lac", "de Provence", "de la Liberté", "Jules-Ferry",
               "des Cerisiers", "du Commerce", "Carnot", "de la Mairie", "des Jardins", "Marcel-Pagnol", "du Puits",
               "de Lorraine", "des Marronniers", "du Nord", "de l'Ouest", "Franklin", "Kennedy", "des Pins",
               "Anatole-France", "du Bois", "Blaise-Pascal", "des Sports", "du Colombier", "des Frênes", "de la Plage",
               "des Champs", "de la Forêt", "Louis-Blanc", "de l'Abbaye", "Saint-Exupéry", "Jacques-Prévert",
               "Jean-Moulin", "du Pont", "des Mimosas", "de Nantes", "de Paris", "de Lyon", "du Soleil", "des Ormes",
               "Georges-Brassens", "Pierre-Curie", "Nationale", "de la Poste", "du Canal", "des Alouettes"]

VILLES = """Paris Marseille Lyon Toulouse Nice Nantes Montpellier Strasbourg Bordeaux Lille Rennes Reims Toulon
Saint-Étienne Le_Havre Grenoble Dijon Angers Nîmes Villeurbanne Clermont-Ferrand Le_Mans Aix-en-Provence Brest Tours
Amiens Limoges Annecy Perpignan Boulogne-Billancourt Metz Besançon Orléans Rouen Mulhouse Caen Nancy Argenteuil
Saint-Denis Montreuil Roubaix Tourcoing Nanterre Avignon Vitry-sur-Seine Créteil Poitiers Dunkerque Versailles
Courbevoie La_Rochelle Pau Calais Cannes Antibes Béziers Colmar Bourges Quimper Valence Chambéry Lorient Niort
Cholet Vannes Laval Saint-Nazaire Bayonne Angoulême Chartres Troyes Beauvais Évreux Blois Arles Agen Auxerre
Mâcon Vichy Cognac Saumur Sète Menton Ajaccio Bastia Rodez Cahors Périgueux Vesoul Épinal Sedan Gap Digne Aurillac
Tulle Guéret Mende Foix Auch Tarbes Lourdes Alès Millau Carcassonne Narbonne Albi Castres Montauban""".replace("_", " ").split()
VILLE_ENQUETE = "SQL Ville"

TYPES_RAPPORT = ["vol", "cambriolage", "fraude", "agression", "incendie", "chantage", "corruption", "contrebande",
                 "meurtre", "vandalisme", "sabotage", "enlèvement"]

DESCRIPTIONS = [
    "Rapport non disponible.", "Rapport non disponible.", "Rapport non disponible.",
    "Un homme déguisé en Spider-Man multiplie les braquages de boulangeries.",
    "Le suspect a pris la fuite à vélo, la police a perdu sa trace au premier feu rouge.",
    "Plusieurs voitures ont été retrouvées avec les pneus dégonflés, aucune piste.",
    "Un tag « SELECT * FROM justice » a été découvert sur le mur du commissariat.",
    "La victime affirme que son chat a été enlevé, le chat est revenu tout seul le lendemain.",
    "Un stand de crêpes a été renversé lors de la fête du village, deux blessés légers.",
    "Le distributeur de billets a été ouvert à la pince monseigneur, la caisse était vide.",
    "Les témoins parlent d'un homme en imperméable beige qui sifflait faux.",
    "Une bagarre a éclaté à la sortie du stade après le match, trois interpellations.",
    "Un faux plombier a récupéré des bijoux chez une personne âgée.",
    "Un camion de livraison de chocolats a disparu, retrouvé vide deux jours plus tard.",
    "La statue de la place principale a été peinte en rose pendant la nuit.",
    "Le maire a reçu une lettre anonyme composée de lettres découpées dans un journal.",
    "Une fausse collecte de dons a été organisée devant le supermarché.",
    "Le suspect a laissé son portefeuille sur les lieux, il a été convoqué au commissariat.",
    "Incendie d'une poubelle, pas de victime, l'auteur n'a pas été identifié.",
    "Le coffre-fort a été forcé, seul le mot de passe du wifi a été volé.",
    "Un drone a survolé la piscine municipale, plaintes de plusieurs baigneurs.",
    "Le voisin se plaint de musique trop forte, il s'agissait d'une répétition de fanfare.",
    "La vitrine de la bijouterie a été brisée, l'alarme a fait fuir les cambrioleurs.",
    "Un cycliste a été percuté par une trottinette, le conducteur a pris la fuite.",
    "Une dispute entre deux commerçants a dégénéré sur le marché.",
    "Faux billets de 50 € en circulation dans les bars du centre-ville.",
    "Un individu a tenté de vendre la tour Eiffel à des touristes.",
    "Vol d'un tracteur, retrouvé garé devant la mairie avec un mot d'excuse.",
    "Un serveur informatique a été volé dans les locaux d'une startup.",
    "Escroquerie au faux support technique, la victime a perdu 2 000 €.",
    "Le gardien de nuit affirme avoir vu un fantôme, l'enquête est classée.",
    "Un panneau STOP a été dévissé et emporté, le carrefour est sous surveillance.",
    "Un client a quitté le restaurant sans payer une addition de 340 €.",
    "Le suspect a été reconnu grâce à ses chaussettes dépareillées.",
    "Une dizaine de garages ont été fracturés dans le même quartier.",
    "Dépôt sauvage de vieux ordinateurs sur le parking de la déchetterie.",
    "Un ballon de foot a cassé la fenêtre de la bibliothèque, l'auteur a avoué.",
    "Piratage du panneau lumineux de la ville pour afficher des blagues.",
    "Le suspect s'est enfui par les toits, il a été retrouvé bloqué sur une gouttière.",
    "Un inconnu distribue de fausses contraventions sur les pare-brise.",
    "Le train de 8h47 est parti avec 3 minutes d'avance, plusieurs plaintes de voyageurs.",
    "Un perroquet volé au parc animalier a été retrouvé dans un bar, il connaissait déjà la carte.",
    "Un laboratoire signale la disparition de deux blouses et d'un microscope.",
]

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

EVENEMENTS = ["Concert Symphonique SQL", "Salon de la Tech SQL", "Vernissage Galerie Nord", "Marché de Noël",
              "Festival du Film Court", "Tournoi d'échecs municipal", "Brocante des Tilleuls", "Soirée jeux de société",
              "Marathon de SQL Ville", "Fête de la Musique", "Conférence Cybersécurité", "Salon du Livre",
              "Course de trottinettes", "Atelier poterie", "Tournoi de pétanque", "Nuit des musées",
              "Bal des pompiers", "Foire aux vins", "Match de rugby", "Exposition photo", "Spectacle de magie",
              "Cours de cuisine", "Randonnée du dimanche", "Concert de jazz", "Salon de l'auto", "Fête des voisins",
              "Hackathon étudiant", "Théâtre en plein air", "Cinéma en plein air", "Loto du village",
              "Journée portes ouvertes du lycée", "Trail des collines", "Festival de BD", "Meetup Développeurs",
              "Repas de quartier", "Conférence Intelligence Artificielle", "Course cycliste", "Kermesse de l'école",
              "Salon du Bien-être", "Concert rock au stade", "Avant-première au Grand Rex", "Soirée western",
              "Conférence de chimie", "Salon des inventeurs", "Bourse aux trains miniatures"]

MARQUES = {
    "Peugeot": ["208", "308", "3008", "2008", "508"], "Renault": ["Clio", "Megane", "Captur", "Twingo", "Scenic"],
    "Citroën": ["C3", "C4", "Berlingo", "C5 Aircross"], "Tesla": ["Model S", "Model 3", "Model Y"],
    "Toyota": ["Yaris", "Corolla", "Aygo", "RAV4"], "Volkswagen": ["Golf", "Polo", "Tiguan", "Passat"],
    "BMW": ["Serie 1", "Serie 3", "X1"], "Mercedes": ["Classe A", "Classe C", "GLA"], "Audi": ["A1", "A3", "Q3"],
    "Ford": ["Fiesta", "Focus", "Puma"], "Fiat": ["500", "Panda", "Tipo"], "Dacia": ["Sandero", "Duster", "Logan"],
    "Kia": ["Picanto", "Sportage"], "Hyundai": ["i20", "Tucson"], "Opel": ["Corsa", "Astra"], "Skoda": ["Fabia", "Octavia"],
    "Nissan": ["Micra", "Qashqai"], "Mini": ["Cooper"], "Seat": ["Ibiza", "Leon"], "Honda": ["Jazz", "Civic"],
}
YEUX = ["marron", "bleu", "vert", "noisette", "gris"]
CHEVEUX = ["brun", "châtain", "blond", "noir", "roux", "gris", "blanc", "chauve"]
GENRES = ["homme", "femme"]
STATUTS = ["standard", "standard", "standard", "argent", "argent", "or"]
LETTRES = "ABCDEFGHJKLMNPQRSTUVWXYZ"

SALLE = "Forme Express"

MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre",
        "novembre", "décembre"]

# ---------------------------------------------------------------- schéma

SCHEMA = """
CREATE TABLE rapport_police (
    date integer,
    type text,
    description text,
    ville text
);
CREATE TABLE permis_conduire (
    id integer PRIMARY KEY,
    age integer,
    taille integer,
    couleur_yeux text,
    couleur_cheveux text,
    genre text,
    immatriculation text,
    marque_voiture text,
    modele_voiture text
);
CREATE TABLE revenu (
    nir text PRIMARY KEY,
    revenu_annuel integer
);
CREATE TABLE personne (
    id integer PRIMARY KEY,
    nom text,
    permis_id integer,
    numero_rue integer,
    nom_rue text,
    nir text REFERENCES revenu (nir),
    FOREIGN KEY (permis_id) REFERENCES permis_conduire (id)
);
CREATE TABLE interrogatoire (
    personne_id integer,
    transcription text,
    FOREIGN KEY (personne_id) REFERENCES personne (id)
);
CREATE TABLE salle_sport_membre (
    id text PRIMARY KEY,
    personne_id integer,
    nom text,
    date_debut_abonnement integer,
    statut_abonnement text,
    FOREIGN KEY (personne_id) REFERENCES personne (id)
);
CREATE TABLE salle_sport_passage (
    membre_id text,
    date_passage integer,
    heure_entree integer,
    heure_sortie integer,
    FOREIGN KEY (membre_id) REFERENCES salle_sport_membre (id)
);
CREATE TABLE evenement_participation (
    personne_id integer,
    evenement_id integer,
    nom_evenement text,
    date integer,
    FOREIGN KEY (personne_id) REFERENCES personne (id)
);
CREATE TABLE solution (
    utilisateur integer,
    valeur text
);
"""

TRIGGER = """
CREATE TRIGGER verification_solution AFTER INSERT ON solution
    WHEN new.utilisateur == 1
    BEGIN
        DELETE FROM solution;
        INSERT INTO solution VALUES (0,
        CASE {cas}
             ELSE 'Ce n''est pas la bonne personne. Essayez encore !'
        END
        );
    END;
"""


# ---------------------------------------------------------------- utilitaires

def q(s):
    return "'" + str(s).replace("'", "''") + "'"


def date_fr(d):
    y, m, j = d // 10000, (d // 100) % 100, d % 100
    return f"{'1er' if j == 1 else j} {MOIS[m - 1]} {y}"


def mois_fr(d):
    return f"{MOIS[(d // 100) % 100 - 1]} {d // 10000}"


def heure_fr(h):
    hh, mm = divmod(h, 100)
    return f"{hh}h{mm:02d}" if mm else f"{hh}h"


def rand_date(rng, y1=2017, y2=2021):
    return rng.randint(y1, y2) * 10000 + rng.randint(1, 12) * 100 + rng.randint(1, 28)


def rand_plate(rng):
    return "".join(rng.choice(LETTRES) for _ in range(2)) + "".join(rng.choice("0123456789") for _ in range(3)) \
        + "".join(rng.choice(LETTRES) for _ in range(2))


def rand_member_id(rng):
    return "".join(rng.choice("0123456789") for _ in range(2)) + rng.choice(LETTRES) + \
        "".join(rng.choice("0123456789") for _ in range(2))


class ConfigError(Exception):
    pass


# ---------------------------------------------------------------- le monde

class World:
    def __init__(self, seed):
        self.rng = random.Random(seed)
        rng = self.rng
        self.rapports = []
        self.permis = {}
        self.personnes = {}
        self.revenus = {}
        self.interrogatoires = {}   # personne_id -> texte
        self.membres = {}
        self.passages = []
        self.participations = []
        self.rues = sorted({f"{rng.choice(RUES_PREFIX)} {s}" for s in RUES_SUFFIX} |
                           {f"Rue {s}" for s in RUES_SUFFIX})
        self.evenement_ids = {e: 100 + i * 7 for i, e in enumerate(EVENEMENTS)}
        self.noms_utilises = set()

        for _ in range(1200):
            self.rapports.append({
                "date": rand_date(rng), "type": rng.choice(TYPES_RAPPORT),
                "description": rng.choice(DESCRIPTIONS),
                "ville": VILLE_ENQUETE if rng.random() < 0.06 else rng.choice(VILLES)})

        for pid in range(100000, 110000):
            self.permis[pid] = self.new_permis(pid)

        permis_libres = list(self.permis.keys())
        rng.shuffle(permis_libres)
        nirs = set()
        for i in range(10000):
            pid = 10000 + i
            permis_id = permis_libres.pop() if rng.random() < 0.9 else None
            while True:
                nir = "".join(rng.choice("0123456789") for _ in range(9))
                if nir not in nirs:
                    nirs.add(nir)
                    break
            self.personnes[pid] = {"id": pid, "nom": self.new_nom(), "permis_id": permis_id,
                                   "numero_rue": rng.randint(1, 1000), "nom_rue": rng.choice(self.rues), "nir": nir}
            if rng.random() < 0.75:
                self.revenus[nir] = rng.choice([rng.randint(10, 60), rng.randint(15, 120), rng.randint(20, 400)]) * 1000
            if rng.random() < 0.5:
                self.interrogatoires[pid] = rng.choice(TRANSCRIPTIONS)

        candidats = list(self.personnes.values())
        rng.shuffle(candidats)
        for p in candidats[:180]:
            self.new_membre(p)
        for mid in list(self.membres):
            for _ in range(rng.randint(5, 25)):
                self.add_passage(mid, rand_date(rng))
        for _ in range(20000):
            self.add_participation(rng.choice(candidats)["id"], rng.choice(EVENEMENTS), rand_date(rng))

    # -- fabriques
    def new_permis(self, pid, **over):
        rng = self.rng
        marque = over.get("marque_voiture") or rng.choice(list(MARQUES))
        d = {"id": pid, "age": rng.randint(18, 85), "taille": rng.randint(150, 200),
             "couleur_yeux": rng.choice(YEUX), "couleur_cheveux": rng.choice(CHEVEUX), "genre": rng.choice(GENRES),
             "immatriculation": rand_plate(rng), "marque_voiture": marque, "modele_voiture": rng.choice(MARQUES[marque])}
        d.update({k: v for k, v in over.items() if v is not None})
        return d

    def new_nom(self, prenom=None):
        while True:
            n = f"{prenom or self.rng.choice(PRENOMS)} {self.rng.choice(NOMS)}"
            if n not in self.noms_utilises:
                self.noms_utilises.add(n)
                return n

    def new_membre(self, p, mid=None, statut=None):
        rng = self.rng
        while mid is None or mid in self.membres:
            mid = rand_member_id(rng)
        d = {"id": mid, "personne_id": p["id"], "nom": p["nom"],
             "date_debut_abonnement": rand_date(rng, 2015, 2020), "statut_abonnement": statut or rng.choice(STATUTS)}
        self.membres[mid] = d
        return d

    def membre_de(self, p):
        for m in self.membres.values():
            if m["personne_id"] == p["id"]:
                return m
        return None

    def add_passage(self, mid, date, entree=None, duree=None):
        rng = self.rng
        h = entree if entree is not None else rng.randint(6, 21) * 100 + rng.choice([0, 15, 30, 45])
        dur = duree if duree is not None else rng.choice([30, 45, 60, 75, 90, 120])
        hh, mm = divmod(h, 100)
        total = hh * 60 + mm + dur
        self.passages.append({"membre_id": mid, "date_passage": date, "heure_entree": h,
                              "heure_sortie": (total // 60) * 100 + total % 60})

    def add_participation(self, pid, ev, date):
        if ev not in self.evenement_ids:
            self.evenement_ids[ev] = 100 + len(self.evenement_ids) * 7
        self.participations.append({"personne_id": pid, "evenement_id": self.evenement_ids[ev],
                                    "nom_evenement": ev, "date": date})

    def new_personne(self, nom=None, permis=True):
        rng = self.rng
        pid = max(self.personnes) + 1
        permis_id = None
        if permis:
            permis_id = max(self.permis) + 1
            self.permis[permis_id] = self.new_permis(permis_id)
        nir = "".join(rng.choice("0123456789") for _ in range(9))
        while nir in self.revenus or any(p["nir"] == nir for p in self.personnes.values() if p["id"] > 20000):
            nir = "".join(rng.choice("0123456789") for _ in range(9))
        if nom:
            self.noms_utilises.add(nom)
        d = {"id": pid, "nom": nom or self.new_nom(), "permis_id": permis_id, "numero_rue": rng.randint(1, 1000),
             "nom_rue": rng.choice(self.rues), "nir": nir}
        self.personnes[pid] = d
        self.revenus[nir] = rng.randint(15, 90) * 1000
        return d

    def melange_ids(self):
        """Renumérote personnes et permis au hasard : les personnages ajoutés ne sont plus repérables à leur id.
        RNG dédié pour ne pas modifier le tirage des indices."""
        rng = random.Random(4242)
        pids = rng.sample(range(10000, 99999), len(self.personnes))
        map_p = dict(zip(sorted(self.personnes), pids))
        lids = rng.sample(range(100000, 999999), len(self.permis))
        map_l = dict(zip(sorted(self.permis), lids))
        self.personnes = {map_p[k]: {**v, "id": map_p[k], "permis_id": map_l.get(v["permis_id"])}
                          for k, v in self.personnes.items()}
        self.permis = {map_l[k]: {**v, "id": map_l[k]} for k, v in self.permis.items()}
        self.interrogatoires = {map_p[k]: v for k, v in self.interrogatoires.items()}
        for m in self.membres.values():
            m["personne_id"] = map_p[m["personne_id"]]
        for e in self.participations:
            e["personne_id"] = map_p[e["personne_id"]]

    def write(self, path, cas_trigger):
        if os.path.exists(path):
            os.remove(path)
        self.melange_ids()
        con = sqlite3.connect(path)
        con.executescript(SCHEMA)
        rng = self.rng
        con.executemany("INSERT INTO rapport_police VALUES (:date,:type,:description,:ville)", self.rapports)
        con.executemany("INSERT INTO permis_conduire VALUES (:id,:age,:taille,:couleur_yeux,:couleur_cheveux,:genre,"
                        ":immatriculation,:marque_voiture,:modele_voiture)", self.permis.values())
        con.executemany("INSERT INTO revenu VALUES (?,?)", self.revenus.items())
        con.executemany("INSERT INTO personne VALUES (:id,:nom,:permis_id,:numero_rue,:nom_rue,:nir)",
                        self.personnes.values())
        inter = [(k, v) for k, v in self.interrogatoires.items()]
        rng.shuffle(inter)
        con.executemany("INSERT INTO interrogatoire VALUES (?,?)", inter)
        con.executemany("INSERT INTO salle_sport_membre VALUES (:id,:personne_id,:nom,:date_debut_abonnement,"
                        ":statut_abonnement)", self.membres.values())
        pas = list(self.passages)
        rng.shuffle(pas)
        con.executemany("INSERT INTO salle_sport_passage VALUES (:membre_id,:date_passage,:heure_entree,:heure_sortie)",
                        pas)
        part = list(self.participations)
        rng.shuffle(part)
        con.executemany("INSERT INTO evenement_participation VALUES (:personne_id,:evenement_id,:nom_evenement,:date)",
                        part)
        con.executescript(TRIGGER.format(cas=cas_trigger))
        con.commit()
        con.execute("VACUUM")
        con.close()


# ---------------------------------------------------------------- traits (indices)
#
# Chaque groupe de traits sait : compléter les valeurs "?" (draw), appliquer le trait à une personne (apply),
# le faire échouer pour un leurre (fail), produire les phrases (text) et la clause SQL de vérification (sql).

def draw_physique(rng, t):
    t = dict(t)
    if t.get("genre") == "?":
        t["genre"] = rng.choice(GENRES)
    if t.get("cheveux") == "?":
        t["cheveux"] = rng.choice(CHEVEUX[:5])
    if t.get("yeux") == "?":
        t["yeux"] = rng.choice(YEUX)
    if t.get("taille") == "?":
        base = rng.randint(155, 195)
        t["taille"] = [base, base + rng.choice([2, 3, 4])]
    if t.get("age") == "?":
        base = rng.randint(20, 70)
        t["age"] = [base, base + rng.choice([4, 5, 9])]
    return t


def apply_physique(w, p, t, fail=None):
    rng = w.rng
    pc = w.permis[p["permis_id"]]
    if "genre" in t:
        pc["genre"] = t["genre"]
    if "cheveux" in t:
        pc["couleur_cheveux"] = t["cheveux"]
    if "yeux" in t:
        pc["couleur_yeux"] = t["yeux"]
    if "taille" in t:
        pc["taille"] = rng.randint(*t["taille"])
    if "age" in t:
        pc["age"] = rng.randint(*t["age"])
    if fail:  # on casse exactement ce champ
        champ = fail
        if champ == "genre":
            pc["genre"] = "femme" if t["genre"] == "homme" else "homme"
        elif champ == "cheveux":
            pc["couleur_cheveux"] = rng.choice([c for c in CHEVEUX if c != t["cheveux"]])
        elif champ == "yeux":
            pc["couleur_yeux"] = rng.choice([c for c in YEUX if c != t["yeux"]])
        elif champ == "taille":
            pc["taille"] = t["taille"][1] + rng.randint(3, 10)
        else:
            pc["age"] = t["age"][1] + rng.randint(3, 10)


def text_physique(rng, t, ctx):
    frags = []
    pron = "Elle" if t.get("genre") == "femme" else "Il"
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
        frags.append(rng.choice(["{p} a les cheveux {c}.", "Je me souviens de ses cheveux : {c}."]).format(
            p=pron, c="roux" if t["cheveux"] == "roux" else t["cheveux"] + "s" if t["cheveux"] in ("brun", "blond", "noir", "gris", "blanc", "châtain") else t["cheveux"]))
    if "yeux" in t:
        frags.append(rng.choice(["{p} a les yeux {c}.", "Des yeux {c}, ça ne s'oublie pas."]).format(
            p=pron, c=t["yeux"] + ("s" if t["yeux"] in ("bleu", "vert", "gris") else "")))
    return " ".join(frags)


def sql_physique(t):
    c = []
    if "genre" in t:
        c.append(f"pc.genre={q(t['genre'])}")
    if "cheveux" in t:
        c.append(f"pc.couleur_cheveux={q(t['cheveux'])}")
    if "yeux" in t:
        c.append(f"pc.couleur_yeux={q(t['yeux'])}")
    if "taille" in t:
        c.append(f"pc.taille BETWEEN {t['taille'][0]} AND {t['taille'][1]}")
    if "age" in t:
        c.append(f"pc.age BETWEEN {t['age'][0]} AND {t['age'][1]}")
    return c


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


def apply_vehicule(w, p, t, fail=None):
    rng = w.rng
    pc = w.permis[p["permis_id"]]
    marque = t.get("marque")
    if "modele" in t and not marque:
        marque = next(m for m, mods in MARQUES.items() if t["modele"] in mods)
    if marque:
        pc["marque_voiture"] = marque
        pc["modele_voiture"] = t.get("modele") or rng.choice(MARQUES[marque])
    plaque = rand_plate(rng)
    if "plaque_debut" in t:
        plaque = t["plaque_debut"] + plaque[len(t["plaque_debut"]):]
    if "plaque_fin" in t:
        plaque = plaque[:-len(t["plaque_fin"])] + t["plaque_fin"]
    if "plaque_contient" in t:
        frag = t["plaque_contient"]
        pos = rng.randint(0, len(plaque) - len(frag))
        plaque = plaque[:pos] + frag + plaque[pos + len(frag):]
    pc["immatriculation"] = plaque
    if fail:
        champ = fail
        if champ == "marque":
            m = rng.choice([m for m in MARQUES if m != marque])
            pc["marque_voiture"], pc["modele_voiture"] = m, rng.choice(MARQUES[m])
        elif champ == "modele":
            others = [m for m in MARQUES[marque] if m != t["modele"]]
            if others:
                pc["modele_voiture"] = rng.choice(others)
            else:
                m = rng.choice([m for m in MARQUES if m != marque])
                pc["marque_voiture"], pc["modele_voiture"] = m, rng.choice(MARQUES[m])
        else:
            pc["immatriculation"] = rand_plate(rng)


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


def sql_vehicule(t):
    c = []
    if t.get("marque"):
        c.append(f"pc.marque_voiture={q(t['marque'])}")
    if t.get("modele"):
        c.append(f"pc.modele_voiture={q(t['modele'])}")
    if "plaque_debut" in t:
        c.append(f"pc.immatriculation LIKE {q(t['plaque_debut'] + '%')}")
    if "plaque_fin" in t:
        c.append(f"pc.immatriculation LIKE {q('%' + t['plaque_fin'])}")
    if "plaque_contient" in t:
        c.append(f"pc.immatriculation LIKE {q('%' + t['plaque_contient'] + '%')}")
    return c


def draw_salle(rng, t):
    t = dict(t)
    if t.get("statut") == "?":
        t["statut"] = rng.choice(["or", "argent", "standard"])
    for k in ("id_debut", "id_contient"):
        if t.get(k) == "?":
            t[k] = rng.choice("0123456789") + rng.choice(LETTRES)
    if t.get("entre") == "?":
        h = rng.randint(7, 20) * 100
        t["entre"], t["et"] = h, h + 100
    return t


def apply_salle(w, p, t, fail=None):
    rng = w.rng
    mid = None
    if "id_debut" in t:
        mid = t["id_debut"] + rand_member_id(rng)[len(t["id_debut"]):]
    elif "id_contient" in t:
        base = rand_member_id(rng)
        pos = rng.randint(0, len(base) - len(t["id_contient"]))
        mid = base[:pos] + t["id_contient"] + base[pos + len(t["id_contient"]):]
    m = w.new_membre(p, mid=mid, statut=t.get("statut"))
    if "passage" in t:
        entree = rng.randint(t["entre"] // 100, t["et"] // 100 - 1) * 100 + rng.choice([0, 15, 30, 45]) \
            if "entre" in t else None
        w.add_passage(m["id"], t["passage"], entree)
    if fail:
        champ = fail
        if champ == "statut":
            m["statut_abonnement"] = rng.choice([s for s in ("or", "argent", "standard") if s != t["statut"]])
        elif champ in ("id_debut", "id_contient"):
            del w.membres[m["id"]]
            nouveau = w.new_membre(p, statut=m["statut_abonnement"])
            for pa in w.passages:
                if pa["membre_id"] == m["id"]:
                    pa["membre_id"] = nouveau["id"]
        else:  # passage (autre jour) ou entre/et (même jour, hors créneau)
            for pa in w.passages:
                if pa["membre_id"] == m["id"] and pa["date_passage"] == t["passage"]:
                    if champ in ("entre", "et"):
                        pa["heure_entree"] = (t["et"] // 100 + rng.randint(1, 2)) * 100
                        pa["heure_sortie"] = pa["heure_entree"] + 45
                    else:
                        pa["date_passage"] = t["passage"] + rng.choice([-2, -1, 1, 2])


def text_salle(rng, t, ctx):
    pron = "Elle" if ctx.get("genre") == "femme" else "Il"
    frags = []
    if t.get("statut") or "id_debut" in t or "id_contient" in t:
        s = rng.choice(["{p} avait un sac de la salle de sport « {salle} »", "{p} portait un sac « {salle} »"]).format(
            p=pron, salle=SALLE)
        if "id_debut" in t:
            s += f", le numéro de membre dessus commençait par « {t['id_debut']} »"
        elif "id_contient" in t:
            s += f", le numéro de membre dessus contenait « {t['id_contient']} »"
        s += "."
        if t.get("statut"):
            s += " " + rng.choice(["Seuls les membres « {s} » ont ces sacs.",
                                   "Ce sac, c'est celui des membres « {s} »."]).format(s=t["statut"])
        frags.append(s)
    elif t.get("statut"):
        frags.append(f"{pron} est membre « {t['statut']} » de la salle de sport « {SALLE} ».")
    if "passage" in t:
        s = rng.choice(["{p} est passé{e} à la salle de sport le {d}", "Je l'ai vu{e} à la salle le {d}"]).format(
            p=pron, e="e" if ctx.get("genre") == "femme" else "", d=date_fr(t["passage"]))
        if "entre" in t:
            s += f", entre {heure_fr(t['entre'])} et {heure_fr(t['et'])}"
        frags.append(s + ".")
    return " ".join(frags)


def sql_salle(t):
    c = []
    if t.get("statut"):
        c.append(f"m.statut_abonnement={q(t['statut'])}")
    if "id_debut" in t:
        c.append(f"m.id LIKE {q(t['id_debut'] + '%')}")
    if "id_contient" in t:
        c.append(f"m.id LIKE {q('%' + t['id_contient'] + '%')}")
    if "passage" in t:
        c.append(f"s.date_passage={t['passage']}")
        if "entre" in t:
            c.append(f"s.heure_entree BETWEEN {t['entre']} AND {t['et']}")
    return c


def draw_evenement(rng, t):
    t = dict(t)
    if t.get("nom") == "?":
        t["nom"] = rng.choice(EVENEMENTS)
    if t.get("fois") == "?":
        t["fois"] = rng.randint(2, 3)
    return t


def _dates_dans(rng, t, n):
    if "mois" in t:
        return [t["mois"] * 100 + d for d in sorted(rng.sample(range(1, 29), n))]
    if "date" in t:
        return [t["date"]] * n
    return [rand_date(rng) for _ in range(n)]


def apply_evenement(w, p, t, fail=None):
    rng = w.rng
    n = t.get("fois", 1)
    dates = _dates_dans(rng, t, n)
    if "date" in t and "mois" in t:
        dates[0] = t["date"]
    if fail:
        if fail == "fois":
            dates = dates[:n - 1] if n > 1 else dates + [rand_date(rng)]
        elif fail in ("mois", "date"):
            dates = [d + 100 if (d // 100) % 100 < 12 else d - 100 for d in dates]
        else:  # nom
            for d in dates:
                w.add_participation(p["id"], rng.choice([e for e in EVENEMENTS if e != t["nom"]]), d)
            return
    for d in dates:
        w.add_participation(p["id"], t["nom"], d)


def text_evenement(rng, t, ctx):
    pron = "Elle" if ctx.get("genre") == "femme" else "Il"
    n = t.get("fois", 1)
    fois = {1: "une fois", 2: "deux fois", 3: "trois fois", 4: "quatre fois"}.get(n, f"{n} fois")
    s = rng.choice(["{p} a assisté {f} à l'événement « {e} »", "Je l'ai croisé{ee} {f} à l'événement « {e} »",
                    "{p} est allé{ee} {f} à l'événement « {e} »"]).format(
        p=pron, ee="e" if ctx.get("genre") == "femme" else "", f=fois, e=t["nom"])
    if "mois" in t:
        s += f" en {mois_fr(t['mois'] * 100 + 1)}"
    elif "date" in t:
        s += f" le {date_fr(t['date'])}"
    return s + "."


def sql_evenement(t):
    c = [f"e.nom_evenement={q(t['nom'])}"]
    if "mois" in t:
        c.append(f"e.date BETWEEN {t['mois'] * 100 + 1} AND {t['mois'] * 100 + 31}")
    elif "date" in t:
        c.append(f"e.date={t['date']}")
    return c


def draw_revenu(rng, t):
    t = dict(t)
    if t.get("min") == "?":
        t["min"] = rng.choice([100, 150, 200, 250]) * 1000
    if t.get("max") == "?":
        t["max"] = rng.choice([15, 20, 25]) * 1000
    return t


def apply_revenu(w, p, t, fail=None):
    rng = w.rng
    lo, hi = t.get("min", 10000), t.get("max", 400000)
    w.revenus[p["nir"]] = rng.randint(lo // 1000, hi // 1000) * 1000
    if fail:
        w.revenus[p["nir"]] = (t["min"] - rng.randint(5, 50) * 1000) if "min" in t else (t["max"] + rng.randint(5, 50) * 1000)


def text_revenu(rng, t, ctx):
    pron = "Elle" if ctx.get("genre") == "femme" else "Il"
    if "min" in t:
        return rng.choice(["{p} gagne plus de {v} € par an.", "{p} a beaucoup d'argent : plus de {v} € par an."]).format(
            p=pron, v=f"{t['min']:,}".replace(",", " "))
    return rng.choice(["{p} gagne moins de {v} € par an.", "{p} n'est pas riche, moins de {v} € par an."]).format(
        p=pron, v=f"{t['max']:,}".replace(",", " "))


def sql_revenu(t):
    c = []
    if "min" in t:
        c.append(f"r.revenu_annuel>{t['min']}")
    if "max" in t:
        c.append(f"r.revenu_annuel<{t['max']}")
    return c


def draw_adresse(rng, t):
    t = dict(t)
    if t.get("rue") == "?":
        t["rue"] = f"{rng.choice(RUES_PREFIX)} {rng.choice(RUES_SUFFIX)}"
    if t.get("numero") == "?":
        base = rng.randint(1, 80) * 10
        t["numero"] = [base, base + rng.choice([50, 100])]
    return t


def apply_adresse(w, p, t, fail=None):
    rng = w.rng
    p["nom_rue"] = t["rue"]
    if "numero" in t:
        p["numero_rue"] = rng.randint(*t["numero"])
    if fail:
        if fail == "numero":
            p["numero_rue"] = t["numero"][1] + rng.randint(5, 100)
        else:
            p["nom_rue"] = rng.choice([r for r in w.rues if r != t["rue"]])


def text_adresse(rng, t, ctx):
    pron = "Elle" if ctx.get("genre") == "femme" else "Il"
    s = rng.choice(["{p} habite « {r} »", "Je sais qu'{pp} habite « {r} »"]).format(p=pron, pp=pron.lower(), r=t["rue"])
    if "numero" in t:
        s += f", à un numéro compris entre {t['numero'][0]} et {t['numero'][1]}"
    return s + "."


def sql_adresse(t):
    c = [f"p.nom_rue={q(t['rue'])}"]
    if "numero" in t:
        c.append(f"p.numero_rue BETWEEN {t['numero'][0]} AND {t['numero'][1]}")
    return c


GROUPES = {
    "physique": (draw_physique, apply_physique, text_physique, sql_physique),
    "vehicule": (draw_vehicule, apply_vehicule, text_vehicule, sql_vehicule),
    "salle": (draw_salle, apply_salle, text_salle, sql_salle),
    "evenement": (draw_evenement, apply_evenement, text_evenement, sql_evenement),
    "revenu": (draw_revenu, apply_revenu, text_revenu, sql_revenu),
    "adresse": (draw_adresse, apply_adresse, text_adresse, sql_adresse),
}

# ---------------------------------------------------------------- repérage (comment on trouve un témoin)
#
# position = "dernier" | "premier" : numéro max/min de la rue
# prenom = "..." (+ numero = [a, b])  : prénom sur la rue
# revenu = "max" | "min"             : revenu extrême de la rue


def apply_reperage(w, p, r):
    rng = w.rng
    rue = r["rue"]
    if rue not in w.rues:
        w.rues.append(rue)
    voisins = [x for x in w.personnes.values() if x["nom_rue"] == rue and x["id"] != p["id"]]
    if len(voisins) < 8:  # on peuple un peu la rue
        for _ in range(8 - len(voisins)):
            v = w.new_personne()
            v["nom_rue"] = rue
            v["numero_rue"] = rng.randint(1, 500)
            voisins.append(v)
    p["nom_rue"] = rue
    if r.get("position") == "dernier":
        p["numero_rue"] = max(v["numero_rue"] for v in voisins) + rng.randint(2, 40)
    elif r.get("position") == "premier":
        p["numero_rue"] = 1
        for v in voisins:
            v["numero_rue"] = max(v["numero_rue"], 2)
    elif "prenom" in r:
        prenom = p["nom"].split()[0]
        if "numero" in r:
            p["numero_rue"] = rng.randint(*r["numero"])
            # homonymes hors intervalle
            for num in (r["numero"][0] - rng.randint(1, 30), r["numero"][1] + rng.randint(1, 50)):
                v = w.new_personne(w.new_nom(prenom))
                v["nom_rue"], v["numero_rue"] = rue, max(1, num)
        for v in voisins:
            if v["nom"].split()[0] == prenom:
                v["nom_rue"] = rng.choice([x for x in w.rues if x != rue])
        # un homonyme ailleurs en ville
        w.new_personne(w.new_nom(prenom))
    elif r.get("revenu") in ("max", "min"):
        vals = [w.revenus.get(v["nir"], 0) for v in voisins]
        w.revenus[p["nir"]] = (max(vals) + rng.randint(5, 40) * 1000) if r["revenu"] == "max" \
            else max(1000, min(v for v in vals if v) - rng.randint(1, 5) * 1000)
    else:
        raise ConfigError(f"reperage inconnu : {r}")


def text_reperage(rng, p, r):
    rue = r["rue"]
    genre_f = r.get("genre") == "femme"
    if r.get("position") == "dernier":
        return rng.choice(["habite la dernière maison de « {r} »", "vit au dernier numéro de « {r} »"]).format(r=rue)
    if r.get("position") == "premier":
        return rng.choice(["habite au plus petit numéro de « {r} »", "vit au tout premier numéro de « {r} »"]).format(r=rue)
    if "prenom" in r:
        s = f"se prénomme {p['nom'].split()[0]} et habite "
        if "numero" in r:
            s += f"« {rue} » à un numéro compris entre {r['numero'][0]} et {r['numero'][1]}"
        else:
            s += f"quelque part sur « {rue} »"
        return s
    if r.get("revenu") == "max":
        return f"est la personne au revenu le plus élevé de « {rue} »"
    return f"est la personne au revenu le plus faible de « {rue} »"


def sql_reperage(r):
    rue = q(r["rue"])
    if r.get("position") == "dernier":
        return f"SELECT nom FROM personne WHERE nom_rue={rue} ORDER BY numero_rue DESC LIMIT 1"
    if r.get("position") == "premier":
        return f"SELECT nom FROM personne WHERE nom_rue={rue} ORDER BY numero_rue ASC LIMIT 1"
    if "prenom" in r:
        s = f"SELECT nom FROM personne WHERE nom_rue={rue} AND nom LIKE {q(r['prenom'] + ' %')}"
        if "numero" in r:
            s += f" AND numero_rue BETWEEN {r['numero'][0]} AND {r['numero'][1]}"
        return s
    order = "DESC" if r["revenu"] == "max" else "ASC"
    return (f"SELECT p.nom FROM personne p JOIN revenu r ON r.nir=p.nir WHERE p.nom_rue={rue} "
            f"ORDER BY r.revenu_annuel {order} LIMIT 1")


def sql_traits(traits):
    """Requête d'identification à partir des groupes révélés."""
    joins, where = [], []
    if "physique" in traits or "vehicule" in traits:
        joins.append("JOIN permis_conduire pc ON pc.id=p.permis_id")
    if "revenu" in traits:
        joins.append("JOIN revenu r ON r.nir=p.nir")
    if "salle" in traits:
        joins.append("JOIN salle_sport_membre m ON m.personne_id=p.id")
        if "passage" in traits["salle"]:
            joins.append("JOIN salle_sport_passage s ON s.membre_id=m.id")
    if "evenement" in traits:
        joins.append("JOIN evenement_participation e ON e.personne_id=p.id")
    for g, t in traits.items():
        where += GROUPES[g][3](t)
    sql = f"SELECT p.nom FROM personne p {' '.join(joins)} WHERE {' AND '.join(where) or 1}"
    if "evenement" in traits:
        sql += f" GROUP BY p.id HAVING COUNT(DISTINCT e.date)={traits['evenement'].get('fois', 1)}"
    elif "salle" in traits and "passage" in traits["salle"]:
        sql += " GROUP BY p.id"
    return sql


# ---------------------------------------------------------------- indices et solutions (markdown inclus dans le TP)

SOL_DIR = os.path.join(OUT, "solutions")

def format_sql(sql):
    """Met en forme une requête du corrigé : une ligne par JOIN / condition."""
    sql = re.sub(r" (JOIN|WHERE|GROUP BY|ORDER BY) ", r"\n\1 ", sql)
    sql = re.sub(r" AND (?!\d)", "\n  AND ", sql)   # pas le AND d'un BETWEEN
    sql = sql.replace("\nGROUP BY", "\nGROUP BY").replace(" HAVING ", "\nHAVING ")
    return sql + ";"


def indice_reperage(r):
    if r.get("position") == "dernier":
        return f"le numéro le plus grand de « {r['rue']} » : `ORDER BY numero_rue DESC LIMIT 1`"
    if r.get("position") == "premier":
        return f"le numéro le plus petit de « {r['rue']} » : `ORDER BY numero_rue ASC LIMIT 1`"
    if "prenom" in r:
        s = f"un prénom sur « {r['rue']} » : `nom LIKE '{r['prenom']} %'`"
        if "numero" in r:
            s += f" et `numero_rue BETWEEN {r['numero'][0]} AND {r['numero'][1]}`"
        return s
    return (f"le revenu le plus {'élevé' if r['revenu'] == 'max' else 'faible'} de « {r['rue']} » : "
            f"jointure avec `revenu` puis `ORDER BY revenu_annuel {'DESC' if r['revenu'] == 'max' else 'ASC'} LIMIT 1`")


INDICE_GROUPE = {
    "physique": "la description physique (genre, cheveux, yeux, taille, âge) est dans `permis_conduire`, "
                "les intervalles se filtrent avec `BETWEEN`",
    "vehicule": "la voiture et la plaque sont dans `permis_conduire` ; un fragment de plaque se cherche avec "
                "`LIKE` (`'abc%'` commence par, `'%abc'` se termine par, `'%abc%'` contient)",
    "salle": "la salle de sport, c'est `salle_sport_membre` (statut, numéro de membre avec `LIKE`) et "
             "`salle_sport_passage` (date, créneau avec `heure_entree BETWEEN …`)",
    "evenement": "les participations sont dans `evenement_participation` ; pour « n fois », comptez avec "
                 "`GROUP BY personne_id HAVING COUNT(*) = n`",
    "revenu": "le revenu est dans `revenu`, reliée par `nir`",
    "adresse": "la rue (et le numéro) sont directement dans `personne`",
}


def ecrire_solutions(h, persos, corriges):
    """Fichier markdown : indices dégressifs puis solution complète, à inclure dans le TP."""
    os.makedirs(SOL_DIR, exist_ok=True)
    # ordre narratif : témoins dans l'ordre du rapport, puis chaîne des réponses, fausses pistes à leur place
    ordre = [c for c, _ in PLACEHOLDER.findall(h["rapport"])]
    for txt_key in list(ordre):
        for c, _ in PLACEHOLDER.findall(persos[txt_key].get("dit", "")):
            if c not in ordre:
                ordre.append(c)
    for key, pc in persos.items():
        if key not in ordre:
            ordre.append(key)
    # découverte en profondeur : qui révèle qui
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

    n = 0
    if temoins:
        n += 1
        lignes.append(f"::: details Indice {n} : les témoins")
        for k in temoins:
            lignes.append(f"- {indice_reperage(dict(persos[k]['reperage'], prenom=persos[k]['nom'].split()[0]))}.")
        lignes.append("\nUne fois trouvés, lisez leur `interrogatoire` (jointure sur `personne_id`).")
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
            lignes.append(f"- **{g}** : {INDICE_GROUPE[g]}.")
        lignes.append("\nPartez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes "
                      "diminue à chaque condition.")
        if pc.get("dit") and PLACEHOLDER.search(pc["dit"]):
            lignes.append("Une fois validé, lisez son interrogatoire : l'enquête continue.")
        lignes.append(":::\n")

    lignes.append("::: details Voir l'une des solutions possibles")
    lignes.append("```sql")
    for k in temoins:
        lignes.append(f"-- Témoin : {persos[k]['nom']}")
        lignes.append(format_sql(corriges[f"{k} (repérage)"]) + "\n")
    noms_temoins = ", ".join(q(persos[k]["nom"]) for k in temoins)
    if temoins:
        lignes.append("-- Leurs interrogatoires")
        lignes.append("SELECT p.nom, i.transcription FROM interrogatoire i\nJOIN personne p ON p.id = i.personne_id"
                      f"\nWHERE p.nom IN ({noms_temoins});\n")
    for k in suspects:
        pc = persos[k]
        lignes.append(f"-- {'Fausse piste' if 'reponse' not in pc else 'Réponse ' + str(pc['reponse'])} : {pc['nom']}")
        lignes.append(format_sql(corriges[f"{k} (indices)"]))
        if "message" in pc:
            lignes.append(f"INSERT INTO solution VALUES (1, {q(pc['nom'])});\nSELECT valeur FROM solution;\n")
    lignes.append("```")
    lignes.append(":::")
    with open(os.path.join(SOL_DIR, f"{h['id']}.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lignes) + "\n")


# ---------------------------------------------------------------- construction d'une histoire

PLACEHOLDER = re.compile(r"\{(\w+)(?::(\w+))?\}")


def entree_index(h, persos):
    reponses = sorted((pc["reponse"], key) for key, pc in persos.items() if "reponse" in pc)
    import hashlib
    empreintes = [hashlib.sha256(persos[key]["nom"].lower().encode()).hexdigest() for _, key in reponses]
    return {"empreintes": empreintes,"ordre": h.get("ordre", 99), "id": h["id"], "titre": h["titre"], "fichier": f"{h['id']}.sqlite",
            "date": date_fr(h["date"]), "date_sql": h["date"], "type": h["type"], "brief": h["brief"],
            "etapes": [key for _, key in reponses]}


def build(cfg_path, force=False):
    with open(cfg_path, "rb") as f:
        cfg = tomllib.load(f)
    h = cfg["histoire"]
    persos = cfg.get("personnage", {})
    path = os.path.join(OUT, f"{h['id']}.sqlite")
    if os.path.exists(path) and not force:
        print(f"--  {h['id']}.sqlite existe déjà, conservé (utilisez --force pour le régénérer)")
        return entree_index(h, persos), None
    w = World(h.get("seed", 1))
    rng = w.rng

    # 1. tirage des valeurs "?" et création des personnes
    people, traits, reperages = {}, {}, {}
    for key, pc in persos.items():
        nom = pc.get("nom") or w.new_nom()
        p = w.new_personne(nom)
        people[key] = p
        traits[key] = {g: GROUPES[g][0](rng, t) for g, t in pc.get("traits", {}).items()}
        if "reperage" in pc:
            reperages[key] = dict(pc["reperage"])
            if "prenom" in reperages[key]:
                reperages[key]["prenom"] = nom.split()[0]
            reperages[key]["genre"] = pc.get("genre", "homme")
        else:
            reperages[key] = None

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
            print(f"   avertissement : traits de {key} jamais révélés : {', '.join(oublies)}")

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
                leurre = w.new_personne()
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

    w.rapports.append({"date": h["date"], "type": h["type"], "ville": VILLE_ENQUETE, "description": render(h["rapport"])})
    for r in h.get("rapports_leurres", []):
        w.rapports.append({"date": r.get("date", h["date"]), "type": r.get("type", h["type"]),
                           "ville": r.get("ville", VILLE_ENQUETE), "description": r["description"]})
    for key, pc in persos.items():
        if pc.get("dit"):
            w.interrogatoires[people[key]["id"]] = render(pc["dit"])

    # 5. trigger
    reponses = sorted((pc["reponse"], key) for key, pc in persos.items() if "reponse" in pc)
    if not reponses:
        raise ConfigError("aucun personnage avec `reponse = n`")
    # tout personnage avec un `message` répond au trigger (les fausses pistes ont un message mais pas de `reponse`)
    cas = " ".join(f"WHEN lower(trim(new.valeur)) == {q(people[key]['nom'].lower())} THEN {q(pc['message'])}"
                   for key, pc in persos.items() if "message" in pc)
    w.write(path, cas)

    # 6. vérifications
    con = sqlite3.connect(path)
    checks = []
    for key in persos:
        if reperages[key]:
            checks.append((f"{key} (repérage)", sql_reperage(reperages[key]), people[key]["nom"]))
        if reveles[key]:
            checks.append((f"{key} (indices)", sql_traits({g: traits[key][g] for g in reveles[key]}), people[key]["nom"]))
    solutions = {}
    for label, sql, attendu in checks:
        rows = con.execute(sql).fetchall()
        if len(rows) != 1 or rows[0][0] != attendu:
            raise AssertionError(f"{h['id']} / {label} : attendu {attendu!r}, obtenu {rows}\n{sql}")
        solutions[label] = sql
    con.execute("INSERT INTO solution VALUES (1, 'Personne Inconnue')")
    assert "pas la bonne" in con.execute("SELECT valeur FROM solution").fetchone()[0]
    con.close()
    print(f"OK  {h['id']}.sqlite ({os.path.getsize(path) // 1024} Ko)")

    return entree_index(h, persos), solutions


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
    print("Pour une nouvelle histoire, ajoutez dans tp/php/sql/enquete.md :")
    print("  <!--@include: ../../../public/sqlite/enquete/solutions/<id>.md-->")
