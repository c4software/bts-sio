<template><h1 id="decouverte-de-cordova" tabindex="-1"><a class="header-anchor" href="#decouverte-de-cordova" aria-hidden="true">#</a> Découverte de Cordova</h1>
<p>Dans ce TP vous allez découvrir la ligne de commande Cordova et créer votre premier TP. Comme les autres TP, utiliser l’aide mémoire Cordova pour trouver les bonnes commandes à chaque étape.</p>
<h2 id="ressources" tabindex="-1"><a class="header-anchor" href="#ressources" aria-hidden="true">#</a> Ressources</h2>
<ul>
<li><a href="https://cordova.apache.org" target="_blank" rel="noopener noreferrer">Le site Cordova<ExternalLinkIcon/></a></li>
<li><a href="https://cordova.apache.org/plugins/" target="_blank" rel="noopener noreferrer">Les plug-ins Cordova<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/c4software/cheatsheet/tree/master/cordova" target="_blank" rel="noopener noreferrer">Aide mémoire Cordova<ExternalLinkIcon/></a></li>
</ul>
<h2 id="installation-de-cordova" tabindex="-1"><a class="header-anchor" href="#installation-de-cordova" aria-hidden="true">#</a> Installation de Cordova</h2>
<p>Pour pouvoir utiliser Cordova, vous allez devoir installer le <code>cordova-cli</code>. La ligne de commande Cordova utilise NodeJS pour fonctionner.</p>
<p>(Normalement NodeJS est déjà installé sur votre poste).</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g cordova
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>L’installation prend quelques minutes, un certain nombre de dépendances NodeJS sont nécessaires au bon fonctionnement.</p>
<p>⚠️ L’installation de Cordova est à effectuer qu’une seule fois sur l’ordinateur.</p>
<h2 id="android" tabindex="-1"><a class="header-anchor" href="#android" aria-hidden="true">#</a> Android</h2>
<p>Dans le TP, vous allez devoir compiler pour la plateforme Android. Vérifier que celle-ci est bien installée en le lançant une première fois.</p>
<ul>
<li>Installer la dernière version du SDK &amp; la version 28.</li>
</ul>
<h2 id="creation-du-projet-«-demo-»" tabindex="-1"><a class="header-anchor" href="#creation-du-projet-«-demo-»" aria-hidden="true">#</a> Création du projet « démo »</h2>
<p>La ligne de commande cordova fournit l’ensemble des éléments pour créer un nouveau projet. Le projet que vous allez créer contient une première « page Web » permettant d’avoir un projet Cordova directement fonctionnel.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova create demo com.chevrollier.demo Demo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Plusieurs paramètres sont nécessaires à la commande, attention à bien les choisir du maintenant.</p>
<h2 id="ajout-d-une-plateforme" tabindex="-1"><a class="header-anchor" href="#ajout-d-une-plateforme" aria-hidden="true">#</a> Ajout d’une plateforme</h2>
<p>Votre projet est maintenant prêt vous allez pouvoir ajout une plateforme. Pour rappel Cordova est un framework de développement capable de gérer plusieurs plateformes :</p>
<ul>
<li>android</li>
<li>ios</li>
<li>browser</li>
<li>…</li>
</ul>
<p>Pour commencer nous allons ajouter la plateforme « générique » à savoir browser, celle-ci nous permettra de tester simplement notre configuration.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova platform <span class="token function">add</span> browser

Using cordova-fetch <span class="token keyword">for</span> cordova-browser@~4.1.0
Adding browser project<span class="token punctuation">..</span>.
Creating Browser project. Path: platforms/browser
Discovered plugin <span class="token string">"cordova-plugin-whitelist"</span> <span class="token keyword">in</span> config.xml. Adding it to the project
Installing <span class="token string">"cordova-plugin-whitelist"</span> <span class="token keyword">for</span> browser
Adding cordova-plugin-whitelist to package.json
Saved plugin info <span class="token keyword">for</span> <span class="token string">"cordova-plugin-whitelist"</span> to config.xml
--save flag or autosave detected
Saving browser@~4.1.0 into config.xml <span class="token function">file</span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>La plateforme étant maintenant ajouté nous pouvons « démarrer » Cordova en utilisant la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova run browser
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/cordova/ressources/run.png" alt="Premier lancement"></p>
<p>Et voilà, le code de démo tourne dans votre navigateur, génial non ? Bon je vois bien que vous êtes déçu…</p>
<h2 id="ajouter-une-seconde-plateforme" tabindex="-1"><a class="header-anchor" href="#ajouter-une-seconde-plateforme" aria-hidden="true">#</a> Ajouter une seconde plateforme</h2>
<p>Bon l’intérêt de Cordova c’est vraiment le mobile, l’utilisation de la plateforme « browser » va nous permettre de valider notre développement sans avoir à brancher son mobile pour valider le fonctionnement.</p>
<p>Pour ajouter la plateforme Android la commande est la suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova platform <span class="token function">add</span> android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Une fois ajouter nous allons pouvoir « lancer » / « compiler » des applications pour Android.</p>
<p>⚠️ Attention, à cette étape nous avons besoin d’un poste correctement équipé pour compiler de l’Android</p>
<h2 id="lancer-l-application" tabindex="-1"><a class="header-anchor" href="#lancer-l-application" aria-hidden="true">#</a> Lancer l’application</h2>
<p>Pour lancer l’application, vous avez deux solutions :</p>
<ul>
<li>Votre téléphone.</li>
<li>Un émulateur (celui du SDK, Bluestack, Genymotion).</li>
</ul>
<h2 id="installation-de-genymotion" tabindex="-1"><a class="header-anchor" href="#installation-de-genymotion" aria-hidden="true">#</a> Installation de Genymotion</h2>
<p>Sous Windows vous avez la possibilité d’installer l’émulateur Genymotion, pour installer celui-ci rendez-vous sur <a href="https://www.genymotion.com/#!/" target="_blank" rel="noopener noreferrer">le site officiel<ExternalLinkIcon/></a>.</p>
<p>Sur l’émulateur le débogage est déjà activé.</p>
<h2 id="lancer-l-application-sur-votre-telephone" tabindex="-1"><a class="header-anchor" href="#lancer-l-application-sur-votre-telephone" aria-hidden="true">#</a> Lancer l’application sur votre téléphone</h2>
<p>Maintenant que nous avons notre plateforme de prête, lançons l’application sur un téléphone Android (oui, pour iOs il faut un Mac).</p>
<h3 id="_1-activer-le-mode-developpeur" tabindex="-1"><a class="header-anchor" href="#_1-activer-le-mode-developpeur" aria-hidden="true">#</a> 1. Activer le mode développeur</h3>
<p>Sur votre téléphone, vous devez activer le mode développeur pour lancer une application depuis un ordinateur. Pour l’activer, rendez-vous dans les Paramètres généraux de l’onglet Système, pour ensuite ouvrir le volet À propos de l’appareil. Une fois que cela est fait, il vous suffit de tapoter par quatre fois le Numéro de Build pour débloquer les Options pour les développeurs.</p>
<p>Le mode développeur débloque les options « avancé » de votre téléphone Android. Vous allez pouvoir activer le lancement à distance d’application (avec adb).</p>
<p>Dans le nouveau Menu activer :</p>
<ul>
<li>Le mode débogage USB pour copier des données entre le terminal et l’ordinateur, installer des applications sur votre appareil.</li>
</ul>
<h3 id="_2-installer-le-driver-adb-pour-l-ordinateur" tabindex="-1"><a class="header-anchor" href="#_2-installer-le-driver-adb-pour-l-ordinateur" aria-hidden="true">#</a> 2. Installer le driver adb pour l’ordinateur</h3>
<p>Votre téléphone est un périphérique usb comment un autre, pour dialoguer avec votre ordinateur a besoin d’un driver. De base votre téléphone est une sorte de « clef usb ». Une fois le debug actif il va devenir un « Android Debug Bridge Device ». Ce mode-là n’est par défaut pas connu par Windows (quelques soit la version), vous devez donc installer un driver. Nous allons utiliser « Universal Adb Drivers » fourni par Clockworkmod :</p>
<ul>
<li>Brancher votre téléphone au PC.</li>
<li><a href="https://adb.clockworkmod.com/" target="_blank" rel="noopener noreferrer">Télécharger<ExternalLinkIcon/></a></li>
</ul>
<h3 id="_3-lancer-l-application-sur-votre-mobile" tabindex="-1"><a class="header-anchor" href="#_3-lancer-l-application-sur-votre-mobile" aria-hidden="true">#</a> 3. Lancer l’application sur votre mobile</h3>
<p>Maintenant que votre mobile est reconnu (il faut peut-être débrancher et rebrancher votre mobile pour que ça fonctionne à 100%), nous allons lancer l’application sur votre mobile, pour ça c’est très simple il suffit de faire sur votre ordinateur :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova run android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="_4-voir-debugger-le-code-de-l-application-sur-votre-mobile" tabindex="-1"><a class="header-anchor" href="#_4-voir-debugger-le-code-de-l-application-sur-votre-mobile" aria-hidden="true">#</a> 4. Voir / Débugger le code de l’application sur votre mobile</h3>
<p>Maintenant que l’application fonctionne sur votre mobile, vous pouvez le débugger en temps réel. Les modifications ne sont bien sûr par permanente par contre elle vous permette de tester des modifications sans pour autant avoir a recompiler votre application. Pour ça rien de plus simple il suffit d’utiliser Google Chrome, dans les options « avancés » de Chrome nous avons le remote debbugging et c’est cette option qui nous intéresse :</p>
<ul>
<li>Ouvrez un nouvel onglet Chrome <RouterLink to="/tp/cordova/chrome:/inspect/#devices">chrome://inspect/#devices</RouterLink></li>
</ul>
<p><img src="@source/tp/cordova/ressources/remote_debug.png" alt="Remote"></p>
<ul>
<li>Patientez quelques secondes votre mobile doit apparaitre dans la liste.</li>
</ul>
<p><img src="@source/tp/cordova/ressources/remote_debug_show.png" alt="Remote">
Votre application (ainsi que vos Tabs Chrome) doit apparaitre dans la liste</p>
<ul>
<li>Sélectionnez le « Inspect » qui correspond à votre application.</li>
</ul>
<p><img src="@source/tp/cordova/ressources/inspect.png" alt="inspect"></p>
<p>Tenter des choses dans la « Console » qui vient de s’ouvrir.</p>
<h2 id="ajouter-un-premier-plug-in" tabindex="-1"><a class="header-anchor" href="#ajouter-un-premier-plug-in" aria-hidden="true">#</a> Ajouter un premier plug-in</h2>
<p>Cordova fonctionne avec des plug-ins, à chaque fois que vous voulez utiliser une fonctionnalité « native » de votre mobile vous devez installer un plug-in. Les plug-ins sont une combinaison de :</p>
<ul>
<li>Le code natif (Android, iOs, …)</li>
<li>Un bridge (interface de communication) JavaScript.</li>
</ul>
<p>Les plug-ins sont disponibles en ligne sur le site :</p>
<ul>
<li><a href="https://cordova.apache.org/plugins/" target="_blank" rel="noopener noreferrer">Plugin Cordova<ExternalLinkIcon/></a></li>
</ul>
<p>Comme toujours, il est possible de trouver des plug-ins (non officel) sur Gitub par exemple, cependant il faut faire attention à leur contenu (il vaux mieux être prudent…).</p>
<h3 id="_1-ajouter-un-plug-in" tabindex="-1"><a class="header-anchor" href="#_1-ajouter-un-plug-in" aria-hidden="true">#</a> 1. Ajouter un plug-in</h3>
<p>Pour ajouter un plugin il suffit de faire :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova plugin <span class="token function">add</span> <span class="token operator">&lt;</span>monPlugin<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Pour l’exemple nous allons ajouter le plug-in <code>cordova-plugin-camera</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova plugin <span class="token function">add</span> cordova-plugin-camera
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Quelques secondes plus tard, votre application est <code>capable</code> d’utiliser la Caméra de votre téléphone 🎉🎉</p>
<h3 id="_2-utiliser-le-plug-in" tabindex="-1"><a class="header-anchor" href="#_2-utiliser-le-plug-in" aria-hidden="true">#</a> 2. Utiliser le plug-in</h3>
<p>Pour le test nous allons utiliser la console pour tester le plug-in :</p>
<ul>
<li>Lancer/Compiler l’application à nouveau sur votre mobile :</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova run android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Lancer le Remote Debug sur Chrome.</li>
<li>Dans la console qui vient de s’ouvrir, faites :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">cameraSuccess</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">cameraError</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
navigator<span class="token punctuation">.</span>camera<span class="token punctuation">.</span><span class="token function">getPicture</span><span class="token punctuation">(</span>cameraSuccess<span class="token punctuation">,</span> cameraError<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Le <code>{}</code> est la liste des options, tester quelques options <a href="https://www.npmjs.com/package/cordova-plugin-camera#module_camera.CameraOptions" target="_blank" rel="noopener noreferrer">disponible ici<ExternalLinkIcon/></a></p>
<h3 id="_3-modifier-le-code-de-demo" tabindex="-1"><a class="header-anchor" href="#_3-modifier-le-code-de-demo" aria-hidden="true">#</a> 3. Modifier le code de démo</h3>
<p>Modifier le code de démonstration pour utiliser le plug-in de manière permanente.</p>
<ul>
<li>Ajouter un bouton.</li>
<li>Ajouter une fonction javascript pour déclencher la caméra</li>
<li>Ajouter un évènement <code>onClick</code> sur le bouton que vous avez créé</li>
</ul>
<h2 id="ajouter-un-second-plug-in" tabindex="-1"><a class="header-anchor" href="#ajouter-un-second-plug-in" aria-hidden="true">#</a> Ajouter un second plug-in</h2>
<p>Pour le second plug-in, nous allons ajouter un plug-in qui n’a pas comme vocation directe d’exposer un bridge en JavaScript. Nous allons ajouter un plug-in qui intègre encore un peu plus une application hybride dans le système Android <code>cordova-plugin-headercolor</code></p>
<p>Le plug-in permet de :</p>
<ul>
<li>HeaderColor is a cordova plugin to change color of header in multitask view. Android devices.</li>
</ul>
<p>Les sources du plug-in sont <a href="https://github.com/tomloprod/cordova-plugin-headercolor" target="_blank" rel="noopener noreferrer">disponibles ici<ExternalLinkIcon/></a></p>
<h3 id="_1-ajouter-le-plug-in" tabindex="-1"><a class="header-anchor" href="#_1-ajouter-le-plug-in" aria-hidden="true">#</a> 1. Ajouter le plug-in</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova plugin <span class="token function">add</span> cordova-plugin-headercolor
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="_2-ajouter-la-configuration-du-plug-in" tabindex="-1"><a class="header-anchor" href="#_2-ajouter-la-configuration-du-plug-in" aria-hidden="true">#</a> 2. Ajouter la configuration du plug-in</h3>
<p>Ajouter dans le fichier <code>config.xml</code> l’élément suivant :</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>preference</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>HeaderColor<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#2959cb<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="_3-lancer-l-application-pour-voir-le-changement" tabindex="-1"><a class="header-anchor" href="#_3-lancer-l-application-pour-voir-le-changement" aria-hidden="true">#</a> 3. Lancer l’application pour voir le changement</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cordova run android
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
