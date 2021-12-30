<template><h1 id="aide-memoire-sql" tabindex="-1"><a class="header-anchor" href="#aide-memoire-sql" aria-hidden="true">#</a> Aide mémoire SQL</h1>
<p>Aide mémoire sur le SQL. Vous retrouverez dans cet aide mémoire les éléments que nous avons vus ensemble.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Cet aide mémoire n'est pas exhaustif, elle ne contient que le minimum à connaitre pour débuter sereinement.</p>
</div>
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
<h2 id="obtenir-des-donnees-depuis-une-table" tabindex="-1"><a class="header-anchor" href="#obtenir-des-donnees-depuis-une-table" aria-hidden="true">#</a> Obtenir des données depuis <em>une table</em></h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> quoi <span class="token keyword">FROM</span> votreTable <span class="token keyword">WHERE</span> condition<span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li><code>quoi</code> : Ce que vous souhaitez obtenir, <code>*</code> pour l'ensemble, sinon <code>nom_colonne</code> séparé par des virgules.</li>
<li><code>table</code> : La table que vous souhaitez requêter.</li>
<li><code>condition(s)</code> : La ou les condition(s) que vous souhaitez appliquer à votre récupération de données.</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- Toutes le données de la table « t »</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t<span class="token punctuation">;</span>

<span class="token comment">-- Colonne « nom » et « age » pour l'ensemble des données de la table « t »</span>
<span class="token keyword">SELECT</span> nom<span class="token punctuation">,</span> age <span class="token keyword">FROM</span> t<span class="token punctuation">;</span>

<span class="token comment">-- Toutes le données de la table « t » respectant la condition</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t <span class="token keyword">WHERE</span> CONDITION<span class="token punctuation">;</span>

<span class="token comment">-- Dans la table « t » récupération de l'ensemble des enregistrements dont la colonne « age » est plus grand que 18.</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t <span class="token keyword">WHERE</span> age <span class="token operator">></span> <span class="token number">18</span><span class="token punctuation">;</span>

<span class="token comment">-- Dans la table « t » récupération de l'ensemble des enregistrements dont la colonne « age » est plus grand que 18 et ayant comme « country » FRA.</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t <span class="token keyword">WHERE</span> age <span class="token operator">></span> <span class="token number">18</span> <span class="token operator">AND</span> country <span class="token operator">=</span> <span class="token string">"FRA"</span><span class="token punctuation">;</span>

<span class="token comment">-- Calcul de l'age moyen Age moyen.</span>
<span class="token keyword">SELECT</span> <span class="token function">avg</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> <span class="token keyword">FROM</span> t<span class="token punctuation">;</span>

<span class="token comment">-- Récupération des données triées</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> age <span class="token keyword">ASC</span><span class="token punctuation">;</span>
<span class="token comment">-- Ou</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> age <span class="token keyword">DESC</span><span class="token punctuation">;</span>

<span class="token comment">-- Pagination des résultats</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> c1 <span class="token keyword">LIMIT</span> <span class="token number">10</span> <span class="token keyword">OFFSET</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">-- 10 premiers résultats</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> c1 <span class="token keyword">LIMIT</span> <span class="token number">10</span> <span class="token keyword">OFFSET</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">-- 10 suivants etc</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> t <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> c1 <span class="token keyword">LIMIT</span> <span class="token number">10</span> <span class="token keyword">OFFSET</span> <span class="token number">20</span><span class="token punctuation">;</span> <span class="token comment">-- etc</span>

<span class="token comment">-- Retourne la liste des dédoublonner des pays présent dans t.</span>
<span class="token keyword">SELECT</span> <span class="token keyword">distinct</span><span class="token punctuation">(</span>pays<span class="token punctuation">)</span> <span class="token keyword">FROM</span> t<span class="token punctuation">;</span>

<span class="token comment">-- Compter et Grouper, Affiche la répartition des utilisateurs par age.</span>
<span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span> age <span class="token keyword">FROM</span> t <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> age<span class="token punctuation">;</span>

<span class="token comment">-- Compter et Grouper, Affiche la répartition des utilisateurs par age pour les personnes de plus de 18ans</span>
<span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span> age <span class="token keyword">FROM</span> t <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> age <span class="token keyword">HAVING</span> age <span class="token operator">></span> <span class="token number">18</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h2 id="obtenir-des-donnees-depuis-plusieurs-tables" tabindex="-1"><a class="header-anchor" href="#obtenir-des-donnees-depuis-plusieurs-tables" aria-hidden="true">#</a> Obtenir des données depuis <em>plusieurs tables</em></h2>
<p><img src="@source/cheatsheets/sql/sql_join.png" alt="SQL Join"></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- Left join t1 and t2</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> c2
<span class="token keyword">FROM</span> t1
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> t2
<span class="token keyword">ON</span> t1<span class="token punctuation">.</span>id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- Left join t1 and t2</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> c2
<span class="token keyword">FROM</span> t1
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> t2
<span class="token keyword">ON</span> t1<span class="token punctuation">.</span>id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- Right join t1 and t2</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> c2
<span class="token keyword">FROM</span> t1
<span class="token keyword">RIGHT</span> <span class="token keyword">JOIN</span> t2
<span class="token keyword">ON</span> t1<span class="token punctuation">.</span>id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- full outer join</span>
<span class="token keyword">SELECT</span> c1<span class="token punctuation">,</span> c2
<span class="token keyword">FROM</span> t1
<span class="token keyword">FULL</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> t2
<span class="token keyword">ON</span> t1<span class="token punctuation">.</span>id <span class="token operator">=</span> t2<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">LEFT, RIGHT, INNER ?</p>
<p>Dans 90% du temps vous cherchez à faire un LEFT JOIN.</p>
<p><em>Exemple :</em></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span>
<span class="token keyword">FROM</span> videos
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> users
<span class="token keyword">ON</span> videos<span class="token punctuation">.</span>userId <span class="token operator">=</span> users<span class="token punctuation">.</span>id<span class="token punctuation">;</span> <span class="token comment">-- Join la clé étrangère userId avec la clé primaire id de la table users.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>Vous obtiendrez avec cette requête les données de la table vidéos avec en plus les informations de l'utilisateur associé.</strong></p>
</div>
<h2 id="gestion-des-donnees" tabindex="-1"><a class="header-anchor" href="#gestion-des-donnees" aria-hidden="true">#</a> Gestion des données</h2>
<h3 id="ajout" tabindex="-1"><a class="header-anchor" href="#ajout" aria-hidden="true">#</a> Ajout</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- Ajout de certains champs</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> utilisateurs <span class="token punctuation">(</span>nom<span class="token punctuation">,</span> prenom<span class="token punctuation">,</span> age<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'Test'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">'Insert'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token comment">-- En spécifiant l'ensemble des champs</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> utilisateurs <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">,</span><span class="token string">'Test'</span><span class="token punctuation">,</span><span class="token string">'Insert'</span><span class="token punctuation">,</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token string">'IT'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="mise-a-jour" tabindex="-1"><a class="header-anchor" href="#mise-a-jour" aria-hidden="true">#</a> Mise à jour</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- Met à jour l'ensemble des enregistrements en base pour la table utilisateur pour ceux ayant comme nom « Valentin »</span>
<span class="token keyword">UPDATE</span> utilisateurs <span class="token keyword">SET</span> name <span class="token operator">=</span> <span class="token string">'valentin-update'</span> <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">'Valentin'</span><span class="token punctuation">;</span>

<span class="token comment">-- Idem mais uniquement pour l'utilisateur ayant comme « id » 1</span>
<span class="token keyword">UPDATE</span> utilisateurs <span class="token keyword">SET</span> name <span class="token operator">=</span> <span class="token string">'Valentine'</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">ATTENTION</p>
<p>Attention !!! Si vous oubliez le <strong>WHERE</strong> vous allez modifier l'ensemble des données présent dans la table (Et aucun retour en arrière possible)</p>
</div>
<h2 id="suppression" tabindex="-1"><a class="header-anchor" href="#suppression" aria-hidden="true">#</a> Suppression</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> utilisateurs <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">ATTENTION</p>
<p>Attention !!! Si vous oubliez le <strong>WHERE</strong> vous allez vider l'ensemble de la table. (Et aucun retour en arrière possible)</p>
</div>
<h2 id="mot-de-passe-securite" tabindex="-1"><a class="header-anchor" href="#mot-de-passe-securite" aria-hidden="true">#</a> Mot de passe &amp; Sécurité</h2>
<div class="custom-container danger"><p class="custom-container-title">LES MOT NE DOIVENT PAS ÊTRE EN CLAIR</p>
<p>Vous ne devez <strong>JAMAIS</strong> avoir un mot de passe en clair en base de données.</p>
<p>Vous pouvez par exemple utiliser la fonction SQL <code>SHA2(&quot;VotreMotDePasse-SALT-SECRET&quot;, 512)</code>. Cela génèrera un mot de passe « hasher » équivalent au mot de passe.</p>
<p>Exemple d'insertion :</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token keyword">table</span> <span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">,</span> <span class="token string">'password'</span><span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">"valentin"</span><span class="token punctuation">,</span> SHA2<span class="token punctuation">(</span><span class="token string">"VotreMotDePasse-SALT-SECRET"</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Exemple de vérification si l'utilisateur existe :</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token keyword">table</span> <span class="token keyword">WHERE</span> <span class="token keyword">user</span> <span class="token operator">=</span> <span class="token string">"valentin"</span> <span class="token operator">AND</span> password <span class="token operator">=</span> SHA2<span class="token punctuation">(</span><span class="token string">"VotreMotDePasse-SALT-SECRET"</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>S’il y a un résultat, c'est que votre utilisateur existe et a fourni le bon mot de passe.</p>
</div>
<h2 id="sql-et-php" tabindex="-1"><a class="header-anchor" href="#sql-et-php" aria-hidden="true">#</a> SQL et PHP ?</h2>
<p>PHP intègre nativement le connecteur permettant d'attaquer les bases de données les plus connues, vous avez des exemples <RouterLink to="/cheatsheets/php/#le-php-et-la-base-de-donnees">d'utilisations disponibles ici</RouterLink></p>
</template>
