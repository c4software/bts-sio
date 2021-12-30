<template><h1 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> Hello World</h1>
<p>C'est un grand classique, nous allons faire notre premier Hello World.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Nous avons vu dans <RouterLink to="/tp/javascript/support.html">le cours</RouterLink> qu'il était possible de mettre de balises script n'importe où dans le code HTML. Je vais vous laisser tester cette fonctionnalité avec trois cas d'usage.</p>
<h2 id="une-alerte-dans-le-code-html" tabindex="-1"><a class="header-anchor" href="#une-alerte-dans-le-code-html" aria-hidden="true">#</a> Une alerte dans le code HTML</h2>
<p>En utilisant le support de cours, mettre en place une alerte qui dit « Bonjour à tous » dans une page HTML créée pour l'occasion.</p>
<h2 id="une-alerte-dans-un-script-externe" tabindex="-1"><a class="header-anchor" href="#une-alerte-dans-un-script-externe" aria-hidden="true">#</a> Une alerte dans un script externe</h2>
<p>Mettre le code dans la page directement n'est pas super. Je vous propose de sortir le code afin de le mettre dans un autre fichier. En utilisant les bonnes pratiques d'organisation que nous avons vues précédemment, je vous laisse mettre votre <code>alert</code> dans un fichier « externe ».</p>
<p>Une fois mise en place vérifiée que votre code fonctionne tout le temps.</p>
<h2 id="remplacer-l-alerte-par-un-console-log" tabindex="-1"><a class="header-anchor" href="#remplacer-l-alerte-par-un-console-log" aria-hidden="true">#</a> Remplacer l'alerte par un console.log</h2>
<p>Je vous propose maintenant de tester la console de votre navigateur. La console vas nous permettre de débugger un programme. Elle va nous permettre également d'afficher du texte (de debug). En utilisant la ligne de code suivante :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Bonjour à tous"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Tester que celle-ci s'affiche bien dans la console de votre navigateur.</p>
<div class="custom-container tip"><p class="custom-container-title">Astuce de pro</p>
<p>Vous avez d'autres possibilités :</p>
<ul>
<li><code>console.log</code></li>
<li><code>console.error</code></li>
<li><code>console.warn</code></li>
<li>…</li>
</ul>
<p>Je vous laisse les tester.</p>
</div>
<p>✋ Oui c'était simple… Mais l'idée est de prendre en main le langage. ✋</p>
</template>
