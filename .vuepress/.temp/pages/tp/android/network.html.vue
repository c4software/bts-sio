<template><h1 id="appeler-une-api-simplement" tabindex="-1"><a class="header-anchor" href="#appeler-une-api-simplement" aria-hidden="true">#</a> Appeler une API simplement</h1>
<p>Appeler une API peut-être intimidant, par le passé il était « en effet compliqué » de faire des appels réseaux. En effet afin de s'assurer que votre application soit de qualité quelques règles sont imposées par la plateforme Android :</p>
<ul>
<li>Pas d'appel réseau depuis le <code>UIThread</code>.</li>
<li>Pas de manipulation de l'interface depuis le <code>IOThread</code>.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Petit rappel Wikipedia</p>
<p>Un thread ou fil (d'exécution) ou tâche (terme et définition normalisée par ISO/CEI 2382-7:2000 ; autres appellations connues : processus léger, fil d'instruction, processus allégé, exétron, voire unité d'exécution1 ou unité de traitement2,3[réf. nécessaire]) est similaire à un processus, car tous deux représentent l'exécution d'un ensemble d'instructions du langage machine d'un processeur. Du point de vue de l'utilisateur, ces exécutions semblent se dérouler en parallèle.</p>
</div>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#pourquoi-etait-ce-complexe">Pourquoi était-ce complexe ?</RouterLink></li><li><RouterLink to="#travailler-intelligemment">Travailler intelligemment</RouterLink></li><li><RouterLink to="#les-librairies">Les librairies</RouterLink><ul><li><RouterLink to="#les-permissinos">Les permissinos</RouterLink></li><li><RouterLink to="#la-configuration">La configuration</RouterLink></li><li><RouterLink to="#les-coroutines-kotlin">Les CoRoutines Kotlin</RouterLink></li><li><RouterLink to="#okhttp">OkHttp</RouterLink></li><li><RouterLink to="#gson">GSON</RouterLink></li><li><RouterLink to="#retrofit">Retrofit</RouterLink></li></ul></li><li><RouterLink to="#definir-les-modeles-de-retour">Définir les modèles de retour</RouterLink></li><li><RouterLink to="#le-code-permettant-de-creer-l-api">Le code permettant de créer l&#39;API</RouterLink></li><li><RouterLink to="#appeler-votre-api">Appeler votre API</RouterLink></li><li><RouterLink to="#a-faire">À faire</RouterLink></li></ul></nav>
</details>
<h2 id="pourquoi-etait-ce-complexe" tabindex="-1"><a class="header-anchor" href="#pourquoi-etait-ce-complexe" aria-hidden="true">#</a> Pourquoi était-ce complexe ?</h2>
<p>Internet est une variable incontrôlable dans un projet Android, vous n'êtes pas certains que :</p>
<ul>
<li>Votre utilisateur possède du réseau.</li>
<li>Que celui-ci soit rapide.</li>
<li>Que votre serveur ne soit pas surchargé.</li>
<li>Que votre serveur soit rapide.</li>
</ul>
<p>C'est pour l'ensemble de ces raisons que le code qui repose sur un appel réseau peut faire peur ! Mais vous allez le voir avec Kotlin, et les librairies de qualités à notre disposition un appel réseau sera aussi simple qu'une « <code>setOnClickListener</code> »</p>
<h2 id="travailler-intelligemment" tabindex="-1"><a class="header-anchor" href="#travailler-intelligemment" aria-hidden="true">#</a> Travailler intelligemment</h2>
<p>Nous allons travailler avec de la logique, nous sommes dans un langage-objet, nous allons utiliser la puissance de l'objet, et des techniques modernes pour faire des appels réseaux sans nous prendre la tête :</p>
<ul>
<li>Les interfaces pour définir nos « endpoints » d'API (comprendre les liens que nous allons devoir appeler).</li>
<li>L'utilisation d'objet pour « décoder » les réponses du serveur (au format JSON)</li>
<li>Les coroutines pour le multithread. (<code>UiThread</code> <code>IOThread</code>)</li>
<li>Les scopes pour manipuler la vue après l'obtention des données (<code>runOnUiThread { … }</code>)</li>
</ul>
<p>Beaucoup de problématiques seront résolues par des librairies standards dans le monde d'Android.</p>
<h2 id="les-librairies" tabindex="-1"><a class="header-anchor" href="#les-librairies" aria-hidden="true">#</a> Les librairies</h2>
<p>Les librairies en question sont à ajouter dans votre fichier <code>Gradle</code>, nous allons avoir besoin de :</p>
<ul>
<li>OkHttp</li>
<li>GSON</li>
<li>Retrofit</li>
<li>CoRoutines Kotlin</li>
</ul>
<hr>
<h3 id="les-permissinos" tabindex="-1"><a class="header-anchor" href="#les-permissinos" aria-hidden="true">#</a> Les permissinos</h3>
<p>Pour accéder à Internet, il faut ajouter une permission, celle-ci autorisera à votre application l'accès à Internet. Aucune confirmation utilisateur ne sera demandée.</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.permission.INTERNET<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="la-configuration" tabindex="-1"><a class="header-anchor" href="#la-configuration" aria-hidden="true">#</a> La configuration</h3>
<p>Vous pouvez, <strong>si vous le souhaitez</strong>, ajouter dans votre <code>Build.gradle</code> (app) le domaine de votre API dans le block <code>defaultConfig</code>, exemple</p>
<div class="language-txt ext-txt line-numbers-mode"><pre v-pre class="language-txt"><code>    buildConfigField "String", "URI_REMOTE_SERVER", "\"https://us-central1-eseo-course.cloudfunctions.net\""
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="les-coroutines-kotlin" tabindex="-1"><a class="header-anchor" href="#les-coroutines-kotlin" aria-hidden="true">#</a> Les CoRoutines Kotlin</h3>
<ul>
<li>Gestion automatique des threads</li>
<li>Traitement asynchrone des tâches</li>
<li>Un mot magique… <code>suspend</code></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">suspend ?</p>
<p>Les coroutines sont dites « suspendable », elles vont pouvoir donc attendre que le réseau donne sa réponse pour réveiller le traitement. Pour nous ça va indiquer que notre code sera appelé « plus tard » au moment où le contenu sera disponible.</p>
<p>Magique ? Non pas vraiment, mais pratique ça c'est certains. En tout cas, ce mot-clé est très pratique il nous simplifiera très grandement la partie appel HTTP en retirant toute la partie <code>enqueue</code> que vous avez peut-être déjà croisé sur Internet.</p>
</div>
<p><a href="https://kotlinlang.org/docs/coroutines-overview.html" target="_blank" rel="noopener noreferrer">Plus d'informations<ExternalLinkIcon/></a></p>
<h3 id="okhttp" tabindex="-1"><a class="header-anchor" href="#okhttp" aria-hidden="true">#</a> OkHttp</h3>
<p>Client HTTP permettant de :</p>
<ul>
<li>RestClient</li>
<li>Http2</li>
<li>Gestion du cache</li>
<li>Intercepteur de requête</li>
</ul>
<h3 id="gson" tabindex="-1"><a class="header-anchor" href="#gson" aria-hidden="true">#</a> GSON</h3>
<p>Cette librairie va nous permettre la Sérialisation / Deserialisation automatique entre un JSON et un Objet Java / Kotlin</p>
<h3 id="retrofit" tabindex="-1"><a class="header-anchor" href="#retrofit" aria-hidden="true">#</a> Retrofit</h3>
<p>Surcouche à OkHttp permettant de simplifier toute la partie des appels réseaux :</p>
<ul>
<li>Une API Http qui s'utilise comme une « Interface ».</li>
<li>Conversion de données (mapping automatique des objets 🚀).</li>
<li>Utilise des annotations (@GET, @POST, @PUT, @DELETE, @HEAD, …)</li>
<li>Compatible CoRoutine (mais également sans)</li>
</ul>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>implementation <span class="token string">'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9'</span>
implementation <span class="token string">'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.8'</span>

implementation <span class="token string">'com.squareup.retrofit2:retrofit:2.9.0'</span>
implementation <span class="token string">'com.squareup.retrofit2:converter-gson:2.9.0'</span>
implementation <span class="token string">'com.squareup.okhttp3:okhttp:4.7.2'</span>
implementation <span class="token string">'com.squareup.okhttp3:logging-interceptor:4.7.2'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Une fois ajouté, n'oubliez pas le sync
<img src="@source/tp/android/ressources/sync.png" alt="Sync"></p>
</div>
<p>Notre projet est maintenant prêt pour faire des appels réseau. Nous allons écrire le code « minimum » permettant de réaliser les appels.</p>
<h2 id="definir-les-modeles-de-retour" tabindex="-1"><a class="header-anchor" href="#definir-les-modeles-de-retour" aria-hidden="true">#</a> Définir les modèles de retour</h2>
<p>La première étape et certainement la plus importante, c'est la définition des modèles de retour de votre API. En tant que débutant vous négligez souvent cette partie-là du travail. C'est pourtant l'un des éléments les plus importants. Pour l'exemple, je vais prendre un retour d'API tels que :</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Valentin Brosseau"</span><span class="token punctuation">,</span>
    <span class="token property">"content"</span><span class="token operator">:</span> <span class="token string">"Ceci est un retour d'API d'exemple"</span><span class="token punctuation">,</span>
    <span class="token property">"done"</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"John Doe"</span><span class="token punctuation">,</span>
    <span class="token property">"content"</span><span class="token operator">:</span> <span class="token string">"Random data"</span><span class="token punctuation">,</span>
    <span class="token property">"done"</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>Le format JSON est simple à lire, vous l'avez certainement croisé, mais dans l'exemple précédent nous avons donc :</p>
<ul>
<li>Un tableau (identifiable par la notation <code>[]</code>).</li>
<li>Une structure <code>Objet</code>, qui contient <code>4 propriétés</code> (id, name, content, done).</li>
</ul>
<p>Nous allons donc avoir une définition en Kotlin qui va ressembler à :</p>
<div class="custom-container warning"><p class="custom-container-title">Un instant</p>
<p>Le code que vous allez voir, est là juste pour illustrer il ne fonctionne pas directement. C'est juste une « traduction objet » de la structure JSON précédemment proposée.</p>
</div>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>
<span class="token comment">// Objet présent dans la liste (structure objet)</span>
<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">SampleObject</span> <span class="token punctuation">(</span><span class="token keyword">var</span> id <span class="token operator">:</span> Int<span class="token punctuation">,</span> <span class="token keyword">var</span> name <span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> content <span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">var</span> done <span class="token operator">:</span> Boolean<span class="token punctuation">)</span>

<span class="token comment">// Données fourni par l'API</span>
Array<span class="token operator">&lt;</span>SamplObject<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">ET C'EST TOUT</p>
<p>Cette étape que vous négligez souvent est aussi simple que ça…</p>
</div>
<h2 id="le-code-permettant-de-creer-l-api" tabindex="-1"><a class="header-anchor" href="#le-code-permettant-de-creer-l-api" aria-hidden="true">#</a> Le code permettant de créer l'API</h2>
<p>Nous avons maintenant notre objet de retour, nous allons pouvoir attaquer la partie qui nous intéresse le plus la partie appel HTTP. Vous allez le voir grâce à OkHTTP, Gson et Retrofit cette partie-là sera très simple. D'ailleurs, elle est assez répétitive une fois que vous en avez fait une vous en avez fait des centaines.</p>
<p>Nous allons donc déclarer une <code>Interface</code> cette interface va décrire les appels HTTP :</p>
<ul>
<li>Les liens.</li>
<li>Le type (GET, POST, …).</li>
<li>Les paramètres.</li>
<li>Et surtout le format de retour que vous souhaitez.</li>
</ul>
<p>Plutôt que des grandes explications, voilà un exemple de comment ça fonctionne.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">/**
 * ApiService
 */</span>
<span class="token keyword">interface</span> ApiService <span class="token punctuation">{</span>

    <span class="token comment">// Début définition des différentes API disponible sur votre serveur</span>
    <span class="token annotation builtin">@GET</span><span class="token punctuation">(</span><span class="token string">"/status"</span><span class="token punctuation">)</span>
    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">readStatus</span><span class="token punctuation">(</span><span class="token annotation builtin">@Query</span><span class="token punctuation">(</span><span class="token string">"identifier"</span><span class="token punctuation">)</span> identifier<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>SampleObject<span class="token operator">></span>

    <span class="token annotation builtin">@POST</span><span class="token punctuation">(</span><span class="token string">"/status"</span><span class="token punctuation">)</span>
    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">writeStatus</span><span class="token punctuation">(</span><span class="token annotation builtin">@Body</span> status<span class="token operator">:</span> SampleObject<span class="token punctuation">)</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>SampleObject<span class="token operator">></span>
    <span class="token comment">// Fin de la définition</span>

    <span class="token comment">// Équivalenent en kotlin d'élément « static »</span>
    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token comment">/**
         * Création d'un singleton pour la simplicité, mais normalement nous utilisons plutôt un
         * injecteur de dépendances.
         */</span>
        <span class="token keyword">val</span> instance <span class="token operator">=</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">/**
         * Création de l'objet qui nous permettra de faire les appels d'API
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ApiService <span class="token punctuation">{</span>
            <span class="token keyword">val</span> gson <span class="token operator">=</span> <span class="token function">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// JSON deserializer/serializer</span>

            <span class="token comment">// Create the OkHttp Instance</span>
            <span class="token keyword">val</span> okHttpClient <span class="token operator">=</span> OkHttpClient<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">readTimeout</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> TimeUnit<span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">writeTimeout</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> TimeUnit<span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token function">HttpLoggingInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setLevel</span><span class="token punctuation">(</span><span class="token keyword">if</span> <span class="token punctuation">(</span>BuildConfig<span class="token punctuation">.</span>DEBUG<span class="token punctuation">)</span> HttpLoggingInterceptor<span class="token punctuation">.</span>Level<span class="token punctuation">.</span>BODY <span class="token keyword">else</span> HttpLoggingInterceptor<span class="token punctuation">.</span>Level<span class="token punctuation">.</span>NONE<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span>Interceptor <span class="token punctuation">{</span> chain<span class="token operator">:</span> Interceptor<span class="token punctuation">.</span>Chain <span class="token operator">-></span>
                    <span class="token keyword">val</span> request <span class="token operator">=</span> chain<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addHeader</span><span class="token punctuation">(</span><span class="token string">"Accept"</span><span class="token punctuation">,</span> <span class="token string">"application/json"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    chain<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

            <span class="token keyword">return</span> Retrofit<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">baseUrl</span><span class="token punctuation">(</span><span class="token string">"https://le.lien.de.votre.api"</span><span class="token punctuation">)</span> <span class="token comment">// Mieux -> BuildConfig.URI_REMOTE_SERVER, oui oui écrire en dur un lien est une TRÈS MAUVAISE IDÉE !</span>
                <span class="token punctuation">.</span><span class="token function">client</span><span class="token punctuation">(</span>okHttpClient<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addConverterFactory</span><span class="token punctuation">(</span>GsonConverterFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>gson<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>ApiService<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Oui c'est tout</p>
<p>Cette Interface contient l'ensemble de la logique nécessaire. Le reste, ça va être votre code « permettant d'utiliser l'API ». Et c'est là le grand avantage de cette stack applicative.</p>
<p>Vous allez donc consommer de la donnée dans des types « natifs » comme si vos données étaient en locale, le tout typer. La Rolls donc 👌</p>
</div>
<div class="custom-container danger"><p class="custom-container-title">N'oubliez pas la structure</p>
<p>Ici je me concentre sur le code et pas sur l'organisation. Bien évidemment, dans votre vrai code vous rangerez correctement cette Interface.</p>
<p>Dans par exemple un package <code>remote.http</code>.</p>
<p>🚀 C'est important ne le négligez pas 🚀</p>
</div>
<h2 id="appeler-votre-api" tabindex="-1"><a class="header-anchor" href="#appeler-votre-api" aria-hidden="true">#</a> Appeler votre API</h2>
<p>Nous y sommes, enfin ! Voilà l'étape que vous attendiez… Comment appeler l'API depuis votre <code>activity</code>… Vous allez voir ça va encore être trèèèès simple !</p>
<p>Pour l'exemple voilà notre Interface :</p>
<p><img src="@source/tp/android/ressources/layout_http_demo.png" alt="Exemple de layout"></p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token operator">:</span> Bundle<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Votre code de d'habitude…</span>

        findViewById<span class="token operator">&lt;</span>Button<span class="token operator">></span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>httpButton<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setOnClickListener</span><span class="token punctuation">{</span>
            <span class="token function">CoroutineScope</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>IO<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">launch</span> <span class="token punctuation">{</span>
                runCatching <span class="token punctuation">{</span>
                    <span class="token keyword">val</span> arrStatus <span class="token operator">=</span> ApiService<span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">readStatus</span><span class="token punctuation">(</span>ledStatus<span class="token punctuation">.</span>identifier<span class="token punctuation">)</span>

                    runOnUiThread<span class="token punctuation">{</span>
                        dataSource<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>arrStatus<span class="token punctuation">)</span>
                        Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token label symbol">@YourActivity</span><span class="token punctuation">,</span> <span class="token string">"Résultat de l'appel réseau"</span> <span class="token operator">+</span> arrStatus<span class="token punctuation">.</span>size<span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>Détaillons le code, nous avons une partie de votre <code>onCreate</code>, pour l'instant aucun changement.</p>
<p>La partie qui vous intéresse est la suivante, pour que celle-ci soit compréhensible là voilà documenté.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">// Démarrage d'une coroutine sur le thread IO celui permettant de faire un appel réseau.</span>
<span class="token comment">// Si vous êtes sur le UI l'application plantera instantanément (car c'est interdit, vous risquez de freezer l'interface le temps de la réponse du serveur)</span>
<span class="token function">CoroutineScope</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>IO<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">launch</span> <span class="token punctuation">{</span>
    runCatching <span class="token punctuation">{</span>

        <span class="token comment">// « Le Scope » présent ici est capable de s'arrêter et de se réveiller en fonction d'action extérieur, dans notre cas, il va être actif au moment de la demande « de la ressource » réseau.</span>

        <span class="token comment">// On appel le code généré par « Retrofit », en suivant la définition de votre interface.</span>
        <span class="token comment">// Nous allons donc ici avoir en retour un tableau de « SampleObject »</span>
        <span class="token keyword">val</span> arrStatus <span class="token operator">=</span> ApiService<span class="token punctuation">.</span>instance<span class="token punctuation">.</span><span class="token function">readStatus</span><span class="token punctuation">(</span>ledStatus<span class="token punctuation">.</span>identifier<span class="token punctuation">)</span>

        <span class="token comment">// Puis il sera réveillé au moment de la réponse du serveur pour afficher les données</span>
        runOnUiThread<span class="token punctuation">{</span>
            <span class="token comment">// runOnUiThread indique que le code sera exécuté dans le contexte de l'UI, c'est-à-dire dans le bon thread.</span>
            <span class="token comment">// ATTENTION si vous oubliez le runOnUiThread la manipulation de votre vue sera impossible ! Et votre application plantera.</span>
            dataSource<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>arrStatus<span class="token punctuation">)</span>
            Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token label symbol">@YourActivity</span><span class="token punctuation">,</span> <span class="token string">"Résultat de l'appel réseau"</span> <span class="token operator">+</span> arrStatus<span class="token punctuation">.</span>size<span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>Et voilà ! C'est fini, votre application est maintenant capable de faire des appels réseau.</p>
<h2 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire</h2>
<p>Maintenant que nous avons vu la théorie, je vous laisse implémenter la consigne suivante :</p>
<ul>
<li>L'API à appeler est la suivante : https://reqres.in/api/users</li>
<li>Vous devez créer une activity qui affichera le contenu retourné par l'API</li>
<li>Vous devez définir des modèles correspondant au retour.</li>
<li>Vous devez organiser votre code en package.</li>
<li>Vous devez utiliser un RecyclerView (Natif, ou librairie type Recyclical)</li>
</ul>
<details class="custom-container details"><summary>En panne d'inspiration ?</summary>
<p><a href="https://github.com/c4software/android-api-course-project" target="_blank" rel="noopener noreferrer">Voilà un exemple de code pour répondre à la consigne<ExternalLinkIcon/></a></p>
</details>
</template>
