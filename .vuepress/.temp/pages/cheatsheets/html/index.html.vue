<template><h1 id="aide-memoire-html" tabindex="-1"><a class="header-anchor" href="#aide-memoire-html" aria-hidden="true">#</a> Aide mémoire HTML</h1>
<p>Aide mémoire sur les balises HTML. Vous retrouverez dans cet aide mémoire les éléments que nous avons vus ensembles, mais également les balises qui me semble importantes de connaitre.</p>
<div class="custom-container tip"><p class="custom-container-title">À savoir</p>
<p>Cet aide mémoire ne contient pas l'ensemble des balises, par contre vous retrouverez (en Français) une liste complète de l'ensemble des balises sur le site de la MDM Web Docs <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element" target="_blank" rel="noopener noreferrer">à consulter ici<ExternalLinkIcon/></a></p>
</div>
<h2 id="la-structure-d-une-page" tabindex="-1"><a class="header-anchor" href="#la-structure-d-une-page" aria-hidden="true">#</a> La structure d'une page</h2>
<p>Les balises formant la structure de base sont restées identiques depuis la création des pages Internet. Celle-ci est obligatoire et est le minimum à mettre dans toutes vos pages.</p>
<table>
<thead>
<tr>
<th>Balise</th>
<th>Utilité</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;html&gt;</code></td>
<td>Élément Racine</td>
</tr>
<tr>
<td><code>&lt;head&gt;</code></td>
<td>Entête de la page</td>
</tr>
<tr>
<td><code>&lt;body&gt;</code></td>
<td>Corps de la page</td>
</tr>
</tbody>
</table>
<h3 id="exemple" tabindex="-1"><a class="header-anchor" href="#exemple" aria-hidden="true">#</a> Exemple</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fr<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Titre<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- Mon Contenu --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="l-entete-head" tabindex="-1"><a class="header-anchor" href="#l-entete-head" aria-hidden="true">#</a> L'entête : head</h3>
<table>
<thead>
<tr>
<th>Balise</th>
<th>Utilité</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;title&gt;</code></td>
<td>Titre à la page</td>
</tr>
<tr>
<td><code>&lt;style&gt;</code></td>
<td>CSS (Style) de la page</td>
</tr>
<tr>
<td><code>&lt;script&gt;</code></td>
<td>JavaScript (Code dynamique)</td>
</tr>
<tr>
<td><code>&lt;link&gt;</code></td>
<td>CSS Externe (Lien)</td>
</tr>
<tr>
<td><code>&lt;meta&gt;</code></td>
<td>Métadonnées de la page (mot-clé, description, encodage, etc.)</td>
</tr>
</tbody>
</table>
<h3 id="le-corps-body" tabindex="-1"><a class="header-anchor" href="#le-corps-body" aria-hidden="true">#</a> Le corps : body</h3>
<p>Dans la balise <code>&lt;body&gt;</code> nous allons retrouver l'ensemble des éléments qui seront affichés dans la page. Nous parlons donc du corps de la page Internet. Les éléments peuvent être rangés dans plusieurs grandes catégories.</p>
<h4 id="structures" tabindex="-1"><a class="header-anchor" href="#structures" aria-hidden="true">#</a> Structures</h4>
<table>
<thead>
<tr>
<th>Balise</th>
<th>Utilité</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;div&gt;</code></td>
<td>Balise de type block (sans signification)</td>
</tr>
<tr>
<td><code>&lt;span&gt;</code></td>
<td>Balise de type Inline (sans signification)</td>
</tr>
<tr>
<td><code>&lt;em&gt;</code></td>
<td>Élément notable</td>
</tr>
<tr>
<td><code>&lt;small&gt;</code></td>
<td>Petit texte</td>
</tr>
<tr>
<td><code>&lt;i&gt;</code></td>
<td>Élément différent</td>
</tr>
<tr>
<td><code>&lt;img /&gt;</code></td>
<td>Une image</td>
</tr>
<tr>
<td><code>&lt;audio&gt;</code></td>
<td>Un son</td>
</tr>
<tr>
<td><code>&lt;br&gt;</code></td>
<td>Un saut de ligne</td>
</tr>
<tr>
<td><code>&lt;video&gt;</code></td>
<td>Une video</td>
</tr>
<tr>
<td><code>&lt;hr /&gt;</code></td>
<td>Séparateur horizontal</td>
</tr>
<tr>
<td><code>&lt;iframe&gt;</code></td>
<td>Affiche une autre page dans la page</td>
</tr>
</tbody>
</table>
<p>Les balises <code>&lt;div&gt;&lt;/div&gt;</code> ou <code>&lt;span&gt;&lt;/span&gt;</code> ne sont utile que d'un point de vue organisation de votre code. Elles n'ont aucun autre but que de grouper, organiser, permettre la personnalisation CSS de votre page. Il convient donc de leur adjoindre des attributs de type <code>class</code>, <code>id</code> ou <code>style</code>.</p>
<h4 id="les-listes" tabindex="-1"><a class="header-anchor" href="#les-listes" aria-hidden="true">#</a> Les listes</h4>
<table>
<thead>
<tr>
<th>Balise</th>
<th>Utilité</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;ul&gt;</code></td>
<td>Liste simple</td>
</tr>
<tr>
<td><code>&lt;ol&gt;</code></td>
<td>Liste ordonnée (numéro)</td>
</tr>
<tr>
<td><code>&lt;li&gt;</code></td>
<td>Un élément de la liste (le contenu)</td>
</tr>
</tbody>
</table>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>Élément 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>Élément 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>Élément 3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="le-texte" tabindex="-1"><a class="header-anchor" href="#le-texte" aria-hidden="true">#</a> Le texte</h4>
<table>
<thead>
<tr>
<th>Balise</th>
<th>Utilité</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;p&gt;</code></td>
<td>Un paragraphe</td>
</tr>
<tr>
<td><code>&lt;i&gt;</code></td>
<td>Élément italic / différent</td>
</tr>
<tr>
<td><code>&lt;br&gt;</code></td>
<td>Une nouvelle ligne</td>
</tr>
<tr>
<td><code>&lt;h1&gt;</code></td>
<td>Titre de niveau 1</td>
</tr>
<tr>
<td><code>&lt;h2&gt;</code></td>
<td>Titre de niveau 2</td>
</tr>
<tr>
<td><code>&lt;h3&gt;</code></td>
<td>Titre de niveau 3</td>
</tr>
<tr>
<td><code>&lt;h4&gt;</code></td>
<td>Titre de niveau 4</td>
</tr>
<tr>
<td><code>&lt;h5&gt;</code></td>
<td>Titre de niveau 5</td>
</tr>
<tr>
<td><code>&lt;h6&gt;</code></td>
<td>Titre de niveau 6</td>
</tr>
<tr>
<td><code>&lt;a&gt;</code></td>
<td>Un lien</td>
</tr>
<tr>
<td><code>&lt;strong&gt;</code></td>
<td>Texte « important »</td>
</tr>
</tbody>
</table>
<h4 id="les-formulaires" tabindex="-1"><a class="header-anchor" href="#les-formulaires" aria-hidden="true">#</a> Les formulaires</h4>
<table>
<thead>
<tr>
<th>Balise</th>
<th>Utilité</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;form&gt;</code></td>
<td>Un formulaire</td>
</tr>
<tr>
<td><code>&lt;input&gt;</code></td>
<td>Champs du formulaire</td>
</tr>
<tr>
<td><code>&lt;select&gt;</code></td>
<td>Énumération d'élément (liste)</td>
</tr>
<tr>
<td><code>&lt;option&gt;</code></td>
<td>Élément de la liste</td>
</tr>
<tr>
<td><code>&lt;label&gt;</code></td>
<td>Libellé d'un champ</td>
</tr>
<tr>
<td><code>&lt;optgroup&gt;</code></td>
<td>Groupe d'élément</td>
</tr>
<tr>
<td><code>&lt;fieldset&gt;</code></td>
<td>Groupe de champs</td>
</tr>
</tbody>
</table>
<h4 id="les-tableaux" tabindex="-1"><a class="header-anchor" href="#les-tableaux" aria-hidden="true">#</a> Les tableaux</h4>
<table>
<thead>
<tr>
<th>Balise</th>
<th>Utilité</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;table&gt;</code></td>
<td>Racine du tableau</td>
</tr>
<tr>
<td><code>&lt;thead&gt;</code></td>
<td>Section de l'entête</td>
</tr>
<tr>
<td><code>&lt;tbody&gt;</code></td>
<td>Section du corps</td>
</tr>
<tr>
<td><code>&lt;tfoot&gt;</code></td>
<td>Section pied</td>
</tr>
<tr>
<td><code>&lt;tr&gt;</code></td>
<td>Ligne du tableau</td>
</tr>
<tr>
<td><code>&lt;th&gt;</code></td>
<td>Cellule de type d'entête</td>
</tr>
<tr>
<td><code>&lt;td&gt;</code></td>
<td>Cellule de contenu</td>
</tr>
</tbody>
</table>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>thead</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>th</span><span class="token punctuation">></span></span>Mois<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>th</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>th</span><span class="token punctuation">></span></span>Étudiant<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>th</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>thead</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tbody</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>Janvier<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>Février<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>20<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tbody</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tfoot</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>Total<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>30<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tfoot</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>ou plus simplement :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>th</span><span class="token punctuation">></span></span>Mois<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>th</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>th</span><span class="token punctuation">></span></span>Étudiant<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>th</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>Janvier<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>Février<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>20<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>Total<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>30<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="les-attributs" tabindex="-1"><a class="header-anchor" href="#les-attributs" aria-hidden="true">#</a> Les Attributs</h3>
<p>L'ensemble des balises HTML peuvent être personnalisées via des attributs.</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>blue<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>uneDiv<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Texte en bleu<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/mon/image.png<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Mon lien<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote>
<p>Les attributs contiennent des informations supplémentaires qui portent sur l'élément et qu'on ne souhaite pas afficher avec le contenu. Dans cet exemple, l'attribut class permet d'utiliser un nom pour identifier l'élément et ce nom pourra être utilisé plus tard pour la mise en forme ou autre chose.</p>
</blockquote>
<p>Source: MDM</p>
<h3 id="allons-plus-loin-la-semantique" tabindex="-1"><a class="header-anchor" href="#allons-plus-loin-la-semantique" aria-hidden="true">#</a> Allons plus loin : La sémantique</h3>
<p>Sémantiquement il est possible d'organiser encore plus votre HTML. Pour ça nous utiliserons :</p>
<table>
<thead>
<tr>
<th>Balise</th>
<th>Utilité</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>&lt;header&gt;</code></td>
<td>Entête d'un contenu</td>
</tr>
<tr>
<td><code>&lt;nav&gt;</code></td>
<td>Lien de navigation</td>
</tr>
<tr>
<td><code>&lt;section&gt;</code></td>
<td>Partie du contenu</td>
</tr>
<tr>
<td><code>&lt;footer&gt;</code></td>
<td>Pied du contenu</td>
</tr>
<tr>
<td><code>&lt;article&gt;</code></td>
<td>Un article (comme dans un journal)</td>
</tr>
<tr>
<td><code>&lt;aside&gt;</code></td>
<td>Contenu complémentaire</td>
</tr>
</tbody>
</table>
<h3 id="activer-le-responsive" tabindex="-1"><a class="header-anchor" href="#activer-le-responsive" aria-hidden="true">#</a> Activer le responsive</h3>
<p>De base votre navigateur « n'est pas responsive ». Si vous souhaitez que celui-ci ajuste sont contenu à la taille de l'écran il faut ajouter la méta suivante :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
