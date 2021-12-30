<template><h1 id="bart-php-et-mysql" tabindex="-1"><a class="header-anchor" href="#bart-php-et-mysql" aria-hidden="true">#</a> Bart PHP et MySQL</h1>
<p>Vous aviez une session… Et bien maintenant, nous allons mettre en place une base de données ! Celle-ci nous permettra de sauvegarder <strong>de manière</strong> persistante les données de vos utilisateurs.</p>
<h2 id="premiere-etape-definir-le-besoin" tabindex="-1"><a class="header-anchor" href="#premiere-etape-definir-le-besoin" aria-hidden="true">#</a> Première étape définir le besoin</h2>
<p>Dans notre application nous souhaitons <strong>enregistrer</strong> les phrases saisies par les utilisateurs. Nous devons donc déterminer :</p>
<ul>
<li>Ce que nous allons sauvegarder (table)</li>
<li>Les données que nous allons enregistrer (colonnes)</li>
<li>Sous quel format (type de données)</li>
<li>Les informations rattachées à « la phrase enregistré ». (relation)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">C'est un métier la base de données</p>
<p>Concevoir une base de données est une chose qui peut-être complexe en fonction du projet. Il faut donc y passer du temps idéalement hors du code, voir même sur une feuille pour avoir les idées bien claires.</p>
</div>
<h2 id="concevoir-le-mcd" tabindex="-1"><a class="header-anchor" href="#concevoir-le-mcd" aria-hidden="true">#</a> Concevoir le MCD</h2>
<p>La première étape d'un développement avec une base de données est la conception d'un MCD. Le MCD va nous permettre de nous représenter visuellement l'ensemble des données ainsi que les relations entre les différentes tables.</p>
<p>Pour réaliser le MCD nous avons plusieurs solutions :</p>
<ul>
<li>Avec un papier et un crayon.</li>
<li><a href="https://dbdiagram.io/home" target="_blank" rel="noopener noreferrer">DBDiagram<ExternalLinkIcon/></a></li>
<li><a href="http://draw.io/" target="_blank" rel="noopener noreferrer">draw.io<ExternalLinkIcon/></a></li>
</ul>
<p>Pour moi, dans notre cas nous allons avoir :</p>
<ul>
<li>Une table : <strong>phrases</strong>.</li>
<li>4 colonnes : <strong>id</strong>, <strong>phrase</strong>, <strong>nombre</strong>, <strong>date</strong>, <strong>ip</strong>.</li>
</ul>
<p>Je vous laisse concevoir le MCD et déterminer le format des données.</p>
<details class="custom-container details"><summary>Voilà le résultat dans mon cas</summary>
<p><img src="@source/tp/php/sql/res/mcd.png" alt="MCD"></p>
</details>
<h2 id="transformer-le-mcd-en-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#transformer-le-mcd-en-base-de-donnees" aria-hidden="true">#</a> Transformer le MCD en Base de données</h2>
<p>En fonction de votre choix, nous avons deux solutions :</p>
<ul>
<li>Si vous avez choisi d'utiliser <a href="https://dbdiagram.io/home" target="_blank" rel="noopener noreferrer">dbdiagram.io<ExternalLinkIcon/></a> celui-ci, intègre « le script SQL » permettant de générer la base de données (via <em>Export</em>).</li>
<li>Si vous n'avez pas utilisé dbdiagram, nous allons utiliser l'interface de PhpMyAdmin pour créer notre base de données.</li>
</ul>
<p>L'autre solution, c'est d'écrire à la main le script SQL permettant de créer la base de données. C'est complètement possible, et avec l'habitude c'est également très rapide !</p>
<h3 id="phpmyadmin" tabindex="-1"><a class="header-anchor" href="#phpmyadmin" aria-hidden="true">#</a> PhpMyAdmin</h3>
<p>PhpMyAdmin est un outil qui va nous permettre d'administrer notre serveur de base de données. Celui-ci est intégré à votre serveur XAMPP, vu que c'est un site Internet il sera directement accessible par votre navigateur :</p>
<p><a href="http://localhost/phpmyadmin/" target="_blank" rel="noopener noreferrer">Accéder à PHPMyAdmin<ExternalLinkIcon/></a></p>
<p><img src="@source/tp/php/sql/res/phpmyadmin.png" alt="PhpMyAdmin"></p>
<p>L'interface de PHPMyAdmin est découpée en 3 morceaux :</p>
<p><em>La liste des bases de données</em>:</p>
<p><img src="@source/tp/php/sql/res/les_bdd.png" alt="Les BDD"></p>
<p><em>Les actions possibles</em>:</p>
<p><img src="@source/tp/php/sql/res/les_actions.png" alt="Les BDD"></p>
<p><em>La partie centrale sera différente en fonction de la page / actions (contenu, création, etc)</em>:</p>
<p><img src="@source/tp/php/sql/res/le_contenu.png" alt="Les BDD"></p>
<div class="custom-container tip"><p class="custom-container-title">Un instant</p>
<p>Avant d'aller plus loin, nous allons faire le tour ensemble de l'interface de phpMyAdmin. Pour découvrir quelques fonctionnalités.</p>
<p>👋 phpMyAdmin est très complet et permet de tout faire. <strong>Mais</strong> ce n'est pas le seul outil qui permet d'administrer une base de données, nous avons également :</p>
<ul>
<li><a href="https://www.mysql.com/fr/products/workbench/" target="_blank" rel="noopener noreferrer">MySQLWorkbench (gratuit)<ExternalLinkIcon/></a></li>
<li><a href="https://www.jetbrains.com/datagrip/features/" target="_blank" rel="noopener noreferrer">DataGrip (payant)<ExternalLinkIcon/></a></li>
<li><a href="https://dbeaver.io/" target="_blank" rel="noopener noreferrer">DBeaver (gratuit)<ExternalLinkIcon/></a></li>
</ul>
<p>D'ailleurs, je vous propose de tester DBeaver si ça vous dit.</p>
</div>
<h3 id="creer-votre-base-de-donnees-table" tabindex="-1"><a class="header-anchor" href="#creer-votre-base-de-donnees-table" aria-hidden="true">#</a> Créer votre base de données &amp; Table</h3>
<p>Maintenant que vous avez fait le tour des fonctionnalités de PHPMyAdmin nous allons créer notre <strong>première base de données</strong> 🎉. Comme je l'expliquais pendant le cours, notre serveur contient des Bases de données qui peuvent contenir de une à plusieurs centaines de tables.</p>
<p>Nous allons donc devoir dans un premier temps <strong>créer une base de données</strong> (bart) puis <strong>créer une table</strong> (phrases).</p>
<p>Nous allons le faire ensemble pour la première fois, mais voilà en vidéo comment vous devez procéder :</p>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/i3A6yZQLTYQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<div class="custom-container tip"><p class="custom-container-title">rappels</p>
<ul>
<li>Votre base de données doit se nommer : <code>bart</code>.</li>
<li>Votre table doit se nommer : <code>phrases</code>.</li>
</ul>
</div>
<div class="custom-container danger"><p class="custom-container-title">ATTENTION</p>
<p>Un projet === une base de données ! C'est comme les dossiers, ne mélanger pas tout. Et SURTOUT pas les données de différents sites.</p>
</div>
<p>✋ Au passage, regarder également avec DBeaver votre nouvelle base de données.</p>
<p>Attaquons maintenant la partie création de la table en elle-même. Vous allez voir c'est <strong>très très simple</strong>. Il suffit de saisir le nom de votre table dans le formulaire (je vous rappelle le nom de la table <code>phrases</code>).</p>
<p><img src="@source/tp/php/sql/res/create_table.png" alt="Create Table"></p>
<p>Une fois validé, celui-ci va vous demander de saisir les différentes colonnes de la table comme définie dans votre MCD (d'où l'importance de bien le créer au début).</p>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/SIEdalKnjV0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>Et voilà, votre table est maintenant créée nous allons pouvoir ajouter des données.</p>
<p><img src="@source/tp/php/sql/res/phrases_table.png" alt="Exemple de la Table"></p>
<div class="custom-container danger"><p class="custom-container-title">Je vous invite…</p>
<p>Je vous invite à chaque fois à regarder les requêtes générées par phpMyAdmin se sont les mêmes que vous pouvez écrire vous-même.</p>
</div>
<h3 id="ajouter-des-donnees-de-tests" tabindex="-1"><a class="header-anchor" href="#ajouter-des-donnees-de-tests" aria-hidden="true">#</a> Ajouter des données de tests</h3>
<p>Nous allons faire les premières insertions de données via PhpMyAdmin, comme je le disais en introduction l'ensemble des actions possibles sont regroupées dans le menu en haut :</p>
<p><img src="@source/tp/php/sql/res/actions_table.png" alt="Actions possibles sur la table"></p>
<p>Je vous laisse créer vous les premières données (menu « Insérer »). Une fois créée celle-ci seront disponible dans le menu « Parcourir ».</p>
<div class="custom-container danger"><p class="custom-container-title">Je vous invite…</p>
<p>Je vous invite à chaque fois à regarder les requêtes générées par phpMyAdmin se sont les mêmes que vous pouvez écrire vous-même, et que nous devrons écrire dans notre code PHP.</p>
</div>
<p><strong>C'est à vous</strong> !</p>
<h3 id="ecrire-les-requetes" tabindex="-1"><a class="header-anchor" href="#ecrire-les-requetes" aria-hidden="true">#</a> Écrire les requêtes</h3>
<p>Avant d'attaquer la partie « PHP », je vous propose d'écrire dans un premier temps les différentes requêtes…</p>
<ul>
<li>Le SELECT (obtenir l'ensemble de données).</li>
<li>l'INSERT (ajouter des données)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Rappels</p>
<p>Le SQL est un langage très puissant, il permet de faire énormément de choses. Nous sommes ici dans une introduction nous allons donc faire quelques requêtes simples seulement. L'idée étant « juste » de mettre en pratique.</p>
</div>
<details class="custom-container details"><summary>En manque d'idée ?</summary>
<h3 id="le-select" tabindex="-1"><a class="header-anchor" href="#le-select" aria-hidden="true">#</a> Le SELECT</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> phrases<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="l-insert" tabindex="-1"><a class="header-anchor" href="#l-insert" aria-hidden="true">#</a> L'INSERT</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> phrases <span class="token punctuation">(</span>phrase<span class="token punctuation">,</span> nombre<span class="token punctuation">,</span> <span class="token keyword">date</span><span class="token punctuation">,</span> ip<span class="token punctuation">)</span> <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">'Ceci est ma phrase'</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1609533688</span><span class="token punctuation">,</span> <span class="token string">'217.23.34.49'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></details>
<h2 id="acceder-a-la-bdd-depuis-le-php" tabindex="-1"><a class="header-anchor" href="#acceder-a-la-bdd-depuis-le-php" aria-hidden="true">#</a> Accéder à la BDD depuis le PHP</h2>
<p>C'est la partie qui nous intéresse… Nous allons maintenant écrire le code qui va nous permettre d'accéder à la base de données. En PHP, nous avons à notre disposition plusieurs connecteurs SQL (API).</p>
<ul>
<li>mysql_* (déprécié, n'existe plus, mais vous trouverez encore peut-être des exemples en ligne <strong>à éviter</strong>)</li>
<li>MySQLi (le remplacement de mysql_*)</li>
<li>PDO (PDO_MySQL)</li>
</ul>
<p>Nous avons donc deux possibilités, la différence entre les deux ? Il y en a plusieurs, mais PDO à un grand avantage c'est qu'il permet de changer simplement de base de données (via des connecteurs pour MariaDB, Oracle, …). À mon avis <strong>PDO</strong> est doit-être votre choix par défaut dans le cas d'un nouveau projet.</p>
<p><img src="@source/tp/php/sql/res/pdo_mysqli.jpg" alt="PDO vs MySQL"></p>
<p>Nous allons travailler intelligemment, nous allons utiliser les includes et les variables pour éviter de mettre le code de la connexion à la base de données dans chaque page de notre site.</p>
<p>Nous allons également « sortir » / « mettre » en variables les informations de connexion à notre base de données à savoir :</p>
<ul>
<li>l'IP du serveur de base de données.</li>
<li>Le login.</li>
<li>Le mot de passe.</li>
<li>Le nom de la base de données</li>
</ul>
<p>🔥 L'organisation est très importante ! Cette étape de « découpage » peut paraitre superflue, mais c'est là où se jouera votre réussite.</p>
<h3 id="utils-db-php" tabindex="-1"><a class="header-anchor" href="#utils-db-php" aria-hidden="true">#</a> utils/db.php</h3>
<p>Nous allons écrire dans ce fichier le code nous permettant de nous connecter à la base de données. Cette partie du code est fournie directement dans la documentation PHP… Comme je suis sympa, je vous fournis directement le code :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Cette partie est à customiser</span>
<span class="token variable">$server</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"localhost"</span><span class="token punctuation">;</span>
<span class="token variable">$db</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"bart"</span><span class="token punctuation">;</span>
<span class="token variable">$user</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"root"</span><span class="token punctuation">;</span>
<span class="token variable">$passwd</span> <span class="token operator">=</span> <span class="token string double-quoted-string">""</span><span class="token punctuation">;</span>
<span class="token comment">// Fin de la partie customisable</span>

<span class="token comment">// Cette partie est générique à l'ensemble de vos projets utilisant une base de données.</span>
<span class="token variable">$dsn</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"mysql:host=<span class="token interpolation"><span class="token variable">$server</span></span>;dbname=<span class="token interpolation"><span class="token variable">$db</span></span>"</span><span class="token punctuation">;</span>
<span class="token variable">$pdo</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PDO</span><span class="token punctuation">(</span><span class="token variable">$dsn</span><span class="token punctuation">,</span> <span class="token variable">$user</span><span class="token punctuation">,</span> <span class="token variable">$passwd</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>🔥 Et c'est tout ! Voilà, si vous utilisez un <code>include</code> du fichier <code>utils/db.php</code> votre code sera connecté à la base de données et vous pourrez réaliser des requêtes SQL.</p>
<div class="custom-container tip"><p class="custom-container-title">Nous avons écrit une `lib`</p>
<p>Ce que vous venez d'écrire est une « librairie », vous allez pouvoir réutiliser ce code autant de fois que vous le souhaitez. Il est générique, vous n'avez plus qu'à le « copier / coller » dans vos différents projets nécessitant une base de données.</p>
</div>
<p>C'est à vous, je vous laisse écrire le code dans votre projet.</p>
<h3 id="home-php" tabindex="-1"><a class="header-anchor" href="#home-php" aria-hidden="true">#</a> home.php</h3>
<p>Dans votre page d'accueil, vous avez actuellement un formulaire, nous allons ajouter « en plus », une liste des phrases précédemment écrite par les utilisateurs. Nous allons donc utiliser la requête de type <code>SELECT</code> qui nous retourne l'ensemble des informations présentes dans la base de données.</p>
<p>Avec PDO, faire ce genre d'opération va se résumer à 3 lignes de code :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// DANS l'index.php</span>
<span class="token comment">// ATTENTION ATTENTION : Cette ligne ne doit être mise qu'une seule fois.</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'./utils/db.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Dans home.php</span>
<span class="token comment">// Requêtes SQL que nous souhaitons jouer.</span>
<span class="token variable">$results</span> <span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">query</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM phrases"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">`$results`</p>
<p>La variable <code>$results</code> va contenir une structure semblable à :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Array
(
    [0] => Array
        (
            [phrase] => "Ceci est ma phrase"
            [nombre] => 1000
            [date] => 1609536464
            [ip] => "127.0.0.1"
        )
)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></div>
<p>Je vous laisse mettre en place le code dans votre projet plus précisément dans le fichier <code>home.php</code>. Nous allons procéder avec logique :</p>
<ul>
<li>Inclure le code de connexion à la base de données <code>utils/db.php</code> dans votre <code>index.php</code>.</li>
<li>Mettre le code permettant de faire une requête tel quel dans la page.</li>
<li>Afficher le contenu de la variable <code>$results</code> avec un <code>print_r($results);</code> (<strong>POUR TESTER SEULEMENT</strong>).</li>
<li>Parcourir les résultats et les afficher dans un <code>&lt;select&gt;&lt;/select&gt;</code> dans la page en utilisant une boucle de type <code>foreach</code>.</li>
</ul>
<p>C'est à vous.</p>
<h3 id="bart-php" tabindex="-1"><a class="header-anchor" href="#bart-php" aria-hidden="true">#</a> bart.php</h3>
<p>Dans la page <code>bart.php</code> celle qui affiche le tableau, nous allons mettre en place le code nous permettant d'ajouter des données dans la base de données. Je vous donne le code vous permettant d'ajouter une entrée en base de données.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Nous allons utiliser une requête de type « préparé ». Cette requête est particulier, elle est « sécurisée », c'est-à-dire que normalement il n'est pas possible de « forcer » l'ordinateur à exécuter autre chose que ce que vous aviez prévu.</p>
</div>
<p>Attention, je ne vous donne que ça. Je vous laisse écrire le code au bon endroit :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code>
<span class="token comment">// ATTENTION ATTENTION : Cette ligne ne doit être mise qu'une seule fois.</span>
<span class="token comment">// Dans notre cas elle est déjà dans l'index.php</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'./utils/db.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$sql</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"INSERT INTO phrases (phrase, nombre, date, ip) values(?, ?, ?, ?);"</span><span class="token punctuation">;</span>
<span class="token variable">$stmt</span><span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token variable">$sql</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token variable">$phrase</span><span class="token punctuation">,</span> <span class="token variable">$nombre</span><span class="token punctuation">,</span> <span class="token function">date</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"Y-m-d H:i:s"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token variable">$_SERVER</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'REMOTE_ADDR'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>🔥 Je vous laisse écrire le code au bon endroit. C'est à vous.</p>
<h2 id="evolution" tabindex="-1"><a class="header-anchor" href="#evolution" aria-hidden="true">#</a> Évolution</h2>
<p>Ajouter une nouvelle page dans votre site. Celle-ci doit :</p>
<ul>
<li>Respecter le design actuel.</li>
<li>Afficher les valeurs actuellement en base à l'aide d'un tableau.</li>
<li>Votre tableau doit être paginé (LIMIT, OFFSET) via la requête SQL.</li>
</ul>
<p>C'est à vous.</p>
</template>
