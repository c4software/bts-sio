<template><h1 id="complement-du-cours-dev-ops" tabindex="-1"><a class="header-anchor" href="#complement-du-cours-dev-ops" aria-hidden="true">#</a> Complément du cours Dev Ops</h1>
<p>Ce document est un complément du cours. Il vous permettra de revenir sur les différentes notions avec différents exemples.</p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#docker">Docker</RouterLink><ul><li><RouterLink to="#introduction-1">Introduction</RouterLink></li><li><RouterLink to="#les-microservices">Les microservices</RouterLink></li><li><RouterLink to="#containers-ou-machines-virtuelles">Containers ou Machines virtuelles ?</RouterLink></li><li><RouterLink to="#pour-resumer-docker-c-est">Pour résumer Docker c’est :</RouterLink></li><li><RouterLink to="#creer-des-machines-simplement">Créer des machines simplement</RouterLink></li><li><RouterLink to="#la-ligne-de-commande">La ligne de commande</RouterLink></li></ul></li><li><RouterLink to="#quelques-parametres-de-la-ligne-de-commande">Quelques paramètres de la ligne de commande</RouterLink><ul><li><RouterLink to="#les-volumes">Les volumes</RouterLink></li><li><RouterLink to="#quelques-cas-d-usage">Quelques cas d&#39;usage</RouterLink></li><li><RouterLink to="#mettre-en-pratique">Mettre en pratique</RouterLink></li><li><RouterLink to="#le-dockerfile">Le DockerFile</RouterLink></li><li><RouterLink to="#le-docker-compose">Le Docker Compose</RouterLink></li><li><RouterLink to="#les-alternatives">Les alternatives</RouterLink></li><li><RouterLink to="#une-stack-complete-sur-un-raspberry-pi">Une stack complète sur un Raspberry Pi</RouterLink></li></ul></li><li><RouterLink to="#ci-cd">CI / CD</RouterLink><ul><li><RouterLink to="#introduction-2">Introduction</RouterLink></li><li><RouterLink to="#ci-integration-continue">CI (Intégration continue)</RouterLink></li><li><RouterLink to="#cd-deploiement-continu-livraison-continue">CD (Déploiement continu / Livraison continue)</RouterLink></li></ul></li><li><RouterLink to="#gitlab-ci">Gitlab CI</RouterLink><ul><li><RouterLink to="#gitlab-ci-yml">Gitlab-ci.yml</RouterLink></li><li><RouterLink to="#gitlab-pages">Gitlab Pages</RouterLink></li><li><RouterLink to="#tester-en-continu">Tester en continu</RouterLink></li><li><RouterLink to="#compilation-d-application">Compilation d&#39;application</RouterLink></li></ul></li><li><RouterLink to="#netlify">Netlify</RouterLink><ul><li><RouterLink to="#la-jamstack">La JamStack ?</RouterLink></li><li><RouterLink to="#deployer-un-site-automatiquement">Déployer un site automatiquement</RouterLink></li><li><RouterLink to="#faas">FaaS</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Le terme « Full Stack » est un gros mot, il se cache derrière plein de définitions différentes. Nous allons voir un aspect de celui-ci dans ce document et dans nos échanges.</p>
<p>Nous allons découvrir comment vous allez pouvoir « Développer, Tester, Déployer » sans vous prendre la tête avec différentes technologies qui sont maintenant la base de tout bon développeur (Docker, l'intégration Continue, la JamaStack, les Function As A Service − FaaS −). L'idée étant qu'à la fin de ce document vous soyez capable de construire, maintenir, mais également comprendre la révolution « Cloud » autour du métier du développeur.</p>
<p>Nous allons donc voir comment le développeur seul sera capable de mettre en place une infrastructure d'exécution de son application ; cette infrastructure sera complètement automatisée pour « se recréer » / « se mettre à jour » en fonction des actions (commit) que vous ferez dans votre code source. J'ai utilisé le terme « commit », car oui, cette automatisation est possible en grande partie grâce à notre système de version de sources (par exemple, GIT).</p>
<p>Je vous propose de commencer notre pèlerinage par la découverte de Docker.</p>
<h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h2>
<p><img src="@source/tp/devops/res/0_8joZxa9NhRqDjHva.png" alt="Docker"></p>
<h3 id="introduction-1" tabindex="-1"><a class="header-anchor" href="#introduction-1" aria-hidden="true">#</a> Introduction</h3>
<p>Docker c'est « une petite révolution » ! Docker est une plateforme datant de 2013 permettant aux développeurs de déployer, mais également d'exécuter des applications avec <strong>des conteneurs</strong>. Docker permet de packager une application (ainsi que ses dépendances) dans un process isolé nommé conteneur. Ce conteneur peut ensuite être exécuté sur n'importe quelle machine (ARM, X86…), mais également sur n'importe quel système d'exploitation (Linux, Windows, macOS).</p>
<p>Docker est une technologie française, mais celle-ci est utilisée mondialement ; elle est devenue un standard en très peu de temps ce qui en fait un incontournable à connaitre pour vous développeur. Et vous allez le voir, celle-ci va vous faire gagner un temps fou !</p>
<div class="custom-container tip"><p class="custom-container-title">Quelques chiffres autour de Docker</p>
<ul>
<li>14 millions de « machines »</li>
<li>900 000 images Docker</li>
<li>12 milliards d’images téléchargées</li>
<li>3300 contributeurs au projet</li>
</ul>
</div>
<p>Comme je disais cette technologie est au coeur de l'évolution du paysage informatique (IT)</p>
<p><img src="@source/tp/devops/res/it_evolution.png" alt="It Évolution"></p>
<p>Cette révolution consiste globalement à migrer les infrastructures locales (serveurs) vers « Le cloud » et ce pour plusieurs raisons :</p>
<ul>
<li>Migrer la puissance dans le Cloud</li>
<li>Changement d’environnement/plateforme simplifié</li>
<li>Pas de « Bloquage / Fermeture » d’un constructeur</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Un instant !</p>
<p>Mais avant de continuer pour vous le cloud, c'est quoi ?</p>
</div>
<p>Nous allons donc changer de paradigme, avant nous avions :</p>
<ul>
<li>Monolitique</li>
<li>Mise à jour lente</li>
<li>Gros serveurs</li>
</ul>
<p>Et maintenant :</p>
<ul>
<li>Plein de petits services assemblés (externes et indépendants les uns des autres)</li>
<li>Mise à jour rapide</li>
<li>Petites machines, multitude de serveurs, etc.</li>
</ul>
<p><strong>À votre avis</strong> pourquoi nous migrons vers ce genre d'architecture ? Connaissez-vous le nom de ce genre d'organisation ?</p>
<div class="custom-container warning"><p class="custom-container-title">Docker la solution ultime ?</p>
<p>L'objectif ici est de voir les avantages de Docker, mais comme tout en informatique Docker n'est pas la solution ultime ; Docker répond à un problème précis de découpage en container. C'est-à-dire en « petit conteneur » permettant de faire fonctionner votre application.</p>
<p><strong>Soyez critique, rester en veille.</strong></p>
</div>
<h3 id="les-microservices" tabindex="-1"><a class="header-anchor" href="#les-microservices" aria-hidden="true">#</a> Les microservices</h3>
<p>Et oui ! Le découpage actuelle / « la mode du moment », c'est de découper en microservices. C'est-à-dire de passer de :</p>
<p><img src="@source/tp/devops/res/simplification.png" alt="Microservice"></p>
<p>Cette simplification est là pour répondre à plusieurs problématiques :</p>
<ul>
<li>Réduire la taille des applications (et donc leur temps de compilation, exemple Linux ~2h, Firefox 40min)</li>
<li>L’application est centrale au fonctionnement.</li>
<li>Adaptation au changement difficile.</li>
</ul>
<p>Le découpage en microservices va donc nous permettre de répondre à l'ensemble des problématiques :</p>
<ul>
<li>Découper l’application en fonctionnalités indépendantes</li>
<li>Rends l’application indépendante des autres</li>
<li>Capable de « multiplier » l’application sur plein de serveurs pour absorber une hausse de la demande.</li>
<li>Une conception qui rend l’application hautement disponible</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">CI / CD</p>
<p>Ce découpage permet également de rentrer dans un autre mouvement celui de la <strong>livraison en continu</strong> / <strong>déploiement en continu</strong>. Nous reviendrons plus en détail sur ce point ultérieurement dans le cours.</p>
</div>
<h3 id="containers-ou-machines-virtuelles" tabindex="-1"><a class="header-anchor" href="#containers-ou-machines-virtuelles" aria-hidden="true">#</a> Containers ou Machines virtuelles ?</h3>
<p>Alors là vous allez me dire, non, mais je connais ce que tu nous racontes là !? Embarquer une application dans un truc transportable quelques soit la machine je connais déjà ! C'est une machine virtuelle…</p>
<p>Alors oui vous avez raison… Il y a quelques années nous avions <strong>une application un serveur</strong>, puis nous avons eu <strong>un serveur =&gt; Un hyperviseur =&gt; Des machines</strong>, mais nous allons voir qu'avec Docker plus d'hyperviseur nous avons « que notre applicatif dans un conteneur ».</p>
<p>Un serveur :
<img src="@source/tp/devops/res/un_serveur.png" alt="Un serveur"></p>
<p>Un hyperviseur :
<img src="@source/tp/devops/res/hyperviseur.png" alt="Un hyperviseur"></p>
<p>Les machines virtuelles vous connaissez déjà, et vous savez que le but c'est de mutualiser la puissance du serveur pour y mettre <strong>plusieurs machines</strong> / <strong>systèmes d'exploitation entiers</strong>. Mais cette organisation à des limites :</p>
<ul>
<li>Des ressources allouées pour chaque machine (CPU, Disque, Ram)</li>
<li>Un OS complet sur chaque machine (virtuelle)</li>
<li>Plus il y a de machines plus il faut de puissance (ressources perdues)</li>
<li>Ressources perdues par… des parties de l’OS virtualisées pour rien (les crons, mais également les I/O).</li>
</ul>
<p>Le conteneur va donc répondre à une problématique, éviter la multiplication des petites ressources perdue, le conteneur c'est donc :</p>
<ul>
<li>Un moyen standardiser de packager l’application</li>
<li>Un moyen d’isoler les applications entres elles</li>
<li>Un partage du noyau avec la machine physique</li>
</ul>
<p><strong>Les conteneurs</strong>
<img src="@source/tp/devops/res/conteneurs.png" alt="Les conteneurs"></p>
<p><strong>VM vs Conteneur :</strong>
<img src="@source/tp/devops/res/vm_vs_conteneur.png" alt="VM Vs Conteneur"></p>
<p>::: tip, Mais est-ce la fin des VM ?
Bien évidement non, les VM sont là pour rester elles sont une vraie réponse sur la mutualisation des machines ; mais également une vraie sécurité entre les machines. En effet l'hyperviseur est là pour nous garantir au maximum la séparation des processus entre « <strong>Les VM</strong> » et la machine physique.</p>
<p>D'ailleurs il est complètement possible de faire :</p>
<p><img src="@source/tp/devops/res/vm_and_conteneur.png" alt="VM Vs Conteneur"></p>
<p>:::</p>
<h3 id="pour-resumer-docker-c-est" tabindex="-1"><a class="header-anchor" href="#pour-resumer-docker-c-est" aria-hidden="true">#</a> Pour résumer Docker c’est :</h3>
<ul>
<li>Un projet open source, qui a pour but d’automatiser le déploiement d’applications dans un « container »</li>
<li>Le container une sorte « d’archive » qui contient tout ce qu’il faut pour faire fonctionner un logiciel : Code, Librairies pour l’exécution, outils système, et librairies système. (autonome)</li>
<li>Ça garantit que le code fonctionnera toujours de la même façon, quel que soit l’environnement.</li>
</ul>
<p><img src="@source/tp/devops/res/docker_architecture.png" alt="L'architecture de docker"></p>
<p>Avec docker pas « d'hyperviseur », nous avons un morceau aux milieux qui s'appelle le « Docker Engine », il repose sur les technologies du noyau Linux, il est donc plus lège qu'un Hyperviseur entier (comme VMWare ou Dropbox) il aura en charge la gestion de :</p>
<ul>
<li>La sécurité</li>
<li>Le réseau</li>
<li>Les volumes</li>
<li>L’orchestration</li>
</ul>
<p><img src="@source/tp/devops/res/engine.png" alt="Le Docker Engine"></p>
<p>Comme j'indiquai en introduction, l'angine de Docker est multiplateforme il fonctionne donc sans problème sur :</p>
<ul>
<li>Linux</li>
<li>Windows</li>
<li>macOS</li>
</ul>
<p>Mais également quelques soit l'architecture de l'ordinateur :</p>
<ul>
<li>Un raspberry Pi</li>
<li>Un processeur Intel</li>
<li>Un processeur AMD</li>
<li>Un M1 de Apple</li>
</ul>
<p>Docker <strong>vous assure</strong> que votre application tournera de la même façon quelques soit là ou vous souhaiter la faire fonctionner.</p>
<h3 id="creer-des-machines-simplement" tabindex="-1"><a class="header-anchor" href="#creer-des-machines-simplement" aria-hidden="true">#</a> Créer des machines simplement</h3>
<p>L'objectif de Docker c'est la simplicité, vous allez le voir après seulement 2 ou 3 machines vous aurez compris la base du fonctionnement, et vous serez pleinement capable de vous en servir pour plein de petites problématiques (c'est très certainement la raison de son succès).</p>
<p>Avant d'aller plus loin, je vous propose de faire un point terminologie :</p>
<ul>
<li><strong>Image</strong> Les fichiers, le contenu de votre « système »</li>
<li><strong>Container</strong> L’image quand elle est en fonctionnement.</li>
<li><strong>Engine</strong> Ce qui fait fonctionner votre « container ». Les volumes et le réseau font partie de « l’engine ».</li>
<li><strong>Registry</strong> Entrepôt d’image à télécharger (fourni par d’autres, ou construite par vous). https://hub.docker.com/</li>
<li><strong>Volume</strong>, les « montages » / ressources, emplacement (réseau ou non) disponible dans votre Container.</li>
</ul>
<h4 id="registry" tabindex="-1"><a class="header-anchor" href="#registry" aria-hidden="true">#</a> Registry</h4>
<ul>
<li>Docker Hub</li>
<li>Communautaire</li>
<li>Images certifiées</li>
<li>Énormément d’images (vraiment, vraiment beaucoup)</li>
</ul>
<h4 id="les-images" tabindex="-1"><a class="header-anchor" href="#les-images" aria-hidden="true">#</a> Les Images</h4>
<p>C’est une sorte de « template », les images sont en lecture seule. Enfin pas vraiment en lecture seule, elles ont un état qui sera <strong>remis à zéro à chaque lancement de votre container</strong>. Il faut les voir comme les données de base de votre application.</p>
<p>Exemple: Ubuntu avec un Apache et GLPI déjà installés.</p>
<ul>
<li>Une façon simple de distribuer vos applications</li>
<li>Pas de risque d’oubli de dépendances lors de l’installation (un environnement maitrisé)</li>
<li>Fonctionnement isolé, tests simplifiés de nouvelles librairies, ou de dépendances</li>
</ul>
<h3 id="la-ligne-de-commande" tabindex="-1"><a class="header-anchor" href="#la-ligne-de-commande" aria-hidden="true">#</a> La ligne de commande</h3>
<p>Docker c'est principalement une « interface » avec laquelle nous devons communiquer en ligne de commande. Il n'y a pas beaucoup de commandes à retenir et celle-ci est logique. Quoi qu’il en soit je vous ai résumé l'ensemble dans <RouterLink to="/cheatsheets/docker/">le document ici</RouterLink>.</p>
<p>Mais pour résumer, voilà les éléments importants :</p>
<ul>
<li>Démarre l’image ubuntu:latest</li>
<li><code>--rm</code> supprime le container avant de le relancer.</li>
<li>Déclare le port <code>80</code> du conteneur sur le port 3000 de votre machine.</li>
<li>Monte le dossier courant dans le dossier <code>/data</code> du conteneur</li>
<li>Note: Sur Windows vous devez remplacer <code>-v ${PWD}:/data</code> par <code>-v &quot;C:\Data&quot;:/data</code></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># *nix</span>
docker run --rm --name monConteneur -it -p <span class="token number">3000</span>:80 -v <span class="token variable">${<span class="token environment constant">PWD</span>}</span>:/data ubuntu:latest

<span class="token comment"># Windows</span>
docker run --rm --name monConteneur -it -p <span class="token number">3000</span>:80 -v %cd%:/data ubuntu:latest
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="quelques-parametres-de-la-ligne-de-commande" tabindex="-1"><a class="header-anchor" href="#quelques-parametres-de-la-ligne-de-commande" aria-hidden="true">#</a> Quelques paramètres de la ligne de commande</h2>
<table>
<thead>
<tr>
<th style="text-align:left">Paramètre</th>
<th style="text-align:left">action</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">-p portLocal:portContainer</td>
<td style="text-align:left">Permets de rendre visible un port dans le container sur votre machine (ex. -p 8080:80)</td>
</tr>
<tr>
<td style="text-align:left">-v dossierLocal:dossierContainer</td>
<td style="text-align:left">Permets d'exposer un dossier local à l'intérieur du container (ex -v ./vosSource:/data)</td>
</tr>
</tbody>
</table>
<h3 id="les-volumes" tabindex="-1"><a class="header-anchor" href="#les-volumes" aria-hidden="true">#</a> Les volumes</h3>
<p>Comme je disais en introduction les Containers sont stateless ; ça veut dire qu'ils sont <strong>remis à zéro</strong> à chaque lancement, nous allons donc devoir mettre en place un volume entre celui-ci et votre machine, un volume c'est :</p>
<ul>
<li>Un dossier « partagé » entre votre machine et le container</li>
<li>Une sorte de point de montage</li>
<li>Persistant, les données sont modifiées en temps réel et sont sauvegardées</li>
</ul>
<h3 id="quelques-cas-d-usage" tabindex="-1"><a class="header-anchor" href="#quelques-cas-d-usage" aria-hidden="true">#</a> Quelques cas d'usage</h3>
<h4 id="postgres" tabindex="-1"><a class="header-anchor" href="#postgres" aria-hidden="true">#</a> Postgres</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -p <span class="token number">5432</span>:5432 --name pgServer -e <span class="token assign-left variable">POSTGRES_USER</span><span class="token operator">=</span>monUser -e <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span>monPassword -d postgres
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><hr>
<h4 id="wordpress" tabindex="-1"><a class="header-anchor" href="#wordpress" aria-hidden="true">#</a> Wordpress</h4>
<ul>
<li>Image officielle</li>
<li>Créer un Blog Wordpress en 2 minutes</li>
</ul>
<hr>
<h4 id="tomcat" tabindex="-1"><a class="header-anchor" href="#tomcat" aria-hidden="true">#</a> Tomcat</h4>
<ul>
<li>Plusieurs versions en parallèle</li>
<li>Plusieurs versions de Java</li>
</ul>
<hr>
<h4 id="php" tabindex="-1"><a class="header-anchor" href="#php" aria-hidden="true">#</a> PHP</h4>
<ul>
<li>Plusieurs versions en parallèle</li>
<li>Tester simplement son code sur d’autres versions de PHP (5, 7, 8, …)</li>
</ul>
<h3 id="mettre-en-pratique" tabindex="-1"><a class="header-anchor" href="#mettre-en-pratique" aria-hidden="true">#</a> Mettre en pratique</h3>
<p>Je vous propose de mettre en pratique ce que nous avons vu de manière théorique. <RouterLink to="/tp/docker/introduction.html">La suite dans le TP suivant</RouterLink> puis <RouterLink to="/tp/docker/creer_server_local.html">dans le suivant</RouterLink></p>
<h3 id="le-dockerfile" tabindex="-1"><a class="header-anchor" href="#le-dockerfile" aria-hidden="true">#</a> Le DockerFile</h3>
<p>Nous avons lancé des Containeurs qui repose sur des images, mais pour l'instant nous n'avons rien écrit « rien packagé ». La force de Docker c'est que tout le monde peut créer des images docker pour distribuer des applications, bien évidement il est possible de distribuer les applications sur le DockerHub, mais <strong>rien d'obligatoire</strong>, vous êtes en entreprise votre code est privée vous pouvez très bien créer votre image uniquement sur votre machine.</p>
<div class="custom-container tip"><p class="custom-container-title">Vous pouvez également utiliser un Registry privé</p>
<p>Mais si vous le souhaitez, vous pouvez utiliser un Hub privé ; Gitlab par exemple, en propose un gratuitement pour vos projets. D'ailleurs avec le CI/CD il sera possible de Builder et de sauvegarder l'image Docker résultat directement dans le Registry interne à Gitlab.</p>
<p><a href="https://docs.gitlab.com/ee/user/packages/container_registry/" target="_blank" rel="noopener noreferrer">Plus d'informations ici<ExternalLinkIcon/></a></p>
</div>
<p>Le DockerFile va donc être un fichier qui va déterminer la structure de votre image, vous allez définir :</p>
<ul>
<li>L'image de base</li>
<li>Les dépendances nécessaires à votre application pour fonctionner (au sens Linux, exemple PHP X, GD pour les images …).</li>
<li>Les paramètres de votre système embarqué dans l'image.</li>
<li>Le port exposé, etc.</li>
<li>Le « point d'entrée »</li>
</ul>
<p>Concrètement c'est :</p>
<ul>
<li>Utilisé par Docker pour créer des containers à partir de la définition, le fichier « Dockerfile »</li>
<li>C’est un fichier texte, qui contient toutes les commandes que l’utilisateur va faire pour assembler l’image</li>
<li>Construit via la commande « docker build »</li>
</ul>
<p>Voilà à quoi ça va ressembler, dans un fichier nommé <code>Dockerfile</code></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:latest</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> Valentin Brosseau</span>

<span class="token instruction"><span class="token keyword">RUN</span> apt-get update</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get install -y python python-pip wget</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install Flask</span>

<span class="token instruction"><span class="token keyword">ADD</span> hello.py /home/hello.py</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /home</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Vous avez défini le squelette de votre application, si vous souhaitez créer l'image associée vous allez devoir lancer :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker build -t <span class="token string">"flask:demo"</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Et pour la lancer ?</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -p <span class="token number">5000</span>:5000 flask:demo python hello.py
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="le-docker-compose" tabindex="-1"><a class="header-anchor" href="#le-docker-compose" aria-hidden="true">#</a> Le Docker Compose</h3>
<p>Nous avons utilisé des images, nous avons également créé nos propres images. Mais si vous avez suivi, vous avez dû remarquer un problème ! Nos images ne contiennent <strong>que notre application</strong> pas l'ensemble des briques qui font « notre service ». Par exemple dans le cas d'un serveur PHP nous avons :</p>
<ul>
<li>Le PHP</li>
<li>La base de données</li>
<li>Le FTP</li>
<li>…</li>
</ul>
<p>Dans le monde de Docker, c'est ce que nous appellerons l'orchestration.</p>
<center><iframe src="https://giphy.com/embed/KYGDZKRWdBnFe" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>
<p>L'orchestration, ça va être le fait de construire une « stack » applicative entière avec l'intégralité des serveurs nécessaires au bon fonctionnement de notre application (exemple PHP, BDD, FTP). Dans le monde de Docker, nous avons un outil qui permet de construire ça. Le <code>Docker Compose</code> permet de composer une stack ou une infrastructure complète de conteneurs ; Il permet de simplifier la création, l'interconnexion et la multiplication de conteneurs.</p>
<p><a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">C'est un outil officiel fourni directement et maintenu par la société Docker<ExternalLinkIcon/></a> Il repose sur <strong>un seul fichier</strong> le <code>docker-compose.yml</code>, celui-ci énumèrera l'ensemble de votre infrastructure, les volumes, les ports, les images, etc. Bref tout ce que vous pouvez faire avec la ligne de commande vous aller être capable de le définir dans un fichier <code>docker-compose.yml</code>.</p>
<p>Voilà un exemple très simple :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3"</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">reverse-proxy</span><span class="token punctuation">:</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">network_mode</span><span class="token punctuation">:</span> host
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ../.acme.sh/<span class="token punctuation">:</span>/<span class="token punctuation">,</span>etc/letsencrypt/
      <span class="token punctuation">-</span> ./nginx.conf<span class="token punctuation">:</span>/<span class="token punctuation">,</span>etc/nginx/nginx.conf
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Une fois créée vous pourrez lancer votre infra via :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Lancement sans rendre la main</span>
docker-compose up

<span class="token comment"># Lancement en passant la stack en arrière plan</span>
docker-compose up -d
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>La force de Docker Compose c'est :</p>
<ul>
<li>Autonome (car prête à être « mise en place » partout, quelle que soit la plateforme cible).</li>
<li>Préparamètre (tout est dans le fichier docker-compose.yml).</li>
<li>Isolé (tous les services ne sont pas forcément accessibles du public, mais sont accessibles par vos autres applications).</li>
<li>Administrable simplement grâce au cli (docker-compose up/down/start/stop)</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">L'astuce du chef !</p>
<p>Nous avons vu précédemment qu'il était possible de builder nos propres images avec Docker. Quand nous utilisons docker compose cette option <strong>sera bien évidemment encore disponible</strong>.</p>
</div>
<p>La meilleure façon de voir comment fonctionne l'orchestration c'est de la pratiquer. <a href="https://cours.brosseau.ovh/tp/docker/docker_compose.html" target="_blank" rel="noopener noreferrer">Je vous ai préparé un TP ici<ExternalLinkIcon/></a></p>
<h3 id="les-alternatives" tabindex="-1"><a class="header-anchor" href="#les-alternatives" aria-hidden="true">#</a> Les alternatives</h3>
<p>Quand je présente une solution, j'aime bien parler des alternatives. Vous vous doutez bien que Docker n'est pas la seule solution de container disponible sur le marché voilà une liste non exhaustive de « conccurent » :</p>
<ul>
<li>containerd</li>
<li>podman</li>
<li>LXC</li>
<li>Kubernetes (non, mais parlons-en d'ailleurs)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Docker ou Kubernetes ?</p>
<p>Différence fondamentale entre Kubernetes et Docker : Kubernetes est conçu pour s’exécuter sur un cluster, tandis que Docker s’exécute sur un nœud unique. Kubernetes est plus complet que Docker Swarm et est conçu pour coordonner des clusters de nœuds à grande échelle en production, efficacement. Les pods Kubernetes (unités de planification contenant un ou plusieurs conteneurs dans l’écosystème Kubernetes) sont répartis entre les nœuds pour offrir une haute disponibilité.</p>
</div>
<h3 id="une-stack-complete-sur-un-raspberry-pi" tabindex="-1"><a class="header-anchor" href="#une-stack-complete-sur-un-raspberry-pi" aria-hidden="true">#</a> Une stack complète sur un Raspberry Pi</h3>
<p>Nous l'avons vu dans les différents exemples précédents, Docker est un vrai petit bijou pour la conception du « stack » applicative. C'est en partant de cette constatation que j'ai décidé de créer moi-même une « Stack » permettant de créer un serveur d'évaluation / de développement personnel basé sur du matériel « pas cher » à savoir un Raspberry Pi.</p>
<p>Une solution qui dans mon cas ressemble à :</p>
<table>
<thead>
<tr>
<th><img src="@source/tp/rpi/res/version1.jpg" alt="Version 1"></th>
<th><img src="@source/tp/rpi/res/version2.jpg" alt="Version 2"></th>
</tr>
</thead>
</table>
<p><RouterLink to="/tp/rpi/web-stack.html">Lire la suite</RouterLink></p>
<h2 id="ci-cd" tabindex="-1"><a class="header-anchor" href="#ci-cd" aria-hidden="true">#</a> CI / CD</h2>
<p><img src="@source/tp/devops/res/cicd-loop.jpg" alt="CI/CD Loop"></p>
<h3 id="introduction-2" tabindex="-1"><a class="header-anchor" href="#introduction-2" aria-hidden="true">#</a> Introduction</h3>
<p>Voilà un gros mot que vous avez très certainement vu / croisé lors de votre veille sur les technologies qui feront de vous un développeur complet. Le CI/CD c'est la capacité que vous allez avoir d'automatiser :</p>
<ul>
<li>Les tests.</li>
<li>Les déploiements / livraison.</li>
<li>Mesurer la qualité de votre code.</li>
</ul>
<p>Cette automatisation ne sera pas faite à n'importe quel moment ? Elle sera faite en <strong>continue…</strong> Et c'est bien là la force du CI / CD. Il faut voir le CI/CD comme une boite à outils qui vous permettra de dormir tranquille.</p>
<p><img src="@source/tp/devops/res/flow.png" alt="Flow"></p>
<h3 id="ci-integration-continue" tabindex="-1"><a class="header-anchor" href="#ci-integration-continue" aria-hidden="true">#</a> CI (Intégration continue)</h3>
<p>Le premier point du CI/CD c'est le CI ; CI signifie « Continous Integration » en français Intégration Continu, c'est la mécanique qui vous permettra de vous assurer de la qualité de votre application au travers d'indicateurs. Si je dois résumer le CI avant de le détailler je dirais :</p>
<ul>
<li>Validation en continu</li>
<li>Régulièrement</li>
<li>Workflow GIT</li>
<li>Automatique</li>
</ul>
<p>L'idée est donc comme je le disais en introduction de répéter un certain nombre d'automatisations à chaque <strong>push</strong> dans votre système de version. Ces actions <strong>doivent être</strong> répétables à l'infini, quelles que soient les évolutions dans votre application, par exemple :</p>
<ul>
<li>Dans une image PHP</li>
<li>Installer votre application</li>
<li>Lancer l'installation des dépendances nécessaire au bon fonctionnement.</li>
<li>Lancer les tests</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">L'échec est une possibilité</p>
<p>L'important ici, c'est de voir qu'il est possible que votre suite d'actions échoue. Nous ne devons donc jamais rendre les erreurs silencieuses.</p>
<p>L'important dans l'échec, c'est de comprendre la raison afin de la corriger avant que celle-ci ne se retrouve en production.</p>
</div>
<p>Le CI c'est également un ensemble d'indicateurs nous permettant de valider que notre application est <strong>de bonne qualité</strong> via les résultats des tests, mais également avec le Lint ou l'analyse statique du code.</p>
<h3 id="cd-deploiement-continu-livraison-continue" tabindex="-1"><a class="header-anchor" href="#cd-deploiement-continu-livraison-continue" aria-hidden="true">#</a> CD (Déploiement continu / Livraison continue)</h3>
<p>Le second point dans le CI/CD, c'est le CD ; CD signifie « Continous Delivery », en Français livraison continue. Il faut bien distinguer deux opérations différentes dans le CD, nous avons la livraison et le Déploiement ; cette nuance est importante je reviendrai dessus ultérieurement. L'objectif du CD c'est :</p>
<ul>
<li>Si l'ensemble du CI est « OK »</li>
<li>Mise en ligne « régulière »
<ul>
<li>Prod</li>
<li>Staging</li>
</ul>
</li>
</ul>
<p>Nous avons deux options dans le CD, La Livraison et le Déploiement fondamentalement les deux répondent à la même problématique, automatiser les tâches pour vous simplifier la vie et automatiser la mise à disposition de votre application à vos utilisateurs, le <strong>plus souvent possibles</strong> en vous assurant en permanence de la qualité de ce que vous livrez :</p>
<ul>
<li>
<p>Automatiser au maximum (Code, Configuration, Environement …)</p>
<ul>
<li>Dev / Staging / Review</li>
<li>Prod</li>
</ul>
</li>
<li>
<p>S'assure de la qualité</p>
</li>
<li>
<p>Versionne la livraison (suivi, archivage, rollback)</p>
</li>
<li>
<p>Le déploiement en continu, est la finalité ultime elle consiste à mettre en ligne en continu votre applicatif sans intervention de votre part.</p>
</li>
<li>
<p>La livraison en continu est une étape intermédiaire, elle consiste à faire construire en automatique le livrable de votre application via un enchainement de scripts tournant dans un environnement distant.</p>
</li>
</ul>
<p><img src="@source/tp/devops/res/gitlab_workflow_example_extended_v12_3.png" alt="Gitlab Worflow"></p>
<h4 id="la-cle-«-l-automatisation-»" tabindex="-1"><a class="header-anchor" href="#la-cle-«-l-automatisation-»" aria-hidden="true">#</a> La clé « L'automatisation »</h4>
<p>Votre CI/CD repose donc sur une brique logicielle (Cloud ou local) permettant l’automatisation de tâches :</p>
<ul>
<li>Compilation</li>
<li>Tests unitaires et fonctionnels</li>
<li>Tests de performance…</li>
</ul>
<p>À chaque <code>push</code>, Le CI/CD va exécuter une des tâches et produire des résultats (résultat de tests, artifacts, …), que le développeur / chef de projet / testeur peut par la suite visualiser ou télécharger.</p>
<h4 id="les-prerequis" tabindex="-1"><a class="header-anchor" href="#les-prerequis" aria-hidden="true">#</a> Les prérequis</h4>
<ul>
<li>Versionning du code.</li>
<li>Commits régulier.</li>
<li>Application « testable ».</li>
</ul>
<h4 id="les-tests" tabindex="-1"><a class="header-anchor" href="#les-tests" aria-hidden="true">#</a> Les tests</h4>
<p>Vous l'avez compris, le CI/CD repose sur <strong>les tests</strong>. Vous avez vu précédemment que les tests c'est très important… Mais comme beaucoup vous ne voyez pas vraiment pourquoi c'est important ! Et c'est bien normal, vous écrivez des tests, mais vous avez certainement appris à les lancer <strong>uniquement</strong> sur votre ordinateur. Et je suis bien d'accord à se compte là… l'intérêt est plutôt limité.</p>
<p>Quand nous mettons en place un CI/CD nous allons rendre les tests visibles / utiles / intéressants en effet ils vont être lancé à chaque modification du code sources. Et ils vont vous assurer que la qualité de celui-ci n'est pas détériorée par une modification récente.</p>
<ul>
<li>Simplification de leurs exécutions</li>
<li>Aussi simple qu'en « Local »</li>
<li>Libère du temps</li>
</ul>
<p>Libère du temps ? Et oui ! Nous n'allons plus perdre du temps « j'attends que les tests passent » non non. Nous allons demander à un serveur distant de le faire à notre place, et une fois terminée ils nous préviendra du résultat… Voire mieux si le CD est en place il livrera en automatique votre application sur le(s) serveurs.</p>
<p>Mais bien évidemment, il n'y a pas que le test dans la vie nous pourrons également :</p>
<ul>
<li>Vérifier le Lint</li>
<li>Analyse statique</li>
<li>Couverture du code</li>
<li>Qualité du code</li>
<li>Sécurité du code</li>
</ul>
<center><iframe src="https://giphy.com/embed/chES7uKgwnloDZeS03" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>
<div class="custom-container tip"><p class="custom-container-title">Tester quoi ?</p>
<p><img src="@source/tp/devops/res/cost_test_unit.jpeg" alt="Cout des tests"></p>
<p>Nous pouvons tout tester avec le CI, mais à votre avis qu'allons-nous tester?</p>
</div>
<h4 id="les-indicateurs" tabindex="-1"><a class="header-anchor" href="#les-indicateurs" aria-hidden="true">#</a> Les indicateurs</h4>
<p>Je vous parlais d'indicateur au début, les indicateurs de réussite sont multibles nous aurons bien évidemment :</p>
<ul>
<li>Le résultat « vert de chaque test ».</li>
<li>Le Lint (analyse statique du code).</li>
<li>L'analyse statique de l'ensemble du code source avec par exemple SonarQube</li>
</ul>
<p><img src="@source/tp/devops/res/sonarqube.png" alt="SonarQube"></p>
<h4 id="les-artifacts" tabindex="-1"><a class="header-anchor" href="#les-artifacts" aria-hidden="true">#</a> Les artifacts</h4>
<p>Je vous parlais du livrable en introduction. Dans le monde de l'intégration le livrable nous appellerons ça un « artifacts », c'est le résultat de cette automatisation de tâches. Il est le résultat du « Test &amp; Build » cette opération sur ce que nous avons vu précédemment :</p>
<ul>
<li>Docker pour isoler et être capable de répéter de manière stateless l'opération.</li>
<li>Répétable (à l'identique, quelques soit la modification).</li>
<li>Multidéveloppeur (identique pour tous les membres de l'équipe).</li>
</ul>
<p><img src="@source/tp/devops/res/ci_flow.png" alt="CI Flow"></p>
<p>L'artéfact est donc :</p>
<ul>
<li>Toujours présent</li>
<li>Centralisé (sur le serveur de CI/CD)</li>
<li>Nommage cohérent (oui, car il repose sur <strong>le commit</strong> associés)</li>
</ul>
<p>Et pourquoi c'est très très intéressant ?</p>
<ul>
<li>Réduction du risque d'erreurs</li>
<li>Automatisation (plus d'humain)</li>
<li>La sécurité</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">La sécurité ?</p>
<p>À votre avis ? Pourquoi automatiser sur un serveur distant la création du livrable est intéressant en termes de sécurité ?</p>
</div>
<h2 id="gitlab-ci" tabindex="-1"><a class="header-anchor" href="#gitlab-ci" aria-hidden="true">#</a> Gitlab CI</h2>
<p>Et c'est ici que rentre en jeu les solutions cloud de CI/CD. Comme tout dans les outils il y a plusieurs solutions répondant aux mêmes problèmes. J'ai décidé de vous parler de Gitlab-CI, car il est gratuit et intégré de base dans Gitlab aucun compte supplémentaire de requis ! Et surtout il est très puissant… Car il repose sur <strong>Docker</strong>, et vous l'avez compris maintenant ça veut dire que nous serons capables de tout faire.</p>
<p><img src="@source/tp/devops/res/pipelines_index_v13_0.png" alt="Résultat du pipeline"></p>
<p>Les fondations de Gitlab-CI sont :</p>
<ul>
<li>Intégré dans le développement</li>
<li>Simplifie le test</li>
<li>Amélioration continue</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Amélioration continue ?</p>
<p>Je ne suis pas dupe, je suis comme vous… Parfois je code à l'arrache ! Le CI/CD n'est pas là pour vous faire la morale. Nous l'avons vu avec SonarQube l'idée n'est pas de vous punir de la mauvaise qualité de votre développement ; l'idée est plutôt de vous faire progresser petit à petit en testant / analysant seulement les parties modifiées de votre code.</p>
<p>Pourquoi est-ce important ? Tout simplement pour voir au fur et à mesure pourquoi les règles sont importantes.</p>
</div>
<p>Et l'objectif est :</p>
<ul>
<li>Tester souvent, tester tout le temps</li>
<li>Simplification de la livraison</li>
<li>Automatisation de la livraison</li>
<li>Déploiement plus fréquent</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">Évidemment il y a des alternatives</p>
<p>Je vous entends déjà, non, mais moi je n’utilise pas Gitlab, mais Github… Évidemment il y a des alternatives des options pour faire plaisir à tous. <a href="https://github.com/ligurio/awesome-ci" target="_blank" rel="noopener noreferrer">Vous avez ici une liste complète à jour des alternatives disponibles<ExternalLinkIcon/></a></p>
</div>
<h3 id="gitlab-ci-yml" tabindex="-1"><a class="header-anchor" href="#gitlab-ci-yml" aria-hidden="true">#</a> Gitlab-ci.yml</h3>
<p>L'ensemble de la configuration de Gitlab-CI est dans un seul fichier, le <code>gitlab-ci.yml</code>, ce fichier va définir l'ensemble des règles qui serviront à valider le bon fonctionnement de votre application. Voilà un exemple :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>4.2.2

<span class="token key atrule">before_script</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> npm install

<span class="token key atrule">cache</span><span class="token punctuation">:</span>
  <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> node_modules/

<span class="token key atrule">stages</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> test

<span class="token key atrule">test_async</span><span class="token punctuation">:</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> node ./specs/start.js ./specs/async.spec.js

<span class="token key atrule">test_db</span><span class="token punctuation">:</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test
  <span class="token key atrule">services</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> postgres<span class="token punctuation">:</span>9.5.0
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> node ./specs/start.js ./specs/db<span class="token punctuation">-</span>postgres.spec.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="gitlab-pages" tabindex="-1"><a class="header-anchor" href="#gitlab-pages" aria-hidden="true">#</a> Gitlab Pages</h3>
<p>Le meilleur moyen pour mettre en place un CI/CD ces le déploiement « en automatique » d'un petit site web statique.</p>
<p><RouterLink to="/tp/ci/pages.html">La suite ici</RouterLink></p>
<h3 id="tester-en-continu" tabindex="-1"><a class="header-anchor" href="#tester-en-continu" aria-hidden="true">#</a> Tester en continu</h3>
<p>Vous l'avez vu dans l'exemple Gitlab-Pages il n'y avait pas de tests autre que ceux « de base » qui sont :</p>
<ul>
<li>L'installation</li>
<li>Le Lint fait sur votre code source lors du build.</li>
</ul>
<p>Ici, je vous propose d'aller plus loin c'est-à-dire de mettre en place des tests qui seront exécutés à chaque push.</p>
<p><RouterLink to="/tp/ci/ci-test/tests.html">La suite ici</RouterLink></p>
<h3 id="compilation-d-application" tabindex="-1"><a class="header-anchor" href="#compilation-d-application" aria-hidden="true">#</a> Compilation d'application</h3>
<p>Les sites web c'est une problématique simple… Le CI/CD nous permet d'aller plus loin beaucoup beaucoup plus loin ! Nous allons utiliser le CI/CD pour builder une application mobile.</p>
<p>Le tout sans intervention de votre part. Avant de continuer, appelez-moi, je vais vous illustrer avec des cas concrets via un outil nommé Bitrise-CI.</p>
<p><RouterLink to="/tp/ci/ci-hybride.html">Mettre en place une compilation d'application avec Gitlab-CI</RouterLink></p>
<h2 id="netlify" tabindex="-1"><a class="header-anchor" href="#netlify" aria-hidden="true">#</a> Netlify</h2>
<p>Netlify est une solution simple qui vous permettra d'héberger / déployer / automatiser la mise à disposition de votre site Internet. Ici nous ne parlons pas de site « classique » comme un WordPress, mais de site qui repose sur la Jamstack.</p>
<h3 id="la-jamstack" tabindex="-1"><a class="header-anchor" href="#la-jamstack" aria-hidden="true">#</a> La JamStack ?</h3>
<p>La jamstack c'est une nouvelle façon de voir la conception de site Internet, cette nouvelle façon de faire va nous permettre de réduire les couts d'hébergements / et bénéficier de l'avantage du Cloud (CI/CD, compression des assets, FAAS…)</p>
<p>Plein de mots qui font peur, mais ne vous inquiétez pas… C'est beaucoup plus simple qu'il n'y parait. Ici pas de PHP pour générer vos pages nous allons tout concevoir en HTML / JavaScript (VanillaJS, React, Vue, …) / CSS</p>
<p><img src="@source/tp/devops/res/jamstack-horizontal.svg" alt="JamStack"></p>
<h3 id="deployer-un-site-automatiquement" tabindex="-1"><a class="header-anchor" href="#deployer-un-site-automatiquement" aria-hidden="true">#</a> Déployer un site automatiquement</h3>
<p>Ici pas de blabla, Netlify est une solution pensée pour être simple ; je vous propose donc de directement mettre en application via <RouterLink to="/tp/ci/jamstack/netlify.html">le TP suivant</RouterLink></p>
<h3 id="faas" tabindex="-1"><a class="header-anchor" href="#faas" aria-hidden="true">#</a> FaaS</h3>
<p>Function As A Service, c'est le truc qui va fous faire passer dans une autre dimension. L'idée étant la suivante :</p>
<p>Le FaaS ou Function-as-a-Service est un type de service cloud permettant de déployer une fonction unique de logiciel en serverless. Découvrez tout ce que vous devez savoir à ce sujet.</p>
<p>Le développement et le lancement d’une application peuvent être très difficiles. Il est nécessaire d’installer des serveurs, et de les maintenir au fil du temps. Ceci peut s’avérer pénible et couteux. Heureusement, le Cloud Computing offre une alternative au travers du FaaS.</p>
<p>Source: https://www.lebigdata.fr/</p>
<p>Le FaaS est donc en quelques sortes la finalité de tout ce que nous avons vu ! Il s'agit de découper votre code en petit morceau qui sera packagé dans des conteneurs et lancer à la demande « quand les utilisateurs auront besoin de la fonctionnalité ». Le but ?</p>
<ul>
<li>Réduire les couts (les serveurs sont arrêtés très souvent).</li>
<li>Réduire l'empreinte carbone des applications.</li>
<li>Découper pour livrer souvent les modifications.</li>
</ul>
<p>Il y a beaucoup de fournisseurs de FaaS :</p>
<ul>
<li>Amazon avec Lambda.</li>
<li>Google avec Firebase Function.</li>
<li>Google avec Cloud Run (lancement d'image Docker à la demande)</li>
<li>OpenFaas solution libre similaire au précédentes.</li>
</ul>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/eOBq__h4OJ4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/vr0Gfvp5v1A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>Pour simplifier nos tests, nous allons nous concentrer sur la dernière solution OpenFaas, car elle nous permettra sans dépenser d'argent de tester la puissance du FaaS</p>
<ul>
<li><RouterLink to="/tp/openfaas/openfaas-quicky-installation.html">Installation d'OpenFaas</RouterLink></li>
<li><RouterLink to="/tp/openfaas/openfaas-quicky-installation-pi.html">Installation d'OpenFaas sur un Raspberry Pi</RouterLink></li>
<li><RouterLink to="/tp/openfaas/openfaas-quicky-create-faas.html">Écrire du code pour OpenFaas</RouterLink></li>
</ul>
</template>
