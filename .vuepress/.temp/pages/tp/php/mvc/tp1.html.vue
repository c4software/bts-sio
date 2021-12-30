<template><h1 id="structure-de-developpement-mvc" tabindex="-1"><a class="header-anchor" href="#structure-de-developpement-mvc" aria-hidden="true">#</a> Structure de développement MVC</h1>
<p>Cette structure est réalisée à des fins pédagogiques. Elle est un intermédiaire permettant d'introduire les concepts du
framework Laravel sur des bases de développement PHP connu.</p>
<div class="custom-container tip"><p class="custom-container-title">Attention</p>
<p>Si vous souhaitez réaliser un développement d'envergure, je vous déconseille vivement l'utilisation de ce code.
Préférez plutôt l'utilisation d'un framework tel que Laravel</p>
</div>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#les-sources">Les sources</RouterLink></li><li><RouterLink to="#structure">Structure</RouterLink><ul><li><RouterLink to="#globalement">Globalement</RouterLink></li><li><RouterLink to="#la-configuration">La configuration</RouterLink></li><li><RouterLink to="#l-entry-point-index-php">L&#39;entry Point (index.php)</RouterLink></li><li><RouterLink to="#le-dossier-routes">Le dossier routes/</RouterLink></li><li><RouterLink to="#le-dossier-controllers">Le dossier controllers/</RouterLink></li><li><RouterLink to="#le-dossier-views">Le dossier views/</RouterLink></li><li><RouterLink to="#le-dossier-models">Le dossier models/</RouterLink></li><li><RouterLink to="#le-dossier-public">Le dossier public/</RouterLink></li><li><RouterLink to="#le-dossier-utils">Le dossier utils/</RouterLink></li><li><RouterLink to="#le-dossier-migrations">Le dossier migrations/</RouterLink></li></ul></li><li><RouterLink to="#ajouter-une-page-dans-un-controleur-existant">Ajouter une page dans un contrôleur existant</RouterLink></li><li><RouterLink to="#ajouter-un-modele">Ajouter un modèle</RouterLink></li><li><RouterLink to="#ajouter-un-nouveau-controleur">Ajouter un nouveau contrôleur</RouterLink></li><li><RouterLink to="#utiliser-un-controleur-recemment-cree">Utiliser un contrôleur récemment créé</RouterLink></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Un des plus célèbres design patterns s’appelle MVC (Modèle - Vue - Contrôleur) ce pattern permet une bonne organisation du son code source. Pour l'instant vous codiez sans vraiment de structure, avec globalement, même si c'était rangé ; des pages Web qui mélangent traitement (PHP), accès aux données (SQL) et présentation (balises HTML). Même si c'est complètement fonctionnel, nous allons nous efforcer à partir de maintenant à séparer ces parties.</p>
<p>La structure MVC présentée dans cet exemple est classique. Elle intègre les concepts MVC classiques à savoir :</p>
<ul>
<li>Modèle (Accès à la base de données)</li>
<li>Vue (Représentation pour le client)</li>
<li>Contrôleur (Traitement des requêtes HTTP entrant)</li>
</ul>
<p>Le projet proposé dépasse le simple MVC, il intègre en effet les bases pour un développement serein à savoir :</p>
<ul>
<li>Un routeur : Correspondance entre un chemin (route) et une fonctionnalité (méthode d'un contrôleur).</li>
<li>Un ensemble d'interfaces et class permettant
<ul>
<li>la réalisation d'API.</li>
<li>l'Accès à la base de données.</li>
<li>La gestion de la SESSION.</li>
</ul>
</li>
<li>Une organisation structurée permettant la réalisation de projet de taille moyenne / grande.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Point important sur la structure.</p>
<p>Cette base de développement intègre une structure <strong>qu'il faut respecter</strong> pour développer dans de bonnes conditions.</p>
</div>
<h2 id="les-sources" tabindex="-1"><a class="header-anchor" href="#les-sources" aria-hidden="true">#</a> Les sources</h2>
<p>Vous pouvez télécharger un code de démonstration <a href="/demo/php/greta-tv/refactor-structure-mvc.zip">à l'adresse suivante en cliquant ici</a></p>
<p>Voilà le rendu :</p>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rr4EMZQJhLg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<h2 id="structure" tabindex="-1"><a class="header-anchor" href="#structure" aria-hidden="true">#</a> Structure</h2>
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
<details class="custom-container details"><summary>Voilà un exemple</summary>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token variable">$DB_SERVER</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"127.0.0.1"</span><span class="token punctuation">;</span>
<span class="token variable">$DB_DATABASE</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"VOTRE_BDD"</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token string double-quoted-string">"DB_USER"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"VOTRE_UTILISATEUR"</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"DB_PASSWORD"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"ET_LE_MOT_DE_PASSE"</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"DB_DSN"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"mysql:host=<span class="token interpolation"><span class="token variable">$DB_SERVER</span></span>;dbname=<span class="token interpolation"><span class="token variable">$DB_DATABASE</span></span>"</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"DEBUG"</span> <span class="token operator">=></span> <span class="token constant boolean">true</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>


</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></details>
<ul>
<li>Debug ? Vous avez dit debug ? À quoi correspond cette variable à votre avis ? Comment faire pour. Est-ce important de la mettre à <code>true</code> ?</li>
</ul>
<details class="custom-container details"><summary>Non, mais un instant ? Mon code est différent.</summary>
<p>Et oui ! L'exemple que je vous communique plus haut est simpliste. Dans le code que vous avez récupéré, le fichier <code>configs.php</code> est légèrement différent. En effet, celui-ci prend un ensemble de variables depuis <code>les variables d'environnements</code> kézako !? Les variables d'environnement sont des variables définies au niveau du système qui nous permettra de changer la configuration sans modifier le code.</p>
<p>Ce système de variables d'environnements est très intéressant, car il nous permettra avec l'intégration continue de personnaliser le programme au moment de l'exécution sans en changer le code source (Exemple PROD et DEV).</p>
</details>
<h3 id="l-entry-point-index-php" tabindex="-1"><a class="header-anchor" href="#l-entry-point-index-php" aria-hidden="true">#</a> L'entry Point (<code>index.php</code>)</h3>
<p>Le fichier <code>index.php</code> présent à la racine du projet est, ce que l'on appelle, un <strong>entry point</strong>. Ce point d'entrée en
français est le fichier qui va « prendre le trafic » de votre projet.</p>
<p>Concrètement qu'est-ce que ça veut dire ? Ça veut dire que ce fichier est grandement générique ; en effet, quel que soit
le projet celui-ci restera grandement inchangé. Il intègre les initialisations de base permettant à votre projet de
fonctionner correctement. Je vous invite par curiosité à regarder son contenu. Mais pas de modification à prévoir dans
ce fichier.</p>
<p>Une représentation possible peut-être la suivante :</p>
<p><img src="@source/tp/php/mvc/res/organisation_structure.png" alt="Structure &amp; Entry Point"></p>
<h3 id="le-dossier-routes" tabindex="-1"><a class="header-anchor" href="#le-dossier-routes" aria-hidden="true">#</a> Le dossier <code>routes/</code></h3>
<p>Le dossier <code>routes/</code> contient l'ensemble du code relatif au Router. Le router est la brique centrale de cette structure
MVC, en effet votre utilisateur passera obligatoirement par celui-ci.</p>
<p>Le routeur est un élément simple qui permet de sécuriser votre code. Celui-ci est en réalité un simple « tableau »
contenant l'ensemble des fichiers / ressources accessible depuis le navigateur du client.</p>
<p>Cet élément repose sur le principe de la <code>WhiteList</code> (Liste blanche), nous avons donc de lister l'ensemble « paths
» (chemins) autorisé pour deux types de ressources :</p>
<ul>
<li>Web (<code>Web.php</code>) : Page Web classique, affichée dans un navigateur Web (Chrome, Firefox, etc.)</li>
<li>Api (<code>Api.php</code>) : Échange entre un client et le serveur (Ajax, Application, etc.)</li>
<li>Cli (<code>Cli.php</code>) : Définission d'actions accessibles uniquement via la ligne de commande (initialisation de Model, contrôleur, initialisation de la base de données)</li>
</ul>
<p>Nous avons un fichier <code>Router.php</code> qui comme l'entry-point est générique il initialise seulement le code (je vous laisse
le regarder par curiosité).</p>
<p>La logique de chargement d'une route est dans <code>routes/base/Route.php</code>, c'est dans ce fichier que ce cache la
fameuse <code>Whitelist</code> mais également la logique de chargement d'une page par rapport à une demande d'un utilisateur (
chargement en GET ou en POST).</p>
<h4 id="web-php-et-api-php" tabindex="-1"><a class="header-anchor" href="#web-php-et-api-php" aria-hidden="true">#</a> <code>Web.php</code> et <code>Api.php</code></h4>
<p>Les deux fichiers ont une syntaxe identique, c'est normal, il s’agit de la réaliser déclaration des routes, celle-ci
prendra toujours la même forme :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">Web</span>
<span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token variable">$monControleur</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MonControleur</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$monControleur</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'laMethodeAAppeler'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/autreChemin'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$monControleur</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'lautreMethode'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// etc…</span>
    <span class="token comment">// Vous pouvez avoir autant de routes que nécessaire</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>Je pense qu'ici pas de problème! Vous comprenez l'idée, une nouvelle page ?</p>
<ul>
<li>Une nouvelle route</li>
<li>Une nouvelle méthode dans le contrôleur…</li>
<li>Et c'est tout !</li>
</ul>
<h4 id="gerer-l-authentification" tabindex="-1"><a class="header-anchor" href="#gerer-l-authentification" aria-hidden="true">#</a> Gérer l'authentification ?</h4>
<p>Vous allez rapidement avoir besoin d'authentifier un utilisateur. Dans ce cas, évidemment vous n'allez pas ajouter / lister des routes non accessibles à tous <strong>(pour des raisons évidentes de sécurité)</strong>.</p>
<p>Il conviendra donc de mettre un <code>if</code> autour des routes que vous souhaitez protéger. Par exemple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">routes</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">controllers<span class="token punctuation">\</span>Account</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">controllers<span class="token punctuation">\</span>Main</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">controllers<span class="token punctuation">\</span>VideoWeb</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">routes<span class="token punctuation">\</span>base<span class="token punctuation">\</span>Route</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">utils<span class="token punctuation">\</span>SessionHelpers</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Web</span>
<span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$videoWeb</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VideoWeb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$main</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$account</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Account</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$videoWeb</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'home'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/tv'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$videoWeb</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'tv'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/about'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$main</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'about'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/login'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$account</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'login'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Les liens /me et /logout ne seront disponibles que pour les utilisateurs ayant un compte.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name static-context">SessionHelpers</span><span class="token operator">::</span><span class="token function">isLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/me'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$account</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'me'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/logout'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$account</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'logout'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="le-dossier-controllers" tabindex="-1"><a class="header-anchor" href="#le-dossier-controllers" aria-hidden="true">#</a> Le dossier <code>controllers/</code></h3>
<p>Le dossier <code>controllers/</code> contiendra l'ensemble des contrôleurs de votre projet. Pour l'instant il y en a trois (<code>GlobalWeb.php</code>, <code>VideoApi.php</code>, <code>VideoWeb.php</code>) ils ont chacun un but différent propre à mon exemple.</p>
<p><strong>Ça veut dire</strong> que vous pouvez créer autant de contrôleurs que nécessaire, il s'agit ici d'un découpage logique des fonctionnalités que vous souhaitez mettre en place.</p>
<p>Le contrôleur est la class PHP qui va faire le lien entre la demande de l'utilisateur (Route) et la donnée (modèle), son rôle sera donc toujours un peu le même :</p>
<ul>
<li>Récupéré de la donnée (BDD, Session, Fichier, etc.).</li>
<li>La mettre en forme si nécessaire.</li>
<li>La retourner à l'utilisateur.</li>
</ul>
<p>Si nous reprenons la base d'un contrôleur, celui-ci aura toujours au minimum la forme suivante :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">namespace</span> <span class="token package">controllers</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">controllers<span class="token punctuation">\</span>base<span class="token punctuation">\</span>Web</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">MonControleur</span> <span class="token keyword">extends</span> <span class="token class-name">Web</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Méthode d'exemple</span>
    <span class="token keyword">function</span> <span class="token function-definition function">methodeDExemple</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"views/monControleur/methodeDExemple.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">footer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>Comme vous pouvez le constater ici pas énormément de code, en effet une partie de la complexité est encapsulée dans l'héritage (<code>extends Web</code>).</p>
<p>Un contrôleur est donc une classe, avec un ensemble de méthodes technique permettant de réaliser des opérations. Les 3 lignes :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$this</span><span class="token operator">-></span><span class="token function">header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"views/monControleur/methodeDExemple.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$this</span><span class="token operator">-></span><span class="token function">footer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Seront votre « traitement » / « votre page », nous avons :</p>
<ul>
<li><code>$this-&gt;header();</code> : Le haut de votre page (avant votre contenu)</li>
<li><code>include(&quot;views/monControleur/methodeDExemple.php&quot;);</code> : Votre contenu HTML (<strong>et uniquement votre contenu</strong>)</li>
<li><code>$this-&gt;footer();</code> : Le base de votre page (après le contenu)</li>
</ul>
<p>Nous pouvons le représenter de cette façon-ci :</p>
<p><img src="@source/tp/php/mvc/res/organisation.png" alt="Structure"></p>
<div class="custom-container tip"><p class="custom-container-title">L'astuce du chef</p>
<p>Si vous avez regarder un peu le code, vous avez certainement remarqué que les paramètres <code>$_GET</code> était automatiquement disponible en tant que paramétre de votre méthode. Exemple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Si l'utilisateur accède à /home?nom=brosseau&amp;prenom=valentin</span>

<span class="token keyword">function</span> <span class="token function-definition function">home</span><span class="token punctuation">(</span><span class="token variable">$nom</span><span class="token punctuation">,</span> <span class="token variable">$prenom</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// $prenom contiendra ici "brosseau" et $prenom contiendra "valentin"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></div>
<h4 id="l-heritage" tabindex="-1"><a class="header-anchor" href="#l-heritage" aria-hidden="true">#</a> L'héritage</h4>
<p>Les contrôleurs <strong>doivent hériter</strong> de l'une des deux interfaces <code>Web</code> ou <code>Api</code>. Ces deux classes définissent un comportement standardisé entre les différents contrôleurs que vous allez écrire.</p>
<p>Les différentes relations peuvent être représentées avec l'UML suivant :</p>
<p><img src="@source/tp/php/mvc/res/uml_composition.png" alt="UML Relation"></p>
<p>Les méthodes <code>header()</code> et <code>footer()</code> ce charge de réaliser les imports nécessaires (ou le code nécessaire dans le cas de l'API) pour que vous pages s'affichent tels que vous le désirez.</p>
<p>La méthode <code>redirectTo</code> permet de gérer la redirection vers une autre ressource. Rien de bien compliqué c'est un simple appel de la méthode <code>header</code> de PHP. Je vous laisse regarder le code dans <code>controller/base/web.php</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">Be curious !</p>
<p>Ne prenez pas automatiquement pour acquis ce que je vous écris. Allez voir le code source du projet afin de constater par vous-même ce que je viens de dire / écrire.</p>
</div>
<h3 id="le-dossier-views" tabindex="-1"><a class="header-anchor" href="#le-dossier-views" aria-hidden="true">#</a> Le dossier <code>views/</code></h3>
<p>Le dossier <code>views/</code> va contenir l'ensemble des fichiers « d'interface » de votre application. Ces fichiers sont en réalité massivement des fichiers HTML classiques.</p>
<p>Détail important, nous allons ici privilégier le découpage et la réutilisation. Il est donc important de constater que nous avons un dossier <code>views/common/</code> celui-ci contient l'ensemble des éléments commun à toutes vos pages comme vues précédemment. (haut de page et pied de page).</p>
<p>Vos différentes pages <strong>ne contiendront donc</strong> que le contenu réel de la page exemple :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Ceci est un titre<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Et voici le contenu<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Pourquoi est-ce important ?</p>
<p>Au-delà de tout ce que nous voyons ensemble, mon but est de vous rendre autonome pour que vous puissiez réaliser vos propres projets. Et quand il s'agit de projet, le plus important à retenir c'est l'organisation, mais également éviter toutes répétitions.</p>
<p>L'une dès principales sources de répétition dans un site Web c'est le code présent dans le header et dans le footer de votre site. C'est pourquoi je vous propose de ne pas le mettre dans chaque page.</p>
<center><iframe src="https://giphy.com/embed/eBpiVHAzU8XXtvPCae" width="480" height="353" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>
</div>
<h3 id="le-dossier-models" tabindex="-1"><a class="header-anchor" href="#le-dossier-models" aria-hidden="true">#</a> Le dossier <code>models/</code></h3>
<p>Le dossier <code>models/</code> contiens les classes qui vont représenter les tables en base de données. Ces classes vont faire « l'interface » entre votre contrôleur et votre base de données.</p>
<p>Finis donc les requêtes SQL partout dans votre code. À partir de maintenant, vos requêtes sont <strong>dans le modèle</strong> et uniquement dans le modèle.</p>
<div class="custom-container warning"><p class="custom-container-title">Un instant</p>
<p>Cette notion de modèle <strong>est très importante</strong>, en effet il s'agit ici d'être explicit et de ne pas faire une classe fourretout!</p>
</div>
<p>Comme pour les contrôleurs, vous avez à votre disposition (dans le dossier, base) une classe générique vous permettant d'automatiser certaines requêtes (<code>getAll</code>, <code>getOne</code>, <code>deleteOne</code>, <code>updateOne</code>). Bien évidemment ce ne sont que des raccourcis, vous pouvez sans problème écrire les requêtes via PDO.</p>
<p>Voici un exemple minimal de Modèle :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">models<span class="token punctuation">\</span>base<span class="token punctuation">\</span>SQL</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">DBVideo</span> <span class="token keyword">extends</span> <span class="token class-name">SQL</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">__construct</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'LE_NOM_DE_VOTRE_TABLE'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>Voici un exemple plus complet :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">models<span class="token punctuation">\</span>base<span class="token punctuation">\</span>SQL</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">DBVideo</span> <span class="token keyword">extends</span> <span class="token class-name">SQL</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">__construct</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'LE_NOM_DE_VOTRE_TABLE'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function-definition function">getVideos</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function-definition function">getByVideoId</span><span class="token punctuation">(</span><span class="token variable">$videoId</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Utilisation d'une query à la place d'un simple getOne car la requête</span>
        <span class="token comment">// est réalisé sur un champ différent que l'ID de la table.</span>

        <span class="token variable">$stmt</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM video WHERE videoId = ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$videoId</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h4 id="l-acces-a-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#l-acces-a-la-base-de-donnees" aria-hidden="true">#</a> L'accès à la base de données</h4>
<p>Si vous avez été curieux… Vous avez certainement remarqué qu'à aucun moment nous n’avons parlé de la connexion à la base de données ! C'est aussi ça l'avantage d'une organisation structurée, je me suis occupé de cette partie-là pour vous.</p>
<p>La connexion à la base de données est intégrée dans la classe <code>models/base/Database.php</code> qui est utilisé dans la classe fille <code>models/base/SQL.php</code>.</p>
<p>Pour l'instant vous serez « utilisateur » de cette architecture. Mais, voilà le diagramme de classe de celle-ci :</p>
<p><img src="@source/tp/php/mvc/res/uml_bdd.png" alt="UML BDD"></p>
<div class="custom-container tip"><p class="custom-container-title">Pourquoi faire une Interface ?</p>
<p>Le diagramme de classe vous semble peut-être très compliqué au vu de la problématique… Mais c'est tout là l'intérêt de réaliser des Interfaces. En effet, je vous offre (c'est cadeau, c'est pour moi) la classe SQL ; mais peut-être que vous voulez faire du Oracle ? Ou bien du MongoDB ?</p>
<p>Avec une Interface, aucun problème. Votre code restera inchangé, quelle que soit l'implémentation de votre connecteur. En effet, implémenter l'interface vous obligera l'écriture des 4 méthodes minimale au bon fonctionnement de votre code.</p>
<p>Ne vous inquiétez pas! L'interface est une notion que nous reverrons ensemble plus tard… Sachez juste qu'elle est une des bases de la programmation orientée objet.</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">Be curious (bis)</p>
<p>Ne vous contentez pas de dire « ça marche », allez regarder ma classe <code>SQL</code>! Je pense qu'elle est intéressante, et que vous devriez la regarder.</p>
</div>
<h3 id="le-dossier-public" tabindex="-1"><a class="header-anchor" href="#le-dossier-public" aria-hidden="true">#</a> Le dossier <code>public/</code></h3>
<p>Le dossier <code>public/</code> va contenir l'ensemble des données « publics » de votre projet. Ces fichiers sont ceux distribués directement au navigateur de votre client.</p>
<p>Ça semble un détail peut-être ? Pourtant c'est un élément important ! En effet pourquoi solliciter votre code PHP pour distribuer de la CSS ou des images en plus d'être inutile ça surcharge votre serveur inutilement ?</p>
<h3 id="le-dossier-utils" tabindex="-1"><a class="header-anchor" href="#le-dossier-utils" aria-hidden="true">#</a> Le dossier <code>utils/</code></h3>
<p>Le dossier <code>utils/</code> contient dans la structure de base une classe permettant de gérer la SESSION et une classe permettant de générer une image <a href="https://www.gravatar.com/" target="_blank" rel="noopener noreferrer">Gravatar<ExternalLinkIcon/></a>.</p>
<p>Mais vous allez placer ici l'ensemble des <strong>librairies PHP</strong> nécessaire au bon fonctionnement de votre projet.</p>
<p>Un morceau de code que vous avez trouvé sur StackOverflow ? Une librairie que vous avez conçue ? Pas de problème ! Rangez-les dans le dossier <code>utils/</code></p>
<h3 id="le-dossier-migrations" tabindex="-1"><a class="header-anchor" href="#le-dossier-migrations" aria-hidden="true">#</a> Le dossier <code>migrations/</code></h3>
<p>Le dossier <code>migrations/</code> contient l'ensemble des fichiers nécessaire à l'installation de votre base de données. Le fichier <code>RunMigration.php</code> <strong>(à lancer depuis la console)</strong> charge et exécute l'ensemble des fichiers <code>*.sql</code>. Cette fonctionnalité vous permettra :</p>
<ul>
<li>De garder une trace de votre schéma.</li>
<li>Lancer simplement l'installation de votre base de données.</li>
<li>Historiser vos « migrations ». En effet le script va charger <strong>l'ensemble</strong> des fichiers SQL.</li>
</ul>
<p>Pour l'utiliser, vous devez passer via la ligne de commande. En effet pour des raisons de sécurité, impossible de lancer les migrations depuis votre navigateur.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>php index<span class="token operator">.</span>php db<span class="token punctuation">:</span>migrate
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="ajouter-une-page-dans-un-controleur-existant" tabindex="-1"><a class="header-anchor" href="#ajouter-une-page-dans-un-controleur-existant" aria-hidden="true">#</a> Ajouter une page dans un contrôleur existant</h2>
<p>Ajouter une nouvelle page dans un contrôleur se résumera à 3 opérations :</p>
<ul>
<li>Ajouter la méthode dans le contrôleur.</li>
<li>Ajouter la route permettant l'accès à la méthode.</li>
<li>Ajouter la vue (template) dans le dossier <code>view</code>.</li>
</ul>
<p>Par exemple, si vous souhaitez ajouter une page <code>/ping</code> faisant référence au contrôleur <code>Main</code>:</p>
<ul>
<li>Ajout dans les routeurs <code>/routes/Web.php</code> :</li>
</ul>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/ping'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token variable">$main</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'ping'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Déclarer la méthode <code>ping()</code> dans le contrôleur :</li>
</ul>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">function</span> <span class="token function-definition function">ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"views/global/ping.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">footer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li>Créer la vue <code>views/global/ping.php</code> :</li>
</ul>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token operator">&lt;</span>h1<span class="token operator">></span><span class="token constant">PONG</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Je sais que vous aimez les videos… Voilà la même procédure résumée en vidéo :</p>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/HO7_O10S30o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<h2 id="ajouter-un-modele" tabindex="-1"><a class="header-anchor" href="#ajouter-un-modele" aria-hidden="true">#</a> Ajouter un modèle</h2>
<p>Pour rappel, le modèle est une classe qui va centraliser la partie communication avec la source de données (SQL ou autre). Dans la structure MVC <strong>je vous encourage à créer autant de <code>modèles</code> que de table dans votre base de données</strong>.</p>
<p>Une classe modèle de type SQL (ce qui vous intéressera dans 99.9% des cas) possède toujours la même structure :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">models<span class="token punctuation">\</span>base<span class="token punctuation">\</span>SQL</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">VotreTable</span> <span class="token keyword">extends</span> <span class="token class-name">SQL</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">__construct</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'votreTable'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ul>
<li>Le <code>namespace models;</code> permet de structure votre code, et permettra via l'auto-loader l'import automatique de vos classes.</li>
<li><code>class VotreTable extends SQL</code> indique que votre classe hérite de SQL. Elle possèdera donc automatiquement des méthodes (accessible via <code>$this</code>) :
<ul>
<li><code>getAll</code></li>
<li><code>getOne</code></li>
<li><code>deleteOne</code></li>
<li><code>updateOne</code></li>
</ul>
</li>
<li>Le constructeur <code>__construct()</code> va permettre de créer le parent (Class SQL), le premier paramètre est le nom de votre table en <strong>base de données</strong>.</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">On ne range pas le model n'importe où !</p>
<p>Vos modèles doivent être obligatoirement dans le dossier <code>models/</code></p>
</div>
<div class="custom-container warning"><p class="custom-container-title">Version alternative</p>
<p>La structure de code intègre également quelques commandes accessibles en ligne de commande. Pour créer un nouveau modèle rapidement vous pouvez également faire :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php index.php model:create NomDeVotreModel
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">Vous n'etes pas limité</p>
<p>Le modèle va centraliser l'ensemble de vos requêtes, même si de base nous avons quelques méthodes de base, vous pouvez évidemment en ajouter autant que vous souhaitez.</p>
<p>Exemple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">models<span class="token punctuation">\</span>base<span class="token punctuation">\</span>SQL</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Video</span> <span class="token keyword">extends</span> <span class="token class-name">SQL</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">__construct</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'video'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function-definition function">getPublicVideos</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// utilise la connexion BDD pour réaliser les requêtes vers les données</span>
        <span class="token comment">// ici retourne l'ensemble des vidéos de type accessibles à tous (public)</span>

        <span class="token variable">$stmt</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM video WHERE public = 1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function-definition function">getByVideoId</span><span class="token punctuation">(</span><span class="token variable">$videoId</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Utilisation d'une query à la place d'un simple getOne car la requête</span>
        <span class="token comment">// est réalisé sur un champs différent que l'ID de la table.</span>

        <span class="token variable">$stmt</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM video WHERE videoId = ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$videoId</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div></div>
<h2 id="ajouter-un-nouveau-controleur" tabindex="-1"><a class="header-anchor" href="#ajouter-un-nouveau-controleur" aria-hidden="true">#</a> Ajouter un nouveau contrôleur</h2>
<p>Le contrôleur est le morceau de code (classe) permettant de « relier » un lien et une fonctionnalité. Comme les modèles je vous encourage à découper votre code au maximum pour regrouper ensemble le code ayant une symbolique commune (exemple, gestion des vidéos dans contrôleur <code>Video</code>, gestion de l'utilisateur dans <code>Account</code>, etc.).</p>
<p>Comme les modèles, les contrôleurs ont une structure de base. La différence est qu'il y a actuellement deux possibilités (Web et API). Dans 99.9% des cas, vous allez réaliser des contrôleurs de type Web :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">controllers</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">controllers<span class="token punctuation">\</span>base<span class="token punctuation">\</span>Web</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">VotreControleur</span> <span class="token keyword">extends</span> <span class="token class-name">Web</span>
<span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function-definition function">methodeDExemple</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"views/votreVue.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">footer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ul>
<li>Le <code>namespace controllers;</code> permet de structure votre code, et permettra via l'auto-loader l'import automatique de vos classes.</li>
<li><code>class VotreControleur extends Web</code> indique que votre classe hérite de Web (une page client). Elle possèdera donc automatiquement des méthodes (accessible via <code>$this</code>) :
<ul>
<li><code>header</code></li>
<li><code>footer</code></li>
<li><code>redirect</code></li>
</ul>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Et c'est tout !</p>
<p>Créer un contrôleur est aussi simple que ça. C'est tellement simple que je vous encourage à en créer autant que nécessaire.</p>
<p>Dans mon exemple il y a qu'une seule méthode <code>methodeDExemple()</code>, évidemment vous pouvez en créer autant que vous le souhaitez <strong>(il n'y a pas de limite)</strong>.</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">Version alternative</p>
<p>La structure de code intègre également quelques commandes accessibles en ligne de commande. Pour créer un nouveau contrôleur rapidement vous pouvez également faire :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php index.php controller:create NomDeVotreControleur
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<h2 id="utiliser-un-controleur-recemment-cree" tabindex="-1"><a class="header-anchor" href="#utiliser-un-controleur-recemment-cree" aria-hidden="true">#</a> Utiliser un contrôleur récemment créé</h2>
<p>Nous avons créé un contrôleur, mais pour l'utiliser il faut le déclarer dans le routeur (par exemple dans le router Web). Mieux que des mots voilà une vidéo résumant comment procéder :</p>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/6oTe_fO0fVI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</template>
