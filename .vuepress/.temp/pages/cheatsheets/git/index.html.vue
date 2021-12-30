<template><h1 id="aide-memoire-git" tabindex="-1"><a class="header-anchor" href="#aide-memoire-git" aria-hidden="true">#</a> Aide mémoire GIT</h1>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#personnaliser">Personnaliser</RouterLink></li><li><RouterLink to="#creer">Créer</RouterLink></li><li><RouterLink to="#modifications-locales">Modifications locales</RouterLink></li><li><RouterLink to="#historique-de-commit">Historique de Commit</RouterLink></li><li><RouterLink to="#branches-tags">Branches &amp; Tags</RouterLink></li><li><RouterLink to="#merge-rebase">Merge &amp; Rebase</RouterLink></li><li><RouterLink to="#travailler-avec-un-depots-distant">Travailler avec un dépots distant</RouterLink></li><li><RouterLink to="#annulation">Annulation</RouterLink></li><li><RouterLink to="#https-et-identifiant-sauvegarde-sous-windows">HTTPS et Identifiant sauvegardé sous Windows</RouterLink></li></ul></nav>
</details>
<h2 id="personnaliser" tabindex="-1"><a class="header-anchor" href="#personnaliser" aria-hidden="true">#</a> Personnaliser</h2>
<p>Définir son identité :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config --global user.email <span class="token string">"email@example.com"</span>
<span class="token function">git</span> config --global user.name <span class="token string">"Valentin Brosseau"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Voir la configuration :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> config --list
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="creer" tabindex="-1"><a class="header-anchor" href="#creer" aria-hidden="true">#</a> Créer</h2>
<p>Créer un nouveau dépôt local (dans le dossier courant) :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> init
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cloner un dépot existant :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone ssh://user@domain.com/repo.git
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Créer un fichier « .gitignore » :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Création du fichier</span>
<span class="token function">vim</span> .gitignore
<span class="token comment"># …</span>
<span class="token function">git</span> <span class="token function">add</span> .gitignore
<span class="token function">git</span> commit -m <span class="token string">"Ajout gitignore"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Créer un fichier « .gitignore » en utilisant un template « Windows »:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -s https://www.gitignore.io/api/windows <span class="token operator">></span> .gitignore
<span class="token function">git</span> <span class="token function">add</span> .gitignore
<span class="token function">git</span> commit -m <span class="token string">"Ajout gitignore"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Créer un fichier « .gitignore » en utilisant un template « MacOS »:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -s https://www.gitignore.io/api/osx <span class="token operator">></span> .gitignore
<span class="token function">git</span> <span class="token function">add</span> .gitignore
<span class="token function">git</span> commit -m <span class="token string">"Ajout gitignore"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="modifications-locales" tabindex="-1"><a class="header-anchor" href="#modifications-locales" aria-hidden="true">#</a> Modifications locales</h2>
<p>Fichiers modifiés dans votre répertoire de travail :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> status
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Modifications sur les fichiers suivis :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">diff</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Ajouter tous les changements actuels au prochain commit :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Ajouter tous les changements de toute l’arborescence :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> --all
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Commiter tous les changements locaux des fichiers suivis :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit -a
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Commiter les modifications en attente :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit -m <span class="token string">'Votre message'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Modifier le commit précédent :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit --amend
<span class="token comment"># ou</span>
<span class="token function">git</span> commit --am
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="historique-de-commit" tabindex="-1"><a class="header-anchor" href="#historique-de-commit" aria-hidden="true">#</a> Historique de Commit</h2>
<p>Afficher tous les commits :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> log
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Afficher tous les commits (uniquement l’identifiant et le texte) :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> log --oneline
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Afficher l’historique d’un utilisateur uniquement :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> log --author<span class="token operator">=</span><span class="token string">"utilisateur"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Afficher l’historique des modifications pour un fichier uniquement :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> log -p <span class="token operator">&lt;</span>fichier<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Affiche les changements (en détails) dans le fichier :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> blame <span class="token operator">&lt;</span>file<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="branches-tags" tabindex="-1"><a class="header-anchor" href="#branches-tags" aria-hidden="true">#</a> Branches &amp; Tags</h2>
<p>Lister toutes les branches :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> branch
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Changer de branche :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token operator">&lt;</span>votre-branche<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Créer une nouvelle branche en se basant sur le HEAD :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> branch <span class="token operator">&lt;</span>votre-branche<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Créer une nouvelle branche de suivi, basée sur une branche distante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> branch --track <span class="token operator">&lt;</span>nouvelle-branche<span class="token operator">></span> <span class="token operator">&lt;</span>branche-distante<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Supprimer une branche :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> branch -d <span class="token operator">&lt;</span>votre-branche<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Marquer le commit courant avec un tag :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> tag <span class="token operator">&lt;</span>non-du-tag<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="merge-rebase" tabindex="-1"><a class="header-anchor" href="#merge-rebase" aria-hidden="true">#</a> Merge &amp; Rebase</h2>
<p>Fusionner la branche <code>&lt;votre-branche&gt;</code> avec la master :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout master
<span class="token function">git</span> merge <span class="token operator">&lt;</span>votre-branche<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>⚠️ Attention ⚠️</p>
<p>Jouer avec l’historique est toujours dangereux surtout si vous travaillez à plusieurs !</p>
<p>Mettre à jour votre branche avec le code de la master :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token operator">&lt;</span>votre-branch<span class="token operator">></span>
<span class="token function">git</span> rebase master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Annuler un rebase en cours :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> rebase --abort
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Continuer un rebase après avoir résolu des conflits :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> rebase --continue
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="travailler-avec-un-depots-distant" tabindex="-1"><a class="header-anchor" href="#travailler-avec-un-depots-distant" aria-hidden="true">#</a> Travailler avec un dépots distant</h2>
<p>Lister tous les dépôts distants configurés :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote -v
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Monter les informations d'un dépôt distant :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote show origin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Ajouter un nouveau dépôt distant, nommé &lt;remote&gt; :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">add</span> <span class="token operator">&lt;</span>remote<span class="token operator">></span> <span class="token operator">&lt;</span>url<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Synchroniser la branche « origin » avec la master. Et indiquer origin comme le dépôt distant par défaut.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> push -u origin master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Télécharger toutes les modifications d'un dépôt distant nommé &lt;remote&gt;, sans les fusionner :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> fetch <span class="token operator">&lt;</span>remote<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Télécharger les modifications et les fusionner directement dans le HEAD :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote pull <span class="token operator">&lt;</span>remote<span class="token operator">></span> <span class="token operator">&lt;</span>url<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Fusionner les modifications de la <code>master</code> distante sur la branche courante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> pull origin master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Récupérer toutes les modifications du HEAD dans le dépôt local :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> pull
<span class="token comment"># ou</span>
<span class="token function">git</span> pull origin
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Publier les modifications locales sur un dépôt distant :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> push
ou
<span class="token function">git</span> push remote <span class="token operator">&lt;</span>remote<span class="token operator">></span> <span class="token operator">&lt;</span>branch<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Publier les tags :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> push --tags
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="annulation" tabindex="-1"><a class="header-anchor" href="#annulation" aria-hidden="true">#</a> Annulation</h2>
<p>Annuler le dernier <code>git add</code> :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset HEAD
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Annuler les modifications locales d'un fichier spécifique :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> checkout HEAD <span class="token operator">&lt;</span>file<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Annuler un commit (création d’un commit avec les modifications inverses) :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> revert <span class="token operator">&lt;</span>commit<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Placer le pointeur du HEAD sur un commit précédent.
Conserve toutes les modifications effectuées depuis :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset <span class="token operator">&lt;</span>commit<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Annuler toutes les modifications dans le répertoire de travail :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset --hard HEAD
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Placer le pointeur du HEAD sur un commit précédent.
Annule toutes les modifications effectuées depuis :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset --hard <span class="token operator">&lt;</span>commit<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="https-et-identifiant-sauvegarde-sous-windows" tabindex="-1"><a class="header-anchor" href="#https-et-identifiant-sauvegarde-sous-windows" aria-hidden="true">#</a> HTTPS et Identifiant sauvegardé sous Windows</h2>
<p>Si vous avez cloné votre repository en HTTPS il se peut que vous rencontriez une erreur du type « error git remote ». Vous avez certainement du faire une erreur dans votre mot de passe (erreur de saisie ou autre). Malheureusement Windows sauvegarde l'information dans le système, cependant il est possible de corriger le problème via :</p>
<blockquote>
<p>&quot;Si vous travaillez avec le système d'exploitation Windows, il existe une autre solution pour changer les paramètres d'authentification. Il faut pour cela accéder au gestionnaire d'informations d'identification. Dans la zone de recherche de la barre des tâches, tapez &quot;Gestionnaire d'informations d'identification&quot;. Ouvrez ensuite le menu &quot;Informations d'identification Windows&quot;. Dépliez le menu consacré à Git et cliquez sur &quot;Modifier&quot; pour pouvoir changer le mot de passe.&quot;</p>
</blockquote>
<p><img src="@source/cheatsheets/git/windows_error.png" alt="Erreur Windows &amp; HTTPS"></p>
<p><a href="https://www.journaldunet.fr/web-tech/developpement/1441077-gitlab-comment-corriger-l-e%5B%E2%80%A6%5Drreur-remote-http-basic-access-denied-fatal-authentication/" target="_blank" rel="noopener noreferrer">Plus de détail sur l'erreur<ExternalLinkIcon/></a></p>
</template>
