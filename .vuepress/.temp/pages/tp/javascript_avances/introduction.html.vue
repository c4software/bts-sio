<template><h1 id="prise-en-main-«-javascript-avance-»" tabindex="-1"><a class="header-anchor" href="#prise-en-main-«-javascript-avance-»" aria-hidden="true">#</a> Prise en main « JavaScript avancé »</h1>
<p>Vous avez déjà fait du JavaScript, mais certainement avec jQuery et surement sans utiliser les fonctions « modernes » de celui-ci.</p>
<p>Dans ce TP et au travers de quelques exemples, nous allons découvrir en pratique les nouveautés.</p>
<h2 id="question-0" tabindex="-1"><a class="header-anchor" href="#question-0" aria-hidden="true">#</a> Question 0</h2>
<p>Pourquoi est-ce important d'utiliser les fonctionnalités modernes du JavaScript ? En quoi est-ce primordial ?</p>
<h2 id="question-1" tabindex="-1"><a class="header-anchor" href="#question-1" aria-hidden="true">#</a> Question 1</h2>
<p>En utilisant :</p>
<ul>
<li>let / const</li>
<li>String template</li>
<li>forEach</li>
</ul>
<p>Moderniser le code ci-dessous :</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>nom = &quot;Valentin&quot;;
capacites = [&quot;JavaScript&quot;, &quot;Android&quot;, &quot;Web&quot;, &quot;CSS&quot;];

console.log(nom + &quot; connait les &quot; + capacites.length + &quot; technologies &quot;);
console.log(&quot;Voilà la liste&quot;);

for (c in capacites){
    console.log(&quot;- &quot; + capacites[c]);
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="question-2" tabindex="-1"><a class="header-anchor" href="#question-2" aria-hidden="true">#</a> Question 2</h2>
<p>Réécrire le code suivant en utilisant les <code>fonctions flechés</code> et les <code>string templates</code>.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token parameter">nom</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Bonjour « "</span> <span class="token operator">+</span> nom <span class="token operator">+</span> <span class="token string">" » "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> nom <span class="token operator">=</span> <span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">"Votre nom"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">hello</span><span class="token punctuation">(</span>nom<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="question-3" tabindex="-1"><a class="header-anchor" href="#question-3" aria-hidden="true">#</a> Question 3</h2>
<p>En utilisant la méthode <code>filter</code> d'un tableau filtrer l'ensemble des éléments <code>non pairs</code> du tableau suivant :</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>const valeurs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Les nombres non pairs se trouvent via un <code>% 2</code>.</p>
</div>
<h2 id="question-4" tabindex="-1"><a class="header-anchor" href="#question-4" aria-hidden="true">#</a> Question 4</h2>
<p>Manipuler un <code>objet</code> avec des méthodes, c'est toujours plus simple que de manipuler un simple Object.</p>
<p>En utilisant le code fourni, « remaper / transformer » grâce à la fonction <code>map</code> l'ensemble des <code>objects</code> en <code>Person</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> data<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">static</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> clients <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"Valentin"</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">15</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"Thomas"</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">20</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"John"</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">38</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="question-5" tabindex="-1"><a class="header-anchor" href="#question-5" aria-hidden="true">#</a> Question 5</h3>
<p>Ajouter une méthode dans l'objet <code>Person</code> qui retourne <code>true</code> si la personne est majeure.</p>
<p>⚠️ Ne pas oublier d'ajouter l'âge dans le constructeur comme <code>name</code>.</p>
<h3 id="question-6" tabindex="-1"><a class="header-anchor" href="#question-6" aria-hidden="true">#</a> Question 6</h3>
<p>En utilisant l'instruction <code>filter</code>, filtrer le tableau résultat pour ne garder que les personnes majeures.</p>
<h3 id="question-7" tabindex="-1"><a class="header-anchor" href="#question-7" aria-hidden="true">#</a> Question 7</h3>
<p>Ajouter une méthode dans l'objet. Celle-ci doit retourner une string contenant le <code>nom</code> et <code>âge</code> en utilisant String template.</p>
<h3 id="question-8" tabindex="-1"><a class="header-anchor" href="#question-8" aria-hidden="true">#</a> Question 8</h3>
<p>Utiliser la méthode précédemment créée pour faire un <code>console.log</code> pour chaque (<code>forEach</code>) élément <code>filtré</code>.</p>
<h3 id="question-9" tabindex="-1"><a class="header-anchor" href="#question-9" aria-hidden="true">#</a> Question 9</h3>
<p>Avant le JavaScript « moderne » il était courant d'utiliser l'objet <code>xmlhttprequest</code> pour faire des appels réseau.</p>
<p>Réécrire le code suivant en utilisant <code>Fetch</code> :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> req <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

req<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>readyState <span class="token operator">===</span> XMLHttpRequest<span class="token punctuation">.</span><span class="token constant">DONE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Réponse reçue: %s"</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>responseText<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
        <span class="token string">"Status de la réponse: %d (%s)"</span><span class="token punctuation">,</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>status<span class="token punctuation">,</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>statusText
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

req<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"https://jsonplaceholder.typicode.com/todos/"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
req<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="question-10" tabindex="-1"><a class="header-anchor" href="#question-10" aria-hidden="true">#</a> Question 10</h3>
<p>Même question, mais en utilisant <a href="https://elbywan.github.io/wretch/" target="_blank" rel="noopener noreferrer">Wretch<ExternalLinkIcon/></a></p>
<h3 id="question-11" tabindex="-1"><a class="header-anchor" href="#question-11" aria-hidden="true">#</a> Question 11</h3>
<p>Créer une classe pour la liste des <code>Todos</code>, puis en utilisant le <code>chainage</code> (then) des <code>Promises</code> et la méthode map d'un tableau transformer l'ensemble des Todos du retour en objet de type <code>Todo</code></p>
<h3 id="question-12" tabindex="-1"><a class="header-anchor" href="#question-12" aria-hidden="true">#</a> Question 12</h3>
<p>Via l'instruction <code>filter</code>, filtrer l'ensemble des Todos qui sont pour l'utilisateur 2 <em>et</em> non completed.</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>&quot;userId&quot;: 2,
&quot;completed&quot;: true
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="question-13" tabindex="-1"><a class="header-anchor" href="#question-13" aria-hidden="true">#</a> Question 13</h3>
<p>Lister l'ensemble des valeurs de l'ensemble de la liste des Todo créé précédemment.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code>Object.values(…)</code></p>
</div>
</template>
