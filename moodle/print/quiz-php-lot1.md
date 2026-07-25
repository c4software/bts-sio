# PHP Lot 1 : Les bases (TP1 à TP2, passage de paramètres)

Nom : ______________________  Prénom : ______________________

**Question 1 — Exécution du PHP**

Où s'exécute le code PHP d'une page web ?

- ☐ **a.** Dans le navigateur du visiteur
- ☐ **b.** Sur le serveur
- ☐ **c.** Dans la base de données
- ☐ **d.** Sur le serveur et dans le navigateur

**Question 2 — Balises PHP**

Quelles balises permettent de délimiter du code PHP dans une page ?

- ☐ **a.** &lt;php&gt; … &lt;/php&gt;
- ☐ **b.** &lt;script&gt; … &lt;/script&gt;
- ☐ **c.** &lt;?php … ?&gt;
- ☐ **d.** [php] … [/php]

**Question 3 — Affichage**

Pour afficher du texte dans la page, on utilise l'instruction ______ suivie de la chaîne de caractères à afficher.

(a) console.log / (b) echo / (c) print.text

**Question 4 — Résultat d'un echo**

Que va afficher le code suivant ? $age = 20; echo "J'ai " . $age . " ans";

- ☐ **a.** J'ai . 20 . ans
- ☐ **b.** Une erreur
- ☐ **c.** J'ai $age ans
- ☐ **d.** J'ai 20 ans

**Question 5 — Concaténation**

Quel opérateur permet de concaténer deux chaînes de caractères en PHP ?

- ☐ **a.** . (le point)
- ☐ **b.** + (le plus)
- ☐ **c.** , (la virgule)
- ☐ **d.** & (le et commercial)

**Question 6 — Les types**

Quel est le type de la valeur "42" (avec les guillemets) ?

- ☐ **a.** boolean
- ☐ **b.** string
- ☐ **c.** float
- ☐ **d.** int

**Question 7 — Paramètres d'URL**

Un visiteur ouvre la page index.php?prenom=Bart. Quelle super globale (avec le $ et les underscores) contient la valeur « Bart » ? Répondez sans les crochets ni la clé.

Réponse : ________________________________________

**Question 8 — Tableau associatif**

Comment accéder à la valeur associée à la clé "nom" dans le tableau $personne ?

- ☐ **a.** $personne-&gt;get("nom")
- ☐ **b.** $personne.nom
- ☐ **c.** $personne(nom)
- ☐ **d.** $personne["nom"]

**Question 9 — Les structures de contrôle**

Associez chaque structure à son usage principal.

| | À relier à… |
|---|---|
| while → ______ | • Exécuter un code seulement si une condition est remplie |
| for → ______ | • Répéter tant qu'une condition est vraie |
| foreach → ______ | • Répéter un nombre de fois connu à l'avance |
| if / else → ______ | • Parcourir tous les éléments d'un tableau |

**Question 10 — Comparaison**

Dans une condition if, quel opérateur permet de tester l'égalité entre deux valeurs ?

- ☐ **a.** equals
- ☐ **b.** =
- ☐ **c.** =&gt;
- ☐ **d.** ==

**Question 11 — Vrai ou Faux - if/else**

Le bloc else d'une condition est exécuté uniquement lorsque la condition du if est fausse.

☐ Vrai  ☐ Faux

**Question 12 — Les fonctions**

Quel mot-clé permet de déclarer une fonction en PHP ?

Réponse : ________________________________________

**Question 13 — Les includes**

À quoi sert l'instruction include dans un projet PHP ?

- ☐ **a.** À inclure un fichier CSS dans le HTML
- ☐ **b.** À insérer le contenu d'un autre fichier PHP à l'endroit de l'appel
- ☐ **c.** À importer une image dans la page
- ☐ **d.** À télécharger une librairie depuis Internet

**Question 14 — Les boucles**

Combien de fois le corps de la boucle suivante sera-t-il exécuté ? for ($i = 0; $i &lt; 10; $i++) { echo $i; }

Réponse : ________________________________________

**Question 15 — Les formulaires**

Un formulaire est déclaré avec method="post". Dans quelle super globale se trouvera la valeur du champ &lt;input name="phrase"&gt; après envoi ?

- ☐ **a.** $_GET["phrase"]
- ☐ **b.** $_SESSION["phrase"]
- ☐ **c.** $_POST["phrase"]
- ☐ **d.** $_FORM["phrase"]


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (b) Sur le serveur — *Exact, le client ne reçoit que le HTML généré.*

**2.** (c) &lt;?php … ?&gt;

**3.** (b) echo

**4.** (d) J'ai 20 ans

**5.** (a) . (le point) — *Exact : "Bonjour " . $nom*

**6.** (b) string — *Les guillemets indiquent une chaîne de caractères, même si elle contient des chiffres.*

**7.** $_GET (accepté aussi : $_get)

**8.** (d) $personne["nom"]

**9.** while → Répéter tant qu'une condition est vraie ; for → Répéter un nombre de fois connu à l'avance ; foreach → Parcourir tous les éléments d'un tableau ; if / else → Exécuter un code seulement si une condition est remplie

**10.** (d) == — *Exact. Un seul = est une affectation, pas une comparaison.*

**11.** Vrai — *Exact.*

**12.** function

**13.** (b) À insérer le contenu d'un autre fichier PHP à l'endroit de l'appel — *Exact, c'est ce qui permet de réutiliser le header, le footer ou une librairie de fonctions.*

**14.** 10 — *Exact : $i prend les valeurs de 0 à 9 incluses.*

**15.** (c) $_POST["phrase"] — *Exact. Attention, c'est bien l'attribut name du champ qui sert de clé.*
