<template><h1 id="introduction-a-docker" tabindex="-1"><a class="header-anchor" href="#introduction-a-docker" aria-hidden="true">#</a> Introduction à Docker</h1>
<p>Dans ce TP nous allons voir l’installation de Docker et les premiers exemples d’utilisations de votre nouvel environnement.</p>
<h2 id="installation-de-docker-sous-windows" tabindex="-1"><a class="header-anchor" href="#installation-de-docker-sous-windows" aria-hidden="true">#</a> Installation de Docker sous Windows</h2>
<p>Pour installer Docker rien de plus simple, il suffit d’utiliser l’installeur officiel en le téléchargent sur <a href="https://www.docker.com/docker-windows" target="_blank" rel="noopener noreferrer">le site de Docker.<ExternalLinkIcon/></a></p>
<h2 id="lancer-docker" tabindex="-1"><a class="header-anchor" href="#lancer-docker" aria-hidden="true">#</a> Lancer Docker</h2>
<p>Lancer Docker en tant qu’administrateur (et autoriser Hyper-V si celui-ci vous le demande).</p>
<h2 id="premier-test" tabindex="-1"><a class="header-anchor" href="#premier-test" aria-hidden="true">#</a> Premier test</h2>
<p>Maintenant qu’il est installé sur votre poste, rien de plus simple. Dans une console, entrez la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker version
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vous devez voir la version de Docker.</p>
<ul>
<li>Que constatez-vous ?</li>
<li>Pourquoi est-ce important d’utiliser une version récente ?</li>
</ul>
<h2 id="second-test" tabindex="-1"><a class="header-anchor" href="#second-test" aria-hidden="true">#</a> Second test</h2>
<p>Maintenant que nous savons que Docker est correctement installé, testons avec une « machine » fournie par Docker. L’image se nomme <code>hello-world</code>, celle-ci ne fait qu’afficher un message de bienvenue. De nouveau, dans la console entrez la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run hello-world
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/docker/ressources/hello-world.png" alt="Docker Hello World"></p>
<ul>
<li>Que constatez-vous ?</li>
<li>Comment être certain que l’image n’a rien fait d’anormal sur notre machine ?</li>
</ul>
<h2 id="les-sources-de-l-image-hello-world" tabindex="-1"><a class="header-anchor" href="#les-sources-de-l-image-hello-world" aria-hidden="true">#</a> Les sources de l’image hello world</h2>
<p>Maintenant que nous avons lancé notre première « vrai » machine, intéressons-nous à son fonctionnement. Vous avez du constater le terme « Pulling From » c’est l’image ou les morceaux d’image utile au fonctionnement de votre service. Celui-ci est téléchargé directement depuis le « Docker Hub » (il est également possible d’avoir un Hub privé). Vous pouvez voir « les sources » de l’image en question : <a href="https://github.com/docker-library/hello-world" target="_blank" rel="noopener noreferrer">ici<ExternalLinkIcon/></a>, comme beaucoup de projets libres l’image est disponible sur Github.</p>
<p>Surprise ! On retrouve des plateformes (amd64, i686, armXX). Et c’est normal, Docker est multiplateforme et dans le cas de notre exemple l’exécutable « hello » est codé en C il est donc logique de retrouver l’exécutable pour les différentes plateformes ou l’image doit fonctionner.</p>
<p>Maintenant que nous avons vu le projet, entrons plus en détail, allons voir la définition de notre image le <a href="https://github.com/docker-library/hello-world/blob/master/i386/hello-world/Dockerfile" target="_blank" rel="noopener noreferrer">fichier Dockerfile.<ExternalLinkIcon/></a></p>
<p><img src="@source/tp/docker/ressources/hello-world2.png" alt="Hello World 2"></p>
<p>Peu d’informations, 3 lignes :</p>
<ul>
<li><code>FROM scratch</code> (Image de base, celle utilisée comme référence elle aussi possède un DockerFile).</li>
<li><code>COPY hello /</code> (ajoute le fichier hello à la racine de votre « machine »).</li>
<li><code>CMD [&quot;/hello&quot;]</code> (Commande lancée au démarrage de votre image).</li>
</ul>
<p>PS On créera un DockerFile dans le 2nd TP.</p>
<h2 id="pour-aller-plus-loin" tabindex="-1"><a class="header-anchor" href="#pour-aller-plus-loin" aria-hidden="true">#</a> Pour aller plus loin</h2>
<p>Bon, un texte à l’écran c’est bien… Mais si on lançait un système entier ? Ubuntu par exemple. Pour ça rien de plus simple, dans la console lancée :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -it ubuntu <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/docker/ressources/ubuntu.png" alt="Ubuntu"></p>
<p>Et voilà, vous avez un Linux complètement opérationnel en quelques minutes sur votre poste Windows. Pratique ! Même si ce n’est pas vraiment le but premier de Docker c’est cool.</p>
<p>Utiliser un peu le shell de votre « nouveau Linux », exemple de commande :</p>
<ul>
<li><code>uname -a</code> : Affiche la version du noyau.</li>
<li><code>whoami</code> : Qui suis-je ? (normalement root, d’ailleurs est-ce normal ?).</li>
<li><code>top</code> : Affiche les processus en cours.</li>
<li><code>ls /</code></li>
</ul>
<p>Questions :</p>
<ul>
<li>D’ailleurs, pourquoi le top ne retourne-t-il que deux processus ?</li>
<li>Aucune trace des fichiers de votre machine… normale de base rien n’est accessible.</li>
</ul>
<h3 id="creer-un-fichier-dans-la-machine" tabindex="-1"><a class="header-anchor" href="#creer-un-fichier-dans-la-machine" aria-hidden="true">#</a> Créer un fichier dans la machine</h3>
<p>Créer un fichier vide avec la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">touch</span> fichier_test
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vérifier avec un <code>ls</code> que le fichier est bien présent. Vous pouvez quitter votre l’image en saisissant <code>exit</code> dans le terminal. Relancer de nouveau l’image avec la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -it ubuntu <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Faites à nouveau un <code>ls</code>, que constatez-vous ? Et bien oui, le fichier n’est plus présent… C’est normal, tous les fichiers créés dans l’image sont non persistants (c’est-à-dire qu’ils sont supprimés à chaque fois que l’image s’arrête).</p>
<h3 id="avoir-acces-aux-fichiers-de-votre-machine" tabindex="-1"><a class="header-anchor" href="#avoir-acces-aux-fichiers-de-votre-machine" aria-hidden="true">#</a> Avoir accès aux fichiers de votre machine</h3>
<p>Bon, c’est bien, mais si l’on donnait accès à un stockage persistant à notre image. Sur votre machine le Stockage persistant c’est votre disque dur (HDD, SSD, etc.). Avec docker (comme sous Linux d’ailleurs) on parle de monter « un volume », une fois monté ce volume sera accessible comme un dossier (ou un fichier, on y reviendra).</p>
<h4 id="monter-un-dossier" tabindex="-1"><a class="header-anchor" href="#monter-un-dossier" aria-hidden="true">#</a> Monter un dossier</h4>
<p>Pour monter un volume il suffit d’ajouter un <code>-v</code> à la commande de lancement, exemple pour avoir le dossier courant :</p>
<p>⚠️⚠️ Attention ! L’accès est en lecture ET en écriture sur <strong>VOTRE MACHINE</strong> donc attention.</p>
<p>Sous Windows :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -v %cd%:/mnt/ -it ubuntu <span class="token function">bash</span> <span class="token comment"># Monte le dossier courant dans le /mnt du Docker.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Sous Unix :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/mnt/ -it ubuntu <span class="token function">bash</span> <span class="token comment"># Monte le dossier courant dans le /mnt du Docker.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Lancer la commande <code>ls /mnt</code> vous devriez voir vos fichiers.</p>
<h4 id="monter-un-fichier" tabindex="-1"><a class="header-anchor" href="#monter-un-fichier" aria-hidden="true">#</a> Monter un fichier</h4>
<p>Comme je le disais dans l’introduction avec docker il est possible de rendre accessible le dossier, mais également les fichiers. Pour les fichiers la commande est la même sauf qu’au lieu de spécifier un dossier on spécifie le chemin d’un fichier. Exemple :</p>
<p>Windows :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -v %cd%/mon_fichier:/mnt/mon_fichier -it ubuntu <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Unix :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/mon_fichier:/mnt/mon_fichier -it ubuntu <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Le fichier est maintenant accessible dans votre image Docker. Il est également possible de limiter l’accès à votre fichier en le montant par exemple en « RO » en français « lecture seulement » :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/mon_fichier:/mnt/mon_fichier:ro -it ubuntu <span class="token function">bash</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Et c’est la que l’on voit la puissance, on verra qu’il sera possible par la suite de créer de vrai « stack » applicative qui définiront l’ensemble des paramètres de notre environnement (cloisonné) et gérant finement les droits d’accès à la configuration par exemple ! Un régal !</p>
<h2 id="compilation-cordova" tabindex="-1"><a class="header-anchor" href="#compilation-cordova" aria-hidden="true">#</a> Compilation Cordova</h2>
<p>Je pense que vous vous souvenez que paramétrer l’environnement de compilation Android sur Windows n’était pas vraiment simple (JDK, SDK, etc…), avec Docker c’est beaucoup plus simple ! Vraiment beaucoup plus simple. Pour compiler un projet Cordova avec Docker j’ai préparé une petite image Docker qui possède l’ensemble des éléments nécessaires, pour l’utiliser :</p>
<h3 id="unix-linux-osx" tabindex="-1"><a class="header-anchor" href="#unix-linux-osx" aria-hidden="true">#</a> Unix (Linux, Osx)</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> mon_projet_cordova/
docker run -it --entrypoint /bin/bash -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/Sources/ c4software/cordova-light:latest
<span class="token comment"># Vous pouvez maintenant lancer, par exemple : cordova build</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> Windows</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> mon_projet_cordova/
docker run -it --entrypoint /bin/bash -v %cd%:/Sources/ c4software/cordova-light:latest
<span class="token comment"># Vous pouvez maintenant lancer, par exemple : cordova build</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="allons-plus-loin" tabindex="-1"><a class="header-anchor" href="#allons-plus-loin" aria-hidden="true">#</a> Allons plus loin</h2>
<p>Nous avons ici des petites machines pour jouer… C'est rigolo… Mais Docker est bien plus puissant que ça <RouterLink to="/tp/docker/creer_server_local.html">la suite c'est par ici</RouterLink></p>
</template>
