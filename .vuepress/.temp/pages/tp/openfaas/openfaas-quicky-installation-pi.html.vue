<template><h1 id="creation-stack-openfaas-faasd-sur-un-raspberry-pi" tabindex="-1"><a class="header-anchor" href="#creation-stack-openfaas-faasd-sur-un-raspberry-pi" aria-hidden="true">#</a> Création stack OpenFaas (faasd) sur un Raspberry Pi</h1>
<p>Ce document s'intéresse uniquement à la partie création de la stack initial faasd qui nous permettra d'utiliser OpenFaas. Le but de ce document est de monter rapidement / simplement une stack OpenFaas pour tester la solution.</p>
<p>Pour simplifier, la création de l'environnement nous utiliserons <a href="https://github.com/openfaas/faasd/" target="_blank" rel="noopener noreferrer">Faasd<ExternalLinkIcon/></a></p>
<h2 id="installer-faas-cli" tabindex="-1"><a class="header-anchor" href="#installer-faas-cli" aria-hidden="true">#</a> Installer faas-cli</h2>
<p><code>faas-cli</code> est l'outil / client qui nous permettra de parler avec notre instance OpenFaas. Bien évidemment nous allons travailler dans un environnement client / server.</p>
<ul>
<li>Votre machine sera le client (via faas-cli).</li>
<li>Notre « Raspberry Pi » sera le serveur faisant fonctionner notre stack OpenFaas.</li>
</ul>
<h3 id="linux-et-mac" tabindex="-1"><a class="header-anchor" href="#linux-et-mac" aria-hidden="true">#</a> Linux et Mac</h3>
<p>Sans être root :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -sSL https://cli.openfaas.com <span class="token operator">|</span> <span class="token function">sh</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Via brew (Mac OS) :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> faas-cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="windows-powershell" tabindex="-1"><a class="header-anchor" href="#windows-powershell" aria-hidden="true">#</a> Windows Powershell</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token variable">$version</span> <span class="token operator">=</span> <span class="token punctuation">(</span>Invoke-WebRequest <span class="token string">"https://api.github.com/repos/openfaas/faas-cli/releases/latest"</span> <span class="token operator">|</span> ConvertFrom-Json<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>.tag_name
<span class="token punctuation">(</span>New-Object System.Net.WebClient<span class="token punctuation">)</span>.DownloadFile<span class="token punctuation">(</span><span class="token string">"https://github.com/openfaas/faas-cli/releases/download/<span class="token variable">$version</span>/faas-cli.exe"</span>, <span class="token string">"faas-cli.exe"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="openfaas-et-raspberrypi" tabindex="-1"><a class="header-anchor" href="#openfaas-et-raspberrypi" aria-hidden="true">#</a> OpenFaas et RaspberryPi</h2>
<p>Pour installer OpenFaas sur un Raspberry Pi il suffit de :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo apt install git -y
git clone https://github.com/openfaas/faasd
cd faasd
./hack/install.sh
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Attention c'est long !</p>
<p>L'installation va prendre quelques minutes, mais le premier démarrage va également prendre quelques secondes.</p>
</div>
<h2 id="recuperation-de-l-authentification" tabindex="-1"><a class="header-anchor" href="#recuperation-de-l-authentification" aria-hidden="true">#</a> Récupération de l'authentification</h2>
<p>Votre machine est maintenant créée. Pour pouvoir se connecter à Open-faas vous devez récupérer le fichier <code>basic-auth-password</code> pour ça nous allons :</p>
<ul>
<li>Avoir besoin de l'IP de votre RaspberryPi</li>
<li>Récupéré via SSH le fichier d'auth</li>
</ul>
<p>Dans mon cas l'IP est dans <code>openfaas.local</code>, via la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> pi@openfaas.local <span class="token string">"sudo cat /var/lib/faasd/secrets/basic-auth-password"</span> <span class="token operator">></span> basic-auth-password
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="connexion-a-l-instance" tabindex="-1"><a class="header-anchor" href="#connexion-a-l-instance" aria-hidden="true">#</a> Connexion à l'instance</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">OPENFAAS_URL</span><span class="token operator">=</span>http://openfaas.local:8080 <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> basic-auth-password <span class="token operator">|</span> faas-cli login -s
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="valider-le-fonctionnement" tabindex="-1"><a class="header-anchor" href="#valider-le-fonctionnement" aria-hidden="true">#</a> Valider le fonctionnement</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>faas-cli version
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/openfaas/res/result.png" alt="result"></p>
<p>Vous pouvez également accéder à l'interface d'admin WEB via :</p>
<p><a href="openfaas.local:8080">openfaas.local:8080</a></p>
<p>Votre ordinateur est maintenant prêt, nous avons donc créé :</p>
<ul>
<li>Une Raspberry Pi contenant open-faas (votre serveur).</li>
<li>Le CLI pour contrôler <code>open-faas</code>.</li>
<li>Connecter votre ordinateur à votre serveur.</li>
</ul>
</template>
