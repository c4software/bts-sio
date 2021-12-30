<template><h1 id="le-docker-compose" tabindex="-1"><a class="header-anchor" href="#le-docker-compose" aria-hidden="true">#</a> Le Docker Compose</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce TP nous allons voir comment créer une vraie arborescence de service avec Docker. Dans une application réelle, il n’est pas rare d’avoir plusieurs technologies (ou plusieurs « services ») pour assurer le bon fonctionnement d’un système dans son ensemble (Exemple pour faire fonctionner mon application j’ai besoin de MySQL, PHP, et d’un serveur Web pour l’interface client).</p>
<p>C’est dans des cas comme celui-ci que nous allons utiliser Docker-Compose. Avec Docker compose-nous allons créer une architecture multiconteneur que l’on peut appeler « stack ». Cette Stack sera :</p>
<ul>
<li>Autonome (car prête à être « mise en place » partout, quelle que soit la plateforme cible).</li>
<li>Pré-paramètrée (tout est dans le fichier <code>docker-compose.yml</code>).</li>
<li>Isolé (tous les services ne sont pas forcément accessibles du public, mais sont accessibles par vos autres applications).</li>
<li>Administrable simplement grâce au cli (<code>docker-compose up/down/start/stop</code>).</li>
</ul>
<h2 id="installer-docker-compose" tabindex="-1"><a class="header-anchor" href="#installer-docker-compose" aria-hidden="true">#</a> Installer Docker Compose</h2>
<p>Docker Compose est fourni directement par les développeurs de Docker, cependant sous Linux il n’est pas inclus dans l’installation de base des paquets. Pour l’installer, rendez-vous sur la <a href="https://docs.docker.com/compose/install/#install-compose" target="_blank" rel="noopener noreferrer">documentation de Docker<ExternalLinkIcon/></a>.</p>
<p>Sous Windows et OSX pas de soucis Docker Compose est <strong>inclus</strong> dans l’installation de base.</p>
<h2 id="structure-d-un-docker-compose" tabindex="-1"><a class="header-anchor" href="#structure-d-un-docker-compose" aria-hidden="true">#</a> Structure d’un Docker Compose</h2>
<p>Un fichier <code>docker-compose.yml</code> utilise la syntaxe yaml. Pour rappel un fichier Yaml c’est :</p>
<blockquote>
<p>La syntaxe du flux YAML est relativement simple, efficiente, moins verbeuse que du XML, moins compacte cependant que du CSV. Elle a été établie pour être le plus lisible possible par des humains, tout en pouvant être mise en correspondance facilement avec les types de données précités, communs dans les langages de haut niveau. À ces langages il emprunte certaines notations.
– Les commentaires sont signalés par le signe dièse (#) et se prolongent sur toute la ligne. Si par contre le dièse apparait dans une chaine, il signifie alors un nombre littéral.
– Une valeur nulle s’écrit avec le caractère tilde (~)
Il est possible d’inclure une syntaxe JSON dans une syntaxe YAML.
– Les éléments de listes sont dénotés par le tiret (-), suivi d’une espace, à raison d’un élément par ligne.
Les tableaux sont de la forme clé : valeur, à raison d’un couple par ligne.
– Les scalaires peuvent être entourés de guillemets doubles (&quot;), ou simples ('), sachant qu’un guillemet s’échappe avec un antislash (), alors qu’un apostrophe s’échappe avec un autre apostrophe4. Ils peuvent de plus être représentés par un bloc indenté avec des modificateurs facultatifs pour conserver (|) ou éliminer (&gt;) les retours à la ligne.</p>
<ul>
<li>Plusieurs documents rassemblés dans un seul fichier sont séparés par trois traits d'union (---) ; trois points (…) optionnels marquent la fin d’un document dans un fichier.
– Les nœuds répétés sont initialement signalés par une esperluette (&amp;) puis sont référencés avec un astérisque (*) ; JSON, un langage concurrent de YAML, est compatible avec la syntaxe de JavaScript mais ne supporte pas cette notion de référence.
– L’indentation, par des espaces, manifeste une arborescence.</li>
</ul>
</blockquote>
<p>Source : Wikipedia</p>
<p>Voilà un exemple de Docker Compose :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>version : '3'
services :
  web :
    build: .
    ports :
     - "5000:5000"
  redis :
    image : "redis:alpine"
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Dans ce fichier, nous définissons 2 services.</p>
<p>Le premier nommé Web fait référence à un fichier DockerFile présent dans le même dossier que le <code>docker-compose.yml</code>. Le service en question expose au client final le port <code>5000</code>.</p>
<p>Le second service est un service nommé Redis, il fait référence à une image disponible sur https://hub.docker.com. Cette image n’expose aucun port au public mais sera accessible pour <code>web</code>.</p>
<h2 id="monter-une-application-grace-docker-compose" tabindex="-1"><a class="header-anchor" href="#monter-une-application-grace-docker-compose" aria-hidden="true">#</a> Monter une application grâce Docker Compose</h2>
<p>Dans cet exemple, vous allez voir comment il est possible de monter rapidement une application grâce à Docker. Nous allons en quelques lignes monter un blog (Wordpress) ainsi que la base de données.</p>
<p>Pour ça, dans un nouveau dossier, créez le fichier <code>docker-compose.yml</code> avec le contenu suivant :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3.9"</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> db_data<span class="token punctuation">:</span>/var/lib/mysql
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> somewordpress
      <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> wordpress
      <span class="token key atrule">MYSQL_USER</span><span class="token punctuation">:</span> wordpress
      <span class="token key atrule">MYSQL_PASSWORD</span><span class="token punctuation">:</span> wordpress

  <span class="token key atrule">wordpress</span><span class="token punctuation">:</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> db
    <span class="token key atrule">image</span><span class="token punctuation">:</span> wordpress<span class="token punctuation">:</span>latest
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"8000:80"</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">WORDPRESS_DB_HOST</span><span class="token punctuation">:</span> db<span class="token punctuation">:</span><span class="token number">3306</span>
      <span class="token key atrule">WORDPRESS_DB_USER</span><span class="token punctuation">:</span> wordpress
      <span class="token key atrule">WORDPRESS_DB_PASSWORD</span><span class="token punctuation">:</span> wordpress
      <span class="token key atrule">WORDPRESS_DB_NAME</span><span class="token punctuation">:</span> wordpress
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">db_data</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>Et voilà, c’est tout ! Votre stack Wordpress est prête il vous suffit de la lancer avec la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker-compose up
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Rendez-vous sur <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">localhost:8080<ExternalLinkIcon/></a> pour admirer votre travail.</p>
<div class="custom-container tip"><p class="custom-container-title">La différence avec un simple Docker ?</p>
<p>Ici nous avons Wordpress oui, mais également une base de données associées, nous avons donc l'ensemble de la « stack applicative » permettant de faire tourner Wordpress.</p>
</div>
<h3 id="remarques" tabindex="-1"><a class="header-anchor" href="#remarques" aria-hidden="true">#</a> Remarques</h3>
<ul>
<li>Vous n’avez pas eu à rédiger le moindre Dockerfile, pourquoi ?</li>
<li>Vous n’avez aucune persistance de données.</li>
</ul>
<h2 id="homeassistant" tabindex="-1"><a class="header-anchor" href="#homeassistant" aria-hidden="true">#</a> HomeAssistant ?</h2>
<p>Docker-Compose permet vraiment de tout faire, vous souhaitez mettre en place un petit serveur pour de la Domotique ? Pas de problème ! Vous pouvez monter très simplement un HomeAssistant :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3"</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">homeassistant</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> homeassistant
    <span class="token key atrule">image</span><span class="token punctuation">:</span> homeassistant/home<span class="token punctuation">-</span>assistant<span class="token punctuation">:</span>stable
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/config
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> host
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Je vous laisse tester.</p>
<h2 id="allons-plus-loin" tabindex="-1"><a class="header-anchor" href="#allons-plus-loin" aria-hidden="true">#</a> Allons plus loin ?</h2>
<p>Nous avons vu ici que nous pouvions montrer rapidement un ensemble d'image Docker pour créer une Stack Applicative. Docker-Compose permet également d'utiliser des images « local » (des Dockerfile comme vu précédement) pour les intégrer dans votre projet.</p>
<p>Je vous propose que nous réfléchissions ensemble à une « Stack » que nous pourrions dockerisé, un exemple avant de démarrer voilà mon Dockerfile</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3.7"</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web-server</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile
      <span class="token key atrule">context</span><span class="token punctuation">:</span> php/
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"./html/:/var/www/html/"</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token datetime number">80:80</span>

  <span class="token key atrule">adminer</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> adminer
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8080<span class="token punctuation">:</span><span class="token number">8080</span>

  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mariadb
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> example
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 3306<span class="token punctuation">:</span><span class="token number">3306</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mysql<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/mysql

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">mysql-data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>Voilà les autres fichiers nécéssaire, dans un dossier <code>php/</code> le fichier Dockerfile suivant :</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> php:7.4.14-apache</span>
<span class="token instruction"><span class="token keyword">RUN</span> docker-php-ext-install mysqli pdo pdo_mysql</span>
<span class="token instruction"><span class="token keyword">RUN</span> a2enmod userdir</span>
<span class="token instruction"><span class="token keyword">RUN</span> a2enmod rewrite</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>
