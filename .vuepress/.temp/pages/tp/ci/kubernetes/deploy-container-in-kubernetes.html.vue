<template><h1 id="deployer-une-image-docker-dans-kubernetes" tabindex="-1"><a class="header-anchor" href="#deployer-une-image-docker-dans-kubernetes" aria-hidden="true">#</a> Déployer une Image Docker dans Kubernetes</h1>
<p>Nous avons vu précédemment qu'il était possible de compiler puis de packager une application grâce à Gitlab-CI, dans ce TP nous allons voir comment déployer cette image (<strong>présente dans un registry privée</strong>) dans un cluster Kubernetes</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#le-cluster">Le Cluster</RouterLink><ul><li><RouterLink to="#k3d">k3d</RouterLink></li><li><RouterLink to="#acces-du-cluster-a-distance">Accès du cluster à distance</RouterLink></li><li><RouterLink to="#kubectl">kubectl ?</RouterLink></li><li><RouterLink to="#les-solutions-payantes">Les solutions payantes</RouterLink></li></ul></li><li><RouterLink to="#creer-l-image-docker-via-gitlab-ci">Créer l&#39;image Docker via Gitlab-CI</RouterLink><ul><li><RouterLink to="#le-projet">Le projet</RouterLink></li><li><RouterLink to="#le-docker-file">Le Docker File</RouterLink></li><li><RouterLink to="#la-ci">La CI</RouterLink></li><li><RouterLink to="#l-image-docker">L&#39;image Docker</RouterLink></li></ul></li><li><RouterLink to="#deployer-l-image-sur-le-cluster-kubernetes">Déployer l&#39;image sur le cluster Kubernetes</RouterLink><ul><li><RouterLink to="#introduction-1">Introduction</RouterLink></li><li><RouterLink to="#le-secret">Le secret</RouterLink></li><li><RouterLink to="#l-authentification-avec-le-registry-gitlab">L&#39;authentification avec le Registry Gitlab</RouterLink></li><li><RouterLink to="#la-configuration">La configuration</RouterLink></li><li><RouterLink to="#deployer-votre-application">Déployer votre application</RouterLink></li><li><RouterLink to="#tester">Tester</RouterLink></li></ul></li><li><RouterLink to="#deployer-une-mise-a-jour">Déployer une mise à jour</RouterLink><ul><li><RouterLink to="#modifier-le-deployment-yml">Modifier le deployment.yml</RouterLink></li></ul></li><li><RouterLink to="#la-suite">La suite ?</RouterLink></li><li><RouterLink to="#l-usage-en-plus">L&#39;usage en plus</RouterLink><ul><li><RouterLink to="#gestion-multi-paths">Gestion multi paths</RouterLink></li><li><RouterLink to="#gestion-multidomaine">Gestion multidomaine</RouterLink></li><li><RouterLink to="#creer-un-pod-mariadb-utilisant-un-volume-persistant">Créer un pod MariaDB utilisant un volume (persistant)</RouterLink></li><li><RouterLink to="#acceder-a-un-port-sans-le-rendre-public">Accéder à un port sans le rendre public</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce TP nous allons voir comment :</p>
<ul>
<li>Configurer un cluster Kubernetes simple avec <code>k3d</code>.</li>
<li>Comment autoriser le cluster Kubernetes à « pull » l'image depuis le repo privé de Gitlab.</li>
<li>Comment lancer &amp; autoriser les connexions sur un port accessible depuis le réseau.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Contenu non exhaustif</p>
<p>Kubernetes est un sujet très large qui est très large. Dans ce TP nous poserons uniquement les bases, celle-ci vous servirons à découvrir le fonctionnement de Kubernetes, mais également comme l'utiliser dans un usage « avancés » c'est-à-dire sans forcément utiliser une image sur le hub public de Docker.</p>
</div>
<h2 id="le-cluster" tabindex="-1"><a class="header-anchor" href="#le-cluster" aria-hidden="true">#</a> Le Cluster</h2>
<p>Contrairement à un simple Docker, compose Kubernetes reposes sur un principe de Cluster. Le cluster n'est pas « une simple image ». Il s’agit d'un outil d'orchestration qui regroupera à la fois :</p>
<ul>
<li>Les images (container).</li>
<li>Les paramétrages des volumes.</li>
<li>Le nombre d'instances déployé.</li>
<li>Le réseau</li>
<li>En passant par l'exposition des services.</li>
</ul>
<p>L'idée ici est donc de gérer l'ensemble de votre « stack » et pas seulement la combinaison d'images dans un Docker-Compose. L'ensemble de votre configuration sera configurée en YAML dans <em>un</em> ou <strong>plusieurs</strong> fichiers.</p>
<p>Nous allons avoir plusieurs possibilités pour créer notre cluster, il existe plusieurs « logiciels » permettant de créer des Clusters Kubernetes :</p>
<ul>
<li>k8s</li>
<li>minikube</li>
<li>k3s</li>
<li>k3d (en réalité c'est k3s in Docker)</li>
<li>kind</li>
<li>…</li>
</ul>
<p>Beaucoup de possibilité pour répondre à des cas d'usage différents, le plus simple dans notre cas c'est « k3d » ; pourquoi ? Car il permet de déployer un cluster Kubernetes dans un environnement conteneurisé type Docker.</p>
<div class="custom-container warning"><p class="custom-container-title">Du YAML ?</p>
<p>Oui… Beaucoup de YAML ! Mais vous allez voir… Une fois une bonne base en place c'est « plutôt simple ».</p>
<p><img src="@source/tp/ci/kubernetes/res/yaml.jpeg" alt="YAML"></p>
</div>
<div class="custom-container danger"><p class="custom-container-title">Gérer son cluster… kubectl ? helm ?</p>
<p>Le monde Kubernetes est rempli de plusieurs outils, les différents outils ont été créé à différentes époques et répondent à des besoins différents, et surtout des tailles de projet différentes.</p>
<p>Pour cette introduction, je vais rester sur l'outil de base à savoir <code>kubectl</code>, il sera amplement suffisant et vous les verrez il nous permettra même de déployer sans trop de difficultés en automatique dans un flow de CI/CD.</p>
</div>
<h3 id="k3d" tabindex="-1"><a class="header-anchor" href="#k3d" aria-hidden="true">#</a> k3d</h3>
<p>Nous allons donc installer <a href="https://k3d.io/" target="_blank" rel="noopener noreferrer">k3d<ExternalLinkIcon/></a>, l'installation va être relativement simple, il s'agit ici juste d'un petit outil qui nous permettra de créer / initialiser, mais également de manager nos différents clusters.</p>
<p>Pour l'installation, je vous laisse vous reporter <a href="https://github.com/rancher/k3d#get" target="_blank" rel="noopener noreferrer">à la documentation officielle<ExternalLinkIcon/></a> en effet, en fonction de votre OS l'installation sera évidemment différente.</p>
<p>Une fois installé sur votre machine / serveur, vous devriez pouvoir jouer dans votre terminal la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ k3d --version
k3d version v4.4.3
k3s version v1.20.6-k3s1 <span class="token punctuation">(</span>default<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Dans mon cas, j'ai donc la version <code>4.4.3</code> de k3d.</p>
<h4 id="initialiser-un-cluster" tabindex="-1"><a class="header-anchor" href="#initialiser-un-cluster" aria-hidden="true">#</a> Initialiser un Cluster</h4>
<p>Pour l'instant nous n'avons pas initialisé de cluster, notre machine / serveur est toujours identique à avant l'installation. La création de clusters va se réaliser via la commande <code>k3d</code> récemment installés. Pour faire simple, si vous souhaitez créer un cluster il vous suffira de :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>k3d cluster create --api-port IP_DE_VOTRE_SERVEUR:20135 -p <span class="token string">"8080:80@loadbalancer"</span> --volume <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/volume/:/data/ -s <span class="token number">1</span> -a <span class="token number">2</span> monCluster
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>Avant de jouer la commande comme un sauvage</strong>, détaillons un peu ce que vous allez lancer sur votre machine :</p>
<p><img src="@source/tp/ci/kubernetes/res/infra.jpg" alt="Infra"></p>
<table>
<thead>
<tr>
<th>Options</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>cluster</code></td>
<td>Indique que nous souhaitons gérer la partie cluster</td>
</tr>
<tr>
<td><code>create</code></td>
<td>Indique que nous souhaitons créer un nouveau cluster</td>
</tr>
<tr>
<td><code>--api-port IP_DE_VOTRE_SERVEUR::20125</code></td>
<td>Port d'écoute de la partie API <strong>de management</strong> du cluster</td>
</tr>
<tr>
<td><code>-p &quot;8080:80@loadbalancer&quot;</code></td>
<td>Expose le port <code>8080</code> sur votre machine, il permettra d'accéder à votre « service déployé »</td>
</tr>
<tr>
<td><code>--volume ./volume/:/data/</code></td>
<td>Fournis un espace de stockage persistant à votre cluster</td>
</tr>
<tr>
<td><code>-s 1</code></td>
<td>Indique que vous souhaitez 1 serveur</td>
</tr>
<tr>
<td><code>-a 2</code></td>
<td>Indique que vous souhaitez 2 agents</td>
</tr>
<tr>
<td><code>monCluster</code></td>
<td>Le nom du cluster que vous souhaitez créer</td>
</tr>
</tbody>
</table>
<p>Vous pouvez maintenant lancer la commande. Dans quelques minutes / secondes en fonctions de votre machine vous aurez un cluster Kubernetes disponible.</p>
<div class="custom-container tip"><p class="custom-container-title">C'est dans « du docker »</p>
<p>Vous pouvez vérifier que nous sommes bien dans différents Container Docker via un simple <code>docker ps</code>.</p>
<p><img src="@source/tp/ci/kubernetes/res/docker_ps.png" alt="Docker PS"></p>
</div>
<p>Votre cluster Kubernetes est maintenant <strong>opérationnel</strong>, vous pouvez déployer dessus ce que vous souhaitez. Si vous avez initialisé le cluster sur votre machine, celui-ci est normalement disponible immédiatement.</p>
<p>Cependant, je vous invite à réaliser un cluster « distant » ; même si fondamentalement ça ne change pas grand-chose au fonctionnement, vous devrez vous poser des questions toutes bêtes comme par exemple :</p>
<p>« Mais comment j'accède à distance à mon Cluster ? Comment est gérée la sécurité de mon cluster ? »</p>
<h3 id="acces-du-cluster-a-distance" tabindex="-1"><a class="header-anchor" href="#acces-du-cluster-a-distance" aria-hidden="true">#</a> Accès du cluster à distance</h3>
<p>Nous allons donc voir comment « récupérer » la configuration du cluster <code>monCluster</code> que nous avons initialisé précédemment.</p>
<div class="custom-container warning"><p class="custom-container-title">Pourquoi est-ce important à mon avis ?</p>
<p>Dans le monde réel, il est peu probable que votre cluster Kubernetes soit en local sur votre serveur, l'intérêt est très limité et l'ajout de Kubernetes serait très subjectif…</p>
<p>Même si ce TP utilise une implémentation « simple » d'un cluster Kubernetes, il peut complètement être utilisé dans le cadre d'un environnement de développement. Et dans ce cadre, il est évident qu’accéder à son cluster à distance est primordial.</p>
</div>
<p>k3d (ou k3s in Docker) utilise la même logique d'authentification que les autres solution Kubernetes du marché. Ça repose comme souvent avec Kubernetes sur … un fichier YAML, celui-ci va contenir l'ensemble de la configuration et des clés d'accès de votre cluster.</p>
<p>Il est donc <strong>important que celui-ci reste privé</strong>, vous ne devez jamais le partager, le comité dans un dépot public, voire le diffuser en ligne. Car évidemment celui-ci donne les pleins pouvoirs pour modifier / déployer / interagir avec votre Cluster.</p>
<p>Pour forcer <code>k3d</code> à écrire la configuration de votre Cluster, il faut saisir la commande:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ k3d kubeconfig <span class="token function">write</span> monCluster
/home/vbrosseau/.k3d/kubeconfig-monCluster.yaml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>À cette étape, vous venez d'écrire la configuration de votre Cluster dans votre serveur. Cette configuration va nous permettre par la suite de piloter le cluster via <strong>votre ordinateur</strong>.</p>
<p>Le fichier est sauvegardé dans le dossier <code>.k3d</code> dans la home de votre utilisateur. Vous pouvez la récupérer via un <code>scp</code> (ou autre solution de transfert).</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">scp</span> vbrosseau@monServer.dev:.k3d/kubeconfig-monCluster.yaml <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Et voilà vous avez maintenant l'ensemble des <code>secrets</code> nécessaires pour que votre serveur vous reconnaisse 👋. Pour les fournir à <code>kubectl</code> il suffit de :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>kubeconfig-monCluster.yaml
kubectl cluster-info
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Si vous avez bien suivi… vous devriez avoir les informations de votre cluster.</p>
<div class="custom-container danger"><p class="custom-container-title">STOP !</p>
<p>La curiosité n'est pas un vilain défaut ! Regardons ensemble le contenu du fichier que vous venez de récupérer !</p>
</div>
<p>Votre Cluster est maintenant pleinement fonctionnel. Il est pour l'instant vide, mais vous allez voir, nous allons très prochainement déployer votre application.</p>
<h3 id="kubectl" tabindex="-1"><a class="header-anchor" href="#kubectl" aria-hidden="true">#</a> kubectl ?</h3>
<p><code>kubectl</code> est l'outil officiel permettant de gérer votre cluster Kubernetes. <a href="https://kubernetes.io/docs/tasks/tools/" target="_blank" rel="noopener noreferrer">Pour l'installation je vous laisse suivre la documentation officielle<ExternalLinkIcon/></a> :</p>
<ul>
<li><a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/" target="_blank" rel="noopener noreferrer">Linux<ExternalLinkIcon/></a> (ou via votre gestionnaire de paquet)</li>
<li><a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/" target="_blank" rel="noopener noreferrer">Windows<ExternalLinkIcon/></a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/" target="_blank" rel="noopener noreferrer">MacOS<ExternalLinkIcon/></a> (ou via brew)</li>
</ul>
<h3 id="les-solutions-payantes" tabindex="-1"><a class="header-anchor" href="#les-solutions-payantes" aria-hidden="true">#</a> Les solutions payantes</h3>
<p>Bon, même si ce n’est pas le sujet de ce TP, il faut avoir en tête qu'il existe énormément de solutions pour monter un Cluster Kubernetes. Ici nous avons créé un cluster avec <code>k3s</code> (via <code>k3d</code>), aucun problème votre cluster va fonctionner comme attendu. <strong>Cependant</strong> cette solution est valide pour expérimenter Kubernetes ou pour déployer une application perso.</p>
<p>Si vous souhaitez utiliser Kubernetes <strong>en prod</strong> ou de manière professionnelle, je vous conseille vivement de passer par une solution manager du type :</p>
<ul>
<li><a href="https://aws.amazon.com/fr/kubernetes/" target="_blank" rel="noopener noreferrer">Kubernetes sur AWS<ExternalLinkIcon/></a></li>
<li><a href="https://cloud.google.com/kubernetes-engine" target="_blank" rel="noopener noreferrer">Google Engine Kubernetes<ExternalLinkIcon/></a></li>
<li><a href="https://www.ovhcloud.com/en/public-cloud/kubernetes/" target="_blank" rel="noopener noreferrer">OVH Kubernetes<ExternalLinkIcon/></a></li>
<li><a href="https://www.scaleway.com/en/kubernetes-kapsule/" target="_blank" rel="noopener noreferrer">Kubernetes Kapsule de Scaleway<ExternalLinkIcon/></a></li>
</ul>
<p>L'usage de ce type de solution ne change rien à ce que nous avons vu / allons voir. Leur avantage c'est que vous n'avez rien à gérer, la solution est <strong>managée</strong> par le fournisseur de service.</p>
<h2 id="creer-l-image-docker-via-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#creer-l-image-docker-via-gitlab-ci" aria-hidden="true">#</a> Créer l'image Docker via Gitlab-CI</h2>
<p>Avant d'aller plus loin… Il nous faut quelque chose à déployer. Dans Kubernetes nous pouvons déployer différents types d'application :</p>
<ul>
<li>Des outils sans « interface » (HTML, ou API).</li>
<li>Des API (exposée en HTTP).</li>
<li>Un site Internet.</li>
<li>Une base de données</li>
<li>Une combinaison de site Internet + API + BDD</li>
</ul>
<p>Bref, ce que vous souhaitez donc !</p>
<h3 id="le-projet" tabindex="-1"><a class="header-anchor" href="#le-projet" aria-hidden="true">#</a> Le projet</h3>
<p>Pour débuter nous allons déployer un projet simple, je vous propose de déployer un projet similaire à la documentation que vous êtes entrain de lire. La solution que j'utilise s'appelle <a href="https://vuepress.vuejs.org/" target="_blank" rel="noopener noreferrer">VuePress<ExternalLinkIcon/></a>, cette solution permet de créer rapidement un site à partir de fichier <code>Markdown</code> nous sommes donc en plein dans la JamStack.</p>
<p><strong>-&gt; Je vous laisse regarder un peu la documentation de VuePress avant de continuer</strong></p>
<p>Pour créer un projet VuePress, il suffit d'entrer la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npx create-vuepress-site vuePressInKube
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Au passage</p>
<p>Je vous avais parlé de <code>pnpm</code> précédemment… Ici si vous souhaitez l'utiliser également vous pouvez faire <code>pnpx</code> à la place à <code>npx</code>.</p>
</div>
<p>Avant d'aller plus loin, je vous laisse :</p>
<ul>
<li>Tester que ça fonctionne en local avec un <code>npm install</code> puis un <code>npm run dev</code> (attention à être dans le dossier <code>docs</code>).</li>
<li>Créer votre projet sur Gitlab et créer une première version du dossier <code>docs</code>.</li>
</ul>
<p>Pour le premier point si tout va bien vous devriez avoir :</p>
<p><img src="@source/tp/ci/kubernetes/res/init.png" alt="VuePress"></p>
<h3 id="le-docker-file" tabindex="-1"><a class="header-anchor" href="#le-docker-file" aria-hidden="true">#</a> Le Docker File</h3>
<p>Si tout est bon, continuons, nous allons maintenant créer une image Docker de votre site. C'est celle-ci que nous déploierons dans notre container.</p>
<p>Ici il s'agit d'un site Internet, donc comme <RouterLink to="/tp/ci/packager-docker.html">dans le TP sur le packaging avec Docker</RouterLink> nous utiliserons une image « simpliste » à base de nginx.</p>
<p>Cette image aura pour but de prendre le résultat du Build de VuePress pour l'héberger de manière statique. La première version est donc de créer une première version via :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">pnpm</span> run build
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Votre site static est généré dans le dossier <code>src/.vuepress/dist</code> c'est ce dossier que nous allons mettre dans notre image Docker.</p>
<p>Je vous laisse créer le fichier <code>Dockerfile</code> dans le dossier <code>docs</code> avec le contenu suivant</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>FROM nginx<span class="token punctuation">:</span>stable<span class="token punctuation">-</span>alpine
COPY src/.vuepress/dist /usr/share/nginx/html
EXPOSE 80
CMD <span class="token punctuation">[</span><span class="token string">"nginx"</span><span class="token punctuation">,</span> <span class="token string">"-g"</span><span class="token punctuation">,</span> <span class="token string">"daemon off;"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">STOP !</p>
<p>Avant de pusher votre code, tester sur votre ordinateur le bon fonctionnement !</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker build -t vuepress:test <span class="token builtin class-name">.</span>
docker run -it -p <span class="token number">9090</span>:80 --rm --name vuepresstest vuepress:test
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>« Votre site » doit-être accessible sur <a href="http://localhost:9090" target="_blank" rel="noopener noreferrer">le port 9090<ExternalLinkIcon/></a></p>
</div>
<h3 id="la-ci" tabindex="-1"><a class="header-anchor" href="#la-ci" aria-hidden="true">#</a> La CI</h3>
<p>L'idée dans ce TP est de faire générer l'image Docker automatiquement par Gitlab-CI afin de la récupérer de manière privée dans notre cluster Kubernetes. Nous allons donc configurer la CI de Gitlab pour générer une nouvelle image Docker à chaque fois qu'un commit arrive dans la <code>master</code>.</p>
<p>Cette image Docker sera taguée avec l'identifiant du commit en question. Cette étape est <strong>identique</strong> à ce que nous avons déjà fait précédemment dans le TP <RouterLink to="/tp/ci/packager-docker.html#packager">Packager avec Docker</RouterLink>.</p>
<p>Je vous laisse regarder comment nous avions fait, afin de reprendre la même logique dans ce projet. En deux mots l'opération sera la suivante :</p>
<ul>
<li>Créer un fichier <code>.gitlab-ci.yml</code> à la racine de votre projet.</li>
<li>Ajouter la configuration qui permettra de <code>builder le projet</code> puis de <code>builder l'image docker</code>.</li>
<li>Commiter et pusher votre projet pour que Gitlab-CI lance la compilation.</li>
</ul>
<p><strong>Attention</strong>, dans le cas présent les étapes de compilation « JS » seront plus simples que dans l'exemple du TP dont vous vous inspirez, un simple <code>npm run build</code> sera certainement suffisant 😉.</p>
<div class="custom-container warning"><p class="custom-container-title">Tester c'est douter ?</p>
<p>Avant d'envoyer l'image dans notre cluster Kubernetes, je vous propose de tester que celle-ci fonctionne correctement. Après le build, tester de la récupérer pour la lancer sur votre Docker local.</p>
</div>
<details class="custom-container details"><summary>En manque d'inspiration ?</summary>
<p>Avez-vous vraiment cherchez ? Si oui… Voilà un exemple de <code>.gitlab-ci.yml</code> qui fonctionne :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">stages</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> build
  <span class="token punctuation">-</span> release

<span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>latest
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> npm install
    <span class="token punctuation">-</span> npm run build
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> src/.vuepress/dist
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master

<span class="token key atrule">release</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> docker<span class="token punctuation">:</span>19.03.12
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> release
  <span class="token key atrule">dependencies</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> build
  <span class="token key atrule">services</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> docker<span class="token punctuation">:</span>19.03.12<span class="token punctuation">-</span>dind
  <span class="token key atrule">variables</span><span class="token punctuation">:</span>
    <span class="token key atrule">IMAGE_TAG</span><span class="token punctuation">:</span> $CI_REGISTRY_IMAGE<span class="token punctuation">:</span>$CI_COMMIT_SHORT_SHA
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> docker login <span class="token punctuation">-</span>u $CI_REGISTRY_USER <span class="token punctuation">-</span>p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    <span class="token punctuation">-</span> docker build <span class="token punctuation">-</span>t $IMAGE_TAG .
    <span class="token punctuation">-</span> docker push $IMAGE_TAG
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div></details>
<h3 id="l-image-docker" tabindex="-1"><a class="header-anchor" href="#l-image-docker" aria-hidden="true">#</a> L'image Docker</h3>
<p>Si tout s'est bien passé, vous avez maintenant une première version de votre application dans votre Registry Privée, celle-ci contient une version de votre application.</p>
<p>Le registry étant privé, nous allons devoir autoriser le cluster Kubernetes à communiquer avec celui-ci. Rien de bien compliqué rassurez-vous.</p>
<p><img src="@source/tp/ci/kubernetes/res/ci-success.png" alt="CI Success">
<img src="@source/tp/ci/kubernetes/res/registry-image.png" alt="Registry Gitlab"></p>
<h2 id="deployer-l-image-sur-le-cluster-kubernetes" tabindex="-1"><a class="header-anchor" href="#deployer-l-image-sur-le-cluster-kubernetes" aria-hidden="true">#</a> Déployer l'image sur le cluster Kubernetes</h2>
<p>Nous attaquons maintenant la partie qui vous intéresse, j'imagine 😄, comment déployer cette image dans notre cluster Kubernetes.</p>
<h3 id="introduction-1" tabindex="-1"><a class="header-anchor" href="#introduction-1" aria-hidden="true">#</a> Introduction</h3>
<p>Comme je disais en introduction nous allons devoir écrire quelques fichiers YAML. Ces fichiers ont chacun une fonction :</p>
<ul>
<li><code>deployment.yaml</code> va contenir l'ensemble des paramètres liés à votre déploiement (images à déployer, nombre de replicas, nom de votre projet, la référence à vos secrets de pull Docker).</li>
<li><code>services.yaml</code> va indiquer le ou les ports disponibles à l'intérieur de votre/vos image(s).</li>
<li><code>ingress.yaml</code> va indiquer comment le port ou les ports doivent-être exposé à vos clients (path, ou sur un domaine en particulié)</li>
</ul>
<p>Ces fichiers sont « presque » toujours identiques entre chaque déploiement, c'est pour ça que des solutions comme <code>helm</code> existent. Pour simplifier, dans notre cas je vais vous donner les fichiers.</p>
<p>Cependant, si vous souhaitez vraiment maitriser ce que nous sommes entrain de voir, je vous invite vivement à regarder ce que vous indiquer dans les fichiers.</p>
<div class="custom-container tip"><p class="custom-container-title">Les paramètres importants ?</p>
<p>Même si tous les paramètres sont importants deux doivent attirer votre attention :</p>
<ul>
<li>le <code>name</code>, présent dans l'ensemble des fichiers, c'est le nom de votre projet à déployer.</li>
<li>le <code>image</code>, c'est le lien vers votre image Docker à déployer (privée ou publique). Si l'image est privée il faudra indiquer un <code>imagePullSecrets</code>.</li>
</ul>
<p><img src="@source/tp/ci/kubernetes/res/deployment_yaml_file.png" alt="Fichier deployment.yml"></p>
</div>
<h3 id="le-secret" tabindex="-1"><a class="header-anchor" href="#le-secret" aria-hidden="true">#</a> Le secret</h3>
<p>Nous l'avons vu tout à l'heure, pour communiquer avec votre Cluster il faut être authentifié. Attention si vous avez fermé le terminal depuis il faut exporter à nouveau la variable <code>$KUBECONFIG</code>.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=~</span>/emplacement/vers/le/secret/kubeconfig-monCluster.yaml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="l-authentification-avec-le-registry-gitlab" tabindex="-1"><a class="header-anchor" href="#l-authentification-avec-le-registry-gitlab" aria-hidden="true">#</a> L'authentification avec le Registry Gitlab</h3>
<p>Même si il est complètement possible d'utiliser le Docker Hub j'ai fait le choix de vous montrer directement comment utiliser une image sur un <code>Registry privé</code>. Pourquoi ? À mon sens, c'est très certainement la première problématique que vous rencontrerez. En effet dans le cadre du déploiement continu à part travailler sur un projet « Open Source » publique il y a fort à parier que votre entreprise ne souhaite pas vraiment avoir son code source disponible publiquement en ligne…</p>
<p><strong>C'est pour ça qu'il est important</strong> de maitriser cet aspect. Kubernetes est complètement capable d'utiliser le Registry de Gitlab, il faut juste lui donner « vos identifiants ». Évidemment vous n'aller pas donner votre login et votre mot de passe.</p>
<table>
<thead>
<tr>
<th style="text-align:center"><iframe src="https://giphy.com/embed/gIfdqZA4ECvMVrRpSv" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">On est bien d'accord, vous ne DONNEZ JAMAIS VOTRE LOGIN ET VOTRE MOT DE PASSE. <strong>JAMAIS</strong></td>
</tr>
</tbody>
</table>
<p>Cette fois-ci pas de YAML, mais <strong>une simple commande</strong> :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create secret docker-registry gitlab-registry --docker-server<span class="token operator">=</span><span class="token string">"https://registry.gitlab.com"</span> --docker-username<span class="token operator">=</span><span class="token string">"VOTRE_UTILISATEUR_GITLAB"</span> --docker-password<span class="token operator">=</span><span class="token string">"TOKEN_OBTENU_PAR_GITLAB"</span> --docker-email<span class="token operator">=</span><span class="token string">"VOTRE_EMAIL_GITLAB"</span> -o yaml --dry-run<span class="token operator">=</span>client <span class="token operator">|</span> kubectl apply -f -
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Pour générer le Token, il suffit de passer par les paramètres de votre profile :</p>
<p><img src="@source/tp/ci/kubernetes/res/token.png" alt="Token création"></p>
<div class="custom-container warning"><p class="custom-container-title">Be curious !</p>
<p>Inspecter, regarder, questionner moi, l'important est de comprendre ce que vous êtes entrain de faire. Dans le cas présent tenter de jouer la commande sans la fin (<code>| kubectl apply -f -</code>), vous allez voir le contenu de la configuration envoyé à votre cluster Kubernetes.</p>
<p>Et oui… C'est encore du YAML 😢</p>
</div>
<h3 id="la-configuration" tabindex="-1"><a class="header-anchor" href="#la-configuration" aria-hidden="true">#</a> La configuration</h3>
<p>Cette partie, je vous la donne « pour débuter ». Je vous laisse cependant ajuster les différents paramètres dans les différents fichiers.</p>
<table>
<thead>
<tr>
<th style="text-align:center"><img src="@source/tp/ci/kubernetes/res/deployment_yaml_file.png" alt="Fichier deployment.yml"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Exemple dans le deployment.yml</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">On commit, ou on ne commit pas ?</p>
<p>Gros débat… Dans un projet privé pas de problème, cette configuration peut accompagner le projet… dans le cas d'un projet « public » attention à ne pas commiter un YAML qui ferait référence à des informations privées / non destinée aux publiques (IP, port, …)</p>
</div>
<div class="custom-container danger"><p class="custom-container-title">Par contre</p>
<p>Ce qui est certain par contre, c'est que nous ne commiterons <strong>jamais</strong> le fichier <code>kubeconfig-monCluster.yaml</code> qui contient les secrets de votre cluster.</p>
</div>
<h4 id="le-deployment-yml" tabindex="-1"><a class="header-anchor" href="#le-deployment-yml" aria-hidden="true">#</a> Le deployment.yml</h4>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
          <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.gitlab.com/vbrosseau/vuepress<span class="token punctuation">-</span>kubernetes<span class="token punctuation">-</span>deploy<span class="token punctuation">:</span>bb2d2d0b
      <span class="token key atrule">imagePullSecrets</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> gitlab<span class="token punctuation">-</span>registry
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">image</p>
<p>N'oubliez pas de changer le lien de l'image vers <strong>votre</strong> image dans le registry gitlab.</p>
</div>
<h4 id="le-services-yml" tabindex="-1"><a class="header-anchor" href="#le-services-yml" aria-hidden="true">#</a> Le services.yml</h4>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="le-ingress-yml" tabindex="-1"><a class="header-anchor" href="#le-ingress-yml" aria-hidden="true">#</a> Le ingress.yml</h4>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">ingress.kubernetes.io/ssl-redirect</span><span class="token punctuation">:</span> <span class="token string">"false"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">http</span><span class="token punctuation">:</span>
        <span class="token key atrule">paths</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
            <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
            <span class="token key atrule">backend</span><span class="token punctuation">:</span>
              <span class="token key atrule">service</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
                <span class="token key atrule">port</span><span class="token punctuation">:</span>
                  <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">À quoi ça sert ?</p>
<p>Le fichier Ingress défini comment votre pod va être accessible. Nous avons donc ici la correspondance entre le chemin (path, ou domain) et le port du service défini plus haut.</p>
</div>
<h3 id="deployer-votre-application" tabindex="-1"><a class="header-anchor" href="#deployer-votre-application" aria-hidden="true">#</a> Déployer votre application</h3>
<p>Pour le déploiement, c'est plutôt simple il suffit de communiquer avec votre serveur avec <code>kubectl</code> :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply -f deployment.yaml
kubectl apply -f services.yaml
kubectl apply -f ingress.yaml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Le déploiement va prendre quelques minutes, vous pouvez le suivre avec les commandes suivante :</p>
<ul>
<li>Obtention de l'état du pod <code>kubectl describe pod vuepress-test</code></li>
<li>Vérification de déploiement <code>kubectl get deployments</code></li>
<li>Vérification des pod(s) qui tourn(ent) <code>kubectl get pods</code></li>
</ul>
<p>Pour la configuration des services et de l'ingress :</p>
<ul>
<li>Vérification de l'application : <code>kubectl get services</code></li>
<li>Vérification de leur application : <code>kubectl get ingress</code></li>
</ul>
<h3 id="tester" tabindex="-1"><a class="header-anchor" href="#tester" aria-hidden="true">#</a> Tester</h3>
<p>Votre application est maintenant disponible, si vous vous souvenez quand nous avons créé le cluster nous avons indiqué un port pour le load balancer. Si vous n'avez rien changé, c'est le <code>8080</code>. Rendez-vous à <code>IP.DE.VOTRE.SERVEUR:8080</code> pour voir votre déploiement.</p>
<p>Je vous laisse regarder à nouveau :</p>
<ul>
<li>Le <code>docker ps</code>.</li>
<li>Le <code>kubectl get pods</code>.</li>
</ul>
<h2 id="deployer-une-mise-a-jour" tabindex="-1"><a class="header-anchor" href="#deployer-une-mise-a-jour" aria-hidden="true">#</a> Déployer une mise à jour</h2>
<p>Déployer une nouvelle version va être beaucoup plus simple <strong>(c'est la force de toute cette construction)</strong>. Je vous laisse procéder :</p>
<ul>
<li>Modifier le code (page, thème, etc).</li>
<li>Créer un commit et pusher la modification.</li>
<li>Attendez que la nouvelle version de votre application soit dans le registry gitlab.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">À votre avis</p>
<p>Selon vous, comment allons-nous déployer une nouvelle version de votre application dans le cluster ?</p>
<ul>
<li>Quel fichier allons-nous modifier ?</li>
<li>Quelle commande allons-nous faire pour déployer une nouvelle version ?</li>
</ul>
</div>
<h3 id="modifier-le-deployment-yml" tabindex="-1"><a class="header-anchor" href="#modifier-le-deployment-yml" aria-hidden="true">#</a> Modifier le deployment.yml</h3>
<p>Déployer une nouvelle version de notre application va être très très simple. Maintenant que nous avons une nouvelle version de notre application dans le registry, il suffit de :</p>
<ul>
<li>Modifier l'image dans le fichier <code>deployment.yml</code>
<ul>
<li>Dans mon cas<code>image: registry.gitlab.com/vbrosseau/vuepress-kubernetes-deploy:LE_NOUVEAU_HASH</code></li>
</ul>
</li>
<li>Appliquer la nouvelle configuration sur le Cluster <code>kubectl apply -f deployment.yaml</code></li>
</ul>
<p>Et c'est tout ! Patientez une ou deux minutes votre modification est en ligne !</p>
<h2 id="la-suite" tabindex="-1"><a class="header-anchor" href="#la-suite" aria-hidden="true">#</a> La suite ?</h2>
<p>Je pense que vous avez compris la suite ? C'est simple de redéployer, tellement simple que l'automatiser va être également très simple!</p>
<p>La suite de cette introduction ça va être le déploiement automatisé en cas de mise à jour du projet. <RouterLink to="/tp/ci/kubernetes/cd-avec-kubernetes.html">La suite c'est par ici =&gt;</RouterLink></p>
<p>PS: Ne vous inquiétez pas… Vous avez clairement fait le plus difficile.</p>
<h2 id="l-usage-en-plus" tabindex="-1"><a class="header-anchor" href="#l-usage-en-plus" aria-hidden="true">#</a> L'usage en plus</h2>
<p>Nous avons couvert un usage de base dans les premières étapes… C'est bien ! Mais nous pouvons aller plus loin pour utiliser toute la puissance de Kubernetes.</p>
<h3 id="gestion-multi-paths" tabindex="-1"><a class="header-anchor" href="#gestion-multi-paths" aria-hidden="true">#</a> Gestion multi paths</h3>
<p>Exemple, si vous souhaitez exposer <strong>dans le même cluster</strong> deux applications différentes, il est possible de spécifier un path pour chaque application. Voici un exemple des deux définitions.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> vitejs<span class="token punctuation">-</span>sample
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">traefik.ingress.kubernetes.io/rewrite-target</span><span class="token punctuation">:</span> /
    <span class="token key atrule">ingress.kubernetes.io/ssl-redirect</span><span class="token punctuation">:</span> <span class="token string">"false"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">http</span><span class="token punctuation">:</span>
        <span class="token key atrule">paths</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
            <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
            <span class="token key atrule">backend</span><span class="token punctuation">:</span>
              <span class="token key atrule">service</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> vitejs<span class="token punctuation">-</span>sample
                <span class="token key atrule">port</span><span class="token punctuation">:</span>
                  <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> api<span class="token punctuation">-</span>sample
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">traefik.ingress.kubernetes.io/rewrite-target</span><span class="token punctuation">:</span> /
    <span class="token key atrule">ingress.kubernetes.io/ssl-redirect</span><span class="token punctuation">:</span> <span class="token string">"false"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">http</span><span class="token punctuation">:</span>
        <span class="token key atrule">paths</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /api
            <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
            <span class="token key atrule">backend</span><span class="token punctuation">:</span>
              <span class="token key atrule">service</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> api<span class="token punctuation">-</span>sample
                <span class="token key atrule">port</span><span class="token punctuation">:</span>
                  <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Évidemment il s'agit d'un exemple</p>
<p>J'ai résumé ici la partie ingress seulement et avec des noms fictifs. Les éléments importants dans l'extrait précédent sont :</p>
<ul>
<li><code>traefik.ingress.kubernetes.io/rewrite-target: /</code>, ce paramètre permet de masquer au pod (container), que celui-ci est exposé sur un chemin différent que celui prévu.</li>
<li><code>- path: /api</code> spécifie le path « personnalisé » associé au service</li>
</ul>
</div>
<p>C'est évidemment un exemple à adapter. Je vous conseille autant que possible de passer par un multidomaine si possible.</p>
<h3 id="gestion-multidomaine" tabindex="-1"><a class="header-anchor" href="#gestion-multidomaine" aria-hidden="true">#</a> Gestion multidomaine</h3>
<p>Dans l'exemple précédent, nous avons déployé une seule application dans notre cluster ; même si d'un point segmentation c'est plus propre, dans les faits il est complètement possible de déployer plusieurs « applications » différentes dans un même cluster. C'est d'ailleurs le cas si votre application possède plusieurs services (API, Web et Base de données par exemple).</p>
<p>L'idée ici, c'est d'indiquer comment le trafic doit être routé vers les containers. Cette configuration est spécifiée dans les fichiers <code>ingress.yaml</code> de vos différentes applications.</p>
<p>Par exemple, si je souhaite :</p>
<p><img src="@source/tp/ci/kubernetes/res/cluster-multi.png" alt="Cluster multi"></p>
<p>Je vais devoir indiquer dans mon YAML de configuration :</p>
<h4 id="ingress-yaml-vuepress-test" tabindex="-1"><a class="header-anchor" href="#ingress-yaml-vuepress-test" aria-hidden="true">#</a> <code>ingress.yaml</code> vuepress-test</h4>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">ingress.kubernetes.io/ssl-redirect</span><span class="token punctuation">:</span> <span class="token string">"false"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> press.domain.tld
      <span class="token key atrule">http</span><span class="token punctuation">:</span>
        <span class="token key atrule">paths</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
            <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
            <span class="token key atrule">backend</span><span class="token punctuation">:</span>
              <span class="token key atrule">service</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
                <span class="token key atrule">port</span><span class="token punctuation">:</span>
                  <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h4 id="ingress-yaml-vitejs-sample" tabindex="-1"><a class="header-anchor" href="#ingress-yaml-vitejs-sample" aria-hidden="true">#</a> <code>ingress.yaml</code> vitejs-sample</h4>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> vitejs<span class="token punctuation">-</span>sample
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">ingress.kubernetes.io/ssl-redirect</span><span class="token punctuation">:</span> <span class="token string">"false"</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">http</span><span class="token punctuation">:</span>
        <span class="token key atrule">paths</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
            <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
            <span class="token key atrule">backend</span><span class="token punctuation">:</span>
              <span class="token key atrule">service</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> vitejs<span class="token punctuation">-</span>sample
                <span class="token key atrule">port</span><span class="token punctuation">:</span>
                  <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Ce qui donnera après application de la configuration :</p>
<p><img src="@source/tp/ci/kubernetes/res/ingress-multi.png" alt="Ingress multi result"></p>
<div class="custom-container tip"><p class="custom-container-title">Vous souhaitez tester ?</p>
<p>Cet usage est un peu plus compliqué à mettre en place, mais c'est clairement possible. Si vous souhaitez tester, appelez-moi !</p>
<p>PS: Nous allons devoir jouer avec votre fichier <code>hosts</code> si vous n'avez pas de nom de domaine. Mais vous allez voir c'est marrant.</p>
</div>
<h3 id="creer-un-pod-mariadb-utilisant-un-volume-persistant" tabindex="-1"><a class="header-anchor" href="#creer-un-pod-mariadb-utilisant-un-volume-persistant" aria-hidden="true">#</a> Créer un pod MariaDB utilisant un volume (persistant)</h3>
<p>Les Pods que nous avons créés précédemment ne sauvegardai pas de données lors de leur exécution, si vous souhaitez sauvegarder des données et les rendre persistantes il faut créer un Volume (comme avec Docker). L'approche est relativement similaire, mais… avec beaucoup de YAML… Énormément de YAML.</p>
<p>Mais si vous voulez une base de travail, voilà un exemple de serveur MySQL utilisant un volume persistant pour sauvegarder les données de la base de données.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>volume
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> local
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> manual
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"/mnt/data"</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>claim
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> manual
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> mariadb
          <span class="token key atrule">name</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"VOTRE_MOT_DE_PASSE"</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">"1"</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">"512Mi"</span>
            <span class="token key atrule">requests</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">"500m"</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">"256Mi"</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql<span class="token punctuation">-</span>persistent<span class="token punctuation">-</span>storage
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
              <span class="token key atrule">subPath</span><span class="token punctuation">:</span> mysql
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql<span class="token punctuation">-</span>persistent<span class="token punctuation">-</span>storage
          <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
            <span class="token key atrule">claimName</span><span class="token punctuation">:</span> fa<span class="token punctuation">-</span>mysql<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>claim
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br></div></div><h3 id="acceder-a-un-port-sans-le-rendre-public" tabindex="-1"><a class="header-anchor" href="#acceder-a-un-port-sans-le-rendre-public" aria-hidden="true">#</a> Accéder à un port sans le rendre public</h3>
<p>Si vous avez créé le serveur MySQL du point précédent, vous souhaitez peut-être maintenant y accèder pour faire par exemple… des requêtes SQL ! Utiliser Kubernetes même en temps que débutant ne veux pas dire configurer n'importe comment votre serveur, si vous avez un service « non public », mais que vous souhaitez quand même y accéder dans le cadre du test ou de la maintenance vous pouvez utiliser :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl port-forward mariadb-75f59d57f4-4nd6q <span class="token number">3306</span>:3306
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette commande aura pour but de rendre accessible le port <code>3306</code> de la machine distante sur votre machine <strong>et seulement sur votre machine</strong>.</p>
</template>
