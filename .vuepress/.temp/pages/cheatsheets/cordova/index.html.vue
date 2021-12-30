<template><h2 id="aide-memoire-cordova" tabindex="-1"><a class="header-anchor" href="#aide-memoire-cordova" aria-hidden="true">#</a> Aide mémoire Cordova</h2>
<h3 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h3>
<p>Installer Cordova de manière « globale » sur l’ordinateur :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ npm install -g cordova
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="creer" tabindex="-1"><a class="header-anchor" href="#creer" aria-hidden="true">#</a> Créer</h3>
<p>Créer un nouveau projet</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova create demo com.vbrosseau.demo Demo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>Créer un nouveau projet dans le dossier « demo » avec comme namespace « com.vbrosseau.demo . Le namespace doit être unique sur le périphérique de destination.</p>
</blockquote>
<h3 id="les-plateformes" tabindex="-1"><a class="header-anchor" href="#les-plateformes" aria-hidden="true">#</a> Les plateformes</h3>
<p>Lister les plateformes actuellement installé pour le projet</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova platform ls
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Ajouter une plateforme</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova platform add android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Mettre à jour une plateforme</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova platform update android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="les-plugins" tabindex="-1"><a class="header-anchor" href="#les-plugins" aria-hidden="true">#</a> Les plugins</h3>
<p>Lister les plugins actuellement installés</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova plugin ls
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Rechercher un plugin (dans l’annuaire officiel)</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova plugin search device
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Ajouter un plugin</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova plugin add cordova-plugin-device
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Supprimer un plugin</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova plugin rm cordova-plugin-device
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="compilation" tabindex="-1"><a class="header-anchor" href="#compilation" aria-hidden="true">#</a> Compilation</h3>
<p>Création de l’APK Android</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova build android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Lancement de l’application en mode « debug ». Une fois lancer l’application est visible dans <RouterLink to="/cheatsheets/cordova/chrome:/inspect/#devices">Chrome Inspect</RouterLink></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova run android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="tester-dans-son-navigateur" tabindex="-1"><a class="header-anchor" href="#tester-dans-son-navigateur" aria-hidden="true">#</a> Tester dans son navigateur</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ cordova platform add browser
$ cordova run browser
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></template>
