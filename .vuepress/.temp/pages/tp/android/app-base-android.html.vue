<template><h1 id="android-base-projet-final" tabindex="-1"><a class="header-anchor" href="#android-base-projet-final" aria-hidden="true">#</a> Android base : Projet final</h1>
<p>L'objectif de cette application est de valider votre maitrise /connaissances des éléments vus ensemble. Dans « ce cahier des charges » vous avez les éléments <strong>minimums</strong> à fournir, <strong>cependant</strong> je vous invite vivement à vous approprier le sujet pour proposer une application originale et qui vous ressemble.</p>
<p>Au dela du rendu et de l'aspect fonctionnel de votre application, je vous invite également à soigner :</p>
<ul>
<li>La qualité de code (indentation, organisation).</li>
<li>La mise en place de commentaires (pour faciliter la compréhension).</li>
<li>L'aspect « propre » des différents écrans de votre application.</li>
</ul>
<h2 id="cahier-des-charges" tabindex="-1"><a class="header-anchor" href="#cahier-des-charges" aria-hidden="true">#</a> Cahier des charges</h2>
<p>L'application à fournir doit contenir <strong>au minimum</strong> les éléments suivants :</p>
<ul>
<li>L'icône de l'application doit être personnalisée.</li>
<li>Les textes doivent être « i18n » (en Français <strong>et</strong> en Anglais)</li>
<li>La structure de votre application doit être rangée en « package », en suivant l'organisation proposé en cours, ou la vôtre si celle-ci montre une organisation compréhensible.</li>
<li>Un « splashscreen » qui s'affiche au minimum 2s. Celui-ci doit être constitué d'une image « logo », et d'un texte indiquant votre nom + prénom ainsi que l'année.</li>
<li>Une activity Home avec :
<ul>
<li>Un logo</li>
<li>3 éléments cliquables :
<ul>
<li>Localisation</li>
<li>Historique des localisations précédemment réalisé.</li>
<li>Paramétrages</li>
</ul>
</li>
</ul>
</li>
<li>Une activity Localisation permettant de :
<ul>
<li>Localiser la personne (via le GPS ou le Réseau au choix).</li>
<li>Une fois la localisation obtenue, la distance entre l'ESEO et sa position doit être affichée en <strong>kilomètre</strong>.</li>
<li>À chaque localisation, à l'aide des <strong>SharedPreferences</strong>, enregistrez la demande pour la lister dans la vue « historique ».</li>
<li>Vous devez gérer correctement le flow permission comme vue ensemble (avec gestion des erreurs)</li>
</ul>
</li>
<li>Une activity Historique :
<ul>
<li>Utilisation d'un <strong>Recyclerview</strong>.</li>
<li>Affiche l'historique des positions enregistrées.</li>
<li><em>Bonus</em> : Action pour vider la liste.</li>
<li><em>Bonus</em> : Si la liste est vide, l'accès à cette activity doit être impossible.</li>
<li><em>Bonus</em> : Ouverture de l'application « de cartographie » du téléphone à la position enregistrée.</li>
<li><em>Bonus</em> : Affichage pour chaque élément du « reverse de la position GPS en texte » (comme vu ensemble).</li>
</ul>
</li>
<li>Une activity Paramètres :
<ul>
<li>Utilisation d'un <strong>Recyclerview</strong> qui doit contenir :
<ul>
<li>L'accès aux paramètres <strong>de l'application</strong>.</li>
<li>L'accès au paramétrage de <strong>localisation du téléphone</strong>.</li>
<li>Ouverture de l'application « carte » du téléphone sur la position géo de l'ESEO.</li>
<li>Ouverture du site de l'ESEO.</li>
<li>Ouverture de l'application « email » pour vous contacter. (lien type mailto)</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="wireframe" tabindex="-1"><a class="header-anchor" href="#wireframe" aria-hidden="true">#</a> Wireframe</h2>
<p><img src="@source/tp/android/ressources/app-base-wireframe.png" alt="Wireframe"></p>
<div class="custom-container danger"><p class="custom-container-title">C'est votre application !</p>
<p>Les wireframes ne sont que « la base » / « les fils de fer » de l'application. Je vous laisse être imaginatif pour le rendu final.</p>
<p>N'hésitez pas à mettre des icônes, des textes, des images.</p>
</div>
</template>
