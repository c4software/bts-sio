<template><h1 id="decouverte-de-bootstrap" tabindex="-1"><a class="header-anchor" href="#decouverte-de-bootstrap" aria-hidden="true">#</a> Découverte de Bootstrap</h1>
<p>Dans ce TP nous allons découvrir le framework CSS Bootstrap.</p>
<p><a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap<ExternalLinkIcon/></a></p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Bootstrap est un Framework massivement utilisé dans le monde des développeurs Web. Il date maintenant de quelques années, mais celui-ci est mis à jour régulièrement ce qui lui permet d'être toujours à jour et toujours très intéressant. Les créateurs de Bootstrap sont Twitter vous ne serez donc pas vraiment surpris si celui-ci ressemble « sous certains aspects » à l'interface du site Twitter.com.</p>
<p>Bootstrap et très vaste, et très bien documenté le TP n'a pas pour but de vous apprendre « à utiliser Bootstrap », mais plutôt vous faire découvrir celui-ci pour que vous l'utilisiez aussi souvent que possible.</p>
<h2 id="creation-de-votre-fichier-html" tabindex="-1"><a class="header-anchor" href="#creation-de-votre-fichier-html" aria-hidden="true">#</a> Création de votre fichier HTML</h2>
<p>La première étape est toujours la même. Je vous laisse créer un nouveau fichier HTML avec une structure basique (comprendre HTML 5). ✋ n'oubliez pas d'y mettre la meta permettant de faire du responsive.</p>
<div class="custom-container tip"><p class="custom-container-title">Astuce du chef</p>
<p>Je vous le rappelle votre IDE à une fonctionnalité appelée « EMMET », vous avez donc des raccourcis à votre disposition permettant de gagner pas mal de temps.</p>
<p><img src="@source/tp/html_css/res/emmet.png" alt="emmet"></p>
</div>
<h2 id="ajout-de-bootstrap" tabindex="-1"><a class="header-anchor" href="#ajout-de-bootstrap" aria-hidden="true">#</a> Ajout de Bootstrap</h2>
<p>Pour ajouter Bootstrap le plus simple est de <strong>suivre la documentation officielle</strong>. Celle-ci est disponible sur <a href="https://getbootstrap.com/docs/4.5/getting-started/introduction/#quick-start" target="_blank" rel="noopener noreferrer">le site de Bootstrap dans la partie Get Started<ExternalLinkIcon/></a></p>
<p>Vous pouvez également remplacer votre fichier HTML vide par <a href="https://getbootstrap.com/docs/4.5/getting-started/introduction/#starter-template" target="_blank" rel="noopener noreferrer">le starter template proposé par Bootstrap<ExternalLinkIcon/></a></p>
<p>Je vous laisse valider que votre site fonctionne correctement.</p>
<p>✋ Vérifier bien qu'il n'y a pas d'erreur réseau lors du chargement de la page (avec l'inspecteur d'élément).</p>
<p>Questions :</p>
<ul>
<li>Pourquoi suivre la documentation officielle est très important ?</li>
<li>Dans le code que vous avez copié. Pouvez-vous me dire à quoi correspond le paramètre <code>integrity=</code> ?</li>
</ul>
<h2 id="creation-d-une-«-structure-»-«-layout-»" tabindex="-1"><a class="header-anchor" href="#creation-d-une-«-structure-»-«-layout-»" aria-hidden="true">#</a> Création d'une « structure » / « Layout »</h2>
<p>Maintenant que nous avons une page vide disposant de Bootstrap, je vous propose de créer votre première page Bootstrap. Dans Bootstrap nous avons à notre disposition des « Templates » ou plutôt des « layouts » tout prêt nous permettant de partir d'une base de code déjà faite.</p>
<p>C'est templates <a href="https://getbootstrap.com/docs/4.5/examples/" target="_blank" rel="noopener noreferrer">sont disponibles dans le menu de la documentation<ExternalLinkIcon/></a>.</p>
<div class="custom-container tip"><p class="custom-container-title">Pourquoi ? Quand ?</p>
<p>« Copier ≠ ne pas travailler » nous en avons parlé, mais c'est toujours un rappel important. Dans notre cas, Bootstrap nous propose des templates / gabarit déjà faits. Ils sont là pour :</p>
<ul>
<li>Vous faire gagner du temps.</li>
<li>Améliorer la qualité de vos sites Internet.</li>
<li>Vous montrer comment intégrer les éléments de Boostrap.</li>
</ul>
<p>N'hésitez pas à vous en servir dans vos développements. Ils sont <a href="https://getbootstrap.com/docs/4.5/examples" target="_blank" rel="noopener noreferrer">disponible ici<ExternalLinkIcon/></a></p>
</div>
<p>Faite votre choix, une fois que vous avez choisis regarder le code par exemple avec <a href="https://getbootstrap.com/docs/4.5/examples/starter-template/" target="_blank" rel="noopener noreferrer">du starter Template<ExternalLinkIcon/></a></p>
<h2 id="mise-en-place-d-une-navbar" tabindex="-1"><a class="header-anchor" href="#mise-en-place-d-une-navbar" aria-hidden="true">#</a> Mise en place d'une NavBar</h2>
<p>La NavBar est un composant très important. Il nous permet de mettre en place une navigation entre nos pages. On la retrouve un peu partout dans le monde du développement, avec Bootstrap nous avons un composant tout prêt pour gérer cette problématique.</p>
<p>Voilà un exemple de NavBar :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navbar navbar-expand-md navbar-dark bg-dark fixed-top<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navbar-brand<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Navbar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navbar-toggler<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">data-toggle</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>collapse<span class="token punctuation">"</span></span> <span class="token attr-name">data-target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#navbarsExampleDefault<span class="token punctuation">"</span></span> <span class="token attr-name">aria-controls</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navbarsExampleDefault<span class="token punctuation">"</span></span> <span class="token attr-name">aria-expanded</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span> <span class="token attr-name">aria-label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Toggle navigation<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navbar-toggler-icon<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>collapse navbar-collapse<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navbarsExampleDefault<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>navbar-nav mr-auto<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-item active<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-link<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Home <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sr-only<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>(current)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-item active<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nav-link<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Contact<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>La documentation de la NavBar est disponible sur le site. <a href="https://getbootstrap.com/docs/4.5/components/navbar/" target="_blank" rel="noopener noreferrer">Je vous laisse la consulter pour plus de détail<ExternalLinkIcon/></a></p>
<h3 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>Mettre en place une navbar sur votre site.</li>
</ul>
<h2 id="mise-en-place-d-une-card" tabindex="-1"><a class="header-anchor" href="#mise-en-place-d-une-card" aria-hidden="true">#</a> Mise en place d'une Card</h2>
<p>Un autre incontournable dans le développement est l'affichage de « Card » afin de structurer le contenu. Cette approche en Card a été introduite principalement par Google dans la plateforme Android. Mais c'est maintenant un basique dans le développement :</p>
<p><img src="@source/tp/html_css/res/card.png" alt="Card Bootstrap"></p>
<h3 id="a-faire-1" tabindex="-1"><a class="header-anchor" href="#a-faire-1" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>En vous inspirant <a href="https://getbootstrap.com/docs/4.5/components/card/" target="_blank" rel="noopener noreferrer">du code fourni sur la page<ExternalLinkIcon/></a>, mettre en place sur votre page une Card.</li>
</ul>
<h2 id="le-responsive" tabindex="-1"><a class="header-anchor" href="#le-responsive" aria-hidden="true">#</a> Le responsive</h2>
<p>Nous avons vu ensemble que Bootstrap était un framework permettant de gérer le responsive. En utilisant le système <a href="https://getbootstrap.com/docs/4.5/layout/grid/" target="_blank" rel="noopener noreferrer">de grid<ExternalLinkIcon/></a> nous allons mettre sur notre site une grille de <strong>3 colonnes</strong>.</p>
<p>Nous allons bien évidemment le faire ensemble.</p>
<h2 id="mise-en-place-d-un-formulaire" tabindex="-1"><a class="header-anchor" href="#mise-en-place-d-un-formulaire" aria-hidden="true">#</a> Mise en place d'un formulaire</h2>
<p>L'autre gros avantage de Bootstrap c'est l'aspect « propre » des formulaires. De bases sans que vous n'ayez aucune CSS vos formulaires seront « propre », pour ça rien de spécial à faire il suffit d'utiliser le code d'exemple fourni sur la documentation :</p>
<p><a href="https://getbootstrap.com/docs/4.5/components/forms/#form-row" target="_blank" rel="noopener noreferrer">Exemple ici<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">Petite remarque</p>
<p>Comme vous avez pu le constater dans l'exemple précédent. La documentation de Bootstrap nous propose de mélanger les form et les grid. Et c'est bien normal, chaque composant est utilisable avec l'ensemble des possibilités des Bootstrap.</p>
</div>
<h3 id="a-faire-2" tabindex="-1"><a class="header-anchor" href="#a-faire-2" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>En utilisant le code fourni sur le site de Bootstrap. Mettre en place <strong>dans la card</strong> précédemment créée un formulaire de contact.</li>
</ul>
<h2 id="les-utilities-de-bootstrap" tabindex="-1"><a class="header-anchor" href="#les-utilities-de-bootstrap" aria-hidden="true">#</a> Les utilities de Bootstrap</h2>
<p>Bootstrap nous propose également des « Utilities », les utilities sont des petites aides CSS, nous permettant de gagner du temps sur des taches récurrentes de mise en forme :</p>
<ul>
<li>Exemple <a href="https://getbootstrap.com/docs/4.5/utilities/borders/" target="_blank" rel="noopener noreferrer">les bordures<ExternalLinkIcon/></a></li>
<li>Ou encore <a href="https://getbootstrap.com/docs/4.5/utilities/shadows/" target="_blank" rel="noopener noreferrer">les ombres<ExternalLinkIcon/></a></li>
<li>Ou simplement <a href="https://getbootstrap.com/docs/4.5/utilities/text/" target="_blank" rel="noopener noreferrer">les alignements de textes<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Je vous vois là !</p>
<p>Pourquoi avoir appris les bases de la CSS ?! C'est si simple en copiant les class de Bootstrap ! Alors, oui c'est simple, mais :</p>
<ol>
<li>Vous avez maintenant les bases pour comprendre.</li>
<li>Vous êtes capable de les améliorer, surchargé, personnalisé.</li>
</ol>
</div>
<h3 id="a-faire-3" tabindex="-1"><a class="header-anchor" href="#a-faire-3" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>En utilisant les utilities, personnalisez votre page.</li>
</ul>
<h2 id="creer-une-seconde-page-dans-votre-site" tabindex="-1"><a class="header-anchor" href="#creer-une-seconde-page-dans-votre-site" aria-hidden="true">#</a> Créer une seconde page dans votre site</h2>
<p>Je vous laisse faire cette étape. Quelques règles à respecter cependant :</p>
<ul>
<li>Ajouter les liens dans la « NavBar ».</li>
<li>Avoir une page « home » (nommée <code>index.html</code>).</li>
</ul>
<h3 id="ajout-du-texte" tabindex="-1"><a class="header-anchor" href="#ajout-du-texte" aria-hidden="true">#</a> Ajout du texte</h3>
<p>Je vous laisse ajouter un texte sur cette page. Attention à bien utiliser :</p>
<ul>
<li>Les class.</li>
<li>Les balises titre.</li>
<li>Les balises paragraphe pour le contenu.</li>
</ul>
<h3 id="ajout-d-un-tableau" tabindex="-1"><a class="header-anchor" href="#ajout-d-un-tableau" aria-hidden="true">#</a> Ajout d'un tableau</h3>
<p>Les tableaux, gros sujet les tableaux non ?! Bootstrap va vous simplifier GRANDEMENT la création et surtout le style des tableaux. Rendez-vous sur <a href="https://getbootstrap.com/docs/4.5/content/tables/" target="_blank" rel="noopener noreferrer">la page Tables<ExternalLinkIcon/></a></p>
<p><img src="@source/tp/html_css/res/tables.png" alt="Les tableaux"></p>
<p>Le principe repose sur un ensemble de class. Ça passe du tableau « thème sombre » à « l'alignement ». Bref un vrai gain de temps.</p>
<h3 id="a-faire-4" tabindex="-1"><a class="header-anchor" href="#a-faire-4" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>Dans une nouvelle page, mettre en place un tableau et le personnaliser avec les classes de Bootstrap (couleurs, apparence, etc).</li>
</ul>
<h2 id="votre-page-d-accueil" tabindex="-1"><a class="header-anchor" href="#votre-page-d-accueil" aria-hidden="true">#</a> Votre page d'accueil</h2>
<p>Votre page d'accueil est très certainement « minimaliste », je vous propose de la rendre plus moderne (c'est très relatif comme notion). Pour ça nous allons utiliser une Cover appelée « Hero »</p>
<h3 id="mise-en-place-d-une-cover-«-hero-»" tabindex="-1"><a class="header-anchor" href="#mise-en-place-d-une-cover-«-hero-»" aria-hidden="true">#</a> Mise en place d'une cover « Hero »</h3>
<p>En vous inspirant du code de la page suivante : <a href="https://getbootstrap.com/docs/4.5/examples/cover/" target="_blank" rel="noopener noreferrer">https://getbootstrap.com/docs/4.5/examples/cover/<ExternalLinkIcon/></a> remplacer la home de votre page par une « Cover ».</p>
<div class="custom-container tip"><p class="custom-container-title">Pas d'idée pour l'image ?</p>
<p>Le plus simple c'est d'aller sur <a href="https://picsum.photos/" target="_blank" rel="noopener noreferrer">picsum.photos<ExternalLinkIcon/></a>, ce site propose des images « d'illustration » utilisable dans vos projets sans problème de droit.</p>
<p>Autre solution <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash<ExternalLinkIcon/></a>, ce site propose des images <em>libre de droits</em> utilisable dans vos projets.</p>
</div>
<h3 id="experimenter" tabindex="-1"><a class="header-anchor" href="#experimenter" aria-hidden="true">#</a> Experimenter !</h3>
<p>Le but de ce TP est l'expérimentation. N'hésitez pas à modifier, personnaliser, tester des idées. Donc, un fond de type « image », une toolbar avec une marge ou de couleur; rien ne sera assez fou !</p>
</template>
