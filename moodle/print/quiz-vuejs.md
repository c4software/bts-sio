# VueJS 3

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
| v-for → ______ | • Déclarer une donnée réactive |
| v-if → ______ | • Importer un composant externe |
| v-model → ______ | • Afficher un élément seulement si une condition est vraie |
| v-on → ______ | • Répéter un élément pour chaque entrée d'une liste |
|  | • Réagir à un évènement (clic, soumission…) |
|  | • Lier un input à une donnée dans les deux sens |

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

**Question 11 — La composition API**

Dans un composant écrit avec &lt;script setup&gt;, comment déclare-t-on une donnée réactive ?

- ☐ **a.** Avec la fonction data() qui retourne un objet
- ☐ **b.** En déclarant la variable dans le localStorage
- ☐ **c.** Avec le mot-clef reactive devant la variable
- ☐ **d.** Avec la fonction ref(), en accédant à sa valeur via .value dans le script

**Question 12 — Les props**

À quoi servent les props d'un composant ?

- ☐ **a.** À transmettre des données du composant parent vers le composant enfant
- ☐ **b.** À définir le style CSS du composant
- ☐ **c.** À stocker les données dans le navigateur
- ☐ **d.** À transmettre des données de l'enfant vers le parent

**Question 13 — Les événements**

Votre composant Card doit prévenir son parent qu'un utilisateur a cliqué sur « J'aime ». Quel mécanisme utilisez-vous ?

- ☐ **a.** Une prop modifiée directement par l'enfant
- ☐ **b.** Un événement déclaré avec defineEmits et émis avec emit('liked')
- ☐ **c.** Un rechargement de la page
- ☐ **d.** Une variable globale window.liked

**Question 14 — Vrai ou Faux - Les instances**

Si vous affichez trois fois le même composant &lt;Card /&gt;, les trois cartes partagent le même état interne (le même compteur de likes par exemple).

☐ Vrai  ☐ Faux

**Question 15 — La clef des listes**

Complétez : dans une liste générée par v-for, l'attribut spécial ______ permet à Vue d'identifier chaque élément de façon unique pour ne redessiner que ce qui change.

(a) :id / (b) :key / (c) :ref / (d) :index

**Question 16 — Un fichier .vue**

Associez chaque bloc d'un fichier .vue à son contenu.

| | À relier à… |
|---|---|
| &lt;template&gt; → ______ | • La liste des dépendances du projet |
| &lt;script setup&gt; → ______ | • La logique du composant (composition API) |
| &lt;style scoped&gt; → ______ | • La configuration du serveur de développement |
|  | • Le CSS appliqué uniquement à ce composant |
|  | • Le HTML du composant |

**Question 17 — Firebase temps réel**

Dans le TP Firebase, quelle fonction de la Realtime Database permet d'être prévenu automatiquement à chaque modification des données ?

- ☐ **a.** fetch
- ☐ **b.** addEventListener
- ☐ **c.** setInterval
- ☐ **d.** onValue


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

**11.** (d) Avec la fonction ref(), en accédant à sa valeur via .value dans le script — *Exact, dans le template le .value est ajouté automatiquement.*

**12.** (a) À transmettre des données du composant parent vers le composant enfant — *Exact, déclarées avec defineProps, elles rendent le composant réutilisable avec des données différentes.*

**13.** (b) Un événement déclaré avec defineEmits et émis avec emit('liked') — *Exact, l'enfant émet un signal, le parent l'écoute avec @liked et décide quoi en faire.*

**14.** Faux — *Exact, c'est faux : chaque balise crée une instance indépendante, avec son propre état, comme les instances d'une classe en POO.*

**15.** (b) :key

**16.** &lt;template&gt; → Le HTML du composant ; &lt;script setup&gt; → La logique du composant (composition API) ; &lt;style scoped&gt; → Le CSS appliqué uniquement à ce composant

**17.** (d) onValue — *Exact, le callback est rappelé à chaque changement : c'est ce qui rend la carte collaborative en temps réel, sans rechargement.*
