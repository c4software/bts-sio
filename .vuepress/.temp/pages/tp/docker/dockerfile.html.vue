<template><h1 id="les-dockerfile-s" tabindex="-1"><a class="header-anchor" href="#les-dockerfile-s" aria-hidden="true">#</a> Les Dockerfile’s</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Comme nous l’avons vu dans <RouterLink to="/tp/docker/introduction.html">le premier TP</RouterLink> chaque image Docker repose sur un fichier Dockerfile. Pour l’instant, nous n’avons pas écrit le nôtre, nous avons juste utilisé ceux fournis sur le DockerHub. Dans ce TP nous allons voir la structure d’un fichier Dockerfile, et vous allez écrire votre premier Dockerfile. Il aura pour but de définir l’ensemble de la « stack applicative » nécessaire au bon fonctionnement de l’application « TODO ».</p>
<h2 id="pourquoi-faire-des-dockerfile" tabindex="-1"><a class="header-anchor" href="#pourquoi-faire-des-dockerfile" aria-hidden="true">#</a> Pourquoi faire des Dockerfile</h2>
<p>Comme vous avez pu le voir sur le DockerHub il existe énormément d’images déjà prêtes, elles nous seront bien évidement utiles dans nos images Docker, mais tels quelles elles n’ont que « peu d’intérêts ». Nous allons donc écrire un fichier Dockefile qui va permettre de créer toute la définition pour le bon fonctionnement de l’application « TODO » que vous avez écrit dans un autre TP.</p>
<p>Une fois le fichier Dockerfile écrit, votre application sera fonctionnelle sur toutes les plateformes supportées par Docker (Windows, Linux, OSX, Raspberry Pi…), fonctionnelles oui, mais surtout fonctionnelle en quelques secondes !</p>
<h2 id="creer-un-dockerfile" tabindex="-1"><a class="header-anchor" href="#creer-un-dockerfile" aria-hidden="true">#</a> Créer un Dockerfile</h2>
<p>Les « Dockerfile » sont des simples fichiers textes, mais avec un formalisme précis. Par exemple :</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> alpine:latest</span>
<span class="token instruction"><span class="token keyword">LABEL</span> Valentin Brosseau <span class="token string">"c4software@gmail.com"</span></span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">"echo"</span>, <span class="token string">"Mon premier Dockerfile"</span>]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Avant de « builder » cette première image, arrêtons-nous sur les différentes lignes :</p>
<ul>
<li>« FROM alpine:latest », c’est l’image de référence, dans le cas présent une image très légère (un linux avec très peu de dépendances).</li>
<li>« LABEL Valentin Brosseau &quot;c4software@gmail.com&quot; », le mainteneur de l’image (purement indicatif).</li>
<li>« ENTRYPOINT [&quot;echo&quot;, &quot;'Mon premier Dockerfile'&quot;] », la commande qui sera lancée au <strong>démarrage</strong> de votre image.</li>
</ul>
<p>Pour finir, enregistrer la définition précédente dans un fichier nommé « Dockerfile ».</p>
<h2 id="builder-votre-image" tabindex="-1"><a class="header-anchor" href="#builder-votre-image" aria-hidden="true">#</a> Builder votre image</h2>
<p>Pour builder votre image il suffit de lancer la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker build --tag <span class="token string">"docker-hello:latest"</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Avant de lancer cette commande, regardons les différents éléments :</p>
<ul>
<li>« --tag &quot;docker-hello&quot; », c’est le nom de votre image.</li>
<li>« …:latest », c’est la version de votre image. Latest indique la version la plus récente.</li>
<li>« . » indique à Docker que le fichier Dockerfile est dans le dossier courant.</li>
</ul>
<p>Lancer la précédente commande dans le dossier où vous avez créé le fichier Dockerfile.</p>
<p><img src="@source/tp/docker/ressources/build.png" alt="exemple build"></p>
<h2 id="image-docker-pour-l-application-todo" tabindex="-1"><a class="header-anchor" href="#image-docker-pour-l-application-todo" aria-hidden="true">#</a> Image Docker pour l’application &quot;TODO&quot;</h2>
<p>Faire un test c’est bien! Mais maintenant que l’on connait les bases d’une image Docker, nous allons créer une image Docker qui va nous permettre de lancer rapidement (et très simplement) l’application sans avoir à se soucier de l’environnement sur lequel vous allez lancer « votre application / site web ».</p>
<h3 id="_1-ecriture-du-dockerfile" tabindex="-1"><a class="header-anchor" href="#_1-ecriture-du-dockerfile" aria-hidden="true">#</a> 1. Écriture du Dockerfile</h3>
<p>Pour écrire notre Dockerfile nous allons avoir besoin de connaitre les technologies nécessaires au bon fonctionnement de notre application. Dans notre cas, il faut le langage de programmation de la partie serveur :</p>
<ul>
<li>[…] (À vous de trouver…)</li>
</ul>
<p>Une fois que c’est fait, il faut trouver une image de base qui nous servira de référence. Dans notre cas … PHP. Une image officielle existe : <a href="https://hub.docker.com/_/php/" target="_blank" rel="noopener noreferrer">Docker Hub PHP<ExternalLinkIcon/></a>.</p>
<ul>
<li>Quelle version choisissez-vous ?</li>
<li>Pourquoi ?</li>
</ul>
<p>Pour continuer nous allons utiliser l’image PHP 7 Apache. Voilà le début de notre Dockerfile :</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> php:7-apache</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> Valentin Brosseau <span class="token string">"c4software@gmail.com"</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>La base de votre Dockerfile est terminée. Nous allons voir comment ajouter le code source dans l’image.</p>
<h3 id="_2-ajout-des-sources-dans-l-image" tabindex="-1"><a class="header-anchor" href="#_2-ajout-des-sources-dans-l-image" aria-hidden="true">#</a> 2. Ajout des sources dans l’image</h3>
<p>Nous avons vu dans le premier TP qu’il était possible de faire un « montage ». C’est pratique, pour ajouter de la donnée temporaire, mais dans le cas présent ce que l’on veut c’est faire une image statique qui sera transportable nous allons donc utiliser la commande <code>COPY</code>.</p>
<p>La commande <code>COPY</code> permet de copier des fichiers (dossiers, fichiers, etc.) directement dans l’image qui sera construite. Une fois « builder » les données seront persistantes et les modifications seront effacées à chaque redémarrage de l’image (intéressant d’un point de vue de la sécurité).</p>
<p>La commande <code>COPY</code> prend deux arguments le fichier « sources » et la destination dans votre image. Modifions le fichier Dockerfile pour ajouter la commande <code>COPY</code> suivante :</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> php:7-apache</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> Valentin Brosseau <span class="token string">"c4software@gmail.com"</span></span>

<span class="token instruction"><span class="token keyword">COPY</span> src/ /var/www/html/</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Le premier dossier c’est vos sources, sur votre machine dans le même dossier que le fichier Dockerfile, créez un dossier nommé <code>src</code> avec à l’intérieur les sources de votre projet <code>todo-vuejs</code>.</p>
<p>Et voilà! C’est terminé. Votre image est prête à être « build ».</p>
<h3 id="_3-build-de-l-image" tabindex="-1"><a class="header-anchor" href="#_3-build-de-l-image" aria-hidden="true">#</a> 3. Build de l’image</h3>
<p>Maintenant que notre image est prête nous allons pouvoir builder l’image :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker build --tag <span class="token string">"vuejs-todo:latest"</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Ding ! C’est prêt.</p>
<h3 id="_4-lancer-votre-application" tabindex="-1"><a class="header-anchor" href="#_4-lancer-votre-application" aria-hidden="true">#</a> 4. Lancer votre application</h3>
<p>Votre application étant buildée pour la lancer il suffit de faire :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -p <span class="token number">8888</span>:80 vuejs-todo:latest
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Votre application est maintenant <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">disponible ici<ExternalLinkIcon/></a>.</p>
</template>
