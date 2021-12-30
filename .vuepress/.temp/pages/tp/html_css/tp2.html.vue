<template><h1 id="decouverte-de-la-css" tabindex="-1"><a class="header-anchor" href="#decouverte-de-la-css" aria-hidden="true">#</a> Découverte de la CSS</h1>
<p>Dans ce TP nous allons découvrir les bases du CSS à travers personnalisation d'une page web.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Comme vu dans le cours, vous allez écrire votre première feuille de style. Au travers de différents exemples, nous allons apprendre comment sélectionner, appliquer et personnaliser une page avec la CSS.</p>
<p>Bien évidemment la CSS est un domaine très large, il sera difficile de couvrir l'ensemble des cas d'usage.</p>
<h3 id="boite-a-outils" tabindex="-1"><a class="header-anchor" href="#boite-a-outils" aria-hidden="true">#</a> Boite à outils</h3>
<p>En tant que développeur vous devez avoir une boite à outils de site web de référence. L'un d'entre eux est <a href="https://caniuse.com/" target="_blank" rel="noopener noreferrer">Can I Use<ExternalLinkIcon/></a>, pour rappel Can I Use est un site qui va nous permettre de vérifier si ce que l'on souhaite utiliser est compatible avec le navigateur que nous ciblons.</p>
<p><img src="@source/tp/html_css/res/can_i_use.png" alt="Can I Use"></p>
<p>Un autre site à avoir en permanence est le site de la MDN. Et dans le cas qui nous intéresse <a href="https://developer.mozilla.org/fr/docs/Web/CSS/Reference" target="_blank" rel="noopener noreferrer">la référence CSS<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">À vos favoris</p>
<p>Votre navigateur possède un système de favoris. N'hésitez pas à l'utiliser 😉. Les différents liens que je vous communique sont vraiment des éléments à conserver.</p>
</div>
<h2 id="votre-premiere-css" tabindex="-1"><a class="header-anchor" href="#votre-premiere-css" aria-hidden="true">#</a> Votre première CSS</h2>
<p>Comme vu ensemble nous avons 3 façons de déclarer notre CSS :</p>
<ul>
<li>Dans un fichier externe.</li>
<li>Dans le <code>head</code> de notre fichier HTML.</li>
<li>Directement dans la balise via l'attribut <code>style=''</code>.</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">Attention</p>
<p>Comme évoqué ensemble pendant le cours, je vous conseille vivement de faire un fichier externe pour déclarer votre CSS. Et d'éviter au maximum de faire des déclarations via l'attribut <code>style=''</code>.</p>
</div>
<h3 id="premiere-etape-un-fichier-html" tabindex="-1"><a class="header-anchor" href="#premiere-etape-un-fichier-html" aria-hidden="true">#</a> Première étape : Un fichier HTML</h3>
<p>Une CSS seule ne veut pas dire grand-chose. Afin de tester certaines fonctionnalités de la CSS, je vous propose le contenu suivant :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Ma première page Web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Testons ensemble le CSS<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Ceci est un <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">></span></span>paragraphe<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>Je découvre le HTML<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>Je vais bientôt faire de la CSS<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>,Mais également du PHP<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>Mon pied de page<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Site internet créé par …<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>Dans un premier temps, valider que votre site fonctionne correctement. Pour ça, affichez celui-ci dans votre navigateur.</p>
<div class="custom-container warning"><p class="custom-container-title">STOP</p>
<p>Double cliquer sur le fichier « ça fonctionne ». Mais je vous conseille vivement de passer par un serveur web local (type Wamp, Mamp, …). Pourquoi ? Simplement afin de reproduire le plus possible les conditions réelles.</p>
</div>
<h3 id="etape-2-la-feuille-de-style" tabindex="-1"><a class="header-anchor" href="#etape-2-la-feuille-de-style" aria-hidden="true">#</a> Étape 2 : La feuille de style</h3>
<p>Dans votre éditeur favori crée un nouveau fichier nommé <code>style.css</code>. Votre projet doit maintenant ressembler à :</p>
<p><img src="@source/tp/html_css/res/structure.png" alt="Vue du projet"></p>
<p>Comme vous pouvez le constater, votre fichier CSS est « à côté » de votre fichier HTML. Si vous voulez la ranger dans un sous-dossier c'est possible, libre à vous de vous organiser comme bon vous semble.</p>
<h3 id="etape-3-declarer-la-feuille-de-style" tabindex="-1"><a class="header-anchor" href="#etape-3-declarer-la-feuille-de-style" aria-hidden="true">#</a> Étape 3 : Déclarer la feuille de style</h3>
<p>Vous avez vos deux fichiers « le HTML et la CSS ». Nous allons donc maintenant ajouter une ligne dans votre fichier HTML dans la balise <code>&lt;head&gt;</code> :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/html_css/res/sample.png" alt="Sample"></p>
<div class="custom-container tip"><p class="custom-container-title">Petite note rapide</p>
<p>La ligne que vous avez ajouté indique que votre fichier HTML doit charger une autre ressource en même temps que la page. À savoir le fichier style.css</p>
</div>
<h3 id="etape-4-ajouter-vos-directives-css" tabindex="-1"><a class="header-anchor" href="#etape-4-ajouter-vos-directives-css" aria-hidden="true">#</a> Étape 4 : Ajouter vos directives CSS</h3>
<p>Votre fichier CSS est pour l'instant vide il n'a donc aucun effet. Je vous propose de commencer par une première directive CSS :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Ajouter le code précédent dans votre fichier CSS et recharger votre page. Allez dans votre navigateur pour constater le changement.</p>
<p><img src="@source/tp/html_css/res/resultat1.png" alt="resultat"></p>
<h2 id="et-le-style-dans-le-head" tabindex="-1"><a class="header-anchor" href="#et-le-style-dans-le-head" aria-hidden="true">#</a> Et le style dans le head ?</h2>
<p>En cours nous avons vu qu'il était également possible de mettre la CSS dans une balise style directement dans le <code>&lt;head&gt;</code> de votre page. Je vous laisse tester cette façon de faire.</p>
<p><em>Retirer la ligne :</em></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><em>remplacer la par :</em></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">p</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Tester à nouveau votre site.</p>
<div class="custom-container danger"><p class="custom-container-title">Attention</p>
<p>Bien qu'il soit possible de mettre la CSS dans une balise, style. Je déconseille vraiment cette pratique, en effet, le but de la CSS est de changer l'apparence de <strong>l'ensemble</strong> des pages de votre site. Le but ? Donner un style unique à tout votre site web. Le plus simple est donc de « sortir » la CSS afin que celle-ci soit centralisée à un seul endroit.</p>
<p>Nous le verrons plus tard en PHP ou en JavaScript/Typescript, un développeur doit être organisé et doit rendre générique son travail. L'objectif de cette organisation ? Être efficace dans ses missions quotidiennes.</p>
<p>Dans le cas présent, votre site sera certainement à terme constitué de plusieurs pages… Ça semble donc évident de ne pas « copier / coller » la CSS dans chaque page. Mais évidement de la mettre dans un fichier externe.</p>
</div>
<h2 id="quelques-explications" tabindex="-1"><a class="header-anchor" href="#quelques-explications" aria-hidden="true">#</a> Quelques explications</h2>
<p>Avant de continuer petit rappel vis-à-vis du cours :</p>
<p><img src="/cours/sources/introduction_css/res/css-ruleset.png" alt="Règle CSS"></p>
<p>Votre fichier CSS sera constitué de règles CSS (sélécteur). Pour l'instant vous n'en avez qu'une seule. Celle-ci indique que le texte de toutes les balises <code>&lt;p&gt;</code> doit être rouge.</p>
<h2 id="styliser-les-titres" tabindex="-1"><a class="header-anchor" href="#styliser-les-titres" aria-hidden="true">#</a> Styliser les titres</h2>
<p>Je vous propose maintenant de changer le style des titres. Je vous propose donc de changer le style des deux titres :</p>
<ul>
<li>Augmenter la taille de la police <code>font-size: 4em</code>.</li>
<li>Mettre les textes en bleu <code>color: #1D2D3A</code>.</li>
</ul>
<p>Je vous laisse écrire le sélecteur CSS nécessaire. Celui-ci devrait ressembler à :</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">votreSelecteurDeTitre</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 4em<span class="token punctuation">;</span>
    … la suite
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><details class="custom-container details"><summary>Voir un indice</summary>
<p>Je vous rappelle que vous pouvez écrire un sélecteur multiple, et plusieurs lignes comme style.</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">h1,
h2</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 4em<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></details>
<h2 id="appliquer-le-style-sur-un-id-ou-class" tabindex="-1"><a class="header-anchor" href="#appliquer-le-style-sur-un-id-ou-class" aria-hidden="true">#</a> Appliquer le style sur un id ou class</h2>
<p>Le CSS permet d'applique de la CSS de manière fine. Pour l'instant vous avez appliqué la CSS sur « un type d'élément » (p, h1, div… ). Il est possible d'être bien plus précis que ça.</p>
<p>En CSS vous avez la possibilité d'écrire des sélecteurs sur un certain nombre d'éléments, nous allons pour l'instant nous concentrer sur « ceux de base » à savoir les <code>id</code> et les <code>class</code>. L'id comme la class sont des attributs que nous pouvons ajouter sur une balise HTML.</p>
<div class="custom-container tip"><p class="custom-container-title">Rappel</p>
<p>Un attribut HTML est un élément que vous allez ajouter <strong>dans</strong> la balise HTML. Exemple :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>demo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ceci est une démo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>monId<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ceci est une démo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Différence entre <code>class</code> et <code>id</code> ? L'id doit-être unique dans votre page, il va également nous permettre de manipuler simplement l'élément en JavaScript.</p>
</div>
<h3 id="rappel-sur-les-selecteurs" tabindex="-1"><a class="header-anchor" href="#rappel-sur-les-selecteurs" aria-hidden="true">#</a> Rappel sur les sélecteurs</h3>
<p>Il est difficile de faire un « mémo » sur la CSS. Cependant, vous pouvez retenir cette liste de sélecteurs elle vous sera toujours utile. C'est en quelques sortes la base :</p>
<table>
<thead>
<tr>
<th>Sélecteur</th>
<th>Cible</th>
</tr>
</thead>
<tbody>
<tr>
<td>#item</td>
<td>Élément avec id <code>item</code></td>
</tr>
<tr>
<td>.item</td>
<td>Élément(s) avec class <code>item</code></td>
</tr>
<tr>
<td>p</td>
<td>Élément(s) de type <code>p</code></td>
</tr>
<tr>
<td>div, p</td>
<td>Élément(s) de type <code>div</code> ou <code>p</code></td>
</tr>
<tr>
<td>p &gt; i</td>
<td>Élément(s) de type <code>i</code> dans <code>p</code></td>
</tr>
<tr>
<td>.item &gt; i</td>
<td>Élément(s) de type <code>i</code> dans <code>.item</code></td>
</tr>
</tbody>
</table>
<p>Cette liste est « non-exhaustive ». Consulter <a href="https://www.w3.org/Style/css3-selectors-updates/WD-css3-selectors-20010126.fr.html#selectors" target="_blank" rel="noopener noreferrer">une liste plus complète ici<ExternalLinkIcon/></a></p>
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
<h3 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>Ajouter dans votre page un nouveau paragraphe <code>p</code>. Avec comme class <code>text</code>. (<code>&lt;p class='text'&gt;Votre texte&lt;/p&gt;</code>)</li>
<li>Créer le sélecteur pour customiser l'élément.</li>
</ul>
<h3 id="a-faire-2" tabindex="-1"><a class="header-anchor" href="#a-faire-2" aria-hidden="true">#</a> À faire 2</h3>
<ul>
<li>Même opération, mais avec un id</li>
</ul>
<h2 id="modifier-votre-premier-projet" tabindex="-1"><a class="header-anchor" href="#modifier-votre-premier-projet" aria-hidden="true">#</a> Modifier votre premier projet</h2>
<p>Maintenant que vous savez faire quelques « sélecteurs » en CSS. Je vous laisse reprendre vos premières pages pour tenter de modifier un peu le style.</p>
<p>En manque d'inspiration ? <a href="https://codepen.io/" target="_blank" rel="noopener noreferrer">CodePen vous aidera à trouver des idées<ExternalLinkIcon/></a></p>
</template>
