# VueJS 3 — 10 questions, lot unique

Nom : ______________________  Prénom : ______________________

**Question 1 — VueJS**

Qu'est-ce que VueJS ?

- ☐ **a.** Un framework JavaScript côté client, basé sur le modèle MVVM
- ☐ **b.** Un langage qui remplace le JavaScript
- ☐ **c.** Une base de données orientée documents
- ☐ **d.** Un serveur Web pour héberger du JavaScript

**Question 2 — L'interpolation**

Dans le template, que fait la syntaxe {{ message }} ?

- ☐ **a.** Elle déclare une nouvelle variable nommée message
- ☐ **b.** Elle envoie message au serveur
- ☐ **c.** Elle affiche la valeur de la donnée message, et se met à jour automatiquement si celle-ci change
- ☐ **d.** Elle affiche littéralement le texte « message »

**Question 3 — Créer l'application**

Quelle fonction de Vue permet de créer l'application avant de l'attacher à la page ?

Réponse : ________________________________________

**Question 4 — Le mount**

Que fait .mount('#monMessage') sur l'application Vue ?

- ☐ **a.** Elle attache l'application à l'élément du DOM dont l'id est monMessage
- ☐ **b.** Elle crée un élément HTML nommé monMessage
- ☐ **c.** Elle démarre le serveur de développement
- ☐ **d.** Elle affiche le texte monMessage dans la page

**Question 5 — Les data**

Où déclare-t-on les variables réactives d'une application Vue (options API vue en TP) ?

- ☐ **a.** Dans la fonction data(), qui retourne un objet
- ☐ **b.** Dans une balise &lt;data&gt; du HTML
- ☐ **c.** Dans le fichier package.json
- ☐ **d.** Dans le localStorage du navigateur

**Question 6 — Les directives**

Associez chaque directive à son rôle.

| | À relier à… |
|---|---|
| v-for → ______ | • Afficher un élément seulement si une condition est vraie |
| v-if → ______ | • Répéter un élément pour chaque entrée d'une liste |
| v-model → ______ | • Réagir à un évènement (clic, soumission…) |
| v-on → ______ | • Lier un input à une donnée dans les deux sens |

**Question 7 — v-if ou v-show**

Quelle est la différence entre v-if et v-show ?

- ☐ **a.** v-show fonctionne uniquement avec les listes
- ☐ **b.** Aucune, ce sont deux écritures de la même directive
- ☐ **c.** v-if retire complètement l'élément du DOM, v-show le masque simplement via le CSS
- ☐ **d.** v-if ne fonctionne que sur les formulaires

**Question 8 — Les modificateurs**

Sur un formulaire, la directive v-on:submit. ______ ="onSubmit" empêche le comportement par défaut du navigateur (le rechargement de la page) avant d'appeler la méthode.

(a) stop / (b) prevent / (c) once / (d) self

**Question 9 — Cycle de vie**

Quel hook du cycle de vie est appelé une fois le composant inséré dans le DOM (souvent utilisé pour charger des données) ?

- ☐ **a.** unmounted
- ☐ **b.** created
- ☐ **c.** updated
- ☐ **d.** mounted

**Question 10 — Vrai ou Faux - Vue Router**

Avec Vue Router, chaque changement de page provoque un rechargement complet de la page depuis le serveur.

☐ Vrai  ☐ Faux


<div style="page-break-before: always;"></div>

## Corrigé

**1.** (a) Un framework JavaScript côté client, basé sur le modèle MVVM — *Exact, la vue se met à jour automatiquement quand les données changent.*

**2.** (c) Elle affiche la valeur de la donnée message, et se met à jour automatiquement si celle-ci change — *Exact, c'est l'interpolation, cœur de la réactivité de Vue.*

**3.** createApp (accepté aussi : createApp(), Vue.createApp, Vue.createApp())

**4.** (a) Elle attache l'application à l'élément du DOM dont l'id est monMessage — *Exact, Vue ne contrôle que cette partie de la page.*

**5.** (a) Dans la fonction data(), qui retourne un objet — *Exact, chaque propriété de cet objet devient une donnée réactive utilisable dans le template.*

**6.** v-for → Répéter un élément pour chaque entrée d'une liste ; v-if → Afficher un élément seulement si une condition est vraie ; v-model → Lier un input à une donnée dans les deux sens ; v-on → Réagir à un évènement (clic, soumission…)

**7.** (c) v-if retire complètement l'élément du DOM, v-show le masque simplement via le CSS — *Exact, v-show est plus adapté si l'élément est affiché/masqué souvent.*

**8.** (b) prevent

**9.** (d) mounted — *Exact, il suit beforeMount dans le cycle de vie.*

**10.** Faux — *Exact, c'est faux : le routeur change la vue affichée sans recharger la page, c'est le principe d'une SPA (Single Page Application).*
