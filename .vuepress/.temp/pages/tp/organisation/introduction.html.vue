<template><h1 id="re-organiser-mon-code" tabindex="-1"><a class="header-anchor" href="#re-organiser-mon-code" aria-hidden="true">#</a> (Ré)organiser mon code</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce TP, nous allons voir comment « réorganiser » du code pour le rendre plus facilement maintenable.</p>
<div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<p>Le code original fourni est clairement de mauvaise qualité. Il ne doit pas être pris comme référence.</p>
</div>
<h2 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> Code</h2>
<p>Le code est <a href="./shitty-app.zip">disponible ici</a>. Les premières étapes sont :</p>
<ul>
<li>Installer Wamp (si pas déjà fait).</li>
<li>Télécharger et « installer » les sources dans votre WAMP.</li>
<li>Prendre en main l'application (naviguer dans les écrans).</li>
<li>Regarder le code source.</li>
</ul>
<p>L'application doit ressembler à :</p>
<p><img src="@source/tp/organisation/img/capture.png" alt="preview"></p>
<h2 id="premiere-analyse-du-code" tabindex="-1"><a class="header-anchor" href="#premiere-analyse-du-code" aria-hidden="true">#</a> Première analyse du code</h2>
<p>Maintenant que vous avez pris en main le code source, quelles sont les remarques sur le code pouvez-vous émettre :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Vos remarques


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>PS Cette première analyse est importante !</p>
<Reveal text="Cliquer pour voir ma « solution »">
<ul>
<li>Non-utilisation de template.</li>
<li>Le code des listes est répété (sans utilisation de fonction).</li>
<li>Le Header et le Footer HTML sont dupliqués entre les deux pages.</li>
<li>Le « Widget » HTML des listes est répété 3x.</li>
<li>L'accès à la donnée n'est pas centralisé. (les fichiers JSON sont ouverts directement depuis la page.)</li>
<li>Il n'y a pas de DAO.</li>
<li>Il n'y a aucun modèle de données.</li>
<li>Pas de configuration centralisée.</li>
</ul>
</Reveal>
<h2 id="detail-des-fonctionnalites" tabindex="-1"><a class="header-anchor" href="#detail-des-fonctionnalites" aria-hidden="true">#</a> Détail des fonctionnalités</h2>
<p>Avant de commencer à modifier le code, il faut « lister / détailler » les différentes fonctionnalités de l'application. Pour moi, voilà les points clés.</p>
<ul>
<li>Deux pages. (une complète, l'autre de détail.)</li>
<li>Utilisation de bootstrap.</li>
<li>Les données sont stockées dans des fichiers JSON.</li>
<li>L'interface est responsive.</li>
<li>Il est possible d'ajouter des éléments via l'interface web.</li>
</ul>
<h2 id="debut-des-modifications" tabindex="-1"><a class="header-anchor" href="#debut-des-modifications" aria-hidden="true">#</a> Début des modifications</h2>
<p>Comme vous l'avez constaté, l'application comporte de nombreux défauts (plus ou moins important). Nous allons les prendre dans l'ordre :</p>
<ul>
<li>Le découpage (pour éviter la duplication du code HTML).</li>
<li>Réécrire la page d'accueil pour ne plus avoir 3x le même code à la suite.</li>
<li>Créer un modèle qui représente un « lien ».</li>
<li>Créer un DAO pour l'accès à la donnée (lecture, ajout).</li>
<li>Créer un fichier PHP « avec les paramètres/constantes » de l'application.</li>
</ul>
<h2 id="le-decoupage-du-code-html" tabindex="-1"><a class="header-anchor" href="#le-decoupage-du-code-html" aria-hidden="true">#</a> Le découpage du code HTML</h2>
<h3 id="header-footer" tabindex="-1"><a class="header-anchor" href="#header-footer" aria-hidden="true">#</a> Header &amp; Footer</h3>
<p>La première étape est de découper le HTML pour éviter la duplication de code HTML.</p>
<ul>
<li>Sortir le Header dans une fonction avec paramètre pour le titre.</li>
<li>Sortir le Footer dans une fonction.</li>
</ul>
<p>Pour l'organisation, je vous propose d'écrire un fichier PHP <code>index.php</code>. Bien évidemment, nous n'allons pas le mettre à la racine. Mais dans un dossier nommé (par exemple) <code>fonctions</code>.</p>
<p>C'est à vous :</p>
<ul>
<li>Créer le dossier.</li>
<li>Créer un fichier <code>index.php</code> à l'intérieur de celui-ci.</li>
</ul>
<p>Votre arborescence doit maintenant ressembler à :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── data
│   ├── reddit.json
│   ├── search.json
│   └── twitter.json
├── detail.php
├── fonctions
│   └── index.php
├── index.php
└── public
    └── main.css
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Pour vous aider dans votre mission voilà la structure du fichier :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">function</span> <span class="token function-definition function">head</span><span class="token punctuation">(</span><span class="token variable">$titre</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"…"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function-definition function">foot</span><span class="token punctuation">(</span><span class="token variable">$titre</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"…"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>C'est à vous, dans la page <code>index.php</code> actuelle isolez le code relatif au <code>header</code> et au <code>footer</code> et mettez-le dans les bonnes fonctions.</p>
<p>Utilisez maintenant les fonctions dans votre code.</p>
<blockquote>
<p>Rappel : en PHP vous devez <code>include</code> les fichiers pour rendre le code accessible dans la page. Exemple :</p>
</blockquote>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"fonctions/index.php"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">head</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="tester" tabindex="-1"><a class="header-anchor" href="#tester" aria-hidden="true">#</a> Tester</h3>
<p>Valider le bon fonctionnement de votre modification avant d'aller plus loin.</p>
<h3 id="reflechissons-ensemble" tabindex="-1"><a class="header-anchor" href="#reflechissons-ensemble" aria-hidden="true">#</a> Réfléchissons ensemble</h3>
<p>C'est bien, mais est-il possible de faire autrement ? Pouvons-nous utiliser un objet plutôt que deux fonctions ?</p>
<ul>
<li>Est-ce intéressant ?</li>
<li>Quel est l'avantage ?</li>
</ul>
<h3 id="reecriture-des-listes-de-lien" tabindex="-1"><a class="header-anchor" href="#reecriture-des-listes-de-lien" aria-hidden="true">#</a> Réécriture des listes de lien</h3>
<p>Comme vous l'avez constaté, les listes de lien (ainsi que le code PHP) sont répétés 3x. Procéder ainsi est à la fois inefficace et inutile. Prendre du temps pour éviter ce genre de choses est primordial et vous évitera bien des tracas en cas de mise à jour de votre code (ou de celui d'un collègue).</p>
<p>Pour rappel, les listes de liens ressemblent à :</p>
<p><img src="@source/tp/organisation/img/liste_lien.png" alt="lien"></p>
<p>Regardons ensemble le code source de cet élément :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card mb-4 shadow-sm<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nolink<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>detail.php?c=search<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>my-0 font-weight-normal<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Recherche <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>material-icons<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>edit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list-unstyled mt-3 mb-4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token prolog">&lt;?php
        $data = json_decode(file_get_contents("./data/search.json"));
        foreach($data as $d){
            echo "&lt;li>&lt;a rel='nofollow' target='_blank' href='" . $d->lien . "'>" . $d->name . "&lt;/a>&lt;/li>";
        }
        ?></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ul>
<li>Quels éléments sont variables ?</li>
<li>Comment reformater le code pour le transformer en fonction ?</li>
</ul>
<h3 id="place-au-code" tabindex="-1"><a class="header-anchor" href="#place-au-code" aria-hidden="true">#</a> Place au code</h3>
<p>Cette fois-ci pas ou peu d'explication… Dans <code>fonctions/index.php</code> ajouter une fonction nommée <code>genereListe</code>. Pour la suite, je vous laisse chercher.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">function</span> <span class="token function-definition function">genereListe</span><span class="token punctuation">(</span><span class="token variable">$title</span><span class="token punctuation">,</span> <span class="token variable">$file</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// Votre code ici.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Remplacer le code dupliqué, par l'appel à votre fonction.</p>
<h3 id="tester-1" tabindex="-1"><a class="header-anchor" href="#tester-1" aria-hidden="true">#</a> Tester</h3>
<p>Valider le bon fonctionnement de votre modification avant d'aller plus loin.</p>
<h3 id="page-detail-php" tabindex="-1"><a class="header-anchor" href="#page-detail-php" aria-hidden="true">#</a> Page detail.php</h3>
<p>Utilisez vos nouvelles fonctions dans la page <code>detail.php</code>. Cette fois-ci pas d'aide.</p>
<h2 id="l-organisation-du-code-php" tabindex="-1"><a class="header-anchor" href="#l-organisation-du-code-php" aria-hidden="true">#</a> L'organisation du code PHP</h2>
<p>Comme vous devez le constater, nous n'avons pas retiré le code dupliqué… Nous l'avons simplifié, mais pas supprimé.</p>
<p>À votre avis, comment procéder ?</p>
<Reveal text="Cliquer pour voir ma « solution »">
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$elements</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string double-quoted-string">"file"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"search"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"title"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Rechercher"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string double-quoted-string">"file"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"reddit"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"title"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Reddit"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string double-quoted-string">"file"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"twitter"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"title"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Twitter"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token variable">$elements</span> <span class="token keyword">as</span> <span class="token variable">$el</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">genereListe</span><span class="token punctuation">(</span><span class="token variable">$el</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'title'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token variable">$el</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'file'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul>
<li>Quel est l'avantage de ma solution ?</li>
<li>Est-ce meilleur que la vôtre ?</li>
</ul>
</Reveal>
<h2 id="le-modele-de-la-donnee" tabindex="-1"><a class="header-anchor" href="#le-modele-de-la-donnee" aria-hidden="true">#</a> Le modèle de la donnée</h2>
<p>Lors de l'analyse du code, vous avez remarqué qu'il était possible d'ajouter des liens dans les fichiers JSON.</p>
<p>L'ajout est fait « à l'arrache », oui ça fonctionne… Mais ce n'est clairement pas optimal.</p>
<p>Nous allons donc commencer par créer un modèle, le modèle va permettre de « normaliser » notre développement et va simplifier la réutilisation du code.</p>
<p>Par formalisme, nous allons appeler notre dossier <code>modeles</code> avec dedans un fichier <code>lien.php</code>.</p>
<p>C'est à vous créer le dossier et le fichier.</p>
<p>Votre arborescence doit maintenant ressembler à :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── data
│   ├── reddit.json
│   ├── search.json
│   └── twitter.json
├── detail.php
├── fonctions
│   └── index.php
├── index.php
├── modeles
│   └── lien.php
└── public
    └── main.cs
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="la-class-php" tabindex="-1"><a class="header-anchor" href="#la-class-php" aria-hidden="true">#</a> La class PhP</h3>
<p>Pour vous aider, voilà la classe Lien :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">Lien</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token variable">$lien</span> <span class="token operator">=</span> <span class="token string double-quoted-string">""</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token variable">$name</span> <span class="token operator">=</span> <span class="token string double-quoted-string">""</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function-definition function">__construct</span><span class="token punctuation">(</span><span class="token variable">$lien</span><span class="token punctuation">,</span> <span class="token variable">$name</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">lien</span> <span class="token operator">=</span> <span class="token variable">$lien</span><span class="token punctuation">;</span>
        <span class="token variable">$this</span><span class="token operator">-></span><span class="token property">name</span> <span class="token operator">=</span> <span class="token variable">$name</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="utiliser-la-class" tabindex="-1"><a class="header-anchor" href="#utiliser-la-class" aria-hidden="true">#</a> Utiliser la class</h3>
<p>Maintenant que nous avons défini la classe utilisons là !</p>
<p>Dans le fichier <code>detail.php</code> :</p>
<ul>
<li>Trouvez l'endroit où se trouve l'ajout (<code>array_push</code>…)</li>
<li>Remplacez le Tableau par l'utilisation de l'objet.</li>
</ul>
<h3 id="tester-2" tabindex="-1"><a class="header-anchor" href="#tester-2" aria-hidden="true">#</a> Tester</h3>
<p>Valider que le site fonctionne toujours.</p>
<h3 id="faire-evoluer-la-classe" tabindex="-1"><a class="header-anchor" href="#faire-evoluer-la-classe" aria-hidden="true">#</a> Faire évoluer la classe</h3>
<p>Le gros plus d'avoir un modèle, c'est la possibilité d'ajouter des méthodes. Je vous propose d'ajouter une méthode permettant de valider que le lien est bien un lien.</p>
<p>Créer une méthode avec le code suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$url</span> <span class="token operator">=</span> <span class="token function">filter_var</span><span class="token punctuation">(</span><span class="token variable">$this</span><span class="token operator">-></span><span class="token property">link</span><span class="token punctuation">,</span> <span class="token constant">FILTER_SANITIZE_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token function">filter_var</span><span class="token punctuation">(</span><span class="token variable">$url</span><span class="token punctuation">,</span> <span class="token constant">FILTER_VALIDATE_URL</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token constant boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>⏩ Utiliser la méthode dans votre code pour n'ajouter le lien que si celui-ci est valide.</p>
<h3 id="tester-3" tabindex="-1"><a class="header-anchor" href="#tester-3" aria-hidden="true">#</a> Tester</h3>
<p>Valider que le site fonctionne toujours.</p>
<h2 id="le-dao" tabindex="-1"><a class="header-anchor" href="#le-dao" aria-hidden="true">#</a> Le DAO</h2>
<p>Le DAO, est également un élément important. Cette classe va nous centraliser le code pour tout ce qui est l'accès à la donnée (ajout, suppression, liste).</p>
<p>Comme vu en cours, l'une des possibilités pour un DAO est de créer une classe avec des méthodes <code>static</code> (c'est-à-dire accessible sans créer l'objet). C'est cette solution que je vous propose de faire.</p>
<p>Dans le code, nous avons deux actions possibles :</p>
<ul>
<li>Avoir le contenu (liste).</li>
<li>Ajouter du contenu.</li>
</ul>
<h3 id="l-organisation" tabindex="-1"><a class="header-anchor" href="#l-organisation" aria-hidden="true">#</a> L'organisation</h3>
<p>La première étape est de créer les dossiers, par convention, nous allons « ranger » notre <code>DAO</code> dans un dossier nommé dao et dans un fichier qui regroupe les actions similaires (ou qui font référence à la même chose). Dans notre cas :</p>
<ul>
<li>Créer un dossier nommé <code>dao</code></li>
<li>Créer un fichier dedans nommé <code>liens.php</code></li>
</ul>
<p>Votre arborescence doit maintenant ressembler à :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── dao
│   └── liens.php
├── data
│   ├── reddit.json
│   ├── search.json
│   └── twitter.json
├── detail.php
├── fonctions
│   └── index.php
├── index.php
├── modeles
│   └── lien.php
└── public
    └── main.css
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="base-du-code-php" tabindex="-1"><a class="header-anchor" href="#base-du-code-php" aria-hidden="true">#</a> Base du code PHP</h3>
<p>Pour vous aider, voilà la base du code :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">class</span> <span class="token class-name-definition class-name">LienDao</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">get</span><span class="token punctuation">(</span><span class="token variable">$fichier</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Votre code ici</span>
        <span class="token comment">// return [];</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">put</span><span class="token punctuation">(</span><span class="token variable">$fichier</span><span class="token punctuation">,</span> <span class="token variable">$lien</span><span class="token punctuation">,</span> <span class="token variable">$name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Votre code ici</span>
        <span class="token comment">// return ???;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul>
<li>Compléter les méthodes avec le code précédemment réalisé, en ne gardant bien évidemment que le code PHP…</li>
<li>Utiliser le DAO dans votre code PHP (<code>index.php</code> et <code>detail.php</code>)</li>
</ul>
<p>⚠️ Rappel les méthodes <code>static</code> en PHP sont appelées comme ça <code>LienDao::get(&quot;&quot;)</code>.</p>
<h3 id="tester-4" tabindex="-1"><a class="header-anchor" href="#tester-4" aria-hidden="true">#</a> Tester</h3>
<p>Valider que le site fonctionne toujours.</p>
<h2 id="les-parametres" tabindex="-1"><a class="header-anchor" href="#les-parametres" aria-hidden="true">#</a> Les paramètres</h2>
<p>Nous avons maintenant mis en place la structure. Mais comme vous pouvez le constater, nous avons encore à un certain nombre d'endroits « des éléments en dur ».</p>
<p>Par exemple le tableau « $elements », celui-ci contient des valeurs static « twitter », « search », etc. Si vous souhaitez ajouter une nouvelle catégorie, vous allez devoir ajouter un élément dans le tableau (et surtout vous souvenir à quel endroit celui-ci est défini).</p>
<p>De la même façon, le chemin vers les « data » est également écrit en dur dans votre DAO.</p>
<p>Également le nom de votre site est également écrit en dur.</p>
<p>Les 3 points que j'ai évoqués ne gênent évidemment en rien le bon fonctionnement de votre site web. Cependant ça rend votre code très « opaque » au changement. Une bonne habitude est donc de sortir dans « un fichier de paramètre » ce qui vous semble pouvoir varier ou changer un jour.</p>
<h3 id="modification-du-code" tabindex="-1"><a class="header-anchor" href="#modification-du-code" aria-hidden="true">#</a> Modification du code</h3>
<p>Nous allons donc créer un dossier « paramètre » et un fichier « parametres.php »</p>
<ul>
<li>Créer un dossier <code>parametre</code>.</li>
<li>Créer un fichier <code>parametres.php</code>.</li>
</ul>
<p>Votre structure doit maintenant ressembler à quelque chose comme :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── dao
│   └── liens.php
├── data
│   ├── reddit.json
│   ├── search.json
│   └── twitter.json
├── detail.php
├── fonctions
│   └── index.php
├── index.php
├── modeles
│   └── lien.php
├── parametre
│   └── parametres.php
└── public
    └── main.css
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="le-fichier-parametres-php" tabindex="-1"><a class="header-anchor" href="#le-fichier-parametres-php" aria-hidden="true">#</a> Le fichier parametres.php</h3>
<p>Le fichier <code>parametres.php</code> va contenir l'ensemble des éléments susceptibles de changer dans « la vie » de votre application.</p>
<p>C'est ce que l'on va appeler des constantes.</p>
<p>Voici un exemple de contenu :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token variable">$_SITE_TITLE</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"Shitty Application"</span><span class="token punctuation">;</span>
<span class="token variable">$_ELEMENTS</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string double-quoted-string">"file"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"search"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"title"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Rechercher"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string double-quoted-string">"file"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"reddit"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"title"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Reddit"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string double-quoted-string">"file"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"twitter"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"title"</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"Twitter"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$_DATA_PATH</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"../data/"</span><span class="token punctuation">;</span>

</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Placer ce contenu dans le fichier <code>parametres.php</code>.</p>
<h3 id="utiliser-les-«-constantes-»" tabindex="-1"><a class="header-anchor" href="#utiliser-les-«-constantes-»" aria-hidden="true">#</a> Utiliser les « constantes »</h3>
<p>Modifier vos différentes pages PHP pour utiliser les constantes nouvellement définies.</p>
<h2 id="en-plus-ne-pas-autoriser-plusieurs-liens-identiques" tabindex="-1"><a class="header-anchor" href="#en-plus-ne-pas-autoriser-plusieurs-liens-identiques" aria-hidden="true">#</a> En plus : Ne pas autoriser plusieurs liens identiques</h2>
<p>Pour l'instant, il est possible d'insérer plusieurs fois le même lien dans la base de données.</p>
<ul>
<li>Modifier la méthode <code>put</code> du DAO pour qu'elle n'autorise plus ce genre de choses.</li>
</ul>
<h2 id="en-plus-migration-vers-mysql" tabindex="-1"><a class="header-anchor" href="#en-plus-migration-vers-mysql" aria-hidden="true">#</a> En plus : Migration vers MySQL</h2>
<p>Nous allons profiter de la mise en place d'un DAO pour migrer notre code ! Les JSON c'est pratique pour tester, mais pas forcément pérenne dans le temps.</p>
<ul>
<li>Concevez une petite base de données simple.</li>
<li>Modifier votre DAO pour utiliser votre base de données.</li>
<li>N'oubliez pas de mettre dans le fichier <code>parametres.php</code> la configuration de votre connexion. (️⚠️ Surtout, ne l'écrivez pas dans le DAO ⚠️).</li>
</ul>
<p>⚠️ Vous avez vu l'avantage ! Nous avons modifié <strong>un seul fichier</strong> et l'ensemble de votre code utilise maintenant MySQL comme système de base de données.</p>
</template>
