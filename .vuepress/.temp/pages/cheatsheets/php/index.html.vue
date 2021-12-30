<template><h1 id="aide-memoire-php" tabindex="-1"><a class="header-anchor" href="#aide-memoire-php" aria-hidden="true">#</a> Aide mémoire PHP</h1>
<p>Aide mémoire sur les structures PHP. Vous retrouverez dans cet aide mémoire les éléments que nous avons vus ensemble.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Cet aide mémoire n'est pas exhaustif, elle ne contient que le minimum à connaitre pour débuter sereinement.</p>
</div>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#structure">Structure</RouterLink></li><li><RouterLink to="#afficher-des-donnees">Afficher des données</RouterLink></li><li><RouterLink to="#passer-des-parametres-a-la-page">Passer des paramètres à la page</RouterLink></li><li><RouterLink to="#inclure-un-fichier-dans-un-autre">Inclure un fichier dans un autre</RouterLink></li><li><RouterLink to="#les-variables">Les variables</RouterLink><ul><li><RouterLink to="#les-superglobales">Les superglobales</RouterLink></li></ul></li><li><RouterLink to="#les-conditions">Les conditions</RouterLink></li><li><RouterLink to="#les-boucles">Les boucles</RouterLink></li><li><RouterLink to="#boucle-for-pour-afficher-des-donnees">Boucle for pour afficher des données</RouterLink><ul><li><RouterLink to="#solution-1-via-un-echo">Solution 1 : Via un echo</RouterLink></li><li><RouterLink to="#solution-2-sans-echo">Solution 2 : Sans echo</RouterLink></li></ul></li><li><RouterLink to="#les-fonctions">Les fonctions</RouterLink></li><li><RouterLink to="#la-session">La SESSION</RouterLink></li><li><RouterLink to="#redirection-d-un-utilisateur">Redirection d&#39;un utilisateur</RouterLink></li><li><RouterLink to="#exemple-simple">Exemple simple</RouterLink></li><li><RouterLink to="#page-de-traitement">Page de traitement</RouterLink></li><li><RouterLink to="#gestion-basique-d-une-authentification-«-simple-»">Gestion basique d&#39;une authentification « Simple »</RouterLink><ul><li><RouterLink to="#nous-pouvons-representer-notre-problematique-tels-que">Nous pouvons représenter notre problématique tels que :</RouterLink></li><li><RouterLink to="#et-le-code">Et le code ?</RouterLink></li></ul></li><li><RouterLink to="#le-php-et-la-base-de-donnees">Le PHP et la base de données</RouterLink><ul><li><RouterLink to="#le-code-de-connexion">Le code de connexion</RouterLink></li><li><RouterLink to="#faire-une-requete-simple-sans-parametre-s">Faire une requête SIMPLE (sans paramètre(s))</RouterLink></li><li><RouterLink to="#faire-une-requete-preparee-avec-des-parametres">Faire une requête préparée (avec des paramètres)</RouterLink></li><li><RouterLink to="#faire-une-requete-preparee-avec-des-parametres-type">Faire une requête préparée avec des paramètres typé</RouterLink></li></ul></li><li><RouterLink to="#reecriture-de-lien">Réécriture de lien</RouterLink></li></ul></nav>
</details>
<h2 id="structure" tabindex="-1"><a class="header-anchor" href="#structure" aria-hidden="true">#</a> Structure</h2>
<p>Pour être exécuté votre code doit-être dans un fichier nommé <code>quelqueschoses.php</code> et doit être mis tel que :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token comment">// Votre code</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="afficher-des-donnees" tabindex="-1"><a class="header-anchor" href="#afficher-des-donnees" aria-hidden="true">#</a> Afficher des données</h2>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Ceci est un titre"</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>

// Ou

<span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Ceci est un &lt;i>titre&lt;/i>"</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span>

// Ou

<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token variable">$test</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"Ceci est une variable"</span><span class="token punctuation">;</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Vous allez voir le contenu de la variable : <span class="token interpolation"><span class="token variable">$test</span></span>"</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="passer-des-parametres-a-la-page" tabindex="-1"><a class="header-anchor" href="#passer-des-parametres-a-la-page" aria-hidden="true">#</a> Passer des paramètres à la page</h2>
<p><img src="@source/cheatsheets/php/url-parameter-elements.png" alt="url paramters"></p>
<p>Pour envoyer le paramètre <code>param</code> à la page <code>index.php</code> :</p>
<ul>
<li><code>http://localhost/index.php?param=abc</code></li>
</ul>
<p>Pour envoyer le paramètre <code>param</code> &amp; <code>nb</code> à la page <code>index.php</code> :</p>
<ul>
<li><code>http://localhost/index.php?param=abc&amp;nb=10</code></li>
</ul>
<h2 id="inclure-un-fichier-dans-un-autre" tabindex="-1"><a class="header-anchor" href="#inclure-un-fichier-dans-un-autre" aria-hidden="true">#</a> Inclure un fichier dans un autre</h2>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'monfichier.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="les-variables" tabindex="-1"><a class="header-anchor" href="#les-variables" aria-hidden="true">#</a> Les variables</h2>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$var1</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// Valeur numérique</span>
<span class="token variable">$var2</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"Démonstration"</span><span class="token punctuation">;</span> <span class="token comment">// Valeur texte</span>
<span class="token variable">$var3</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// Valeur Booléene</span>
<span class="token variable">$var4</span> <span class="token operator">=</span> <span class="token keyword">Array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"a"</span><span class="token punctuation">,</span><span class="token string double-quoted-string">"b"</span><span class="token punctuation">,</span><span class="token string double-quoted-string">"c"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Tableau</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><table>
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
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Pour concaténer / fusionner deux variables en PHP nous utiliseront le caractère <code>.</code> exemple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">echo</span> <span class="token string double-quoted-string">"=> "</span> <span class="token operator">.</span> <span class="token variable">$var1</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"&lt;="</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<h3 id="les-superglobales" tabindex="-1"><a class="header-anchor" href="#les-superglobales" aria-hidden="true">#</a> Les superglobales</h3>
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
<td>Permets de sauvegarder des valeurs pour quelques minutes des valeurs le temps de la navigation (nous y reviendrons)</td>
</tr>
<tr>
<td><code>$_COOKIES</code></td>
<td>Permets de sauvegarder des valeurs pour un temps plus long (mais pas illimité, nous y reviendrons)</td>
</tr>
</tbody>
</table>
<h2 id="les-conditions" tabindex="-1"><a class="header-anchor" href="#les-conditions" aria-hidden="true">#</a> Les conditions</h2>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$age</span> <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$var3</span> <span class="token operator">===</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Je suis affiché si <span class="token interpolation"><span class="token variable">$age</span></span> est === 22"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$age</span> <span class="token operator">>=</span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Vous pouvez passer le permis"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Encore un peu de patience… Pour le permis c'est à 18ans"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Vérifier si une variable existe :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'param'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ici la variable $_GET['param'] est présente</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="les-boucles" tabindex="-1"><a class="header-anchor" href="#les-boucles" aria-hidden="true">#</a> Les boucles</h2>
<p><em>La boucle while</em> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$i</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token variable">$max</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token variable">$i</span> <span class="token operator">&lt;</span> <span class="token variable">$max</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Je serais affiché 100x"</span><span class="token punctuation">;</span>
    <span class="token variable">$i</span> <span class="token operator">=</span> <span class="token variable">$i</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// équivalent à $i++;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><em>La boucle for</em> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$max</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token variable">$i</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token variable">$ecrite</span> <span class="token operator">&lt;=</span> <span class="token variable">$max</span><span class="token punctuation">;</span> <span class="token variable">$i</span><span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Je vais m'afficher 100x"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$etudiants</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'nom'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Brosseau'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'nom'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Doe'</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Je vais afficher l'ensemble des étudiants présent dans le tableau.</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token variable">$i</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token variable">$i</span> <span class="token operator">&lt;</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token variable">$etudiants</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">++</span><span class="token variable">$i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token variable">$etudiants</span><span class="token punctuation">[</span><span class="token variable">$i</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nom'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><em>La boucle foreach</em> :</p>
<p>Identique à la boucle <code>for</code> mais plus concise</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$etudiants</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'nom'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Brosseau'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'nom'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Doe'</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Je vais afficher l'ensemble des étudiants présent dans le tableau.</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$etudiants</span> <span class="token keyword">as</span> <span class="token variable">$current</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token variable">$current</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nom'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="boucle-for-pour-afficher-des-donnees" tabindex="-1"><a class="header-anchor" href="#boucle-for-pour-afficher-des-donnees" aria-hidden="true">#</a> Boucle for pour afficher des données</h2>
<h3 id="solution-1-via-un-echo" tabindex="-1"><a class="header-anchor" href="#solution-1-via-un-echo" aria-hidden="true">#</a> Solution 1 : Via un echo</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$elements</span> <span class="token keyword">as</span> <span class="token variable">$element</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"
        &lt;tr>
            &lt;td> "</span> <span class="token operator">.</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"id"</span><span class="token punctuation">]</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"&lt;/td>
            &lt;td> "</span> <span class="token operator">.</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"phrase"</span><span class="token punctuation">]</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"&lt;/td>
            &lt;td> "</span> <span class="token operator">.</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"nombre"</span><span class="token punctuation">]</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"&lt;/td>
            &lt;td> "</span> <span class="token operator">.</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"date"</span><span class="token punctuation">]</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"&lt;/td>
            &lt;td> "</span> <span class="token operator">.</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"ip"</span><span class="token punctuation">]</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"&lt;/td>
        &lt;/tr>
    "</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="solution-2-sans-echo" tabindex="-1"><a class="header-anchor" href="#solution-2-sans-echo" aria-hidden="true">#</a> Solution 2 : Sans echo</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$elements</span> <span class="token keyword">as</span> <span class="token variable">$element</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token delimiter important">?></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"id"</span><span class="token punctuation">]</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"phrase"</span><span class="token punctuation">]</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"nombre"</span><span class="token punctuation">]</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"date"</span><span class="token punctuation">]</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token variable">$element</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"ip"</span><span class="token punctuation">]</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="les-fonctions" tabindex="-1"><a class="header-anchor" href="#les-fonctions" aria-hidden="true">#</a> Les fonctions</h2>
<p>Déclarer une fonction</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">gateauHugette</span><span class="token punctuation">(</span><span class="token variable">$duree</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$oeuf</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token variable">$sucre</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token variable">$farine</span> <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
    <span class="token variable">$beurre</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token variable">$chocolat</span> <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>

    <span class="token variable">$melange</span> <span class="token operator">=</span> <span class="token variable">$oeuf</span> <span class="token operator">+</span> <span class="token variable">$sucre</span> <span class="token operator">+</span> <span class="token variable">$farine</span> <span class="token operator">+</span> <span class="token variable">$beurre</span><span class="token operator">+</span> <span class="token variable">$chocolat</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token string double-quoted-string">"Cuire <span class="token interpolation"><span class="token variable">$duree</span></span> minutes le mélange de <span class="token interpolation"><span class="token variable">$melange</span></span> gramme."</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>utiliser la fonction :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">echo</span> <span class="token function">gateauHugette</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Je vais afficher à l'écran "Cuire 50 minutes le mélange de 453 gramme.";</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="la-session" tabindex="-1"><a class="header-anchor" href="#la-session" aria-hidden="true">#</a> La SESSION</h2>
<p>En PHP, nous avons la possibilité de sauvegarder « simplement » des données côté serveur. En PHP la SESSION n'est pas démarrée automatiquement, il faut pour ça :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token function">session_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>À partir de maintenant vous pouvez écrire dans votre SESSION, par exemple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"groupe"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"admin"</span><span class="token punctuation">;</span>
<span class="token comment">// Cette valeur est maintenant persisté sur le serveur, votre utilisateur sera admin jusqu'à ce que la SESSION soit détruite.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Et pour détruire les données ?</p>
<p>Si vous souhaitez détruire la SESSION <strong>et l'ensemble des valeurs présentes dedans</strong>, vous devez détruire la SESSION:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token function">session_destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<h2 id="redirection-d-un-utilisateur" tabindex="-1"><a class="header-anchor" href="#redirection-d-un-utilisateur" aria-hidden="true">#</a> Redirection d'un utilisateur</h2>
<p>En PHP vous pouvez rediriger l'utilisateur d'une page à l'autre assez simplement.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
        <span class="token comment">// Redirection vers Google</span>
        <span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'location: https://www.google.com'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token delimiter important">?></span></span>

    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
        <span class="token comment">// Redirection vers une page de votre site</span>
        <span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'location: ./connexion.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token delimiter important">?></span></span>

    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
        <span class="token comment">// Redirection vers une page de votre site avec des paramètres.</span>
        <span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'location: index.php?page=connexion'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">die ?</p>
<p>La fonction <code>die()</code> permet d'arrête l'exécution de la suite du script. Dans le cadre d'une redirection ça permet d'être certains que la suite du code ne sera pas exécutée.</p>
</div>
<h2 id="exemple-simple" tabindex="-1"><a class="header-anchor" href="#exemple-simple" aria-hidden="true">#</a> Exemple simple</h2>
<p>Exemple de fichier PHP avec traitement, accessible via un lien du type :</p>
<ul>
<li><code>http://localhost/index.php</code></li>
<li><code>http://localhost/index.php?nb=10</code></li>
<li><code>http://localhost/index.php?nb=100&amp;phrase=Ceci est un test</code></li>
</ul>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$nb_lignes</span> <span class="token operator">=</span> <span class="token number">25</span><span class="token punctuation">;</span> <span class="token comment">// Nombre de phrases à écrire par défaut</span>
<span class="token variable">$phrase</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// Nombre de phrases actuellement écrites</span>
<span class="token variable">$a_ecrire</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"Ceci est ma phrase par défaut"</span><span class="token punctuation">;</span> <span class="token comment">// phrase par défaut</span>

<span class="token comment">// Test si le paramètre nb est passé dans la barre d'adresse.</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nb'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// on redéfinie nb_ligne par rapport à ce qui est dans la barre</span>
    <span class="token variable">$nb_lignes</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nb'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Test si phrase est passé en paramètre</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'phrase'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$a_ecrire</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'phrase'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Traitement</span>
<span class="token comment">// Boucle qui affiche les phrases.</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token variable">$phrase</span> <span class="token operator">&lt;</span> <span class="token variable">$nb_lignes</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"&lt;p>"</span> <span class="token operator">.</span> <span class="token variable">$a_ecrire</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"&lt;/p>"</span><span class="token punctuation">;</span>
    <span class="token variable">$phrase</span> <span class="token operator">=</span> <span class="token variable">$phrase</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// équivalent à $phrase++;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="page-de-traitement" tabindex="-1"><a class="header-anchor" href="#page-de-traitement" aria-hidden="true">#</a> Page de traitement</h2>
<p>Une page de traitement est une page « avec un traitement côté serveur », la structure de celle-ci est toujours là même :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'input'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Traitement, c'est ici que vous devez écrire votre code</span>
        <span class="token comment">// Il correspond à l'action que vous souhaitez faire avec les données reçues.</span>

        <span class="token comment">// - Insertion en BDD</span>
        <span class="token comment">// - Authentification</span>
        <span class="token comment">// - Etc</span>
    <span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>POST<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Votre Input<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Ajouter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="gestion-basique-d-une-authentification-«-simple-»" tabindex="-1"><a class="header-anchor" href="#gestion-basique-d-une-authentification-«-simple-»" aria-hidden="true">#</a> Gestion basique d'une authentification « Simple »</h2>
<p>En PHP, il est possible assez simplement de gérer des espaces d'administrations. Les espaces d'administrations sont « des simples pages web », elles sont juste protégées par un login et un mot de passe avant d'entrer sur la page souhaitée.</p>
<h3 id="nous-pouvons-representer-notre-problematique-tels-que" tabindex="-1"><a class="header-anchor" href="#nous-pouvons-representer-notre-problematique-tels-que" aria-hidden="true">#</a> Nous pouvons représenter notre problématique tels que :</h3>
<p><img src="@source/cheatsheets/php/uml-connexion.png" alt="UML représentant la tentative d'accès d'un utilisateur"></p>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><strong>Page de connexion avec base de données</strong>:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'login'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'password'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Vérification si l'utilisateur existe</span>
        <span class="token variable">$stmt</span><span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM users WHERE login=? AND password=SHA2(?, 512)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'login'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'password'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$users</span> <span class="token operator">=</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// La personne existe en base de données (nous allons donc la connecter)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token variable">$users</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// Réussite de la connexion, on sauvegarde dans la SESSION les informations.</span>
            <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'user'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$users</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token function">header</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"location: / "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// Action en cas d'echec de connexion</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.php?page=connexion<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>login<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Votre Login<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Votre mot de passe<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Me connecter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="le-php-et-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#le-php-et-la-base-de-donnees" aria-hidden="true">#</a> Le PHP et la base de données</h2>
<p>Si vous souhaitez l'aide mémoire pour <RouterLink to="/cheatsheets/sql/">la partie SQL c'est par ici</RouterLink></p>
<h3 id="le-code-de-connexion" tabindex="-1"><a class="header-anchor" href="#le-code-de-connexion" aria-hidden="true">#</a> Le code de connexion</h3>
<p>Ce code est à mettre dans un fichier <code>utils/db.php</code>, il suffira de l'inclure dans les pages où vous souhaiter faire des requêtes.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Cette partie est à customiser</span>
<span class="token variable">$server</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"localhost"</span><span class="token punctuation">;</span>
<span class="token variable">$db</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"VOTRE-BDD"</span><span class="token punctuation">;</span>
<span class="token variable">$user</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"utilisateur"</span><span class="token punctuation">;</span>
<span class="token variable">$passwd</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"mot-de-passe"</span><span class="token punctuation">;</span>
<span class="token comment">// Fin de la partie customisable</span>

<span class="token comment">// Cette partie est générique à l'ensemble de vos projets utilisant une base de données.</span>
<span class="token variable">$dsn</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"mysql:host=<span class="token interpolation"><span class="token variable">$server</span></span>;dbname=<span class="token interpolation"><span class="token variable">$db</span></span>"</span><span class="token punctuation">;</span>
<span class="token variable">$pdo</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PDO</span><span class="token punctuation">(</span><span class="token variable">$dsn</span><span class="token punctuation">,</span> <span class="token variable">$user</span><span class="token punctuation">,</span> <span class="token variable">$passwd</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="faire-une-requete-simple-sans-parametre-s" tabindex="-1"><a class="header-anchor" href="#faire-une-requete-simple-sans-parametre-s" aria-hidden="true">#</a> Faire une requête SIMPLE (sans paramètre(s))</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// ATTENTION ATTENTION : Cette ligne ne doit être mise qu'une seule fois.</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'./utils/db.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Requêtes SQL que nous souhaitons jouer.</span>
<span class="token variable">$results</span> <span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">query</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM votreTable"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="faire-une-requete-preparee-avec-des-parametres" tabindex="-1"><a class="header-anchor" href="#faire-une-requete-preparee-avec-des-parametres" aria-hidden="true">#</a> Faire une requête préparée (avec des paramètres)</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// ATTENTION ATTENTION : Cette ligne ne doit être mise qu'une seule fois.</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'./utils/db.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Requête préparée :</span>
<span class="token variable">$stmt</span><span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM phrases WHERE id = ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">22</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Paramètre qui va remplacer le « ? ».</span>
<span class="token variable">$results</span> <span class="token operator">=</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Dans quel cas utiliser l'un, et dans quel cas utiliser l'autre ? C'est simple, vous avez des valeurs variables (paramètres, saisie utilisateur, etc.) ?</p>
<ul>
<li><strong>OUI</strong> : Requête préparée.</li>
<li><strong>NON</strong> : Requête classique.</li>
</ul>
</div>
<h3 id="faire-une-requete-preparee-avec-des-parametres-type" tabindex="-1"><a class="header-anchor" href="#faire-une-requete-preparee-avec-des-parametres-type" aria-hidden="true">#</a> Faire une requête préparée avec des paramètres typé</h3>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// ATTENTION ATTENTION : Cette ligne ne doit être mise qu'une seule fois.</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'./utils/db.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$nbParPage</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// Nombre d'élément par page</span>
<span class="token variable">$page</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// Page actuellement affiché</span>

<span class="token variable">$stmt</span><span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM phrases LIMIT ? OFFSET ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">bindValue</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token variable">$nbParPage</span><span class="token punctuation">,</span> <span class="token class-name static-context">PDO</span><span class="token operator">::</span><span class="token constant">PARAM_INT</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Paramètre qui va remplacer le 1er « ? »</span>
<span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">bindValue</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token variable">$limit</span> <span class="token operator">*</span> <span class="token variable">$page</span><span class="token punctuation">,</span> <span class="token class-name static-context">PDO</span><span class="token operator">::</span><span class="token constant">PARAM_INT</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Paramètre qui va remplacer le 2nd « ? ».</span>

<span class="token comment">// On lance la requête sur le server de BDD</span>
<span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Récupération des résultats dans la variable $results.</span>
<span class="token variable">$results</span> <span class="token operator">=</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name static-context">PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="reecriture-de-lien" tabindex="-1"><a class="header-anchor" href="#reecriture-de-lien" aria-hidden="true">#</a> Réécriture de lien</h2>
<p>Pour ça, il faut créer un fichier <code>.htaccess</code> avec comme contenu:</p>
<div class="language-htaccess ext-htaccess line-numbers-mode"><pre v-pre class="language-htaccess"><code>RewriteEngine On
RewriteCond %{REQUEST_URI} !index.php
RewriteRule (.*).html index.php?page=$1 [L,QSA]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Nous pouvons donc maintenant écrire :</p>
<ul>
<li>home.html (<code>index.php?page=home</code>)</li>
<li>bart.html (<code>index.php?page=bart</code>)</li>
<li>about.html (<code>index.php?page=about</code>)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Comment ça fonctionne ?</p>
<p>Nous avons donc une règle qui indique :</p>
<p><code>(.*).html</code> =&gt; <code>index.php?page=$1 [L,QSA]</code></p>
<p>Le <code>(.*).html</code> veut dire n'importe quel texte saisi avant le <code>.html</code> sera transformé en <code>index.php?page=$1</code>. <code>$1</code> étant « le n'importe quoi saisi avant le <code>.html</code>.</p>
</div>
</template>
