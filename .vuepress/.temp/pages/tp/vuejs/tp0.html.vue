<template><h1 id="prise-en-main-de-vuejs-2-0" tabindex="-1"><a class="header-anchor" href="#prise-en-main-de-vuejs-2-0" aria-hidden="true">#</a> Prise en main de VueJS 2.0</h1>
<p>Dans ce TP nous allons découvrir l'utilisation de VueJS.</p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#initialisation">Initialisation</RouterLink></li><li><RouterLink to="#ah-ouais-c-est-aussi-simple">Ah ouais ? C&#39;est aussi simple !?</RouterLink><ul><li><RouterLink to="#ajout-des-elements">Ajout des éléments</RouterLink></li></ul></li><li><RouterLink to="#tester-votre-code">Tester votre code</RouterLink></li><li><RouterLink to="#un-simple-bouton">Un simple bouton</RouterLink></li><li><RouterLink to="#afficher-une-liste">Afficher une liste</RouterLink><ul><li><RouterLink to="#les-data">Les data</RouterLink></li><li><RouterLink to="#afficher-la-liste">Afficher la liste</RouterLink></li></ul></li><li><RouterLink to="#ajouter-un-element-dans-la-liste">Ajouter un élément dans la liste</RouterLink></li><li><RouterLink to="#et-via-un-input">Et via un input ?</RouterLink></li><li><RouterLink to="#et-via-un-input-2">Et via un input 2 ?</RouterLink></li><li><RouterLink to="#l-input-n-est-pas-vide">L&#39;input n&#39;est pas vidé ?</RouterLink></li></ul></nav>
</details>
<h2 id="initialisation" tabindex="-1"><a class="header-anchor" href="#initialisation" aria-hidden="true">#</a> Initialisation</h2>
<p>Ajouter VueJS dans un projet est aussi simple que d'ajouter une librairie. Première étape, créer un fichier <code>index.html</code> puis insérer à l'intérieur « une structure HTML 5 »</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Si vous utilisez Visual Studio Code, vous pouvez faire html:5<kbd>Tab</kbd> une structure HTML sera automatiquement écrite.</p>
</div>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fr<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Démo VueJS<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- Votre code ici --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Pour ajouter VueJS dans la page ? Il faut juste ajouter la balise script suivante dans le « head » de votre page :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Et voilà !</p>
<h2 id="ah-ouais-c-est-aussi-simple" tabindex="-1"><a class="header-anchor" href="#ah-ouais-c-est-aussi-simple" aria-hidden="true">#</a> Ah ouais ? C'est aussi simple !?</h2>
<p>Bon en vrai on va devoir ajouter quelques petits trucs… Si vous avez suivi pendant mon cours :</p>
<ul>
<li>Une balise « racine » qui contiendra notre template.</li>
<li>Une balise script qui contiendra notre code JavaScript.</li>
</ul>
<h3 id="ajout-des-elements" tabindex="-1"><a class="header-anchor" href="#ajout-des-elements" aria-hidden="true">#</a> Ajout des éléments</h3>
<p>Remplacer le commentaire <code>&lt;!-- Votre code ici --&gt;</code> par</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    el<span class="token operator">:</span> <span class="token string">"#app"</span><span class="token punctuation">,</span>
    <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Ding ! 🍪 Votre code fonctionne !"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>🚀 Et voilà ! Là c'est vraiment tout. Votre code est prêt. Vous pouvez faire du VueJS 🍪.</p>
<h2 id="tester-votre-code" tabindex="-1"><a class="header-anchor" href="#tester-votre-code" aria-hidden="true">#</a> Tester votre code</h2>
<p>Votre code doit dès à présent fonctionner ! Vérifier dans la console de votre navigateur que vous avez la phrase :</p>
<p><code>Ding ! 🍪 Votre code fonctionne !</code></p>
<h2 id="un-simple-bouton" tabindex="-1"><a class="header-anchor" href="#un-simple-bouton" aria-hidden="true">#</a> Un simple bouton</h2>
<p>Nous allons ajouter un simple « button » dans notre page. Celui-ci affichera une <code>alert</code> lorsque l'utilisateur clique dessus. Modifier votre objet VueJS pour qu'il ressemble à :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">"#app"</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Ding ! 🍪 Votre code fonctionne !"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"🎉 Bravo 🎉"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Vous venez de déclarer une nouvelle méthode, celle-ci ce nomme <code>action</code>, celle-ci affiche « Bravo ». Il faut donc maintenant l'appeler…</p>
<p>En VueJS, c'est simple ! Il vous suffit d'ajouter <em>dans</em> <code>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</code> un bouton. Après modification votre code doit ressembler à :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>action<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Clique ici<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>🤓 Notez le <code>@click=&quot;action&quot;</code> qui fait référence à votre méthode <code>action</code>.</p>
<p>🚀 Tester votre code.</p>
<h2 id="afficher-une-liste" tabindex="-1"><a class="header-anchor" href="#afficher-une-liste" aria-hidden="true">#</a> Afficher une liste</h2>
<p>Un bouton c'est bien, mais une liste c'est mieux non ? Vous allez voir qu'afficher une liste c'est aussi simple qu'un bonjour 👋. Comme vu ensemble en cours nous allons :</p>
<ul>
<li>Déclarer les <code>data</code>.</li>
<li>Faire un <code>v-for</code> dans le code.</li>
</ul>
<h3 id="les-data" tabindex="-1"><a class="header-anchor" href="#les-data" aria-hidden="true">#</a> Les data</h3>
<p>Vous vous souvenez comment déclarer les datas ? Non !? un petit rappel alors, nous allons déclarer un tableau (<code>[]</code>) directement dans la méthode <code>data</code> de notre objet VueJS. Quelque chose comme :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        liste<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Item 1"</span><span class="token punctuation">,</span> <span class="token string">"Item 2"</span><span class="token punctuation">,</span> <span class="token string">"Item 3"</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>🤓 Notez que la variable est nommée <code>liste</code>.</p>
<p>Une fois intégré à votre code :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">"#app"</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Ding ! 🍪 Votre code fonctionne !"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      liste<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"🎉 Bravo 🎉"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>🚀 Valider avec les Vue Dev Tools que votre liste est bien présente.</p>
<h3 id="afficher-la-liste" tabindex="-1"><a class="header-anchor" href="#afficher-la-liste" aria-hidden="true">#</a> Afficher la liste</h3>
<p>Pour afficher la liste nous allons devoir faire un <code>v-for</code> sur l'élément qui sera <code>répété</code> ou <code>afficher plusieurs fois</code>. Exemple :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item in liste<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Ajouter le code HTML dans la <code>div#data</code>, vous devez obtenir :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>action<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Clique ici<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item in liste<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{item}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>🚀 Tester votre application ! Vous devez voir les éléments de votre liste.</p>
<p>🤓 Tester d'ajouter un élément « à la main » via les VueJS dev tools.</p>
<h2 id="ajouter-un-element-dans-la-liste" tabindex="-1"><a class="header-anchor" href="#ajouter-un-element-dans-la-liste" aria-hidden="true">#</a> Ajouter un élément dans la liste</h2>
<p>Le but de VueJS c'est aussi de rendre simple la modification de la vue / template / affichage. Nous allons (enfin vous…) modifier le code précédent pour ajouter dans la liste l'élément saisi par l'utilisateur :</p>
<p>Modifier la méthode action pour y mettre le code suivante :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>liste<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">"Entrer une valeur"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>🚀 Tester votre code</p>
<h2 id="et-via-un-input" tabindex="-1"><a class="header-anchor" href="#et-via-un-input" aria-hidden="true">#</a> Et via un input ?</h2>
<p>Un prompt c'est « pas très beau » non ? Passer par un input HTML serait quand même plus sympa ! Pour ça rien de plus simple, ajouter le code suivant dans <code>#app</code> :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span>
  <span class="token attr-name">@keyup.enter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>liste.push($refs[<span class="token punctuation">'</span>input<span class="token punctuation">'</span>].value)<span class="token punctuation">"</span></span>
  <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>☝️ Quelques explications :</p>
<ul>
<li><code>@keyup.enter</code> permet de déclarer une méthode qui sera appelée lors de l'appui sur la touche entrée.</li>
<li><code>ref</code> permet de déclarer une référence vers l'élément HTML, celui-ci sera ensuite disponible par <code>$refs['input']</code></li>
</ul>
<h2 id="et-via-un-input-2" tabindex="-1"><a class="header-anchor" href="#et-via-un-input-2" aria-hidden="true">#</a> Et via un input 2 ?</h2>
<p>La première solution est pas trop mal, mais, utiliser les data est serait certainement une meilleure idée. Autre solution, mais tout aussi simple (et certainement bien meilleur).</p>
<ul>
<li>Déclarer une nouvelle variable dans les <code>data</code>, exemple, dans mon cas la variable est <code>saisie</code> :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        saisie<span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
        liste<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Item"</span><span class="token punctuation">,</span> <span class="token string">"Item 2"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li>Ajouter un input qui utiliser la variable saisie :</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>saisie<span class="token punctuation">"</span></span> <span class="token attr-name">@keyup.enter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>liste.push(saisie)<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>☝️ Quelques explications :</p>
<ul>
<li><code>v-model</code> permet de connecter la variable saisie à votre input.</li>
<li><code>@keyup.enter</code> permet de déclarer une méthode qui sera appelée lors de l'appui sur la touche entrée.</li>
</ul>
<h2 id="l-input-n-est-pas-vide" tabindex="-1"><a class="header-anchor" href="#l-input-n-est-pas-vide" aria-hidden="true">#</a> L'input n'est pas vidé ?</h2>
<p>Comme vous l'avez très certainement remarqué, le champ n'est pas vidé après une saisie… Vous avez deux solutions pour faire ça:</p>
<ul>
<li>Modifier le code dans le <code>@keyup.enter</code> pour effacer la variable <code>saisie</code>. (Via la création d'une nouvelle méthode dans votre objet).</li>
<li>Autre solution via un watcher sur la variable <code>saisie</code>.</li>
</ul>
<p>C'est à vous implémenté la première solution, puis la seconde.</p>
</template>
