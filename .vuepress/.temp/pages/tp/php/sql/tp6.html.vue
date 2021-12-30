<template><h1 id="greta-tv-administrable" tabindex="-1"><a class="header-anchor" href="#greta-tv-administrable" aria-hidden="true">#</a> Greta TV - Administrable</h1>
<p>Dans ce TP nous allons mettre en pratique nos connaissances autour de la base de données. Nous allons mettre en place une base de données nous permettant de rendre administrable :</p>
<ul>
<li>La liste des vidéos.</li>
<li>Le thème en fonction de la vidéo.</li>
</ul>
<h2 id="premiere-etape-definir-le-besoin" tabindex="-1"><a class="header-anchor" href="#premiere-etape-definir-le-besoin" aria-hidden="true">#</a> Première étape définir le besoin</h2>
<p>La première étape dans tous les projets est la définition du besoin. Vous devez avec la personne qui vous demande une mission comprendre ce qu'il attend (moi en l'occurence dans ce projet). Je souhaite donc rendre administrable l'application Greta TV.</p>
<p>En effet, la première version de l'application est statique, nous avons utilisé le PHP pour intégrer des vidéos dans une page nommée <code>tv.php</code>. Cette page prend en paramètre un identifiant de vidéo, et potentiellement un thème si vous aviez intégré cette fonctionnalité.</p>
<p>Je souhaite que nous allions plus loin ! Notre application doit maintenant être administrable afin de rendre la liste des vidéos sur la page <code>index.php</code> dynamique en fonction <strong>de données présentes en base de données</strong>. En plus de cette interface dynamique, je souhaite que vous ajoutiez une page d'administration permettant l'ajout de lien dans la base de données.</p>
<p>Je résume le besoin à intégrer :</p>
<ul>
<li>Création d'une base de données avec la liste des liens à afficher.</li>
<li>Utilisation de la base de données sur la page d'accueil.</li>
<li>Utilisation de la base de données sur la page <code>tv.php</code> pour ne plus utiliser l'ID Google, mais l'identifiant interne de la vidéo à voir.</li>
<li>Création d'une page « d'admin » permettant l'ajout de vidéo. (Cette page ne sera pas accessible à tous).</li>
<li>Les vidéos <strong>doivent être</strong> lié à l'utilisateur actuellement connecté. (ça veux dire une clé étrangère).</li>
</ul>
<h2 id="creer-le-mcd" tabindex="-1"><a class="header-anchor" href="#creer-le-mcd" aria-hidden="true">#</a> Créer le MCD</h2>
<p>La première étape avant de commencer la création de la base de données est la réalisation du MCD. Je vous laisse travailler sur le sujet. Pour ma part j'ai défini <strong>deux tables</strong>.</p>
<div class="custom-container tip"><p class="custom-container-title">N'oubliez pas</p>
<p>N'oubliez pas les clés ! Un enregistrement de base de données <strong>doit posséder une clé unique</strong> (idéalement autogénéré comme vu ensemble).</p>
</div>
<p>C'est à vous ! Je vous laisse travailler le sujet.</p>
<h2 id="creer-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#creer-la-base-de-donnees" aria-hidden="true">#</a> Créer la base de données</h2>
<p>Maintenant que votre modèle de base de données est réalisé, nous allons passer à la création de la base de données à partir du MCD. Pour cette étape vous avez deux possibilités :</p>
<ul>
<li>Via phpMyAdmin</li>
<li>Via dbeaver</li>
</ul>
<p>Je vous laisse travailler. Je vous rappelle que <strong>vous devez mettre des clés</strong> pour vos enregistrements comme définis dans votre MCD.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Pour valider votre base de données, je vous laisse créer des données fictives. Réaliser cette opération directement via phpMyAdmin (ou dbeaver).</p>
</div>
<h2 id="inserer-un-jeu-de-test" tabindex="-1"><a class="header-anchor" href="#inserer-un-jeu-de-test" aria-hidden="true">#</a> Insérer un jeu de test</h2>
<p>Pour commencer nous allons insérer des données.</p>
<div class="custom-container danger"><p class="custom-container-title">LES MOT NE DOIVENT PAS ÊTRE EN CLAIR</p>
<p>Vous ne devez <strong>JAMAIS</strong> avoir un mot de passe en clair en base de données.</p>
<p>Vous pouvez par exemple utiliser la fonction SQL <code>SHA2(&quot;VotreMotDePasse-SALT-SECRET&quot;, 512)</code>. Cela génèrera un mot de passe « hasher » équivalent au mot de passe.</p>
<p>Exemple d'insertion :</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token keyword">table</span> <span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">,</span> <span class="token string">'password'</span><span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">"valentin"</span><span class="token punctuation">,</span> SHA2<span class="token punctuation">(</span><span class="token string">"VotreMotDePasse-SALT-SECRET"</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Exemple de vérification si l'utilisateur existe :</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token keyword">table</span> <span class="token keyword">WHERE</span> <span class="token keyword">user</span> <span class="token operator">=</span> <span class="token string">"valentin"</span> <span class="token operator">AND</span> password <span class="token operator">=</span> SHA2<span class="token punctuation">(</span><span class="token string">"VotreMotDePasse-SALT-SECRET"</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>S’il y a un résultat, c'est que votre utilisateur existe et a fourni le bon mot de passe.</p>
</div>
<h2 id="creer-la-page-«-d-administration-»" tabindex="-1"><a class="header-anchor" href="#creer-la-page-«-d-administration-»" aria-hidden="true">#</a> Créer la page « d'administration ».</h2>
<p>Afin de créer cette page d'administration, nous allons avoir besoin d'une page de connexion. En effet l'administration du site ne doit pas être ouverte à tous, seuls les gens possédant un compte peuvent administrer la liste des vidéos.</p>
<p>La page devant être protégée, vous devez mettre en place une mécanique comme :</p>
<p><img src="@source/tp/php/res/uml-connexion.png" alt="ceci est la mécanique de connexion"></p>
<h3 id="etape-1-creation-de-la-page-de-connexion" tabindex="-1"><a class="header-anchor" href="#etape-1-creation-de-la-page-de-connexion" aria-hidden="true">#</a> Étape 1 : Création de la page de connexion</h3>
<p>En vous inspirant de <RouterLink to="/cheatsheets/php/#gestion-basique-d-une-authentification-%C2%AB-simple-%C2%BB">l'aide mémoire PHP</RouterLink>, je vous laisse écrire le code permettant :</p>
<ul>
<li>D'afficher le formulaire de saisie des informations.</li>
<li>Vérifier que les valeurs saisie (en POST) sont correctes.</li>
<li>Redirigé vers la page de gestion de vidéos (<code>header('location: …');</code>)</li>
</ul>
<p>👹 N'oubliez pas l'organisation 👹 (nous allons ici créer que la <code>page</code> faisant le traitement).</p>
<div class="custom-container tip"><p class="custom-container-title">Deux solutions sont possibles</p>
<p>Pour gérer les droits d'accès vous avez deux solutions :</p>
<ul>
<li>Gérer les droits dans l'<code>index.php</code> pour avoir une <code>$whiteliste</code> différentes en fonction des droits. (c'est ma solution favorite).</li>
<li>Gérer les droits dans chaque page. (Risqué à mon sens).</li>
</ul>
</div>
<details class="custom-container details"><summary>Vous séchez pour la partie requête SQL ?</summary>
<p>Pour valider l'authentification, vous devez écrire quelque chose comme :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'login'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'password'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// Vérification si l'utilisateur existe</span>
        <span class="token variable">$stmt</span><span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM users WHERE login=? AND password=SHA2(?, 512)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'login'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'password'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token variable">$users</span> <span class="token operator">=</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// La personne existe en base de données (nous allons donc la connecter)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token variable">$users</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// Réussite de la connexion, on sauvegarde dans la SESSION les informations.</span>
            <span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'user'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$users</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// Sauvegarde le premier utilisateur</span>
            <span class="token function">header</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"location: / "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// Action en cas d'echec de connexion</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div></details>
<h3 id="ajouter-les-boutons-dans-la-barre" tabindex="-1"><a class="header-anchor" href="#ajouter-les-boutons-dans-la-barre" aria-hidden="true">#</a> Ajouter les boutons dans la barre</h3>
<p>Maintenant que nous avons la connexion d'effective. Nous allons ajouter dans la barre (navbar) deux boutons :</p>
<ul>
<li>Connexion</li>
<li>Déconnexion</li>
</ul>
<p>Les deux boutons doivent être affiché si l'utilisateur est connecté ou non, nous allons donc écrire :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_SESSION</span><span class="token punctuation">[</span><span class="token string double-quoted-string">"user"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// La session existe, nous sommes donc connecté</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"&lt;a href='index.php?page=logout'>Déconnexion&lt;/a>"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// Non connecté</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"&lt;a href='index.php?page=login'>Connexion&lt;/a>"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Où mettre le code ?</p>
<p>Je veux que les boutons s'affiche dans la NavBar. Donc le code doit-être… Dans la NavBar!</p>
</div>
<h3 id="etape-3-page-de-deconnexion" tabindex="-1"><a class="header-anchor" href="#etape-3-page-de-deconnexion" aria-hidden="true">#</a> Étape 3 : Page de déconnexion</h3>
<p>La page de déconnexion va avoir comme role de « supprimer la session ». Il faut donc créer une page, celle-ci contiendra au minimum le code suivant :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token function">session_destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>👀 Je vous laisse écrire la suite</p>
<h3 id="etape-4-creeer-la-page-de-gestion-des-videos" tabindex="-1"><a class="header-anchor" href="#etape-4-creeer-la-page-de-gestion-des-videos" aria-hidden="true">#</a> Étape 4 : Crééer la page de gestion des vidéos</h3>
<p>Pour la page de gestion des vidéos, je vous propose de réaliser une page ressemblant à ceci :</p>
<p><img src="@source/tp/php/sql/res/maquette.png" alt="Maquette"></p>
<p>Commencer par la réalisation de la page en HTML. Nous ajouterons par la suite les requêtes SQL.</p>
<h2 id="modifier-la-page-d-accueil-pour-utiliser-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#modifier-la-page-d-accueil-pour-utiliser-la-base-de-donnees" aria-hidden="true">#</a> Modifier la page d'accueil pour utiliser la base de données</h2>
<p>Modifier la page d'accueil de votre site afin de réaliser la requête SQL permettant de récupérer l'ensemble des vidéos présentes en base de données. Utiliser le résultat afin d'afficher les vidéos.</p>
<details class="custom-container details"><summary>Vous séchez ?</summary>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'./utils/db.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$results</span> <span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">query</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM videos"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// $results contient maintenant l'ensemble de vos vidéos présent en base de données. Pour l'afficher, il vous suffit de faire une boucle.</span>
<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></details>
<h2 id="modifier-la-page-tv-php-pour-utiliser-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#modifier-la-page-tv-php-pour-utiliser-la-base-de-donnees" aria-hidden="true">#</a> Modifier la page <code>tv.php</code> pour utiliser la base de données</h2>
<p>Pour cette étape vous avez deux solutions :</p>
<ul>
<li>Ne rien modifier, et continuer à utiliser l'ID de YouTube comme identifiant (<strong>ATTENTION</strong>, votre code est donc vulnérable à l'injection de paramètres !!).</li>
<li>Modifier, pour passer l'identifiant <strong>interne</strong> de la vidéo que vous souhaitez afficher. Cet identifiant vous permettra de faire une requête du type :</li>
</ul>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token comment">// L'utilisateur accède à =>  http://localhost/index.php?page=tv&amp;id=1</span>
    <span class="token variable">$stmt</span><span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM videos WHERE id = ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'id'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ID reçu en paramètre</span>
    <span class="token variable">$videos</span> <span class="token operator">=</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// La vidéo demandé n'existe pas.</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token variable">$videos</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// On redirige l'utilisateur vers la home</span>
        <span class="token function">header</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'location: ./'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// $video contient les informations de la vidéo à afficher</span>
    <span class="token variable">$video</span> <span class="token operator">=</span> <span class="token variable">$videos</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>

<span class="token comment">&lt;!-- La suite de votre page, celle qui affiche la vidéo --></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>C'est à vous !</p>
</template>
