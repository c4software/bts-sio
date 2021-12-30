<template><h1 id="aide-memoire-vuejs-2-0" tabindex="-1"><a class="header-anchor" href="#aide-memoire-vuejs-2-0" aria-hidden="true">#</a> Aide mémoire VueJS 2.0</h1>
<div class="custom-container danger"><p class="custom-container-title">Remarque Décembre 2020</p>
<p>Nous sommes actuellement à une periode charnière de VueJS. La version 3.0 bien que stable n'est pas encore la version « par defaut ».</p>
<p>Le document présent ainsi que les supports de cours et TP sont actuellement écrits pour VueJS 2.0</p>
</div>
<p><a href="https://fr.vuejs.org/v2/guide/index.html" target="_blank" rel="noopener noreferrer">Débuter en Français<ExternalLinkIcon/></a></p>
<h2 id="vuecli-recommande-pour-les-debutants" tabindex="-1"><a class="header-anchor" href="#vuecli-recommande-pour-les-debutants" aria-hidden="true">#</a> VueCLI (Recommandé pour les débutants)</h2>
<p>Installation</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> -g vue-cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Créer un projet «application » depuis le template officiel</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ vue init webpack my-project
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="utilisation-en-mode-«-standalone-»" tabindex="-1"><a class="header-anchor" href="#utilisation-en-mode-«-standalone-»" aria-hidden="true">#</a> Utilisation en mode « standalone »</h2>
<p>Ajout de VueJS dans un projet classique, usage en mode « déclaratif »</p>
<p>Ajouter la librairie</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://unpkg.com/vue<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Exemple de HTML existant dans la page :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>monMessage<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>{{ titre }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Code Javascript à ajouter :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>var app = new Vue({ el: '#monMessage', data: { message: 'Bonjour Monde' } })
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="les-evenements" tabindex="-1"><a class="header-anchor" href="#les-evenements" aria-hidden="true">#</a> Les évènements</h2>
<ul>
<li>v-on:click.stop (stop la propagation du click)</li>
<li>v-on:click.prevent (Exemple : v-on:submit.prevent=&quot;onSubmit&quot;)</li>
<li>v-on:click.capture (Évènement interne, appelé avant)</li>
<li>v-on:click.self (Évènement uniquement si lui-même)</li>
<li>v-on:click.once (Évènement déclenché une seule fois)</li>
</ul>
<h2 id="cycle-de-vie" tabindex="-1"><a class="header-anchor" href="#cycle-de-vie" aria-hidden="true">#</a> Cycle de vie</h2>
<ul>
<li>beforeCreate</li>
<li>created</li>
<li>beforeMount</li>
<li>mounted</li>
<li>beforeUpdate</li>
<li>updated</li>
<li>beforeDestroy</li>
<li>detroyed</li>
</ul>
<p><a href="https://fr.vuejs.org/images/lifecycle.png" target="_blank" rel="noopener noreferrer">Les cycles de vie<ExternalLinkIcon/></a></p>
<h2 id="les-directives" tabindex="-1"><a class="header-anchor" href="#les-directives" aria-hidden="true">#</a> Les directives</h2>
<p>Les directives sont des attributs html propres à VueJS</p>
<ul>
<li>v-text</li>
<li>v-html</li>
<li>v-show</li>
<li>v-if</li>
<li>v-else</li>
<li>v-else-if</li>
<li>v-for</li>
<li>v-on</li>
<li>v-bind</li>
<li>v-model</li>
<li>v-pre</li>
<li>v-cloak</li>
<li>v-once</li>
</ul>
</template>
