<template><h1 id="complement-du-cours-css" tabindex="-1"><a class="header-anchor" href="#complement-du-cours-css" aria-hidden="true">#</a> Complément du cours CSS</h1>
<p>Ce document est un complément du cours. Il vous permettra de revenir sur les différentes notions avec différents exemples. La CSS est un vaste sujet il serait difficile de tout couvrir dans un simple document.</p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#boite-a-outils">Boite à outils</RouterLink></li><li><RouterLink to="#id-ou-class">Id ou Class ?</RouterLink></li><li><RouterLink to="#les-espacements">Les espacements</RouterLink></li><li><RouterLink to="#fonds-et-couleurs">Fonds et couleurs</RouterLink><ul><li><RouterLink to="#les-couleurs">Les couleurs</RouterLink></li><li><RouterLink to="#les-images-de-fonds">Les images de fonds</RouterLink></li></ul></li><li><RouterLink to="#formater-du-texte">Formater du texte</RouterLink><ul><li><RouterLink to="#choisir-la-police">Choisir la police</RouterLink></li><li><RouterLink to="#taille-du-texte-absolue-ou-relative">Taille du texte (absolue ou relative ?)</RouterLink></li><li><RouterLink to="#gras-italic-souligne">Gras, Italic, Souligné</RouterLink></li><li><RouterLink to="#les-alignements">Les alignements</RouterLink></li></ul></li><li><RouterLink to="#placer-des-elements">Placer des éléments</RouterLink><ul><li><RouterLink to="#les-positions">Les positions</RouterLink></li><li><RouterLink to="#fonctionnement">Fonctionnement</RouterLink></li><li><RouterLink to="#les-unites">Les unités</RouterLink></li><li><RouterLink to="#le-float">Le Float</RouterLink></li></ul></li><li><RouterLink to="#centrer-en-css">Centrer en CSS</RouterLink></li><li><RouterLink to="#le-placement-simplifie">Le placement simplifié</RouterLink><ul><li><RouterLink to="#s-entrainer-avec-les-flexbox">S&#39;entrainer avec les flexbox</RouterLink></li></ul></li><li><RouterLink to="#decoration-mise-en-forme">Décoration / Mise en forme</RouterLink><ul><li><RouterLink to="#border">Border</RouterLink></li><li><RouterLink to="#shadow-les-ombres">Shadow (les ombres)</RouterLink></li></ul></li><li><RouterLink to="#interactivite">Interactivité</RouterLink></li><li><RouterLink to="#le-css-«-plus-plus-»">Le CSS « plus plus »</RouterLink></li><li><RouterLink to="#les-pseudo-elements">Les pseudo-éléments</RouterLink></li><li><RouterLink to="#les-variables-css">Les variables CSS</RouterLink></li><li><RouterLink to="#les-animations">Les animations</RouterLink></li><li><RouterLink to="#le-responsive">Le responsive</RouterLink><ul><li><RouterLink to="#quelques-exemple-de-media-queries">Quelques exemple de Media Queries</RouterLink></li></ul></li><li><RouterLink to="#les-tailles-d-affichage">Les tailles d&#39;affichage</RouterLink></li><li><RouterLink to="#des-«-breakpoints-generique-»">Des « Breakpoints générique » ?</RouterLink></li><li><RouterLink to="#la-propriete-display">La propriété display</RouterLink><ul><li><RouterLink to="#la-revolution-des-flex">La révolution des flex</RouterLink></li><li><RouterLink to="#mettre-en-pratique-un-«-framework-»">Mettre en pratique un « Framework »</RouterLink></li><li><RouterLink to="#la-revolution-du-grid">La révolution du grid</RouterLink></li></ul></li><li><RouterLink to="#l-organisation-de-la-css">L&#39;organisation de la CSS</RouterLink><ul><li><RouterLink to="#les-designs-patterns">Les Designs Patterns</RouterLink></li><li><RouterLink to="#ecrire-moins-pour-gagner-plus">Écrire moins… Pour gagner plus !</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="boite-a-outils" tabindex="-1"><a class="header-anchor" href="#boite-a-outils" aria-hidden="true">#</a> Boite à outils</h2>
<p>Je ne le répèterai jamais assez, mais vous devez avoir une boite à outils de ressources. Celle-ci vous servira d'inspiration, de technique, mais aussi « de référence ».</p>
<ul>
<li><a href="https://codepen.io" target="_blank" rel="noopener noreferrer">CodePen<ExternalLinkIcon/></a></li>
<li>Les autres sites (Inspecteurs d'éléments, sources …)</li>
<li><a href="https://developer.mozilla.org/fr/docs/Web/CSS" target="_blank" rel="noopener noreferrer">MDN CSS<ExternalLinkIcon/></a></li>
<li><a href="https://material.io/design" target="_blank" rel="noopener noreferrer">Material.io<ExternalLinkIcon/></a></li>
</ul>
<p>Cette liste est bien évidemment non exhaustive.</p>
<h2 id="id-ou-class" tabindex="-1"><a class="header-anchor" href="#id-ou-class" aria-hidden="true">#</a> Id ou Class ?</h2>
<table>
<thead>
<tr>
<th>Sélecteur</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td>#item</td>
<td>Élément unique dans votre page</td>
</tr>
<tr>
<td>.rouge</td>
<td>Class réutilisable (multiple) dans votre code</td>
</tr>
<tr>
<td>p</td>
<td>L'ensemble des balises de type <code>&lt;p&gt;</code></td>
</tr>
</tbody>
</table>
<ul>
<li><code>class=&quot;rouge&quot;</code> =&gt; <code>.rouge</code></li>
<li><code>id=&quot;monId&quot;</code> =&gt; <code>#monId</code></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Petite aide mnémotechnique</p>
<ul>
<li><code>id=</code> =&gt; <code>#</code></li>
<li><code>class=</code> =&gt; <code>.</code></li>
</ul>
<p>C'est une notation universelle qui sera également valable en JavaScript</p>
</div>
<h2 id="les-espacements" tabindex="-1"><a class="header-anchor" href="#les-espacements" aria-hidden="true">#</a> Les espacements</h2>
<p>Actuellement vos éléments sont tous « collés » aux autres. C'est normal vous n'avez aucun espacement de défini. En CSS vous avez la possibilité de choisir deux types d'espacements :</p>
<ul>
<li><code>padding</code> (Espacement à l'intérieure de l'élément)</li>
<li><code>margin</code> (Espacement à l'extérieure de l'élément)</li>
</ul>
<p><img src="@source/tp/html_css/res/margin_padding.png" alt="margin &amp; padding"></p>
<p>En termes d'unités, nous avons plusieurs choix :</p>
<ul>
<li>en pixel (exemple <code>padding: 10px</code>)</li>
<li>en pourcentage (exemple <code>margin: 10%</code>)</li>
</ul>
<h2 id="fonds-et-couleurs" tabindex="-1"><a class="header-anchor" href="#fonds-et-couleurs" aria-hidden="true">#</a> Fonds et couleurs</h2>
<p>Il faut imaginer votre navigateur un peu comme Word (ou Libre Office Writter), c'est-à-dire un logiciel capable de faire de la mise en forme « d'éléments ». Dans le cas du navigateur nous n'avons pas d'interface graphique pour le faire, nous avons seulement du code.</p>
<p>La base de la personnalisation c'est les « couleurs » et les images de fonds.</p>
<h3 id="les-couleurs" tabindex="-1"><a class="header-anchor" href="#les-couleurs" aria-hidden="true">#</a> Les couleurs</h3>
<p>Pour les couleurs, c'est relativement simple. Nous avons trois solutions :</p>
<ul>
<li>Une <a href="https://www.w3schools.com/cssref/css_colors.asp" target="_blank" rel="noopener noreferrer">des 140 couleurs disponibles<ExternalLinkIcon/></a>.</li>
<li>Via le code hexadécimal d'une couleur.</li>
<li>Via la notation RGB (ou RGBA avec de la transparence).</li>
</ul>
<p>La notation hexadécimale est quelque chose de massivement utilisé dans le monde de l'informatique (et du design) pour représenter les couleurs. Cette notation offre un choix très large de couleurs avec la possibilité de réaliser de la transparence (appelée alpha).</p>
<p>Une couleur « Hex » est représentée comme ça :</p>
<p><img src="/cours/sources/introduction_css/res/hex-reading.png" alt="Couleur Hexa"></p>
<p>Vous pouvez l'écrire à la main… C'est une question d'habitude! Mais le plus simple est de passer par un logiciel qui possède un « colorimètre » (un Color Picker en anglais) :</p>
<ul>
<li>Gimp</li>
<li>Photoshop</li>
<li><a href="https://www.webfx.com/web-design/color-picker/" target="_blank" rel="noopener noreferrer">Via un site en ligne<ExternalLinkIcon/></a></li>
<li><a href="https://www.google.com/search?q=colorpicker&amp;oq=colorpicker" target="_blank" rel="noopener noreferrer">Directement sur Google<ExternalLinkIcon/></a></li>
</ul>
<h3 id="les-images-de-fonds" tabindex="-1"><a class="header-anchor" href="#les-images-de-fonds" aria-hidden="true">#</a> Les images de fonds</h3>
<p>Mais votre navigateur ne se limite pas à une simple couleur de fond et du texte… Il permet également d'afficher des images. Nous l'avons vu il est possible d'afficher des images avec la balise <code>&lt;img /&gt;</code>, mais pas uniquement.</p>
<p>Il est possible également d'afficher des images en CSS. Via la propriété <code>background-…</code> ou <code>background</code>. La propriété <code>background</code> est très puissante et vous nous permettre de « composer » un fond avec énormément de possibilités.</p>
<div class="custom-container tip"><p class="custom-container-title">Ah oui !</p>
<p>Vous allez le voir, il est possible d'appliquer un fond sur « presque » n'importe quels éléments HTML. (div, h1, p, body, …)</p>
</div>
<h4 id="definir-un-fond" tabindex="-1"><a class="header-anchor" href="#definir-un-fond" aria-hidden="true">#</a> Définir un fond</h4>
<p>Mettre un fond à un élément en HTML s'effectue avec la propriété <code>background-image</code>. Celle-ci accepte plusieurs formats d'image cette liste dépend de votre navigateur, mais à minima vous pouvez mettre :</p>
<ul>
<li>png</li>
<li>jpeg</li>
<li>gif</li>
</ul>
<p>Une fois votre fichier « au bon format » il vous suffit de spécifier le lien de celui-ci avec la syntaxe suivante :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.monElement</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"lien-vers-votre-image.png"</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Attention</p>
<p>De base, le fond se répète à l'infini dans toutes les directions.</p>
<p><em>Exemple avec le logo du Greta :</em>
<img src="/cours/sources/introduction_css/res/logo_repeat.png" alt="Fond répétition"></p>
</div>
<h4 id="regler-son-comportement" tabindex="-1"><a class="header-anchor" href="#regler-son-comportement" aria-hidden="true">#</a> Régler son comportement</h4>
<p>Comme vous avez pu le constater, nous avons pour l'instant un fond qui se répète dans toute les directions. Dans certains cas c'est pratique, par exemple un fond de site qui va se répéter à l'infini pour créer un « pattern ». Mais dans certains cas nous ne voulons pas forcément de répétitions.</p>
<p>Nous avons donc la liste suivante :</p>
<table>
<thead>
<tr>
<th>Propriété</th>
<th>Valeurs</th>
</tr>
</thead>
<tbody>
<tr>
<td>background-attachment</td>
<td>fixed, scroll</td>
</tr>
<tr>
<td>background-repeat</td>
<td>no-repeat, repeat-x, repeat-y, repeat</td>
</tr>
<tr>
<td>background-position</td>
<td>en pixel, ou top, bottom, left, right center</td>
</tr>
</tbody>
</table>
<p><code>background-repeat</code> vas nous permettre de choisir le comportement de répétitions du fond. Cette propriété permet de définir une non-répétition avec <code>no-repeat</code>, mais également d'autres options comme une répétition seulement en <code>x</code> ou seulement en <code>y</code>.</p>
<p><code>background-attachment</code> permet de choisir comment le fond va se comporter lors du scroll. Par défaut votre fond <code>scroll</code> quand vous vous descendez dans la page. Mais vous pouvez également choisir « d'ancrer » le fond pour que celui-ci soit toujours visible.</p>
<p><code>background-position</code> permet de choisir la position de notre fond, celle-ci peut-être exprimé en pixel ou en « anglais » avec <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code> ou encore <code>center</code>. Avec cette propriété vous allez pouvoir placer finement votre fond, avec une notation X,Y exemple :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.monElement</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"lien-vers-votre-image.png"</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>
  <span class="token property">background-position</span><span class="token punctuation">:</span> bottom left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* ou encore */</span>
<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"lien-vers-votre-image.png"</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>
  <span class="token property">background-position</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Exemple</p>
<p>L'ensemble des propriétés est combinable afin d'afficher le fond <strong>tel que vous le souhaitez</strong></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"greta.png"</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>
  <span class="token property">background-attachment</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span> <span class="token comment">/* Le Logo sera fixe */</span>
  <span class="token property">background-repeat</span><span class="token punctuation">:</span> no-repeat<span class="token punctuation">;</span> <span class="token comment">/* Le logo ne sera pas répété */</span>
  <span class="token property">background-position</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* Le logo sera centré */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><em>En reprenant le logo du greta comme exemple :</em></p>
<p><img src="/cours/sources/introduction_css/res/logo_center.png" alt="Fond sans répétition"></p>
</div>
<h4 id="la-«-short-hand-»" tabindex="-1"><a class="header-anchor" href="#la-«-short-hand-»" aria-hidden="true">#</a> La « short-hand »</h4>
<p>Comme vous pouvez le voir, rapidement « ça va être verbeux », en CSS vous pouvez combiner l'ensemble des propriétés via une notation appelée « short-hand » :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"greta.png"</span><span class="token punctuation">)</span></span> fixed no-repeat center<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Astuce de pro</p>
<p>Ne vous inquiétez pas, votre IDE (éditeur de code) vous proposera très certainement de simplifier votre CSS.</p>
</div>
<h2 id="formater-du-texte" tabindex="-1"><a class="header-anchor" href="#formater-du-texte" aria-hidden="true">#</a> Formater du texte</h2>
<p>Comme je vous le disais précédemment, votre navigateur est un vrai « Word », vous pouvez également mettre en forme votre texte comme bon vous semble.</p>
<table>
<thead>
<tr>
<th>Propriété</th>
<th>Usage</th>
<th>Valeurs</th>
</tr>
</thead>
<tbody>
<tr>
<td>font-weight</td>
<td>Indique « le gras de votre texte »</td>
<td>100 à 900 (ou bold, bolder, light, lighter, normal)</td>
</tr>
<tr>
<td>font-style</td>
<td>Style de votre texte</td>
<td>normal, italic</td>
</tr>
<tr>
<td>text-decoration</td>
<td>Décoration de votre police</td>
<td>underline, line-through</td>
</tr>
<tr>
<td>font-size</td>
<td>Défini la taille de votre texte</td>
<td>Taille absolue <em>ou</em> relative (px, em ou anglais)</td>
</tr>
<tr>
<td>color</td>
<td>La couleur de votre texte</td>
<td>Couleur en hexa, Anglais ou RGB (comme les fond donc)</td>
</tr>
<tr>
<td>text-align</td>
<td>Position de votre texte</td>
<td>Positionnement de votre texte (left, right, center, justify…)</td>
</tr>
<tr>
<td>font-family</td>
<td>Police à utiliser</td>
<td>Nom d'une police « présent sur le navigateur de la personne »</td>
</tr>
</tbody>
</table>
<h3 id="choisir-la-police" tabindex="-1"><a class="header-anchor" href="#choisir-la-police" aria-hidden="true">#</a> Choisir la police</h3>
<p>Voilà un point épineux… La police, par defaut vous n'avez accès qu'au police présent sur l'ordinateur de la personne. C'est rapidement problématique, on nous demande que rarement d'installer la font X Y Z pour accéder à un site Internet.</p>
<p>Le CSS intègre un système nous permettant d'afficher la police de notre choix. Pour son utilisation c'est simple il faut utiliser <code>font-family</code> et spécifier ensuite le nom de la font souhaité par exemple :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.monElement</span> <span class="token punctuation">{</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> Verdana<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Vous n'avez pas d'idée sur les fonts ? Vous pouvez utiliser un site comme <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">Google Fonts<ExternalLinkIcon/></a>. Il « vous offre » un CDN qui se chargera d'ajouter la font pour qu'elle puisse être affichée sur votre page Web.</p>
<p>Exemple :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preconnect<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://fonts.gstatic.com<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
      <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&amp;display=swap<span class="token punctuation">"</span></span>
      <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span>
    <span class="token punctuation">/></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
      <span class="token selector">body</span> <span class="token punctuation">{</span>
        <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">"Open Sans"</span><span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- Votre contenu --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="taille-du-texte-absolue-ou-relative" tabindex="-1"><a class="header-anchor" href="#taille-du-texte-absolue-ou-relative" aria-hidden="true">#</a> Taille du texte (absolue ou relative ?)</h3>
<p>En CSS nous avons deux possibilités pour la taille de la police.</p>
<ul>
<li>Absolue</li>
<li>Relative</li>
</ul>
<h4 id="absolue" tabindex="-1"><a class="header-anchor" href="#absolue" aria-hidden="true">#</a> Absolue</h4>
<p>Si vous choisissez de définir votre taille de texte en valeur absolue, vous devez indiquer votre taille en <code>pixel</code> avec la notation px. Cette notation doit être utilisée avec la plus grande des précautions en effet, en fonction de l'écran (densité de pixels) le texte peut apparaitre trop petit.</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.element</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 18px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">À savoir</p>
<p>Les <code>px</code> ne sont pas la seule unité disponible vous pouvez également définir la taille en <code>cm</code> ou en <code>mm</code>. Cependant comme vous l'imaginez ces unités ne sont pas vraiment « adaptées pour un écran d'ordinateur ».</p>
</div>
<h4 id="relative" tabindex="-1"><a class="header-anchor" href="#relative" aria-hidden="true">#</a> Relative</h4>
<p>La notation relative est clairement la notation à privilégier, celle-ci utilise une notation en <code>em</code> (ou <code>rem</code>) elle permet de définir une taille de texte qui changera proportionnellement à la densité de pixel de l'écran de la personne qui visite votre site 👌.</p>
<div class="custom-container tip"><p class="custom-container-title">À savoir</p>
<p><code>em</code>, <code>rem</code> ? Kézako ? La notation <code>em</code> est relative au parent. La notation <code>rem</code> est basée à la racine de votre document. Concrètement ça veut dire que votre taille sera relative au parent ou non.</p>
</div>
<h3 id="gras-italic-souligne" tabindex="-1"><a class="header-anchor" href="#gras-italic-souligne" aria-hidden="true">#</a> Gras, Italic, Souligné</h3>
<p>Dans notre « traitement de texte » sans interface, nous avons également la possibilité de définir le style de notre texte. Pour ça nous utiliserons les propriétés suivantes :</p>
<ul>
<li>font-weight</li>
<li>font-style</li>
<li>text-decoration</li>
</ul>
<p><code>font-weight</code> permet de définir « le niveau de gras » de votre police. Vous pouvez définir cette valeur en chiffre en utilisant la notation de 100 à 900 ou via une notation relative en anglais bold, bolder, light, lighter, normal.</p>
<p><code>font-style</code> nous permet d'indiquer le style de la police à savoir <code>italic</code> ou <code>normal</code>.</p>
<p><code>font-decoration</code> nous permet de « décorer » votre texte. Concrètement ça veut dire si celui-ci sera souligné ou barré par exemple.</p>
<div class="custom-container tip"><p class="custom-container-title">Astuce de pro</p>
<p>Votre navigateur vous propose une interface de développement puissante vous permettant de voir les valeurs possibles pour chaque propriété. C'est disponible dans votre inspecteur d'éléments.</p>
<p><img src="@source/tp/html_css/res/inspect.png" alt="Inspecteur d'éléments"></p>
</div>
<h3 id="les-alignements" tabindex="-1"><a class="header-anchor" href="#les-alignements" aria-hidden="true">#</a> Les alignements</h3>
<p>Je vais me répéter, mais comme dans « word » vous pouvez en CSS placer votre texte. Pour ça nous utiliserons la propriété <code>text-align</code>. Celle-ci peut prendre les valeurs suivantes :</p>
<ul>
<li>left</li>
<li>right</li>
<li>center</li>
<li>justify</li>
</ul>
<p>Je ne m'étale pas sur le sujet les valeurs parlent d'elles-mêmes.</p>
<h2 id="placer-des-elements" tabindex="-1"><a class="header-anchor" href="#placer-des-elements" aria-hidden="true">#</a> Placer des éléments</h2>
<p>En CSS il est possible de placer les éléments dans la page. Nous avons deux possibilités pour placer les éléments :</p>
<ul>
<li>Absolue</li>
<li>Relative</li>
</ul>
<h3 id="les-positions" tabindex="-1"><a class="header-anchor" href="#les-positions" aria-hidden="true">#</a> Les positions</h3>
<p>Les positions absolue et relative fonctionnent de la même façon, mais n'ont pas la même référence de placement</p>
<p><code>absolue</code> Un placement absolu prend ça référence par rapport au coin en haut à gauche du navigateur du client.</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Mon titre<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Un paragraphe<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>exemple<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ceci est un texte<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
      <span class="token selector">.exemple</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
        <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><img src="@source/tp/html_css/res/absolute.png" alt="Position Absolute"></p>
<p><code>relative</code> Un placement relative prend ça référence par rapport au parent de l'élément à placer.</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Mon titre<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Un paragraphe<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>exemple<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ceci est un texte<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
      <span class="token selector">.exemple</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
        <span class="token property">left</span><span class="token punctuation">:</span> 90%<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
        <span class="token property">top</span><span class="token punctuation">:</span> -30px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><img src="@source/tp/html_css/res/relative.png" alt="Position Relative"></p>
<h3 id="fonctionnement" tabindex="-1"><a class="header-anchor" href="#fonctionnement" aria-hidden="true">#</a> Fonctionnement</h3>
<p>Le placement en CSS fonctionne donc toujours de la même façon :</p>
<ul>
<li>On indique le point d'origine. (absolute ou relative)</li>
<li>On indique « par rapport » à ce point d'origine le placement de notre objet via les propriétés :
<ul>
<li>top</li>
<li>left</li>
<li>right</li>
<li>bottom</li>
</ul>
</li>
</ul>
<h3 id="les-unites" tabindex="-1"><a class="header-anchor" href="#les-unites" aria-hidden="true">#</a> Les unités</h3>
<p>Vous utilisez un mobile, vous savez donc que la taille d'un écran est « variable » et surtout plus ou moins grande. Pour répondre à cette problématique, le placement (<code>top</code>, <code>bottom</code>, <code>right</code>, <code>left</code>) possède une multitude d'unités possible :</p>
<ul>
<li>En pixel (non responsive :danger:).</li>
<li>en pourcentage (attention responsive, mais par rapport <strong>à la largeur de l'écran</strong>).</li>
<li>en VH (pourcentage par rapport à la hauteur de l'écran).</li>
<li>en VW (pourcentage par rapport à la largeur de l'écran).</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Beaucoup de possibilités</p>
<p>Le placement est un problème complexe en CSS. Le mieux est de répondre à des cas « précis » d'usage. Il est difficile de répondre « de manière » théorique à toutes vos questions.</p>
</div>
<h3 id="le-float" tabindex="-1"><a class="header-anchor" href="#le-float" aria-hidden="true">#</a> Le Float</h3>
<p>Autre possibilité de placement. En CSS il est possible de rendre les éléments <code>flottant</code>. Ça va vous permettre par exemple d'entourer une image de texte. La propriété <code>float</code> peut prendre deux valeurs :</p>
<ul>
<li>left</li>
<li>right</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Mon titre<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>float<span class="token punctuation">"</span></span>
        <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://www.greta-cfa-paysdelaloire.fr/wp-content/themes/kookline/static/img/logo-cfa.png<span class="token punctuation">"</span></span>
      <span class="token punctuation">/></span></span>
      L’accueil de tous les publics : les formations du GRETA-CFA 49 concernent
      les salariés d’entreprises, les jeunes en insertion professionnelle et les
      demandeurs d’emploi, mais aussi toute personne qui souhaite se former à
      titre individuel.
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
      <span class="token selector">.float</span> <span class="token punctuation">{</span>
        <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>Avec un <code>float: left</code>:
<img src="@source/tp/html_css/res/float-left.png" alt="Float left"></p>
<p>Avec un <code>float: right</code>:
<img src="@source/tp/html_css/res/float-right.png" alt="Float right"></p>
<div class="custom-container danger"><p class="custom-container-title">Attention</p>
<p>Tout ce qui va suivre sera automatiquement flottant. Si vous voulez arrêter « le mode flottant », vous devez l'indiquer à votre navigateur. Pour ça il existe une propriété <code>clear</code> celle-ci peut prendre trois valeurs :</p>
<ul>
<li>both</li>
<li>left</li>
<li>right</li>
</ul>
</div>
<h2 id="centrer-en-css" tabindex="-1"><a class="header-anchor" href="#centrer-en-css" aria-hidden="true">#</a> Centrer en CSS</h2>
<p>À froid comme ça, cette notion peut paraitre simple… En réalité c'est un problème complexe en CSS. Nous avons à notre disposition un certain nombre de façons de centrer en CSS. Nous allons voir ensemble que chacune des solutions apporte une réponse différente pour un résultat identique :</p>
<ul>
<li><code>text-align: center</code></li>
<li><code>margin: auto</code></li>
<li><code>display: flex</code></li>
<li><code>display: grid</code></li>
<li><a href="https://web.dev/centering-in-css/" target="_blank" rel="noopener noreferrer">…<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">La pratique est la clé</p>
<p>C'est seulement avec la pratique et la mise en situation que vous allez réussir à centrer vos différends en CSS. Sachez juste que, le <strong>display: flex</strong> n'est pas la solution ultime à tous les centrages. Dans beaucoup de cas, un simple <code>text-align: center</code> voir un <code>margin: auto</code> sera suffisant.</p>
</div>
<h2 id="le-placement-simplifie" tabindex="-1"><a class="header-anchor" href="#le-placement-simplifie" aria-hidden="true">#</a> Le placement simplifié</h2>
<p>Nous avons maintenant un moyen plus simple pour placer des éléments en CSS, le <code>flex</code>. Le <code>display: flex</code> vas nous permettre de placer relativement finement les éléments. Le <code>flex</code> propose pas mal d'options, mais nous pouvons l'utiliser « simplement » et rapidement en ne connaissant que la base.</p>
<p><em>Le Flex repose sur quatre règles :</em></p>
<ul>
<li>La direction de l'affichage : colonne ou ligne. (<code>flex-direction</code>)</li>
<li>Le comportement si la place nécessaire pour l'affichage est insuffisante. (<code>flex-wrap</code>)</li>
<li>Un placement X. (<code>justify-content</code>)</li>
<li>Un placement Y. (<code>align-items</code>)</li>
<li>L'alignement des éléments « dans le design ». (<code>align-content</code>)</li>
</ul>
<p>Testons interactivement <a href="http://flexbox.help/" target="_blank" rel="noopener noreferrer">les différentes propriétés en cliquant ici<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">Flexbox permet encore plus</p>
<p>Ces propriétés sont « la base », mais il est possible d'aller bien plus loin. Nous avons par exemple la possibilité de choisir quel(s) élément(s) s'agrandissent (<code>grow</code>) et lesquels se réduisent (<code>shrink</code>).</p>
<p>Nous allons également pouvoir ordonner les éléments les uns par rapport aux autres. Cette fonctionnalité va nous permettre d'agencer comme nous le souhaitons notre interface.</p>
<p><a href="https://developer.mozilla.org/fr/docs/Apprendre/CSS/CSS_layout/Flexbox" target="_blank" rel="noopener noreferrer">En savoir plus<ExternalLinkIcon/></a></p>
</div>
<p><em>Par exemple, pour afficher deux éléments « côte à côte » :</em></p>
<ExternalIframe src="/demo/css/flexbox/" />
<p><em>Nous allons simplement écrire :</em></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
      <span class="token selector">.flex</span> <span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
        <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>greta.png<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Logo du Greta<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Ceci est un titre<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="s-entrainer-avec-les-flexbox" tabindex="-1"><a class="header-anchor" href="#s-entrainer-avec-les-flexbox" aria-hidden="true">#</a> S'entrainer avec les flexbox</h3>
<p>Pratiquer c'est apprendre… Je vous propose donc <a href="https://flexboxfroggy.com/#fr" target="_blank" rel="noopener noreferrer">de pratiquer avec un outil en ligne « flexboxfroggy »<ExternalLinkIcon/></a></p>
<h2 id="decoration-mise-en-forme" tabindex="-1"><a class="header-anchor" href="#decoration-mise-en-forme" aria-hidden="true">#</a> Décoration / Mise en forme</h2>
<p>La CSS vous permet aussi de mettre en forme votre contenu de manière riche sans forcément utiliser d'image. Il y a quelques années, il fallait absolument passer par des images pour créer des bordures ou des ombres.</p>
<p>Maintenant ces éléments sont intégrés à la CSS. Vous pourrez donc créer en un tour de main des ombres ou des bordures à vos éléments, et même des bordures arrondies 🎉</p>
<p><img src="@source/tp/html_css/res/border_shadow.png" alt="Shadow &amp; Border"></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.monElement</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #0000004a<span class="token punctuation">;</span>
  <span class="token property">box-shadow</span><span class="token punctuation">:</span> 11px 10px 50px 0px <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.75<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="border" tabindex="-1"><a class="header-anchor" href="#border" aria-hidden="true">#</a> Border</h3>
<p>Définir une bordure est très simple en CSS. Il suffit d'utiliser la propriété <code>border</code> elle prend « 3 paramètres » :</p>
<ul>
<li>La taille de la bordure (exprimée en pixel <code>px</code>)</li>
<li>Le type de la bordure en Anglais (<code>solid</code>, <code>dashed</code>, …)</li>
<li>La couleur de la bordure en hexadécimal ou en RGB (ou en Anglais)</li>
</ul>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.monElement</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span>
  <span class="token comment">/* ou */</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 10px dashed #fafafa<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Astuce du chef</p>
<p>Ce n’est pas très joli une bordure « droite ». En CSS ajouter des bords arrondis c'est très simple il suffit de spécifier une <code>border-radius</code> avec une valeur en pixel.</p>
<p>Exemple :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.monElement</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #0000004a<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>🎉 À vous les interfaces comme le Material Design de Google 🎉</p>
</div>
<h3 id="shadow-les-ombres" tabindex="-1"><a class="header-anchor" href="#shadow-les-ombres" aria-hidden="true">#</a> Shadow (les ombres)</h3>
<p>La propriété <code>box-shadow</code> nous permet de définir un ensemble de paramètres permettant de créer des « ombrages ». Cette propriété est « complexe », elle est vaste à couvrir le plus simple est très certainement de la tester directement via un outil :</p>
<p><a href="https://cssgenerator.org/box-shadow-css-generator.html" target="_blank" rel="noopener noreferrer">Tester en ligne<ExternalLinkIcon/></a></p>
<h2 id="interactivite" tabindex="-1"><a class="header-anchor" href="#interactivite" aria-hidden="true">#</a> Interactivité</h2>
<p>Vous l'avez certainement remarqué vos liens (balise <code>&lt;a&gt;&lt;/a&gt;</code>) ne sont pas vraiment très jolie, ils sont certainement violet et de couleurs différentes si vous avez cliqué sur le lien en question, ou même simplement au survol de la souris</p>
<p>Nous avons la possibilité en CSS de personnaliser via un sélecteur le comportement d'un élément pour des états spécifiques (survol, visité …)</p>
<p>Un exemple simple le survol :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">div:hover</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<p>Les pseudo-classes permettent d'appliquer un style à un élément non seulement en fonction de son contenu dans l'arbre du document, mais aussi en fonction de facteurs externes (l'historique de navigation par exemple avec :visited ; le statut du contenu avec :checked ; la position de la souris :hover).</p>
</blockquote>
<p><em>Source:</em> MDN</p>
<div class="custom-container tip"><p class="custom-container-title">Bon à savoir</p>
<p>Sur un ordinateur avec une « souris » pas de problème… Les choses sont plus compliquées sur un mobile ! En effet sur un mobile nous n'avons pas de :hover… Et c'est logique ! Votre doigt n'est pas détecté si celui-ci ne « touche » pas votre écran.</p>
<p>✋ Avec l'inspecteur d'éléments aucun problème pour tester « comme un mobile ». Je vous montrerai.</p>
</div>
<p>En réalité, ça nous permettra de faire des interactions riches avec l'utilisateur. Comme par exemple une élévation au survol.</p>
<ExternalIframe bordered src="/demo/css/survol/index.html" />
<hr>
<h2 id="le-css-«-plus-plus-»" tabindex="-1"><a class="header-anchor" href="#le-css-«-plus-plus-»" aria-hidden="true">#</a> Le CSS « plus plus »</h2>
<p>La suite du support va un peu plus loin. Nous aborderons l'ensemble des notions en cours et en pratique. Mais voilà en quelques mots des usages avancés du CSS</p>
<h2 id="les-pseudo-elements" tabindex="-1"><a class="header-anchor" href="#les-pseudo-elements" aria-hidden="true">#</a> Les pseudo-éléments</h2>
<p>Un pseudo-élément est un mot-clé ajouté à un sélecteur qui permet de mettre en forme certaines parties de l'élément ciblé par la règle.</p>
<p><a href="https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-%C3%A9l%C3%A9ments" target="_blank" rel="noopener noreferrer">Consulter la documentation des pseudo-éléments<ExternalLinkIcon/></a></p>
<p>En quelques mots, avec les pseudo-éléments nous allons pouvoir faire des sélecteurs « plus précis » sans forcément ajouter des <code>class</code> sur chaque élément.</p>
<h2 id="les-variables-css" tabindex="-1"><a class="header-anchor" href="#les-variables-css" aria-hidden="true">#</a> Les variables CSS</h2>
<p>Vous l'avez certainement remarqué, en CSS nous avons beaucoup d'unité, de valeurs, de couleurs… Historiquement nous devions manuellement « recopier » les valeurs identiques partout ou nous les utilisions (ou alors utiliser des solutions alternative tel que <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer">la SCSS<ExternalLinkIcon/></a>). En CSS 3.0 nous avons la possibilité de déclarer des variables qui seront utilisables plus tard, la syntaxe est similaire à ce que nous avons déjà vu à savoir <code>clé: valeur</code>.</p>
<p>Pour déclarer une variable, il suffit d'ajouter <code>--</code> devant une propriété par exemple :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">:root</span> <span class="token punctuation">{</span>
  <span class="token property">--main-bg-color</span><span class="token punctuation">:</span> #eeeeee<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Et pour l'utiliser, il suffit d'utiliser le mot <code>var(…)</code>, par exemple :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--main-bg-color<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">L'astuce du jour</p>
<p>Ça semble anodin… Mais cette notation avec des variables permet de simplifier grandement les animations CSS. Pourquoi ? Et bien, tout simplement, car maintenant si vous souhaitez changer une couleur au survol il suffit de redéfinir la variable.</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">:root</span> <span class="token punctuation">{</span>
  <span class="token property">--main-card-shadow</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>36<span class="token punctuation">,</span> 170<span class="token punctuation">,</span> 69<span class="token punctuation">,</span> 0.75<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">box-shadow</span><span class="token punctuation">:</span> 0px 0px 40px 0px <span class="token function">var</span><span class="token punctuation">(</span>--main-card-shadow<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> all 1s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">div:hover</span> <span class="token punctuation">{</span>
  <span class="token property">--main-card-shadow</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>230<span class="token punctuation">,</span> 53<span class="token punctuation">,</span> 53<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ExternalIframe bordered src="/demo/css/variables/index.html" />
<p>👀 Hyper lisible non ?</p>
</div>
<h2 id="les-animations" tabindex="-1"><a class="header-anchor" href="#les-animations" aria-hidden="true">#</a> Les animations</h2>
<p>Vous souhaitez mettre quelques transitions dans votre page web ? Sans trop perdre de temps ? En CSS c'est simple, nous avons une propriété nommée <code>transition</code> elle permet d'animer le changement entre deux états.</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> all 1s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">div:hover</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Le changement de couleur de fond sera fait en <code>1s</code>, via la directive :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">transition</span><span class="token punctuation">:</span> all 1s<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="le-responsive" tabindex="-1"><a class="header-anchor" href="#le-responsive" aria-hidden="true">#</a> Le responsive</h2>
<p>Le responsive ? Le responsive, c'est le nom que l'on donne à un site web qui s'adapte à la taille de l'écran. C'est un vaste sujet, très vaste… Nous sommes ici dans une introduction aux bases du HTML, je pense qu'il faudrait plus de détail pour vraiment comprendre les tenants et les aboutissants du responsive.</p>
<p>Ce que vous pouvez retenir c'est de manière générale le responsive est exprimé en colonnes, généralement 12. Nous allons donc déterminer combien de colonnes doivent s'afficher en fonction de la taille de l'écran (large, medium, small). C'est donc une langue commune entre le designer et le développeur.</p>
<div class="custom-container warning"><p class="custom-container-title">Un instant</p>
<p>Pour l'instant, ce qu'il faut retenir, c'est que si vous souhaitez faire du « Responsive » le plus simple est d'utiliser un « Framework CSS » type <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap<ExternalLinkIcon/></a> ou <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind<ExternalLinkIcon/></a> ils vous permettront de gérer simplement ce système de colonne.</p>
</div>
<p>Pour nous développeur CSS, comment ça fonctionne ? Tailwind, Bootstrap et autre framework fonctionnent tous de la même façon, il définisse des règles d'affichage en fonction de la taille d'écran. Pour faire ça en CSS nous, utilisons-les <code>media queries</code>. Les médias queries c'est une notation particulière qui nous permet décrire des sélecteurs CSS en fonction de paramètres du navigateur du client (la larguer, la hauteur, etc.)</p>
<p><a href="https://developer.mozilla.org/fr/docs/Web/CSS/Requ%C3%AAtes_m%C3%A9dia/Utiliser_les_Media_queries#Am%C3%A9liorations_syntaxiques_avec_la_sp%C3%A9cification_de_niveau_4" target="_blank" rel="noopener noreferrer">En savoir plus sur MDN<ExternalLinkIcon/></a></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">body</span> <span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 1201px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">body</span> <span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>Il existe une autre façon de faire, il est possible de conditionner directement le chargement de la CSS en fonction de la taille de l'écran de la personne.</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>screen and (max-width: 960px)<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Pas de solution universel</p>
<p>Que vous choisissiez la première ou la seconde façon de faire il n'y a pas de solution « miracle », j'aurais personnellement tendance à choisir la première solution par habitude. Mais le <code>&lt;link&gt;</code> conditionné est également valide.</p>
</div>
<h3 id="quelques-exemple-de-media-queries" tabindex="-1"><a class="header-anchor" href="#quelques-exemple-de-media-queries" aria-hidden="true">#</a> Quelques exemple de Media Queries</h3>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/** Largeur min 400px AND paysage **/</span>
<span class="token atrule"><span class="token rule">@media</span> screen <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token punctuation">(</span><span class="token property">orientation</span><span class="token punctuation">:</span> landscape<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">body</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">prefers-color-scheme</span><span class="token punctuation">:</span> dark<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/** Thème sombre de votre mobile / ordinateur **/</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">prefers-color-scheme</span><span class="token punctuation">:</span> light<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/** Thème clair de votre mobile / ordinateur **/</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><a href="https://developer.mozilla.org/fr/docs/Apprendre/CSS/CSS_layout/Media_queries" target="_blank" rel="noopener noreferrer">Pour plus d'exemple<ExternalLinkIcon/></a></p>
<h2 id="les-tailles-d-affichage" tabindex="-1"><a class="header-anchor" href="#les-tailles-d-affichage" aria-hidden="true">#</a> Les tailles d'affichage</h2>
<table>
<thead>
<tr>
<th>Mobile</th>
<th>Taille d'affichage (par defaut)</th>
</tr>
</thead>
<tbody>
<tr>
<td>iPhone</td>
<td>980 px</td>
</tr>
<tr>
<td>Android</td>
<td>800px</td>
</tr>
</tbody>
</table>
<h2 id="des-«-breakpoints-generique-»" tabindex="-1"><a class="header-anchor" href="#des-«-breakpoints-generique-»" aria-hidden="true">#</a> Des « Breakpoints générique » ?</h2>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>// Small devices <span class="token punctuation">(</span>landscape phones<span class="token punctuation">,</span> 576px and up<span class="token punctuation">)</span>
<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 576px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/* Votre CSS pour cette résolution */</span>
<span class="token punctuation">}</span>

// Medium devices <span class="token punctuation">(</span>tablets<span class="token punctuation">,</span> 768px and up<span class="token punctuation">)</span>
<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 768px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/* Votre CSS pour cette résolution */</span>
<span class="token punctuation">}</span>

// Large devices <span class="token punctuation">(</span>desktops<span class="token punctuation">,</span> 992px and up<span class="token punctuation">)</span>
<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 992px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/* Votre CSS pour cette résolution */</span>
<span class="token punctuation">}</span>

// Extra large devices <span class="token punctuation">(</span>large desktops<span class="token punctuation">,</span> 1200px and up<span class="token punctuation">)</span>
<span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token comment">/* Votre CSS pour cette résolution */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="la-propriete-display" tabindex="-1"><a class="header-anchor" href="#la-propriete-display" aria-hidden="true">#</a> La propriété display</h2>
<p>Nous avons plusieurs types d'affichage possible en CSS, de base les éléments sont soient :</p>
<ul>
<li><code>none</code> (cache l'élément)</li>
<li><code>inline</code> (en ligne, les éléments côte à côte).</li>
<li><code>block</code> (les un après les autres, à la ligne)</li>
<li><code>table</code> (spécifique aux <code>&lt;table&gt;&lt;/table&gt;</code>)</li>
</ul>
<p>Il y'a d'autres types d'affichage, mais c'est grossièrement les principales façons d'affiche le contenu.</p>
<h3 id="la-revolution-des-flex" tabindex="-1"><a class="header-anchor" href="#la-revolution-des-flex" aria-hidden="true">#</a> La révolution des flex</h3>
<p>Vous allez rapidement vous rendre compte qu'il est assez difficile de centrer des éléments en CSS (surtout verticalement). Pendant longtemps c'était un problème… Mais plus maintenant, nous avons à notre disposition un nouveau type d'affichage, le <code>display: flex</code>. Le <code>flex</code> est très puissant, votre navigateur calcul l'ensemble des contraintes pour placer très finement vos éléments. Difficiles de le décrire en quelques mot le plus simple. Le tester :</p>
<p><a href="http://flexbox.help/" target="_blank" rel="noopener noreferrer">flexbox.help<ExternalLinkIcon/></a></p>
<p>Le principe de fonctionnement repose sur un système de colonne(s) <em>ou</em> de ligne(s). Avec des propriétés permettant de faire des retours à la ligne ou non.</p>
<p><img src="@source/tp/html_css/res/termes_flex.png" alt="flex"></p>
<p><a href="https://developer.mozilla.org/fr/docs/Apprendre/CSS/CSS_layout/Flexbox" target="_blank" rel="noopener noreferrer">Plus de détail<ExternalLinkIcon/></a></p>
<h3 id="mettre-en-pratique-un-«-framework-»" tabindex="-1"><a class="header-anchor" href="#mettre-en-pratique-un-«-framework-»" aria-hidden="true">#</a> Mettre en pratique un « Framework »</h3>
<p>À partir de maintenant nous avons vu les bases de la CSS, je vous propose d'utiliser un framework qu'énormément de développeurs Web utilisent à savoir « Boostrap »</p>
<p><RouterLink to="/tp/html_css/bootstrap.html">Réaliser un site avec Bootstrap</RouterLink></p>
<div class="custom-container tip"><p class="custom-container-title">Pourquoi ? Quand ?</p>
<p>« Copier ≠ ne pas travailler » nous en avons parlé, mais c'est toujours un rappel important. Dans notre cas, Bootstrap nous propose des templates / gabarit déjà faits. Ils sont là pour :</p>
<ul>
<li>Vous faire gagner du temps.</li>
<li>Améliorer la qualité de vos sites Internet.</li>
<li>Vous montrer comment intégrer les éléments de Boostrap.</li>
</ul>
<p>N'hésitez pas à vous en servir dans vos développements. Ils sont <a href="https://getbootstrap.com/docs/4.5/examples" target="_blank" rel="noopener noreferrer">disponible ici<ExternalLinkIcon/></a></p>
</div>
<h3 id="la-revolution-du-grid" tabindex="-1"><a class="header-anchor" href="#la-revolution-du-grid" aria-hidden="true">#</a> La révolution du grid</h3>
<p>Le flex répond à beaucoup de problématique… Mais pas à toutes ! Il y a des cas où nous voulons faire un layout complexe, où les éléments sont agencés en ligne et en colonnes en même temps.</p>
<p><img src="@source/tp/html_css/res/grid.png" alt="Grid"></p>
<p>Pour ça en CSS vous pouvez utiliser le système de grid. Le système de grid est relativement complexe à prendre en main, le mieux est de regarder des exemples pour comprendre son fonctionnement.</p>
<ul>
<li><a href="https://la-cascade.io/css-grid-layout-guide-complet/" target="_blank" rel="noopener noreferrer">Une bonne introduction en français<ExternalLinkIcon/></a></li>
<li><a href="https://gridbyexample.com/examples/" target="_blank" rel="noopener noreferrer">Exemple<ExternalLinkIcon/></a></li>
<li><a href="https://gridbyexample.com/patterns/" target="_blank" rel="noopener noreferrer">Pattern déjà prêt<ExternalLinkIcon/></a></li>
<li><a href="https://grid.layoutit.com/" target="_blank" rel="noopener noreferrer">Un outil pour designer les grid<ExternalLinkIcon/></a></li>
<li><a href="https://developer.mozilla.org/fr/docs/Web/CSS/grid" target="_blank" rel="noopener noreferrer">MDN : Grid<ExternalLinkIcon/></a></li>
</ul>
<p>Une notation un peu particulière :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">grid</span><span class="token punctuation">:</span> auto-flow dense / 40px 40px 1fr<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/html_css/res/grid2.png" alt="grid2"></p>
<div class="custom-container danger"><p class="custom-container-title">Attention au support</p>
<p>Le système de grid est plutôt « récent » l'ensemble des navigateurs n'intègre pas encore toute la spécification. N'hésitez pas à aller voir <a href="https://caniuse.com/?search=grid" target="_blank" rel="noopener noreferrer">Can I Use<ExternalLinkIcon/></a></p>
</div>
<h4 id="s-entrainer-avec-le-grid" tabindex="-1"><a class="header-anchor" href="#s-entrainer-avec-le-grid" aria-hidden="true">#</a> S'entrainer avec le Grid</h4>
<p>Comme pour le flex, voilà une solution en ligne afin de vous entrainer à utiliser le flex <a href="https://cssgridgarden.com/#fr" target="_blank" rel="noopener noreferrer">CSS Grid Garden<ExternalLinkIcon/></a></p>
<p><img src="@source/tp/html_css/res/grid_help_chrome.png" alt="Chrome Guide Grid"></p>
<ul>
<li><a href="https://la-cascade.io/css-grid-layout-guide-complet/" target="_blank" rel="noopener noreferrer">Une bonne introduction en français<ExternalLinkIcon/></a></li>
</ul>
<h2 id="l-organisation-de-la-css" tabindex="-1"><a class="header-anchor" href="#l-organisation-de-la-css" aria-hidden="true">#</a> L'organisation de la CSS</h2>
<p>L'organisation / la structure est un élément important en développement. Le monde du développement est régi pas un certain nombre de designs patterns, ils sont là pour vous assurer que votre « code » sera compris par tous, et que vous pourrez le maintenir pendant longtemps.</p>
<h3 id="les-designs-patterns" tabindex="-1"><a class="header-anchor" href="#les-designs-patterns" aria-hidden="true">#</a> Les Designs Patterns</h3>
<ul>
<li><a href="http://getbem.com/" target="_blank" rel="noopener noreferrer">BEM - BEM - Block Element Modifier<ExternalLinkIcon/></a></li>
<li><a href="https://atomicdesign.bradfrost.com/" target="_blank" rel="noopener noreferrer">Atomic Design<ExternalLinkIcon/></a></li>
</ul>
<h3 id="ecrire-moins-pour-gagner-plus" tabindex="-1"><a class="header-anchor" href="#ecrire-moins-pour-gagner-plus" aria-hidden="true">#</a> Écrire moins… Pour gagner plus !</h3>
<p>Vous l'avez remarqué (si ce n’est pas le cas, vous allez rapidement le voir), la CSS est rapidement très « verbeux » c'est-à-dire que nous avons à écrire beaucoup de choses pour faire ce que l'on souhaite. (Les sélecteurs, les propriétés, etc.)</p>
<p>Nous avons maintenant un certain nombre d'outils appelés « Pré-Processeurs CSS » qui ont pour but de nous faire écrire moins (ou mieux), le plus utilisé pour l'instant est Sass / Scss. Mais il existe des alternatives :</p>
<ul>
<li><a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer">Sass / Scss<ExternalLinkIcon/></a></li>
<li><a href="http://lesscss.org/" target="_blank" rel="noopener noreferrer">Less<ExternalLinkIcon/></a></li>
<li><a href="https://postcss.org/" target="_blank" rel="noopener noreferrer">Post CSS<ExternalLinkIcon/></a></li>
</ul>
<p>C'est un vaste sujet, ce qu'il faut retenir c'est que votre navigateur ne comprend <strong>que la CSS</strong>, la SCSS (ou autre) est écrite par vous et transformé par un outil en CSS pour que votre navigateur puisse le comprendre. Voilà quelques exemples :</p>
<div class="language-scss ext-scss line-numbers-mode"><pre v-pre class="language-scss"><code><span class="token selector">a </span><span class="token punctuation">{</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>

  <span class="token selector"><span class="token parent important">&amp;</span>:hover </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector"><span class="token parent important">&amp;</span>:visited </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>est l'équivalent de :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">a</span> <span class="token punctuation">{</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">a:hover</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">a:visited</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Autre exemple :</p>
<div class="language-scss ext-scss line-numbers-mode"><pre v-pre class="language-scss"><code><span class="token selector">div </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>

  <span class="token selector"><span class="token parent important">&amp;</span>.important </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">> p </span><span class="token punctuation">{</span>
    <span class="token selector">> strong </span><span class="token punctuation">{</span>
      <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector"><span class="token parent important">&amp;</span>:hover </span><span class="token punctuation">{</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> #fafafa<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>Est l'équivalent de :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">div.important</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">div > p > strong</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">div > p:hover</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fafafa<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></template>
