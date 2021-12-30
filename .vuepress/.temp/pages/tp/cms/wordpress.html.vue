<template><h1 id="installer-configurer-wordpress" tabindex="-1"><a class="header-anchor" href="#installer-configurer-wordpress" aria-hidden="true">#</a> Installer &amp; Configurer Wordpress</h1>
<p>Créer un site depuis zéro n'est pas la seule solution, en informatique nous avons également ce que nous appelons des CMS. Un CMS est un outil qui va nous fournir une base de code « Client &amp; Administration » pour créer un site tel que :</p>
<ul>
<li>Un site web.</li>
<li>Une boutique en ligne.</li>
<li>Un Blog.</li>
</ul>
<p>Pour toutes ces situations, vous avez la possibilité d'installer, de configurer, de personnaliser un CMS.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce document nous allons voir l'installation de Wordpress, sa configuration et sa personnalisation avec des plug-ins.</p>
<p><img src="@source/tp/cms/res/logo.png" alt=""></p>
<h2 id="installer-wordpress" tabindex="-1"><a class="header-anchor" href="#installer-wordpress" aria-hidden="true">#</a> Installer Wordpress</h2>
<p>L'installation de la solution Wordpress est très simple elle se résume à</p>
<ul>
<li><a href="https://fr.wordpress.org/download/" target="_blank" rel="noopener noreferrer">Télécharger Wordpress<ExternalLinkIcon/></a></li>
<li>Extraire Wordpress « dans votre un dossier sur votre serveur Apache » (htdocs)</li>
<li>Ouvrir votre navigateur afin de configurer le Wordpress fraichement téléchargé</li>
</ul>
<h2 id="creer-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#creer-la-base-de-donnees" aria-hidden="true">#</a> Créer la base de données</h2>
<p>La première étape va être de créer une base de données « vide ». Celle-ci sera entièrement configurée / rempli par l'installeur de Wordpress.</p>
<ul>
<li><a href="http://localhost/phpmyadmin/" target="_blank" rel="noopener noreferrer">Ouvrir phpMyAdmin<ExternalLinkIcon/></a></li>
<li>Créer une nouvelle base de données nommée <code>wordpress</code></li>
</ul>
<p><img src="@source/tp/cms/res/pma.png" alt="phpMyAdmin"></p>
<h2 id="configurer-wordpress" tabindex="-1"><a class="header-anchor" href="#configurer-wordpress" aria-hidden="true">#</a> Configurer Wordpress</h2>
<p>Wordpress intègre une interface « pas à pas » pour configurer votre nouveau CMS. Cette interface va nous permettre de configurer :</p>
<p><img src="@source/tp/cms/res/setup_wp.png" alt="Première étape de l'installation"></p>
<h3 id="les-parametres-de-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#les-parametres-de-base-de-donnees" aria-hidden="true">#</a> Les paramètres de base de données.</h3>
<p>Nous avons créé une base de données nommée <code>wordpress</code>, nous allons donc indiquer ceci à l'installeur de Wordpress :</p>
<p><img src="@source/tp/cms/res/bdd_wp.png" alt="Base de données Wordpress"></p>
<p>Si tout se passe bien, vous devez avoir :</p>
<p><img src="@source/tp/cms/res/bdd_wp2.png" alt="Installation réussie"></p>
<div class="custom-container tip"><p class="custom-container-title">Lancer l'installation</p>
<p>Pour lancer l'installation, il suffit de cliquer sur « Run the Installation ». À cette étape Wordpress va créer l'ensemble de la base de données.</p>
<p>Soyez curieux ! Je vous invite <strong>fortement</strong> <a href="http://localhost/phpmyadmin/db_structure.php?server=1&amp;db=wordpress" target="_blank" rel="noopener noreferrer">à regarder les tables créées par Wordpress<ExternalLinkIcon/></a></p>
</div>
<h3 id="configurer-votre-wordpress" tabindex="-1"><a class="header-anchor" href="#configurer-votre-wordpress" aria-hidden="true">#</a> Configurer votre Wordpress</h3>
<p>Votre Wordpress est maintenant installé, il nous reste maintenant à spécifier quelques paramètres :</p>
<ul>
<li>Le nom du site.</li>
<li>Le nom et le mot de passe de l'administrateur.</li>
<li>Votre email « d'administrateur ».</li>
<li>Si votre Wordpress doit être indexé par les moteurs de recherche.</li>
</ul>
<p><img src="@source/tp/cms/res/configuration_wp.png" alt="Configuration de WP"></p>
<p>Une fois installé vous serez redirigé vers la partie d'admin de Wordpress.</p>
<div class="custom-container tip"><p class="custom-container-title">Et voilà !</p>
<p>Et oui c'est tout ! Votre CMS est maintenant installé. 🥳</p>
<p><img src="@source/tp/cms/res/wp_main_admin.png" alt="Wordpress c'est ça"></p>
</div>
<h2 id="installer-un-theme" tabindex="-1"><a class="header-anchor" href="#installer-un-theme" aria-hidden="true">#</a> Installer un thème</h2>
<p>Wordpress intègre un système permettant de télécharger en quelques clics un thème. Vous trouverez ça dans le menu « Apparence »</p>
<p>Vous pouvez personnaliser le thème dans le menu « Apparence &gt; Personaliser »</p>
<p>Testons ensemble, nous allons installer un Thème nommé « Nouveau Blog ».</p>
<div class="custom-container tip"><p class="custom-container-title">Un instant</p>
<p>Chaque thème propose des personnalisations différentes. Donc le choix du thème de départ est plutôt important.</p>
</div>
<h2 id="installer-des-plug-ins" tabindex="-1"><a class="header-anchor" href="#installer-des-plug-ins" aria-hidden="true">#</a> Installer des plug-ins</h2>
<p>Votre Wordpress est maintenant configuré et est prêt à être personnalisé plus en profondeur. Vous pouvez installer des plug-ins qui permettront de le modifier en profondeur afin d'en faire autre chose qu'un simple blog.</p>
<p>Les extensions sont disponibles dans le menu « Extensions »</p>
<p>Je vous propose d'installer un plug-in « très commun en ce moment » : <code>Cookie Notice</code></p>
<h2 id="creer-une-page" tabindex="-1"><a class="header-anchor" href="#creer-une-page" aria-hidden="true">#</a> Créer une page</h2>
<p>Un site sans page ce n’est pas un site non ? Avec Wordpress, vous pouvez créer très simplement des pages. La création de pages est complètement graphique et vous permet <strong>sans écrire de code</strong> la création de pages simple :</p>
<p><img src="@source/tp/cms/res/wp_page.png" alt="Création de pages"></p>
<p>L'éditeur est ce que l'on appelle un WYSIWYG, il vous permettra de rédiger visuellement votre contenu (texte, mais également intégration de contenu provenant d'autre site). Vous souhaitez ajouter une image ? Un simple Drag&amp;Drop est suffisant. Puissant hein !</p>
<p>✋ Au passage, le thème « Nouveau blog » que nous avons choisi tout à l'heure, nous permet de mettre une « page » en « page d'accueil » cette option est disponible dans « Apparence &gt; Personaliser ».</p>
<div class="custom-container tip"><p class="custom-container-title">et le responsive ?</p>
<p>Chez Wordpress ils ont également pensé à tout ça. Vous avez la possibilité de « Prévisualiser » votre page sous différents formats.</p>
<p><img src="@source/tp/cms/res/previsualiser.png" alt="Visuel"></p>
</div>
<h2 id="personnaliser-le-theme" tabindex="-1"><a class="header-anchor" href="#personnaliser-le-theme" aria-hidden="true">#</a> Personnaliser le thème</h2>
<p>Nous avons installé un thème oui, mais il ne vous convient peut-être pas à 100% ? Vous souhaitez peut-être le modifier pour le transformer légèrement. Pour ça vous avez quatre possibilités :</p>
<ul>
<li>Écrire une CSS personnalisée depuis l'interface d'admin.</li>
<li>Modifier le code source de thème depuis l'interface d'admin <strong>ou</strong> depuis le dossier thème dans le code source de wordpress.</li>
<li><a href="https://www.tutowp.fr/comment-creer-un-theme-enfant-sur-wordpress/" target="_blank" rel="noopener noreferrer">Créer un thème enfant<ExternalLinkIcon/></a></li>
<li><a href="https://capitainewp.io/formations/developper-theme-wordpress/creer-base-theme-wordpress/" target="_blank" rel="noopener noreferrer">Créer votre propre thème from scratch<ExternalLinkIcon/></a></li>
</ul>
<h2 id="et-la-maintenance" tabindex="-1"><a class="header-anchor" href="#et-la-maintenance" aria-hidden="true">#</a> Et la maintenance ?</h2>
<p>Maintenir un CMS est très important ! En effet un CMS est un développement « complexe », même si les développeurs de Wordpress ont travaillé avec des contraintes de sécurité importante un bug / faille est toujours possible.</p>
<p>C'est dans cet objectif que Wordpress intègre un système automatique et simplifié de mise à jour, il suffit de cliquer sur le bon menu dans l'interface.</p>
<div class="custom-container tip"><p class="custom-container-title">La sécurité avant tout</p>
<p>S'il y a des mises à jour, ce <strong>n’est pas pour vous embêter</strong> mais pour <strong>vous protéger !</strong></p>
</div>
</template>
