<template><h1 id="explication-structure-«-android-boilerplate-»" tabindex="-1"><a class="header-anchor" href="#explication-structure-«-android-boilerplate-»" aria-hidden="true">#</a> Explication structure « Android Boilerplate »</h1>
<p>Ce document n'est pas un TP, mais une explication de la structure « Android Boilerplate » disponible à l'adresse suivante :</p>
<ul>
<li><a href="https://github.com/c4software/Android-Boilerplate-Koin-CoRoutines-OkHTTP" target="_blank" rel="noopener noreferrer">Android Boilerplate Koin - Rx - OkHttp<ExternalLinkIcon/></a></li>
</ul>
<p>Ce document vous donnera les clés afin de comprendre le fonctionnement et de vous l'approprier.</p>
<div class="custom-container danger"><p class="custom-container-title">XML ou Compose ?</p>
<p>Nous sommes en 2021, le monde d'Android évolue… Pendant des années l'écriture des « layouts » (interface) n'était possible que via du XML. Il est maintenant possible d'écrire les layouts de manières bien plus modernes avec <a href="https://developer.android.com/jetpack/compose" target="_blank" rel="noopener noreferrer">JetPack Compose<ExternalLinkIcon/></a>. Le TP que vous suivez est toujours valide, mais repose sur l'utilisation de XML.</p>
</div>
<h2 id="but-du-code" tabindex="-1"><a class="header-anchor" href="#but-du-code" aria-hidden="true">#</a> But du code</h2>
<p>Le but du code fourni sur Github est de simplifier la mise en place d'une base applicative Android « moderne ». Il ne contient aucun code (presque). Il est donc clonnable / téléchargeable et utilisable tel quel, l'idée étant vraiment d'avoir presque un template d'application réutilisable à volonté.</p>
<p>Ceci étant annoncé, passons au détail du fonctionnement.</p>
<h2 id="recuperer-le-code" tabindex="-1"><a class="header-anchor" href="#recuperer-le-code" aria-hidden="true">#</a> Récupérer le code</h2>
<p>Pour récupérer le code source, vous avez deux possibilités :</p>
<ul>
<li>Le fichier zip en provenance de Github : <a href="https://github.com/c4software/Android-Boilerplate-Koin-CoRoutines-OkHTTP/archive/master.zip" target="_blank" rel="noopener noreferrer">À télécharger ici<ExternalLinkIcon/></a></li>
<li>En clonant le repository : <code>git clone git@github.com:c4software/Android-Boilerplate-Koin-CoRoutines-OkHTTP.git</code></li>
</ul>
<p>⚠️ Attention, si vous avez choisi de cloner le repository. Pensez bien à supprimer le dossier <code>.git</code> à la racine des sources afin de ne pas garder l'historique de mon projet. ⚠️</p>
<h2 id="lancer-le-projet-une-premiere-fois" tabindex="-1"><a class="header-anchor" href="#lancer-le-projet-une-premiere-fois" aria-hidden="true">#</a> Lancer le projet une première fois</h2>
<p>Avant d'effectuer des modifications dans le projet, nous allons le lancer une première fois. Pour ça, il suffit d'ouvrir le projet avec Android Studio.</p>
<p><img src="@source/tp/android/ressources/open_project.png" alt="Ouvrir le projet"></p>
<p>Une fois l'indexation terminée, vous devez pouvoir lancer le projet sur un émulateur ou sur votre téléphone. Ce qui devrait donner quelque chose comme :</p>
<p><img src="https://github.com/c4software/Android-Boilerplate-Koin-CoRoutines-OkHTTP/blob/master/capture.png?raw=true" alt="Demo"></p>
<h2 id="la-structure-des-dossiers" tabindex="-1"><a class="header-anchor" href="#la-structure-des-dossiers" aria-hidden="true">#</a> La structure des dossiers</h2>
<p>Afin de simplifier l'entrée dans le code, j'ai volontairement limité l'organisation des dossiers au strict minimum. Attention, ça ne veut pas dire que vous ne pouvez pas en créer d'autres pour organiser votre code au mieux.</p>
<p><img src="@source/tp/android/ressources/structures.png" alt="structure dossier"></p>
<ul>
<li><code>data</code> : Contiens la définition (interface) de vos sources de données (exemple la définition des appels réseau).</li>
<li><code>di</code> : La définition des éléments qui sont « injectés ».</li>
<li><code>domain</code> : Votre code métier, celui qui fait le traitement (soit local, ou alors les appels aux APIs HTTP par exemple)</li>
<li><code>utils</code> : L'ensemble de vos « helpers » / fonctions que vous vous servez à plusieurs endroits dans votre code.</li>
<li><code>view</code> : Vos « vues », c'est-à-dire vos différents écrans de votre application.</li>
</ul>
<h2 id="mvvm-kezako" tabindex="-1"><a class="header-anchor" href="#mvvm-kezako" aria-hidden="true">#</a> MVVM ? Kézako !?</h2>
<p>L’acronyme MVVM signifie Modèle Vue Vue-Modèle (Model–view–viewmodel). L'architecture MVVM est « plutôt récente » elle date de 2004, elle est inventée à la base par Microsoft afin de simplifier les problématiques de gestion de l'interface (en utilisant des mécaniques d'évènement)</p>
<p>Elle a récemment été popularisée par certains frameworks JavaScript, car elle permet d'implémenter « simplement » des interfaces avec une réactivité importante.</p>
<p><img src="@source/tp/android/ressources/MVVMPattern.png" alt="MVVM Pattern"></p>
<p>Cette méthode permet, tel le modèle MVC (modèle-vue-contrôleur), de séparer la vue de la logique et de l'accès aux données en accentuant les principes de liaison et d’évènement.</p>
<p>Il faut donc distinguer <em>3 parties</em> :</p>
<ul>
<li>Le modèle : Les données au sens pures (de la data sous forme d'objet), elles peuvent provenir d'API, de base de données, de sources locales.</li>
<li>La vue : L'affichage utilisé utilisateur, la gestion des clicks… Et <em>uniquement</em> ça, la logique associée à la donnée est effectuée dans le <code>Vue-Modèle</code> (via « le bus des évènements »)</li>
<li>Le Vue-Modèle : Intéragie avec la couche <code>modèle</code> et envoi les nouveaux états résultat à la vue (via le « bus des évènements »).</li>
</ul>
<p>Nous allons, donc devoir définir « des » bus de communication entre le Vue-Modèle et la Vue afin de permettre l'actualisation des données. Cette organisation vous nous permettre une fois en place de ne manipuler essentiellement plus que de la donnée. La vue sera donc « automatiquement » mise à jour, et ce en fonction de l'état de la donnée (exemple les loaders / les mises à jour de liste, etc.)</p>
<p>📖Pour ceux ayant déjà fait du VueJS (ou autre framework JavaScript récent), le découpage est très proche, vous ne serez pas perdu.</p>
<h2 id="di-injection-de-dependances-koin-quelques-explications" tabindex="-1"><a class="header-anchor" href="#di-injection-de-dependances-koin-quelques-explications" aria-hidden="true">#</a> DI ? Injection de dépendances, Koin quelques explications</h2>
<p>En introduction j'ai indiqué que mon « Boilerplate » était le strict minimum viable pour un projet… Et bien je vous ai menti ! Mais garder confiance c'est pour votre bien…</p>
<p>Alors, l'injection des dépendances petite définition Wikipedia :</p>
<blockquote>
<p>Il consiste à créer dynamiquement (injecter) les dépendances entre les différents objets en s'appuyant sur une description (fichier de configuration ou métadonnées) ou de manière programmatique. Ainsi les dépendances entre composants logiciels ne sont plus exprimées dans le code de manière statique, mais déterminées dynamiquement à l'exécution.</p>
</blockquote>
<p>Pour faire simple, le but est de ne plus avoir à créer des objets dans votre code. Tout est géré « plus haut » afin de centraliser la configuration, la manière dont l'objet est créé, etc.</p>
<p>Quelques avantages à utiliser de l'injection :</p>
<ul>
<li>Réduction du code (les créations d'objets sont effectuées qu'une seule fois et injectées automatiquement grâce au typage).</li>
<li>Réduction de la mémoire, logique moins d'instance d'objet identique créer à plusieurs endroits dans votre code.</li>
<li>Isolation entre la logique de l'objet et votre code, vous n'êtes qu'un consommateur de fonctionnalités la logique peut-être carrément écrite par quelqu'un d'autre, voir dans certains cas externalisés dans des librairies externes (Kotlin Native par exemple).</li>
<li>Etc.</li>
</ul>
<h3 id="koin" tabindex="-1"><a class="header-anchor" href="#koin" aria-hidden="true">#</a> Koin</h3>
<p>Dans notre nous allons utiliser la librairie Koin, elle est complètement écrite en Kotlin, elle a comme avantage d'être simple à utiliser avec très peut de code à écrire (et donc à comprendre).</p>
<h3 id="concretement-ca-ressemble-a-quoi" tabindex="-1"><a class="header-anchor" href="#concretement-ca-ressemble-a-quoi" aria-hidden="true">#</a> Concrètement ça ressemble à quoi</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">val</span> appModule <span class="token operator">=</span> module <span class="token punctuation">{</span>
    <span class="token comment">// Inject dependencies for the MainViewModel (the only UI in this boilerplate)</span>
    viewModel <span class="token punctuation">{</span> <span class="token function">MainViewModel</span><span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

    <span class="token comment">// Sample Remote Data Repository</span>
    single<span class="token operator">&lt;</span>SampleRemoteRepository<span class="token operator">></span><span class="token punctuation">(</span>createdAtStart <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">SampleRemoteRemoteRepositoryImpl</span><span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

    <span class="token comment">// Sample Local Data Repository</span>
    single<span class="token operator">&lt;</span>SampleLocalRepository<span class="token operator">></span><span class="token punctuation">(</span>createdAtStart <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">SampleLocalRepositoryImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">val</span> remoteDataSourceModule <span class="token operator">=</span> module <span class="token punctuation">{</span>
    <span class="token comment">// provided web components</span>
    single <span class="token punctuation">{</span> <span class="token function">createOkHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

    <span class="token comment">// Fill property</span>
    single <span class="token punctuation">{</span> createWebService<span class="token operator">&lt;</span>SampleRemoteDataSource<span class="token operator">></span><span class="token punctuation">(</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> BuildConfig<span class="token punctuation">.</span>REMOTE_URI<span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">val</span> moduleApp <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span>appModule<span class="token punctuation">,</span> remoteDataSourceModule<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>L'ensemble est, je pense, relativement parlant, mais regardons en détail le <code>get()</code>, comme vous pouvez le voir celui-ci est présent un peu partout dans la déclaration de nos éléments à injecter. Ce mot-clé est <em>magique</em> il permet à <a href="https://insert-koin.io/" target="_blank" rel="noopener noreferrer">Koin<ExternalLinkIcon/></a> de détecter le type de paramètre attendu et d'injecter automatiquement le bon objet.</p>
<p>Par exemple nous indiquons que <code>createWebService(client: OkHttpClient, url: String)</code>, automatiquement Koin va chercher dans les objets qu'il connait ceux correspondant à la signature (dans notre cas <code>single { createOkHttpClient() }</code>) et <code>BuildConfig.REMOTE_URI</code> étant la String attendu.</p>
<p>Dans le cas d'un objet de notre vue, nous avons dans le même principe :</p>
<p><code>viewModel { MainViewModel(get(), get()) }</code> qui représente le View-Modele de notre Activity.</p>
<p>Celui-ci attend deux paramètres :</p>
<p><code>MainViewModel(sampleRemoteRepository: SampleRemoteRepository, sampleLocalRepository: SampleLocalRepository)</code>.</p>
<p>Compliqué ? Pas tellement, avec la pratique ça vous semblera automatique. 😊</p>
<h2 id="modifier-le-package-«-sample-»" tabindex="-1"><a class="header-anchor" href="#modifier-le-package-«-sample-»" aria-hidden="true">#</a> Modifier le package « sample »</h2>
<p>Comme vous le savez, sur Android les applications doivent être uniques « de manière cryptographique » une partie du test est basé sur leur package. Nous allons donc faire en sorte de personnaliser le package afin de le rendre unique pour vous et votre téléphone.</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3tULbe0wPmU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<h2 id="changer-le-nom-de-l-application" tabindex="-1"><a class="header-anchor" href="#changer-le-nom-de-l-application" aria-hidden="true">#</a> Changer le nom de l'application</h2>
<p>Si vous regardez dans votre liste d'application vous allez trouver une application nommée <code>Boilerplate - Koin - Retrofit</code>. Pour le changer, c'est simple, il suffit d'éditer le fichier <code>strings.xml</code>.</p>
<p>⚠️ En parlant de ce fichier, celui-ci <em>doit</em> contenir l'ensemble de vos textes (et évidemment pas uniquement le nom de votre application).</p>
<h2 id="changer-la-configuration-de-l-api" tabindex="-1"><a class="header-anchor" href="#changer-la-configuration-de-l-api" aria-hidden="true">#</a> Changer la configuration de l'API</h2>
<p>Centraliser la configuration dans une application est <em>essentiel</em> au-delà de l'organisation du code, c'est essentiel pour que vous puissiez travailler en équipe, mais également pour reprendre votre code sereinement dans quelques années (eh oui…). Dans notre application la configuration sera centralisée dans le fichier <code>build.gradle</code>.</p>
<p>Si vous regardez le fichier en question, vous allez trouver <code>buildConfigField</code> cette instruction nous permettra de définir de la configuration propre à l'environnement (Prod, Dev, Staging, etc.). Bref c'est génial !</p>
<p>J'ai donc initialisé dans mon petit Boilerplate <code>REMOTE_URI</code> qui sera dans votre code Kotlin l'URL de votre serveur distant.</p>
<h2 id="repository-kezako" tabindex="-1"><a class="header-anchor" href="#repository-kezako" aria-hidden="true">#</a> Repository ? Kézako !?</h2>
<p>Contiens la logique autour de vos données. Elle expose au reste de l'application une API (Interne) permettant de gérer la mise à jour des données.</p>
<p>Cette « brique de code » va permettre d'agréger les différentes sources de données afin d'être utilisable simplement dans vos VueModel (ViewModel).</p>
<p>🛑 N'hésitez pas à découper autant qu'il le faut votre logique dans différents repository 🙏</p>
<h3 id="localrepository" tabindex="-1"><a class="header-anchor" href="#localrepository" aria-hidden="true">#</a> LocalRepository ?</h3>
<p>Dans le code fourni en exemple, le <code>Local Repository</code> « simule » un repository qui accèderait à des données « local » c'est-à-dire dans votre téléphone (mémoire interne par exemple).</p>
<h3 id="remoterepository" tabindex="-1"><a class="header-anchor" href="#remoterepository" aria-hidden="true">#</a> RemoteRepository ?</h3>
<p>Dans le code fourni en exemple, le <code>Remote Repository</code> « simule » une interaction avec « l'extérieur » de votre téléphone c'est-à-dire dans notre cas <code>Internet</code> via un appel d'API via le protocole HTTP.</p>
<h2 id="ajouter-une-nouvelle-route-d-api-distance" tabindex="-1"><a class="header-anchor" href="#ajouter-une-nouvelle-route-d-api-distance" aria-hidden="true">#</a> Ajouter une nouvelle route d'API distance</h2>
<p>Ajouter une nouvelle route d'API à notre projet va se résumer à la modification de quelques fichiers. À premier vu ça peut sembler fastidieux, mais vous allez rapidement voir que ce découpage va nous permettre d'organiser le code au mieux afin de le rendre maintenant dans la durée. Et finalement n'est-ce pas le plus important ?</p>
<p>Je vais prendre un exemple simple, le souhaite ajouter une nouvelle route disponible sur <code>https://rest.ensembl.org/</code> dans mon projet. Au hasard la route <code>/info/rest?content-type=application/json</code>.</p>
<p>🤔Je rappelle au passage que la finalité est de « Récupérer l'information » du serveur, le faire transiter dans votre code, pour au final l'afficher quelque part dans votre application.</p>
<h3 id="declarer-l-appel-http-dans-sampleremotedatasource" tabindex="-1"><a class="header-anchor" href="#declarer-l-appel-http-dans-sampleremotedatasource" aria-hidden="true">#</a> Déclarer l'appel HTTP dans SampleRemoteDataSource</h3>
<p>Déclarer une méthode dans le fichier <code>sampleRemoteDataSource.kt</code>, ce fichier est une Interface, qui va « déclarer » l'ensemble des méthodes HTTP appelable dans le code. La déclaration de celles-ci est effectuée via des annotations (symbolisé avec <code>@</code>). Dans notre cas le fichier contient actuellement :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token annotation builtin">@GET</span><span class="token punctuation">(</span><span class="token string">"info/ping?content-type=application/json"</span><span class="token punctuation">)</span>
<span class="token annotation builtin">@Headers</span><span class="token punctuation">(</span><span class="token string">"Content-type: application/json"</span><span class="token punctuation">)</span>
<span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> PingResult
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Nous déclarons donc une méthode de type <code>GET</code> qui consommera un retour en JSON.</p>
<p>Nous allons ajouter la seconde méthode de la même façon</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token annotation builtin">@GET</span><span class="token punctuation">(</span><span class="token string">"info/rest?content-type=application/json"</span><span class="token punctuation">)</span>
<span class="token annotation builtin">@Headers</span><span class="token punctuation">(</span><span class="token string">"Content-type: application/json"</span><span class="token punctuation">)</span>
<span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">restInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> RestResult
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Vous allez devoir créer une Data Class <code>RestResult</code> qui servira à déserialser le retour de l'API. Elle va ressembler à :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">RestResult</span><span class="token punctuation">(</span><span class="token keyword">val</span> release<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>👀Attention 👀 ranger le fichier dans le bon dossier/package ! À savoir <code>data/models/RestResult</code>.</p>
<h4 id="comment-ca-fonctionne-en-deux-mots" tabindex="-1"><a class="header-anchor" href="#comment-ca-fonctionne-en-deux-mots" aria-hidden="true">#</a> Comment ça fonctionne en deux mots ?</h4>
<p>Déclarer une méthode dans une Interface pour permettre d'appeler un WebService !? C'est magique ? En réalité tout ça est possible grace à OkHTTP2, Retrofit, et l'injection de dépendance. Pour les curieux, toute la logique est ici <code>src/main/java/com/boilerplate/app/di/remote_datasource_model.kt</code></p>
<h3 id="declarer-la-methode-dans-sampleremoterepository" tabindex="-1"><a class="header-anchor" href="#declarer-la-methode-dans-sampleremoterepository" aria-hidden="true">#</a> Déclarer la méthode dans SampleRemoteRepository</h3>
<p>La première étape était la déclaration dans l'interface, c'est chose faite. Maintenant nous allons déclarer notre méthode dans le <code>Repository</code>, donc dans la brique qui va appeler la source de données.</p>
<p>Nous allons donc tout simplement :</p>
<ul>
<li>Ajouter la déclaration de la méthode dans l'interface <code>SampleRemoteRepository</code> nommée infoRest.</li>
<li>Implémenter la méthode <code>infoRest</code> dans <code>SampleRemoteRemoteRepositoryImpl</code> afin de pouvoir appeler l'API.</li>
</ul>
<h3 id="l-appeler-depuis-le-code" tabindex="-1"><a class="header-anchor" href="#l-appeler-depuis-le-code" aria-hidden="true">#</a> L'appeler depuis le code</h3>
<p>Pour tester (et uniquement pour tester), nous allons appeler la nouvelle méthode depuis la vue principale. La procédure va être relativement simple :</p>
<ul>
<li>Ajout d'une méthode dans <code>MainViewModel.kt</code>
<ul>
<li>La méthode doit implémenter les states. (Chargement, et retour de la « string reçu »)</li>
</ul>
</li>
<li>Appeler la méthode déclarée dans le MainViewModel depuis l'activity. (ex <code>myViewModel.getRestInfomations()</code>).</li>
</ul>
<p>Dans l'implémentation actuelle, je vous propose d'afficher un <code>un Toast</code> lors de la réception de la donnée.</p>
<h2 id="ajouter-une-nouvelle-activity" tabindex="-1"><a class="header-anchor" href="#ajouter-une-nouvelle-activity" aria-hidden="true">#</a> Ajouter une nouvelle Activity</h2>
<p>Maintenant que nous avons validé que notre code fonctionne, nous allons pouvoir ajouter une nouvelle vue. Nous avons une nouvelle route <code>infoRest</code> qui pour l'instant est inutilisée, nous allons créer une vue et le code associé afin d'afficher l'information reçue du serveur.</p>
<h3 id="layout" tabindex="-1"><a class="header-anchor" href="#layout" aria-hidden="true">#</a> Layout</h3>
<p>La première étape va être la création de la vue. Pour ça créer un Layout XML comme nous avons déjà pu le voir ensemble.</p>
<h3 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> Code</h3>
<p>Le minimum de code pour que votre activity fonctionne est le suivant :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">class</span> YourActivity <span class="token operator">:</span> <span class="token function">AppCompatActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token keyword">fun</span> <span class="token function">getStartIntent</span><span class="token punctuation">(</span>ctx<span class="token operator">:</span> Context<span class="token punctuation">)</span><span class="token operator">:</span> Intent <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">Intent</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> YourActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token operator">:</span> Bundle<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span>
        <span class="token function">setContentView</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>layout<span class="token punctuation">.</span>activity_demo<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>👀 Comme toujours l'organisation du code est une chose très importante, ne placez pas votre classe n'importe où. Mais dans un package dans <code>view</code> :</p>
<p><img src="@source/tp/android/ressources/create_package.png" alt="create package"></p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/M1RJ1kQg7Hg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>Si vous souhaitez plus de détail, inspirer du code présent dans le <code>MainActivity.kt</code> ou dans les exemples que nous avons évoqués pendant le cours.</p>
<h4 id="getstartintent" tabindex="-1"><a class="header-anchor" href="#getstartintent" aria-hidden="true">#</a> getStartIntent ?</h4>
<p>Cette méthode a pour but de simplifier la lecture (et la navigation) entre les vues. Cette méthode est statique, elle sera appelée que vous souhaiterez appeler votre <code>activity</code> depuis une autre <code>vue</code> / <code>activity</code>. Elle retourne une <code>Intent</code> qui nous servira à démarrer l'activity souhaitée.</p>
<p><em>Exemple :</em></p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token function">startActivity</span><span class="token punctuation">(</span>MainActivity<span class="token punctuation">.</span><span class="token function">getStartIntent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Le but également de créer des <code>getStartIntent</code> est de simplifier la gestion du passage des paramètres. En effet, sur Android passer des paramètres à une activité se résume à les attacher à l'Intent. Centraliser la déclaration, permet également de centraliser cette logique.</p>
<p><em>Exemple :</em></p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token keyword">val</span> AGE_DU_CAPITPAINE <span class="token operator">=</span> <span class="token string">"AGE_DU_CAPITPAINE"</span>
    <span class="token keyword">fun</span> <span class="token function">getStartIntent</span><span class="token punctuation">(</span>ctx<span class="token operator">:</span> Context<span class="token punctuation">,</span> ageDuCapitaine<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token operator">:</span> Intent <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">Intent</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> MainActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span> <span class="token punctuation">{</span>
            <span class="token function">putExtra</span><span class="token punctuation">(</span>FROM_HOME<span class="token punctuation">,</span> ageDuCapitaine<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Pour récupérer cette valeur.</span>
<span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">ageDuCapitaine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token operator">=</span> intent<span class="token punctuation">.</span><span class="token function">getBooleanExtra</span><span class="token punctuation">(</span>AGE_DU_CAPITPAINE<span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="rendre-accessible-cette-vue-activity" tabindex="-1"><a class="header-anchor" href="#rendre-accessible-cette-vue-activity" aria-hidden="true">#</a> Rendre accessible cette vue / activity</h2>
<p>Maintenant que cette activity est créée, nous allons devoir la rendre « visible » par Android. Cette étape est relativement simple. Il suffit de laisser faire votre IDE pour lui faire autodéclarer le bon XML dans le fichier <code>AndroidManifest.xml</code>.</p>
<p>Si vous souhaitez réaliser cette action à la main. Il suffit d'ajouter « dans / sous » l'élément application :</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activity</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.boilerplate.app.view.main.MainActivity<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>⚠️ Mais sérieusement, ne l'ajoutez pas à la main. Faite plutôt alt entrée sur le nom de votre class dans l'IDE l'action vous sera proposée.</p>
<p><img src="@source/tp/android/ressources/add_manifest.png" alt="ajouter au manifeste"></p>
<h3 id="creer-une-home" tabindex="-1"><a class="header-anchor" href="#creer-une-home" aria-hidden="true">#</a> Créer une home</h3>
<p>En suivant le même principe que précédemment, créez une Home avec deux boutons permettant d'accéder à la <code>MainActivity</code> et à <code>InfoRestActivity</code>.</p>
<p>Petit rappel, pour « attacher » une action de clique sur un bouton :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>btnMain<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
    <span class="token function">startActivity</span><span class="token punctuation">(</span>MainActivity<span class="token punctuation">.</span><span class="token function">getStartIntent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

btnInfosRest<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
    <span class="token function">startActivity</span><span class="token punctuation">(</span>InfoRestActivity<span class="token punctuation">.</span><span class="token function">getStartIntent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="declarer-cette-home-comme-activity-principale-de-votre-application" tabindex="-1"><a class="header-anchor" href="#declarer-cette-home-comme-activity-principale-de-votre-application" aria-hidden="true">#</a> Déclarer cette home comme activity principale de votre application</h3>
<p>Un certain nombre de paramètres autour des intent est modifiable directement dans <code>AndroidManifest.xml</code>, la déclaration de <code>l'intent</code> à lancer au démarrage de l'application est faite via :</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>intent-filter</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>action</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.intent.action.MAIN<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>category</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.intent.category.LAUNCHER<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>intent-filter</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Déplacer <code>l'intent filter</code> dans bloc correspondant à votre activity.</p>
<h3 id="connecter-le-tout" tabindex="-1"><a class="header-anchor" href="#connecter-le-tout" aria-hidden="true">#</a> Connecter le tout</h3>
<p>Votre application contient maintenant 3 activités :</p>
<ul>
<li>Une home.</li>
<li>L'activité permettant de connaitre la version du serveur. <code>infoRest</code></li>
<li>Une activité permettant de « réaliser des pings ».</li>
</ul>
<p>Appeler les différends <code>getStartIntent()</code> depuis les bonnes vues.</p>
<p>Exemple :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">startMainActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">startActivity</span><span class="token punctuation">(</span>MainActivity<span class="token punctuation">.</span><span class="token function">getStartIntent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="utiliser-un-repository-depuis-une-nouvelle-activity" tabindex="-1"><a class="header-anchor" href="#utiliser-un-repository-depuis-une-nouvelle-activity" aria-hidden="true">#</a> Utiliser un Repository depuis une nouvelle activity</h2>
<p>Comme indiqué précédemment, nous n'allons pas directement appeler notre <code>Repository</code> directement depuis notre <code>Activity</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">Petit rappel</p>
<p>Nous allons découper notre logique en différentes parties :</p>
<ul>
<li>La logique de la vue va rester dans l'Activity.</li>
<li>La logique des données de la vue va être mise dans la partie <code>ViewModel</code>.</li>
<li>La logique « de récupération » des données va être mise dans un <code>Repository</code>.</li>
</ul>
</div>
<p>Créer un ViewModel pour une <code>Activity</code> va se résumer à trois opérations :</p>
<ul>
<li>Créer une Class <code>YourActivityViewModel</code> et qui extend de <code>BaseViewModel()</code></li>
<li>Déclarer votre <code>YourActivityViewModel</code> dans l'activity en spécifiant que celui-ci sera automatiquement injecté.</li>
<li>Le déclarer dans l'injecteur de dépendances.</li>
</ul>
<h3 id="creation-de-votre-youractivityviewmodel" tabindex="-1"><a class="header-anchor" href="#creation-de-votre-youractivityviewmodel" aria-hidden="true">#</a> Création de votre <code>YourActivityViewModel</code></h3>
<p>Cette étape est la première, nous allons créer une Class qui contiendra la « logique » des données de la vue, le minimum que doit contenir cette classe est :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>
<span class="token keyword">class</span> <span class="token function">YourActivityViewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">BaseViewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> states <span class="token operator">=</span> MutableLiveData<span class="token operator">&lt;</span>ViewModelState<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Vous déclarerez ici vos méthodes et variables nécessaires</span>
    <span class="token comment">// au bon fonctionnement de votre application.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Vous voulez un exemple « plus grand » ?</p>
<p>Vous avez dans le projet un exemple de <code>ViewModel</code> un peu plus complet, c'est le fichier <code>MainViewModel.kt</code> il est également <a href="https://raw.githubusercontent.com/c4software/Android-Boilerplate-Koin-CoRoutines-OkHTTP/master/app/src/main/java/com/boilerplate/app/view/main/MainViewModel.kt" target="_blank" rel="noopener noreferrer">accessible ici<ExternalLinkIcon/></a></p>
</div>
<h3 id="declarer-votre-viewmodel-dans-l-activity" tabindex="-1"><a class="header-anchor" href="#declarer-votre-viewmodel-dans-l-activity" aria-hidden="true">#</a> Déclarer votre ViewModel dans l'activity</h3>
<p>Pour ça rien de bien compliqué, il suffit d'ajouter le code suivant :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token keyword">private</span> <span class="token keyword">val</span> myViewModel<span class="token operator">:</span> YourActivityViewModel <span class="token keyword">by</span> <span class="token function">viewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Attention</p>
<p>Ne pas mettre le code n'importe où. Nous avons ici un <strong>attribut de class</strong>.</p>
</div>
<h3 id="declaration-dans-l-injecteur-de-dependance" tabindex="-1"><a class="header-anchor" href="#declaration-dans-l-injecteur-de-dependance" aria-hidden="true">#</a> Déclaration dans l'injecteur de dépendance</h3>
<p>Si vous souhaitez que ça fonctionne, vous devez dire à votre code comment le <code>by viewModel()</code> va être résolu. Pour ça nous devons indiquer à notre injecteur de dépendance comment créer cette dépendance, cette déclaration est à faire dans le fichier <code>app_module.kt</code> (il se trouve dans le package <code>.di</code>).</p>
<p>Vous devez donc ajouter dans le <code>appModule</code> le code suivant :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    viewModel <span class="token punctuation">{</span> <span class="token function">YourActivityViewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>🤓 Bien évidemment, vous ajoutez le code à la suite du <code>viewModel</code> déjà présent 🤓</p>
</template>
