<template><h1 id="packager-une-application-avec-docker" tabindex="-1"><a class="header-anchor" href="#packager-une-application-avec-docker" aria-hidden="true">#</a> Packager une application avec Docker</h1>
<p>Nous avons vu précédemment qu'il était possible de compiler, déployer, voire de créer un Artifact (livrable) avec l'intégration continue. Cependant nous pouvons aller bien plus loin, nous pouvons carrément créer un conteneur Docker directement depuis le CI.</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#objectif">Objectif</RouterLink></li><li><RouterLink to="#creer-un-projet-sur-gitlab">Créer un projet sur Gitlab</RouterLink><ul><li><RouterLink to="#ajouter-l-application-a-packager">Ajouter l&#39;application à packager</RouterLink></li><li><RouterLink to="#commiter-pusher-une-premiere-version">Commiter / pusher une première version</RouterLink></li></ul></li><li><RouterLink to="#ajouter-un-gitlab-ci-yml">Ajouter un gitlab-ci.yml</RouterLink><ul><li><RouterLink to="#tester">Tester</RouterLink></li><li><RouterLink to="#dockeriser">Dockeriser</RouterLink></li><li><RouterLink to="#packager">Packager</RouterLink></li></ul></li><li><RouterLink to="#tester-depuis-votre-poste-l-image-obtenue">Tester depuis votre poste l&#39;image obtenue</RouterLink><ul><li><RouterLink to="#vous-connecter">Vous connecter</RouterLink></li><li><RouterLink to="#lancer-votre-image">Lancer votre image</RouterLink></li></ul></li><li><RouterLink to="#apporter-des-modifications">Apporter des modifications</RouterLink></li><li><RouterLink to="#booster-les-performances">Booster les performances</RouterLink><ul><li><RouterLink to="#image-multi-architectures">Image multi-architectures ?</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="objectif" tabindex="-1"><a class="header-anchor" href="#objectif" aria-hidden="true">#</a> Objectif</h2>
<p>L'objectif de faire construire une image Docker directement depuis la CI est d'automatiser à 100% le processus de packaging de votre application. Plus d'humain == plus de risque.</p>
<div class="custom-container tip"><p class="custom-container-title">Plus de risque ?</p>
<p>Façon de parler évidemment… En sécurité l'humain est source de vulnérabilité « volontaire » et « involontaire ». En automatisant au maximum les opérations de packaging, nous pourrons par la même réduire les risques :</p>
<ul>
<li>D'erreurs.</li>
<li>De corruption du livrable.</li>
<li>de perte de temps.</li>
</ul>
</div>
<p>La finalité est donc de créer directement depuis le CI le livrable <strong>ici l'image Docker de notre application</strong>. Nous utiliserons Gitlab-ci, mais la même opération est possible maintenant avec <a href="https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages" target="_blank" rel="noopener noreferrer">Github<ExternalLinkIcon/></a>.</p>
<p>Avec Gitlab ce service s'appelle le <a href="https://docs.gitlab.com/ee/user/packages/container_registry/index.html" target="_blank" rel="noopener noreferrer">Gitlab Container Registry<ExternalLinkIcon/></a>, le service est gratuit et est <strong>intégré</strong> à Gitlab (quelle que soit la version que vous avez). <strong>Bonus</strong> vous avez un registry intégré à chaque projet 👍.</p>
<h2 id="creer-un-projet-sur-gitlab" tabindex="-1"><a class="header-anchor" href="#creer-un-projet-sur-gitlab" aria-hidden="true">#</a> Créer un projet sur Gitlab</h2>
<p>Pour l'instant pas de problème <a href="https://gitlab.com/projects/new" target="_blank" rel="noopener noreferrer">vous savez faire<ExternalLinkIcon/></a>. La première étape est de versionner votre projet sur Gitlab comme habituellement. Je vous laisse créer votre projet, le nom importe peu.</p>
<p><img src="@source/tp/ci/ressources/project_create.png" alt="Project creation"></p>
<h3 id="ajouter-l-application-a-packager" tabindex="-1"><a class="header-anchor" href="#ajouter-l-application-a-packager" aria-hidden="true">#</a> Ajouter l'application à packager</h3>
<p>Je vous propose que l'on package une application Web. Bien que l'on puisse packager ce que l'on souhaite (API, Application, Web), je pense que le web est le plus intéressant, car il possède des étapes « de compilation » en amont ; ces étapes peuvent prendre un peu de temps et sont très facilement automatisables.</p>
<p>Je vous propose de créer un site « fictif » avec ViteJS (VueJS 3), pour ça dans un terminal :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init @vitejs/app
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/ci/ressources/vite-init.png" alt="Vite Init"></p>
<p>Un projet vide vient d'être créé. Je vous laisse le tester dans un premier temps sur votre ordinateur, dans mon cas</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> ci-packaging
<span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> run dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>Je vous laisse vérifier que tout fonctionne comme attendu !</strong></p>
<div class="custom-container danger"><p class="custom-container-title">npm, yarn, pnpm ?</p>
<p>Personnellement j'utilise <code>pnpm</code>, pourquoi ? À cause du dépôt centralisé ; vous souhaitez en savoir plus ? Je suis là 👋</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">Vous souhaitez packager autres choses ?</p>
<p><strong>Aucun problème</strong> je peux vous aider à packager votre site / api / service.</p>
</div>
<h3 id="commiter-pusher-une-premiere-version" tabindex="-1"><a class="header-anchor" href="#commiter-pusher-une-premiere-version" aria-hidden="true">#</a> Commiter / pusher une première version</h3>
<p>Maintenant que tout fonctionne, nous allons créer une première version. Ici bien évidemment on utilise <code>git</code> (ça semble évident…).</p>
<h2 id="ajouter-un-gitlab-ci-yml" tabindex="-1"><a class="header-anchor" href="#ajouter-un-gitlab-ci-yml" aria-hidden="true">#</a> Ajouter un gitlab-ci.yml</h2>
<p>Pour activer Gitlab-CI, c'est aussi simple que d'ajouter un fichier (<code>.gitlab-ci.yml</code>), dans le code source de votre projet. Je vous laisse ajouter la configuration suivante.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>latest
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> npm install
    <span class="token punctuation">-</span> npm run build
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Comprendre le fonctionnement</p>
<p>Vous voyez ici que finalement l'important c'est de comprendre le fonctionnement pour l'adapteur à notre besoin. Dans le cadre du CI/CD, il faut souvent lire la documentation, adapter, réessayer, etc.</p>
<p>Mais une fois configuré… La vie sera belle et votre travail en grande partie automatisé.</p>
</div>
<h3 id="tester" tabindex="-1"><a class="header-anchor" href="#tester" aria-hidden="true">#</a> Tester</h3>
<p>Pour l'instant pas de création d'image Docker, nous allons-y aller étape par étape. La première ? Valider que l'installation des dépendances fonctionne sans problème sur Gitlab-CI.</p>
<p>Je vous laisse donc commiter <strong>et pusher</strong> votre code source.</p>
<p>Si tout se passe bien vous devez avoir :</p>
<p><img src="@source/tp/ci/ressources/build-ci.png" alt="Build CI"></p>
<h3 id="dockeriser" tabindex="-1"><a class="header-anchor" href="#dockeriser" aria-hidden="true">#</a> Dockeriser</h3>
<p>La première étape est de <code>Dockeriser</code> votre application actuelle. L'idée est donc de créer le fichier Dockerfile nécessaire au bon fonctionnement de votre site web. Je vous laisse réfléchir au besoin, mais pensez qu'ici nous avons un site <strong>static</strong> qui ne possède aucune dépendance ; vous pouvez donc rester très très simple !</p>
<p><a href="https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html" target="_blank" rel="noopener noreferrer">Vous n'avez pas d'inspiration ? Pas de problème, la documentation officielle nous aide<ExternalLinkIcon/></a></p>
<details class="custom-container details"><summary>Vous avez besoin d'aide ?</summary>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> nginx:stable-alpine</span>
<span class="token instruction"><span class="token keyword">COPY</span> dist /usr/share/nginx/html</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"nginx"</span>, <span class="token string">"-g"</span>, <span class="token string">"daemon off;"</span>]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></details>
<div class="custom-container danger"><p class="custom-container-title">STOP !</p>
<p>Avant de pusher votre code, tester sur votre ordinateur le bon fonctionnement !</p>
<p>Dans mon cas :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker build -t vue:test <span class="token builtin class-name">.</span>
docker run -it -p <span class="token number">8080</span>:80 --rm --name vuetest vue:test
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></div>
<h3 id="packager" tabindex="-1"><a class="header-anchor" href="#packager" aria-hidden="true">#</a> Packager</h3>
<p>Nous avons maintenant tout le nécessaire pour packager notre application directement sur Gitlab-CI et la publier sur le Registry interne à GitLab. Nous allons devoir modifier notre fichier <code>.gitlab-ci.yml</code> pour y ajouter une autre step, celle de « release » / « packaging » / « encapsulation ».</p>
<p>La conception de ce gitlab-ci, est un peu plus complexe, je vous propose de vous le donner pour que nous le décortiquer ensemble :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">stages</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> build
  <span class="token punctuation">-</span> release

<span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>latest
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> npm install
    <span class="token punctuation">-</span> npm run build
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> dist/
    <span class="token key atrule">expire_in</span><span class="token punctuation">:</span> 1 hour

<span class="token key atrule">release-img</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> docker<span class="token punctuation">:</span>19.03.12
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> release
  <span class="token key atrule">dependencies</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> build
  <span class="token key atrule">services</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> docker<span class="token punctuation">:</span>19.03.12<span class="token punctuation">-</span>dind
  <span class="token key atrule">variables</span><span class="token punctuation">:</span>
    <span class="token key atrule">IMAGE_TAG</span><span class="token punctuation">:</span> $CI_REGISTRY_IMAGE<span class="token punctuation">:</span>$CI_COMMIT_REF_SLUG
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> docker login <span class="token punctuation">-</span>u $CI_REGISTRY_USER <span class="token punctuation">-</span>p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    <span class="token punctuation">-</span> docker build <span class="token punctuation">-</span>t $IMAGE_TAG .
    <span class="token punctuation">-</span> docker push $IMAGE_TAG
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>Normalement si tout se passe bien vous devriez avoir …</p>
<p><img src="@source/tp/ci/ressources/docker_build_success.png" alt="Si tout se passe bien…"></p>
<p><img src="@source/tp/ci/ressources/docker_builded.png" alt="Si tout se passe bien…"></p>
<h2 id="tester-depuis-votre-poste-l-image-obtenue" tabindex="-1"><a class="header-anchor" href="#tester-depuis-votre-poste-l-image-obtenue" aria-hidden="true">#</a> Tester depuis votre poste l'image obtenue</h2>
<h3 id="vous-connecter" tabindex="-1"><a class="header-anchor" href="#vous-connecter" aria-hidden="true">#</a> Vous connecter</h3>
<p>Votre image est maintenant sauvegardée sur les serveurs de Gitlab, nous pouvons donc maintenant nous en servir sans la builder sur notre poste préalablement. Cependant ce « hub » n'est pas public comme l'officiel, il faudra donc se connecter préalablement / s'authentifier auprès des serveurs de Gitlab.</p>
<div class="custom-container danger"><p class="custom-container-title">STOP</p>
<p>Votre mot de passe ne fonctionnera pas ! Pour des raisons de sécurité vous ne pourrez pas utiliser votre propre mot de passe pour vous authentifiez. <a href="https://gitlab.com/-/profile/personal_access_tokens" target="_blank" rel="noopener noreferrer">Vous allez devoir générer un Token depuis votre profil<ExternalLinkIcon/></a></p>
<p><img src="@source/tp/ci/ressources/token.png" alt="Si tout se passe bien…"></p>
</div>
<p>Une fois le token généré il suffit de vous connecter au Registry via la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker login registry.gitlab.com
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="lancer-votre-image" tabindex="-1"><a class="header-anchor" href="#lancer-votre-image" aria-hidden="true">#</a> Lancer votre image</h3>
<p>Pour lancer votre image, rien de bien complexe ! Il suffit de spécifier le bon projet et le bon tag. Dans mon cas voilà à quoi ça ressemble :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run registry.gitlab.com/vbrosseau/ci-packaging:master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/ci/ressources/docker_run.png" alt="Docker RUN"></p>
<h2 id="apporter-des-modifications" tabindex="-1"><a class="header-anchor" href="#apporter-des-modifications" aria-hidden="true">#</a> Apporter des modifications</h2>
<p>Votre stack est maintenant prête, elle est jouable / rejouable à l'infinie. Je vous laisse apporter des modifications « importante » à votre site Internet pour tester que l'image Docker s'update correctement après vos commits.</p>
<h2 id="booster-les-performances" tabindex="-1"><a class="header-anchor" href="#booster-les-performances" aria-hidden="true">#</a> Booster les performances</h2>
<p>Votre compilation doit-être actuellement plutôt lente… C'est normal l'installation des dépendances prend un peu de temps. Dans gitlab-ci nous pouvons ajouter du cache, j'ai donné pas mal de pistes pour les autres étapes… Pour celle-ci je vous laisse chercher dans la documentation.</p>
<p><a href="https://docs.gitlab.com/ee/ci/caching/" target="_blank" rel="noopener noreferrer">Gestion du cache<ExternalLinkIcon/></a></p>
<h3 id="image-multi-architectures" tabindex="-1"><a class="header-anchor" href="#image-multi-architectures" aria-hidden="true">#</a> Image multi-architectures ?</h3>
<p>Vous souhaitez créer une image qui fonctionnera sur un Raspberry Pi, mais également sur une machine X86? C'est possible, c'est ce que l'on appel le « Multi-architectures. Nous sommes plus dans quelques choses d'aussi simple qu'avec l'exemple précédent, mais vous pouvez le faire sans problème depuis Gitlab-CI ?</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">dockerise</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> docker<span class="token punctuation">:</span>19.03.12
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy
  <span class="token key atrule">dependencies</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> build
  <span class="token key atrule">services</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> docker<span class="token punctuation">:</span>19.03.12<span class="token punctuation">-</span>dind
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"--experimental"</span><span class="token punctuation">]</span>
  <span class="token key atrule">variables</span><span class="token punctuation">:</span>
    <span class="token key atrule">IMAGE_TAG</span><span class="token punctuation">:</span> $CI_REGISTRY_IMAGE<span class="token punctuation">:</span>$CI_COMMIT_SHORT_SHA
    <span class="token key atrule">DOCKER_DRIVER</span><span class="token punctuation">:</span> overlay2
    <span class="token key atrule">DOCKER_TLS_CERTDIR</span><span class="token punctuation">:</span> <span class="token string">""</span>
    <span class="token key atrule">BUILDX_VERSION</span><span class="token punctuation">:</span> v0.4.1
  <span class="token key atrule">before_script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> apk add curl
    <span class="token punctuation">-</span> mkdir <span class="token punctuation">-</span>p ~/.docker/cli<span class="token punctuation">-</span>plugins
    <span class="token punctuation">-</span> curl <span class="token punctuation">-</span>sSLo ~/.docker/cli<span class="token punctuation">-</span>plugins/docker<span class="token punctuation">-</span>buildx https<span class="token punctuation">:</span>//github.com/docker/buildx/releases/download/$BUILDX_VERSION/buildx<span class="token punctuation">-</span>$BUILDX_VERSION.linux<span class="token punctuation">-</span>amd64
    <span class="token punctuation">-</span> chmod +x ~/.docker/cli<span class="token punctuation">-</span>plugins/docker<span class="token punctuation">-</span>buildx
    <span class="token punctuation">-</span> docker run <span class="token punctuation">-</span><span class="token punctuation">-</span>rm <span class="token punctuation">-</span><span class="token punctuation">-</span>privileged multiarch/qemu<span class="token punctuation">-</span>user<span class="token punctuation">-</span>static <span class="token punctuation">-</span><span class="token punctuation">-</span>reset <span class="token punctuation">-</span>p yes
    <span class="token punctuation">-</span> docker info
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> docker login <span class="token punctuation">-</span>u $CI_REGISTRY_USER <span class="token punctuation">-</span>p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    <span class="token punctuation">-</span> docker buildx create <span class="token punctuation">-</span><span class="token punctuation">-</span>use
    <span class="token punctuation">-</span> docker buildx build <span class="token punctuation">-</span><span class="token punctuation">-</span>push <span class="token punctuation">-</span><span class="token punctuation">-</span>platform linux/arm/v8<span class="token punctuation">,</span>linux/amd64 <span class="token punctuation">-</span>t $IMAGE_TAG .
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div></template>
