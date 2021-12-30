<template><h1 id="transformer-un-raspberry-pi-en-server-web" tabindex="-1"><a class="header-anchor" href="#transformer-un-raspberry-pi-en-server-web" aria-hidden="true">#</a> Transformer un Raspberry Pi en server Web</h1>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#flasher-installer-le-raspberry-pi">Flasher / installer le Raspberry Pi</RouterLink><ul><li><RouterLink to="#activer-le-ssh">Activer le SSH</RouterLink></li></ul></li><li><RouterLink to="#installer-docker">Installer Docker</RouterLink></li><li><RouterLink to="#installer-docker-compose">Installer Docker-Compose</RouterLink></li><li><RouterLink to="#installer-la-stack-lamp">Installer la stack LAMP</RouterLink></li><li><RouterLink to="#lancer-la-stack-lamp">Lancer la stack LAMP</RouterLink></li><li><RouterLink to="#fonctionnement">Fonctionnement</RouterLink></li><li><RouterLink to="#acces-a-la-base-de-donnees">Accès à la base de données</RouterLink></li><li><RouterLink to="#fonctionnement-du-ftp-integre">Fonctionnement du FTP intégré</RouterLink><ul><li><RouterLink to="#mode-1-ouvert-a-tous">Mode 1 : Ouvert à tous.</RouterLink></li><li><RouterLink to="#mode-2-le-mode-classique">Mode 2 : Le mode classique</RouterLink></li></ul></li><li><RouterLink to="#acceder-a-votre-raspberry-pi">Accéder à votre Raspberry Pi</RouterLink></li></ul></nav>
</details>
<div class="custom-container tip"><p class="custom-container-title">C'est Open-Source</p>
<p>La solution présentée dans cette page décrit l'installation de la solution Open-Source développée par Valentin Brosseau <a href="https://github.com/c4software/rpi-docker-lamp-stack" target="_blank" rel="noopener noreferrer">disponible sur GitHub<ExternalLinkIcon/></a></p>
</div>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans cette page nous allons détailler la mise en place d'un serveur web « Multi-utilisateur » / « Multi-Projets ». Ce serveur reposera sur une plateforme connue du type Raspberry Pi et sur le système de container Docker.</p>
<p>La solution final pourra ressembler à :</p>
<table>
<thead>
<tr>
<th><img src="@source/tp/rpi/res/version1.jpg" alt="Version 1"></th>
<th><img src="@source/tp/rpi/res/version2.jpg" alt="Version 2"></th>
</tr>
</thead>
</table>
<p><img src="https://github.com/c4software/rpi-docker-lamp-stack/blob/main/home.png?raw=true" alt="Dashboard"></p>
<div class="custom-container warning"><p class="custom-container-title">Un détail qui compte</p>
<p>Ce que nous allons installer n'est pas conçu pour héberger des sites publics. Pourquoi ? La configuration du serveur Apache est trop permissive et ne convient que pour du développement.</p>
<p>L'autre raison est le FTP, celui-ci est volontairement ouvert à toutes les connexions. Ce fonctionnement nous sera très utile pour la phase de création d'un site, mais <strong>c'est bien évidemment à proscrire</strong> pour une machine ouverte sur Internet.</p>
</div>
<p>Ce que nous allons installé s'appelle une stack LAMP (Linux, Apache, MySQL, PHP) elle ne diffère pas de celle que vous pouvez installer sur votre ordinateur avec des logiciels tels que (XAMPP ou WAMP ou autres). La seule différence c'est que nous allons dédier une machine pour ça.</p>
<center>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/y7HzFidjKjs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>
<h2 id="flasher-installer-le-raspberry-pi" tabindex="-1"><a class="header-anchor" href="#flasher-installer-le-raspberry-pi" aria-hidden="true">#</a> Flasher / installer le Raspberry Pi</h2>
<p>La première étape va être d'installer le système d'exploitation de votre Raspberry Pi. Pour cette étape, il n'y a pas vraiment de règle. Personnellement j'utilise l'outil fourni par la fondation :</p>
<ul>
<li><a href="https://www.raspberrypi.org/software/" target="_blank" rel="noopener noreferrer">Raspberry Pi Imager<ExternalLinkIcon/></a></li>
</ul>
<p><img src="@source/tp/rpi/res/rpi-imager.png" alt="Rpi imager"></p>
<p>Pour le choix de la version du système, je vous propose de partir sur celui le plus light possible à savoir « Raspberry Pi OS Lite ».</p>
<div class="custom-container tip"><p class="custom-container-title">Pas de bureau</p>
<p>La version Lite ne contient aucun environnement de bureau. Il faudra donc activer le SSH (accès distant) avant de démarrer le Raspberry Pi. Cet accès SSH nous permettra d'effectuer les quelques commandes nécessaires au démarrage de notre future LAMP.</p>
</div>
<h3 id="activer-le-ssh" tabindex="-1"><a class="header-anchor" href="#activer-le-ssh" aria-hidden="true">#</a> Activer le SSH</h3>
<p>Avant de redémarrer le Raspberry Pi avec la carte SD inséré, nous allons activer le SSH sur le « mini-ordinateur ». Pour ça rien de bien compliqué il suffit de créer un fichier nommé <code>ssh</code> sur la partition de boot de la carte SD.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Exemple sous mac</span>
<span class="token function">touch</span> /Volumes/boot/ssh
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Une fois le fichier créé vous pouvez retirer la Carte SD et l'insérer dans votre Raspberry Pi</p>
<h2 id="installer-docker" tabindex="-1"><a class="header-anchor" href="#installer-docker" aria-hidden="true">#</a> Installer Docker</h2>
<p>Docker n'est pas disponible de base sur l'OS fourni par la fondation. Par contre il est très simple de l'installer grace au système de paquet intégré à Raspbian (pardon Raspberry Pi OS).</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Étape 1 : Mettre à jour l'OS</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">apt-get</span> upgrade

<span class="token comment"># Étape 2 : Télécharger et lancer le script d'installation de Docker</span>
<span class="token function">curl</span> -fsSL https://get.docker.com -o get-docker.sh <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">sh</span> get-docker.sh

<span class="token comment"># Étape 3 : Autoriser l'utilisateur pi (celui par défaut) à lancer la commande docker</span>
<span class="token function">sudo</span> <span class="token function">usermod</span> -aG docker pi
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">Attention danger</p>
<p>De manière générale lancer <strong>en root</strong> un script téléchargé depuis Internet est une <strong>très mauvaise pratique</strong>.</p>
</div>
<h2 id="installer-docker-compose" tabindex="-1"><a class="header-anchor" href="#installer-docker-compose" aria-hidden="true">#</a> Installer Docker-Compose</h2>
<p>Docker compose est un ajout intéressant à Docker, il va nous permettre de définir des « stacks applicatives » à base de différent container Docker. Dans notre cas, ça va être très intéressant en effet un serveur LAMP est en réalité constitué de différents logiciels :</p>
<ul>
<li>Apache + PHP.</li>
<li>MySQL.</li>
<li>Un serveur FTP.</li>
</ul>
<p>Pour l'installer, il suffit de faire :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> -y <span class="token function">install</span> libffi-dev libssl-dev python3-dev python3 python3-pip
<span class="token function">sudo</span> pip3 -v <span class="token function">install</span> docker-compose
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>À partir de maintenant vous avez l'ensemble des outils permettant de lancer notre serveur LAMP. D'ailleurs ce que nous avons installé nous permettra de faire bien plus. Il sera possible de lancer n'importe quelle image Docker (pratique 😉)</p>
</div>
<h2 id="installer-la-stack-lamp" tabindex="-1"><a class="header-anchor" href="#installer-la-stack-lamp" aria-hidden="true">#</a> Installer la stack LAMP</h2>
<p>Docker est maintenant disponible sur notre machine. Nous allons donc simplement récupérer les sources « de la stacks » LAMP pour la lancer sur notre Raspberry Pi. Le code est entièrement disponible sur <a href="https://github.com/c4software/rpi-docker-lamp-stack" target="_blank" rel="noopener noreferrer">mon compte Github<ExternalLinkIcon/></a> nous allons donc avoir besoin de <code>git</code> pour le récupérer :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">git</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Puis</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone git@github.com:c4software/rpi-docker-lamp-stack.git
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>En réalisant cette commande vous allez créer dans <strong>le dossier courant</strong> un dossier nommé <code>rpi-docker-lamp-stack</code> celui-ci contiendra l'ensemble du code nécessaire au fonctionnement du logiciel.</p>
</div>
<h2 id="lancer-la-stack-lamp" tabindex="-1"><a class="header-anchor" href="#lancer-la-stack-lamp" aria-hidden="true">#</a> Lancer la stack LAMP</h2>
<p>Maintenant que le code est sur votre Raspberry Pi. Il suffit de le lancer pour le rendre actif. Avec Docker, pas d'icône sur le bureau! Il suffit de :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> rpi-docker-lamp-stack
docker-compose up -d
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Et c'est parti !</p>
<p>Votre stack LAMP est maintenant disponible sur votre Raspberry Pi. Vous pouvez y accéder via votre navigateur à l'adresse :</p>
<p><a href="http://raspberrypi.local/" target="_blank" rel="noopener noreferrer">http://raspberrypi.local/<ExternalLinkIcon/></a></p>
</div>
<h2 id="fonctionnement" tabindex="-1"><a class="header-anchor" href="#fonctionnement" aria-hidden="true">#</a> Fonctionnement</h2>
<p>Vous avez donc lancé l'ensemble des services de la stack LAMP sur votre Raspberry PI. C'est terminé ! Votre serveur est prêt à recevoir vos projets ; Votre Raspberry Pi expose les services suivants :</p>
<table>
<thead>
<tr>
<th>Service</th>
<th style="text-align:right">Port</th>
</tr>
</thead>
<tbody>
<tr>
<td>HTTP</td>
<td style="text-align:right">80</td>
</tr>
<tr>
<td>FTP</td>
<td style="text-align:right">20121</td>
</tr>
<tr>
<td>SQL</td>
<td style="text-align:right">3306</td>
</tr>
</tbody>
</table>
<p>Nous avons donc :</p>
<ul>
<li>Un Serveur Web (Apache + PHP)</li>
<li>Un Serveur SQL (MariaDB)</li>
<li>Un serveur FTP (pour envoyer votre code source)</li>
</ul>
<h2 id="acces-a-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#acces-a-la-base-de-donnees" aria-hidden="true">#</a> Accès à la base de données</h2>
<p>Pour accéder à la base de données, vous avez deux possibilités :</p>
<ul>
<li>Avec un logiciel depuis votre poste.</li>
<li><a href="http://raspberrypi.local/adminer/" target="_blank" rel="noopener noreferrer">Via Adminer, intégré dans la stack<ExternalLinkIcon/></a></li>
</ul>
<p>Pour les login / mot de passe :</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>host<span class="token operator">:</span> mariadb
user<span class="token operator">:</span> root
password<span class="token operator">:</span> MARIADB<span class="token operator">|</span>secret
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="fonctionnement-du-ftp-integre" tabindex="-1"><a class="header-anchor" href="#fonctionnement-du-ftp-integre" aria-hidden="true">#</a> Fonctionnement du FTP intégré</h2>
<p>Le FTP possède deux modes de fonctionnement :</p>
<ul>
<li>Un mode « ouvert à tous » avec des mots de passe autogénérés acceptant l'ensemble des utilisateurs présentant le bon format de mot de passe.</li>
<li>Un mode classique reposant sur une liste de comptes « préalablement fournie ».</li>
</ul>
<p>Nous avons donc un serveur FTP, celui-ci est disponible sur le port 20121 (pourquoi pas sur le port 21 ? Tout simplement pour <em>réduire</em> un piratage…). Il fonctionne comme un FTP classique, vous devez donc utiliser un logiciel du type <a href="https://filezilla-project.org/" target="_blank" rel="noopener noreferrer">Filezilla<ExternalLinkIcon/></a>, <a href="https://cyberduck.io/" target="_blank" rel="noopener noreferrer">Cyberduck<ExternalLinkIcon/></a>.</p>
<div class="custom-container danger"><p class="custom-container-title">À noter</p>
<p>Les deux modes sont exclusifs, si vous fournissez une liste d'utilisateurs (mode classique) celui-ci remplacera le mode automatique.</p>
</div>
<h3 id="mode-1-ouvert-a-tous" tabindex="-1"><a class="header-anchor" href="#mode-1-ouvert-a-tous" aria-hidden="true">#</a> Mode 1 : Ouvert à tous.</h3>
<div class="custom-container tip"><p class="custom-container-title">IMPORTANT</p>
<p>Le FTP intégré est un peu particulier. Il est volontairement ouvert à tous, qu'est-ce que ça veut dire concrètement ?</p>
</div>
<p>Pour le fonctionnement, celui-ci accepte n'import quel nom d'utilisateur du moment que le mot de passe fourni respecte le formalisme suivant :</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span> <span class="token expression">Example</span></span>
username<span class="token operator">:</span> john
password<span class="token operator">:</span> RPI<span class="token operator">|</span>john<span class="token operator">|</span>LAMP

<span class="token macro property"><span class="token directive-hash">#</span> <span class="token expression">Or</span></span>
username<span class="token operator">:</span> valentin
password<span class="token operator">:</span> RPI<span class="token operator">|</span>valentin<span class="token operator">|</span>LAMP

<span class="token macro property"><span class="token directive-hash">#</span> <span class="token expression">Or</span></span>
username<span class="token operator">:</span> sample
password<span class="token operator">:</span> RPI<span class="token operator">|</span>sample<span class="token operator">|</span>LAMP

<span class="token macro property"><span class="token directive-hash">#</span> <span class="token expression">Or</span></span>
username<span class="token operator">:</span> anythingyouwant
password<span class="token operator">:</span> RPI<span class="token operator">|</span>anythingyouwant<span class="token operator">|</span>LAMP

<span class="token macro property"><span class="token directive-hash">#</span> <span class="token directive keyword">etc</span><span class="token expression"><span class="token punctuation">.</span></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Le compte de l'utilisateur est automatiquement créé lors de la première connexion. Dès l'instant que le FTP fonctionne, la partie WEB fonctionnera également 🚀.</p>
<h3 id="mode-2-le-mode-classique" tabindex="-1"><a class="header-anchor" href="#mode-2-le-mode-classique" aria-hidden="true">#</a> Mode 2 : Le mode classique</h3>
<p>Dans le mode classique, vous devez spécifier la liste des utilisateurs ayant accès au FTP. Cette liste est au format <code>JSON</code>, le fichier est dans <code>ftp/users/users.json</code>. La liste doit-être au format JSON par exemple :</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"votreUtilisateur"</span><span class="token operator">:</span> <span class="token string">"votreMotDePasse"</span><span class="token punctuation">,</span>
  <span class="token property">"votreUtilisateur2"</span><span class="token operator">:</span> <span class="token string">"votreMotDePasse2"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="acceder-a-votre-raspberry-pi" tabindex="-1"><a class="header-anchor" href="#acceder-a-votre-raspberry-pi" aria-hidden="true">#</a> Accéder à votre Raspberry Pi</h2>
<p>Maintenant que vous avez envoyé votre code source sur le serveur FTP celui-ci est accessible via le lien :</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>http<span class="token operator">:</span><span class="token comment">//raspberrypi.local/~lenomducompte</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
