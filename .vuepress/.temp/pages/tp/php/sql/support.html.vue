<template><h1 id="complement-cours-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#complement-cours-base-de-donnees" aria-hidden="true">#</a> Complément Cours Base de données</h1>
<p>Nous allons maintenant voir la base de données via le PHP. La base de données est un élément important des systèmes d'information moderne.</p>
<details class="custom-container details"><summary>Table des matières</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#introduction">Introduction</RouterLink></li><li><RouterLink to="#php-et-les-base-de-donnees">PHP et les base de données</RouterLink></li><li><RouterLink to="#le-langage-sql">Le langage SQL</RouterLink></li><li><RouterLink to="#modeliser-la-base-de-donnees">Modéliser la base de données</RouterLink></li><li><RouterLink to="#les-contraintes">Les Contraintes</RouterLink></li><li><RouterLink to="#les-cardinalites">Les cardinalités</RouterLink></li><li><RouterLink to="#cles-etrangere-et-comportement">Clés étrangère et comportement</RouterLink></li><li><RouterLink to="#phpmyadmin">PHPMyAdmin</RouterLink></li><li><RouterLink to="#sql-le-langage-de-requetage">SQL : Le langage de requêtage</RouterLink></li><li><RouterLink to="#obtenir-des-donnees">Obtenir des données</RouterLink><ul><li><RouterLink to="#gerer-de-la-pagination">Gérer de la pagination</RouterLink></li><li><RouterLink to="#ordre-de-recuperation">Ordre de récupération</RouterLink></li><li><RouterLink to="#obtenir-de-donnees-de-plusieurs-tables">Obtenir de données de plusieurs tables</RouterLink></li></ul></li><li><RouterLink to="#ajouter-des-donnees">Ajouter des données</RouterLink></li><li><RouterLink to="#modifier-des-donnees">Modifier des données</RouterLink></li><li><RouterLink to="#supprimer-une-donnee">Supprimer une donnée</RouterLink></li><li><RouterLink to="#sql-et-php">SQL et PHP</RouterLink><ul><li><RouterLink to="#utils-db-php">utils/db.php</RouterLink></li></ul></li><li><RouterLink to="#requete-prepare-ou-requete-normal">Requête préparé ou requête normal ?</RouterLink></li><li><RouterLink to="#pratiquer">Pratiquer</RouterLink></li></ul></nav>
</details>
<div class="custom-container warning"><p class="custom-container-title">Un instant</p>
<p>La base de données est un vaste sujet. Nous avons ici une introduction à ce qu'il faut connaitre au minimum pour avancer dans nos différents projets.</p>
<p><RouterLink to="/cheatsheets/sql/">Voir l'aide mémoire SQL</RouterLink></p>
</div>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Une base de données va être en charge de sauvegarder et d'organiser les données pour qu'il soit utilisable. Nous avons actuellement deux types de bases de données :</p>
<ul>
<li>Relationnelle</li>
<li>Non Relationnelle</li>
</ul>
<p>Les bases de données relationnelles, est celle que l'on rencontre pour l'instant le plus, mais ça change petit à petit et vous rencontrerez très certainement (et très rapidement des BDD non relationnelles).</p>
<p>Pour faire simple, une base de données « Relationnelle », indique que la structure et les règles de validations de vos données seront portées par votre <strong>moteur de base de données</strong>.</p>
<p>Une base de données non relationnelle sera plus ouverte. Elle stocke de l'information sans forcément avoir de structure forte. Votre logique de données et la validation des éléments en base seront traitées par <strong>votre code</strong>.</p>
<p><img src="@source/tp/php/sql/res/server_bdd.png" alt="Serveur de base de données"></p>
<h2 id="php-et-les-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#php-et-les-base-de-donnees" aria-hidden="true">#</a> PHP et les base de données</h2>
<p>Dans le cours PHP, nous utiliserons des bases de données relationnelles, plus tard avec le JavaScript nous utiliserons des bases de données non relationnelles.</p>
<p>Il existe plusieurs systèmes de base de données (MySQL, Oracle, MariaDB, Postgresql, …). PHP est compatible avec presque tous les systèmes de base de données « connu » et ça par défaut ! Il intègre une API qui s'appelle <a href="https://www.php.net/manual/fr/book.pdo.php" target="_blank" rel="noopener noreferrer">PDO<ExternalLinkIcon/></a>, cette API est de base avec PHP, il suffit juste de l'utiliser.</p>
<div class="custom-container tip"><p class="custom-container-title">Petite note</p>
<p>Après avoir longtemps « stagné » le PHP, depuis quelques années change, s'adapte, se modernise. Les bonnes pratiques en PHP pour l'accès aux Bases de données (BDD) ont changé pour que celle-ci soit plus sécurisée.</p>
<p>Les exemples que vous pourriez trouver en ligne peuvent être pour la plupart « obsolète ». Je vous conseille vivement de regarder la documentation officielle, plutôt qu'une simple recherche Google.</p>
</div>
<p><img src="@source/tp/php/sql/res/pdo_mysqli.jpg" alt="PDO &amp; MYSQLi"></p>
<p>MySQL étant intégré à XAMPP / WAMP je vais l'utiliser dans la suite de mon cours. Mais rien ne vous empêche d'utiliser d'autre système tel que PostgreSQL.</p>
<h2 id="le-langage-sql" tabindex="-1"><a class="header-anchor" href="#le-langage-sql" aria-hidden="true">#</a> Le langage SQL</h2>
<p>Nous allons maintenant voir un gros sujet. Nous avons vu qu'il était possible de stocker des données dans des bases de données. Ces entrepôts de données sont le coeur de nos programmes modernes, tous les programmes que vous allez réaliser existent toujours pour afficher, traiter, emmagasiner de l'information ; cette donnée est le coeur de votre métier encore plus sur Internet.</p>
<p>Nous allons donc prendre un peu de temps, pour voir comment :</p>
<ul>
<li>Modéliser.</li>
<li>Sauvegarder.</li>
<li>Requêter.</li>
</ul>
<p>Nous allons donc modéliser les bases de données grâce à des MLD et nous récupèrerons / modifierons les données avec le langage SQL (le mot langage est important).</p>
<h2 id="modeliser-la-base-de-donnees" tabindex="-1"><a class="header-anchor" href="#modeliser-la-base-de-donnees" aria-hidden="true">#</a> Modéliser la base de données</h2>
<p>Modéliser une base de données est une étape très importante, elle fait partie intégrante de la phase de conception et <strong>elle ne doit surtout pas être négligée</strong>.</p>
<p>Cette étape de modélisation doit être faite avant chaque création d'une base de données, mais également lors de la modification de celle-ci, je pense qu'il est intéressant de faire ça en dehors d'un ordinateur avec une simple feuille de papier; vous pouvez bien évidemment utiliser un outil en ligne pour créer votre modélisation.</p>
<p>Cette modélisation s'appelle un <strong>MLD</strong> (Modèle Conceptuel de Données), ce MLD va regrouper l'ensemble de la structure de notre base de données (nom des tables, nom des colonnes, types de données), mais également les contraintes <strong>relationnelles</strong>, c'est-à-dire les contraintes entre les tables (nombre maximum, jointures, etc.)</p>
<p>Pour réaliser le MLD nous avons plusieurs solutions :</p>
<ul>
<li>Avec un papier et un crayon.</li>
<li><a href="https://dbdiagram.io/home" target="_blank" rel="noopener noreferrer">DBDiagram<ExternalLinkIcon/></a></li>
<li><a href="http://draw.io/" target="_blank" rel="noopener noreferrer">draw.io<ExternalLinkIcon/></a></li>
</ul>
<p>Avant d'aller plus loin, nous allons modéliser ensemble une première base de données très simple. Cette base de données sera la suivante :</p>
<ul>
<li>Des Utilisateurs (Identifiant, Nom, Prénom, Date de naissance, Sexe, Code Pays).</li>
<li>Des pays (Code Pays, Nom)</li>
</ul>
<p>Un MLD repose toujours sur le même principe, c'est un ensemble de « rectangle » relié ensemble par des traits.</p>
<table>
<thead>
<tr>
<th>Table</th>
</tr>
</thead>
<tbody>
<tr>
<td><u>#idTable (int)</u></td>
</tr>
<tr>
<td>nom (varchar)</td>
</tr>
<tr>
<td>prénom (varchar)</td>
</tr>
</tbody>
</table>
<p><em>Nous avons donc :</em></p>
<ul>
<li>Un rectangle.</li>
<li>En titre le nom de la table.</li>
<li>En dessous la liste des champs avec le type de la donnée.
<ul>
<li>L'élément souligné est une clé (également préfixé par un <code>#</code>)</li>
</ul>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Une clé ?</p>
<p>Une clé ou un identifiant sont une colonne que l'on va « marquer » comme étant particulière. Cette colonne va être utilisée par le moteur de base de données pour :</p>
<ul>
<li>Obligatoire.</li>
<li>Représente une valeur unique dans la base.</li>
<li>Effectuer des opérations sur la table (UPDATE, DELETE, …).</li>
<li>Permettre la jointure entre les tables.</li>
<li>Nommée correctement</li>
</ul>
<p>⚠️ Vous devez <strong>toujours</strong> avoir une clé ⚠️</p>
</div>
<p>Maintenant que nous avons posé la base, réfléchissons à notre problématique « Utilisateurs et Pays ».</p>
<details class="custom-container details"><summary>Voilà à quoi ça peut ressembler</summary>
<p><img src="@source/tp/php/sql/res/exemple_MLD.png" alt="Exemple de MLD"></p>
</details>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Ne vous inquiétez pas, nous allons nous entrainer de multiple fois.</p>
</div>
<p><img src="@source/tp/php/sql/res/mcd.png" alt="MCD"></p>
<h2 id="les-contraintes" tabindex="-1"><a class="header-anchor" href="#les-contraintes" aria-hidden="true">#</a> Les Contraintes</h2>
<ul>
<li>La clé primaire sert à identifier une ligne de manière unique.</li>
<li>La clé étrangère permet de gérer des relations entre plusieurs tables, <strong>et garantissent la cohérence des données.</strong></li>
<li>L'INDEX est utilisé pour accélérer les requêtes indispensable à la création de clés primaires et de clés étrangères.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Ne vous inquiétez pas, nous allons nous entrainer de multiple fois.</p>
</div>
<h2 id="les-cardinalites" tabindex="-1"><a class="header-anchor" href="#les-cardinalites" aria-hidden="true">#</a> Les cardinalités</h2>
<p>Les cardinalités seront les liens entre nos tables, elle vont dans les schémas relationnels en modélisation des données, sert à compter le nombre minimum et maximum de possibilités que chaque classe contient dans la relation liant deux ou plusieurs objets.</p>
<table>
<thead>
<tr>
<th style="text-align:center">Cardinalités</th>
<th style="text-align:center">Usages</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0..1</td>
<td style="text-align:center">Aucune ou une instance</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">Une instance exactement</td>
</tr>
<tr>
<td style="text-align:center">0..* ou *</td>
<td style="text-align:center">Aucune ou plusieurs instances</td>
</tr>
<tr>
<td style="text-align:center">1..*</td>
<td style="text-align:center">Une instance ou plusieurs (au moins une)</td>
</tr>
</tbody>
</table>
<h2 id="cles-etrangere-et-comportement" tabindex="-1"><a class="header-anchor" href="#cles-etrangere-et-comportement" aria-hidden="true">#</a> Clés étrangère et comportement</h2>
<p>Nous avons vu ensemble qu'il était possible de définir des liens entre les tables, c'est ce que l'on appelle des contraintes, les contraintes ont plusieurs comportements possibles en cas de modifications :</p>
<ul>
<li>NO ACTION</li>
<li>CASCADE</li>
<li>SET NULL</li>
<li>SET DEFAULT</li>
</ul>
<p>Il est possible de combiner CASCADE, SET NULL, SET DEFAULT et NO ACTION pour des tables liées par des relations.</p>
<p>Nous allons donc pouvoir définir le comportement que le moteur de base de données va avoir en cas de :</p>
<ul>
<li>Suppression (ON DELETE)</li>
<li>De mise à jour (ON UPDATE)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">L'objectif est l'intégrité des données</p>
<p>L'important dans une base de données relationnelle c'est de s'assurer que les données sont « cohérentes ». Le concept de comportement en cas de suppression est donc primordial.</p>
<p>Le moteur de base de données sera en charge de s'assurer que la donnée reste logique et cohérente en fonction des règles que <strong>vous</strong> avez définies lors de la conception de la base de données.</p>
</div>
<h2 id="phpmyadmin" tabindex="-1"><a class="header-anchor" href="#phpmyadmin" aria-hidden="true">#</a> PHPMyAdmin</h2>
<p>PHPMyAdmin est un outil qui va nous permettre d'administrer notre serveur de base de données. Celui-ci est intégré à votre serveur XAMPP, vu que c'est un site Internet il sera directement accessible par votre navigateur :</p>
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
<h2 id="sql-le-langage-de-requetage" tabindex="-1"><a class="header-anchor" href="#sql-le-langage-de-requetage" aria-hidden="true">#</a> SQL : Le langage de requêtage</h2>
<p>Nous avons un langage « universel » pour accéder / manipuler une base de données. Ce langage est découpé en 4 grandes catégories.</p>
<table>
<thead>
<tr>
<th>Catégorie</th>
<th>Mot-clé</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr>
<td>Définition d'une base</td>
<td><code>CREATE</code>, <code>ALTER</code>, <code>TRUNCATE</code>, <code>DROP</code>, <code>RENAME</code></td>
<td>Structure de la base</td>
</tr>
<tr>
<td>Manipulation des données</td>
<td><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>MERGE</code></td>
<td>Gestion des données en base</td>
</tr>
<tr>
<td>Transaction</td>
<td><code>COMMIT</code>, <code>ROLLBACK</code></td>
<td>Groupement d'opérations</td>
</tr>
<tr>
<td>Contrôle d'accès</td>
<td><code>GRANT</code>, <code>REVOKE</code></td>
<td>Droit d'accès aux données</td>
</tr>
<tr>
<td>Accès aux données</td>
<td><code>SELECT</code></td>
<td>Récupération d'enregistrements de table(s)</td>
</tr>
</tbody>
</table>
<h2 id="obtenir-des-donnees" tabindex="-1"><a class="header-anchor" href="#obtenir-des-donnees" aria-hidden="true">#</a> Obtenir des données</h2>
<p>Comme vu précédemment le SQL va nous permettre différentes opérations autour des tables de notre base données. Celle que nous allons nous servir le plus est « l'obtention de données ». L'obtention de données se réalise avec la commande.</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>La commande <code>SELECT</code> permet d'obtenir des données. Cette requête est très simple elle est <strong>toujours</strong> formée de la même manière à savoir :</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> quoi <span class="token keyword">FROM</span> votreTable <span class="token keyword">WHERE</span> condition<span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li><code>quoi</code> : Ce que vous souhaitez obtenir, <code>*</code> pour l'ensemble, sinon <code>nom_colonne</code> séparé par des virgules.</li>
<li><code>table</code> : La table que vous souhaitez requêter.</li>
<li><code>condition(s)</code> : La ou les condition(s) que vous souhaitez appliquer à votre récupération de données.</li>
</ul>
<p><em>Quelques exemples :</em></p>
<p>Avec une table telle que</p>
<table>
<thead>
<tr>
<th>#id</th>
<th>nom</th>
<th>prenom</th>
<th>age</th>
<th>pays</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Brosseau</td>
<td>Valentin</td>
<td>33</td>
<td>FR</td>
</tr>
<tr>
<td>2</td>
<td>Doe</td>
<td>John</td>
<td>14</td>
<td>US</td>
</tr>
<tr>
<td>3</td>
<td>Bernard</td>
<td>Michel</td>
<td>56</td>
<td>FR</td>
</tr>
</tbody>
</table>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- Récupère l'ensemble des utilisateurs</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> utilisateurs<span class="token punctuation">;</span>

<span class="token comment">-- Utilisateur de plus de 18ans</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> utilisateurs <span class="token keyword">WHERE</span> age <span class="token operator">></span> <span class="token number">18</span><span class="token punctuation">;</span>

<span class="token comment">-- Utilisateurs de plus de 18ans et de France</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> utilisateurs <span class="token keyword">WHERE</span> age <span class="token operator">></span> <span class="token number">18</span> <span class="token operator">AND</span> pays <span class="token operator">=</span> <span class="token string">"FR"</span><span class="token punctuation">;</span>

<span class="token comment">-- Nom et Prénom des Utilisateurs</span>
<span class="token keyword">SELECT</span> nom<span class="token punctuation">,</span> prenom <span class="token keyword">FROM</span> utilisateurs<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><table>
<thead>
<tr>
<th>Liste des opérateurs de conditions</th>
</tr>
</thead>
<tbody>
<tr>
<td>=</td>
</tr>
<tr>
<td>&gt;</td>
</tr>
<tr>
<td>&lt;</td>
</tr>
<tr>
<td>=&gt;</td>
</tr>
<tr>
<td>&gt;=</td>
</tr>
<tr>
<td>!=</td>
</tr>
<tr>
<td>BETWEEN</td>
</tr>
<tr>
<td>LIKE</td>
</tr>
<tr>
<td>IN</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">C'est à vous</p>
<ul>
<li>Nous allons maintenant créer notre première <code>base de données</code> et notre première <code>table</code> grâce à PHPMyAdmin.</li>
<li>Insérer un jeu de données fictif.</li>
<li>Réaliser des requêtes pour s'entrainer.</li>
</ul>
</div>
<h3 id="gerer-de-la-pagination" tabindex="-1"><a class="header-anchor" href="#gerer-de-la-pagination" aria-hidden="true">#</a> Gérer de la pagination</h3>
<p>Rapidement vous allez devoir faire des requêtes avec de la pagination, c'est-à-dire avec un nombre restreint de résultats pour gérer des choses que vous avez certainement déjà vu :</p>
<p><img src="@source/tp/php/sql/res/pagination.png" alt="Pagination exemple"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- Première page (0 à 10)</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> utilisateurs <span class="token keyword">LIMIT</span> <span class="token number">10</span> <span class="token keyword">OFFSET</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">-- Seconde page (10 à 20)</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> utilisateurs <span class="token keyword">LIMIT</span> <span class="token number">10</span> <span class="token keyword">OFFSET</span> <span class="token number">10</span><span class="token punctuation">;</span>

<span class="token comment">--- …</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="ordre-de-recuperation" tabindex="-1"><a class="header-anchor" href="#ordre-de-recuperation" aria-hidden="true">#</a> Ordre de récupération</h3>
<p>Trier les résultats est aussi également utile.</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- Trier page age croissante</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> utilisateurs <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> age <span class="token keyword">ASC</span><span class="token punctuation">;</span>

<span class="token comment">-- Trier page age décroissante</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> utilisateurs <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> age <span class="token keyword">DESC</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="obtenir-de-donnees-de-plusieurs-tables" tabindex="-1"><a class="header-anchor" href="#obtenir-de-donnees-de-plusieurs-tables" aria-hidden="true">#</a> Obtenir de données de plusieurs tables</h3>
<p>Votre données peut-être « découpée » dans plusieurs table afin d'éviter les doublons. Cette opération est <strong>très courante</strong> en SQL, en effet il est important de découper la données dans plusieurs tables pour éviter la redondances d'informations (comme vu ensemble précédemment).</p>
<p>Cette opération en SQL est appelé une <code>jointure</code>. Nous avons plusieurs façon de joindre les données</p>
<p><img src="@source/tp/php/sql/res/sql_join.png" alt="Jointure SQL"></p>
<div class="custom-container danger"><p class="custom-container-title">Trop de choix ?</p>
<p>Le choix dépend des données et des opérations que vous souhaitez faire. Mais sachez que dans 90% du temps ce que vous souhaiter faire c'est un <strong>LEFT JOIN</strong>.</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">C'est à vous</p>
<p>Nous allons à nouveau mettre en pratique. Nous allons créer une seconde table. Nous allons créer une table de <code>pays</code> elle contiendra la liste des pays en lien avec la table <code>utilisateurs</code> créé précédemment.</p>
<table>
<thead>
<tr>
<th>#code</th>
<th>nom</th>
<th>iso_code</th>
</tr>
</thead>
<tbody>
<tr>
<td>FR</td>
<td>France</td>
<td>FRA</td>
</tr>
<tr>
<td>DE</td>
<td>Allemagne</td>
<td>DEU</td>
</tr>
<tr>
<td>IT</td>
<td>Italie</td>
<td>ITA</td>
</tr>
</tbody>
</table>
<ul>
<li>Insérer une liste de pays suffisamment importante</li>
<li>Créer la requête qui permet d'afficher les informations du pays en plus de l'utilisateur</li>
</ul>
</div>
<h2 id="ajouter-des-donnees" tabindex="-1"><a class="header-anchor" href="#ajouter-des-donnees" aria-hidden="true">#</a> Ajouter des données</h2>
<p>Nous avons vu qu'il était possible d'ajouter des données via une interface graphique (PHPMyAdmin), mais bien évidemment notre code va également devoir ajouter des données. Les requêtes d'ajout de données s'appellent un <code>INSERT</code>, cette requête prend la forme suivante :</p>
<p><em>Ajout de certains champs</em>:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> utilisateurs <span class="token punctuation">(</span>nom<span class="token punctuation">,</span> prenom<span class="token punctuation">,</span> age<span class="token punctuation">)</span> <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'Test'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'Insert'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><em>Tout les champs</em>:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> utilisateurs <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">,</span><span class="token string">'Test'</span><span class="token punctuation">,</span><span class="token string">'Insert'</span><span class="token punctuation">,</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token string">'IT'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="modifier-des-donnees" tabindex="-1"><a class="header-anchor" href="#modifier-des-donnees" aria-hidden="true">#</a> Modifier des données</h2>
<p>Ce type de requête s'appelle un <code>UPDATE</code>, c'est également disponible directement dans PHPMyAdmin mais comme l'<code>INSERT</code> nous serons amené à le faire directement dans le code.</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">UPDATE</span> utilisateurs <span class="token keyword">SET</span> name <span class="token operator">=</span> <span class="token string">'valentin'</span> <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">'Valentin-Update'</span><span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> utilisateurs <span class="token keyword">SET</span> name <span class="token operator">=</span> <span class="token string">'Valentine'</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="supprimer-une-donnee" tabindex="-1"><a class="header-anchor" href="#supprimer-une-donnee" aria-hidden="true">#</a> Supprimer une donnée</h2>
<p>Pour supprimer une donnée il suffit de</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> utilisateurs <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">ATTENTION</p>
<p>Attention !!! Si vous oubliez le <strong>WHERE</strong> vous allez vider l'ensemble de la table. (Et aucun retour en arrière possible)</p>
</div>
<h2 id="sql-et-php" tabindex="-1"><a class="header-anchor" href="#sql-et-php" aria-hidden="true">#</a> SQL et PHP</h2>
<p>Nous allons maintenant écrire le code qui va nous permettre d'accéder à la base de données. En PHP, nous avons à notre disposition plusieurs connecteurs SQL (API).</p>
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
<div class="custom-container tip"><p class="custom-container-title">Nous venons d'écrire une `librairie`</p>
<p>Ce que vous venez d'écrire est une « librairie », vous allez pouvoir réutiliser ce code autant de fois que vous le souhaitez. Il est générique, vous n'avez plus qu'à le « copier / coller » dans vos différents projets nécessitant une base de données.</p>
</div>
<h2 id="requete-prepare-ou-requete-normal" tabindex="-1"><a class="header-anchor" href="#requete-prepare-ou-requete-normal" aria-hidden="true">#</a> Requête préparé ou requête normal ?</h2>
<p>Nous avons deux façons d'écrire les requêtes avec PDO :</p>
<ul>
<li>Les requêtes « classique ».</li>
<li>Et les requêtes préparées.</li>
</ul>
<p>Dans quel cas utiliser l'un, et dans quel cas utiliser l'autre ? C'est simple, vous avez des valeurs variables (paramètres, saisie utilisateur, etc.) ?</p>
<ul>
<li><strong>OUI</strong> : Requête préparée.</li>
<li><strong>NON</strong> : Requête classique.</li>
</ul>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token comment">// Requête préparée :</span>
<span class="token variable">$results</span> <span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$stmt</span><span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM phrases WHERE id = ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">22</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Paramètre qui va remplacer le « ? ».</span>
<span class="token variable">$results</span> <span class="token operator">=</span> <span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Requête classique</span>
<span class="token variable">$results</span> <span class="token operator">=</span> <span class="token variable">$pdo</span><span class="token operator">-></span><span class="token function">query</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"SELECT * FROM phrases"</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">fetchAll</span><span class="token punctuation">(</span><span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\</span>PDO</span><span class="token operator">::</span><span class="token constant">FETCH_ASSOC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="pratiquer" tabindex="-1"><a class="header-anchor" href="#pratiquer" aria-hidden="true">#</a> Pratiquer</h2>
<p>Nous allons maintenant mettre en pratique avec deux projets :</p>
<ul>
<li><RouterLink to="/tp/php/sql/tp5.html">Persister Bart en Base de données</RouterLink></li>
<li><RouterLink to="/tp/php/sql/tp6.html">Greta TV personnalisable</RouterLink></li>
</ul>
</template>
