<template><h1 id="pratiquer-l-ajax" tabindex="-1"><a class="header-anchor" href="#pratiquer-l-ajax" aria-hidden="true">#</a> Pratiquer l'Ajax</h1>
<p>Dans ce TP nous allons mettre en pratique l'Ajax au travers de deux exemples.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>L'Ajax est vraiment le coeur de nos sites Internet moderne. On le retrouve dans de simples chats comme dans des applications « complexes ». Avec l'avènement des PWA, nous utilisons maintenant l'Ajax comme nous pouvons utiliser une API dans une application classique.</p>
<p>Nous allons utiliser à nouveau la Greta TV comme base de code. Nous allons rendre dynamique la page d'accueil pour que celle-ci puisse être chargée via un appel réseau asynchrone (Ajax).</p>
<h2 id="cas-1-le-serveur-genere-toujours-la-page-mais-pas-entiere" tabindex="-1"><a class="header-anchor" href="#cas-1-le-serveur-genere-toujours-la-page-mais-pas-entiere" aria-hidden="true">#</a> Cas 1 : Le serveur génère toujours la page (mais pas entière)</h2>
<p>Dans cette première version, nous allons « juste » découper la logique de génération de notre page. Celle-ci va être construite en deux temps, lors du chargement nous allons avoir la structure principale de notre page. Puis dans un second temps notre page va télécharger le contenu manquant via un appel réseau.</p>
<p>Le contenu en question sera généré comme « avant » via du PHP (ou autre langage serveur), mais il se limitera à la partie donnée. Avant d'attaquer, utilisons un exemple simple qui permettra d'illustrer la logique de construction asynchrone.</p>
<p><em>Page index.html</em> :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Ceci est une page dynamique<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Voilà ma page<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>contenuAsynchrone<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!-- Vide au chargement --></span>
      …Chargement en cours…
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"./monContenuAsynchrone.php"</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token operator">=></span>
              <span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"contenuAsynchrone"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> content<span class="token punctuation">)</span>
          <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p><em>Contenu dynamique</em> <code>monContenuAsynchrone.php</code> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token variable">$i</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token variable">$i</span> <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token variable">$i</span><span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">"&lt;li>Valeur <span class="token interpolation"><span class="token variable">$i</span></span>&lt;/li>"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Je vous laisse mettre en place le code suivant sur votre machine.</p>
<ul>
<li>Que va-t-il se passer ?</li>
<li>À quoi sert la fonction <code>setTimeout</code>, pourquoi est-ce inutile ? Mais dans notre cas utile ?</li>
<li>À quoi correspond le <code>then</code> ?</li>
<li>Seriez-vous capable de le faire seule ?</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">setTimeout ?</p>
<p>Le <code>setTimeout</code> n'est pas obligatoire. Il permet juste de créer un faux délai afin de visualiser le côté asynchrone du chargement de la page. La partie de l'Ajax ce résume donc à :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"./monContenuAsynchrone.php"</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token operator">=></span>
      <span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"contenuAsynchrone"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> content<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></div>
<div class="custom-container warning"><p class="custom-container-title">ATTENTION</p>
<p>Vous vous souvenez des XSS ? Faites très attention avec cette façon de faire… Car nous avons ici un XSS puissance 10000. Vous insérez dans votre page du code provenant d'Internet. Et ça sans aucune validation.</p>
<p>C'est TRÈS TRÈS TRÈS RISQUÉ. Très clairement, le risque est très important. Je vous conseille vivement de choisir une solution « sans HTML », comme nous allons faire dans le cas 2.</p>
</div>
<h3 id="evolution-1" tabindex="-1"><a class="header-anchor" href="#evolution-1" aria-hidden="true">#</a> Évolution 1</h3>
<p>En utilisant les compétences vues précédemment, je vous laisse mettre en place :</p>
<ul>
<li>Un bouton dans votre page.</li>
<li>Le bouton doit déclencher sur l'action <code>onclick</code> l'obtention des données (vous allez devoir créer une fonction avec dedans l'appel fetch).</li>
</ul>
<h3 id="et-avec-jquery" tabindex="-1"><a class="header-anchor" href="#et-avec-jquery" aria-hidden="true">#</a> Et avec jQuery ?</h3>
<p>Nous avons vu la version VanillaJS, voilà la version jQuery :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  $<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"./monContenuAsynchrone.php"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#contenuAsynchrone"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>C'est à vous, je vous laisse :</p>
<ul>
<li>Mettre jQuery.</li>
<li>Ajouter le code au bon endroit.</li>
</ul>
<h4 id="evolution-2" tabindex="-1"><a class="header-anchor" href="#evolution-2" aria-hidden="true">#</a> Évolution 2</h4>
<p>Je vous laisse maintenant utiliser la fonction <code>$.post</code> en utilisant la documentation du jQuery, je vous laisse écrire l'appel en POST vers votre serveur.</p>
<p>Le but envoyer un nombre dynamique de résultats en retour de l'API. Vous allez donc devoir :</p>
<ul>
<li>Ajouter un paramètre de type POST dans votre script PHP (et l'utiliser dans la boucle).</li>
<li>L'envoyer dans le POST de votre appel Ajax.</li>
</ul>
<h2 id="cas-2-le-serveur-genere-juste-la-donnee-au-format-json" tabindex="-1"><a class="header-anchor" href="#cas-2-le-serveur-genere-juste-la-donnee-au-format-json" aria-hidden="true">#</a> Cas 2 : Le serveur génère juste la donnée (au format JSON)</h2>
<p>Nous allons ici faire travailler à la fois votre navigateur et le serveur. Le serveur va nous produire de la donnée « au format brut », c'est-à-dire un format compréhensible par un ordinateur. Votre JavaScript construira le code HTML par rapport à cette donnée.</p>
<p>C'est la façon que moi je préfère, on verra plus tard avec VueJS que cette solution nous permettra de réaliser rapidement, et sans écrire énormément de code des interfaces web réactivent.</p>
<p>Avant d'allez plus loin, voyons un exemple simple ensemble :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Ceci est une page dynamique<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Voilà ma page<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>contenuAsynchrone<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!-- Vide au chargement --></span>
      …Chargement en cours…
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"./monContenuAsynchrone.php"</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">datas</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"contenuAsynchrone"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>

            datas<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              document
                <span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"contenuAsynchrone"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span><span class="token string">"beforeend"</span><span class="token punctuation">,</span> <span class="token string">"&lt;li>"</span> <span class="token operator">+</span> el <span class="token operator">+</span> <span class="token string">"&lt;/li>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p><em>Contenu dynamique</em> <code>monContenuAsynchrone.php</code> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'Content-Type: application/json'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token variable">$data</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token variable">$i</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token variable">$i</span> <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token variable">$i</span><span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token variable">$data</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"Valeur <span class="token interpolation"><span class="token variable">$i</span></span>"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">echo</span> <span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token variable">$data</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Je vous laisse mettre en place le code sur votre ordinateur.</p>
<ul>
<li>Quelles différences notez-vous par rapport au précédent exemple ?</li>
<li>À quoi correspond le <code>header</code> ?</li>
<li><code>json_encode</code> ? À quoi sert cette fonction ?</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">API ?</p>
<p>Ce que vous venez de créer est une API. Une API est le coeur de beaucoup de systèmes moderne. Il est important de comprendre ce concept dès à présent. Pourquoi faire une API ?</p>
<p>Une API va nous permettre de séparer la logique entre client et serveur afin de réaliser si vous le souhaitez différent client pour la même donnée (exemple Twitter avec des clients multiplateformes).</p>
<p>Pourquoi préférer une API « JSON / XML » à un retour HTML basic ? Tout simplement, car l'API va être universelle; nous pourrons donc l'utiliser dans un site Internet, mais également dans une application ou n'importe quel client applicatif.</p>
</div>
<h3 id="evolution-3-integrer-une-api-publique" tabindex="-1"><a class="header-anchor" href="#evolution-3-integrer-une-api-publique" aria-hidden="true">#</a> Évolution 3 : Intégrer une API publique</h3>
<p>Nous avons utilisé pour l'instant une API que vous avez créée. Nous allons tenter l'utilisation d'une API (json) fournie par un autre développeur. En utilisant l'API suivante :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>https://reqres.in/api/users
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Modifier la page pour :</p>
<ul>
<li>Afficher un tableau.</li>
<li>Qui contiendra autant de ligne que d'utilisateur présent dans la partie <code>data</code>.</li>
<li>Chaque ligne du tableau devra afficher l'email &amp; l'avatar (dans une balise <code>&lt;img&gt;</code>).</li>
</ul>
<h3 id="regardons-d-autres-sites" tabindex="-1"><a class="header-anchor" href="#regardons-d-autres-sites" aria-hidden="true">#</a> Regardons d'autres sites.</h3>
<p>Nous avons vu qu'il était possible assez simplement de charger de contenu de manière asynchrone. Ce chargement asynchrone est la base du web que vous pratiquez tous les jours (sans vous en rendre compte). Maintenant que vous savez ça, je vous propose une petite expérimentation :</p>
<ul>
<li>Rendez-vous sur GMAIL, constatez que le chargement est fait « de manière asynchrone », et que seul l'intérieur change.</li>
<li>Idem sur Facebook (ou instagram Web)</li>
<li>Idem sur Twitter</li>
</ul>
<p>Nous allons maintenant regarder ce qu'il se passe « à l'intérieur » (dans le code), grâce à <code>l'inspecteur d'éléments</code> vous allez pouvoir entrevoir ce qu'il se passe. Rendez-vous sur par exemple <code>Facebook</code>, puis ouvrez l'inspecteur :</p>
<p><img src="@source/tp/javascript/res/inspecteur_fb.png" alt="Inspecteur sur Facebook"></p>
<h2 id="concretement-dans-un-site-existant" tabindex="-1"><a class="header-anchor" href="#concretement-dans-un-site-existant" aria-hidden="true">#</a> Concrètement dans un site existant</h2>
<p>Nous avons fait deux pages de tests, je vous propose de faire la même chose, mais dans un code plus complet <RouterLink to="/tp/javascript/tp4.1.html">→ La suite est par ici ←</RouterLink></p>
</template>
