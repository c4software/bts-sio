<template><h1 id="ajouter-vuejs-2-0-dans-un-site-existant" tabindex="-1"><a class="header-anchor" href="#ajouter-vuejs-2-0-dans-un-site-existant" aria-hidden="true">#</a> Ajouter VueJS 2.0 dans un site existant</h1>
<p>Dans le cadre du TP, vous allez devoir « moderniser » une application simple. L’application à migrer a été réalisée dans le cadre de la démonstration.</p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#les-api">Les API</RouterLink><ul><li><RouterLink to="#creation-des-api">Création des API</RouterLink></li><li><RouterLink to="#utiliser-vuejs-sans-npm">Utiliser VueJS sans NPM</RouterLink></li><li><RouterLink to="#questions">Questions</RouterLink></li><li><RouterLink to="#creation-d-un-nouveau-template">Création d&#39;un nouveau template</RouterLink></li><li><RouterLink to="#acceder-a-la-page">Accéder à la page</RouterLink></li><li><RouterLink to="#liste-des-todos">Liste des todos</RouterLink></li><li><RouterLink to="#hey">@ ? Hey !</RouterLink></li><li><RouterLink to="#asynchrone">Asynchrone</RouterLink></li><li><RouterLink to="#decouverte-de-fetch">Découverte de Fetch</RouterLink></li><li><RouterLink to="#tester-fetch">Tester Fetch</RouterLink></li></ul></li><li><RouterLink to="#la-structure-du-code-javascript">La structure du code JavaScript</RouterLink><ul><li><RouterLink to="#la-liste-1">La liste</RouterLink></li><li><RouterLink to="#les-actions">Les actions</RouterLink></li></ul></li><li><RouterLink to="#structure-de-base">Structure de base</RouterLink><ul><li><RouterLink to="#ajouter-votre-script">Ajouter votre script</RouterLink></li><li><RouterLink to="#recuperer-les-todos">Récupérer les Todos</RouterLink></li><li><RouterLink to="#ajout-d-une-todo">Ajout d&#39;une TODO</RouterLink></li><li><RouterLink to="#marquer-comme-termine-1">Marquer comme terminé</RouterLink></li><li><RouterLink to="#suppression-1">Suppression</RouterLink></li><li><RouterLink to="#et-voila">Et voilà !</RouterLink></li><li><RouterLink to="#amelioration-1">Amélioration 1</RouterLink></li><li><RouterLink to="#amelioration-2">Amélioration 2</RouterLink></li><li><RouterLink to="#amelioration-3">Amélioration 3</RouterLink></li><li><RouterLink to="#partager-les-todos-au-monde">Partager les TODOS au monde !</RouterLink></li><li><RouterLink to="#migrer-vers-bootstrap-vuejs">Migrer vers Bootstrap VueJS</RouterLink></li></ul></li></ul></nav>
</details>
<p>L’application existante est une « TodoList » codée avec le Framework Laravel.</p>
<h2 id="les-api" tabindex="-1"><a class="header-anchor" href="#les-api" aria-hidden="true">#</a> Les API</h2>
<p>Dans ce TP nous allons transformer « entièrement » votre ancien site codé en Laravel par « un équivalent » qui va fonctionner avec des API.</p>
<p>🤓 Nous n'allons donc plus utiliser la puissance de Blade, mais celle de VueJS 🚀.</p>
<h3 id="creation-des-api" tabindex="-1"><a class="header-anchor" href="#creation-des-api" aria-hidden="true">#</a> Création des API</h3>
<p>La « nouvelle version » de notre page va utiliser des API (et de l'Ajax), ça va fondamentalement changer le fonctionnement de votre application. Il faut donc dans un premier temps créer les API qui seront nécessaires au bon fonctionnement (asynchrone) de votre page Web.</p>
<ul>
<li>Lister les éléments dans la TodoList.</li>
<li>Ajouter un nouvel élément dans la TodoList.</li>
<li>Marquer un élément comme terminé.</li>
<li>Supprimer un élément.</li>
</ul>
<p>✋ En tant que développeur vous devez être malin (et fainéants…). Pour écrire les autres API ne tenter pas de réinventer la roue, nous allons utiliser le même code que le contrôleur actuel !</p>
<p>Les seules différences seront :</p>
<ul>
<li><code>view([…], […]Todo::all()[…])</code> remplacé par <code>return response()-&gt;json(Todo::all());</code></li>
<li>Et pour une simple réponse de réussite (exemple remove ou done) <code>return response()-&gt;json(array(&quot;status&quot; =&gt; 1))</code></li>
</ul>
<h4 id="creation-du-controleur-pour-les-api" tabindex="-1"><a class="header-anchor" href="#creation-du-controleur-pour-les-api" aria-hidden="true">#</a> Création du contrôleur pour les API</h4>
<p>Nous allons donc créer un nouveau contrôleur qui va gérer la partie API de notre application (les appels « client »). Nous allons simplement l'appeler « api ».</p>
<p>Pour le créer, il faut utiliser la commande <code>make:controller</code></p>
<Reveal text="Voir la solution">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:controller api
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></Reveal>
<p>Un nouveau contrôleur vide vient d'être créé, il faut maintenant déclarer l'ensemble de nos méthodes.</p>
<h5 id="definition-des-methodes-necessaires" tabindex="-1"><a class="header-anchor" href="#definition-des-methodes-necessaires" aria-hidden="true">#</a> Définition des méthodes nécessaires</h5>
<p>Avant de commencer la partie code, voilà la liste des <code>Routes</code> -&gt; <code>Méthode</code> nécessaires au bon fonctionnement de notre API :</p>
<table>
<thead>
<tr>
<th>Route</th>
<th style="text-align:center">Méthode</th>
<th style="text-align:center">Paramètre</th>
<th style="text-align:right">Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>/api/</td>
<td style="text-align:center">list()</td>
<td style="text-align:center"></td>
<td style="text-align:right">GET</td>
</tr>
<tr>
<td>/api/add</td>
<td style="text-align:center">add(Request $request)</td>
<td style="text-align:center">Request</td>
<td style="text-align:right">POST</td>
</tr>
<tr>
<td>/api/done/{id}</td>
<td style="text-align:center">done($id)</td>
<td style="text-align:center">id</td>
<td style="text-align:right">PATCH</td>
</tr>
<tr>
<td>/api/delete/{id}</td>
<td style="text-align:center">remove($id)</td>
<td style="text-align:center">id</td>
<td style="text-align:right">DELETE</td>
</tr>
</tbody>
</table>
<p>🔥 Pour la suite référez-vous à ce tableau pour les noms de méthode ainsi que les paramètres 🔥</p>
<h5 id="la-liste" tabindex="-1"><a class="header-anchor" href="#la-liste" aria-hidden="true">#</a> La liste</h5>
<p>Dans le fichier <code>app/Http/Controllers/api.php</code> ajouter une méthode nommée <code>list</code>. Celle-ci doit contenir le code suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token class-name static-context">Todos</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Bien évidemment je vous laisse écrire le reste du code. Vous pouvez vous inspirer du code du premier TP.</p>
<h5 id="l-ajout" tabindex="-1"><a class="header-anchor" href="#l-ajout" aria-hidden="true">#</a> L'ajout</h5>
<p>Pour l'ajout, le code va être <strong>identique</strong> à celui de premier TP, la seule différence c'est que celui-ci doit retourner 1 ou 0 en fonction de la réussite ou non :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>  <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"status"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Je vous laisse écrire le reste du code !</p>
<h5 id="marquer-comme-termine" tabindex="-1"><a class="header-anchor" href="#marquer-comme-termine" aria-hidden="true">#</a> Marquer comme terminé</h5>
<p>Comme pour l'ajout, le code va être identique au TP précédent à l'exception du retour :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>  <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"status"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// Ou en en cas échec</span>
  <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"status"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="suppression" tabindex="-1"><a class="header-anchor" href="#suppression" aria-hidden="true">#</a> Suppression</h5>
<p>Comme pour l'ajout, le code va être identique au TP précédent à l'exception du retour :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>  <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"status"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Ou en en cas échec d'ajout il faudra retourner</span>
  <span class="token keyword">return</span> <span class="token function">response</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">json</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"status"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>⚠️ Attention à faire correctement le test !</p>
<h5 id="perdu" tabindex="-1"><a class="header-anchor" href="#perdu" aria-hidden="true">#</a> Perdu</h5>
<p>Normalement vous avez l'ensemble des informations pour y arriver seul, si vous bloquez voilà :</p>
<Reveal text="Voir la définition des méthodes">
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Controllers</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">App<span class="token punctuation">\</span>Todos</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Http<span class="token punctuation">\</span>Request</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">api</span> <span class="token keyword">extends</span> <span class="token class-name">Controller</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">add</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">done</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">remove</span><span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div></Reveal>
<p>✋ Je vous laisse écrire le code des méthodes seul, rappel il est presque identique à celui du premier TP.</p>
<h5 id="les-routes" tabindex="-1"><a class="header-anchor" href="#les-routes" aria-hidden="true">#</a> Les routes</h5>
<p>Le code étant « finalisé ». Il faut maintenant indiquer à Laravel les routes (chemin / url) d'accès aux différentes méthodes.</p>
<p>Dans le fichier <code>routes/api.php</code> ajouter le contenu suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/'</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"api@list"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"api.list"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/add'</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"api@add"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'api.add'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">patch</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/done/{id}'</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"api@done"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'api.done'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/delete/{id}'</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"api@remove"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'api.remove'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>✋ Comme vous pouvez le voir le <code>/api/…</code> n'est pas spécifié… Pourquoi ?</p>
<p>Simplement avec Laravel toutes les routes dans le fichier <code>routes/api.php</code> sont automatiquement préfixées par <code>/api/</code>. 🤯</p>
<p>Vous API sont maintenant accessibles.</p>
<h5 id="validation-des-api" tabindex="-1"><a class="header-anchor" href="#validation-des-api" aria-hidden="true">#</a> Validation des API</h5>
<p>Valider que vos API fonctionnent correctement grâce à l'outil <a href="https://www.getpostman.com/" target="_blank" rel="noopener noreferrer">Postman<ExternalLinkIcon/></a>.</p>
<p>(Pssst! La création de comptes <strong>n'est pas obligatoire</strong>) &lt;-- ⚠️⚠️</p>
<p>🤓 Commencez par la plus simple, par exemple <code>/api/</code> qui doit normalement lister votre actuelle TodoList.</p>
<p>✋ Tester l'ensemble de vos API avant de continuer.</p>
<h3 id="utiliser-vuejs-sans-npm" tabindex="-1"><a class="header-anchor" href="#utiliser-vuejs-sans-npm" aria-hidden="true">#</a> Utiliser VueJS sans NPM</h3>
<p><code>npm</code> n'est pas la seule solution pour installer VueJS, si votre projet n'utilise pas <code>npm</code> vous pouvez l'utiliser simplement en l'ajoutant dans le header de votre site via une balise script :</p>
<p>Via un CDN :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>ou en téléchargeant la librairie :</p>
<p><a href="https://vuejs.org/v2/guide/installation.html#Direct-lt-script-gt-Include" target="_blank" rel="noopener noreferrer">Disponible ici<ExternalLinkIcon/></a></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>CHEMIN_PUBLIC_A_VOUS/vue.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="questions" tabindex="-1"><a class="header-anchor" href="#questions" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Qu'est-ce qu'un CDN ?</li>
<li>À votre avis pourquoi n'avons nous pas utilisé npm et la gestion des dépendances de Laravel ?</li>
<li>Quels sont les dangers du CDN ?</li>
</ul>
<h3 id="creation-d-un-nouveau-template" tabindex="-1"><a class="header-anchor" href="#creation-d-un-nouveau-template" aria-hidden="true">#</a> Création d'un nouveau template</h3>
<p>Pour la démonstration nous allons créer un nouveau template, il sera <code>@extends</code> de <code>template.blade.php</code> que vous avez précédemment créé.</p>
<p>Créer un nouveau fichier <code>resources/views/homevue.blade.php</code> et y mettre le contenu suivant :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>@extends("template") @section("title", "Todo List - Version VueJS")
@section("content")
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!-- Action --></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>add<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
            <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span>
            <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-control<span class="token punctuation">"</span></span>
            <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Prendre une note…<span class="token punctuation">"</span></span>
            <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span>
          <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

      <span class="token comment">&lt;!-- Liste des Todos --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
@endsection
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ul>
<li>Avez-vous vu des éléments propres à VueJS ?</li>
</ul>
<h3 id="acceder-a-la-page" tabindex="-1"><a class="header-anchor" href="#acceder-a-la-page" aria-hidden="true">#</a> Accéder à la page</h3>
<p>Maintenant que notre template est créé, nous allons pouvoir l'utiliser.</p>
<p>Pour l'utiliser, il faut créer <strong>2 choses</strong> :</p>
<ul>
<li>Une méthode dans le contrôleur <code>TodosController.php</code>.</li>
<li>Une route (exemple <code>/vue</code>) dans le fichier <code>routes/web.php</code>.</li>
</ul>
<Reveal text="Un doute sur le code de la méthode ?">
<p>Le code de la méthode est :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">homevue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"homevue"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></Reveal>
<p>🔥 Maintenant que votre code est prêt, tester votre application :</p>
<ul>
<li>Démarrer votre serveur de test (<code>php artisan serve</code>).</li>
<li>Accéder à la page <a href="http://127.0.0.1:8000/vue" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8000/vue<ExternalLinkIcon/></a></li>
<li>Normalement le formulaire d'ajout s'affiche… Rien dans la liste ? Pas de panique le code n'est pas encore présent.</li>
</ul>
<h3 id="liste-des-todos" tabindex="-1"><a class="header-anchor" href="#liste-des-todos" aria-hidden="true">#</a> Liste des todos</h3>
<p>Même si pour l'instant nous n'avons pas encore fait le code pour appeler les API, ajouter le code HTML suivant après <code>&lt;!-- Liste des todos --&gt;</code> présente dans le fichier <code>homevue.blade.php</code>:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list-group pt-3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list-group-item<span class="token punctuation">"</span></span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo in todos<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>@{{ todo.texte }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pull-right action<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo.termine !== <span class="token punctuation">'</span>1<span class="token punctuation">'</span><span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-success<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fas fa-check<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span>
      <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-else</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-danger<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fas fa-trash<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todos.length === 0<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list-group-item text-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    C'est vide !
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ul>
<li>Quels sont les éléments spécifiques à VueJS ?</li>
</ul>
<p>🔥 Tester à nouveau, votre liste doit s'afficher… Mais pas de la façon attendue… C'est normal, nous devons maintenant écrire le code VueJS correspondant à votre application (à savoir Liste, Ajout, Marquer comme terminé, et Supprimer).</p>
<h3 id="hey" tabindex="-1"><a class="header-anchor" href="#hey" aria-hidden="true">#</a> @ ? Hey !</h3>
<ul>
<li><code>@</code> À quoi correspond le <code>@</code> ? (Pssst, c'est en lien avec Laravel)</li>
<li>Tenter de le retirer pour voir ce qui se passe ?</li>
<li>Pourquoi ça ne fonctionne plus?</li>
</ul>
<h3 id="asynchrone" tabindex="-1"><a class="header-anchor" href="#asynchrone" aria-hidden="true">#</a> Asynchrone</h3>
<p>L’ensemble de l’application va devenir « asynchrone », vous allez vite vous rendre compte que la migration va nécessiter quelques appels en Ajax. Pour faire nos appels, nous utiliserons l’API « Fetch » des navigateurs, celle-ci est intégrée dans l’ensemble des navigateurs récents, le bon réflexe est quand même d’aller voir le support de Fetch sur (<a href="https://caniuse.com/#search=fetch" target="_blank" rel="noopener noreferrer">Can i use<ExternalLinkIcon/></a>).</p>
<h3 id="decouverte-de-fetch" tabindex="-1"><a class="header-anchor" href="#decouverte-de-fetch" aria-hidden="true">#</a> Découverte de Fetch</h3>
<p>L'API Fetch fournit une interface JavaScript pour l'accès et la manipulation des parties du pipeline HTTP, comme les requêtes et les réponses. Cela fournit aussi une méthode globale fetch() qui procure un moyen facile et logique de récupérer des ressources à travers le réseau de manière asynchrone.</p>
<p>Ce genre de fonctionnalité était auparavant réalisé avec XMLHttpRequest. Fetch fournit une meilleure alternative qui peut être utilisée facilement par d’autres technologies comme Service Workers. Fetch fournit aussi un endroit unique et logique pour la définition d'autres concepts liés à HTTP comme CORS et les extensions d'HTTP.</p>
<p>(Source: MDM)</p>
<p>Le support de l'API Fetch peut être détecté en vérifiant l'existence de Headers, Request, Response ou fetch() sur la portée de Window ou de Worker.
Par exemple, vous pouvez faire cela dans votre script:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>fetch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Le support de Fetch est présent</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// Gérer le cas du non support de fetch.</span>
  <span class="token comment">// Pour réduire le nombre de cas possible vous pouvez ajouter : https://github.github.io/fetch/ à votre projet (Yeah finit l'Ajax compliqué 😎)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="tester-fetch" tabindex="-1"><a class="header-anchor" href="#tester-fetch" aria-hidden="true">#</a> Tester Fetch</h3>
<p>Avant d'intégrer Fetch dans notre code client (le site web VueJS), nous allons le <strong>TESTER</strong> dans notre navigateur, voici un exemple de code :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"GET"</span><span class="token punctuation">,</span> credentials<span class="token operator">:</span> <span class="token string">"same-origin"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// On décode le JSON, et on continue</span>
    <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// Votre retour est ICI</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Récupération impossible: "</span> <span class="token operator">+</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>⚠️ Que veut dire <code>credentials: 'same-origin'</code>?</p>
<p>Par défaut, Fetch n’utilise pas les Cookies, vous pouvez forcer l’utilisation des cookies en indiquant <code>credentials: 'same-origin'</code>. Si vous ne le faites pas, votre <code>$_SESSION</code> ne sera pas sauvegardée ⚠️</p>
<h4 id="comment-tester" tabindex="-1"><a class="header-anchor" href="#comment-tester" aria-hidden="true">#</a> Comment tester</h4>
<p>Pour valider le bon fonctionnement, nous allons utiliser la « Console développeur » de votre navigateur.</p>
<p>Fetch est une librairie très complète, pour aller plus loin dans l’utilisation de Fetch, je vous recommande la lecture de <a href="https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch" target="_blank" rel="noopener noreferrer">la documentation complète (gestion des headers, paramètres, mode, etc)<ExternalLinkIcon/></a>.</p>
<p>Tester de récupérer vos « todos » depuis votre console.</p>
<h2 id="la-structure-du-code-javascript" tabindex="-1"><a class="header-anchor" href="#la-structure-du-code-javascript" aria-hidden="true">#</a> La structure du code JavaScript</h2>
<p>Maintenant que nos API sont terminées et que notre appel via Fetch fonctionne, nous allons écrire le code JavaScript (VueJS) qui va gérer notre application.</p>
<p>Nous allons utiliser massivement la gestion d'évènement de VueJS.</p>
<p>Pour rappel n’hésitez pas à consulter le <a href="https://vuejs.org/images/lifecycle.png" target="_blank" rel="noopener noreferrer">cycle de vie des composants<ExternalLinkIcon/></a>).</p>
<h3 id="la-liste-1" tabindex="-1"><a class="header-anchor" href="#la-liste-1" aria-hidden="true">#</a> La liste</h3>
<p>La liste des tâches va être la première chose que nous allons charger. Cette « liste » sera chargée lors de l'évènement <code>beforeMount</code>.</p>
<h3 id="les-actions" tabindex="-1"><a class="header-anchor" href="#les-actions" aria-hidden="true">#</a> Les actions</h3>
<p>Les actions (done, remove, add) seront appelées lors de la vie de notre application, elles vont être déclarées dans la partie <code>methods</code> de l'objet VueJS et seront appelées via des attributs spéciaux préfixés par <code>v-on:…</code> de votre code HTML.</p>
<p>Complexe ? Pas tant que ça… Vous allez voir que c'est beaucoup plus simple que du code JavaScript classique.</p>
<h2 id="structure-de-base" tabindex="-1"><a class="header-anchor" href="#structure-de-base" aria-hidden="true">#</a> Structure de base</h2>
<p>Créer un nouveau fichier nommé <code>main.js</code>. Ce fichier doit être créé dans <code>public/js</code>. Une fois créé nous allons y ajouter le minimum pour que votre application fonctionne :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">".container"</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Code appelé à la création de votre application</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      todos<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      text<span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Code appelé juste avant l'affichage de votre application</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Récupération des Todos</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Récupération Todo depuis le serveur"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">done</span><span class="token punctuation">(</span><span class="token parameter">todo</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">todo</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>Voilà la base de notre objet VueJS.</p>
<h3 id="ajouter-votre-script" tabindex="-1"><a class="header-anchor" href="#ajouter-votre-script" aria-hidden="true">#</a> Ajouter votre script</h3>
<p>Pour ajouter votre script nous allons faire simple, nous allons « juste » l'ajouter à la fin de notre template <code>homevue</code>. Éditer le fichier <code>homevue.blade.php</code> pour y ajouter la balise <code>script</code> suivante juste avant <code>@endsection</code> :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/JavaScript<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ asset(<span class="token punctuation">'</span>js/main.js<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Tester d'accéder à nouveau à votre site web, vous devez maintenant voir dans <code>la console de développeur</code> de votre navigateur le texte suivant :</p>
<p><img src="@source/tp/vuejs/ressources/vuejs-console.png" alt="VueJS Console"></p>
<p>Pas de liste de todo dans votre page ? C'est normal ! Nous allons maintenant ajouter l'appel « Fetch ».</p>
<h4 id="questions-1" tabindex="-1"><a class="header-anchor" href="#questions-1" aria-hidden="true">#</a> Questions</h4>
<ul>
<li>À quoi correspond <code>asset</code> ?</li>
<li>À quoi correspond <code>el: '.container',</code> pourquoi est-ce très important ?</li>
</ul>
<h3 id="recuperer-les-todos" tabindex="-1"><a class="header-anchor" href="#recuperer-les-todos" aria-hidden="true">#</a> Récupérer les Todos</h3>
<p>Maintenant que nous avons la base de notre application, nous allons pouvoir compléter les « trous ». La première méthode à faire est la récupération de la liste.</p>
<p>Cette méthode est <code>list()</code>, pour l'instant elle ne comporte qu'un console.log. Nous allons la compléter pour ajouter un appel Ajax avec la méthode Fetch comme vu précédemment.</p>
<p>Les étapes vont être les suivantes :</p>
<ul>
<li>Construction de l'appel réseau (Ajax) via Fetch.</li>
<li>Mise en place de code à la place du <code>console.log</code> dans la méthode liste.</li>
<li>Tester</li>
</ul>
<p>1/ Appel réseau</p>
<p>Nous allons donc devoir faire un appel réseau vers l'url <code>api/</code>. L'appel est le même que le code précédemment testé, pour rappel :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"GET"</span><span class="token punctuation">,</span> credentials<span class="token operator">:</span> <span class="token string">"same-origin"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    app<span class="token punctuation">.</span>todos <span class="token operator">=</span> response<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Récupération impossible: "</span> <span class="token operator">+</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>2/ Remplacer le code de la méthode <code>list</code> par l'appel réseau
3/ Recharger la page.
4/ Valider le bon fonctionnement sur votre Page Web.</p>
<h4 id="questions-2" tabindex="-1"><a class="header-anchor" href="#questions-2" aria-hidden="true">#</a> Questions</h4>
<ul>
<li>À quoi fait référence <code>app</code> dans le code <code>app.todos</code> ?</li>
<li>Pourquoi plusieurs <code>then</code> ?</li>
<li>Dans quel cas pouvons-nous passer dans le <code>catch</code>?</li>
</ul>
<h3 id="ajout-d-une-todo" tabindex="-1"><a class="header-anchor" href="#ajout-d-une-todo" aria-hidden="true">#</a> Ajout d'une TODO</h3>
<p>Maintenant que notre liste est correctement construite, nous allons pouvoir faire la partie Ajout. Pour l'ajout la procédure va être la suivante :</p>
<ul>
<li>Ajout de l'attribut <code>v-on:keyup.enter=&quot;add&quot;</code> sur l'élément HTML <code>class=&quot;form-control&quot;</code> du fichier <code>resources/views/homevue.blade.php</code>.</li>
<li>Ajout d'un <code>console.log(app.text)</code> dans la méthode <code>add</code> du JS pour valider le bon fonctionnement.</li>
</ul>
<p><img src="@source/tp/vuejs/ressources/consolelog.ajout.png" alt="Console.log Ajout"></p>
<p>Bien ! Maintenant que votre <code>console.log</code> s'affiche nous allons pouvoir faire la partie appel Ajax. Pour rappel votre appel doit être du type <code>POST</code>, nous allons donc devoir écrire un appel Ajax / Fetch également de type POST :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"texte"</span><span class="token punctuation">,</span> app<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/add"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span> body<span class="token operator">:</span> formData <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  app<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// On remet à Zéro l'input utilisateur</span>
  app<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// on rafraichit la liste.</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Quelques explications :</p>
<ul>
<li>Le formData va permettre d'envoyer des valeurs en <code>POST</code> à notre API.</li>
<li>Le code dans le <code>then</code> va :
<ul>
<li>Vider la saisie utilisateur.</li>
<li>Rafraichir la liste.</li>
</ul>
</li>
</ul>
<p>🤓 Valider votre code en testant l'ajout d'une nouvelle TODO.</p>
<h3 id="marquer-comme-termine-1" tabindex="-1"><a class="header-anchor" href="#marquer-comme-termine-1" aria-hidden="true">#</a> Marquer comme terminé</h3>
<p>Maintenant que nous pouvons ajouter, il faut pouvoir « Marquer comme terminé ». Nous allons donc devoir compléter le code de la méthode <code>done(todo)</code>. Pour ça :</p>
<ul>
<li>Ajouter une action <code>v-on:click=&quot;done(todo)&quot;</code> sur le bon élément HTML.</li>
<li>Compléter le code de <code>done(todo)</code> avec le bon appel Fetch.</li>
</ul>
<h4 id="aide" tabindex="-1"><a class="header-anchor" href="#aide" aria-hidden="true">#</a> Aide</h4>
<p>Votre API attend un appel de type <code>PATCH</code> :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"…"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"PATCH"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Votre API attend le paramètre <code>ID</code> directement dans l'URL :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/done/"</span> <span class="token operator">+</span> todo<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"PATCH"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ou encore mieux les Strings Templates</span>
<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">api/done/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>todo<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"PATCH"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Pensez à bien rafraichir la liste dans le <code>then</code>.</p>
<p>🔥 Prendre exemple sur le code précédent pour compléter la méthode <code>done</code></p>
<h3 id="suppression-1" tabindex="-1"><a class="header-anchor" href="#suppression-1" aria-hidden="true">#</a> Suppression</h3>
<p>La logique pour la partie suppression va être identique à la partie <code>done</code>. Je vous laisse la réaliser seul.</p>
<h4 id="aide-1" tabindex="-1"><a class="header-anchor" href="#aide-1" aria-hidden="true">#</a> Aide</h4>
<p>Votre API attend un appel de type <code>PATCH</code> :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"…"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"DELETE"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Votre API attend le paramètre <code>ID</code> directement dans l'URL :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/delete/"</span> <span class="token operator">+</span> todo<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"DELETE"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ou encore mieux les Strings Templates</span>
<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">api/delete/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>todo<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"DELETE"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Pensez à bien rafraichir la liste dans le <code>then</code>.</p>
<h3 id="et-voila" tabindex="-1"><a class="header-anchor" href="#et-voila" aria-hidden="true">#</a> Et voilà !</h3>
<p>Vous avez fait le tour de la conversion de votre site « version Laravel » en site « version VueJS ».</p>
<Reveal text="Voir le code complet">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">".container"</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Code appelé à la création de votre application</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      todos<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      text<span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Code appelé juste avant l'affichage de votre application</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"GET"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          app<span class="token punctuation">.</span>todos <span class="token operator">=</span> response<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Récupération impossible: "</span> <span class="token operator">+</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      formData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"texte"</span><span class="token punctuation">,</span> app<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/add"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span> body<span class="token operator">:</span> formData <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        app<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// On remet à Zéro l'input utilisateur</span>
        app<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// On rafraichit la liste.</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">done</span><span class="token punctuation">(</span><span class="token parameter">todo</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">api/done/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>todo<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"PATCH"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        app<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">todo</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">api/delete/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>todo<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"DELETE"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        app<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div></Reveal>
<h3 id="amelioration-1" tabindex="-1"><a class="header-anchor" href="#amelioration-1" aria-hidden="true">#</a> Amélioration 1</h3>
<p>Ajouter une confirmation avant de supprimer une TODO. En utilisant par exemple <a href="https://github.com/Godofbrowser/vuejs-dialog" target="_blank" rel="noopener noreferrer">VueJS Dialog<ExternalLinkIcon/></a>.</p>
<p>✋ Attention, nous n'utilisons pas NPM dans le projet. Vous devez importer manuellement les librairies.</p>
<h3 id="amelioration-2" tabindex="-1"><a class="header-anchor" href="#amelioration-2" aria-hidden="true">#</a> Amélioration 2</h3>
<p>Reformater le code pour créer une fonction permettant d'utiliser Fetch (et donc de ne pas avoir plusieurs fois la partie <code>Fetch(…)</code> dans votre code).</p>
<p>Aide : Créer une librairie (<code>utils.js</code>) qui contiendra le code nécessaire.</p>
<h3 id="amelioration-3" tabindex="-1"><a class="header-anchor" href="#amelioration-3" aria-hidden="true">#</a> Amélioration 3</h3>
<p>Afficher des messages d'erreurs en cas de <code>catch</code> lors des appels réseau.</p>
<h3 id="partager-les-todos-au-monde" tabindex="-1"><a class="header-anchor" href="#partager-les-todos-au-monde" aria-hidden="true">#</a> Partager les TODOS au monde !</h3>
<p>Depuis quelques jours Chrome propose une nouvelle API nommée « Web Share Api ». Cette API permet de déclencher « le Partage » d’une information en utilisant les possibilités native du Téléphone. Comme cette API n’est disponible que sur un téléphone et uniquement en HTTPS vous devez tester si celle-ci est disponible via :</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>if (navigator.share) {
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><a href="https://caniuse.com/#search=Web%20Share%20Api" target="_blank" rel="noopener noreferrer">Voir le support de Share<ExternalLinkIcon/></a></p>
<p>Mais comme nous sommes avec VueJS nous allons gérer ça avec le MVVM (Modèle Vue, Vue-Modèle), ça va nous permettre d’injecter une variable à la création de l’objet <code>app</code> pour connaitre si le partage est disponible. Exemple :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">'.container'</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
      todos<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      isShare<span class="token operator">:</span> navigator<span class="token punctuation">.</span>share<span class="token operator">?</span><span class="token boolean">true</span><span class="token operator">:</span><span class="token boolean">false</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Une fois fait, vous avez une variable <code>isShare</code> qui sera <code>true</code> Ou <code>false</code> en fonction du support du navigateur. Maintenant que le booléen est disponible, vous pouvez ajouter un élément cliquable pour déclencher l’action (prendre exemple sur la suppression ou le marquer comme terminé). Exemple de code pour déclencher le partage :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>…<span class="token punctuation">]</span>
methods<span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function-variable function">share</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">todo</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      navigator<span class="token punctuation">.</span><span class="token function">share</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        title<span class="token operator">:</span> <span class="token string">'VueJS-Todo'</span><span class="token punctuation">,</span>
        text<span class="token operator">:</span> todo<span class="token punctuation">.</span>text<span class="token punctuation">,</span>
        url<span class="token operator">:</span> <span class="token string">""</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">// Afficher une confirmation.</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">// Afficher un message d'erreur à votre utilisateur.</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>C’est à vous !</p>
<h3 id="migrer-vers-bootstrap-vuejs" tabindex="-1"><a class="header-anchor" href="#migrer-vers-bootstrap-vuejs" aria-hidden="true">#</a> Migrer vers Bootstrap VueJS</h3>
<p>Dans les exemples précédents, nous avons utilisé VueJS pour « améliorer » l'interface de notre site web existant. Mais avec VueJS il est possible d'aller beaucoup plus loin. Il est possible de réécrire l'ensemble pour utiliser des composants fournis par la communauté.</p>
<p>Je vous propose donc de réécrire la page que vous avez ajoutée en utilisant <a href="https://bootstrap-vue.js.org/" target="_blank" rel="noopener noreferrer">Bootsrap VueJS<ExternalLinkIcon/></a></p>
<ul>
<li>Réécrire l'interface.</li>
<li>Utiliser les composants pour les boutons.</li>
<li>Utiliser « le composant » alert.</li>
</ul>
</template>
