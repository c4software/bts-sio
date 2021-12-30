<template><h1 id="compiler-une-application-hybride-avec-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#compiler-une-application-hybride-avec-gitlab-ci" aria-hidden="true">#</a> Compiler une application hybride avec Gitlab-CI</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce TP vous allez mettre en place l’intégration continue sur votre Projet d’application hybride. Fini la prise de tête pour la compilation de votre application. Vous allez utiliser « une image Docker » au travers de GitLab-CI l’image docker en question est <a href="https://hub.docker.com/r/c4software/cordova-light/" target="_blank" rel="noopener noreferrer">Cordova light<ExternalLinkIcon/></a>.</p>
<p>Pourquoi Light ? Car l’image n’embarque pas Chrome Headless, et donc ne permet pas de faire de test unitaire de votre application.</p>
<h2 id="creation-du-projet-sur-gitlab" tabindex="-1"><a class="header-anchor" href="#creation-du-projet-sur-gitlab" aria-hidden="true">#</a> Création du projet sur GitLab</h2>
<p>Avec votre compte GitLab vous pouvez créer un nombre illimité de projets. La première étape est donc de créer un projet sur votre <a href="https://gitlab.com/projects/new" target="_blank" rel="noopener noreferrer">compte Gitlab<ExternalLinkIcon/></a>.</p>
<p>⚠️ Je vous conseille de mettre votre projet en mode « Private ».</p>
<h2 id="commiter-et-pusher-vos-sources" tabindex="-1"><a class="header-anchor" href="#commiter-et-pusher-vos-sources" aria-hidden="true">#</a> Commiter et Pusher vos sources</h2>
<p>Si ce n’est pas déjà fait, commiter les sources de votre application Cordova. Attention à bien mettre un <code>.gitignore</code> pour ignorer le dossier <code>nodes_modules/</code>.</p>
<p>Vous pouvez pusher vos sources.</p>
<h2 id="activer-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#activer-gitlab-ci" aria-hidden="true">#</a> Activer GitLab-CI</h2>
<p>Maintenant que votre projet est sur GitLab, nous allons activer Gitlab-CI. Pour ça créer un fichier <code>.gitlab-ci.yml</code>, c’est le fichier qui va activer l’intégration continue sur votre projet. Voilà le contenu du fichier :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">image</span><span class="token punctuation">:</span> c4software/cordova<span class="token punctuation">-</span>light

<span class="token key atrule">stages</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> deploy

<span class="token key atrule">cache</span><span class="token punctuation">:</span>
  <span class="token key atrule">untracked</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token string">"$CI_PROJECT_ID"</span>
  <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> plugins/

<span class="token key atrule">android_debug</span><span class="token punctuation">:</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy
  <span class="token key atrule">when</span><span class="token punctuation">:</span> manual
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> cordova platform add android
    <span class="token punctuation">-</span> cordova build android
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> platforms/android/build/outputs/apk/
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>Et c’est tout, avec ce simple fichier votre application est prête et sera compilée en automatique.</p>
<p>Commiter et Pusher la modification.</p>
<ul>
<li>Regarder les fichiers :
<ul>
<li>À quoi correspond le <code>when: manual</code>?</li>
<li>À quoi sert le cache ?</li>
<li>À quoi correspond le <code>artifacts</code> ?</li>
</ul>
</li>
</ul>
<h2 id="lancement-d-un-«-build-»" tabindex="-1"><a class="header-anchor" href="#lancement-d-un-«-build-»" aria-hidden="true">#</a> Lancement d’un « Build »</h2>
<p>Pour lancer un build rendez-vous dans la partie « CI/CD » de votre Projet GitLab.</p>
<p><img src="@source/tp/ci/ressources/hybrid-ci.png" alt="ci"></p>
<p>Et lancer le build :</p>
<p><img src="@source/tp/ci/ressources/run.png" alt="ci"></p>
<p>Au bout de quelques minutes, votre application est prête :</p>
<p><img src="@source/tp/ci/ressources/resultat.png" alt="resultat"></p>
<p>Bonus !</p>
<p>Grâce à l’artifact votre application est même téléchargeable :</p>
<p><img src="@source/tp/ci/ressources/telechargement.png" alt="dl"></p>
<h2 id="test-et-analyse" tabindex="-1"><a class="header-anchor" href="#test-et-analyse" aria-hidden="true">#</a> Test et analyse</h2>
<p>Désactiver le « cache » dans le fichier Gitlab-ci. Tester de compiler plusieurs fois votre application. À votre avis le cache est-il utile ?</p>
<h2 id="declarer-un-runner-gitlab" tabindex="-1"><a class="header-anchor" href="#declarer-un-runner-gitlab" aria-hidden="true">#</a> Déclarer un runner GitLab</h2>
<p>Comme nous l’avons vu tout repose sur les runners, de base Gitlab fournie des runners partagés. C’est runners sont pratique, car ils sont instantanément disponibles dans vos projets, cependant vu qu’ils sont partagés avec d’autres utilisateurs il peut rapidement y avoir des questions de sécurités et surtout de performances.</p>
<p>Pour être plus autonome (et plus performant) même dans la version cloud il est possible de déclarer un runners « à nous ». Ce runner va être dédié à votre compte, car il sera déclaré sur votre machine.</p>
<h3 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h3>
<p>Pour déclarer un runner c’est très simple, il faut juste le lancer / l’installer sur votre machine. La documentation de GitLab étant très bien fait rendez-vous <a href="https://docs.gitlab.com/runner/install/windows.html" target="_blank" rel="noopener noreferrer">ici pour Windows<ExternalLinkIcon/></a> et <a href="https://docs.gitlab.com/runner/install/linux-repository.html" target="_blank" rel="noopener noreferrer">la pour Linux<ExternalLinkIcon/></a></p>
<h2 id="enregistrer-le-runner" tabindex="-1"><a class="header-anchor" href="#enregistrer-le-runner" aria-hidden="true">#</a> Enregistrer le runner</h2>
<p>Maintenant que le runner est installer sur votre machine, nous allons devoir l’enregistrer. L’enregistrement consiste à déclarer à Gitlab.com que votre machine est prête à exécuter des tâches. Vous dédiez en quelques sortes un peu de vos ressources à GitLab au travers de votre Runner.</p>
<p>L’enregistrement du runners est relativement simple, il faut dans un premier temps allez dans « les Paramètres CI/CD du projet que vous avez créé » exemple <code>https://gitlab.com/bts-sio-chevrollier/slam5/settings/ci_cd</code> cliquez sur « Expand » de la catégorie « Runners settings ». Vous devez avoir quelques chose comme :</p>
<p><img src="@source/tp/ci/ressources/runner.png" alt="Register Runner"></p>
<p>Dans une console administrateur :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./gitlab-runner.exe register
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>✋ STOP ! Une fois rendu à cette étape appeler moi ! Nous allons terminer la procédure ensemble. Pour les plus téméraires, vous pouvez suivre <a href="https://docs.gitlab.com/runner/register/index.html#windows" target="_blank" rel="noopener noreferrer">la documentation<ExternalLinkIcon/></a> (attention à bien choisir Docker)</p>
<h2 id="signer-l-application" tabindex="-1"><a class="header-anchor" href="#signer-l-application" aria-hidden="true">#</a> Signer l’application</h2>
<p>Faire du Debug c’est bien ! Mais si on faisait une application prête pour le Store ? C’est possible et tout aussi simplement.</p>
<p>⚠️ Je vous déconseille fortement de le faire sur un « runner » public de Gitlab-CI. Pourquoi ? Simplement, car nous allons mettre une clé de signature sur votre APK, clé qui doit rester <strong>PRIVÉE</strong> ! C’est ce qui garantit la sécurité de votre application, si celle-ci se retrouve en ligne le jeu est fini pour vous n’importe qui peut usurper votre identité.</p>
<p>Ajouter dans le fichier <code>.gitlab-ci.yml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">android</span><span class="token punctuation">:</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy
  <span class="token key atrule">when</span><span class="token punctuation">:</span> manual
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> cordova platform add android
    <span class="token punctuation">-</span> cordova build android <span class="token punctuation">-</span><span class="token punctuation">-</span>release <span class="token punctuation">-</span><span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>keystore="keystore/keyfile" <span class="token punctuation">-</span><span class="token punctuation">-</span>keystoreType jks <span class="token punctuation">-</span><span class="token punctuation">-</span>password="MOT_DE_PASSE" <span class="token punctuation">-</span><span class="token punctuation">-</span>storePassword="MOT_DE_PASSE" <span class="token punctuation">-</span><span class="token punctuation">-</span>alias="demo"
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> platforms/android/build/outputs/apk/
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Comme vous pouvez le constater, la partie script fait référence à un nouveau fichier le <code>keystore/keyfile</code>. Pour que la commande fonctionne, nous allons donc devoir « le créer ».</p>
<h3 id="creation-du-keystore" tabindex="-1"><a class="header-anchor" href="#creation-du-keystore" aria-hidden="true">#</a> Création du keystore</h3>
<p>Le Keystore est une notion d’Android, rien à voir avec Cordova. Il faut donc utiliser Android-Studio (pour les intéressés il est également possible de le faire avec la ligne de commande).</p>
<p>Avec Android Studio :</p>
<p><img src="@source/tp/ci/ressources/SjcOa.png" alt="store"></p>
<p>Une fois créé :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> -A
<span class="token function">git</span> commit -am <span class="token string">"Ajout signature"</span>
<span class="token function">git</span> push
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="lancement-d-un-build" tabindex="-1"><a class="header-anchor" href="#lancement-d-un-build" aria-hidden="true">#</a> Lancement d’un build</h3>
<p>Relancer un build, mais en sélectionnant le stage « android ». Au bout de quelques minutes, vous devez obtenir une application signée.</p>
</template>
