# CSS Lot 2 : Les bases de la CSS (sélecteurs, boîtes, flexbox, responsive)

Nom : ______________________  Prénom : ______________________

**Question 1 — Où déclarer la CSS**

Quelle est la façon recommandée de déclarer sa CSS ?

- ☐ **a.** Dans un fichier externe lié avec une balise link
- ☐ **b.** Dans une balise style du head
- ☐ **c.** Dans un fichier nommé obligatoirement design.txt
- ☐ **d.** Dans l'attribut style de chaque balise

**Question 2 — La balise link**

Pour charger une feuille de style, on écrit dans le head : &lt;link rel="stylesheet" ______ ="css/style.css" /&gt;.

(a) url / (b) link / (c) src / (d) href / (e) file

**Question 3 — Les sélecteurs**

Que cible le sélecteur .rouge ?

- ☐ **a.** Tous les éléments ayant class="rouge"
- ☐ **b.** Tous les textes de couleur rouge
- ☐ **c.** L'élément ayant id="rouge"
- ☐ **d.** Toutes les balises &lt;rouge&gt;

**Question 4 — Unicité de l'id**

Un même id peut être utilisé sur plusieurs éléments d'une même page.

☐ Vrai  ☐ Faux

**Question 5 — L'héritage**

Vous écrivez body

- ☐ **a.** Sans couleur, il faut obligatoirement une règle sur p
- ☐ **b.** Noirs
- ☐ **c.** Bleus
- ☐ **d.** Une erreur s'affiche

**Question 6 — Les unités**

Pourquoi privilégier l'unité em plutôt que le pixel pour la taille du texte ?

- ☐ **a.** Le pixel est interdit en CSS 3
- ☐ **b.** Le em s'affiche plus net que le pixel
- ☐ **c.** Le em est plus rapide à charger
- ☐ **d.** La taille s'adapte au contexte et aux préférences du visiteur

**Question 7 — Couleur du texte**

Quelle propriété CSS définit la couleur du texte d'un élément ? Répondez par le nom de la propriété uniquement.

Réponse : ________________________________________

**Question 8 — L'hexadécimal**

Que représente la couleur #FFFFFF ?

- ☐ **a.** Le rouge pur
- ☐ **b.** Le blanc
- ☐ **c.** Le noir
- ☐ **d.** Une couleur invalide

**Question 9 — Propriétés et effets**

Associez chaque propriété CSS à son effet.

| | À relier à… |
|---|---|
| font-weight → ______ | • Le nombre de colonnes du tableau |
| text-align → ______ | • La vitesse de chargement |
| border-radius → ______ | • L'ombre d'un bloc |
| box-shadow → ______ | • Le niveau de gras du texte |
|  | • Les coins arrondis |
|  | • L'alignement du texte |

**Question 10 — Padding ou margin**

Vous voulez écarter le texte de la bordure de sa boîte. Quelle propriété utilisez-vous ?

- ☐ **a.** padding
- ☐ **b.** border-space
- ☐ **c.** spacing
- ☐ **d.** margin

**Question 11 — Centrer un bloc**

Pour centrer horizontalement un bloc qui a une largeur définie, on écrit margin: ______ ;.

(a) center / (b) 0 / (c) middle / (d) auto / (e) 50%

**Question 12 — Les balises block**

Parmi ces balises, lesquelles sont de type « block » ? (plusieurs réponses)

*Plusieurs réponses possibles.*

- ☐ **a.** &lt;div&gt;
- ☐ **b.** &lt;span&gt;
- ☐ **c.** &lt;p&gt;
- ☐ **d.** &lt;strong&gt;

**Question 13 — Les pseudo-classes**

Quel sélecteur applique un style au survol de la souris ?

- ☐ **a.** a:focus
- ☐ **b.** a:survol
- ☐ **c.** a:active
- ☐ **d.** a:hover

**Question 14 — Flexbox**

Dans un conteneur display: flex; en direction row, quelle propriété répartit les éléments sur l'axe horizontal ?

- ☐ **a.** flex-align
- ☐ **b.** align-items
- ☐ **c.** justify-content
- ☐ **d.** text-align

**Question 15 — Media queries**

Que signifie @media (min-width: 768px)

- ☐ **a.** La page ne peut pas être affichée sous 768px
- ☐ **b.** Les règles s'appliquent si l'écran fait moins de 768px
- ☐ **c.** Les règles s'appliquent si l'écran fait 768px de large ou plus
- ☐ **d.** L'image de fond fera au minimum 768px

**Question 16 — La meta viewport**

Sans la balise meta viewport, les media queries ne donnent pas le résultat attendu sur mobile.

☐ Vrai  ☐ Faux


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (a) Dans un fichier externe lié avec une balise link — *Exact, la CSS est ainsi centralisée et partagée entre toutes les pages.*

**2.** (d) href

**3.** (a) Tous les éléments ayant class="rouge" — *Exact, le point cible une class.*

**4.** Faux — *Non, un id doit être unique dans la page. Pour réutiliser un style, on utilise une class.*

**5.** (c) Bleus — *Exact, ils héritent de la couleur du body. C'est l'héritage, le « C » de CSS.*

**6.** (d) La taille s'adapte au contexte et aux préférences du visiteur — *Exact, 1.3em signifie 30 % plus grand que le parent.*

**7.** color (accepté aussi : COLOR)

**8.** (b) Le blanc — *Exact, toutes les composantes rouge, vert et bleu au maximum.*

**9.** font-weight → Le niveau de gras du texte ; text-align → L'alignement du texte ; border-radius → Les coins arrondis ; box-shadow → L'ombre d'un bloc

**10.** (a) padding — *Exact, le padding est l'espace intérieur (le « rembourrage »).*

**11.** (d) auto

**12.** (a) &lt;div&gt; ; (c) &lt;p&gt;

**13.** (d) a:hover — *Exact.*

**14.** (c) justify-content — *Exact, justify-content agit sur l'axe principal.*

**15.** (c) Les règles s'appliquent si l'écran fait 768px de large ou plus — *Exact, min-width signifie « à partir de ».*

**16.** Vrai — *Exact, sans elle le mobile simule un grand écran (environ 980px). C'est la première étape du responsive.*
