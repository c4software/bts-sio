<template><h1 id="application-todo-liste" tabindex="-1"><a class="header-anchor" href="#application-todo-liste" aria-hidden="true">#</a> Application Todo Liste</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce TP nous allons réaliser une application / site web, le but de cette application / site web est de faire de la prise de note de « TODO » ou aussi appelée liste de tâches.</p>
<p>Une TODO List est un procédé qui se veut simple et efficace pour gérer les tâches d'un projet. Ces tâches peuvent être indépendantes ou devoir, au contraire, être accomplies dans un certain ordre.</p>
<p>Voilà la liste des fonctionnalités de l’application que l'on va créer :</p>
<ul>
<li>Lister les tâches.</li>
<li>Ajouter une tâche.</li>
<li>Marquer comme terminé une tâche.</li>
<li>Suppression d'une tâche.</li>
</ul>
<h2 id="technologies" tabindex="-1"><a class="header-anchor" href="#technologies" aria-hidden="true">#</a> Technologies</h2>
<p>Dans ce TP nous allons utiliser les technologies suivantes :</p>
<ul>
<li>Laravel (Framework PHP)</li>
<li>Bootstrap 4 (Framework HTML / CSS / JS)</li>
<li>NodeJS (Utilisation de Webpack)</li>
</ul>
<h2 id="initialiser-le-projet" tabindex="-1"><a class="header-anchor" href="#initialiser-le-projet" aria-hidden="true">#</a> Initialiser le projet</h2>
<p>La première étape lors d'un projet Laravel est la création de la structure avec une simple ligne de commande, dans notre cas :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ laravel new laravel-todo
Crafting application<span class="token punctuation">..</span>.
Loading <span class="token function">composer</span> repositories with package information
Installing dependencies <span class="token punctuation">(</span>including require-dev<span class="token punctuation">)</span> from lock <span class="token function">file</span>
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>✋ Attention, le projet va être créé dans le dossier <code>laravel-todo</code> dans le dossier courant.</p>
<p>La création prend environ 1 minute, un certain nombre de librairies sont téléchargées. Une fois terminé, prenez quelques instants pour regarder les fichiers qui ont été créés.</p>
<h3 id="🤓-questions" tabindex="-1"><a class="header-anchor" href="#🤓-questions" aria-hidden="true">#</a> 🤓 Questions</h3>
<ul>
<li>Où sont les librairies ?</li>
<li>Quel est l'intérêt à votre avis d'utiliser un outil pour initialiser un projet ?</li>
</ul>
<h2 id="configurer-le-projet-le-env" tabindex="-1"><a class="header-anchor" href="#configurer-le-projet-le-env" aria-hidden="true">#</a> Configurer le projet, le .env</h2>
<p>Le projet qui vient d'être créé est « générique » c'est-à-dire qu'il ne possède aucune personnalisation et peut donc servir de base, quel que soit votre développement.</p>
<p>La première étape va donc être d'éditer le fichier <code>.env</code> pour configurer les options de base de votre projet tel que :</p>
<ul>
<li>Le nom</li>
<li>Le type de base de données</li>
<li>…</li>
</ul>
<p>C'est parti !</p>
<h3 id="nom-de-l-application" tabindex="-1"><a class="header-anchor" href="#nom-de-l-application" aria-hidden="true">#</a> Nom de l'application</h3>
<ul>
<li>Todolist</li>
</ul>
<h3 id="base-de-donnees" tabindex="-1"><a class="header-anchor" href="#base-de-donnees" aria-hidden="true">#</a> Base de données</h3>
<p>Pour ne pas avoir à installer un serveur MySQL nous allons utiliser une base de données « local ».</p>
<p>Connaissez-vous le nom d'un type de base de données permettant de travailler en « local » c'est-à-dire sans serveur ?</p>
<Reveal text="Voir la suite du TP">
<p>La réponse est SQLite. SQLite est une base de données de type SQL, mais ne nécessitant pas de serveur, l'ensemble des données est contenu dans un fichier « local ». Pour la créer rien de plus simple il suffit de créer un fichier vide dans le dossier de votre projet fait :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">touch</span> database/database.sqlite
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Attention: Utiliser git-bash pour avoir la commande <code>touch</code></p>
<p>Maintenant que le fichier a été créé nous allons indiquer à Laravel qu'il faut l'utiliser pour cela, éditer le fichier <code>.env</code> et modifier la ligne :</p>
<div class="language-apacheconf ext-apacheconf line-numbers-mode"><pre v-pre class="language-apacheconf"><code>DB_CONNECTION=mysql
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>par :</p>
<div class="language-apacheconf ext-apacheconf line-numbers-mode"><pre v-pre class="language-apacheconf"><code>DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></Reveal>
<h4 id="tester" tabindex="-1"><a class="header-anchor" href="#tester" aria-hidden="true">#</a> Tester</h4>
<p>Vous pouvez maintenant tester votre application / site web. Comme vu en cours, Laravel intègre un serveur de développement ce qui permet de le tester rapidement. Le lancement se fait via la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ php artisan serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="🤓-questions-1" tabindex="-1"><a class="header-anchor" href="#🤓-questions-1" aria-hidden="true">#</a> 🤓 Questions</h4>
<ul>
<li>À votre avis, comment revenir avec une base de données type Mysql ?</li>
<li>Est-il possible d'utiliser les deux types de bases de données (par exemple en production MySQL et en developpement SQLite) ?</li>
<li>SQLite est-il toujours pertinent ?</li>
</ul>
<h3 id="le-reste-du-fichier-env" tabindex="-1"><a class="header-anchor" href="#le-reste-du-fichier-env" aria-hidden="true">#</a> Le reste du fichier .env</h3>
<p>Nous n'allons pas toucher aux autres paramètres, mais certains sont tout de même intéressants. Je vous laisse donc consulter la documentation en ligne de Laravel :</p>
<p><a href="https://laravel.com/docs/5.6/configuration" target="_blank" rel="noopener noreferrer">Consulter en ligne<ExternalLinkIcon/></a></p>
<h2 id="conception-de-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#conception-de-la-base-de-donnees" aria-hidden="true">#</a> Conception de la base de données</h2>
<p>Voilà à quoi va ressembler notre base de données :</p>
<p><img src="@source/tp/laravel/ressources/todos.png" alt="MCD Simple"></p>
<p>🤓 C’est parti ! Tout est prêt, nous pouvons commencer à écrire du code.</p>
<h2 id="creation-de-la-«-migration-»" tabindex="-1"><a class="header-anchor" href="#creation-de-la-«-migration-»" aria-hidden="true">#</a> Création de la « migration »</h2>
<p>Laravel utilise un ORM pour manipuler la base de données. Pour rappel un ORM est</p>
<blockquote>
<p>Un mapping objet-relationnel (en anglais object-relational mapping ou ORM) est une technique de programmation informatique qui crée l'illusion d'une base de données orientée objet à partir d'une base de données relationnelle en définissant des correspondances entre cette base de données et les objets du langage utilisé.</p>
</blockquote>
<p>L'ORM utilisé par Laravel est Eloquent, il est à la fois puissant et relativement simple. Autrement dit avec un ORM dans la plupart des cas vous n'écrivez plus de requête SQL, mais vous manipulez des objets représentant la base de données.</p>
<p>Comme pour la création du projet, la création de la définition de la table « todos » va se faire via une requête dans votre terminal :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:migration create_todos_table --create<span class="token operator">=</span>todos
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>L’option <code>--create=todos</code> permet d’indiquer le nom du modèle de la table à créer.</p>
<p>✋ Le contenu du fichier créé est fictif, il est là pour illustrer comment travailler. Nous allons le modifier pour mettre les informations relatives à notre table.</p>
<p>La commande vient de créer un nouveau fichier dans le dossier <code>database/migration</code>. Dans mon cas le fichier se nomme :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>YYYY_11_09_150442_create_todos_table.php
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Nous allons définir notre schéma (à savoir la définition de la table) pour y ajouter les 2 colonnes qui nous seront utiles <code>texte</code> et <code>termine</code>. L'ORM étant une librairie objet, la définition de nouveaux champs se fait via une méthode, dans notre cas :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token variable">$table</span><span class="token operator">-></span><span class="token keyword type-declaration">string</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$table</span><span class="token operator">-></span><span class="token function">boolean</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'termine'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Vous pouvez ajouter les deux champs dans la méthode <code>up</code> du fichier.</p>
<Reveal text="Voir le fichier avec les nouveaux champs">
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Support<span class="token punctuation">\</span>Facades<span class="token punctuation">\</span>Schema</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Schema<span class="token punctuation">\</span>Blueprint</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Migrations<span class="token punctuation">\</span>Migration</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">CreateTodosTable</span> <span class="token keyword">extends</span> <span class="token class-name">Migration</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Run the migrations.
     *
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token keyword">void</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">up</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name static-context">Schema</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'todos'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token class-name type-declaration">Blueprint</span> <span class="token variable">$table</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token variable">$table</span><span class="token operator">-></span><span class="token function">increments</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'id'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token variable">$table</span><span class="token operator">-></span><span class="token keyword type-declaration">string</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token variable">$table</span><span class="token operator">-></span><span class="token function">boolean</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'termine'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token variable">$table</span><span class="token operator">-></span><span class="token function">timestamps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Reverse the migrations.
     *
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token keyword">void</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">down</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name static-context">Schema</span><span class="token operator">::</span><span class="token function">dropIfExists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'todos'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div></Reveal>
<h3 id="🤓-questions-2" tabindex="-1"><a class="header-anchor" href="#🤓-questions-2" aria-hidden="true">#</a> 🤓 Questions</h3>
<ul>
<li>À quoi correspond la méthode <code>up</code> et <code>down</code> ?</li>
<li>L'ordre des champs est-il important ?</li>
</ul>
<h2 id="creation-en-base" tabindex="-1"><a class="header-anchor" href="#creation-en-base" aria-hidden="true">#</a> Création en base</h2>
<p>Maintenant que le script est terminé, nous allons indiquer à Laravel d'effectuer « la migration » c'est-à-dire de transformer votre définition PHP en instruction SQL pour créer réellement la base de données. Retour dans la ligne de commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ php artisan migrate
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
Migrating: YYYY_09_09_150442_create_todos_table
Migrated:  YYYY_09_09_150442_create_todos_table
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Votre base de données est maintenant prête à être utilisée. Vous pouvez aller voir le contenu grâce à PHPStorm qui est capable (une fois configuré) de requêter une base SQLite.</p>
<p><img src="@source/tp/laravel/ressources/sqlite-phpstorm.png" alt="sqlite">
<img src="@source/tp/laravel/ressources/sqlite1.png" alt="sqlite1">
<img src="@source/tp/laravel/ressources/sqlite2.png" alt="sqlite2">
<img src="@source/tp/laravel/ressources/sqlite3.png" alt="sqlite3"></p>
<h3 id="le-modele" tabindex="-1"><a class="header-anchor" href="#le-modele" aria-hidden="true">#</a> Le modèle</h3>
<p>Maintenant que nous avons fait le script de création / migration, nous allons définir notre modèle.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ php artisan make:model Todos
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>La commande va créer le fichier <code>Todos.php</code> dans le dossier <code>app/Models</code>.</p>
<p>Ajouter dans la class :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">protected</span> <span class="token variable">$fillable</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'termine'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Cette propriété est optionnelle, elle permet vous autorisera plus tard à faire du « mass-assignment » c'est-à-dire à créer un objet « Todos » depuis par exemple le POST HTTP.</p>
<h2 id="le-controller" tabindex="-1"><a class="header-anchor" href="#le-controller" aria-hidden="true">#</a> Le controller</h2>
<p>Maintenant que nous avons la migration et le modèle de notre base de données, nous allons créer le controller. Pour rappel le controller va faire « le lien » entre la base de données et les appels HTTP. C’est ici que nous allons mettre la logique métier de notre application.</p>
<p>Pour commencer, nous allons créer « la structure de base » de notre controller.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ php artisan make:controller TodosController
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Le fichier <code>TodosController.php</code> vient d'être créé dans le chemin suivant <code>app/Http/Controllers/</code>.</p>
<p>Bien ! Notre code est maintenant prêt. Nous allons créer les méthodes permettant la manipulation de notre base de données tout en répondant à nos problématiques d'interface (liste, création, terminer, suppression).</p>
<p>Nous allons maintenant écrire une méthode pour chaque action. Avec les différentes conditions nécessaires au bon fonctionnement de l'application.</p>
<h3 id="corriger-le-chemin-de-la-database" tabindex="-1"><a class="header-anchor" href="#corriger-le-chemin-de-la-database" aria-hidden="true">#</a> Corriger le chemin de la database</h3>
<p>Bizarrerie de Laravel… Il faut maintenant changer le chemin de la base de données pour faire correctement référence au fichier <code>database.sqlite</code> (pour que ça fonctionne depuis votre browser).</p>
<p>Éditer à nouveau le fichier <code>.env</code> pour remplacer :</p>
<div class="language-apacheconf ext-apacheconf line-numbers-mode"><pre v-pre class="language-apacheconf"><code>DB_DATABASE=database/database.sqlite
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>par</p>
<div class="language-apacheconf ext-apacheconf line-numbers-mode"><pre v-pre class="language-apacheconf"><code>DB_DATABASE=../database/database.sqlite
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">PS</p>
<p>Avec une base de données MySQL ce genre de soucis n'existe pas.</p>
</div>
<h3 id="la-methode-«-liste-»" tabindex="-1"><a class="header-anchor" href="#la-methode-«-liste-»" aria-hidden="true">#</a> La méthode « Liste »</h3>
<p>La méthode <code>liste</code> est certainement la plus simple, nous allons faire appel à la méthode <code>all()</code> de Eloquent (ORM pour l’accès à la base de données). Pour ça créez une nouvelle méthode dans la Class <code>TodoController</code> avec le code suivant.</p>
<p>Pour l'instant nous n'allons pas intégrer Éloquent, mais uniquement définir notre méthode.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">liste</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string double-quoted-string">"Liste"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Rien de bien compliqué, comme vous pouvez le voir.</p>
<h3 id="les-autres-methodes" tabindex="-1"><a class="header-anchor" href="#les-autres-methodes" aria-hidden="true">#</a> Les autres méthodes</h3>
<p>✋ Pour l'instant nous allons nous arrêter là pour la partie code PHP. Cette méthode est suffisante pour « tester » le premier template que nous allons écrire.</p>
<h3 id="ajout-route" tabindex="-1"><a class="header-anchor" href="#ajout-route" aria-hidden="true">#</a> Ajout route /</h3>
<p>Nous allons tester la route <code>/</code>, pour ça nous allons remplacer le contenu du fichier <code>routes/web.php</code> par :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/'</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"TodosController@liste"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vous pouvez relancer votre serveur de test, vous devez maintenant voir « Liste ».</p>
<h2 id="creer-les-templates" tabindex="-1"><a class="header-anchor" href="#creer-les-templates" aria-hidden="true">#</a> Créer les templates</h2>
<p>Nous avons donc maintenant :</p>
<ul>
<li>La structure Laravel.</li>
<li>La définition de notre base de données.</li>
<li>Les dépendances clients (bootstrap 4…)</li>
</ul>
<p>Nous allons donc pouvoir commencer la création des templates. L'organisation du code est quelque chose d'important, elle n'est pas à négliger. Un code organisé est un code agréable à rédiger.</p>
<p>Notre vue va être découpée en 3 parties :</p>
<p><img src="@source/tp/laravel/ressources/parties.png" alt="Structure"></p>
<ul>
<li>✋ Pourquoi le découpage en « 3 templates » est-il important ?</li>
<li>Quelle est l'avantage pour le développeur ?</li>
</ul>
<h3 id="le-template-principal" tabindex="-1"><a class="header-anchor" href="#le-template-principal" aria-hidden="true">#</a> Le template principal</h3>
<p>Nous allons commencer par définir notre « Template principal » celui-ci va contenir l'ensemble des éléments partagés sur toutes nos pages à savoir :</p>
<ul>
<li>Les JS</li>
<li>Les CSS</li>
<li>La structure commune</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>csrf-token<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ csrf_token() }}<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>@yield('title')<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ asset(<span class="token punctuation">'</span>css/app.css<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ asset(<span class="token punctuation">'</span>js/app.js<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navbar navbar-expand-md navbar-dark bg-dark fixed-top<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navbar-brand<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ma Todo List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">></span></span>

    @yield('content')
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>Maintenant que nous avons le contenu, nous devons créer un nouveau fichier.</p>
<ul>
<li>Créer un nouveau fichier <code>resources/views/template.blade.php</code></li>
<li>Copier-Coller le HTML dans le fichier.</li>
</ul>
<p>👏👏 Bravo, vous venez de créer votre premier template.</p>
<h4 id="🤓-questions-3" tabindex="-1"><a class="header-anchor" href="#🤓-questions-3" aria-hidden="true">#</a> 🤓 Questions</h4>
<ul>
<li>Pourquoi le fichier est-il nommé <code>….blade.php</code> ?</li>
<li>À quoi correspond <span v-pre> <code>{{ asset('…') }}</code> </span>?</li>
<li>À quoi correspond la directive « yield »? En quoi est-ce très important ?</li>
<li>Est-il possible de définir une « zone » ou d'autres ressources JS / CSS seront insérées lors de l'exécution ? <a href="https://laravel.com/docs/5.6/blade#stacks" target="_blank" rel="noopener noreferrer">Voir la documentation<ExternalLinkIcon/></a></li>
<li>maintenant que vous avez la réponse, ajouter une « stack » pour le script et le style dans l'entête.</li>
</ul>
<Reveal text="Voir la solution">
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    @<span class="token function">stack</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'scripts'</span><span class="token punctuation">)</span>
    @<span class="token function">stack</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'styles'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></Reveal>
<h3 id="tester-1" tabindex="-1"><a class="header-anchor" href="#tester-1" aria-hidden="true">#</a> Tester</h3>
<p>Pour lancer votre application, c'est dans le terminal que ça se passe :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ php artisan serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Une fois lancer <a href="http://127.0.0.1:8000" target="_blank" rel="noopener noreferrer">rendez-vous sur http://127.0.0.1:8000<ExternalLinkIcon/></a>.</p>
<Reveal text="Un soucis non ?">
<p>Rien n’a changé ? C'est normal… Continuons!</p>
</Reveal>
<h2 id="installation-des-dependances-client" tabindex="-1"><a class="header-anchor" href="#installation-des-dependances-client" aria-hidden="true">#</a> Installation des dépendances client</h2>
<p>Maintenant que la partie base de données est prête, nous allons nous occuper de la partie visualisation de notre application / site web. Nous allons utiliser bootstrap pour gérer la problématique d'affichage et de responsive.</p>
<h3 id="ajout-des-libraires" tabindex="-1"><a class="header-anchor" href="#ajout-des-libraires" aria-hidden="true">#</a> Ajout des libraires</h3>
<p>La structure de base de Laravel n'intègre pas Bootsrap, par contre il est possible de l'installer dans votre projet.</p>
<p>La façon la plus rapide est d'intégrer directement dans le <code>&lt;head&gt;</code> de votre projet les librairies suivantes :</p>
<p>Éditer le fichier <code>template.blade.php</code> pour ajouter (dans le <code>&lt;head&gt;</code>):</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span>
  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://code.jquery.com/jquery-3.3.1.slim.min.js<span class="token punctuation">"</span></span>
  <span class="token attr-name">integrity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo<span class="token punctuation">"</span></span>
  <span class="token attr-name">crossorigin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>anonymous<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span>
  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js<span class="token punctuation">"</span></span>
  <span class="token attr-name">integrity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49<span class="token punctuation">"</span></span>
  <span class="token attr-name">crossorigin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>anonymous<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css<span class="token punctuation">"</span></span>
  <span class="token attr-name">integrity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO<span class="token punctuation">"</span></span>
  <span class="token attr-name">crossorigin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>anonymous<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span>
  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js<span class="token punctuation">"</span></span>
  <span class="token attr-name">integrity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy<span class="token punctuation">"</span></span>
  <span class="token attr-name">crossorigin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>anonymous<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>Vous venez d'ajouter Jquery, Bootstrap, et l'ensemble des éléments nécéssaire à son bon fonctionnement. Notre site à également besoin d'une CSS spécifique. Celle-ci doit être ajouté manuellement.</p>
<p>Créer un fichier <code>main.css</code> dans <code>public/css</code>. Mettre le contenu suivant :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">padding-top</span><span class="token punctuation">:</span> 5rem<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">form.add</span> <span class="token punctuation">{</span>
  <span class="token property">padding-bottom</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.pull-right</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.action > .btn</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 1px 7px 1px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.oi</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> small<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>Ajouter à nouveau cette CSS dans le <code>&lt;head&gt;</code> de votre site :</p>
<div class="language-HTML ext-HTML line-numbers-mode"><pre v-pre class="language-HTML"><code>&lt;link href=&quot;{{ asset('css/main.css') }}&quot; rel=&quot;stylesheet&quot; /&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette solution n'est pas la meilleure, malheureusement un bug sur les PC du lycée nous empêche d'utiliser NodeJS + npm.</p>
<h4 id="modifications-demandees" tabindex="-1"><a class="header-anchor" href="#modifications-demandees" aria-hidden="true">#</a> Modifications demandées</h4>
<p>✋ Cette modification n'est nécessaire que dans le cas ou vous n'utilisez <strong>pas</strong> NodeJS + NPM.</p>
<p>Comme vous l'avez vu avec le fichier <code>main.css</code> il est possible d'avoir un CSS / JS en local dans le dossier public.</p>
<ul>
<li>Télécharger l'ensemble de librairies http / https (css + js) dans le dossier public (attention à bien les ranger) et les utiliser dans votre head.</li>
</ul>
<h3 id="question" tabindex="-1"><a class="header-anchor" href="#question" aria-hidden="true">#</a> Question</h3>
<ul>
<li>Pourquoi est-ce plus sécurisé ?</li>
<li>Pourquoi la solution des CDN n'est finalement pas si « non sécurisée » ?</li>
</ul>
<h3 id="liste-des-todos" tabindex="-1"><a class="header-anchor" href="#liste-des-todos" aria-hidden="true">#</a> Liste des todos</h3>
<p>Maintenant que nous avons défini notre template de base, nous allons pouvoir définir notre page principale, la page « liste des todos ». Celle-ci va ressembler à :</p>
<p><img src="@source/tp/laravel/ressources/liste.png" alt="liste"></p>
<p>Avant de commencer la réalisation de ce template, regardons ce que l'on peut y voir :</p>
<ul>
<li>Un formulaire « form »</li>
<li>Une « liste »</li>
</ul>
<p>Nous allons donc avoir besoin de composant bootstrap. Première étape regarder <a href="https://getbootstrap.com/docs/4.0/components/alerts/" target="_blank" rel="noopener noreferrer">la documentation de bootsrap !<ExternalLinkIcon/></a></p>
<h4 id="🤓-questions-4" tabindex="-1"><a class="header-anchor" href="#🤓-questions-4" aria-hidden="true">#</a> 🤓 Questions</h4>
<ul>
<li>Quels composants (components) allons nous avoir besoin ?</li>
<li>Est-ce les seuls ?</li>
</ul>
<h4 id="definition-du-template-«-liste-»-«-home-»" tabindex="-1"><a class="header-anchor" href="#definition-du-template-«-liste-»-«-home-»" aria-hidden="true">#</a> Définition du template « Liste » / « Home »</h4>
<p>Nous allons créer un 2nd template celui qui va être chargé d'afficher la liste des todos. Créér un nouveau fichier <code>resources/views/home.blade.php</code> et y mettre le contenu suivant :</p>
<div class="language-HTML ext-HTML line-numbers-mode"><pre v-pre class="language-HTML"><code>@extends(&quot;template&quot;) @section(&quot;title&quot;, &quot;Ma Todo List&quot;) @section(&quot;content&quot;)
&lt;div class=&quot;container&quot;&gt;
  &lt;div class=&quot;card&quot;&gt;
    &lt;div class=&quot;card-body&quot;&gt;
      &lt;!-- Action --&gt;
      &lt;form action=&quot;/action/add&quot; method=&quot;post&quot; class=&quot;add&quot;&gt;
        &lt;div class=&quot;input-group&quot;&gt;
          &lt;span class=&quot;input-group-addon&quot; id=&quot;basic-addon1&quot;
            &gt;&lt;span class=&quot;oi oi-pencil&quot;&gt;&lt;/span
          &gt;&lt;/span&gt;
          &lt;input
            id=&quot;texte&quot;
            name=&quot;texte&quot;
            type=&quot;text&quot;
            class=&quot;form-control&quot;
            placeholder=&quot;Prendre une note…&quot;
            aria-label=&quot;My new idea&quot;
            aria-describedby=&quot;basic-addon1&quot;
          /&gt;
        &lt;/div&gt;
      &lt;/form&gt;

      &lt;!-- Liste --&gt;
      &lt;ul class=&quot;list-group&quot;&gt;
        @forelse ($todos as $todo)
        &lt;li class=&quot;list-group-item&quot;&gt;
          &lt;span&gt;{{ $todo-&gt;texte }}&lt;/span&gt;
          &lt;!-- Action à ajouter pour Terminer et supprimer --&gt;
        &lt;/li&gt;
        @empty
        &lt;li class=&quot;list-group-item text-center&quot;&gt;C'est vide !&lt;/li&gt;
        @endforelse
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
@endsection
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h3 id="🤓-questions-5" tabindex="-1"><a class="header-anchor" href="#🤓-questions-5" aria-hidden="true">#</a> 🤓 Questions</h3>
<ul>
<li><code>@extends</code> ? À quoi sert cette directive, pourquoi « template »?</li>
<li>Modifier le titre afficher dans la barre.</li>
<li>À quoi correspond le <code>@forelse … @empty … @endforelse</code>?</li>
</ul>
<h2 id="et-maintenant" tabindex="-1"><a class="header-anchor" href="#et-maintenant" aria-hidden="true">#</a> Et maintenant ?</h2>
<p>Bien… récupitulons ! Nous avons :</p>
<ul>
<li>Le modèle.</li>
<li>Le contrôleur.</li>
<li>Les templates (template et home).</li>
</ul>
<p>Il faut maintenant assembler l'ensemble pour que votre page s'affiche lors d'une requête.</p>
<h2 id="tester-2" tabindex="-1"><a class="header-anchor" href="#tester-2" aria-hidden="true">#</a> Tester</h2>
<p>Vous voyez « Liste » ? C'est OK !</p>
<h2 id="affichage-de-la-liste" tabindex="-1"><a class="header-anchor" href="#affichage-de-la-liste" aria-hidden="true">#</a> Affichage de la liste</h2>
<p>Bon afficher « Liste » c'est un bon début… Modifier la méthode <code>liste()</code> pour qu'elle ressemble à :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"home"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string double-quoted-string">"todos"</span> <span class="token operator">=></span> <span class="token class-name static-context">Todos</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="tester-3" tabindex="-1"><a class="header-anchor" href="#tester-3" aria-hidden="true">#</a> Tester</h2>
<p>La page s'affiche ? Super !</p>
<ul>
<li>Ajouter une entrée « à la main » grâce à l'explorateur de base de données de PHPStorm.</li>
</ul>
<p>Rafraichissez la page, vous devez maintenant voir votre texte 😎.</p>
<h2 id="action-d-ajout" tabindex="-1"><a class="header-anchor" href="#action-d-ajout" aria-hidden="true">#</a> Action d'ajout</h2>
<p>Maintenant que nous avons implémenté la liste, nous allons pouvoir faire le code pour la partie « ajout d'une tâche ». La méthodologie sera la même que pour la liste à savoir :</p>
<ul>
<li>Ajout du code dans le contrôleur.</li>
<li>Ajout de la route.</li>
<li>Modification du template pour implémenter la fonctionnalité.</li>
</ul>
<h3 id="le-controleur" tabindex="-1"><a class="header-anchor" href="#le-controleur" aria-hidden="true">#</a> Le contrôleur</h3>
<p>Nous allons faire un mapping automatique entre la requête HTTP et le modèle <code>Todos</code></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">saveTodo</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name static-context">Todos</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token operator">-></span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Que va-t-il se passer lors de l’appel ? L’objet <code>$request</code> contiens tous les paramètres de l’appel HTTP, la méthode <code>all()</code> permets de les récupérer. L’objet <code>Todos</code> possède une méthode permettant de créer un nouvel enregistrement en base de données. Les valeurs passées en paramètre de <code>create()</code> permettre de renseigner automatiquement les champs en base de données.</p>
<p>✋ Tester l'ajout. Normalement, ça ne doit pas fonctionner… Pourquoi ? Tout simplement, car nous ne spécifions pas l'ensemble des champs nécessaire à la création de notre objet.</p>
<ul>
<li>Quelle est l'autre solution possible ?</li>
</ul>
<Reveal text="Voir la solution">
La première approche est la plus rapide, mais elle sous-entend que tous les paramètres soient bien initialisés dans « l’input » HTTP. Dans cette version la méthode est plus complète et gère la création de l’objet Todos manuellement, en récupérant les différents éléments dans la requête HTTP.
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">saveTodo</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$texte</span> <span class="token operator">=</span> <span class="token variable">$request</span><span class="token operator">-></span><span class="token function">input</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$texte</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Todos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token variable">$todo</span><span class="token operator">-></span><span class="token property">texte</span> <span class="token operator">=</span> <span class="token variable">$texte</span><span class="token punctuation">;</span>
      <span class="token variable">$todo</span><span class="token operator">-></span><span class="token property">termine</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      <span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></Reveal>
<p>Et c'est tout ! Simple non ?</p>
<h3 id="la-route" tabindex="-1"><a class="header-anchor" href="#la-route" aria-hidden="true">#</a> La Route</h3>
<p>Pour la route modifier le fichier <code>routes/web.php</code> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Controllers<span class="token punctuation">\</span>TodosController</span><span class="token punctuation">;</span>

<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/action/add'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token class-name static-context">TodosController</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"saveTodo"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="🤓-questions-6" tabindex="-1"><a class="header-anchor" href="#🤓-questions-6" aria-hidden="true">#</a> 🤓 Questions</h4>
<ul>
<li>À quoi correspond le mot-clé « post » ?</li>
<li>Que se passe-t-il si on fait un appel de type GET (ou PUT, …) ?</li>
</ul>
<h4 id="tester-4" tabindex="-1"><a class="header-anchor" href="#tester-4" aria-hidden="true">#</a> Tester</h4>
<p>Maintenant que nous avons notre action d'ajout, nous allons pouvoir tester notre Todo List réellement.</p>
<ul>
<li>Démarrer votre serveur de test (<code>php artisan serve</code>).</li>
<li>Ajouter une nouvelle todo dans l'interface.</li>
<li>Vous devez avoir une erreur 419. À quoi correspond-elle ?</li>
</ul>
<h4 id="correction-de-l-erreur-419" tabindex="-1"><a class="header-anchor" href="#correction-de-l-erreur-419" aria-hidden="true">#</a> Correction de l'erreur 419</h4>
<p>L'erreur 419 indique que votre Token <code>CSRF</code> (antirejeu) est expiré, ou plutôt dans notre cas que vous ne l'avez pas fourni. C'est une sécurité intégrée à Laravel pour l'ensemble des requêtes POST qui arrive dans votre code.</p>
<p>Nous devons donc ajouter un input « caché » dans notre formulaire pour envoyer en plus du texte une valeur dite de sécurité.</p>
<p>Modifier le template <code>home.blade.php</code> pour ajouter le code suivant dans la partie <code>&lt;form&gt;</code> :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;form […]>
@csrf &lt;!-- &lt;&lt; L'annotation ici ! -->
[…]
&lt;/form>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>🤓 Oui, oui, c'est juste ça.</p>
<h4 id="reteste" tabindex="-1"><a class="header-anchor" href="#reteste" aria-hidden="true">#</a> Retesté</h4>
<p>Normalement c'est ok !</p>
<p><img src="@source/tp/laravel/ressources/vide.png" alt="Vide">
<img src="@source/tp/laravel/ressources/message1.png" alt="avec message 1"></p>
<h2 id="action-marquer-comme-termine" tabindex="-1"><a class="header-anchor" href="#action-marquer-comme-termine" aria-hidden="true">#</a> Action : marquer comme terminé</h2>
<p>Pour l’action terminée, nous allons devoir updater un enregistrement en base de données, pour ça nous allons le récupérer puis mettre le <code>boolean</code> <code>termine</code> à 1.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">markAsDone</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$todo</span>  <span class="token operator">=</span> <span class="token class-name static-context">Todos</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$todo</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$todo</span><span class="token operator">-></span><span class="token property">termine</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="route" tabindex="-1"><a class="header-anchor" href="#route" aria-hidden="true">#</a> Route</h3>
<p>Ajouter une route de type <code>get</code> avec un paramètre nommé <code>{id}</code> dans le fichier <code>routes/web.php</code>.</p>
<p>Le lien doit-être : <code>/action/done/{id}</code> et la méthode dans le contrôleur <code>TodosController@markAsDone</code> en vous inspirant des exemples précédents ajouter la bonne instruction dans le fichier <code>routes/web.php</code>.</p>
<h2 id="action-de-suppression" tabindex="-1"><a class="header-anchor" href="#action-de-suppression" aria-hidden="true">#</a> Action de suppression</h2>
<p>Pour la partie suppression, nous allons devoir dans un premier temps récupérer la todo par son ID.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">deleteTodo</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$todo</span>  <span class="token operator">=</span> <span class="token class-name static-context">Todos</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$todo</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="route-1" tabindex="-1"><a class="header-anchor" href="#route-1" aria-hidden="true">#</a> Route</h3>
<p>Ajouter une route de type <code>get</code> avec un paramètre nommé <code>{id}</code> dans le fichier <code>routes/web.php</code>.</p>
<p>Le lien doit-être : <code>/action/delete/{id}</code> et la méthode dans le contrôleur <code>TodosController@deleteTodo</code> en vous inspirant des exemples précédents ajouter la bonne instruction dans le fichier <code>routes/web.php</code>.</p>
<h4 id="questions" tabindex="-1"><a class="header-anchor" href="#questions" aria-hidden="true">#</a> Questions</h4>
<ul>
<li>Un <code>delete</code> de type <code>get</code> est-ce normal ?</li>
<li>Quelle est l'autre solution ?</li>
<li>Pourquoi dans notre cas c'est « la seule solution » ?</li>
</ul>
<h2 id="ajouter-les-actions-dans-le-template" tabindex="-1"><a class="header-anchor" href="#ajouter-les-actions-dans-le-template" aria-hidden="true">#</a> Ajouter les actions dans le template</h2>
<p>Maintenant que nous avons déclaré nos « 3 actions » dans notre contrôleur (et dans le fichier de route) nous allons les utiliser dans notre template « home » voici les étapes :</p>
<ul>
<li>Éditer le fichier <code>resources/views/home.blade.php</code>.</li>
<li>Vérifier l'URL de l'action de votre formulaire. (<code>« /add »</code>)</li>
<li>Ajouter sur chaque ligne de la boucle « foreach » deux liens qui vont « supprimer » et « terminer ».</li>
</ul>
<p>Aide :</p>
<p>Pour accéder à une variable exemple <code>id</code> : <code>$todo-&gt;id</code>.</p>
<p>Exemple <span v-pre><code>&lt;a href=&quot;lien{{ $todo-&gt;id }}&quot;&gt;Terminer&lt;/a&gt;</code> </span></p>
<h2 id="ajout-d-une-2nd-page" tabindex="-1"><a class="header-anchor" href="#ajout-d-une-2nd-page" aria-hidden="true">#</a> Ajout d'une 2nd page</h2>
<p>Ajouter une nouvelle page dans votre site web cette page sera la page « À propos », aucune aide autre que :</p>
<ul>
<li>Route.</li>
<li>Méthode dans le contrôleur.</li>
<li>Template qui « @extends » du gabarit / template de base.</li>
<li>Ajouter un lien pour accéder à cette page dans le header du site.</li>
</ul>
<h2 id="evolution-souhaitee-nommer-les-routes" tabindex="-1"><a class="header-anchor" href="#evolution-souhaitee-nommer-les-routes" aria-hidden="true">#</a> Évolution souhaitée : Nommer les routes</h2>
<p>Comme vous l'avez constaté, nous utilisons les routes comme une simple URL. Avec Laravel il est possible de faire mieux que ça ! Il est possible de nommer les routes (exemple <code>todo.save</code>) pour les utiliser directement dans notre template. Ça va permettre d'améliorer votre code (changement de contrôleur plus simple par exemple) et surtout de le rendre plus lisible.</p>
<h3 id="modifier-le-fichier-route" tabindex="-1"><a class="header-anchor" href="#modifier-le-fichier-route" aria-hidden="true">#</a> Modifier le fichier route</h3>
<p>Éditer le fichier <code>routes/web.php</code> pour remplacer le contenu par :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Support<span class="token punctuation">\</span>Facades<span class="token punctuation">\</span>Route</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Controllers<span class="token punctuation">\</span>TodosController</span><span class="token punctuation">;</span>

<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token class-name static-context">TodosController</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"liste"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"todo.list"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/action/add'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token class-name static-context">TodosController</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"saveTodo"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'todo.save'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/action/done/{id}'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token class-name static-context">TodosController</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"markAsDone"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'todo.done'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/action/delete/{id}'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token class-name static-context">TodosController</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"deleteTodo"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'todo.delete'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul>
<li>Avez-vous vu la différence ? Des <code>-&gt;name(&quot;…&quot;)</code> sont en plus, vos routes sont maintenant nommées.</li>
</ul>
<h3 id="editer-votre-template-«-home-»" tabindex="-1"><a class="header-anchor" href="#editer-votre-template-«-home-»" aria-hidden="true">#</a> Éditer votre template « home »</h3>
<p>Maintenant que nous avons édité nos routes, il faut les utiliser dans le template pour ça modifier les différents liens (dans le form et dans les <code>&lt;a&gt;</code> d'action) :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>[…]
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ route(<span class="token punctuation">'</span>todo.save<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>add<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  […]

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ route(<span class="token punctuation">'</span>todo.done<span class="token punctuation">'</span>, [<span class="token punctuation">'</span>id<span class="token punctuation">'</span> => $todo->id]) }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>[…]<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ route(<span class="token punctuation">'</span>todo.delete<span class="token punctuation">'</span>, [<span class="token punctuation">'</span>id<span class="token punctuation">'</span> => $todo->id]) }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>[…]<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul>
<li>Avez-vous vu la différence ?</li>
</ul>
<h3 id="utilisation-dans-le-controleur" tabindex="-1"><a class="header-anchor" href="#utilisation-dans-le-controleur" aria-hidden="true">#</a> Utilisation dans le contrôleur</h3>
<p>Il est également possible de les utiliser dans le contrôleur via la directive :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">return</span> <span class="token function">redirect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'todo.list'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Modifier votre code pour les utiliser.</p>
<h3 id="🤓-question" tabindex="-1"><a class="header-anchor" href="#🤓-question" aria-hidden="true">#</a> 🤓 Question</h3>
<ul>
<li>Quel est l'avantage d'utiliser les routes nommées ?</li>
</ul>
<h2 id="evolution-souhaitee-ajout-de-controle" tabindex="-1"><a class="header-anchor" href="#evolution-souhaitee-ajout-de-controle" aria-hidden="true">#</a> Évolution souhaitée : Ajout de contrôle</h2>
<p>Seuls les <code>Todos</code> marqués comme terminer peuvent être supprimés, il faudra donc contrôler l’état avant de faire le <code>delete()</code> en base de données.</p>
<ul>
<li>Modifier la méthode <code>deleteTodo</code> contrôleur pour ajouter la règle de gestion (Indice <code>$todo-&gt;termine</code>)</li>
<li>Ajouter la directive <code>@if</code> dans le template afficher uniquement les bonnes actions en fonction de l'état du todo. <a href="https://laravel.com/docs/5.7/blade#if-statements" target="_blank" rel="noopener noreferrer">Voir la documentation du if avec blade<ExternalLinkIcon/></a></li>
<li>Pour les boutons d'actions, utilisez des icônes :
<ul>
<li>Exemple <a href="https://fontawesome.com/how-to-use/on-the-web/setup/getting-started?using=web-fonts-with-css" target="_blank" rel="noopener noreferrer">fontawesome<ExternalLinkIcon/></a></li>
<li>Choisir <a href="https://fontawesome.com/icons?d=gallery" target="_blank" rel="noopener noreferrer">une icône<ExternalLinkIcon/></a></li>
<li>Utilisation : <code>&lt;i class=&quot;fas fa-stroopwafel&quot;&gt;&lt;/i&gt;</code></li>
</ul>
</li>
<li>« Encapsuler » votre icône autour d'un <code>a</code> exemple <span v-pre><code>&lt;a href=&quot;/actions/done/{{$todo-&gt;id}}&quot; class=&quot;btn btn-success&quot;&gt;&lt;i class=&quot;fas fa-check&quot;&gt;&lt;/i&gt;&lt;/a&gt;</code></span></li>
</ul>
<h2 id="evolution-souhaitee-message-en-cas-d-erreur" tabindex="-1"><a class="header-anchor" href="#evolution-souhaitee-message-en-cas-d-erreur" aria-hidden="true">#</a> Évolution souhaitée : Message en cas d'erreur</h2>
<p>Avertir l'utilisateur en cas d'erreur est important! Comme vous l'avez constaté, aucune gestion de message d'erreur n'est présente dans le contrôleur. Implémenter des messages (basique) grâce à l'aide suivante :</p>
<h3 id="ajouter-un-message-a-afficher" tabindex="-1"><a class="header-anchor" href="#ajouter-un-message-a-afficher" aria-hidden="true">#</a> Ajouter un message à afficher</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token punctuation">[</span>…<span class="token punctuation">]</span>
<span class="token class-name static-context">Session</span><span class="token operator">::</span><span class="token function">flash</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'message'</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"Message d'erreur de traitement à définir."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Ou</span>
<span class="token variable">$request</span><span class="token operator">-></span><span class="token function">session</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">flash</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'message'</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"Message d'erreur de traitement à définir."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="afficher-le-message-dans-votre-template" tabindex="-1"><a class="header-anchor" href="#afficher-le-message-dans-votre-template" aria-hidden="true">#</a> Afficher le message dans votre template</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>@if(Session::has('message'))
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>alert alert-danger<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ Session::get('message') }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
@endif
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><a href="https://laravel.com/docs/5.6/session#flash-data" target="_blank" rel="noopener noreferrer">Explication sur la méthode Flash<ExternalLinkIcon/></a></p>
<h3 id="ajout-des-categories" tabindex="-1"><a class="header-anchor" href="#ajout-des-categories" aria-hidden="true">#</a> Ajout des catégories</h3>
<p>Actuellement votre liste de Todo n'est pas catégorisée. Nous allons donc ajouter :</p>
<ul>
<li>Un nouveau <code>modèle</code> nommé <code>Categorie</code>. (<code>id</code>, <code>nom</code>)</li>
<li>Ajouter une relation entre <code>Todos</code> et <code>Categories</code>. <a href="https://laravel.com/docs/5.8/eloquent-relationships#one-to-one" target="_blank" rel="noopener noreferrer">De Type One To One<ExternalLinkIcon/></a></li>
</ul>
<p>En modifiant Model <code>Todos</code> pour y ajouter :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>  <span class="token comment">// …</span>
  <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">categorie</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">hasOne</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'App\Categorie'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// …</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li>Modifier votre base de données (grâce à une nouvelle migration) pour ajoute une clé étrangère vers une table catégorie</li>
</ul>
<p>⚠️ Éloquent détermine automatiquement la clé étrangère en fonction du nom. Dans la migration vous DEVEZ nommer la clé étrangère <code>categorie_id</code>.</p>
<p>Vous devez donc écrire une migration avec :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Schema</span><span class="token operator">::</span><span class="token function">table</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'todos'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token class-name type-declaration">Blueprint</span> <span class="token variable">$table</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token variable">$table</span><span class="token operator">-></span><span class="token function">unsignedBigInteger</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'categorie_id'</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">nullable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">unsigned</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token variable">$table</span><span class="token operator">-></span><span class="token function">foreign</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'categorie_id'</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">references</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'id'</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'todos'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul>
<li>Créer une nouvelle table dans une autre migration pour y ajouter la définition de la table Categorie (<code>id</code>, <code>nom</code>, <code>timestamps()</code>)</li>
</ul>
<p><a href="https://laravel.com/docs/5.8/migrations#foreign-key-constraints" target="_blank" rel="noopener noreferrer">Pour plus d'information<ExternalLinkIcon/></a></p>
<h3 id="ajouter-une-page-pour-creer-des-categories" tabindex="-1"><a class="header-anchor" href="#ajouter-une-page-pour-creer-des-categories" aria-hidden="true">#</a> Ajouter une page pour créer des catégories</h3>
<p>Ajouter un nouveau contrôleur pour gérer la partie catégorie (Liste + Ajout)</p>
<h3 id="selection-de-la-categorie" tabindex="-1"><a class="header-anchor" href="#selection-de-la-categorie" aria-hidden="true">#</a> Sélection de la catégorie</h3>
<p>Ajouter dans la page principale (<code>/</code>) une liste des catégories présente en base de données. Cette liste doit être à côté du champ de saisie.</p>
<h3 id="migration-vers-mysql-mariadb" tabindex="-1"><a class="header-anchor" href="#migration-vers-mysql-mariadb" aria-hidden="true">#</a> Migration vers MySQL / MariaDB</h3>
<p>Maintenant que nous avons testé SQlite, nous allons migrer vers un « vrai système de base de données ». Modifier la configuration de votre site internet pour utiliser MySQL.</p>
</template>
