<template><h1 id="aide-memoire-javascript" tabindex="-1"><a class="header-anchor" href="#aide-memoire-javascript" aria-hidden="true">#</a> Aide mémoire JavaScript</h1>
<p>Aide mémoire sur les structures JavaScript. Vous retrouverez dans cet aide mémoire les éléments que nous avons vus ensemble.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Cet aide mémoire n'est pas exhaustif, elle ne contient que le minimum à connaitre pour débuter sereinement.</p>
</div>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#type-de-javascript">Type de JavaScript</RouterLink></li><li><RouterLink to="#dans-le-navigateur">Dans le navigateur</RouterLink></li><li><RouterLink to="#les-librairies">Les librairies</RouterLink></li><li><RouterLink to="#les-variables">Les variables</RouterLink></li><li><RouterLink to="#les-fonctions">Les fonctions</RouterLink></li><li><RouterLink to="#les-conditions">Les conditions</RouterLink></li><li><RouterLink to="#les-boucles">Les boucles</RouterLink></li><li><RouterLink to="#filtrer-rapidement-un-tableau">Filtrer rapidement un tableau</RouterLink></li><li><RouterLink to="#les-evenements">Les évènements</RouterLink></li><li><RouterLink to="#creer-des-elements">Créer des éléments</RouterLink><ul><li><RouterLink to="#creation-d-elements-version-alternative">Création d&#39;éléments version alternative</RouterLink></li></ul></li><li><RouterLink to="#les-selecteurs">Les sélécteurs</RouterLink></li><li><RouterLink to="#les-selecteurs-jquery">Les sélécteurs jQuery</RouterLink></li><li><RouterLink to="#utiliser-un-selecteur">Utiliser un sélecteur</RouterLink></li><li><RouterLink to="#cacher-un-element">Cacher un élément</RouterLink></li><li><RouterLink to="#obtenir-la-valeur-d-un-input">Obtenir la valeur d&#39;un input</RouterLink></li><li><RouterLink to="#les-evenements-1">Les évènements</RouterLink><ul><li><RouterLink to="#dans-le-dom">Dans le DOM</RouterLink></li><li><RouterLink to="#en-javascript">En JavaScript</RouterLink></li></ul></li><li><RouterLink to="#l-ajax">L&#39;ajax</RouterLink><ul><li><RouterLink to="#pure-js">Pure JS :</RouterLink></li><li><RouterLink to="#via-jquery">Via jQuery :</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="type-de-javascript" tabindex="-1"><a class="header-anchor" href="#type-de-javascript" aria-hidden="true">#</a> Type de JavaScript</h2>
<p>Le JavaScript peut-être exécuté dans différents environnements :</p>
<ul>
<li>Serveur (NodeJS)</li>
<li>Un navigateur (Chrome, Firefox, Safari, …)</li>
<li>Une application (Électron, Cordova …)</li>
</ul>
<p>Les compétences traitées dans le <RouterLink to="/tp/javascript/support.html">support de cours</RouterLink> et dans cet aide mémoire couvre l'ensemble des usages.</p>
<h2 id="dans-le-navigateur" tabindex="-1"><a class="header-anchor" href="#dans-le-navigateur" aria-hidden="true">#</a> Dans le navigateur</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- Directement dans votre page --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// Votre code JavaScript</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Dans un script externe --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>monScriptJS.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Comment choisir ?</p>
<p>Je vous invite vraiment à externaliser vos scripts, pourquoi ? Tout simplement pour simplifier la relecture de vos pages.</p>
</div>
<h2 id="les-librairies" tabindex="-1"><a class="header-anchor" href="#les-librairies" aria-hidden="true">#</a> Les librairies</h2>
<p>Trois écoles :</p>
<ul>
<li>VanillaJS (c'est-à-dire sans aucune librairie)</li>
<li>Avec <a href="https://jquery.com/" target="_blank" rel="noopener noreferrer">jQuery<ExternalLinkIcon/></a></li>
<li>Avec un framework (<a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">VueJS<ExternalLinkIcon/></a>, <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React<ExternalLinkIcon/></a>, <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer">Svelte<ExternalLinkIcon/></a>) 🚀</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Comment choisir ?</p>
<p>Dans cet aide mémoire je vais me concentrer sur le VanillaJS, car finalement c'est la base. Je vous invite cependant à toujours réfléchir sur le choix de votre technologie avant de vous lancer dans un projet.</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">Ajouter jQuery ?</p>
<p>C'est super simple, il suffit « juste » d'ajouter dans votre page :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<h2 id="les-variables" tabindex="-1"><a class="header-anchor" href="#les-variables" aria-hidden="true">#</a> Les variables</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token doc-comment comment">/**
   * let est similaire à var, ça permet de déclarer une variable
   * const est une variable « constante » (dont il est impossible d'écraser la valeur après déclaration)
   */</span>

  <span class="token keyword">let</span> entier <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span> <span class="token comment">//nombre entier</span>
  <span class="token keyword">let</span> reel <span class="token operator">=</span> <span class="token number">0.42</span><span class="token punctuation">;</span> <span class="token comment">// nombre réel</span>
  <span class="token keyword">let</span> texte <span class="token operator">=</span> <span class="token string">"texte"</span><span class="token punctuation">;</span> <span class="token comment">// chaîne de caractères</span>
  <span class="token keyword">let</span> booleen <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// Un booléen</span>
  <span class="token keyword">let</span> tab <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"deux"</span><span class="token punctuation">,</span> <span class="token string">"trois"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// tableau</span>
  <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> clef1<span class="token operator">:</span> <span class="token string">"valeur"</span><span class="token punctuation">,</span> clef2<span class="token operator">:</span> <span class="token string">"Valentin"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// Tableau associatif (clef => valeur, également appelé objet en JavaScript)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="les-fonctions" tabindex="-1"><a class="header-anchor" href="#les-fonctions" aria-hidden="true">#</a> Les fonctions</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// Déclarer / créer une fonction</span>
  <span class="token keyword">function</span> <span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Déclarer / créer une fonction</span>
  <span class="token keyword">function</span> <span class="token function">maFonctionQuiRetourne42</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">addition</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// L'appeler</span>
  <span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">maFonctionQuiRetourne42</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Affiche dans la console 42</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token function">addition</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Affiche une alert avec le résultat de l'addition 40 + 2 => 42</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="les-conditions" tabindex="-1"><a class="header-anchor" href="#les-conditions" aria-hidden="true">#</a> Les conditions</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// Exemple 1</span>
  <span class="token keyword">let</span> age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>age <span class="token operator">></span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Coucou je suis une alerte"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Exemple 2</span>
  <span class="token keyword">let</span> estMajeur <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>estMajeur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Est équivalent à estMajeur == true</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"La personne est majeur"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Exemple 3</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">maFonctionDeTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span>
      <span class="token string">"la fonction est appelé, et si celle-ci « return » true l'alert est affiché"</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="les-boucles" tabindex="-1"><a class="header-anchor" href="#les-boucles" aria-hidden="true">#</a> Les boucles</h2>
<p>Plusieurs façons de faire :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Votre première boucle infinie"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token comment">// Parcours l'ensemble du tableau</span>
  arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Transforme le tableau</span>
  arrModif <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> i <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// arrModif contiendra => [2, 4, 6, 8];</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="filtrer-rapidement-un-tableau" tabindex="-1"><a class="header-anchor" href="#filtrer-rapidement-un-tableau" aria-hidden="true">#</a> Filtrer rapidement un tableau</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

arr<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">curr</span><span class="token punctuation">)</span> <span class="token operator">=></span> curr <span class="token operator">></span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// --> Retourne un tableau avec seulement les valeurs supérieures à 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="les-evenements" tabindex="-1"><a class="header-anchor" href="#les-evenements" aria-hidden="true">#</a> Les évènements</h2>
<table>
<thead>
<tr>
<th>Évènement</th>
<th>Détail</th>
</tr>
</thead>
<tbody>
<tr>
<td>onAbort</td>
<td>Chargement interrompu</td>
</tr>
<tr>
<td>onBlur</td>
<td>Perte du focus</td>
</tr>
<tr>
<td>onChange</td>
<td>Modification d'un état ou contenu</td>
</tr>
<tr>
<td>onClick</td>
<td>Clic sur un élément</td>
</tr>
<tr>
<td>onDblClick</td>
<td>Double clic</td>
</tr>
<tr>
<td>onDragDrop</td>
<td>Déplacement d'un élément amovible</td>
</tr>
<tr>
<td>onError</td>
<td>Chargement non réalisé</td>
</tr>
<tr>
<td>onFocus</td>
<td>Élement devient accessible</td>
</tr>
<tr>
<td>onKeyDown</td>
<td>Touche du clavier maintenue appuyée</td>
</tr>
<tr>
<td>onKeyPress</td>
<td>Touche pressée/relâchée</td>
</tr>
<tr>
<td>onKeyUp</td>
<td>Touche relâchée</td>
</tr>
<tr>
<td>onLoad</td>
<td>Au chargement</td>
</tr>
<tr>
<td>onMouseDown</td>
<td>Appui sur un bouton de souris</td>
</tr>
<tr>
<td>onMouseMove</td>
<td>Souris déplacée</td>
</tr>
<tr>
<td>onMouseOut</td>
<td>Souris hors de l'élément</td>
</tr>
<tr>
<td>onMouseOver</td>
<td>Souris au dessus</td>
</tr>
<tr>
<td>onMouseUp</td>
<td>Bouton de souris relaché</td>
</tr>
<tr>
<td>onReset</td>
<td>Bouton reset de formulaire</td>
</tr>
<tr>
<td>onResize</td>
<td>Dimensions changées dynamiquement</td>
</tr>
<tr>
<td>onSelect</td>
<td>Sélection d'une partie de contenu</td>
</tr>
<tr>
<td>onSubmit</td>
<td>Bouton soumettre</td>
</tr>
<tr>
<td>onUnload</td>
<td>Fermeture de la page</td>
</tr>
</tbody>
</table>
<h2 id="creer-des-elements" tabindex="-1"><a class="header-anchor" href="#creer-des-elements" aria-hidden="true">#</a> Créer des éléments</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> h <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"h1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Création de l'élément h1</span>
h<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Ceci est un titre"</span><span class="token punctuation">;</span> <span class="token comment">// Ajout du texte dans le h1</span>
h<span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">"titleClass"</span><span class="token punctuation">;</span> <span class="token comment">// Définition d'un titre pour l'élément</span>

<span class="token comment">// Ajout du titre dans le body de la page courante.</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Ajout du titre dans l'élément qui nommé id</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monId"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Dans une page ça peut donner :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fr<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Ma page<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token keyword">var</span> h <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"h1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Création de l'élément h1</span>
      h<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Ceci est un titre"</span><span class="token punctuation">;</span> <span class="token comment">// Ajout du texte dans le h1</span>
      h<span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">"titleClass"</span><span class="token punctuation">;</span> <span class="token comment">// Définition d'un titre pour l'élément</span>

      <span class="token comment">// Ajout du titre dans la page en cours</span>
      document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">appendChild ?</p>
<p>Dans le précédent exemple, nous avons ajouté l'élément « à la fin » du body. Mais d'autres options existent :</p>
<ul>
<li><code>node.append(nodes ou strings)</code> – ajoute « nodes ou strings » à la fin,</li>
<li><code>node.prepend(nodes ou strings)</code> – ajoute « nodes ou strings » au début,</li>
<li><code>node.before(nodes ou strings)</code> –- ajoute « nodes ou strings » avant le node,</li>
<li><code>node.after(nodes ou strings)</code> –- ajoute « nodes ou strings » après le node,</li>
<li><code>node.replaceWith(nodes ou strings)</code> –- remplace le node par l'élément fourni « nodes or strings ».</li>
</ul>
<p>:warning Nous allons voir qu'il est possible de choisir le <code>node</code> via un sélecteur.</p>
</div>
<h3 id="creation-d-elements-version-alternative" tabindex="-1"><a class="header-anchor" href="#creation-d-elements-version-alternative" aria-hidden="true">#</a> Création d'éléments version alternative</h3>
<p>Nous pouvons également insérer « une chaine de caractère », celle-ci sera transformée automatiquement en code HTML valide par votre navigateur :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Ajout du titre dans le body de la page courante.</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span>
  <span class="token string">"afterend"</span><span class="token punctuation">,</span>
  <span class="token string">"&lt;h1 class='titleClass'>Ceci est un titre&lt;/h1>"</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">afterend ?</p>
<p>Comme dans l'exemple précédent, c'est la position de l'élément que vous souhaitez insérer. Les valeurs possibles sont les suivantes :</p>
<ul>
<li><code>beforebegin</code> : Avant l'élément lui-même.</li>
<li><code>afterbegin</code> : Juste à l'intérieur de l'élément , avant son premier enfant.</li>
<li><code>beforeend</code> : Juste à l'intérieur de l'élément , après son dernier enfant.</li>
<li><code>afterend</code> : Après élément lui-même.</li>
</ul>
<p>L'exemple de la W3School est très explicite :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- beforebegin --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- afterbegin --></span>
  foo
  <span class="token comment">&lt;!-- beforeend --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- afterend --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></div>
<h2 id="les-selecteurs" tabindex="-1"><a class="header-anchor" href="#les-selecteurs" aria-hidden="true">#</a> Les sélécteurs</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Retourne la liste (array) des éléments</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">".maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Retourn le premier élément trouvé</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">".maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Exemples d'utilisations</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Voilà valeur"</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">it</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  it<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Parcours chaque div et remplace le contenu par &lt;="</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">C'est « neuf »</p>
<p>Ces API (Méthodes) sont très peu utilisés (voir même connues), elles sont pourtant très puissantes. Elles sont à choisir si vous souhaitez faire du code moderne.</p>
<p>Sur Internet (voir dans du code existant), vous trouverez l'ancienne version à savoir :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"elementId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">"maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Aucun changement dans le fonctionnement.</p>
</div>
<h2 id="les-selecteurs-jquery" tabindex="-1"><a class="header-anchor" href="#les-selecteurs-jquery" aria-hidden="true">#</a> Les sélécteurs jQuery</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">".maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Cacher toute les divs</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="utiliser-un-selecteur" tabindex="-1"><a class="header-anchor" href="#utiliser-un-selecteur" aria-hidden="true">#</a> Utiliser un sélecteur</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Deux exemples identiques</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Voilà le contenu"</span><span class="token punctuation">;</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token string">"Contenu HTML à mettre"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="cacher-un-element" tabindex="-1"><a class="header-anchor" href="#cacher-un-element" aria-hidden="true">#</a> Cacher un élément</h2>
<p>100% JS:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">"none"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Style ? Vous avez dit Style ?</p>
<p>Et oui, nous avons accès à l'ensemble du style. Amusez-vous, il est possible de tout changer directement via le JS.</p>
</div>
<p>Via les Class CSS:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">Hey ! classList ?</p>
<p>Oui… Il est possible de mettre « plusieurs classes », donc nous avons ici un tableau <code>array</code>. Un tableau se manipule avec des méthodes comme vues précédemment. Il faut donc utiliser la méthode <code>add</code> pour ajouter une classe.</p>
</div>
<h2 id="obtenir-la-valeur-d-un-input" tabindex="-1"><a class="header-anchor" href="#obtenir-la-valeur-d-un-input" aria-hidden="true">#</a> Obtenir la valeur d'un input</h2>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>monInput<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// VanillaJS</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monInput"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>

<span class="token comment">// En jQuery</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#monInput"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="les-evenements-1" tabindex="-1"><a class="header-anchor" href="#les-evenements-1" aria-hidden="true">#</a> Les évènements</h2>
<p><img src="@source/cheatsheets/javascript/event_click.png" alt="Event_click"></p>
<p>Fonction appelé seulement au moment du clique utilisateur</p>
<h3 id="dans-le-dom" tabindex="-1"><a class="header-anchor" href="#dans-le-dom" aria-hidden="true">#</a> Dans le DOM</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Click ! <span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onsubmit</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span> <span class="token attr-name">"</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Click ! <span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">function</span> <span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token parameter">elem</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// elem => est le bouton sur lequel vous avez cliqué</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">this ?</p>
<p>Le <code>this</code> corresponds à l'élément sur lequel vous avez cliqué.</p>
</div>
<h3 id="en-javascript" tabindex="-1"><a class="header-anchor" href="#en-javascript" aria-hidden="true">#</a> En JavaScript</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Click ! <span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// Pure JS</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"btn"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> maFonction<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Pure JS</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"form"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"submit"</span><span class="token punctuation">,</span> maFonction<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// jQuery</span>
  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#btn"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>maFonction<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#form"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>maFonction<span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="l-ajax" tabindex="-1"><a class="header-anchor" href="#l-ajax" aria-hidden="true">#</a> L'ajax</h2>
<h3 id="pure-js" tabindex="-1"><a class="header-anchor" href="#pure-js" aria-hidden="true">#</a> Pure JS :</h3>
<p>Les GET</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Réponse type inconnu</span>
<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"./monContenuAsynchrone.php"</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"result"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> content<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Réponse type JSON</span>
<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"./monContenuAsynchrone.php"</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>Les POST</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Format JSON</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> cle<span class="token operator">:</span> <span class="token string">"valeur"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"./monContenuAsynchrone.php"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span>
  headers<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">"Content-Type"</span><span class="token operator">:</span> <span class="token string">"application/json"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  body<span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Success:"</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"Error:"</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Format POST Data</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
data<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">key</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">value</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
data<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">anotherKey</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">another value</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"./monContenuAsynchrone.php"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span> body<span class="token operator">:</span> data <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Success:"</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"Error:"</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>Fetch permet de faire beaucoup de choses, vous trouverez <a href="https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch" target="_blank" rel="noopener noreferrer">l'ensemble de la documentation ici<ExternalLinkIcon/></a></p>
<h3 id="via-jquery" tabindex="-1"><a class="header-anchor" href="#via-jquery" aria-hidden="true">#</a> Via jQuery :</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>$<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"./monContenuAsynchrone.php"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#result"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>
