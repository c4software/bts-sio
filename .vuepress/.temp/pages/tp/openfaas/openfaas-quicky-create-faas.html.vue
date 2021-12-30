<template><h1 id="creation-d-un-projet-openfaas-express" tabindex="-1"><a class="header-anchor" href="#creation-d-un-projet-openfaas-express" aria-hidden="true">#</a> Création d'un projet OpenFaas (Express)</h1>
<p>Ce document s'intéresse uniquement à la partie création du projet openfaas et pas à la partie « <a href="./openfaas-quicky-installation">création de la stack inital openfaas</a> ».</p>
<h2 id="creation-dossier-pour-le-projet" tabindex="-1"><a class="header-anchor" href="#creation-dossier-pour-le-projet" aria-hidden="true">#</a> Création dossier pour le projet</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> exempleValentin <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> exempleValentin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="creation-du-projet" tabindex="-1"><a class="header-anchor" href="#creation-du-projet" aria-hidden="true">#</a> Création du projet</h2>
<p>Faas-cli intègre un système de template qui vas nous permettre d'initialiser simplement un projet. Dans notre cas, nous allons créer un projet de type « Docker ».</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>faas-cli new --lang dockerfile --prefix c4software exempleValentin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">--prefix ?</p>
<p>Le prefix vas nous permettre de faire une image privée sur le DockerHub, vous devez donc le remplacer par votre nom d'utilisateur Docker.</p>
</div>
<p><strong>Et c'est tout !</strong> Votre stack est maintenant prête, nous allons créer un petit projet NodeJS + Express pour constater la simplicité.</p>
<h2 id="init-projet-express" tabindex="-1"><a class="header-anchor" href="#init-projet-express" aria-hidden="true">#</a> Init projet Express</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> exempleValentin
<span class="token function">npm</span> init -y
<span class="token function">pnpm</span> i --save express
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Nous allons créer un projet, celui-ci va contenir notre code source JavaScript</p>
<h2 id="creation-index-js" tabindex="-1"><a class="header-anchor" href="#creation-index-js" aria-hidden="true">#</a> Création index.js</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"express"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> port <span class="token operator">=</span> <span class="token number">8080</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/ping"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"Ceci est un pong"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"YO ! "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Ready"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="docker-a-modifier" tabindex="-1"><a class="header-anchor" href="#docker-a-modifier" aria-hidden="true">#</a> Docker à modifier</h2>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> <span class="token options"><span class="token property">--platform</span><span class="token punctuation">=</span><span class="token string">${TARGETPLATFORM:-linux/amd64}</span></span> node:12.13.0-alpine <span class="token keyword">as</span> ship</span>

<span class="token instruction"><span class="token keyword">RUN</span> apk --no-cache add curl ca-certificates <span class="token operator">\</span>
    &amp;&amp; addgroup -S app &amp;&amp; adduser -S -g app app</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /root/</span>
<span class="token instruction"><span class="token keyword">ENV</span> NPM_CONFIG_LOGLEVEL warn</span>

<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /home/app</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /home/app</span>
<span class="token instruction"><span class="token keyword">COPY</span> package.json ./</span>
<span class="token instruction"><span class="token keyword">RUN</span> npm i</span>

<span class="token instruction"><span class="token keyword">COPY</span> . .</span>

<span class="token instruction"><span class="token keyword">RUN</span> chown app:app -R /home/app &amp;&amp; chmod 777 /tmp</span>

<span class="token instruction"><span class="token keyword">USER</span> app</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"node"</span>, <span class="token string">"index.js"</span>]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="lancer-dans-openfaas" tabindex="-1"><a class="header-anchor" href="#lancer-dans-openfaas" aria-hidden="true">#</a> Lancer dans openfaas</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>faas-cli up -f exempleValentin.yml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>🎉 La fonction est maintenant disponible pour répondre aux requêtes des clients.</p>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0lODC-vSGHU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>Source : https://www.openfaas.com/blog/serverless-nodejs/</p>
<h2 id="creer-une-image-pour-arm" tabindex="-1"><a class="header-anchor" href="#creer-une-image-pour-arm" aria-hidden="true">#</a> Créer une image pour ARM</h2>
<p>Dans le premier cas nous avons réalisé une image à destination de la même architecture, si vous souhaitez déployer sur une architecture de processeur différente il faut :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Compiler</span>
faas-cli publish -f exempleValentin.yml --platforms linux/arm/v7 <span class="token comment"># ARM 32bits</span>
faas-cli publish -f exempleValentin.yml --platforms linux/arm64 <span class="token comment"># ARM 64Bits</span>
faas-cli publish -f exempleValentin.yml --platforms linux/arm64,linux/arm/v7,linux/amd64 <span class="token comment"># ARM 64Bits, 32Bts, x86</span>

<span class="token comment"># Déployer</span>
faas-cli deploy -f exempleValentin.yml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></template>
