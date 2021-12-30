<template><h1 id="creer-des-services-tres-rapidement-et-simplement" tabindex="-1"><a class="header-anchor" href="#creer-des-services-tres-rapidement-et-simplement" aria-hidden="true">#</a> Créer des services très rapidement (et simplement)</h1>
<p>Dans ce TP nous allons voir comment monter rapidement (et très simplement) un service avec Docker. Ici pas de Docker-Composes ou autre… Il s'agit de voir que Docker vous nous permettre de créer très simplement un « Serveur » pour répondre à une problématique ponctuelle de developpement.</p>
<div class="custom-container danger"><p class="custom-container-title">Un détail</p>
<p>Le plus important dans ce genre de « stack » c'est de se souvenir qu'un conteneur Docker est « Stateless », c'est à dire que les données seront éffacés à chaque redémarrage de celui-ci. Donc attention !</p>
</div>
<p>Vous avez oubliez comment fonctionne la ligne de commande de Docker ? <RouterLink to="/cheatsheets/docker/">Petit rappel ici sur son utilisation</RouterLink></p>
<h2 id="php" tabindex="-1"><a class="header-anchor" href="#php" aria-hidden="true">#</a> PHP</h2>
<p>Même si PHP est relativement et très simplement disponible sur différents environnements il est quand même intéressant de voir comment le lancer directement via Docker. Pourquoi ? Et bien, car Docker va nous permettre de lancer plusieurs versions du PHP sur la même machine. Pratique par exemple si vous souhaitez tester rapidement un développement. De plus nous allons voir qu'avec le système de volume, il sera possible de le faire en quelques secondes.</p>
<h3 id="php-7" tabindex="-1"><a class="header-anchor" href="#php-7" aria-hidden="true">#</a> PHP 7</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Pour *Nix</span>
docker run --rm -p <span class="token number">8080</span>:80 -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/var/www/html/ php:7-apache

<span class="token comment"># Pour Windows</span>
docker run --rm -p <span class="token number">8080</span>:80 -v %cd%:/var/www/html/ php:7-apache
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Tester la commande (et comprendre pourquoi ça ne fonctionne pas).</p>
<h3 id="php-8" tabindex="-1"><a class="header-anchor" href="#php-8" aria-hidden="true">#</a> PHP 8</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Pour *Nix</span>
docker run --rm -p <span class="token number">8080</span>:80 -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/var/www/html/ php:8-apache

<span class="token comment"># Pour Windows</span>
docker run --rm -p <span class="token number">8080</span>:80 -v %cd%:/var/www/html/ php:8-apache
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="postgresql-ou-autre-bdd" tabindex="-1"><a class="header-anchor" href="#postgresql-ou-autre-bdd" aria-hidden="true">#</a> PostgreSQL (ou autre BDD)</h2>
<p>Créer temporairement un serveur de base de données peut-être intéressant pour tester un projet ou une idée. Vous utilisez actuellement peut-être XAMPP ou WAMP pour faire ce genre de choses, mais vous êtes limité à une version précise de Postgres (ou MySQL) ; avec Docker pas de limite ! Vous avez l'embarras du choix pour la version.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -p <span class="token number">5432</span>:5432 --name fixy-postgres  -v ./pgData:/var/lib/postgresql/data -e <span class="token assign-left variable">POSTGRES_USER</span><span class="token operator">=</span>myUser -e <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span>myPassword -d postgres
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>C'est à vous, je vous laisse tester le container. Pour tester la connexion à votre base de données, je vous propose plusieurs solutions :</p>
<ul>
<li>[https://wiki.postgresql.org/wiki/PostgreSQL_Clients#HeidiSQL](HeidiSQL gratuit)</li>
<li>Datagrip de JetBrains</li>
<li>WebStorm / PHPStorm / InteliJ</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Vous ne savez pas comment faire ?</p>
<p>Appeler moi, nous allons le faire ensemble.</p>
</div>
<h3 id="une-autre-bdd" tabindex="-1"><a class="header-anchor" href="#une-autre-bdd" aria-hidden="true">#</a> Une autre BDD ?</h3>
<p>Vous n'utilisez pas PostgreSQL, mais MySQL !? Aucun problème sur le DockerHub il y a également une image officielle pour MySQL ; <a href="https://hub.docker.com/_/mysql" target="_blank" rel="noopener noreferrer">disponible ici<ExternalLinkIcon/></a></p>
<p>En regardant la documentation, je vous laisse faire la même chose que pour <a href="https://hub.docker.com/_/postgres" target="_blank" rel="noopener noreferrer">PostgreSQL<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">Ici pas de commande je vous laisse chercher</p>
<p>Juste une petite aide, le port de MySQL est le <code>3306</code>.</p>
</div>
<h2 id="wordpress" tabindex="-1"><a class="header-anchor" href="#wordpress" aria-hidden="true">#</a> Wordpress</h2>
<p>Nous avons vu PHP, une base de données (MySQL et PostgreSQL), pourquoi ne pas aller plus loin ? En effet Docker ne se limite pas à PHP / Python / MySQL nous pouvons packager ce que nous souhaitons. C'est le cas de plein de solutions Wordpress en fait parti ; vous avez sur le <a href="https://hub.docker.com/_/wordpress" target="_blank" rel="noopener noreferrer">DockerHub une image toute prête avec la dernière version de Wordpress<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -e <span class="token assign-left variable">WORDPRESS_DB_USER</span><span class="token operator">=</span>root -e <span class="token assign-left variable">WORDPRESS_DB_PASSWORD</span><span class="token operator">=</span><span class="token operator">&lt;</span>password<span class="token operator">></span> --name wordpress -p <span class="token number">8080</span>:80 -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/html:/var/www/html -d wordpress
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">vous voyez le problème ?</p>
<p>Et oui… Wordpress seul est pas très utile ! Il nous faut une base de données pour sauvegarder les données du container. C'est à partir d'ici que nous allons voir <RouterLink to="/tp/docker/docker_compose.html">la force de Docker Compose</RouterLink>.</p>
<p>Bien évidemment Docker Compose n'est pas obligatoire… Je vous laisse tester et regarder comment il est possible de faire <strong>sans</strong>.</p>
</div>
</template>
