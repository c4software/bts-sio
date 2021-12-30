<template><h1 id="utiliser-des-includes-et-une-librairie" tabindex="-1"><a class="header-anchor" href="#utiliser-des-includes-et-une-librairie" aria-hidden="true">#</a> Utiliser des includes et une librairie</h1>
<p>Nous avons vu dans le cours qu'il était possible grace à la fonction PHP <code>include</code> d'inclure une page dans une autre. Cette fonction nous permet également d'utiliser des librairies en les incluant dans les différentes pages ou ça est nécessaire.</p>
<h2 id="creation-d-un-nouveau-projet" tabindex="-1"><a class="header-anchor" href="#creation-d-un-nouveau-projet" aria-hidden="true">#</a> Création d'un nouveau projet</h2>
<p>Je vous laisse créer un nouveau projet. Ce projet sera constitué pour l'instant de :</p>
<ul>
<li>Une page (nommée <code>index.php</code>).</li>
<li>La librairie Bootstrap. <a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/" target="_blank" rel="noopener noreferrer">Disponible ici<ExternalLinkIcon/></a></li>
<li>Un header avec dedans une <a href="https://getbootstrap.com/docs/5.0/components/navbar/" target="_blank" rel="noopener noreferrer">NavBar<ExternalLinkIcon/></a>.</li>
<li>Un Footer (avec l'année actuelle <code>&lt;?php echo date('Y'); ?&gt;</code>)</li>
</ul>
<h2 id="utiliser-les-includes-pour-l-organisation" tabindex="-1"><a class="header-anchor" href="#utiliser-les-includes-pour-l-organisation" aria-hidden="true">#</a> Utiliser les includes pour l'organisation</h2>
<p>En reprenant <RouterLink to="/tp/php/support.html#le-code">les propositions faites dans le cours</RouterLink> réorganisez votre code pour le séparer dans différents fichiers.</p>
<h2 id="la-librairie" tabindex="-1"><a class="header-anchor" href="#la-librairie" aria-hidden="true">#</a> La librairie</h2>
<p>J'ai travaillé pour vous ! Je vous propose une super librairie. Celle-ci intègre quelques fonctions (utile ou non) que nous allons pouvoir utiliser dans notre page.</p>
<p>La librairie est <a href="/demo/php/library/sample.php">disponible à l'adresse suivante</a></p>
<p>Je vous laisse télécharger la librairie et la mettre dans votre projet.</p>
<div class="custom-container tip"><p class="custom-container-title">N'oubliez pas le rangement</p>
<p>Essayer de vous organiser <em>correctement</em>, je vous propose de mettre le fichier dans un dossier par exemple <code>lib</code>.</p>
</div>
<h2 id="utiliser-la-librairie" tabindex="-1"><a class="header-anchor" href="#utiliser-la-librairie" aria-hidden="true">#</a> Utiliser la librairie</h2>
<p>Pour utiliser la librairie <strong>il suffit</strong> de l'inclure dans la page. Nous avons dans ce projet qu'une seule page, il faut donc écrire <em>en haut</em> de votre fichier <code>index.php</code> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'lib/sample.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>À partir de cette instance, nous avons accès maintenant à l'ensemble des fonctions présent dans le fichier. Mais quelles sont ces fonctions ?</p>
<p>Pour connaitre les fonctions, il n'y a pas de miracle. Il faut lire la documentation ! Celle-ci est <a target="_blank" href="/demo/php/library/phpdoc/build/index.html">disponible ici</a></p>
<details class="custom-container details"><summary>Voilà la liste des fonctions disponible</summary>
<ul>
<li>isChristmas</li>
<li>daysBeforeChristmas</li>
<li>isDecember</li>
<li>getOrDefault</li>
<li>postOrDefault</li>
<li>formatIdentity</li>
<li>mailCountFormat</li>
</ul>
<p><a target="_blank" href="/demo/php/library/phpdoc/build/index.html">Voir la documentation complete</a></p>
</details>
<h2 id="utiliser-les-fonctions" tabindex="-1"><a class="header-anchor" href="#utiliser-les-fonctions" aria-hidden="true">#</a> Utiliser les fonctions</h2>
<p>Afin de tester les différentes fonctionnalités, je vous propose de réaliser les éléments suivants :</p>
<ul>
<li>À gauche de la dans la Toolbar, afficher votre identité (fonction <code>formatIdentity</code>).</li>
<li>À droite de la Toolbar, afficher un nombre d'emails (fonction <code>mailCountFormat</code>).</li>
<li>Dans votre page, afficher dans une card le nombre de jours avant Noël (fonction <code>daysBeforeChristmas</code>).</li>
<li>Le décompte du nombre de jours ne doit <strong>pas être visible</strong> si nous sommes le jour de Noël</li>
<li>Votre page doit afficher un fond « sapin de Noël » si nous sommes au mois de décembre.</li>
<li>Votre page doit afficher un fond « père Noël » si nous sommes le jour de Noël.</li>
<li>Au <strong>milieu de votre page</strong> afficher une <code>,card</code>, le contenu de cette, <code>card</code> doit-être :
<ul>
<li><code>Hello $prenom</code>, la valeur <code>$prenom</code> <strong>doit venir</strong> d'un paramètre <code>GET</code>.</li>
<li>Si aucune valeur n'est présente dans le paramètre <code>GET</code> vous devez afficher <code>world</code> (fonction <code>getOrDefault</code>)</li>
<li>Le lien d'accès sera donc <code>index.php?prenom=Valentin</code></li>
</ul>
</li>
</ul>
<p>Voilà à quoi ça va ressembler :</p>
<p><img src="@source/tp/php/res/lib_screen1.png" alt="Sans le paramètre">
<img src="@source/tp/php/res/lib_screen2.png" alt="Avec le paramètre"></p>
</template>
