<template><h1 id="pratiquer-l-ajax-adaptons-un-code-existant" tabindex="-1"><a class="header-anchor" href="#pratiquer-l-ajax-adaptons-un-code-existant" aria-hidden="true">#</a> Pratiquer l'Ajax, adaptons un code existant</h1>
<p>Nous avons créé deux cas « de tests », je vous propose de le mettre en place dans un code existant. Nous avons réalisé un site la GRETA TV, ce site comportait <strong>«deux pages</strong> :</p>
<ul>
<li>Une page d'accueil <code>home.php</code>, qui affiche la liste des vidéos.</li>
<li>Une page <code>tv.php</code> ayant pour but l'affichage de la vidéo souhaité.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Vous n'avez pas le code source ?</p>
<p>Celui-ci est <a href="/demo/php/greta-tv/refactor-structure.zip">disponible ici</a>. Il pourra vous servir de base de travail. (c'est une version sans base de données, pour simplifier l'installation locale)</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">Vous préférez une approche MVC ?</p>
<p>La première version du code source fourni est très simple. En tant que développeur, on préfère une approche un peu plus complète que celle-ci. C'est pour ça que je vous propose plutôt d'utiliser la version MVC du projet.</p>
<p>Celui-ci est <a href="/demo/php/greta-tv/refactor-structure-mvc.zip">disponible ici</a>. La <RouterLink to="/tp/php/mvc/tp1.html">documentation est disponible ici</RouterLink></p>
<p><strong>Attention</strong>, la suite du TP repose sur la première version du code source. Les nommages sont différents, mais globalement le fonctionnement reste le même. Si vous voulez jouer, tentez la version MVC.</p>
</div>
<p>Comment allons-nous procéder ?</p>
<ul>
<li>Dans un premier temps, nous allons regarder le fonctionnement du site actuel.</li>
<li>Puis, nous allons supprimer les parties PHP « qui affichent les vidéos ». Nous testerons que notre code fonctionne toujours, mais en n’affichant aucune vidéo.</li>
<li>Nous allons par la suite créer une API. Son but ? Retourner uniquement le contenu (au format JSON bien entendu)</li>
<li>Puis nous appellerons notre API en Ajax grâce à Fetch depuis notre page.</li>
</ul>
<h2 id="la-page-home-php" tabindex="-1"><a class="header-anchor" href="#la-page-home-php" aria-hidden="true">#</a> La page <code>home.php</code></h2>
<p>Nous allons rendre dynamique la page d'accueil <code>home.php</code>, dans le sens où :</p>
<ul>
<li>Notre serveur va générer une page « Vide » (c'est-à-dire sans la liste de vidéos).</li>
<li>Notre navigateur va, via un appel Ajax charger la liste des vidéos, et se charger en JavaScript de l'affichage de la liste.</li>
</ul>
<p>Avant tout, <strong>pourquoi faire ça ?</strong> L'avantage de découper le traitement comme ça. C'est que nous pourrions très simplement créer un client « Mobile », et ça sans toucher au code de notre serveur. Pleins d'avantages :</p>
<ul>
<li>Code unique pour le Web et les autres plateformes</li>
<li>Centralisation de la logique dans un code dédié à la récupération « du contenu » (les vidéos en l'occurrence).</li>
<li>Approche microservices, nous pouvons donc héberger notre site Internet sur une autre plateforme que l'API.</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">Un INSTANT !</p>
<p>Une API ? What ? Alors, une API dans le fond c'est « comme un site web ». Mais, cette page web ne produit pas du HTML et n'a pas pour vocation d'être lue par un humain.</p>
<p>C'est donc du code (PHP ou autre) qui va permettre de faire parler deux ordinateurs (le client et le serveur) dans un langage spécifique (XML, JSON …)</p>
</div>
<h3 id="etape-1-analyse-du-code" tabindex="-1"><a class="header-anchor" href="#etape-1-analyse-du-code" aria-hidden="true">#</a> Étape 1 : Analyse du code</h3>
<p>La première étape va être de créer l'API, nous allons donc regarder comment fonctionne le code que vous avez téléchargé. Je vous laisse regarder, une fois analysé nous allons en parler ensemble.</p>
<details class="custom-container details"><summary>Analyse du code</summary>
<p>Le code qui nous intéresse est présent dans le fichier <code>home.php</code> ; celui-ci contient quelques lignes de code, mais si nous y regardons de plus près seules quelques lignes sont intéressantes :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$videos</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"BcgsOgjHgWA"</span><span class="token punctuation">,</span><span class="token string double-quoted-string">"lcOxhH8N3Bo"</span><span class="token punctuation">,</span><span class="token string double-quoted-string">"jTuBnZrLbq0"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"M2VtfZDOcHQ"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"i1iIaSbK9bg"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"MTaHw-S6IDo"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"KfMCApWc5xE"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"igtN49I1CtM"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$i</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$videos</span> <span class="token keyword">as</span> <span class="token variable">$id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$i</span><span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col-sm-12 col-md-3 p-3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-body text-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.php?page=tv&amp;id=<span class="token php language-php"><span class="token delimiter important">&lt;?=</span><span class="token variable">$id</span><span class="token delimiter important">?></span></span><span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-outline-primary<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Video <span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$i</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>Nous pouvons y voir un exemple de code PHP très simple à savoir :</p>
<ul>
<li>Une variable <code>$videos</code>, celle-ci contient la liste des vidéos à afficher. <em>C'est notre source de données</em>.</li>
<li><code>$i</code> est une variable qui permettra d'afficher <code>Video X</code> (1… X). <em>Note, cette variable peut-être remplacée par une boucle foreach différente <code>foreach $videos as $i =&gt; $id</code></em></li>
<li>Du code HTML, celui-ci permet d'afficher une liste de Card à la suite avec dedans un bouton permettant d'accéder à la page <code>tv.php</code>.</li>
</ul>
</details>
<hr>
<p>Une autre partie du code est intéressante, le fichier <code>index.php</code> ; ce fichier est un entrypoint, c'est une bonne pratique que je vous encourage vraiment à pratiquer. Regardons le fichier ensemble ! Et plus particulièrement la variable <code>$whitelist</code> celle-ci contient la liste des pages <strong>autorisées</strong>.</p>
<div class="custom-container tip"><p class="custom-container-title">Whitelist ?</p>
<p>La sécurité vous connaissez ? J'espère, quand vous développez un site Internet, vous êtes par définition « en short » sur la toile. Votre site peut-être et sera certainement (je vous le garantis pour l'avoir vécue) piraté par une personne malveillante. Comment s'en prémunir alors ? Tout simplement empêchant au maximum l'exploitation de problème connut.</p>
<p>Créer une <code>whitelist</code> va nous permettre de dormir paisiblement, nous allons contrôler finement ce que l'utilisateur va pouvoir inclure. Vous retrouverez cette pratique dans différents langages sous différent nom (Un <code>router</code> peut-être assimilé à ce genre de pratique).</p>
</div>
<hr>
<p>Le précédent développeur a visiblement travaillé pour vous… 😉 😉. Vous trouverez également dans le projet un fichier <code>api.php</code> ainsi qu'un dossier <code>api</code> celui-ci contient le code permettant de :</p>
<ul>
<li>Déclarer des API. (dossier <code>api/</code>)</li>
<li>Sécuriser les API.</li>
<li>Centraliser la gestion de celle-ci. (<code>api.php</code>)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">👀 Vous pouvez tester dès maintenant 👀</p>
<p>Vous avez une API de disponible dans le projet. Celle-ci contient du contenu fictif, vous pouvez l'appeler avec le lien :</p>
<ul>
<li>http://localhost/leDossierDeVotreProjet/api.php?page=sample</li>
</ul>
<p>🤓 Je vous laisse tester.</p>
</div>
<h3 id="etape-2-creer-l-api" tabindex="-1"><a class="header-anchor" href="#etape-2-creer-l-api" aria-hidden="true">#</a> Étape 2 : Créer l'API</h3>
<p>Nous avons maintenant analysé le code actuellement fonctionnel. Nous allons donc créer une API qui devra retourner « seulement la liste des vidéos ». Nous allons utiliser la fonction <code>json_encode</code> fournie <strong>de base</strong> en PHP.</p>
<p>Cette fonction permet :</p>
<blockquote>
<p>Retourne une chaine de caractères contenant la représentation JSON de la valeur value.</p>
<p>L'encodage est affecté par les flags fournis. De plus, l'encodage des valeurs flottantes dépend de la valeur de serialize_precision.</p>
</blockquote>
<p><em>Source:</em> https://www.php.net/manual/fr/function.json-encode.php</p>
<p>Cette fonction nous permet donc de transformer une <code>variable</code> en quelque chose de transférable simplement vers un autre système. Ce quelque chose est du JSON :</p>
<blockquote>
<p>JSON est un format de données textuelles dérivé de la notation des objets du langage JavaScript. Il permet de représenter de l’information structurée comme le permet XML par exemple.</p>
</blockquote>
<p><em>Source:</em> Wikipédia</p>
<h4 id="place-au-code" tabindex="-1"><a class="header-anchor" href="#place-au-code" aria-hidden="true">#</a> Place au code</h4>
<p>Nous devons donc écrire une API… Une API c'est <strong>juste un fichier PHP</strong> comme un autre ; à la seule différence que celui-ci ne retourne pas du HTML, mais du JSON. Vous avez un exemple d'API dans le projet avec le fichier <code>sample.php</code>, je vous laisse le regarder…</p>
<p>Une fois celui-ci analysé, je vous laisse créer votre fichier, exemple <code>videos.php</code> <strong>dans le dossier <code>api/</code></strong> ça sera notre futur API ! Nous avons maintenant une API <strong>vide</strong> ! Mais que mettre dedans ?</p>
<ul>
<li>À votre avis ?</li>
<li>Du code PHP 😮</li>
<li>La réponse D ?</li>
</ul>
<p>Je vous aide! Nous allons y mettre du code PHP… Et plus particulièrement le contenu de <strong>notre source de données</strong> ! Mais quel code à votre avis ?</p>
<ul>
<li>Vous allez devoir créer la variable <code>$videos</code> (comme sur la home).</li>
<li>Utiliser la fonction <code>json_encode</code> et <code>echo</code> pour envoyer le contenu de la variable au client au format JSON.</li>
</ul>
<details class="custom-container details"><summary>En panne d'inspiration ?</summary>
<p>Je vous aide :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
        <span class="token variable">$videos</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"BcgsOgjHgWA"</span><span class="token punctuation">,</span><span class="token string double-quoted-string">"lcOxhH8N3Bo"</span><span class="token punctuation">,</span><span class="token string double-quoted-string">"jTuBnZrLbq0"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"M2VtfZDOcHQ"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"i1iIaSbK9bg"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"MTaHw-S6IDo"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"KfMCApWc5xE"</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"igtN49I1CtM"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">echo</span> <span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token variable">$videos</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></details>
<p>Je vous laisse mettre en place l'API dans votre code. <strong>N'oubliez pas de la tester !</strong></p>
<div class="custom-container tip"><p class="custom-container-title">L'astuce du chef</p>
<p>Pour tester votre API, vous avez la possibilité d’utiliser le logiciel PostMan. PostMan va vous permettre de tester vos API simplement avec une interface graphique.</p>
<p>Téléchargez-le <a href="https://www.getpostman.com/" target="_blank" rel="noopener noreferrer">ici<ExternalLinkIcon/></a></p>
</div>
<h3 id="etape-2-modifier-le-code-existant" tabindex="-1"><a class="header-anchor" href="#etape-2-modifier-le-code-existant" aria-hidden="true">#</a> Étape 2 : Modifier le code existant</h3>
<p>Je vous laisse modifier le code PHP de la page <code>home.php</code> pour le vider de tout <code>PHP</code> celui-ci doit-être vide ! Il ne va contenir que le minimum à savoir la structure interne de la page :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row pt-5<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!-- Nous allons insérer ICI le contenu grace à l'AJAX --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// Vous ajouterez ici prochainement le code JavaScript permettant de faire l'appel Ajax (avec fetch)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="etape-3-appeler-l-api-en-ajax" tabindex="-1"><a class="header-anchor" href="#etape-3-appeler-l-api-en-ajax" aria-hidden="true">#</a> Étape 3 : Appeler l'API en Ajax</h3>
<p>Comme nous l'avons fait précédemment je vous laisse reprendre le code. Mais le code va ressembler à :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"./api.php?page=videos"</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">datas</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code ICI, vous devez parcourir les vidéos (comme dans l'exemple précédent) pour les ajouter dans le #content (comme dans l'exemple précédent)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><details class="custom-container details"><summary>à court d'idées sur le code à écrire ?</summary>
<p>NON ? Vous n'allez pas tricher comme ça… Non pas vous ?</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// À mettre dans le then</span>
<span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
datas<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"content"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span>
    <span class="token string">"beforeend"</span><span class="token punctuation">,</span>
    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
    &lt;div class="col-sm-12 col-md-3 p-3">
        &lt;div class="card">
            &lt;div class="card-body text-center">
                &lt;a href="index.php?page=tv&amp;id=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>el<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" class="btn btn-outline-primary">Video </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/a>
            &lt;/div>
        &lt;/div>
    &lt;/div>
    </span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>⚠️ Non… Ce n'est pas la seule façon de faire. Maintenant que vous avez vu MA solution. Je vous laisse écrire la vôtre.</p>
</details>
<p>🤓 Je vous laisse travailler à la mise en place du code en question. Tester ensuite que la page s'affiche comme précédemment.</p>
<h3 id="etape-4-evolution-de-la-page" tabindex="-1"><a class="header-anchor" href="#etape-4-evolution-de-la-page" aria-hidden="true">#</a> Étape 4 : Évolution de la page</h3>
<p>Ajouter un bouton rafraichir dans la page. Le bouton rafraichir doit permettre de récupérer à nouveau la liste des vidéos pour les mettre à jour dans la page.</p>
<ul>
<li>Ajouter une icône à droite dans l'interface.</li>
<li>Utiliser les icônes fournies par bootstrap.</li>
<li>Ajouter une action <code>onClick</code> permettant de déclencher l'action (<code>function</code>) permettant d'obtenir les vidéos en Ajax (c'est le code que vous avez déjà écrit)</li>
</ul>
<p>Voilà la maquette :</p>
<p><img src="@source/tp/javascript/res/maquette.png" alt="Maquette rendu"></p>
<h2 id="allons-plus-loin" tabindex="-1"><a class="header-anchor" href="#allons-plus-loin" aria-hidden="true">#</a> Allons plus loin</h2>
<p>Nous avons fait la page <code>home.php</code> ensemble. Actuellement, nous avons un fond « brick » sur la page TV (<code>tv.php</code>) ; je vous propose de changer cette page ! Pour ça vous allez devoir procéder à différents ajustements :</p>
<ul>
<li>Ajouter dans la structure de données la notion de thème. (un thème différent par vidéo)</li>
<li>Retourner dans <strong>une nouvelle</strong> API (<code>getVideoDetails</code>), les informations nécessaires au bon affichage du thème.</li>
<li>Utiliser le retour dans votre page.</li>
</ul>
<details class="custom-container details"><summary>Quelques éléments en plus pour vous aider</summary>
<ul>
<li>Vous allez avoir besoin évidemment de <code>fetch</code> (ou de jQuery) afin de faire l'appel Ajax.</li>
<li>Votre API doit retourner la class CSS à appliquer au <code>body</code>.</li>
<li>Vous pouvez appliquer la class CSS via : <code>document.body.classList.add(&quot;votreClass&quot;)</code>.</li>
</ul>
<p>Comme dans le premier exemple, vous devez utiliser le résultat de votre API, cette fois-ci le JSON n'est pas obligatoire, voilà une piste de réponse :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"lurldevotreapi"</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token operator">=></span> r<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resultat</span><span class="token punctuation">)</span> <span class="token operator">=></span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>resultat<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></details>
<p>Voilà quelques exemples du résultat :</p>
<p><img src="@source/tp/javascript/res/theme/base.png" alt="Base">
<img src="@source/tp/javascript/res/theme/space.png" alt="Space">
<img src="@source/tp/javascript/res/theme/random.png" alt="Random">
<img src="@source/tp/javascript/res/theme/bretagne.png" alt="Bretagne"></p>
<h2 id="l-etape-bonus" tabindex="-1"><a class="header-anchor" href="#l-etape-bonus" aria-hidden="true">#</a> L'étape bonus</h2>
<p>Je vous ai indiqué en introduction que le but de créer des API était de permettre de créer simplement plusieurs clients avec comme source de données la même information. Je vous propose donc de mettre ça en pratique ! Nous allons donc créer un autre client web qui consommera nos données. Voilà les éléments que vous devrez réaliser :</p>
<ul>
<li>Le client Web devra être hébergé sur <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">Netlify<ExternalLinkIcon/></a>.</li>
<li>Avoir un visuel différent de votre page (home.php) actuelle. (Vous pouvez vous inspirer de YouTube par exemple ou Twitch).</li>
<li>Avoir une information indiquant chargement pendant la récupération de la liste des vidéos.</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">Un instant !</p>
<p>Lors de votre développement, vous allez rencontrer un problème de Cross Origin. Le Cross Origin Resource Sharing (CORS) est une protection intégrée dans votre navigateur qui vous empêche depuis le domaine A d'appeler une ressource sur le domaine B. La raison ? Elle est simple empêcher le partage non désiré d'information entre deux sites.</p>
<p>En tant que développeur (si si), vous pouvez contrôler comment fonctionne cette protection. Vous pouvez dans vos API décider qui vous appellera (quel domaine), de manière fine ou de manière complètement ouverte (<code>*</code>). Pour rendre votre code le plus permissif possible vous pouvez ajouter dans votre API PHP le code suivant (tout en haut) :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'Access-Control-Allow-Origin: *'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vous pouvez évidemment être plus précis, en indiquant un domaine spécifique :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'Access-Control-Allow-Origin: https://www.example.com'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
</template>
