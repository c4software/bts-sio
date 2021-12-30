<template><h1 id="interactivite" tabindex="-1"><a class="header-anchor" href="#interactivite" aria-hidden="true">#</a> Interactivité</h1>
<p>Nous avons créé dans l'exemple précédent une page avec un formulaire. Je vous propose un autre exemple très simple, nous allons créé une page interactive avec seulement du javascript.</p>
<p>Cette fois-ci je vous laisse travailler avec comme seule information « mon cahier des charges » / « le visuel que je souhaite ».</p>
<p><img src="@source/tp/javascript/res/tp3_ui.png" alt="Interface souhaitée"></p>
<h2 id="cahier-des-charges" tabindex="-1"><a class="header-anchor" href="#cahier-des-charges" aria-hidden="true">#</a> Cahier des charges</h2>
<ul>
<li>La page doit être en HTML.</li>
<li>Le champ de saisie permet de saisir du texte libre.</li>
<li>Le bouton ajouté doit :
<ul>
<li>Ajouter une ligne dans la table présente en dessous.</li>
<li>La colonne titre est remplie avec la valeur saisie.</li>
<li>La colonne date contient la date au moment de l'ajout. <code>Date()</code>.</li>
<li>L'action est un bouton permettant de supprimer la ligne en question.</li>
</ul>
</li>
<li>Votre Javascript doit être externalisé (fichier .js)</li>
</ul>
<h2 id="technologies-souhaitees" tabindex="-1"><a class="header-anchor" href="#technologies-souhaitees" aria-hidden="true">#</a> Technologies souhaitées</h2>
<p>Pour réaliser cette page, je vous propose d'utiliser :</p>
<ul>
<li>Bootstrap (ou tailwind).</li>
<li>jQuery (ou du VanillaJS).</li>
<li>Datatable pour avoir une table interactive. (en option, plus complexe)</li>
</ul>
<p>Je vous laisse plancher sur le sujet. N'oubliez pas :</p>
<ul>
<li><RouterLink to="/cheatsheets/javascript/">L'aide mémoire</RouterLink></li>
<li><RouterLink to="/tp/javascript/support.html">Le support de cours</RouterLink></li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">STOP</p>
<p>⚠️ Un appel important ⚠️</p>
<p>En JavaScript votre code est appelé au moment de l'interaction, <strong>Il doit donc toujours être dans une fonction</strong> :</p>
<p><img src="@source/tp/javascript/res/event_click.png" alt="Événement"></p>
</div>
<details class="custom-container details"><summary>Quelques éléments en vrac pour aider</summary>
<h3 id="obtenir-la-valeur-d-un-input" tabindex="-1"><a class="header-anchor" href="#obtenir-la-valeur-d-un-input" aria-hidden="true">#</a> Obtenir la valeur d'un input</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// En jQuery</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#idDeLinput"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// En VanillaJS</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"idDeLinput"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="ajouter-des-elements-dans-un-tableau" tabindex="-1"><a class="header-anchor" href="#ajouter-des-elements-dans-un-tableau" aria-hidden="true">#</a> Ajouter des éléments dans un tableau</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#maTable"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>
  <span class="token string">"&lt;tr>&lt;td>"</span> <span class="token operator">+</span> phrase <span class="token operator">+</span> <span class="token string">"&lt;/td>&lt;td>"</span> <span class="token operator">+</span> <span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"&lt;/td>&lt;td>L'input…&lt;/td>&lt;/tr>"</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="obtenir-la-date-actuelle" tabindex="-1"><a class="header-anchor" href="#obtenir-la-date-actuelle" aria-hidden="true">#</a> Obtenir la date actuelle</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="supprimer-la-ligne-d-un-tableau" tabindex="-1"><a class="header-anchor" href="#supprimer-la-ligne-d-un-tableau" aria-hidden="true">#</a> Supprimer la ligne d'un tableau</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">deleteRow</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>Suppr<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Avec jQuery</span>
<span class="token keyword">function</span> <span class="token function">deleteRow</span><span class="token punctuation">(</span><span class="token parameter">elem</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">$</span><span class="token punctuation">(</span>elem<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">closest</span><span class="token punctuation">(</span><span class="token string">"tr"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Avec du JS</span>
<span class="token keyword">function</span> <span class="token function">deleteRow</span><span class="token punctuation">(</span><span class="token parameter">btn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> d <span class="token operator">=</span> btn<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span>rowIndex<span class="token punctuation">;</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"myTable"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">deleteRow</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="rafraichir-la-table" tabindex="-1"><a class="header-anchor" href="#rafraichir-la-table" aria-hidden="true">#</a> Rafraichir la table</h3>
<p>C'est du test, nous sommes en mode sauvage.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#myTable"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">DataTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#myTable"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">DataTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></details>
</template>
