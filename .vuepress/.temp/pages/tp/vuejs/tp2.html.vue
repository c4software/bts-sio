<template><h1 id="realiser-une-application-avec-vuejs-2-0" tabindex="-1"><a class="header-anchor" href="#realiser-une-application-avec-vuejs-2-0" aria-hidden="true">#</a> Réaliser une application avec VueJS 2.0</h1>
<p>Dans ce TP nous allons voir une autre façon d’utiliser VueJS, une façon plus moderne, celle qui utilise à 100% le modèle MVVM (Modèle Vue, Vue-Modèle) ainsi que la puissance de VueJS (<code>.vue</code>, VueCli, ES5).</p>
<p><img src="@source/tp/vuejs/MVVMPattern.png" alt="MVVM"></p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#mvvm-en-quelques-mots">MVVM en quelques mots</RouterLink></li><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#initialisation-du-projet">Initialisation du projet</RouterLink><ul><li><RouterLink to="#nodejs">NodeJS</RouterLink></li><li><RouterLink to="#vue-cli">Vue-cli</RouterLink></li></ul></li><li><RouterLink to="#installation-des-librairies-du-projet">Installation des librairies (du projet)</RouterLink></li><li><RouterLink to="#premier-lancement-l-exemple">Premier lancement (l’exemple)</RouterLink></li><li><RouterLink to="#le-serveur-de-developpement">Le serveur de développement</RouterLink></li><li><RouterLink to="#le-code-source">Le code source</RouterLink><ul><li><RouterLink to="#l-ide">L’IDE</RouterLink></li><li><RouterLink to="#installation-des-plug-ins">Installation des plug-ins</RouterLink></li><li><RouterLink to="#la-structure">La structure</RouterLink></li><li><RouterLink to="#lancer-le-projet">Lancer le projet</RouterLink></li><li><RouterLink to="#transformer-le-template-de-base">Transformer le template de base</RouterLink></li><li><RouterLink to="#creation-de-mytoolbar">Création de myToolbar</RouterLink></li><li><RouterLink to="#modifier-la-«-home-»">Modifier la « home »</RouterLink></li><li><RouterLink to="#voir-le-changement">Voir le changement</RouterLink></li></ul></li><li><RouterLink to="#le-routeur">Le Routeur</RouterLink><ul><li><RouterLink to="#declarer-du-texte-dans-vue-i18n">Déclarer du texte dans Vue-i18n</RouterLink></li><li><RouterLink to="#declarer-un-nouveau-texte">Déclarer un nouveau texte</RouterLink></li><li><RouterLink to="#tester">Tester</RouterLink></li></ul></li><li><RouterLink to="#les-vues">Les .vues</RouterLink><ul><li><RouterLink to="#la-page-accueil">La page : Accueil</RouterLink></li><li><RouterLink to="#la-page-a-propos">La page : À Propos</RouterLink></li><li><RouterLink to="#ajout-du-drawer">Ajout du : Drawer</RouterLink></li><li><RouterLink to="#la-page-historique">La page : Historique</RouterLink></li></ul></li><li><RouterLink to="#ajouter-une-page-permettant-un-ajout-manuel">Ajouter une page permettant un ajout manuel</RouterLink><ul><li><RouterLink to="#demarche-1">Démarche</RouterLink></li></ul></li><li><RouterLink to="#distribuer-vos-sources">Distribuer vos sources</RouterLink></li><li><RouterLink to="#ajouter-un-manifest">Ajouter un manifest</RouterLink><ul><li><RouterLink to="#ajouter-firebase">Ajouter Firebase</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="mvvm-en-quelques-mots" tabindex="-1"><a class="header-anchor" href="#mvvm-en-quelques-mots" aria-hidden="true">#</a> MVVM en quelques mots</h2>
<p>Non, mais moi je connais que MVC, c’est quoi MVVM ?</p>
<p>MVVM est un design pattern, souvent utilisé par les bibliothèques JavaScript modernes (Ionic, VueJS, ReactJS). À l’origine, MVVM a été introduit par Microsoft.</p>
<p>Ce pattern a spécialement été conçu pour améliorer la séparation entre les données et la vue qui les affichent. Le lien entre la vue et le modèle de données est fait par des mécanismes de binding. Le binding est un mécanisme qui permet de faire des liaisons entre des données de manière dynamiques. Ce qui veut dire que si A et B sont liés, le fait de modifier A va être répercuté sur B et inversement.</p>
<ul>
<li>Model : le modèle contient les données.</li>
<li>View : la vue correspond à ce qui est affiché. C’est notre site Web.</li>
<li>ViewModel : ce composant fait le lien entre le modèle et la vue. Il s’occupe de gérer les liaisons de données et les éventuelles conversions. C’est ici qu’intervient le binding.</li>
</ul>
<p>L’important avec MVVM c’est que <strong><em>la vue ne doit jamais traiter de données</em></strong>. Elle s’occupe uniquement de les afficher. Le View-Model aura en charge les conversions et les accès au modèle de données.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Maintenant que vous savez ce que c’est le MVVM, nous allons attaquer le TP pour de vrai. Nous allons réaliser « une application » à l’aide de VueJS. Cette application est purement démonstrative. Cette application calculera la hauteur d’une falaise (ou de n’importe quoi de suffisamment haut) en fonction du temps chute d’un objet jeter du haut de celle-ci.</p>
<p><img src="https://github.com/c4software/Cliff-Height-Timer-VueJS/raw/master/demo.png" alt="Cliff-Height-Timer-VueJS"></p>
<h2 id="initialisation-du-projet" tabindex="-1"><a class="header-anchor" href="#initialisation-du-projet" aria-hidden="true">#</a> Initialisation du projet</h2>
<p>Avant de commencer, nous allons avoir besoin de plusieurs outils :</p>
<ul>
<li>NodeJS</li>
<li>Vue-cli</li>
</ul>
<h3 id="nodejs" tabindex="-1"><a class="header-anchor" href="#nodejs" aria-hidden="true">#</a> NodeJS</h3>
<p>La première étape va être l’installation de NodeJS, la démarche est différente en fonction de votre environnement, mais pour résumer <a href="https://nodejs.org/en/download/" target="_blank" rel="noopener noreferrer">sous Windows c’est ici<ExternalLinkIcon/></a> prendre la version CURRENT, sous OSX le plus simple c’est via Brew <code>brew install nodejs</code>, et sous Linux c’est via le gestionnaire de paquet <code>apt install nodejs</code></p>
<p>Une fois installé, vous êtes prêt, votre PC est prêt à accueillir l’outil VueCLI</p>
<h3 id="vue-cli" tabindex="-1"><a class="header-anchor" href="#vue-cli" aria-hidden="true">#</a> Vue-cli</h3>
<p>Vue-cli est un outil qui simplifie la création d’un nouveau projet Vue-JS à partir de template fourni par la communauté.</p>
<p>Dans un terminal lancer la commande suivante dans le <code>Node.js Command Prompt</code> :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g @vue/cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Maintenant que vue-cli est installé, vous avez à votre disposition sur votre ordinateur une nouvelle commande, la commande <code>vue</code></p>
<p>Pour créer un nouveau projet, c’est simple il suffit de lancer la commande suivante dans le <code>Node.js Command Prompt</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue create cliff-height-timer
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Attention, la commande crée le projet dans le dossier courant ! ⚠️</p>
<p>Le Vue-Cli est interactif il va vous poser des questions permettant de configurer votre projet :</p>
<p><img src="@source/tp/vuejs/vuecli-init.png" alt="Question vue-cli"></p>
<p>Voilà notre projet est maintenant prêt. Place à la suite.</p>
<h2 id="installation-des-librairies-du-projet" tabindex="-1"><a class="header-anchor" href="#installation-des-librairies-du-projet" aria-hidden="true">#</a> Installation des librairies (du projet)</h2>
<p>Le projet que vous avez initialisé est « prêt pour être utilisé ».</p>
<p>Si vous changez d'ordinateur, il faudra réinstaller les librairies NodeJS. Cette étape n’est à faire qu’une seule fois sur votre poste, en effet en général on ne commit pas les fichiers « librairies » qui sont présents dans le futur dossier <code>node_module</code> pour la simple et bonne raison que celui-ci est gros et rempli de pleins de petits fichiers (et qu’en plus ça se retélécharge facilement depuis Internet).</p>
<p>Pour l’installation la procédure est la suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> cliff-height-timer/
<span class="token function">npm</span> <span class="token function">install</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>⚠️ L’installation risque de prendre plusieurs secondes (enfin 1 ou 2 minutes).</p>
<p>Une fois terminé votre projet est prêt à être lancé. Au passage vous pouvez vérifier que le dossier <code>node_module</code> dans le <code>.gitignore</code>.</p>
<h2 id="premier-lancement-l-exemple" tabindex="-1"><a class="header-anchor" href="#premier-lancement-l-exemple" aria-hidden="true">#</a> Premier lancement (l’exemple)</h2>
<p>Les librairies étant maintenant disponible, nous allons pouvoir lancer l’exemple fourni par Vue-Cli, pour ça rien de plus simple</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Une fois cette commande lancée vous pouvez ouvrir un onglet dans votre navigateur <code>http://127.0.0.1:8080</code></p>
<p><img src="@source/tp/vuejs/ressources/vuejs-init.png" alt="sample application"></p>
<h2 id="le-serveur-de-developpement" tabindex="-1"><a class="header-anchor" href="#le-serveur-de-developpement" aria-hidden="true">#</a> Le serveur de développement</h2>
<p>Comme vous avez pu le constater dans votre invite de commande (terminal), vous avez un serveur qui tourne. Ce serveur est un peu particulier, il n’est utilisé que dans la phase de développement il incorpore plusieurs outils permettant de simplifier la création d’application JavaScript :</p>
<ul>
<li>Redémarrage à chaud, comprendre ici, qu’il va « patcher » votre code pour intégrer vos dernières modifications sans que vous n’ayez rien à faire (GÉNIAL !)</li>
<li>Lint, analyse du code pour vous remonter les erreurs avant l’exécution.</li>
<li>Gestion des .vue (avec vue-loader)</li>
</ul>
<p>Et si vous avez les outils sur votre machine il peut également :</p>
<ul>
<li>Créer la CSS à partir du SCSS présent dans le .vue</li>
<li>Et plein d’autres usages, car Webpack c’est un outil qui permet l’assemblage de différents outils</li>
</ul>
<h2 id="le-code-source" tabindex="-1"><a class="header-anchor" href="#le-code-source" aria-hidden="true">#</a> Le code source</h2>
<p>Les sources de l’application sont dans le dossier <code>src/</code> il contient l’ensemble du code source de votre application. Pour l’instant nous avons le code fourni par VueJS, au fur et à mesure des futures étapes nous allons le modifier pour le transformer dans l’application « Cliff Height Timer ». Avant de « presque » tout remplacer, nous allons modifier celui fourni pour nous familiariser avec « le serveur de développement ».</p>
<h3 id="l-ide" tabindex="-1"><a class="header-anchor" href="#l-ide" aria-hidden="true">#</a> L’IDE</h3>
<p>Pour faire du VueJS le mieux, c’est d’avoir un bon IDE. Au revoir, Notepad++, bonjour WebStorm? Malheureusement WebStorm est payant, si vous avez une licence tant mieux (pour les étudiants c’est gratuit 💰).</p>
<p>Pour ceux qui n’ont pas de licence je vous propose d’utiliser <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">Visual Studio Code<ExternalLinkIcon/></a> et d’ajouter le plug-in <code>Vetur</code> pour pouvoir éditer les <code>.vue</code> dans de bonnes conditions.</p>
<h3 id="installation-des-plug-ins" tabindex="-1"><a class="header-anchor" href="#installation-des-plug-ins" aria-hidden="true">#</a> Installation des plug-ins</h3>
<p>Comme vu en cours l'avantage de Vue-Cli c'est qu'il intègre un système de plug-in, nous allons nous en servir pour ajouter :</p>
<ul>
<li>vue-i18n</li>
<li>vue-router</li>
<li>vuetify</li>
</ul>
<p>Certains plug-ins modifient plus ou moins votre projet. Vuetify par exemple altère de manière importante votre projet. Nous allons donc l'ajouter en premier. Dans un terminal</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ vue <span class="token function">add</span> vuetify

📦  Installing vue-cli-plugin-vuetify<span class="token punctuation">..</span>.

+ vue-cli-plugin-vuetify@0.4.6
added <span class="token number">1</span> package from <span class="token number">1</span> contributor and audited <span class="token number">15083</span> packages <span class="token keyword">in</span> <span class="token number">8</span>.485s
found <span class="token number">0</span> vulnerabilities

✔  Successfully installed plugin: vue-cli-plugin-vuetify

? Choose a preset: Default <span class="token punctuation">(</span>recommended<span class="token punctuation">)</span>

🚀  Invoking generator <span class="token keyword">for</span> vue-cli-plugin-vuetify<span class="token punctuation">..</span>.
📦  Installing additional dependencies<span class="token punctuation">..</span>.

added <span class="token number">11</span> packages from <span class="token number">49</span> contributors and audited <span class="token number">15119</span> packages <span class="token keyword">in</span> <span class="token number">9</span>.41s
found <span class="token number">0</span> vulnerabilities

⚓  Running completion hooks<span class="token punctuation">..</span>.

✔  Successfully invoked generator <span class="token keyword">for</span> plugin: vue-cli-plugin-vuetify
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>Maintenant que Vuetify est présent, ajoutons Vue-Router :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ vue <span class="token function">add</span> router

? Use <span class="token function">history</span> mode <span class="token keyword">for</span> router? <span class="token punctuation">(</span>Requires proper server setup <span class="token keyword">for</span> index fallback <span class="token keyword">in</span> production<span class="token punctuation">)</span> Yes

🚀  Invoking generator <span class="token keyword">for</span> core:router<span class="token punctuation">..</span>.
📦  Installing additional dependencies<span class="token punctuation">..</span>.

added <span class="token number">1</span> package from <span class="token number">1</span> contributor and audited <span class="token number">15120</span> packages <span class="token keyword">in</span> <span class="token number">9</span>.021s
found <span class="token number">0</span> vulnerabilities

✔  Successfully invoked generator <span class="token keyword">for</span> plugin: core:router
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Et maintenant Vue-i18n (pour l'internationalisation) :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ vue <span class="token function">add</span> i18n

📦  Installing vue-cli-plugin-i18n<span class="token punctuation">..</span>.

+ vue-cli-plugin-i18n@0.5.1
added <span class="token number">7</span> packages from <span class="token number">7</span> contributors and audited <span class="token number">15129</span> packages <span class="token keyword">in</span> <span class="token number">8</span>.638s
found <span class="token number">0</span> vulnerabilities

✔  Successfully installed plugin: vue-cli-plugin-i18n

? The locale of project localization. fr
? The fallback locale of project localization. en
? The directory where store localization messages of project. Stored under src directory. locales
? Enable locale messages <span class="token keyword">in</span> Single <span class="token function">file</span> components ? No

🚀  Invoking generator <span class="token keyword">for</span> vue-cli-plugin-i18n<span class="token punctuation">..</span>.
📦  Installing additional dependencies<span class="token punctuation">..</span>.

audited <span class="token number">15130</span> packages <span class="token keyword">in</span> <span class="token number">7</span>.792s
found <span class="token number">0</span> vulnerabilities

⚓  Running completion hooks<span class="token punctuation">..</span>.

✔  Successfully invoked generator <span class="token keyword">for</span> plugin: vue-cli-plugin-i18n
   The following files have been updated / added:
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>Voilà les plug-ins sont maintenant installés, de base ils ne sont pas configurés. Nous allons faire ça dans les prochaines étapes.</p>
<div class="custom-container danger"><p class="custom-container-title">Pas d'icônes ? Pas de fonts ? Pas de problème !</p>
<p>Comme Bootstrap (ou d'autres) vuetify intègre un système permettant d'intégrer simplement des icônes. Malheureusement celui-ci ne fonctionne pas juste après l'installation du paquet.</p>
<p>Pour le rendre fonctionnel, vous devez éditer votre <code>index.html</code> afin d'ajouter :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900<span class="token punctuation">"</span></span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css<span class="token punctuation">"</span></span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></div>
<h3 id="la-structure" tabindex="-1"><a class="header-anchor" href="#la-structure" aria-hidden="true">#</a> La structure</h3>
<p>L'ensemble du code que vous devez écrire va se trouver dans <code>src</code></p>
<ul>
<li><code>assets/</code> : Les images / ressources static.</li>
<li><code>components/</code> : Les composants réutilisables.</li>
<li><code>locales/</code> : Vos textes rangés par langes.</li>
<li><code>plug-ins/</code> : La configuration de vos plug-ins.</li>
<li><code>views/</code> : Les pages de votre site.</li>
<li><code>App.vue</code> : Le template / base / point d'entrée de vos vue.</li>
<li><code>i18n.js</code> : La configuration de Vue-i18n</li>
<li><code>main.js</code> : Le point d'entrée JavaScript de votre projet</li>
<li><code>router.js</code> : La configuration de vos routes.</li>
</ul>
<p>⚠️ Je vous invite à regarder le contenu de l'ensemble des fichiers et dossier avant de continuer.</p>
<h3 id="lancer-le-projet" tabindex="-1"><a class="header-anchor" href="#lancer-le-projet" aria-hidden="true">#</a> Lancer le projet</h3>
<p>Le projet est actuellement non fonctionnel, principalement à cause de Vuetify et Vue Router qui de base configure le projet différemment.</p>
<p>Pour regarder le souci, lancez le projet et testez-le :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="transformer-le-template-de-base" tabindex="-1"><a class="header-anchor" href="#transformer-le-template-de-base" aria-hidden="true">#</a> Transformer le template de base</h3>
<p>Maintenant que VuetifyJS est complètement disponible, vous allez pouvoir utiliser vos premiers composants.</p>
<p>Pour débuter, nous allons remplacer le contenu du fichier <code>App.vue</code> pour déclarer le gabarit principal de l’application :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-app</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>myToolbar</span> <span class="token punctuation">/></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-main</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>v-slide-y-transition</span> <span class="token attr-name">mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>out-in<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-slide-y-transition</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-main</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>v-app</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> myToolbar <span class="token keyword">from</span> <span class="token string">"@/components/MyToolbar"</span><span class="token punctuation">;</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">"app"</span><span class="token punctuation">,</span>
    components<span class="token operator">:</span> <span class="token punctuation">{</span> myToolbar <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>⚠️ Pour l’instant le code que vous avez remplacé ne compile plus, pour la simple et bonne raison qu’il fait référence à un composant que vous n’avez pas encore écrit : <code>myToolbar</code></p>
<h3 id="creation-de-mytoolbar" tabindex="-1"><a class="header-anchor" href="#creation-de-mytoolbar" aria-hidden="true">#</a> Création de myToolbar</h3>
<p>Créer un nouveau fichier nommé <code>MyToolbar.vue</code> dans le dossier <code>components</code> :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span>v<span class="token operator">-</span>app<span class="token operator">-</span>bar dark color<span class="token operator">=</span><span class="token string">"deep-purple"</span> clipped<span class="token operator">-</span>left app<span class="token operator">></span>
      <span class="token operator">&lt;</span>v<span class="token operator">-</span>app<span class="token operator">-</span>bar<span class="token operator">-</span>nav<span class="token operator">-</span>icon @click<span class="token punctuation">.</span>stop<span class="token operator">=</span><span class="token string">"drawer = !drawer"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>app<span class="token operator">-</span>bar<span class="token operator">-</span>nav<span class="token operator">-</span>icon<span class="token operator">></span>
      <span class="token operator">&lt;</span>v<span class="token operator">-</span>toolbar<span class="token operator">-</span>title @click<span class="token operator">=</span><span class="token string">"goHome"</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"white--text"</span><span class="token operator">></span>Cliff height timer<span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>toolbar<span class="token operator">-</span>title<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>app<span class="token operator">-</span>bar<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'myToolbar'</span><span class="token punctuation">,</span>
  <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      drawer<span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">goHome</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="modifier-la-«-home-»" tabindex="-1"><a class="header-anchor" href="#modifier-la-«-home-»" aria-hidden="true">#</a> Modifier la « home »</h3>
<p>Avant d'aller plus loin, modifier le fichier <code>src/views/Home.vue</code> remplacer le contenu par ce que vous souhaitez.</p>
<p>N'oublier pas de retirer l'import qui est maintenant inutile dans le fichier <code>src/views/Home.vue</code></p>
<h3 id="voir-le-changement" tabindex="-1"><a class="header-anchor" href="#voir-le-changement" aria-hidden="true">#</a> Voir le changement</h3>
<p>Voilà, vous avez atteint la première étape. Vous pouvez lancer votre application en faisant :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="le-routeur" tabindex="-1"><a class="header-anchor" href="#le-routeur" aria-hidden="true">#</a> Le Routeur</h2>
<p>Votre application est maintenant fonctionnelle cependant comme vous le constatez, vous avez pour l’instant qu’une « seule page »… Enfin qu'une seule d'accessible !</p>
<p>Allons faire un tour dans le fichier <code>router/index.js</code>. Celui-ci contient déjà quelques routes :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">"vue-router"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">"./views/Home.vue"</span><span class="token punctuation">;</span>

Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  mode<span class="token operator">:</span> <span class="token string">"history"</span><span class="token punctuation">,</span>
  base<span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BASE_URL</span><span class="token punctuation">,</span>
  routes<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      path<span class="token operator">:</span> <span class="token string">"/"</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">"home"</span><span class="token punctuation">,</span>
      component<span class="token operator">:</span> Home<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      path<span class="token operator">:</span> <span class="token string">"/about"</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">"about"</span><span class="token punctuation">,</span>
      <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName: "about" */</span> <span class="token string">"./views/About.vue"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>Modifier le, et <strong>retirer</strong> tout la partie <code>/about</code> :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  path<span class="token operator">:</span> <span class="token string">"/about"</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token string">"about"</span><span class="token punctuation">,</span>
  <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName: "about" */</span> <span class="token string">"./views/About.vue"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="declarer-du-texte-dans-vue-i18n" tabindex="-1"><a class="header-anchor" href="#declarer-du-texte-dans-vue-i18n" aria-hidden="true">#</a> Déclarer du texte dans Vue-i18n</h3>
<p>Au début du TP nous avons installé Vue-i18n, nous allons maintenant configurer nos premiers textes. Dans le dossier <code>src/locales/</code> vous avez deux fichiers <code>json</code> :</p>
<ul>
<li><code>en.json</code> : Les textes anglais.</li>
<li><code>fr.json</code> : Les textes français.</li>
</ul>
<p><strong>Ajouter</strong> dans les deux fichiers JSON une nouvelle clé :</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"Cliff Height Timer"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="declarer-un-nouveau-texte" tabindex="-1"><a class="header-anchor" href="#declarer-un-nouveau-texte" aria-hidden="true">#</a> Déclarer un nouveau texte</h3>
<p>Notre internationalisation est maintenant prête à être utilisée. Nous allons l’utiliser dès maintenant dans le fichier <code>/components/MyToolbar.vue</code></p>
<p>Remplacer le texte <code>Cliff height timer</code> par :</p>
<p><code v-pre><code>{{$t(&quot;title&quot;)}}</code></code></p>
<p>Le titre doit maintenant s’afficher. Et c’est normal la clé « title » est déjà présente dans le fichier : <code>i18n/index.js</code>, modifier le titre pour la langue « fr ».</p>
<p>ℹ️ <code>$t</code> est un objet qui permet d’accéder aux textes actuellement chargés pour la langue de l’utilisateur.</p>
<h3 id="tester" tabindex="-1"><a class="header-anchor" href="#tester" aria-hidden="true">#</a> Tester</h3>
<p>Vérifier en relançant votre application que le titre à bien été modifié :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="les-vues" tabindex="-1"><a class="header-anchor" href="#les-vues" aria-hidden="true">#</a> Les .vues</h2>
<p>Maintenant que nous avons la base de notre projet, nous allons commencer à créer les différents fichiers Vue’s.</p>
<p>✋ Un peu de ménage s'impose. Avant de continuer, supprimer le fichier <code>About.vue</code>, celui-ci ne nous sera pas utile.</p>
<h3 id="la-page-accueil" tabindex="-1"><a class="header-anchor" href="#la-page-accueil" aria-hidden="true">#</a> La page : Accueil</h3>
<p>Nous allons commencer par la page d’accueil, celle-ci doit ressembler à :</p>
<p><img src="@source/tp/vuejs/ressources/accueil.png" alt="Accueil"></p>
<p>Pour faire cette vue, vous allez avoir besoin des éléments suivants :</p>
<ul>
<li><a href="https://vuetifyjs.com/components/floating-action-buttons" target="_blank" rel="noopener noreferrer">FAB<ExternalLinkIcon/></a></li>
<li><a href="https://vuejs.org/v2/guide/computed.html" target="_blank" rel="noopener noreferrer">Les variables computed<ExternalLinkIcon/></a></li>
<li><a href="https://vuejs.org/v2/guide/class-and-style.html" target="_blank" rel="noopener noreferrer">v-bind:class<ExternalLinkIcon/></a></li>
<li><a href="https://vuejs.org/v2/guide/syntax.html" target="_blank" rel="noopener noreferrer">Afficher une variables<ExternalLinkIcon/></a></li>
<li><a href="https://gist.github.com/c4software/b9fe4cd06e99d3bff16a09260b03e149" target="_blank" rel="noopener noreferrer">Centrer verticalement<ExternalLinkIcon/></a></li>
</ul>
<p>Étape de la création :</p>
<ul>
<li>Modifier le fichier <code>Home.vue</code> dans le dossier <code>src/views/</code></li>
<li>Le contenu de la Vue sera la suivante :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>container fluid fill<span class="token operator">-</span>height <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"d-flex deep-purple lighten-1"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"home"</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>h1<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> time <span class="token punctuation">}</span><span class="token punctuation">}</span> s<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
      <span class="token operator">&lt;</span>h3<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> m <span class="token punctuation">}</span><span class="token punctuation">}</span> m<span class="token operator">&lt;</span><span class="token operator">/</span>h3<span class="token operator">></span>
      <span class="token operator">&lt;</span>h3<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> ft <span class="token punctuation">}</span><span class="token punctuation">}</span> ft<span class="token operator">&lt;</span><span class="token operator">/</span>h3<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

    <span class="token operator">&lt;</span>v<span class="token operator">-</span>btn v<span class="token operator">-</span>on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token string">"action"</span> v<span class="token operator">-</span>bind<span class="token operator">:</span><span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"state_class"</span> dark fixed bottom right fab<span class="token operator">></span>
      <span class="token operator">&lt;</span>v<span class="token operator">-</span>icon<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> state_icon <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>icon<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>btn<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>container<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'home'</span><span class="token punctuation">,</span>
  <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      running<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      time<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      m<span class="token operator">:</span> <span class="token string">'0'</span><span class="token punctuation">,</span>
      ft<span class="token operator">:</span> <span class="token string">'0'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  computed<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">state_icon</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Retourne l’icone pour le FAB</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>running<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">'stop'</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">'play_arrow'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">state_class</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Retourne la class pour le FAB</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>running<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">'red'</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">'green'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">action</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Gestion du start / stop</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>start <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>running<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>timerId <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token function">clearInterval</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timerId<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">saveHistory</span><span class="token punctuation">(</span><span class="token punctuation">{</span>time<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>time<span class="token punctuation">,</span> m<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m<span class="token punctuation">,</span> ft<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ft<span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">saveHistory</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Sauvegarde dans l’historique</span>
      <span class="token keyword">let</span> history <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'history'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>history<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        history <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
      history<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
      localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'history'</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>history<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">compute</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> fallTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>start
      <span class="token keyword">let</span> height <span class="token operator">=</span> <span class="token number">16</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token punctuation">(</span>fallTime <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
      <span class="token keyword">let</span> numberDigits <span class="token operator">=</span> <span class="token number">1</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>height <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        numberDigits <span class="token operator">=</span> <span class="token number">2</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">this</span><span class="token punctuation">.</span>time <span class="token operator">=</span> <span class="token punctuation">(</span>fallTime <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>ft <span class="token operator">=</span> height<span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span>numberDigits<span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>m <span class="token operator">=</span> <span class="token punctuation">(</span>height <span class="token operator">/</span> <span class="token number">3.2808</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span>numberDigits<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>style scoped<span class="token operator">></span>
  <span class="token punctuation">.</span>home<span class="token punctuation">{</span>
    margin<span class="token operator">:</span> auto<span class="token punctuation">;</span>
    text<span class="token operator">-</span>align<span class="token operator">:</span> center<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">.</span>home <span class="token operator">></span> h1<span class="token punctuation">,</span> <span class="token punctuation">.</span>home <span class="token operator">></span> h2<span class="token punctuation">,</span> <span class="token punctuation">.</span>home <span class="token operator">></span> h3 <span class="token punctuation">{</span>
    color<span class="token operator">:</span> white<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br></div></div><ul>
<li>Vérifier la déclaration de votre Vue dans <code>router.js</code>. Un code similaire à celui-ci doit être présent :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>…<span class="token punctuation">]</span>
<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">'@/views/Home'</span>

<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
  <span class="token comment">// Code existant</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">'/'</span><span class="token punctuation">,</span>
    name<span class="token operator">:</span> <span class="token string">'Home'</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> Home
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ul>
<li>Tester votre code :</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="la-page-a-propos" tabindex="-1"><a class="header-anchor" href="#la-page-a-propos" aria-hidden="true">#</a> La page : À Propos</h3>
<p>Voilà le rendu de « la page » que vous devez réaliser :</p>
<p><img src="@source/tp/vuejs/ressources/apropos.png" alt="Vue À Propos"></p>
<ul>
<li>Créer le fichier <code>src/views/About.vue</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>v<span class="token operator">-</span>container<span class="token operator">></span>
  <span class="token punctuation">[</span>…<span class="token punctuation">]</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>container<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'about'</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>⚠️ N’oubliez pas que <strong>l'ensemble</strong> les textes doivent-être dans le fichier <code>locales/fr.json</code> et dans <code>locales/en.json</code> et être utilisés avec par exemple :</p>
<p><code v-pre>{{ $t(&quot;label&quot;) }}</code></p>
<ul>
<li>Ajouter dans <code>router.js</code> le code pour pouvoir accéder à votre Vue.</li>
</ul>
<p>✋ Vous avez ajouté votre nouveau fichier, mais pour l’instant votre application ne contient pas de menu. Nous allons en ajouter un pour pouvoir naviguer entre les pages.</p>
<h3 id="ajout-du-drawer" tabindex="-1"><a class="header-anchor" href="#ajout-du-drawer" aria-hidden="true">#</a> Ajout du : Drawer</h3>
<p>Dans le monde « mobile », un menu s’appelle un Drawer (un tiroir). Nous allons donc créer un Drawer. Pour ça nous allons avoir besoin des ressources suivantes:</p>
<ul>
<li><a href="https://vuetifyjs.com/components/toolbars" target="_blank" rel="noopener noreferrer">v-toolbar<ExternalLinkIcon/></a></li>
<li><a href="https://vuetifyjs.com/components/lists" target="_blank" rel="noopener noreferrer">v-list<ExternalLinkIcon/></a></li>
<li><a href="https://kazupon.github.io/vue-i18n/en/" target="_blank" rel="noopener noreferrer">Vue-i18n<ExternalLinkIcon/></a></li>
</ul>
<p><img src="@source/tp/vuejs/ressources/drawer.png" alt="Drawer"></p>
<p>Création :</p>
<ul>
<li>Pour ça, créer le fichier <code>/src/components/Drawer.vue</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span>v<span class="token operator">-</span>toolbar <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"deep-purple"</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>v<span class="token operator">-</span>list dense<span class="token operator">></span>
      <span class="token operator">&lt;</span>template v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"(item, i) in items"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>v<span class="token operator">-</span>divider dark v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"item.divider"</span> <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"i"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>divider<span class="token operator">></span>
        <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item ripple <span class="token operator">:</span>to<span class="token operator">=</span><span class="token string">"item.action"</span> <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"i"</span> v<span class="token operator">-</span><span class="token keyword">else</span><span class="token operator">></span>
          <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>action<span class="token operator">></span>
            <span class="token operator">&lt;</span>v<span class="token operator">-</span>icon<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> item<span class="token punctuation">.</span>icon <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>icon<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>action<span class="token operator">></span>
          <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>content<span class="token operator">></span>
            <span class="token operator">&lt;</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>title <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"body-2"</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> item<span class="token punctuation">.</span>text <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>title<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">-</span>content<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">-</span>item<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>list<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'drawer'</span><span class="token punctuation">,</span>
  <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      items<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> icon<span class="token operator">:</span> <span class="token string">'home'</span><span class="token punctuation">,</span> text<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">'drawer.home'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> action<span class="token operator">:</span> <span class="token string">'/'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> icon<span class="token operator">:</span> <span class="token string">'history'</span><span class="token punctuation">,</span> text<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">'drawer.history'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> action<span class="token operator">:</span> <span class="token string">'/history'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> icon<span class="token operator">:</span> <span class="token string">'help'</span><span class="token punctuation">,</span> text<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span><span class="token string">'drawer.about'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> action<span class="token operator">:</span> <span class="token string">'/about'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><ul>
<li>Déclarer les différents textes dans les fichiers <code>fr.json</code> et <code>en.json</code>.</li>
</ul>
<p>Maintenant que notre composant est terminé, nous devons l’utiliser. Nous allons l’utiliser dans le premier composant que nous avons écrit <code>src/components/MyToolbar.vue</code>, modifier le pour intégrer les modifications suivantes :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>div<span class="token operator">></span>
    <span class="token comment">// Nouveau</span>
    <span class="token operator">&lt;</span>v<span class="token operator">-</span>navigation<span class="token operator">-</span>drawer v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"drawer"</span> clipped fixed app<span class="token operator">></span>
      <span class="token operator">&lt;</span>myContentDrawer <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>v<span class="token operator">-</span>navigation<span class="token operator">-</span>drawer<span class="token operator">></span>

    <span class="token comment">// Reste du code déjà présent</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">import</span> myContentDrawer <span class="token keyword">from</span> <span class="token string">"@/components/Drawer"</span> <span class="token comment">// &lt;== Ajouter l’import</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"myToolbar"</span><span class="token punctuation">,</span>
  components<span class="token operator">:</span> <span class="token punctuation">{</span>myContentDrawer<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// &lt;== Ajouter la déclaration du composant</span>
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>🤓 Nous venons de déclarer un nouveau components dans notre Vue. Simple non ? Il suffit d'importer le composant et de l'ajouter dans l'attribut <code>components</code> de notre objet.</p>
<ul>
<li>Tester votre application :</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="la-page-historique" tabindex="-1"><a class="header-anchor" href="#la-page-historique" aria-hidden="true">#</a> La page : Historique</h3>
<p>Notre application est maintenant fonctionnelle. Nous avons la capacité de calculer des chutes, d’afficher les informations sur l’application, et bonus dans plusieurs langues !</p>
<p>Mais je pense qu’une application n’est jamais vraiment complète sans une notion d’historique. Pour ça nous allons créer une nouvelle « vue »</p>
<ul>
<li>Créer le fichier <code>src/views/History.vue</code></li>
<li>Créer la correspondance entre la Vue et le chemin dans le fichier <code>router/index.js</code></li>
<li>N’oubliez pas également d’ajouter l’élément dans le menu Drawer.</li>
<li>Les textes doivent également être mis dans la partie i18n</li>
</ul>
<p>Pour réaliser la vue historique, nous allons devoir sauvegarder les différents résultats. Pour ça nous allons utiliser le <code>Localstorage</code>, avant d’allez plus loin je vous propose un peu de lecture sur le localStorage :</p>
<blockquote>
<p>La propriété localStorage vous permet d'accéder à un objet local Storage. Le localStorage est similaire au sessionStorage. La seule différence : les données stockées dans le localStorage n'ont pas de délai d'expiration, alors que les données stockées dans le sessionStorage sont nettoyées quand la session du navigateur prend fin — donc quand on ferme le navigateur.</p>
</blockquote>
<p>Source: <a href="https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage<ExternalLinkIcon/></a></p>
<p>⚠️ Petite subtilité, vous ne pouvez pas stocker de tableau (array) dans le localStorage nous allons devoir utiliser un JSON.</p>
<h4 id="sauvegarder-un-element-dans-le-localstorage" tabindex="-1"><a class="header-anchor" href="#sauvegarder-un-element-dans-le-localstorage" aria-hidden="true">#</a> Sauvegarder un élément dans le localStorage</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">"historique"</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="lire-un-element-dans-le-localstorage" tabindex="-1"><a class="header-anchor" href="#lire-un-element-dans-le-localstorage" aria-hidden="true">#</a> Lire un élément dans le localStorage</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">"history"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="demarche" tabindex="-1"><a class="header-anchor" href="#demarche" aria-hidden="true">#</a> Démarche</h4>
<ul>
<li>Adapter le code de <code>Home.vue</code> pour sauvegarder le résultat dans un tableau d’historique à chaque fois que l’utilisateur enregistre une nouvelle chute.</li>
<li>Écrire le code de la page <code>History.vue</code> pour afficher les valeurs enregistrées.</li>
<li>Utiliser les variables computed de VueJS pour retourner la liste de l’historique (<a href="https://vuejs.org/v2/guide/computed.html#Basic-Example" target="_blank" rel="noopener noreferrer">exemple<ExternalLinkIcon/></a>).</li>
</ul>
<p>Ressources utiles :</p>
<ul>
<li><a href="https://vuetifyjs.com/components/lists" target="_blank" rel="noopener noreferrer">Liste Vuetify<ExternalLinkIcon/></a></li>
<li><a href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON" target="_blank" rel="noopener noreferrer">JSON<ExternalLinkIcon/></a></li>
<li><a href="https://www.w3schools.com/jsref/jsref_isarray.asp" target="_blank" rel="noopener noreferrer">Tester si tableau<ExternalLinkIcon/></a></li>
</ul>
<p>Vu que c’est la 3ème vue que vous faites, je pense qu’il n’est plus nécessaire que je vous fournisse du code.</p>
<h2 id="ajouter-une-page-permettant-un-ajout-manuel" tabindex="-1"><a class="header-anchor" href="#ajouter-une-page-permettant-un-ajout-manuel" aria-hidden="true">#</a> Ajouter une page permettant un ajout manuel</h2>
<p>Ajouter une nouvelle page, celle-ci permettra d'ajouter une entrée manuellement dans l'historique.</p>
<h3 id="demarche-1" tabindex="-1"><a class="header-anchor" href="#demarche-1" aria-hidden="true">#</a> Démarche</h3>
<ul>
<li>Création du <code>.vue</code>.</li>
<li>Créer un formulaire (v-form).</li>
<li>Ajouter le lien dans le <code>Drawer.vue</code>.</li>
<li>Ajouter la route.</li>
</ul>
<h2 id="distribuer-vos-sources" tabindex="-1"><a class="header-anchor" href="#distribuer-vos-sources" aria-hidden="true">#</a> Distribuer vos sources</h2>
<p>Voilà votre application est maintenant terminée bravo 👏👏. Cependant vous ne savez pas encore comment packager/distribuer votre application. Pour ça rien de plus simple il vous suffit de faire</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette commande va compiler votre application et vous fournir une version que vous allez pouvoir héberger comme n’importe quel site Internet (sur un serveur Apache par exemple).</p>
<p>Le résultat de la compilation est dans le dossier <code>dist/</code></p>
<ul>
<li>Héberger le résultat sur un serveur Apache (wamp).</li>
</ul>
<h2 id="ajouter-un-manifest" tabindex="-1"><a class="header-anchor" href="#ajouter-un-manifest" aria-hidden="true">#</a> Ajouter un manifest</h2>
<p>Nous allons maintenant ajouter la dernière pierre à notre édifice, le fichier Manifest. Ce fichier décrit le fonctionnement du site Web en tant « qu’application », une fois que ce fichier est en place votre navigateur le lira et adaptera son fonctionnement pour qu’il se rapproche d’une application (comme une APK).</p>
<p>Pour ça nous allons utiliser deux sites :</p>
<ul>
<li><a href="https://app-manifest.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Un générateur de fichier Manifest<ExternalLinkIcon/></a></li>
<li><a href="https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html" target="_blank" rel="noopener noreferrer">Un générateur d’icône<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p>Le manifest d'une application web fournit des informations concernant celle-ci (comme son nom, son auteur, une icône et une description) dans un document texte JSON. Le but du manifeste est d'installer des applications sur l'écran d'accueil d'un appareil, offrant aux utilisateurs un accès plus rapide et une expérience plus riche.</p>
<p>Les manifests font partie d'un ensemble de technologies appelées les applications web progressives (progressive web apps). Il s'agit d'applications web qui peuvent être installées sur la page d'accueil d'un appareil sans que l'utilisateur ait à se rendre dans une boutique d'applications. De plus, une fois installées, elles peuvent être utilisées sans connexion internet et sont capables de recevoir des notifications push.</p>
</blockquote>
<p>Source: Mozilla.org</p>
<ul>
<li>Générer les icônes ainsi que le fichier Manifest</li>
<li>Télécharger le manifest.json et le mettre dans le dossier <code>static/</code> faire la même chose pour les icônes.</li>
<li>Éditer le fichier <code>index.html</code> du dossier public pour y ajouter :</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>manifest<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./static/manifest.json<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Vous pouvez builder votre application et la mettre à jour sur votre serveur Web.</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Tester l’application depuis votre Téléphone Android / iOs.</li>
</ul>
<h3 id="ajouter-firebase" tabindex="-1"><a class="header-anchor" href="#ajouter-firebase" aria-hidden="true">#</a> Ajouter Firebase</h3>
<p>Dans le précédent TP nous avons ajouté Firebase pour synchroniser les éléments sur une carte. C'était un exemple très visuel, mais il est évidemment possible de faire bien plus.</p>
<p>Nous allons nous servir de Firebase dans ce projet pour synchroniser « l'historique » avec l'ensemble des utilisateurs. Je vous propose donc de vous inspirer du précédent TP, et d'ajouter les dépendances :</p>
<ul>
<li>Vuefire.</li>
<li>Firebase.</li>
</ul>
<p>L'affichage doit être identique à la version actuelle de votre application.</p>
</template>
