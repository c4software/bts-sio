<template><h1 id="laravel-8" tabindex="-1"><a class="header-anchor" href="#laravel-8" aria-hidden="true">#</a> Laravel 8</h1>
<p>Cet aide mémoire n’est pas exhaustif, elle contient les connaissances minimums pour réaliser un site avec Laravel.</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#architecture-mvc">Architecture MVC</RouterLink></li><li><RouterLink to="#creer-un-projet">Créer un projet</RouterLink></li><li><RouterLink to="#reinstaller-un-projet">Réinstaller un projet</RouterLink></li><li><RouterLink to="#gerer-l-application">Gérer l’application</RouterLink></li><li><RouterLink to="#lancer-votre-site">Lancer votre site</RouterLink></li><li><RouterLink to="#les-routes">Les routes</RouterLink><ul><li><RouterLink to="#definir-une-route-simple">Définir une route simple</RouterLink></li><li><RouterLink to="#definir-une-route-bis">Définir une route bis</RouterLink></li><li><RouterLink to="#et-en-post">Et en POST ?</RouterLink></li></ul></li><li><RouterLink to="#les-controleurs">Les contrôleurs</RouterLink><ul><li><RouterLink to="#declarer-une-action">Déclarer une action</RouterLink></li></ul></li><li><RouterLink to="#eloquent-«-l-orm-»">Éloquent « l’ORM »</RouterLink><ul><li><RouterLink to="#la-migration">La migration</RouterLink></li><li><RouterLink to="#le-modele">Le modèle</RouterLink></li><li><RouterLink to="#acceder-aux-donnees">Accéder aux données</RouterLink></li><li><RouterLink to="#creer-un-enregistrement">Créer un enregistrement</RouterLink></li><li><RouterLink to="#mettre-a-jour-un-enregistrement">Mettre à jour un enregistrement</RouterLink></li><li><RouterLink to="#supprimer-un-enregistrement">Supprimer un enregistrement</RouterLink></li><li><RouterLink to="#les-jointures">Les jointures</RouterLink></li><li><RouterLink to="#en-savoir-plus">En savoir plus</RouterLink></li></ul></li><li><RouterLink to="#la-vue">La vue</RouterLink><ul><li><RouterLink to="#retourner-une-vue-simple">Retourner une vue simple</RouterLink></li><li><RouterLink to="#retourner-une-vue-bis">Retourner une vue bis</RouterLink></li><li><RouterLink to="#les-directives">Les directives</RouterLink></li><li><RouterLink to="#l-heritage-de-template">L’héritage de template</RouterLink></li><li><RouterLink to="#les-composants">Les composants</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="architecture-mvc" tabindex="-1"><a class="header-anchor" href="#architecture-mvc" aria-hidden="true">#</a> Architecture MVC</h2>
<p><img src="@source/cheatsheets/laravel/res/mvc-diagram.png" alt="Architecture MVC"></p>
<ul>
<li><strong>Model</strong>: La base de données (ORM: Éloquent).</li>
<li><strong>Vue</strong>: Gestion du HTML (Moteur de template : Blade).</li>
<li><strong>Controller</strong>: Gestion des requêtes et génère le contenu.</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">Nous allons le voir…</p>
<p>C’est du MVC oui ! Mais avec un bonus… un ORM (Object–Relational Mapping) pour accéder aux objets. Vous allez le voir… Ça change tout !</p>
<p>L’idée d’un ORM, c’est de remplacer l’écriture des requêtes SQL par de la manipulation d’objet.</p>
</div>
<h2 id="creer-un-projet" tabindex="-1"><a class="header-anchor" href="#creer-un-projet" aria-hidden="true">#</a> Créer un projet</h2>
<p>Dans la documentation de Laravel, vous trouverez plusieurs façons de créer un projet. Je vous conseille de passer par la version « <a href="https://getcomposer.org/download/" target="_blank" rel="noopener noreferrer">Composer<ExternalLinkIcon/></a> » qui fonctionnera, quelle que soit la plateforme.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">composer</span> create-project laravel/laravel le-nom-de-votre-projet
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">ATTENTION</p>
<p>Le projet va être crée dans mon exemple dans un dossier nommé <code>le-nom-de-votre-projet</code> (dans le dossier courant). Attention à ne pas être n’importe où.</p>
</div>
<h2 id="reinstaller-un-projet" tabindex="-1"><a class="header-anchor" href="#reinstaller-un-projet" aria-hidden="true">#</a> Réinstaller un projet</h2>
<p>Si vous changez de machine ou si vous récupérez le code source depuis Git il sera nécessaire de réinstaller les dépendances. Pour ça :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">composer</span> <span class="token function">install</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Après cette étape, il faudra remettre également en place le fichier <code>.env</code> de votre projet. Pour le contenu du fichier il faut reprendre le contenu du <code>.env.example</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">Pourquoi le .env est perdu ?</p>
<p>Le <code>.env</code> contient vos identifiants de connexion à la base de données <strong>et les différentes clés secrètes</strong>, c'est pour ça que celui-ci est présent de base dans le .gitignore.</p>
</div>
<h2 id="gerer-l-application" tabindex="-1"><a class="header-anchor" href="#gerer-l-application" aria-hidden="true">#</a> Gérer l’application</h2>
<p>Une fois le projet créé vous pouvez (<strong>dans le dossier du projet</strong>) avec la ligne de commande réaliser diverses opérations. Celles-ci sont consultables avec</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/cheatsheets/laravel/res/artisan.png" alt="Commande Artisan"></p>
<p>Nous allons le voir, cette commande nous sera utile pour diverses actions (créer les modèles, créer les contrôleurs, lister les routes).</p>
<p>Nous pouvons par exemple lister les routes de notre application « fraichement initialisée » :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan route:list
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/cheatsheets/laravel/res/route_liste.png" alt="Commande Artisan"></p>
<h2 id="lancer-votre-site" tabindex="-1"><a class="header-anchor" href="#lancer-votre-site" aria-hidden="true">#</a> Lancer votre site</h2>
<p>Pour visualiser votre site, Laravel intègre une commande permettant de lancer « un serveur web » intégré le temps du développement. Il suffit de :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-log ext-log line-numbers-mode"><pre v-pre class="language-log"><code><span class="token property">Starting Laravel development server:</span> <span class="token url">http://127.0.0.1:8000</span>
<span class="token punctuation">[</span><span class="token date number">Tue Nov 2</span> <span class="token time number">17:27:22</span> <span class="token number">2021</span><span class="token punctuation">]</span> PHP <span class="token number">7.4.25</span> Development Server <span class="token operator">(</span><span class="token url">http://127.0.0.1:8000)</span> started
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="les-routes" tabindex="-1"><a class="header-anchor" href="#les-routes" aria-hidden="true">#</a> Les routes</h2>
<p>L’ensemble des routes sont dans <strong>3 fichiers</strong> :</p>
<ul>
<li><code>routes/web.php</code>: Gestion des urls pour les clients (web)</li>
<li><code>routes/api.php</code>: Gestion des urls pour les échanges « technique » API.</li>
<li><code>routes/console.php</code>: Gestion des commandes pour la console Laravel.</li>
</ul>
<h3 id="definir-une-route-simple" tabindex="-1"><a class="header-anchor" href="#definir-une-route-simple" aria-hidden="true">#</a> Définir une route simple</h3>
<p>Dans le fichier <code>web.php</code> il suffira par exemple de :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string double-quoted-string">"Bonjour Monde"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Nous déclarons ici <strong>une route</strong>, accessible sur le <strong><code>/</code></strong> (c’est-à-dire <code>http://localhost:8000/</code>), elle affichera <code>Bonjour Monde</code>.</p>
<h3 id="definir-une-route-bis" tabindex="-1"><a class="header-anchor" href="#definir-une-route-bis" aria-hidden="true">#</a> Définir une route bis</h3>
<p>L’avantage d’un framework, c’est la simplicité. Si vous souhaitez déclarer une route <code>http://localhost:8000/demo/3</code> il suffira d'indiquer dans le <code>web.php</code> le contenu suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/demo/{id}'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token class-name static-context">DemoController</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"voir"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Qu’avons nous ici ?</p>
<table>
<thead>
<tr>
<th style="text-align:left">Le code</th>
<th style="text-align:left">L’action</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>/demo/{id}</code></td>
<td style="text-align:left">Le lien d’accès avec une variable <code>{id}</code></td>
</tr>
<tr>
<td style="text-align:left"><code>[DemoController::class, &quot;voir&quot;]</code></td>
<td style="text-align:left">La méthode à appeler dans le contrôleur (en l’occurence la méthode <code>voir</code> dans la classe <code>DemoController</code>)</td>
</tr>
</tbody>
</table>
<h3 id="et-en-post" tabindex="-1"><a class="header-anchor" href="#et-en-post" aria-hidden="true">#</a> Et en POST ?</h3>
<p>C’est simple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/demo/{id}'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token class-name static-context">DemoController</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"voir"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Un instant ✋</p>
<p>En PHP objet il y a la notion de namespace, Laravel utilise de base les namespace, ça veut dire que nous allons avoir à utiliser le mot clé <code>use</code> pour importer (include). Quand vous voulez utiliser une classe qui n'est pas dans le même fichier, il faudra déclarer l'emplacement via un <code>use</code>. Exemple, pour que <code>DemoController</code> soit accessible depuis le router il faudra :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Controllers<span class="token punctuation">\</span>DemoController</span><span class="token punctuation">;</span>

<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/demo/{id}'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token class-name static-context">DemoController</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"voir"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>⚠️ Si vous utilisez <strong>PHPStorm</strong> cet import sera automatique.</li>
<li>⚠️ Si vous utilisez <strong>VSCode</strong> il faudra passer par une extension <a href="https://marketplace.visualstudio.com/items?itemName=MehediDracula.php-namespace-resolver" target="_blank" rel="noopener noreferrer">Disponible ici<ExternalLinkIcon/></a></li>
</ul>
<p>Pour <strong>PHPStorm</strong>, <strong>alt+entrée</strong> permettra de déclencher l'ajout du use.</p>
<p>Pour <strong>VSCode</strong> je vous laisse regarder l'usage de l'extension :</p>
<p><img src="@source/cheatsheets/laravel/res/namespace_resolver.gif" alt="Namespace Resolver"></p>
</div>
<h2 id="les-controleurs" tabindex="-1"><a class="header-anchor" href="#les-controleurs" aria-hidden="true">#</a> Les contrôleurs</h2>
<p>Le contrôleur va contenir la logique « métier » pour traiter les demandes du clients.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:controller DemoController
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette action va créer le squelette d’un contrôleur à l’emplacement suivant <code>app/Http/Controllers/DemoController.php</code>. Le contenu est minimaliste :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Controllers</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Request</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">DemoController</span> <span class="token keyword">extends</span> <span class="token class-name">Controller</span>
<span class="token punctuation">{</span>
    <span class="token comment">//</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="declarer-une-action" tabindex="-1"><a class="header-anchor" href="#declarer-une-action" aria-hidden="true">#</a> Déclarer une action</h3>
<p>Nous avons précédemment déclaré une action dans notre routeur <code>voir</code>, si nous souhaitons l’ajouter dans notre contrôleur :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Controllers</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Request</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">DemoController</span> <span class="token keyword">extends</span> <span class="token class-name">Controller</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">voir</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Pour l’instant pas de vue, nous verrons ça plus tard.</span>
        <span class="token keyword">return</span> <span class="token string double-quoted-string">"Vous avez demandé l’id : "</span> <span class="token operator">.</span> <span class="token variable">$id</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Il suffit donc de créer une méthode, les paramètres seront automatiquement remplis lors de l’appel du client <code>$id</code> contiendra la valeur présente à la place de <code>{id}</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">C’est aussi simple oui</p>
<p>Ne reflichissez pas trop… C’est vraiment aussi simple que ça.</p>
</div>
<h2 id="eloquent-«-l-orm-»" tabindex="-1"><a class="header-anchor" href="#eloquent-«-l-orm-»" aria-hidden="true">#</a> Éloquent « l’ORM »</h2>
<h3 id="la-migration" tabindex="-1"><a class="header-anchor" href="#la-migration" aria-hidden="true">#</a> La migration</h3>
<p>Une migration c’est ce qui va nous permettre d’initialiser la base de données directement depuis Laravel. Bien que cette partie <em>est optionnelle</em> je vous conseille vivement de l’utiliser (c’est un standard en entreprise.)</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>php artisan make<span class="token punctuation">:</span>migration le_nom_de_votre_migration <span class="token operator">--</span>create<span class="token operator">=</span>leNomDeVotreTableEnBase
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Une migration, est juste une classe qui va contenir la définition de votre table, les champs, les types, la structure. Le contenu de base sera le suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Migrations<span class="token punctuation">\</span>Migration</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Schema<span class="token punctuation">\</span>Blueprint</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Support<span class="token punctuation">\</span>Facades<span class="token punctuation">\</span>Schema</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">LeNomDeVotreMigration</span> <span class="token keyword">extends</span> <span class="token class-name">Migration</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Run the migrations.
     *
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token keyword">void</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">up</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name static-context">Schema</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'leNomDeVotreTableEnBase'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token class-name type-declaration">Blueprint</span> <span class="token variable">$table</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token variable">$table</span><span class="token operator">-></span><span class="token function">id</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
        <span class="token class-name static-context">Schema</span><span class="token operator">::</span><span class="token function">dropIfExists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'leNomDeVotreTableEnBase'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>Par exemple, si vous souhaitez ajouter dans votre table deux champs (un <code>texte</code> et un <code>booléen</code>), il faudra ajouter dans la méthode <code>up</code> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$table</span><span class="token operator">-></span><span class="token keyword type-declaration">string</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$table</span><span class="token operator">-></span><span class="token function">boolean</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'termine'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Lancer la migration, c’est-à-dire appliquer l’ensemble des modifications en attente en BDD :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan migrate
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><a href="https://laravel.com/docs/8.x/migrations" target="_blank" rel="noopener noreferrer">Plus d’information<ExternalLinkIcon/></a></p>
<h3 id="le-modele" tabindex="-1"><a class="header-anchor" href="#le-modele" aria-hidden="true">#</a> Le modèle</h3>
<p>Le modèle est l’objet qui nous permettra de faire « nos requêtes SQL », l’accès à nos données.</p>
<p>La grande force de Laravel, son Framework <a href="https://laravel.com/docs/8.x/eloquent" target="_blank" rel="noopener noreferrer">Eloquent<ExternalLinkIcon/></a>. Laravel intègre une commande pour créer un modèle vide :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:model LeNomDeVotreTableEnBase
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette action va créer un squelette de modèle à l’emplacement suivant : <code>app/Models/LeNomDeVotreTableEnBase.php</code>. Le contenu sera le minimum :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\</span>Models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Eloquent<span class="token punctuation">\</span>Factories<span class="token punctuation">\</span>HasFactory</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Eloquent<span class="token punctuation">\</span>Model</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">LeNomDeVotreTableEnBase</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token keyword">use</span> <span class="token package">HasFactory</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Le nom de la classe sera le nom de votre table</p>
<p>De base le nome de la classe sera le nom de votre table. Si vous souhaitez changer le comportement, il vous suffit de :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\</span>Models</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Eloquent<span class="token punctuation">\</span>Factories<span class="token punctuation">\</span>HasFactory</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Eloquent<span class="token punctuation">\</span>Model</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">LeNomDeVotreTableEnBase</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token variable">$table</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"CECI_EST_LE_NOM_DE_MA_TABLE"</span><span class="token punctuation">;</span>

    <span class="token keyword">use</span> <span class="token package">HasFactory</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></div>
<h3 id="acceder-aux-donnees" tabindex="-1"><a class="header-anchor" href="#acceder-aux-donnees" aria-hidden="true">#</a> Accéder aux données</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Tout obtenir</span>
<span class="token variable">$todos</span> <span class="token operator">=</span> <span class="token class-name static-context">LeNomDeVotreTableEnBase</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Ou pour l’enregistrement avec l’identifiant « 42 »</span>
<span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token class-name static-context">LeNomDeVotreTableEnBase</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Obtenir, mais filtrer et ordonné et avec une limite</span>
<span class="token variable">$todos</span> <span class="token operator">=</span> <span class="token class-name static-context">LeNomDeVotreTableEnBase</span><span class="token operator">::</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'temine'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">orderBy</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'id'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'desc'</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Ou avec un where</span>
<span class="token variable">$users</span> <span class="token operator">=</span> <span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'votes'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'>'</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Un instant ✋</p>
<p>En PHP objet il y a la notion de namespace, Laravel utilise de base les namespace, ça veut dire que nous allons avoir à utiliser le mot clé <code>use</code> pour importer (include). Quand vous voulez utiliser une classe qui n'est pas dans le même fichier, il faudra déclarer l'emplacement via un <code>use</code>. Exemple, pour que <code>LeNomDeVotreTableEnBase</code> soit accessible depuis le contrôleur il faudra :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\</span>Models<span class="token punctuation">\</span>LeNomDeVotreTableEnBase</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>⚠️ Si vous utilisez <strong>PHPStorm</strong> cet import sera automatique.</li>
<li>⚠️ Si vous utilisez <strong>VSCode</strong> il faudra passer par une extension <a href="https://marketplace.visualstudio.com/items?itemName=MehediDracula.php-namespace-resolver" target="_blank" rel="noopener noreferrer">Disponible ici<ExternalLinkIcon/></a></li>
</ul>
<p>Pour <strong>PHPStorm</strong>, alt+entrée permettra de déclencher l'ajout du use.</p>
<p>Pour <strong>VSCode</strong> je vous laisse regarder l'usage de l'extension :</p>
<p><img src="@source/cheatsheets/laravel/res/namespace_resolver.gif" alt="Namespace Resolver"></p>
</div>
<h3 id="creer-un-enregistrement" tabindex="-1"><a class="header-anchor" href="#creer-un-enregistrement" aria-hidden="true">#</a> Créer un enregistrement</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Création d’une nouvelle entrée en BDD (équivalent d’un INSERT INTO)</span>
<span class="token class-name static-context">TodoList</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token string single-quoted-string">'texte'</span>     <span class="token operator">=></span> <span class="token string single-quoted-string">'Super Cool'</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">'termine'</span>   <span class="token operator">=></span> <span class="token constant boolean">false</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="mettre-a-jour-un-enregistrement" tabindex="-1"><a class="header-anchor" href="#mettre-a-jour-un-enregistrement" aria-hidden="true">#</a> Mettre à jour un enregistrement</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Rechercher celui avec l’id 1</span>
<span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Le passer à terminer</span>
<span class="token variable">$todo</span><span class="token operator">-></span><span class="token property">termine</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>

<span class="token comment">// Le sauvegarder en base de données</span>
<span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="supprimer-un-enregistrement" tabindex="-1"><a class="header-anchor" href="#supprimer-un-enregistrement" aria-hidden="true">#</a> Supprimer un enregistrement</h3>
<p>Plusieurs façon :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Façon 1</span>
<span class="token comment">// Rechercher celui avec l’id 1</span>
<span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Le supprimer</span>

<span class="token comment">// Façon 2</span>
<span class="token comment">// Le supprimer directement</span>
<span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Façon 3</span>
<span class="token comment">// En supprimer plusieurs directement</span>
<span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Façon 4</span>
<span class="token comment">// Supprimer avec une condition</span>
<span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'termine'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'=='</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="les-jointures" tabindex="-1"><a class="header-anchor" href="#les-jointures" aria-hidden="true">#</a> Les jointures</h3>
<p>Les jointures sont à définir directement dans le modèle. Elles seront des méthodes accessibles via l’objet de votre modèle.</p>
<h4 id="one-to-one" tabindex="-1"><a class="header-anchor" href="#one-to-one" aria-hidden="true">#</a> One To One</h4>
<p><img src="@source/cheatsheets/laravel/res/many-to-many.png" alt="One To One"></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Todo</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span> <span class="token punctuation">{</span>

  <span class="token comment">// Dans le modèle</span>
  <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">categorie</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">hasOne</span><span class="token punctuation">(</span><span class="token class-name static-context">Categorie</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Éloquent supposera que dans le modèle Catégorie contiendra une colonne todo_id.</p>
</div>
<h4 id="one-to-many" tabindex="-1"><a class="header-anchor" href="#one-to-many" aria-hidden="true">#</a> One To Many</h4>
<p><img src="@source/cheatsheets/laravel/res/one-to-many.png" alt="One To Many"></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Post</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span> <span class="token punctuation">{</span>

  <span class="token comment">// Dans le modèle</span>
  <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">comments</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">hasMany</span><span class="token punctuation">(</span><span class="token class-name static-context">Comment</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Éloquent supposera que la colonne de clé étrangère sur le modèle Comment est post_id.</p>
</div>
<h4 id="l-inverse-du-one-to-many-le-«-belong-to-»" tabindex="-1"><a class="header-anchor" href="#l-inverse-du-one-to-many-le-«-belong-to-»" aria-hidden="true">#</a> L’inverse du One To Many : le « Belong To »</h4>
<p><img src="@source/cheatsheets/laravel/res/one-to-many.png" alt="One To Many"></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Comment</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">post</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">belongsTo</span><span class="token punctuation">(</span><span class="token class-name static-context">Post</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>Éloquent tentera de trouver un modèle Post dont l’identifiant correspond à la colonne post_id du modèle Comment.</li>
<li>Éloquent supposera que la clé étrangère du modèle Post sur la table des commentaires est post_id.</li>
</ul>
</div>
<h4 id="many-to-many" tabindex="-1"><a class="header-anchor" href="#many-to-many" aria-hidden="true">#</a> Many To Many</h4>
<p><img src="@source/cheatsheets/laravel/res/many-to-many.png" alt="Many To Many"></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">User</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * The roles that belong to the user.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">roles</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">belongsToMany</span><span class="token punctuation">(</span><span class="token class-name static-context">Role</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Role</span> <span class="token keyword">extends</span> <span class="token class-name">Model</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * The users that belong to the role.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">users</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token function">belongsToMany</span><span class="token punctuation">(</span><span class="token class-name static-context">User</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="en-savoir-plus" tabindex="-1"><a class="header-anchor" href="#en-savoir-plus" aria-hidden="true">#</a> En savoir plus</h3>
<p>Nous avons effleuré ici les types de requêtes… <a href="https://laravel.com/docs/8.x/queries" target="_blank" rel="noopener noreferrer">Pour en savoir plus<ExternalLinkIcon/></a></p>
<h2 id="la-vue" tabindex="-1"><a class="header-anchor" href="#la-vue" aria-hidden="true">#</a> La vue</h2>
<p>Laravel utilise l’excellent moteur de template « <a href="https://laravel.com/docs/8.x/blade" target="_blank" rel="noopener noreferrer">Blade<ExternalLinkIcon/></a> ». À la fois souple et puissant il améliorera très grandement la qualité de vos projets.</p>
<ul>
<li>Moteur de template</li>
<li>Performant</li>
<li>Héritage et redéfinition</li>
<li>Les fichiers Blade sont des fichiers PHP</li>
<li>Contrairement à beaucoup d’autres moteurs de template, le mix PHP + HTML est possible (mais personnellement je ne trouve pas que ça soit une bonne idée…)</li>
</ul>
<h3 id="retourner-une-vue-simple" tabindex="-1"><a class="header-anchor" href="#retourner-une-vue-simple" aria-hidden="true">#</a> Retourner une vue simple</h3>
<p>Dans votre routeur :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'votrePage'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'name'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Valentin 👋'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Dans votre fichier <code>resources/views/votrePage.blade.php</code> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>Bonjour<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token variable">$name</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">La sécurité est de base</p>
<p>Ici pas besoin de faire un <code>htmlspecialchars</code>… <strong>C’est automatique</strong></p>
</div>
<h3 id="retourner-une-vue-bis" tabindex="-1"><a class="header-anchor" href="#retourner-une-vue-bis" aria-hidden="true">#</a> Retourner une vue bis</h3>
<p>Depuis un contrôleur l’approche est là même :</p>
<p>Votre contrôleur :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Controllers</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Request</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">DemoController</span> <span class="token keyword">extends</span> <span class="token class-name">Controller</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">voir</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">string</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'votrePage'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'id'</span> <span class="token operator">=></span> <span class="token variable">$id</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Dans votre fichier <code>resources/views/votrePage.blade.php</code> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token operator">&lt;</span>h1<span class="token operator">></span>Vous avez demandé l’id <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token variable">$id</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="les-directives" tabindex="-1"><a class="header-anchor" href="#les-directives" aria-hidden="true">#</a> Les directives</h3>
<p>Les directives sont une syntaxe particulière permettant de conditionner, répéter, ajuster l’affichage en fonctions des données</p>
<h4 id="les-conditions" tabindex="-1"><a class="header-anchor" href="#les-conditions" aria-hidden="true">#</a> LES CONDITIONS</h4>
<p><code>@if, @elseif, @else et @endif</code></p>
<p><code>@switch, @case, @break, @default et @endswitch</code></p>
<h4 id="les-boucles" tabindex="-1"><a class="header-anchor" href="#les-boucles" aria-hidden="true">#</a> LES BOUCLES</h4>
<p><code>@for, @endfor</code></p>
<p><code>@foreach, @endforeach</code></p>
<p><code>@forelse, @empty, @endforelse &lt;= Permet d’afficher autre chose si pas de données dans la boucle</code></p>
<h4 id="l-heritage" tabindex="-1"><a class="header-anchor" href="#l-heritage" aria-hidden="true">#</a> L’HÉRITAGE</h4>
<p><code>@include('view.name') &lt;= Inclusion d’une autre vue</code></p>
<p><code>@includeWhen($boolean, 'view.name') &lt;= Inclusion conditionnelle</code></p>
<h4 id="les-droits-d-acces" tabindex="-1"><a class="header-anchor" href="#les-droits-d-acces" aria-hidden="true">#</a> Les droits d’accès</h4>
<p><code>@auth, @guest</code></p>
<h4 id="quelques-exemples-en-vrac" tabindex="-1"><a class="header-anchor" href="#quelques-exemples-en-vrac" aria-hidden="true">#</a> Quelques exemples en vrac</h4>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// ++++</span>
<span class="token comment">// Les conditions</span>
<span class="token comment">// ++++</span>

@<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token variable">$records</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token constant">I</span> have one record<span class="token operator">!</span>
@<span class="token keyword">elseif</span> <span class="token punctuation">(</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token variable">$records</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token constant">I</span> have multiple records<span class="token operator">!</span>
@<span class="token keyword">else</span>
    No records<span class="token operator">!</span>
@<span class="token keyword">endif</span>

@auth
    <span class="token comment">// The user is authenticated...</span>
@endauth

@guest
    <span class="token comment">// The user is not authenticated...</span>
@endguest

@<span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$records</span><span class="token punctuation">)</span>
    <span class="token comment">// $records is defined and is not null...</span>
@endisset

@<span class="token keyword">empty</span><span class="token punctuation">(</span><span class="token variable">$records</span><span class="token punctuation">)</span>
    <span class="token comment">// $records is "empty"...</span>
@endempty

<span class="token comment">// ++++</span>
<span class="token comment">// Les boucles</span>
<span class="token comment">// ++++</span>

@<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token variable">$i</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token variable">$i</span> <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token variable">$i</span><span class="token operator">++</span><span class="token punctuation">)</span>
    The current value is <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token variable">$i</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
@<span class="token keyword">endfor</span>

@<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$users</span> <span class="token keyword">as</span> <span class="token variable">$user</span><span class="token punctuation">)</span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span>This is user <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token variable">$user</span><span class="token operator">-></span><span class="token property">id</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
@<span class="token keyword">endforeach</span>

@<span class="token function">forelse</span> <span class="token punctuation">(</span><span class="token variable">$users</span> <span class="token keyword">as</span> <span class="token variable">$user</span><span class="token punctuation">)</span>
    <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token variable">$user</span><span class="token operator">-></span><span class="token property">name</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
@<span class="token keyword">empty</span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span>No users<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
@endforelse

@<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token constant boolean">true</span><span class="token punctuation">)</span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token constant">I</span>'m looping forever<span class="token operator">.</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
@<span class="token keyword">endwhile</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><h3 id="l-heritage-de-template" tabindex="-1"><a class="header-anchor" href="#l-heritage-de-template" aria-hidden="true">#</a> L’héritage de template</h3>
<p>Organiser le code en parent et en enfants :</p>
<p><img src="@source/cheatsheets/laravel/res/parent-enfant.png" alt="Parent &amp; Enfant"></p>
<ul>
<li><code>Le parent</code> est la <strong>structure</strong> de notre page.</li>
<li><code>L’enfant</code> est le <strong>contenu</strong> page désirée</li>
</ul>
<p>Le parent :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> Sauvegardé dans resources<span class="token operator">/</span>views<span class="token operator">/</span>layouts<span class="token operator">/</span>app<span class="token operator">.</span>blade<span class="token operator">.</span>php <span class="token operator">--</span><span class="token operator">></span>

<span class="token operator">&lt;</span>html<span class="token operator">></span>
  <span class="token operator">&lt;</span>head<span class="token operator">></span>
    <span class="token operator">&lt;</span>title<span class="token operator">></span>Site Exemple <span class="token operator">-</span> @<span class="token keyword">yield</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'titre'</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>
  <span class="token operator">&lt;</span>body<span class="token operator">></span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"container"</span><span class="token operator">></span>@<span class="token keyword">yield</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'content'</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>L’enfant (une de vos pages) :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> Sauvegardé dans resources<span class="token operator">/</span>views<span class="token operator">/</span>child<span class="token operator">.</span>blade<span class="token operator">.</span>php <span class="token operator">--</span><span class="token operator">></span>

@<span class="token keyword">extends</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'layouts.app'</span><span class="token punctuation">)</span> <span class="token comment">// indique que nous allons utiliser le parent « app ».</span>

@<span class="token function">section</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'titre'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'Page enfant'</span><span class="token punctuation">)</span> <span class="token comment">// Titre de la page</span>

<span class="token comment">// Contenu de votre page</span>
@<span class="token function">section</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'content'</span><span class="token punctuation">)</span>
  <span class="token operator">&lt;</span>p<span class="token operator">></span>Contenu de la page enfant<span class="token operator">.</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
@endsection
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">C’est une notion importante</p>
<p>Je ne le répèterai jamais assez, mais l’organisation est la clé de la réussite. Même si ce découpage vous semble « complèxe » à première vue, c’est quelque chose de courant et de pratiquer dans beaucoup (toutes ?) les entreprises.</p>
</div>
<h3 id="les-composants" tabindex="-1"><a class="header-anchor" href="#les-composants" aria-hidden="true">#</a> Les composants</h3>
<p>Blade intègre également un système de composant permettant de découper son travail.</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VotreComposant</span> <span class="token attr-name">nom</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Valentin<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  Vous pouvez ici avoir des enfants.
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>VotreComposant</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><a href="https://laravel.com/docs/8.x/blade#components" target="_blank" rel="noopener noreferrer">Documentation des composants<ExternalLinkIcon/></a>
<a href="https://laravel.com/docs/8.x/blade#layouts-using-components" target="_blank" rel="noopener noreferrer">Utiliser les composants pour définir son affichage<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">C'est nouveau</p>
<p>Les composants sont une nouvelle approche dans la conception d'interface. Ils sont très utilisés notamment en JavaScript, en Laravel vous avez le choix « Héritage » ou « Composant » il n'y a pas de meilleure façon de faire. Seulement deux approches complémentaires.</p>
<p>PS: J'ai mon petit faible pour les composants 😉.</p>
</div>
</template>
