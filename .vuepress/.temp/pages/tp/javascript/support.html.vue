<template><h1 id="complement-du-cours-javascript" tabindex="-1"><a class="header-anchor" href="#complement-du-cours-javascript" aria-hidden="true">#</a> Complément du cours JavaScript</h1>
<p>Ce document est un complément du cours. Il vous permettra de revenir sur les différentes notions avec différents exemples.</p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#le-fonctionnement">Le fonctionnement</RouterLink><ul><li><RouterLink to="#moteur-javascript">Moteur JavaScript</RouterLink></li><li><RouterLink to="#pourquoi-le-javascript-est-il-donc-incontournable">Pourquoi le JavaScript est-il donc incontournable.</RouterLink></li></ul></li><li><RouterLink to="#les-navigateurs">Les navigateurs</RouterLink></li><li><RouterLink to="#librairies-or-not">Librairies or not ?</RouterLink></li><li><RouterLink to="#les-animations">Les animations</RouterLink></li><li><RouterLink to="#javascript-do-you-speak-javascript">JavaScript do you speak JavaScript ?</RouterLink></li><li><RouterLink to="#les-outils-du-developpeur">Les outils du développeur</RouterLink><ul><li><RouterLink to="#les-ide">Les IDE</RouterLink></li><li><RouterLink to="#la-console">La console</RouterLink></li></ul></li><li><RouterLink to="#votre-premier-hello-world">Votre premier Hello World</RouterLink><ul><li><RouterLink to="#mise-en-pratique">Mise en pratique</RouterLink></li></ul></li><li><RouterLink to="#plusieurs-lignes">Plusieurs lignes ?</RouterLink></li><li><RouterLink to="#les-commentaires">Les commentaires</RouterLink></li><li><RouterLink to="#les-variables">Les variables</RouterLink><ul><li><RouterLink to="#les-variables-1">Les variables</RouterLink></li><li><RouterLink to="#les-constantes">Les constantes</RouterLink></li><li><RouterLink to="#les-types">Les types</RouterLink></li><li><RouterLink to="#a-faire">À faire</RouterLink></li></ul></li><li><RouterLink to="#manipuler-les-donnees">Manipuler les données</RouterLink><ul><li><RouterLink to="#les-conditions">Les conditions</RouterLink></li><li><RouterLink to="#les-boucles">Les boucles</RouterLink></li><li><RouterLink to="#les-fonctions">Les fonctions</RouterLink></li><li><RouterLink to="#a-faire-1">À faire</RouterLink></li></ul></li><li><RouterLink to="#manipuler-le-html-et-la-css">Manipuler le HTML et la CSS</RouterLink><ul><li><RouterLink to="#creer-des-elements-dans-la-page">Créer des éléments dans la page</RouterLink></li><li><RouterLink to="#le-dom">Le DOM</RouterLink></li><li><RouterLink to="#exemple-de-creation-d-elements">Exemple de création d&#39;éléments</RouterLink></li><li><RouterLink to="#exemple-de-creation-d-elements-version-alternative">Exemple de création d&#39;éléments version alternative</RouterLink></li><li><RouterLink to="#les-selecteurs">Les sélecteurs</RouterLink></li><li><RouterLink to="#les-selecteurs-et-jquery">Les sélecteurs et jQuery</RouterLink></li><li><RouterLink to="#utiliser-le-resultat-d-un-selecteur">Utiliser le résultat d&#39;un sélecteur</RouterLink></li><li><RouterLink to="#jouer-sur-la-visibilite">Jouer sur la visibilité</RouterLink></li><li><RouterLink to="#une-petite-mise-en-pratique-simple">Une petite mise en pratique simple</RouterLink></li><li><RouterLink to="#mise-en-pratique-1">Mise en pratique</RouterLink></li></ul></li><li><RouterLink to="#obtenir-les-valeurs-d-un-input">Obtenir les valeurs d&#39;un input</RouterLink></li><li><RouterLink to="#les-evenements">Les évènements</RouterLink><ul><li><RouterLink to="#dans-le-dom">Dans le DOM</RouterLink></li><li><RouterLink to="#en-javascript">En JavaScript</RouterLink></li></ul></li><li><RouterLink to="#mise-en-pratique-2">Mise en pratique</RouterLink></li><li><RouterLink to="#l-ajax">L&#39;Ajax</RouterLink><ul><li><RouterLink to="#l-asynchrone-c-est-quoi">L&#39;asynchrone c&#39;est quoi ?</RouterLink></li><li><RouterLink to="#charger-du-contenu-«-a-la-demande-»">Charger du contenu « à la demande »</RouterLink></li><li><RouterLink to="#mettre-en-pratique-l-ajax">Mettre en pratique l&#39;Ajax</RouterLink></li></ul></li><li><RouterLink to="#allons-un-peu-plus-loin">Allons un peu plus loin</RouterLink><ul><li><RouterLink to="#se-«-balader-»-dans-le-dom">Se « balader » dans le DOM</RouterLink></li><li><RouterLink to="#les-selecteurs-jquery-«-avances-»">Les sélecteurs jQuery « avancés »</RouterLink></li><li><RouterLink to="#l-inspecteur-d-elements">L&#39;inspecteur d&#39;éléments</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Le JavaScript… Vous allez l'aimer… Ou le détester ! Mais en tout cas c'est l'incontournable du développeur Web. Le JavaScript est maintenant partout, dans votre navigateur bien évidemment, mais également sur nos serveurs, mais aussi dans nos applications! Bref il est littéralement partout.</p>
<p>Dans ce cours nous allons voir les bases du JavaScript, nous ne reverrons pas ici <RouterLink to="/tp/php/support.html">les bases du développement comme ce que nous avons fait en PHP</RouterLink>.</p>
<p><img src="@source/tp/javascript/res/logo.svg" alt="Logo JavaScript"></p>
<div class="custom-container warning"><p class="custom-container-title">Prérequis</p>
<p>Le cours fait référence à des notions de programmation orientée-objet, je ne couvrirais pas les bases de la programmation objet.</p>
</div>
<h2 id="le-fonctionnement" tabindex="-1"><a class="header-anchor" href="#le-fonctionnement" aria-hidden="true">#</a> Le fonctionnement</h2>
<p>Le JavaScript est un langage de programmation relativement récent il date de <strong>1994</strong>. Cependant il a connu une évolution assez rapide ces dernières années et ne ressemble plus vraiment au JavaScript du début.</p>
<p>Le JavaScript est une implémentation d'une norme plus large l'ECMAScript (aussi appelé ES20XX, mais également ESX), cette norme définit le fonctionnement du langage aussi bien dans un navigateur, mais également sur d'autres supports comme les serveurs.</p>
<p>Nous allons utiliser au maximum les dernières fonctionnalités de la norme (ES6), celle-ci est maintenant largement compatible avec le parc de navigateur actuel. Si par hasard vous devez supporter un navigateur incompatible, nous aborderons les options pour « le gérer ».</p>
<p>Le JavaScript qui fonctionne dans votre navigateur est un langage <strong>client</strong> il est donc exécuté <em>dans votre navigateur</em> ce détail est important. Ça veut dire que votre serveur ne sera pas du tout sollicité lors de l'exécution d'un programme codé en JavaScript.</p>
<p>Votre navigateur est très puissant, tellement puissant que nous allons pouvoir faire énormément de choses en JavaScript :</p>
<ul>
<li>Contrôle de saisie.</li>
<li>Interactivité avec le client (interaction avec l'utilisateur, clic, clavier, mouvement de la souris).</li>
<li>Afficher / masqué des éléments aux cliques.</li>
<li>Ajouter des éléments dans une page, manipuler la CSS.</li>
<li>Charger des éléments de manière asynchrone via le Réseau (Ajax)</li>
<li>Utiliser les Cookies (comme en PHP).</li>
<li>Sauvegarder des données sur le poste du client (LocalStorage).</li>
</ul>
<p>Mais… Ce n’est pas tout ! Votre navigateur est tellement puissant que vous allez pouvoir faire :</p>
<ul>
<li>Des applications en JavaScript</li>
<li>Accéder au Bluetooth de votre appareil</li>
<li>Accéder au GPS</li>
<li>La liste est vraiment infinie !</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Le JavaScript est vraiment le miroir de la vitesse avec laquelle Web est une plateforme qui va très vite. Il ne se passe pas 6 mois sans que vous puissiez faire encore plus.</p>
<p>La veille dans ce domaine est donc primordiale. Nous allons voir ici seulement les bases de ce qui vous servira plus tard dans votre métier.</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Le JavaScript est puissant, tellement puissant que votre navigateur « vous bridera ». Afin que vous n'abusiez pas des fonctionnalités, certaines d'entre elles sont soumises à permission / validation. Comme votre mobile donc :</p>
<p><img src="@source/tp/javascript/res/permissions.png" alt="Permissions chrome Exemple"></p>
<p>Autres limitations, votre code JavaScript ne peut pas accéder :</p>
<ul>
<li>Aux autres onglets actuellement ouverts.</li>
<li>Aux domaines autres que celui sur lequel vous vous trouvez (Ajax).</li>
</ul>
<p><img src="@source/tp/javascript/res/permissions2.png" alt="Permissions 2"></p>
</div>
<h3 id="moteur-javascript" tabindex="-1"><a class="header-anchor" href="#moteur-javascript" aria-hidden="true">#</a> Moteur JavaScript</h3>
<p>Votre navigateur possède donc un « Moteur JavaScript » que l'on appelle parfois la « JavaScript Virtual Machine » (rien à voir avec <em>le Java</em>). Chaque moteur JavaScript est donc différent, et fonctionne différemment, ils ont des noms comme vos navigateurs. Par exemple :</p>
<ul>
<li>V8 : Chrome, Opéra, Edge.</li>
<li>SpiderMonkey : Firefox.</li>
<li>Chakra pour Internet Explorer.</li>
<li>ChakraCore Microsoft Edge (avant l'évènement « Chromium »)</li>
<li>Nitro et SquirrelFish pour Safari.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Un Moteur ?</p>
<p>Le moteur a pour but de :</p>
<ul>
<li>Lis le JavaScript.</li>
<li>Compile le JavaScript en langage machine (et le valide).</li>
<li>Votre ordinateur exécute le langage machine (très rapide)</li>
</ul>
</div>
<h3 id="pourquoi-le-javascript-est-il-donc-incontournable" tabindex="-1"><a class="header-anchor" href="#pourquoi-le-javascript-est-il-donc-incontournable" aria-hidden="true">#</a> Pourquoi le JavaScript est-il donc incontournable.</h3>
<ul>
<li>Intégration avec le HTML/CSS.</li>
<li>Simple d'apprentissage et dans la manipulation.</li>
<li>Actif par défaut, et supporté par l'ensemble des navigateurs.</li>
</ul>
<h2 id="les-navigateurs" tabindex="-1"><a class="header-anchor" href="#les-navigateurs" aria-hidden="true">#</a> Les navigateurs</h2>
<p>L'autre gros sujet du JS est le support… Vous êtes certainement jeunes, vous n'avez connu <em>que Google Chrome</em>, la réalité est plus complexe que ça (surtout en entreprise). Dans votre carrière vous allez rencontrer des blocages et obligations de support. Même en 2020 nous avons des navigateurs différents (pourvu que ça dure) :</p>
<ul>
<li>Google Chrome</li>
<li>Safari</li>
<li>Firefox</li>
<li>Edge</li>
<li>Internet Explorer <code>&gt; 11</code></li>
<li>Interne Explorer <code>&lt; 10</code></li>
</ul>
<p>Ça vous parait très certainement anecdotique, mais les navigateurs n'interprètent pas vraiment de la même façon le code, le JavaScript en fait parti. En fonction des navigateurs, le support sera plus ou moins complet. En 2020 nous n'avons plus trop de problèmes. L'ensemble des navigateurs support « à peu près là même choses ». Mais avant ce n'était clairement pas le cas.</p>
<p>Nous allons donc avoir besoin de <a href="https://polyfill.io/v3/" target="_blank" rel="noopener noreferrer"><em>librairies</em> (appelé polyfill)<ExternalLinkIcon/></a>, ces librairies ont pour but d'ajouter le support de fonctionnalité moderne sur d’anciens navigateurs. Le support n'est évidemment pas total, et souvent les performances sont un peu moins bonnes. Mais cette solution est souvent la meilleure pour supporter les anciens navigateurs.</p>
<h2 id="librairies-or-not" tabindex="-1"><a class="header-anchor" href="#librairies-or-not" aria-hidden="true">#</a> Librairies or not ?</h2>
<p>C'est là grande question ! En JS nous avons la possibilité de nous passer complètement de librairie afin d'utiliser uniquement ce que propose le navigateur, c'est ce que l'on appelle <code>VanillaJS</code>. En 2020 ça fonctionne très bien! C'est même ce que j'aurais tendance à conseiller… Mais (oui il y a toujours un mais) la réalité est qu’en agence vous allez rencontrer des projets qui utiliseront <a href="https://jquery.com/" target="_blank" rel="noopener noreferrer">jQuery<ExternalLinkIcon/></a>.</p>
<p>Au vu du temps que nous allons avoir à consacrer au JS ça me semble important de vous parler un peu de <code>jQuery</code> mais également des équivalents <code>VanillaJS</code>.</p>
<p>Je ne dis pas que <code>jQuery</code> est un mauvais choix… Je pense par contre que celui-ci n'est plus forcément un « obligatoire » à partir de maintenant.</p>
<div class="custom-container tip"><p class="custom-container-title">Et les Frameworks alors ?</p>
<p>Ah en voilà une bonne question ! Les frameworks JS sont un sujet aussi vaste que le JS en lui-même, nous aurons le plaisir de les pratiquer ultérieurement. Dans tous les cas, ce que nous allons voir ensemble « dans les bases du JS » nous resservira avec les frameworks.</p>
<p><em>Sachez juste qu'il est possible de tout faire avec un framework JS (type <code>VueJS</code>), mais ce n'est pas forcément la réponse à toutes les questions.</em></p>
</div>
<h2 id="les-animations" tabindex="-1"><a class="header-anchor" href="#les-animations" aria-hidden="true">#</a> Les animations</h2>
<p>Attention à ne pas tomber dans le piège du tout JavaScript. Il peut-être tentant de tout faire un JavaScript, il fut un temps ou c'était une solution acceptable. Maintenant que nos navigateurs sont très puissants, cette solution devient même imaginable…</p>
<p>Mais <strong>il ne faut pas le faire</strong> ! Si vous souhaitez animer votre page <strong>privilégier au maximum le combo CSS + HTML</strong> (et JavaScript si un pilotage est nécessaire). Pourquoi est-ce important ? C'est important, car l'exécution du votre CSS est complètement différentes que le JS :</p>
<ul>
<li>La CSS est en grande partie gérée par votre GPU (Carte graphique). Cela utilise donc des instructions très spécifiques, optimisé, et très rapide (fluide).</li>
<li>Le JS est quant à lui exécuté sur votre CPU (Processeur). Donc, en fonction de votre ordinateur les performances sont plus ou moins bonnes (et consomme plus de batteries).</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Vous vous souvenez des boucles ?</p>
<p>Les animations en JS sont faites de boucles « infinies » ou très longues. C'est donc très peu optimisé. <strong>Méfiance donc !</strong></p>
</div>
<h2 id="javascript-do-you-speak-javascript" tabindex="-1"><a class="header-anchor" href="#javascript-do-you-speak-javascript" aria-hidden="true">#</a> JavaScript do you speak JavaScript ?</h2>
<p>Nous allons voir plus tard que le JavaScript à certains defaut. Nous ne l'évoquerons pas vraiment dans ce cours, mais il est possible d'écrire du JavaScript dans d'autres langages qui seront ensuite « transpilé » (converti lors d'une étape de compilation) en du JavaScript :</p>
<ul>
<li>CoffeeScript, syntaxe plus concise très utilisée par les utilisateurs de Ruby.</li>
<li>TypeScript, très populaire, il permet principalement de typer « fortement les données. Il permet de créer du code propre même dans le cas de gros projets complexes. Il est développé par Microsoft. (Très intéressant).</li>
<li>Kotlin, Kotlin le langage utilisé par la plateforme Android de Google. Le compilateur permet de créer également du code JS à partir de fichier <code>.kt</code>.</li>
</ul>
<p>Il y a encore beaucoup d'exemples, le langage n'étant que « Transpilé » il est important de comprendre le JavaScript pour l'utiliser efficacement.</p>
<h2 id="les-outils-du-developpeur" tabindex="-1"><a class="header-anchor" href="#les-outils-du-developpeur" aria-hidden="true">#</a> Les outils du développeur</h2>
<p>Le JavaScript ne déroge pas à la règle, pour bien travailler il nous faut de bonnes ressources. Pour le JS je vous propose :</p>
<ul>
<li><a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/<ExternalLinkIcon/></a></li>
<li><a href="https://caniuse.com/" target="_blank" rel="noopener noreferrer">https://caniuse.com/<ExternalLinkIcon/></a></li>
<li><a href="https://web.dev/" target="_blank" rel="noopener noreferrer">https://web.dev/<ExternalLinkIcon/></a></li>
<li><a href="https://kangax.github.io/compat-table/es6/" target="_blank" rel="noopener noreferrer">https://kangax.github.io/compat-table/es6/<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Un instant</p>
<p>Bien évidemment cette liste peut-être bien plus grande. N'hésitez pas à vous inspirer :</p>
<ul>
<li>De certains projets Github.</li>
<li>De compte Twitter</li>
<li>…</li>
</ul>
</div>
<h3 id="les-ide" tabindex="-1"><a class="header-anchor" href="#les-ide" aria-hidden="true">#</a> Les IDE</h3>
<p>L'IDE est aussi important que les idées. Pour éditer du JavaScript, vous pouvez utiliser un simple éditeur de texte (type Notepad). Cependant, je vous déconseille vraiment de le faire, écrire du JavaScript peut parfois être complexe, et il faut bien l'avouer un peu d'aide de la part d'un IDE peut-être <strong>très très intéressant</strong>, vous avez beaucoup de possibilités :</p>
<ul>
<li>WebStorm (Payant, mais très bon).</li>
<li>VisualStudio Code (Gratuit, bon aussi).</li>
<li>Atom (je ne le conseille plus).</li>
<li>Vim (pour les experts seulement).</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Astuce du pro</p>
<p>Quel que soit l'éditeur choisi, il faut savoir l'exploiter. N'hésitez pas à l'apprivoiser pour connaitre les options et donc devenir efficace avec.</p>
</div>
<h3 id="la-console" tabindex="-1"><a class="header-anchor" href="#la-console" aria-hidden="true">#</a> La console</h3>
<p>Nous avons déjà utilisé « La console » de votre navigateur quand nous faisions du HTML. Celle-ci sera encore plus utile avec le JS, elle nous permettra :</p>
<ul>
<li>De voir les Erreurs et Warnings.</li>
<li>Faire des points d'arrêt.</li>
<li>Afficher des logs.</li>
</ul>
<p>Cette console existe sur l'ensemble des navigateurs modernes. Elle contient des informations <strong>très précieuse</strong> à partir de maintenant, j'aimerais que celle-ci soit toujours ouverte lors de vos developpement.</p>
<div class="custom-container tip"><p class="custom-container-title">Cas concret</p>
<p><img src="@source/tp/javascript/res/console.png" alt="Cas concret"></p>
<p>La ligne <code>Uncaught ReferenceError: test is not defined at index.html:11</code>, nous indique, que notre page <code>index.html</code> contient une erreur à la ligne 11.</p>
<p>Vous pouvez, vous aussi tester <RouterLink to="/demo/js/index.html">cette page en cliquant ici</RouterLink></p>
</div>
<h2 id="votre-premier-hello-world" tabindex="-1"><a class="header-anchor" href="#votre-premier-hello-world" aria-hidden="true">#</a> Votre premier Hello World</h2>
<p>Concentrons-nous maintenant sur le code en lui-même. Nous allons travailler exclusivement dans notre navigateur. Un peu comme la balise <code>form</code> la balise <code>script</code> peut-être mise n'importe où dans le code HTML. Cette balise peut fonctionner de deux façons différentes :</p>
<ul>
<li>Code JavaScript directement dans le code</li>
<li>Code JavaScript chargé depuis un fichier externe.</li>
</ul>
<p><em>Directement dans le code :</em></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Titre de la bage<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Lorem Ipsum<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Bonjour à tous"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Lorem Ipsum suite<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><em>Via un script externe :</em></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/public/js/votre_script.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Astuce de Pro</p>
<p>Vous pouvez bien évidemment mettre <strong>plusieurs</strong> balises script. Un peu comme le PHP l'organisation est importante, n'hésitez pas à découper votre code (encore, et encore, et encore).</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/public/js/votre_script1.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/public/js/votre_script2.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/public/js/votre_script3.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Vous pouvez également charger des scripts « externe » :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Attention à la sécurité dans le cas du chargement via un CDN. Vous charger du contenu « non sure depuis Internet ». C'est à mon sens un très gros risque.</p>
</div>
<h3 id="mise-en-pratique" tabindex="-1"><a class="header-anchor" href="#mise-en-pratique" aria-hidden="true">#</a> Mise en pratique</h3>
<p>Maintenant que vous avez vu les bases… Place à la pratique avec <RouterLink to="/tp/javascript/tp1.html">le TP1</RouterLink></p>
<p>Rien de bien compliqué dans le TP, il s'agit juste de mettre en pratique.</p>
<h2 id="plusieurs-lignes" tabindex="-1"><a class="header-anchor" href="#plusieurs-lignes" aria-hidden="true">#</a> Plusieurs lignes ?</h2>
<p>Pour l'instant nous avons écrit du code très simple. Nous allons plus tard avoir bien évidemment des fonctions, des conditions des boucles, bref plusieurs lignes de code. En JavaScript chaque ligne de code <strong>doivent se terminer par un <code>;</code></strong>.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Ceci est un message dans la console"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Bloqué"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="les-commentaires" tabindex="-1"><a class="header-anchor" href="#les-commentaires" aria-hidden="true">#</a> Les commentaires</h2>
<p>Commenter son code c'est important (pour vous). Il faut le faire dès que cela est nécessaire :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Commentaire multignes
 * Par exemple en début de fichier pour détailler le contenu
 */</span>

<span class="token comment">// Commenter une ligne.</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Ceci est un exemple"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Ceci est un exemple 2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Peux également être placé en fin de ligne.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Astuce d'ancien !</p>
<p>Commenté, commenté, commente votre code. Il n'y a jamais trop de commentaires dans du code. Et par pitié 🙏 utilisé les raccourcis clavier de votre éditeur pour commenter 👍</p>
</div>
<h2 id="les-variables" tabindex="-1"><a class="header-anchor" href="#les-variables" aria-hidden="true">#</a> Les variables</h2>
<p>Comme en PHP (ou d'autres langages), il est possible d'écrire des variables en JavaScript. Les variables fonctionnent de la même façon qu'en PHP, celle-ci sont « temporaire » leur contenu est remis à zéro à chaque lancement de votre script.</p>
<p>Nous avons deux types de variables en PHP :</p>
<ul>
<li>Les variables, fonctionnement classique.</li>
<li>Les constantes, variable qui ne peut-être écrite qu'une seule fois. Si vous tentez de « l'écraser » votre navigateur produira une erreur.</li>
</ul>
<h3 id="les-variables-1" tabindex="-1"><a class="header-anchor" href="#les-variables-1" aria-hidden="true">#</a> Les variables</h3>
<p>Les variables s'utilisent de la même façon que ce que vous avez déjà vu à savoir :</p>
<ul>
<li>Une déclaration</li>
<li>Des assignations</li>
<li>Des « manipulations » (conditions, boucles, fonctions, etc.)</li>
</ul>
<p>La déclaration d'une variable doit-être faite avec le mot-clé <code>let</code>, par exemple :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> nom<span class="token punctuation">;</span>
nom <span class="token operator">=</span> <span class="token string">"Brosseau"</span><span class="token punctuation">;</span>
<span class="token function">alert</span><span class="token punctuation">(</span>nom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Ou alors en une seule ligne.</span>
<span class="token keyword">let</span> nom <span class="token operator">=</span> <span class="token string">"Brosesau"</span><span class="token punctuation">;</span>
<span class="token function">alert</span><span class="token punctuation">(</span>nom<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Un peu d'historiques</p>
<p>L'usage du mot-clé <code>let</code> est plutôt récent en JavaScript. Historiquement nous utilisions plus le mot <code>var</code>. Il n'y a pas vraiment de différence entre les deux. Sachez juste que maintenant vous devez utiliser <code>let</code> plutôt que <code>var</code>.</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">Attention</p>
<p>Contrairement au PHP, une variable déclarée ne peut-être redéclarée, si vous tenter de le faire votre navigateur produira une erreur dans la console. :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> nom <span class="token operator">=</span> <span class="token string">"Valentin"</span><span class="token punctuation">;</span>
nom <span class="token operator">=</span> <span class="token string">"Thomas"</span><span class="token punctuation">;</span> <span class="token comment">// Pas de problème</span>

<span class="token keyword">let</span> nom <span class="token operator">=</span> <span class="token string">"Romain"</span><span class="token punctuation">;</span> <span class="token comment">// Erreur.</span>
<span class="token comment">// VM1498:4 Uncaught SyntaxError: Identifier 'nom' has already been declared</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></div>
<h3 id="les-constantes" tabindex="-1"><a class="header-anchor" href="#les-constantes" aria-hidden="true">#</a> Les constantes</h3>
<p>Une constante s'utilise comme une variable classique, sauf que celle-ci ne peut-être écrasé. Nous utiliserons ce type de variable pour « empêcher » que certaines valeurs puissent être perdues via une mauvaise ligne de code.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> age_du_capitaine <span class="token operator">=</span> <span class="token number">84</span><span class="token punctuation">;</span>
age_du_capitaine <span class="token operator">=</span> <span class="token number">33</span><span class="token punctuation">;</span>

<span class="token comment">// !! ERREUR !!</span>
<span class="token comment">// VM1583:2 Uncaught TypeError: Assignment to constant variable.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Un exemple d'usage ? Par exemple, un lien « vers une API », ou encore la couleur principale de votre site web. Où plus simplement mémoriser sous « une étiquette » des valeurs plus longue :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">IN_PROGRESS</span> <span class="token operator">=</span> <span class="token string">"200"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">DONE</span> <span class="token operator">=</span> <span class="token string">"400"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">FAILED</span> <span class="token operator">=</span> <span class="token string">"1000"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Il est en effet plus simple de lire un ligne :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>order<span class="token punctuation">.</span>status <span class="token operator">==</span> <span class="token constant">DONE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Commande finalisée"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Que mémoriser que <code>400 == Done</code> :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>order<span class="token punctuation">.</span>status <span class="token operator">==</span> <span class="token number">400</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Commande finalisée"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Astuce de pro</p>
<p>Je vous conseille de nommer vos constantes avec un nom en majuscule. Ça vous permettra de toutes de suite les reconnaitre</p>
</div>
<h3 id="les-types" tabindex="-1"><a class="header-anchor" href="#les-types" aria-hidden="true">#</a> Les types</h3>
<p>Comme en PHP les variables possèdent des types « implicitement déterminés » :</p>
<table>
<thead>
<tr>
<th>Type</th>
<th>Contenu</th>
<th>Type d'opération</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>string</code></td>
<td>&quot;Une chaine de caractère&quot;</td>
<td>Gestion du texte, concaténation</td>
<td>Permets de stocker du texte (saisie utilisateur par exemple).</td>
</tr>
<tr>
<td><code>int</code></td>
<td>42</td>
<td>Opération mathématique</td>
<td>Comme en mathématique</td>
</tr>
<tr>
<td><code>boolean</code></td>
<td><code>True</code> ou <code>False</code></td>
<td>Opération logique</td>
<td>Permets de faire des actions logiques. C'est un type très important en informatique</td>
</tr>
<tr>
<td><code>float</code></td>
<td>10.3</td>
<td>Opération mathématique</td>
<td>Comme en mathématique. Attention la notation du chiffre à virgule est avec un <code>.</code>.</td>
</tr>
<tr>
<td><code>array</code></td>
<td>[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</td>
<td></td>
<td>Contiens des listes de « quelques choses »</td>
</tr>
<tr>
<td><code>object</code></td>
<td><code>{nom: &quot;Brosseau&quot;, prenom: &quot;Valentin&quot;}</code></td>
<td></td>
<td>Structure de données</td>
</tr>
</tbody>
</table>
<p>En JS, nous n'avons pas de « Tableaux associatifs », nous avons à la place un type <code>object</code>, il nous permettra de structurer au mieux nos données.</p>
<h3 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire</h3>
<p>Nous avons vu comment déclarer des variables, <RouterLink to="/tp/javascript/tp1.1.html">je vous propose de les manipuler un peu avec le TP 1.1</RouterLink></p>
<h2 id="manipuler-les-donnees" tabindex="-1"><a class="header-anchor" href="#manipuler-les-donnees" aria-hidden="true">#</a> Manipuler les données</h2>
<p>Un langage de programmation est prévu pour manipuler des données. Pour le JavaScript c'est là même chose, toutes les opérations vu en PHP fonctionneront de la même façon en JS, la synthaxe sera très proche voir identique. Voici quelques exemples.</p>
<h3 id="les-conditions" tabindex="-1"><a class="header-anchor" href="#les-conditions" aria-hidden="true">#</a> Les conditions</h3>
<p>Aucune différence par rapport à ce que nous avons précédemment vu ensemble :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Exemple 1</span>
<span class="token keyword">let</span> age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>age <span class="token operator">></span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Coucou je suis une alerte"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Exemple 2</span>
<span class="token keyword">let</span> estMajeur <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>estMajeur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Est équivalent à estMajeur == true</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"La personne est majeur"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Exemple 3</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">maFonctionDeTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>
    <span class="token string">"la fonction est appelé, et si celle-ci « return » true l'alert est affiché"</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="les-boucles" tabindex="-1"><a class="header-anchor" href="#les-boucles" aria-hidden="true">#</a> Les boucles</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Votre première boucle infinie"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// Parcours l'ensemble du tableau</span>
arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Transforme le tableau</span>
arrModif <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> i <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// arrModif contiendra => [2, 4, 6, 8];</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="les-fonctions" tabindex="-1"><a class="header-anchor" href="#les-fonctions" aria-hidden="true">#</a> Les fonctions</h3>
<p>Nous pouvons déclarer des fonctions en JS :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Déclarer / Créer une fonction</span>
<span class="token keyword">function</span> <span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Déclarer / Créer une fonction</span>
<span class="token keyword">function</span> <span class="token function">maFonctionQuiRetourne42</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">addition</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// L'appeler</span>
<span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">maFonctionQuiRetourne42</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Affiche dans la console 42</span>
<span class="token function">alert</span><span class="token punctuation">(</span><span class="token function">addition</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Affiche une alert avec le résultat de l'addition 40 + 2 => 42</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>Elle fonctionne et s'utilise comme ce que nous avons précédemment vu.</p>
<h3 id="a-faire-1" tabindex="-1"><a class="header-anchor" href="#a-faire-1" aria-hidden="true">#</a> À faire</h3>
<p>Tester en JavaScript l'usage de Fonctions, Condition, et Boucle. (Nous utiliserons plus en détail c'est élément après avoir vu comment manipuler le DOM)</p>
<h2 id="manipuler-le-html-et-la-css" tabindex="-1"><a class="header-anchor" href="#manipuler-le-html-et-la-css" aria-hidden="true">#</a> Manipuler le HTML et la CSS</h2>
<p>Comme je disais précédemment, le JavaScript et le HTML sont « entièrement » compatible, vous pouvez créer, supprimer, modifier n'import quels éléments présent dans votre page. Il est donc possible de créer entièrement une page HTML via du JS. Il est également possible de modifier le style de chacun des éléments présents dans votre page Internet.</p>
<p>Cette interaction entre les deux, nous permettra plus tard de créer « de vraies expériences » 100% en JavaScript.</p>
<div class="custom-container danger"><p class="custom-container-title">Une limite…</p>
<p>Manipuler votre page aucun problème. Par contre attention, impossible de modifier du code « qui ne vous appartient pas », c'est-à-dire dans une <code>iframe</code> ou dans un autre onglet que la page actuelle.</p>
</div>
<h3 id="creer-des-elements-dans-la-page" tabindex="-1"><a class="header-anchor" href="#creer-des-elements-dans-la-page" aria-hidden="true">#</a> Créer des éléments dans la page</h3>
<p>Je ne pense pas qu'il soit très important de connaitre ce genre de manipulation, mais je constate qu'en entreprise certains d'entre vous seront confrontés à ce genre de problématique. Vous avez la possibilité de créer n'importe quel type d'élément directement depuis votre code JS.</p>
<p>Votre navigateur ne fera aucune distinction entre un élément créé « normalement » et un élément créé via le JavaScript. La création d'un élément se passera en deux temps :</p>
<ul>
<li>Le créer l'élément, le personnaliser (contenu, texte, css).</li>
<li>L'ajouter dans votre page</li>
</ul>
<h3 id="le-dom" tabindex="-1"><a class="header-anchor" href="#le-dom" aria-hidden="true">#</a> Le DOM</h3>
<p>Avant d'écrire du code, un peu de théorie ! Votre navigateur n'est pas magique, il repose sur une logique qui est toujours la même depuis le début. Celui-ci repose sur ce qu’on l'arbre du DOM (<strong>D</strong>ocument <strong>O</strong>bject <strong>M</strong>odel). Nous parlerons donc d'un Arbre HTML, prenont un exemple :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>My Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>A heading<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://…<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Link text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Peut être représenté comme ça :</p>
<p><img src="@source/tp/javascript/res/dom-sample.png" alt="Dom graph"></p>
<div class="custom-container tip"><p class="custom-container-title">Remarque</p>
<p>L'Arbre du DOM peut-être très gros, nous allons plus tard parler de ShadowDow / Dom Virtuel. Même si vous ne manipulez pas cette notion il est important de voir que celle-ci existe. Elle est pour l'instant la pierre angulaire des Frameworks JS moderne.</p>
</div>
<h3 id="exemple-de-creation-d-elements" tabindex="-1"><a class="header-anchor" href="#exemple-de-creation-d-elements" aria-hidden="true">#</a> Exemple de création d'éléments</h3>
<p>La logique est toujours la même :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> h <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"h1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Création de l'élément h1</span>
h<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Ceci est un titre"</span><span class="token punctuation">;</span> <span class="token comment">// Ajout du texte dans le h1</span>
h<span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">"titleClass"</span><span class="token punctuation">;</span> <span class="token comment">// Définition d'un titre pour l'élément</span>

<span class="token comment">// Ajout du titre dans le body de la page courante.</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Ou a un endroit précis</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monId"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Dans une page ça peut donner :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fr<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Ma page<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token keyword">var</span> h <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"h1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Création de l'élément h1</span>
      h<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Ceci est un titre"</span><span class="token punctuation">;</span> <span class="token comment">// Ajout du texte dans le h1</span>
      h<span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">"titleClass"</span><span class="token punctuation">;</span> <span class="token comment">// Définition d'un titre pour l'élément</span>

      <span class="token comment">// Ajout du titre dans la page en cours</span>
      document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">appendChild ?</p>
<p>Dans le précédent exemple, nous avons ajouté l'élément « à la fin » du body. Mais d'autres options existent :</p>
<ul>
<li><code>node.append(nodes ou strings)</code> – ajoute « nodes ou strings » à la fin,</li>
<li><code>node.prepend(nodes ou strings)</code> – ajoute « nodes ou strings » au début,</li>
<li><code>node.before(nodes ou strings)</code> –- ajoute « nodes ou strings » avant le node,</li>
<li><code>node.after(nodes ou strings)</code> –- ajoute « nodes ou strings » après le node,</li>
<li><code>node.replaceWith(nodes ou strings)</code> –- remplace le node par l'élément fourni « nodes or strings ».</li>
</ul>
<p>:warning Nous allons voir qu'il est possible de choisir le <code>node</code> via un sélecteur.</p>
</div>
<h4 id="a-faire-2" tabindex="-1"><a class="header-anchor" href="#a-faire-2" aria-hidden="true">#</a> À faire</h4>
<p>Je vous laisse tester dans votre navigateur.</p>
<h3 id="exemple-de-creation-d-elements-version-alternative" tabindex="-1"><a class="header-anchor" href="#exemple-de-creation-d-elements-version-alternative" aria-hidden="true">#</a> Exemple de création d'éléments version alternative</h3>
<p>Nous pouvons également insérer « une chaine de caractère », celle-ci sera transformée automatiquement en code HTML valide par votre navigateur :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Ajout du titre dans le body de la page courante.</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span>
  <span class="token string">"afterend"</span><span class="token punctuation">,</span>
  <span class="token string">"&lt;h1 class='titleClass'>Ceci est un titre&lt;/h1>"</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">afterend ?</p>
<p>Comme dans l'exemple précédent, c'est la position de l'élément que vous souhaitez insérer. Les valeurs possibles sont les suivantes :</p>
<ul>
<li><code>beforebegin</code> : Avant l'élément lui-même.</li>
<li><code>afterbegin</code> : Juste à l'intérieur de l'élément , avant son premier enfant.</li>
<li><code>beforeend</code> : Juste à l'intérieur de l'élément , après son dernier enfant.</li>
<li><code>afterend</code> : Après élément lui-même.</li>
</ul>
<p>L'exemple de la W3School est très explicite :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- beforebegin --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- afterbegin --></span>
  foo
  <span class="token comment">&lt;!-- beforeend --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- afterend --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></div>
<div class="custom-container danger"><p class="custom-container-title">Attention</p>
<p>Cette solution peut sembler tentante… Mais attention, si la valeur ajoutée contient une saisie utilisateur, vous risquez une XSS sur votre site Internet.</p>
<p>Donc méfiance.</p>
</div>
<h3 id="les-selecteurs" tabindex="-1"><a class="header-anchor" href="#les-selecteurs" aria-hidden="true">#</a> Les sélecteurs</h3>
<p>Vous vous doutez que nous allons pas tout gérer avec un simple <code>document.body</code>. Le JS nous offre beaucoup de possibilité, et nous offre surtout une « interface » très puissante pour choisir l'endroit où nous allons insérer un élément (très très puissante vous allez voir).</p>
<p>Vous vous souvenez des sélecteurs en CSS ? Et bien, nous avons la même chose en JavaScript. Nous avons de <strong>base sans rien ajouter</strong> une méthode permettant de « trouver » un élément dans le DOM</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Retourne la liste (array) des éléments</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">".maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Retourn le premier élément trouvé</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">".maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">C'est « neuf »</p>
<p>Ces API (Méthodes) sont très peu utilisés (voir même connues), elles sont pourtant très puissantes. Elles sont à choisir si vous souhaitez faire du code moderne.</p>
<p>Sur Internet (voir dans du code existant), vous trouverez l'ancienne version à savoir :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"elementId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">"maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Aucun changement dans le fonctionnement.</p>
</div>
<h3 id="les-selecteurs-et-jquery" tabindex="-1"><a class="header-anchor" href="#les-selecteurs-et-jquery" aria-hidden="true">#</a> Les sélecteurs et jQuery</h3>
<p>À plusieurs reprises je vous ai parlé de jQuery sans vraiment vous expliquer pourquoi celui-ci était aussi populaire. jQuery est populaire, car il va nous permettre des raccourcis. Si on reprend l'exemple du sélecteur, jQuery va nous permettre d'unifier la manière dont ont trouve / manipule un élément.</p>
<p>Dès lors que vous ajoutez jQuery dans votre code, nous allons avoir à notre disposition un nouvelle « objet » nommé tout simplement <code>$</code> (rien à voir avec les variables en PHP), cet objet va nous permettre plein de choses (vraiment plein). Si on reprend la recherche d'un élément :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">".maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Je ne vais pas m'étaler sur le sujet, mais si on souhaite masquer tous les éléments trouvés avec jQuery, et bien c'est <em>très</em> simple…</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Ajouter jQuery ?</p>
<p>C'est super simple, il suffit « juste » d'ajouter dans votre page :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<p>Pourquoi ne pas toujours utiliser jQuery alors ? Tout simplement que maintenant il est possible d'écrire « sensiblement la même chose » directement en JavaScript sans « dépendance à une librairie ». (Comme nous l'avons vu par exemple avec <code>querySelectorAll</code> et <code>querySelector</code>).</p>
<h3 id="utiliser-le-resultat-d-un-selecteur" tabindex="-1"><a class="header-anchor" href="#utiliser-le-resultat-d-un-selecteur" aria-hidden="true">#</a> Utiliser le résultat d'un sélecteur</h3>
<p>Nous avons vu qu'il était possible de « sélectionner » un élément en JavaScript. Cette variable est un accès direct à l'élément présent dans votre page.</p>
<p>Ça veut dire que nous allons pouvoir « le manipuler », afin de modifier l'apparence d'un élément précis via le JS :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">"none"</span><span class="token punctuation">;</span>

element<span class="token punctuation">.</span><span class="token function">insertAdjacentHTML</span><span class="token punctuation">(</span>
  <span class="token string">"beforebegin"</span><span class="token punctuation">,</span>
  <span class="token string">"&lt;h1 class='titleClass'>Ceci est un titre dans l'élément&lt;/h1>"</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Exemples d'utilisations</span>
document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Voilà valeur"</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">it</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  it<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"Parcours chaque div et remplace le contenu par &lt;="</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// jQuery</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#elementId"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token string">"&lt;h1>Mon Titre&lt;/h1>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="jouer-sur-la-visibilite" tabindex="-1"><a class="header-anchor" href="#jouer-sur-la-visibilite" aria-hidden="true">#</a> Jouer sur la visibilité</h3>
<p>Maintenant que vous savez « obtenir un élément » via le JavaScript, nous allons jouer sur la visibilité. Vous allez voir c'est très simple.</p>
<p><em>Cacher un élément :</em></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">"none"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Style ? Vous avez dit Style ?</p>
<p>Et oui, nous avons accès à l'ensemble du style. Amusez-vous, il est possible de tout changer directement via le JS.</p>
</div>
<p><em>Ajouter une classe ?:</em></p>
<p>Vous n'aimez pas manipuler directement le style ? Moi non plus… Ajouter une classe est également possible !</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monId"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
element<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"maClass"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">Hey ! classList ?</p>
<p>Oui… Il est possible de mettre « plusieurs classes », donc nous avons ici un tableau <code>array</code>. Un tableau se manipule avec des méthodes comme vues précédemment. Il faut donc utiliser la méthode <code>add</code> pour ajouter une classe.</p>
</div>
<h3 id="une-petite-mise-en-pratique-simple" tabindex="-1"><a class="header-anchor" href="#une-petite-mise-en-pratique-simple" aria-hidden="true">#</a> Une petite mise en pratique simple</h3>
<p>Nous allons créer une page fictive afin de tester un peu le fonctionnement :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>monId<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!-- Ajouter un titre ici en JavaScript --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- Cacher la div suivante via le JS --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cacheMoi<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>lorem ipsum…<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- Je souhaite que le texte soit rouge --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>redText<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Le texte présent ici doit-être rouge<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- Ajouter ici un paragraphe (p) en JavaScript--></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token comment">// Vous devez écrire votre code JavaScript ici.</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Hou hou</p>
<p>Les consignes sont présentes dans les commentaires du code fourni. Je vous laisse regarder, et tenter de faire les actions demandées.</p>
</div>
<p>(Vous pouvez retrouver <RouterLink to="/tp/javascript/tp1.2.html">cette introduction dans le TP1.2</RouterLink>)</p>
<h3 id="mise-en-pratique-1" tabindex="-1"><a class="header-anchor" href="#mise-en-pratique-1" aria-hidden="true">#</a> Mise en pratique</h3>
<p>J'ai encore beaucoup parlé! Place à une mise en pratique. Je vous propose de mettre en pratique tous que nous avons vu précédement <RouterLink to="/tp/javascript/tp2.html">dans un TP regroupant CSS, HTML &amp; JS</RouterLink></p>
<p><RouterLink to="/tp/javascript/tp2.html">Pour la suite c'est par ici</RouterLink></p>
<h2 id="obtenir-les-valeurs-d-un-input" tabindex="-1"><a class="header-anchor" href="#obtenir-les-valeurs-d-un-input" aria-hidden="true">#</a> Obtenir les valeurs d'un input</h2>
<p>Nous avons vu qu'il était possible de récupérer les éléments dans la page pour les modifier visuellement. Mais il est également possible d'obtenir les valeurs actuellement saisie dans la page :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>monInput<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// VanillaJS</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monInput"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>

<span class="token comment">// En jQuery</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#monInput"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="les-evenements" tabindex="-1"><a class="header-anchor" href="#les-evenements" aria-hidden="true">#</a> Les évènements</h2>
<p>Nous avons vu pour l'instant du JS très simple, il ressemble beaucoup à du code PHP c'est-à-dire sans grande interaction avec l'utilisateur.</p>
<p>Le but du JavaScript est vraiment d'interagir avec l'utilisateur, pour améliorer l'interactivité de votre site Internet afin par exemple de valider une saisie « côté client ».</p>
<p>Pour ça nous allons avoir à notre disposition des évènements, ces évènements nous permettront de réagir « instantanément » aux demandes de l'utilisateur. La construction des évènements est toujours la même à savoir « <strong>on</strong>quelque chose », par exemple :</p>
<ul>
<li>onclick</li>
<li>onsubmit</li>
<li>onresize</li>
<li>…</li>
</ul>
<p>Nous avons deux façons d'attacher les évènements :</p>
<ul>
<li>Dans le DOM.</li>
<li>En JavaScript.</li>
</ul>
<hr>
<p><img src="@source/tp/javascript/res/event_click.png" alt="Event click"></p>
<p>(Appelé au moment du clique par l'utilisateur utilisateur)</p>
<h3 id="dans-le-dom" tabindex="-1"><a class="header-anchor" href="#dans-le-dom" aria-hidden="true">#</a> Dans le DOM</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Click ! <span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">function</span> <span class="token function">maFonction</span><span class="token punctuation">(</span><span class="token parameter">elem</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// elem => est le bouton sur lequel vous avez cliqué</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">this ?</p>
<p>Le <code>this</code> corresponds à l'élément sur lequel vous avez cliqué.</p>
</div>
<h3 id="en-javascript" tabindex="-1"><a class="header-anchor" href="#en-javascript" aria-hidden="true">#</a> En JavaScript</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Click ! <span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// Pure JS</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"btn"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> maFonction<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// jQuery</span>
  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#btn"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>maFonction<span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Simple ? Compliqué ? En réalité, comme beaucoup de choses du WEB la pratique vous donnera l'habitude de manipuler le JS. Il deviendra pour vous une véritable seconde nature 🎉.</p>
</div>
<p>Nous avons vu ici comment utiliser l'évènement <code>click</code>, mais la liste des possibilités <a href="https://developer.mozilla.org/fr/docs/Web/Events" target="_blank" rel="noopener noreferrer">est bien plus longue<ExternalLinkIcon/></a>, sans rentrer dans le détail, nous avons :</p>
<ul>
<li>dblclick</li>
<li>mousemove, mouseup</li>
<li>keyup, keydown, …</li>
<li>userproximity</li>
</ul>
<p>La liste est vraiment « très très » longue.</p>
<h2 id="mise-en-pratique-2" tabindex="-1"><a class="header-anchor" href="#mise-en-pratique-2" aria-hidden="true">#</a> Mise en pratique</h2>
<p>Cette partie est importante. Trêve de bavardage ! <RouterLink to="/tp/javascript/tp3.html">Place à la pratique</RouterLink></p>
<h2 id="l-ajax" tabindex="-1"><a class="header-anchor" href="#l-ajax" aria-hidden="true">#</a> L'Ajax</h2>
<p>Difficile de parler du JavaScript sans parler de l'Ajax. L'Ajax est la base du web tel que nous le connaissons aujourd'hui, pour l'instant nous avons vu des pages basiques… Les pages chargent « et ne change que quand l'utilisateur interagit » ! Avec l'Ajax nous pouvons faire bien plus ! Beaucoup plus ! Vous l'avez remarqué votre Gmail, Facebook, etc. change sans que vous rechargiez la page. Et bien cette fonctionnalité est possible uniquement grâce à l'Ajax !</p>
<p>L'Ajax c'est donc du contenu que nous allons charger de manière asynchrone, c'est-à-dire après le chargement complet de la page ; cela va nous permettre de vraies interactions modernes pour réaliser des sites web / applications web tels que :</p>
<ul>
<li>Chat.</li>
<li>Progressive Web App (PWA).</li>
<li>Client Web / Alernative à une application</li>
</ul>
<p>L'Ajax en 2020 va donc nous permettre de créer de vraies applications. Ces applications consommeront de la donnée, cette donnée pourra provenir d'un serveur qui vous appartient ou depuis des serveurs tiers. Nous allons donc créer des sites web Client / Serveur avec des API pour interconnecter l'ensemble. Le Web deviendra donc une plateforme comme une autre.</p>
<p>Bref, vous allez le voir, l'Ajax deviendra très rapidement une pierre angulaire de vos développements, et nous le verrons plus tard avec des frameworks web (comme VueJS) il serra possible de créer des applications « dynamique » sans avoir à écrire une seule ligne de PHP (ou autre langage serveur).</p>
<div class="custom-container tip"><p class="custom-container-title">Un INSTANT !</p>
<p>Une API ? What ? Alors, une API dans le fond c'est « comme un site web ». Mais, cette page web ne produit pas du HTML et n'a pas pour vocation d'être lue par un humain.</p>
<p>C'est donc du code (PHP ou autre) qui va permettre de faire parler deux ordinateurs (le client et le serveur) dans un langage spécifique (XML, JSON, …)</p>
</div>
<h3 id="l-asynchrone-c-est-quoi" tabindex="-1"><a class="header-anchor" href="#l-asynchrone-c-est-quoi" aria-hidden="true">#</a> L'asynchrone c'est quoi ?</h3>
<p>Avant d'aller plus loin, détaillons un peu ce que veut dire Asynchrone. L'objectif de L'Ajax est de charger / recharger une partie de votre page sans l'intervention de l'utilisateur et surtout sans que celui-ci ne recharge « L'ensemble du site ». C'est donc une opération transparente pour lui, mais vous allez le voir cette opération ne sera pas transparent pour vous.</p>
<p>Qui dit asynchrone dit « avec un délai », vous aviez l'habitude jusqu'à présent d'avoir l'information instantanément disponible, quand vous faites un sélecteur à la ligne 1, et bien à la ligne 2 vous avez une réponse… Avec l'Ajax ça va être légèrement différent. Vous allez faire votre demande à la ligne 1… mais en fonction de différents paramètres (vitesse d'internet, vitesse de l'ordinateur, etc.) votre contenu pourra être disponible plus tard. Combien de temps plus tard ? Et bien vous ne le savez pas pour l'instant.</p>
<p>Nous allons donc introduire la notion de « callback » (et plus tard de promise). Un callback est une fonction, rien de bien différent des précédentes, la seule différence est que celle-ci sera appelée <strong>non pas par vous</strong> mais <strong>automatiquement par le navigateur</strong> quand le contenu sera disponible.</p>
<div class="custom-container tip"><p class="custom-container-title">Ça parait simple ?</p>
<p>Écrite comme ça, cela peu paraitre simple. Dans les faits, ce n’est pas vraiment complexe, mais par contre je vous le garantis, au début vous allez vous faire avoir en pensant « comme avant » et en imaginant que votre contenu est immédiatement disponible.</p>
</div>
<table>
<thead>
<tr>
<th style="text-align:center"><img src="@source/tp/javascript/res/ajax.svg" alt="Principe Ajax"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Source Wikipedia</td>
</tr>
</tbody>
</table>
<h3 id="charger-du-contenu-«-a-la-demande-»" tabindex="-1"><a class="header-anchor" href="#charger-du-contenu-«-a-la-demande-»" aria-hidden="true">#</a> Charger du contenu « à la demande »</h3>
<p>Nous allons donc charger du contenu « à la demande », le contenu peut-être ce que vous souhaitez, du HTML par exemple, mais également du JSON (un format de données d'échange). Il sera chargé au moment d'une interaction utilisateurs, ou alors automatiquement, par exemple dans le cas de Gmail toutes les X minutes afin d'offrir à votre utilisateur un rafraichissement régulier de contenu de votre page.</p>
<p>Comme précédemment notre contenu sera chargé depuis un serveur, mais celui-ci sera partiel. Il ne contiendra « que le coeur » de ce que vous souhaitez afficher (exit donc le chargement d'une page entière en Ajax, ça n’aurait à mon sens aucun intérêt).</p>
<p>Comme précédemment nous allons voir deux façons de procéder. La première est sans librairie en utilisant uniquement ce que nous propose notre navigateur :</p>
<ul>
<li>Fetch</li>
<li>Selecteur</li>
<li>Les Promises</li>
</ul>
<p>La seconde façon va être en utilisant jQuery :</p>
<ul>
<li>$.get</li>
<li>$.post</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">Comment choisir ?</p>
<p>J'ai toujours tendance à préférer la version « Native ». <strong>MAIS</strong>, si vous avez déjà jQuery dans votre site? N'hésitez pas à utiliser la version jQuery.</p>
</div>
<h3 id="mettre-en-pratique-l-ajax" tabindex="-1"><a class="header-anchor" href="#mettre-en-pratique-l-ajax" aria-hidden="true">#</a> Mettre en pratique l'Ajax</h3>
<p>L'Ajax c'est un gros morceau, tellement gros, qui serait possible d'y passer des heures et des heures tellement le sujet est vaste. Nous allons donc réaliser une première expérimentation.</p>
<p><RouterLink to="/tp/javascript/tp4.html">La suite c'est par ici</RouterLink></p>
<h2 id="allons-un-peu-plus-loin" tabindex="-1"><a class="header-anchor" href="#allons-un-peu-plus-loin" aria-hidden="true">#</a> Allons un peu plus loin</h2>
<p>Le JavaScript comme le PHP est un langage avec énormément de possibilités. Nous avons ici effleuré ce qui était possible de faire, il faut savoir que le JavaScript est un langage un peu particulier il permet de faire ce que l'on appelle dans le monde du développement du « Full-Stack ». Le JS est un langage à la fois Serveur et Client (web), vous pouvez donc réaliser :</p>
<ul>
<li>Des sites web (JavaScript)</li>
<li>Des applications Web (VueJS, ReactJS, progressive Web App)</li>
<li>Des applications d'ordinateur (Electron)</li>
<li>Mais également du code serveur (API, scripts, etc)</li>
</ul>
<p>Et tout ça avec un seul langage !</p>
<h3 id="se-«-balader-»-dans-le-dom" tabindex="-1"><a class="header-anchor" href="#se-«-balader-»-dans-le-dom" aria-hidden="true">#</a> Se « balader » dans le DOM</h3>
<p>Revenons à ce qui nous intéresse le JavaScript dans un navigateur, vous avez la possibilité de naviguer dans le DOM HTML grâce au JavaScript. Nous allons pouvoir écrire des choses comme :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>section1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>titre<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ceci est un titre<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Et voilà un texte<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>titre2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ceci est un titre 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Et voilà un texte<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">let</span> titre1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"titre1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  titre1<span class="token punctuation">.</span>parentElement<span class="token punctuation">;</span> <span class="token comment">// Va retourner l'élément section parent</span>

  <span class="token keyword">let</span> section1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"section1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  section1<span class="token punctuation">.</span>firstChild<span class="token punctuation">;</span> <span class="token comment">// Va retourner le premier enfant de la section1, soit le h1</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Nous avons vu qu'un exemple en fonction des cas, et surtout grâce à la documentation vous serez capable de naviguer les yeux fermés dans le DOM de votre HTML.</p>
<h3 id="les-selecteurs-jquery-«-avances-»" tabindex="-1"><a class="header-anchor" href="#les-selecteurs-jquery-«-avances-»" aria-hidden="true">#</a> Les sélecteurs jQuery « avancés »</h3>
<p>jQuery permet également de naviguer rapidement dans le DOM avec des sélecteurs complexe (comme ceux utilisé en CSS) :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>section1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>titre<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ceci est un titre<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Et voilà un texte<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>titre2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ceci est un titre 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Et voilà un texte<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">let</span> h1 <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#section1 > h1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Retourne le H1 présent dans la section1</span>

  <span class="token keyword">let</span> h1bis <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"section > h1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Retourne l'ensemble des H1 présent dans les éléments section (c'est donc un tableau)</span>

  <span class="token keyword">let</span> h1ter <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#section1:first-child"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Retourne le premier enfant dans l'élément avec comme id section1, soit le titre</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Nous avons vu qu'un exemple en fonction des cas, et surtout grâce à la documentation vous serez capable de naviguer les yeux fermés dans le DOM de votre HTML.</p>
<h3 id="l-inspecteur-d-elements" tabindex="-1"><a class="header-anchor" href="#l-inspecteur-d-elements" aria-hidden="true">#</a> L'inspecteur d'éléments</h3>
<p>Votre inspecteur d'éléments (Chrome, Firefox, Safari) est très performant. Il vous permet de rapidement déboguer / écrire vos scripts JavaScript :</p>
<ul>
<li>La console permet de voir les erreurs.</li>
<li>La console permet également d'écrire du code JS.</li>
<li>Si vous sélectionnez un élément dans le HTML. Vous avez une variable <code>$0</code> dans la console qui va contenir l'élément courant. Pratique!</li>
<li>Le code est autocomplété avec le même raccourci que votre IDE (ctrl+espace)</li>
</ul>
<p>Testons ensemble.</p>
</template>
