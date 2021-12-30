<template><h1 id="initiation-git" tabindex="-1"><a class="header-anchor" href="#initiation-git" aria-hidden="true">#</a> Initiation GIT</h1>
<p>Vous débutez avec GIT, le TP suivant vous fera parcourir les concepts de base de la ligne de commande Git.</p>
<h2 id="ressources-utiles" tabindex="-1"><a class="header-anchor" href="#ressources-utiles" aria-hidden="true">#</a> Ressources utiles</h2>
<ul>
<li><a href="https://github.com/c4software/cheatsheet/blob/master/git/README.md" target="_blank" rel="noopener noreferrer">Aide mémoire<ExternalLinkIcon/></a></li>
<li><a href="https://www.google.fr" target="_blank" rel="noopener noreferrer">Google<ExternalLinkIcon/></a></li>
<li><a href="https://git-scm.com/book/fr/v2" target="_blank" rel="noopener noreferrer">Livre Git en ligne<ExternalLinkIcon/></a></li>
</ul>
<h2 id="situation" tabindex="-1"><a class="header-anchor" href="#situation" aria-hidden="true">#</a> Situation</h2>
<p>Vous êtes en entreprise, vous avez un nouveau projet à réaliser. Le projet est plutôt conséquent (plusieurs semaines de travail), votre responsable vous indique que vous serez le seul développeur sur le code.</p>
<h3 id="questions" tabindex="-1"><a class="header-anchor" href="#questions" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Voyez-vous d’autres questions à poser à votre chef de projet ?</li>
<li>Comment imaginez-vous l’organisation de votre travail ?</li>
<li>Un gestionnaire de version est-il utile ?</li>
<li>Si oui, pourquoi ?</li>
<li>Si non, pourquoi ?</li>
</ul>
<h2 id="initialisation" tabindex="-1"><a class="header-anchor" href="#initialisation" aria-hidden="true">#</a> Initialisation</h2>
<p>Votre choix est fait, vous devez maintenant initialiser votre espace de travail. Comment procédez-vous?</p>
<h3 id="definir-votre-identite-dans-git" tabindex="-1"><a class="header-anchor" href="#definir-votre-identite-dans-git" aria-hidden="true">#</a> Définir votre identité dans GIT</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="initialiser-votre-projet" tabindex="-1"><a class="header-anchor" href="#initialiser-votre-projet" aria-hidden="true">#</a> Initialiser votre projet</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="debut-du-code" tabindex="-1"><a class="header-anchor" href="#debut-du-code" aria-hidden="true">#</a> Début du code</h2>
<p>Maintenant que votre projet est initialisé, il faut maintenant créer les fichiers de base. Créer la structure suivante :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ tree
.
├── Makefile
├── documentations
│   └── README.md
├── libs
│   ├── HTMLPurifier.php
│   └── fonction.php
├── public
│   ├── index.jpg
│   └── index.js
├── source
│   ├── index.html
│   ├── index.js
│   └── index.php
└── tests
    ├── test.js
    └── test.php

5 directories, 11 files
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="question-bonus" tabindex="-1"><a class="header-anchor" href="#question-bonus" aria-hidden="true">#</a> Question bonus</h3>
<ul>
<li>Comment avez-vous procédé ?
<ul>
<li>Est-ce la technique utilisée en entreprise ?</li>
<li>Est-ce pratique ?</li>
<li>Comment faire autrement ?</li>
</ul>
</li>
</ul>
<p>Vérifier le statut de Git après avoir tout créé</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="questions-1" tabindex="-1"><a class="header-anchor" href="#questions-1" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Que constatez-vous ?
<ul>
<li>Quelles commandes, faut-il faire maintenant?</li>
<li>Une autre commande serait-elle utile ?</li>
</ul>
</li>
</ul>
<p>Ajouter les changements</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Est-ce la seule façon de faire ? (Plusieurs réponses sont possibles)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="questions-2" tabindex="-1"><a class="header-anchor" href="#questions-2" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Qu’avez-vous fait ?</li>
<li>Qu’elles sont différences entre les deux commandes ?</li>
<li>Dans quel état est votre dépôt (repository) ?</li>
<li>À quoi sert la commande <code>git status</code> ?
<ul>
<li>Une autre commande permettrait-elle d’avoir une information similaire ?</li>
</ul>
</li>
<li>Le commentaire que vous avez mis est-il correct ?
<ul>
<li>Est-il possible de l’améliorer ?</li>
<li>Si oui, comment ?</li>
</ul>
</li>
</ul>
<h2 id="ajout-modification-de-fichiers" tabindex="-1"><a class="header-anchor" href="#ajout-modification-de-fichiers" aria-hidden="true">#</a> Ajout / Modification de fichiers</h2>
<p>Modifier le fichier <code>source/index.html</code>, ajouter du contenu dedans (par exemple, une page html fictive)</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ vim source/index.html
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vérifier que vos modifications sont présentes dans GIT</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
$ <span class="token comment"># Ou</span>
$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Ajouter vos modifications dans Git</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="questions-3" tabindex="-1"><a class="header-anchor" href="#questions-3" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>À quoi servent les commentaires ?</li>
<li>Sont ils utilent que pour pour vous ?</li>
<li>Y’a-t-il plusieurs façon de faire ?</li>
<li>Comment vérifier que vos modifications ont bien été prises en compte ?</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="modifier-le-message-du-precedent-commit" tabindex="-1"><a class="header-anchor" href="#modifier-le-message-du-precedent-commit" aria-hidden="true">#</a> Modifier le message du précédent commit</h2>
<p>Votre responsable n’est pas satisfait de la qualité du message de votre dernier commit. Modifier le en utilisant <a href="https://github.com/c4software/cheatsheet/blob/master/git/commit_template.md" target="_blank" rel="noopener noreferrer">un template de message de commit<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="questions-4" tabindex="-1"><a class="header-anchor" href="#questions-4" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Pourquoi votre responsable vous a-t-il demandé de le modifier ?</li>
<li>Pourquoi le commentaire est-il aussi important ?</li>
</ul>
<h2 id="ajout-d-une-evolution-dans-le-precedent-fichier" tabindex="-1"><a class="header-anchor" href="#ajout-d-une-evolution-dans-le-precedent-fichier" aria-hidden="true">#</a> Ajout d’une évolution dans le précédent fichier</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Sauvegarder l'ensemble des modifications après avoir vérifié que celle-ci sont bien présentes</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="question" tabindex="-1"><a class="header-anchor" href="#question" aria-hidden="true">#</a> Question</h3>
<ul>
<li>À votre avis, comment déterminer la fréquence des « commits » ?</li>
</ul>
<h2 id="un-coup-d-oeil-dans-le-retroviseur" tabindex="-1"><a class="header-anchor" href="#un-coup-d-oeil-dans-le-retroviseur" aria-hidden="true">#</a> Un coup d’oeil dans le rétroviseur</h2>
<p>Vérifier l’historique de votre projet</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
$ <span class="token comment"># ou pour avoir une vue « compact »</span>
$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="questions-5" tabindex="-1"><a class="header-anchor" href="#questions-5" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Que constatez-vous ?</li>
<li>À quoi sert l’identifiant de chaque commit ? (Hash SHA)</li>
<li>Comment vérifiez-vous l’historique pour un fichier précis ?</li>
<li>Comment voir l’ensemble des modifications en détail pour le fichier <code>source/index.html</code> ?</li>
<li>Est-ce judicieux de travailler toujours sur la branche <code>master</code> ?</li>
</ul>
<h2 id="une-autre-evolution" tabindex="-1"><a class="header-anchor" href="#une-autre-evolution" aria-hidden="true">#</a> Une autre évolution</h2>
<p>Votre première version est maintenant disponible pour les utilisateurs, votre responsable vous demande une évolution importante du code, celle-ci est majeure et changera complètement le comportement de votre application. Vous ne pouvez pas travailler directement sur la master.</p>
<p>Comment procédez-vous ?</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Faites des modifications dans les fichiers que vous voulez.</p>
<h3 id="questions-6" tabindex="-1"><a class="header-anchor" href="#questions-6" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Vérifier l’état de votre dépôt Git</li>
<li>Quel est l’avantage de travailler dans « une branch » ?</li>
<li>À votre avis qu’elles sont les prochaines étapes ?</li>
</ul>
<h2 id="fusion-merge-de-la-fonctionnalite" tabindex="-1"><a class="header-anchor" href="#fusion-merge-de-la-fonctionnalite" aria-hidden="true">#</a> Fusion / Merge de la fonctionnalité</h2>
<p>Votre code est finalisé, il faut maintenant fusionner vos modifications avec votre « branch master » :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="questions-7" tabindex="-1"><a class="header-anchor" href="#questions-7" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>À votre avis, en entreprise « merge / fusionne » t-on directement sur la master ?</li>
<li>Une autre personne peut-elle / doit-elle être impliquée dans cette étape ?</li>
</ul>
<h2 id="annulation-retour-arriere" tabindex="-1"><a class="header-anchor" href="#annulation-retour-arriere" aria-hidden="true">#</a> Annulation, retour arrière</h2>
<p>Faite des évolutions dans votre branche master (2 ou 3), ajouter les via <code>git add</code>. Votre responsable vous demande finalement de les annuler, car il ne souhaite pas garder la fonctionnalité. Comment procédez-vous ?</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="questions-8" tabindex="-1"><a class="header-anchor" href="#questions-8" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Que vient-il de se produire ?</li>
<li>Est-il possible de récupérer vos modifications ?</li>
</ul>
<h2 id="finalisation" tabindex="-1"><a class="header-anchor" href="#finalisation" aria-hidden="true">#</a> Finalisation</h2>
<p>Voilà, votre projet a atteint une première étape. Que pouvez-vous faire pour « marquer » cette première version ?</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="questions-9" tabindex="-1"><a class="header-anchor" href="#questions-9" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Que vient-il de se produire ?</li>
<li>À votre avis, quel est l’intérêt de « taguer » une version ?</li>
<li>Quels sont les avantages de réaliser un tag ?</li>
</ul>
<p><a href="https://github.com/c4software/bts-sio/blob/master/tp/git_initiation/solution/README.md" target="_blank" rel="noopener noreferrer">Voir la solution<ExternalLinkIcon/></a></p>
</template>
