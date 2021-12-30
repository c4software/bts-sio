<template><h1 id="decouverte-de-vuejs-3-0-avec-vitejs" tabindex="-1"><a class="header-anchor" href="#decouverte-de-vuejs-3-0-avec-vitejs" aria-hidden="true">#</a> Découverte de VueJS 3.0 (avec ViteJS)</h1>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#installation-creation-du-projet">Installation / Création du projet</RouterLink></li><li><RouterLink to="#lancer-le-projet">Lancer le projet</RouterLink></li><li><RouterLink to="#regardons-la-structure">Regardons la structure</RouterLink></li><li><RouterLink to="#vuejs-2-0-vuejs-3-0">VueJS 2.0 -&gt; VueJS 3.0</RouterLink><ul><li><RouterLink to="#setup">setup()</RouterLink></li></ul></li><li><RouterLink to="#c-est-du-typescript">C&#39;est du TypeScript</RouterLink></li><li><RouterLink to="#testons-une-modification">Testons une modification</RouterLink></li><li><RouterLink to="#creer-un-composant-au-format-«-2-0-»-dans-une-structure-«-3-0-»">Créer un composant au format « 2.0 » dans une structure « 3.0 »</RouterLink></li><li><RouterLink to="#et-vuetify-ou-vuebootstrap">Et Vuetify ou VueBootstrap ?</RouterLink><ul><li><RouterLink to="#installer-bootstrap">Installer bootstrap</RouterLink></li><li><RouterLink to="#declarer-bootstrap">Déclarer Bootstrap</RouterLink></li><li><RouterLink to="#utiliser-bootstrap">Utiliser Bootstrap</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>ViteJS est une des nouvelles façons de créer un projet « moderne » avec VueJS (mais pas que). L'objectif est la création de projets « rapide » permettant au développeur de créer des projets avec une structure simple et moderne. Cette organisation repose sur quatre éléments :</p>
<ul>
<li>Un serveur web de développement qui utilise les modules EcmaScript intégrant un Hot Reload très rapide des ressources modifiées.</li>
<li>Une commande de compilation, préconfigurée pour optimiser les ressources pour la production en utilisant <a href="https://rollupjs.org/" target="_blank" rel="noopener noreferrer">Rollup<ExternalLinkIcon/></a> et non pas WebPack</li>
<li>Un système reposant sur des plug-ins permettant des projets personnalisés si besoin.</li>
<li>Intègre nativement le support du <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript<ExternalLinkIcon/></a></li>
</ul>
<p>L'ensemble du fonctionnement est détaillé sur <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">la documentation officielle<ExternalLinkIcon/></a></p>
<div class="custom-container danger"><p class="custom-container-title">ViteJS est rapide oui…</p>
<p>Vite est très rapide… mais contrairement à <code>vue-cli</code>, <code>ViteJS</code> n'a pas pour objectif de faire du code compatible avec les vieux navigateurs (avant ES2015) ; dans la plupart des cas, ça ne pose vraiment aucun problème…</p>
<p>Cependant attention, si vous souhaitez supporter d'ancien navigateur (au hasard IE11), <code>ViteJS</code> ne sera pas le bon outil.</p>
</div>
<h2 id="installation-creation-du-projet" tabindex="-1"><a class="header-anchor" href="#installation-creation-du-projet" aria-hidden="true">#</a> Installation / Création du projet</h2>
<p>Contrairement aux anciens outils fonctionnement avec VueJS, ViteJS ne nécessite rien d'autre que d'avoir sur votre ordinateur <code>NodeJS</code> (minimum 12) et <code>NPM</code>. Si c'est le cas pour vous, il vous suffit de saisir dans votre terminal :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init @vitejs/app
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">C'est interactif !</p>
<p>L'ensemble du processus est interactif ; il vous suffit donc de suivre les étapes pour créer un projet.</p>
<p><strong>Attention quand même</strong>, le projet que vous allez créer sera situé dans le dossier courant.</p>
</div>
<p><img src="@source/tp/vuejs3/res/vitejs.png" alt="ViteJS création d'un projet"></p>
<div class="custom-container warning"><p class="custom-container-title">plusieurs choix !</p>
<p>Vous avez le choix du type de projet ; nous allons choisir <strong>vue-ts</strong>. Cette sélection du type de projet est la vraie force de ViteJS, grâce à son système de plug-in ViteJS est complètement agnostique il est donc complètement possible de faire autre chose que du VueJS (et ça, c'est cool).</p>
</div>
<h2 id="lancer-le-projet" tabindex="-1"><a class="header-anchor" href="#lancer-le-projet" aria-hidden="true">#</a> Lancer le projet</h2>
<p>Votre projet est maintenant « configuré » / « initialisé ». Pour la suite des opérations, il suffit de suivre ce qu'a indiqué votre ligne de commande à savoir :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> test-projet-vite
<span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> run dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>🚀 Et ça va vite ! Très vite. Attention les yeux 🚀</p>
<p><img src="@source/tp/vuejs3/res/vitejs_ready.png" alt="Vite is ready"></p>
<p>Vous pouvez tester la page dans <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">votre navigateur<ExternalLinkIcon/></a>.</p>
<h2 id="regardons-la-structure" tabindex="-1"><a class="header-anchor" href="#regardons-la-structure" aria-hidden="true">#</a> Regardons la structure</h2>
<p>Le projet que vous avez initialisé a une structure particulière que vous devez respecter :</p>
<h2 id="vuejs-2-0-vuejs-3-0" tabindex="-1"><a class="header-anchor" href="#vuejs-2-0-vuejs-3-0" aria-hidden="true">#</a> VueJS 2.0 -&gt; VueJS 3.0</h2>
<p>Entre VueJS 2.0 et VueJS 3.0, il y a quelques nuances, mais dans l'idée le fonctionnement d'un composant est très proche. Les composants VueJS peuvent maintenant fonctionner de deux façons différentes :</p>
<ul>
<li>« À l'ancienne » avec une déclaration des variables « d'état » dans la méthode <code>data(){return {}}</code>.</li>
<li>Via l'API de <code>composition</code>. C'est-à-dire via des déclarations dans la méthode Setup. Cette méthode est en quelques sortes un mélange entre le <code>mounted()</code> et le <code>data()</code>. Vous allez pouvoir définir dedans les <code>variables réactives</code> mais également du code partagé définissant le comportement entre les composants (exemple surveillance du scroll de la souris)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Vous avez le choix</p>
<p>Les deux façons sont <strong>toutes aussi valides l'une que l'autre</strong>. C'est à vous de voir en fonction de vos préférences.</p>
</div>
<h3 id="setup" tabindex="-1"><a class="header-anchor" href="#setup" aria-hidden="true">#</a> setup()</h3>
<p>Le code de la méthode <code>setup()</code> est semblable à n'importe quelles méthodes. Vous écrivez <strong>votre code</strong>, <strong>votre logique</strong> la seule subtilité est que vous allez devoir indiquer à VueJS les variables qu'il va devoir observer ainsi que des méthodes « à ajouter à l'instance ».</p>
<p>Cette déclaration sera aussi simple que d'écrire <code>ref()</code>. La fonction / méthodes <code>ref()</code> prend un paramètre, celui-ci est la valeur par d'initialisation de la variable.</p>
<p>Un exemple sera bien plus parlant :</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token function-variable function">setup</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Déclaration d'une variable « observé » de type Int</span>
  <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Déclaration d'une seconde variable « observé » de type String</span>
  <span class="token keyword">const</span> title <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">"Ceci est un titre"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Ne pas oublier de retourner les observations afin que VueJS réagisse au changement des variables en question.</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> count<span class="token punctuation">,</span> title <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">le return est important</p>
<p>N'oubliez surtout pas le <code>return</code> sinon votre observation ne fonctionnera pas. Bien évidemment vous ne devez avoir qu'un seul <code>setup</code> par composant.</p>
</div>
<p>La force de cette nouvelle façon de faire? La possibilité d'installer des « plugins » / « extensions » nous permettant d'observer diverses valeurs de votre navigateur (la position de la souris, le thème sombre, etc.).</p>
<p>Par exemple l'excellent <a href="https://github.com/vueuse/vueuse" target="_blank" rel="noopener noreferrer">vueuse<ExternalLinkIcon/></a></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useMouse<span class="token punctuation">,</span> usePreferredDark<span class="token punctuation">,</span> useLocalStorage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vueuse/core'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// tracks mouse position</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> x<span class="token punctuation">,</span> y <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useMouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// is user prefers dark theme</span>
    <span class="token keyword">const</span> isDark <span class="token operator">=</span> <span class="token function">usePreferredDark</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// persist state in localStorage</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useLocalStorage</span><span class="token punctuation">(</span>
      <span class="token string">'my-storage'</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">'Apple'</span><span class="token punctuation">,</span>
        color<span class="token operator">:</span> <span class="token string">'red'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> isDark<span class="token punctuation">,</span> store <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Astuce de chef!</p>
<p>Rien de magique ! <a href="https://github.com/vueuse/vueuse" target="_blank" rel="noopener noreferrer">vueuse<ExternalLinkIcon/></a> est « juste » un raccourci à ce que l'on peut faire en JavaScript.</p>
</div>
<h2 id="c-est-du-typescript" tabindex="-1"><a class="header-anchor" href="#c-est-du-typescript" aria-hidden="true">#</a> C'est du TypeScript</h2>
<p>Contrairement à ce que nous avons vu précédemment la structure n'est pas en JavaScript. Celle-ci est en Typescript fondamentalement ça ne change pas grand-chose… La seule différence pour l'instant (pour ce qui nous intéresse) dans le fond, c'est qu'il est possible d'ajouter des types sur les données.</p>
<div class="custom-container warning"><p class="custom-container-title">Des différences oui</p>
<p>Nous allons voir des différences oui… mais elles seront principalement dues au fait que nous migrons de VueJS 2.0 à VueJS 3.0.</p>
</div>
<p>Un détail, contrairement à ce que nous avons vu précédemment, en TypeScript nous déclarons les composants différemment au lieu d'un simple <code>export default {}</code> nous allons faire <code>export default defineComponent({})</code>. La différence ? La fonction <code>defineComponent</code> est directement fournie par les développeurs de <code>VueJS</code>. Elle permet au langage TypeScript de comprendre le type des données défini dans le composant en lui-même.</p>
<p>Le <code>TypeScript</code> est également activé grâce à la définition du langage <code>&lt;script lang=&quot;ts&quot;&gt;</code> dans la balise script du composant.</p>
<div class="custom-container tip"><p class="custom-container-title">Pourquoi privilégier le TypeScript ?</p>
<p>Nous pourrions très bien utiliser uniquement le JavaScript même avec VueJS 3.0, mais je pense que nous sommes à un tournant du développement client ou il est <strong>impossible</strong> de ne pas aborder le TypeScript. Le voir à travers un Framework comme VueJS est un très bon moyen de le voir.</p>
</div>
<h2 id="testons-une-modification" tabindex="-1"><a class="header-anchor" href="#testons-une-modification" aria-hidden="true">#</a> Testons une modification</h2>
<ul>
<li>Tester la modification de valeur avec l'inspecteur.</li>
<li>Ajouter une <code>ref</code> dans le code.</li>
<li>Ajouter du code « interactif » (simple, ref + actions)</li>
<li>Utiliser par exemple, le tracking de la position de la souris en utilisant <a href="https://github.com/vueuse/vueuse" target="_blank" rel="noopener noreferrer">vueuse<ExternalLinkIcon/></a></li>
</ul>
<h2 id="creer-un-composant-au-format-«-2-0-»-dans-une-structure-«-3-0-»" tabindex="-1"><a class="header-anchor" href="#creer-un-composant-au-format-«-2-0-»-dans-une-structure-«-3-0-»" aria-hidden="true">#</a> Créer un composant au format « 2.0 » dans une structure « 3.0 »</h2>
<p>Comme je l'indiquais précédemment… Vous n'êtes pas obligé d'utiliser l'API de composition pour créer un composant avec VueJS 3.0. Vous pouvez tout à fait écrire un composant « à l'ancienne » par exemple :</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Ceci est un composant<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">h1</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>En utilisant le template ☝️. Je vous laisse écrire un composant « à l'ancienne ». Celui-ci doit contenir :</p>
<ul>
<li>Un titre.</li>
<li>Un bouton.</li>
<li>L'action du bouton doit permettre d'incrémenter un compteur à chaque clique.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Rappel</p>
<p>Pour ajouter une action sur un bouton, vous pouvez procéder de la manière suivante :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>counter + 1<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Click ici<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>✋ C'est un exemple bien entendu…</p>
</div>
<h2 id="et-vuetify-ou-vuebootstrap" tabindex="-1"><a class="header-anchor" href="#et-vuetify-ou-vuebootstrap" aria-hidden="true">#</a> Et Vuetify ou VueBootstrap ?</h2>
<p>C'est là que le bas blesse… Actuellement pas de Vuetify disponible ni de VueBootstrap pour VueJS 3.0… Mais rien n'est impossible ! Bien au contraire !</p>
<p>Ce que nous n'avons pas de disponible c'est « Les jeux de composants », par contre, aucun problème pour installer / utiliser Bootstrap tel que nous le ferions dans un développement classique.</p>
<p>Je vous propose d'ailleurs de tester… Ajoutons Bootsrap dans notre projet.</p>
<div class="custom-container danger"><p class="custom-container-title">La situation est particulière</p>
<p>Le texte que vous lisez a été écrit fin 2020, début 2021. Le monde du JS va très vite. Au moment où vous lisez ces lignes. Vuetify, VueBootstrap (ou autre) est peut-être maintenant disponible pour VueJS 3.0</p>
</div>
<h3 id="installer-bootstrap" tabindex="-1"><a class="header-anchor" href="#installer-bootstrap" aria-hidden="true">#</a> Installer bootstrap</h3>
<p>Installer Bootstrap, ce n’est pas bien compliqué. Vous avez deux solutions :</p>
<ul>
<li>Utiliser le CDN.</li>
<li>Installer la dépendance <code>npm</code>.</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> bootstrap
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Astuce d'ancien</p>
<p>Les deux formules sont valides. Je vous propose dans notre cas d'utiliser plutôt <code>npm</code>. Pourquoi ? Simplement, car notre projet n'aura comme ça pas de dépendance à Internet pour fonctionner.</p>
</div>
<h3 id="declarer-bootstrap" tabindex="-1"><a class="header-anchor" href="#declarer-bootstrap" aria-hidden="true">#</a> Déclarer Bootstrap</h3>
<p>Nous avons installé bootstrap! Mais celui-ci n'est pas encore actif. Pour l'activer dans notre projet. Il suffit… de l'importer ! Ajouter dans votre fichier <code>main.ts</code> la ligne suivante :</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token string">"bootstrap/dist/css/bootstrap.css"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Et voilà. Votre projet inclut maintenant Bootstrap 🚀</p>
<h3 id="utiliser-bootstrap" tabindex="-1"><a class="header-anchor" href="#utiliser-bootstrap" aria-hidden="true">#</a> Utiliser Bootstrap</h3>
<p>Pour l'utilisation de bootstrap il faut se référer à la documentation (vous le saviez déjà, mais je préfère le rappeler). Vue que nous n'avons pas de composant de disponible je vous propose de créer les nôtres :</p>
<ul>
<li>Un composant <code>button</code>. (Avec comme <code>props</code> le <code>label</code> et la <code>color</code>)</li>
<li>Un composant <code>card</code>.</li>
<li>Un composant <code>navbar</code>.</li>
</ul>
<p>Pour la <code>card</code> je vais vous aider, nous allons avoir besoin du système de <a href="https://v3.vuejs.org/guide/component-slots.html#slot-content" target="_blank" rel="noopener noreferrer">slot<ExternalLinkIcon/></a> de VueJS. Notre composant va donc ressembler à :</p>
<p><code>card.vue</code> :</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!-- Notation particulière à VueJS --></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"card"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><code>Utilisation</code> :</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>card</span><span class="token punctuation">></span></span> Contenu de ma Card <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>card</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">C'est à vous</p>
<p>Je vous laisse créer les 3 composants.</p>
</div>
</template>
