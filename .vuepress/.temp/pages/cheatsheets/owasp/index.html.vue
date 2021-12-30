<template><h1 id="la-methode-owasp" tabindex="-1"><a class="header-anchor" href="#la-methode-owasp" aria-hidden="true">#</a> La méthode OWASP</h1>
<h3 id="comment-se-tenir-a-jour" tabindex="-1"><a class="header-anchor" href="#comment-se-tenir-a-jour" aria-hidden="true">#</a> Comment se tenir à jour ?</h3>
<p>Prévenir plutôt que guérir… Quelques sites à surveiller :</p>
<ul>
<li><a href="https://www.us-cert.gov/" target="_blank" rel="noopener noreferrer">US CERT (LA SOURCE)<ExternalLinkIcon/></a></li>
<li><a href="http://thehackernews.com/" target="_blank" rel="noopener noreferrer">The Hacker News<ExternalLinkIcon/></a></li>
<li><a href="https://www.zataz.com/" target="_blank" rel="noopener noreferrer">Zataz<ExternalLinkIcon/></a></li>
<li><a href="https://www.reddit.com/r/netsec/" target="_blank" rel="noopener noreferrer">Reddit NetSec<ExternalLinkIcon/></a></li>
<li><a href="https://www.nextinpact.com/" target="_blank" rel="noopener noreferrer">Next INpact<ExternalLinkIcon/></a> (~payant)</li>
<li>Google Actu</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Important</p>
<p>Vous êtes la première ligne d’informations !</p>
</div>
<h3 id="les-impacts-lies-a-la-securite" tabindex="-1"><a class="header-anchor" href="#les-impacts-lies-a-la-securite" aria-hidden="true">#</a> Les impacts liés à la sécurité</h3>
<p>La sécurité informatique dans une application c’est un « équilibre »</p>
<ul>
<li>Impact fonctionnel</li>
<li>Limitation de l’expérience utilisateur (UX)</li>
<li>Impact financier</li>
</ul>
<p><img src="@source/cheatsheets/owasp/res/expositions.png" alt="">
<img src="@source/cheatsheets/owasp/res/random.png" alt=""></p>
<h3 id="les-types-de-failles" tabindex="-1"><a class="header-anchor" href="#les-types-de-failles" aria-hidden="true">#</a> Les types de failles</h3>
<ul>
<li>L’humain (Social Engineering)</li>
<li>D'accès (physique)</li>
<li>Applicatif (Hack)</li>
<li>L’argent (jusqu’à quel montant une personne donne l’information ?)</li>
</ul>
<h3 id="le-social-engineering" tabindex="-1"><a class="header-anchor" href="#le-social-engineering" aria-hidden="true">#</a> Le Social Engineering</h3>
<p>Les gens sont souvent trop confiants. Il faut donc les former régulièrement à la sécurité.</p>
<p>Deux exemples en vidéo :</p>
<table>
<thead>
<tr>
<th style="text-align:center"><img src="@source/cheatsheets/owasp/res/sectf.png" alt="Exposition"></th>
<th style="text-align:center"><img src="@source/cheatsheets/owasp/res/call-recreation.png" alt="Random"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><a href="https://www.youtube.com/watch?v=-FSLaHKoCNE" target="_blank" rel="noopener noreferrer">Exemple SECTF à la DefCon<ExternalLinkIcon/></a></td>
<td style="text-align:center"><a href="https://share.vidyard.com/watch/i46XF6N6rpR9KMaorihFQw" target="_blank" rel="noopener noreferrer">Call Recreation (@5min, @11min30)<ExternalLinkIcon/></a></td>
</tr>
</tbody>
</table>
<h2 id="integrer-la-securite-a-toutes-les-etapes" tabindex="-1"><a class="header-anchor" href="#integrer-la-securite-a-toutes-les-etapes" aria-hidden="true">#</a> Intégrer la sécurité à toutes les étapes</h2>
<p>La sécurité c’est un état d’esprit à intégrer.</p>
<p>C’est <strong>votre métier</strong></p>
<p><img src="@source/cheatsheets/owasp/res/toutes_les_etapes.png" alt=""></p>
<h3 id="assurer-la-qualite" tabindex="-1"><a class="header-anchor" href="#assurer-la-qualite" aria-hidden="true">#</a> Assurer la qualité</h3>
<p>S'assurer d'une qualité continue du code avec :</p>
<ul>
<li>Des règles à connaitre (OWASP).</li>
<li>Des tests unitaires.</li>
<li>Une analyse automatique du code (SonarQube).</li>
</ul>
<h3 id="open-web-application-security-project-owasp" tabindex="-1"><a class="header-anchor" href="#open-web-application-security-project-owasp" aria-hidden="true">#</a> Open Web Application Security Project (OWASP)</h3>
<blockquote>
<p>Open Web Application Security Project (OWASP) est une communauté en ligne travaillant sur la sécurité des applications Web. Sa philosophie est d'être à la fois libre et ouverte à tous. Elle a pour vocation de publier des recommandations de sécurisation Web et de proposer aux internautes, administrateurs et entreprises des méthodes et outils de référence permettant de contrôler le niveau de sécurisation de ses applications Web.</p>
</blockquote>
<blockquote>
<p><em>Source: Wikipedia</em></p>
</blockquote>
<p><a href="https://owasp.org/" target="_blank" rel="noopener noreferrer">Site de Owasp<ExternalLinkIcon/></a></p>
<p>OWASP liste 10 grandes catégories de failles <strong>à connaitre</strong> :</p>
<h3 id="a1-injection" tabindex="-1"><a class="header-anchor" href="#a1-injection" aria-hidden="true">#</a> A1 - Injection</h3>
<p>Injection SQL, Shell...</p>
<p>Souvent la plus connue et la plus rencontrée :</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> client <span class="token keyword">WHERE</span> id<span class="token operator">=</span><span class="token string">'" . $_GET["id"] . "'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://exemple.com/liste?id='or '1'='1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">C'est la base de la sécurité</p>
<p>Vous trouverez cette exemple un peu partout. C'est le mauvais exemple en termes de sécurité !</p>
<p>Au passage, si vous écrivez :</p>
<div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$id</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'id'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$maRequete</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"SELECT * FROM client WHERE id='<span class="token interpolation"><span class="token punctuation">{</span><span class="token variable">$id</span><span class="token punctuation">}</span></span>'"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>⚠️ C'est aussi une faille, celle-ci est identique à la précédente.</p>
</div>
<h3 id="a2-violation-de-gestion-d-authentification-et-de-session" tabindex="-1"><a class="header-anchor" href="#a2-violation-de-gestion-d-authentification-et-de-session" aria-hidden="true">#</a> A2 - Violation de Gestion d’Authentification et de Session</h3>
<p>Risque de casser / usurper une authentification ou une session. Comprends notamment le vol de session ou la récupération de mots de passe.</p>
<p>Une session en paramètre GET == ⚠️. Si vous partagez le lien, n'importe qui pourra obtenir votre accès !</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://exemple.com/?jsessionid=A2938298D293
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="a3-cross-site-scripting-xss" tabindex="-1"><a class="header-anchor" href="#a3-cross-site-scripting-xss" aria-hidden="true">#</a> A3 - Cross-Site Scripting (XSS)</h3>
<p>Risque d'injection de contenu dans une page pour but de provoquer des actions non désirées dans celle-ci.</p>
<p>Les failles XSS sont particulièrement répandues parmi les failles de sécurités Web.</p>
<p>Exécution de code JavaScript sans validation. Le risque ici est qu'il est possible de changer le comportement initialement attendu pour en détourner le sens.</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>Votre Nom : <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nom<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Bonjour "</span> <span class="token operator">+</span> $_POST<span class="token punctuation">[</span><span class="token string">"nom"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="a4-references-directes-non-securisees-a-un-objet" tabindex="-1"><a class="header-anchor" href="#a4-references-directes-non-securisees-a-un-objet" aria-hidden="true">#</a> A4 - Références directes non sécurisées à un objet</h3>
<p>Accès à de la donnée en spécifiant un <code>id</code> directement par un paramètre non filtré.</p>
<p>C'est également quelque chose de très courant. Si vous attendez en paramètre un mode / un id, veillez à toujours contrôler si la ressource chargée correspond aux droits de l'utilisateur.</p>
<p>Si je change client par … admin ?</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://exemple.com/liste?mode=client
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> client <span class="token keyword">where</span> <span class="token keyword">mode</span><span class="token operator">=</span>?
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-php ext-php line-numbers-mode"><pre v-pre class="language-php"><code><span class="token variable">$stmt</span><span class="token operator">-></span><span class="token function">bindParam</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token variable">$mode</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Requête préparée</p>
<p>Vous noterez ici que nous avons une requête « préparé » ça n'empêche pas le danger…</p>
</div>
<h3 id="a5-mauvaise-configuration-securite" tabindex="-1"><a class="header-anchor" href="#a5-mauvaise-configuration-securite" aria-hidden="true">#</a> A5 - Mauvaise configuration Sécurité</h3>
<p>Corresponds aux failles de configuration liées aux serveurs Web, applications, base de données ou frameworks.</p>
<ul>
<li>Console d’administration disponible sans authentification en ligne.</li>
<li>Listage des répertoires (<a href="https://www.google.fr/search?dcr=0&amp;q=intitle%3A%22Index%20of%22" target="_blank" rel="noopener noreferrer">Exemple<ExternalLinkIcon/></a>)</li>
<li>Exemples de code non supprimés.</li>
<li>Application en debug.</li>
</ul>
<h3 id="a6-exposition-de-donnees-sensibles" tabindex="-1"><a class="header-anchor" href="#a6-exposition-de-donnees-sensibles" aria-hidden="true">#</a> A6 - Exposition de données sensibles</h3>
<p>Exposition de données sensibles comme les mots de passe, les numéros de carte de paiement ou encore les données personnelles et la nécessité de chiffrer ces données.</p>
<ul>
<li>Espace client sans SSL.</li>
<li>Mot de passe en claire (ou en MD5) dans la base de données.</li>
<li>Sauvegarde de données inutiles.</li>
</ul>
<h3 id="a7-manque-de-controle-d-acces-au-niveau-fonctionnel" tabindex="-1"><a class="header-anchor" href="#a7-manque-de-controle-d-acces-au-niveau-fonctionnel" aria-hidden="true">#</a> A7 - Manque de contrôle d’accès au niveau fonctionnel</h3>
<p>Failles liées aux contrôles d'accès de fonctionnalité.</p>
<ul>
<li>Page d’admin accessible avec un compte utilisateur.</li>
<li>Mode non filtré (similaire à l’exemple mode={client,admin}).</li>
</ul>
<h3 id="a8-falsification-de-requete-intersite-csrf" tabindex="-1"><a class="header-anchor" href="#a8-falsification-de-requete-intersite-csrf" aria-hidden="true">#</a> A8 - Falsification de requête intersite (CSRF)</h3>
<p>Failles liées à l’exécution de requêtes à l’insu de l’utilisateur.</p>
<ul>
<li>Rejeu de requête déjà joué.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Comment le bloquer ?</p>
<p>Ajouter un identifiant/jeton dans la requête, unique et non réutilisable. Intégré de base dans Laravel.</p>
</div>
<h3 id="a9-utilisation-de-composants-avec-des-vulnerabilites-connues" tabindex="-1"><a class="header-anchor" href="#a9-utilisation-de-composants-avec-des-vulnerabilites-connues" aria-hidden="true">#</a> A9 - Utilisation de composants avec des vulnérabilités connues</h3>
<p>Failles liées à l’utilisation de composants tiers vulnérables.</p>
<ul>
<li>CMS non à jour</li>
<li>Apache / Tomcat non patchés</li>
<li>Librairies XYZ non à jour</li>
</ul>
<h3 id="a10-redirections-et-renvois-non-valides" tabindex="-1"><a class="header-anchor" href="#a10-redirections-et-renvois-non-valides" aria-hidden="true">#</a> A10 - Redirections et Renvois Non Validés</h3>
<p>Les redirections et les renvois non validés sont une vulnérabilité profitant d’une faiblesse dans le code et dont l’objectif est de rediriger l’utilisateur sur une page malveillante</p>
<ul>
<li>Utilisation de votre site comme « masque » dans du phishing</li>
</ul>
<p><em>Exemple :</em></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://www.shop-vdt.com/login.php?goto=evil.com/login
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="mais-une-faille-c-est-quoi" tabindex="-1"><a class="header-anchor" href="#mais-une-faille-c-est-quoi" aria-hidden="true">#</a> Mais, une faille c’est quoi ?</h3>
<p><img src="@source/cheatsheets/owasp/res/faille.png" alt=""></p>
<p>L'idée d'OWASP, c'est de former pour comprendre les failles afin de ne plus les produire involontairement… Et surtout avec OWASP on parle de <strong>vulnérabilité, et non de risque</strong>.</p>
<h2 id="les-outils-owasp" tabindex="-1"><a class="header-anchor" href="#les-outils-owasp" aria-hidden="true">#</a> Les outils OWASP</h2>
<ul>
<li><a href="https://owasp.org/www-project-juice-shop/" target="_blank" rel="noopener noreferrer">OWASP Juice Shop (Formation, JavaScript)<ExternalLinkIcon/></a></li>
<li>WebGoat (Formation, Java)</li>
<li>WebScarab (Audit)</li>
<li>OWASP Testing guide (Guide pour voir le niveau de sécu)</li>
<li>OWASP Code Review guide (Méthode d’audit)</li>
</ul>
<h2 id="synthese-owasp" tabindex="-1"><a class="header-anchor" href="#synthese-owasp" aria-hidden="true">#</a> Synthèse OWASP</h2>
<p><img src="@source/cheatsheets/owasp/res/tableau.png" alt=""></p>
</template>
