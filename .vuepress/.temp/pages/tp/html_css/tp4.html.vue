<template><h1 id="mise-en-pratique-responsive" tabindex="-1"><a class="header-anchor" href="#mise-en-pratique-responsive" aria-hidden="true">#</a> Mise en pratique Responsive</h1>
<p>Dans ce TP nous allons « mettre en pratique » ce que nous avons vu de manière théorique dans le cours sur le Responsive. Cette notion est primordiale, le trafic provenant d'un mobile n'est pas/plus à négliger.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Comme nous l'avons vu dans le cours, la problématique du responsive ne dois pas être prise à la légère. C'est une vraie compétence que vous devez maitriser. Nous allons donc mettre en pratique cette compétence en partant d'un modèle très proche de celui précédemment fait.</p>
<p>Voilà le rendu de ce que nous allons devoir obtenir :</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/wg-wYpSs-f8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>Avant d'aller plus loin, je vous laisse regarder la vidéo, l'analyser, afin de voir les modifications qui interviennent en fonction de la taille de l'écran.</p>
<ul>
<li>Première étape <a href="/demo/css/tp4/init_projet.zip">télécharger les sources</a>.</li>
<li>Puis valider le fonctionnement sur votre ordinateur.</li>
</ul>
<h2 id="activation-du-responsive" tabindex="-1"><a class="header-anchor" href="#activation-du-responsive" aria-hidden="true">#</a> Activation du responsive</h2>
<p>En cours je vous ai parlé de « deux d'étapes » pour activer le responsive. La première est la mise en place de la <code>meta</code> indiquant à votre navigateur le contenu doit prendre la largeur de l'écran. Pour ça ajouter la <code>meta</code> suivante dans votre projet.</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Ajouter la meta dans votre code</li>
<li>Regarder si le comportement de votre page a changé lors du redimensionnement de votre navigateur.</li>
</ul>
<h2 id="des-colonnes-et-veux-tu-en-voila" tabindex="-1"><a class="header-anchor" href="#des-colonnes-et-veux-tu-en-voila" aria-hidden="true">#</a> Des colonnes ? Et veux-tu, en voilà !</h2>
<p>Nous avons activé le responsive, mais pour l'instant nous n'avons pas indiqué les règles « à appliquer en fonction de la taille de l'écran ». Pour ça nous allons utiliser les <code>media-query</code>. Pour gérer le responsive, nous avons plusieurs façons de faire écrire des règles « pour l'ensemble des éléments », ou alors écrire quelque chose de très générique en utilisant par exemple le <code>display: flex</code>.</p>
<p>C'est la solution <code>display: flex</code> que je vous propose de mettre en place (<RouterLink to="/tp/html_css/support.html#la-revolution-des-flex">rappel sur le Flex</RouterLink>). Ajouter la CSS suivante <strong>à la fin</strong></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@media</span> <span class="token keyword">only</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 960px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/* Changement de ligne à colonnes */</span>
  <span class="token selector">main</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
    <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* Seulement 2 éléments par ligne */</span>
  <span class="token selector">main > section</span> <span class="token punctuation">{</span>
    <span class="token property">flex</span><span class="token punctuation">:</span> 1 0 44%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@media</span> <span class="token keyword">only</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 959px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">header > h1</span> <span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">nav</span> <span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="quelques-explications" tabindex="-1"><a class="header-anchor" href="#quelques-explications" aria-hidden="true">#</a> Quelques explications</h3>
<p>Je vous laisse analyser la CSS, mais côté responsive nous avons seulement :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/*
 * Règle appliquée pour les grands écrans
 */</span>
<span class="token atrule"><span class="token rule">@media</span> <span class="token keyword">only</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 960px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">/*
 * Règle appliquée pour les petits écrans
 */</span>
<span class="token atrule"><span class="token rule">@media</span> <span class="token keyword">only</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 959px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="modification" tabindex="-1"><a class="header-anchor" href="#modification" aria-hidden="true">#</a> Modification</h3>
<p>Tester de modifier la CSS, retirer par exemple :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">main > section</span> <span class="token punctuation">{</span>
  <span class="token property">flex</span><span class="token punctuation">:</span> 1 0 44%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="changer-le-fond" tabindex="-1"><a class="header-anchor" href="#changer-le-fond" aria-hidden="true">#</a> Changer le fond</h3>
<p>Écrire la CSS et la Media Query, afin que le fond soit « différent » si la taille de l'écran est supérieure à <code>1500px</code>.</p>
<h3 id="taille-du-texte" tabindex="-1"><a class="header-anchor" href="#taille-du-texte" aria-hidden="true">#</a> Taille du texte</h3>
<p>Écrire la Media-Query et la CSS qui permet de réduire la taille du texte pour une taille inférieure à <code>500px</code>.</p>
<h3 id="sortir-les-regles-de-«-responsive-»" tabindex="-1"><a class="header-anchor" href="#sortir-les-regles-de-«-responsive-»" aria-hidden="true">#</a> Sortir les règles de « Responsive »</h3>
<p>Dans le cours nous avons parlé de deux façons d'écrire les règles de responsive. Je vous laisse modifier votre code source, afin de « sortir » les règles de CSS relatif à la partie responsive.</p>
<div class="custom-container tip"><p class="custom-container-title">Astuce du chef</p>
<p>N'oubliez pas de retirer les « media-queries » de la CSS, elles ne sont pas nécessaires du fait que vous avez conditionné le chargement entier de la feuille de style.</p>
</div>
<h3 id="et-l-impression" tabindex="-1"><a class="header-anchor" href="#et-l-impression" aria-hidden="true">#</a> Et l'impression ?</h3>
<p>Nous l'avons vu en cours il est possible de personnaliser l'affichage lors de l'impression. Dans notre cas, j'aimerais que pour le <code>@media print</code> vous retiriez :</p>
<ul>
<li>Le header</li>
<li>Les liens de navigation</li>
<li>Le pied de page</li>
</ul>
<p>Au final j'aimerais qu'il ne reste que « les articles », simplement entouré d'une petite bordure de type <code>dashed</code>.</p>
</template>
