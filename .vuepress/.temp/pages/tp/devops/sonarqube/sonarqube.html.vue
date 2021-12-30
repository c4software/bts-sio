<template><h1 id="sonarqube" tabindex="-1"><a class="header-anchor" href="#sonarqube" aria-hidden="true">#</a> SonarQube</h1>
<p>Dans ce TP nous allons voir comment utiliser SonarQube avec Gitlab-CI.</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#installation">Installation</RouterLink><ul><li><RouterLink to="#installation-via-docker">Installation via Docker</RouterLink></li><li><RouterLink to="#premier-lancement">Premier lancement</RouterLink></li></ul></li><li><RouterLink to="#utilisation">Utilisation</RouterLink><ul><li><RouterLink to="#creation-du-token">Création du Token</RouterLink></li><li><RouterLink to="#gitlab-ci">Gitlab-CI</RouterLink></li></ul></li><li><RouterLink to="#analyse-des-resultats">Analyse des résultats</RouterLink></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Nous l'avons vu en cours, SonarQube est un outil très puissant il va vous permettre d'analyser votre code de manière statique. C'est-à-dire via une analyse à base d'expression régulière.</p>
<p>L'objectif de Sonar est de vous donner des indicateurs « simplifié » pour comprendre comment « va votre projet » / afin d'en mesurer ça santé. Cette santé est exprimée sous la forme de 4 grandes notes :</p>
<ul>
<li>Le nombre de « bugs ».</li>
<li>Le nombre de vulnérabilités.</li>
<li>Le nombre de points chauds / sensibles à vérifier.</li>
<li>La dette technique</li>
</ul>
<p><img src="@source/tp/devops/sonarqube/res/sonar_analyse.png" alt="Analyse"></p>
<p>Nous analyserons ensemble les indicateurs. Cette note ne doit pas être prise comme une finalité <strong>c'est très important</strong>, elle doit être prise comme un indicateur permettant de vous améliorer au fur et à mesure (à chaque évolution idéalement).</p>
<p><strong>L'objectif étant de ne pas faire baisser la note.</strong></p>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2>
<p>En fonction du langage SonarQube peut-être gourmand (très gourmand même). Pour tester, je vous propose de monter un SonarQube dans un cluster Kubernetes (car pourquoi pas ?).</p>
<p><a href="https://github.com/c4software/kubernetes-sonarqube" target="_blank" rel="noopener noreferrer">Vous pouvez suivre l'installation ici<ExternalLinkIcon/></a></p>
<h3 id="installation-via-docker" tabindex="-1"><a class="header-anchor" href="#installation-via-docker" aria-hidden="true">#</a> Installation via Docker</h3>
<p>Vous pouvez également lancer simplement SonarQube avec Docker :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run -d --name sonarqube -e <span class="token assign-left variable">SONAR_ES_BOOTSTRAP_CHECKS_DISABLE</span><span class="token operator">=</span>true -p <span class="token number">9000</span>:9000 sonarqube:latest
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Quelques soit la solution</p>
<p>Nous parlons ici de <strong>tester</strong> sonarqube, il est évident que si nous devions l'installer « en prod » / « pour de vrai » il faudrait :</p>
<ul>
<li>Dédier un serveur.</li>
<li>Configurer une base de données externe autre que <code>H2</code>.</li>
</ul>
</div>
<h3 id="premier-lancement" tabindex="-1"><a class="header-anchor" href="#premier-lancement" aria-hidden="true">#</a> Premier lancement</h3>
<p><strong>Attention</strong>, le premier lancement de SonarQube est relativement long.</p>
<h2 id="utilisation" tabindex="-1"><a class="header-anchor" href="#utilisation" aria-hidden="true">#</a> Utilisation</h2>
<p>L'utilisation du SonarQube est relativement simple, elle se découpe en deux étapes :</p>
<ul>
<li>Création d'un token pour autoriser l'échange entre votre Gitlab et votre SonarQube.</li>
<li>Ajouter la configuration dans votre CI pour permettre l'envoi des informations.</li>
</ul>
<h3 id="creation-du-token" tabindex="-1"><a class="header-anchor" href="#creation-du-token" aria-hidden="true">#</a> Création du Token</h3>
<p>Le token est une sorte « d'alias » permettant d'autoriser l'accès à votre compte sans fournir le login et le mot de passe. Vous pouvez le créer dans votre compte utilisateur :</p>
<p><img src="@source/tp/devops/sonarqube/res/token_generation.png" alt="Génération du Token"></p>
<div class="custom-container danger"><p class="custom-container-title">C'est secret !</p>
<p>Votre token est personnel, vous devez le garder <strong>secret</strong> sous peine d'introduire une faille de sécurité.</p>
</div>
<h3 id="gitlab-ci" tabindex="-1"><a class="header-anchor" href="#gitlab-ci" aria-hidden="true">#</a> Gitlab-CI</h3>
<p>Cette partie est issue de la documentation de SonarQube, je vous laisse le mettre dans votre projet. Ici pas d'aide vous l'avez déjà fait plusieurs fois.</p>
<p>N'oubliez pas de :</p>
<ul>
<li>Changer la projectKey par une valeur pour vous.</li>
<li><code>http(s)://ip.ou.domaine.vers.votre.sonar</code> par le lien vers votre SonarQube.</li>
<li><code>VOTRE-TOKEN</code> par le token obtenu à l'étape précédente</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sonarqube-check:
  stage: <span class="token builtin class-name">test</span>
  image:
    name: sonarsource/sonar-scanner-cli:latest
    entrypoint: <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
  variables:
    SONAR_USER_HOME: <span class="token string">"<span class="token variable">${CI_PROJECT_DIR}</span>/.sonar"</span>  <span class="token comment"># Defines the location of the analysis task cache</span>
    GIT_DEPTH: <span class="token string">"0"</span>  <span class="token comment"># Tells git to fetch all the branches of the project, required by the analysis task</span>
  cache:
    key: <span class="token string">"<span class="token variable">${CI_JOB_NAME}</span>"</span>
    paths:
      - .sonar/cache
  script:
    - sonar-scanner -Dsonar.qualitygate.wait<span class="token operator">=</span>true -Dsonar.projectKey<span class="token operator">=</span>vitejs-sample -Dsonar.sources<span class="token operator">=</span>. -Dsonar.host.url<span class="token operator">=</span>http<span class="token punctuation">(</span>s<span class="token punctuation">)</span>://ip.ou.domaine.vers.votre.sonar -Dsonar.login<span class="token operator">=</span>VOTRE-TOKEN
  allow_failure: <span class="token boolean">true</span>
  only:
    - master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Je pense que l'on devrait en parler non ? Pendant que ça analyse, prenons quelques minutes pour comprendre les spécificités de cette configuration.</p>
<h2 id="analyse-des-resultats" tabindex="-1"><a class="header-anchor" href="#analyse-des-resultats" aria-hidden="true">#</a> Analyse des résultats</h2>
<p>Le plus important dans l'utilisation de SonarQube ce n'est pas les indicateurs en eux-mêmes (quoique) mais plutôt la tendance de votre projet. En effet l'idée derrière des outils tels que SonarQube c'est d'analyser de manière continue afin d'améliorer de manière continue votre application.</p>
<p><img src="@source/tp/devops/sonarqube/res/sonar_result.png" alt="Résultats Sonar"></p>
<p>Je vous laisse analyser un projet « plus conséquent » afin que nous puissions discuter d'un code avec de vrais problèmes 😉.</p>
</template>
