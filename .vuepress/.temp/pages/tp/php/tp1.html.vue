<template><h1 id="creer-ma-premiere-page-php" tabindex="-1"><a class="header-anchor" href="#creer-ma-premiere-page-php" aria-hidden="true">#</a> Créer ma première page PHP</h1>
<p>Dans ce TP nous allons créer votre première page PHP. Rassurez-vous, elle sera très simple, pas très jolie… Mais elle nous permettra de voir les concepts de bases.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Je vous disais <RouterLink to="/tp/php/support.html#et-le-php-dans-tout-ca">tout à l'heure</RouterLink> que nous avions un texte « à trou », c'est littéralement le cas. Nous allons pouvoir mettre du PHP <strong>partout</strong> dans notre page pour rendre certaines parties <strong>dynamique</strong></p>
<p>Exemple avec le script de démo (le même que tout à l'heure):</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fr<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Exemple PHP<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Bonjour vous<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Nous sommes le <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token function">date</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"d/m/Y"</span><span class="token punctuation">)</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Nous pouvons donc le visualiser tels que :</p>
<p><img src="@source/tp/php/res/php_base2.png" alt="Un texte à trou"></p>
<p>Ce qui donnera après traitement de la part de votre serveur :</p>
<p><img src="@source/tp/php/res/php_base.png" alt="Le rendu"></p>
<h2 id="c-est-a-vous" tabindex="-1"><a class="header-anchor" href="#c-est-a-vous" aria-hidden="true">#</a> C'est à vous</h2>
<p>Je vous laisse tester le code précédent dans votre navigateur :</p>
<ul>
<li>Créer un nouveau fichier dans le dossier <code>www</code> de wamp nommée <code>index.php</code>. (✋ noté que le fichier n'est plus un <code>.html</code> mais un fichier <code>.php</code>)</li>
<li>Accéder à votre serveur web : http://localhost/index.php</li>
</ul>
<h2 id="les-balises" tabindex="-1"><a class="header-anchor" href="#les-balises" aria-hidden="true">#</a> Les balises</h2>
<p>En regardant le code nous avons plusieurs, nouveaux éléments :</p>
<ul>
<li>Les balises PHP : <code>&lt;?php … ?&gt;</code>.</li>
<li>Un mot <code>echo</code>.</li>
<li>Une fonction Date.</li>
</ul>
<h3 id="les-balises-php" tabindex="-1"><a class="header-anchor" href="#les-balises-php" aria-hidden="true">#</a> Les balises PHP</h3>
<p>Les balises PHP ont pour but d'indiquer « au moteur PHP » les endroits qu'il doit exécuter. Lors de la lecture de fichier, partout ou vous avez mis des <code>&lt;?php /* … */ ?&gt;</code> sera remplacé par « une exécution de code.</p>
<p>Vous allez donc pouvoir mettre dans votre code :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>ou encore</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token doc-comment comment">/**
 * Votre code ICI
 *
 *
 *
 *
 * */</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Il n'y a pas de limite à la longueur de votre code PHP.</p>
<div class="custom-container tip"><p class="custom-container-title">Astuce de pro</p>
<p>Nous avons la possibilité de mettre du code en commentaires en PHP. Du code en commentaire est du code qui ne sera <strong>pas exécuté par notre serveur</strong>. En PHP plusieurs notations sont possibles:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Commentaire sur une seule ligne</span>

ou

<span class="token comment">/* Votre commentaire à placer n'importe où */</span>

ou

<span class="token doc-comment comment">/**
 * Votre commentaire
 * sur plusieurs lignes
 * Pratique pour donner le but d'un fichier par exemple.
 **/</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></div>
<h3 id="echo-sierra-tango-papa" tabindex="-1"><a class="header-anchor" href="#echo-sierra-tango-papa" aria-hidden="true">#</a> echo ? sierra tango papa</h3>
<p>Aaah le mot-clé <code>echo</code> vous allez l'aimer ! Sans celui-ci votre code PHP n'affichera rien à l'utilisateur.</p>
<p>Exemple concret sans le echo:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Exemple PHP<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Nous sommes le <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token function">date</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"d/m/Y"</span><span class="token punctuation">)</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Je vous laisse tester</p>
<p>Tester le code suivant, vous allez voir… sans le echo aucun signe de la date</p>
</div>
<h3 id="la-fonction-date" tabindex="-1"><a class="header-anchor" href="#la-fonction-date" aria-hidden="true">#</a> La fonction date</h3>
<p>La fonction date est l'une des nombreuses fonctions disponibles <strong>de base</strong> dans PHP. Cette fonction permet de formater la date que nous lui passons en paramètre. Si il n'y a aucun paramètre ? Et bien ça prend <strong>now()</strong> soit <strong>maintenant</strong>.</p>
<p>Dans notre cas : <code>date(&quot;d/m/Y&quot;)</code> affiche la date actuelle avec un format « français ».</p>
<p><a href="https://www.php.net/manual/en/function.date.php" target="_blank" rel="noopener noreferrer">En savoir plus sur la fonction date<ExternalLinkIcon/></a></p>
<h3 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire</h3>
<p>Dans l'exemple, je vous laisse modifier la date pour en changer le format <strong>et</strong> ajouter l'heure.</p>
<h2 id="allons-plus-loin" tabindex="-1"><a class="header-anchor" href="#allons-plus-loin" aria-hidden="true">#</a> Allons plus loin</h2>
<p>Je vous le disais au début… Nous pouvons mettre du PHP partout dans notre code. La seule contrainte pour que celui-ci soit affiché? Qu'il contienne une ou plusieurs fois le mot echo.</p>
<div class="custom-container warning"><p class="custom-container-title">Attention au « ; »</p>
<p>Attention en PHP chaque instruction doit-être terminé par un <code>;</code>. Si vous l'oubliez votre script sera en <code>erreur</code>.</p>
</div>
<p>Voilà le code source d'un second script PHP :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token function">date</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'H:i:s'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Bonjour <span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token string double-quoted-string">"valentin"</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
        <span class="token doc-comment comment">/**
         * J'affiche du code HTML depuis le PHP
         **/</span>
        <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Je suis une page écrite en PHP, &lt;strong>avec du texte statique&lt;/strong>, mais dynamique"</span><span class="token punctuation">;</span>
    <span class="token delimiter important">?></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><img src="@source/tp/php/res/php_demo2.png" alt="Démo du rendu"></p>
<p>Nous avons donc un code HTML et du code PHP entremêlé. Il possible de mettre du texte dans du code PHP, du texte sans fonction PHP rien… <strong>Je vous déconseille vivement</strong> de le faire ! Ça n'a aucun intérêt et en plus vous faites travailler inutilement votre serveur PHP.</p>
<p>✋ Réservé vos balises PHP pour du code dynamique.</p>
<div class="custom-container tip"><p class="custom-container-title">Astuce de pro</p>
<p>Votre code PHP ne sera jamais envoyé au client. Il est exécuté sur le serveur, seul le résultat est reçu par votre client.</p>
</div>
<h3 id="c-est-a-vous-1" tabindex="-1"><a class="header-anchor" href="#c-est-a-vous-1" aria-hidden="true">#</a> C'est à vous</h3>
<p>Je vous laisse tester le code précédent. Modifiez-le pour y mettre vos informations.</p>
<p>👁️ Regarder à l'aide de votre navigateur le code reçu du serveur 👁️</p>
<div class="custom-container danger"><p class="custom-container-title">Ha oui j'oubliai</p>
<p>Il est possible également de faire un fichier entièrement en PHP qui ne retourne que du HTML :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token keyword">echo</span> <span class="token string single-quoted-string">'
&lt;!DOCTYPE html>
&lt;html lang="en">
&lt;head>
    &lt;title>Ma page&lt;/title>
&lt;/head>
&lt;body>
    &lt;h1>Bonjour Valentin&lt;/h1>
&lt;/body>
&lt;/html>
'</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Bien évidement en</p>
<p><strong>AUCUN CAS VOUS NE DEVEZ FAIRE ÇA !</strong></p>
</div>
</template>
