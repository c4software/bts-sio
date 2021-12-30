<template><h1 id="ajouter-vuejs-2-0-dans-une-application-existante" tabindex="-1"><a class="header-anchor" href="#ajouter-vuejs-2-0-dans-une-application-existante" aria-hidden="true">#</a> Ajouter VueJS 2.0 dans une application existante</h1>
<p>Dans le cadre du TP, vous allez devoir « moderniser » une application simple. L’application à migrer a été réalisée dans le cadre de la démonstration <em>uniquement</em>.</p>
<p>L’application existante est une « todo liste » codée en PHP + HTML.</p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#recuperation-et-installation-des-sources">Récupération et installation des sources</RouterLink></li><li><RouterLink to="#liste-des-fonctionnalites">Liste des fonctionnalités</RouterLink></li><li><RouterLink to="#stockage">Stockage</RouterLink></li><li><RouterLink to="#moderniser-avec-vuejs">Moderniser avec VueJS</RouterLink></li><li><RouterLink to="#creation-des-api">Création des API</RouterLink><ul><li><RouterLink to="#les-api">Les API</RouterLink></li><li><RouterLink to="#l-api-pour-lister-les-taches-liste-php">L’API pour lister les tâches : liste.php</RouterLink></li><li><RouterLink to="#comment-proceder-pour-les-prochaines-api">Comment procéder pour les prochaines API</RouterLink></li><li><RouterLink to="#l-api-de-creation-creation-php">L’API de création: creation.php</RouterLink></li><li><RouterLink to="#l-api-pour-marquer-une-tache-comme-terminee-terminer-php">L’API pour marquer une tâche comme terminée : terminer.php</RouterLink></li><li><RouterLink to="#l-api-de-suppression-suppression-php">L’API de suppression : suppression.php</RouterLink></li><li><RouterLink to="#valider-le-fonctionnement-postman">Valider le fonctionnement : Postman</RouterLink></li><li><RouterLink to="#optimisation-du-code">Optimisation du code</RouterLink></li></ul></li><li><RouterLink to="#integration-de-vuejs">Intégration de VueJS</RouterLink><ul><li><RouterLink to="#creation-de-la-structure-de-«-futur-»-projet">Création de la structure de « futur » projet</RouterLink></li><li><RouterLink to="#conversion-du-template-existant">Conversion du template existant</RouterLink></li><li><RouterLink to="#ajout-de-la-librairie-vuejs">Ajout de la librairie VueJS</RouterLink></li><li><RouterLink to="#migration-des-fonctionnalites">Migration des fonctionnalités</RouterLink></li></ul></li><li><RouterLink to="#allez-plus-loin">Allez plus loin</RouterLink><ul><li><RouterLink to="#mettre-en-place-des-«-alertes-»">Mettre en place des « alertes »</RouterLink></li><li><RouterLink to="#ajouter-des-confirmations">Ajouter des confirmations</RouterLink></li><li><RouterLink to="#utiliser-l-api-de-partage">Utiliser l&#39;API de partage</RouterLink></li><li><RouterLink to="#ajouter-des-regles-de-reecriture">Ajouter des règles de réécriture</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="recuperation-et-installation-des-sources" tabindex="-1"><a class="header-anchor" href="#recuperation-et-installation-des-sources" aria-hidden="true">#</a> Récupération et installation des sources</h2>
<p>Avant de commencer à travailler, il faut récupérer le code source de l’application existante. Le projet est disponible sur Github : <a href="https://github.com/c4software/php-todo/archive/v1.1.zip" target="_blank" rel="noopener noreferrer">télécharger les sources<ExternalLinkIcon/></a></p>
<ul>
<li>Faire « fonctionner » l’application en local, une fois installée, celle-ci doit ressembler à :</li>
</ul>
<p><img src="https://github.com/c4software/php-todo/raw/master/sample.png" alt="Exemple"></p>
<ul>
<li>Étudier le fonctionnement du code source actuel. (créer des tâches, etc.)</li>
</ul>
<h2 id="liste-des-fonctionnalites" tabindex="-1"><a class="header-anchor" href="#liste-des-fonctionnalites" aria-hidden="true">#</a> Liste des fonctionnalités</h2>
<p>Voilà la liste des fonctionnalités de l’application existante :</p>
<ul>
<li>Liste des tâches.</li>
<li>Ajout de tâche.</li>
<li>Suppression de tâche.</li>
<li>Marquer comme terminé une tâche.</li>
</ul>
<h2 id="stockage" tabindex="-1"><a class="header-anchor" href="#stockage" aria-hidden="true">#</a> Stockage</h2>
<p>Lors de votre étude du code, vous avez dû vous rendre compte que l’application utilisait la variable <code>$_SESSION</code> pour stocker les « tâches ».</p>
<p>La SESSION étant non persistante, dans du vrai code il ne faut en <code>aucun cas</code> stocker des données comme des tâches dedans (au risque de tout perdre…).</p>
<p>🔎 Au passage, regarder le fonctionnement de la SESSION en utilisant plusieurs navigateurs.</p>
<h2 id="moderniser-avec-vuejs" tabindex="-1"><a class="header-anchor" href="#moderniser-avec-vuejs" aria-hidden="true">#</a> Moderniser avec VueJS</h2>
<p>Dans ce TP nous allons parcourir les différentes étapes de la migration de l’application (site web) « classique » en version « moderne » à savoir avec VueJS.</p>
<h2 id="creation-des-api" tabindex="-1"><a class="header-anchor" href="#creation-des-api" aria-hidden="true">#</a> Création des API</h2>
<p>Quand on réalise une application « moderne », il est très difficile d’échapper au client-serveur. Dans notre cas la partie serveur va être réalisée en PHP, mais il est possible de la faire dans n’importe quel langage. En entreprise vous serez souvent confronté à du PHP/Java/Python/RoR. Mais la liste est infinie. Il est même possible de faire des API en Bash… Bref le choix est infini.</p>
<h3 id="les-api" tabindex="-1"><a class="header-anchor" href="#les-api" aria-hidden="true">#</a> Les API</h3>
<p>Notre cas étant simple, chaque API sera en réalité un fichier PHP qui se chargera de faire l’action voulue. Exemple :</p>
<ul>
<li>liste.php</li>
<li>creation.php</li>
<li>suppression.php</li>
<li>terminer.php</li>
</ul>
<p>Dans un nouveau dossier (version VueJS du site Web), ajouter un dossier <code>api</code> puis créer les <code>4</code> fichiers dans le dossier, nous les complèterons dans la suite du TP.</p>
<h3 id="l-api-pour-lister-les-taches-liste-php" tabindex="-1"><a class="header-anchor" href="#l-api-pour-lister-les-taches-liste-php" aria-hidden="true">#</a> L’API pour lister les tâches : liste.php</h3>
<p>L’API « liste » doit retourner un JSON. Le JSON retourné est une représentation au format texte des valeurs contenues dans la variable <code>$_SESSION[&quot;todos&quot;]</code>.</p>
<p>Exemple de retour :</p>
<div class="language-JSON ext-JSON line-numbers-mode"><pre v-pre class="language-JSON"><code>[
  {&quot;contenu&quot;: &quot;Démo&quot;, &quot;termine&quot;: true},
  {&quot;contenu&quot;: &quot;Exemple&quot;, &quot;termine&quot;: false}
]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Voilà un exemple de code pour réaliser un fichier JSON en PHP :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
  <span class="token function">session_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">header</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"content-type: application/json"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// Vérifier si en $_SESSION["todos"] est bien un tableau</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">is_array</span><span class="token punctuation">(</span><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"todos"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"todos"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Rappel: Avant de pouvoir utiliser la session, vous devez faire un <code>session_start();</code></p>
<p>C’est à vous, réaliser votre première API.</p>
<h3 id="comment-proceder-pour-les-prochaines-api" tabindex="-1"><a class="header-anchor" href="#comment-proceder-pour-les-prochaines-api" aria-hidden="true">#</a> Comment procéder pour les prochaines API</h3>
<p>✋ En tant que développeur vous devez être malin (et fainéants…). Pour écrire les autres API, ne tentez pas de réinventer la roue, utiliser les exemples fournis dans le code actuel (dans le dossier <code>actions</code> par exemple).</p>
<h3 id="l-api-de-creation-creation-php" tabindex="-1"><a class="header-anchor" href="#l-api-de-creation-creation-php" aria-hidden="true">#</a> L’API de création: creation.php</h3>
<p>L’API « creation.php » va permettre la création de nouvelles « tâches », une fois l’ajout réalisé, celle-ci doit retourner un JSON permettant de savoir dans votre application si le traitement s’est bien passé. Cette API ne doit fonctionner qu’en POST.</p>
<p>Paramètre d’entrée :</p>
<table>
<thead>
<tr>
<th>Nom</th>
<th style="text-align:center">Type</th>
<th style="text-align:right">Méthode</th>
</tr>
</thead>
<tbody>
<tr>
<td>texte</td>
<td style="text-align:center">string</td>
<td style="text-align:right">POST</td>
</tr>
</tbody>
</table>
<p>Voici un exemple de code PHP :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token function">session_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">header</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"content-type: application/json"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Dans le cadre du traitement, vérifier si $_SESSION["todos"] est bien un tableau (is_array…)</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"todos"</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span><span class="token function">is_array</span><span class="token punctuation">(</span><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"todos"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"todos"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"texte"</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"texte"</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string double-quoted-string">""</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token variable">$todo</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"id"</span> <span class="token operator">=></span> <span class="token function">uniqid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"texte"</span> <span class="token operator">=></span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"texte"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"date"</span> <span class="token operator">=></span> <span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">"termine"</span> <span class="token operator">=></span> <span class="token constant boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// Sauvegarder dans la Session.</span>
  <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"todos"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token variable">$todo</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"id"</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$todo</span><span class="token punctuation">;</span>
  <span class="token comment">// Afficher un JSON</span>
  <span class="token keyword">echo</span> <span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"success"</span> <span class="token operator">=></span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
  <span class="token keyword">echo</span> <span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"success"</span> <span class="token operator">=></span> <span class="token constant boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>Retour :</p>
<p>Par exemple :</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Vous pouvez également utiliser les codes de retour HTTP pour indique l’état du résultat. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" target="_blank" rel="noopener noreferrer">Documentation<ExternalLinkIcon/></a></p>
<h3 id="l-api-pour-marquer-une-tache-comme-terminee-terminer-php" tabindex="-1"><a class="header-anchor" href="#l-api-pour-marquer-une-tache-comme-terminee-terminer-php" aria-hidden="true">#</a> L’API pour marquer une tâche comme terminée : terminer.php</h3>
<p>L’API « terminer.php » va changer l’état du flag « termine ». Vous devez retourner un JSON permettant à votre future application de s’avoir si le traitement c’est bien déroulé.</p>
<p>Paramètre d’entrée :</p>
<table>
<thead>
<tr>
<th>Nom</th>
<th style="text-align:center">Type</th>
<th style="text-align:right">Méthode</th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td style="text-align:center">string</td>
<td style="text-align:right">GET</td>
</tr>
</tbody>
</table>
<h3 id="l-api-de-suppression-suppression-php" tabindex="-1"><a class="header-anchor" href="#l-api-de-suppression-suppression-php" aria-hidden="true">#</a> L’API de suppression : suppression.php</h3>
<p>L’API « suppression » va permettre la suppression de la « tâche » passée en paramètre, <strong><em>uniquement</em></strong> les tâches dont le paramètre <code>termine == true</code> peuvent être terminée, dans tous les cas l’API doit retourner un JSON permettant de savoir dans votre application si le traitement c’est bien passé. L’API doit fonctionner en GET et en POST.</p>
<p>Contraintes :</p>
<ul>
<li>L’API doit fonctionner en GET et en POST.</li>
<li>Il est impossible de supprimer une tâche non terminée. <code>termine == true</code></li>
</ul>
<p>Paramètre d’entrée :</p>
<table>
<thead>
<tr>
<th>Nom</th>
<th style="text-align:center">Type</th>
<th style="text-align:right">Méthode</th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td style="text-align:center">string</td>
<td style="text-align:right">GET</td>
</tr>
</tbody>
</table>
<p>Par exemple :</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="valider-le-fonctionnement-postman" tabindex="-1"><a class="header-anchor" href="#valider-le-fonctionnement-postman" aria-hidden="true">#</a> Valider le fonctionnement : Postman</h3>
<p>Pour tester vos traitements, vous avez la possibilité d’utiliser le logiciel PostMan. PostMan va vous permettre de tester vos API simplement avec une interface graphique.</p>
<p>Téléchargez-le <a href="https://www.getpostman.com/" target="_blank" rel="noopener noreferrer">ici<ExternalLinkIcon/></a></p>
<p>Une fois installé, tester les appels à vos APIs pour valider le bon fonctionnement</p>
<ul>
<li>Valider le fonctionnement à chaque étape (Création, liste, terminer, suppression).</li>
</ul>
<h4 id="pour-l-api-creation" tabindex="-1"><a class="header-anchor" href="#pour-l-api-creation" aria-hidden="true">#</a> Pour l’API création</h4>
<p>Petite subtilité, pour l’API de création vous devez faire une requête en POST. Vous devez donc régler PostMan comme ça :</p>
<p><img src="@source/tp/vuejs/ressources/postman.png" alt="PostMan Démo configuration Post"></p>
<h4 id="pour-les-autres-api" tabindex="-1"><a class="header-anchor" href="#pour-les-autres-api" aria-hidden="true">#</a> Pour les autres API</h4>
<p>Pour les autres API (sauf liste), vous allez devoir envoyer un <code>id</code> en paramètre, avec PostMan c’est simple, voilà la configuration que vous allez devoir faire :</p>
<p><img src="@source/tp/vuejs/ressources/postman_get.png" alt="Postman Demo GET"></p>
<h3 id="optimisation-du-code" tabindex="-1"><a class="header-anchor" href="#optimisation-du-code" aria-hidden="true">#</a> Optimisation du code</h3>
<p>Après avoir réalisé vos 4 API, vous devez certainement avoir du code « dupliqué ». Modifier vos API pour créer des fonctions « utilitaires » permettant de réduire la duplication de code.</p>
<ul>
<li>Comment procédez-vous ?</li>
<li>Tester le fonctionnement à nouveau.</li>
</ul>
<h2 id="integration-de-vuejs" tabindex="-1"><a class="header-anchor" href="#integration-de-vuejs" aria-hidden="true">#</a> Intégration de VueJS</h2>
<p>Maintenant que nous avons créé les API nous allons pouvoir nous intéresser à la partie « J’intègre VueJS ».</p>
<p>Le déroulement des prochaines étapes va être le suivant :</p>
<ul>
<li>Intégrer la librairie VueJS dans le code existant.</li>
<li>Créer « un composant / objet » global qui va gérer l’application.</li>
<li>« Convertir » le code existant en code « VueJS » (le Foreach par exemple).</li>
</ul>
<p>Ne vous inquiétez pas, tout est détaillé dans les prochaines étapes :</p>
<p>Pour réaliser la suite du TP, nous allons avoir besoin des ressources suivantes :</p>
<ul>
<li><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">VueJS<ExternalLinkIcon/></a></li>
<li><a href="https://caniuse.com" target="_blank" rel="noopener noreferrer">CanIUse<ExternalLinkIcon/></a></li>
</ul>
<h3 id="creation-de-la-structure-de-«-futur-»-projet" tabindex="-1"><a class="header-anchor" href="#creation-de-la-structure-de-«-futur-»-projet" aria-hidden="true">#</a> Création de la structure de « futur » projet</h3>
<p>Maintenant que nous avons les API, nous allons pouvoir créer la structure de la « V2 ». La suite du TP va détailler le processus, mais voilà le rendu du projet que vous allez obtenir :</p>
<p><img src="@source/tp/vuejs/ressources/projet_migration.png" alt="Structure"></p>
<p>Vous pouvez dès à présent déplacer les différents fichiers, pour obtenir la même chose (surtout pour le dossier <code>public</code>).</p>
<h3 id="conversion-du-template-existant" tabindex="-1"><a class="header-anchor" href="#conversion-du-template-existant" aria-hidden="true">#</a> Conversion du template existant</h3>
<p>La première étape est de convertir le fichier <code>index.php</code>. Notre application 2.0, ne sera plus une application PHP classique, mais une application reposant sur un modèle Client &lt;-&gt; Serveur. Pour ça vous devez procéder à quelques ajustements dans le site Internet :</p>
<ul>
<li>Supprimer le fichier index.php (il n’est plus nécessaire).</li>
<li>Déplacer le template (dans le dossier template à la racine).</li>
<li>Renommer le template que vous avez déplacé en « index.html », ça va être la base de notre application.</li>
</ul>
<h3 id="ajout-de-la-librairie-vuejs" tabindex="-1"><a class="header-anchor" href="#ajout-de-la-librairie-vuejs" aria-hidden="true">#</a> Ajout de la librairie VueJS</h3>
<p>L’ajout de la librairie VueJS est simple, il suffit d’ajouter dans le « head » du index.html :</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Valider le fonctionnement grâce à la « Console de Développement » de votre Navigateur (touche F12 en général).</p>
<p>⚠️ Dans une optique développement sécurisé, il est préférable d’intégrer VueJS dans vos sources plutôt que de « linker » directement depuis Internet.</p>
<ul>
<li>Comment validez-vous le fonctionnement ?</li>
<li>Changer les sources, pour intégrer la librairie en local.</li>
</ul>
<h4 id="ajouter-un-script-pour-le-js" tabindex="-1"><a class="header-anchor" href="#ajouter-un-script-pour-le-js" aria-hidden="true">#</a> Ajouter un script pour le JS</h4>
<p>Ajouter avant la balise <code>&lt;/body&gt;</code> de l’index.html un nouveau script <code>main.js</code>, il contiendra le code nécessaire au fonctionnement de notre site Web.</p>
<p>😅 Vous devez bien évidement créer le fichier <code>main.js</code>.</p>
<h4 id="declarer-votre-premier-composant" tabindex="-1"><a class="header-anchor" href="#declarer-votre-premier-composant" aria-hidden="true">#</a> Déclarer votre premier composant</h4>
<p>Pour déclarer votre premier composant / objet VueJS, c’est simple il suffit de mettre dans le fichier <code>main.js</code> le code suivant :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">".container"</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li>Vérifier le bon fonctionnement en regardant la « Console de Développement ». Le « log » est-il visible ?</li>
</ul>
<h3 id="migration-des-fonctionnalites" tabindex="-1"><a class="header-anchor" href="#migration-des-fonctionnalites" aria-hidden="true">#</a> Migration des fonctionnalités</h3>
<p>Maintenant que nous avons notre base, nous allons pouvoir convertir l’application. Pour cela nous allons procéder par étape, chaque étape est directement liée aux différentes API que vous avez pu précédemment écrire.</p>
<p>L’ensemble de l’application va devenir « asynchrone », vous allez vite vous rendre compte que la migration va nécessiter beaucoup d’Ajax. Pour faire nos appels, nous utiliserons l’API « Fetch », celle-ci est intégrée dans l’ensemble des navigateurs récents, le bon réflexe est quand même d’aller voir le support de Fetch sur (<a href="https://caniuse.com/#search=fetch" target="_blank" rel="noopener noreferrer">Can i use<ExternalLinkIcon/></a>).</p>
<h4 id="decouverte-de-fetch" tabindex="-1"><a class="header-anchor" href="#decouverte-de-fetch" aria-hidden="true">#</a> Découverte de Fetch</h4>
<p>L'API Fetch fournit une interface JavaScript pour l'accès et la manipulation des parties du pipeline HTTP, comme les requêtes et les réponses. Cela fournit aussi une méthode globale fetch() qui procure un moyen facile et logique de récupérer des ressources à travers le réseau de manière asynchrone.</p>
<p>Ce genre de fonctionnalité était auparavant réalisé avec XMLHttpRequest. Fetch fournit une meilleure alternative qui peut être utilisée facilement par d’autres technologies comme Service Workers. Fetch fournit aussi un endroit unique et logique pour la définition d'autres concepts liés à HTTP comme CORS et les extensions d'HTTP.</p>
<p>(Source: MDM)</p>
<p>Le support de l'API Fetch peut être détecté en vérifiant l'existence de Headers, Request, Response ou fetch() sur la portée de Window ou de Worker.
Par exemple, vous pouvez faire cela dans votre script:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>fetch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Le support de Fetch est présent</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// Gérer le cas du non-support de fetch.</span>
  <span class="token comment">// Pour réduire le nombre de cas possible vous pouvez ajouter : https://github.github.io/fetch/ à votre projet</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Voici un EXEMPLE d’utilisation de Fetch :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/liste.php"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"GET"</span><span class="token punctuation">,</span> credentials<span class="token operator">:</span> <span class="token string">"same-origin"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// On décode le JSON, et on continue</span>
    <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// Votre retour est ICI</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Récupération impossible: "</span> <span class="token operator">+</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>⚠️ Que veux dire <code>credentials: 'same-origin'</code>? Par défaut, Fetch n’utilise pas les Cookies, vous pouvez forcer l’utilisation des cookies en indiquant <code>credentials: 'same-origin'</code>. Si vous ne le faites pas vos <code>$_SESSION</code> ne seront pas sauvegardées ⚠️</p>
<p>Tester le code précédent dans :</p>
<ul>
<li>Tester dès à présent cet appel dans la « Console développeur »</li>
</ul>
<p>Pour aller plus loin dans l’utilisation de Fetch, je vous recommande la lecture de <a href="https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch" target="_blank" rel="noopener noreferrer">la documentation complète (gestion des headers, paramètres, mode, etc.)<ExternalLinkIcon/></a></p>
<h4 id="liste-des-taches" tabindex="-1"><a class="header-anchor" href="#liste-des-taches" aria-hidden="true">#</a> Liste des tâches</h4>
<p>La liste des tâches est chargée dès l’arrivée sur la page « principale ». Vous devez donc écrire du code dans l’évènement « beforeMount » (pour rappel n’hésitez pas à consulter le <a href="https://vuejs.org/images/lifecycle.png" target="_blank" rel="noopener noreferrer">cycle de vie des composants<ExternalLinkIcon/></a>)</p>
<ul>
<li>Dans le fichier main.js, ajouter à l’objet Vue <code>beforeMount</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">".container"</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Pour l'instant nous allons mettre le code ici</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul>
<li>Ajouter le code suivant dans la partie <code>beforeMount</code></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/liste.php"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token operator">:</span> <span class="token string">"GET"</span><span class="token punctuation">,</span> credentials<span class="token operator">:</span> <span class="token string">"same-origin"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>taches <span class="token operator">=</span> response<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Récupération impossible: "</span> <span class="token operator">+</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul>
<li>Initialiser la variable taches dans l’objet VueJS, Exemple :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">'.container'</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> taches<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li>Ajouter l’affichage dans le « template ». Dans la page HTML vous allez devoir utiliser l’attribut <code>v-for</code>. Exemple :</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tache in taches<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{tache.texte}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Adapter l’exemple précédant pour afficher les tâches comme ils l’étaient dans la page en version PHP.</p>
<p><a href="https://fr.vuejs.org/v2/guide/list.html" target="_blank" rel="noopener noreferrer">Plus de détail sur la partie « rendu des listes »<ExternalLinkIcon/></a></p>
<ul>
<li>L’affichage est-il le même ?</li>
<li>Comment gérer le cas du chargement ? (dans le monde réel Internet peut-être lent…)</li>
<li>Comment gérer le cas de la liste vide ?</li>
</ul>
<h4 id="organisation-du-code" tabindex="-1"><a class="header-anchor" href="#organisation-du-code" aria-hidden="true">#</a> Organisation du code</h4>
<p>Déplacer le code actuellement dans <code>beforeMount</code> dans une nouvelle méthode appelée <code>recupererListe</code> :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token punctuation">[</span>…<span class="token punctuation">]</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">recupererListe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// …</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Remplacer le code dans le <code>beforeMount</code> pour appeler la méthode <code>recupererListe</code>.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">".container"</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">recupererListe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="ajout-d-une-tache" tabindex="-1"><a class="header-anchor" href="#ajout-d-une-tache" aria-hidden="true">#</a> Ajout d’une tâche</h4>
<p>Maintenant que la liste est affichée, vous allez pouvoir gérer le cas de l’ajout d’une nouvelle tâche. L’ajout va également être fait via un appel Ajax.</p>
<ul>
<li>Créer une méthode JavaScript, réalisant l’appel de l’API.</li>
</ul>
<p>⚠️ Attention: L’utilisateur devant être prévenu de l’aspect obligatoire du contenu, vous devez rendre la saisie obligatoire (contrôle de saisie, et/ou via <a href="https://sweetalert.js.org/guides/#cdn" target="_blank" rel="noopener noreferrer">librairie Sweetalert<ExternalLinkIcon/></a>) ⚠️</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token punctuation">[</span>…<span class="token punctuation">]</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">ajout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Pourquoi pas une variable dans « data », tout simplement pour simplifier « le TP ».</span>
      <span class="token keyword">var</span> contenu <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"texte"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>contenu <span class="token operator">==</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">swal</span><span class="token punctuation">(</span><span class="token string">"Oops"</span><span class="token punctuation">,</span><span class="token string">"Vous devez spécifier du texte…"</span> <span class="token punctuation">,</span> <span class="token string">"error"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token comment">// Appel de l’API avec Fetch (Ajax)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ul>
<li>Créer l’appel à l’API</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> form <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
form<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"texte"</span><span class="token punctuation">,</span> contenu<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"api/creation.php"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">"POST"</span><span class="token punctuation">,</span>
  body<span class="token operator">:</span> form<span class="token punctuation">,</span>
  credentials<span class="token operator">:</span> <span class="token string">"same-origin"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">recupererListe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// Gérer le cas d'erreur. Par exemple, afficher une Sweetalert pour le client.</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Récupération impossible: "</span> <span class="token operator">+</span> error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><ul>
<li>Rafraichir la liste des tâches, pour ça vous allez créer une 2nd méthode qui réalise l’appel Ajax de récupération de la liste. Une fois cette méthode faite, appeler la dans la partie <code>// traiter le retour</code>.</li>
<li>Optimiser votre code en remplaçant le code dans le <code>beforeMount</code> par un appel à la méthode que vous avez créée.</li>
</ul>
<p>Votre objet VueJS doit ressembler à quelque chose comme ça :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">".container"</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    taches<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">recupererListe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">ajout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">recupererListe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><ul>
<li>Appel de votre code dans le template. Maintenant que votre code est prêt, vous allez pouvoir l’appeler depuis votre template. Pour faire ça, vous allez utiliser <a href="https://vuejs.org/v2/guide/events.html" target="_blank" rel="noopener noreferrer">la gestion des évènements de VueJS<ExternalLinkIcon/></a> Exemple :</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">@submit.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ajout()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Tester votre code.</li>
<li>Tester l’ajout de tâche.</li>
<li>Tenter d’injecter du code. Que se passe-t-il ?</li>
</ul>
<h4 id="marquer-une-tache-comme-terminee" tabindex="-1"><a class="header-anchor" href="#marquer-une-tache-comme-terminee" aria-hidden="true">#</a> Marquer une tâche comme terminée</h4>
<p>Pour marquer une tâche comme terminée, vous allez devoir appeler l’api « terminer.php ». Cette API doit être appelée lors du clic sur l’icône qui a comme class « oi oi-check ».</p>
<ul>
<li>Utilisez-le <a href="https://fr.vuejs.org/v2/guide/events.html" target="_blank" rel="noopener noreferrer">v-on:click<ExternalLinkIcon/></a></li>
<li>Remplacer :</li>
</ul>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./actions/done.php?id={id}<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-success<span class="token punctuation">"</span></span>
  <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>oi oi-check<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span>
<span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Par</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>oi oi-check<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>terminer(todo.id)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Déclarer la méthode « terminer » dans votre objet VueJS. Faites l’appel à votre API.</li>
<li>L’objet VueJS doit maintenant ressemble à quelque chose comme ça :</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">".container"</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    taches<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">recupererListe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">ajout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">recupererListe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">terminer</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><ul>
<li>Ajouter le <a href="https://fr.vuejs.org/v2/guide/conditional.html" target="_blank" rel="noopener noreferrer">v-if<ExternalLinkIcon/></a> nécessaire à la règle suivante « uniquement les tâches non terminées peuvent être marquées comme terminées »</li>
<li>Tester le fonctionnement.</li>
<li>Valider que seulement les tâches marquées comme « non terminées » peuvent être terminées.</li>
</ul>
<h4 id="suppression-d-une-tache" tabindex="-1"><a class="header-anchor" href="#suppression-d-une-tache" aria-hidden="true">#</a> Suppression d’une tâche</h4>
<p>La suppression d’une tâche est très similaire à l’action « terminer.php ». Je vous laisse appliquer la méthodologie précédente.</p>
<p>Ne pas oublier la règle de gestion : « Une tâche non marquée comme terminée ne peut être supprimée. »</p>
<p>L’objet doit maintenant ressembler à (Le code que vous avez écrit en moins):</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">".container"</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    taches<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">recupererListe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">ajout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">recupererListe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">terminer</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">supprimer</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Votre code</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h4 id="optimisation" tabindex="-1"><a class="header-anchor" href="#optimisation" aria-hidden="true">#</a> Optimisation</h4>
<p>Comme vous l’avez certainement constaté, les deux dernières actions sont très similaires. Faites fusionner les deux actions en ajoutant par exemple un paramètre « action ». Ce paramètre vous permettra de savoir dans quel cas vous vous trouvez, je vous laisse écrire le code.</p>
<h2 id="allez-plus-loin" tabindex="-1"><a class="header-anchor" href="#allez-plus-loin" aria-hidden="true">#</a> Allez plus loin</h2>
<p>Quelques pistes pour aller plus loin dans le code :</p>
<h3 id="mettre-en-place-des-«-alertes-»" tabindex="-1"><a class="header-anchor" href="#mettre-en-place-des-«-alertes-»" aria-hidden="true">#</a> Mettre en place des « alertes »</h3>
<p>Vous n'avez certainement pas mis les messages en cas « d'erreur » comme indiqué aux différentes étapes, comme par exemple :</p>
<ul>
<li>En cas d'absence de texte au moment de la validation du formulaire.</li>
<li>En cas d'erreur de récupération des TODO par l'API.</li>
</ul>
<p>Pour ça vous pouvez utiliser <a href="https://sweetalert.js.org/guides/#cdn" target="_blank" rel="noopener noreferrer">librairie Sweetalert<ExternalLinkIcon/></a>.</p>
<h3 id="ajouter-des-confirmations" tabindex="-1"><a class="header-anchor" href="#ajouter-des-confirmations" aria-hidden="true">#</a> Ajouter des confirmations</h3>
<p>Ajout des confirmations avant les actions « marquer comme terminé » et l’action suppression.</p>
<h3 id="utiliser-l-api-de-partage" tabindex="-1"><a class="header-anchor" href="#utiliser-l-api-de-partage" aria-hidden="true">#</a> Utiliser l'API de partage</h3>
<p>Depuis quelques mois Chrom(e|ium) propose une nouvelle API nommée « Web Share Api », Cette API permet de déclencher « le Partage » d’une information en utilisant les possibilités natives du Téléphone. Comme cette API n’est disponible que sur un téléphone et uniquement en HTTPS vous devez tester si celle-ci est présente avec</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>share<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><a href="https://caniuse.com/#search=Web%20Share%20Api" target="_blank" rel="noopener noreferrer">Voir le support de Share<ExternalLinkIcon/></a></p>
<p>Mais comme nous sommes avec VueJS nous allons gérer ça avec le MVVM (Modèle Vue, Vue-Modèle), ça va nous permettre d’injecter une variable à la création de l’objet <code>app</code> pour connaitre si le partage est disponible. Exemple :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">'.container'</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Démarrage TODO-APP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
      taches<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      isShare<span class="token operator">:</span> navigator<span class="token punctuation">.</span>share <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Une fois fait, vous avez une variable <code>isShare</code> qui sera <code>True</code> Ou <code>False</code> en fonction du support du navigateur. Maintenant que le booléen est disponible vous pouvez ajouter un élément cliquable pour déclencher l’action (prendre exemple sur la suppression ou le marquer comme terminé). Exemple de code pour déclencher le partage :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>…<span class="token punctuation">]</span>
methods<span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function">share</span><span class="token punctuation">(</span><span class="token parameter">texte</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      navigator<span class="token punctuation">.</span><span class="token function">share</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        title<span class="token operator">:</span> <span class="token string">'VueJS-Todo'</span><span class="token punctuation">,</span>
        text<span class="token operator">:</span> texte<span class="token punctuation">,</span>
        url<span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">// TODO</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token comment">// TODO</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>C’est à vous !</p>
<h3 id="ajouter-des-regles-de-reecriture" tabindex="-1"><a class="header-anchor" href="#ajouter-des-regles-de-reecriture" aria-hidden="true">#</a> Ajouter des règles de réécriture</h3>
<p>Ajouter des règles de réécriture via un fichier .htaccess</p>
<p>Le fichier <code>.htaccess</code> exemple :</p>
<div class="language-apacheconf ext-apacheconf line-numbers-mode"><pre v-pre class="language-apacheconf"><code><span class="token directive-inline property">RewriteEngine</span> On
<span class="token directive-inline property">RewriteRule</span><span class="token regex"> ^api/ajouter$</span> api/ajouter.php <span class="token directive-flags keyword">[L,QSA]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Une fois les règles de réécriture faites, modifier les différents chemins (appel d’API) dans votre fichier JavaScript.</p>
</template>
