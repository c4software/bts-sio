<template><h1 id="tp-securite" tabindex="-1"><a class="header-anchor" href="#tp-securite" aria-hidden="true">#</a> TP Sécurité</h1>
<p>Le meilleur moyen de comprendre la sécurisation d’une application / site Internet, c’est de …</p>
<ul>
<li>Passer des heures sur de la théorie ?</li>
<li>Passer des heures sur du code à vous ?</li>
<li>Passer des heures à tenter des intrusions ?</li>
<li>La réponse D ?</li>
</ul>
<h2 id="partie-1-les-injections-sql" tabindex="-1"><a class="header-anchor" href="#partie-1-les-injections-sql" aria-hidden="true">#</a> Partie 1 : Les injections SQL</h2>
<p>Avant d'utiliser WebGoat, nous allons nous focaliser sur la partie Injection SQL, pour ça nous allons utiliser le site <a href="https://www.hacksplaining.com/exercises/sql-injection" target="_blank" rel="noopener noreferrer">Hack Splaining<ExternalLinkIcon/></a>.</p>
<p>Celui-ci contient un bon « tutoriel » interactif permettant de tester et de se former au principe d’injections SQL.</p>
<h2 id="partie-2-les-xss" tabindex="-1"><a class="header-anchor" href="#partie-2-les-xss" aria-hidden="true">#</a> Partie 2 : Les XSS</h2>
<p>Voilà un exemple simple de XSS via un input non filtré.</p>
<Sample src="xss" />
<div class="custom-container danger"><p class="custom-container-title">Quoi faire ?</p>
<p>Ici, l'idée, est de trouver comment éxécuter du code via un simple chargement d'image ! Pour ça il faut connaître un peu le HTML et le fonctionnement des balises classique.</p>
<p>Une balise img, vous conaissez… Elle prend en paramètre un attribut <code>src</code>… ok ! Mais elle a également un autre attribut … nommé … <code>onload</code> cette attribut permet d'éxécuter du code quand la ressource (l'image) est chargé. Nous allons donc exploiter un code « mal écrit » pour charger du code JavaScript.</p>
<p>Pour ça, dans le champs de saisie, je vous propose de mettre:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>https://fakeimg.pl/300/" onload="alert('Coucou'); window.location='https://bit.ly/3Bpiela'"
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Que-ce passe-t-il ? Pourquoi ? Regardons le code source ensemble !</p>
</div>
<h3 id="_2-1-exploiter-la-faille" tabindex="-1"><a class="header-anchor" href="#_2-1-exploiter-la-faille" aria-hidden="true">#</a> 2.1 Exploiter la faille</h3>
<p>En partant du code précédent, afficher dans la page un formulaire en exploitant la faille <code>onload</code> du code fourni.</p>
<h3 id="_2-1-la-meme-chose-mais-par-lien" tabindex="-1"><a class="header-anchor" href="#_2-1-la-meme-chose-mais-par-lien" aria-hidden="true">#</a> 2.1 La même chose mais par lien…</h3>
<p>Vous l'avez peut-être remarqué, dans le code JavaScript il est également possible de spécifier une image. Par exemple il est possible d'écrire un lien :</p>
<ul>
<li><a href="https://cours.brosseau.ovh/demo/xss/index.html?uri=https://fakeimg.pl/600/" target="_blank" rel="noopener noreferrer">https://cours.brosseau.ovh/demo/xss/index.html?uri=https://fakeimg.pl/600/<ExternalLinkIcon/></a></li>
</ul>
<p>Ce lien est source <strong>d'un très grand danger</strong>, je vous propose de réfléchir à comment il serait possible d'exploiter « le paramètre uri » afin de lui donner de détourner le comportement du site.</p>
<ul>
<li>Trouver un moyer de réaliser la même attaque que le code précédent (point 2.0).</li>
<li>Envoyer le lien à une autre personne.</li>
<li>Lire des données sur son ordinateur (nous allons le faire ensemble).</li>
</ul>
<p>C'est à vous (enfin à nous).</p>
<h2 id="partie-2-1-les-xss" tabindex="-1"><a class="header-anchor" href="#partie-2-1-les-xss" aria-hidden="true">#</a> Partie 2.1 : Les XSS</h2>
<p>Pour mieux comprendre l'aspect dangereux d'une XSS nous allons utiliser Hack Splaining, pour ça rendez-vous sur <a href="https://www.hacksplaining.com/exercises/xss-stored" target="_blank" rel="noopener noreferrer">Hack Splaining<ExternalLinkIcon/></a></p>
<p>Celui-ci contient un bon « tutoriel » interactif permettant de tester et de se former au principe de XSS.</p>
<h2 id="partie-3-webgoat" tabindex="-1"><a class="header-anchor" href="#partie-3-webgoat" aria-hidden="true">#</a> Partie 3 : WebGoat</h2>
<p><img src="@source/tp/securite/webgoat.png" alt="Superbe Logo"></p>
<p>WebGoat est un outil didactique aux dimensions pédagogiques proposé par le groupe OWASP. Il s'agit d'une application WEB J2EE développée en Java et destinée à l'enseignement de manière interactive.</p>
<p>Elle vise à familiariser l'utilisateur aux technologies WEB (E.g: protocole HTTP, Encoding, AJAX), aux mécanismes du protocole HTTP et aux vulnérabilités qui peuvent en découler. Cet enseignement se fait au travers de différentes leçons, chacune abordant un concept particulier, détaillant un problème de sécurité donné avant de soumettre l'utilisateur à une mise en pratique immédiate. Chaque leçon (JSP) présente sur l'application comporte une vulnérabilité que l'utilisateur peut identifier et tenter d'exploiter (E.g: Injection SQL permettant de retrouver de fausses informations comme des numéros de cartes de crédit).</p>
<p>Voilà une liste des éléments que nous allons pouvoir « exploiter » dans WebGoat :</p>
<ul>
<li>Flux des contrôles d'accès et authentification</li>
<li>Flux de gestion de session utilisateur</li>
<li>Cross-Site Scripting (XSS)</li>
<li>Injections</li>
<li>Parameter and Data Tampering</li>
<li>Buffer Overflows</li>
<li>Configuration et stockage de données (non sécurisée)</li>
<li>Sécurité AJAX</li>
</ul>
<p>Nous n’allons bien évidemment pas tous les faire, l’idée est d’en faire quelques-uns et si vous le souhaitez vous pourrez approfondir le sujet.</p>
<p><img src="@source/tp/securite/webgoat-dom-injection-700x407.png" alt=""></p>
<h2 id="telechargement" tabindex="-1"><a class="header-anchor" href="#telechargement" aria-hidden="true">#</a> Téléchargement</h2>
<p>Deux versions existent :</p>
<ul>
<li>Le jar</li>
<li>Un containeur Docker</li>
</ul>
<p>Nous allons choisir le jar :</p>
<p><a href="https://github.com/WebGoat/WebGoat/releases/download/7.1/webgoat-container-7.1-exec.jar" target="_blank" rel="noopener noreferrer">Télécharger WebGoat<ExternalLinkIcon/></a></p>
<h2 id="lancement" tabindex="-1"><a class="header-anchor" href="#lancement" aria-hidden="true">#</a> Lancement</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>java -jar webgoat-container-7.1-exec.jar
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>C’est parti, vous pouvez maintenant aller sur <a href="http://localhost:8080/WebGoat" target="_blank" rel="noopener noreferrer">http://localhost:8080/WebGoat<ExternalLinkIcon/></a></p>
<p>⚠️ Nous allons utiliser un outil intégrant des failles… Pour éviter tout risque pour votre machine, le mieux est de couper l’accès au réseau de votre ordinateur. ⚠️</p>
<h2 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire</h2>
<ul>
<li>AJAX Security
<ul>
<li>LAB: Client Side Filtering</li>
<li>LAB: DOM-Based cross-site scripting</li>
<li>Dangerous Use of Eval</li>
</ul>
</li>
<li>Concurrency
<ul>
<li>Thread Safety Problems</li>
<li>Shopping Cart Concurrency Flaw</li>
</ul>
</li>
<li>Injection Flaws
<ul>
<li>Command Injection (si vous souhaitez faire du MITM - Man In The Middle -)</li>
<li>Numeric SQL Injection</li>
<li>String SQL Injection</li>
</ul>
</li>
<li>Parameter Tampering
<ul>
<li>Exploit Hidden Fields</li>
</ul>
</li>
</ul>
</template>
