<template><h1 id="fake-led-api" tabindex="-1"><a class="header-anchor" href="#fake-led-api" aria-hidden="true">#</a> Fake LED Api</h1>
<p>Cette documentation décrit le fonctionnement de l'API « Fake LED »</p>
<h2 id="modele" tabindex="-1"><a class="header-anchor" href="#modele" aria-hidden="true">#</a> Modèle</h2>
<p>Voilà le modèle des données renvoyé par le serveur.</p>
<h2 id="status" tabindex="-1"><a class="header-anchor" href="#status" aria-hidden="true">#</a> Status</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
  "name": "Salon",
  "status": true,
  "update": "Tue, 19 Mar 2019 12:31:36 GMT"
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<h3 id="allumer" tabindex="-1"><a class="header-anchor" href="#allumer" aria-hidden="true">#</a> Allumer</h3>
<p>GET</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>https://[SERVER]/setStatus?name=[NAME]&amp;status=true
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="eteindre" tabindex="-1"><a class="header-anchor" href="#eteindre" aria-hidden="true">#</a> Éteindre</h3>
<p>GET</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>https://[SERVER]/setStatus?name=[NAME]&amp;status=false
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="obtenir-le-status" tabindex="-1"><a class="header-anchor" href="#obtenir-le-status" aria-hidden="true">#</a> Obtenir le status</h3>
<p>GET</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>https://[SERVER]/getStatus?name=[NAME]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="obtenir-l-ensemble-des-etats" tabindex="-1"><a class="header-anchor" href="#obtenir-l-ensemble-des-etats" aria-hidden="true">#</a> Obtenir l'ensemble des états</h3>
<p>GET</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>https://[SERVER]/getAll
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="allumer-eteindre-en-indiquant-la-position" tabindex="-1"><a class="header-anchor" href="#allumer-eteindre-en-indiquant-la-position" aria-hidden="true">#</a> Allumer &amp; Éteindre en indiquant la position</h3>
<p>GET</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>https://[SERVER]/setStatus?name=[NAME]&amp;status=true&amp;lat=[LATITUDE]&amp;lng=[LONGITUDE]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
