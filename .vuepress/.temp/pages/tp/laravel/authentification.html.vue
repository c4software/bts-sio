<template><h1 id="laravel-l-authentification" tabindex="-1"><a class="header-anchor" href="#laravel-l-authentification" aria-hidden="true">#</a> Laravel &amp; l'authentification</h1>
<p>Nous avons vu dans <RouterLink to="/tp/laravel/introduction.html">le TP introduction</RouterLink> qu'il était très simple de créer un petit site avec Laravel. L'autre problème que Laravel résout « simplement » c'est la partie authentification.</p>
<p>La gestion des utilisateurs est en effet un élément complexe d'une application entre :</p>
<ul>
<li>L'authentification.</li>
<li>Limiter l'accès à certaines ressources.</li>
<li>La sécurité des mots de passe.</li>
<li>La gestion du mot de passe oubliée.</li>
<li>…</li>
</ul>
<p>Vous l'avez compris, la liste est longue… Vous pouvez évidemment tout coder vous-même! Mais nous allons le voir la force de Laravel c'est également ça, intégrer l'ensemble des briques pour une application qualitative dans les standards du marché.</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#creer-votre-projet">Créer votre projet</RouterLink></li><li><RouterLink to="#ajout-de-l-authentification">Ajout de l&#39;authentification</RouterLink><ul><li><RouterLink to="#ajout-de-la-dependance">Ajout de la dépendance</RouterLink></li><li><RouterLink to="#l-ui">L&#39;UI</RouterLink></li><li><RouterLink to="#tester-le-code">Tester le code</RouterLink></li></ul></li><li><RouterLink to="#les-«-composants-»-et-les-templates-blades">Les « Composants » et les templates blades</RouterLink><ul><li><RouterLink to="#migrer-la-page-«-»-vers-le-nouveau-systeme">Migrer la page « / » vers le nouveau système</RouterLink></li></ul></li><li><RouterLink to="#proteger-une-page">Protéger une page</RouterLink><ul><li><RouterLink to="#la-partie-publique">La partie publique</RouterLink></li><li><RouterLink to="#la-partie-privee">La partie privée</RouterLink></li><li><RouterLink to="#le-controleur">Le contrôleur</RouterLink></li><li><RouterLink to="#la-route">La route</RouterLink></li></ul></li><li><RouterLink to="#conclusion">Conclusion</RouterLink></li><li><RouterLink to="#modifier-les-informations-demandees">Modifier les informations demandées</RouterLink></li><li><RouterLink to="#acceder-aux-informations-du-connecte">Accéder aux informations du connecté</RouterLink></li><li><RouterLink to="#creer-plusieurs-enregistrements-en-base-de-donnees">Créer plusieurs enregistrements en base de données</RouterLink></li></ul></nav>
</details>
<h2 id="creer-votre-projet" tabindex="-1"><a class="header-anchor" href="#creer-votre-projet" aria-hidden="true">#</a> Créer votre projet</h2>
<p>Pour cette étape, je vous laisse suivre le début du <RouterLink to="/tp/laravel/introduction.html">précédent TP</RouterLink>.</p>
<p><strong>Attention</strong> a bien installer au moins la version &gt;8 de Laravel.</p>
<h2 id="ajout-de-l-authentification" tabindex="-1"><a class="header-anchor" href="#ajout-de-l-authentification" aria-hidden="true">#</a> Ajout de l'authentification</h2>
<p>Nous allons intégrer l'authentification en utilisant <a href="https://laravel.com/docs/8.x/starter-kits#laravel-breeze" target="_blank" rel="noopener noreferrer">Laravel Breeze<ExternalLinkIcon/></a> ce paquet <code>Composer</code> va ajouter l'ensemble des :</p>
<ul>
<li>routes</li>
<li>contrôleur</li>
<li>middleware</li>
<li>Vue (templates blades)</li>
</ul>
<p>Permettant de gérer simplement l'ensemble des problématiques.</p>
<div class="custom-container warning"><p class="custom-container-title">Nous avons deux possibilités</p>
<p>Je fais le choix de partir vers Laravel Breeze qui est plus « récente » et plus moderne que Laravel/ui ; Laravel/ui est un paquet qui fonctionne toujours avec Laravel 8, cependant celui-ci est en fin de vie… Nous partons donc vers des bases « moderne »</p>
</div>
<h3 id="ajout-de-la-dependance" tabindex="-1"><a class="header-anchor" href="#ajout-de-la-dependance" aria-hidden="true">#</a> Ajout de la dépendance</h3>
<p>L'ajout de dépendances, pour cette étape aucun problème, il suffit d'ajouter dans votre projet « breeze » dans le dossier de votre projet :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">composer</span> require laravel/breeze --dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Une fois ajoutée, nous allons devoir installer breeze pour que celui-ci active l'ensemble des fonctionnalités :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan migrate

php artisan breeze:install

php artisan migrate
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Que c'est il passé ?</p>
<p>Nous venons d'ajouter de nouvelles routes, celle-ci sont dans le dossier <code>route/auth.php</code> <strong>,mais ce n'est pas tout</strong> vous avez également maintenant l'ensemble des contrôleurs, mais également l'ensemble des <code>Layout Blade</code> nécessaires à toute la partie authentification.</p>
<p>Pour le reste c'est dans les dossiers que vous connaissez déjà.</p>
</div>
<h3 id="l-ui" tabindex="-1"><a class="header-anchor" href="#l-ui" aria-hidden="true">#</a> L'UI</h3>
<p>Si vous lancez dès maintenant votre projet via la commande <code>php artisan serve</code> vous allez voir que votre page d'accueil intègre maintenant deux nouveaux liens :</p>
<p><img src="@source/tp/laravel/ressources/laravel_auth_breeze.png" alt="Laravel Breeze"></p>
<p>Vous pouvez cliquer dès à présent sur les différents liens, <strong>cependant</strong> les fichiers que vous avez ajoutés avec Breeze reposent sur un « framework UI » autre que Bootstrap celui-ci se nomme <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind<ExternalLinkIcon/></a> l'approche de Laravel est moderne et Tailwind repose sur un concept similaire à Bootstrap, mais en ce focalisant plus sur un système de <code>class css</code> que l'on va appeler « utilitaire ».</p>
<p>Nous allons donc avoir besoin de <code>node</code>, mais surtout de <code>npm</code> pour compiler l'ensemble des ressources nécessaires au bon fonctionnement de l'interface ajouté. Si vous avez déjà pratiqué <code>node</code> et <code>npm</code> vous savez peut-être que ces outils sont plus utilisés dans le monde du JavaScript que du PHP ; rien d'étonnant dans notre cas, nous allons utilisé <code>npm</code> pour ajouter l'ensemble des dépendances UI de notre projet, mais également les « compiler » / « packager » dans un gros fichier CSS et JS pour nos clients.</p>
<div class="custom-container tip"><p class="custom-container-title">✋ Un instant !</p>
<p>Notre projet va contenir seulement Tailwind après installation, si vous souhaitez avoir également Bootstrap vous avez deux options :</p>
<ul>
<li>Ajouter les librairies Bootstrap via le CDN de votre choix.</li>
<li>Ajouter Bootstrap dans les dépendances npm de votre projet. (à faire via le <code>package.json</code> et <code>webpack.mix.js</code>, attention c'est plus complexe)</li>
</ul>
</div>
<p>Pour installer puis « compiler » vos ressources, il va falloir entrer les commandes suivantes dans le dossier de votre projet :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> run dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Vous êtes sur un lecteur réseau ?</p>
<p>Attention, si vous êtes sur un lecteur réseau ça va être long… Très long ! Je vous conseille vivement de passer via un développement en local.</p>
</div>
<p>Une fois le processus terminé, vous devriez avoir un résultat comme celui-ci :</p>
<p><img src="@source/tp/laravel/ressources/mix.png" alt="Laravel Mix"></p>
<p>Vos pages d'authentification sont maintenant fonctionnelles, votre site intègre maintenant toute la mécanique permettant de gérer cette problématique.</p>
<p>Exemple :</p>
<p><img src="@source/tp/laravel/ressources/breeze_create_account.png" alt="Laravel Breeze Create Account"></p>
<div class="custom-container tip"><p class="custom-container-title">Petit point important</p>
<p>Laravel Breeze est intéressant, car il ne cache pas le code <strong>l'ensemble des éléments sont accessibles</strong> vous pouvez modifier le code fourni aucun problème ! C'est d'ailleurs ce que nous allons faire.</p>
</div>
<h3 id="tester-le-code" tabindex="-1"><a class="header-anchor" href="#tester-le-code" aria-hidden="true">#</a> Tester le code</h3>
<p>Vous avez normalement tout suivi, votre site est donc fonctionnel ! Avant d'aller plus loin, je vous laisse tester l'ensemble de votre site.</p>
<ul>
<li>Home.</li>
<li>Création de comptes.</li>
<li>Connexion.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Avant d'aller plus loin</p>
<p>Regarder également les templates, les règles de validation de saisie présente dans les contrôleurs, bref tout ce que vous avez pu installer de manière automatique !</p>
</div>
<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/YWy93Zf9eW8RMlK0gK" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
<h2 id="les-«-composants-»-et-les-templates-blades" tabindex="-1"><a class="header-anchor" href="#les-«-composants-»-et-les-templates-blades" aria-hidden="true">#</a> Les « Composants » et les templates blades</h2>
<p>Si vous avez regardé l'ensemble du code, vous noterez une syntaxe un peu particulière dans les templates Blades ; celle-ci vous permet de créer des composants, mais également des templates de base (ce sont les <code>x-</code> quelque chose dans le code blade).</p>
<p>Tout est déjà configuré, vous pouvez dès à présent l'utiliser, mais également créer de nouveau composant en ajoutant les fichiers <code>blade</code> dans <code>views/components/</code></p>
<p><a href="https://laravel.com/docs/8.x/blade#rendering-components" target="_blank" rel="noopener noreferrer">Pour plus d'information, rendez-vous ici<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">Nous avons vu la dernière fois, l'héritage</p>
<p>Nous avions vu la dernière fois <a href="https://laravel.com/docs/8.x/blade#layouts-using-template-inheritance" target="_blank" rel="noopener noreferrer">l'héritage de template<ExternalLinkIcon/></a> et bien la c'est là mêmes choses, mais via un système de « composant » très à la mode en ce moment.</p>
</div>
<p>👋 Regardons ensemble comment ça fonctionne ! (vous pouvez m'appeler)</p>
<details class="custom-container details"><summary>Pour résumer</summary>
<p>Le système de composant va vous permettre :</p>
<ul>
<li>De rendre générique un morceau de code que vous utilisez plusieurs fois dans votre projet.</li>
<li>Penser composant plutôt que HTML copié depuis Internet.</li>
<li>Rendre « générique les layouts » pour les partager entre les pages.</li>
</ul>
</details>
<h3 id="migrer-la-page-«-»-vers-le-nouveau-systeme" tabindex="-1"><a class="header-anchor" href="#migrer-la-page-«-»-vers-le-nouveau-systeme" aria-hidden="true">#</a> Migrer la page « / » vers le nouveau système</h3>
<p>Le nouveau système de template est très très sympa, il permet de découper son travail pour sortir les parties génériques dans un « layouts » partageables entre toutes vos pages. Par exemple :</p>
<p><img src="@source/tp/laravel/ressources/parties.png" alt="Différentes parties"></p>
<div class="custom-container tip"><p class="custom-container-title">Hey toi lecteur ! Stop !</p>
<p>L'organisation est tout aussi importante que le code, tu peux copier-coller du code entre tous les templates oui… Mais sache que c'est pas efficace, que tu perds du temps et que si on te demande une modification <strong>tu perdras du temps</strong> !</p>
<p>Prendre du temps pour utiliser le système de layout tels proposé par Laravel est un vrai gain de temps ! Le toi du futur te remercies d'avance.</p>
<p>Promis, ça va bien se passer !</p>
</div>
<p>Avec le Scaffolding de Breeze nous avons à notre disposition <strong>deux templates</strong> :</p>
<ul>
<li><code>app.blade.php</code> pour les clients <strong>connectés</strong>. Accessible dans votre template via <code>&lt;x-app-layout&gt;</code></li>
<li><code>guest.blade.php</code> pour les clients <strong>non connectés</strong>. Accessible dans votre template via <code>&lt;x-guest-layout&gt;</code></li>
</ul>
<p>Nous allons donc migrer notre page d'accueil pour utiliser le nouveau système de composant. Pour ça rien de plus simple, il nous suffit d'utiliser <code>&lt;x-guest-layout&gt;</code> dans le template <code>welcome.blade.php</code>, je vous laisse le faire celui-ci va remplacer l'ensemble du haut de notre html jusqu'au <code>&lt;body&gt;</code> ce qui va donner :</p>
<details class="custom-container details"><summary>Afficher le code du `welcome.blade.php`</summary>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>x-guest-layout</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0<span class="token punctuation">"</span></span>
  <span class="token punctuation">></span></span>
    @if (Route::has('login'))
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hidden fixed top-0 right-0 px-6 py-4 sm:block<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      @auth
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ url(<span class="token punctuation">'</span>/dashboard<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text-sm text-gray-700 underline<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>Dashboard<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
      <span class="token punctuation">></span></span>
      @else
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ route(<span class="token punctuation">'</span>login<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text-sm text-gray-700 underline<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>Log in<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
      <span class="token punctuation">></span></span>

      @if (Route::has('register'))
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span>
        <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ route(<span class="token punctuation">'</span>register<span class="token punctuation">'</span>) }}<span class="token punctuation">"</span></span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-4 text-sm text-gray-700 underline<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>Register<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
      <span class="token punctuation">></span></span>
      @endif @endauth
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    @endif

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>max-w-6xl mx-auto sm:px-6 lg:px-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex justify-center pt-8 sm:justify-start sm:pt-0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
          <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 651 192<span class="token punctuation">"</span></span>
          <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span>
          <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>h-16 w-auto text-gray-700 sm:h-20<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>g</span> <span class="token attr-name">clip-path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url(#clip0)<span class="token punctuation">"</span></span> <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#EF3B2D<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span>
              <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M248.032 44.676h-16.466v100.23h47.394v-14.748h-30.928V44.676zM337.091 87.202c-2.101-3.341-5.083-5.965-8.949-7.875-3.865-1.909-7.756-2.864-11.669-2.864-5.062 0-9.69.931-13.89 2.792-4.201 1.861-7.804 4.417-10.811 7.661-3.007 3.246-5.347 6.993-7.016 11.239-1.672 4.249-2.506 8.713-2.506 13.389 0 4.774.834 9.26 2.506 13.459 1.669 4.202 4.009 7.925 7.016 11.169 3.007 3.246 6.609 5.799 10.811 7.66 4.199 1.861 8.828 2.792 13.89 2.792 3.913 0 7.804-.955 11.669-2.863 3.866-1.908 6.849-4.533 8.949-7.875v9.021h15.607V78.182h-15.607v9.02zm-1.431 32.503c-.955 2.578-2.291 4.821-4.009 6.73-1.719 1.91-3.795 3.437-6.229 4.582-2.435 1.146-5.133 1.718-8.091 1.718-2.96 0-5.633-.572-8.019-1.718-2.387-1.146-4.438-2.672-6.156-4.582-1.719-1.909-3.032-4.152-3.938-6.73-.909-2.577-1.36-5.298-1.36-8.161 0-2.864.451-5.585 1.36-8.162.905-2.577 2.219-4.819 3.938-6.729 1.718-1.908 3.77-3.437 6.156-4.582 2.386-1.146 5.059-1.718 8.019-1.718 2.958 0 5.656.572 8.091 1.718 2.434 1.146 4.51 2.674 6.229 4.582 1.718 1.91 3.054 4.152 4.009 6.729.953 2.577 1.432 5.298 1.432 8.162-.001 2.863-.479 5.584-1.432 8.161zM463.954 87.202c-2.101-3.341-5.083-5.965-8.949-7.875-3.865-1.909-7.756-2.864-11.669-2.864-5.062 0-9.69.931-13.89 2.792-4.201 1.861-7.804 4.417-10.811 7.661-3.007 3.246-5.347 6.993-7.016 11.239-1.672 4.249-2.506 8.713-2.506 13.389 0 4.774.834 9.26 2.506 13.459 1.669 4.202 4.009 7.925 7.016 11.169 3.007 3.246 6.609 5.799 10.811 7.66 4.199 1.861 8.828 2.792 13.89 2.792 3.913 0 7.804-.955 11.669-2.863 3.866-1.908 6.849-4.533 8.949-7.875v9.021h15.607V78.182h-15.607v9.02zm-1.432 32.503c-.955 2.578-2.291 4.821-4.009 6.73-1.719 1.91-3.795 3.437-6.229 4.582-2.435 1.146-5.133 1.718-8.091 1.718-2.96 0-5.633-.572-8.019-1.718-2.387-1.146-4.438-2.672-6.156-4.582-1.719-1.909-3.032-4.152-3.938-6.73-.909-2.577-1.36-5.298-1.36-8.161 0-2.864.451-5.585 1.36-8.162.905-2.577 2.219-4.819 3.938-6.729 1.718-1.908 3.77-3.437 6.156-4.582 2.386-1.146 5.059-1.718 8.019-1.718 2.958 0 5.656.572 8.091 1.718 2.434 1.146 4.51 2.674 6.229 4.582 1.718 1.91 3.054 4.152 4.009 6.729.953 2.577 1.432 5.298 1.432 8.162 0 2.863-.479 5.584-1.432 8.161zM650.772 44.676h-15.606v100.23h15.606V44.676zM365.013 144.906h15.607V93.538h26.776V78.182h-42.383v66.724zM542.133 78.182l-19.616 51.096-19.616-51.096h-15.808l25.617 66.724h19.614l25.617-66.724h-15.808zM591.98 76.466c-19.112 0-34.239 15.706-34.239 35.079 0 21.416 14.641 35.079 36.239 35.079 12.088 0 19.806-4.622 29.234-14.688l-10.544-8.158c-.006.008-7.958 10.449-19.832 10.449-13.802 0-19.612-11.127-19.612-16.884h51.777c2.72-22.043-11.772-40.877-33.023-40.877zm-18.713 29.28c.12-1.284 1.917-16.884 18.589-16.884 16.671 0 18.697 15.598 18.813 16.884h-37.402zM184.068 43.892c-.024-.088-.073-.165-.104-.25-.058-.157-.108-.316-.191-.46-.056-.097-.137-.176-.203-.265-.087-.117-.161-.242-.265-.345-.085-.086-.194-.148-.29-.223-.109-.085-.206-.182-.327-.252l-.002-.001-.002-.002-35.648-20.524a2.971 2.971 0 00-2.964 0l-35.647 20.522-.002.002-.002.001c-.121.07-.219.167-.327.252-.096.075-.205.138-.29.223-.103.103-.178.228-.265.345-.066.089-.147.169-.203.265-.083.144-.133.304-.191.46-.031.085-.08.162-.104.25-.067.249-.103.51-.103.776v38.979l-29.706 17.103V24.493a3 3 0 00-.103-.776c-.024-.088-.073-.165-.104-.25-.058-.157-.108-.316-.191-.46-.056-.097-.137-.176-.203-.265-.087-.117-.161-.242-.265-.345-.085-.086-.194-.148-.29-.223-.109-.085-.206-.182-.327-.252l-.002-.001-.002-.002L40.098 1.396a2.971 2.971 0 00-2.964 0L1.487 21.919l-.002.002-.002.001c-.121.07-.219.167-.327.252-.096.075-.205.138-.29.223-.103.103-.178.228-.265.345-.066.089-.147.169-.203.265-.083.144-.133.304-.191.46-.031.085-.08.162-.104.25-.067.249-.103.51-.103.776v122.09c0 1.063.568 2.044 1.489 2.575l71.293 41.045c.156.089.324.143.49.202.078.028.15.074.23.095a2.98 2.98 0 001.524 0c.069-.018.132-.059.2-.083.176-.061.354-.119.519-.214l71.293-41.045a2.971 2.971 0 001.489-2.575v-38.979l34.158-19.666a2.971 2.971 0 001.489-2.575V44.666a3.075 3.075 0 00-.106-.774zM74.255 143.167l-29.648-16.779 31.136-17.926.001-.001 34.164-19.669 29.674 17.084-21.772 12.428-43.555 24.863zm68.329-76.259v33.841l-12.475-7.182-17.231-9.92V49.806l12.475 7.182 17.231 9.92zm2.97-39.335l29.693 17.095-29.693 17.095-29.693-17.095 29.693-17.095zM54.06 114.089l-12.475 7.182V46.733l17.231-9.92 12.475-7.182v74.537l-17.231 9.921zM38.614 7.398l29.693 17.095-29.693 17.095L8.921 24.493 38.614 7.398zM5.938 29.632l12.475 7.182 17.231 9.92v79.676l.001.005-.001.006c0 .114.032.221.045.333.017.146.021.294.059.434l.002.007c.032.117.094.222.14.334.051.124.088.255.156.371a.036.036 0 00.004.009c.061.105.149.191.222.288.081.105.149.22.244.314l.008.01c.084.083.19.142.284.215.106.083.202.178.32.247l.013.005.011.008 34.139 19.321v34.175L5.939 144.867V29.632h-.001zm136.646 115.235l-65.352 37.625V148.31l48.399-27.628 16.953-9.677v33.862zm35.646-61.22l-29.706 17.102V66.908l17.231-9.92 12.475-7.182v33.841z<span class="token punctuation">"</span></span>
            <span class="token punctuation">/></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>g</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg<span class="token punctuation">"</span></span>
      <span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>grid grid-cols-1 md:grid-cols-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p-6<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex items-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
                <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-linecap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-linejoin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span>
                <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 24 24<span class="token punctuation">"</span></span>
                <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>w-8 h-8 text-gray-500<span class="token punctuation">"</span></span>
              <span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span>
                  <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253<span class="token punctuation">"</span></span>
                <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-4 text-lg leading-7 font-semibold<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span>
                  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel.com/docs<span class="token punctuation">"</span></span>
                  <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline text-gray-900 dark:text-white<span class="token punctuation">"</span></span>
                  <span class="token punctuation">></span></span>Documentation<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
                <span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-12<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mt-2 text-gray-600 dark:text-gray-400 text-sm<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                Laravel has wonderful, thorough documentation covering every
                aspect of the framework. Whether you are new to the framework or
                have previous experience with Laravel, we recommend reading all
                of the documentation from beginning to end.
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
            <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p-6 border-t border-gray-200 dark:border-gray-700 md:border-t-0 md:border-l<span class="token punctuation">"</span></span>
          <span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex items-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
                <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-linecap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-linejoin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span>
                <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 24 24<span class="token punctuation">"</span></span>
                <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>w-8 h-8 text-gray-500<span class="token punctuation">"</span></span>
              <span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span>
                  <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z<span class="token punctuation">"</span></span>
                <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M15 13a3 3 0 11-6 0 3 3 0 016 0z<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-4 text-lg leading-7 font-semibold<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span>
                  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laracasts.com<span class="token punctuation">"</span></span>
                  <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline text-gray-900 dark:text-white<span class="token punctuation">"</span></span>
                  <span class="token punctuation">></span></span>Laracasts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
                <span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-12<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mt-2 text-gray-600 dark:text-gray-400 text-sm<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                Laracasts offers thousands of video tutorials on Laravel, PHP,
                and JavaScript development. Check them out, see for yourself,
                and massively level up your development skills in the process.
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p-6 border-t border-gray-200 dark:border-gray-700<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex items-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
                <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-linecap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-linejoin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span>
                <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 24 24<span class="token punctuation">"</span></span>
                <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>w-8 h-8 text-gray-500<span class="token punctuation">"</span></span>
              <span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span>
                  <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z<span class="token punctuation">"</span></span>
                <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-4 text-lg leading-7 font-semibold<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span>
                  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel-news.com/<span class="token punctuation">"</span></span>
                  <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline text-gray-900 dark:text-white<span class="token punctuation">"</span></span>
                  <span class="token punctuation">></span></span>Laravel News<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
                <span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-12<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mt-2 text-gray-600 dark:text-gray-400 text-sm<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                Laravel News is a community driven portal and newsletter
                aggregating all of the latest and most important news in the
                Laravel ecosystem, including new package releases and tutorials.
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
            <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p-6 border-t border-gray-200 dark:border-gray-700 md:border-l<span class="token punctuation">"</span></span>
          <span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex items-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
                <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-linecap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-linejoin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
                <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span>
                <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 24 24<span class="token punctuation">"</span></span>
                <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>w-8 h-8 text-gray-500<span class="token punctuation">"</span></span>
              <span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span>
                  <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z<span class="token punctuation">"</span></span>
                <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
                <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-4 text-lg leading-7 font-semibold text-gray-900 dark:text-white<span class="token punctuation">"</span></span>
              <span class="token punctuation">></span></span>
                Vibrant Ecosystem
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-12<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mt-2 text-gray-600 dark:text-gray-400 text-sm<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                Laravel's robust library of first-party tools and libraries,
                such as
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://forge.laravel.com<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Forge<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>,
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://vapor.laravel.com<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Vapor<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>,
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://nova.laravel.com<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Nova<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>,
                and
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://envoyer.io<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Envoyer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span> help
                you take your projects to the next level. Pair them with
                powerful open source libraries like
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel.com/docs/billing<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span>
                  <span class="token punctuation">></span></span>Cashier<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
                <span class="token punctuation">></span></span>,
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel.com/docs/dusk<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span>
                  <span class="token punctuation">></span></span>Dusk<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
                <span class="token punctuation">></span></span>,
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span>
                  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel.com/docs/broadcasting<span class="token punctuation">"</span></span>
                  <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span>
                  <span class="token punctuation">></span></span>Echo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
                <span class="token punctuation">></span></span>,
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel.com/docs/horizon<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span>
                  <span class="token punctuation">></span></span>Horizon<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
                <span class="token punctuation">></span></span>,
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel.com/docs/sanctum<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span>
                  <span class="token punctuation">></span></span>Sanctum<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
                <span class="token punctuation">></span></span>,
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel.com/docs/telescope<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>underline<span class="token punctuation">"</span></span>
                  <span class="token punctuation">></span></span>Telescope<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span>
                <span class="token punctuation">></span></span>, and more.
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex justify-center mt-4 sm:items-center sm:justify-between<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text-center text-sm text-gray-500 sm:text-left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>flex items-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
              <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span>
              <span class="token attr-name">stroke-linecap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
              <span class="token attr-name">stroke-linejoin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
              <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span>
              <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 24 24<span class="token punctuation">"</span></span>
              <span class="token attr-name">stroke</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span>
              <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>-mt-px w-5 h-5 text-gray-400<span class="token punctuation">"</span></span>
            <span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span>
                <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z<span class="token punctuation">"</span></span>
              <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://laravel.bigcartel.com<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-1 underline<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
              Shop
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span>
              <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span>
              <span class="token attr-name">stroke</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span>
              <span class="token attr-name">stroke-linecap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
              <span class="token attr-name">stroke-linejoin</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>round<span class="token punctuation">"</span></span>
              <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span>
              <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 24 24<span class="token punctuation">"</span></span>
              <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-4 -mt-px w-5 h-5 text-gray-400<span class="token punctuation">"</span></span>
            <span class="token punctuation">></span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span>
                <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z<span class="token punctuation">"</span></span>
              <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>

            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span>
              <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://github.com/sponsors/taylorotwell<span class="token punctuation">"</span></span>
              <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-1 underline<span class="token punctuation">"</span></span>
            <span class="token punctuation">></span></span>
              Sponsor
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
          Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{
          PHP_VERSION }})
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>x-guest-layout</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br></div></div></details>
<p>⚠️ Je vous laisse constater la différence.</p>
<div class="custom-container danger"><p class="custom-container-title">À partir de maintenant</p>
<p>J'espère qu'à partir de maintenant, vous allez utiliser le système de template ! Je vous encourage vivement à le faire.</p>
</div>
<h2 id="proteger-une-page" tabindex="-1"><a class="header-anchor" href="#proteger-une-page" aria-hidden="true">#</a> Protéger une page</h2>
<p>Le but de l'authentification est donc de limiter l'accès à certaines pages vous l'avez bien compris… Sauf que pour l'instant nous n'avons pas encore vu comment le faire sur les pages que nous souhaitons protéger !</p>
<p>Nous allons créer un contrôleur fictif, celui-ci vous nous permettre de tester la protection.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>php artisan make:controller YoloControler
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vous venez de créer un contrôleur vide. En reprenant si nécessaire les exemples du premier TP, je vous laisse créer dedans :</p>
<table>
<thead>
<tr>
<th style="text-align:left">Route</th>
<th style="text-align:left">Méthode</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>/yolo</code></td>
<td style="text-align:left"><code>publicView()</code></td>
</tr>
<tr>
<td style="text-align:left"><code>/yolo-connected</code></td>
<td style="text-align:left"><code>privateView()</code></td>
</tr>
</tbody>
</table>
<h3 id="la-partie-publique" tabindex="-1"><a class="header-anchor" href="#la-partie-publique" aria-hidden="true">#</a> La partie publique</h3>
<p>Pour la partie publique (non connecté), pas rapport à précédemment :</p>
<ul>
<li>Une méthode <code>publicView</code>, celle-ci doit retourner une <code>view</code> qui affichera pour l'instant <code>Bonjour non connecté</code>. Attention ! Cette vue doit utiliser le template <code>&lt;x-guest-layout&gt;</code></li>
<li>Ajouter cette route dans le fichier <code>routes/web.php</code>.</li>
</ul>
<details class="custom-container details"><summary>Besoin d'aide ?</summary>
<p>Avez-vous bien cherché ?</p>
<p>Je vous aide pour la partie route :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/yolo'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'App\Http\Controllers\YoloControler'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'publicView'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Je vous aide pour la partie méthode :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>    <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"yolo.publicView"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></details>
<p>Nous avons le temps, n'hésitez pas à :</p>
<ul>
<li>Créer des composants si nécessaire.</li>
<li>Utiliser les class de Tailwind (vous avez même de la complétion dans PhpStorm).</li>
</ul>
<p>Pour ma part voilà mon rendu :</p>
<p><img src="@source/tp/laravel/ressources/resultat-valentin.png" alt="Résultat Valentin"></p>
<details class="custom-container details"><summary>Vous voulez-voir mon template ?</summary>
<p>Est-ce vraiment une bonne idée ? Je vous encourage vraiment à faire le vôtre, d'autant plus que j'ai décidé de créer un composant nommé <code>card.blade.php</code> dans la partie composant. Mais voilà mon code :</p>
<p><em>resources/views/yolo/publicView.blade.php:</em></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>x-guest-layout</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>x-card</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text-center font-bold text-indigo-600<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Bonjour à toi 👋<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>x-card</span><span class="token punctuation">></span></span>
&lt;/x-guest-layout
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></details>
<p>Je vous laisse coder votre version.</p>
<h3 id="la-partie-privee" tabindex="-1"><a class="header-anchor" href="#la-partie-privee" aria-hidden="true">#</a> La partie privée</h3>
<p>Pour la partie privée, je vous laisse gérer l'ensemble de la base :</p>
<ul>
<li>Création de la méthode.</li>
<li>Création du template. Attention cette fois-ci nous allons utiliser le composant <code>&lt;x-app-layout&gt;</code> qui contient toute la logique de la partie « information de connexion » (menu, etc.).</li>
</ul>
<h4 id="le-layout" tabindex="-1"><a class="header-anchor" href="#le-layout" aria-hidden="true">#</a> Le Layout</h4>
<p>Pour le layout j'ai décidé de le nommer <code>privateView.blade.php</code> et de le mettre ici : <code>resources/views/yolo/privateView.blade.php</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>x-app-layout</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>x-slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>font-semibold text-xl text-gray-800 leading-tight<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>x-slot</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p-5<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text-center font-bold text-indigo-600<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      Bonjour {{Auth::user()->name}} 👋
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>x-app-layout</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="le-controleur" tabindex="-1"><a class="header-anchor" href="#le-controleur" aria-hidden="true">#</a> Le contrôleur</h3>
<p>Pour le contrôleur, je vous laisse ajouter la méthode <code>privateView</code> comme demandé dans le tableau plus haut :</p>
<details class="custom-container details"><summary>Dans mon cas ça donne</summary>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">privateView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">view</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"yolo.privateView"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></details>
<h3 id="la-route" tabindex="-1"><a class="header-anchor" href="#la-route" aria-hidden="true">#</a> La route</h3>
<p>C'est la partie qui nous intéresse… Vous avez remarqué que dans les lignes précédentes, nous n'avons jamais parlé de l'authentification. Comment alors est-ce possible que la page ne soit accessible qu'aux gens connectés ?</p>
<p>Et bien … C'est simple ! Quand vous avez installé <code>breeze</code> vous avez également ajouté des <code>Middleware</code>, un middleware est un morceau de code qui va intercepter la demande initiale pour faire des contrôles supplémentaires. Dans notre cas le contrôle en plus va être « Est-ce que l'utilisateur est connecté » :</p>
<p><img src="@source/tp/laravel/ressources/auth-logic.png" alt="Logique d'authentification"></p>
<p>Nous allons donc ajouter dans le fichier <code>routes/web.php</code></p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Route</span><span class="token operator">::</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'/yolo-connected'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string single-quoted-string">'App\Http\Controllers\YoloControler'</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">'privateView'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">middleware</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'auth'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">name</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"yoloPrivate"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Noter l'ajout du middleware <code>auth</code>.</p>
<p>Voilà le résultat pour moi</p>
<p><img src="@source/tp/laravel/ressources/resultat-valentin-private.png" alt="Résultat Valentin partie privée"></p>
<p>⚠️ Je vous laisse implémenter la partie privée dans votre code. ⚠️</p>
<div class="custom-container danger"><p class="custom-container-title">Un instant !</p>
<p>Vous noterez que dans ma version j'ai un menu avec un lien vers ma page… Pas de magie ! J'ai ajouté le code nécessaire dans le fichier <code>resources/views/layouts/navigation.blade.php</code></p>
<p>Dans la partie « Navigation Link » :</p>
<p><img src="@source/tp/laravel/ressources/navigation-links.png" alt="Navigation Links"></p>
</div>
<h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2>
<p>Nous avons fait le tour de la base de ce qu'il faut savoir. Cependant le TP continue sur deux éléments qui peuvent être intéressants pour vous à la suite de cette conclusion.</p>
<div class="custom-container tip"><p class="custom-container-title">Le code entier, mais uniquement si vous le demandez</p>
<p>Vous souhaitez voir mon code ? <a href="https://github.com/c4software/laravel-auth-student" target="_blank" rel="noopener noreferrer">J'ai un repository privé si nécessaire<ExternalLinkIcon/></a></p>
</div>
<h2 id="modifier-les-informations-demandees" tabindex="-1"><a class="header-anchor" href="#modifier-les-informations-demandees" aria-hidden="true">#</a> Modifier les informations demandées</h2>
<p>En reprenant ce que nous avons fait précédemment, je vous laisse modifier la structure de la base de données pour ajouter dans la table <code>users</code> un nouveau champ nommé par exemple <code>pseudo</code>.</p>
<ul>
<li>Ajouter la colonne en base</li>
<li>Modifier le formulaire de création de comptes <code>resources/views/auth/register.blade.php</code> pour ajouter le champ dans le formulaire.</li>
<li>Modifier le modèle <code>app/Models/User.php</code> pour ajouter dans les <code>$fillable</code> le nouveau champ.</li>
<li>Modifier le contrôleur pour sauvegarder la nouvelle valeur. (méthode <code>store</code> dans <code>app/Http/Controllers/Auth/RegisteredUserController.php</code>)</li>
</ul>
<h2 id="acceder-aux-informations-du-connecte" tabindex="-1"><a class="header-anchor" href="#acceder-aux-informations-du-connecte" aria-hidden="true">#</a> Accéder aux informations du connecté</h2>
<p>Nous l'avons fait dans notre exemple de contrôleur, mais, si vous ne l'aviez pas compris :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>{{Auth::user()->name}}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="creer-plusieurs-enregistrements-en-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#creer-plusieurs-enregistrements-en-base-de-donnees" aria-hidden="true">#</a> Créer plusieurs enregistrements en base de données</h2>
<p>Le but de Breeze est de vous permettre de modifier le code « préfourni » c'est ce que l'on appelle du Scaffolding, nous allons donc en profiter pour modifier son comportement afin de créer lors de l'ajout d'utilisateur une autre entrée en base de données, par exemple une <code>personne</code>.</p>
<ul>
<li>Créer la migration ainsi que le modèle. <code>php artisan make:model Personne --migration</code></li>
<li>Renseigner les champs dans votre migration <strong>,mais également</strong> dans le modèle.</li>
<li>Lancer la migration <code>php artisan migrate</code></li>
<li>Modifier le code de la méthode <code>store</code> dans le contrôleur <code>app/Http/Controllers/Auth/RegisteredUserController.php</code> pour ajouter également un utilisateur :</li>
</ul>
<p>Exemple dans mon cas :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token class-name static-context">Personne</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token string single-quoted-string">'name'</span> <span class="token operator">=></span> <span class="token variable">$request</span><span class="token operator">-></span><span class="token property">name</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">'userId'</span> <span class="token operator">=></span> <span class="token variable">$user</span><span class="token operator">-></span><span class="token property">id</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Et voilà nous avons maintenant une méthode de « Création d'un utilisateur » qui ajoute également une personne.</p>
<div class="custom-container tip"><p class="custom-container-title">C'est bien évidement un exemple</p>
<p>Je vous laisse l'implémenter… Cependant vous comprenez bien que c'est évidemment un exemple !</p>
</div>
</template>
