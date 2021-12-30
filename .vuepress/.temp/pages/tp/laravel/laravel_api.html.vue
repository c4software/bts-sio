<template><h1 id="creer-des-api-avec-laravel" tabindex="-1"><a class="header-anchor" href="#creer-des-api-avec-laravel" aria-hidden="true">#</a> Créer des API avec Laravel</h1>
<p>Nous avons vu précédemment qu'il était simple de créer des sites Web avec Laravel. Dans le monde du développement, il est très courant de ne pas échanger entre le client et le serveur directement en HTML, mais directement en JSON.</p>
<p>Nous appelons cette façon des API (dans notre cas des API REST), c'est le fondement même de beaucoup de sites Internet que vous utilisez tous les jours (Gmail, Facebook, …).</p>
<p>Laravel étant un framework « à tout faire » celui-ci nous permet bien évidemment de créer également des API. C'est ce que nous allons faire dans ce TP.</p>
<div class="custom-container tip"><p class="custom-container-title">API ?</p>
<p>Ce que vous venez de créer est une API. Une API est le coeur de beaucoup de systèmes moderne. Il est important de comprendre ce concept dès à présent. Pourquoi faire une API ?</p>
<p>Une API va nous permettre de séparer la logique entre client et serveur afin de réaliser si vous le souhaitez différent client pour la même donnée (exemple Twitter avec des clients multiplateformes).</p>
<p>Pourquoi préférer une API « JSON / XML » à un retour HTML basic ? Tout simplement, car l'API va être universelle; nous pourrons donc l'utiliser dans un site Internet, mais également dans une application ou n'importe quel client applicatif (web, Android, iOs, une voiture, une TV…).</p>
</div>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#creer-votre-projet">Créer votre projet</RouterLink></li><li><RouterLink to="#creation-de-la-base-de-donnees">Création de la base de données</RouterLink></li><li><RouterLink to="#creation-de-l-api">Création de l&#39;API</RouterLink><ul><li><RouterLink to="#creation-du-controleur">Création du contrôleur</RouterLink></li><li><RouterLink to="#liste">Liste</RouterLink></li><li><RouterLink to="#la-creation">La Création</RouterLink></li><li><RouterLink to="#creation-version-alternative">Création, version alternative</RouterLink></li><li><RouterLink to="#suppression">Suppression</RouterLink></li><li><RouterLink to="#definir-les-routes">Définir les routes</RouterLink></li><li><RouterLink to="#tester-votre-api">Tester votre API</RouterLink></li></ul></li><li><RouterLink to="#et-les-clients-dans-tout-ca">Et les clients dans tout ça ?</RouterLink><ul><li><RouterLink to="#installer-tabulator">Installer Tabulator</RouterLink></li><li><RouterLink to="#utiliser-tabulator">Utiliser Tabulator</RouterLink></li><li><RouterLink to="#ajouter-les-filtres-dans-tabulator">Ajouter les filtres dans Tabulator</RouterLink></li><li><RouterLink to="#ajouter-un-element-via-l-ajax">Ajouter un élément via l&#39;Ajax</RouterLink></li><li><RouterLink to="#suppression-via-l-ajax">Suppression via l&#39;Ajax</RouterLink></li></ul></li><li><RouterLink to="#creation-de-l-api-utilisateur">Création de l&#39;API utilisateur</RouterLink></li></ul></nav>
</details>
<h2 id="creer-votre-projet" tabindex="-1"><a class="header-anchor" href="#creer-votre-projet" aria-hidden="true">#</a> Créer votre projet</h2>
<p>Pour cette étape, je vous laisse suivre le début du <RouterLink to="/tp/laravel/introduction.html">précédent TP</RouterLink>.</p>
<p><strong>Attention</strong> a bien installer au moins la version &gt;8 de Laravel.</p>
<h2 id="creation-de-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#creation-de-la-base-de-donnees" aria-hidden="true">#</a> Création de la base de données</h2>
<p>La première étape comme toujours est d'ajouter dans votre projet « une nouvelle migration » afin de créer la base de données relative à notre problématique.</p>
<p>Dans notre cas, voilà la table que nous souhaitons créer :</p>
<p><img src="@source/tp/laravel/ressources/concert_db.png" alt="Table Concert"></p>
<p>Je vous laisse réaliser les étapes suivantes :</p>
<ul>
<li>Création de la migration et le modèle <code>php artisan make:model Concert --migration</code></li>
<li>Définir les champs dans la migration, mais également dans le <code>$fillable</code>.</li>
<li>Lancer la migration <code>php artisan migrate</code></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Un doute sur comment faire ?</p>
<p>Ça fait plusieurs fois que nous faisons ce genre d'opération. Si vous avez un doute, vous pouvez regarder le détail <RouterLink to="/tp/laravel/introduction.html#la-base-de-donnees">dans le TP</RouterLink></p>
</div>
<div class="custom-container danger"><p class="custom-container-title">STOP !</p>
<p>Nous avons donc maintenant une base de données de test. Avant d'aller plus loin… Je vous laisse insérer des données fictives pour que nous ayons un peu de contenu.</p>
<p>Vous avez deux façons de faire ça :</p>
<ul>
<li>Directement en base « manuellement ».</li>
<li><a href="https://laravel.com/docs/8.x/seeding" target="_blank" rel="noopener noreferrer">Via Une Factories + Un Seeder de Laravel<ExternalLinkIcon/></a></li>
</ul>
<p>L'avantage du seeder ? Il va permettre de créer beaucoup de données en un rien de temps ! 50 Concerts ? Aucun problème il suffit de faire :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Concert</span><span class="token operator">::</span><span class="token function">factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">count</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Pour l'implémentation nous allons le faire ensemble, mais ça se résume à :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:factory ConcertFactory
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Je vous laisse configurer la factory (<code>/database/factories/ConcertFactory.php</code>) en prenant exemple sur celle de la partie User. Mais dans les grandes ligne il faut ajouter</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">definition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>
      <span class="token string single-quoted-string">'name'</span> <span class="token operator">=></span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">faker</span><span class="token operator">-></span><span class="token property">name</span><span class="token punctuation">,</span>
      <span class="token string single-quoted-string">'date'</span> <span class="token operator">=></span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">faker</span><span class="token operator">-></span><span class="token function">date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Éditer maintenant le DatabaseSeeder pour ajouter dans le run() :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Concert</span><span class="token operator">::</span><span class="token function">factory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">count</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan db:seed
<span class="token comment"># Vous avez maintenant 50 concerts dans votre table</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Pratique !</p>
</div>
<h2 id="creation-de-l-api" tabindex="-1"><a class="header-anchor" href="#creation-de-l-api" aria-hidden="true">#</a> Création de l'API</h2>
<p>La création d'une API va être très proche de ce que nous connaissons déjà. Première étape créer un contrôleur ; pour rappel celui-ci permet de gérer le traffic et de répondre aux demandes des / du clients.</p>
<p>Notre API sera très simple, elle contiendra <strong>3 routes / fonctionnalités</strong> :</p>
<table>
<thead>
<tr>
<th>Méthode</th>
<th>Chemin</th>
<th>Fonctionnalité</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td><code>/api/concert</code></td>
<td>Liste de l'ensemble des concerts</td>
</tr>
<tr>
<td>POST</td>
<td><code>/api/concert</code></td>
<td>Ajout d'un nouveau concert (en fournissant les données en POST)</td>
</tr>
<tr>
<td>DELETE</td>
<td><code>/api/concert/{id}</code></td>
<td>Suppression du concert spécifié en paramètre <code>id</code></td>
</tr>
</tbody>
</table>
<p>L'ensemble des routes va retourner du JSON. Comme vu ensemble en cours, le format JSON est très facilement lisible, quel que soit le langage client. C'est donc un très bon choix !</p>
<div class="custom-container warning"><p class="custom-container-title">Avant de coder il faut définir</p>
<p>Le petit tableau que je vous propose ici est très important. Il permet de savoir ce que je veux faire. Nous sommes ici dans un TP… Mais vous codez comme si vous étiez dans un projet « classique ».</p>
<p>Il est donc important de définir ce que l'on souhaite faire… Pour soit, mais également pour vos collègues qu'ils sachent ce que vous êtes entrain de faire.</p>
</div>
<h3 id="creation-du-controleur" tabindex="-1"><a class="header-anchor" href="#creation-du-controleur" aria-hidden="true">#</a> Création du contrôleur</h3>
<p>Le contrôleur vous savez faire, nous allons faire un nouveau contrôleur, celui-ci sera dédié à la partie API :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:controller ApiControler
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Je ne vous détaille pas plus cette étape nous l'avons vu plusieurs fois précédemment.</p>
<p>Bien ! Notre code est maintenant prêt. Nous allons créer les méthodes permettant la manipulation de notre base de données tout en répondant à nos API bien évidemment (liste, création, terminer, suppression).</p>
<p>Nous allons maintenant écrire une méthode pour chaque action. Avec les différentes conditions nécessaires au bon fonctionnement de votre application.</p>
<h3 id="liste" tabindex="-1"><a class="header-anchor" href="#liste" aria-hidden="true">#</a> Liste</h3>
<p>La méthode <code>liste</code> est certainement la plus simple, nous allons simplement faire appel à la méthode <code>all()</code> de Eloquent (ORM pour l’accès à la base de données). Pour ça créez une nouvelle méthode dans la Class <code>ApiController</code> avec le code suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">listApi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token class-name static-context">Concert</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Rien de bien compliqué, comme vous pouvez le voir le <code>response()-&gt;json(…)</code> permet de créer une réponse au format JSON pour votre API (que l’on utilisera plus tard au moment de la mise en place des routes).</p>
<div class="custom-container tip"><p class="custom-container-title">Et oui !</p>
<p>C'est aussi simple que ça ! Avec cette simple méthode, vous avez écrit votre première API.</p>
<center><iframe src="https://giphy.com/embed/UtQHZEv5M7POO8t2WW" width="280" height="160" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>
</div>
<h3 id="la-creation" tabindex="-1"><a class="header-anchor" href="#la-creation" aria-hidden="true">#</a> La Création</h3>
<p>Pour l'ajout, c'est un peu différent, nous allons créer dans la base de données un nouvel enregistrement à chaque requête de type <code>POST</code>. Nous allons donc devoir écrire un peu de code.</p>
<p>Pour la partie création, nous allons faire un mapping automatique entre la requête HTTP et le modèle <code>Concert</code></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">createApi</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$item</span> <span class="token operator">=</span> <span class="token class-name static-context">Concert</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token operator">-></span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">😬</p>
<p>Que va-t-il se passer lors de l’appel ? L’objet <code>$request</code> contiens tous les paramètres de l’appel HTTP, la méthode <code>all()</code> permets de les récupérer. L’objet <code>Concerts</code> possède une méthode permettant de créer un nouvel enregistrement en base de données. Les valeurs passées en paramètre de <code>createApi()</code> permettre de renseigner automatiquement les champs en base de données.</p>
</div>
<h3 id="creation-version-alternative" tabindex="-1"><a class="header-anchor" href="#creation-version-alternative" aria-hidden="true">#</a> Création, version alternative</h3>
<p>La première approche est la plus rapide, mais elle sous-entend que tous les paramètres soient bien initialisés dans « l’input » HTTP. Dans cette version la méthode est plus complète et gère la création de l’objet Concert manuellement en récupérant les différents éléments dans la requête HTTP</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">createApi</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$name</span> <span class="token operator">=</span> <span class="token variable">$request</span><span class="token operator">-></span><span class="token function">input</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$date</span> <span class="token operator">=</span> <span class="token variable">$request</span><span class="token operator">-></span><span class="token function">input</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'date'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token variable">$concert</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Concert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token variable">$concert</span><span class="token operator">-></span><span class="token property">name</span> <span class="token operator">=</span> <span class="token variable">$name</span><span class="token punctuation">;</span>
      <span class="token variable">$concert</span><span class="token operator">-></span><span class="token property">date</span> <span class="token operator">=</span> <span class="token variable">$date</span><span class="token punctuation">;</span>
      <span class="token variable">$concert</span><span class="token operator">-></span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"status"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"success"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"status"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"error"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="suppression" tabindex="-1"><a class="header-anchor" href="#suppression" aria-hidden="true">#</a> Suppression</h3>
<p>Pour la partie suppression, nous allons devoir dans un premier temps récupérer le Concert par son ID.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">deleteApi</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$concert</span> <span class="token operator">=</span> <span class="token class-name static-context">Concert</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$concert</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token variable">$concert</span><span class="token operator">-></span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"status"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"success"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"status"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"error"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="definir-les-routes" tabindex="-1"><a class="header-anchor" href="#definir-les-routes" aria-hidden="true">#</a> Définir les routes</h3>
<p>Votre code est maintenant prêt, il faut le « brancher » dans votre <code>Router</code> pour que celui-ci soit accessible aux utilisateurs. Cette fois-ci nous n'allons pas ajouter nos routes dans le fichier <code>web.php</code> car ce ne sont pas des liens « web »… Mais dans attention…</p>
<p>…Roulement de tambour…
…
…Attention…
…</p>
<p><code>api.php</code> Je vous donne le code à ajouter, mais celui-ci est classique, c'est juste des liens tels que nous le faisons dans la partie <code>web.php</code> :</p>
<details class="custom-container details"><summary>Je pense que vous savez faire… Mais si vous avez oublié …</summary>
<p>Je sais que vous avez cliqué sans vraiment chercher…</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/concert'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'App\Http\Controllers\ApiControler'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'listApi'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/concert'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'App\Http\Controllers\ApiControler'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'createApi'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/concert/{id}'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'App\Http\Controllers\ApiControler'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'deleteApi'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></details>
<p>🤓 Les routes que vous ajoutez dans le fichier <code>api.php</code> sont automatiquement préfixées par <code>/api/</code>.</p>
<div class="custom-container danger"><p class="custom-container-title">Et le type de la méthode ?</p>
<p>N'oubliez pas le type de la méthode ! Surtout pas ! Dans le tableau nous avons défini des types de méthode (GET, POST, DELETE), c'est important de respecter nos spécifications !</p>
</div>
<h3 id="tester-votre-api" tabindex="-1"><a class="header-anchor" href="#tester-votre-api" aria-hidden="true">#</a> Tester votre API</h3>
<p>Maintenant que l’ensemble de votre code est terminé (et commenté 🕵🏻), nous allons pouvoir le tester, pour tester les API c’est plutôt simple. Il suffit d’utiliser des outils tels que <a href="https://www.getpostman.com/" target="_blank" rel="noopener noreferrer">Postman<ExternalLinkIcon/></a>, l’idée c’est de se construire un « cahier » de test vous permettant de valider le fonctionnement de votre application rapidement (comprendre dès que vous modifiez le code). C’est dans ce but que je vous ai préparé une collection de « tests » qui devrait vous permettre de valider rapidement le bon fonctionnement de vos API.</p>
<p>Valider que vos API fonctionnent correctement grâce à l'outil <a href="https://www.getpostman.com/" target="_blank" rel="noopener noreferrer">Postman<ExternalLinkIcon/></a>.</p>
<p>(Pssst! La création de comptes <strong>n'est pas obligatoire</strong>) &lt;-- ⚠️⚠️</p>
<p>🤓 Commencez par la plus simple, par exemple <code>/api/</code> qui doit normalement liste actuelle de concert. 🤓</p>
<p>✋ Tester l'ensemble de vos API avant de continuer.</p>
<h2 id="et-les-clients-dans-tout-ca" tabindex="-1"><a class="header-anchor" href="#et-les-clients-dans-tout-ca" aria-hidden="true">#</a> Et les clients dans tout ça ?</h2>
<p>Nous avons écrit des API… Mais pour l'instant nous n'avons pas de client (interface qui les utilise), c'est dommage ! Je suis sympa, je vais vous donner une astuce ! Sur Internet nous trouvons tout (oui oui). Vos clients peuvent être :</p>
<ul>
<li>Une page Web.</li>
<li>Une application Android.</li>
<li>etc…</li>
</ul>
<p>Nous allons tester que ça fonctionne correctement grâce à une page Web, et ça va être très simple… très très simple. Nous allons faire de l'Ajax (ne partez pas, ça va bien se passer). Pour simplifier, nous allons utiliser une excellente <a href="http://tabulator.info/" target="_blank" rel="noopener noreferrer">librairie nommée Tabulator<ExternalLinkIcon/></a></p>
<h3 id="installer-tabulator" tabindex="-1"><a class="header-anchor" href="#installer-tabulator" aria-hidden="true">#</a> Installer Tabulator</h3>
<p>Tabulator est une librairie JavaScript qui va nous masquer toute la partie appel de l'API, mais également toute la partie création du tableau affichant les résultats (avec plein d'options super cools). La première étape est donc d'ajouter la librairie dans votre projet.</p>
<p>Pour ça il suffit de suivre le : <a href="http://tabulator.info/docs/4.9/install#sources-cdn" target="_blank" rel="noopener noreferrer">Guide d'installation<ExternalLinkIcon/></a></p>
<p>En suivant le guide d'installation, nous voyons qu'il faut ajouter dans notre projet (dans le <code>head</code>) les liens suivants :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css<span class="token punctuation">"</span></span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span>
  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span>
  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js<span class="token punctuation">"</span></span>
<span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="utiliser-tabulator" tabindex="-1"><a class="header-anchor" href="#utiliser-tabulator" aria-hidden="true">#</a> Utiliser Tabulator</h3>
<p>Nous allons charger de la donnée via un appel Ajax, avec Tabulator c'est très simple, c'est même intégré <a href="http://tabulator.info/docs/4.9/data#ajax" target="_blank" rel="noopener noreferrer">il suffit de suivre la documentation<ExternalLinkIcon/></a></p>
<p>Si nous suivons la documentation, nous voyons qu'il suffit d'ajouter dans votre page fraichement créée le code suivant :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">let</span> myTable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Tabulator</span><span class="token punctuation">(</span><span class="token string">"#data"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    height<span class="token operator">:</span> <span class="token string">"311px"</span><span class="token punctuation">,</span>
    layout<span class="token operator">:</span> <span class="token string">"fitColumns"</span><span class="token punctuation">,</span>
    placeholder<span class="token operator">:</span> <span class="token string">"Aucune données"</span><span class="token punctuation">,</span>
    columns<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Nom"</span><span class="token punctuation">,</span> field<span class="token operator">:</span> <span class="token string">"name"</span><span class="token punctuation">,</span> sorter<span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span> width<span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Date du concert"</span><span class="token punctuation">,</span> sorter<span class="token operator">:</span> <span class="token string">"date"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  myTable<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token string">"/api/concert"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">La documentation, La documentation</p>
<p>Je n'invente rien ! Tout ce que je vous donne ici ne sont que des utilisations telles que défini dans la <a href="http://tabulator.info/docs/4.9/columns" target="_blank" rel="noopener noreferrer">documentation<ExternalLinkIcon/></a>.</p>
</div>
<h3 id="ajouter-les-filtres-dans-tabulator" tabindex="-1"><a class="header-anchor" href="#ajouter-les-filtres-dans-tabulator" aria-hidden="true">#</a> Ajouter les filtres dans Tabulator</h3>
<p>En suivant la documentation, je vous laisse ajouter <strong>dans le précédent tableau</strong> des filtres permettant la recherche.</p>
<p><a href="http://tabulator.info/docs/4.9/filter" target="_blank" rel="noopener noreferrer">La documentation<ExternalLinkIcon/></a></p>
<h3 id="ajouter-un-element-via-l-ajax" tabindex="-1"><a class="header-anchor" href="#ajouter-un-element-via-l-ajax" aria-hidden="true">#</a> Ajouter un élément via l'Ajax</h3>
<p>Ce n'est pas le but de ce TP, mais si vous souhaitez supprimer un élément via une action en Ajax il vous suffit de faire en JavaScript :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createNewConcert</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> date</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"date"</span><span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"/api/concert"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    method<span class="token operator">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span>
    body<span class="token operator">:</span> formData<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="suppression-via-l-ajax" tabindex="-1"><a class="header-anchor" href="#suppression-via-l-ajax" aria-hidden="true">#</a> Suppression via l'Ajax</h3>
<p>Ce n'est pas le but de ce TP, mais si vous souhaitez supprimer un élément via une action en Ajax il vous suffit de faire en JavaScript :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deleteNewConcert</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"/api/deleteConcert"</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"DELETE"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Vous pouvez par exemple <a href="http://tabulator.info/examples/3.1#callbacks" target="_blank" rel="noopener noreferrer">l'implémenter en utilisant<ExternalLinkIcon/></a></p>
<h2 id="creation-de-l-api-utilisateur" tabindex="-1"><a class="header-anchor" href="#creation-de-l-api-utilisateur" aria-hidden="true">#</a> Création de l'API utilisateur</h2>
<p>En reprenant le la démarche précédente, je vous laisse implémenter la même logique pour créer l'API utilisateur</p>
<table>
<thead>
<tr>
<th>Méthode</th>
<th>Chemin</th>
<th>Fonctionnalité</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td><code>/api/client</code></td>
<td>Liste de l'ensemble des clients / utilisateurs</td>
</tr>
<tr>
<td>POST</td>
<td><code>/api/client</code></td>
<td>Ajout d'un nouvel utilisateur / client (en fournissant les données en POST)</td>
</tr>
<tr>
<td>DELETE</td>
<td><code>/api/client/{id}</code></td>
<td>Suppression d'un utilisateur spécifié en paramètre <code>id</code></td>
</tr>
</tbody>
</table>
<ul>
<li>Création des API.</li>
<li>Création des routes.</li>
<li>Création du code permettant l'affichage des données.</li>
</ul>
</template>
