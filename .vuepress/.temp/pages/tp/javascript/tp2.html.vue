<template><h1 id="le-retour-de-bart" tabindex="-1"><a class="header-anchor" href="#le-retour-de-bart" aria-hidden="true">#</a> Le retour de Bart</h1>
<p><RouterLink to="/tp/php/tp1.1.html">Vous vous souvenez du générateur de Bart écrit en PHP?</RouterLink> Et bien cette fois-ci nous allons coder la version JavaScript du générateur de phrase.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce TP nous allons pratiquer la manipulation du DOM en JavaScript. Bien que je trouve que ça ne soit pas forcément la meilleure façon de faire (je préfère de loin l'approche VueJS), il est complètement possible de créer, afficher, conditionner l'affichage d'éléments 100% avec du JavaScript. Dans ce TP vous allez écrire le code JavaScript afin de réaliser :</p>
<p><img src="@source/tp/javascript/res/bart-js.png" alt="Bart en version JS"></p>
<h2 id="creation-de-la-structure" tabindex="-1"><a class="header-anchor" href="#creation-de-la-structure" aria-hidden="true">#</a> Création de la structure</h2>
<p>Nous l'avons fait de multiple fois, je vous laisse mettre en place la structure de votre projet. J'ai souhaite cependant que celle-ci respecte quelques règles :</p>
<ul>
<li>Votre fichier HTML doit s'appeler <code>index.html</code>.</li>
<li>L'ensemble de vos ressources <code>public</code> doivent être dans un dossier <code>public</code>.</li>
<li>La CSS doit être externalisée dans un dossier nommé <code>style</code>.</li>
<li>Le JavaScript doit être dans un fichier <code>main.js</code> dans un dossier nommé <code>js</code>.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">La fainéantise ! La clé du succès 🔑</p>
<p>Nous en avons déjà parlé, un développeur doit être efficace (et fainéant)… Ne vous amusez donc pas à recoder l'ensemble. Reprenez le code que vous avez réalisé lors de la création du <RouterLink to="/tp/php/tp1.1.html">Bart en version PHP</RouterLink></p>
</div>
<div class="custom-container danger"><p class="custom-container-title">Halt !</p>
<p>Quelques petits rappels…</p>
<div class="language-HTML ext-HTML line-numbers-mode"><pre v-pre class="language-HTML"><code>&lt;!-- Inclure une CSS --&gt;
&lt;link rel=&quot;stylesheet&quot; href=&quot;public/style/main.css&quot; /&gt;

&lt;!-- Inclure un fichier JS --&gt;
&lt;script src=&quot;public/js/main.js&quot;&gt;&lt;/script&gt;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></div>
<h2 id="le-html" tabindex="-1"><a class="header-anchor" href="#le-html" aria-hidden="true">#</a> Le HTML</h2>
<p>Voilà la structure de <strong>mon HTML</strong> :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fr<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Bart JS Générator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>public/style/main.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>public/js/main.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tableau<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="le-js" tabindex="-1"><a class="header-anchor" href="#le-js" aria-hidden="true">#</a> le JS</h2>
<p>Votre fichier JavaScript va contenir la logique de notre application. Pour rappel, celle-ci est très simple elle ne « fait que » afficher des phrases dans la <code>div</code> avec comme édentant <code>#tableau</code>.</p>
<p>Votre travail va donc se résumer à :</p>
<ul>
<li>Créer les variables (phrase et nombre de lignes).</li>
<li>Une boucle (type <code>for</code>, voir vos notes ou le cours).</li>
<li>Un sélecteur pour obtenir le tableau (<code>let tableau = document.getElementById('tableau');</code>)</li>
<li>L'ajout d'élément « dans la div tableau ». (<RouterLink to="/tp/javascript/support.html#creer-des-elements-dans-la-page">voir le support</RouterLink>)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">réfléchir avant d'agir</p>
<p>Écrire le code immédiatement est tentant ? Mais arrêtons-nous un instant pour réfléchir à notre code. Tenter d'écrire votre code en français (ou via un diagramme)</p>
</div>
<h3 id="ou-placer-le-js" tabindex="-1"><a class="header-anchor" href="#ou-placer-le-js" aria-hidden="true">#</a> Où placer le JS ?</h3>
<p>Maintenant que vous avez votre code JavaScript, vous avez deux solutions :</p>
<ul>
<li>La première est de mettre votre JS à la fin de votre HTML. L'objectif faire en sorte que celui-ci soit exécuté quand votre page est chargée. (À votre avis, est-ce une bonne idée ?)</li>
<li>La seconde est de mettre votre JS dans le <code>head</code> de votre site. Celui-ci sera donc chargé au plus tôt par contre le code sera lancé immédiatement… Alors, comment faire ?</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">La solution ?</p>
<p>Attendre que votre page « soit entièrement chargée » afin de déclencher votre JavaScript ! Cet évènement est appelé <code>Dom Ready</code> (il est très important), dès que cet évènement est « levé » vous pouvez exécuter votre JS.</p>
</div>
<p>Concrètement il faut écrire :</p>
<p><em>En pure JS :</em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"DOMContentLoaded"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Votre code ici</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> <span class="token number">10000000</span><span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Je m'affiche quand la page est chargée entièrement."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><em>Avec jQuery :</em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Je m'affiche quand la page est chargée entièrement."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Une petite remarque</p>
<p>Comme vous pouvez le constater jQuery est bien plus concis, on verra qu'avec VueJS ça sera encore plus simple.</p>
</div>
<p>Je vous laisse écrire le code nécessaire au bon fonctionnement de votre site.</p>
<details class="custom-container details"><summary>Bloqué ?</summary>
<p>Besoin d'aide ? <RouterLink to="/demo/js/bart/index.html">Voici ma version</RouterLink></p>
</details>
<h2 id="allons-plus-loin" tabindex="-1"><a class="header-anchor" href="#allons-plus-loin" aria-hidden="true">#</a> Allons plus loin</h2>
<p>Vous avez codé votre application en pure JS. Je vous laisse migrer votre code pour utiliser :</p>
<ul>
<li>Les sélecteurs <a href="https://jquery.com/" target="_blank" rel="noopener noreferrer">jQuery<ExternalLinkIcon/></a>.</li>
<li>La création et la manipulation du DOM grace à jQuery.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Petit rappel</p>
<p>Inclure jQuery dans votre projet est aussi simple que d'ajouter dans votre <code>head</code> :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<p>C'est à vous, je vous laisse travailler.</p>
</template>
