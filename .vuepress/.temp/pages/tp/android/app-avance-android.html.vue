<template><h1 id="application-client-serveur" tabindex="-1"><a class="header-anchor" href="#application-client-serveur" aria-hidden="true">#</a> Application Client / Serveur</h1>
<p>L'objectif de cette application va être la mise en pratique de la communication Client et Serveur d'une application, mais également les à côté de celle-ci (Serveur, Base de données, etc.). Cette application couvrira l'ensemble des compétences vu ensemble :</p>
<ul>
<li>La conception (<strong>et l'organisation</strong> d'une application, package, MVVM, Fragment si nécessaire)</li>
<li>La communication via le réseau</li>
<li>La modélisation d'un projet « mobile ».
<ul>
<li>Base de données</li>
<li>« Authentification d'un client » (au minimum reconnaissance de celui-ci)</li>
</ul>
</li>
<li>La qualité de code (indentation, organisation).</li>
<li>La mise en place de commentaires (pour faciliter la compréhension).</li>
<li>L'aspect « propre » des différents écrans de votre application.</li>
</ul>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink><ul><li><RouterLink to="#l-application">L&#39;application</RouterLink></li><li><RouterLink to="#les-clients-qui-collectent-de-l-information">Les clients qui collectent de l&#39;information</RouterLink></li><li><RouterLink to="#le-serveur">Le serveur</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Une application Android est rarement toute seule, c'est cet aspect que je vous propose de travailler dans ce projet. Nous allons créer ensemble (enfin vous) une application qui sera constituée de deux types de clients :</p>
<ul>
<li>Les clients qui affichent des informations.</li>
<li>Les clients qui collectent de l'information.</li>
</ul>
<p>En parallèle des clients, vous allez devoir construire un « serveur », ce serveur aura pour but :</p>
<ul>
<li>Identifier les clients (via un ID, ou un UUID, ou un TOKEN).
<ul>
<li>La création du client sera faite via une vue de l'application. Celui-ci devra fournir « Son ID / UUID / TOKEN » et également un nom.</li>
<li>Les clients seront identifiés lors des appels réseau par l'UI / UUID ou Token on fonction du choix.</li>
</ul>
</li>
<li>Stocker les informations collectées par « les clients » (avec historiques). <strong>L'information doit être horodatée</strong>.</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center"><img src="@source/tp/android/ressources/collecteur_principe.png" alt="Principe de fonctionnement"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Principe de fonctionnement</td>
</tr>
</tbody>
</table>
<h3 id="l-application" tabindex="-1"><a class="header-anchor" href="#l-application" aria-hidden="true">#</a> L'application</h3>
<p>L'application de collecte et d'affichage est unique. Celle-ci est découpée en deux parties :</p>
<ul>
<li>La collecte.</li>
<li>L'affichage des données d'un client précis (via saisie / flashage de son UUID).</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">La collecte ≠ Affichage</p>
<p>La partie collecte est optionnelle, <strong>les clients n'ont donc pas l'obligation d'être connus du serveur</strong>.</p>
</div>
<h3 id="les-clients-qui-collectent-de-l-information" tabindex="-1"><a class="header-anchor" href="#les-clients-qui-collectent-de-l-information" aria-hidden="true">#</a> Les clients qui collectent de l'information</h3>
<p>Les clients qui collectent de l'information sont des clients comme les autres. Cette collecte repose sur le principe d'authentification par le serveur (via UUID, ID ou Token au choix). Cette collecte nécessitera donc une reconnaissance « un échange » préalable entre le client et le serveur.</p>
<div class="custom-container tip"><p class="custom-container-title">Un échange persistant</p>
<p>L'échange entre le client est à faire qu'une seule fois. Vous devez sauvegarder dans l'application que celle-ci est maintenant « appairée » avec le serveur, suivant l'UUID / TOKEN / ID choisit ; cet appairage <strong>doit-être</strong> sauvegardé dans les paramètres de l'application et doit-être restauré à chaque démarrage de celle-ci.</p>
</div>
<div class="custom-container danger"><p class="custom-container-title">Pas de collecte en arrière-plan</p>
<p>Votre application doit collecter de l'information uniquement si le smartphone est actif <strong>et affiche actuellement l'application</strong>. Vous pouvez, si vous le désirez, empêcher <a href="https://developer.android.com/training/scheduling/wakelock" target="_blank" rel="noopener noreferrer">la veille du smartphone sur la vue de collecte<ExternalLinkIcon/></a></p>
</div>
<h4 id="informations-collectees" tabindex="-1"><a class="header-anchor" href="#informations-collectees" aria-hidden="true">#</a> Informations collectées</h4>
<p>La collecte devra être faite à interval régulier (~60secondes), celle-ci a pour but de collecter un maximum d'informations depuis les capteurs du smartphone :</p>
<ul>
<li>La luminosité ambiante.</li>
<li>Le niveau de batterie.</li>
<li>La pression.</li>
<li>La température.</li>
<li>La position GPS / Réseau du téléphone (Lat, Long).</li>
</ul>
<p>Vous pouvez utiliser <a href="https://developer.android.com/guide/topics/sensors/sensors_environment" target="_blank" rel="noopener noreferrer">la documentation officielle pour vous aider dans cette tâche<ExternalLinkIcon/></a>.</p>
<div class="custom-container tip"><p class="custom-container-title">Pas de limite</p>
<p>Vous avez d'autres idées pour la collecte ? Pas de problème, je vous laisse ajouter ce que vous souhaitez.</p>
<p><strong>Vous avez les playservices ?</strong> si oui, vous pouvez même savoir si la personne marche / cours / roule en voiture.</p>
</div>
<p>Cette vue de collecte, n'affichera rien de particulier à l'utilisateur autre qu'un écran avec « une animation de collecte » et un bouton lui permettant d'arrêter celle-ci. Cette collecte sera envoyée au travers d'une API au serveur.</p>
<h4 id="affichage-client" tabindex="-1"><a class="header-anchor" href="#affichage-client" aria-hidden="true">#</a> Affichage client</h4>
<p>L'affichage des informations sera réalisé dans un autre écran de l'application. Celui-ci devra afficher :</p>
<ul>
<li>Les données d'un client choisi (via saisie ou flash QRCode du code)</li>
<li>L'affichage des données du client devra indiquer l'horodatage de la dernière collecte.</li>
<li>Un bouton d'actualisation.</li>
<li>Possibilités d'affichage (implémentation au choix) :
<ul>
<li>Via une Recyclerview simple (mais avec des noms des capteurs dans la langue du client).</li>
<li>Via un Layout dédié avec des icônes en fonction du type de capteurs (une carte OpenStreetMap peut-être utilisée pour la position GPS).</li>
</ul>
</li>
<li><strong>Bonus</strong> la vue peut-être découpée en deux tabs afin d'avoir une vue listant l'ensemble des collecteurs de données connues par le serveur. Chaque ligne contiendra une action permettant d'afficher un « client précis » (donc sans connaitre son code préalablement).</li>
<li><strong>Bonus</strong> affichage des données historiques d'un client.</li>
</ul>
<h3 id="le-serveur" tabindex="-1"><a class="header-anchor" href="#le-serveur" aria-hidden="true">#</a> Le serveur</h3>
<p>Le serveur est à implémenter dans le langage de votre choix. Celui-ci doit être capable de :</p>
<ul>
<li>Stocker l'information dans une base de données.</li>
<li>Créer un client.</li>
<li>Récupérer les dernières données d'un client via son UUID / ID / TOKEN.</li>
<li><strong>Bonus</strong> liste de l'ensemble des clients présents en base de données.</li>
<li><strong>Bonus</strong> obtention des données historiques d'un client via son UUID / ID / TOKEN.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Langage au choix</p>
<p>Je vous laisse le choix du langage pour le développement du serveur.</p>
</div>
</template>
