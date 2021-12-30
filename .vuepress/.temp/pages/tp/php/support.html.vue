<template><h1 id="complement-du-cours-php" tabindex="-1"><a class="header-anchor" href="#complement-du-cours-php" aria-hidden="true">#</a> Complément du cours PHP</h1>
<p>Ce document est un complément du cours. Il vous permettra de revenir sur les différentes notions avec différents exemples.</p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#boite-a-outils">Boite à outils</RouterLink></li><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#le-fonctionnement">Le fonctionnement</RouterLink><ul><li><RouterLink to="#statique-ou-dynamique">Statique ou Dynamique ?</RouterLink></li><li><RouterLink to="#et-le-php-dans-tout-ca">Et le PHP dans tout ça ?</RouterLink></li><li><RouterLink to="#est-ce-la-seule-facon-de-faire">Est-ce la seule façon de faire ?</RouterLink></li></ul></li><li><RouterLink to="#les-outils-du-developpeur">Les outils du développeur</RouterLink></li><li><RouterLink to="#votre-premiere-page">Votre première page</RouterLink></li><li><RouterLink to="#les-bases-de-php">Les bases de PHP</RouterLink></li><li><RouterLink to="#les-variables-simples">Les variables simples</RouterLink><ul><li><RouterLink to="#les-types-de-variables">Les types de variables</RouterLink></li><li><RouterLink to="#a-faire">À faire</RouterLink></li></ul></li><li><RouterLink to="#les-operations">Les opérations</RouterLink><ul><li><RouterLink to="#string">String</RouterLink></li><li><RouterLink to="#int-ou-float">Int Ou Float</RouterLink></li><li><RouterLink to="#boolean">Boolean</RouterLink></li></ul></li><li><RouterLink to="#les-super-globales">Les Super Globales</RouterLink><ul><li><RouterLink to="#le-get">Le GET</RouterLink></li></ul></li><li><RouterLink to="#les-tableaux">Les tableaux</RouterLink><ul><li><RouterLink to="#numerotes">Numérotés</RouterLink></li><li><RouterLink to="#associatifs">Associatifs</RouterLink></li><li><RouterLink to="#a-faire-1">À faire</RouterLink></li></ul></li><li><RouterLink to="#les-conditions">Les conditions</RouterLink><ul><li><RouterLink to="#bon-et-on-pose-la-question-comment">Bon et on pose la question comment ?</RouterLink></li><li><RouterLink to="#concretement-ca-donne-quoi">Concrètement ça donne quoi ?</RouterLink></li><li><RouterLink to="#une-condition-if">Une condition IF</RouterLink></li><li><RouterLink to="#une-condition-if-else">Une condition IF/ELSE</RouterLink></li><li><RouterLink to="#une-condition-if-else-if-else">Une condition IF/ELSE IF/ELSE</RouterLink></li><li><RouterLink to="#les-conditions-«-boolean-»">Les conditions « Boolean »</RouterLink></li><li><RouterLink to="#une-autre-facon-de-conditionner">Une autre façon de conditionner</RouterLink></li><li><RouterLink to="#allons-plus-loin">Allons plus loin</RouterLink></li><li><RouterLink to="#a-faire-2">À faire</RouterLink></li></ul></li><li><RouterLink to="#les-boucles">Les boucles</RouterLink><ul><li><RouterLink to="#le-while">Le While</RouterLink></li><li><RouterLink to="#le-for">Le For</RouterLink></li><li><RouterLink to="#le-foreach">Le ForEach</RouterLink></li><li><RouterLink to="#un-peu-de-pratique">Un peu de pratique</RouterLink></li></ul></li><li><RouterLink to="#les-fonctions">Les fonctions</RouterLink><ul><li><RouterLink to="#le-fonctionnement-1">Le fonctionnement</RouterLink></li><li><RouterLink to="#les-parametres">Les paramètres</RouterLink></li><li><RouterLink to="#ecrire-sa-propre-fonction">Écrire sa propre fonction</RouterLink></li><li><RouterLink to="#les-fonctions-integrees">Les fonctions intégrées</RouterLink></li><li><RouterLink to="#a-faire-3">À faire</RouterLink></li></ul></li><li><RouterLink to="#les-includes">Les includes</RouterLink><ul><li><RouterLink to="#organisation-de-la-page">Organisation de la page</RouterLink></li><li><RouterLink to="#le-code">Le code</RouterLink></li><li><RouterLink to="#le-resultat">Le résultat</RouterLink></li><li><RouterLink to="#les-includes-pour-organiser-votre-code-php">Les Includes pour organiser votre code PHP</RouterLink></li><li><RouterLink to="#a-faire-4">À faire</RouterLink></li><li><RouterLink to="#a-faire-bis">À faire bis</RouterLink></li></ul></li><li><RouterLink to="#les-formulaires">Les formulaires</RouterLink><ul><li><RouterLink to="#ecrire-un-formulaire">Écrire un formulaire</RouterLink></li><li><RouterLink to="#le-code-html">Le code HTML</RouterLink></li><li><RouterLink to="#les-input-possibles">Les input possibles</RouterLink></li></ul></li><li><RouterLink to="#un-peu-de-pratique-1">Un peu de pratique</RouterLink></li><li><RouterLink to="#la-persistance">La persistance</RouterLink><ul><li><RouterLink to="#la-session">La session</RouterLink></li><li><RouterLink to="#les-cookies">Les cookies</RouterLink></li></ul></li><li><RouterLink to="#utiliser-la-session-pour-gerer-un-espace-d-administration">Utiliser la SESSION pour gérer un espace d&#39;administration</RouterLink><ul><li><RouterLink to="#nous-pouvons-representer-notre-problematique-tels-que">Nous pouvons représenter notre problématique tels que :</RouterLink></li><li><RouterLink to="#et-le-code">Et le code ?</RouterLink></li></ul></li><li><RouterLink to="#la-structure">La structure</RouterLink><ul><li><RouterLink to="#l-include-notre-sauveur">L&#39;include notre sauveur</RouterLink></li><li><RouterLink to="#le-point-d-entree-entry-point">Le point d&#39;entrée (entry-point)</RouterLink></li><li><RouterLink to="#assez-parle">Assez parlé !</RouterLink></li></ul></li><li><RouterLink to="#mise-en-pratique-de-la-session-cookie">Mise en pratique de la Session / Cookie</RouterLink></li><li><RouterLink to="#php-et-base-de-donnees">PHP et Base de données</RouterLink></li><li><RouterLink to="#le-php-objet">Le PHP Objet</RouterLink></li></ul></nav>
</details>
<h2 id="boite-a-outils" tabindex="-1"><a class="header-anchor" href="#boite-a-outils" aria-hidden="true">#</a> Boite à outils</h2>
<p>Le PHP est présent depuis de nombreuses années sur Internet, il faut donc être très vigilant aux codes que nous trouvons ! En effet le PHP a énormément évolué et ne fonctionne plus vraiment comme avant. Dans un cas comme celui-ci, je vous conseille la documentation officielle en priorité :</p>
<ul>
<li><a href="https://www.php.net/manual/fr/" target="_blank" rel="noopener noreferrer">Manuel PHP.net<ExternalLinkIcon/></a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Glossary/PHP" target="_blank" rel="noopener noreferrer">MDN<ExternalLinkIcon/></a></li>
<li><a href="https://www.w3schools.com/PhP/php_intro.asp" target="_blank" rel="noopener noreferrer">Intro PHP W3School<ExternalLinkIcon/></a></li>
</ul>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Le PHP est un langage de script largement utilisé sur Internet (Wordpress, Facebook …). Il existe depuis 1994, à l'origine le nom signifiait « <strong>P</strong>ersonal <strong>H</strong>ome <strong>P</strong>age » mais on lui préfère maintenant une signification bien plus large « <strong>P</strong>HP : <strong>H</strong>ypertext <strong>P</strong>reprocessor ».</p>
<div class="custom-container warning"><p class="custom-container-title">Un instant</p>
<p>Si vous ne l'avez pas déjà fait. Je vous conseille vivement d'aller regarder les cours <RouterLink to="/cheatsheets/html/">Base HTML</RouterLink> et le cours <RouterLink to="/tp/html_css/support.html">Base CSS</RouterLink>. Ils nous serviront de bases aux éléments abordés dans notre introduction au PHP.</p>
</div>
<p>Le PHP est un langage serveur permettant notamment la génération de code HTML. Nous entrerons plus en détail ultérieurement sur ces différentes notions.</p>
<h2 id="le-fonctionnement" tabindex="-1"><a class="header-anchor" href="#le-fonctionnement" aria-hidden="true">#</a> Le fonctionnement</h2>
<p>Le PHP est un langage de programmation « Procédurale <strong>et/ou</strong> objet », beaucoup d'entreprises l'utilisent (même si en France il a parfois mauvaise réputation). Facebook est en grande partie en PHP, Worpress est écrit en PHP. C'est massivement utilisé, il est donc <strong>incontournable</strong> pour vous développeur Web.</p>
<p>Il repose sur le principe de client / serveur. C'est une notion fondamentale à comprendre, votre navigateur n'est pas seul dans le monde de l'Internet, nous avons des serveurs, <strong>beaucoup de serveurs</strong>. Nous avons donc deux acteurs :</p>
<p><strong>Les clients</strong> ce sont les ordinateurs, smartphones, voitures bref tout ce qui peut faire une requête Web. Ils seront les visiteurs de votre site Internet.
<strong>Les serveurs</strong> ils délivrent les données à vos visiteurs, ils sont parfois très puissants pour assurer une forte charge… ou alors très léger! Comme par exemple, un Raspberry Pi derrière une Freebox. Ils n'ont pas forcément d'écran, ils ont des services qui délivrent du contenu « compréhensible par un client (Web, Api, …) ».</p>
<table>
<thead>
<tr>
<th style="text-align:center"><img src="@source/tp/php/res/client-serveur.svg" alt="Client Serveur"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><em>Nos clients et le(s) seveur(s)</em></td>
</tr>
</tbody>
</table>
<div class="custom-container danger"><p class="custom-container-title">Internet ≠ Chrome</p>
<p>Actuellement vous consommez Internet comme un utilisateur Web, mais Internet c'est pas seulement ça. C'est également des services <a href="https://fr.wikipedia.org/wiki/Interface_de_programmation" target="_blank" rel="noopener noreferrer">appelés API<ExternalLinkIcon/></a> qui permettent la communication entre deux systèmes informatiques (exemple Instagram sur votre Téléphone communique par API avec les serveurs de Facebook) dans un langage appelé JSON.</p>
</div>
<h3 id="statique-ou-dynamique" tabindex="-1"><a class="header-anchor" href="#statique-ou-dynamique" aria-hidden="true">#</a> Statique ou Dynamique ?</h3>
<p>Il y'a deux écoles !</p>
<p><strong>Le statique</strong>, c'est ce que nous avons vu ensemble au début. C'est simplement du code HTML écrit « en dur » qui ne change donc jamais côté serveur à chaque chargement. Pour le mettre à jour, il faut mettre à jour les fichiers HTML à la main sur le serveur. <strong>Avantage</strong>, ils sont très rapides et permettre de répondre très rapidement aux demandes des clients. Parfait donc pour un site vitrine.</p>
<p><strong>Le Dynamique</strong>, c'est ce que nous allons voir avec PHP, il s'agit de faire travailler le serveur pour générer une page « différente » pour chaque utilisateur. La mise à jour du contenu peut donc dans être quasiment temps réel grâce à des espaces d'administrations (exemple de WordPress). Ça nous ouvrira plein de possibilités de réalisations :</p>
<ul>
<li>Des sites dynamiques types Wordpress.</li>
<li>Des forums.</li>
<li>Des espaces d'administrations.</li>
<li>Des Blogs (avec là encore des solution comme par exemple Wordpress).</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Le monde est ni blanc, ni noir…</p>
<p>Ça semble simple hein ? Évidemment il y a des nuances, nous pourrions penser que l'ensemble des sites est dynamique… Mais il existe « une troisième école », celle des sites générés.</p>
<p>Elle part d'un postula simple « pourquoi faire calculer un serveur à chaque requête alors que le contenu change 1× par semaine ? ». Nous avons donc de plus en plus de sites qui sont « générés de manière périodique » puis servis de manière statique. C'est par exemple le cas de la documentation sur lequel vous vous trouvez.</p>
</div>
<h3 id="et-le-php-dans-tout-ca" tabindex="-1"><a class="header-anchor" href="#et-le-php-dans-tout-ca" aria-hidden="true">#</a> Et le PHP dans tout ça ?</h3>
<p>Le PHP va être un langage <strong>serveur</strong> qui permet de faire des sites <strong>dynamiques</strong>. Nous aurons donc du <strong>HTML + CSS</strong> classique, mais celui-ci sera en partie « à trou », les trous seront complétés dynamiquement à chaque requête par votre serveur PHP.</p>
<p>Un petit exemple ?</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Exemple PHP<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Bonjour vous<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Nous sommes le <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token function">date</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"d/m/Y"</span><span class="token punctuation">)</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><img src="@source/tp/php/res/php_base.png" alt="Exemple de base PHP"></p>
<div class="custom-container tip"><p class="custom-container-title">En aparté</p>
<p>Nous voyons ici les bases du PHP, nous allons donc mélanger HTML et PHP. Je suis personnellement <em>pas fan du tout</em>, mais il faut commencer quelque part. Plus tard nous mettrons en place différents designs pattern dont certains avec des logiques de Templates, ce qui nous permettra de « découper la logique d'interface (HTML) et de code (PHP) ».</p>
</div>
<h3 id="est-ce-la-seule-facon-de-faire" tabindex="-1"><a class="header-anchor" href="#est-ce-la-seule-facon-de-faire" aria-hidden="true">#</a> Est-ce la seule façon de faire ?</h3>
<p>Vous vous souvenez, je vous disais que PHP avait pas forcément bonne presse en France. Il existe donc d'autres façons de générer du code serveur :</p>
<ul>
<li>Ruby (RoR)</li>
<li>Python</li>
<li>NodeJS</li>
<li>…</li>
</ul>
<p>La liste est encore bien plus longue ! Il y a énormément d'autre façon de générer des pages ou API. Celle actuellement terriblement à la mode est <code>NodeJS</code>, elle repose sur un langage serveur en JavaScript (oui, oui, le même que dans votre navigateur)</p>
<h2 id="les-outils-du-developpeur" tabindex="-1"><a class="header-anchor" href="#les-outils-du-developpeur" aria-hidden="true">#</a> Les outils du développeur</h2>
<p>Nous avons donc un langage Serveur… Mais vous, vous n'avez pas de serveur là non ? Et bien, si, enfin presque ! Votre ordinateur pour l'instant est un client, mais il peut facilement devenir un serveur. Pour développer en PHP nous allons avoir besoin d'un logiciel. Pour être précis d'un ensemble de logiciels :</p>
<ul>
<li>Apache (ou Nginx)</li>
<li>MySQL (ou MariaDB)</li>
<li>PHP</li>
</ul>
<p>En fonction de la plateforme, le logiciel sera différent, mais il contiendra <strong>toujours</strong> les mêmes briques.</p>
<table>
<thead>
<tr>
<th>Plateforme</th>
<th>Logiciel</th>
</tr>
</thead>
<tbody>
<tr>
<td>Windows</td>
<td><a href="https://www.wampserver.com/en/" target="_blank" rel="noopener noreferrer">Wamp<ExternalLinkIcon/></a>, <a href="https://www.apachefriends.org/fr/index.html" target="_blank" rel="noopener noreferrer">Xampp<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Linux</td>
<td><a href="https://doc.ubuntu-fr.org/lamp" target="_blank" rel="noopener noreferrer">Lamp<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Mac</td>
<td><a href="https://www.mamp.info/en/mac/" target="_blank" rel="noopener noreferrer">Mamp<ExternalLinkIcon/></a>, <a href="https://myedukit.com/GetMnpp/" target="_blank" rel="noopener noreferrer">Mnpp<ExternalLinkIcon/></a></td>
</tr>
</tbody>
</table>
<p>Les différents logiciels sont juste des raccourcis pour vous simplifier la création « d'un serveur PHP » en local. Ils incluent donc l'ensemble de la configuration nécessaire au bon fonctionnement de PHP.</p>
<details class="custom-container details"><summary>À l'aise avec la ligne de commande ?</summary>
<p>Si oui, il existe depuis PHP 7 une autre façon de tester rapidement un script PHP. Elle passe par la ligne commande et ne nécéssite que l'installation de PHP</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php -S localhost:9000
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette commande lance un serveur PHP dans le dossier courrant. Pratique !</p>
</details>
<div class="custom-container tip"><p class="custom-container-title">Et sur un serveur « de prod » ?</p>
<p>Et bien, sur un serveur de Prod**(uction)** c'est la même chose sauf qu’habituellement c'est du Linux. Mais les briques de bases restent les mêmes.</p>
</div>
<h2 id="votre-premiere-page" tabindex="-1"><a class="header-anchor" href="#votre-premiere-page" aria-hidden="true">#</a> Votre première page</h2>
<p>Maintenant que vous avez votre architecture pour travailler, je vous propose de créer votre première page PHP. Avant d'aller plus loin, il faut voir les bases d'un script PHP.</p>
<p><RouterLink to="/tp/php/tp1.html">=&gt; La suite dans le TP 1</RouterLink></p>
<h2 id="les-bases-de-php" tabindex="-1"><a class="header-anchor" href="#les-bases-de-php" aria-hidden="true">#</a> Les bases de PHP</h2>
<p>Dans le premier TP nous avons vu la base de la création d'un fichier PHP. Nous avons vu :</p>
<ul>
<li>Que le PHP et le HTML fonctionnaient ensemble.</li>
<li>Que seules les parties entourées de <code>&lt;?php ?&gt;</code> étaient exécuté par notre serveur.</li>
<li>La syntaxe est importante (ne jamais oublier le <code>;</code>).</li>
</ul>
<p>Nous allons aller plus loin. Si le PHP était limité à simplement la fonction <code>echo</code>ça serait bien triste !</p>
<div class="custom-container tip"><p class="custom-container-title">Algorithmes ?</p>
<p>Ce que nous allons voir maintenant est générique. C'est ce que nous appelons des algorithmes. Ils sont une suite d'instruction compréhensible par un moteur. Dans notre cas c'est de la syntaxe PHP. Mais nous retrouverons <strong>exactement les mêmes notions, quel que soit le langage utilisé</strong>. La syntaxe sera différente, mais le fonctionnement restera identique !</p>
</div>
<h2 id="les-variables-simples" tabindex="-1"><a class="header-anchor" href="#les-variables-simples" aria-hidden="true">#</a> Les variables simples</h2>
<p>Une variable va nous permettre de stocker temporairement un résultat. Le résultat en question peut-être variable c'est-à-dire qu'il va pouvoir être « écrasé » / « remplacé » pendant la vie de votre programme.</p>
<div class="custom-container danger"><p class="custom-container-title">Attention !</p>
<p>Les variables sont <strong>des stockages temporaires</strong> ils seront effacés à chaque rechargement de votre page.</p>
</div>
<p>La logique d'une variable est la suivante : C'est une étiquette (un nom) dans lequel vous <em>assignez</em> une valeur.</p>
<p>En PHP les variables sont <strong>toujours</strong> préfixées par le caractère <code>$</code>.</p>
<p>Ce qui nous donnera par exemple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$nom</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"valentin"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Nous venons de faire une <em>assignation</em> de variable. La variable <code>$nom</code> contient maintenant la valeur <code>&quot;valentin&quot;</code>. Cette variable est maintenant utilisable ou vous le souhaitez dans votre code.</p>
<p>Nous pouvons maintenant utiliser cette variable ou bon nous semble :</p>
<ul>
<li>Pour l'affichage</li>
<li>Pour des conditions</li>
<li>…</li>
</ul>
<p>Si nous souhaitons l'utiliser dans un texte :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">echo</span> <span class="token string double-quoted-string">"Bonjour je suis <span class="token interpolation"><span class="token variable">$nom</span></span>"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Pour l'afficher, il suffit de faire :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">echo</span> <span class="token variable">$nom</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="les-types-de-variables" tabindex="-1"><a class="header-anchor" href="#les-types-de-variables" aria-hidden="true">#</a> Les types de variables</h3>
<p>En PHP (mais également dans les autres langages), les variables possèdent un type. En fonction du type, les opérations possibles sur une variable seront différentes. (calcul, concaténation, opération binaire, etc.)</p>
<table>
<thead>
<tr>
<th>Type</th>
<th>Contenu</th>
<th>Type d'opération</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>string</code></td>
<td>&quot;Une chaine de caractère&quot;</td>
<td>Gestion du texte, concaténation</td>
<td>Permets de stocker du texte (saisie utilisateur par exemple). La valeur doit être entourée de « <code>&quot;</code> » ou de « <code>'</code> »</td>
</tr>
<tr>
<td><code>int</code></td>
<td>42</td>
<td>Opération mathématique</td>
<td>Comme en mathématique</td>
</tr>
<tr>
<td><code>boolean</code></td>
<td><code>True</code> ou <code>False</code></td>
<td>Opération logique</td>
<td>Permets de faire des actions logiques. C'est un type très important en informatique</td>
</tr>
<tr>
<td><code>float</code></td>
<td>10.3</td>
<td>Opération mathématique</td>
<td>Comme en mathématique. Attention la notation du chiffre à virgule est avec un <code>.</code>.</td>
</tr>
<tr>
<td><code>array</code></td>
<td>[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</td>
<td></td>
<td>Contiens des listes de « quelques choses »</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">Le formalisme c'est important</p>
<p>Nous écrirons le code au maximum en Anglais ! Ça veut dire que vos noms de variables doivent rester simples. Donc pas d'accent, de caractères « étranges ». Limité vous à la liste suivante :
<code>abcdefghijklmnopqrstuvwxyz1234567890_-</code></p>
</div>
<h3 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire</h3>
<p>En reprenant le TP 1. Ajouter la déclaration d'une variable ainsi que l'utilisation de celle-ci.</p>
<h2 id="les-operations" tabindex="-1"><a class="header-anchor" href="#les-operations" aria-hidden="true">#</a> Les opérations</h2>
<h3 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> String</h3>
<p>Nous avons la possibilité de concaténer les chaines de caractères avec le symbole <code>.</code>.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$prenom</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"valentin"</span><span class="token punctuation">;</span>
<span class="token variable">$nom</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"brosseau"</span><span class="token punctuation">;</span>

<span class="token keyword">echo</span> <span class="token variable">$nom</span> <span class="token operator">.</span> <span class="token string double-quoted-string">" "</span> <span class="token operator">.</span> <span class="token variable">$prenom</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Affichera : <code>valentin brosseau</code>.</p>
<h3 id="int-ou-float" tabindex="-1"><a class="header-anchor" href="#int-ou-float" aria-hidden="true">#</a> Int Ou Float</h3>
<p>Comme en mathématique nous avons la possibilité de faire des opérations mathématiques comme un calculatrice, <code>+</code>, <code>-</code>, <code>/</code>, <code>*</code>, <code>%</code>…</p>
<h3 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean" aria-hidden="true">#</a> Boolean</h3>
<p>Sur les variables de types <code>Boolean</code> nous pourrons faire uniquement des opérations logique. (Base de l'informatique)</p>
<p><img src="@source/tp/php/res/et.png" alt="AND">
<img src="@source/tp/php/res/ou.png" alt="OR"></p>
<h2 id="les-super-globales" tabindex="-1"><a class="header-anchor" href="#les-super-globales" aria-hidden="true">#</a> Les Super Globales</h2>
<p>Vos variables vous appartiennent. Mais en PHP nous avons également quelques variables « automatiquement remplies », et ça dès le début de votre script.</p>
<p>Ces variables sont appelées des <code>superglobales</code> elles contiennent des informations relatives aux contextes de votre utilisateur. Je vous invite vivement à <a href="https://www.php.net/manual/en/language.variables.superglobals.php" target="_blank" rel="noopener noreferrer">consulter la documentation<ExternalLinkIcon/></a></p>
<p>Les variables en question ont toutes un usage particulier, pour l'instant je vais me concentrer sur :</p>
<table>
<thead>
<tr>
<th>Variables</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>$_SERVER</code></td>
<td>Contiens les informations « technique » de la connexion. Adresse IP du client, etc.</td>
</tr>
<tr>
<td><code>$_GET</code></td>
<td>Contiens les paramètres envoyés dans l'URL.</td>
</tr>
<tr>
<td></td>
<td><code>index.php?prenom=valentin</code>, <code>prenom</code> est donc un paramètre et <code>valentin</code> la valeur.</td>
</tr>
<tr>
<td></td>
<td>Vous pouvez avoir plusieurs paramètres avec le caractère <code>&amp;</code>. <br> Ex. <code>index.php?nom=brosseau&amp;prenom=valentin</code></td>
</tr>
<tr>
<td><code>$_POST</code></td>
<td>Contiens les paramètres envoyés dans le corps de la requête (on y reviendra)</td>
</tr>
<tr>
<td><code>$_FILES</code></td>
<td>Contiens les fichiers envoyés à votre serveur (nous y reviendrons)</td>
</tr>
<tr>
<td><code>$_SESSION</code></td>
<td>Permet de sauvegarder des valeurs pour quelques minutes des valeurs le temps de la navigation (nous y reviendrons)</td>
</tr>
<tr>
<td><code>$_COOKIES</code></td>
<td>Permet de sauvegarder des valeurs pour un temps plus long (mais pas illimité, nous y reviendrons)</td>
</tr>
</tbody>
</table>
<p>Ces variables en question sont toutes des « tableaux ».</p>
<div class="custom-container tip"><p class="custom-container-title">Je vous laisse tester</p>
<p>En PHP il est possible de voir le contenu d'un tableau avec le code suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">echo</span> <span class="token string double-quoted-string">"&lt;pre>"</span><span class="token operator">.</span><span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$_SERVER</span><span class="token punctuation">,</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token operator">.</span><span class="token string double-quoted-string">"&lt;/pre>"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Je vous laisse créer une page pour tester. Vous devriez avoir un résultat similaire à :</p>
<p><img src="@source/tp/php/res/print_r.png" alt="Résultat $_SERVER"></p>
</div>
<h3 id="le-get" tabindex="-1"><a class="header-anchor" href="#le-get" aria-hidden="true">#</a> Le GET</h3>
<p>En GET vous pouvez passer les paramètres comme bon vous semble. Nous allons nous servir de cette mécanique pour personnaliser la page. Plus tard nous verrons ensemble les formulaires, mais pour l'instant je vous laisse tenter une petite expérience :</p>
<p>Ajouter dans votre fichier PHP la ligne de code suivante :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">echo</span> <span class="token string double-quoted-string">"Bonjour "</span> <span class="token operator">.</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nom'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Appeler la page en question en ajoutant dans le lien : <code>?nom=Valentin</code></p>
<div class="custom-container danger"><p class="custom-container-title">ATTENTION</p>
<p>Petit aparté sur la sécurité informatique. Nous verrons plus tard les failles de sécurités, ce que vous venez de faire <strong>en est une</strong> (c'est une XSS).</p>
</div>
<h2 id="les-tableaux" tabindex="-1"><a class="header-anchor" href="#les-tableaux" aria-hidden="true">#</a> Les tableaux</h2>
<p>Les tableaux sont une notion importante. Ils vont nous servir pour stocker des « listes de valeurs ». Ces listes sont diverses, nous allons pouvoir stocker par exemple :</p>
<ul>
<li>Des listes de <code>string</code> (Exemple une liste d'utilisateurs)</li>
<li>Des listes de <code>int</code> (Exemple une liste d'âge)</li>
<li>…</li>
</ul>
<p>Ce qu'il faut retenir d'un tableau c'est que c'est un <code>conteneur</code>, il nous servira à stocker d'autres éléments. Ces conteneurs sont appelés <code>Array</code> ils peuvent-être de deux types :</p>
<h3 id="numerotes" tabindex="-1"><a class="header-anchor" href="#numerotes" aria-hidden="true">#</a> Numérotés</h3>
<p>Les tableaux numérotés sont les plus simples. Ils permettent de stocker des valeurs derrière un identifiant numérique, l'identifiant est automatique et <strong>il commence à zéro</strong> :</p>
<table>
<thead>
<tr>
<th style="text-align:right">Indice (clé)</th>
<th>valeurs</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right">0</td>
<td>Élément 1</td>
</tr>
<tr>
<td style="text-align:right">1</td>
<td>Élément 1</td>
</tr>
<tr>
<td style="text-align:right">2</td>
<td>Élément 2</td>
</tr>
<tr>
<td style="text-align:right">3</td>
<td>Élément 3</td>
</tr>
<tr>
<td style="text-align:right">4</td>
<td>Élément 4</td>
</tr>
<tr>
<td style="text-align:right">5</td>
<td>Élément 5</td>
</tr>
</tbody>
</table>
<p>Les tableaux numérotés sont très simples à créer :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$valeurs</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'élément 1'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'élément 2'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'élément 3'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ou via un ajout automatique à la fin du tableau</span>

<span class="token variable">$valeur</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'élément 1'</span><span class="token punctuation">;</span>
<span class="token variable">$valeur</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'élément 2'</span><span class="token punctuation">;</span>
<span class="token variable">$valeur</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'élément 3'</span><span class="token punctuation">;</span>

<span class="token comment">// ou via un ajout à une position donnée</span>

<span class="token variable">$valeurs</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'élément 1'</span><span class="token punctuation">;</span>
<span class="token variable">$valeurs</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'élément 2'</span><span class="token punctuation">;</span>
<span class="token variable">$valeurs</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'élément 3'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Un peu de formalisme</p>
<p>Pour éviter toute confusion. Nommées vos tableaux avec un nom qui ce termine par un <code>s</code> comme ça aucun doute sur son type à la lecture de votre code.</p>
</div>
<h3 id="associatifs" tabindex="-1"><a class="header-anchor" href="#associatifs" aria-hidden="true">#</a> Associatifs</h3>
<p>Les tableaux associatifs fonctionnent comme un tableau numéroté. La seule différence c'est que la clé ne sera pas un « chiffre », mais un « string » (chaine de caractère).</p>
<p>Le but d'un tel tableau est de gagner en clarté dans l'organisation des données, en effet avec des clés numérotées compliqué de retrouver à quoi correspond l'information.</p>
<p>Avec un exemple concret, ça donne :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$student</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token string double-quoted-string">"nom"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Brosseau"</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"prenom"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Valentin"</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"ordinateur"</span> <span class="token operator">=></span> <span class="token constant boolean">true</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"age"</span> <span class="token operator">=></span> <span class="token number">33</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Beaucoup plus lisible non ? Vous noterez au passage que le tableau associatif est également un conteneur. Nous avons donc dedans plusieurs types de données.</p>
<div class="custom-container tip"><p class="custom-container-title">Astuce de pro</p>
<p>Nous avons vu la base des tableaux, avec des exemples concrets irons évidement bien plus loin. Mais à noter qu'il est évidemment possible de mélanger les deux types de tableaux. Par exemple si vous souhaitez créer une <code>liste d'étudiants</code> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$students</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span>
        <span class="token string double-quoted-string">"nom"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Brosseau"</span><span class="token punctuation">,</span>
        <span class="token string double-quoted-string">"prenom"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Valentin"</span><span class="token punctuation">,</span>
        <span class="token string double-quoted-string">"ordinateur"</span> <span class="token operator">=></span> <span class="token constant boolean">true</span><span class="token punctuation">,</span>
        <span class="token string double-quoted-string">"age"</span> <span class="token operator">=></span> <span class="token number">33</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span>
        <span class="token string double-quoted-string">"nom"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Doe"</span><span class="token punctuation">,</span>
        <span class="token string double-quoted-string">"prenom"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"John"</span><span class="token punctuation">,</span>
        <span class="token string double-quoted-string">"ordinateur"</span> <span class="token operator">=></span> <span class="token constant boolean">false</span><span class="token punctuation">,</span>
        <span class="token string double-quoted-string">"age"</span> <span class="token operator">=></span> <span class="token number">87</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>Nous rencontrerons plus tard ce genre de « format » lors de nos requêtes à la base de données.</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">Astuce de Pro 2</p>
<p>L'avantage de PHP ? Les fonctions fournies de bases. Pour manipuler les tableaux, nous avons énormément de possibilités. Il y a certainement la réponse à tous vos problèmes dans la documentation.</p>
<p><a href="https://www.php.net/manual/en/ref.array.php" target="_blank" rel="noopener noreferrer">À consulter ici<ExternalLinkIcon/></a></p>
</div>
<h3 id="a-faire-1" tabindex="-1"><a class="header-anchor" href="#a-faire-1" aria-hidden="true">#</a> À faire</h3>
<p>Je vous laisse créer un tableau dans votre code d'exemple. ✋ Une fois créé tenter de l'afficher un peu comme ce que nous avons pu faire avec notre variable <code>$_SERVER</code>.</p>
<h2 id="les-conditions" tabindex="-1"><a class="header-anchor" href="#les-conditions" aria-hidden="true">#</a> Les conditions</h2>
<p>En informatiques les conditions sont le coeur d'un programme informatique. Une condition va nous permettre d'exécuter certaines parties du code en fonction de la valeur des variables (vous savez celle du début).</p>
<p>La structure d'une condition est toujours la même :</p>
<ul>
<li>IF (en français SI)</li>
<li>IF / ELSE (en Français SI / SINON)</li>
<li>IF / ELSE-IF / ELSE (en Français SI / ALORS-SI / SINON)</li>
</ul>
<p>Ce qu'il faut retenir de ceci, c'est que nous posons une condition (question) à l'ordinateur, cette question l'ordinateur va y répondre en fonction des valeurs de vos variables.</p>
<p>Les questions que nous allons poser ne vont pas dépendre directement du type de la variable, cependant nous allons voir que le <code>boolean</code> est un cas particulier.</p>
<h3 id="bon-et-on-pose-la-question-comment" tabindex="-1"><a class="header-anchor" href="#bon-et-on-pose-la-question-comment" aria-hidden="true">#</a> Bon et on pose la question comment ?</h3>
<p>La question va être « mathématique », elle va utiliser les éléments suivants :</p>
<table>
<thead>
<tr>
<th style="text-align:center">Symbole</th>
<th>Signification</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">==</td>
<td>Est égale à</td>
</tr>
<tr>
<td style="text-align:center">!=</td>
<td>Est différent de</td>
</tr>
<tr>
<td style="text-align:center">&gt;</td>
<td>Est strictement supérieure à</td>
</tr>
<tr>
<td style="text-align:center">&lt;</td>
<td>Est strictement inférieure à</td>
</tr>
<tr>
<td style="text-align:center">&gt;=</td>
<td>Est supérieure ou égale à</td>
</tr>
<tr>
<td style="text-align:center">&lt;=</td>
<td>Est inférieure ou égale à</td>
</tr>
</tbody>
</table>
<p>Nous allons nous en servir un peu partout dans notre code. C'est un élément primordial de la programmation.</p>
<h3 id="concretement-ca-donne-quoi" tabindex="-1"><a class="header-anchor" href="#concretement-ca-donne-quoi" aria-hidden="true">#</a> Concrètement ça donne quoi ?</h3>
<p>La théorie, c'est bien… La pratique c'est mieux ! Voilà quelques exemples de conditions.</p>
<h3 id="une-condition-if" tabindex="-1"><a class="header-anchor" href="#une-condition-if" aria-hidden="true">#</a> Une condition IF</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$age</span> <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$age</span> <span class="token operator">>=</span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Vous pouvez passer le permis"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="une-condition-if-else" tabindex="-1"><a class="header-anchor" href="#une-condition-if-else" aria-hidden="true">#</a> Une condition IF/ELSE</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$age</span> <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$age</span> <span class="token operator">>=</span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Vous pouvez passer le permis"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Encore un peu de patience… Pour le permis c'est à 18ans"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="une-condition-if-else-if-else" tabindex="-1"><a class="header-anchor" href="#une-condition-if-else-if-else" aria-hidden="true">#</a> Une condition IF/ELSE IF/ELSE</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$age</span> <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$age</span> <span class="token operator">>=</span> <span class="token number">14</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Vous pouvez passer le permis 2 roues."</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$age</span> <span class="token operator">>=</span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Vous pouvez passer le permis voiture"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Encore un peu de patience… Pour le permis 2 roues c'est à 14ans"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="les-conditions-«-boolean-»" tabindex="-1"><a class="header-anchor" href="#les-conditions-«-boolean-»" aria-hidden="true">#</a> Les conditions « Boolean »</h3>
<p>Les variables de type <code>boolean</code> sont un peu particulières, il n'y a que deux cas possibles <code>true</code> ou <code>false</code> (vrai ou faux), nous allons à notre possibilité que deux conditions <code>==</code> ou <code>!=</code>.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$estMajeur</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$estMajeur</span> <span class="token operator">==</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Vous pouvez passer le permis"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Cette condition est cependant simplifiable :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$estMajeur</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$estMajeur</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Vous pouvez passer le permis"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>✋ Le reste est inchangé. (<code>if</code>, <code>if/else</code>, <code>if/else if/else</code>).</p>
<h3 id="une-autre-facon-de-conditionner" tabindex="-1"><a class="header-anchor" href="#une-autre-facon-de-conditionner" aria-hidden="true">#</a> Une autre façon de conditionner</h3>
<p>La base de la condition c'est <code>if / else</code>, mais en cas de choix encore plus important, il possible d'écrire la condition autrement. Le but est d'améliorer la lisibilité. Exemple si nous avons :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$temp</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$temp</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Très froid'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$temp</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Très froid, mais moins'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$temp</span> <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Froid mais ça va'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$temp</span> <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Froid mais ça passe'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$temp</span> <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Froid'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Chaud'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$temp</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token variable">$temp</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Très froid'</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Très froid, mais moins'</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Froid mais ça va'</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">3</span><span class="token punctuation">:</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Froid mais ça passe'</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Froid'</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
        <span class="token keyword">echo</span> <span class="token string single-quoted-string">'Chaud'</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Attention</p>
<p>Vous avez vu le mot <strong>break</strong> ? Celui-ci est hyper important. Si vous ne l'indiquez pas ? Le PHP exécutera les deux instructions à la suite sans s'arrêter.</p>
</div>
<h3 id="allons-plus-loin" tabindex="-1"><a class="header-anchor" href="#allons-plus-loin" aria-hidden="true">#</a> Allons plus loin</h3>
<div class="custom-container tip"><p class="custom-container-title">Astuce de pro</p>
<p>Il est possible en PHP d'écrire une condition dite « Ternaire », c'est une condition sur une seule ligne. Pratique, car elle prend moins de place.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$age</span> <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>
<span class="token keyword">echo</span> <span class="token punctuation">(</span><span class="token variable">$age</span> <span class="token operator">>=</span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string single-quoted-string">'Vous pouvez passer le permis'</span> <span class="token punctuation">:</span> <span class="token string single-quoted-string">'Encore un peu de patience !'</span><span class="token punctuation">;</span>

<span class="token comment">// ou</span>
<span class="token variable">$estMajeur</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">echo</span> <span class="token variable">$estMajeur</span> <span class="token operator">?</span> <span class="token string single-quoted-string">'Vous pouvez passer le permis'</span> <span class="token punctuation">:</span> <span class="token string single-quoted-string">'Encore un peu de patience !'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>✋ Attention à ne pas en abuser, ça peut rapidement être illisible.</p>
</div>
<h3 id="a-faire-2" tabindex="-1"><a class="header-anchor" href="#a-faire-2" aria-hidden="true">#</a> À faire</h3>
<p>Le plus simple pour comprendre le fonctionnement. C'est de pratiquer. Je vous laisse écrire des conditions dans votre fichier PHP de test.</p>
<ul>
<li>Une condition simple.</li>
<li>Une condition avec plusieurs if / else-if / else.</li>
<li>Une ternaire.</li>
<li>Un Switch.</li>
</ul>
<h2 id="les-boucles" tabindex="-1"><a class="header-anchor" href="#les-boucles" aria-hidden="true">#</a> Les boucles</h2>
<p>Dans le même esprit que les conditions, les boucles ! C'est la base de l'informatique, la répétition votre ordinateur est capable de faire un nombre très important d'opérations à la seconde… Alors les boucles clairement il est fait pour ça !</p>
<p>Vous vous souvenez très clairement de Bart devant son tableau ? Celui-ou il doit recopier 100× une phrase…</p>
<p><img src="@source/tp/php/res/bart.jpg" alt="Bart"></p>
<p>Et bien en PHP… Ce n’est vraiment pas un problème ! Nous avons deux types de boucles le <code>while</code> et le <code>for</code>.</p>
<h3 id="le-while" tabindex="-1"><a class="header-anchor" href="#le-while" aria-hidden="true">#</a> Le While</h3>
<p>La boucle <code>while</code> est la plus simple de tout, elle ne s'arrête que quand la condition de sortie est <code>false</code>. Oui oui, comme le <code>if</code> vu précédemment.</p>
<p><img src="@source/tp/php/res/while-loop-diagram.svg" alt="while"></p>
<p>Tant que la condition est vraie, la boucle est exécutée.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$var</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token variable">$var</span> <span class="token operator">==</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Bravo, ceci est votre première boucle infinie 🎉</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Si on reprend l'exemple d'avant (celui de Bart). Si Bart à une punition, écrire 1000× « Je n'utiliserai plus un algorithme pour faire mes punitions »</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$ligne_a_ecrire</span> <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
<span class="token variable">$ecrite</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token variable">$ecrite</span> <span class="token operator">&lt;</span> <span class="token variable">$ligne_a_ecrire</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Je n'utiliserai plus un algorithme pour faire mes punitions"</span><span class="token punctuation">;</span>
    <span class="token variable">$ecrite</span> <span class="token operator">=</span> <span class="token variable">$ecrite</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// ou $ecrite++;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="le-for" tabindex="-1"><a class="header-anchor" href="#le-for" aria-hidden="true">#</a> Le For</h3>
<p>La boucle <code>for</code> fonctionne <em>comme</em> le while sauf qu'elle repose sur des données que l'on spécifie en entrée :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$ligne_a_ecrire</span> <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token variable">$ecrite</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token variable">$ecrite</span> <span class="token operator">&lt;=</span> <span class="token variable">$ligne_a_ecrire</span><span class="token punctuation">;</span> <span class="token variable">$ecrite</span><span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Je n'utiliserai plus un algorithme pour faire mes punitions"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Et voilà c'est tout… En réalité la boucle for est plus adaptés pour naviguer dans les tableaux :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$etudiants</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'nom'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Brosseau'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'nom'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Doe'</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token variable">$i</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token variable">$i</span> <span class="token operator">&lt;</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token variable">$etudiants</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">++</span><span class="token variable">$i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token variable">$people</span><span class="token punctuation">[</span><span class="token variable">$i</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nom'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="le-foreach" tabindex="-1"><a class="header-anchor" href="#le-foreach" aria-hidden="true">#</a> Le ForEach</h3>
<p>Les temps évoluent, les pratiques aussi ! Maintenant pour manipuler les tableaux de données, nous avons un autre type de boucle le <code>forEach</code>. Celle-ci va simplifier notre code (un peu comme le <code>switch</code> avec le <code>if</code>).</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$etudiants</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'nom'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Brosseau'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'nom'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Doe'</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$etudiants</span> <span class="token keyword">as</span> <span class="token variable">$etudiant</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token variable">$etudiant</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nom'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>👁️ Beaucoup plus lisible non ?</p>
<h3 id="un-peu-de-pratique" tabindex="-1"><a class="header-anchor" href="#un-peu-de-pratique" aria-hidden="true">#</a> Un peu de pratique</h3>
<p>Les boucles sont un gros morceau, je pense qu'il est venu le temps de pratiquer un peu.</p>
<p><RouterLink to="/tp/php/tp1.1.html">La suite dans le TP 1.1</RouterLink></p>
<h2 id="les-fonctions" tabindex="-1"><a class="header-anchor" href="#les-fonctions" aria-hidden="true">#</a> Les fonctions</h2>
<p>Un autre élément important dans le développement c'est l'usage de fonction, une fonction est une manière de rendre du code « reproductible ». C'est-à-dire éviter le copier-coller.</p>
<p>Je vais prendre un exemple. Imaginons que vous ayez envie de faire un gâteau. Vous avez une super recette, celle du gâteau au chocolat de mamie Hughette la recette est la suivante :</p>
<blockquote>
<ul>
<li>3 Oeufs.</li>
<li>100g de sucre.</li>
<li>50g de farines.</li>
<li>100g de beurre.</li>
<li>200g de chocolat.
On mélange et on enfourne 20 minutes.</li>
</ul>
</blockquote>
<p>Si on transforme la recette en algorithme, nous aurions :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$oeuf</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token variable">$sucre</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token variable">$farine</span> <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
<span class="token variable">$beurre</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token variable">$chocolat</span> <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>

<span class="token variable">$melange</span> <span class="token operator">=</span> <span class="token variable">$oeuf</span> <span class="token operator">+</span> <span class="token variable">$sucre</span> <span class="token operator">+</span> <span class="token variable">$farine</span> <span class="token operator">+</span> <span class="token variable">$beurre</span><span class="token operator">+</span> <span class="token variable">$chocolat</span><span class="token punctuation">;</span>
<span class="token keyword">echo</span> <span class="token string double-quoted-string">"Cuire 20minutes le mélange de <span class="token interpolation"><span class="token variable">$melange</span></span> gramme."</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Ce code est bien pratique, vous voudriez l'utiliser tout le temps ! Mais ça fait quand même pas mal de ligne. Et le copier / coller tout le temps ce n’est pas vraiment une bonne idée (erreur de recopie, place utilisée, etc.). En code nous avons un moyen de gérer ça ! Ce moyen s'appelle une fonction.</p>
<p>Une fonction c'est une boite noire (un peu comme mamie Huguette), quand vous étiez petit, vous demandiez juste « Hey, Mamie, tu me fais le gâteau ? » et quelques minutes plus tard c'était bon… Et bien la fonction c'est pareil ! Vous l'appeler et elle vous donne le résultat et ça sans forcément que vous sachiez comment elle fonctionne à l'intérieur, celle-ci peut contenir une ou plusieurs instructions aucune différence pour vous.</p>
<h3 id="le-fonctionnement-1" tabindex="-1"><a class="header-anchor" href="#le-fonctionnement-1" aria-hidden="true">#</a> Le fonctionnement</h3>
<p>Une fonction c'est donc une boite noire. Votre fonction va prendre un <code>nom</code> et peut-être un ou des <code>paramètre(s)</code>. Dans notre exemple la fonction s'appelle :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">echo</span> <span class="token function">gateauHugette</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Si on appel la fonction <code>gateauHugette()</code> celle-ci va vous répondre :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Cuire 20minutes le mélange => 453 grammes.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette fonction est donc votre mamie Huguette, mais en version informatique. Partout dans votre code vous allez pouvoir l'appeler, et dans tous les cas vous aurez votre gâteau au chocolat.</p>
<h3 id="les-parametres" tabindex="-1"><a class="header-anchor" href="#les-parametres" aria-hidden="true">#</a> Les paramètres</h3>
<p>Notre fonction était toute simple. Et si nous ajoutions un paramètre, par exemple le temps de cuisson. Les paramètres sont des valeurs à mettre entre les parenthèses :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Moelleux</span>
<span class="token keyword">echo</span> <span class="token function">gateauHugette</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ou trop cuit</span>
<span class="token keyword">echo</span> <span class="token function">gateauHugette</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>La valeur de la cuisson est maintenant variable :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Cuire 15minutes le mélange => 453 grammes.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="ecrire-sa-propre-fonction" tabindex="-1"><a class="header-anchor" href="#ecrire-sa-propre-fonction" aria-hidden="true">#</a> Écrire sa propre fonction</h3>
<p>Nous avons vu comment utiliser une fonction, et si nous regardions <strong>comment écrire une fonction</strong> ! Vous allez voir c'est très simple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">gateauHugette</span><span class="token punctuation">(</span><span class="token variable">$duree</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$oeuf</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token variable">$sucre</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token variable">$farine</span> <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
    <span class="token variable">$beurre</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token variable">$chocolat</span> <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>

    <span class="token variable">$melange</span> <span class="token operator">=</span> <span class="token variable">$oeuf</span> <span class="token operator">+</span> <span class="token variable">$sucre</span> <span class="token operator">+</span> <span class="token variable">$farine</span> <span class="token operator">+</span> <span class="token variable">$beurre</span><span class="token operator">+</span> <span class="token variable">$chocolat</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token string double-quoted-string">"Cuire <span class="token interpolation"><span class="token variable">$duree</span></span> minutes le mélange de <span class="token interpolation"><span class="token variable">$melange</span></span> gramme."</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Et c'est tout !</p>
<div class="custom-container tip"><p class="custom-container-title">Astuce de pro</p>
<p>Une fonction c'est une instruction comme une autre… Vous pouvez donc très bien écrire :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>
<span class="token comment">// La variable $mon_gateau contiendra le résultat de la fonction.</span>
<span class="token variable">$mon_gateau</span> <span class="token operator">=</span> <span class="token function">gateauHugette</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Des gateaux à l'infinie</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token function">gateauHugette</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></div>
<h3 id="les-fonctions-integrees" tabindex="-1"><a class="header-anchor" href="#les-fonctions-integrees" aria-hidden="true">#</a> Les fonctions intégrées</h3>
<p>La force d'un langage se mesure avec « les fonctions intégrées », en python on dit « Battery Included » ! Le PHP n'est pas en reste, il intègre une collection de fonctions de bases nous permettant de faire plein d'opérations sans avoir à les écrire.</p>
<p>L'ensemble de ces fonctions sont écrites dans la documentation officielle. <a href="http://fr.php.net/manual/fr/funcref.php" target="_blank" rel="noopener noreferrer">À voir ici<ExternalLinkIcon/></a></p>
<p>La liste est très longue, mais ça passe de :</p>
<ul>
<li>L'envoi d'email.</li>
<li>Afficher la date (comme au début vous vous rappelez ?).</li>
<li>La manipulation des tableaux.</li>
<li>La transformation d'images…</li>
</ul>
<h3 id="a-faire-3" tabindex="-1"><a class="header-anchor" href="#a-faire-3" aria-hidden="true">#</a> À faire</h3>
<p>Maintenant que nous savons faire une fonction… Je vous propose de transformer <RouterLink to="/tp/php/tp1.1.html">le code de « Bart » (TP 1.1)</RouterLink> pour mettre la partie <code>while</code> (ou <code>for</code>) dans une fonction afin de l'utiliser là où vous souhaitez afficher vos phrases.</p>
<h2 id="les-includes" tabindex="-1"><a class="header-anchor" href="#les-includes" aria-hidden="true">#</a> Les includes</h2>
<p>Depuis le début nous ajoutons du code dans la « même page » sans vraiment mettre d'organisation. Pour l'instant ça ne pose pas vraiment de problème, car notre code est « temporaire » il ne servira que pour « le test ». Mais rapidement nous allons mettre en place de vrai petit projet, ou l'organisation sera importante afin que vous ne vous vous perdiez pas dans votre propre code. Les includes (inclusion de code) vont nous servir dans deux cas :</p>
<ul>
<li>L'organisation de la page.</li>
<li>Le découpage du code, afin par exemple de sortir les fonctions.</li>
</ul>
<h3 id="organisation-de-la-page" tabindex="-1"><a class="header-anchor" href="#organisation-de-la-page" aria-hidden="true">#</a> Organisation de la page</h3>
<p>Quand nous avons débuté le HTML, nous avons vu que la sémantique était importante, nous avions un <code>header</code>, un <code>footer</code>, un <code>nav</code> etc… Cependant, quand vous avez créé un petit site avec plusieurs pages, je vous ai demandé de dupliquer ces éléments dans différentes pages. D'un point de vue organisation, c'est clairement un problème pour plusieurs raisons :</p>
<ul>
<li>Duplication de code.</li>
<li>Modifications compliquées.</li>
<li>Correction plus longue, car à faire dans plusieurs pages.</li>
</ul>
<p>Donc pas vraiment idéal. Les sites Internet ont toujours des zones « identiques » partagées entre les pages :</p>
<p><img src="@source/tp/php/res/organisation.png" alt="Organisation d'une page"></p>
<p>Comme vous pouvez le voir, la structure de site a clairement des éléments qui peuvent être partagés entre différentes pages. Dit autrement certaines parties de votre page peuvent être inclus :</p>
<ul>
<li>Le Header</li>
<li>Le Footer</li>
<li>Le Nav</li>
<li>Le « Contenu » est la partie courant de votre page, il ne sera pas inclus mais bien présent dans la page en question.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">À venir</p>
<p>Pour l'instant nous regardons comment éviter de copier / coller du contenu identique entre différentes pages. Plus tard nous parlerons également de « l'organisation du code », à ce moment-là qu'il sera possible également de rendre « dynamique cette partie » via un include.</p>
</div>
<p>Maintenant que nous avons visualisé les éléments réutilisables, il faut maintenant comprendre comment fonctionne l'instruction <code>include</code>.</p>
<p>L'instruction <code>include</code> est très simple, c'est une fonction qui prend en paramètres le nom d'un autre fichier PHP. Au moment de l'exécution de votre page, le PHP va prendre le contenu de chaque fichier PHP et mettra le contenu à l'endroit ou vous l'avez inclus. Un exemple ?</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string backtick-quoted-string">`monfichier.php`</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/php/res/organisation_include.png" alt="Organisation avec include"></p>
<h3 id="le-code" tabindex="-1"><a class="header-anchor" href="#le-code" aria-hidden="true">#</a> Le code</h3>
<p>Maintenant que nous avons vu la théorie, concrètement ça donne quoi ? Nous avons donc besoin de 4 fichiers :</p>
<ul>
<li><code>header.php</code> =&gt; L'entête de votre site.</li>
<li><code>footer.php</code> =&gt; Le pied de page de votre site.</li>
<li><code>nav.php</code> =&gt; Le menu de votre site.</li>
<li><code>index.php</code> =&gt; Votre page courante. (Celle qui va inclure les autres)</li>
</ul>
<p><em>Index.php</em> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Page avec des includes<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./public/main.css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'./common/header.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span>

    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'./common/nav.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Contenu réel de votre page<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://picsum.photos/800/300<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>

    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'./common/footer.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><em>common/header.php :</em></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>header</span><span class="token punctuation">></span></span>Votre Header<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">Hey !? Un instant !</p>
<ul>
<li>Vous: Mais il n'y a pas de PHP ici ?</li>
<li>Moi: Hé non, pas de PHP. Nous nous servons du système d'<code>include</code> de PHP pour organiser notre code rien de plus.</li>
<li>Vous: Ah ouais! 🤝</li>
</ul>
</div>
<p><em>common/nav.php :</em></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span><span class="token punctuation">></span></span>Lien 1 | Lien 2 | …<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><em>common/footer.php :</em></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>footer</span><span class="token punctuation">></span></span>
    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token function">date</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Y"</span><span class="token punctuation">)</span> <span class="token delimiter important">?></span></span> − Valentin Brosseau
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="le-resultat" tabindex="-1"><a class="header-anchor" href="#le-resultat" aria-hidden="true">#</a> Le résultat</h3>
<p>Je vous passe le fichier CSS, voilà le résultat final de ma page. 👇</p>
<p><img src="@source/tp/php/res/include_result.png" alt="Résultat des includes"></p>
<div class="custom-container danger"><p class="custom-container-title">Parlons de vos fichiers</p>
<p>Comme vous l'avez peut-être remarqué, je n’ai pas déposé les fichiers « à l'arrache » dans mon dossier. Même si c'est du code « de test » n'oubliez pas le rangement, c'est une vraie bonne habitude</p>
</div>
<h3 id="les-includes-pour-organiser-votre-code-php" tabindex="-1"><a class="header-anchor" href="#les-includes-pour-organiser-votre-code-php" aria-hidden="true">#</a> Les Includes pour organiser votre code PHP</h3>
<p>Bon le HTML c'est une partie du problème. Vous vous souvenez de la recette de Mamie Huguette ? Elle est bien dans votre fichier PHP principal, mais ça serait mieux de l'avoir partout non ?</p>
<p>Pour la rendre disponible partout, nous allons la mettre dans un fichier que nous allons inclure dans nos pages :</p>
<p><em>common/functions.php :</em></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">function</span> <span class="token function-definition function">gateauHugette</span><span class="token punctuation">(</span><span class="token variable">$duree</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$oeuf</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token variable">$sucre</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token variable">$farine</span> <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
    <span class="token variable">$beurre</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token variable">$chocolat</span> <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>

    <span class="token variable">$melange</span> <span class="token operator">=</span> <span class="token variable">$oeuf</span> <span class="token operator">+</span> <span class="token variable">$sucre</span> <span class="token operator">+</span> <span class="token variable">$farine</span> <span class="token operator">+</span> <span class="token variable">$beurre</span><span class="token operator">+</span> <span class="token variable">$chocolat</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token string double-quoted-string">"Cuire <span class="token interpolation"><span class="token variable">$duree</span></span> minutes le mélange de <span class="token interpolation"><span class="token variable">$melange</span></span> gramme."</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Vos autres fonctions …</span>
<span class="token comment">// …</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Vous avez déclaré le fichier qui fera de vous un <strong>super développeur</strong> ! Les développeurs qui réussissent sont ceux qui <em>sont organisés</em>.</p>
<p>Le fichier en question est ce que l'on appelle une librairie, cette page en elle-même ne fait rien. Elle ne fait qu'ajouter une fonction qui sera disponible par la suite dans votre code.</p>
</div>
<p><em>index.php :</em></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'common/functions.php'</span><span class="token punctuation">)</span> <span class="token delimiter important">?></span></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Page avec des includes<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./public/main.css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token function">gateauHugette</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span>
    # … Etc
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="a-faire-4" tabindex="-1"><a class="header-anchor" href="#a-faire-4" aria-hidden="true">#</a> À faire</h3>
<p>Mettre en pratique le découpage avec des <code>include</code> avec le <RouterLink to="/tp/php/tp1.2.html">TP suivant</RouterLink></p>
<h3 id="a-faire-bis" tabindex="-1"><a class="header-anchor" href="#a-faire-bis" aria-hidden="true">#</a> À faire bis</h3>
<p>Maintenant que nous savons découper notre code. Je vous laisse retourner dans <RouterLink to="/tp/php/tp1.1.html">le TP Bart</RouterLink> afin de :</p>
<ul>
<li>Sortir votre fonction dans un autre fichier.</li>
<li><code>include</code> le fichier.</li>
</ul>
<h2 id="les-formulaires" tabindex="-1"><a class="header-anchor" href="#les-formulaires" aria-hidden="true">#</a> Les formulaires</h2>
<p>Quand nous avons vu le HTML il y a un élément dont nous n’avons pas parlé… Les formulaires ! Pas besoin de détaillé, vous avez déjà croisé les formulaires sur Internet.</p>
<p><img src="@source/tp/php/res/contact.png" alt="Formulaire de contact"></p>
<p>Côté code un formulaire va être l'une des manières de faire communiquer votre <strong>client</strong> et votre <strong>serveur</strong>. Nous allons pouvoir échanger du texte, mais également des fichiers, le tout de <strong>deux manières différentes</strong> :</p>
<ul>
<li>GET (<code>$_GET</code> en PHP)</li>
<li>POST (<code>$_POST</code> en PHP)</li>
</ul>
<p>Ce qu'il faut retenir pour l'instant, c'est qu’en GET vos paramètres seront visibles (exemple: <strong>?nom=valentin</strong>). En POST, ils seront visibles aussi… Mais beaucoup moins facilement pour les modifier il faudra jouer avec l'inspecteur d'éléments (moins simple pour Mamie Huguette).</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Quand il s'agit d'un formulaire, je vous conseille vivement de <strong>toujours</strong> passer par un POST.</p>
</div>
<h3 id="ecrire-un-formulaire" tabindex="-1"><a class="header-anchor" href="#ecrire-un-formulaire" aria-hidden="true">#</a> Écrire un formulaire</h3>
<p>Un formulaire, c'est une balise <code>HTML</code> comme le <code>p</code> ou la <code>div</code>. Celui-ci fonctionne de la même manière à ceci près qu'il est « invisible » pour l'utilisateur. Votre navigateur ne l'affiche pas, il sait juste « qu'ici dans le code » les données saisies dans les <code>input</code> doivent être envoyées au serveur au moment du <code>submit</code> celle-ci sera soumise vers la page (php) défini dans l'attribut <code>action</code>.</p>
<p>L'opération va se dérouler en 3 temps :</p>
<p><img src="@source/tp/php/res/formulaire.png" alt="Formulaire"></p>
<h3 id="le-code-html" tabindex="-1"><a class="header-anchor" href="#le-code-html" aria-hidden="true">#</a> Le code HTML</h3>
<p>C'est simple vous allez voir. Le formulaire en HTML c'est une balise… <code>form</code> :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>destination.php<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nom<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Votre Nom<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>prenom<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Votre Prenom<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Envoyer<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><table>
<thead>
<tr>
<th>Attribut</th>
<th>Role</th>
</tr>
</thead>
<tbody>
<tr>
<td>method</td>
<td>Indique le type du formulaire (<code>get</code>, <code>post</code>)</td>
</tr>
<tr>
<td>action</td>
<td>Page de destination vers lequel l'utilisateur sera emmené au moment du <code>submit</code> form</td>
</tr>
</tbody>
</table>
<p>La saisie comme vous le savez ce fait via un champ input. Le champ input possède un attribut type, attention à bien le choisir (<code>text</code> pour du texte, <code>password</code> pour un mot de passe, etc).</p>
<p>L'ensemble de vos <code>input</code> (visible ou non) sera transmis à la page « destination.php». En fonction du type de votre requête, ils seront disponibles dans les variables :</p>
<ul>
<li><code>$_GET</code></li>
<li><code>$_POST</code></li>
</ul>
<p>Ces variables sont des <code>tableaux associatifs</code> ils fonctionnent donc en mode <code>clé</code> =&gt; <code>valeur</code>. La clé sera le nom de votre <code>input</code> (dans mon cas <code>nom</code> et <code>prénom</code>) la value sera celle saisie par l'utilisateur.</p>
<p>Notre page de <code>destination.php</code> réalise le traitement nécessaire avec les valeurs reçu, par exemple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Bonjour <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nom'</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.php<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Retour au formulaire<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Comme la première fois… Petit rappel sur la sécurité. Vous avez à nouveau une XSS dans votre code. Nous en parlerons plus tard plus en détail.</p>
<p><strong>Mais attention</strong>, si vous affichez la saisie d'un utilisateur directement, il lui sera possible de faire exécuter du code à distance.</p>
<p><img src="@source/tp/php/res/xss.png" alt="XSS ATTENTION A VOS FESSES"></p>
</div>
<h3 id="les-input-possibles" tabindex="-1"><a class="header-anchor" href="#les-input-possibles" aria-hidden="true">#</a> Les input possibles</h3>
<p>Notre formulaire est un élément « capsule », c'est-à-dire qu'il envoie les saisies utilisateur à votre serveur. En HTML, nous avons un certain nombre d'éléments permettant la saisie :</p>
<table>
<thead>
<tr>
<th>Éléments</th>
<th>Fonctions</th>
<th>Usages</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>input:text</code></td>
<td>Saisie monoligne</td>
<td>Saisie simple utilisateur</td>
</tr>
<tr>
<td><code>input:checkbox</code></td>
<td>Case à cocher (choix multiple)</td>
<td>Permets de faire un choix multiple</td>
</tr>
<tr>
<td><code>input:radio</code></td>
<td>Élément à cocher (un seul choix)</td>
<td>Permets de faire un choix non multiple</td>
</tr>
<tr>
<td><code>input:hidden</code></td>
<td>Champs cachés</td>
<td>Transport de données non visible par le client (exemple <code>token</code> antirejeux)</td>
</tr>
<tr>
<td><code>input:file</code></td>
<td>Envoi de fichier au serveur</td>
<td>Envoi de fichier au serveur</td>
</tr>
<tr>
<td><code>textarea</code></td>
<td>Saisie multilignes</td>
<td>Envoi de texte (exemple commentaire)</td>
</tr>
<tr>
<td><code>select</code></td>
<td>Sélection dans une liste déroulante définie</td>
<td>Sélection multiple ou non dans une liste de valeur</td>
</tr>
<tr>
<td><code>input:submit</code></td>
<td>Valider le formulaire</td>
<td>Envoie les données du formulaire au serveur</td>
</tr>
</tbody>
</table>
<p>Exemple :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>test.php<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hidden<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hidden<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>checkbox<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Case à cocher<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>radio<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>radio<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>radio<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Sélection radio<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>textarea</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>textarea<span class="token punctuation">"</span></span> <span class="token attr-name">cols</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>20<span class="token punctuation">"</span></span> <span class="token attr-name">rows</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>select<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>select1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Select 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>select2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Select 4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Envoyer<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Attention</p>
<p><code>input:hidden</code> ne veux pas dire que la valeur est cachée pour tous. Si vous inspectez le code HTML, vous allez voir que celui-ci est visible. Voire même éditable.</p>
<p><strong>Attention</strong>, c'est donc juste un confort d'usage pas une source de sécurité.</p>
</div>
<h2 id="un-peu-de-pratique-1" tabindex="-1"><a class="header-anchor" href="#un-peu-de-pratique-1" aria-hidden="true">#</a> Un peu de pratique</h2>
<p>Nous avons vu beaucoup de nouvelle choses. Nous allons les mettre en pratique avec le TP 2</p>
<p><RouterLink to="/tp/php/tp2.html">La suite ici</RouterLink></p>
<h2 id="la-persistance" tabindex="-1"><a class="header-anchor" href="#la-persistance" aria-hidden="true">#</a> La persistance</h2>
<p>Nous avons vu que les variables étaient temporaires, leurs états étant remis à zéro à chaque fois que votre page charge. Mais il est possible quand même de sauvegarder des « variables » pour un client donné. En PHP, nous avons deux types façons de persister des valeurs :</p>
<ul>
<li>La session, sont pour des valeurs persisté pour un temps limité, et le temps d'une session de navigation.</li>
<li>Les cookies, sont pour des valeurs persisté jusqu'a une date fixée par vous ou à l'effacement par le client. (<strong>Attention</strong>, sauvegardée sur le poste du client, donc « modifiables »)</li>
</ul>
<p>Nous, nous servirons de ces variables principalement pour gérer des problématiques d'authentification, ou de profil client / utilisateur.</p>
<h3 id="la-session" tabindex="-1"><a class="header-anchor" href="#la-session" aria-hidden="true">#</a> La session</h3>
<p>La session est une variable <code>super-globale</code> qui permet de stocker <strong>temporairement</strong> des valeurs. Ces valeurs n'expireront qu'à la fin de la SESSION utilisateur. La durée de cette session dépend de :</p>
<ul>
<li>La configuration du serveur.</li>
<li>L'activité de l'utilisateur.</li>
</ul>
<p>Pourquoi ? La durée de la session est remise à zéro à chaque fois que l'utilisateur charge une page. La session peut-être utilisée pour sauvegarder toutes les données que vous souhaitez, il n'y a pas vraiment de limite.</p>
<p><em>Point important :</em> La session est commune à l'ensemble des pages de votre site (en réalité à l'ensemble des pages de votre domaine).</p>
<p><em>Point important 2 :</em> Les données de la session sont propres à chaque utilisateur. Idéal donc pour sauvegarder par exemple le fait qu'un utilisateur soit connecté à votre site.</p>
<p>La variable de session en PHP est nommée <code>$_SESSION</code> celle-ci est <strong>vide</strong> par défaut.</p>
<p><em>Concrètement comme ça fonctionne :</em></p>
<p>En PHP la session n'est pas défaut <strong>pas démarré</strong>, la première étape est donc de la démarrer :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token function">session_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<p>La fonction <code>session_start()</code> doit-être la première ligne de votre fichier.</p>
</div>
<p>Puis pour enregistrer au sauvegardé une valeur, il suffit de :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token comment">// Enregistrer la variable</span>
<span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"ma_variable"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"ceci est une valeur de session"</span><span class="token punctuation">;</span>


<span class="token comment">// La lire</span>
<span class="token keyword">echo</span> <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"ma_variable"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Et… C'est tout !</p>
<h3 id="les-cookies" tabindex="-1"><a class="header-anchor" href="#les-cookies" aria-hidden="true">#</a> Les cookies</h3>
<p>Les cookies sont similaires à la session, c'est également une <code>super-globales</code>, mais ils sont « moins temporaires ». Vous avez déjà vu les bandeaux sur les cookies je ne vous fait pas un dessin…</p>
<p><img src="@source/tp/php/res/cookies.png" alt="Cookies"></p>
<p>Si nous lisons le message, on voit que le Cookie est stocké sur <strong>votre ordinateur</strong>, c'est donc des valeurs que vous allez sauvegarder depuis votre code, mais qui seront enregistrées sur le poste du client. L'avantage ? La persistance, les données en question resteront :</p>
<ul>
<li>Le temps que vous avez choisi (de quelques secondes jusqu'à plusieurs années).</li>
<li>Jusqu'à ce que l'utilisateur les supprime.</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">Qui dit poste client…</p>
<p>Dis danger ! Par défaut les valeurs enregistrées dans le cookie sont éditables par le client, donc il n'y a aucune garantie de ce que vous allez récupérer. Attention au XSS donc.</p>
</div>
<p>Les cookies peuvent être utilisés pour plein d'usage, mais <strong>je vous conseille de les réserver</strong> pour des données <strong>non sensibles</strong> :</p>
<ul>
<li>Paramètre d'affichage.</li>
<li>Sauvegarde « de choix utilisateur ».</li>
<li>Tracker un utilisateur (c'est ce que fait Google ou Facebook par exemple)</li>
</ul>
<p><em>Concretement comment ça fonctionne</em> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>
<span class="token comment">// Enregistre une valeur</span>
<span class="token variable">$value</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'Valeur de test'</span><span class="token punctuation">;</span>
<span class="token function">setcookie</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"monCookie"</span><span class="token punctuation">,</span> <span class="token variable">$value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setcookie</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"monCookie"</span><span class="token punctuation">,</span> <span class="token variable">$value</span><span class="token punctuation">,</span> <span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">3600</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/* expire dans 1 heure */</span>

<span class="token comment">// Récupération d'un cookie</span>
<span class="token keyword">echo</span> <span class="token variable">$_COOKIE</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"monCookie"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="utiliser-la-session-pour-gerer-un-espace-d-administration" tabindex="-1"><a class="header-anchor" href="#utiliser-la-session-pour-gerer-un-espace-d-administration" aria-hidden="true">#</a> Utiliser la SESSION pour gérer un espace d'administration</h2>
<p>En PHP, il est possible assez simplement de gérer des espaces d'administrations. Les espaces d'administrations sont « des simples pages web », elles sont juste protégées par un login et un mot de passe avant d'entrer sur la page souhaitée.</p>
<h3 id="nous-pouvons-representer-notre-problematique-tels-que" tabindex="-1"><a class="header-anchor" href="#nous-pouvons-representer-notre-problematique-tels-que" aria-hidden="true">#</a> Nous pouvons représenter notre problématique tels que :</h3>
<p><img src="@source/tp/php/res/uml-connexion.png" alt="UML représentant la tentative d'accès d'un utilisateur"></p>
<h3 id="et-le-code" tabindex="-1"><a class="header-anchor" href="#et-le-code" aria-hidden="true">#</a> Et le code ?</h3>
<p>Le code pour écrire une telle problématique est simple, <strong>il se résume à tester une variable de SESSION</strong>.</p>
<p><strong>Page à protéger</strong>:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token comment">// Vérification si l'utilisateur est connecté</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'user'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'user'</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">''</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// La personne n'est pas connectée, redirection vers la page de connexion</span>
        <span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'location: index.php?page=connexion'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>

<span class="token comment">&lt;!-- Le reste de votre page --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>Page de connexion</strong>:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'login'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'password'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Gestion du login utilisateur</span>
        <span class="token comment">// Ici vous implémenter votre logique de connexion (par exemple vérification en base de données, ou un simple test, etc…)</span>

        <span class="token comment">// Bien évidement c'est un exemple.</span>
        <span class="token comment">// UTILISER UNE BASE DE DONNÉES À LA PLACE !!</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'login'</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">'admin'</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'password'</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string double-quoted-string">"SPHHIBGjXKqkTubwIY1JZv6hukaMBH3"</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// Si les informations saisies par l'utilisateur corresponds, celui-ci est maintenant connecté</span>
            <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'user'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'admin'</span><span class="token punctuation">;</span>
            <span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'location: index.php?page=home'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Redirection de l'utilisateur car correctement connecté.</span>
            <span class="token keyword">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">unset</span><span class="token punctuation">(</span><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'user'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.php?page=connexion<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>login<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Votre Login<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Votre mot de passe<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Me connecter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="la-structure" tabindex="-1"><a class="header-anchor" href="#la-structure" aria-hidden="true">#</a> La structure</h2>
<p>Je pense vraiment que l'organisation du code est aussi importante que le code en lui-même. Organiser son code permet d'y voir clair et ainsi permettre de se focaliser sur l'important le code (CSS, PHP, JavaScript, etc.)</p>
<p>Actuellement, nous n'avons pas fait beaucoup de sites multipages, mais rapidement dans vos projets, ou dans votre vie professionnelle nous aurons 2, 3, 10 pages pour un même et unique site.</p>
<h3 id="l-include-notre-sauveur" tabindex="-1"><a class="header-anchor" href="#l-include-notre-sauveur" aria-hidden="true">#</a> L'include notre sauveur</h3>
<p>Nous avons en PHP un outil surpuissant pour gérer ce genre de problème, nous l'avons déjà utilisé, c'est le <code>include</code>. la fonction <code>include</code> va nous permettre de découper notre logique dans différents fichiers. C'est une logique que nous allons retrouver dans beaucoup de langage serveur. C'est important de prendre quelques minutes afin de comprendre son fonctionnement pour la mettre en place <strong>tout le temps</strong>.</p>
<p>Cette logique repose sur un point d'entrée unique pour l'ensemble des demandes pages. Dans ce point d'entrée, nous gèrerons les éléments communs à toutes les pages :</p>
<ul>
<li>La session / cookie.</li>
<li>Le login utilisateur.</li>
<li>Connexion à la base de données</li>
<li>Le routeur.</li>
<li>Et bien plus encore.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Cette logique est utilisée par l'ensemble des CMS modernes, elle permet de créer des pages dynamiques ou la mise en place très simple de mécanique de plug-in c'est donc l'idéal.</p>
</div>
<p>Fonctionnellement, nous allons « juste » découper un peu plus votre travail. Et nous allons ajouter « un nouveau fichier », que l'on appellera à partir de maintenant le point d'entrée (entry point).</p>
<table>
<thead>
<tr>
<th style="text-align:center"><img src="@source/tp/php/res/organisation_structure.png" alt="Entry Point"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Représentation visuelle de l'organisation</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">Un instant</p>
<p>J'ai volontairement représenté le PHP et la CSS. Les deux parties sont importantes. Dans une organisation classique, on essaie de mettre la partie CSS dans un dossier par exemple nommée <code>public</code>. Nous aurons dans ce dossier toutes les ressources distribuées directement à votre navigateur (css, image, font, etc)</p>
</div>
<h3 id="le-point-d-entree-entry-point" tabindex="-1"><a class="header-anchor" href="#le-point-d-entree-entry-point" aria-hidden="true">#</a> Le point d'entrée (<code>entry-point</code>)</h3>
<p>Le point d'entrée sera un fichier PHP, mais il agira comme un <code>routeur</code>. Le routeur est un morceau de code informatique qui vous permette l'affichage de la bonne page au bon moment.</p>
<p>Le code de l'entry point sera quelque chose de très simple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token comment">// Démarrage de la session</span>
<span class="token function">session_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Affichage « de la partie haute » de votre site, commun à l'ensemble de votre site</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'common/header.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Pages autorisées (configuration à sortir dans un autre fichier PHP)</span>
<span class="token variable">$whitelist</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'home'</span><span class="token punctuation">,</span><span class="token string single-quoted-string">'bart'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Gestion de l'affichage de la page demandée</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'page'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">in_array</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'page'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token variable">$whitelist</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"pages/"</span> <span class="token operator">.</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'page'</span><span class="token punctuation">]</span> <span class="token operator">.</span> <span class="token string single-quoted-string">'.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'pages/home.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Affichage de la partie basse de votre site, commun à l'ensemble de votre site.</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'common/footer.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>Voilà, nous avons le code de base de notre « entry-point ». Avant d'aller plus loin un peu de détail, nous avons quelques éléments importants :</p>
<ul>
<li>Le dossier <code>common</code> contiendra les éléments communs à l'ensemble de nos pages. (header, footer, fonctions, etc).</li>
<li>Les pages sont maintenant rangées dans le dossier <code>pages</code>.</li>
<li>La page incluse n'est pas libre ! Afin de sécuriser le code nous limitons l'include uniquement aux pages autorisées.
<ul>
<li>Si aucune page n'est fournie ou si celle-ci n'est pas autorisée, nous chargeons la page <code>home.php</code></li>
<li>Les liens entre vous pages seront différents. Ils seront sous la forme : <code>index.php?page=bart</code>, <code>index.php?page=page1</code>…</li>
</ul>
</li>
</ul>
<p>✋ Vous pouvez aussi remarquer que nous n'avons pas de HTML dans notre <code>entry-point</code>. Celui-ci est complètement générique.</p>
<p>Exemple de structure :</p>
<p><img src="@source/tp/php/res/organisation_structure_dossier.png" alt="Organisation d'un point de vue dossier"></p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Plus tard nous utiliserons un Framework en PHP qui gèrera c'est problématique pour nous. En attendant, cette façon de s'organiser fonctionne très bien.</p>
</div>
<h3 id="assez-parle" tabindex="-1"><a class="header-anchor" href="#assez-parle" aria-hidden="true">#</a> Assez parlé !</h3>
<p>L'organisation étant un point important, je vous propose de la mettre <RouterLink to="/tp/php/tp3.html">en pratique immédiatement dans le TP 4</RouterLink>.</p>
<h2 id="mise-en-pratique-de-la-session-cookie" tabindex="-1"><a class="header-anchor" href="#mise-en-pratique-de-la-session-cookie" aria-hidden="true">#</a> Mise en pratique de la Session / Cookie</h2>
<p>Nous avons maintenant organisé notre code afin que celui-ci soit moins « brouillon », je vous propose de <RouterLink to="/tp/php/tp4.html">pratiquer un peu la partie session</RouterLink></p>
<h2 id="php-et-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#php-et-base-de-donnees" aria-hidden="true">#</a> PHP et Base de données</h2>
<p>Cette partie est disponible ici : <RouterLink to="/tp/php/sql/support.html">Introduction à la base de données avec PHP</RouterLink></p>
<h2 id="le-php-objet" tabindex="-1"><a class="header-anchor" href="#le-php-objet" aria-hidden="true">#</a> Le PHP Objet</h2>
<p>Nous aborderons <RouterLink to="/cours/laravel.html">le PHP objet avec Laravel</RouterLink></p>
</template>
