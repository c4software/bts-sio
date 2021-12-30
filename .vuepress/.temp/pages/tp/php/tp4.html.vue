<template><h1 id="utiliser-la-session" tabindex="-1"><a class="header-anchor" href="#utiliser-la-session" aria-hidden="true">#</a> Utiliser la session</h1>
<p>Nous avons des informations, mais celle-ci est pour l'instant perdue « à chaque rafraichissement »… C'est dommage d'autant plus qu'en PHP sauvegarder des informations c'est simple comme bonjour.</p>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#sauvegarder-dans-la-session">Sauvegarder dans la session</RouterLink><ul><li><RouterLink to="#demarrer-la-sesion">Démarrer la sesion</RouterLink></li><li><RouterLink to="#utiliser-la-session-1">Utiliser la session</RouterLink></li><li><RouterLink to="#c-est-a-vous">C&#39;est à vous</RouterLink></li></ul></li><li><RouterLink to="#sauvegarder-dans-un-cookie">Sauvegarder dans un cookie</RouterLink><ul><li><RouterLink to="#c-est-a-vous-1">C&#39;est à vous</RouterLink></li></ul></li><li><RouterLink to="#utiliser-la-session-pour-creer-une-page-«-protege-»">Utiliser la session pour créer une page « Protégé »</RouterLink><ul><li><RouterLink to="#creer-la-page">Créer la page</RouterLink></li><li><RouterLink to="#verifier-l-authentification">Vérifier l&#39;authentification</RouterLink></li><li><RouterLink to="#afficher-le-formulaire-ou-le-message">Afficher le formulaire ou le message</RouterLink></li><li><RouterLink to="#gerer-la-deconnexion">Gérer la déconnexion</RouterLink></li><li><RouterLink to="#une-securite-bien-geree">Une sécurité bien gérée</RouterLink></li></ul></li></ul></nav>
</details>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>En PHP l'usage de la session est transparent, c'est à dire que vous n'avez pas vraiment à vous souciez du fonctionnement de celle-ci tout ce que vous devez retenir c'est que vos valeurs sont disponible dans les tableaux :</p>
<ul>
<li><code>$_SESSION</code></li>
<li><code>$_COOKIE</code></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Super-globales ?</p>
<p>C'est deux variables sont des <code>super-globales</code> elles sont donc toutes les deux en permanence disponible dans votre code, et sont automatiquement remplies dès le début du chargement de votre page.</p>
</div>
<p>La SESSION comme le COOKIE sont donc des variables « un peu magiques » qui vont vous permettre de sauvegarder des données entre chaque chargement de pages. Elles ont chacune un usage propre :</p>
<ul>
<li>La session servira pour des données temporaires. Les valeurs de la session sont sauvegardées <strong>sur le serveur</strong> (donc non modifiable par un utilisateur).</li>
<li>Le cookie servira plus pour de la sauvegarde de données « plus longue durée », mais non sensible. Exemple une préférence d'affichage, ou un identifiant permettant de suivre l'activité d'un utilisateur.</li>
</ul>
<h2 id="sauvegarder-dans-la-session" tabindex="-1"><a class="header-anchor" href="#sauvegarder-dans-la-session" aria-hidden="true">#</a> Sauvegarder dans la session</h2>
<p>L'utilisation de la SESSION est transparente, elle ne nécessite que le démarrage de celle-ci <strong>une seule fois</strong> et <strong>au début de votre page</strong> PHP. La fonction à appeler est :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token function">session_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">C'est tout</p>
<p>À partir de cet instant vous avez maintenant accès à la SESSION de l'utilisateur, si celle-ci n'existait pas elle a été créée pour vous. 🆒</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">Oui mais…</p>
<p>Il est également possible d'arrêter la SESSION pour détruire toutes les valeurs enregistrées. Cette opération se fait avec la fonction :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token function">session_destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette opération est à faire par exemple à la déconnexion de l'utilisateur sur votre site.</p>
</div>
<p>Dans le <RouterLink to="/tp/php/tp3.html">TP3</RouterLink> (<a href="/demo/php/bart/bart-form-structure.zip">Le code du TP3 est disponible ici</a>.), nous avions créé un « entry-point ». Ce point d'entrée (qui est une bonne pratique en termes de sécurité ! Pourquoi à votre avis ?) va-nous servir à démarrer la SESSION vous n'aurez comme plus à vous en soucier.</p>
<h3 id="demarrer-la-sesion" tabindex="-1"><a class="header-anchor" href="#demarrer-la-sesion" aria-hidden="true">#</a> Démarrer la sesion</h3>
<p>Pour ça, dans le fichier <code>index.php</code>, ajouter tout en haut, la ligne de code suivante :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token function">session_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">ATTENTION</p>
<p>Assurez-vous que cette ligne soit toujours la première de votre fichier.</p>
</div>
<h3 id="utiliser-la-session-1" tabindex="-1"><a class="header-anchor" href="#utiliser-la-session-1" aria-hidden="true">#</a> Utiliser la session</h3>
<p>Maintenant que notre SESSION est créée, vous pouvez :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token comment">// Écrire dedans</span>
<span class="token variable">$phrase</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'Je ne copie pas le code de valentin.'</span><span class="token punctuation">;</span>
<span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'phrase'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$phrase</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>

<span class="token comment">&lt;!-- Ou la lire, par exemple --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>text<span class="token punctuation">'</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"phrase"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span><span class="token punctuation">'</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>phrase<span class="token punctuation">'</span></span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Ou plus simplement --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>text<span class="token punctuation">'</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span><span class="token php language-php"><span class="token delimiter important">&lt;?=</span> <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"phrase"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span><span class="token punctuation">'</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>phrase<span class="token punctuation">'</span></span><span class="token punctuation">></span></span>


<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token comment">// Ou la lire, autre exemple</span>
<span class="token keyword">echo</span> <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"phrase"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// Ou faire des opérations algorithmiques, par exemple</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'phrase'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Il y a une session"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Il n'y a pas de valeur en session"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="c-est-a-vous" tabindex="-1"><a class="header-anchor" href="#c-est-a-vous" aria-hidden="true">#</a> C'est à vous</h3>
<p>Maintenant que nous avons revu les bases de l'utilisation de la session. Je vous propose de modifier le code que nous avons précédemment réalisé. Dans le code que vous avez réalisé / téléchargé nous avions créé un formulaire :</p>
<p><img src="@source/tp/php/res/form_bart.png" alt="Formulaire de choix pour le TP Bart"></p>
<p>Le formulaire est actuellement « non persisté », il est remis à zéro à chaque fois que vous accédez à votre site. C'est dommage… Je vous propose dans un premier temps de le persister via la SESSION.</p>
<p><em>Vous devez dans un premier temps définir les variables nécessaires :</em></p>
<table>
<thead>
<tr>
<th>Variables</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>$_SESSION['phrase']</code></td>
<td>Sauvegarde la phrase saisie par l'utilisateur</td>
</tr>
<tr>
<td><code>$_SESSION['count']</code></td>
<td>Sauvegarde le nombre choisi par l'utilisateur</td>
</tr>
</tbody>
</table>
<p>Maintenant que nous avons les noms de variables. Il faut trouver à quel moment sauvegarder les valeurs ?</p>
<p>Le bon moment est dans la page <code>bart.php</code>, cette page contient la logique d'exécution de votre code, il faudra donc dans cette page écrire quelque chose comme :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'phrase'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'phrase'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'count'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'count'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>La troisième, et dernière étape va être de relire les valeurs enregistrées dans la session afin de les utiliser dans votre formulaire, par exemple, si vous souhaitez afficher la valeur de <code>$_SESSION['phrase']</code> dans un <code>input</code>:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>text<span class="token punctuation">'</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"phrase"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token delimiter important">?></span></span><span class="token punctuation">'</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>phrase<span class="token punctuation">'</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Je vous laisse chercher pour le `select`</p>
<p>Pour le <code>select</code> la logique va être un peu similaire. Je vous laisse chercher comment écrire le code permettant de « pré-sélectionner » une option dans un <code>select</code>.</p>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select" target="_blank" rel="noopener noreferrer">Documentation<ExternalLinkIcon/></a></li>
</ul>
</div>
<h2 id="sauvegarder-dans-un-cookie" tabindex="-1"><a class="header-anchor" href="#sauvegarder-dans-un-cookie" aria-hidden="true">#</a> Sauvegarder dans un cookie</h2>
<p>Le Cookie fonctionne un peu comme la SESSION au détail près que vous enregistrez la valeur non pas sur le serveur, mais sur <strong>le poste de l'utilisateur</strong>. Ce détail <em>est important</em>, si vous stockez de l'information sur le poste du client, ça veut dire qu'il est possible pour lui de la modifier (nous allons voir comment ensemble).</p>
<p>L'autre différence entre la SESSION et les Cookies est la durée de vie de celle-ci, un cookie à une durée de vie que vous choisissez ! Ça peut aller de quelques secondes à plusieurs mois. À noter tout de même que le Cookie peut-être supprimé par le client.</p>
<p>Comme pour la session vous pouvez enregistrer ce que vous souhaitez dans un Cookie, cependant les données étant accessible par l'utilisateur je vous conseille de sauvegarder des informations non sensibles telles que :</p>
<ul>
<li>Paramétrage d'affichage.</li>
<li>Identifiant de trekking (uuid).</li>
<li>Données saisies par l'utilisateur (formulaire par exemple).</li>
</ul>
<p>Vous l'avez peut-être remarqué, votre modification précédente fonctionne correctement, mais si vous attendez plus de 22 minutes vos données sont quand même perdues. Nous allons résoudre cette problématique en utilisant un Cookie plutôt.</p>
<h3 id="c-est-a-vous-1" tabindex="-1"><a class="header-anchor" href="#c-est-a-vous-1" aria-hidden="true">#</a> C'est à vous</h3>
<p>Écrire &amp; lire dans un cookie est très simple, tout aussi simple que dans la session. Ici pas de démarrage à faire <strong>c'est automatique</strong> !</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>
<span class="token comment">// Enregistre une valeur</span>
<span class="token variable">$value</span> <span class="token operator">=</span> <span class="token string single-quoted-string">'Valeur de test'</span><span class="token punctuation">;</span>
<span class="token function">setcookie</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"monCookie"</span><span class="token punctuation">,</span> <span class="token variable">$value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setcookie</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"monCookie"</span><span class="token punctuation">,</span> <span class="token variable">$value</span><span class="token punctuation">,</span> <span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">3600</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/* expire dans 1 heure */</span>

<span class="token comment">// Récupération d'un cookie</span>
<span class="token keyword">echo</span> <span class="token variable">$_COOKIE</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"monCookie"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Je vous laisse modifier votre code précédent afin d'utiliser des COOKIES plutôt que la SESSION. Cette fois-ci pas d'aide, je vous laisse vous organiser.</p>
<h2 id="utiliser-la-session-pour-creer-une-page-«-protege-»" tabindex="-1"><a class="header-anchor" href="#utiliser-la-session-pour-creer-une-page-«-protege-»" aria-hidden="true">#</a> Utiliser la session pour créer une page « Protégé »</h2>
<p>Nous avons vu qu'il était possible assez simplement de sauvegarder des informations persistantes entre les rechargements avec une SESSION (ou un Cookie). Je vous propose de réfléchir à l'utilisation de la SESSION pour sauvegarder une authentification.</p>
<p>Nous allons sauvegarder des informations dans celle-ci pour sauvegarder la réussite d'un login utilisateur. Pour ça je vous propose de réaliser une nouvelle page PHP, celle-ci va contenir :</p>
<ul>
<li>Un formulaire</li>
<li>Un message indiquant « Bienvenue EMAIL » si la personne c'est connecté avec le bon « EMAIL &amp; MOT DE PASSE ».</li>
</ul>
<h3 id="creer-la-page" tabindex="-1"><a class="header-anchor" href="#creer-la-page" aria-hidden="true">#</a> Créer la page</h3>
<p>Bon ici pas d'aide, je pense que vous savez tous créer un fichier <code>.php</code>. Je vous laisse le créer (le nom importe peu).</p>
<div class="custom-container tip"><p class="custom-container-title">N'oubliez pas</p>
<p>Votre IDE intègre très certainement un template permettant la création du fichier en automatique. Exemple sous VSCode il suffit de saisir :</p>
<p><code>html:5</code> suivi de la touche <code>tab</code></p>
</div>
<p>Dans la page je vous propose de créer un simple formulaire. Pour le formulaire vous pouvez de <a href="https://getbootstrap.com/docs/4.0/components/forms/" target="_blank" rel="noopener noreferrer">vous inspirer de ceux proposés par Bootstrap<ExternalLinkIcon/></a></p>
<p><img src="@source/tp/php/res/form.png" alt="Exemple de formulaire"></p>
<div class="custom-container tip"><p class="custom-container-title">GET ou POST ?</p>
<p>À votre avis ? GET ou POST pour notre formulaire ?</p>
</div>
<h3 id="verifier-l-authentification" tabindex="-1"><a class="header-anchor" href="#verifier-l-authentification" aria-hidden="true">#</a> Vérifier l'authentification</h3>
<p>Pour vérifier l'authentification, nous allons rester simples (car ici l'objectif est de voir la SESSION rien de plus). Je vous propose de considérer une authentification valide si :</p>
<ul>
<li>Email == &quot;admin@exemple.com&quot;</li>
<li>Mot de passe == &quot;mdp&quot;</li>
</ul>
<p>Si nous écrivons « l'algo » de notre vérification d'authentification, ça va donner :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
SI email === "admin@exemple.com" ET mot_de_passe == "mdp" ALORS

    SAUVEGARDER_DANS_LA_SESSION[CONNECTE] = email

FIN SI

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Non !</p>
<p>Évidemment nous sommes d'accord <strong>c'est nul</strong> en termes de sécurité ! Vous ne devez JAMAIS « écrire en dur » un login mot de passe dans votre code.</p>
<p>=&gt; À votre avis pourquoi ?</p>
</div>
<ul>
<li>C'est à vous, je vous laisse écrire le code dans la page que vous avez précédemment créé.</li>
</ul>
<h3 id="afficher-le-formulaire-ou-le-message" tabindex="-1"><a class="header-anchor" href="#afficher-le-formulaire-ou-le-message" aria-hidden="true">#</a> Afficher le formulaire ou le message</h3>
<p>Maintenant que nous avons sauvegardé dans la SESSION le fait que la personne est connectée, je vous propose de conditionner l'affichage du formulaire ; celui-ci ne doit pas être visible si la personne est connectée (vous avez un exemple dans le code un peu plus haut).</p>
<p>Il faudra donc :</p>
<ul>
<li>Faire une condition (if) pour vérifier que l'élément est présent en SESSION.</li>
<li>Si présent =&gt; Affichage du message de bienvenue.</li>
<li>Si non présent =&gt; Affichage du formulaire de connexion.</li>
</ul>
<h3 id="gerer-la-deconnexion" tabindex="-1"><a class="header-anchor" href="#gerer-la-deconnexion" aria-hidden="true">#</a> Gérer la déconnexion</h3>
<p>À votre avis, comment allons-nous gérer la déconnexion ?</p>
<h3 id="une-securite-bien-geree" tabindex="-1"><a class="header-anchor" href="#une-securite-bien-geree" aria-hidden="true">#</a> Une sécurité bien gérée</h3>
<p>Pour tester, nous avons mis un login et un mot de passe en dur. Évidemment dans la vraie vie ce n'est pas comme ça que nous procèderons. Je vous laisse créer la base de données et la table permettant de sauvegarder un mot de passe <strong>en intégrant les notions de sécurité</strong>.</p>
<ul>
<li>Le mot de passe ne doit pas être en clair.</li>
<li>Ajouter dans le projet la connexion à la base de données.
<ul>
<li>Comment ?</li>
<li>Où ?</li>
</ul>
</li>
<li>Intégrer le code permettant de valider le mot de passe fourni par l'utilisateur.</li>
<li>Valider le bon fonctionnement avec un jeu d'essai.</li>
</ul>
</template>
