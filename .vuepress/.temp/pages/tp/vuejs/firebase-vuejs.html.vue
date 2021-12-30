<template><h1 id="firebase-vuejs-2-0" tabindex="-1"><a class="header-anchor" href="#firebase-vuejs-2-0" aria-hidden="true">#</a> Firebase + VueJS 2.0</h1>
<p>Dans ce TP nous allons découvrir Firebase RealtimeDB (base de données temps réel). Nous allons coupler cette base de données temps réel à la puissance de VueJS pour obtenir en un rien de temps une application web surpuissante.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Nous allons mettre en place une carte du monde qui affiche en temps réel l'emplacement des utilisateurs qui interagissent avec la carte. Mais nous pourrions également afficher les personnes présentes sur votre site.</p>
<p><img src="@source/tp/vuejs/ressources/carte_marker.png" alt="Carte Marker fin"></p>
<h2 id="la-mise-en-place" tabindex="-1"><a class="header-anchor" href="#la-mise-en-place" aria-hidden="true">#</a> La mise en place</h2>
<p>Nous allons utiliser VueCLI pour initialiser le projet, première étape l'installation.</p>
<h2 id="installer-nodejs-vuecli" tabindex="-1"><a class="header-anchor" href="#installer-nodejs-vuecli" aria-hidden="true">#</a> Installer NodeJS + VueCLI</h2>
<p>Avant de commencer, nous allons avoir besoin de plusieurs outils :</p>
<ul>
<li>NodeJS</li>
<li>VueCli</li>
</ul>
<h2 id="nodejs" tabindex="-1"><a class="header-anchor" href="#nodejs" aria-hidden="true">#</a> NodeJS</h2>
<p>La première étape va être l’installation de NodeJS, la démarche est différente en fonction de votre environnement, mais pour résumer <a href="https://nodejs.org/en/download/" target="_blank" rel="noopener noreferrer">sous Windows c’est ici<ExternalLinkIcon/></a> prendre la version CURRENT, sous OSX le plus simple c’est via Brew <code>brew install nodejs</code>, et sous Linux c’est via le gestionnaire de paquet <code>apt install nodejs</code></p>
<p>Une fois installé, vous êtes prêt, votre PC est prêt à accueillir l’outil Vue-Cli.</p>
<h2 id="vue-cli" tabindex="-1"><a class="header-anchor" href="#vue-cli" aria-hidden="true">#</a> Vue-Cli</h2>
<p>Vue-Cli est un outil qui simplifie la création d’un nouveau projet Vue-JS à partir de template fourni par la communauté.</p>
<p>Dans un terminal lancer la commande suivante dans le <code>Node.js Command Prompt</code> :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g @vue/cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Maintenant que vue-cli est installé, vous avez à votre disposition sur votre ordinateur une nouvelle commande, la commande <code>vue</code>.</p>
<p>Pour créer un nouveau projet, c’est simple il suffit de lancer la commande suivante dans le <code>Node.js Command Prompt</code>.</p>
<h2 id="initialiser-le-projet" tabindex="-1"><a class="header-anchor" href="#initialiser-le-projet" aria-hidden="true">#</a> Initialiser le projet</h2>
<p>La création d'un nouveau projet est très simple. Il suffit de rentrer la commande suivante :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>vue create firebase<span class="token operator">-</span>vuejs
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Choisir l'option « Default ».</p>
<p>🤓 git est déjà initialisé, vous pouvez en profiter pour pusher votre code sur Github / Gitlab.</p>
<h3 id="questions" tabindex="-1"><a class="header-anchor" href="#questions" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Pourquoi git est déjà initialisé ?</li>
<li>Allez jeter un coup d'œil au fichier <code>.gitignore</code></li>
</ul>
<h2 id="tester" tabindex="-1"><a class="header-anchor" href="#tester" aria-hidden="true">#</a> Tester</h2>
<p>Le projet initialisé par <code>Vue-Cli</code> est immédiatement fonctionnel. Testez-le en saisissant :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/vuejs/ressources/vuejs-init.png" alt="VueJS init"></p>
<h2 id="les-dependances" tabindex="-1"><a class="header-anchor" href="#les-dependances" aria-hidden="true">#</a> Les dépendances</h2>
<p>Maintenant que notre projet est « initialisé », nous allons avoir besoin de quelques dépendances NPM pour faire fonctionner notre projet. Notre projet va utiliser les technologies suivantes :</p>
<ul>
<li>firebase</li>
<li>leaflet</li>
</ul>
<p>Firebase comme vous le savez va nous servir de système de base de données. <a href="http://leafletjs.com/" target="_blank" rel="noopener noreferrer">Leaflet<ExternalLinkIcon/></a> quant à lui est une librairie qui va nous permettre d'afficher très rapidement une carte sur notre site internet.</p>
<h3 id="ajouter-les-dependances" tabindex="-1"><a class="header-anchor" href="#ajouter-les-dependances" aria-hidden="true">#</a> Ajouter les dépendances</h3>
<p>Les deux outils / librairies que nous allons utiliser sont disponibles via NPM, nous allons donc les installer / ajouter au projet via les commandes suivantes :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> firebase leaflet vue2-leaflet --save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="configuration-de-la-dependance-carte" tabindex="-1"><a class="header-anchor" href="#configuration-de-la-dependance-carte" aria-hidden="true">#</a> Configuration de la dépendance carte</h3>
<p>Certains plugins nécessitent de la configuration supplémentaire, ça sera le cas pour Vue2-Leaflet (et Firebase). Comme vous, je ne connais pas la configuration de l'ensemble des dépendances existantes. Première étape :</p>
<ul>
<li><a href="https://vue2-leaflet.netlify.app/quickstart/" target="_blank" rel="noopener noreferrer">Lire la documentation sur le site de Vue2-Leaflet<ExternalLinkIcon/></a></li>
</ul>
<p>Maintenant que nous avons vu comment s'intègre le Leaflet, réfléchissons comment intégrer ça dans notre projet :</p>
<ul>
<li>À l'arrache dans le fichier <code>main.js</code> ? ✋ =&gt; NON</li>
<li>Dans un dossier <code>plugins</code> =&gt; 👍 Oui</li>
</ul>
<p>À votre avis pourquoi ?</p>
<h3 id="creation-de-la-partie-plugin" tabindex="-1"><a class="header-anchor" href="#creation-de-la-partie-plugin" aria-hidden="true">#</a> Création de la partie plugin</h3>
<p>Créer le fichier <code>src/plugins/vue2-leaflet.js</code> y mettre dedans :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Icon <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"leaflet"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">"leaflet/dist/leaflet.css"</span><span class="token punctuation">;</span>

<span class="token comment">// this part resolve an issue where the markers would not appear</span>
<span class="token keyword">delete</span> Icon<span class="token punctuation">.</span><span class="token class-name">Default</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>_getIconUrl<span class="token punctuation">;</span>

Icon<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">mergeOptions</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  iconRetinaUrl<span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"leaflet/dist/images/marker-icon-2x.png"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  iconUrl<span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"leaflet/dist/images/marker-icon.png"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  shadowUrl<span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"leaflet/dist/images/marker-shadow.png"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul>
<li>D'où vient le code ?</li>
</ul>
<h3 id="declarer-le-plugin" tabindex="-1"><a class="header-anchor" href="#declarer-le-plugin" aria-hidden="true">#</a> Déclarer le plugin</h3>
<p>Maintenant que la configuration du « plugin » est effective nous devons le déclarer dans notre fichier <code>main.js</code> pour ça rien de compliquer.</p>
<p>Ajouter l'import :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">"./plugins/vue2-leaflet"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>🤓 Avec les autres imports déjà existants.</p>
<h3 id="questions-1" tabindex="-1"><a class="header-anchor" href="#questions-1" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Pourquoi l'import est-il nécessaire ?</li>
<li>Pourquoi vue2-leaflet et pas juste leaflet ?</li>
</ul>
<h3 id="dependance-supplementaire" tabindex="-1"><a class="header-anchor" href="#dependance-supplementaire" aria-hidden="true">#</a> Dépendance supplémentaire</h3>
<p>Le gros avantage de NPM (et de NodeJS) c'est la quantité de librairies disponibles pour répondre à un besoin, nous allons donc en profiter pour gagner du temps dans notre réalisation.</p>
<p>Firebase est plutôt simple à utiliser, mais nativement celle-ci ne s'intègre pas directement avec le « state » d'un composant VueJS! Mais grâce à d'excellents développeurs c'est maintenant possible et très simplement. Pour ça nous allons utiliser :</p>
<ul>
<li><a href="https://vuefire.vuejs.org/" target="_blank" rel="noopener noreferrer">Vuefire<ExternalLinkIcon/></a></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> vuefire --save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Dans une prochaine étape, nous allons configurer Vuefire. Pour l'instant le package est disponible, mais non actif.</p>
<p>🤓 Je vous invite quand même à aller voir <a href="https://github.com/vuejs/vuefire/tree/v1" target="_blank" rel="noopener noreferrer">la documentation<ExternalLinkIcon/></a> de VueFire pour voir de quoi il en retourne !</p>
<h2 id="creation-du-projet-sur-firebase" tabindex="-1"><a class="header-anchor" href="#creation-du-projet-sur-firebase" aria-hidden="true">#</a> Création du projet sur Firebase</h2>
<p>Maintenant que nos dépendances sont installées et que notre projet est initialisé, nous allons configurer le projet sur Firebase :</p>
<p>Première étape <a href="https://console.firebase.google.com/u/0/" target="_blank" rel="noopener noreferrer">créer le projet sur le site de Firebase<ExternalLinkIcon/></a></p>
<p><img src="@source/tp/vuejs/ressources/creation-firebase.png" alt="Création Firebase"></p>
<p>Maintenant que le projet est créé, nous allons récupérer la configuration :</p>
<p><img src="@source/tp/vuejs/ressources/configuration-web.png" alt="Configuration Web"></p>
<p>Nous allons récupérer une partie du code fourni… Nous allons prendre la configuration (dans mon cas) :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Initialize Firebase</span>
<span class="token keyword">var</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  apiKey<span class="token operator">:</span> <span class="token string">"✋-CHANGE-CHANGE-CHANGE-CHANGE-✋"</span><span class="token punctuation">,</span>
  authDomain<span class="token operator">:</span> <span class="token string">"reatlime-maps.firebaseapp.com"</span><span class="token punctuation">,</span>
  databaseURL<span class="token operator">:</span> <span class="token string">"https://reatlime-maps.firebaseio.com"</span><span class="token punctuation">,</span>
  projectId<span class="token operator">:</span> <span class="token string">"reatlime-maps"</span><span class="token punctuation">,</span>
  storageBucket<span class="token operator">:</span> <span class="token string">"reatlime-maps.appspot.com"</span><span class="token punctuation">,</span>
  messagingSenderId<span class="token operator">:</span> <span class="token string">"✋✋✋✋✋✋✋✋"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> config<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Nous allons mettre le code dans le fichier <code>src/config/firebase.js</code> ⬅️</p>
<p>⚠️ ✋ Attention à bien changer la valeur de <code>apiKey</code> et <code>messagingSenderId</code>. ✋ ⚠️</p>
<p>BRAVO ! Votre projet est maintenant capable de « se connecter » avec Firebase !</p>
<h3 id="questions-2" tabindex="-1"><a class="header-anchor" href="#questions-2" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Et la sécurité ? À votre avis comment ça fonctionne ?</li>
<li>Est-il possible de faire autrement ?</li>
</ul>
<h2 id="activer-la-realtime-db" tabindex="-1"><a class="header-anchor" href="#activer-la-realtime-db" aria-hidden="true">#</a> Activer la Realtime DB</h2>
<p>Dans l'interface de Firebase activez la Realtime DB.</p>
<p><img src="@source/tp/vuejs/ressources/init_firebase.png" alt="Init Firebase"></p>
<p><img src="@source/tp/vuejs/ressources/security_firebase.png" alt="Security Firebase"></p>
<h2 id="modification-du-code-pour-inclure-la-configuration-firebase" tabindex="-1"><a class="header-anchor" href="#modification-du-code-pour-inclure-la-configuration-firebase" aria-hidden="true">#</a> Modification du code pour inclure la configuration Firebase</h2>
<p>Maintenant que nous avons ajouté la configuration, nous devons la déclarer dans notre code. Comme pour Vue2-Leaflet nous allons ajouter un fichier de « configuration du plugin » dans le dossier <code>src/plugins/</code> ajouter un fichier nommé <code>firebase.js</code> avec le contenu suivant :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> firebaseConfig <span class="token keyword">from</span> <span class="token string">"../config/firebase"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> firebase <span class="token keyword">from</span> <span class="token string">"firebase/app"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">"firebase/database"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> firebaseApp <span class="token operator">=</span> firebase<span class="token punctuation">.</span><span class="token function">initializeApp</span><span class="token punctuation">(</span>firebaseConfig<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> db <span class="token operator">=</span> firebaseApp<span class="token punctuation">.</span><span class="token function">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$db <span class="token operator">=</span> db<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Comme pour leaflet, ajouter un import dans le fichier <code>main.js</code> pour référencer notre « configuration de plugin » :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">"./plugins/firebase"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="questions-3" tabindex="-1"><a class="header-anchor" href="#questions-3" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Que fait le code ?</li>
<li>Comment connaitre les autres options ?</li>
<li>Vue.prototype ? Kézako ? On en parle !</li>
</ul>
<h2 id="testons" tabindex="-1"><a class="header-anchor" href="#testons" aria-hidden="true">#</a> Testons</h2>
<p>Bien maintenant, que nous avons mis en place les bases de notre projet, testons si celui-ci fonctionne correctement. Pour ça (dans un terminal) :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Après quelques secondes de compilation (pré-processing) vous devriez avoir sur votre écran :</p>
<p><img src="@source/tp/vuejs/ressources/serve_npm.png" alt="serve npm"></p>
<p>Et dans votre navigateur toujours la même chose à savoir :</p>
<p><img src="@source/tp/vuejs/ressources/vuejs-init.png" alt="VueJS init"></p>
<h2 id="creation-de-notre-premiere-vue-composant" tabindex="-1"><a class="header-anchor" href="#creation-de-notre-premiere-vue-composant" aria-hidden="true">#</a> Création de notre première vue / composant.</h2>
<p>Notre projet est maintenant prêt à recevoir son premier <code>.vue</code> bien à vous. Toujours dans le but d'organiser son travail nous allons commencer par créer un dossier :</p>
<ul>
<li><code>src/views/</code></li>
</ul>
<p>Ce dossier nous servira à ranger l'ensemble de nos vues, pour l'instant nous allons créer une vue nommée <code>map.vue</code> ce fichier contiendra le code source de notre carte.</p>
<p>Créer le fichier <code>src/views/map.vue</code> avec le contenu suivant :</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>l-map</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>map<span class="token punctuation">"</span></span> <span class="token attr-name">:zoom</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>zoom<span class="token punctuation">"</span></span> <span class="token attr-name">:center</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>center<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>myMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>l-tile-layer</span> <span class="token attr-name">:url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>l-tile-layer</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>l-map</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> LMap<span class="token punctuation">,</span> LTileLayer<span class="token punctuation">,</span> LMarker<span class="token punctuation">,</span> LControl <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue2-leaflet"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"myMap"</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      url<span class="token operator">:</span> <span class="token string">"http://{s}.tile.osm.org/{z}/{x}/{y}.png"</span><span class="token punctuation">,</span>
      zoom<span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
      center<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">47.472092</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.550589</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  components<span class="token operator">:</span> <span class="token punctuation">{</span>
    LMap<span class="token punctuation">,</span>
    LTileLayer<span class="token punctuation">,</span>
    LMarker<span class="token punctuation">,</span>
    LControl<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">#map</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>✋ D'où vient le code ? Tout simplement une adaptation du <a href="https://vue2-leaflet.netlify.app/components/LMap.html" target="_blank" rel="noopener noreferrer">code de démonstration fourni par Vue2-Leaflet<ExternalLinkIcon/></a></p>
<h2 id="utiliser-notre-premiere-vue" tabindex="-1"><a class="header-anchor" href="#utiliser-notre-premiere-vue" aria-hidden="true">#</a> Utiliser notre première vue</h2>
<p>Créer la vue ne déclenche rien, il faut maintenant l'importer. Comme vu en cours, la « base » de notre application est répartie entre deux fichiers :</p>
<ul>
<li>le main.js : qui contient les imports de base et la déclaration de notre objet <code>.vue</code>.</li>
<li>l'App.vue : qui contient la « racine » de notre HTML (c'est dans celui-ci que nous allons référencer notre nouvelle vue / composant).</li>
</ul>
<p>Modifier le <code>App.vue</code> par :</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>myMap</span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> myMap <span class="token keyword">from</span> <span class="token string">"./views/map.vue"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"app"</span><span class="token punctuation">,</span>
  components<span class="token operator">:</span> <span class="token punctuation">{</span>
    myMap<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">html,
body,
.container</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="questions-4" tabindex="-1"><a class="header-anchor" href="#questions-4" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Quelles sont les différences ?</li>
<li>Pourquoi le CSS n'est pas <code>scoped</code> ?</li>
<li>À quoi correspond <code>components</code> ?</li>
</ul>
<h2 id="tester-1" tabindex="-1"><a class="header-anchor" href="#tester-1" aria-hidden="true">#</a> Tester</h2>
<p>Votre projet doit maintenant afficher une carte, tester rapidement via la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/vuejs/ressources/first-map.png" alt="Première carte"></p>
<h2 id="configurer-vuefire" tabindex="-1"><a class="header-anchor" href="#configurer-vuefire" aria-hidden="true">#</a> Configurer VueFire</h2>
<p>Comme pour Vue2-Leaflet et firebase, VueFire nécéssite une déclaration pour être utilisé dans le projet.</p>
<ul>
<li><a href="https://vuefire.vuejs.org/" target="_blank" rel="noopener noreferrer">Lire la documentation<ExternalLinkIcon/></a>.</li>
<li>Créer le fichier dans le dossier <code>plugins</code>.</li>
<li>Réaliser l'import dans le fichier <code>main.js</code>.</li>
</ul>
<Reveal text="Voir la solution">
<p><code>src/plugins/vuefire.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> rtdbPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuefire"</span><span class="token punctuation">;</span>

Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>rtdbPlugin<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><code>main.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// […]</span>
<span class="token keyword">import</span> <span class="token string">"./plugins/vuefire"</span><span class="token punctuation">;</span>

<span class="token comment">// […]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Et voilà ! Votre base RealtimeDB est accessible !</p>
</div>
</Reveal>
<h2 id="connecter-firebase-a-notre-vue" tabindex="-1"><a class="header-anchor" href="#connecter-firebase-a-notre-vue" aria-hidden="true">#</a> Connecter Firebase à notre vue</h2>
<p>Grâce au plugin l'intégration de Firebase va être très simplifiée. Déjà vous avez mis en place Firebase et injecter le connecteur de base de données grâce au « plugin » et « Vue.prototype », nous allons devoir l'utiliser. Pour ça, modifiez le fichier <code>maps.vue</code> pour ajouter (après name) :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">firebase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    markerList<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$db<span class="token punctuation">.</span><span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">"/markerList/"</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Ajouter également dans les <code>data</code> de votre composant une variable nommée <code>markerList</code> avec comme valeurs <code>[]</code>.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>markerList<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="questions-5" tabindex="-1"><a class="header-anchor" href="#questions-5" aria-hidden="true">#</a> Questions :</h3>
<ul>
<li>D'où vient <code>this.$db</code> ?</li>
<li>À quoi correspond le <code>/markerList/</code> ?</li>
</ul>
<p>Et c'est tout ! Vous avez maintenant dans votre objet vue une nouvelle variable de disponible <code>markerList</code> celle-ci est synchronisée avec votre base de données temps réel (Firebase RealtimeDB).</p>
<h2 id="manipuler-la-base-realtimedb" tabindex="-1"><a class="header-anchor" href="#manipuler-la-base-realtimedb" aria-hidden="true">#</a> Manipuler la base RealtimeDB</h2>
<p>La manipulation de la base RealtimeDB va se faire via l'objet <code>this.$firebaseRefs</code>. Voilà l'ensemble des actions possibles :</p>
<h3 id="ajouter-une-nouvelle-entree" tabindex="-1"><a class="header-anchor" href="#ajouter-une-nouvelle-entree" aria-hidden="true">#</a> Ajouter une nouvelle entrée :</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>$firebaseRefs<span class="token punctuation">.</span>markerList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token comment">/*…*/</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="modifier-une-entree" tabindex="-1"><a class="header-anchor" href="#modifier-une-entree" aria-hidden="true">#</a> Modifier une entrée :</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>$firebaseRefs<span class="token punctuation">.</span>markerList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token comment">/*...*/</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Marker updated!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li><code>0</code> étant l'index de l'élément à modifier.</li>
<li><code>/* ... */</code> étant le nouveau contenu, par exemple <code>[0, 0]</code></li>
</ul>
</div>
<h3 id="supprimer-un-element" tabindex="-1"><a class="header-anchor" href="#supprimer-un-element" aria-hidden="true">#</a> Supprimer un élément :</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>$firebaseRefs<span class="token punctuation">.</span>markerList<span class="token punctuation">.</span><span class="token function">child</span><span class="token punctuation">(</span>identifiant<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code>identifiant</code> étant la clé unique représentant votre élément en base.</p>
</div>
<p><a href="https://vuefire.vuejs.org/vuefire/writing-data.html#updates-to-collection-and-documents" target="_blank" rel="noopener noreferrer">Plus de détail ici sur la documentation<ExternalLinkIcon/></a></p>
<h2 id="ajouter-un-marker" tabindex="-1"><a class="header-anchor" href="#ajouter-un-marker" aria-hidden="true">#</a> Ajouter un marker</h2>
<p>Pour ajouter un marker sur la carte nous allons utiliser la directive <code>@click</code> sur l'objet <code>l-map</code> :</p>
<ul>
<li>Ajouter sur l'objet <code>&lt;l-map&gt;</code> la directive suivante <code>@click=&quot;addMarker&quot;</code>.</li>
<li>Ajouter la méthode <code>addMarker</code> dans les méthodes de votre objet VueJS <code>addMarker(position){…}</code> .</li>
<li>À votre avis à quoi doit ressembler le code ?</li>
<li>Ajouter un <code>console.log(position)</code> avez-vous une propriété <code>latlng</code> ?</li>
<li>Remplacer le <code>console.log</code> par le bon push pour ajouter dans la base de données la position.</li>
</ul>
<Reveal text="Voir la solution">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">addMarker</span><span class="token punctuation">(</span><span class="token parameter">position</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>$firebaseRefs<span class="token punctuation">.</span>markerList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    position<span class="token punctuation">.</span>latlng<span class="token punctuation">.</span>lat<span class="token punctuation">,</span>
    position<span class="token punctuation">.</span>latlng<span class="token punctuation">.</span>lng
  <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></Reveal>
<h2 id="tester-2" tabindex="-1"><a class="header-anchor" href="#tester-2" aria-hidden="true">#</a> Tester</h2>
<ul>
<li>Ouvrer la <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">console de Firebase<ExternalLinkIcon/></a> rendez-vous dans la partie <code>Database</code>.</li>
<li>Lancer votre projet local <code>npm run serve</code>.</li>
<li>Cliquer sur la carte.</li>
<li>Que constatez-vous ?</li>
</ul>
<h2 id="afficher-les-markers" tabindex="-1"><a class="header-anchor" href="#afficher-les-markers" aria-hidden="true">#</a> Afficher les markers</h2>
<p>Les markers ne s'affichent pas ? C'est normal! Pour l'instant nous n'avons pas mis le code permettant de les afficher. C'est l'étape à laquelle nous sommes.</p>
<p>La logique va être simpliste, nous devons afficher TOUS les éléments contenus dans la variable <code>markerList</code> déclarée précédemment.</p>
<p>Les étapes :</p>
<ul>
<li>Utilisation de <a href="https://vue2-leaflet.netlify.app/components/LMarker.html" target="_blank" rel="noopener noreferrer">l-marker<ExternalLinkIcon/></a></li>
<li>Le mettre en place dans le <code>l-map</code> en suivant la documentation.</li>
<li>Mise en place d'une boucle v-for.</li>
<li>et… c'est tout</li>
<li>Essayer sans regarder la solution.</li>
</ul>
<Reveal text="Voir la solution">
<p>Le marker est à mettre dans le <code>l-map</code>.</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>l-marker</span>
  <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(marker,i) in markerList<span class="token punctuation">"</span></span>
  <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>i<span class="token punctuation">"</span></span>
  <span class="token attr-name">:lat-lng</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>marker<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>l-marker</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></Reveal>
<h2 id="tester-3" tabindex="-1"><a class="header-anchor" href="#tester-3" aria-hidden="true">#</a> Tester</h2>
<p>Toujours avec <code>npm run serve</code>, normalement des markers doivent s'afficher. Tenter d'en ajouter d'autres.</p>
<h2 id="suppression-d-un-marker" tabindex="-1"><a class="header-anchor" href="#suppression-d-un-marker" aria-hidden="true">#</a> Suppression d'un marker</h2>
<p>Bon maintenant qu'il y a plein de marker partout nous allons mettre en place le code pour les supprimer ! Voilà la procédure à suivre :</p>
<ul>
<li>Ajout d'une méthode <code>removeMarker</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">removeMarker</span><span class="token punctuation">(</span><span class="token parameter">markerKey</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>$firebaseRefs<span class="token punctuation">.</span>markerList<span class="token punctuation">.</span><span class="token function">child</span><span class="token punctuation">(</span>markerKey<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>Ajouter la directive sur <code>l-marker</code> :</li>
</ul>
<Reveal text="Voir la solution">
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>@click="() => removeMarker(marker['.key'])"
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></Reveal>
<h2 id="tester-4" tabindex="-1"><a class="header-anchor" href="#tester-4" aria-hidden="true">#</a> Tester</h2>
<p>Tenter de supprimer un marker en cliquant dessus.</p>
<h2 id="tester-a-plusieurs" tabindex="-1"><a class="header-anchor" href="#tester-a-plusieurs" aria-hidden="true">#</a> Tester à plusieurs</h2>
<p>Accéder à plusieurs au même projet (via votre IP) pour tester la synchronisation.</p>
<h2 id="centrer-la-carte-sur-votre-position" tabindex="-1"><a class="header-anchor" href="#centrer-la-carte-sur-votre-position" aria-hidden="true">#</a> Centrer la carte sur votre position</h2>
<p>Profitons des nouvelles fonctionnalités de nos navigateurs pour améliorer notre carte. Actuellement la carte est centrée sur Angers… C'est pratique… Si on se trouve à Angers… dans tous les autres cas, ce n’est pas forcément adapté. Nous allons donc utiliser l'API <code>geolocation</code> de notre navigateur.</p>
<p>Celle-ci permet de localiser une personne en fonction de sa connexion internet (ou GPS / Réseau téléphonique si disponible)</p>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API" target="_blank" rel="noopener noreferrer">Documentation de l'API geolocation<ExternalLinkIcon/></a>.</li>
<li>Ajouter une méthode dans le code dans le composant <code>map.vue</code>.</li>
<li>La méthode doit mettre à jour la Data <code>this.center = [lat, lng]</code>.</li>
<li>La méthode doit être appelée via un clique utilisateur <a href="https://vue2-leaflet.netlify.app/examples/custom-control.html" target="_blank" rel="noopener noreferrer">Documentation de LControl<ExternalLinkIcon/></a></li>
</ul>
<Reveal text="Voir la solution">
<p>template :
Dans le <code>l-map</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>l-control</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>getUserLocation<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Localisez-moi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>l-control</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>methods :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">getUserLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"geolocation"</span> <span class="token keyword">in</span> navigator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    navigator<span class="token punctuation">.</span>geolocation<span class="token punctuation">.</span><span class="token function">getCurrentPosition</span><span class="token punctuation">(</span>
      <span class="token parameter">position</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>myMap<span class="token punctuation">.</span>mapObject<span class="token punctuation">.</span><span class="token function">setView</span><span class="token punctuation">(</span><span class="token punctuation">[</span>position<span class="token punctuation">.</span>coords<span class="token punctuation">.</span>latitude<span class="token punctuation">,</span> position<span class="token punctuation">.</span>coords<span class="token punctuation">.</span>longitude<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token parameter">error</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></Reveal>
<h3 id="integrer-bootstrap" tabindex="-1"><a class="header-anchor" href="#integrer-bootstrap" aria-hidden="true">#</a> Intégrer Bootstrap</h3>
<p>En utilisant la documentation fournie sur le site de <a href="https://bootstrap-vue.org/docs" target="_blank" rel="noopener noreferrer">Vue-Bootstrap<ExternalLinkIcon/></a></p>
<p>Modifier l'affichage du <code>button</code> précédemment ajouté pour lui donner un style plus propre.</p>
<h3 id="ajouter-une-confirmation" tabindex="-1"><a class="header-anchor" href="#ajouter-une-confirmation" aria-hidden="true">#</a> Ajouter une confirmation</h3>
<p>Actuellement la suppression d'un Marker est faite sans confirmation. En utilisant le composant <a href="https://bootstrap-vue.org/docs/components/modal#confirm-message-box" target="_blank" rel="noopener noreferrer">Dialog de VueBootstrap<ExternalLinkIcon/></a> ajoutez une confirmation de suppression.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>$bvModal<span class="token punctuation">.</span><span class="token function">msgBoxConfirm</span><span class="token punctuation">(</span><span class="token string">"Are you sure?"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">confirmation</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Confirmation peut-être true ou false en fonction du choix de l'utilisateur.</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="personalisation-du-marker" tabindex="-1"><a class="header-anchor" href="#personalisation-du-marker" aria-hidden="true">#</a> Personalisation du Marker</h3>
<p>La carte est basique… beaucoup trop ! Et si nous placions des markers différents en fonction du navigateur de l'utilisateur. Je vous laisse réfléchir à comment nous pouvons faire ça :</p>
<ul>
<li>À la fois dans le code.</li>
<li>À la fois dans la base de données.</li>
</ul>
<h3 id="modification-du-marker" tabindex="-1"><a class="header-anchor" href="#modification-du-marker" aria-hidden="true">#</a> Modification du Marker</h3>
<p>En utilisant « Une Dialog » de Bootstrap ajouter le code nécéssaire à la modification du Marker :</p>
<ul>
<li>Un click sur un Marker permet de choisis une nouvelle icône.</li>
<li>Un bouton « valider » enregistre la modification.</li>
</ul>
<h3 id="ajouter-une-ui-a-votre-projet" tabindex="-1"><a class="header-anchor" href="#ajouter-une-ui-a-votre-projet" aria-hidden="true">#</a> Ajouter une UI à votre projet</h3>
<p>Actuellement nous avons une carte pleine page qui s'affiche dès notre arrivée sur le site Internet. C'est pratique, mais finalement je souhaite avoir une interface plus classique avec une NavBar (comme celle de bootstrap).</p>
<p>En utilisant mes talents de design, voilà l'interface que je souhaite obtenir. Vous noterez que j'ai en haut deux boutons me permettant d'accéder à deux fonctions de mon site (Carte &amp; Liste).</p>
<ul>
<li>La Vue carte, est similaire à celle actuelle, elle n’est par contre pas pleine page.</li>
<li>La Vue liste est une vision liste de l'ensemble des points présent en base de données.</li>
</ul>
<p><img src="@source/tp/vuejs/ressources/evolution_carte.png" alt="Évolution"></p>
<div class="custom-container danger"><p class="custom-container-title">Vous allez avoir besoin de plug-in</p>
<p>Je vous rappelle, que si vous souhaitez avoir plusieurs pages dans votre projet. Vous allez avoir besoin du plug-in Vue Router.</p>
<p>Je vous laisse choisir la bonne façon de l'installer.</p>
<p><a href="https://router.vuejs.org/installation.html#npm" target="_blank" rel="noopener noreferrer">Vue Router<ExternalLinkIcon/></a></p>
</div>
</template>
