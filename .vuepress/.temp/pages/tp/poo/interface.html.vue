<template><h1 id="le-principe-des-interfaces" tabindex="-1"><a class="header-anchor" href="#le-principe-des-interfaces" aria-hidden="true">#</a> Le principe des interfaces</h1>
<p>Dans cette mise en pratique nous allons voir comment déclarer et utiliser des <code>Interfaces PHP</code>. Les interfaces sont un éléments importants de la programmation objet, pour rappel les Interfaces sont des class abstraites (instanciation impossible):</p>
<ul>
<li>Va d'écrire un comportement.</li>
<li>Définir les signatures des méthodes et propriétés</li>
<li>Garantir au code qui fait l'appel que la méthode existera.</li>
</ul>
<p>C'est donc un contrat que la <code>class</code> <strong>doit respecter</strong> si elle implémente l'interface, si celle-ci implémente une Interface elle devra forcément avoir l'ensemble des méthodes « décrite » dans l'interface.</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#cas-concret-l-interface-surface">Cas concret : L&#39;interface Surface</RouterLink><ul><li><RouterLink to="#declarer-l-interface">Déclarer l&#39;interface</RouterLink></li><li><RouterLink to="#creer-la-class-circle">Créer la class Circle</RouterLink></li><li><RouterLink to="#creer-la-class-square">Créer la class Square</RouterLink></li><li><RouterLink to="#valider-le-fonctionnement">Valider le fonctionnement</RouterLink></li><li><RouterLink to="#creer-la-class-rectangle">Créer la class Rectangle</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="cas-concret-l-interface-surface" tabindex="-1"><a class="header-anchor" href="#cas-concret-l-interface-surface" aria-hidden="true">#</a> Cas concret : L'interface Surface</h2>
<p>Je vous propose d'illustrer les Interfaces avec le calcul d'une surface. Objectifs :</p>
<ul>
<li>Pratiquer les Interfaces.</li>
<li>Création d'une Interface <code>IISurface</code>.
<ul>
<li>L'interface <code>IISurface</code> doit contenir une méthode <code>public</code> nommée <code>surface()</code> celle-ci doit retourner un <code>int</code></li>
</ul>
</li>
<li>Utiliser l'interface dans l'ensemble des <code>class</code> formes (<code>Circle</code>, <code>Square</code>, …).
<ul>
<li>Implémenter le code pour chaque « forme », celui-ci doit retourner la surface de chaque <code>forme</code></li>
</ul>
</li>
<li>Valider que le code fonctionne.</li>
</ul>
<h3 id="declarer-l-interface" tabindex="-1"><a class="header-anchor" href="#declarer-l-interface" aria-hidden="true">#</a> Déclarer l'interface</h3>
<p>La première étape est de créer l'interface en elle-même :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">interface</span> <span class="token class-name-definition class-name">IISurface</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">surface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">int</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="creer-la-class-circle" tabindex="-1"><a class="header-anchor" href="#creer-la-class-circle" aria-hidden="true">#</a> Créer la class Circle</h3>
<p>Nous avons maintenant notre Interface, celle-ci seule ne fait rien. Elle est abstraite il faut donc créer des <code>class</code> qui vont <code>implements</code> cette Interface. Notre class permet le calcul de la surface ; je vous propose donc de créer une première <code>class Circle</code> :</p>
<ul>
<li>Première étape créer votre fichier php <code>Circle.class.php</code>.</li>
<li>Créer le code de votre class. <strong>Votre class doit implements IISurface</strong></li>
</ul>
<p>Je vous aide voilà le début de la classe</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">IISurface</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>Je vous laisse trouver les/la <code>propriété(s)</code> nécessaire au bon fonctionnement de la <code>class</code>.</li>
<li>Je vous laisse implémenter le code de la méthode <code>Surface</code>.</li>
</ul>
<details class="custom-container details"><summary>Code de la class (à ne regarder que si vous ne trouvez pas)</summary>
<p>Avez-vous vraiment cherché ?</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">include_once</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SurfaceInterface.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">IISurface</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token variable">$r</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token variable">$r</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">r</span> <span class="token operator">=</span> <span class="token variable">$r</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">surface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword return-type">int</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Je vous laisse écrire le code</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></details>
<h3 id="creer-la-class-square" tabindex="-1"><a class="header-anchor" href="#creer-la-class-square" aria-hidden="true">#</a> Créer la class Square</h3>
<p>En reprenant le principe de la class Circle, je vous laisse écrire le code de la class Square. Ici pas d'aide, mais comme dans le code précédent vous devez <strong>implémenter l'interface IISurface</strong></p>
<ul>
<li>Première étape créer votre fichier php <code>Square.class.php</code>.</li>
<li>Créer le code de votre class. <strong>Votre class doit implements IISurface</strong></li>
</ul>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Square</span> <span class="token keyword">implements</span> <span class="token class-name">IISurface</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>Je vous laisse trouver les/la <code>propriété(s)</code> nécessaire au bon fonctionnement de la <code>class</code>.</li>
<li>Je vous laisse implémenter le code de la méthode <code>Surface</code>.</li>
</ul>
<h3 id="valider-le-fonctionnement" tabindex="-1"><a class="header-anchor" href="#valider-le-fonctionnement" aria-hidden="true">#</a> Valider le fonctionnement</h3>
<p>En utilisant le code suivant, je vous laisse valider le fonctionnement :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">calculateSurfaceOf</span><span class="token punctuation">(</span><span class="token variable">$arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$arr</span> <span class="token keyword">as</span> <span class="token variable">$a</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token variable">$a</span> <span class="token keyword">instanceof</span> <span class="token class-name">IISurface</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">echo</span> <span class="token string double-quoted-string">"La surface est de <span class="token interpolation"><span class="token punctuation">{</span><span class="token variable">$a</span><span class="token operator">-></span><span class="token function">surface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>&lt;br />"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">echo</span> <span class="token string double-quoted-string">"La class n'implémente pas l'interface « Surface »"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">calculateSurfaceOf</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Square</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ul>
<li>Utiliser ce code dans un nouveau fichier <code>index.php</code>.</li>
<li>Valider que la surface fonctionne.</li>
</ul>
<h3 id="creer-la-class-rectangle" tabindex="-1"><a class="header-anchor" href="#creer-la-class-rectangle" aria-hidden="true">#</a> Créer la class Rectangle</h3>
<p>Même consigne que pour Circle et Square, je vous laisse travailler :</p>
<ul>
<li>Première étape créer votre fichier php <code>Rectangle.class.php</code>.</li>
<li>Créer le code de votre class. <strong>Votre class doit implements IISurface</strong></li>
<li>L'ajouter dans la page de test <code>index.php</code>.</li>
</ul>
</template>
