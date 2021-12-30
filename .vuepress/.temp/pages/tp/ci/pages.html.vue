<template><h1 id="utiliser-gitlab-pages" tabindex="-1"><a class="header-anchor" href="#utiliser-gitlab-pages" aria-hidden="true">#</a> Utiliser GitLab Pages</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce TP vous allez mettre en place grâce à Gitlab-CI un site web static hébergé par Gitlab Pages. Dans le TP d’introduction au travail collaboratif vous avez travaillé à plusieurs avec une visualisation quasi temps réel des modifications après les commits, c’était réalisé grâce à GitLab-CI et GitLab Pages. Avec un fichier et quelques configurations, vous allez être capable de réaliser la même chose dans vos projets.</p>
<h2 id="creation-d-un-nouveau-projet-sur-gitlab" tabindex="-1"><a class="header-anchor" href="#creation-d-un-nouveau-projet-sur-gitlab" aria-hidden="true">#</a> Création d’un nouveau projet sur Gitlab</h2>
<p>Pour commencer, créez <a href="https://gitlab.com/projects/new" target="_blank" rel="noopener noreferrer">un nouveau projet sur votre compte Gitlab<ExternalLinkIcon/></a>. Nommer le comme vous voulez, c’est votre projet après tout…</p>
<p>Voilà nous pouvons continuer</p>
<h2 id="creation-d-un-site-static" tabindex="-1"><a class="header-anchor" href="#creation-d-un-site-static" aria-hidden="true">#</a> Création d’un site static</h2>
<p>Créez rapidement sur votre machine un site static, une simple page web HTML est suffisante (vous pouvez également partir <a href="https://startbootstrap.com/?showPro=false&amp;showAngular=false" target="_blank" rel="noopener noreferrer">d’un template disponible ici<ExternalLinkIcon/></a>).</p>
<p>Une fois votre page prête, commitez et pushez votre travail sur GitLab (dans le projet que vous avez créé)</p>
<p>Rappel :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> -A
<span class="token function">git</span> commit -am <span class="token string">"Premier Commit"</span>
<span class="token function">git</span> push
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>⚠️ Pour pusher votre code il faut avoir ajouté la remote, pour ça vous pouvez suivre les instructions données par GitLab lors de la création du projet.</p>
<h2 id="activation-de-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#activation-de-gitlab-ci" aria-hidden="true">#</a> Activation de GitLab-CI</h2>
<p>Maintenant que votre première version est prête nous allons activer Gitlab-CI pour ça il faut <strong>simplement</strong> créer un fichier intitulé <code>.gitlab-ci.yml</code> à la racine de votre projet. Mettez-y le contenu suivant :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">pages</span><span class="token punctuation">:</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> mkdir .public
    <span class="token punctuation">-</span> cp <span class="token punctuation">-</span>r * .public
    <span class="token punctuation">-</span> mv .public public
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> public
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul>
<li>Regarder le contenu du fichier, étudier les différentes instructions.</li>
</ul>
<h2 id="push-de-votre-code" tabindex="-1"><a class="header-anchor" href="#push-de-votre-code" aria-hidden="true">#</a> Push de votre code</h2>
<p>Pushez votre code sur GitLab, votre projet va maintenant « se compiler » dans la partie CI. Attendez quelques secondes votre site web est maintenant en ligne.</p>
<h2 id="allez-plus-loin" tabindex="-1"><a class="header-anchor" href="#allez-plus-loin" aria-hidden="true">#</a> Allez plus loin</h2>
<p>Écrire du code c’est bien, mais le faire en automatique c’est mieux. C’est pour ça que GitLab-CI et GitLab Pages existent, écrire du HTML pour une page c’est possible, mais quand il s’agit d’un site entier, ce n’est pas forcément adapté. C’est pour ça que l’on utilise régulièrement des CMS (écrit en PHP, Python, Ruby, …), mais ce n’est pas la seule façon de faire.</p>
<p>On trouve aussi régulièrement des « générateurs de sites statiques », un générateur c’est un « logiciel » qui va « compiler » votre site pour générer toutes les pages de votre site web (sans avoir à tous les écrire).</p>
<p>Plusieurs avantages :</p>
<ul>
<li>Cout d’hébergement réduit (pas de PHP, juste du HTML).</li>
<li>Sauvegarde simple (c’est juste des fichiers).</li>
<li>Rapide ! (Oui, pas de PHP).</li>
</ul>
<p>Inconvénients :</p>
<ul>
<li>À votre avis ?</li>
</ul>
<h3 id="deployer-un-site-vuejs" tabindex="-1"><a class="header-anchor" href="#deployer-un-site-vuejs" aria-hidden="true">#</a> Déployer un site VueJS</h3>
<p>Nous l'avons vu avec Netlify déployer un site VueJS (ViteJS) est très simple. Le faire avec Gitlab-CI et Gitlab Pages est tout aussi simple ! Je vous laisse envoyer votre code source dans un nouveau projet <code>Gitlab</code>. Nous allons lui ajouter le fichier <code>gitlab-ci.yml</code> suivant :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">pages</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>latest
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> npm install
    <span class="token punctuation">-</span> npm run gitlab
    <span class="token punctuation">-</span> mv public public<span class="token punctuation">-</span>vue
    <span class="token punctuation">-</span> mv dist public
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> public
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="npm-run-gitlab" tabindex="-1"><a class="header-anchor" href="#npm-run-gitlab" aria-hidden="true">#</a> npm run gitlab ?</h4>
<p>Nous avons ici une petite specificitée, avec Gitlab Pages les fichiers sont distribués dans un sous dossier. Il faut donc indiquer à ViteJS que la base de notre projet ne sera pas à la racine mais dans un sous dossier.</p>
<p>Dans la documentation de ViteJS nous trouvons <a href="https://vitejs.dev/guide/build.html#public-base-path" target="_blank" rel="noopener noreferrer">donc la réponse ici<ExternalLinkIcon/></a></p>
<p>Je vous propose donc d'ajouter dans votre fichier <code>package.json</code> la configuration suivante dans la partie script :</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"gitlab"</span><span class="token operator">:</span> <span class="token string">"vite build --base=./"</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Comprendre le fonctionnement</p>
<p>Vous voyez ici que finalement l'important c'est de comprendre le fonctionnement pour l'adapteur à notre besoin. Dans le cadre du CI/CD, il faut souvent lire la documentation, adapter, réésayer, etc.</p>
<p>Mais une fois configuré… La vie sera belle et votre travail en grande partie automatisée.</p>
</div>
<h4 id="resultat" tabindex="-1"><a class="header-anchor" href="#resultat" aria-hidden="true">#</a> Résultat</h4>
<p><img src="@source/tp/ci/ressources/gitlabci-build.png" alt="Gitlab-ci"></p>
<p>Une fois compilé votre site est accessible <a href="https://vbrosseau.gitlab.io/vitejs-sample/" target="_blank" rel="noopener noreferrer">pour moi<ExternalLinkIcon/></a></p>
<h4 id="je-vous-laisse-modifier" tabindex="-1"><a class="header-anchor" href="#je-vous-laisse-modifier" aria-hidden="true">#</a> Je vous laisse modifier</h4>
<p>Je vous laisse modifier votre code source. Vous constaterez que comme Netlify votre site se met à jour automatiquement à chaque push.</p>
<h3 id="les-moteurs-de-site-static" tabindex="-1"><a class="header-anchor" href="#les-moteurs-de-site-static" aria-hidden="true">#</a> Les moteurs de site static</h3>
<p>Comme toujours, il y a plusieurs choix pour faire des sites statiques, voici 3 exemples :</p>
<ul>
<li><a href="https://jekyllrb.com/" target="_blank" rel="noopener noreferrer">Jekyll<ExternalLinkIcon/></a></li>
<li><a href="http://gohugo.io/" target="_blank" rel="noopener noreferrer">Hugo<ExternalLinkIcon/></a></li>
<li><a href="https://blog.getpelican.com/" target="_blank" rel="noopener noreferrer">Pelican<ExternalLinkIcon/></a></li>
</ul>
<h3 id="exemple-avec-hugo" tabindex="-1"><a class="header-anchor" href="#exemple-avec-hugo" aria-hidden="true">#</a> Exemple avec Hugo</h3>
<p>Téléchargez le projet suivant <a href="https://gitlab.com/pages/hugo" target="_blank" rel="noopener noreferrer">Exemple de site avec Hugo<ExternalLinkIcon/></a>, créez un nouveau projet dans votre compte GitLab et envoyez les sources.</p>
<ul>
<li>Regarder le contenu du <code>.gitlab-ci.yml</code> :</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># All available Hugo versions are listed here: https://gitlab.com/pages/hugo/container_registry</span>
<span class="token key atrule">image</span><span class="token punctuation">:</span> registry.gitlab.com/pages/hugo<span class="token punctuation">:</span>latest

<span class="token key atrule">variables</span><span class="token punctuation">:</span>
  <span class="token key atrule">GIT_SUBMODULE_STRATEGY</span><span class="token punctuation">:</span> recursive

<span class="token key atrule">test</span><span class="token punctuation">:</span>
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> hugo
  <span class="token key atrule">except</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master

<span class="token key atrule">pages</span><span class="token punctuation">:</span>
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> hugo
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> public
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>Celui-ci est très proche du nôtre, et c’est normal ! Avec Gitlab-CI c’est toujours très simple à mettre en place.</p>
<h3 id="exemple-avec-jekyll" tabindex="-1"><a class="header-anchor" href="#exemple-avec-jekyll" aria-hidden="true">#</a> Exemple avec Jekyll</h3>
<p>C’est à vous… Inspirez-vous <a href="https://docs.gitlab.com/ee/user/project/pages/getting_started/pages_from_scratch.html" target="_blank" rel="noopener noreferrer">du wiki de Gitlab<ExternalLinkIcon/></a> et <a href="https://docs.gitlab.com/ee/user/project/pages/getting_started/pages_ci_cd_template.html" target="_blank" rel="noopener noreferrer">des templates<ExternalLinkIcon/></a></p>
</template>
