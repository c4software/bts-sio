<template><h1 id="le-generateur-de-bart" tabindex="-1"><a class="header-anchor" href="#le-generateur-de-bart" aria-hidden="true">#</a> Le générateur de Bart</h1>
<p>Le meilleur moyen de comprendre les boucles. C'est d'en écrire par soi-même. Je vous propose de créer votre propre générateur de Bart.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Nous allons mettre en application les boucles en PHP. Bon je ne vais pas vous demander de recopier 100× une phrase au tableau… Mais je vais demander à votre ordinateur de le faire avec une boucle <code>while</code> ou <code>for</code>.</p>
<p>Dans ce TP nous allons utiliser les boucles, mais surtout nous allons regarder comment le faire « pas trop salement »</p>
<h2 id="la-structure" tabindex="-1"><a class="header-anchor" href="#la-structure" aria-hidden="true">#</a> La structure</h2>
<p>Avant d'attaquer le code, regardons un peu ce que je vous demande. Je vous propose de reproduire le résultat suivant :</p>
<p><img src="@source/tp/php/res/bart-generator.png" alt="Générateur de Bart"></p>
<h3 id="definir-les-elements-necessaires" tabindex="-1"><a class="header-anchor" href="#definir-les-elements-necessaires" aria-hidden="true">#</a> Définir les éléments nécessaires</h3>
<p>Malheureusement vous n'avez pas au code. Mais seulement à une maquette du rendu final. Il faut donc interpréter, regarder, obtenir les éléments nécessaires à la réalisation de la page. Si on regarde il y a :</p>
<ul>
<li>Une image de Bart sur fond transparent (à chercher sur Internet)</li>
<li>Un fond vert avec une bordure de quelques pixels marron.</li>
<li>L'image de bart semble être un <code>background-image</code> placé en CSS.</li>
<li>Le texte est assez gros avec une police personnalisée.</li>
<li>Le tableau semble être d'une largeur fixe centré dans la page (<code>margin: auto</code>).</li>
</ul>
<h3 id="definir-la-structure-html-et-css" tabindex="-1"><a class="header-anchor" href="#definir-la-structure-html-et-css" aria-hidden="true">#</a> Définir la structure HTML et CSS</h3>
<p>Maintenant que nous avons défini les éléments nécessaires il faut déterminer la structure de la partie HTML + CSS, à première vue je dirais :</p>
<ul>
<li>Une page HTML non-responsive.</li>
<li>Une feuille de style.</li>
<li>Le « tableau de bart » sera très certainement une <code>&lt;div&gt;</code> avec dedans une boucle <code>while</code> ou <code>for</code> écrite en PHP.</li>
</ul>
<h3 id="definir-les-elements-du-code-php" tabindex="-1"><a class="header-anchor" href="#definir-les-elements-du-code-php" aria-hidden="true">#</a> Définir les éléments du code PHP</h3>
<p>Notre code PHP sera certainement très simple. Je vois à première vue :</p>
<ul>
<li>Une variable <code>$nb_ligne</code> qui sera le nombre total de lignes à afficher.</li>
<li>Une variable <code>$phrase</code> qui est la phrase à afficher dans le « tableau ».</li>
<li>Une boucle <code>while</code> ou <code>for</code>.</li>
</ul>
<h2 id="realisation" tabindex="-1"><a class="header-anchor" href="#realisation" aria-hidden="true">#</a> Réalisation</h2>
<p>Voilà… Nous avons vu les éléments nécessaires… C'est à vous. Je vous laisse réaliser la page en question</p>
<div class="custom-container tip"><p class="custom-container-title">N'oubliez pas</p>
<p>Votre IDE vous aide. N'oubliez pas de le configurer pour automatiser certaines de vos actions.</p>
</div>
<h2 id="evolution" tabindex="-1"><a class="header-anchor" href="#evolution" aria-hidden="true">#</a> Évolution</h2>
<p>Passer en paramètre <code>GET</code> le nombre de ligne à écrire dans la page :</p>
<p><em>Exemple :</em></p>
<p>Pour la page avec un lien comme : <code>http://localhost/bart/index.php?nb=1000</code></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$nombre</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nb'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Attention</p>
<p>Ne pas oublier de gérer le cas si pas de paramètre (avec un IF).</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$nombre</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nb'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$nombre</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'nb'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></div>
<h2 id="la-suite" tabindex="-1"><a class="header-anchor" href="#la-suite" aria-hidden="true">#</a> La suite</h2>
<p>Nous reviendrons sur cette base de TP plus tard pour y ajouter :</p>
<ul>
<li>Une fonction.</li>
<li>Des includes.</li>
</ul>
</template>
