<template><h1 id="gitlab" tabindex="-1"><a class="header-anchor" href="#gitlab" aria-hidden="true">#</a> GitLab</h1>
<p>Introduction au travail à plusieurs avec GIT.</p>
<h2 id="ressources-utiles" tabindex="-1"><a class="header-anchor" href="#ressources-utiles" aria-hidden="true">#</a> Ressources utiles</h2>
<ul>
<li><a href="https://github.com/c4software/cheatsheet/blob/master/git/README.md" target="_blank" rel="noopener noreferrer">Aide mémoire<ExternalLinkIcon/></a></li>
<li><a href="https://docs.gitlab.com/ee/README.html" target="_blank" rel="noopener noreferrer">Google<ExternalLinkIcon/></a></li>
<li><a href="https://git-scm.com/book/fr/v2" target="_blank" rel="noopener noreferrer">Livre Git en ligne<ExternalLinkIcon/></a></li>
<li><a href="https://www.gitlab.com/" target="_blank" rel="noopener noreferrer">GitLab.com<ExternalLinkIcon/></a></li>
</ul>
<h2 id="situation" tabindex="-1"><a class="header-anchor" href="#situation" aria-hidden="true">#</a> Situation</h2>
<p>L’entreprise ou vous effectuez votre stage utilise GitLab, vous allez donc devoir utiliser en plus de GIT un outil permettant de gérer votre « workflow de travail ».</p>
<h3 id="questions" tabindex="-1"><a class="header-anchor" href="#questions" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Pourquoi à votre avis l’entreprise utilise GitLab ?</li>
<li>Pourquoi GitLab plutôt que GitHub ?</li>
</ul>
<h2 id="creation-du-projet" tabindex="-1"><a class="header-anchor" href="#creation-du-projet" aria-hidden="true">#</a> Création du projet</h2>
<p>Avant d’utiliser GitLab nous allons dans un premier temps créer un site Internet sur votre ordinateur.</p>
<ul>
<li>Créer un nouveau dossier</li>
<li>Initialiser un nouveau projet Git (en ligne de commande)</li>
<li>Créer la page d’accueil du votre site Internet (quelque chose de sympa et créatif 😉)</li>
<li>Versionner cette première version. (<code>git commit</code> et vérifier avec <code>git status</code> que c’est bien ok)</li>
<li>Ajouter une 2nd page dans votre site Internet, par exemple une page vous présentant.</li>
<li>Versionner cette 2nd page. (<code>git commit</code> et vérifier avec <code>git status</code> que c’est bien ok)</li>
<li>Ajouter un « formulaire de contact », ce formulaire devra contenir à minima 3 « input » :
_ Un champs email
_ Un champs sujet
<ul>
<li>Un champs message</li>
</ul>
</li>
<li>Ajouter une page PHP qui enregistre les valeurs dans un fichier sur disque à chaque fois qu’un utilisateur valide le formulaire.</li>
<li>Versionner le formulaire de contact (attention, il serait intéressant de faire plusieurs <code>commit</code>, si vous avez ajouter plusieurs pages, vérifier avec <code>git status</code> que c’est bien ok)</li>
</ul>
<h2 id="les-logs" tabindex="-1"><a class="header-anchor" href="#les-logs" aria-hidden="true">#</a> Les logs</h2>
<p>Vérifier que votre projet est bien commité, avec la commande <code>git status</code>. Vous pouvez également vérifier l’historique de vos commits via <code>git log</code></p>
<h2 id="gitlab-1" tabindex="-1"><a class="header-anchor" href="#gitlab-1" aria-hidden="true">#</a> GitLab</h2>
<h3 id="creation-du-compte" tabindex="-1"><a class="header-anchor" href="#creation-du-compte" aria-hidden="true">#</a> Création du compte</h3>
<p>Créer votre compte sur <a href="https://gitlab.com/users/sign_in" target="_blank" rel="noopener noreferrer">GitLab.com onglet Register<ExternalLinkIcon/></a>. Se compte sera utile pour plusieurs projets, remplissez les champs avec attention.</p>
<h4 id="echange-de-cle" tabindex="-1"><a class="header-anchor" href="#echange-de-cle" aria-hidden="true">#</a> Échange de clé</h4>
<p>Pour vous reconnaitre, GitLab/Github utilise un système de clé. Cette clé garantit votre identité sans utiliser un mot de passe.</p>
<h4 id="generation-de-votre-cle" tabindex="-1"><a class="header-anchor" href="#generation-de-votre-cle" aria-hidden="true">#</a> Génération de votre clé</h4>
<p>Sur votre ordinateur, en ligne de commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ssh-keygen
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Deux fichiers seront créés une clé « publique » ET une clé privée.</p>
<p>⚠️ ⚠️ Vous ne devez JAMAIS rendre publique votre clé <strong>privée</strong>. Si ça vous arrive, vous devez immédiatement révoquer les clés !</p>
<h4 id="envoyer-votre-cle-sur-gitlab" tabindex="-1"><a class="header-anchor" href="#envoyer-votre-cle-sur-gitlab" aria-hidden="true">#</a> Envoyer votre clé sur GitLab</h4>
<p><a href="https://gitlab.com/profile/keys" target="_blank" rel="noopener noreferrer">Ajouter une clé sur votre profil<ExternalLinkIcon/></a></p>
<p>La clé que vous devez envoyer est dans votre dossier personnel (W 😃 dans le dossier <code>.ssh</code>. Une fois dans le dossier (masqué par défaut) vous avez deux fichiers. Le fichier que vous devez ouvrir et copier le contenu est celui dont l’extension est .pub</p>
<h3 id="creation-de-votre-premier-projet" tabindex="-1"><a class="header-anchor" href="#creation-de-votre-premier-projet" aria-hidden="true">#</a> Création de votre premier projet</h3>
<p>Maintenant que votre compte est créé (et que l’échange de clé est effectif), vous allez pouvoir créer un nouveau projet. Ce projet « gitlab », aura pour vocation de contenir les sources de votre site Internet (celui créé au début du TP). Nommer le bien !</p>
<h3 id="question" tabindex="-1"><a class="header-anchor" href="#question" aria-hidden="true">#</a> Question</h3>
<ul>
<li>Comment choisir la visibilité du projet ? (Visiblity Level)</li>
</ul>
<h3 id="envoi-sur-gitlab" tabindex="-1"><a class="header-anchor" href="#envoi-sur-gitlab" aria-hidden="true">#</a> Envoi sur GitLab</h3>
<p>Maintenant que votre projet est créé, GitLab doit vous donner les instructions pour « pusher » votre projet sur le serveur. Suivez les instructions.</p>
<h4 id="exemple" tabindex="-1"><a class="header-anchor" href="#exemple" aria-hidden="true">#</a> Exemple :</h4>
<p><img src="gitlab.png" alt="Création d’un projet"></p>
<p>Une fois que c’est fait. Regarder les différentes options que GitLab vous propose.</p>
<ul>
<li>Inviter un (ou plusieurs) autre étudiant dans votre projet (c’est dans l’onglet Members dans les paramètres)</li>
<li>Créer une nouvelle issue</li>
<li>Assigner l’issue à vous-même (ou a un autre étudiant).</li>
<li>Regarder les options autour de l’issue (Création de branch, issue board, etc…)</li>
</ul>
<h3 id="edition-en-ligne" tabindex="-1"><a class="header-anchor" href="#edition-en-ligne" aria-hidden="true">#</a> Édition en ligne</h3>
<p>GitLab permet de se passer (en partie) d’un éditeur sur votre poste, tester les différentes fonctionnalités :</p>
<ul>
<li>Créer une issue (exemple, Ajout d’informations sur la page d’accueil)</li>
<li>Créer une branche relative à cette issue.</li>
<li>Vérifier que vous êtes bien sur la branche en question avant d’éditer le fichier index.html dans l’onglet <code>files</code></li>
<li>Ajouter une image dans votre projet (via GitLab)</li>
<li>Ajouter dans la page index.html l’image en question (<code>&lt;img src…</code>)</li>
<li>⚠️ Comme en local, le commentaire est très important ! Indiquer un commentaire pertinant. (Astuce si vous ajoutez à la fin de votre commentaire Close #1, l’issue sera automatiquement « fermée » une fois votre modification en place sur la master. Testé 😉)</li>
<li>Une fois les modifications faites, vous allez pouvoir créer une <code>merge request</code>. Une fois le merge request créé assignez le à un autre étudiant ! Demandez-lui de le merger pour vous.</li>
<li>⚠️ ⚠️ L’autre étudiant doit regarder le code, et si possible vous faire des commentaires, par exemple :
_ Tu as oublié le <code>alt</code> à ton image.
_ Tu as oublié le <code>title</code> à ton image. * Ou même pourquoi as-tu choisi cette image ?</li>
<li>Prenez en compte les remarques et modifiez le code</li>
<li>Ajouter un commentaire (dans le merge request) pour indiquer à l’autre étudiant que vous avez terminé.</li>
<li>L’autre étudiant peut merger votre code</li>
</ul>
<h2 id="participation-a-un-projet-collectif" tabindex="-1"><a class="header-anchor" href="#participation-a-un-projet-collectif" aria-hidden="true">#</a> Participation à un projet collectif</h2>
<p>GitLab (comme Github) est un outil/site web, permettant le travail collaboratif, dans cette optique vous allez pouvoir travailler sur un projet à plusieurs :</p>
<ul>
<li>Demander l’accès au groupe : <a href="https://gitlab.com/bts-sio-chevrollier" target="_blank" rel="noopener noreferrer">BTS SIO Chevrollier<ExternalLinkIcon/></a></li>
<li>Aller dans le projet : <a href="https://gitlab.com/bts-sio-chevrollier/decouverte-gitlab" target="_blank" rel="noopener noreferrer">découverte GitLab<ExternalLinkIcon/></a> et demander l’accès.</li>
</ul>
<h3 id="questions-1" tabindex="-1"><a class="header-anchor" href="#questions-1" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Pourquoi devez-vous demander l’accès ?</li>
<li>Pourquoi est-ce important ?</li>
<li>Si nous étions sur un GitLab « privé » (interne à l’entreprise) cela aurait-il été aussi important ?</li>
</ul>
<h2 id="cloner-le-projet" tabindex="-1"><a class="header-anchor" href="#cloner-le-projet" aria-hidden="true">#</a> Cloner le projet</h2>
<p>Maintenant que votre compte est actif, vous pouvez cloner le projet :</p>
<h3 id="cloner-le-projet-sur-votre-machine" tabindex="-1"><a class="header-anchor" href="#cloner-le-projet-sur-votre-machine" aria-hidden="true">#</a> Cloner le projet sur votre machine</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="traiter-une-des-issues" tabindex="-1"><a class="header-anchor" href="#traiter-une-des-issues" aria-hidden="true">#</a> Traiter une des issues</h2>
<p>Un ensemble « d’issues »/tickets dans le projet « Découverte GitLab » sont disponibles choisissez en une. Traitez là en utilisant le « Worflow GitLab » :</p>
<ul>
<li>Assignation de l’issue à vous-même.</li>
<li>Création d’une branche relative à l’issue (un bouton permet de le faire directement).</li>
<li>Modification du code.</li>
<li>Création d’une « merge request ».</li>
<li>Assigner à un autre étudiant le « merge » du code que vous venez d’effectuer.</li>
</ul>
<h3 id="mettre-a-jour-le-code-local" tabindex="-1"><a class="header-anchor" href="#mettre-a-jour-le-code-local" aria-hidden="true">#</a> Mettre à jour le code local.</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="changer-de-branch" tabindex="-1"><a class="header-anchor" href="#changer-de-branch" aria-hidden="true">#</a> Changer de branch</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="envoyer-vos-modifications-sur-le-serveurs-gitlab" tabindex="-1"><a class="header-anchor" href="#envoyer-vos-modifications-sur-le-serveurs-gitlab" aria-hidden="true">#</a> Envoyer vos modifications sur le serveurs GitLab</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="creation-d-une-merge-request" tabindex="-1"><a class="header-anchor" href="#creation-d-une-merge-request" aria-hidden="true">#</a> Création d’une merge request</h3>
<p><a href="https://gitlab.com/groups/bts-sio-chevrollier/merge_requests" target="_blank" rel="noopener noreferrer">Création de la merge request<ExternalLinkIcon/></a></p>
<ul>
<li>Remplissez l’ensemble des champs qui vous semblent nécessaires. N’oubliez pas que ça sera quelqu’un d’autre qui va regarder et traiter votre demande !</li>
</ul>
<h3 id="question-1" tabindex="-1"><a class="header-anchor" href="#question-1" aria-hidden="true">#</a> Question</h3>
<ul>
<li>Pourquoi travailler de cette façon ?</li>
</ul>
<h2 id="bonne-nouvelle" tabindex="-1"><a class="header-anchor" href="#bonne-nouvelle" aria-hidden="true">#</a> Bonne nouvelle !</h2>
<p>Vous venez (normalement) d’avoir au moins un « merge request » d’assigner. Vous allez devoir traiter la demande, à votre avis comment se déroule la suite ?</p>
<h2 id="la-revue-de-code" tabindex="-1"><a class="header-anchor" href="#la-revue-de-code" aria-hidden="true">#</a> La revue de code</h2>
<ul>
<li>Regarder l’issue.</li>
<li>Regarder le code de votre « collègue ».</li>
<li>Apporter des commentaires
_ Dans l’issue, générale.
_ Directement dans la partie code de l’issue.</li>
<li>Laisser votre collègue effectuer « les corrections » par rapport à votre commentaire (ou débattre de pourquoi, etc). DISCUTER ! (du code)</li>
<li>Si tout vous semble correcte « Merger » les modifications.</li>
</ul>
<h3 id="questions-2" tabindex="-1"><a class="header-anchor" href="#questions-2" aria-hidden="true">#</a> Questions</h3>
<ul>
<li>Quel est l’intérêt ?</li>
<li>Est-ce contraignant ?</li>
<li>Vous y voyez un intérêt ?</li>
<li>À votre avis, est-il possible d’améliorer la revue de code ?</li>
<li>En situation réelle, est-ce votre rôle de « merger le code » ?</li>
</ul>
</template>
