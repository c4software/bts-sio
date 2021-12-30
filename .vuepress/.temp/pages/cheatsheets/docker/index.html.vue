<template><h1 id="aide-memoire-docker" tabindex="-1"><a class="header-anchor" href="#aide-memoire-docker" aria-hidden="true">#</a> Aide mémoire Docker</h1>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2>
<h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> Windows</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>https://www.docker.com/products/docker-desktop
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="macos" tabindex="-1"><a class="header-anchor" href="#macos" aria-hidden="true">#</a> MacOS</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>https://download.docker.com/mac/stable/Docker.dmg
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> Linux</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sSL https://get.docker.com/ | sh
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="les-images" tabindex="-1"><a class="header-anchor" href="#les-images" aria-hidden="true">#</a> Les images</h2>
<h3 id="recherche" tabindex="-1"><a class="header-anchor" href="#recherche" aria-hidden="true">#</a> Recherche</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker search nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="recuperer-une-image" tabindex="-1"><a class="header-anchor" href="#recuperer-une-image" aria-hidden="true">#</a> Récupérer une image</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker pull nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="lancer-un-conteneur" tabindex="-1"><a class="header-anchor" href="#lancer-un-conteneur" aria-hidden="true">#</a> Lancer un conteneur</h2>
<ul>
<li>Démarre l’image ubuntu:latest</li>
<li><code>--rm</code> supprime le container avant de le relancer.</li>
<li>Déclare le port <code>80</code> du conteneur sur le port 3000 de votre machine.</li>
<li>Monte le dossier courant dans le dossier <code>/data</code> du conteneur</li>
<li>Note: Sur Windows vous devez remplacer <code>-v ${PWD}:/data</code> par <code>-v &quot;C:\Data&quot;:/data</code></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># *nix</span>
docker run --rm --name monConteneur -it -p <span class="token number">3000</span>:80 -v <span class="token variable">${<span class="token environment constant">PWD</span>}</span>:/data ubuntu:latest

<span class="token comment"># Windows</span>
docker run --rm --name monConteneur -it -p <span class="token number">3000</span>:80 -v %cd%:/data ubuntu:latest
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="quelques-parametres-de-la-ligne-de-commande" tabindex="-1"><a class="header-anchor" href="#quelques-parametres-de-la-ligne-de-commande" aria-hidden="true">#</a> Quelques paramètres de la ligne de commande</h2>
<table>
<thead>
<tr>
<th style="text-align:left">Paramètre</th>
<th style="text-align:left">action</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">-p portLocal:portContainer</td>
<td style="text-align:left">Permet de rendre visible un port dans le container sur votre machine (ex. -p 8080:80)</td>
</tr>
<tr>
<td style="text-align:left">-v dossierLocal:dossierContainer</td>
<td style="text-align:left">Permet d'exposer un dossier local à l'interieur du container (ex -v ./vosSource:/data)</td>
</tr>
</tbody>
</table>
<h2 id="les-logs" tabindex="-1"><a class="header-anchor" href="#les-logs" aria-hidden="true">#</a> Les Logs</h2>
<h3 id="afficher-les-logs" tabindex="-1"><a class="header-anchor" href="#afficher-les-logs" aria-hidden="true">#</a> Afficher les logs</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker logs monConteneur
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="afficher-et-suivre-les-logs" tabindex="-1"><a class="header-anchor" href="#afficher-et-suivre-les-logs" aria-hidden="true">#</a> Afficher et suivre les logs</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker logs monConteneur -f
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="statistiques-configuration" tabindex="-1"><a class="header-anchor" href="#statistiques-configuration" aria-hidden="true">#</a> Statistiques / Configuration</h2>
<h3 id="statistique-du-conteuner" tabindex="-1"><a class="header-anchor" href="#statistique-du-conteuner" aria-hidden="true">#</a> Statistique du conteuner</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker stats monConteneur
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="les-processus-du-conteneur" tabindex="-1"><a class="header-anchor" href="#les-processus-du-conteneur" aria-hidden="true">#</a> Les processus du conteneur</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker <span class="token function">top</span> monConteneur
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="le-s-port-s-expose-s" tabindex="-1"><a class="header-anchor" href="#le-s-port-s-expose-s" aria-hidden="true">#</a> Le(s) port(s) exposé(s)</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker port monConteneur
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="voir-les-changements-dans-le-conteneur" tabindex="-1"><a class="header-anchor" href="#voir-les-changements-dans-le-conteneur" aria-hidden="true">#</a> Voir les changements dans le conteneur</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker <span class="token function">diff</span> monConteneur
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="supprimer-les-images-container-plus-utilise" tabindex="-1"><a class="header-anchor" href="#supprimer-les-images-container-plus-utilise" aria-hidden="true">#</a> Supprimer les images / container plus utilisé</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker system prune
docker volume prune
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="les-images-1" tabindex="-1"><a class="header-anchor" href="#les-images-1" aria-hidden="true">#</a> Les images</h2>
<h3 id="liste" tabindex="-1"><a class="header-anchor" href="#liste" aria-hidden="true">#</a> Liste</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker images
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="suppression" tabindex="-1"><a class="header-anchor" href="#suppression" aria-hidden="true">#</a> Suppression</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker rmi nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="creer-une-image-depuis-un-conteneur" tabindex="-1"><a class="header-anchor" href="#creer-une-image-depuis-un-conteneur" aria-hidden="true">#</a> Créer une image depuis un conteneur</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker commit nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="le-dockerfile" tabindex="-1"><a class="header-anchor" href="#le-dockerfile" aria-hidden="true">#</a> Le Dockerfile</h3>
<h4 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> Dockerfile</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM debian:latest

RUN <span class="token function">apt-get</span> update <span class="token operator">&amp;&amp;</span> <span class="token function">apt-get</span> <span class="token function">install</span> -y <span class="token function">wget</span> <span class="token function">zip</span> python-pip <span class="token function">git</span>

<span class="token comment"># Ajout Yasb</span>
RUN pip <span class="token function">install</span> http://github.com/c4software/YASB/archive/master.zip

RUN <span class="token function">mkdir</span> /sources/
WORKDIR /sources/
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> Build</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker build  -t exemple/yasb <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="nettoyage" tabindex="-1"><a class="header-anchor" href="#nettoyage" aria-hidden="true">#</a> Nettoyage</h2>
<h3 id="suppression-des-image-s-conteneur-s-non-utilise-s" tabindex="-1"><a class="header-anchor" href="#suppression-des-image-s-conteneur-s-non-utilise-s" aria-hidden="true">#</a> Suppression des image(s), conteneur(s) non utilisé(s)</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker system prune
docker volume prune
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></template>
