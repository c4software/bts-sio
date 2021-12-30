<template><h1 id="definition-du-projet" tabindex="-1"><a class="header-anchor" href="#definition-du-projet" aria-hidden="true">#</a> Définition du projet</h1>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#definition-du-besoin">Définition du besoin</RouterLink><ul><li><RouterLink to="#espace-public">Espace public</RouterLink></li><li><RouterLink to="#espace-prive">Espace privé</RouterLink></li></ul></li><li><RouterLink to="#definition-des-objets">Définition des objets</RouterLink><ul><li><RouterLink to="#uml">UML</RouterLink></li></ul></li><li><RouterLink to="#la-base-de-donnees">La base de données</RouterLink><ul><li><RouterLink to="#definition">Définition</RouterLink></li></ul></li><li><RouterLink to="#l-authentification">L&#39;authentification</RouterLink><ul><li><RouterLink to="#la-session">La session</RouterLink></li><li><RouterLink to="#les-droits-d-acces">Les droits d&#39;accès</RouterLink></li><li><RouterLink to="#la-securite">La sécurité</RouterLink></li></ul></li><li><RouterLink to="#la-suite">La suite</RouterLink></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Afin de vous remettre en marche, je vous propose un « petit » TP qui vous permettra de vous remémorer le développement objet mais également le développement Web. Nous allons dans cette série de TP réaliser un site Internet qui a pour but de lister / gérer / afficher l'état de'objets connectés. Pour cette réalisation nous allons utiliser plusieurs technologies :</p>
<ul>
<li>HTML (5).</li>
<li>CSS. (Voir du SCSS/SASS pour ceux qui le souhaiterai).</li>
<li>PHP 8 (avec de la POO évidemment).</li>
<li>Bootsrap ou Tailwind au choix.</li>
</ul>
<p>Vous etes prêt, c'est parti !</p>
<div class="custom-container tip"><p class="custom-container-title">Vous avez tout oublié ?</p>
<p>Pas d'inquiétude, je suis là pour vous aider. L'idée ici est de remetter en route la machine avec un TP guidé 🚀.</p>
</div>
<h2 id="definition-du-besoin" tabindex="-1"><a class="header-anchor" href="#definition-du-besoin" aria-hidden="true">#</a> Définition du besoin</h2>
<p>Avant d'aller plus loin, qu'allons nous réaliser ? C'est toujours par là que vous devez commencer ! Comprendre le besoin de votre « client », c'est lui qui a un besoin, des idées. Vous devez donc le comprendre ce mettre à sa place (être force de proposition si vous avez des idées à ajouter). Dans un premier temps voilà mon idée, c'est de celle-ci que nous allons partir :</p>
<p>J'aimerais réaliser un « Dashboard », c'est à dire une page web. Celle-ci est principalement administrative, le style est important mais pas principale, elle doit donc propre et moderne (privilégier au maximum l'usage de <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap<ExternalLinkIcon/></a> et/ou <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">TailWindCSS<ExternalLinkIcon/></a>).</p>
<h3 id="espace-public" tabindex="-1"><a class="header-anchor" href="#espace-public" aria-hidden="true">#</a> Espace public</h3>
<p>Le dashboard doit être accessible à tous dans une version consultative (sans actions possible). Cette interface doit être accessible sans connexion / session utilisateur.</p>
<p>L'espace / la version public va permetter la consultation des informations et <strong>aucune actions ne doit être possible.</strong></p>
<h3 id="espace-prive" tabindex="-1"><a class="header-anchor" href="#espace-prive" aria-hidden="true">#</a> Espace privé</h3>
<p>L'espace privé doit être accessible depuis le menu principale</p>
<h2 id="definition-des-objets" tabindex="-1"><a class="header-anchor" href="#definition-des-objets" aria-hidden="true">#</a> Définition des objets</h2>
<p>La première étape, <strong>avant même de coder</strong>, dans la réalisation d'un projet informatique est de modéliser le problème qui vous a été donnés.</p>
<p>Dans notre cas, nous alons réaliser un UML (et un MCD si vous le souhaitez) qui représentera le problème que le client vous a donné. Dans notre projet nous avons donc à représenter :</p>
<ul>
<li>Des « objets connectés » réfléchissons ensemble à ce que va être un « objet connectés ».
<ul>
<li>Un objet connecté c'est toujours « une base » (avec des informations génériques).</li>
<li>Des objets spécifique (lampe, thermostat, prise, etc) avec des capacités spécifique (héritage d'un objet de base).</li>
</ul>
</li>
<li>Des utilisateurs représente la partie connexion (Privée / Public).</li>
</ul>
<h3 id="uml" tabindex="-1"><a class="header-anchor" href="#uml" aria-hidden="true">#</a> UML</h3>
<p>Je vous laisse commencer à réfléchir au sujet, vous avez plusieurs façon de procéder :</p>
<ul>
<li>Avec un papier et un crayon.</li>
<li>Avec un outil « en ligne ».</li>
</ul>
<p>Pour ma part, j'aime bien l'<a href="https://app.diagrams.net/" target="_blank" rel="noopener noreferrer">outil Diagram.io<ExternalLinkIcon/></a>.</p>
<div class="custom-container tip"><p class="custom-container-title">C'est à vous !</p>
<p>Je vous laisse réfléchir à une solution (il y en a plusieurs).</p>
</div>
<details class="custom-container details"><summary>Voir ma solution</summary>
<p>Vous avez cliqué un peu vite non ?</p>
<p><img src="@source/tp/php/mvc/dashboard/res/uml-base-exemple.png" alt="Exemple de sollution"></p>
</details>
<h2 id="la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#la-base-de-donnees" aria-hidden="true">#</a> La base de données</h2>
<p>Avec les objets correctement défini, nous allons pouvoir maintenant définir notre base de données. En effet, la base de données doit-être un mirroir de la problématique qui vous a été donnés, et donc évidemment une représentation « Relationnel » de vos objets défini dans votre code.</p>
<h3 id="definition" tabindex="-1"><a class="header-anchor" href="#definition" aria-hidden="true">#</a> Définition</h3>
<p>Je vous laisse créer le MCD de votre base de données.</p>
<h2 id="l-authentification" tabindex="-1"><a class="header-anchor" href="#l-authentification" aria-hidden="true">#</a> L'authentification</h2>
<h3 id="la-session" tabindex="-1"><a class="header-anchor" href="#la-session" aria-hidden="true">#</a> La session</h3>
<h3 id="les-droits-d-acces" tabindex="-1"><a class="header-anchor" href="#les-droits-d-acces" aria-hidden="true">#</a> Les droits d'accès</h3>
<h3 id="la-securite" tabindex="-1"><a class="header-anchor" href="#la-securite" aria-hidden="true">#</a> La sécurité</h3>
<h2 id="la-suite" tabindex="-1"><a class="header-anchor" href="#la-suite" aria-hidden="true">#</a> La suite</h2>
<p>Nous avons défini la base de notre projet, <RouterLink to="/tp/php/mvc/dashboard/tp1.html">continuons la suite ici</RouterLink></p>
</template>
