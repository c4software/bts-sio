<template><h1 id="vm-express-alpine-linux-k3d-docker" tabindex="-1"><a class="header-anchor" href="#vm-express-alpine-linux-k3d-docker" aria-hidden="true">#</a> VM Express : Alpine Linux, K3d &amp; Docker</h1>
<p>Un petit TP/Guide rapide pour créer une VM légère et rapide afin d'héberger un cluster Kubernetes.</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#l-iso">L&#39;ISO</RouterLink></li><li><RouterLink to="#l-installation">L&#39;installation</RouterLink><ul><li><RouterLink to="#premier-boot">Premier boot</RouterLink></li><li><RouterLink to="#premier-reboot">Premier reboot</RouterLink></li><li><RouterLink to="#premiere-etape-les-depots">Première étape : Les dépôts</RouterLink></li><li><RouterLink to="#installer-les-paquets">Installer les paquets</RouterLink></li></ul></li><li><RouterLink to="#docker">Docker</RouterLink></li><li><RouterLink to="#k3d">K3D</RouterLink></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Créer rapidement une VM peut-être intéressant pour par exemple créer rapidement un petit cluster Kubernetes (dans le but de tester la simulation d'un serveur / ordinateur distant). L'idée de ce TP est donc de vous montrer comment vous pouvez grâce à Alpine Linux créer très très rapidement une VM à partir d'un fichier ISO de seulement… 133Mo ! Ici pas d'interface graphique ni de ressources inutiles nous allons créer une « micro vm » avec seulement les éléments nécessaires au bon fonctionnement de notre cluster à savoir « Docker &amp; K3D ».</p>
<p>Alpine Linux est une distribution bien connue des gens créant des conteneurs avec Docker, en effet sa légèreté et sa très petite taille ont font souvent un choix idéal pour ne pas produire des containers inutilement trop gros / avec trop des binaires inutile.</p>
<p><a href="https://alpinelinux.org/" target="_blank" rel="noopener noreferrer">Pour en savoir plus sur Alpine Linux, rendez-vous sur le site officiel<ExternalLinkIcon/></a></p>
<h2 id="l-iso" tabindex="-1"><a class="header-anchor" href="#l-iso" aria-hidden="true">#</a> L'ISO</h2>
<p>Pour l'ISO le plus simple est de se rendre sur le site officiel dans la <a href="https://alpinelinux.org/downloads/" target="_blank" rel="noopener noreferrer">partie Download<ExternalLinkIcon/></a></p>
<p><img src="@source/tp/devops/res/alpine_choice.png" alt="Choix"></p>
<p>Dans mon cas (et certainement dans le vôtre aussi), je choisis X86_64 ce qui signifie que je vais installer ma machine virtuelle pour :</p>
<ul>
<li>Un ordinateur avec un processeur X86 (Intel ou AMD) de type 64bits.</li>
</ul>
<h2 id="l-installation" tabindex="-1"><a class="header-anchor" href="#l-installation" aria-hidden="true">#</a> L'installation</h2>
<p>L'installation d'une Alpine Linux est légèrement différente d'une installation type Debian / Ubuntu ou autre distribution classique. L'ensemble de l'installation est faite en ligne de commande (un peu comme Archlinux ou Gentoo). Écrit comme ça, vous avez peut-être peur ? Mais ne vous inquiétez pas ça va être simple, j'ai même tendance à penser que ça sera plus simple, et plus rapide (Dans mon cas 7min, téléchargement inclus !) !</p>
<p>Accrochez-vous… On démarre !</p>
<center>
<iframe src="https://giphy.com/embed/YHvwPgwojjsFa" width="480" height="313" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>
<h3 id="premier-boot" tabindex="-1"><a class="header-anchor" href="#premier-boot" aria-hidden="true">#</a> Premier boot</h3>
<p>Je passe l'étape de la création de la VM que vous connaissez déjà. Je vais m'attarder sur le premier boot car celui-ci est peut-être légèrement différent de ce dont vous avez l'habitude.</p>
<p>Le premier boot de Alpine Linux est très rapide, cette rapidité vient du fait que Alpine Linux est par défaut complètement en mode texte. Ce mode texte vous imposera de saisir quelques commandes pour procéder à son installation ; vous allez voir Alpine Linux est simple, même en ligne de commande.</p>
<p>Au premier boot vous tomberez sur l'écran suivant :</p>
<p><img src="@source/tp/devops/res/alpine_boot.png" alt="Premier Boot"></p>
<ul>
<li>Le login est : root (sans mot de passe).</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">Attention clavier qwerty</p>
<p>Alpine Linux est une distribution à destination du monde entier, le clavier est donc par défaut en qwerty. Celui-ci sera changé lors de l'installation. Mais pour « la première commande et le login », nous allons devoir saisir le texte avec une disposition qwerty.</p>
<p>Si vous n'avez pas le clavier en tête le voilà :</p>
<p><img src="@source/tp/devops/res/qwerty.png" alt="Clavier Qwerty"></p>
</div>
<p>La première commande à saisir est :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>setup-alpine
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>✋ Attention clavier qwerty</p>
<p>À partir de maintenant nous sommes en mode interactif, comme l'installeur d'une Debian mais simplement en mode texte seulement ; c'est-à-dire qu'il va vous poser des questions. Voilà mes réponses (vous pouvez utiliser les mêmes).</p>
<ul>
<li>Layout : fr</li>
<li>Variant : fr</li>
<li>hostname : localhost</li>
<li>Interface to initialize : eth0</li>
<li>Ip address for eth0 : dhcp</li>
<li>Manual configuration for network : n</li>
<li>Root password : <code>votre-mdp</code></li>
<li>Confirm root password : <code>votre-mdp</code></li>
<li>Proxy : none</li>
<li>Timezone : UTC</li>
<li>Ntp client : chrony</li>
<li>Enter mirror number : 1</li>
<li>SSH Server : openssh</li>
<li>Disk to use : sda</li>
<li>How would you like to use it : sys</li>
<li>Erase the disks and continue : y</li>
</ul>
<p>L'installation va procéder, puis vous rendre la main. Vous pouvez retirer l'ISO et saisir :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">reboot</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Allez plus vite…</p>
<p>Vous avez dû remarquer les valeurs entre crochets à la fin des questions. Il s’agit des valeurs « par défaut » (autrement dit celle recommandée), quand c'est comme ça il vous suffit de faire <key>entrer</key>. Ce qui donne dans mon cas en vidéo :</p>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/1y2ztFyVGuo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<h3 id="premier-reboot" tabindex="-1"><a class="header-anchor" href="#premier-reboot" aria-hidden="true">#</a> Premier reboot</h3>
<p>Nous allons configurer notre système afin de lui installer les paquets nécessaires à notre usage, à savoir :</p>
<ul>
<li>Docker</li>
<li>K3D</li>
</ul>
<p>À partir de maintenant vous pouvez utiliser le SSH.</p>
<h3 id="premiere-etape-les-depots" tabindex="-1"><a class="header-anchor" href="#premiere-etape-les-depots" aria-hidden="true">#</a> Première étape : Les dépôts</h3>
<p>Pour activer le dépôt community il suffit de décommenter une ligne dans le fichier de configuration des APK.</p>
<div class="custom-container tip"><p class="custom-container-title">Deux dépôts</p>
<p>Les dépôts de Alpine Linux sont découpés en deux :</p>
<ul>
<li>Le main (ceux actifs de base).</li>
<li>Le community (à activer dans un fichier).</li>
</ul>
</div>
<p>La première étape est d'installer l'éditeur de votre choix (<strong>vim</strong>, nano, etc) :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>apk <span class="token function">add</span> <span class="token function">vim</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Puis il vous suffit de décommenter la <strong>3ème ligne</strong> du fichier <code>/etc/apk/repositories</code>. Vous pouvez le faire via :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/apk/repositories
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Ce qui donne chez moi :</p>
<p><img src="@source/tp/devops/res/repo_community.png" alt="Repo Community"></p>
<h3 id="installer-les-paquets" tabindex="-1"><a class="header-anchor" href="#installer-les-paquets" aria-hidden="true">#</a> Installer les paquets</h3>
<p>Pour installer les paquets, nous allons utiliser le gestionnaire de paquets de Alpine Linux à savoir <code>apk</code>. Les commandes de celui-ci ressemblent beaucoup à celle de <code>apt</code> de Debian.</p>
<p>Quelques commandes à savoir en vrac :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>apk update <span class="token comment"># met à jour la liste des paquets</span>
apk upgrade <span class="token comment"># met à jour les paquets sur votre machine</span>
apk <span class="token function">add</span> <span class="token operator">&lt;</span>nom <span class="token function">du</span> paquet<span class="token operator">></span> <span class="token comment"># installe le paquet souhaité (si présent)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Exemple, pour installer <code>vim</code> :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>apk <span class="token function">add</span> <span class="token function">vim</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h2>
<p>Installer Docker sur Alpine Linux est rapide, il suffit de lancer la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>apk <span class="token function">add</span> docker <span class="token comment"># Install Docker</span>
rc-update <span class="token function">add</span> docker boot <span class="token comment"># Active Docker au démarrage de la machine</span>
<span class="token function">service</span> docker start <span class="token comment"># Démarre Docker dès maintenant</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="@source/tp/devops/res/alpine_docker.png" alt="Alpine Docker"></p>
<div class="custom-container tip"><p class="custom-container-title">Vous pouvez vérifier …</p>
<p>Pour vérifier le bon fonctionnement, il suffit de saisir dans le terminal :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker <span class="token function">ps</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div>
<h2 id="k3d" tabindex="-1"><a class="header-anchor" href="#k3d" aria-hidden="true">#</a> K3D</h2>
<p>Maintenant que nous avons installé Docker, il faut ajouter K3D. Malheureusement pour l'instant celui-ci n'est pas disponible dans le repo. Pour l'installer il faut passer via la commande décrite dans <a href="https://github.com/rancher/k3d#get" target="_blank" rel="noopener noreferrer">la documentation officielle<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> -q -O - https://raw.githubusercontent.com/rancher/k3d/main/install.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token comment"># Installation de la commande k3D</span>
sysctl -w net/netfilter/nf_conntrack_max<span class="token operator">=</span><span class="token number">131072</span> <span class="token comment"># Permet la création des agents (Un correctif est en cours de publication, bientôt plus nécéssaire)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Vous pouvez vérifier que celui-ci est bien installé via :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>k3d --help
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">À propos du sysctl</p>
<p>C'est un contournement temporaire, le problème est récent et sera corrigé dans une prochaine version.</p>
<p>https://github.com/rancher/k3d/issues/607</p>
</div>
</template>
