# POO : La programmation orientée objet

Nom : ______________________  Prénom : ______________________

**Question 1 — La POO**

Qu'est-ce que la programmation orientée objet (POO) ?

- ☐ **a.** Une méthode pour écrire du code plus court
- ☐ **b.** Un langage de programmation inventé par PHP
- ☐ **c.** Un paradigme de programmation qui utilise des objets pour représenter des entités du monde réel
- ☐ **d.** Un outil de gestion de base de données

**Question 2 — Les avantages**

Parmi ces éléments, lesquels sont des avantages de la POO ? (plusieurs réponses attendues)

*Plusieurs réponses possibles.*

- ☐ **a.** L'héritage : on peut créer des classes à partir d'autres classes
- ☐ **b.** Le code n'a plus besoin d'être testé
- ☐ **c.** L'exécution du programme est toujours plus rapide
- ☐ **d.** La réutilisation : on peut réutiliser des classes existantes
- ☐ **e.** L'encapsulation : on peut cacher les données et les méthodes

**Question 3 — Classe et objet**

Quelle est la différence entre une classe et un objet ?

- ☐ **a.** La classe est en PHP, l'objet est en Java
- ☐ **b.** La classe est le moule (la définition), l'objet est une instance créée à partir de ce moule
- ☐ **c.** C'est la même chose, ce sont deux synonymes
- ☐ **d.** L'objet est le moule, la classe est l'instance

**Question 4 — Créer un objet**

Quel mot-clé permet, dans la plupart des langages (PHP, Java, C#), de créer un objet à partir d'une classe ?

Réponse : ________________________________________

**Question 5 — Instancier**

Que signifie « instancier » ?

- ☐ **a.** Documenter une classe
- ☐ **b.** Supprimer un objet de la mémoire
- ☐ **c.** Créer un objet à partir d'une classe
- ☐ **d.** Copier une classe dans une autre

**Question 6 — Composition d'une classe**

De quoi est composée une classe ?

- ☐ **a.** De pages HTML et de CSS
- ☐ **b.** Uniquement de fonctions
- ☐ **c.** D'attributs (les données) et de méthodes (les actions), chacun avec une visibilité
- ☐ **d.** Uniquement de variables

**Question 7 — Les visibilités**

Associez chaque visibilité à ce qu'elle autorise.

| | À relier à… |
|---|---|
| private → ______ | • Accessible uniquement en lecture |
| public → ______ | • Accessible seulement depuis l'objet lui-même |
| protected → ______ | • Comme private, mais accessible depuis la classe fille en cas d'héritage |
|  | • Accessible seulement depuis les méthodes statiques |
|  | • Accessible depuis n'importe où |

**Question 8 — Le constructeur**

Quel est le rôle du constructeur d'une classe ?

- ☐ **a.** Créer la table correspondante dans la base de données
- ☐ **b.** Initialiser les attributs de l'objet, il est appelé automatiquement lors du new
- ☐ **c.** Détruire l'objet quand on n'en a plus besoin
- ☐ **d.** Compiler la classe avant son utilisation

**Question 9 — Vrai ou Faux - Constructeurs**

Une classe peut définir plusieurs constructeurs avec des paramètres différents.

☐ Vrai  ☐ Faux

**Question 10 — Getter et setter**

Comment appelle-t-on les méthodes qui permettent de lire et de modifier les propriétés d'un objet ?

- ☐ **a.** Les accesseurs (getter) pour lire et les mutateurs (setter) pour modifier
- ☐ **b.** Les readers et les writers
- ☐ **c.** Les méthodes statiques et dynamiques
- ☐ **d.** Les constructeurs et les destructeurs

**Question 11 — L'encapsulation**

En quoi consiste l'encapsulation ?

- ☐ **a.** Cacher l'implémentation de l'objet en empêchant l'accès direct aux données autrement que par les méthodes proposées
- ☐ **b.** Protéger le code source par un mot de passe
- ☐ **c.** Regrouper toutes les classes dans un seul fichier
- ☐ **d.** Compresser le code pour qu'il prenne moins de place

**Question 12 — La surcharge**

La surcharge permet de définir plusieurs méthodes portant le même nom, à condition qu'elles aient des ______ différents (type et/ou ordre).

(a) commentaires / (b) visibilités / (c) paramètres / (d) valeurs de retour

**Question 13 — Le this**

Dans une méthode, que désigne $this (PHP) ou this (Java, C#) ?

- ☐ **a.** Une variable globale du programme
- ☐ **b.** La classe mère
- ☐ **c.** Le premier objet créé dans le programme
- ☐ **d.** L'objet courant, celui sur lequel la méthode est appelée

**Question 14 — Identifier un héritage**

Quelle question permet de savoir si une relation entre deux classes est un héritage ?

- ☐ **a.** Les deux classes sont-elles dans le même fichier ?
- ☐ **b.** Les deux classes ont-elles le même nombre de méthodes ?
- ☐ **c.** Peut-on dire « possède un » ?
- ☐ **d.** Peut-on dire « est un » ?

**Question 15 — Un bon héritage**

Parmi ces relations, laquelle est un héritage valide ?

- ☐ **a.** Une Entreprise est une Personne
- ☐ **b.** Une Voiture est un Véhicule
- ☐ **c.** Un Étudiant est un Devoir
- ☐ **d.** Un Pompier est un Camion

**Question 16 — Le mot-clé**

Quel mot-clé permet de définir une classe enfant en PHP et en Java (exemple : class Humain … Mammifere) ?

Réponse : ________________________________________

**Question 17 — Mère et fille**

Dans un héritage, comment répartit-on la logique entre la classe mère et la classe fille ?

- ☐ **a.** La classe mère contient tout, la fille est toujours vide
- ☐ **b.** La classe fille contient tout, la mère ne sert qu'à donner un nom
- ☐ **c.** La logique est dupliquée dans les deux classes
- ☐ **d.** La classe mère contient la logique partagée, la classe fille la logique spécifique

**Question 18 — Appeler le parent**

Depuis une classe fille, comment appelle-t-on une méthode de la classe mère ?

- ☐ **a.** mere.maMethode()
- ☐ **b.** this.parent.maMethode()
- ☐ **c.** Ce n'est pas possible
- ☐ **d.** parent::maMethode() en PHP, super.maMethode() en Java

**Question 19 — La redéfinition**

Qu'est-ce que la redéfinition (remplacement de méthode) ?

- ☐ **a.** Définir dans la classe fille une méthode avec exactement la même signature que dans la classe mère, pour en remplacer le comportement
- ☐ **b.** Définir deux méthodes de même nom avec des paramètres différents
- ☐ **c.** Supprimer une méthode héritée
- ☐ **d.** Renommer une méthode dans la classe fille

**Question 20 — Vrai ou Faux - Redéfinition**

On parle de redéfinition de méthode même en dehors de tout héritage.

☐ Vrai  ☐ Faux

**Question 21 — Lire un héritage**

La classe Humain hérite de Mammifere et redéfinit la méthode manger(). Mammifere::manger() affiche « Je mange », Humain::manger() affiche « Je suis omnivore ». Qu'affiche $unHumain-&gt;manger() ?

- ☐ **a.** Je mange
- ☐ **b.** Je mange puis Je suis omnivore
- ☐ **c.** Une erreur, une méthode ne peut pas être redéfinie
- ☐ **d.** Je suis omnivore

**Question 22 — Le polymorphisme**

Comment peut-on définir le polymorphisme ?

- ☐ **a.** La conversion automatique des types de variables
- ☐ **b.** Le fait qu'une classe possède plusieurs attributs
- ☐ **c.** La capacité de choisir dynamiquement la méthode qui correspond au type réel de l'objet
- ☐ **d.** La possibilité de créer plusieurs objets d'une même classe

**Question 23 — Polymorphisme et collections**

Grâce au polymorphisme, que peut-on faire avec une liste typée sur une classe mère (ex. List&lt;MachineVolante&gt;) ?

- ☐ **a.** Convertir automatiquement les objets en chaînes de caractères
- ☐ **b.** Rien de particulier, une liste ne peut contenir qu'un seul type exact
- ☐ **c.** Y ranger n'importe quel objet, même sans lien avec MachineVolante
- ☐ **d.** Y ranger des objets de classes filles différentes (Mig29, Helicoptere…) et appeler leurs méthodes sans connaître leur type précis

**Question 24 — Les méthodes statiques**

Quelle est la particularité d'une méthode statique ?

- ☐ **a.** Elle est forcément privée
- ☐ **b.** Elle ne peut pas retourner de valeur
- ☐ **c.** Elle est plus lente qu'une méthode classique
- ☐ **d.** Elle peut être appelée sans instancier d'objet

**Question 25 — Clin d'œil**

La méthode statique laReponseDeLunivers() de la cheatsheet retourne un nombre bien connu. Lequel ?

Réponse : ________________________________________

**Question 26 — Les classes abstraites**

Quelle est la particularité d'une classe abstraite ?

- ☐ **a.** Elle ne peut pas avoir de classe fille
- ☐ **b.** Elle ne contient que des attributs
- ☐ **c.** Elle est automatiquement supprimée à la fin du programme
- ☐ **d.** Elle ne peut pas être instanciée et sert de modèle à ses classes filles

**Question 27 — Vrai ou Faux - Classes abstraites**

Une classe abstraite peut contenir à la fois des méthodes abstraites (sans code) et des méthodes concrètes (avec du code).

☐ Vrai  ☐ Faux

**Question 28 — Les interfaces**

Qu'est-ce qu'une interface ?

- ☐ **a.** Un contrat sans code : la classe qui l'implémente doit obligatoirement définir toutes ses méthodes
- ☐ **b.** Une classe avec uniquement des attributs publics
- ☐ **c.** Une classe qui hérite de plusieurs classes
- ☐ **d.** La partie graphique d'une application

**Question 29 — Abstraite ou interface ?**

Quelle est la différence de rôle entre une classe abstraite et une interface ?

- ☐ **a.** La classe abstraite est instanciable, pas l'interface
- ☐ **b.** Aucune, ce sont deux noms pour la même notion
- ☐ **c.** L'interface contient du code, la classe abstraite n'en contient pas
- ☐ **d.** La classe abstraite sert à factoriser du code, l'interface à définir un contrat de service

**Question 30 — Les namespaces**

À quoi servent les namespaces ?

- ☐ **a.** À rendre les classes privées
- ☐ **b.** À accélérer le chargement des classes
- ☐ **c.** À traduire les noms des classes en plusieurs langues
- ☐ **d.** À organiser les classes en groupes et à distinguer des classes portant le même nom


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (c) Un paradigme de programmation qui utilise des objets pour représenter des entités du monde réel — *Exact, les objets sont des instances de classes qui contiennent des données et des méthodes.*

**2.** (a) L'héritage : on peut créer des classes à partir d'autres classes ; (d) La réutilisation : on peut réutiliser des classes existantes ; (e) L'encapsulation : on peut cacher les données et les méthodes — *Exact. / Exact. / Exact.*

**3.** (b) La classe est le moule (la définition), l'objet est une instance créée à partir de ce moule — *Exact : la classe Personne définit, l'objet $personne1 représente une personne précise.*

**4.** new

**5.** (c) Créer un objet à partir d'une classe — *Exact : créer un objet == instancier.*

**6.** (c) D'attributs (les données) et de méthodes (les actions), chacun avec une visibilité — *Exact : par exemple nom, prenom et identite(), age().*

**7.** private → Accessible seulement depuis l'objet lui-même ; public → Accessible depuis n'importe où ; protected → Comme private, mais accessible depuis la classe fille en cas d'héritage

**8.** (b) Initialiser les attributs de l'objet, il est appelé automatiquement lors du new — *Exact, il garantit que les objets sont initialisés de manière cohérente.*

**9.** Vrai — *Exact, c'est la surcharge appliquée au constructeur.*

**10.** (a) Les accesseurs (getter) pour lire et les mutateurs (setter) pour modifier — *Exact : getSalaire() lit, setSalaire() modifie.*

**11.** (a) Cacher l'implémentation de l'objet en empêchant l'accès direct aux données autrement que par les méthodes proposées — *Exact, c'est une des raisons pour lesquelles la POO favorise un développement sécurisé.*

**12.** (c) paramètres

**13.** (d) L'objet courant, celui sur lequel la méthode est appelée — *Exact : $this-&gt;nom accède à l'attribut nom de l'objet en cours.*

**14.** (d) Peut-on dire « est un » ? — *Exact : une Voiture « est un » Véhicule, il y a héritage.*

**15.** (b) Une Voiture est un Véhicule — *Exact, on peut dire « est un ».*

**16.** extends

**17.** (d) La classe mère contient la logique partagée, la classe fille la logique spécifique — *Exact, c'est le principe de généralisation.*

**18.** (d) parent::maMethode() en PHP, super.maMethode() en Java — *Exact, utile notamment pour spécialiser une méthode en la complétant.*

**19.** (a) Définir dans la classe fille une méthode avec exactement la même signature que dans la classe mère, pour en remplacer le comportement — *Exact, contrairement à la surcharge, la signature doit être identique.*

**20.** Faux — *Exact, c'est faux : la redéfinition n'existe que dans le cadre de l'héritage, entre classe mère et classe fille.*

**21.** (d) Je suis omnivore — *Exact, la méthode redéfinie dans la classe fille remplace celle de la mère.*

**22.** (c) La capacité de choisir dynamiquement la méthode qui correspond au type réel de l'objet — *Exact, du grec poly (plusieurs) et morphisme (forme).*

**23.** (d) Y ranger des objets de classes filles différentes (Mig29, Helicoptere…) et appeler leurs méthodes sans connaître leur type précis — *Exact, chaque objet exécute sa propre version de fly().*

**24.** (d) Elle peut être appelée sans instancier d'objet — *Exact : Personne::laReponseDeLunivers() en PHP, souvent utilisée pour des fonctions utilitaires.*

**25.** 42 — *Exact, la réponse à la grande question sur la vie, l'univers et le reste.*

**26.** (d) Elle ne peut pas être instanciée et sert de modèle à ses classes filles — *Exact, elle doit posséder au moins une méthode abstraite, implémentée par les filles.*

**27.** Vrai — *Exact : dans l'exemple, EtudiantAbstrait a des méthodes abstraites et la méthode concrète parler().*

**28.** (a) Un contrat sans code : la classe qui l'implémente doit obligatoirement définir toutes ses méthodes — *Exact, une interface ne contient que des méthodes publiques et n'est pas instanciable.*

**29.** (d) La classe abstraite sert à factoriser du code, l'interface à définir un contrat de service — *Exact, et une classe peut implémenter plusieurs interfaces alors qu'elle ne peut généralement hériter que d'une seule classe.*

**30.** (d) À organiser les classes en groupes et à distinguer des classes portant le même nom — *Exact : une classe Personne peut exister dans deux namespaces différents sans conflit.*
