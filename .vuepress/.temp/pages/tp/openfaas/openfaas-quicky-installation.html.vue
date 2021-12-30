<template><h1 id="creation-stack-openfaas-faasd-local-via-multipass" tabindex="-1"><a class="header-anchor" href="#creation-stack-openfaas-faasd-local-via-multipass" aria-hidden="true">#</a> Création stack OpenFaas (faasd) local via Multipass</h1>
<p>Ce document s'intéresse uniquement à la partie création de la stack initial faasd qui nous permettra d'utiliser OpenFaas. Le but de ce document est de monter rapidement / simplement une stack OpenFaas pour tester la solution.</p>
<p>Pour simplifier, la création de l'environnement nous utiliserons <a href="https://github.com/openfaas/faasd/" target="_blank" rel="noopener noreferrer">Faasd<ExternalLinkIcon/></a></p>
<h2 id="installer-multipass" tabindex="-1"><a class="header-anchor" href="#installer-multipass" aria-hidden="true">#</a> Installer Multipass</h2>
<p>MultiPass « Ubuntu VMs on demand for any workstation », est une solution qui nous permettra de monter rapidement des VMs administrable et accessible en ligne de commande.</p>
<p>Installer <a href="https://multipass.run/" target="_blank" rel="noopener noreferrer">multipass<ExternalLinkIcon/></a></p>
<p>Multipass, est une bonne solution pour tester rapidement des outils en ligne de commande Linux sans quitter votre machine Windows / MacOS.</p>
<p>👉 Vous souhaitez être full-stack ? Ce que nous allons voir ici est les bases des manipulations à connaitres.</p>
<h2 id="installer-faas-cli" tabindex="-1"><a class="header-anchor" href="#installer-faas-cli" aria-hidden="true">#</a> Installer faas-cli</h2>
<h3 id="linux-et-mac" tabindex="-1"><a class="header-anchor" href="#linux-et-mac" aria-hidden="true">#</a> Linux et Mac</h3>
<p>Sans être root :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -sSL https://cli.openfaas.com <span class="token operator">|</span> <span class="token function">sh</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Via brew (Mac OS) :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> faas-cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="windows-powershell" tabindex="-1"><a class="header-anchor" href="#windows-powershell" aria-hidden="true">#</a> Windows Powershell</h3>
<p>Vous êtes sous Windows ? C'est également installable via Powershell</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token variable">$version</span> <span class="token operator">=</span> <span class="token punctuation">(</span>Invoke-WebRequest <span class="token string">"https://api.github.com/repos/openfaas/faas-cli/releases/latest"</span> <span class="token operator">|</span> ConvertFrom-Json<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>.tag_name
<span class="token punctuation">(</span>New-Object System.Net.WebClient<span class="token punctuation">)</span>.DownloadFile<span class="token punctuation">(</span><span class="token string">"https://github.com/openfaas/faas-cli/releases/download/<span class="token variable">$version</span>/faas-cli.exe"</span>, <span class="token string">"faas-cli.exe"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="configuration-cloud-config" tabindex="-1"><a class="header-anchor" href="#configuration-cloud-config" aria-hidden="true">#</a> Configuration Cloud-config</h2>
<p>Pour créer la machine nous allons utiliser <code>Cloud-config</code> ce fichier de configuration va initialiser la VM avec l'ensemble des dépendances nécessaires au bon fonctionnement.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -sSLO https://raw.githubusercontent.com/openfaas/faasd/master/cloud-config.txt
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>CloudConfig va nous permettre de pré-parametrer notre VM, dès le démarrage de celle-ci sera préconfiguré avec les paramètrage spécifié dans <code>cloud-config.txt</code>.</p>
<div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<p>👋 Vous avez confiance ? Vous avez ouvert le fichier ? Vous ne devriez pas… Je vous invite <strong>vivement</strong> de regarder son contenu.</p>
</div>
<h2 id="ssh-key" tabindex="-1"><a class="header-anchor" href="#ssh-key" aria-hidden="true">#</a> SSH Key</h2>
<p>Afin de pouvoir vous connecter à la machine il faut modifier le fichier <code>cloud-config.txt</code> pour y ajouter votre clé SSH</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ssh-add -L
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Éditer dans le fichier <code>cloud-config.txt</code> la ligne <code>ssh-rsa</code> pour mettre votre clé.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Je ne pense pas vous apprendre quelque chose ici… Mais préférez toujours une connexion via une clé à un mot de passe. <strong>TOUJOURS</strong>.</p>
<p>Vous n'en avez pas ? Je suis là !</p>
</div>
<h2 id="cree-et-demarrer-la-vm" tabindex="-1"><a class="header-anchor" href="#cree-et-demarrer-la-vm" aria-hidden="true">#</a> Créé et démarrer la VM</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>multipass launch --cloud-init cloud-config.txt --name faasd
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vous allez constater la force de Multipass. Ici rien à faire sauf attendre.</p>
<div class="custom-container tip"><p class="custom-container-title">Opération longue</p>
<p>Cette opération va prendre quelques minutes en fonction de votre machine. Votre ordinateur (via cloud-init) est entrain de créer une machine disposant de <code>OpenFaas</code> mais également de l'ensemble des dépendances nécessaire au bon fonctionnement.</p>
</div>
<h2 id="recuperation-de-l-authentification" tabindex="-1"><a class="header-anchor" href="#recuperation-de-l-authentification" aria-hidden="true">#</a> Récupération de l'authentification</h2>
<p>Votre machine est maintenant créée. Pour pouvoir se connecter à OpenFaas vous devez récupérer le fichier <code>basic-auth-password</code> pour ça nous allons :</p>
<ul>
<li>Avoir besoin de l'IP de votre VM</li>
<li>Récupéré via SSH le fichier d'auth</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>multipass <span class="token function">ls</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/openfaas/res/multipass-ls.png" alt="Multipass ls"></p>
<p>Dans mon cas l'IP est dans <code>172.16.162.4</code>, via la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> ubuntu@172.16.162.4 <span class="token string">"sudo cat /var/lib/faasd/secrets/basic-auth-password"</span> <span class="token operator">></span> basic-auth-password
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="connexion-a-l-instance" tabindex="-1"><a class="header-anchor" href="#connexion-a-l-instance" aria-hidden="true">#</a> Connexion à l'instance</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">OPENFAAS_URL</span><span class="token operator">=</span>http://172.16.162.4:8080 <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> basic-auth-password <span class="token operator">|</span> faas-cli login -s
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">N'oubliez pas l'IP</p>
<p>Dans mon exemple l'IP est <code>172.16.162.4</code> mais ce n'est peut-être pas votre cas… Je vous invite à vérifier avant de lancer la commande.</p>
</div>
<h2 id="valider-le-fonctionnement" tabindex="-1"><a class="header-anchor" href="#valider-le-fonctionnement" aria-hidden="true">#</a> Valider le fonctionnement</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>faas-cli version
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/openfaas/res/result.png" alt="result"></p>
<p>Vous pouvez également accéder à l'interface d'admin WEB via :</p>
<p><a href="172.16.162.4:8080">172.16.162.4:8080</a></p>
<p>Votre ordinateur est maintenant prêt, nous avons donc créé :</p>
<ul>
<li>Une VM contenant open-faas (votre serveur).</li>
<li>Le CLI pour contrôler <code>open-faas</code>.</li>
<li>Connecter votre ordinateur à votre serveur.</li>
</ul>
<p>Source: https://github.com/openfaas/faasd/blob/master/docs/MULTIPASS.md</p>
<h2 id="la-suite" tabindex="-1"><a class="header-anchor" href="#la-suite" aria-hidden="true">#</a> La suite ?</h2>
<p>Maintenant que nous avons notre serveur, nous allons pouvoir déployer une fonction pour <RouterLink to="/tp/openfaas/openfaas-quicky-create-faas.html">la suite c'est par ici</RouterLink></p>
</template>
