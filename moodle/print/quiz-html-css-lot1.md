# HTML Lot 1 : Les bases (structure, texte, liens, images, tableaux)

Nom : ______________________  Prénom : ______________________

**Question 1 — Les rôles**

Dans un site web, quel est le rôle du HTML ?

- ☐ **a.** Stocker les données du site
- ☐ **b.** Rendre la page interactive
- ☐ **c.** Structurer et organiser le contenu
- ☐ **d.** Mettre en forme les couleurs et les polices

**Question 2 — Le doctype**

Quelle est la toute première ligne d'une page HTML 5 ?

- ☐ **a.** &lt;html version="5"&gt;
- ☐ **b.** &lt;!DOCTYPE html&gt;
- ☐ **c.** &lt;head&gt;
- ☐ **d.** &lt;doctype html5&gt;

**Question 3 — L'encodage**

Pour que les accents s'affichent correctement, on ajoute dans le head la balise &lt;meta ______ ="utf-8" /&gt;.

(a) accents / (b) format / (c) charset / (d) encoding / (e) lang

**Question 4 — Les sauts de ligne**

Dans un fichier HTML, appuyer sur la touche Entrée crée un saut de ligne visible sur la page.

☐ Vrai  ☐ Faux

**Question 5 — Code source public**

N'importe quel visiteur peut afficher le code HTML de votre page (commentaires compris).

☐ Vrai  ☐ Faux

**Question 6 — Les titres**

Combien de balises &lt;h1&gt; est-il recommandé d'avoir par page ?

- ☐ **a.** Une par section
- ☐ **b.** Une seule
- ☐ **c.** Autant que l'on veut, c'est une question de taille de texte
- ☐ **d.** Aucune, c'est une balise obsolète

**Question 7 — Le sens du texte**

Quelle balise indique qu'un mot est fortement important (affiché en gras par défaut) ?

- ☐ **a.** &lt;b&gt;
- ☐ **b.** &lt;em&gt;
- ☐ **c.** &lt;strong&gt;
- ☐ **d.** &lt;bold&gt;

**Question 8 — Attribut d'image**

Quel attribut obligatoire de la balise img contient la description textuelle de l'image (accessibilité, référencement) ? Répondez par le nom de l'attribut uniquement.

Réponse : ________________________________________

**Question 9 — Chemin relatif**

Votre page est dans le dossier article/, votre image dans le dossier img/ (à la racine). Quel chemin fonctionne depuis la page ?

- ☐ **a.** ../img/photo.jpg
- ☐ **b.** img/photo.jpg
- ☐ **c.** photo.jpg
- ☐ **d.** /article/img/photo.jpg

**Question 10 — Le mailto**

Quel href permet d'ouvrir le logiciel de messagerie du visiteur ?

- ☐ **a.** email:contact@exemple.fr
- ☐ **b.** mail:contact@exemple.fr
- ☐ **c.** mailto:contact@exemple.fr
- ☐ **d.** send:contact@exemple.fr

**Question 11 — Formats d'image**

Quels formats d'image sont adaptés au web ? (plusieurs réponses)

*Plusieurs réponses possibles.*

- ☐ **a.** BMP
- ☐ **b.** DOCX
- ☐ **c.** JPEG (pour les photos)
- ☐ **d.** PNG (pour les graphiques et la transparence)

**Question 12 — Balises et usages**

Associez chaque balise à son usage.

| | À relier à… |
|---|---|
| &lt;ul&gt; → ______ | • Un saut de page |
| &lt;ol&gt; → ______ | • Un tableau |
| &lt;a&gt; → ______ | • Une liste numérotée |
| &lt;table&gt; → ______ | • Une image de fond |
|  | • Un lien |
|  | • Une liste à puces |

**Question 13 — Fusion de cellules**

Pour fusionner deux cellules côte à côte dans un tableau, on utilise l'attribut ______ ="2" sur la cellule.

(a) colspan / (b) merge / (c) rowspan / (d) colfusion / (e) span

**Question 14 — Structure de tableau**

Quelle balise regroupe la ligne d'en-tête d'un tableau ?

- ☐ **a.** &lt;theader&gt;
- ☐ **b.** &lt;th&gt;
- ☐ **c.** &lt;caption&gt;
- ☐ **d.** &lt;thead&gt;

**Question 15 — Balises structurantes**

Quelle balise HTML 5 contient les liens de navigation principaux du site ?

- ☐ **a.** &lt;links&gt;
- ☐ **b.** &lt;header&gt;
- ☐ **c.** &lt;menu&gt;
- ☐ **d.** &lt;nav&gt;

**Question 16 — Niveaux de titres**

Combien de niveaux de titres (h1, h2, …) existe-t-il en HTML ?

Réponse : ________________________________________


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (c) Structurer et organiser le contenu — *Exact, la mise en forme est le rôle de la CSS.*

**2.** (b) &lt;!DOCTYPE html&gt; — *Exact, elle indique au navigateur qu'il s'agit d'une page HTML 5.*

**3.** (c) charset

**4.** Faux — *Non, le navigateur ignore les retours à la ligne du code. C'est la structure (paragraphes, balises) qui gère l'affichage.*

**5.** Vrai — *Exact, clic droit puis « Afficher le code source ». Il ne faut donc jamais y mettre d'information sensible.*

**6.** (b) Une seule — *Exact, le h1 est le titre principal, la suite de la hiérarchie utilise h2, h3…*

**7.** (c) &lt;strong&gt; — *Exact, et c'est bien une question de sens, pas d'apparence.*

**8.** alt (accepté aussi : ALT)

**9.** (a) ../img/photo.jpg — *Exact, il faut d'abord remonter d'un dossier avec ../*

**10.** (c) mailto:contact@exemple.fr — *Exact.*

**11.** (c) JPEG (pour les photos) ; (d) PNG (pour les graphiques et la transparence)

**12.** &lt;ul&gt; → Une liste à puces ; &lt;ol&gt; → Une liste numérotée ; &lt;a&gt; → Un lien ; &lt;table&gt; → Un tableau

**13.** (a) colspan

**14.** (d) &lt;thead&gt; — *Exact, avec tbody pour le corps et tfoot pour le pied.*

**15.** (d) &lt;nav&gt; — *Exact.*

**16.** 6
