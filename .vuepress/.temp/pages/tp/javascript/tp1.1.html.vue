<template><h1 id="des-variables-en-veux-tu-en-voila" tabindex="-1"><a class="header-anchor" href="#des-variables-en-veux-tu-en-voila" aria-hidden="true">#</a> Des variables en veux tu en voilà !</h1>
<p>Nous avons vu comment déclarer une balise <code>script</code>. Un code sans variable c'est un peu comme une pizza sans olives…</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Nous avons vu dans le cours que les variables pouvaient être de deux types, <code>variable</code> et <code>constante</code>, dans ce TP nous allons les utiliser.</p>
<h2 id="une-variable" tabindex="-1"><a class="header-anchor" href="#une-variable" aria-hidden="true">#</a> Une variable</h2>
<p>Modifier le code du <RouterLink to="/tp/javascript/tp1.html">TP précédent</RouterLink> afin de déclarer une variable :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token string">"Bonjour à tous"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Utiliser cette variable dans votre alerte.</p>
<h2 id="une-constante" tabindex="-1"><a class="header-anchor" href="#une-constante" aria-hidden="true">#</a> Une constante</h2>
<p>En utilisant le code suivant :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> nom <span class="token operator">=</span> <span class="token string">"Brosseau"</span><span class="token punctuation">;</span>

nom <span class="token operator">=</span> <span class="token string">"valentin"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Vérifier que la constante n'est pas écrasée pendant le fonctionnement de votre programme.</p>
<h2 id="poser-une-question" tabindex="-1"><a class="header-anchor" href="#poser-une-question" aria-hidden="true">#</a> Poser une question ?</h2>
<p>Nous avons vu qu'il était possible de déclarer une variable, mais il est également possible de poser des questions à votre utilisateur. Pour ça nous avons la fonction <code>prompt</code>, cette fonction s'utilise comme ça :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">"Votre âge ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette fonction retourne la valeur saisie par l'utilisateur, vous pouvez donc écrire :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> age <span class="token operator">=</span> <span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">"Votre âge ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire</h3>
<p>Écrire le code permettant :</p>
<ul>
<li>De demander l'âge à votre utilisateur.</li>
<li>Afficher la valeur avec une alerte.</li>
</ul>
<h2 id="et-si-nous-allions-plus-loin" tabindex="-1"><a class="header-anchor" href="#et-si-nous-allions-plus-loin" aria-hidden="true">#</a> Et si nous allions plus loin ?</h2>
<p>Maintenant que vous savez poser des questions et afficher des valeurs. Je vous propose de créer une machine à additionner pour ça votre programme doit :</p>
<ul>
<li>Demander la première valeur à additionner à l'utilisateur</li>
<li>Demander la seconde valeur à l'utilisateur</li>
<li>Réaliser l'opération <code>variable1 + variable2</code> et afficher le résultat à l'utilisateur (dans la console ou dans une alerte).</li>
</ul>
<p>C'est à vous 😃</p>
<div class="custom-container tip"><p class="custom-container-title">Astuce</p>
<p>Il est possible en JavaSscript de « changer le type d'une variable ». <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt" target="_blank" rel="noopener noreferrer">Je vous laisse tester<ExternalLinkIcon/></a></p>
</div>
</template>
