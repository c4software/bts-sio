<template><h1 id="introduction-a-laravel" tabindex="-1"><a class="header-anchor" href="#introduction-a-laravel" aria-hidden="true">#</a> Introduction à Laravel</h1>
<p><img src="@source/tp/laravel/ressources/logo.png" alt="Laravel"></p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink><ul><li><RouterLink to="#windows">Windows</RouterLink></li><li><RouterLink to="#linux">Linux</RouterLink></li><li><RouterLink to="#macos">MacOS</RouterLink></li></ul></li><li><RouterLink to="#installer-laravel">Installer Laravel</RouterLink></li><li><RouterLink to="#creer-le-premier-projet">Créer le premier Projet</RouterLink></li><li><RouterLink to="#initialisation">Initialisation</RouterLink></li><li><RouterLink to="#lancer-le-projet-d-exemple">Lancer le projet d’exemple</RouterLink></li><li><RouterLink to="#modification-du-template-par-defaut">Modification du template par défaut</RouterLink></li><li><RouterLink to="#ajouter-une-nouvelle-route">Ajouter une nouvelle Route</RouterLink></li><li><RouterLink to="#ajouter-une-nouvelle-vue">Ajouter une nouvelle vue</RouterLink><ul><li><RouterLink to="#creer-le-layout">Créer le layout</RouterLink></li><li><RouterLink to="#utiliser-le-layout-dans-welcome-blade-php">Utiliser le layout dans welcome.blade.php</RouterLink></li><li><RouterLink to="#utiliser-le-layout-dans-la-route-pong">Utiliser le layout dans la route Pong</RouterLink></li></ul></li><li><RouterLink to="#les-composants">Les composants</RouterLink></li><li><RouterLink to="#utiliser-un-controleur">Utiliser un contrôleur</RouterLink><ul><li><RouterLink to="#le-controleur">Le Contrôleur:</RouterLink></li><li><RouterLink to="#les-routes">Les routes</RouterLink></li><li><RouterLink to="#les-vues">Les vues</RouterLink></li></ul></li><li><RouterLink to="#la-base-de-donnees">La base de données</RouterLink><ul><li><RouterLink to="#definir-la-migration-structure-de-la-table">Définir la migration (structure de la table)</RouterLink></li><li><RouterLink to="#definition-du-modele">Définition du modèle</RouterLink></li><li><RouterLink to="#creer-reellement-vos-tables">Créer réellement vos tables</RouterLink></li><li><RouterLink to="#requeter-votre-table">Requêter votre table</RouterLink></li><li><RouterLink to="#finaliser">Finaliser</RouterLink></li><li><RouterLink to="#changer-l-etat-d-une-todo">Changer l&#39;état d&#39;une TODO</RouterLink></li><li><RouterLink to="#supprimer-une-todo">Supprimer une TODO</RouterLink></li><li><RouterLink to="#evolution-1">Évolution 1</RouterLink></li></ul></li></ul></nav>
</details>
<p>Dans ce TP nous allons couvrir l’installation, la configuration et la création d’un premier projet « démo » à base de Laravel.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Pour pouvoir utiliser Laravel, nous allons avoir besoin de différents outils :</p>
<ul>
<li>PHP7</li>
<li>Composer</li>
</ul>
<p>Il y a bien plus de dépendances, mais celles-ci seront récupérées automatiquement par <code>Composer</code></p>
<h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> Windows</h3>
<p>Pour « installer » Laravel sous Windows, vous devez dans un premier temps installer PHP7 sur votre machine. Dans un premier temps, installer Wamp + PHP7 :</p>
<ul>
<li><a href="http://www.wampserver.com/fr/#download-wrapper" target="_blank" rel="noopener noreferrer">Installation de Wamp.<ExternalLinkIcon/></a></li>
<li>Installer Wamp, et vérifier que celui-ci fonctionne correctement.</li>
<li>Activer l’extension <code>php_openssl.dll</code> dans la liste des extensions PHP.</li>
</ul>
<h4 id="installer-composer" tabindex="-1"><a class="header-anchor" href="#installer-composer" aria-hidden="true">#</a> Installer Composer</h4>
<ul>
<li><a href="https://getcomposer.org/Composer-Setup.exe" target="_blank" rel="noopener noreferrer">Télécharger Composer pour Windows<ExternalLinkIcon/></a>, lors de l’installation il vous sera demandé de sélectionner l’exécutable PHP. <code>ATTENTION:</code> Bien sélectionner la version 8.0 minimum de PHP dans le dossier <code>C:\wamp\bin\php\php\8.X.X\bin\php.exe</code> &lt;= Attention à prendre la bonne version (ou via XAMPP)</li>
<li>vérifier que la commande est bien disponible en tapant <code>composer</code> dans un terminal</li>
</ul>
<h3 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> Linux</h3>
<p>Pour Linux c’est plus simple, il suffit d’installer PHP 7 sur votre machine (regarder la documentation de votre distribution). Une fois que PHP est installé, il suffit de faire :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php -r <span class="token string">"copy('https://getcomposer.org/installer', 'composer-setup.php');"</span>
php composer-setup.php
php -r <span class="token string">"unlink('composer-setup.php');"</span>
<span class="token function">mv</span> composer.phar /usr/local/bin/composer
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Ajouter dans votre PATH la home de composer, exemple :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">"<span class="token environment constant">$PATH</span>:<span class="token environment constant">$HOME</span>/.config/composer/vendor/bin"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Vous allez avoir besoin de paquets en plus</p>
<p>Si vous utilisez Ubuntu / Debian / Pop_OS! etc :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> libapache2-mod-php php-common php-xml php-gd php-opcache php-mbstring php-tokenizer php-json php-bcmath php-zip <span class="token function">unzip</span> php-sqlite
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Sans les paquets, vous ne pourrez pas continuer l'installation.</p>
</div>
<h3 id="macos" tabindex="-1"><a class="header-anchor" href="#macos" aria-hidden="true">#</a> MacOS</h3>
<p>Sur la dernière version de MacOS, PHP est déjà disponible en version 7. Il suffit donc d’installer <code>Composer</code>, pour l’installer il suffit :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php -r <span class="token string">"copy('https://getcomposer.org/installer', 'composer-setup.php');"</span>
php composer-setup.php
php -r <span class="token string">"unlink('composer-setup.php');"</span>
<span class="token function">mv</span> composer.phar /usr/local/bin/composer
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Ajouter dans votre PATH la home de composer, exemple :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">"<span class="token environment constant">$PATH</span>:<span class="token environment constant">$HOME</span>/.composer/vendor/bin"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Fermer et rouvrir le terminal.</p>
<h2 id="installer-laravel" tabindex="-1"><a class="header-anchor" href="#installer-laravel" aria-hidden="true">#</a> Installer Laravel</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">composer</span> global require <span class="token string">"laravel/installer"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>✋ Vérifier que la commande laravel fonctionne. Comment faire ?
Pour vérifier que la commande <code>laravel</code> fonctionne, il suffit de faire dans une console <code>laravel -h</code></p>
<p><img src="@source/tp/laravel/ressources/laravelcli.png" alt="Laravel"></p>
<h2 id="creer-le-premier-projet" tabindex="-1"><a class="header-anchor" href="#creer-le-premier-projet" aria-hidden="true">#</a> Créer le premier Projet</h2>
<p>Votre poste est maintenant configuré pour Laravel, vous pouvez donc créer un nouveau projet grâce à la commande :</p>
<p>✋ Attention, le projet sera créé dans le dossier courant.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>laravel new mon-premier-projet

<span class="token comment"># Ou</span>

<span class="token function">composer</span> create-project --prefer-dist laravel/laravel mon-premier-projet
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>La commande va télécharger l'ensemble des dépendances nécessaire et va créer un dossier <code>mon-premier-projet</code> avec les sources.</p>
<div class="custom-container tip"><p class="custom-container-title">Vous avez récupéré le projet via GIT ?</p>
<p>Si vous avez récupéré le projet depuis GIT vous n'allez bien évidemment pas utiliser la commande <code>create-project</code>… Par contre vous allez devoir réinstaller les dépendances (<code>vendor</code>) de votre projet. C'est très simple :</p>
<p>Dans le dossier de votre projet, lancer la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">composer</span> <span class="token function">install</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<h2 id="initialisation" tabindex="-1"><a class="header-anchor" href="#initialisation" aria-hidden="true">#</a> Initialisation</h2>
<p>Votre nouveau projet contient un fichier <code>.env</code> ouvrez-le, et éditez par exemple le nom du projet.</p>
<p>Questions :</p>
<ul>
<li>Le fichier est plutôt complet, à quoi servent les différents paramètres ?</li>
<li>Dans les cours, je vous ai parlé de la APP_KEY, celle-ci est déjà remplie, à votre avis pourquoi ?</li>
</ul>
<h2 id="lancer-le-projet-d-exemple" tabindex="-1"><a class="header-anchor" href="#lancer-le-projet-d-exemple" aria-hidden="true">#</a> Lancer le projet d’exemple</h2>
<p>Laravel intègre un serveur de test permettant de valider son développement avec rien d’autre que PHP sur sa machine. Pour ça, dans le dossier du projet (<code>cd mon-premier-projet</code>) vous pouvez faire la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan serve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Rendez-vous maintenant dans <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer">votre navigateur<ExternalLinkIcon/></a> pour voir le site de démonstration fourni par Laravel.</p>
<p><img src="@source/tp/laravel/ressources/sample_laravel.png" alt="Sample Laravel"></p>
<h2 id="modification-du-template-par-defaut" tabindex="-1"><a class="header-anchor" href="#modification-du-template-par-defaut" aria-hidden="true">#</a> Modification du template par défaut</h2>
<p>Éditer le fichier <code>resources/views/welcome.blade.php</code>, ajouter la variable <code>$titre</code>. La syntaxe « blade » est la suivante <span v-pre><code>{{ $titre }}</code></span>.</p>
<p>Localiser dans le code l'endroit ou le logo de Laravel est affiché. Ajouter en dessous « <span v-pre><code>{{ $titre }}</code></span> ». Vous avez défini votre première variable c'est bien ! Mais pour l'instant rien ne se passe… Pour que quelque chose s'affiche :</p>
<p>Éditer le fichier <code>routes/web.php</code>, transformer :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'welcome'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>en</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'welcome'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'titre'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Mon premier exemple.'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>💡 Vous pouvez également appeler des fonctions dans les templates, exemple <code>time()</code>. Tester cette fonction en ajoutant :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Le Timestamp est {{ time() }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Questions :</p>
<ul>
<li>À votre avis est-il possible d'appeler d'autres fonctions ?</li>
</ul>
<h2 id="ajouter-une-nouvelle-route" tabindex="-1"><a class="header-anchor" href="#ajouter-une-nouvelle-route" aria-hidden="true">#</a> Ajouter une nouvelle Route</h2>
<p>Pour tester le fonctionnement, nous allons ajouter une nouvelle <code>Route</code> dans le projet de démonstration. Nous allons donc <code>ajouter</code> dans le fichier <code>routes/web.php</code> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/ping'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string double-quoted-string">"pong"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Tester la modification en <a href="http://localhost:8000/ping" target="_blank" rel="noopener noreferrer">accédant à votre site<ExternalLinkIcon/></a></p>
<Reveal text="Voir l’une des solutions possibles">
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'welcome'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'titre'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'Mon premier exemple.'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/ping'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string double-quoted-string">"pong"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></Reveal>
<div class="custom-container danger"><p class="custom-container-title">Un instant</p>
<p>Nous avons écrit un peu de code. Vous avez pensé à GIT ? Git est en effet préconfiguré dans Laravel, nous avons de base un fichier <code>.gitignore</code> celui-ci limite l'ajout de quelques fichiers :</p>
<ul>
<li><code>.env</code></li>
<li>Le dossier <code>vendor</code> etc…</li>
</ul>
<p>Vous pouvez donc commiter sans problème vos sources.</p>
</div>
<h2 id="ajouter-une-nouvelle-vue" tabindex="-1"><a class="header-anchor" href="#ajouter-une-nouvelle-vue" aria-hidden="true">#</a> Ajouter une nouvelle vue</h2>
<p>Maintenant que nous avons déclaré une nouvelle route, nous allons revoir légèrement les templates pour :</p>
<ul>
<li>Déclarer un template principal (aussi appelé : layout).</li>
<li>Modifier le welcome.blade.php pour y faire référence.</li>
<li>Utiliser le layout pour répondre <code>pong</code>.</li>
</ul>
<p>Question :</p>
<ul>
<li>À votre avis pourquoi un tel découpage ?</li>
</ul>
<h3 id="creer-le-layout" tabindex="-1"><a class="header-anchor" href="#creer-le-layout" aria-hidden="true">#</a> Créer le layout</h3>
<p>Créer un nouveau fichier <code>resources/views/layouts/base.blade.php</code> avec le contenu suivant :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ app()->getLocale() }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Laravel - @yield('title')<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- Fonts --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
      <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://fonts.googleapis.com/css?family=Raleway:100,600<span class="token punctuation">"</span></span>
      <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span>
      <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/css<span class="token punctuation">"</span></span>
    <span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!-- Styles --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
      <span class="token selector">html,
      body</span> <span class="token punctuation">{</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span> #636b6f<span class="token punctuation">;</span>
        <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">"Raleway"</span><span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
        <span class="token property">font-weight</span><span class="token punctuation">:</span> 100<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
        <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.full-height</span> <span class="token punctuation">{</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.flex-center</span> <span class="token punctuation">{</span>
        <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
        <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.position-ref</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.top-right</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
        <span class="token property">right</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
        <span class="token property">top</span><span class="token punctuation">:</span> 18px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.content</span> <span class="token punctuation">{</span>
        <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.title</span> <span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 84px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.links > a</span> <span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> #636b6f<span class="token punctuation">;</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 0 25px<span class="token punctuation">;</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
        <span class="token property">font-weight</span><span class="token punctuation">:</span> 600<span class="token punctuation">;</span>
        <span class="token property">letter-spacing</span><span class="token punctuation">:</span> 0.1rem<span class="token punctuation">;</span>
        <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
        <span class="token property">text-transform</span><span class="token punctuation">:</span> uppercase<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token selector">.m-b-md</span> <span class="token punctuation">{</span>
        <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex-center position-ref full-height<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      @if (Route::has('login'))
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>top-right links<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        @auth
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ url(<span class="token punctuation">'</span>/home<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
        @else
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ route(<span class="token punctuation">'</span>login<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Login<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ route(<span class="token punctuation">'</span>register<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Register<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
        @endauth
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      @endif

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>@yield('content')<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br></div></div><p>✋ Mais d’où vient ce contenu ? C’est tout simplement un découpage en « layout » du template de base de démonstration.</p>
<p>Question :</p>
<ul>
<li>À votre avis, à quoi sert le mot-clé <code>@yield</code> ?</li>
</ul>
<h3 id="utiliser-le-layout-dans-welcome-blade-php" tabindex="-1"><a class="header-anchor" href="#utiliser-le-layout-dans-welcome-blade-php" aria-hidden="true">#</a> Utiliser le layout dans welcome.blade.php</h3>
<p>Maintenant que nous avons notre template de base, nous allons l’utiliser dans le template « Welcome ». Remplacer le contenu de <code>resources/views/welcome.blade.php</code> par :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>@extends('layouts.base') @section('title', 'Bienvenue') @section('content')
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title m-b-md<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Laravel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>links<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel.com/docs<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Documentation<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laracasts.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Laracasts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel-news.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>News<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://forge.laravel.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Forge<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://github.com/laravel/laravel<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>GitHub<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
@endsection
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="utiliser-le-layout-dans-la-route-pong" tabindex="-1"><a class="header-anchor" href="#utiliser-le-layout-dans-la-route-pong" aria-hidden="true">#</a> Utiliser le layout dans la route Pong</h3>
<p>Bon, maintenant que nous avons déclaré un layout utilisons-le dans la 2nd route (<a href="http://localhost:8000/ping" target="_blank" rel="noopener noreferrer">/ping<ExternalLinkIcon/></a>) que nous avons créé tout à l’heure. Pour cette dernière action je ne vous donne pas de code, mais uniquement les étapes :</p>
<ul>
<li>Créez une Vue par exemple <code>ping.blade.php</code> (Dans le dossiers <code>views</code>)</li>
<li>Utilisez <code>@extends('layouts.base')</code> pour « hériter » de votre layout principal.</li>
<li>Modifiez <code>web.php</code> pour répondre avec la fonction <code>view</code> comme dans l’autre route. (en vous inspirant de l'autre déjà présente)</li>
</ul>
<p>Avec ces quelques explications, vous allez pouvoir atteindre l’objectif. Bon courage.</p>
<Reveal text="Voir l’une des solutions possibles pour ping.blade.php">
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>@<span class="token keyword">extends</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'layouts.base'</span><span class="token punctuation">)</span>

@<span class="token function">section</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'title'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'Bienvenue'</span><span class="token punctuation">)</span>

@<span class="token function">section</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'content'</span><span class="token punctuation">)</span>
   <span class="token operator">&lt;</span>h1<span class="token operator">></span><span class="token constant">PONG</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
@endsection
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></Reveal>
<h2 id="les-composants" tabindex="-1"><a class="header-anchor" href="#les-composants" aria-hidden="true">#</a> Les composants</h2>
<p>Au passage, nous avons maintenant (en Laravel 8) une autre façon de définir des templates / « morceaux de codes réutilisables ». C'est via un composant, nous détaillerons cette pratique un peu plus tard.</p>
<p>Le principe est très proche de l'héritage des templates vu précédemment. À la différence que nous allons avoir à notre disposition des balises personnalisées comme par exemple <code>&lt;x-layout-base&gt;</code> ou <code>&lt;x-card&gt;&lt;/x-card&gt;</code> ; c'est balise font référence à du code placé dans le dossier <code>resources/views/components/</code>.</p>
<p>Cette notation est très récente et n'est disponible qu'à partir de <strong>Laravel 8</strong>.</p>
<p>Nous utiliserons les composants dans le TP Authentification.</p>
<p><a href="https://laravel.com/docs/8.x/blade#components" target="_blank" rel="noopener noreferrer">Pour les plus curieux, la documentation officielle est disponible ici<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">Un composant</p>
<p>L'organisation en composant est très populaire en ce moment, elle est la base de beaucoup de frameworks moderne. Vous devriez vivement vous y intéresser.</p>
<p>C'est par exemple la base du fonctionnement de VueJS 👌.</p>
</div>
<h2 id="utiliser-un-controleur" tabindex="-1"><a class="header-anchor" href="#utiliser-un-controleur" aria-hidden="true">#</a> Utiliser un contrôleur</h2>
<p>La force de Laravel est sa structure, nous avons vu ensemble que celui-ci propose un découpage « précis » et clair des couches « MVC » (Modèle, Vue, Controlleur). Nous allons donc organiser notre code pour utiliser un Contrôleur (qui je le rappelle à pour but de répondre aux requêtes HTTP des clients).</p>
<h3 id="le-controleur" tabindex="-1"><a class="header-anchor" href="#le-controleur" aria-hidden="true">#</a> Le Contrôleur:</h3>
<p>C'est la première étape, un tour dans la console / terminal pour créer notre premier contrôleur.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:controller PingPongControleur
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Laravel, viens donc de créer un nouveau fichier dans votre projet, pour l'instant celui-ci est vide (aucune méthode).</p>
<div class="custom-container tip"><p class="custom-container-title">C'est dans le terminal / console</p>
<p>Oui, c'est encore dans le terminal / console … Mais, nous gagnons du temps. Qui maitrise son clavier maitrise son ordinateur 👀.</p>
</div>
<p>Notre contrôleur va contenir <code>deux méthodes</code>, ces deux méthodes vont représenter les deux <code>routes</code> de notre application :</p>
<table>
<thead>
<tr>
<th style="text-align:center">Route</th>
<th style="text-align:center">Méthode</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code>/ping</code></td>
<td style="text-align:center"><code>ping()</code></td>
</tr>
<tr>
<td style="text-align:center"><code>/pong</code></td>
<td style="text-align:center"><code>pong()</code></td>
</tr>
</tbody>
</table>
<p>Nous allons donc devoir ajouter dans notre <code>contrôleur</code> les deux routes. Je vous laisse ouvrir le <code>PingPongControleur</code> pour y ajouter les méthodes suivantes :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'ping'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">pong</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'pong'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">[] ?</p>
<p>Vous avez oublié la signification des <code>[]</code> ? C'est « simplement » les données que nous pourrions envoyer à notre vue. Pratique !</p>
</div>
<h3 id="les-routes" tabindex="-1"><a class="header-anchor" href="#les-routes" aria-hidden="true">#</a> Les routes</h3>
<p>Nous allons maintenant ajouter les routes, pour rappel les routes sont ce qui permet aux utilisateurs d'accéder à vos contrôleurs. L'ensemble des routes sont à déclarer dans le fichier <code>routes/web.php</code>, éditer le pour y ajouter vos routes :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/ping'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'App\Http\Controllers\PingPongControleur'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'ping'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Je vous laisse écrire la seconde <code>route</code> en fonction de ce que je vous ai fourni.</p>
<div class="custom-container tip"><p class="custom-container-title">Une astuce ?</p>
<p>Vous pouvez simplement vérifier que votre route est bien prise en compte via la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan route:list
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<h3 id="les-vues" tabindex="-1"><a class="header-anchor" href="#les-vues" aria-hidden="true">#</a> Les vues</h3>
<p>Vous l'avez réalisé précédemment, je vous laisse écrire les deux <code>vue</code> / <code>layout</code>. Attention à bien hériter de votre « Layout de base » (<code>@extends('layouts.base')</code>) comme dans la précédente vue.</p>
<h2 id="la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#la-base-de-donnees" aria-hidden="true">#</a> La base de données</h2>
<p>L'avantage d'utiliser un Framework, c'est qu'il est très simple d'y intégrer la partie base de données, contrairement à un développement classique où tout est a « ré-inventer » un framework nous donne une structure / un cadre pour aller plus vite. Comme pour la création du contrôleur, la première étape va passer par de la ligne de commande.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:model Demo --migration
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette commande va créer « la définition du modèle » (le modèle la représentation objet de notre table), mais également la migration. La migration est le fichier qui va définir la structure de notre <code>Table</code>. Vous avez maintenant, dans votre projet, deux nouveaux fichiers :</p>
<ul>
<li><code>app/Models/Demo.php</code></li>
<li><code>database/migrations/YEAR_MONTH_DAY_TIME_create_demos_table.php</code></li>
</ul>
<h3 id="definir-la-migration-structure-de-la-table" tabindex="-1"><a class="header-anchor" href="#definir-la-migration-structure-de-la-table" aria-hidden="true">#</a> Définir la migration (structure de la table)</h3>
<p>Le fichier de migration défini la structure de la table que vous allez créer, actuellement vous avec un « format type », votre table va contenir de base quelques colonnes (id, et dates). Nous allons ajouter dans la méthode <code>up()</code> nos colonnes :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$table</span><span class="token operator">-></span><span class="token keyword type-declaration">string</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Je vous laisse l'ajouter avec les autres champs.</p>
<details class="custom-container details"><summary>Vous avez un doute sur comment faire ? (je vous invite vraiment à le faire sans regarder la solution)</summary>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Migrations<span class="token punctuation">\</span>Migration</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Database<span class="token punctuation">\</span>Schema<span class="token punctuation">\</span>Blueprint</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\</span>Support<span class="token punctuation">\</span>Facades<span class="token punctuation">\</span>Schema</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">CreateDemosTable</span> <span class="token keyword">extends</span> <span class="token class-name">Migration</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Run the migrations.
     *
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token keyword">void</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">up</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name static-context">Schema</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'demos'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token class-name type-declaration">Blueprint</span> <span class="token variable">$table</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token variable">$table</span><span class="token operator">-></span><span class="token function">id</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token variable">$table</span><span class="token operator">-></span><span class="token keyword type-declaration">string</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token variable">$table</span><span class="token operator">-></span><span class="token function">timestamps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Reverse the migrations.
     *
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token keyword">void</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">down</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name static-context">Schema</span><span class="token operator">::</span><span class="token function">dropIfExists</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'demos'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div></details>
<h3 id="definition-du-modele" tabindex="-1"><a class="header-anchor" href="#definition-du-modele" aria-hidden="true">#</a> Définition du modèle</h3>
<p>Vous vous en doutez, si nous avons ajouté un champ dans notre « migration » / « table », nous allons devoir l'ajouter également dans notre modèle ! Pour ça je vous laisse éditer le fichier <code>app/Models/Demo.php</code> pour y ajouter :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">protected</span> <span class="token variable">$fillable</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Avec cet ajout, nous indiquons à Laravel que nous allons avoir un champ <code>texte</code> qui pourra être assigné en automatique lors de la création d'une entrée en base de données.</p>
<div class="custom-container tip"><p class="custom-container-title">optionnel, mais intéressant !</p>
<p>Cette propriété est optionnelle, elle vous autorisera plus tard à faire du « mass-assignment » c'est-à-dire à créer un objet « Demos » depuis par exemple le POST HTTP.</p>
</div>
<h3 id="creer-reellement-vos-tables" tabindex="-1"><a class="header-anchor" href="#creer-reellement-vos-tables" aria-hidden="true">#</a> Créer réellement vos tables</h3>
<p>Maintenant que le script est terminé, nous allons indiquer à Laravel d'effectuer « la migration » c'est-à-dire de transformer votre définition PHP en instruction SQL pour créer réellement la base de données.</p>
<p>Retour dans la ligne de commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ php artisan migrate
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
Migrating: YEAR_MONTH_DAY_TIME_create_demos_table
Migrated:  YEAR_MONTH_DAY_TIME_create_demos_table
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">Un instant</p>
<p>Je vous laisse configurer votre <code>.env</code> mais également vérifier si votre base de données fonctionne correctement (création etc).</p>
</div>
<h3 id="requeter-votre-table" tabindex="-1"><a class="header-anchor" href="#requeter-votre-table" aria-hidden="true">#</a> Requêter votre table</h3>
<p>Pour vous montrer la simplicité de Eloquent, je vous laisse juste avec les appels de méthodes (nous avons vu ça ensemble lors du cours)</p>
<div class="custom-container danger"><p class="custom-container-title">Liste non exhaustive</p>
<p>Vous n’avez ici qu'une petite liste de ce qu'il est possible de faire. Pour voir l'ensemble, je vous suggère plutôt <a href="https://laravel.com/docs/8.x/eloquent" target="_blank" rel="noopener noreferrer">la documentation officielle<ExternalLinkIcon/></a></p>
</div>
<h4 id="obtenir-toutes-les-donnees" tabindex="-1"><a class="header-anchor" href="#obtenir-toutes-les-donnees" aria-hidden="true">#</a> Obtenir toutes les données</h4>
<p>Voilà un exemple de code pour obtenir l'ensemble des données dans la table <code>demo</code>.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$valeursEnBase</span> <span class="token operator">=</span> <span class="token class-name static-context">Demo</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="obtenir-toutes-les-donnees-avec-filtre" tabindex="-1"><a class="header-anchor" href="#obtenir-toutes-les-donnees-avec-filtre" aria-hidden="true">#</a> Obtenir toutes les données avec filtre</h4>
<p>Voilà un exemple de code pour obtenir 10 lignes de données avec un filtre et trié par <code>id</code>.</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$valeursFiltre</span> <span class="token operator">=</span> <span class="token class-name static-context">Demo</span><span class="token operator">::</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'texte'</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"YOLO"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">orderBy</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'id'</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">take</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Ce ne sont que des exemples</p>
<p>Vous avez ici des exemples, ça ne sert à rien de les prendres maintenant. Nous allons les utiliser <strong>dans votre contrôleurs</strong>.</p>
</div>
<h4 id="utiliser-les-donnees-depuis-votre-«-vue-»" tabindex="-1"><a class="header-anchor" href="#utiliser-les-donnees-depuis-votre-«-vue-»" aria-hidden="true">#</a> Utiliser les données depuis votre « vue »</h4>
<p>Et c'est tellement simple que si vous souhaitez tout récupérer pour utiliser les données il vous suffit de faire :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">listDemo</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// Retourne à l'utilisateur le template nommés « monLayout » avec dedans une variable nommé `$demos` qui contiendra l'ensemble des éléments dans la table</span>
  <span class="token comment">// Votre template devra utiliser cette variable avec par exemple un @foreach($demos as $demo) … @endforeach</span>
  <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"monLayout"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string double-quoted-string">"demos"</span> <span class="token operator">=></span> <span class="token class-name static-context">Demo</span><span class="token operator">::</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="creer-des-donnees-depuis-un-formulaire-en-post" tabindex="-1"><a class="header-anchor" href="#creer-des-donnees-depuis-un-formulaire-en-post" aria-hidden="true">#</a> Créer des données depuis un formulaire en POST</h4>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">addDemo</span><span class="token punctuation">(</span><span class="token class-name type-declaration">Request</span> <span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name static-context">Demos</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token operator">-></span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">redirect</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"/demo"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="finaliser" tabindex="-1"><a class="header-anchor" href="#finaliser" aria-hidden="true">#</a> Finaliser</h3>
<p>À partir de maintenant vous avez tout ce qu'il faut pour interroger votre base de données… Et oui c'est aussi simple que ça ! Pour la suite je vous laisse écrire le code par vous-même, mais la procédure va être la suivante :</p>
<ul>
<li>Créer un contrôleur « DemoControleur ».</li>
<li>Créer la <code>Vue</code> (template blade) associée à votre contrôleur.</li>
<li>Ajouter la route qui permettra d'accéder à cette page.</li>
<li>Ajouter une méthode qui va afficher l'ensemble des entrées présent dans votre base de données (affichage dans une <code>table</code> html).</li>
<li>Ajouter un formulaire dans votre <code>Vue</code> permettant d'ajouter des données dans la table.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Un instant</p>
<p>Nous l'avons vu en cours, la syntaxe du moteur de template blade. Ici il faudra donc bien utiliser Blade pour générer <strong>votre page</strong>, et plus particulièrement <RouterLink to="/cheatsheets/laravel/#les-directives">les directives de blades</RouterLink>. Vous allez devoir utiliser la boucle <code>Foreach</code>, la notation est rappelée dans l'aide mémoire. Mais voilà une idée de ce qu'il faudra faire :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span><span class="token punctuation">></span></span>
  @foreach($LaVariableAvecLesValeursEnBase as $unElement)
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>{{$unElement->texte}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
  @endforeach
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></div>
<div class="custom-container danger"><p class="custom-container-title">N'oubliez pas</p>
<p>Utilisez <code>@extends('layouts.base')</code> pour « hériter » de votre layout principal.</p>
</div>
<div class="custom-container danger"><p class="custom-container-title">N'oubliez pas le CSRF</p>
<p>Je vous ai parlé de la sécurité non ? Laravel intègre directement la protection anti-rejeux. Pour pouvoir valider votre formulaire, vous allez devoir intégrer dans votre formulaire une petite annotation.</p>
<p><code>@csrf</code></p>
<p>Exemple :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>POST<span class="token punctuation">"</span></span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/VOTRE-ACTIO-DEFINI-DANS-LES-ROUTES<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  @csrf

  <span class="token comment">&lt;!-- La suite de votre formulaire --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>PS: Je vous laisse constater l'impact dans le code <strong>en observant le code source via votre navigateur</strong>.</p>
<p><a href="https://laravel.com/docs/8.x/csrf" target="_blank" rel="noopener noreferrer">Plus d'information<ExternalLinkIcon/></a></p>
</div>
<h3 id="changer-l-etat-d-une-todo" tabindex="-1"><a class="header-anchor" href="#changer-l-etat-d-une-todo" aria-hidden="true">#</a> Changer l'état d'une TODO</h3>
<p>En utilisant <a href="https://cours.brosseau.ovh/cheatsheets/laravel/" target="_blank" rel="noopener noreferrer">l'aide mémoire<ExternalLinkIcon/></a> et la <a href="https://laravel.com/docs/8.x/eloquent" target="_blank" rel="noopener noreferrer">documentation de Laravel<ExternalLinkIcon/></a> ajouter :</p>
<ul>
<li>Une action permettant de marquer « comme terminer » une TODO. (l'action peut-être un lien, ou un bouton)</li>
<li>Cette action doit être mise dans le bon contrôleur</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Rappel</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Rechercher celui avec l’id 1</span>
<span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"L'ID QUE VOUS SOUHAITEZ MODIFIER"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Le passer à terminer</span>
<span class="token variable">$todo</span><span class="token operator">-></span><span class="token property">termine</span> <span class="token operator">=</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span>

<span class="token comment">// Le sauvegarder en base de données</span>
<span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="besoin-d-aide" tabindex="-1"><a class="header-anchor" href="#besoin-d-aide" aria-hidden="true">#</a> Besoin d'aide ?</h4>
<p>Je ne vais pas vous donner le code. Mais plutôt la procédure vous devez :</p>
<ul>
<li>Pour chaque ligne de votre tableau : ajouter un lien qui permettra de modifier l'état d'un élément en base. Le lien peut-être du type <code v-pre><code>/todo/terminer/{{ $unElement-&gt;id}}</code></code>.</li>
<li>Ajout d'une route permettant de faire fonctionner le lien. Exemple : <code v-pre><code>Route::get('/todo/terminer/{id}', ['App\Http\Controllers\DemoControleur', 'markAsDone']);</code></code>.</li>
<li>Ajouter la méthode <code>markAsDone</code> dans votre contrôleur <code>public function markAsDone($id)</code>, celle-ci va réaliser l'action de marquer comme « terminer » pour la TODO <code>$id</code></li>
<li>À la fin du traitement, vous devez rediriger la personne avec <code>return redirect(&quot;/demo&quot;);</code></li>
</ul>
<h3 id="supprimer-une-todo" tabindex="-1"><a class="header-anchor" href="#supprimer-une-todo" aria-hidden="true">#</a> Supprimer une TODO</h3>
<p>En utilisant <a href="https://cours.brosseau.ovh/cheatsheets/laravel/" target="_blank" rel="noopener noreferrer">l'aide mémoire<ExternalLinkIcon/></a> et la <a href="https://laravel.com/docs/8.x/eloquent" target="_blank" rel="noopener noreferrer">documentation de Laravel<ExternalLinkIcon/></a> ajouter :</p>
<ul>
<li>Une action permettant de marquer « supprimer » une TODO.</li>
<li>Cette action doit être mise dans le bon contrôleur</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Rappel</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Façon 1</span>
<span class="token comment">// Rechercher celui avec l’id 1</span>
<span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$todo</span><span class="token operator">-></span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Le supprimer</span>

<span class="token comment">// Façon 2</span>
<span class="token comment">// Le supprimer directement</span>
<span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Façon 3</span>
<span class="token comment">// En supprimer plusieurs directement</span>
<span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Façon 4</span>
<span class="token comment">// Supprimer avec une condition</span>
<span class="token class-name class-name-fully-qualified static-context">App<span class="token punctuation">\</span>TodoList</span><span class="token operator">::</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'termine'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'=='</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>N'oubliez pas la sécurité.</p>
<details class="custom-container details"><summary>Besoin d'aide ?</summary>
<p>Ici pas de code, mais la procédure sera identique à celle de l'action terminer.</p>
</details>
</div>
</div>
<p>:::</p>
<h3 id="evolution-1" tabindex="-1"><a class="header-anchor" href="#evolution-1" aria-hidden="true">#</a> Évolution 1</h3>
<p>J'aimerais que notre petit site de démonstration intègre un formulaire de contact. Je vous laisse réfléchir comment réaliser l'opération, quelques pistes pour débuter :</p>
<ul>
<li>Le formulaire doit être en HTML.</li>
<li>Les demandes faites via le formulaire doivent être sauvegardées en base de données (table spécifique, avec un id, un titre, un texte, un email et les dates).</li>
<li>L'ajout doit être fait par un modèle.</li>
<li>Vous devez créer un contrôleur spécifique pour réaliser l'opération.</li>
</ul>
<p>C'est à vous ! Je suis là si besoin 🚀.</p>
</template>
