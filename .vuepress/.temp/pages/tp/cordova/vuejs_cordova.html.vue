<template><h1 id="vuejs-et-cordova" tabindex="-1"><a class="header-anchor" href="#vuejs-et-cordova" aria-hidden="true">#</a> VueJS et Cordova</h1>
<p>Maintenant que nous avons vu les bases de Cordova (Création, Plateforme, plug-in). Intéressons-nous à la création d’une vraie application. Dans le monde de Cordova il existe plusieurs façons de faire :</p>
<ul>
<li>Sans Framework.</li>
<li>Avec un framework web classique (type VueJS, ReactJS…)</li>
<li>Avec un framework dédié type Ionic</li>
<li>Avec des solutions comme Phonegap</li>
</ul>
<p>Pour ce TP nous allons réaliser une application en utilisant Cordova + VueJS.</p>
<h2 id="le-projet" tabindex="-1"><a class="header-anchor" href="#le-projet" aria-hidden="true">#</a> Le projet</h2>
<p>Nous allons réaliser une application qui teste plusieurs plug-ins Cordova. Cette application utilisera VueJS et VuetifyJS.</p>
<p><img src="@source/tp/cordova/ressources/sample.png" alt="Sample"></p>
<p>Cette application sera très simple. Mais va permettre de tester la puissance de Cordova, nous allons utiliser les plug-ins suivants :</p>
<ul>
<li>cordova-plugin-dialogs</li>
<li>cordova-plugin-vibration</li>
<li>cordova-plugin-geolocation</li>
<li>cordova-plugin-flashlight</li>
<li>cordova-plugin-camera</li>
<li>phonegap-nfc</li>
<li>cordova-plugin-statusbar</li>
<li>cordova-plugin-headercolor</li>
</ul>
<h2 id="le-code" tabindex="-1"><a class="header-anchor" href="#le-code" aria-hidden="true">#</a> Le code</h2>
<p>Le projet étant assez conséquent je vous propose de partir d’une base déjà faite de l’application. Celle-ci contient :</p>
<ul>
<li>L’accueil</li>
<li>Les scripts pour compiler la partie Cordova</li>
<li>Les plug-ins « préconfigurés » / déclarés dans le fichier <code>config.xml</code>.</li>
</ul>
<p>Le code est <a href="./sources/vuejs-cordova-sample.zip">téléchargeable ici</a></p>
<h2 id="utiliser-le-code-fourni" tabindex="-1"><a class="header-anchor" href="#utiliser-le-code-fourni" aria-hidden="true">#</a> Utiliser le code fourni</h2>
<p>Maintenant que vous avez récupéré le code. Nous allons le rendre fonctionnel pour votre ordinateur.</p>
<h3 id="_1-compiler-une-premiere-fois-le-code-vuejs" tabindex="-1"><a class="header-anchor" href="#_1-compiler-une-premiere-fois-le-code-vuejs" aria-hidden="true">#</a> 1. Compiler une première fois le code (VueJS)</h3>
<p>Le projet étant « non compilé » / « non installé », nous allons devoir dans un premier temps installer les dépendances nécessaires à notre projet. Pour se faire nous allons utiliser <code>npm</code> avec la commande <code>install</code>. Dans le dossier du projet :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Les dépendances « VueJS » s’installent, l’installation peut prendre quelques minutes. Une fois installé tester le fonctionnement avec la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Ouvrez un navigateur et accédez à l’url suivante <a href="http://localhost:8080/" target="_blank" rel="noopener noreferrer">http://localhost:8080/<ExternalLinkIcon/></a> vous devez voir :</p>
<p><img src="@source/tp/cordova/ressources/run1.png" alt="run1"></p>
<ul>
<li>Passer en mode « simulation de mobile » pour être proche de la compilation final.</li>
</ul>
<h3 id="_2-ajouter-la-plateforme-cordova" tabindex="-1"><a class="header-anchor" href="#_2-ajouter-la-plateforme-cordova" aria-hidden="true">#</a> 2. Ajouter la plateforme (Cordova)</h3>
<p>Ajouter la plateforme Android au projet :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> cordova_app/
<span class="token function">mkdir</span> www
cordova platform <span class="token function">add</span> android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>✋ Attention, veiller à bien créer le dossier <code>www</code> pour que l'outil Cordova détecte bien le projet comme étant un projet Cordova.</p>
<h3 id="_3-lancer-sur-votre-mobile-ou-emulateur" tabindex="-1"><a class="header-anchor" href="#_3-lancer-sur-votre-mobile-ou-emulateur" aria-hidden="true">#</a> 3. Lancer sur votre mobile (ou émulateur)</h3>
<p>Maintenant que la plateforme est prête et que notre code est disponible, nous allons compiler l’application pour la lancer sur votre téléphone. La première étape est de « builder » l’application VueJS en version distribuable :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>✋ La configuration de base d’un projet VueJS créé par VueCLI n’est pas forcément le plus adaptée pour Cordova. J’ai donc édité les fichiers :</p>
<ul>
<li><code>build/build.js</code></li>
<li><code>config/index.js</code></li>
</ul>
<p>Vous pouvez jeter un coup d’oeil pour voir les différences avec la version normale. Notamment la partie concernant le file://, cordova utilise l’URI <code>file://</code> pour servir les ressources dans l’APK, par défaut les développeurs de VueCLI ont mis des liens avec <code>/</code> en dur ce qui pose des soucis. J’ai donc remplacé le <code>/</code> par <code>./</code> ce qui corrige le souci.</p>
<p>Maintenant que le « build » est terminé, nous pouvons réaliser le lancement sur le mobile via les commandes suivantes :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> cordova_app/
cordova run android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>✋ Votre mobile doit être connecté à cette étape, l’application va se lancer directement sur votre mobile. Si ce n’est pas le cas il vous faut un émulateur Android sur votre machine.</p>
<h2 id="ajouter-la-vue-localisation" tabindex="-1"><a class="header-anchor" href="#ajouter-la-vue-localisation" aria-hidden="true">#</a> Ajouter la vue Localisation</h2>
<p>Pour commencer, nous allons ajouter la vue « Localisation ». C’est certainement la plus compliquée de toutes, mais c’est celle qui est la plus intéressante en termes de fonctionnement.</p>
<p><img src="@source/tp/cordova/ressources/localisation.png" alt="Localisation"></p>
<ul>
<li>Créer un fichier <code>Localisation.vue</code> dans le dossier <code>views/</code></li>
<li>Ajouter le contenu suivant :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Require Cordova Plugin : cordova-plugin-geolocation</span>

<span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>container fill<span class="token operator">-</span>height fluid<span class="token operator">></span>
    <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"map"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span>v<span class="token operator">-</span>dialog value<span class="token operator">=</span><span class="token string">"isLoading"</span> persistent max<span class="token operator">-</span>width<span class="token operator">=</span><span class="token string">"200"</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>v<span class="token operator">-</span>card<span class="token operator">></span>
        <span class="token operator">&lt;</span>v<span class="token operator">-</span>card<span class="token operator">-</span>text <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"text-center pa-10"</span><span class="token operator">></span>
          <span class="token operator">&lt;</span>v<span class="token operator">-</span>progress<span class="token operator">-</span>circular <span class="token operator">:</span>size<span class="token operator">=</span><span class="token string">"70"</span> indeterminate <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"primary--text"</span><span class="token operator">/</span><span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>card<span class="token operator">-</span>text<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>card<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>dialog<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>container<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
  <span class="token keyword">import</span> <span class="token string">'leaflet/dist/leaflet.css'</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> <span class="token constant">L</span> <span class="token keyword">from</span> <span class="token string">'leaflet'</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span>nativeAlert<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../libs/"</span><span class="token punctuation">;</span>
  <span class="token comment">// Fix for icon problem with webpack</span>
  <span class="token comment">// See https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061</span>
  <span class="token keyword">delete</span> <span class="token constant">L</span><span class="token punctuation">.</span>Icon<span class="token punctuation">.</span><span class="token class-name">Default</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>_getIconUrl<span class="token punctuation">;</span>
  <span class="token constant">L</span><span class="token punctuation">.</span>Icon<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">mergeOptions</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    iconRetinaUrl<span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'leaflet/dist/images/marker-icon-2x.png'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    iconUrl<span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'leaflet/dist/images/marker-icon.png'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    shadowUrl<span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'leaflet/dist/images/marker-shadow.png'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'localisation'</span><span class="token punctuation">,</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        isLoading<span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Init the leaflet map</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>map <span class="token operator">=</span> <span class="token constant">L</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token string">'map'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setView</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">47.47121</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.55198</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token constant">L</span><span class="token punctuation">.</span><span class="token function">tileLayer</span><span class="token punctuation">(</span><span class="token string">'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addTo</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getUserLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">beforeDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// Destroy the map object on leave</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>map <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    methods<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">stopLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isLoading <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">getUserLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Retrieve the current user location</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>geolocation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// If the geolocation is available</span>
          navigator<span class="token punctuation">.</span>geolocation<span class="token punctuation">.</span><span class="token function">getCurrentPosition</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">position</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token comment">// Get the current user position, and create a marker on the map.</span>
            <span class="token comment">// Pssst, look at the position object there is a lot of more information</span>
            <span class="token keyword">let</span> user_position <span class="token operator">=</span> <span class="token punctuation">[</span>position<span class="token punctuation">.</span>coords<span class="token punctuation">.</span>latitude<span class="token punctuation">,</span> position<span class="token punctuation">.</span>coords<span class="token punctuation">.</span>longitude<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token constant">L</span><span class="token punctuation">.</span><span class="token function">marker</span><span class="token punctuation">(</span>user_position<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addTo</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// Set the view on the user position at a correct zoom level</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>map<span class="token punctuation">.</span><span class="token function">setView</span><span class="token punctuation">(</span>user_position<span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stopLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token comment">// If the geolocation plugin not answer or if we reach the timeout</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stopLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">nativeAlert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"positionNotAvailable"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"localisation"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
          <span class="token comment">// If the browser is not compatible</span>
          <span class="token function">nativeAlert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"positionNotAvailable"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"localisation"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stopLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>style scoped<span class="token operator">></span>
  <span class="token punctuation">.</span>container<span class="token punctuation">{</span>
    padding<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  #map<span class="token punctuation">{</span>
    height<span class="token operator">:</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">100</span>vh <span class="token operator">-</span> <span class="token number">50</span>px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    width<span class="token operator">:</span> <span class="token number">100</span><span class="token operator">%</span><span class="token punctuation">;</span>
    z<span class="token operator">-</span>index<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">.</span>loading <span class="token punctuation">{</span>
    position<span class="token operator">:</span> absolute<span class="token punctuation">;</span>
    width<span class="token operator">:</span> <span class="token number">150</span>px<span class="token punctuation">;</span>
    height<span class="token operator">:</span> <span class="token number">150</span>px<span class="token punctuation">;</span>
    bottom<span class="token operator">:</span> <span class="token number">50</span>vh<span class="token punctuation">;</span>
    top<span class="token operator">:</span> <span class="token number">50</span>vh<span class="token punctuation">;</span>
    z<span class="token operator">-</span>index<span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">;</span>
    margin<span class="token operator">:</span> auto<span class="token punctuation">;</span>
    background<span class="token operator">-</span>color<span class="token operator">:</span> white<span class="token punctuation">;</span>
    border<span class="token operator">-</span>radius<span class="token operator">:</span> <span class="token number">5</span>px<span class="token punctuation">;</span>
    left<span class="token operator">:</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token operator">%</span> <span class="token operator">-</span> <span class="token number">50</span>px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    display<span class="token operator">:</span> flex<span class="token punctuation">;</span>
    justify<span class="token operator">-</span>content<span class="token operator">:</span> center<span class="token punctuation">;</span>
    align<span class="token operator">-</span>items<span class="token operator">:</span> center<span class="token punctuation">;</span>
    text<span class="token operator">-</span>align<span class="token operator">:</span> center<span class="token punctuation">;</span>
    padding<span class="token operator">:</span> <span class="token number">10</span>px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br></div></div><ul>
<li>Ajouter l’import dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Localisation <span class="token keyword">from</span> <span class="token string">"@/views/Localisation"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Ajouter l’élément <strong><em>au bon endroit</em></strong> suivant dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
      path<span class="token operator">:</span> <span class="token string">'/localisation'</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">'Localisation'</span><span class="token punctuation">,</span>
      component<span class="token operator">:</span> Localisation
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>Lancer le serveur des developpement :</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Tester l’ajout.</li>
<li>Recompilez l’application et lancez-la sur votre téléphone :</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build
<span class="token builtin class-name">cd</span> cordova_app
cordova run android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="ajouter-la-vue-vibration" tabindex="-1"><a class="header-anchor" href="#ajouter-la-vue-vibration" aria-hidden="true">#</a> Ajouter la vue Vibration</h2>
<p>Cette vue est très simple, elle a pour but d’utiliser le plug-in vibration. Avant de faire le code, je vous propose de regarder la documentation du plug-in <a href="https://github.com/apache/cordova-plugin-vibration#vibrate-recommended" target="_blank" rel="noopener noreferrer">cordova-vibrate<ExternalLinkIcon/></a>. Une fois la documentation lue, passons à l’écriture de la vue.</p>
<p>L’écriture de la fonctionnalité va se dérouler en 3 étapes :</p>
<ul>
<li>Création de <code>Vibration.vue</code> dans <code>views</code>.</li>
<li>Écriture de code de la vue.</li>
<li>Déclaration de la route.</li>
</ul>
<h3 id="_1-le-code" tabindex="-1"><a class="header-anchor" href="#_1-le-code" aria-hidden="true">#</a> 1. Le code</h3>
<p>Le projet étant déjà réalisé le plug-in est déjà installé, il nous suffit donc d’écrire le code de la vue. Je vous laisse la base du code, je vous laisse écrire le code permettant la vibration :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Require Cordova plugin : cordova-plugin-vibration</span>

<span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>container text<span class="token operator">-</span>center<span class="token operator">></span>
    <span class="token operator">&lt;</span>v<span class="token operator">-</span>btn v<span class="token operator">-</span>on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token string">"doVibrate"</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"startVibration"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>btn<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>container<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'vibration'</span><span class="token punctuation">,</span>
    methods<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">doVibrate</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Test si la vibration est disponible</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>vibrate<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// Code ICI (utiliser la documentation bien évidement…)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"[cordova-plugin-vibration] Is required to use this function"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="_2-la-route" tabindex="-1"><a class="header-anchor" href="#_2-la-route" aria-hidden="true">#</a> 2. La route</h3>
<ul>
<li>Ajouter l’import dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vibration <span class="token keyword">from</span> <span class="token string">"@/views/Vibration"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Ajouter l’élément <strong><em>au bon endroit</em></strong> suivant dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">'/vibration'</span><span class="token punctuation">,</span>
    name<span class="token operator">:</span> <span class="token string">'Vibration'</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> Vibration
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="ajouter-la-vue-flash" tabindex="-1"><a class="header-anchor" href="#ajouter-la-vue-flash" aria-hidden="true">#</a> Ajouter la vue Flash</h2>
<p>Une lampe torche c’est drôle non ? Et bien nous allons réaliser une nouvelle page qui aura pour simple but d’allumer (ou éteindre) le flash de votre téléphone. Pour ça nous allons utiliser le plug-in <code>cordova-plugin-flashlight</code>, avant d’écrire le code nous allons lire la documentation à <a href="https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin" target="_blank" rel="noopener noreferrer">l’adresse suivante<ExternalLinkIcon/></a>. C’est fait ? Passons au code.</p>
<p>L’écriture va se dérouler en 3 étapes :</p>
<ul>
<li>Création de <code>Flash.vue</code> dans <code>views</code>.</li>
<li>Écriture de code de la vue.</li>
<li>Déclaration de la route.</li>
</ul>
<p>✋ Petite subtilité! N’oubliez pas, VueJS propose une gestion du cycle de vie. Dans cette vue ça va nous servir, nous allons utiliser le <code>beforeDestroy</code> pour éteindre la lampe si celle si est allumée.</p>
<h3 id="_1-le-code-1" tabindex="-1"><a class="header-anchor" href="#_1-le-code-1" aria-hidden="true">#</a> 1. Le code</h3>
<p>Voici la structure de code. Je vous laisse la compléter.</p>
<p>✋ N’oublier pas de gérer le <code>beforeDestroy</code> pour stopper le flash en changeant de « page »</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>container text<span class="token operator">-</span>center<span class="token operator">></span>
    <span class="token operator">&lt;</span>v<span class="token operator">-</span>btn v<span class="token operator">-</span>on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token string">"toggle"</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> btnTitle <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>btn<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>container<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'flash'</span><span class="token punctuation">,</span>
    <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// Set the ButtonTitle according the plugin state</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setBtnTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">beforeDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// When the view is destroyed turnoff the flashlight</span>
      <span class="token comment">// TODO</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        btnTitle<span class="token operator">:</span> <span class="token string">""</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    methods<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">pluginInstalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Check if the cordova Flashlight is available</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span>plugins<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">"undefined"</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span>flashlight<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">"undefined"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">toggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">pluginInstalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token comment">// Toggle the flashlight state</span>
          <span class="token comment">// TODO Call The plugin</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">switchOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">pluginInstalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token comment">// Turn off the flashlight led</span>
          <span class="token comment">// TODO Call The plugin</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">setBtnTitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Manage the button title state</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">pluginInstalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token comment">// Test if flashlight is On ?</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span>flashlight<span class="token punctuation">.</span><span class="token function">isSwitchedOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>btnTitle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"flashlight.stop"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>btnTitle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"flashlight.start"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>btnTitle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"flashlight.notAvailable"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div><h3 id="_2-la-route-1" tabindex="-1"><a class="header-anchor" href="#_2-la-route-1" aria-hidden="true">#</a> 2. La route</h3>
<ul>
<li>Ajouter l’import dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Flash <span class="token keyword">from</span> <span class="token string">"@/views/Flash"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Ajouter l’élément <strong><em>au bon endroit</em></strong> suivant dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">'/flash'</span><span class="token punctuation">,</span>
    name<span class="token operator">:</span> <span class="token string">'Flash'</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> Flash
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="ajouter-la-vue-camera" tabindex="-1"><a class="header-anchor" href="#ajouter-la-vue-camera" aria-hidden="true">#</a> Ajouter la vue Camera</h2>
<p>Après le flash, pourquoi ne pas prendre une photo? Et bien avec Cordova c’est très simple. En quelques bouts de code JavaScript, vous allez pouvoir utiliser l’appareil photo du téléphone. Nous allons utiliser le plug-in <code>cordova-plugin-camera</code>, avant d’attaquer le code regardez la documentation <a href="https://github.com/apache/cordova-plugin-camera#api-reference-" target="_blank" rel="noopener noreferrer">disponible ici<ExternalLinkIcon/></a>.</p>
<p>L’écriture va se dérouler en 3 étapes :</p>
<ul>
<li>Création de <code>Camera.vue</code> dans <code>views</code>.</li>
<li>Écriture de code de la vue.</li>
<li>Déclaration de la route.</li>
</ul>
<h3 id="_1-le-code-2" tabindex="-1"><a class="header-anchor" href="#_1-le-code-2" aria-hidden="true">#</a> 1. Le code</h3>
<p>Pour la caméra, nous allons « juste » faire une simple vue qui permet de lancer l’appareil photo et on affichera l’image prise dans l’application (tester différentes options pour regarder le fonctionnement du plug-in). Voici la structure de code :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Require Cordova plugin : cordova-plugin-camera</span>

<span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>container text<span class="token operator">-</span>center<span class="token operator">></span>
    <span class="token operator">&lt;</span>img v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">'imagePath !== ""'</span> v<span class="token operator">-</span>bind<span class="token operator">:</span>src<span class="token operator">=</span><span class="token string">"imagePath"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>v<span class="token operator">-</span>btn v<span class="token operator">-</span>on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token string">"takePicture"</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"takePhoto"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>btn<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>container<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span>nativeAlert<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../libs/index"</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'camera'</span><span class="token punctuation">,</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        imagePath<span class="token operator">:</span> <span class="token string">""</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    methods<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// Use the camera plugin to capture image</span>
      <span class="token function">takePicture</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>camera<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          navigator<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">getPicture</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>setPicture<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>error<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
          <span class="token comment">// If the navigator.camera is not available display generic error to the user.</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// Set the picture path in the data of the vue</span>
      <span class="token comment">// this action will automatically update the view.</span>
      <span class="token function">setPicture</span><span class="token punctuation">(</span><span class="token parameter">imagePath</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>imagePath <span class="token operator">=</span> imagePath<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">nativeAlert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"error"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>style scoped<span class="token operator">></span>
  img<span class="token punctuation">{</span>
    width<span class="token operator">:</span> <span class="token number">50</span><span class="token operator">%</span><span class="token punctuation">;</span>
    display<span class="token operator">:</span> block<span class="token punctuation">;</span>
    margin<span class="token operator">:</span> auto<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h3 id="_2-la-route-2" tabindex="-1"><a class="header-anchor" href="#_2-la-route-2" aria-hidden="true">#</a> 2. La route</h3>
<ul>
<li>Ajouter l’import dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vibration <span class="token keyword">from</span> <span class="token string">"@/views/Camera"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Ajouter l’élément <strong><em>au bon endroit</em></strong> suivant dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">'/camera'</span><span class="token punctuation">,</span>
    name<span class="token operator">:</span> <span class="token string">'Camera'</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> Camera
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="un-peu-plus-oui-le-nfc" tabindex="-1"><a class="header-anchor" href="#un-peu-plus-oui-le-nfc" aria-hidden="true">#</a> Un peu plus? Oui! Le NFC</h2>
<p>Il est également possible d’interagir avec la « puce » NFC de votre mobile (si équipé bien sûr). Comme toujours ça passe par un plug-in <code>phonegap-nfc</code> le plug-in est plus complet, mais par contre la lecture du serial number est plutôt simple. C’est ce que l’on va voir dans cette partie.</p>
<p>L’écriture va se dérouler en 3 étapes :</p>
<ul>
<li>Création de <code>Nfc.vue</code> dans <code>views</code>.</li>
<li>Écriture de code de la vue.</li>
<li>Déclaration de la route.</li>
</ul>
<h3 id="_1-le-code-3" tabindex="-1"><a class="header-anchor" href="#_1-le-code-3" aria-hidden="true">#</a> 1. Le code</h3>
<p>Le code de la partie NFC est un peu plus complexe. Pour la démo, j’ai mis un exemple de lecture du « numéro de série » d’un tag NFC (avec historique)</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Require Cordova plugin : phonegap-nfc</span>
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>container text<span class="token operator">-</span>center<span class="token operator">></span>
      <span class="token operator">&lt;</span>span v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"compatible"</span><span class="token operator">></span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"nfcText.waitingTag"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token operator">&lt;</span>br<span class="token operator">></span>
        <span class="token operator">&lt;</span>v<span class="token operator">-</span>dialog v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"dialog"</span> scrollable<span class="token operator">></span>
          <span class="token operator">&lt;</span>template v<span class="token operator">-</span>slot<span class="token operator">:</span>activator<span class="token operator">=</span><span class="token string">"{ on }"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>v<span class="token operator">-</span>btn v<span class="token operator">-</span>on<span class="token operator">=</span><span class="token string">"on"</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"nfcText.history"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>btn<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

          <span class="token operator">&lt;</span>v<span class="token operator">-</span>card<span class="token operator">></span>
            <span class="token operator">&lt;</span>v<span class="token operator">-</span>card<span class="token operator">-</span>title<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"nfcText.history"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>card<span class="token operator">-</span>title<span class="token operator">></span>
            <span class="token operator">&lt;</span>v<span class="token operator">-</span>divider<span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>divider<span class="token operator">></span>
            <span class="token operator">&lt;</span>v<span class="token operator">-</span>card<span class="token operator">-</span>text style<span class="token operator">=</span><span class="token string">"height: 300px;"</span><span class="token operator">></span>
                <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"item in items"</span> v<span class="token operator">-</span>bind<span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"item"</span><span class="token operator">></span>
                  <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>content<span class="token operator">></span>
                    <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>title v<span class="token operator">-</span>text<span class="token operator">=</span><span class="token string">"item"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>title<span class="token operator">></span>
                  <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>content<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">></span>
                <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"items.length === 0"</span><span class="token operator">></span>
                  <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>content<span class="token operator">></span>
                    <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>title v<span class="token operator">-</span>text<span class="token operator">=</span><span class="token string">"$t('nfcText.noHistory')"</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"text-center"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>title<span class="token operator">></span>
                  <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>content<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>card<span class="token operator">-</span>text<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>card<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>dialog<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>
      <span class="token operator">&lt;</span>v<span class="token operator">-</span>btn v<span class="token operator">-</span>on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token string">"showSettings"</span> v<span class="token operator">-</span><span class="token keyword">else</span><span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"nfc_disabled"</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"nfcText.showSettings"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>btn<span class="token operator">></span>
      <span class="token operator">&lt;</span>span v<span class="token operator">-</span><span class="token keyword">else</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"nfcText.notAvailable"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>container<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span>nativeAlert<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../libs"</span><span class="token punctuation">;</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'nfc'</span><span class="token punctuation">,</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        compatible<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        nfc_disabled<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        dialog<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        items<span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">"scanHistory"</span><span class="token punctuation">)</span><span class="token operator">||</span><span class="token string">"[]"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    watch<span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token function-variable function">items</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Watch push on the items data. If a new item is push save it to the « localStorage ».</span>
        localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">"scanHistory"</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// When the view is mounted, register the scan tag event.</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">registerTagEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">beforeDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// When the view is destroyed (user leave), unregister the scan tag event, to avoid scanning tag in other view</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">unregisterTagEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    methods<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">registerTagEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Unregister previously « resume » event listener.</span>
        document<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">"resume"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>registerTagEvent<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span>nfc<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">"undefined"</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token comment">// Nfc is available, waiting for scan</span>
          nfc<span class="token punctuation">.</span><span class="token function">addTagDiscoveredListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayTagId<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>success<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
          <span class="token comment">// Plugin not present or failed to initialized.</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">unregisterTagEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Test if the plugin is defined</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span>nfc<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">"undefined"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          nfc<span class="token punctuation">.</span><span class="token function">removeTagDiscoveredListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayTagId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">displayTagId</span><span class="token punctuation">(</span><span class="token parameter">nfcEvent</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Decode tag data from the plugin</span>
        <span class="token keyword">let</span> tag <span class="token operator">=</span> nfcEvent<span class="token punctuation">.</span>tag<span class="token punctuation">;</span>
        <span class="token keyword">let</span> tagId <span class="token operator">=</span> nfc<span class="token punctuation">.</span><span class="token function">bytesToHexString</span><span class="token punctuation">(</span>tag<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Push the new tag to the saved list</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>tagId<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Show the tag Id to the user</span>
        <span class="token function">nativeAlert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">"nfcText.tagSerial"</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" : "</span> <span class="token operator">+</span> tagId<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">error</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Manage the state</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>e <span class="token operator">===</span> <span class="token string">"NFC_DISABLED"</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>compatible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>nfc_disabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>nfc_disabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>compatible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">success</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>compatible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>nfc_disabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Nfc initialized"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">showSettings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Trigger the phone settings to enable the Nfc settings</span>
        nfc<span class="token punctuation">.</span><span class="token function">showSettings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// To refresh the state of the nfc, we add a listener to the « resume » event.</span>
        <span class="token comment">// The resume event is triggered by cordova when the app is « Resumed ».</span>
        document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"resume"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>registerTagEvent<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br></div></div><h3 id="_2-la-route-3" tabindex="-1"><a class="header-anchor" href="#_2-la-route-3" aria-hidden="true">#</a> 2. La route</h3>
<ul>
<li>Ajouter l’import dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vibration <span class="token keyword">from</span> <span class="token string">"@/views/Nfc"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Ajouter l’élément <strong><em>au bon endroit</em></strong> suivant dans <code>router/index.js</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">'/nfc'</span><span class="token punctuation">,</span>
    name<span class="token operator">:</span> <span class="token string">'Nfc'</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> Nfc
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="evolution-0" tabindex="-1"><a class="header-anchor" href="#evolution-0" aria-hidden="true">#</a> Évolution 0</h3>
<p>L'ensemble de vos boutons d'action ne sont pas centrés… Plutôt moche n'est-ce pas ! Regarder la documentation de Vuetify (par <a href="https://vuetifyjs.com/en/framework/alignment" target="_blank" rel="noopener noreferrer">ici est une bonne piste<ExternalLinkIcon/></a>) et trouver une solution pour aligner les différents boutons.</p>
<h3 id="evolution-1" tabindex="-1"><a class="header-anchor" href="#evolution-1" aria-hidden="true">#</a> Évolution 1</h3>
<p>Le code de la vue NFC est plutôt… complexe ! Remplacez-le <code>v-list</code> de la vue précédente par un tableau <code>v-datatable</code>, attention à bien regarder la documentation.</p>
<h3 id="evolution-2" tabindex="-1"><a class="header-anchor" href="#evolution-2" aria-hidden="true">#</a> Évolution 2</h3>
<p>L'ouverture du menu est actuellement possible, mais uniquement en appuyant sur le bouton, c'est bien, mais ce n’est pas vraiment ce que l'on attend d'une application mobile, heureusement Vuetify propose nativement une option pour effectuer une action via un « swipe ».</p>
<ul>
<li>Pour ça il faut ajouter la directive <a href="https://vuetifyjs.com/en/directives/touch-support#touch-support" target="_blank" rel="noopener noreferrer">v-touch<ExternalLinkIcon/></a>.</li>
<li>Éditer le fichier <code>App.vue</code> ajouter le <code>v-touch</code> sur le <code>v-content</code> comme spécifié dans la documentation.</li>
<li>Sur la direction voulu ajouter l'appel à une <code>methods</code> qui exécute le code :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CustomEvent</span><span class="token punctuation">(</span><span class="token string">"toggleDrawer"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Arrivé ici ? Appelez-moi ! On debrief.</p>
</template>
