<template><h1 id="deploiement-continue-d-un-projet-firebase-function-web" tabindex="-1"><a class="header-anchor" href="#deploiement-continue-d-un-projet-firebase-function-web" aria-hidden="true">#</a> Déploiement continue d'un projet Firebase (function, web, …)</h1>
<p>Je vous propose de créer ici la configuration qui vous permettra de déployer en continue sur Firebase</p>
<h2 id="initialiser-un-projet-firebase-code-source" tabindex="-1"><a class="header-anchor" href="#initialiser-un-projet-firebase-code-source" aria-hidden="true">#</a> Initialiser un projet Firebase (code source)</h2>
<p>Client Firebase :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g firebase-tools
firebase login
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="creer-un-projet-sur-firebase" tabindex="-1"><a class="header-anchor" href="#creer-un-projet-sur-firebase" aria-hidden="true">#</a> Créer un projet sur Firebase</h2>
<p>Nouveau projet API « vide » :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firebase init functions
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">Gratuit … Mais pas vraiment</p>
<p>Attention même si vous n'allez pas payer pour utiliser le « free tier » Google à décidé de mettre en place l'obligation de passer en pay as you go pour la partie fonction.</p>
</div>
<h2 id="autoriser-le-deploiement-depuis-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#autoriser-le-deploiement-depuis-gitlab-ci" aria-hidden="true">#</a> Autoriser le déploiement depuis Gitlab-CI</h2>
<ul>
<li>Sur votre machine : <code>firebase login:ci</code></li>
<li>Dans les SETTINGS partie CI/CD de votre projet, ajouter une variable <code>FIREBASE_DEPLOY_KEY</code> avec le token obtenue</li>
</ul>
<h2 id="le-gitlab-ci" tabindex="-1"><a class="header-anchor" href="#le-gitlab-ci" aria-hidden="true">#</a> Le Gitlab-ci</h2>
<p>Dans votre projet ajouter le fichier <code>.gitlab-ci.yml</code> avec le contenu suivant :</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>15.5.1

<span class="token key atrule">cache</span><span class="token punctuation">:</span>
  <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> node_modules/

<span class="token key atrule">deploy_production</span><span class="token punctuation">:</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy
  <span class="token key atrule">environment</span><span class="token punctuation">:</span> Production
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> tags
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> cd functions/
    <span class="token punctuation">-</span> npm install <span class="token punctuation">-</span>g firebase<span class="token punctuation">-</span>tools
    <span class="token punctuation">-</span> npm install
    <span class="token punctuation">-</span> firebase deploy <span class="token punctuation">-</span><span class="token punctuation">-</span>token $FIREBASE_DEPLOY_KEY

<span class="token key atrule">test</span><span class="token punctuation">:</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> cd functions/
    <span class="token punctuation">-</span> npm install
    <span class="token punctuation">-</span> npm run test
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div></template>
