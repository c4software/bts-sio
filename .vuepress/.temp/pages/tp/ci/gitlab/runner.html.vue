<template><h1 id="installation-configuration-d-un-runner" tabindex="-1"><a class="header-anchor" href="#installation-configuration-d-un-runner" aria-hidden="true">#</a> Installation &amp; Configuration d'un Runner</h1>
<p>Dans ce TP nous allons voir comment installer un Runner Gitlab-CI sur votre machine. Posséder un Runner Gitlab aura plusieurs avantages que nous détaillerons au fur et à mesure ensemble.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Nous avons vu que Gitlab-CI « offrait » des runners pour compiler / exécuter vos opérations de CI. Ces runners sont partagés avec l'ensemble des utilisateurs de la plateforme Gitlab. Même s’ils sont globalement très réactifs et très peu souvent en « panne », je vous propose ici d'installer votre (ou vos) propre(s) runner afin de maitriser entièrement votre processus de CI.</p>
<ul>
<li>À votre avis, pourquoi est-ce important ? Quels « problèmes » voyez-vous à l'utilisateur des runners partagé ?</li>
</ul>
<p>Le runner Gitlab-CI est un petit logiciel qui va être connecté aux serveurs de Gitlab et qui va se mettre en écoute de demande de tâche de compilation / test / packaging que <strong>vos projets</strong> ont besoin de réaliser. L'avantage est double :</p>
<ul>
<li>Pas de limite en nombre de compilation.</li>
<li>Accès à vos ressources locales pour le déploiement.</li>
</ul>
<p><img src="@source/tp/ci/gitlab/res/runner_loop.png" alt="Runner LOOP"></p>
<h2 id="l-executeur" tabindex="-1"><a class="header-anchor" href="#l-executeur" aria-hidden="true">#</a> L'exécuteur</h2>
<p>Un Runner Gitlab-CI est un simple démon qui attend les Jobs comme vus dans le diagramme précédent. Une fois un Job reçu celui-ci va demander à « un exécuteur » de traiter la demande. Les exécuteurs sont des sous-processus qui vont se charger de faire les commandes (<code>scripts</code>) que vous avez définies dans votre gitlab-ci. Gitlab-CI est capable de fonctionner de différente manière :</p>
<ul>
<li>SSH</li>
<li>Shell</li>
<li>Parallels</li>
<li>VirtualBox</li>
<li>Docker</li>
<li>Docker Machine (auto-scaling)</li>
<li>Kubernetes</li>
<li>Custom</li>
</ul>
<p><img src="@source/tp/ci/gitlab/res/type_executor.png" alt="Type d'exécuteurs"></p>
<h3 id="comment-choisir" tabindex="-1"><a class="header-anchor" href="#comment-choisir" aria-hidden="true">#</a> Comment choisir ?</h3>
<h4 id="shell" tabindex="-1"><a class="header-anchor" href="#shell" aria-hidden="true">#</a> Shell</h4>
<p>C'est le plus simple de tous. Vos scripts seront lancés sur la machine qui possède le Runner.</p>
<h4 id="parallels-virtualbox" tabindex="-1"><a class="header-anchor" href="#parallels-virtualbox" aria-hidden="true">#</a> Parallels, VirtualBox</h4>
<p>Le Runner va créer (ou utiliser) une machine virtuelle pour exécuter les scripts. Pratique pour avoir un environnement spécifique (exemple macOS)</p>
<h4 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h4>
<p>Utilise Docker pour créer / exécuter vos scripts et traitement (en fonction de la configuration de votre <code>.gitlab-ci.yml</code>)</p>
<p><strong>Solution la plus simple et à privilégié</strong></p>
<h4 id="docker-machine-auto-scaling" tabindex="-1"><a class="header-anchor" href="#docker-machine-auto-scaling" aria-hidden="true">#</a> Docker Machine (auto-scaling)</h4>
<p>Identique à docker, mais dans un environnement Docker multimachine avec auto-scaling.</p>
<h4 id="kubernetes" tabindex="-1"><a class="header-anchor" href="#kubernetes" aria-hidden="true">#</a> Kubernetes</h4>
<p>Lance vos builds dans un cluster Kubernetes. Très similaire à Docker-Machine</p>
<h4 id="ssh" tabindex="-1"><a class="header-anchor" href="#ssh" aria-hidden="true">#</a> SSH</h4>
<p>À ne pas utiliser. Il existe, car il permet à Gitlab-CI de gérer l'ensemble des configurations possibles.</p>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2>
<p>L'installation d'un Runner Gitlub-CI est possible quelques soit votre :</p>
<ul>
<li>Système d'exploitation.</li>
<li>Architecture (ARM, X86, …)</li>
</ul>
<p>Deux installations sont possibles « en mode natif » (binaire) en mode « Docker » (container)</p>
<div class="custom-container tip"><p class="custom-container-title">Une préférence ?</p>
<p>Pas de préférence particulière sur la façon d'installer de Runner Gitlab-CI, dans les deux cas les options sont relativement similaires.</p>
</div>
<h3 id="en-mode-«-natif-»-binaire" tabindex="-1"><a class="header-anchor" href="#en-mode-«-natif-»-binaire" aria-hidden="true">#</a> En mode « natif » (binaire)</h3>
<p>L'installation en mode « natif », est une installation similaire à l'installation d'un logiciel classique sur votre ordinateur. Le runner Gitlab-CI va prendre la forme d'un <em>service</em> qui démarrera en même temps que la machine sur lequel vous l'installez. L'installation est différente en fonction de votre environnement. Mais celle-ci se résume toujours à la même suite d'opérations :</p>
<ul>
<li>Récupération du Runner.</li>
<li>Installation</li>
<li>Configurations / Démarrage</li>
</ul>
<p>En fonction de votre environnement, l'installation peut-être différente, je vous laisse suivre la documentation officielle (et posez-moi des questions) :</p>
<ul>
<li><a href="https://docs.gitlab.com/runner/install/linux-manually.html" target="_blank" rel="noopener noreferrer">GNU/Linux<ExternalLinkIcon/></a></li>
<li><a href="https://docs.gitlab.com/runner/install/osx.html" target="_blank" rel="noopener noreferrer">macOS<ExternalLinkIcon/></a></li>
<li><a href="https://docs.gitlab.com/runner/install/windows.html" target="_blank" rel="noopener noreferrer">Windows<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">Attention danger</p>
<p>Nous avons vu dans les exécuteurs qu'il était possible de choisir <strong>Shell</strong>. Même si dans certains cas c'est utile (exemple compilation d'application iOS), <strong>ce mode de fonctionnement</strong> est très dangereux ! En effet avec ce mode vous lancerez des commandes de manière arbitraire directement sur la machine. Ce qu'il faut comprendre ici c'est que si vous vous trompez et que vous lancez un <code>rm</code> hasardeux vous allez casser votre propre machine.</p>
<p><strong>Donc attention danger</strong>, si vous installez Gitlab Runner sur votre machine en mode binaire, je vous conseille vivement de choisir le mode de fonctionnement <code>Docker executor</code> lors de la configuration.</p>
</div>
<h3 id="dans-un-docker" tabindex="-1"><a class="header-anchor" href="#dans-un-docker" aria-hidden="true">#</a> Dans un Docker</h3>
<p>Si vous cherchez une solution simple pour configurer / installer un runner Gitlab, la solution Docker est clairement la plus facile. Elle vous permettra en quelques minutes de monter un Runner. La <a href="https://docs.gitlab.com/runner/install/docker.html" target="_blank" rel="noopener noreferrer">documentation officielle<ExternalLinkIcon/></a> explique bien comment procéder, mais si on résume la procédure. Celle-ci se déroulera en deux temps :</p>
<h4 id="etape-1-enregistrement-du-runner-avec-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#etape-1-enregistrement-du-runner-avec-gitlab-ci" aria-hidden="true">#</a> Étape 1 : Enregistrement du Runner avec Gitlab-CI</h4>
<p>L'étape d'enregistrement n'est à réaliser qu'une seule fois. Elle a pour but d'autoriser Gitlab à communiquer avec votre runner, elle s'assure aussi que seuls vos jobs vont être lancés sur votre Runner.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run --rm -it -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/config:/etc/gitlab-runner gitlab/gitlab-runner register
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>À cette étape, nous initialisons la configuration de notre runner, vous allez avoir plusieurs questions, l'une d'entre elles sera l'identifiant de votre Runner. Celui-ci est indiqué dans la partie CI/CD de votre projet :</p>
<p><img src="@source/tp/ci/gitlab/res/runner_token.png" alt="Runner Token"></p>
<p>Je vous laisse remplir les différentes questions, si vous avez des questions je suis ici 👋. Dans mon cas voilà mes choix :</p>
<p><img src="@source/tp/ci/gitlab/res/register_result.png" alt="Runner Resultat"></p>
<ul>
<li>À quoi correspond les tags ?</li>
<li>Pourquoi est-je choisi docker comme <code>executor</code> ?</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Be curious !</p>
<p>La configuration de votre runner est maintenant générée. Celle-ci est contenue dans le fichier <code>config</code>. Je vous laisse la regarder.</p>
</div>
<h4 id="etape-2-lancer-le-runner" tabindex="-1"><a class="header-anchor" href="#etape-2-lancer-le-runner" aria-hidden="true">#</a> Étape 2 : Lancer le runner</h4>
<p>Notre runner est maintenant connu de Gitlab, il n'est pour l'instant par contre pas encore en fonction.</p>
<p><img src="@source/tp/ci/gitlab/res/runner_state_off.png" alt="Runner is off"></p>
<p>Pour le lancer on réutilise évidemment Docker, via la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -d --name gitlab-runner --restart always <span class="token punctuation">\</span>
     -v <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/config:/etc/gitlab-runner <span class="token punctuation">\</span>
     -v /var/run/docker.sock:/var/run/docker.sock <span class="token punctuation">\</span>
     gitlab/gitlab-runner:latest
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Un instant :stop:</p>
<p>Analysons ensemble la commande afin de comprendre chacune des lignes, pour ne pas lancer n'importe quoi sur notre machine.</p>
</div>
<p>Cette action lance un Container Docker visible via la commande <code>docker ps</code> :</p>
<p><img src="@source/tp/ci/gitlab/res/runner_docker_ps.png" alt="Runner docker ps"></p>
<p><strong>Félicitation</strong>, votre runner est maintenant actif sur Gitlab-CI :</p>
<p><img src="@source/tp/ci/gitlab/res/runner_state_on.png" alt="Runner is on"></p>
<h2 id="configuration-test" tabindex="-1"><a class="header-anchor" href="#configuration-test" aria-hidden="true">#</a> Configuration &amp; Test</h2>
<p>Votre système est maintenant prêt à recevoir des commandes / des ordres depuis Gitlab-CI. Pour être certains que ça soit bien votre <code>runner</code> qui prend les ordres il faut désactiver les runners partagés. Cette opération est au même endroit que la partie Token des Runners :</p>
<p><img src="@source/tp/ci/gitlab/res/configuration_lancement.png" alt="Shared_runner"></p>
<div class="custom-container tip"><p class="custom-container-title">À partir de maintenant</p>
<p>À partir de maintenant (sous réserve que votre runner soit actif), vos builds ne seront plus décomptés du quota de 400 minutes mensuel. Vous n'avez plus de limite.</p>
</div>
<p>Gitlab offre une option pour lancer un build, pour ça rendez-vous dans la partie <code>CI/CD &gt; Pipelines</code> de votre projet :</p>
<p><img src="@source/tp/ci/gitlab/res/test_ci.png" alt="Test CI"></p>
<p>Puis faites un <code>Run Pipelines</code> depuis la branche souhaitée.</p>
<div class="custom-container tip"><p class="custom-container-title">Que va-t-il se passer ?</p>
<p>Votre runner va être sollicité pour compiler. Vous pouvez suivre les opérations directement depuis Gitlab-CI. Mais si vous êtes curieux, vous pouvez également lancer un <code>docker ps</code> sur votre machine, vous devriez voir au bout de quelques secondes un container démarré sur votre machine. Dans mon cas :</p>
<p><img src="@source/tp/ci/gitlab/res/ps_on_build.png" alt="Docker PS quand ça build"></p>
</div>
<p>Quelques questions :</p>
<ul>
<li>Comment s'assurer que notre runner s'exécute que dans certains cas ?</li>
<li>Comment utiliser par exemple les Shared Runner pour la partie « Construction de l'image Docker », mais pas dans les autres cas ?</li>
<li>Comment utiliser notre runner que pour la partie « livraison continue » par exemple ?</li>
</ul>
</template>
