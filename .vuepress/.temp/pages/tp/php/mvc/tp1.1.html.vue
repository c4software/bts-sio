<template><h1 id="prise-en-main-structure-mvc" tabindex="-1"><a class="header-anchor" href="#prise-en-main-structure-mvc" aria-hidden="true">#</a> Prise en main structure MVC</h1>
<p>Dans ce TP, nous allons prendre en main <RouterLink to="/tp/php/mvc/tp1.html">la structure de code présente ici</RouterLink>.</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#le-projet">Le projet</RouterLink></li><li><RouterLink to="#la-structure">La structure</RouterLink><ul><li><RouterLink to="#le-modele">Le Modèle</RouterLink></li><li><RouterLink to="#la-vue">La Vue</RouterLink></li><li><RouterLink to="#le-controleur">Le Contrôleur</RouterLink></li><li><RouterLink to="#le-routeur">Le Routeur</RouterLink></li><li><RouterLink to="#vous-souhaitez-plus-de-detail">Vous souhaitez plus de détail ?</RouterLink></li></ul></li><li><RouterLink to="#recuperer-le-code-source-d-exemple">Récupérer le code source d&#39;exemple</RouterLink><ul><li><RouterLink to="#globalement">Globalement</RouterLink></li><li><RouterLink to="#la-configuration">La configuration</RouterLink></li><li><RouterLink to="#telecharger-le-code-source">Télécharger le code source</RouterLink></li></ul></li><li><RouterLink to="#faire-fonctionner-le-code">Faire fonctionner le code</RouterLink></li><li><RouterLink to="#modifier-la-page-«-home-»">Modifier la page « Home »</RouterLink></li><li><RouterLink to="#creer-la-page-«-about-»">Créer la page « About »</RouterLink><ul><li><RouterLink to="#creer-la-methode">Créer la méthode</RouterLink></li><li><RouterLink to="#creer-la-vue-page">Créer la vue / page</RouterLink></li><li><RouterLink to="#creer-la-route">Créer la route</RouterLink></li></ul></li><li><RouterLink to="#place-au-projet-«-la-todo-list-»">Place au projet « La TODO list »</RouterLink><ul><li><RouterLink to="#bootstrap">Bootstrap</RouterLink></li><li><RouterLink to="#modelisation-de-la-base-de-donnees">Modélisation de la base de données</RouterLink></li><li><RouterLink to="#creer-le-modele">Créer le modèle</RouterLink></li><li><RouterLink to="#modifier-le-constructeur">Modifier le constructeur</RouterLink></li><li><RouterLink to="#creer-la-methode-«-marquercommetermine-»">Créer la méthode « marquerCommeTermine() »</RouterLink></li><li><RouterLink to="#initialiser-la-base-de-donnees">Initialiser la base de données</RouterLink></li><li><RouterLink to="#creer-le-controleur">Créer le contrôleur</RouterLink></li><li><RouterLink to="#definir-les-routes-dans-le-routeur">Définir les routes dans le routeur</RouterLink></li><li><RouterLink to="#ajouter-le-constructeur-construct">Ajouter le constructeur __construct()</RouterLink></li><li><RouterLink to="#la-methode-liste">La méthode liste()</RouterLink></li><li><RouterLink to="#le-template-de-la-page-liste">Le template de la page liste</RouterLink></li><li><RouterLink to="#la-methode-ajouter-texte">La méthode ajouter($texte = &#39;&#39;)</RouterLink></li><li><RouterLink to="#la-methode-terminer-id">La méthode terminer($id = &#39;&#39;)</RouterLink></li><li><RouterLink to="#la-methode-supprimer-id">La méthode supprimer($id = &#39;&#39;)</RouterLink></li><li><RouterLink to="#un-serveur-de-dev">Un serveur de dev ?</RouterLink></li><li><RouterLink to="#evolution-0">Évolution 0</RouterLink></li><li><RouterLink to="#evolution-1">Évolution 1</RouterLink></li><li><RouterLink to="#evolution-2">Évolution 2</RouterLink></li><li><RouterLink to="#evolution-3">Évolution 3</RouterLink></li><li><RouterLink to="#evolution-4">Évolution 4</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Comme précisé dans le cours et dans nos échanges, la structure « MVC » est proposée ici comme phase transitoire entre votre code PHP de première année et du Laravel que l'on peut retrouver en entreprise. En effet, même si la structure MVC a été créée avec la prise en compte de contrainte de sécurité elle n’est en aucun cas dimensionnée pour réaliser un site client avec plusieurs centaines d'utilisateurs.</p>
<ul>
<li><RouterLink to="/cheatsheets/poo/">Aide mémoire Programmation Orientée Objet</RouterLink></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">C'est important</p>
<p>Le point d'introduction est important. Savoir justifier d'une solution est tout aussi important que la solution en elle-même. Si vous décider décider d'utiliser ma structure dans d'autres développements vous devez le faire avec conviction et pas juste « parceque ».</p>
<p>Ceci étant dit, nous pouvons continuer 🚀 !</p>
</div>
<h2 id="le-projet" tabindex="-1"><a class="header-anchor" href="#le-projet" aria-hidden="true">#</a> Le projet</h2>
<p>Si vous avez déjà testé de nouvelles technologies, il existe un type de projet qui permet « de prendre en main » facilement du code inconnu. Ce type de projet est une TODO List.</p>
<p>Je vous propose donc de réaliser une TODO List en utilisant la structure MVC.</p>
<p><em>Voilà ce que nous allons réaliser :</em></p>
<p><img src="@source/tp/php/mvc/res/liste.png" alt="Le projet"></p>
<h2 id="la-structure" tabindex="-1"><a class="header-anchor" href="#la-structure" aria-hidden="true">#</a> La structure</h2>
<p>La structure de code MVC reprend les bases des frameworks modernes types Laravel. C'est-à-dire un découpage « MVC », le découpage MVC signifie :</p>
<ul>
<li><strong>M</strong>odèle</li>
<li><strong>V</strong>ue</li>
<li><strong>C</strong>ontrôleur</li>
</ul>
<p><img src="@source/tp/php/mvc/res/mvc.png" alt="MVC"></p>
<h3 id="le-modele" tabindex="-1"><a class="header-anchor" href="#le-modele" aria-hidden="true">#</a> Le Modèle</h3>
<p>Le modèle représente la couche de votre application qui va manipuler les données. Concrètement c'est celle-ci qui va parler en SQL avec votre moteur de base de données.</p>
<p>Vous trouverez dans celle-ci <strong>autant de méthodes que nécessaire</strong>, vous pouvez <em>(et à mon avis vous devez)</em> spécialiser vos modèles aux différentes tables présentes dans votre projet.</p>
<p>Par exemple si nous avons la base de données suivante :</p>
<p><img src="@source/tp/php/mvc/res/mcd_exemple.jpeg" alt="Exemple MCD"></p>
<p>Nous devrions créer au minimum <em>3 modèles</em> :</p>
<ul>
<li>Client</li>
<li>BonDeCommande</li>
<li>Produit</li>
</ul>
<p>Avec à chaque fois des méthodes spécifiques exemple, nous pourrions avoir</p>
<table>
<thead>
<tr>
<th style="text-align:left">Modèle</th>
<th style="text-align:left">Méthodes</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Client</td>
<td style="text-align:left"><code>CreerClient()</code>, <code>ModifierClient()</code>, <code>SupprimerClient()</code></td>
</tr>
<tr>
<td style="text-align:left">BonDeCommande</td>
<td style="text-align:left"><code>CreerBdc()</code>, <code>ModifierBdc()</code>, <code>SupprimerBdc()</code></td>
</tr>
<tr>
<td style="text-align:left">Produit</td>
<td style="text-align:left"><code>CreerProduit()</code>, <code>ModifierProduit()</code>, <code>SupprimerProduit()</code></td>
</tr>
</tbody>
</table>
<div class="custom-container danger"><p class="custom-container-title">STOP ! Ce qu'il faut retenir</p>
<p>Ce qu'il faut retenir c'est :</p>
<ul>
<li>Autant d'objets que de tables.</li>
<li>Des méthodes spécifiques aux actions à faire dans la table.</li>
</ul>
</div>
<div class="custom-container tip"><p class="custom-container-title">CRUD</p>
<p>Ce genre d'objet s'appelle un CRUD (Create, Update, Delete). C'est une structure que nous retrouverons très souvent. Vous allez voir que c'est tellement courant qu'en général ils sont écrits automatiquement par le Framework.</p>
<iframe src="https://giphy.com/embed/11ISwbgCxEzMyY" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</div>
<h3 id="la-vue" tabindex="-1"><a class="header-anchor" href="#la-vue" aria-hidden="true">#</a> La Vue</h3>
<p>La vue vous connaissez! Ici rien de nouveau. Le <code>V</code> de MVC c'est juste la représentation graphique de ce que vous souhaitez afficher (en HTML + CSS + JavaScript).</p>
<p>Cependant par rapport à vos premiers développements nous allons découper au maximum le code HTML en différents fichiers ; Objectif éviter le code dupliqué en utilisant une organisation qui ressemblera à :</p>
<p><img src="@source/tp/php/mvc/res/parties.png" alt="Découpage"></p>
<div class="custom-container tip"><p class="custom-container-title">L'objectif ?</p>
<ul>
<li>Éviter le code dupliqué.</li>
<li>Faciliter la modification.</li>
<li>Se concentrer sur la partie du code « Métier » de la page en cours.</li>
</ul>
</div>
<h3 id="le-controleur" tabindex="-1"><a class="header-anchor" href="#le-controleur" aria-hidden="true">#</a> Le Contrôleur</h3>
<p>Et le contrôleur dans tout ça ? Et bien le contrôleur va assembler :</p>
<ul>
<li>Votre modèle (l'accès aux données).</li>
<li>Votre Vue (l'affichage).</li>
</ul>
<p>Le code va prendre les demandes des clients « appel HTTP » réaliser le traitement en base de données et afficher « la vue » résultat au client.</p>
<p>Comme pour le modèle, le contrôleur est un objet qui doit posséder idéalement autant de méthode que de page (et peut-être plus).</p>
<h3 id="le-routeur" tabindex="-1"><a class="header-anchor" href="#le-routeur" aria-hidden="true">#</a> Le Routeur</h3>
<p>Nous l'avons vu en cours, en plus du MVC classique, nous allons ajouter une dernière brique « essentiel » au bon fonctionnement et à la maintenance de votre site Internet. Cette brique est nommée un <strong>Routeur</strong>.</p>
<p>Le routeur va contenir la déclaration des « liens » de votre site Internet afin de les aiguiller vers la bonne fonctionnalité dans votre contrôleur.</p>
<p>Nous pouvons schématiser le fonctionnement :</p>
<p><img src="@source/tp/php/mvc/res/routeur.png" alt="Intégration du routeur"></p>
<div class="custom-container tip"><p class="custom-container-title">Vous êtes ici ?</p>
<p>Appeler-moi nous allons discuter un peu de cette architecture, qui est la base de presque l'ensemble des frameworks modernes (Laravel, VueJS, React …)</p>
</div>
<h3 id="vous-souhaitez-plus-de-detail" tabindex="-1"><a class="header-anchor" href="#vous-souhaitez-plus-de-detail" aria-hidden="true">#</a> Vous souhaitez plus de détail ?</h3>
<p>L'idée ici était de rappeler les bases, si vous souhaitez plus de détail sur l'architecture MVC que je vous propose <RouterLink to="/tp/php/mvc/tp1.html">rendez-vous ici</RouterLink></p>
<h2 id="recuperer-le-code-source-d-exemple" tabindex="-1"><a class="header-anchor" href="#recuperer-le-code-source-d-exemple" aria-hidden="true">#</a> Récupérer le code source d'exemple</h2>
<p>Un peu comme pour un projet Laravel, nous n'allons pas partir de 0 ! Vous allez partir d'un code initial qui vous servira de base de travail.</p>
<p>Le code en question est « vide », il s'agit uniquement d'une structure que <strong>vous devez</strong> respecter. Un peu comme en entreprise vous vous intégrez dans une équipe, je vous propose ici de respecter quelques règles qui sont des standards du développement.</p>
<p>Comme indiqué en introduction, la structuration d'un développement est aussi importante que le développement en
lui-même. C'est pour ça qu'avant même de développer il est important de prendre en main la structure des dossiers et
fichiers proposés dans le code présenté en exemple.</p>
<p>La structure de base en termes de dossier ressemble à :</p>
<p><img src="@source/tp/php/mvc/res/structure_dossiers.png" alt="Structure des dossiers"></p>
<div class="custom-container tip"><p class="custom-container-title">Compliqué ?</p>
<p>Pas d'inquiétude, pas de stress ! nous allons voir ensemble comment prendre en main le code.</p>
</div>
<h3 id="globalement" tabindex="-1"><a class="header-anchor" href="#globalement" aria-hidden="true">#</a> Globalement</h3>
<p>Le code présent utilise différents aspects du développement objet :</p>
<ul>
<li>Des objets permettant d'encapsuler / organiser la logique autour de représentation.</li>
<li>De l'héritage afin d'organiser le code hiérarchiquement.</li>
<li>Des interfaces permettant de définir un comportement.</li>
</ul>
<p>Les éléments de <code>base</code> sont toujours dans un dossier nommé <code>base</code>. Vous retrouverez ce dossier pour les contrôleurs, les routes, les modèles.</p>
<h3 id="la-configuration" tabindex="-1"><a class="header-anchor" href="#la-configuration" aria-hidden="true">#</a> La configuration</h3>
<p>Avant d'aller plus loin, intéressons-nous à la configuration. Dans un projet, il est évident qu'il ne faut pas mettre la configuration n'importe où. Vous l'avez vécu en entreprise, vous avez peut-être eu à votre disposition plusieurs serveurs / machines / ordinateurs.</p>
<p>Votre code va fonctionner de manière identique entre chaque environnement, par contre ce qui va certainement changer c'est l'accès à la base de données. Cet accès, est dépendant d'une configuration (Utilisateur, Mot de passe, Serveur …) dans une structure MVC on essai de ne pas mettre cette configuration n'importe où !</p>
<p>Dans l'organisation que je vous propose, cette configuration est centralisée dans le fichier <code>configs.php</code> à la racine du code source.</p>
<div class="custom-container tip"><p class="custom-container-title">La configuration c'est bien !</p>
<p>C'est peut-être un détail pour vous… Mais pour moi ça veut dire beaucoup ! Actuellement vous avez un serveur, mais demain peut-être 20… Et pour votre projet final, vous aurez à déployer rapidement votre application sur un autre serveur que celui sur lequel vous avez développé.</p>
<p>Prenez <strong>dès maintenant</strong> l'habitude de mettre votre configuration (IP, Serveur, mot de passe de BDD, etc.) dans le fichier <code>configs.php</code>. Dans l'architecture que je vous propose vous y trouverez le minimum nécessaire au bon fonctionnement d'une application.</p>
</div>
<h3 id="telecharger-le-code-source" tabindex="-1"><a class="header-anchor" href="#telecharger-le-code-source" aria-hidden="true">#</a> Télécharger le code source</h3>
<p>Le projet de base est disponible <a href="https://github.com/c4software/mini-mvc-sample/archive/refs/tags/1.4.zip" target="_blank" rel="noopener noreferrer">à l'adresse suivante en cliquant ici<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">C'est un projet vide</p>
<p>Même si celui-ci contient à première vue « beaucoup de fichiers », le projet vous avez téléchargé est bien un projet vide.</p>
</div>
<h2 id="faire-fonctionner-le-code" tabindex="-1"><a class="header-anchor" href="#faire-fonctionner-le-code" aria-hidden="true">#</a> Faire fonctionner le code</h2>
<p>La première étape est de faire fonctionner le code sur votre machine. Je vous laisse mettre en place le code fourni dans votre dossier <code>htdocs</code> ou <code>www</code> en fonction de l'outil que vous utilisez.</p>
<p><strong>Attention au fichiers cachés</strong>, dans l'archive il y a un fichier .htaccess ne l'oubliez pas !</p>
<div class="custom-container tip"><p class="custom-container-title">.htaccess ?</p>
<p>Vous avez déjà entendu parler de ce fichier ? C'est un fichier important, il va nous permettre de définir / redéfinir le comportement de votre serveur Web pour par exemple activer l’URL REWRITING` (réécriture d'URL).</p>
<p>La réécriture d'url va nous permettre d'avoir de beaux liens exemple <code>index.php?page=toto</code> deviendra seulement <code>toto.html</code>. Vous voulez en savoir plus ? Je suis là 👋, je vais vous donner un complément d'information.</p>
</div>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><img src="@source/tp/php/mvc/res/sample.png" alt="Exemple qui fonctionne"></td>
</tr>
<tr>
<td style="text-align:center">Si tout fonctionne correctement, vous devriez avoir 👆 (superbe n'est-ce pas)</td>
</tr>
</tbody>
</table>
<h2 id="modifier-la-page-«-home-»" tabindex="-1"><a class="header-anchor" href="#modifier-la-page-«-home-»" aria-hidden="true">#</a> Modifier la page « Home »</h2>
<p>Le meilleur moyen pour prendre en main un projet c'est de le modifier, je vous propose donc une première modification très simple :</p>
<ul>
<li>Modifier la page d'accueil.</li>
</ul>
<p>Je vous propose de mettre en place sur la page d'accueil une photo / image (de votre choix) centrée via de la CSS.</p>
<div class="custom-container tip"><p class="custom-container-title">C'est à vous</p>
<p>La bonne démarche à mon sens est là suivante :</p>
<ul>
<li>Utiliser un IDE pertinent (exemple PHPStorm ou VSCode).</li>
<li>Repensé à l'introduction et la notion de MVC. Nous allons effectivement toucher le <code>Vue</code> (elle même appelé par le contrôleur), ça veut dire que vous allez trouver votre fichier dans le dossier <code>views</code>.</li>
<li>Pour trouver le bon fichier, je vous laisse un peu investiguer, mais sachez que regarder dans le contrôleur semble être une bonne idée…</li>
</ul>
<p>👋 Je suis là pour ceux qui sont perdus 🤕</p>
</div>
<h2 id="creer-la-page-«-about-»" tabindex="-1"><a class="header-anchor" href="#creer-la-page-«-about-»" aria-hidden="true">#</a> Créer la page « About »</h2>
<p>Maintenant que vous avez réalisé votre modification, je vous propose de regarder « Comment ajouter une nouvelle page dans cette superbe architecture (que je trouve déjà géniale) ».</p>
<p>J'imagine que pour l'instant vous avez peur :</p>
<ul>
<li>Mais comment faire pour ajouter une page?</li>
<li>J'ai bien du HTML dans <code>views</code> mais comment je l'appelle?</li>
</ul>
<p>Et bien la réponse à vos questions est</p>
<ul>
<li>Une <strong>nouvelle</strong> méthode dans le bon contrôleur.</li>
<li>Un fichier <code>about.php</code> dans <code>views</code>.</li>
<li>Une correspondance entre « Votre méthode » et une route dans le <code>routes/Web.php</code>.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Nous l'avons vu ensemble</p>
<p>Le routeur est un « composant » très important du web moderne. Il va nous permettre de piloter les ressources accessibles à notre client en les déclarant dans un fichier.</p>
<ul>
<li>À votre avis, pourquoi est-ce important de travailler avec une <code>WHITELIST</code> plutôt qu'une <code>BLACKLIST</code> dans ce genre de situation ?</li>
</ul>
</div>
<p>Vu que c'est la première fois, nous allons le faire ensemble… N'hésitez pas à poser vos questions !</p>
<h3 id="creer-la-methode" tabindex="-1"><a class="header-anchor" href="#creer-la-methode" aria-hidden="true">#</a> Créer la méthode</h3>
<p>Nous allons dans un premier temps créer une méthode dans le contrôleur <code>SampleWeb.php</code>, pour le contenu pas grand-chose pour l'instant. Vous pouvez vous inspirer du contenu de la méthode <code>home()</code>.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">about</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Va afficher le header de la page (mais comment ? Avez-vous regardé ?)</span>
    <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"views/global/about.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">footer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Va afficher le footer de la page (mais comment ? Avez-vous regardé ?)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Pour l'instant aucun changement, si vous utilisez PHPStorm celui-ci va vous proposer de créer le fichier <code>about.php</code> directement en cliquant sur « la petite lampe jaune ».</p>
<p><img src="@source/tp/php/mvc/res/create_file_phpstorm.png" alt="Créer le fichier avec PHPStorm"></p>
<h3 id="creer-la-vue-page" tabindex="-1"><a class="header-anchor" href="#creer-la-vue-page" aria-hidden="true">#</a> Créer la vue / page</h3>
<p>Si ce n'est pas déjà fait, créé le fichier <code>views/global/about.php</code>. Pour le contenu, je vous laisse libre. Je vous rappelle juste que nous sommes entrain de créer une page « À propos ».</p>
<div class="custom-container tip"><p class="custom-container-title">Rappel</p>
<p>ici nous n'écrivons que le contenu, l'entête et le pied de page sont « automatiquement » ajoutés grâce au code présent dans la méthode home de votre contrôleur.</p>
</div>
<h3 id="creer-la-route" tabindex="-1"><a class="header-anchor" href="#creer-la-route" aria-hidden="true">#</a> Créer la route</h3>
<p>Voilà nous avons maintenant l'ensemble du code, mais celui-ci n'est pas encore accessible. Pour le rendre accessible, vous devez le déclarer dans le routeur.</p>
<p>Ici nous sommes entrain de faire une page <code>Web</code>, vous devez donc ajouter dans le routeur <code>Web.php</code> l'accès à votre page via l'ajout de la ligne suivante :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/about'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$main</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'about'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li><strong>Évidemment</strong> c'est à ajouter après la route existante.</li>
<li>Le premier paramètre correspond au « Chemin / lien d'accès », le second étant la méthode à appeler dans le bon contrôleur.</li>
</ul>
<p>👋 Je vous laisse tester l'accès à votre page</p>
<h2 id="place-au-projet-«-la-todo-list-»" tabindex="-1"><a class="header-anchor" href="#place-au-projet-«-la-todo-list-»" aria-hidden="true">#</a> Place au projet « La TODO list »</h2>
<p>Maintenant que nous avons pris en main le code existant, je vous propose de réaliser une plus grosse modification, l'ajout d'une nouvelle fonctionnalité « La TodoList », pour réaliser l'ensemble du code, je vais bien évidemment vous guider.</p>
<p>Nous allons donc créer une TODO List. Une TODO List c'est toujours le même genre d'action :</p>
<ul>
<li>Une Liste.</li>
<li>Un ajout dans la liste.</li>
<li>Un marqué comme terminer « une todo ».</li>
<li>Un supprimé qui supprime uniquement les taches « avec comme statut, termine = 1 ».</li>
</ul>
<p>Nous allons donc avoir 4 fonctionnalités dans notre application. Chaque fonctionnalité je le rappelle sera une méthode de notre contrôleur :</p>
<table>
<thead>
<tr>
<th style="text-align:center">Route</th>
<th style="text-align:right">Méthode dans le contrôleur</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code>/list</code></td>
<td style="text-align:right"><code>liste()</code></td>
</tr>
<tr>
<td style="text-align:center"><code>/ajouter</code></td>
<td style="text-align:right"><code>ajouter($texte)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>/terminer</code></td>
<td style="text-align:right"><code>terminer($id)</code></td>
</tr>
<tr>
<td style="text-align:center"><code>/supprimer</code></td>
<td style="text-align:right"><code>supprimer($id)</code></td>
</tr>
</tbody>
</table>
<p>L'étape de définition des différentes actions est <strong>primordiale</strong>, ça va nous permettre de créer notre objet de manière efficace, l'autre bonne façon de représenter notre objet est via une modélisation UML.</p>
<p><img src="@source/tp/php/mvc/res/todoControler.png" alt="Modélisation UML"></p>
<div class="custom-container tip"><p class="custom-container-title">Vous vous intégrez dans un framework</p>
<p>Parlons un peu de la modélisation UML que je vous propose, comme vous pouvez le constater nous avons ici la définition de la class avec les différentes méthodes définies dans le tableau.</p>
<p>Nous avons également une classe en plus ; cette classe est « la base » d'un contrôleur, elle définit les méthodes de bases communes à l'ensemble des contrôleurs du framework.</p>
<p>🗣 Cette classe ne sera <strong>jamais</strong> instanciée directement, la flèche « extends » défini la notion d'héritage.</p>
</div>
<h3 id="bootstrap" tabindex="-1"><a class="header-anchor" href="#bootstrap" aria-hidden="true">#</a> Bootstrap</h3>
<p>Nous allons utiliser Bootstrap pour coder l'interface, n'hésitez donc pas à consulter la documentation :</p>
<ul>
<li><a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/" target="_blank" rel="noopener noreferrer">Bootstrap<ExternalLinkIcon/></a></li>
<li><a href="https://icons.getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap Icon<ExternalLinkIcon/></a></li>
</ul>
<h3 id="modelisation-de-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#modelisation-de-la-base-de-donnees" aria-hidden="true">#</a> Modélisation de la base de données</h3>
<p>Avant de continuer, je vous propose de définir le format de la base de données. En effet, notre modèle reposera sur celle-ci il faut donc réfléchir à celle-ci. L'idée ici est de faire du code, j'ai donc réfléchi (un peu) à votre place. Le minimum pour que nous puissions réaliser notre « TodoList » est la création de la table suivante :</p>
<p><img src="@source/tp/php/mvc/res/todos.png" alt="Modélisation table TODO"></p>
<p>PS: Oui, oui je sais c'est impressionnant !</p>
<h3 id="creer-le-modele" tabindex="-1"><a class="header-anchor" href="#creer-le-modele" aria-hidden="true">#</a> Créer le modèle</h3>
<p>Le modèle va être le moyen d'accéder à nos données, c'est ici que nous allons écrire nos requêtes SQL (<strong>et uniquement ici</strong>). Utiliser un framework signifie en général gagner du temps ! Pour l'instant, j'imagine que vous n'en avez pas l'impression, mais je vous assure quand vous maitrisez un framework et/ou une architecture vous gagnerez un temps fou. Ce gain de temps vient de deux éléments :</p>
<ul>
<li>L'architecture des dossiers et du code propre et bien organisé.</li>
<li>Des outils pour créer les différents éléments.</li>
<li>Du code partagé, utilisé sans copier / collé.</li>
</ul>
<p>Le framework que je vous propose entre directement dans cette catégorie « Gagner du temps ». Pour créer notre modèle au lieu de copier / coller du code vous avez de base (intégrer dans le code) un outil en ligne de commande qui s'occupe de tout (si si). Pour créer votre modèle pour accéder au TodoList il vous suffit de :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Hors Windows</span>
php index.php model:create TodoModel

<span class="token comment"># Sous Windows (avec XAMPP)</span>
C:/xampp/php/php index.php model:create TodoModel

<span class="token comment"># Sous Windows (avec WAMP)</span>
C:/wamp64/bin/php/php7.4.9/php index.php model:create TodoModel
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>Et c'est tout !</strong> votre modèle pour accéder aux données est prêt 🤝. Nous avons maintenant une classe qui nous permettra d'accéder aux données contenues dans la base de données. L'accès aux données se fera :</p>
<ul>
<li>Via les méthodes « de base » (comme vu en cours via l'héritage présent dans la classe).</li>
<li>Via <strong><em>vos méthodes</em></strong> directement écrite par vous.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Pas de magie (jamais)</p>
<p>Je vous invite à regarder comment fonctionne cette partie dans le code. Ce n’est pas bien compliqué. D'ailleurs, regardons ensemble !</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">Vous avez du mal à voir ce que nous avons créé non ?</p>
<p>Et oui, les commandes magiques c'est bien … mais voilà ce que nous avons créé :</p>
<p><img src="@source/tp/php/mvc/res/umlTodoModel.jpg" alt="TodoModel"></p>
<ul>
<li>SQL est « une classe de base », elle est intégrée dans le framework.</li>
<li>Votre classe <code>TodoModel</code> hérite de la classe SQL. (Vous pouvez m'en dire plus ?)</li>
<li>Votre classe <code>TodoModel</code> a été créée dans le dossier <code>models</code>. (Je vous laisse aller regarder)</li>
<li>Pourquoi notre classe ne possède-t-elle qu'une seule méthode ?</li>
</ul>
</div>
<h3 id="modifier-le-constructeur" tabindex="-1"><a class="header-anchor" href="#modifier-le-constructeur" aria-hidden="true">#</a> Modifier le constructeur</h3>
<p>Dans le constructeur de la classe, je vous laisse modifier les paramètres lors de la création du parent ; afin de spécifier le bon tableName et primmaryKey.</p>
<p>Je vous redonne le schéma de la base de données :</p>
<p><img src="@source/tp/php/mvc/res/todos.png" alt="Modélisation table TODO"></p>
<h3 id="creer-la-methode-«-marquercommetermine-»" tabindex="-1"><a class="header-anchor" href="#creer-la-methode-«-marquercommetermine-»" aria-hidden="true">#</a> Créer la méthode « marquerCommeTermine() »</h3>
<p>Dans le diagramme UML j'indique la présence d'une méthode <code>marquerCommeTermine()</code>, si vous avez ouvert la classe créée vous allez voir que cette méthode n'est pas présente. Nous allons donc devoir la créer…</p>
<ul>
<li>Pourquoi la méthode n'est pas présente ?</li>
<li>Pourquoi ne pas utiliser les méthodes fournies par le parent ?</li>
</ul>
<p>Cette méthode doit marquer comme terminé un enregistrement en base de données, nous allons donc avoir besoin</p>
<ul>
<li>D'un <code>id</code> en paramètre de la méthode.</li>
<li>D'une requête d'update.</li>
<li>D'un connecteur PDO (pour parler à la base de données)</li>
</ul>
<p>Vu que c'est la première fois je vous donne du code, mais attention à bien comprendre ce que vous copié/collé :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">marquerCommeTermine</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$stmt</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"UPDATE todos SET termine = 1 WHERE id = ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$id</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><details class="custom-container details"><summary>Besoin d'aide ?</summary>
<p>Votre classe doit maintenant ressembler à</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">models<span class="token punctuation">\</span>base<span class="token punctuation">\</span>SQL</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">TodoModel</span> <span class="token keyword">extends</span> <span class="token class-name">SQL</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">__construct</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'todos'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'id'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function-definition function">todoNonTermine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$stmt</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM todos WHERE termine = 0;"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function-definition function">marquerCommeTermine</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$stmt</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"UPDATE todos SET termine = 1 WHERE id = ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$id</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div></details>
<p>Questions :</p>
<ul>
<li>À votre avis est-ce la seule façon de faire ?</li>
<li>Avons-nous toutes les méthodes nécessaires pour réaliser notre application ?</li>
</ul>
<h3 id="initialiser-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#initialiser-la-base-de-donnees" aria-hidden="true">#</a> Initialiser la base de données</h3>
<p>Votre projet avance petit à petit, nous avons déjà créé :</p>
<ul>
<li>La base du projet (structure).</li>
<li>Le modèle pour accéder aux données.</li>
<li>Les méthodes permettant de modifier les données.</li>
</ul>
<p>C'est déjà pas mal, mais il manque maintenant la base de données en elle-même. Dans un framework cette partie-là est également automatisable (vous verrez avec Laravel c'est encore plus puissant). Dans un framework appliqué les modifications dans la base de données s'appellent réaliser une « migration », avec notre « mini framework » pour créer la base de données il suffit de créer <strong>un fichier</strong> dans le dossier <code>migrations</code> :</p>
<ul>
<li>Créer le fichier <code>init.sql</code> dans le dossier Migration, y mettre le contenu suivant :</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">--</span>
<span class="token comment">-- Structure de la table `todos`</span>
<span class="token comment">--</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token punctuation">`</span>todos<span class="token punctuation">`</span> <span class="token punctuation">(</span>
  <span class="token punctuation">`</span>id<span class="token punctuation">`</span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token punctuation">`</span>texte<span class="token punctuation">`</span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token punctuation">`</span>termine<span class="token punctuation">`</span> <span class="token keyword">tinyint</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">`</span><span class="token keyword">timestamp</span><span class="token punctuation">`</span> <span class="token keyword">timestamp</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">current_timestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4<span class="token punctuation">;</span>

<span class="token comment">--</span>
<span class="token comment">-- Index pour les tables déchargées</span>
<span class="token comment">--</span>

<span class="token comment">--</span>
<span class="token comment">-- Index pour la table `todos`</span>
<span class="token comment">--</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token punctuation">`</span>todos<span class="token punctuation">`</span>
  <span class="token keyword">ADD</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token punctuation">`</span>id<span class="token punctuation">`</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">--</span>
<span class="token comment">-- AUTO_INCREMENT pour les tables déchargées</span>
<span class="token comment">--</span>

<span class="token comment">--</span>
<span class="token comment">-- AUTO_INCREMENT pour la table `todos`</span>
<span class="token comment">--</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token punctuation">`</span>todos<span class="token punctuation">`</span>
  <span class="token keyword">MODIFY</span> <span class="token punctuation">`</span>id<span class="token punctuation">`</span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">;</span>
<span class="token keyword">COMMIT</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><ul>
<li>Installer la migration (appliquer les modifications sur votre base de données) via la commande :</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Hors Windows</span>
php index.php db:migrate

<span class="token comment"># Sous Windows (avec XAMPP)</span>
C:/xampp/php/php index.php db:migrate

<span class="token comment"># Sous Windows (avec WAMP)</span>
C:/wamp64/bin/php/php7.4.9/php index.php db:migrate
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Si tout va bien vous devriez avoir le résultat suivant:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token operator">=</span><span class="token operator">></span> Start migration of « migrations/init.sql »
<span class="token operator">=</span><span class="token operator">></span> End migration of « migrations/init.sql »
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Point d'avancement</p>
<ul>
<li>Ça ne fonctionne pas ? Avez-vous vérifié si vous avez configuré votre projet (<code>configs.php</code>).</li>
<li>Vérifier si la base a bien été créée dans votre PhpMyAdmin / DataGrip 👌</li>
<li>Mais c'est génial !</li>
</ul>
<iframe src="https://giphy.com/embed/SACoDGYTvVNhZYNb5a" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</div>
<h3 id="creer-le-controleur" tabindex="-1"><a class="header-anchor" href="#creer-le-controleur" aria-hidden="true">#</a> Créer le contrôleur</h3>
<p>Notre base est prête… Et si nous écrivions vraiment le code ? Comme pour créer le modèle, le framework vous fait gagner du temps ! Ici aussi pas besoin de copier / coller du code, une simple ligne de commande va vous initialiser un Contrôleur « vide » :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Hors Windows</span>
php index.php controller:create TodoWeb

<span class="token comment"># Sous Windows (avec XAMPP)</span>
C:/xampp/php/php index.php controller:create TodoWeb

<span class="token comment"># Sous Windows (avec WAMP)</span>
C:/wamp64/bin/php/php7.4.9/php index.php controller:create TodoWeb
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Cette commande va initialiser un contrôleur de type Web. Celui-ci est pour l'instant vide de méthode :</p>
<p><img src="@source/tp/php/mvc/res/todoControler.png" alt="Modélisation UML"></p>
<p>Ce contrôleur est pour l'instant vide, nous allons dans un premier temps devoir lui créer un constructeur afin de créer le modèle permettant l'accès à la base de données.</p>
<h3 id="definir-les-routes-dans-le-routeur" tabindex="-1"><a class="header-anchor" href="#definir-les-routes-dans-le-routeur" aria-hidden="true">#</a> Définir les routes dans le routeur</h3>
<p>Vous vous souvenez lors de la création de notre première page, nous avions dû ajouter une ligne dans le routeur afin de rendre accessibles les méthodes. Pour notre nouveau contrôleur, ça sera la même chose !</p>
<table>
<thead>
<tr>
<th style="text-align:center">Routes</th>
<th style="text-align:center">Contrôleur</th>
<th style="text-align:center">Méthodes</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">/todo/liste</td>
<td style="text-align:center"><code>TodoWeb</code></td>
<td style="text-align:center"><code>liste()</code></td>
</tr>
<tr>
<td style="text-align:center">/todo/ajouter</td>
<td style="text-align:center"><code>TodoWeb</code></td>
<td style="text-align:center"><code>ajouter()</code></td>
</tr>
<tr>
<td style="text-align:center">/todo/terminer</td>
<td style="text-align:center"><code>TodoWeb</code></td>
<td style="text-align:center"><code>terminer()</code></td>
</tr>
<tr>
<td style="text-align:center">/todo/supprimer</td>
<td style="text-align:center"><code>TodoWeb</code></td>
<td style="text-align:center"><code>supprimer()</code></td>
</tr>
</tbody>
</table>
<p>Dans le fichier <code>routes/Web.php</code>, ajouter le lignes :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>  <span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TodoWeb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/todo/liste'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$todo</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'liste'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/todo/ajouter'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$todo</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'ajouter'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/todo/terminer'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$todo</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'terminer'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/todo/supprimer'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$todo</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'supprimer'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>Où les ajouter ?</li>
<li>À quoi correspondent-t-elles ?</li>
</ul>
<h3 id="ajouter-le-constructeur-construct" tabindex="-1"><a class="header-anchor" href="#ajouter-le-constructeur-construct" aria-hidden="true">#</a> Ajouter le constructeur <code>__construct()</code></h3>
<p>Le contrôleur aura pour but d'aller récupérer les Todo en base <strong>via</strong> le modèle. Il faut donc donner un accès au modèle depuis la classe. Nous allons donc écrire <strong>le constructeur</strong> de la méthode. En PHP, le constructeur s'écrit :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">private</span> <span class="token variable">$todoModel</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">todoModel</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TodoModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Je vous laisse réfléchir sur l'endroit ou mettre le code en question.</p>
<details class="custom-container details"><summary>Voir une solution</summary>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">controllers</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">controllers<span class="token punctuation">\</span>base<span class="token punctuation">\</span>Web</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">models<span class="token punctuation">\</span>TodoModel</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">TodoWeb</span> <span class="token keyword">extends</span> <span class="token class-name">Web</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token variable">$todoModel</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">todoModel</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TodoModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></details>
<h3 id="la-methode-liste" tabindex="-1"><a class="header-anchor" href="#la-methode-liste" aria-hidden="true">#</a> La méthode <code>liste()</code></h3>
<p>La première méthode que nous allons créer est celle de la liste. Elle se nommera <code>liste()</code>, cette méthode sera automatiquement appelée via le <code>routeur</code> à <strong>chaque visite d'un utilisateur</strong>. L'objectif de cette méthode est :</p>
<ul>
<li>Afficher le header de la page (<code>$this-&gt;header()</code> méthode héritée du parent).</li>
<li>Récupérer l'ensemble des TODO (Array) actuellement en base via la méthode <code>getAll()</code> du TodoModel modèle.</li>
<li>Afficher votre <code>vue</code> via un include.</li>
<li>Afficher le footer de la page (<code>$this-&gt;footer()</code> méthode héritée du parent).</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Toujours la même forme</p>
<p>Vous allez rapidement vous apercevoir que la structure de base est toujours la même. Nous allons toujours faire la même chose lors de la création d'une méthode dans un contrôleur à savoir :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">function</span> <span class="token function-definition function">maMethodeQueJaiCopierColler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Pourquoi j'ai copier / coller ceci ? C'est un exemple seulement</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"views/global/home.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">footer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>Pssst</strong>, ne copier / coller pas le code précédent !! C'est un simple exemple.</p>
</div>
<p>Dans notre cas, la méthode va ressembler à :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">liste</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Affichage de l'entête.</span>
        <span class="token variable">$todos</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">todoModel</span><span class="token operator">-></span><span class="token function">getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Récupération des TODOS présents en base.</span>
        <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"views/todos/liste.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Affichage de votre vue.</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">footer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Affichage de votre pied de page.</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Et c'est tout ! La puissance d'un Frawerork c'est aussi ça, écrire finalement pas énormément de ligne pour afficher une page. Pourtant cette page :</p>
<ul>
<li>Affiche une entête.</li>
<li>Récupère en base de données les éléments.</li>
<li>Affiche la page.</li>
<li>Affiche le pied de page.</li>
</ul>
<h3 id="le-template-de-la-page-liste" tabindex="-1"><a class="header-anchor" href="#le-template-de-la-page-liste" aria-hidden="true">#</a> Le template de la page liste</h3>
<p>Votre IDE doit actuellement être moyen content… Effectivement, nous avons fait un <code>include</code> de <code>&quot;views/todos/liste.php&quot;</code> pourtant ce fichier n'existe pas.</p>
<p>Vu qu'il s'agit ici d'un projet découvert, je vais vous en donner le contenu (si vous le souhaitez, vous pouvez également l'écrire) voilà le rendu :</p>
<p><img src="@source/tp/php/mvc/res/todoPreview.png" alt="Interface TODO"></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container p-3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-body p-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- Action --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./ajouter<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>add<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>texte<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>texte<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-control<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Prendre une note…<span class="token punctuation">"</span></span> <span class="token attr-name">aria-label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>My new idea<span class="token punctuation">"</span></span> <span class="token attr-name">aria-describedby</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>basic-addon1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>

            <span class="token comment">&lt;!-- Liste --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list-group pt-3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
                <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$todos</span> <span class="token keyword">as</span> <span class="token variable">$todo</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token delimiter important">?></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list-group-item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>d-flex<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex-grow-1 align-self-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$todo</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">]</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
                                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./terminer?id=<span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$todo</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'id'</span><span class="token punctuation">]</span> <span class="token delimiter important">?></span></span><span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-outline-success<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bi bi-check<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span>
                                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
                                <span class="token comment">&lt;!-- Action à ajouter pour Supprimer --></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
                    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sizeof</span><span class="token punctuation">(</span><span class="token variable">$todos</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token delimiter important">?></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list-group-item text-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>C'est vide !<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
                    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
                <span class="token punctuation">}</span>
                <span class="token delimiter important">?></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>Je vous laisse mettre le contenu dans votre fichier <code>views/todos/liste.php</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">Valider le bon fonctionnement</p>
<p>Si vous accédez à votre page <code>todo/liste</code> vous devriez avoir le contenu suivant :</p>
<p><img src="@source/tp/php/mvc/res/todo_resultat_liste.png" alt="Résultat Liste vide"></p>
</div>
<h3 id="la-methode-ajouter-texte" tabindex="-1"><a class="header-anchor" href="#la-methode-ajouter-texte" aria-hidden="true">#</a> La méthode <code>ajouter($texte = '')</code></h3>
<p>Cette méthode sera automatiquement appelé quand vous aller appuyer sur la touche <key>Entrer</key> de votre clavier dans le champ de saisie sur la page <code>Liste</code>. L'objectif de cette méthode est de traiter l'action « J'ajoute un nouvel enregistrement dans la base Todo ».</p>
<p>Pour le code, je vais vous aider un peu, voilà le code du contrôleur :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">ajouter</span><span class="token punctuation">(</span><span class="token variable">$texte</span> <span class="token operator">=</span> <span class="token string double-quoted-string">""</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">todoModel</span><span class="token operator">-></span><span class="token function">ajouterTodo</span><span class="token punctuation">(</span><span class="token variable">$texte</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"./liste"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>À quoi correspond la méthode <code>redirect(…)</code> ? D'où provient-elle ?</li>
</ul>
<p><em>C'est à vous :</em></p>
<ul>
<li>Mettre en place le code dans le contrôleur.</li>
<li>Écrire la méthode ajouterTodo dans le modèle <code>TodoModel</code> (n'oubliez pas l'autocomplétion).
<ul>
<li>Écrire la requête <code>INSERT …</code></li>
</ul>
</li>
<li>Tester le bon fonctionnement</li>
</ul>
<p>Dans mon cas voilà le résultat :</p>
<p><img src="@source/tp/php/mvc/res/todo_resultat_ajouter.png" alt="Résultat Liste vide"></p>
<h4 id="ajouter-une-validation" tabindex="-1"><a class="header-anchor" href="#ajouter-une-validation" aria-hidden="true">#</a> Ajouter une validation</h4>
<p>Actuellement dans le code que vous avez copié il est possible d'ajouter des « TODO » sans texte. Je vous propose donc d'ajouter un contrôle de saisie <strong>dans le PHP</strong>.</p>
<p>Le contrôle doit empêcher l'ajoute d'une TODO si <code>$texte == ''</code>.</p>
<ul>
<li>Où placez-vous le contrôle ?</li>
<li>Pourquoi ?</li>
</ul>
<h3 id="la-methode-terminer-id" tabindex="-1"><a class="header-anchor" href="#la-methode-terminer-id" aria-hidden="true">#</a> La méthode <code>terminer($id = '')</code></h3>
<p>Vous l'avez compris… Je vous donne de moins en moins de code ! La méthode <code>terminer</code> sera très proche de <code>ajouter</code> sauf que celle-ci va prendre en paramètre l'id de l'élément à marquer comme terminé :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">terminer</span><span class="token punctuation">(</span><span class="token variable">$id</span> <span class="token operator">=</span> <span class="token string single-quoted-string">''</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$id</span> <span class="token operator">!=</span> <span class="token string double-quoted-string">""</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">todoModel</span><span class="token operator">-></span><span class="token function">marquerCommeTermine</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"./liste"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul>
<li>D'où arrive le paramètre <code>$id</code> ?</li>
<li>Pourquoi est-ce automatique ?</li>
</ul>
<p><em>À faire</em> :</p>
<ul>
<li>Mettre en place le code, valider le bon fonctionnement avec <strong>PHPMyAdmin</strong></li>
<li>Modifier la vue pour afficher le bouton vert <strong>seulement si</strong> la tâche est non terminée</li>
<li>Ajouter un bouton supprimé visible <strong>uniquement si</strong> la tâche est terminée</li>
</ul>
<p><img src="@source/tp/php/mvc/res/todo_resultat_terminer.png" alt="Résultat Liste vide"></p>
<h3 id="la-methode-supprimer-id" tabindex="-1"><a class="header-anchor" href="#la-methode-supprimer-id" aria-hidden="true">#</a> La méthode <code>supprimer($id = '')</code></h3>
<p>En utilisant le code précédemment fourni, écrire :</p>
<ul>
<li>La méthode dans le modèle permettant de supprimer un élément dans la base de données pour un id donné.</li>
<li>La méthode dans le contrôleur permettant de traiter l'action.</li>
<li><strong>Ne permettre la suppression</strong> que des Todo ayant <code>termine = 1</code>. La vérification <strong>ne doit pas être</strong> présente que dans la vue.</li>
</ul>
<p>C'est à vous.</p>
<h3 id="un-serveur-de-dev" tabindex="-1"><a class="header-anchor" href="#un-serveur-de-dev" aria-hidden="true">#</a> Un serveur de dev ?</h3>
<p>Si vous souhaitez tester votre code sans démarrer XAMPP c'est possible. PHP intègre un serveur Web de « développement », pour le lancer il suffit de :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Windows (avec XAMPP)</span>
C:/xampp/php/php -S localhost:9000

<span class="token comment"># Windows (avec WAMP)</span>
C:/wamp64/bin/php/php7.4.9/php -S localhost:9000

<span class="token comment"># Linux / OSX</span>
php -S localhost:9000
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="evolution-0" tabindex="-1"><a class="header-anchor" href="#evolution-0" aria-hidden="true">#</a> Évolution 0</h3>
<p>Ajouter dans la page d'accueil du site un lien permettant d'accéder à votre TodoList. Quelques consignes à respecter :</p>
<ul>
<li>Le lien doit être centré dans la page.</li>
<li>Le lien doit avoir l'<strong>apparence</strong> d'un bouton. <a href="https://getbootstrap.com/docs/5.0/components/buttons/" target="_blank" rel="noopener noreferrer">Voir la documentation<ExternalLinkIcon/></a></li>
</ul>
<h3 id="evolution-1" tabindex="-1"><a class="header-anchor" href="#evolution-1" aria-hidden="true">#</a> Évolution 1</h3>
<p>Je souhaite finalement masquer de l'affichage par défaut l'ensemble des enregistrements de la table <code>TODO</code> ayant <code>termine = 1</code>.</p>
<p>Je vous laisse modifier :</p>
<ul>
<li>Le code du modèle afin d'y ajouter une méthode.</li>
<li>Appeler cette méthode depuis votre page à la place du <code>getAll()</code>.</li>
</ul>
<h3 id="evolution-2" tabindex="-1"><a class="header-anchor" href="#evolution-2" aria-hidden="true">#</a> Évolution 2</h3>
<p>La partie TODOList ne doit pas être accessible à tous. En utilisant les techniques vu avec la SESSION (<code>$_SESSION</code>) ainsi qu'en réfléchissant sur les impacts en termes de sécurité (protection dans le routeur par exemple). Limiter l'accès de la partie TODOList seulement aux personnes avec un compte sur la plateforme.</p>
<ul>
<li>Quels impacts sont à prévoir dans le routeur ?</li>
<li>Est-ce nécessaire de créer un nouveau modèle ?</li>
<li>Est-ce nécessaire de créer un nouveau contrôleur ?</li>
<li>Combien de vue sera(ont) nécessaire(s) en plus de celles existantes ?</li>
</ul>
<h3 id="evolution-3" tabindex="-1"><a class="header-anchor" href="#evolution-3" aria-hidden="true">#</a> Évolution 3</h3>
<p>Maintenant que nous avons un système d'authentification, je vous propose de sauvegarder qui a créé la TODO pour ce faire :</p>
<ul>
<li>Modifier la base de données afin d'ajouter « l'email / nom d'utilisateur » de la personne ayant créé la TODO</li>
<li>Modifier la méthode d'ajout dans le modèle pour enregistrer l'information
<ul>
<li>Attention, comment allez-vous procéder pour récupérer la personne actuellement connectée ?</li>
</ul>
</li>
<li>Ajouter <strong>dans la vue</strong>, l'affichage de l'identité de la personne.
<ul>
<li>Idéalement en groupant les TODO par nom d'utilisateur / email.</li>
</ul>
</li>
</ul>
<h3 id="evolution-4" tabindex="-1"><a class="header-anchor" href="#evolution-4" aria-hidden="true">#</a> Évolution 4</h3>
<p>Modifier la page d'accueil de votre site afin que celle-ci présente votre projet.</p>
</template>
