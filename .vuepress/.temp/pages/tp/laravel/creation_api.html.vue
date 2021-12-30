<template><h1 id="todolist-re-ecrire-les-api-du-projet" tabindex="-1"><a class="header-anchor" href="#todolist-re-ecrire-les-api-du-projet" aria-hidden="true">#</a> TodoList : (Ré-)écrire les API du projet</h1>
<p>Le but de notre application est de créer des API Rest qui vont exposer la gestion de nos <code>todos</code> définie en base de données</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce TP nous allons voir la création d’API pour le projet « TodoList ». Nous allons donc créer un nouveau projet avec Laravel pour créer des API qui permettront de :</p>
<ul>
<li>Lister les éléments dans la TodoList.</li>
<li>Créer un nouvel élément dans la TodoList.</li>
<li>Marquer un élément comme terminé.</li>
<li>Supprimer un élément.</li>
</ul>
<h2 id="creation-du-projet" tabindex="-1"><a class="header-anchor" href="#creation-du-projet" aria-hidden="true">#</a> Création du projet</h2>
<p>Pour créer des API, Laravel est un peu « lourd » (dans notre cas bien évidemment, dans certains cas le choix est complètement justifié). Nous allons donc utiliser son petit frère Lumen. Lumen est un microframework reprenant les concepts de Laravel (et les mêmes briques), mais en beaucoup plus petit et donc plus adapté à des micro-projets comme celui-ci.</p>
<h2 id="installer-lumen" tabindex="-1"><a class="header-anchor" href="#installer-lumen" aria-hidden="true">#</a> Installer Lumen</h2>
<p>L’installation de Lumen est similaire à celle de Laravel</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">composer</span> global require <span class="token string">"laravel/lumen-installer"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="creer-le-nouveau-projet" tabindex="-1"><a class="header-anchor" href="#creer-le-nouveau-projet" aria-hidden="true">#</a> Créer le nouveau Projet</h2>
<p>Maintenant que vous avez installé Lumen nous allons pouvoir utiliser la ligne de commande pour créer un nouveau projet :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>lumen new api-todo
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>✋ Attention, le projet va être créé dans le dossier <code>api-todo</code> dans le dossier courant.</p>
<h2 id="initialisation" tabindex="-1"><a class="header-anchor" href="#initialisation" aria-hidden="true">#</a> Initialisation</h2>
<p>Contrairement à un projet Laravel, les dépendances <code>composer</code> ne sont pas installées par défaut. Il faut donc les installer via la ligne de commande en faisant :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">composer</span> <span class="token function">install</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Le projet n’étant pas initialisé nous allons devoir jouer quelques commandes pour terminer l’installation :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mv</span> .env.example .env
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>PS Sous Windows c'est :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>move .env.example .env
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Contrairement à Laravel, Lumen ne contient pas l’outil permettant d’initialiser la « secret key » nécessaire à la sécurisation de votre application. Je vous propose par exemple de passer via la commande suivante :</p>
<p>PS Sous Windows la commande ne fonctionnera pas.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openssl rand -base64 <span class="token number">24</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>(Vous pouvez également faire du monkey typing… et saisir une chaine de caractère aléatoire avec votre clavier…)</p>
<p>éditer le fichier <code>.env</code> pour y renseigner la valeur obtenue :</p>
<ul>
<li><code>APP_KEY</code> (exemple <code>APP_KEY=&quot;I82xtis8Tsur2&quot;</code>)</li>
</ul>
<h2 id="tester-votre-application" tabindex="-1"><a class="header-anchor" href="#tester-votre-application" aria-hidden="true">#</a> Tester votre application</h2>
<p>Pour tester votre application avec Lumen sur votre poste, c’est un peu plus « complexe » qu’avec Laravel. Vous devez saisir la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php -S localhost:8000 -t ./public
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Une fois lancé vous avez un serveur Web qui écoute sur <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer">le port 8000<ExternalLinkIcon/></a></p>
<p>🤔 Pourquoi Lumen n’intègre pas la commande <code>php artisan serve</code> ? La raison est plutôt logique, Lumen étant un <code>micro framework</code> il n’embarque pas toutes les options de base de Laravel. Options qui peuvent d’ailleurs simplement être remplacées.</p>
<h2 id="gestion-de-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#gestion-de-la-base-de-donnees" aria-hidden="true">#</a> Gestion de la base de données</h2>
<p>Pour la démonstration nous allons utiliser SQLite au lieu de MySQL. Pour ça rien de plus simple, Lumen utilise PDO il suffit donc de changer la configuration par défaut dans le fichier <code>.env</code>. Modifier le fichier pour qu’il ressemble à celui-ci.</p>
<div class="language-apacheconf ext-apacheconf line-numbers-mode"><pre v-pre class="language-apacheconf"><code>APP_ENV=local
APP_DEBUG=true
APP_KEY=<span class="token string">"CHANGEME"</span>
APP_TIMEZONE=UTC

DB_CONNECTION=sqlite
<span class="token comment"># DB_HOST=127.0.0.1</span>
<span class="token comment"># DB_PORT=3306</span>
<span class="token comment"># DB_DATABASE=homestead</span>
<span class="token comment"># DB_USERNAME=homestead</span>
<span class="token comment"># DB_PASSWORD=secret</span>

CACHE_DRIVER=file
QUEUE_DRIVER=sync
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>Par défaut, la configuration de base de SQLite dans Lumen est l’utilisation d’une base de données nommée <code>database.sqlite</code> il faut donc créer un fichier vide qui recevra les données :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">touch</span> database/database.sqlite
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Sous Windows la commande <code>touch</code> n'existe pas. Il faut créer un fichier <code>vide (sans retour à la ligne)</code> dans votre IDE / éditeur de texte.</p>
<p>C’est parti ! Tout est prêt, nous pouvons commencer à écrire du code.</p>
<h3 id="le-script-de-creation-migration" tabindex="-1"><a class="header-anchor" href="#le-script-de-creation-migration" aria-hidden="true">#</a> Le script de création / migration</h3>
<p>Contrairement à la première version de notre application, nous allons stocker les données dans une base de données. Qui dit base de données dit « ORM » et donc mapping objet. Pour rappel un ORM :</p>
<blockquote>
<p>Un mapping objet-relationnel (en anglais object-relational mapping ou ORM) est une technique de programmation informatique qui crée l'illusion d'une base de données orientée objet à partir d'une base de données relationnelle en définissant des correspondances entre cette base de données et les objets du langage utilisé.</p>
</blockquote>
<p>Pour rappel, le but de notre application est de créer des API Rest qui vont exposer la gestion de nos <code>todos</code> définie en base de données. La première étape est de créer via la ligne de commande le « script » qui initialisera la structure de votre base de données.</p>
<p>L’option <code>--create=todos</code> permet d’indiquer le nom de la table à créer</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:migration create_todos_table --create<span class="token operator">=</span>todos
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>✋ Le contenu du fichier est fictif, il est là pour illustrer comment travailler. Nous allons le modifier pour mettre les informations relatives à notre table.</p>
<p>La commande a créé un nouveau fichier (dans mon cas) : <code>database/migration/2017_11_02_205700_create_todos_table.php</code></p>
<p>Dans le fichier créé nous allons définir notre schéma (à savoir la définition de la table) pour ajouter les 2 colonnes qui nous seront utiles <code>texte</code> et <code>termine</code>. Le fichier après modification doit ressembler à :</p>
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
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>Maintenant que le script est terminé, nous pouvons lancer la commande de migration :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan migrate
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Une fois cette commande lancée, Lumen va créer la structure de base de votre base de données.</p>
<h3 id="le-modele" tabindex="-1"><a class="header-anchor" href="#le-modele" aria-hidden="true">#</a> Le modèle</h3>
<p>Maintenant que nous avons fait le script de création / migration, nous allons définir notre modèle. Pour ça créez un fichier <code>Todos.php</code> dans le dossier <code>app/</code> avec le contenu suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">namespace</span> <span class="token package">App</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Eloquent<span class="token punctuation">\</span>Model</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Todos</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token variable">$fillable</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'termine'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>le <code>$fillable</code> définie les propriétés qui doivent êtres automatiquement remplis par Eloquent (l’ORM) lors de l’exécution du code.</p>
<h2 id="le-controller" tabindex="-1"><a class="header-anchor" href="#le-controller" aria-hidden="true">#</a> Le controller</h2>
<p>Maintenant que nous avons notre base de données, nous allons créer le contrôleur. Pour rappel le controller va faire « le lien » entre la base de données et les appels HTTP. C’est ici que nous allons mettre la logique métier de nos API.</p>
<p>Pour commencer, nous allons créer « la structure de base » de notre contrôleur. Pour ça créez le fichier <code>TodosController.php</code> dans le chemin suivant <code>app/Http/Controllers/</code> et mettez y le contenu suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Controllers</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\</span>Todos</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Controllers<span class="token punctuation">\</span>Controller</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Request</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name-definition class-name">TodosController</span> <span class="token keyword">extends</span> <span class="token class-name">Controller</span><span class="token punctuation">{</span>
    <span class="token comment">// C’est ici que seront nos méthodes</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Bien ! Notre code est maintenant prêt. Nous allons créer les méthodes permettant la manipulation de notre base de données tout en répondant à nos API bien évidemment (liste, création, terminer, suppression).</p>
<p>Nous allons maintenant écrire une méthode pour chaque action. Avec les différentes conditions nécessaires au bon fonctionnement de votre application.</p>
<h3 id="liste" tabindex="-1"><a class="header-anchor" href="#liste" aria-hidden="true">#</a> Liste</h3>
<p>La méthode <code>liste</code> est certainement la plus simple, nous allons simplement faire appel à la méthode <code>all()</code> de Eloquent (ORM pour l’accès à la base de données). Pour ça créez une nouvelle méthode dans la Class <code>TodoController</code> avec le code suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$todos</span>  <span class="token operator">=</span> <span class="token class-name static-context">Todos</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token variable">$todos</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Rien de bien compliqué, comme vous pouvez le voir le <code>response()-&gt;json(…)</code> permet de créer une réponse au format JSON pour votre API (que l’on utilisera plus tard au moment de la mise en place des routes).</p>
<h3 id="creation" tabindex="-1"><a class="header-anchor" href="#creation" aria-hidden="true">#</a> Création</h3>
<p>Pour la partie création, nous allons faire un mapping automatique entre la requête HTTP et le modèle <code>Todos</code></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">saveTodo</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token class-name static-context">Todos</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token operator">-></span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token variable">$todo</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Que va-t-il se passer lors de l’appel ? L’objet <code>$request</code> contiens tous les paramètres de l’appel HTTP, la méthode <code>all()</code> permets de les récupérer. L’objet <code>Todos</code> possède une méthode permettant de créer un nouvel enregistrement en base de données. Les valeurs passées en paramètre de <code>create()</code> permettre de renseigner automatiquement les champs en base de données.</p>
<h3 id="creation-version-alternative" tabindex="-1"><a class="header-anchor" href="#creation-version-alternative" aria-hidden="true">#</a> Création, version alternative</h3>
<p>La première approche est la plus rapide, mais elle sous-entend que tous les paramètres soient bien initialisés dans « l’input » HTTP. Dans cette version la méthode est plus complète et gère la création de l’objet Todo manuellement en récupérant les différents éléments dans la requête HTTP</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">saveTodo</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$texte</span> <span class="token operator">=</span> <span class="token variable">$request</span><span class="token operator">-></span><span class="token function">input</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$texte</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Todos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token variable">$todo</span><span class="token operator">-></span><span class="token property">texte</span> <span class="token operator">=</span> <span class="token variable">$texte</span><span class="token punctuation">;</span>
      <span class="token variable">$todo</span><span class="token operator">-></span><span class="token property">termine</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      <span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"success"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="terminer" tabindex="-1"><a class="header-anchor" href="#terminer" aria-hidden="true">#</a> Terminer</h3>
<p>Pour l’action terminer nous allons devoir updater un enregistrement en base de données, pour ça nous allons le récupérer puis mettre le <code>boolean</code> termine à 1.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">markAsDone</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$todo</span>  <span class="token operator">=</span> <span class="token class-name static-context">Todos</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$todo</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token variable">$todo</span><span class="token operator">-></span><span class="token property">termine</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"success"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="suppression" tabindex="-1"><a class="header-anchor" href="#suppression" aria-hidden="true">#</a> Suppression</h3>
<p>Pour la partie suppression, nous allons devoir dans un premier temps récupérer la todo par son ID. Seuls les <code>Todos</code> marqués comme terminés peuvent être supprimés, il faudra donc controller l’état avant de faire le <code>delete()</code></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">deleteTodo</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$todo</span>  <span class="token operator">=</span> <span class="token class-name static-context">Todos</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$todo</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$todo</span><span class="token operator">-></span><span class="token property">termine</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'success'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'error'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="declarer-les-routes" tabindex="-1"><a class="header-anchor" href="#declarer-les-routes" aria-hidden="true">#</a> Déclarer les routes</h2>
<p>Maintenant que le mapping avec la base de données est créé, et que notre contrôleur est disponible, nous allons pouvoir déclarer les différentes « routes » (c’est-à-dire les chemins d’accès à votre API). Dans notre application nous avons 4 routes :</p>
<ul>
<li>Liste (/liste)</li>
<li>Création (/creation)</li>
<li>Terminer (/terminer)</li>
<li>Suppression (/suppression)</li>
</ul>
<p>Nous allons « mapper » / « connecter » les routes avec les différentes actions de notre contrôleur. Avec un framework c’est très simple il suffit d’ajouter dans le fichier <code>routes/web.php</code> le code suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$router</span><span class="token operator">-></span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'api/todo'</span><span class="token punctuation">,</span><span class="token string single-quoted-string">'TodosController@list'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$router</span><span class="token operator">-></span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'api/todo'</span><span class="token punctuation">,</span><span class="token string single-quoted-string">'TodosController@saveTodo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$router</span><span class="token operator">-></span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'api/todo/done/{id}'</span><span class="token punctuation">,</span><span class="token string single-quoted-string">'TodosController@markAsDone'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$router</span><span class="token operator">-></span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'api/todo/delete/{id}'</span><span class="token punctuation">,</span><span class="token string single-quoted-string">'TodosController@deleteTodo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="activer-le-support-d-eloquent" tabindex="-1"><a class="header-anchor" href="#activer-le-support-d-eloquent" aria-hidden="true">#</a> Activer le support d’Eloquent</h2>
<p>Avant de pouvoir tester votre application vous devez éditer le fichier <code>bootstrap/app.php</code> pour décommenter la ligne :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$app</span><span class="token operator">-></span><span class="token function">withEloquent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Eloquent ? <a href="https://laravel.com/docs/5.6/eloquent" target="_blank" rel="noopener noreferrer">Un peu de documentation sur le Framework d'accès à la base de données<ExternalLinkIcon/></a> (oui… On ne fera pas de requête !)</p>
<h2 id="tester" tabindex="-1"><a class="header-anchor" href="#tester" aria-hidden="true">#</a> Tester</h2>
<p>Pour tester votre application, il suffit de lancer la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php -S localhost:8000 -t ./public
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Pour tester, vous pouvez utiliser PostMan.</p>
<h2 id="changer-les-api-dans-votre-application-vuejs" tabindex="-1"><a class="header-anchor" href="#changer-les-api-dans-votre-application-vuejs" aria-hidden="true">#</a> Changer les API dans votre application VueJS</h2>
<p>Maintenant que vos nouvelles API sont terminées, nous allons pouvoir les utiliser dans VueJS. Pour ça éditer le code JavaScript de votre projet VueJS pour pointer vers votre serveur Lumen.</p>
</template>
