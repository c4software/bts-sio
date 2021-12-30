<template><h1 id="livraison-continue-gitlab-ci-kubernetes" tabindex="-1"><a class="header-anchor" href="#livraison-continue-gitlab-ci-kubernetes" aria-hidden="true">#</a> Livraison continue, Gitlab-CI + Kubernetes</h1>
<p><RouterLink to="/tp/ci/kubernetes/deploy-container-in-kubernetes.html">Dans le précédent TP</RouterLink> nous avons vu que nous pouvions déployer une image Docker produite par Gitlab-CI « directement » dans un cluster Kubernetes. Dans ce TP nous allons voir comment il est possible d'automatiser ce (re)déploiement.</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#le-retour-de-la-question-«-on-commit-la-configuration-»">Le retour de la question « On commit la configuration ? »</RouterLink></li><li><RouterLink to="#mise-en-place-du-ci-cd">Mise en place du CI/CD</RouterLink></li><li><RouterLink to="#authentification-aka-comment-se-connecter-a-votre-serveur-depuis-la-ci">Authentification (aka comment se connecter à votre serveur depuis la CI)</RouterLink><ul><li><RouterLink to="#creation-de-la-variable">Création de la variable</RouterLink></li></ul></li><li><RouterLink to="#configuration-et-variable-dans-la-ci">Configuration et variable dans la CI</RouterLink><ul><li><RouterLink to="#modifier-le-deployment-yaml">Modifier le deployment.yaml</RouterLink></li></ul></li><li><RouterLink to="#_3-etapes">3 étapes</RouterLink><ul><li><RouterLink to="#la-commande-sed">La commande sed</RouterLink></li><li><RouterLink to="#determiner-les-actions-de-deploiement">Déterminer les actions de déploiement</RouterLink></li><li><RouterLink to="#solution-alternative">Solution alternative</RouterLink></li></ul></li><li><RouterLink to="#un-resultat-possible">Un résultat possible</RouterLink></li><li><RouterLink to="#image-multi-architectures">Image multi-architectures ?</RouterLink></li><li><RouterLink to="#deployer-dans-un-cluster-«-prives-»">Déployer dans un cluster « privés »</RouterLink></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Vous avez remarqué dans <RouterLink to="/tp/ci/kubernetes/deploy-container-in-kubernetes.html">le TP d'initiation à Kubernetes</RouterLink> qu'après la construction du cluster, les déploiements <strong>étaient très simple</strong> et que finalement il se résume à :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply -f deployment.yaml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Nous allons voir que finalement le mettre dans d'un flow de CI/CD ça ne sera finalement pas si compliqué.</p>
<div class="custom-container warning"><p class="custom-container-title">Auto devops ?</p>
<p>Quand on débute, l'option auto devops de Gitlab est tentante. Elle est en effet très intéressante, car elle est plutôt clef en main… <strong>cependant</strong>, je pense que pour un débutant c'est encore plus intéressant de comprendre comment ça fonctionne réellement.</p>
<p>D'autant plus que vous allez le voir, pour un cas simple comme celui que nous avons construit la configuration à mettre est vraiment <strong>très minimaliste</strong>.</p>
</div>
<h2 id="le-retour-de-la-question-«-on-commit-la-configuration-»" tabindex="-1"><a class="header-anchor" href="#le-retour-de-la-question-«-on-commit-la-configuration-»" aria-hidden="true">#</a> Le retour de la question « On commit la configuration ? »</h2>
<p>Gros débat… Dans un projet privé pas de problème, cette configuration peut accompagner le projet… dans le cas d'un projet « public » attention à ne pas commiter un YAML qui ferait référence à des informations privées / non destinée aux publiques (IP, port, …)</p>
<p>Nous sommes dans le cadre d'un projet privé, nous allons commiter la configuration d'autant plus qu'il ne s'agira que des fichiers suivants :</p>
<ul>
<li><code>deployment.yaml</code></li>
<li><code>services.yaml</code></li>
<li><code>ingress.yaml</code></li>
</ul>
<p>Un projet nommé <code>helm</code> existe également pour automatiser cette partie. Nous pourrions l'utiliser, mais mon objectif est de rester très simple dans l'approche.</p>
<div class="custom-container tip"><p class="custom-container-title">c'est à vous !</p>
<p>Je vous laisse commiter la configuration dans un dossier <code>kubernetes</code> (par exemple) <strong>dans le dossier docs</strong>.</p>
<p>Dans mon cas ça donne :</p>
<p><img src="@source/tp/ci/kubernetes/res/project_structure.png" alt="structure"></p>
</div>
<div class="custom-container danger"><p class="custom-container-title">ATTENTION PAS DE SECRET !</p>
<p>Vous noterez que je ne commit pas la partie contenant les secrets. En effet celle-ci sera présente dans notre projet évidemment ! Mais elle prendra la forme <strong>d'une variable de type file secrète</strong> dans la partie configuration de votre projet gitlab.</p>
</div>
<h2 id="mise-en-place-du-ci-cd" tabindex="-1"><a class="header-anchor" href="#mise-en-place-du-ci-cd" aria-hidden="true">#</a> Mise en place du CI/CD</h2>
<p>Dans le TP précédent nous avons déjà initialisé dans notre projet la partie CI, en effet l'image du projet est construite automatiquement, cette image est sauvegardée automatiquement dans le Registry Docker interne à Gitlab. Nous allons nous concentrer sur la partie qui nous intéresse à savoir :</p>
<ul>
<li>Quel(s) opération(s) nous devons faire lors de la mise à jour de notre Cluster ?</li>
<li>Quel(s) information(s) nous avons besoin pour échanger avec notre cluster (authentification, secret, registry, …) ?</li>
<li>Quel(s) commande(s) nous devons utiliser pour déployer notre application ?</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">C'est à vous</p>
<p>Cette étape est importante dans le cadre de la mise en place d'un déploiement continue. En effet, le déploiement continu est « juste » une automatisation des actions de livraison. Si vous savez comment livrer, vous saurez comment livrer en continu.</p>
<p>Avant de continuer… Je vous laisse donc réfléchir ! Je vous attends pour échanger sur votre réflexion.</p>
</div>
<div class="custom-container danger"><p class="custom-container-title">Une note importante</p>
<p>Dans notre <code>CI/CD</code>, et plus particulièrement dans la partie <code>CD</code> il s'agit que de la partie déploiement / livraison. <strong>Nous partons du principe</strong> que le cluster est déjà en place et déjà fonctionnel, pour éviter de surcharger notre flow de CD.</p>
<p>Donc normalement :</p>
<ul>
<li>Votre cluster existe et est fonctionnel.</li>
<li>Votre cluster est capable de dialoguer avec votre Registry. (à discuter ensemble)</li>
<li>Il possède déjà une version de votre application complètement fonctionnelle.</li>
</ul>
</div>
<h2 id="authentification-aka-comment-se-connecter-a-votre-serveur-depuis-la-ci" tabindex="-1"><a class="header-anchor" href="#authentification-aka-comment-se-connecter-a-votre-serveur-depuis-la-ci" aria-hidden="true">#</a> Authentification (aka comment se connecter à votre serveur depuis la CI)</h2>
<p>Nous l'avons vu dens le point précédent, la première étape est d'autoriser le dialogue entre Gitlab et votre Cluster Kubernetes.</p>
<p>Dans le précédent TP nous avons vu que l'authentification était réaliser via un fichier <code>yaml</code> obtenu depuis le serveur qui contient le cluster. Nous devrons donc procéder de la même façon depuis GITLAB, le problème est que je vous ai dit que ce fichier <strong>devait rester privé</strong> vous ne devez jamais le commiter dans votre projet.</p>
<p>Les développeurs (Open-Source) de Gitlab ont pensé à tout. Vous avez dans les paramètres de votre projet la possibilité de mettre des variables, ces variables peuvent-être de deux types :</p>
<ul>
<li><code>string</code>, pour une variable simple type token, configuration, etc (Ex <code>$SERVER=&quot;https://url-de-staging.devotreprojet.fr&quot;</code>)</li>
<li><code>file</code>, représente le contenu de votre fichier, lors de l'étape de CI/CD Gitlab va créer un fichier avec le contenu et déclarera une variable avec comme contenu le chemin vers le fichier en question. (Ex. <code>$KUBECONFIG=&quot;/private/mon_fichier_yaml_RANDOMID.yml&quot;</code>)</li>
</ul>
<p>La force des variables c'est qu'en plus d'être souple (de par le type) elles sont également (re)définissables en fonction de l'environnement. Pratique !</p>
<p>Pour configurer une variable, rendez-vous dans &quot;Settings &gt; CICD&quot; puis &quot;Variables&quot;.</p>
<p><img src="@source/tp/ci/kubernetes/res/settings_cicd.png" alt="Settings CI/CD"></p>
<p>Puis</p>
<p><img src="@source/tp/ci/kubernetes/res/settings_cicd_variables.png" alt="Variables CI/CD"></p>
<h3 id="creation-de-la-variable" tabindex="-1"><a class="header-anchor" href="#creation-de-la-variable" aria-hidden="true">#</a> Création de la variable</h3>
<p>Nous allons créer une variable de type <code>file</code> avec comme nom la variable attendue par <code>kubectl</code> à savoir <code>KUBECONFIG</code> :</p>
<p><img src="@source/tp/ci/kubernetes/res/create_variable.png" alt="Création de variables"></p>
<p>Pour le contenu, je vous laisse prendre le contenu du fichier <code>YAML</code> (celui qui contient les secrets) sous <strong>mac</strong> c'est aussi simple que <code>cat $KUBECONFIG | pbcopy -</code>.</p>
<p><img src="@source/tp/ci/kubernetes/res/variable_created.png" alt="Variable créée"></p>
<div class="custom-container tip"><p class="custom-container-title">Et c'est tout !</p>
<p>Cette étape de création de variables est l'équivalent du <code>export KUBECONFIG=&quot;emplacement/de/votre/vosSecret.yaml&quot;</code>. Ça veut dire que dans notre flow de CI/CD nous n'aurons rien de spécial à faire. En effet, comme précisé la variable de type <code>file</code> expose une variable avec l'emplacement du fichier.</p>
</div>
<h2 id="configuration-et-variable-dans-la-ci" tabindex="-1"><a class="header-anchor" href="#configuration-et-variable-dans-la-ci" aria-hidden="true">#</a> Configuration et variable dans la CI</h2>
<p>Notre authentification est maintenant effective, Gitlab-CI est maintenant capable de dialoguer avec notre Cluster Kubernetes. L'étape suivante est la personnalisation du YAML, pourquoi ? En effet, si vous vous souvenez du précédent TP, nous devions indiquer manuellement l'identifiant de l'image à déployer. Exemple :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># …</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress<span class="token punctuation">-</span>test
      <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.gitlab.com/vbrosseau/vuepress<span class="token punctuation">-</span>kubernetes<span class="token punctuation">-</span>deploy<span class="token punctuation">:</span>bb2d2d0b <span class="token comment"># &lt;- Identifiant du build à déployer</span>
<span class="token comment"># …</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Nous devons donc trouver un moyen de le changer <strong>à chaque build</strong> (c'est à dire commit donc). Gitlab-CI intègre un système de variable automatique avec plein d'informations relatives au contexte de votre Build (<a href="https://docs.gitlab.com/ee/ci/variables/predefined_variables.html" target="_blank" rel="noopener noreferrer">Plus d'informations<ExternalLinkIcon/></a>). Dans cette énorme liste de variable, nous avons une variable qui va nous intéresser plus particulièrement <code>$CI_COMMIT_SHORT_SHA</code>. En effet si vous vous souvenez de votre fichier gitlab-ci c'est la variable que nous avons utilisée par tagguer l'image dans le Registry Gitlab.</p>
<p>Mais nous allons avoir un problème… En effet les fichiers <code>YAML</code> n'acceptent pas les variables comme un simple script shell, nous allons devoir jouer d'une petite astuce pour pouvoir le changer dynamiquement.</p>
<div class="custom-container danger"><p class="custom-container-title">Helm</p>
<p>L'autre solution serait d'utiliser <code>Helm</code>, en effet <code>Helm</code> permet de gérer ce genre de chose. <strong>Cependant</strong>, ici nous allons faire simple. Nous allons utiliser <code>sed</code>, ça sera suffisant pour faire notre livraison continue minimaliste.</p>
</div>
<h3 id="modifier-le-deployment-yaml" tabindex="-1"><a class="header-anchor" href="#modifier-le-deployment-yaml" aria-hidden="true">#</a> Modifier le <code>deployment.yaml</code></h3>
<p>Parlons de l'outil <code>sed</code>, <code>sed</code> (éditeur de flux) est un programme permettant d'appliquer différentes transformations prédéfinies à un flux séquentiel de données textuelles. Concrètement, <code>sed</code> lit des données d'entrée ligne par ligne, modifie chaque ligne selon des règles spécifiées. Nous allons donc nous en servir pour modifier le fichier <code>deployment.yml</code> « à la volée » autrement dit, au moment où nous allons vouloir déployer.</p>
<p>Dans mon cas, j'ai décidé de modifier mon fichier <code>deployment.yml</code> pour retirer <strong>l'identifiant</strong> du build (hash) pour y mettre un texte que je vais remplacer via <code>sed</code>.</p>
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
          <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.gitlab.com/VALEUR<span class="token punctuation">-</span>D<span class="token punctuation">-</span>AVANT/LE<span class="token punctuation">-</span>LIEN<span class="token punctuation">-</span>QUE<span class="token punctuation">-</span>VOUS<span class="token punctuation">-</span>AVIEZ<span class="token punctuation">-</span>AVANT<span class="token punctuation">:</span><span class="token punctuation">{</span><span class="token punctuation">{</span>CI_COMMIT_SHORT_SHA<span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">imagePullSecrets</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> gitlab<span class="token punctuation">-</span>registry
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>Nous avons donc maintenant un fichier YAML presque dynamique… En effet celui-ci contient maintenant une valeur (<code>{{CI_COMMIT_SHORT_SHA}}</code>) que nous allons remplacer via <code>sed</code> directement à chaque exécution de la step sur Gitlab-CI.</p>
<div class="custom-container tip"><p class="custom-container-title">C'est à vous</p>
<p>Je vous laisse modifier votre fichier en fonction de votre cas.</p>
</div>
<h2 id="_3-etapes" tabindex="-1"><a class="header-anchor" href="#_3-etapes" aria-hidden="true">#</a> 3 étapes</h2>
<div class="custom-container tip"><p class="custom-container-title">Ce n'est que de l'automatisation</p>
<p>Je me répète, mais c'est important à comprendre ! Le livraison continue n'est vraiment pas un système magique, il s'agit seulement d'automatiser les actions que <strong>vous</strong> faites habituellement pour livrer votre application. Rien de plus rien de moins</p>
</div>
<h3 id="la-commande-sed" tabindex="-1"><a class="header-anchor" href="#la-commande-sed" aria-hidden="true">#</a> La commande sed</h3>
<p>L'idée va être la suivante : « utiliser <code>sed</code> pour lui faire remplacer <code>{{CI_COMMIT_SHORT_SHA}}</code> par la valeur de <code>$CI_COMMIT_SHORT_SHA</code>. Pour ça nous pouvons utiliser <code>sed</code> de la façon suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> ./kubernetes/deployment.yaml <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">"s/{{CI_COMMIT_SHORT_SHA}}/<span class="token variable">$CI_COMMIT_SHORT_SHA</span>/g"</span> <span class="token operator">|</span> kubectl apply -f -
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette commande va prendre le fichier de déploiement « type », remplacer</p>
<h3 id="determiner-les-actions-de-deploiement" tabindex="-1"><a class="header-anchor" href="#determiner-les-actions-de-deploiement" aria-hidden="true">#</a> Déterminer les actions de déploiement</h3>
<p>Maintenant que nous savons comment rendre dynamique notre déploiement, il faut maintenant assembler les commandes nécéssaire au bon déploiement de notre application. Nous avons déterminé ensemble que lors du déploiement nous faisions :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> ./kubernetes/deployment.yaml <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">"s/{{CI_COMMIT_SHORT_SHA}}/<span class="token variable">$CI_COMMIT_SHORT_SHA</span>/g"</span> <span class="token operator">|</span> kubectl apply -f -
kubectl apply -f ./kubernetes/services.yaml
kubectl apply -f ./kubernetes/ingress.yaml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Comme pour l'étape de compilation, et de <code>dockerise</code>, nous allons utiliser un step Gitlab-CI. Cette étape aura besoin de la commande <code>kubectl</code>, je vous laisse chercher un peu, mais moi dans mon cas j'ai utilisé l'image <code>bitnami/kubectl:latest</code> qui dispose de l'ensemble des commandes dont j'ai besoin.</p>
<details class="custom-container details"><summary>Vous séchez ? Vous souhaitez de l'aide ?</summary>
<p>Avez-vous vraiment cherchez ? Si oui… Voilà <strong>ma solution</strong> à <strong>ma problématique</strong> :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Nécessite une variable nommée KUBECONFIG de type file avec le contenu de votre « secret » Kubernetes (kubeconfig-monCluster.yaml)</span>
<span class="token comment"># Sous Mac le contenu peut-être obtenu via cat $KUBECONFIG | pbcopy -</span>
<span class="token comment"># Sous Linux le contenu peut-être obtenu via cat $KUBECONFIG | xclip -selection clipboard</span>
<span class="token key atrule">publish_to_prod</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> bitnami/kubectl<span class="token punctuation">:</span>latest
    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> publish
  <span class="token key atrule">dependencies</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> dockerise
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> cat ./kubernetes/deployment.yaml <span class="token punctuation">|</span> sed "s/<span class="token punctuation">{</span><span class="token punctuation">{</span>CI_COMMIT_SHORT_SHA<span class="token punctuation">}</span><span class="token punctuation">}</span>/$CI_COMMIT_SHORT_SHA/g" <span class="token punctuation">|</span> kubectl apply <span class="token punctuation">-</span>f <span class="token punctuation">-</span>
    <span class="token punctuation">-</span> kubectl apply <span class="token punctuation">-</span>f ./kubernetes/services.yaml
    <span class="token punctuation">-</span> kubectl apply <span class="token punctuation">-</span>f ./kubernetes/ingress.yaml
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></details>
<h3 id="solution-alternative" tabindex="-1"><a class="header-anchor" href="#solution-alternative" aria-hidden="true">#</a> Solution alternative</h3>
<p>L'autre solution (merci <a href="https://kevin.riou.pro/" target="_blank" rel="noopener noreferrer">Kevin RIOU<ExternalLinkIcon/></a>), est d'utiliser la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl <span class="token builtin class-name">set</span> image deployment/vuepress-test vuepress-test<span class="token operator">=</span>registry.gitlab.com/vbrosseau/vuepress-kubernetes-deploy:<span class="token variable">$CI_COMMIT_SHORT_SHA</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Celle-ci va remplacer l'image lors du (re)déploiement avec celle que nous avons actuellement buildé.</p>
<p>Cette solution est préférable à celle du <code>sed</code> car elle permet d'avoir une configuration toujours fonctionnelle dans notre fichier <code>yaml</code>.</p>
<h2 id="un-resultat-possible" tabindex="-1"><a class="header-anchor" href="#un-resultat-possible" aria-hidden="true">#</a> Un résultat possible</h2>
<p>Voilà l'un des résultats possibles, exemple de configuration Pages + Docker + Kubernetes</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">stages</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> build
  <span class="token punctuation">-</span> deploy
  <span class="token punctuation">-</span> publish

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

<span class="token key atrule">dockerise</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> docker<span class="token punctuation">:</span>19.03.12
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy
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

<span class="token comment"># Nécessite une variable nommée KUBECONFIG de type file avec le contenu de votre « secret » Kubernetes (kubeconfig-monCluster.yaml)</span>
<span class="token comment"># Sous Mac le contenu peut-être obtenu via cat $KUBECONFIG | pbcopy -</span>
<span class="token comment"># Sous Linux le contenu peut-être obtenu via cat $KUBECONFIG | xclip -selection clipboard</span>
<span class="token key atrule">publish_to_prod</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> bitnami/kubectl<span class="token punctuation">:</span>latest
    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> publish
  <span class="token key atrule">dependencies</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> dockerise
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token comment"># Décommenter pour autoriser le kubernetes à s'authentifier pour pull l'image docker</span>
    <span class="token comment"># - kubectl create secret docker-registry gitlab-registry --docker-server="$CI_REGISTRY" --docker-username="$CI_DEPLOY_USER" --docker-password="$CI_DEPLOY_PASSWORD" --docker-email="$GITLAB_USER_EMAIL" -o yaml --dry-run=client | kubectl apply -f -</span>
    <span class="token punctuation">-</span> cat ./kubernetes/deployment.yaml <span class="token punctuation">|</span> sed "s/<span class="token punctuation">{</span><span class="token punctuation">{</span>CI_COMMIT_SHORT_SHA<span class="token punctuation">}</span><span class="token punctuation">}</span>/$CI_COMMIT_SHORT_SHA/g" <span class="token punctuation">|</span> kubectl apply <span class="token punctuation">-</span>f <span class="token punctuation">-</span>
    <span class="token punctuation">-</span> kubectl apply <span class="token punctuation">-</span>f ./kubernetes/services.yaml
    <span class="token punctuation">-</span> kubectl apply <span class="token punctuation">-</span>f ./kubernetes/ingress.yaml
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><h2 id="image-multi-architectures" tabindex="-1"><a class="header-anchor" href="#image-multi-architectures" aria-hidden="true">#</a> Image multi-architectures ?</h2>
<p>Vous souhaitez créer une image qui fonctionnera sur un Raspberry Pi, mais également sur une machine X86? C'est possible, c'est ce que l'on appelle les « Multi-architectures. Nous sommes plus dans quelque chose d'aussi simple qu'avec l'exemple précédent, mais vous pouvez le faire sans problème depuis Gitlab-CI ?</p>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="deployer-dans-un-cluster-«-prives-»" tabindex="-1"><a class="header-anchor" href="#deployer-dans-un-cluster-«-prives-»" aria-hidden="true">#</a> Déployer dans un cluster « privés »</h2>
<p>Nous avons vu avec les précédents exemples qu'il était relativement simple de déployer en continu un cluster Kubernetes du moment que celui-ci est accessible via Internet. C'est un peu plus compliqué quand il s'agit d'un cluster « interne » / « privé », non forcément exposé sur Internet.</p>
<p>Pour répondre à cette problématique, vous pouvez utiliser le système de <RouterLink to="/tp/ci/gitlab/runner.html">runner privé de Gitlab-CI</RouterLink>. Pourquoi à votre avis ?</p>
<ul>
<li>Pour terminer ce TP, je vous propose de monter sur votre machine :
<ul>
<li>Un cluster Kubernetes</li>
<li>Un Runner Gitlab</li>
<li>Un déploiement continue depuis gitlab.com</li>
</ul>
</li>
</ul>
</template>
