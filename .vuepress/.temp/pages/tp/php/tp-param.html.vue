<template><h1 id="le-passage-de-parametres" tabindex="-1"><a class="header-anchor" href="#le-passage-de-parametres" aria-hidden="true">#</a> Le passage de paramètres</h1>
<p>Nous allons illustrer le passage de paramètres grâce à la Greta TV. Ce TP va nous permettre de mieux comprendre l'intérêt des paramètres.</p>
<p>Nous allons produire le code qui va nous permettre de réaliser les deux pages suivantes :</p>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/sGStM92OIG0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>L'objectif de ce code est d'illustrer le passage de paramètres entre deux pages via un paramètre GET. Celui-ci contiendra :</p>
<ul>
<li>Deux pages</li>
<li>Responsive</li>
<li>Un paramètre (?id=...)</li>
</ul>
<h2 id="rappel-sur-les-parametres" tabindex="-1"><a class="header-anchor" href="#rappel-sur-les-parametres" aria-hidden="true">#</a> Rappel sur les paramètres</h2>
<table>
<thead>
<tr>
<th>Variables</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
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
</tbody>
</table>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Exemple $_GET Contiendra</span>
<span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token string double-quoted-string">"prenom"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"valentin"</span><span class="token punctuation">,</span>
    <span class="token string double-quoted-string">"nom"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"brosseau"</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">echo</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nom'</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// Affichera brosseau</span>
<span class="token keyword">echo</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'prenom'</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// Affichera valentin</span>

<span class="token keyword">echo</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nom'</span><span class="token punctuation">]</span> <span class="token operator">.</span> <span class="token string double-quoted-string">" "</span> <span class="token operator">.</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'prenom'</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// Affichera brosseau valentin</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="evolution-0" tabindex="-1"><a class="header-anchor" href="#evolution-0" aria-hidden="true">#</a> Évolution 0</h2>
<p>Nous allons nous servir des <code>includes</code> pour « organiser » notre code. L'idée derrière cette organisation est simple, évitée de multiplier le code identique entre différentes pages. Si vous regardez votre code, vous allez rapidement remarquer que certains éléments sont identiques sur les deux pages :</p>
<ul>
<li>le <code>&lt;nav&gt;</code></li>
<li>le <code>&lt;head&gt;</code></li>
</ul>
<p>Nous avons en PHP la possibilité de « sortir » les éléments en question pour les inclure ou ça est nécessaire. Par exemple, pour le <code>&lt;nav&gt;</code> je vous propose de créer un fichier <code>nav.php</code> dans un dossier nommé <code>components</code>. Dans mon cas le fichier contiendra <strong>uniquement</strong>:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token operator">&lt;</span>nav <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"navbar navbar-expand-lg navbar-dark bg-dark"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"container-fluid"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>a <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"navbar-brand"</span> href<span class="token operator">=</span><span class="token string double-quoted-string">"/"</span><span class="token operator">></span><span class="token constant">GRETA</span> <span class="token constant">TV</span><span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>nav<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Puis pour l'utiliser, il vous suffira de le mettre à l'endroit où vous souhaitez l'afficher :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"./components/nav.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span>

<span class="token comment">&lt;!-- La suite de votre code --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Hé oui !</p>
<p>C'est effectivement aussi simple que ça. N'oubliez pas, 50% de votre travail repose sur votre bonne organisation !</p>
</div>
<p>Je vous laisse faire de même pour la partie <code>head</code> de votre site.</p>
<div class="custom-container tip"><p class="custom-container-title">Bon ok…</p>
<p>Un petit indice pour la suite, votre structure de dossier ressemblera à :
<img src="@source/tp/php/res/gretatv_struct.png" alt="Structure GRETA TV"></p>
</div>
<h2 id="evolution-1" tabindex="-1"><a class="header-anchor" href="#evolution-1" aria-hidden="true">#</a> Évolution 1</h2>
<p>Je vous propose comme évolution d'ajouter un paramètre. Celui-ci devra nous permettre la personnalisation du thème de la page <code>tv.php</code> (celle affichant les vidéos). Pour ça nous allons :</p>
<ul>
<li>Ajouter un paramètre <code>&amp;bg=noel</code> ou <code>&amp;bg=brick</code>, etc.</li>
<li>Utiliser le paramètre pour personnaliser le thème de la page. (Le paramètre doit être utilisé en tant que <code>class</code>).</li>
</ul>
<h2 id="evolution-2" tabindex="-1"><a class="header-anchor" href="#evolution-2" aria-hidden="true">#</a> Évolution 2</h2>
<h3 id="cas-1" tabindex="-1"><a class="header-anchor" href="#cas-1" aria-hidden="true">#</a> Cas 1</h3>
<p>Ajouter une CSS qui s'affichera uniquement aujourd'hui. Celle-ci doit modifier l'apparence de votre site Internet.</p>
<h3 id="cas-2" tabindex="-1"><a class="header-anchor" href="#cas-2" aria-hidden="true">#</a> Cas 2</h3>
<p>Afficher une sélection de vidéo (<code>card</code>) en fonction de la période de l'année. Par exemple 4 vidéos sur le thème de Noël pendant la période de Noël.</p>
<h2 id="evolution-3" tabindex="-1"><a class="header-anchor" href="#evolution-3" aria-hidden="true">#</a> Évolution 3</h2>
<p>La dernière grosse évolution à réaliser dans ce site, je vous propose de rendre dynamique la liste des vidéos sur la page d'<code>index.php</code>. Pour ça :</p>
<ul>
<li>Ajouter un tableau <code>array</code>.</li>
<li>Faire une boucle (<code>foreach</code>, <code>for</code>, <code>while</code>).</li>
</ul>
<p><em>Exemple simple <strong>à ne pas recopier</strong></em></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$videos</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"BcgsOgjHgWA"</span><span class="token punctuation">,</span><span class="token string double-quoted-string">"lcOxhH8N3Bo"</span><span class="token punctuation">,</span><span class="token string double-quoted-string">"jTuBnZrLbq0"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"M2VtfZDOcHQ"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"i1iIaSbK9bg"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"MTaHw-S6IDo"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"KfMCApWc5xE"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"igtN49I1CtM"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$videos</span> <span class="token keyword">as</span> <span class="token variable">$id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"- &lt;a href='tv.php?id="</span><span class="token operator">.</span><span class="token variable">$id</span><span class="token operator">.</span><span class="token string double-quoted-string">"> Video "</span> <span class="token operator">.</span><span class="token variable">$id</span><span class="token operator">.</span>  <span class="token string double-quoted-string">"&lt;a/>"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Attention</p>
<p>Le code précédent est <strong>un exemple</strong> ! Il faut le modifier/l'adapter pour afficher les cards tels que c'était demandé initialement.</p>
</div>
</template>
