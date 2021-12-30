<template><h1 id="vuetify-vuejs-2-0" tabindex="-1"><a class="header-anchor" href="#vuetify-vuejs-2-0" aria-hidden="true">#</a> Vuetify + VueJS 2.0</h1>
<p>Dans ce TP nous allons voir dans un premier temps comment créer une application VueJS avec VueCLI. Puis à partir de ce projet, nous allons y ajouter la librairie Vuetify afin de manipuler des composants fournis par un développeur tiers.</p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#installer-vuecli">Installer VueCLI</RouterLink><ul><li><RouterLink to="#nodejs">NodeJS</RouterLink></li><li><RouterLink to="#vue-cli">Vue-cli</RouterLink></li></ul></li><li><RouterLink to="#creation-du-projet">Création du projet</RouterLink></li><li><RouterLink to="#tester">Tester</RouterLink></li><li><RouterLink to="#ajouter-vuetify">Ajouter Vuetify</RouterLink></li><li><RouterLink to="#tester-a-nouveau">Tester à nouveau</RouterLink></li><li><RouterLink to="#simplifier-le-code-fourni">Simplifier le code fourni</RouterLink></li><li><RouterLink to="#modifier-le-app-vue">Modifier le App.vue</RouterLink></li><li><RouterLink to="#test-evolutions">Test &amp; Évolutions</RouterLink><ul><li><RouterLink to="#le-bouton">Le bouton</RouterLink></li><li><RouterLink to="#ajouter-une-card">Ajouter une card</RouterLink></li><li><RouterLink to="#ajouter-une-liste">Ajouter une liste</RouterLink></li></ul></li><li><RouterLink to="#creer-un-composant">Créer un composant</RouterLink><ul><li><RouterLink to="#creation-du-composant">Création du composant</RouterLink></li><li><RouterLink to="#deplacer-le-code-de-votre-composant">Déplacer le code de votre composant</RouterLink></li><li><RouterLink to="#utiliser-votre-composant">Utiliser votre composant</RouterLink></li></ul></li><li><RouterLink to="#ajouter-«-un-router-»">Ajouter « un router »</RouterLink><ul><li><RouterLink to="#ajout-du-plugin">Ajout du plugin</RouterLink></li><li><RouterLink to="#regarder-les-modifications">Regarder les modifications</RouterLink></li><li><RouterLink to="#creation-d-une-nouvelle-vue">Création d&#39;une nouvelle vue</RouterLink></li><li><RouterLink to="#et-pour-le-contenu">Et pour le contenu ?</RouterLink></li><li><RouterLink to="#ajout-d-une-appbar">Ajout d&#39;une AppBar</RouterLink></li><li><RouterLink to="#aller-plus-loin">Aller plus loin ?</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="installer-vuecli" tabindex="-1"><a class="header-anchor" href="#installer-vuecli" aria-hidden="true">#</a> Installer VueCLI</h2>
<p>⚠️ Si vous ne l'avez pas déjà sur votre ordinateur ⚠️</p>
<p>Nous allons avoir besoin de plusieurs outils :</p>
<ul>
<li>NodeJS</li>
<li>Vue-cli</li>
</ul>
<h3 id="nodejs" tabindex="-1"><a class="header-anchor" href="#nodejs" aria-hidden="true">#</a> NodeJS</h3>
<p>La première étape va être l’installation de NodeJS, la démarche est différente en fonction de votre environnement, mais pour résumer :</p>
<ul>
<li><a href="https://nodejs.org/en/download/" target="_blank" rel="noopener noreferrer">sous Windows c’est ici<ExternalLinkIcon/></a> prendre la version CURRENT.</li>
<li>Sous OSX le plus simple c’est via <a href="https://brew.sh" target="_blank" rel="noopener noreferrer">Brew<ExternalLinkIcon/></a> <code>brew install nodejs</code>.</li>
<li>Sous Linux c’est via le gestionnaire de paquet <code>apt install nodejs</code>.</li>
</ul>
<p>Une fois installé, vous êtes prêt, vous allez pouvoir installer l’outil VueCLI.</p>
<h3 id="vue-cli" tabindex="-1"><a class="header-anchor" href="#vue-cli" aria-hidden="true">#</a> Vue-cli</h3>
<p>Vue-cli est un outil qui simplifie la création d’un nouveau projet Vue-JS à partir de template fourni par la communauté.</p>
<p>Pour ceux sous Windows lancer <code>Node.js Command Prompt</code> :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g @vue/cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Pour ceux sous Linux / OSX lancer dans un terminal :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g @vue/cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vous venez d'installer vue-cli. Vous avez maintenant à votre disposition sur votre ordinateur une nouvelle commande, la commande <code>vue</code>.</p>
<h2 id="creation-du-projet" tabindex="-1"><a class="header-anchor" href="#creation-du-projet" aria-hidden="true">#</a> Création du projet</h2>
<p>Créer un nouveau projet est très simple il suffit de saisir la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue create le-nom-du-projet
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>ou dans notre cas :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue create vuetify-vuejs
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Votre ordinateur va vous poser quelques questions :</p>
<p><img src="@source/tp/vuejs/ressources/vuecli-create.png" alt="vuecli"></p>
<p>Pour l'instant, nous allons rester sur VueJS 2.0 comme évoqué en cours. Valider votre choix avec la trouche entrée.</p>
<p>Vue-CLI est entrain d'installer l'ensemble des dépendances nécessaire au bon fonctionnement de votre application. Cette étape va prendre quelques secondes / minutes.</p>
<h2 id="tester" tabindex="-1"><a class="header-anchor" href="#tester" aria-hidden="true">#</a> Tester</h2>
<p>Pour lancer votre projet, il suffit de suivre les commandes proposées par votre console à savoir :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>🎉  Successfully created project vuetify-vuejs.
👉  Get started with the following commands:

 $ <span class="token builtin class-name">cd</span> vuetify-vuejs // <span class="token operator">&lt;</span>-- Étape <span class="token number">1</span>
 $ <span class="token function">npm</span> run serve  // <span class="token operator">&lt;</span>--  Étape <span class="token number">2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Toujours dans votre terminal :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> vuetify-vuejs
<span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Rappel, la commande <code>cd</code> permet de vous déplacer dans le dossier <code>vuetify-vuejs</code>.
La commande <code>npm run serve</code> est une commande interne à votre projet, elle va lancer un « serveur » qui vous permettra de tester votre code pendant la phase de développement.</p>
</div>
<p>Votre code <a href="https://localhost:8080" target="_blank" rel="noopener noreferrer">est disponible ici<ExternalLinkIcon/></a></p>
<p>Vous devez voir quelque chose qui ressemble à</p>
<p><img src="@source/tp/vuejs/ressources/vuejs-init.png" alt="vuejs"></p>
<h2 id="ajouter-vuetify" tabindex="-1"><a class="header-anchor" href="#ajouter-vuetify" aria-hidden="true">#</a> Ajouter Vuetify</h2>
<p>Maintenant que votre code fonctionne, nous allons le faire évoluer pour ajouter Vuetify. Avec Vue-Cli c'est très simple. Il suffit de saisir une commande.</p>
<div class="custom-container danger"><p class="custom-container-title">ATTENTION</p>
<p>la commande va modifier en profondeur votre projet. Il ne faut pas la faire à n'importe quel moment. Il est préférable de faire celle-ci <em>au début de la création de votre projet</em>.</p>
</div>
<p>Dans le dossier de votre projet :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue <span class="token function">add</span> vuetify
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>ET C'EST TOUT !</p>
<p>Votre projet va être modifié, afin d'inclure vuetify.</p>
<h2 id="tester-a-nouveau" tabindex="-1"><a class="header-anchor" href="#tester-a-nouveau" aria-hidden="true">#</a> Tester à nouveau</h2>
<p>Pour tester, il suffit de saisir à nouveau la commande <code>npm run serve</code>.</p>
<p>Votre projet est maintenant différent, il doit ressembler à</p>
<p><img src="@source/tp/vuejs/ressources/vuetify-init.png" alt="vuetify-init"></p>
<p>🤔 Sacrée différence n'est-ce pas ?</p>
<h2 id="simplifier-le-code-fourni" tabindex="-1"><a class="header-anchor" href="#simplifier-le-code-fourni" aria-hidden="true">#</a> Simplifier le code fourni</h2>
<p>Le but de ce TP est de découvrir le fonctionnement de VueJS et de Vuetify, nous allons simplifier le code dès à présent pour n'en garder que l'essentiel.</p>
<h2 id="modifier-le-app-vue" tabindex="-1"><a class="header-anchor" href="#modifier-le-app-vue" aria-hidden="true">#</a> Modifier le App.vue</h2>
<p><em>Remplacer</em> le contenu du fichier <code>App.vue</code> par le code code suivante :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-app</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-app-bar</span> <span class="token attr-name">app</span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>primary<span class="token punctuation">"</span></span> <span class="token attr-name">dark</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-toolbar-title</span><span class="token punctuation">></span></span>{{ school }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-toolbar-title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-app-bar</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-main</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text-center pa-10<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>👋 Bonjour 👋<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!-- Votre Code ICI --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-main</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-app</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">"App"</span><span class="token punctuation">,</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> school<span class="token operator">:</span> <span class="token string">"MyDigitalSchool"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>Tester à nouveau votre application.</p>
<h2 id="test-evolutions" tabindex="-1"><a class="header-anchor" href="#test-evolutions" aria-hidden="true">#</a> Test &amp; Évolutions</h2>
<p>Afin de tester les possibilités de Vuetify, nous allons ajouter des éléments dans l'interface. <em>En vous servant de la documentation</em>.</p>
<p>Dans la balise <code>v-main</code> nous allons ajouter :</p>
<ul>
<li>Un bouton</li>
<li>Une card</li>
<li>Une liste</li>
</ul>
<h3 id="le-bouton" tabindex="-1"><a class="header-anchor" href="#le-bouton" aria-hidden="true">#</a> Le bouton</h3>
<p><a href="https://vuetifyjs.com/en/components/buttons/" target="_blank" rel="noopener noreferrer">En suivant la documentation<ExternalLinkIcon/></a> ajouter le code <em>à la place du commentaire « votre code ici »</em> inséré :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-btn</span><span class="token punctuation">></span></span>Clique ici<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-btn</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>🤓 Vérifier que celui-ci s'affiche comme attendu.</p>
<p>À faire :</p>
<ul>
<li>Ajouter un <code>@click</code> qui affiche une alerte quand vous cliquez sur votre bouton.</li>
<li>Modifier le comportement pour que votre bouton soit un <code>block</code> (100% de la largeur).</li>
</ul>
<h3 id="ajouter-une-card" tabindex="-1"><a class="header-anchor" href="#ajouter-une-card" aria-hidden="true">#</a> Ajouter une card</h3>
<p>Le composant Card est un conteneur, il va nous permettre d'ajouter d'autres éléments dedans. Il est utile pour symboliser à votre utilisateur les éléments importants.</p>
<p><a href="https://vuetifyjs.com/en/components/cards/#misc" target="_blank" rel="noopener noreferrer">Toujours en utilisant la documentation<ExternalLinkIcon/></a> ajouter le code suivant :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-card</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-card-text</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- Votre contenu ici --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-card-text</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-card</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Vérifier que votre <code>card</code> s'affiche correctement.</p>
<p>À faire :</p>
<ul>
<li>Modifier la couleur de la card avec les attributs suivants <code>color=&quot;#385F73&quot; dark</code>.</li>
</ul>
<h3 id="ajouter-une-liste" tabindex="-1"><a class="header-anchor" href="#ajouter-une-liste" aria-hidden="true">#</a> Ajouter une liste</h3>
<p>Le composant « Liste » va nous permettre d'afficher du contenu « sous forme de liste »… Incroyable non ?</p>
<p>Comme dans les précédents exemples pour réaliser le code <em>vous devez</em> <a href="https://vuetifyjs.com/en/components/lists/#usage" target="_blank" rel="noopener noreferrer">utiliser la documentation<ExternalLinkIcon/></a>.</p>
<p>Ajouter <em>dans</em> la balise <code>v-card-text</code> le code suivant :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-list-item</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-list-item-content</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-list-item-title</span><span class="token punctuation">></span></span>Votre texte<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-list-item-title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-list-item-content</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-list-item</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>À faire :</p>
<ul>
<li>Déclarer une liste dans les <code>data</code> de votre objet. <em>Exemple :</em> <code>list: [&quot;A&quot;, &quot;B&quot;, &quot;C&quot;]</code>.</li>
<li>Répéter la balise <code>v-list-item-content</code> autant de fois qu'il y a d'éléments dans la liste (<em>en utilisant un <code>v-for</code></em>)</li>
</ul>
<h2 id="creer-un-composant" tabindex="-1"><a class="header-anchor" href="#creer-un-composant" aria-hidden="true">#</a> Créer un composant</h2>
<p>Le principe même de VueJS c'est la création de composants. Pour l'instant nous avons tout mis dans « le App.vue », ça fonctionne… mais clairement pas idéal.</p>
<p>Nous allons donc remédier à ça en créant votre premier composant.</p>
<h3 id="creation-du-composant" tabindex="-1"><a class="header-anchor" href="#creation-du-composant" aria-hidden="true">#</a> Création du composant</h3>
<p>Première étape créer le fichier <code>.vue</code> de <em>votre</em> composant.</p>
<ul>
<li>Créer un nouveau fichier nommé <code>Home.vue</code> dans le dossier <code>components</code>.</li>
</ul>
<p>La structure de fichier est la suivante :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- Votre Code ICI --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">"Home"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="deplacer-le-code-de-votre-composant" tabindex="-1"><a class="header-anchor" href="#deplacer-le-code-de-votre-composant" aria-hidden="true">#</a> Déplacer le code de votre composant</h3>
<p>Maintenant que votre composant est prêt. Déplacer le contenu du <em>v-main</em> dans le template de votre nouveau composant.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>N'oubliez pas de prendre également les <code>data</code> associées à votre vue.</p>
</div>
<h3 id="utiliser-votre-composant" tabindex="-1"><a class="header-anchor" href="#utiliser-votre-composant" aria-hidden="true">#</a> Utiliser votre composant</h3>
<p>Pour utiliser un composant vous devez réaliser trois opérations :</p>
<ul>
<li>Le déclarer dans les imports.</li>
<li>Le déclarer dans la page où vous souhaitez l'utiliser.</li>
<li>L'utiliser dans votre template.</li>
</ul>
<p>Voilà un exemple :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Home</span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">"./components/Home.vue"</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">"App"</span><span class="token punctuation">,</span>
    components<span class="token operator">:</span> <span class="token punctuation">{</span>
      Home<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>À faire:</p>
<ul>
<li>Adapter le code fourni pour l'utiliser dans votre projet.</li>
</ul>
<h2 id="ajouter-«-un-router-»" tabindex="-1"><a class="header-anchor" href="#ajouter-«-un-router-»" aria-hidden="true">#</a> Ajouter « un router »</h2>
<p>Le Router va nous permettre de créer plusieurs pages dans notre site / application. « Avant » vous aviez l'habitude de simplement créer un fichier PHP / HTML et celui-ci était automatiquement disponible.</p>
<p>Avec <em>VueJS en mode application</em> ça sera un peu différent, nous allons devoir ajouter un router qui nous permettra de faire correspondre « Un lien » et « une page ».</p>
<h3 id="ajout-du-plugin" tabindex="-1"><a class="header-anchor" href="#ajout-du-plugin" aria-hidden="true">#</a> Ajout du plugin</h3>
<p>La première étape est l'ajout du plugin. Avec <code>vue cli</code> il nous suffit de faire <em>dans le bon dossier</em>.</p>
<div class="custom-container danger"><p class="custom-container-title">ATTENTION</p>
<p>Comme l'installation de Vuetify cette étape va reconfigurer « de manière » importante votre projet. Ça veut dire que votre fichier <code>App.vue</code> va être remplacé par une nouvelle version qui contiendra le nécessaire au bon fonctionnement du VueRouter.</p>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue <span class="token function">add</span> router
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="regarder-les-modifications" tabindex="-1"><a class="header-anchor" href="#regarder-les-modifications" aria-hidden="true">#</a> Regarder les modifications</h3>
<p>En quelques mots :</p>
<ul>
<li>Le fichier <code>App.vue</code> est différent.</li>
<li>Le dossier <code>router</code>.</li>
<li>Le dossier <code>view</code>.</li>
</ul>
<p>Arrêtons-nous ensemble pour regarder les modifications en détail.</p>
<h3 id="creation-d-une-nouvelle-vue" tabindex="-1"><a class="header-anchor" href="#creation-d-une-nouvelle-vue" aria-hidden="true">#</a> Création d'une nouvelle vue</h3>
<p>Ajouter un nouveau fichier <code>vue</code> dans le dossier <code>view</code>. Nommé le comme bon vous semble c'est votre page 🥰.</p>
<h3 id="et-pour-le-contenu" tabindex="-1"><a class="header-anchor" href="#et-pour-le-contenu" aria-hidden="true">#</a> Et pour le contenu ?</h3>
<p>Pour le contenu, je vous laisse réutiliser le composant que vous avez précédemment créé.</p>
<h3 id="ajout-d-une-appbar" tabindex="-1"><a class="header-anchor" href="#ajout-d-une-appbar" aria-hidden="true">#</a> Ajout d'une AppBar</h3>
<p>Nous avons maintenant plusieurs pages, nous allons donc remettre notre AppBar. <a href="https://vuetifyjs.com/en/components/app-bars/#dense" target="_blank" rel="noopener noreferrer">En utilisant la documentation<ExternalLinkIcon/></a> remettre la AppBar dans le fichier <code>App.vue</code>.</p>
<p>À faire :</p>
<ul>
<li>Ajouter un titre.</li>
<li>Ajouter au bout 3 boutons nous permettant de naviguer entre les pages.</li>
</ul>
<h3 id="aller-plus-loin" tabindex="-1"><a class="header-anchor" href="#aller-plus-loin" aria-hidden="true">#</a> Aller plus loin ?</h3>
<p>Dans le monde du mobile, les menus de navigation sont appelés des <code>Navigations Drawers</code>. Ce composant existe également chez Vuetify.</p>
<p><a href="https://vuetifyjs.com/en/components/navigation-drawers/#props" target="_blank" rel="noopener noreferrer">En utilisant la documentation<ExternalLinkIcon/></a> implémenté un <code>Navigation Drawer</code> dans votre application.</p>
</template>
