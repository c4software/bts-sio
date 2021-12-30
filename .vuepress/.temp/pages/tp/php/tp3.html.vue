<template><h1 id="structurer-mon-code" tabindex="-1"><a class="header-anchor" href="#structurer-mon-code" aria-hidden="true">#</a> Structurer mon code</h1>
<p>Vous avez écrit du code oui… Mais il n'était pas forcément « bien organisé ». Je vous propose dans ce TP une façon d'organiser votre code qui vous permettra de vous organiser, quelles que soient les évolutions de votre projet.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Comme <RouterLink to="/tp/php/support.html#la-structure">je l'indiquai dans le cours</RouterLink> la structuration du code est un point <strong>très important</strong> voir même je pense central dans votre future métier de développeur informatique. C'est pour ça qui me semble important de créer un TP dédié à cette problématique.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>La structure que je vais vous proposer dans ce TP n'est évidement pas la réponse universelle. Elle répond à une problématique à un moment donné, il faut l'utiliser et la prendre avec du recule.</p>
</div>
<p>Pour réaliser ce TP, nous allons modifier votre projet <RouterLink to="/tp/php/tp2.html">« Bart » (celui avec plusieurs page)</RouterLink></p>
<h2 id="la-structure" tabindex="-1"><a class="header-anchor" href="#la-structure" aria-hidden="true">#</a> La structure</h2>
<p>Cette structure repose sur un point d'entrée unique pour l'ensemble des demandes pages. Dans ce point d'entrée, nous gèrerons les éléments communs à toutes les pages :</p>
<ul>
<li>La session / cookie.</li>
<li>Le login utilisateur.</li>
<li>Connexion à la base de données</li>
<li>Le routeur.</li>
<li>Et bien plus encore.</li>
</ul>
<p>Quelles différences avec avant ? Nous allons « juste » découper un peu plus votre travail. Et nous allons ajouter « un nouveau fichier », que l'on appellera à partir de maintenant le point d'entrée (entry point).</p>
<table>
<thead>
<tr>
<th style="text-align:center"><img src="@source/tp/php/res/organisation_structure.png" alt="Entry Point"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Représentation visuelle de l'organisation</td>
</tr>
</tbody>
</table>
<h2 id="creer-les-dossiers-et-les-fichiers" tabindex="-1"><a class="header-anchor" href="#creer-les-dossiers-et-les-fichiers" aria-hidden="true">#</a> Créer les dossiers et les fichiers</h2>
<p>Je vous laisse créer l'ensemble des dossiers et des fichiers en suivant l'organisation suivante :</p>
<p><img src="@source/tp/php/res/organisation_structure_dossier.png" alt="Organisation d'un point de vue dossier"></p>
<div class="custom-container tip"><p class="custom-container-title">c'est « juste la base »</p>
<p>Dans votre projet vous avez plus de fichiers, notamment des images, c'est fichiers sont à destination du navigateur. Ils sont donc à placer <strong>dans le dossier public</strong>.</p>
</div>
<h2 id="le-point-d-entree" tabindex="-1"><a class="header-anchor" href="#le-point-d-entree" aria-hidden="true">#</a> Le point d'entrée</h2>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token comment">// Démarrage de la session</span>
<span class="token function">session_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Affichage « de la partie haute » de votre site, commun à l'ensemble de votre site</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'common/header.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Pages autorisées (configuration à sortir dans un autre fichier PHP)</span>
<span class="token variable">$whitelist</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'home'</span><span class="token punctuation">,</span><span class="token string single-quoted-string">'bart'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Gestion de l'affichage de la page demandée</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'page'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">in_array</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'page'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token variable">$whitelist</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string double-quoted-string">"pages/"</span> <span class="token operator">.</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'page'</span><span class="token punctuation">]</span> <span class="token operator">.</span> <span class="token string single-quoted-string">'.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'pages/home.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Affichage de la partie basse de votre site, commun à l'ensemble de votre site.</span>
<span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'common/footer.php'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token delimiter important">?></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>Voilà, nous avons le code de notre « entry-point ». Un peu de détail :</p>
<ul>
<li>Le dossier <code>common</code> contiendra les éléments communs à l'ensemble de nos pages. (header, footer, fonctions, etc).</li>
<li>Les pages sont maintenant rangées dans le dossier <code>pages</code>.</li>
<li>La page incluse n'est pas libre ! Afin de sécuriser le code nous limitons l'include uniquement aux pages autorisées.
<ul>
<li>Si aucune page n'est fournie ou si celle-ci n'est pas autorisée, nous chargeons la page <code>home.php</code></li>
<li>Les liens entre vous pages seront différents. Ils seront sous la forme : <code>index.php?page=bart</code>, <code>index.php?page=page1</code>…</li>
</ul>
</li>
</ul>
<h2 id="le-header-et-le-footer" tabindex="-1"><a class="header-anchor" href="#le-header-et-le-footer" aria-hidden="true">#</a> Le Header et le Footer</h2>
<p>Contrairement à précédemment nous allons mettre un peu plus de code dans les fichiers <code>header.php</code> et <code>footer.php</code>. Ils vont maintenant contenir tout le code jusqu'au contenu. Si on découpe grossièrement la page, ça donnera quelque chose comme ça :</p>
<p><img src="@source/tp/php/res/structure_layout.jpg" alt="Layout du dossier"></p>
<p>Je ne connais pas <strong>votre code</strong>, mais avec le mien ça donne :</p>
<p><em>header.php</em> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token constant">DOCTYPE</span> html<span class="token operator">></span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string double-quoted-string">"en"</span><span class="token operator">></span>

<span class="token operator">&lt;</span>head<span class="token operator">></span>
    <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string double-quoted-string">"UTF-8"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>meta name<span class="token operator">=</span><span class="token string double-quoted-string">"viewport"</span> content<span class="token operator">=</span><span class="token string double-quoted-string">"width=device-width, initial-scale=1.0"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>title<span class="token operator">></span>Le générateur de punition<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>
    <span class="token operator">&lt;</span>link rel<span class="token operator">=</span><span class="token string double-quoted-string">"stylesheet"</span> href<span class="token operator">=</span><span class="token string double-quoted-string">"./public/main.css"</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>

<span class="token operator">&lt;</span>body<span class="token operator">></span>
    <span class="token operator">&lt;</span>header<span class="token operator">></span>
        <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string double-quoted-string">"./"</span><span class="token operator">></span>Le generateur de punitions<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>header<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><em>footer.php</em> :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token operator">&lt;</span>footer<span class="token operator">></span> Pied de page du site <span class="token operator">&lt;</span><span class="token operator">/</span>footer<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>

<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="les-pages" tabindex="-1"><a class="header-anchor" href="#les-pages" aria-hidden="true">#</a> Les pages</h2>
<p>Pour les pages, je vous laisse faire, c'est « juste le contenu de votre site ». Par exemple dans mon cas le code du fichier <code>home.php</code> est uniquement la partie form:</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"card"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>form action<span class="token operator">=</span><span class="token string double-quoted-string">"index.php?page=bart"</span> method<span class="token operator">=</span><span class="token string double-quoted-string">"post"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"form-group"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>label <span class="token keyword">for</span><span class="token operator">=</span><span class="token string double-quoted-string">"count"</span><span class="token operator">></span>Nombre de ligne <span class="token punctuation">:</span><span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">></span>
            <span class="token operator">&lt;</span>select name<span class="token operator">=</span><span class="token string double-quoted-string">"count"</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"form-control"</span><span class="token operator">></span>
                <span class="token operator">&lt;</span>option value<span class="token operator">=</span><span class="token string double-quoted-string">"10"</span><span class="token operator">></span><span class="token number">10</span><span class="token operator">&lt;</span><span class="token operator">/</span>option<span class="token operator">></span>
                <span class="token operator">&lt;</span>option value<span class="token operator">=</span><span class="token string double-quoted-string">"20"</span><span class="token operator">></span><span class="token number">20</span><span class="token operator">&lt;</span><span class="token operator">/</span>option<span class="token operator">></span>
                <span class="token operator">&lt;</span>option value<span class="token operator">=</span><span class="token string double-quoted-string">"50"</span><span class="token operator">></span><span class="token number">50</span><span class="token operator">&lt;</span><span class="token operator">/</span>option<span class="token operator">></span>
                <span class="token operator">&lt;</span>option value<span class="token operator">=</span><span class="token string double-quoted-string">"100"</span><span class="token operator">></span><span class="token number">100</span><span class="token operator">&lt;</span><span class="token operator">/</span>option<span class="token operator">></span>
                <span class="token operator">&lt;</span>option value<span class="token operator">=</span><span class="token string double-quoted-string">"1000"</span><span class="token operator">></span><span class="token number">1000</span><span class="token operator">&lt;</span><span class="token operator">/</span>option<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>select<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"form-group"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>label <span class="token keyword">for</span><span class="token operator">=</span><span class="token string double-quoted-string">"sentence"</span><span class="token operator">></span>Phrase à écrire <span class="token punctuation">:</span> <span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">></span>
            <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string double-quoted-string">"text"</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"form-control"</span> name<span class="token operator">=</span><span class="token string double-quoted-string">"sentence"</span> value<span class="token operator">=</span><span class="token string double-quoted-string">"Je ne copie pas le code de valentin"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string double-quoted-string">"submit"</span> value<span class="token operator">=</span><span class="token string double-quoted-string">"Générer la punition"</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string double-quoted-string">"btn btn-danger ma-auto"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>form<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Attention au lien</p>
<p>Comme évoqué dans le cours, le format des liens va changer ! Ils seront maintenant dynamiques via un paramètre <code>GET</code>. Pensez donc bien à changer vos différents liens.</p>
</div>
<h2 id="c-est-a-vous" tabindex="-1"><a class="header-anchor" href="#c-est-a-vous" aria-hidden="true">#</a> C'est à vous</h2>
<p>Je vous laisse modifier votre code pour que votre projet utilise cette nouvelle façon « de s'organiser ».</p>
<div class="custom-container tip"><p class="custom-container-title">Une remarque au passage</p>
<p>Cette façon de s'organiser est une première étape vers ce que nous appellerons pour l'instant une organisation en template. Les templates seront une manière de s'organiser qui nous évitera tout mélange PHP et HTML afin de se simplifier encore plus l'esprit.</p>
</div>
<h2 id="allons-plus-loin" tabindex="-1"><a class="header-anchor" href="#allons-plus-loin" aria-hidden="true">#</a> Allons plus loin.</h2>
<p>Maintenant que nous avons notre nouvelle structure en place, je vous laisse ajouter une nouvelle page « à propos » dans votre site :</p>
<ul>
<li>Créer la page.</li>
<li>Y mettre un contenu.</li>
<li>Ajouter un lien dans le pied de page.</li>
<li>Faire en sorte de pouvoir accéder à la page.</li>
</ul>
<h2 id="reecrire-les-url" tabindex="-1"><a class="header-anchor" href="#reecrire-les-url" aria-hidden="true">#</a> Réécrire les URL</h2>
<p>Nous avons vu que les liens ne sont pas très beaux. Avec Apache, il est possible de réécrire les liens pour rendre transparente l'opération.</p>
<p>Pour ça, il faut créer un fichier <code>.htaccess</code> avec comme contenu:</p>
<div class="language-htaccess ext-htaccess line-numbers-mode"><pre v-pre class="language-htaccess"><code>RewriteEngine On
RewriteCond %{REQUEST_URI} !index.php
RewriteRule (.*).html index.php?page=$1 [L,QSA]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Nous pouvons donc maintenant écrire :</p>
<ul>
<li>home.html (<code>index.php?page=home</code>)</li>
<li>bart.html (<code>index.php?page=bart</code>)</li>
<li>about.html (<code>index.php?page=about</code>)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Comment ça fonctionne ?</p>
<p>Nous avons donc une règle qui indique :</p>
<p><code>(.*).html</code> =&gt; <code>index.php?page=$1 [L,QSA]</code></p>
<p>Le <code>(.*).html</code> veut dire n'importe quel texte saisi avant le <code>.html</code> sera transformé en <code>index.php?page=$1</code>. <code>$1</code> étant « le n'importe quoi saisi avant le <code>.html</code>.</p>
</div>
<h2 id="toujours-plus-loin" tabindex="-1"><a class="header-anchor" href="#toujours-plus-loin" aria-hidden="true">#</a> Toujours plus loin</h2>
<p>Nous avons ici travaillé sur un format « minimaliste », une structure seulement des dossiers et une organisation saine des imbrications du code. Sachez qu'il est possible d'aller bien plus loin en mettant en place un design Patern connu et reconnu comme un standard en termes de développement.</p>
<p>Ce n'est pas l'idée tout de suite, mais sachez que <RouterLink to="/php/mvc/tp1.html">celui-ci est détaillé ici</RouterLink></p>
</template>
