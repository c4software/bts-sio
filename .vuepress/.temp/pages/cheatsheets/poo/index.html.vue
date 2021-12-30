<template><h1 id="la-syntaxe-objet" tabindex="-1"><a class="header-anchor" href="#la-syntaxe-objet" aria-hidden="true">#</a> La syntaxe Objet</h1>
<p>Ce document présente la syntaxe objet avec des exemples PHP &amp; Java</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink><ul><li><RouterLink to="#la-poo-c-est-3-concepts">La POO c&#39;est 3 concepts</RouterLink></li><li><RouterLink to="#deux-notions">Deux notions</RouterLink></li><li><RouterLink to="#la-modelisation">La modélisation</RouterLink></li><li><RouterLink to="#les-classes">Les classes</RouterLink></li><li><RouterLink to="#exemple">Exemple</RouterLink></li></ul></li><li><RouterLink to="#les-objets">Les objets</RouterLink><ul><li><RouterLink to="#exemple-1">exemple :</RouterLink></li></ul></li><li><RouterLink to="#definir-une-classe">Définir une classe</RouterLink></li><li><RouterLink to="#instanciation-creer-un-objet">Instanciation (Créer un objet)</RouterLink></li><li><RouterLink to="#le-constructeur">Le constructeur</RouterLink></li><li><RouterLink to="#acces-a-une-methode">Accès à une méthode</RouterLink></li><li><RouterLink to="#acces-a-une-propriete">Accès à une propriété</RouterLink></li><li><RouterLink to="#les-collections">Les collections</RouterLink><ul><li><RouterLink to="#declaration">Déclaration</RouterLink></li><li><RouterLink to="#utilisation">Utilisation</RouterLink></li><li><RouterLink to="#parcours-de-collection">Parcours de collection</RouterLink></li></ul></li><li><RouterLink to="#l-heritage">L&#39;héritage</RouterLink></li><li><RouterLink to="#synthese-heritage">Synthèse héritage</RouterLink></li><li><RouterLink to="#les-methodes-static">Les méthodes static</RouterLink></li><li><RouterLink to="#les-namespaces-organisation-des-classes">Les namespaces (organisation des classes)</RouterLink></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<h3 id="la-poo-c-est-3-concepts" tabindex="-1"><a class="header-anchor" href="#la-poo-c-est-3-concepts" aria-hidden="true">#</a> La POO c'est 3 concepts</h3>
<ul>
<li><strong>Concept de modélisation</strong> à travers la notion de classe et d’instanciation de ces classes.</li>
<li><strong>Concept d’action</strong> à travers la notion d’envoi de messages et de méthodes à l’intérieur des objets.</li>
<li><strong>Concept de construction</strong> par réutilisation et amélioration par l’utilisation de la notion d’héritage.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Mais surtout</p>
<p>Ça permet de représenter <strong>informatiquement</strong> quelque chose du monde réel.</p>
</div>
<h3 id="deux-notions" tabindex="-1"><a class="header-anchor" href="#deux-notions" aria-hidden="true">#</a> Deux notions</h3>
<ul>
<li>Les classes</li>
<li>Les objets</li>
</ul>
<h3 id="la-modelisation" tabindex="-1"><a class="header-anchor" href="#la-modelisation" aria-hidden="true">#</a> La modélisation</h3>
<p>Avant de parler des classes ou des objets, je vous propose de regarder le principe de la modélisation</p>
<p><RouterLink to="/cheatsheets/poo-uml/">Voir la version UML / Classe</RouterLink></p>
<h3 id="les-classes" tabindex="-1"><a class="header-anchor" href="#les-classes" aria-hidden="true">#</a> Les classes</h3>
<ul>
<li>Serviront de moule pour créer des objets.</li>
<li>Une classe étant <strong>une définition</strong>, elle nous servira plus tard à créer <strong>des objets</strong>.</li>
</ul>
<h4 id="une-classe-est-composee-de" tabindex="-1"><a class="header-anchor" href="#une-classe-est-composee-de" aria-hidden="true">#</a> Une classe est composée de :</h4>
<ul>
<li>D'attributs (variable d'instance ou propriété).</li>
<li>De méthodes (actions / opération au niveau de la classe).</li>
</ul>
<h4 id="nous-avons-donc-deux-types-membres-dans-la-classe" tabindex="-1"><a class="header-anchor" href="#nous-avons-donc-deux-types-membres-dans-la-classe" aria-hidden="true">#</a> Nous avons donc deux types membres dans la classe</h4>
<ul>
<li>Des <strong>propriétés</strong> (le données de l'objet) <strong>avec une visibilité</strong></li>
<li>Des <strong>méthodes</strong> (les actions possibles : accélérer, freiner, etc.) <strong>avec une visibilité</strong></li>
</ul>
<h4 id="la-visibilite" tabindex="-1"><a class="header-anchor" href="#la-visibilite" aria-hidden="true">#</a> La visibilité ?</h4>
<ul>
<li>Privée : accessible que dans l'objet.</li>
<li>Public : accessible hors de l'objet.</li>
<li>Protected : <strong>Accessible</strong> aux enfants (héritage) mais pas hors de la classe.</li>
</ul>
<h4 id="les-methodes" tabindex="-1"><a class="header-anchor" href="#les-methodes" aria-hidden="true">#</a> Les méthodes</h4>
<ul>
<li>Comme une fonction, mais <strong>encapsulé</strong> dans la classe.</li>
<li>Possède une visibilité.</li>
<li>Possède des paramètres.</li>
<li>Surcharge: plusieurs <strong>méthodes</strong> peuvent avoir le même nom et des paramètres différents (type et/ou ordre).</li>
</ul>
<h4 id="les-types-de-methodes" tabindex="-1"><a class="header-anchor" href="#les-types-de-methodes" aria-hidden="true">#</a> Les types de méthodes</h4>
<ul>
<li>Le constructeur.</li>
<li>Les méthodes d'actions.</li>
<li>Les méthodes accesseurs / mutateurs.</li>
</ul>
<h3 id="exemple" tabindex="-1"><a class="header-anchor" href="#exemple" aria-hidden="true">#</a> Exemple</h3>
<p><img src="@source/cheatsheets/poo/res/modelisation-personne.png" alt="Exemple modélisation"></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Personne</span>
<span class="token punctuation">{</span>

    <span class="token comment">// Attribut</span>
    <span class="token keyword">public</span> <span class="token variable">$nom</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token variable">$prenom</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token variable">$dateNaissance</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token variable">$salaire</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token variable">$nbEnfant</span><span class="token punctuation">;</span>


    <span class="token comment">// Constructeur</span>
    <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token variable">$nom</span><span class="token punctuation">,</span> <span class="token variable">$prenom</span><span class="token punctuation">,</span> <span class="token variable">$dateNaissance</span><span class="token punctuation">,</span> <span class="token variable">$nbEnfant</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">nom</span> <span class="token operator">=</span> <span class="token variable">$nom</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">prenom</span> <span class="token operator">=</span> <span class="token variable">$prenom</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">dateNaissance</span> <span class="token operator">=</span> <span class="token variable">$dateNaissance</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">nbEnfant</span> <span class="token operator">=</span> <span class="token variable">$nbEnfant</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Mutateurs</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">setSalaire</span><span class="token punctuation">(</span><span class="token variable">$valeur</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">salaire</span> <span class="token operator">=</span> <span class="token variable">$valeur</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Accesseur</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">getSalaire</span><span class="token punctuation">(</span><span class="token variable">$valeur</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">salaire</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">// Méthode</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">identite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">nom</span> <span class="token operator">.</span> <span class="token string double-quoted-string">" "</span> <span class="token operator">.</span> <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">prenom</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Méthode</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">age</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Implémentation</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Méthode</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">argentPoche</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Implémentation</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Ce qu'il faut retenir</p>
<ul>
<li>Les classes sont instanciables (création d'objets, <code>$unPersonne = new Personne(…)</code>).</li>
<li>Les propriétés sont les « variables » de l'objet.</li>
<li>Les méthodes sont les « actions » de l'objet.</li>
<li>Les méthodes <strong>et</strong> les propriétés <em><strong>ont des visiblités</strong></em>.</li>
<li>Les méthodes peuvent être surchargées.</li>
</ul>
</div>
<h2 id="les-objets" tabindex="-1"><a class="header-anchor" href="#les-objets" aria-hidden="true">#</a> Les objets</h2>
<p>Chaque objet représente un objet du monde réel</p>
<h3 id="exemple-1" tabindex="-1"><a class="header-anchor" href="#exemple-1" aria-hidden="true">#</a> exemple :</h3>
<ul>
<li>une personne <strong>précise</strong></li>
<li>une voiture <strong>spécifique</strong></li>
<li>Un élément de menu.</li>
</ul>
<p>⚠️ Utilise les classes précédemment définies ⚠️</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$personne1</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Valentin"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"Brosseau"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"28/02/1987"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$personne2</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"John"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"Doe"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"01/01/1970"</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>👀 Créer un objet == Instancier 👀</p>
<hr>
<h2 id="definir-une-classe" tabindex="-1"><a class="header-anchor" href="#definir-une-classe" aria-hidden="true">#</a> Définir une classe</h2>
<p>En PHP:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Personne</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>En Java:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Personne</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="instanciation-creer-un-objet" tabindex="-1"><a class="header-anchor" href="#instanciation-creer-un-objet" aria-hidden="true">#</a> Instanciation (Créer un objet)</h2>
<p>En PHP:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$unePersonne</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Valentin"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"Brosseau"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>En Java:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Personne</span> unPersonne <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string">"Valentin"</span><span class="token punctuation">,</span> <span class="token string">"Brosseau"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="le-constructeur" tabindex="-1"><a class="header-anchor" href="#le-constructeur" aria-hidden="true">#</a> Le constructeur</h2>
<p>En PHP:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Personne</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token variable">$nom</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token variable">$prenom</span><span class="token punctuation">;</span>

    <span class="token comment">// Constructeur</span>
    <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token variable">$nom</span><span class="token punctuation">,</span> <span class="token variable">$prenom</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">nom</span> <span class="token operator">=</span> <span class="token variable">$nom</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">prenom</span> <span class="token operator">=</span> <span class="token variable">$prenom</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>En Java:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Personne</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> nom<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> prenom<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token class-name">String</span> nom<span class="token punctuation">,</span> <span class="token class-name">String</span> prenom<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>nom <span class="token operator">=</span> nom<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>prenom <span class="token operator">=</span> prenom<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="acces-a-une-methode" tabindex="-1"><a class="header-anchor" href="#acces-a-une-methode" aria-hidden="true">#</a> Accès à une méthode</h2>
<p>En PHP:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$unePersonne</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Valentin"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"Brosseau"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$unPersonne</span><span class="token operator">-></span><span class="token function">afficheIdentite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>En Java :</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Personne</span> unPersonne <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string">"Valentin"</span><span class="token punctuation">,</span> <span class="token string">"Brosseau"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
unePersonne<span class="token punctuation">.</span><span class="token function">afficheIdentite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="acces-a-une-propriete" tabindex="-1"><a class="header-anchor" href="#acces-a-une-propriete" aria-hidden="true">#</a> Accès à une propriété</h2>
<p>En PHP:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$unePersonne</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Valentin"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"Brosseau"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$unPersonne</span><span class="token operator">-></span><span class="token function">afficheIdentite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>En Java :</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Personne</span> unPersonne <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string">"Valentin"</span><span class="token punctuation">,</span> <span class="token string">"Brosseau"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
unePersonne<span class="token punctuation">.</span><span class="token function">afficheIdentite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Attention</p>
<p>L'accès au propriété ne fonctionnera que si la visibilité (<code>private</code>, <code>public</code>, <code>protected</code>) ne vous y autorise :</p>
<table>
<thead>
<tr>
<th style="text-align:right">Visibilité</th>
<th style="text-align:right">Accès depuis</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right"><code>private</code></td>
<td style="text-align:right">Seulement depuis l'objet en lui même</td>
</tr>
<tr>
<td style="text-align:right"><code>public</code></td>
<td style="text-align:right">Depuis n'import où (objet, depuis l'objet, ou depuis l'héritage)</td>
</tr>
<tr>
<td style="text-align:right"><code>protected</code></td>
<td style="text-align:right">Comme <code>private</code> <strong>mais non accessible depuis la classe fille en cas d'héritage</strong></td>
</tr>
</tbody>
</table>
</div>
<h2 id="les-collections" tabindex="-1"><a class="header-anchor" href="#les-collections" aria-hidden="true">#</a> Les collections</h2>
<p><img src="@source/cheatsheets/poo/res/collections_1.png" alt="Représentation UML"></p>
<div class="custom-container tip"><p class="custom-container-title">Le losange vide</p>
<p><img src="@source/cheatsheets/poo/res/UML_Rel_aggregation.jpg" alt="Aggregation"></p>
<p>Ce symbole signifie la notion d'appartenance.</p>
</div>
<p>Permet de regrouper des listes d'objets.</p>
<p><img src="@source/cheatsheets/poo/res/collections_2.png" alt="Représentation UML"></p>
<p>En modélisation, la fleche signife un lien entre les deux classes. En l'occurence, dans le cas des collections nous aurons :</p>
<ul>
<li>Le nom « de la collection » qui va contenir les objets.</li>
<li>Le nombre minimum &amp; maximum.</li>
<li>Exemple, <strong>1</strong> étudiant possède plusieurs devoir.</li>
</ul>
<p>Fonctionnellement, nous allons donc avoir dans l'étudiant collection d'objet du type devoirs. Celle-ci sera nommée <strong>lesDevoirs</strong>. <strong>lesDevoirs</strong> sera une propriété de la classe Étudiant.</p>
<h3 id="declaration" tabindex="-1"><a class="header-anchor" href="#declaration" aria-hidden="true">#</a> Déclaration</h3>
<p>En PHP:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$lesPersonnes</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>En Java :</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Personne</span><span class="token punctuation">></span></span> lesPersonnes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="utilisation" tabindex="-1"><a class="header-anchor" href="#utilisation" aria-hidden="true">#</a> Utilisation</h3>
<p>En PHP:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$lesPersonnes</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$unePersonne</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Doe"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"John"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">array_push</span><span class="token punctuation">(</span><span class="token variable">$lesPersonnes</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Brosseau"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"Valentin"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">array_push</span><span class="token punctuation">(</span><span class="token variable">$lesPersonnes</span><span class="token punctuation">,</span> <span class="token variable">$unePersonne</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$nombre</span> <span class="token operator">=</span> <span class="token function">sizeof</span><span class="token punctuation">(</span><span class="token variable">$lesPersonnes</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>

<span class="token variable">$unePersonne1</span> <span class="token operator">=</span> <span class="token variable">$lesPersonnes</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// Valentin Brosseau</span>
<span class="token variable">$unePersonne2</span> <span class="token operator">=</span> <span class="token variable">$lesPersonnes</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// John Doe</span>

<span class="token variable">$lesPersonnes</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$nombre</span> <span class="token operator">=</span> <span class="token function">sizeof</span><span class="token punctuation">(</span><span class="token variable">$lesPersonnes</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>En Java :</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Personne</span><span class="token punctuation">></span></span> lesPersonnes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Personne</span> carine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string">"John"</span><span class="token punctuation">,</span> <span class="token string">"Doe"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

lesPersonnes<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Personne</span><span class="token punctuation">(</span><span class="token string">"Valentin"</span><span class="token punctuation">,</span> <span class="token string">"Brosseau"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lesPersonnes<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>carine<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> count <span class="token operator">=</span> lesPersonnes<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>

<span class="token class-name">Personne</span> laPersonne1 <span class="token operator">=</span> lesPersonnes<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Valentin;</span>
<span class="token class-name">Personne</span> laPersonne2 <span class="token operator">=</span> lesPersonnes<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Carine;</span>

lesPersonnes<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> count2 <span class="token operator">=</span> lesPersonnes<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="parcours-de-collection" tabindex="-1"><a class="header-anchor" href="#parcours-de-collection" aria-hidden="true">#</a> Parcours de collection</h3>
<p>En PHP :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token variable">$lesPersonne</span> <span class="token keyword">as</span> <span class="token variable">$laPersonne</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// $laPersonne contient « un pointeur » vers une des personne de la liste</span>
    <span class="token comment">// À chaque tour de boucle nous avons la personne suivante.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>En Java :</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// Version moderne</span>
lesPersonnes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>laPersonne <span class="token operator">-></span> <span class="token punctuation">{</span>
    <span class="token comment">// laPersonne contient « un pointeur » vers une des personne de la liste</span>
    <span class="token comment">// À chaque tour de boucle nous avons la personne suivante.</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Version « à l'ancienne »</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Personne</span> laPersonne <span class="token operator">:</span> lesPersonnes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// laPersonne contient « un pointeur » vers une des personne de la liste</span>
    <span class="token comment">// À chaque tour de boucle nous avons la personne suivante.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="l-heritage" tabindex="-1"><a class="header-anchor" href="#l-heritage" aria-hidden="true">#</a> L'héritage</h2>
<p>L'héritage permet de généraliser le fonctionnement d'un objet. L'idée est de mettre dans un « objet parent » la logique de plusieurs objets qui fonctionne de la même façon. <strong>Exemple</strong></p>
<ul>
<li>Un <strong>humain</strong> et une baleine partage des propriété et fonctionnement commun. Nous allons donc créer une super classe <strong>mammifère</strong> celle-ci contiendra les méthodes et les propriétés commune.</li>
<li>Une <strong>Voiture</strong> et une <strong>Moto</strong> sont des véhicule. Nous pouvons donc créer une super classe « <strong>Véhicule</strong> ».</li>
<li>…</li>
</ul>
<p>En PHP:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Mammifere</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token variable">$vertebre</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Je suis un mammifère"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">manger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Je mange"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Humain</span> <span class="token keyword">extends</span> <span class="token class-name">mammifere</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token variable">$prenom</span> <span class="token operator">=</span> <span class="token string double-quoted-string">""</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token variable">$prenom</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword static-context">parent</span><span class="token operator">::</span><span class="token function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        this<span class="token operator">-></span><span class="token variable">$prenom</span> <span class="token operator">=</span> <span class="token variable">$prenom</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">manger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Je suis omnivore"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token variable">$unHumain</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Humain</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Valentin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$unHumain</span><span class="token operator">-></span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Je suis un mammifère.</span>
<span class="token variable">$unHumain</span><span class="token operator">-></span><span class="token function">manger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Je suis omnivore</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>En Java :</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Mammifere</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> vertebre <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Je suis un mammifère"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Redéfinition de méthode</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">manger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Je mange"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Humain</span> <span class="token keyword">extends</span> mammifere <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> prenom <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>

    function <span class="token class-name">Hunain</span><span class="token punctuation">(</span><span class="token class-name">String</span> prenom<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>prenom <span class="token operator">=</span> prenom<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Redéfinition de méthode</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">manger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Je suis omnivore"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name">Humain</span> unHumain <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Humain</span><span class="token punctuation">(</span><span class="token string">"Valentin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
unHumain<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Je suis un mammifère.</span>
unHumain<span class="token punctuation">.</span><span class="token function">manger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Je suis omnivore.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h2 id="synthese-heritage" tabindex="-1"><a class="header-anchor" href="#synthese-heritage" aria-hidden="true">#</a> Synthèse héritage</h2>
<ul>
<li>La classe mère contient la logique <strong>partagée</strong>.</li>
<li>La classe fille contient la logique <strong>spécifique</strong>.</li>
<li>Un mot-clé Extends <code>class Humain extends Mammifere</code>.</li>
<li><strong>Vous devez</strong> construire le parent dans le constructeur de l'enfant.</li>
<li><strong>Permets de généraliser un objet afin de partager des propriétés communes.</strong>.</li>
<li><strong>mais</strong> il est également possible de spécialiser / redéfinir un objet.
<ul>
<li>Redéfinition, comme la surcharge, mais entre la classe fille et la classe mère.</li>
</ul>
</li>
</ul>
<h2 id="les-methodes-static" tabindex="-1"><a class="header-anchor" href="#les-methodes-static" aria-hidden="true">#</a> Les méthodes static</h2>
<p>En PHP:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Déclaration</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">Personne</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">laReponseDeLunivers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Utilisation</span>
<span class="token class-name static-context">Personne</span><span class="token operator">::</span><span class="token function">laReponseDeLunivers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>En Java :</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// Déclaration</span>
<span class="token keyword">class</span> <span class="token class-name">Personne</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">laReponseDeLunivers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Utilisation</span>
<span class="token class-name">Personne</span><span class="token punctuation">.</span><span class="token function">laReponseDeLunivers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="les-namespaces-organisation-des-classes" tabindex="-1"><a class="header-anchor" href="#les-namespaces-organisation-des-classes" aria-hidden="true">#</a> Les namespaces (organisation des classes)</h2>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">namespace</span> <span class="token package">Mammifere<span class="token punctuation">\</span>Primate</span> <span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">Personne</span> <span class="token punctuation">{</span> <span class="token comment">// etc...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>
