<template><h1 id="jouer-avec-les-formulaires" tabindex="-1"><a class="header-anchor" href="#jouer-avec-les-formulaires" aria-hidden="true">#</a> Jouer avec les formulaires</h1>
<p>Faire des sites « statiques » c'est bien… Mais c'est mieux si nous pouvions échanger un peu avec notre utilisateur. La première étape de l'échange va passer par la construction de formulaire pour récolter des informations utilisateurs.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans le TP <RouterLink to="/tp/php/tp1.1.html">précédent</RouterLink> nous avons vu comment créer une page dynamique avec la punition de Bart… Mais la page était cependant très statique, à chaque chargement les valeurs sont identiques. Dans ce TP nous allons dynamiser tout ça :</p>
<ul>
<li>Plusieurs pages</li>
<li>Nombre de lignes dynamiques.</li>
<li>Phrase personnalisable.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">N'oubliez pas</p>
<p>Nous avons précédemment complété le projet avec une fonction et un include. Nous repartirons donc de cette version.</p>
</div>
<h2 id="structuration-du-projet" tabindex="-1"><a class="header-anchor" href="#structuration-du-projet" aria-hidden="true">#</a> Structuration du projet</h2>
<p>Nous allons retoucher votre site pour ajouter quelques éléments « de navigation », nous allons donc :</p>
<ul>
<li>Créer une page d'accueil (<code>index.php</code>).</li>
<li>Créer une « toolbar » permettant de revenir à l'accueil.</li>
<li>Créer une page de résultat (<code>bart.php</code>) qui affichera le tableau avec les choix de l'utilisateur.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Nous allons bien évidemment structurer nos dossiers et notre architecture comme vue précédemment. C'est-à-dire en utilisant autant qu'il semble nécessaire la mécanique d'<code>include</code> (<code>common/functions.php</code>, <code>common/header.php</code> etc…)</p>
</div>
<h2 id="la-structure" tabindex="-1"><a class="header-anchor" href="#la-structure" aria-hidden="true">#</a> La structure</h2>
<p>Le projet final va ressembler à :</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3OydDaemW-0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<h2 id="la-page-avec-le-formulaire-index-php" tabindex="-1"><a class="header-anchor" href="#la-page-avec-le-formulaire-index-php" aria-hidden="true">#</a> La page avec le formulaire (index.php)</h2>
<p>La page <code>index.php</code> va afficher le formulaire, celui-ci permettra à l'utilisateur de choisir :</p>
<ul>
<li>La taille de la punition.</li>
<li>La phase à écrire sur le tableau</li>
</ul>
<p>Voilà à quoi celle-ci doit ressembler :</p>
<p><img src="@source/tp/php/res/bart_form_step1.png" alt="Étape 1"></p>
<h3 id="le-formulaire" tabindex="-1"><a class="header-anchor" href="#le-formulaire" aria-hidden="true">#</a> Le formulaire</h3>
<p>Cette page va contenir le formulaire, comme vu ensemble dans le cours de formulaire nous permettra de recueillir le choix de l'utilisateur. Une fois ce choix soumis au serveur via l'action votre page de traitement <code>bart.php</code> affichera le résultat de la demande.</p>
<p>Pour rappel le minimum nécessaire pour faire votre formulaire est :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bart.php<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Punir !<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">Un instant</p>
<p>N'oubliez pas de regarder ma proposition de design. Le choix du nombre de phrase n'est pas libre, il s'agit d'un <code>select</code> HTML.</p>
</div>
<h2 id="la-page-«-resultat-»-bart-php" tabindex="-1"><a class="header-anchor" href="#la-page-«-resultat-»-bart-php" aria-hidden="true">#</a> La page « résultat » (bart.php)</h2>
<p>La page <code>bart.php</code> va contenir la logique d'affichage de votre projet, elle va se charger, voilà comment nous allons procéder :</p>
<ul>
<li>Prendre les valeurs en provenance du <code>$_POST</code>.</li>
<li>Afficher les valeurs reçues sur le tableau de Bart (de manière identique à précédemment).</li>
<li>Permettre à l'utilisateur de revenir sur la page d'accueil via la <code>toolbar</code>.</li>
</ul>
<p><img src="@source/tp/php/res/bart_form_step2.png" alt="Étape 2"></p>
<h3 id="affichage" tabindex="-1"><a class="header-anchor" href="#affichage" aria-hidden="true">#</a> Affichage</h3>
<p>Pour l'affichage nous allons utiliser les valeurs en provenance de votre formulaire, celles-ci seront reçues dans la variable super-globales <code>$_POST</code>.</p>
<p>Cette variable est un tableau, nous y accédons donc via <code>un clé</code>, exemple :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment"># La valeur du champ suivant (nommé phrase):</span>
<span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string double-quoted-string">"text"</span> name<span class="token operator">=</span><span class="token string double-quoted-string">"phrase"</span><span class="token operator">></span>

<span class="token comment"># Sera accessible dans :</span>
<span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"phrase"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment"># Et pourra être affiché avec :</span>
<span class="token keyword">echo</span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"phrase"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Astuce rapide</p>
<p>Vous ne savez pas ce que contient <code>$_POST</code> ?</p>
<p>Vous pouvez facilement afficher <strong>temporairement</strong> son contenu avec la ligne de code suivante:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">echo</span> <span class="token string double-quoted-string">"&lt;pre>"</span> <span class="token operator">.</span> <span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">)</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"&lt;/pre>"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<p>En vous inspirant du code précédent et du code que vous avez déjà fait. Écrire le code permettant d'afficher la phrase choisi par l'utilisateur autant de fois que celui-ci le souhaite.</p>
<h3 id="valeur-par-defaut" tabindex="-1"><a class="header-anchor" href="#valeur-par-defaut" aria-hidden="true">#</a> Valeur par défaut</h3>
<p>Votre page est maintenant fonctionnelle. BRAVO ! Cependant… Si vous accédez directement à la page <code>bart.php</code> (sans passer par le formulaire), celle-ci n'affiche rien… C'est dommage !</p>
<p>Je vous propose de modifier ça avec des conditions (<code>if</code>). Voilà un exemple de condition :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$phrase</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"Je ne copie pas le code de valentin"</span><span class="token punctuation">;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'phrase'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token variable">$phrase</span> <span class="token operator">=</span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'phrase'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">echo</span> <span class="token variable">$phrase</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">un doute sur quelque chose ?</p>
<p><code>isset</code> nous ne l'avons jamais vu celui-ci ? Pas grave <a href="https://www.php.net/manual/en/function.isset.php" target="_blank" rel="noopener noreferrer">pour plus d'information le bon réflexe la documentation<ExternalLinkIcon/></a></p>
</div>
<p>Avec cet exemple de code et les informations que nous avons vus ensemble. Je pense que vous serez capable d'écrire seule le code permettant d'afficher la page <code>bart.php</code> même sans les données du formulaire.</p>
<h3 id="allons-plus-loin" tabindex="-1"><a class="header-anchor" href="#allons-plus-loin" aria-hidden="true">#</a> Allons plus loin</h3>
<p>Vous n'aimez pas Bart ? Je vous propose d'ajouter la sélection du type de personnage sur le formulaire :</p>
<ul>
<li>Ajouter un <code>select</code> avec dedans (bart, leela, lisa, ou autre…).</li>
<li>Trouver les images pour l'affichage.</li>
<li>Utiliser la valeur obtenue dans le <code>$_POST</code> pour afficher la bonne personne.</li>
</ul>
<p>✋ Je ne vous donne pas plus d'information! Avec ce que nous avons vu ensemble vous pouvez y arriver seule.</p>
</template>
