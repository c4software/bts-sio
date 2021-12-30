<template><h1 id="decouverte-des-bases-d-android" tabindex="-1"><a class="header-anchor" href="#decouverte-des-bases-d-android" aria-hidden="true">#</a> Découverte des bases d'Android</h1>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#creer-un-projet">Créer un projet</RouterLink></li><li><RouterLink to="#creation-de-l-emulateur">Création de l&#39;émulateur</RouterLink></li><li><RouterLink to="#les-textes">Les textes</RouterLink></li><li><RouterLink to="#decouverte-des-dossiers">Découverte des dossiers</RouterLink></li><li><RouterLink to="#le-fichier-androidmanifest">Le fichier AndroidManifest</RouterLink><ul><li><RouterLink to="#a-faire">À faire :</RouterLink></li></ul></li><li><RouterLink to="#personnalisation-de-votre-application">Personnalisation de votre application</RouterLink></li><li><RouterLink to="#les-layouts">Les layouts</RouterLink><ul><li><RouterLink to="#a-faire-1">À faire :</RouterLink></li><li><RouterLink to="#les-ressources-alternatives">Les ressources alternatives</RouterLink></li><li><RouterLink to="#a-faire-2">À faire :</RouterLink></li><li><RouterLink to="#les-dimensions-et-contraintes">Les dimensions et contraintes</RouterLink></li><li><RouterLink to="#a-faire-3">À faire :</RouterLink></li></ul></li><li><RouterLink to="#l-activity">L&#39;activity</RouterLink><ul><li><RouterLink to="#a-faire-4">À faire :</RouterLink></li></ul></li><li><RouterLink to="#rendre-un-element-clickable">Rendre un élément clickable</RouterLink><ul><li><RouterLink to="#a-faire-5">À faire</RouterLink></li></ul></li><li><RouterLink to="#rendre-un-element-clickable-2">Rendre un élément clickable 2</RouterLink><ul><li><RouterLink to="#a-faire-6">À faire</RouterLink></li><li><RouterLink to="#les-kotlin-android-extension">Les Kotlin Android Extension</RouterLink></li><li><RouterLink to="#creer-une-autre-activity">Créer une autre activity</RouterLink></li></ul></li><li><RouterLink to="#theme-et-drawable">Thème et Drawable</RouterLink><ul><li><RouterLink to="#a-faire-7">À faire</RouterLink></li></ul></li><li><RouterLink to="#theme-de-couleurs">Thème de couleurs</RouterLink><ul><li><RouterLink to="#a-faire-8">À faire</RouterLink></li></ul></li><li><RouterLink to="#les-intent-externes-tierces">Les Intent externes / tierces</RouterLink><ul><li><RouterLink to="#ouvrir-les-parametres-bluetooth">Ouvrir les paramètres Bluetooth</RouterLink></li><li><RouterLink to="#ouvrir-un-lien-web">Ouvrir un lien web</RouterLink></li><li><RouterLink to="#ouvrir-google-maps">Ouvrir Google Maps</RouterLink></li><li><RouterLink to="#a-faire-9">À faire</RouterLink></li></ul></li><li><RouterLink to="#les-permissions">Les Permissions</RouterLink></li><li><RouterLink to="#declaration-des-permissions">Déclaration des permissions</RouterLink><ul><li><RouterLink to="#permission-acceptee">Permission acceptée ?</RouterLink></li><li><RouterLink to="#demander-la-permission">Demander la permission</RouterLink></li><li><RouterLink to="#methode-surchargee-apres-l-acceptation">Méthode surchargée après l&#39;acceptation</RouterLink></li><li><RouterLink to="#obtenir-la-localisation">Obtenir la localisation</RouterLink></li><li><RouterLink to="#bonus-obtenir-l-adresse-par-rapport-au-lat-long">BONUS ! Obtenir l&#39;adresse par rapport au lat, long</RouterLink></li><li><RouterLink to="#a-faire-10">À faire</RouterLink></li></ul></li><li><RouterLink to="#les-recyclerview">Les Recyclerview</RouterLink></li><li><RouterLink to="#les-«-plugins-»-librairies">Les « Plugins » / Librairies</RouterLink><ul><li><RouterLink to="#les-dialogs">Les Dialogs</RouterLink></li><li><RouterLink to="#avec-le-material-design-de-google">Avec le Material Design de Google</RouterLink></li><li><RouterLink to="#recyclical">Recyclical</RouterLink></li></ul></li><li><RouterLink to="#activite-«-parametres-»">Activité « Paramètres »</RouterLink><ul><li><RouterLink to="#la-classe-localpreferences-aka-sauvegarder-des-parametres">La classe LocalPreferences (AKA Sauvegarder des paramètres)</RouterLink></li></ul></li></ul></nav>
</details>
<div class="custom-container danger"><p class="custom-container-title">XML ou Compose ?</p>
<p>Nous sommes en 2021, le monde d'Android évolue… Pendant des années l'écriture des « layouts » (interface) n'était possible que via du XML. Il est maintenant possible d'écrire les layouts de manières bien plus modernes avec <a href="https://developer.android.com/jetpack/compose" target="_blank" rel="noopener noreferrer">JetPack Compose<ExternalLinkIcon/></a>. Le TP que vous suivez est toujours valide, mais repose sur l'utilisation de XML.</p>
</div>
<h2 id="creer-un-projet" tabindex="-1"><a class="header-anchor" href="#creer-un-projet" aria-hidden="true">#</a> Créer un projet</h2>
<p>La première étape est la création d'un projet. Pour ça nous allons utiliser « Android Studio » qui est l'IDE à utiliser pour créer une application Android.</p>
<p>Lors de la création, Android Studio va nous poser plusieurs questions, nous allons donc choisir :</p>
<ul>
<li>Template : Empty Activity</li>
<li>Language : Kotlin</li>
<li>SDK Min. : SDK 26.</li>
</ul>
<p>Je vous laisse suivre les étapes de création d'un nouveau projet.</p>
<div class="custom-container warning"><p class="custom-container-title">Mais quelques petites remarques :</p>
<ul>
<li>Le choix du package est très important. Comme nous avons vu ensemble en cours, le « Package » doit être unique. En effet deux applications ne peuvent pas avoir le même.</li>
<li>Choisir un min SDK qui correspond aux cibles des mobiles souhaités. (Si vous êtes en France ou dans un autre pays, il conviendra de faire le bon choix).</li>
<li>Kotlin est maintenant le langage à choisir en 2021, Java et Kotlin cohabite sans problème vous n'aurez donc aucun problème de compatibilité.</li>
</ul>
</div>
<h2 id="creation-de-l-emulateur" tabindex="-1"><a class="header-anchor" href="#creation-de-l-emulateur" aria-hidden="true">#</a> Création de l'émulateur</h2>
<p>Comme vu ensemble pendant le cours, l'émulateur va nous permettre de tester « simplement » notre application avec des performances <em>suffisante dans les cas simple</em>. La création de celui-ci est intégrée à Android Studio. Dans Android Studio la partie émulateur s'appelle AVD et est disponible dans le menu <code>tools</code></p>
<p><img src="@source/tp/android/ressources/avd.png" alt="AVD"></p>
<p>Pour le choix du type de devices vous êtes libres… Mais le mieux est de choisir un « template de mobile » assez représentatif de ce que l'on trouve chez les clients. Un bon choix est par exemple un « Pixel 2 » avec Android Oreo.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Le Logo Playstore présent sur la ligne d'un simulateur indique que celui-ci est équipé des Play Services. Bien que dans notre cas ça ne change pas grand-chose, je vous invite vivement à choisir un émulateur avec les Play Services, car celui-ci sera très proche d'un vrai téléphone trouvable dans le commerce.</p>
</div>
<p>Maintenant que votre émulateur est créé, nous allons pouvoir lancer l'application « Run -&gt; Run App ».</p>
<h2 id="les-textes" tabindex="-1"><a class="header-anchor" href="#les-textes" aria-hidden="true">#</a> Les textes</h2>
<p>Android est une plateforme « ouverte » et nativement prévue pour fonctionner dans le monde entier (Android pour tous). Il est donc logique que le i18n (internationalisation) soit intégré et ~même recommandé~ obligatoire pour tout bon développeur.</p>
<p>L'ensemble des textes de votre application <em>doit être</em> dans le fichier <code>values/strings.xml</code>. Je vous laisse y jeter un petit coup d'œil 👀</p>
<h2 id="decouverte-des-dossiers" tabindex="-1"><a class="header-anchor" href="#decouverte-des-dossiers" aria-hidden="true">#</a> Découverte des dossiers</h2>
<p>En complément de ce dont je vous ai parlé en cours, je vous laisse quelques minutes découvrir l'ensemble des dossiers. Je vous laisse regarder plus en détail le dossier <code>res</code>, mais également les fichiers <code>gradle</code>.</p>
<p>Quelques points d'attentions :</p>
<ul>
<li>Le dossier <code>res</code>.</li>
<li>Les images déjà présentes dans votre projet, notamment le XML pour l'icône.</li>
<li>La structure en général et l'organisation en <code>package</code> qui reprend votre choix lors de la configuration.</li>
</ul>
<h2 id="le-fichier-androidmanifest" tabindex="-1"><a class="header-anchor" href="#le-fichier-androidmanifest" aria-hidden="true">#</a> Le fichier AndroidManifest</h2>
<p>Pour rappel le fichier manifest va nous permettre d'exposer « de la configuration » relative à votre application sur le téléphone, cette configuration est très large :</p>
<ul>
<li>Le nom de votre application.</li>
<li>Les <code>activity</code> accessibles.</li>
<li>L'icône de votre application.</li>
<li>Les services de votre application.</li>
<li>Les paramétrages spécifiques de vos activités (Orientation, thème, comportement…)</li>
</ul>
<h3 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire :</h3>
<ul>
<li>Éditer le fichier <code>AndroidManifest.xml</code>.</li>
<li>Changer le nom de votre application (attention à bien utiliser la mécanique <code>i18n</code>).</li>
<li>Regarder l'ensemble des paramètres spécifier dans le XML</li>
<li>Tester à nouveau votre application</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Petit raccourci pratique d'Android Studio. Si vous appuyez deux fois sur la touche <kbd>Shift</kbd><kbd>Shift</kbd> Android Studio vous proposera de chercher des actions / fichiers / menus dans l'ensemble de votre projet.</p>
</div>
<h2 id="personnalisation-de-votre-application" tabindex="-1"><a class="header-anchor" href="#personnalisation-de-votre-application" aria-hidden="true">#</a> Personnalisation de votre application</h2>
<p>Changer l'icône de l'application en utilisant les outils fournis par Google dans Android Studio « Image asset » :</p>
<p><img src="@source/tp/android/ressources/change_icon.png" alt="Change Icon"></p>
<p>Une fois fait, regarder les modifications dans votre projet.</p>
<p><em>Notamment :</em></p>
<ul>
<li>Le fichier <code>AndroidManifest.xml</code> est-ce que celui-ci a été modifié ?</li>
<li>Si oui, quel(s) élément(s) sont différents ?</li>
<li>Si non, pouvez-vous me dire pourquoi ?</li>
</ul>
<h2 id="les-layouts" tabindex="-1"><a class="header-anchor" href="#les-layouts" aria-hidden="true">#</a> Les layouts</h2>
<p>Si vous avez ouvert le fichier <code>activity_main.xml</code> vous avez certainement constaté que celui-ci était très simple. Nous allons donc le modifier un petit peu.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Android Studio vous propose un éditeur graphique de l'interface, c'est pratique, mais pour apprendre ce n'est pas idéal. Je vous propose de changer de mode d'édition afin de passer en mode XML via la vue <code>Split</code>. Qui nous affichera à la fois le graphique ainsi que le XML.</p>
<p><img src="@source/tp/android/ressources/split.png" alt="SPLIT"></p>
</div>
<h3 id="a-faire-1" tabindex="-1"><a class="header-anchor" href="#a-faire-1" aria-hidden="true">#</a> À faire :</h3>
<ul>
<li>Éditer le layout <code>activity_main.xml</code>.</li>
<li>Ajouter une balise ImageView.</li>
<li>Ajouter également une balise Button.</li>
</ul>
<h3 id="les-ressources-alternatives" tabindex="-1"><a class="header-anchor" href="#les-ressources-alternatives" aria-hidden="true">#</a> Les ressources alternatives</h3>
<p>Android intègre la gestion des ressources « alternative », c'est-à-dire la possibilité de charger automatiquement des ressources en fonction de conditions liées au téléphone du client type :</p>
<ul>
<li>Taille de l'écran.</li>
<li>Langue.</li>
<li>Rotation de l'écran (Paysage / Portrait).</li>
<li>DPI</li>
<li>Thème sombre</li>
<li>Version d'Android</li>
<li>etc.</li>
</ul>
<p>Cette création de ressource est réalisable directement depuis Android Studio :</p>
<p><img src="@source/tp/android/ressources/create_new_resources.png" alt="Create new resources">
<img src="@source/tp/android/ressources/resources.png" alt="Création de ressources alternatives"></p>
<div class="custom-container tip"><p class="custom-container-title">Vous pouvez tout redéfinir</p>
<p>L'ensemble des ressources (<code>res</code>) est re-définissable sans écrire de code. Par exemple si vous souhaitez redéfinir des <code>strings</code> dans différentes conditions il suffit de :</p>
<p><img src="@source/tp/android/ressources/resources_strings.png" alt="Popup de création">
<img src="@source/tp/android/ressources/exemple_res_alt.png" alt="Ressources alternatives"></p>
</div>
<h3 id="a-faire-2" tabindex="-1"><a class="header-anchor" href="#a-faire-2" aria-hidden="true">#</a> À faire :</h3>
<ul>
<li>Éditer le layout <code>activity_main.xml</code>.</li>
<li>Ajouter une balise TextView.</li>
<li>Dans le <code>android:text</code> utiliser une strings <code>android:text=&quot;@strings/monString&quot;</code>.</li>
<li>Celle-ci doit être différente en fonction si l'utilisateur a son téléphone en paysage (<code>land</code>) ou en portrait.</li>
<li>Ajuster également la taille du logo pour que celui-ci soit plus petit si le téléphone est en portrait (<code>land</code>).</li>
</ul>
<h3 id="les-dimensions-et-contraintes" tabindex="-1"><a class="header-anchor" href="#les-dimensions-et-contraintes" aria-hidden="true">#</a> Les dimensions et contraintes</h3>
<p>Vous avez donc ajouté deux nouveaux éléments dans votre layout, mais ils n'ont n'y taille ni « positions ». En effet comme vu ensemble en cours, nous utilisons un layout de type « ConstraintLayout » c'est-à-dire que vos éléments doivent être contraints les uns par rapport aux autres.</p>
<p>Vous allez donc devoir ajouter les attributs suivants sur vos deux nouveaux éléments :</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>VotreElement</span>
    <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@+id/monElement<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap_content<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap_content<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintBottom_toBottomOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintEnd_toEndOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintStart_toStartOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintTop_toTopOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><em>Un peu d'explication :</em></p>
<ul>
<li><code>android:id</code> permet de rendre l'élément accessible depuis le code, ou tout simplement depuis un autre élément afin de définir une contrainte.</li>
<li><code>android:layout_width</code> et <code>android:layout_height</code> définisse la taille de votre élément. <code>wrap_content</code> indique que la taille doit être celle du contenu. Je vous laisse découvrir les autres propriétés avec <kbd>alt</kbd> + <kbd>entrée</kbd> sur <code>wrap_content</code>.</li>
<li><code>app:layout_constraint…</code> définissent les contraintes entre l'élément et les autres éléments de layout. Dans notre cas « parent » signifie que les contraintes seront avec le parent, c'est-à-dire la fenêtre dans le cas présent.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Si vous souhaitez contraindre un élément avec un autre, la syntaxe sera la même, mais vous allez devoir indiquer une contrainte du type <code>&quot;@id/imageView&quot;</code>.</p>
</div>
<h3 id="a-faire-3" tabindex="-1"><a class="header-anchor" href="#a-faire-3" aria-hidden="true">#</a> À faire :</h3>
<p>Je vous laisse réaliser l'ensemble des contraintes afin que votre layout ressemble à :</p>
<p><img src="@source/tp/android/ressources/constrainte.png" alt="Constrainte"></p>
<p>⚠️ Vous noterez l'icône de l'ESEO, je vous laisse l'ajouter dans le dossier <code>drawable</code> de votre projet. Le fichier doit être au format <code>png</code> ou <code>jpeg</code>. Une fois celle-ci ajoutée modifier l'ImageView pour l'utiliser dans l'<code>ImageView</code> avec par exemple <code>app:srcCompat=&quot;@drawable/eseo&quot;</code>.</p>
<p>✋ Relancer l'application et tester que celle-ci fonctionne.</p>
<h2 id="l-activity" tabindex="-1"><a class="header-anchor" href="#l-activity" aria-hidden="true">#</a> L'activity</h2>
<p>Nous avons une activity qui pour l'instant ne fait pas grand-chose. Si vous regardez le code celui-ci est presque vide. Je vous propose de la modifier, en premier lieu nous allons ajouter un message au lancement de celle-ci.</p>
<p>Un message simple sur Android s'appelle un Toast :</p>
<p><img src="@source/tp/android/ressources/toast.png" alt="Ceci est un toast"></p>
<p>Ajouter celui-ci dans la méthode <code>onCreate</code> de votre <code>MainActivity.kt</code>.</p>
<p>Vous pouvez utiliser la complétion de votre IDE, <code>toast</code> puis <kbd>tab</kbd>.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Les toasts sont rapides et simples à mettre en place. Cependant, ils ne sont pas très beaux. C'est pour ça que nous les utiliserons principalement que pour « les informations de tests ou sans grandes importances ».</p>
</div>
<h3 id="a-faire-4" tabindex="-1"><a class="header-anchor" href="#a-faire-4" aria-hidden="true">#</a> À faire :</h3>
<ul>
<li>Ajouter le Toast.</li>
<li>Le context, comme vu ensemble pendant le cours correspond à votre <code>activity</code> donc il faut indiquer <code>this</code>.</li>
<li>Pour le texte, pensez bien à mettre celui-ci dans le fichier <code>strings.xml</code> puis à le récupérer via <code>getString(R.string.votreId)</code>.</li>
</ul>
<p>✋ Tester votre modification.</p>
<h2 id="rendre-un-element-clickable" tabindex="-1"><a class="header-anchor" href="#rendre-un-element-clickable" aria-hidden="true">#</a> Rendre un élément clickable</h2>
<p>Pour rendre un élément cliquable sur Android, nous avons plusieurs façons de faire. La première c'est dans le code via son id et la méthode <code>findViewById</code>.</p>
<p>Ajouter dans votre méthode <code>onCreate</code> le code suivant :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    findViewById<span class="token operator">&lt;</span>Button<span class="token operator">></span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>myButton<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
        <span class="token comment">// Votre action</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Et voilà… Votre bouton est cliquable.</p>
<h3 id="a-faire-5" tabindex="-1"><a class="header-anchor" href="#a-faire-5" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>Rendre votre bouton clickable.</li>
<li>Afficher un Toast sur le OnClick.</li>
</ul>
<p>⚠️ Attention à bien référencer le bon <code>R.id.myButton</code> par rapport à votre layout.</p>
<h2 id="rendre-un-element-clickable-2" tabindex="-1"><a class="header-anchor" href="#rendre-un-element-clickable-2" aria-hidden="true">#</a> Rendre un élément clickable 2</h2>
<p>Le <code>ViewBinding</code> est maintenant la nouvelle façon moderne de gérer « les références à la vue depuis le code Kotlin ». Ça fonctionne un peu comme le <code>findViewById</code> sauf que le Binding est automatique et surtout celui-ci gère automatiquement le typage !</p>
<p>Première étape il faut activer dans votre build.gradle le « ViewBinding », dans le block Android déjà présent ajouter :</p>
<div class="language-gladle ext-gladle line-numbers-mode"><pre v-pre class="language-gladle"><code>buildFeatures {
    viewBinding true
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Exemple dans mon cas :</p>
<p><img src="@source/tp/android/ressources/viewBinding.png" alt="viewBinding"></p>
<p>✋ N'oubliez pas de resync l'IDE</p>
<p><img src="@source/tp/android/ressources/sync.png" alt="ide sync"></p>
<p>Maintenant nous avons maintenant un Binding automatique entre « La vue et le Code Kotlin », cependant pour que celui-ci soit accessible de l'ensemble de notre classe, nous allons devoir modifier légèrement notre <code>class</code>.</p>
<p>Exemple de modification dans la <code>MainActivity</code> :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">class</span> MainActivity <span class="token operator">:</span> <span class="token function">AppCompatActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">lateinit</span> <span class="token keyword">var</span> binding<span class="token operator">:</span> ActivityMainBinding <span class="token comment">// &lt;-- Référence à notre ViewBinding</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token operator">:</span> Bundle<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span>

        <span class="token comment">// --> Indique que l'on utilise le ViewBinding</span>
        binding <span class="token operator">=</span> ActivityMainBinding<span class="token punctuation">.</span><span class="token function">inflate</span><span class="token punctuation">(</span>layoutInflater<span class="token punctuation">)</span>
        <span class="token function">setContentView</span><span class="token punctuation">(</span>binding<span class="token punctuation">.</span>root<span class="token punctuation">)</span>

        <span class="token comment">// L'ensemble de nos références sont disponibles directement dans « binding »</span>
        binding<span class="token punctuation">.</span>button<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
            <span class="token comment">// Click sur le Button nommé « Button » dans notre Layout.</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><a href="https://developer.android.com/topic/libraries/view-binding" target="_blank" rel="noopener noreferrer">En savoir plus dans la documentation<ExternalLinkIcon/></a></p>
<h3 id="a-faire-6" tabindex="-1"><a class="header-anchor" href="#a-faire-6" aria-hidden="true">#</a> À faire</h3>
<p>Modifier le code précédent pour utiliser la nouvelle façon vue précédemment.</p>
<h3 id="les-kotlin-android-extension" tabindex="-1"><a class="header-anchor" href="#les-kotlin-android-extension" aria-hidden="true">#</a> Les Kotlin Android Extension</h3>
<div class="custom-container warning"><p class="custom-container-title">Cette méthode est maintenant dépréciée</p>
<p>Bien que pratique cette méthode n'est maintenant plus « la bonne façon de faire.</p>
<p>La seconde façon (moins longue) d'accéder à un élément est via « les Kotlin-Android-Extensions ».</p>
<details class="custom-container details"><summary>Je prends le risque je regarde</summary>
<p>Les extensions sont à ajouter dans votre <code>build.gradle</code> (app). Ajouter</p>
<div class="language-gradle ext-gradle line-numbers-mode"><pre v-pre class="language-gradle"><code>plugins {
    id 'com.android.application' // Déjà présente.
    id 'kotlin-android' // Vous devez déjà l'avoir.
    id 'kotlin-android-extensions' // &lt;- Cette ligne.
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>✋ N'oubliez pas de resync l'IDE</p>
<p><img src="@source/tp/android/ressources/sync.png" alt="ide sync"></p>
<p>Maintenant vous pouvez simplement faire <code>myButton.setOnClickListener…</code> pour rendre l'élément cliquable.</p>
</details>
</div>
<h3 id="creer-une-autre-activity" tabindex="-1"><a class="header-anchor" href="#creer-une-autre-activity" aria-hidden="true">#</a> Créer une autre activity</h3>
<p>Nous allons ajouter une nouvelle activity, celle-ci sera un « Splash Screen », elle sera donc affichée au lancement de l'application.</p>
<h4 id="etape-1-creer-l-activity" tabindex="-1"><a class="header-anchor" href="#etape-1-creer-l-activity" aria-hidden="true">#</a> Étape 1 : Créer l'activity</h4>
<p>Pour créer une activity, Android Studio nous propose dans les menus une action qui automatise l'ensemble du processus à savoir :</p>
<ul>
<li>Création du package</li>
<li>Création de la class</li>
<li>Création du layout</li>
<li>Modification du AndroidManifest.xml</li>
</ul>
<p>Créer la nouvelle activity :</p>
<p><img src="@source/tp/android/ressources/create_activity.png" alt="create_activity"></p>
<p>Puis :</p>
<p><img src="@source/tp/android/ressources/create_activity2.png" alt="create_activity"></p>
<h4 id="etape-2-voir-modifier-le-fichier-androidmanifest-xml" tabindex="-1"><a class="header-anchor" href="#etape-2-voir-modifier-le-fichier-androidmanifest-xml" aria-hidden="true">#</a> Étape 2 : Voir / Modifier le fichier AndroidManifest.xml</h4>
<p>L'activity est maintenant créée. Sauf que… nous avons deux activity qui se lancent au démarrage. Modifier le AndroidManifest pour retirer :</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>intent-filter</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>action</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.intent.action.MAIN<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>category</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.intent.category.LAUNCHER<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>intent-filter</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>De la <code>MainActivity</code>.</p>
<p>Modifier également le thème de la SplashActivity afin de lui spécifier un thème sans « ActionBar ». Pour ça il vous suffit d'ajouter dans les attributs celui-ci :</p>
<p><code>android:theme=&quot;@style/Theme.AppCompat.DayNight.NoActionBar&quot;</code></p>
<p>Exemple :</p>
<p><code>&lt;activity android:name=&quot;.SplashActivity&quot; android:theme=&quot;@style/Theme.AppCompat.DayNight.NoActionBar&quot;&gt;</code></p>
<p>✋ Lancer l'application. Vous devez être bloqué sur une « vue blanche ».</p>
<h4 id="etape-3-modifier-le-layout" tabindex="-1"><a class="header-anchor" href="#etape-3-modifier-le-layout" aria-hidden="true">#</a> Étape 3 : Modifier le layout</h4>
<p>Je vous laisse modifier le layout pour que celui-ci ressemble à :</p>
<p><img src="@source/tp/android/ressources/splash.png" alt="Splash"></p>
<h4 id="etape-4-lancer-une-activity" tabindex="-1"><a class="header-anchor" href="#etape-4-lancer-une-activity" aria-hidden="true">#</a> Étape 4 : Lancer une activity</h4>
<p>Maintenant que notre « Splash » s'affiche nous allons pouvoir lancer l'autre activity après <em>un délai</em>. Dans cette partie, nous allons voir comment lancer une activité, et plus précisément comment nous pouvons « simplifier » / « uniformiser » le lancement via une méthode static.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>🤓 Si vous avez déjà fait du développement Android, rien de nouveau, je vous propose simplement juste <strong>une autre façon</strong> de vous organiser.</p>
</div>
<h4 id="etape-4-1-methode-«-static-»" tabindex="-1"><a class="header-anchor" href="#etape-4-1-methode-«-static-»" aria-hidden="true">#</a> Étape 4.1 : Méthode « static »</h4>
<p>Lancer une activity sur Android est aussi simple que d'appeler la méthode <code>startActivity</code> au moment voulu. Pour « simplifier l'écriture » et éviter le code spaghetti, nous allons ajouter dans le code de la MainActivity une méthode qui sera en charge de « retourner les informations (appelée une <code>Intent</code>) » nécessaires au lancement de celle-ci.</p>
<p>En Kotlin les méthodes static <strong>doivent être mise</strong> dans <code>companion object</code>. Nous allons donc ajouter « un compagnon » dans notre class. Un compagnon Object va nous permettre de créer une méthode « static » qui sera accessible directement sans instancier là class.</p>
<p>À faire :</p>
<p>Ajouter le code suivant dans la <em>MainActivity</em> :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">getStartIntent</span><span class="token punctuation">(</span>context<span class="token operator">:</span> Context<span class="token punctuation">)</span><span class="token operator">:</span> Intent <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">Intent</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> MainActivity<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="etape-4-2-appelez-la-methode" tabindex="-1"><a class="header-anchor" href="#etape-4-2-appelez-la-methode" aria-hidden="true">#</a> Étape 4.2 : Appelez-la méthode</h4>
<p>Dans le code de la <em>SplashActivity</em> nous allons lancer après quelques secondes le code permettant de lancer la <em>MainActivity</em>. Pour ça ajouter le code suivant dans le <code>onCreate</code> de votre <code>SplashActivity</code>.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token function">Handler</span><span class="token punctuation">(</span>Looper<span class="token punctuation">.</span><span class="token function">getMainLooper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">postDelayed</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token function">startActivity</span><span class="token punctuation">(</span>MainActivity<span class="token punctuation">.</span><span class="token function">getStartIntent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Analyse du code</p>
<p>Le code à proprement dit qui lance l'activity est le suivant :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token function">startActivity</span><span class="token punctuation">(</span>MainActivity<span class="token punctuation">.</span><span class="token function">getStartIntent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Et oui c'est aussi simple que ça!</p>
</div>
<ul>
<li>À quoi correspond le <code>this</code> ?</li>
<li>À quoi sert le <code>finish()</code> ?</li>
<li>Que se passe-t-il si vous ne le mettez pas ?</li>
<li>Pouvez-vous changer le temps d'attente ?</li>
</ul>
<h2 id="theme-et-drawable" tabindex="-1"><a class="header-anchor" href="#theme-et-drawable" aria-hidden="true">#</a> Thème et Drawable</h2>
<p>Le grand chalenge d'une application mobile c'est « le côté visuel ». Bien évidemment je sais que vous n'êtes pas des experts UI/UX, Google le sait également. C'est pour ça qu'ils ont intégré dans Android Studio un catalogue d'icône nous permettant nous développeurs de travailler avec des éléments propres et de qualité.</p>
<p>Pour rappel les images dans Android s'appelle des <code>Drawables</code> et sont dans le dossier <code>Res</code>. Android Studio intègre un catalogue nommé « Vector Asset », celui-ci est disponible dans les menus :</p>
<p><img src="@source/tp/android/ressources/vector_asset.png" alt="Vector Asset"></p>
<p>Pour choisir une icône :</p>
<p><img src="@source/tp/android/ressources/vector_asset2.png" alt="Vector Asset choix"></p>
<h3 id="a-faire-7" tabindex="-1"><a class="header-anchor" href="#a-faire-7" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>Ajouter un nouveau drawable dans votre projet.</li>
<li>Que constatez-vous comme changement dans les Drawable ?</li>
<li>Utiliser l'image choisie dans votre layout « Splash ». L'image choisie doit-être en bas à droite.</li>
</ul>
<h2 id="theme-de-couleurs" tabindex="-1"><a class="header-anchor" href="#theme-de-couleurs" aria-hidden="true">#</a> Thème de couleurs</h2>
<p>Comme vous avez pu le constater, les couleurs de votre application sont « principalement » violettes. Les couleurs en question sont définies dans le thème de votre application.</p>
<p>Je vous propose de les modifier. Première étape ajouter vos couleurs dans le fichier <code>colors.xml</code>. Une fois fait modifier le fichier <code>themes.xml</code> et plus particulièrement le <code>colorPrimary</code> pour utiliser la couleur que vous avez ajoutée.</p>
<h3 id="a-faire-8" tabindex="-1"><a class="header-anchor" href="#a-faire-8" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>Ajouter une couleur (<code>colors.xml</code>). Par exemple, ajouter une « mainPrimaryColor ».</li>
<li>L'utiliser dans le thème (<code>themes.xml</code>) en modifiant par le <code>colorPrimary</code> pour utiliser votre nouvelle couleur.</li>
</ul>
<h2 id="les-intent-externes-tierces" tabindex="-1"><a class="header-anchor" href="#les-intent-externes-tierces" aria-hidden="true">#</a> Les Intent externes / tierces</h2>
<p>Dans le système Android, nous avons à notre disposition en plus des Intents que vous déclarez la possibilité d'appeler ceux du système. La liste est très grande :</p>
<ul>
<li>Lancer les paramètres.</li>
<li>Ouvrir un lien.</li>
<li>Ouvrir une Carte Google Maps.</li>
<li>…</li>
</ul>
<h3 id="ouvrir-les-parametres-bluetooth" tabindex="-1"><a class="header-anchor" href="#ouvrir-les-parametres-bluetooth" aria-hidden="true">#</a> Ouvrir les paramètres Bluetooth</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">val</span> targetIntent <span class="token operator">=</span> <span class="token function">Intent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span> <span class="token punctuation">{</span>
    action <span class="token operator">=</span> android<span class="token punctuation">.</span>provider<span class="token punctuation">.</span>Settings<span class="token punctuation">.</span>ACTION_BLUETOOTH_SETTINGS
<span class="token punctuation">}</span>

<span class="token function">startActivity</span><span class="token punctuation">(</span>targetIntent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="ouvrir-un-lien-web" tabindex="-1"><a class="header-anchor" href="#ouvrir-un-lien-web" aria-hidden="true">#</a> Ouvrir un lien web</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token function">startActivity</span><span class="token punctuation">(</span><span class="token function">Intent</span><span class="token punctuation">(</span>Intent<span class="token punctuation">.</span>ACTION_VIEW<span class="token punctuation">,</span> Uri<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">"https://cours.brosseau.ovh"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="ouvrir-google-maps" tabindex="-1"><a class="header-anchor" href="#ouvrir-google-maps" aria-hidden="true">#</a> Ouvrir Google Maps</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token function">startActivity</span><span class="token punctuation">(</span><span class="token function">Intent</span><span class="token punctuation">(</span>Intent<span class="token punctuation">.</span>ACTION_VIEW<span class="token punctuation">,</span> Uri<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">"geo:47.472822,-0.5621756"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="a-faire-9" tabindex="-1"><a class="header-anchor" href="#a-faire-9" aria-hidden="true">#</a> À faire</h3>
<p>Maintenant que vous savez comment ouvrir une intent Externe :</p>
<ul>
<li>Ajouter sur la <code>MainActivity</code> une icône en haut à droite type « Settings ».</li>
<li>Celle-ci doit être cliquable et doit permettre d'ouvrire les paramètres (<code>ACTION_SETTINGS</code>).</li>
<li>Ajouter sous le bouton « En bas de l'activité » un texte cliquable <code>TextView</code> permettant d'ouvrir le site de l'ESEO.</li>
<li>Ajoute à côté du <code>TextView</code> un second <code>TextView</code> qui ouvre l'adresse / la position GPS de l'ESEO dans Google Maps.</li>
</ul>
<p>Exemple :</p>
<p><img src="@source/tp/android/ressources/sample_ui_test.png" alt="Sample UI TEST"></p>
<h2 id="les-permissions" tabindex="-1"><a class="header-anchor" href="#les-permissions" aria-hidden="true">#</a> Les Permissions</h2>
<p>Nous avons vu ensemble que la gestion des permissions était un élément important de la plateforme. Nous allons donc voir la théorie, puis la mettre en pratique.</p>
<p><img src="@source/tp/android/ressources/flow_permissions.png" alt="Les permissions"></p>
<p>Voilà le plus simple pour expliquer la mécanique des permissions c'est « un schéma ». Je vous propose de mettre en pratique avec la permission « LOCALISATION ». Je vais volontairement vous donner le code à implémenter (celui-ci est disponible de toute manière dans la documentation d'Android).</p>
<p>Pour réaliser cette fonctionnalité, nous allons ajouter une nouvelle activité (en utilisant les options de votre IDE).
Pour le layout je vous propose de réaliser un layout qui ressemble à :</p>
<p><img src="@source/tp/android/ressources/layout_locate_me.png" alt="Layout"></p>
<p>👋 C'est bien évidemment qu'une proposition… Vous pouvez faire autrement !</p>
<p>Pour le code, c'est un poil plus compliqué, en reprenant le flow du graphique précédent, nous allons avoir besoin :</p>
<h2 id="declaration-des-permissions" tabindex="-1"><a class="header-anchor" href="#declaration-des-permissions" aria-hidden="true">#</a> Déclaration des permissions</h2>
<p>Dans le fichier Manifest ajouter :</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.permission.ACCESS_COARSE_LOCATION<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>uses-permission</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.permission.ACCESS_FINE_LOCATION<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="permission-acceptee" tabindex="-1"><a class="header-anchor" href="#permission-acceptee" aria-hidden="true">#</a> Permission acceptée ?</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">return</span> ActivityCompat<span class="token punctuation">.</span><span class="token function">checkSelfPermission</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> Manifest<span class="token punctuation">.</span>permission<span class="token punctuation">.</span>ACCESS_FINE_LOCATION<span class="token punctuation">)</span> <span class="token operator">==</span> PackageManager<span class="token punctuation">.</span>PERMISSION_GRANTED
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="demander-la-permission" tabindex="-1"><a class="header-anchor" href="#demander-la-permission" aria-hidden="true">#</a> Demander la permission</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">requestPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ActivityCompat<span class="token punctuation">.</span><span class="token function">requestPermissions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">arrayOf</span><span class="token punctuation">(</span>Manifest<span class="token punctuation">.</span>permission<span class="token punctuation">.</span>ACCESS_FINE_LOCATION<span class="token punctuation">)</span><span class="token punctuation">,</span> PERMISSION_REQUEST_LOCATION<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">getLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="methode-surchargee-apres-l-acceptation" tabindex="-1"><a class="header-anchor" href="#methode-surchargee-apres-l-acceptation" aria-hidden="true">#</a> Méthode surchargée après l'acceptation</h3>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onRequestPermissionsResult</span><span class="token punctuation">(</span>requestCode<span class="token operator">:</span> Int<span class="token punctuation">,</span> permissions<span class="token operator">:</span> Array<span class="token operator">&lt;</span><span class="token keyword">out</span> String<span class="token operator">></span><span class="token punctuation">,</span> grantResults<span class="token operator">:</span> IntArray<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onRequestPermissionsResult</span><span class="token punctuation">(</span>requestCode<span class="token punctuation">,</span> permissions<span class="token punctuation">,</span> grantResults<span class="token punctuation">)</span>

    <span class="token keyword">when</span> <span class="token punctuation">(</span>requestCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        PERMISSION_REQUEST_LOCATION <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token comment">// If request is cancelled, the result arrays are empty.</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>grantResults<span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> grantResults<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> PackageManager<span class="token punctuation">.</span>PERMISSION_GRANTED<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// Permission obtenue, Nous continuons la suite de la logique.</span>
                <span class="token function">getLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// TODO</span>
                <span class="token comment">// Permission non accepté, expliqué ici via une activité ou une dialog pourquoi nous avons besoin de la permission</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Gestion de la permission refusé de manière permanente</p>
<p>L'utilisateur a le choix de refuser de manière permanente la localisation. Dans ce cas vous devez gérer l'erreur avec <code>shouldShowRequestPermissionRationale()</code> qui retournera <code>true</code> / <code>false</code> en fonction.</p>
<p>Je vous laisse écrire le code afin d'envoyer l'utilisateur vers les paramètres de son téléphone si cela doit être le cas.</p>
</div>
<h3 id="obtenir-la-localisation" tabindex="-1"><a class="header-anchor" href="#obtenir-la-localisation" aria-hidden="true">#</a> Obtenir la localisation</h3>
<p>C'est le code « métier ». Les méthodes précédentes sont par contre génériques, et toujours présentes, quelle que soit la problématique.</p>
<p><em>Obtenir la location : Via « la dernière connue »:</em></p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">getLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> locationManager <span class="token operator">=</span> applicationContext<span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span>LOCATION_SERVICE<span class="token punctuation">)</span> <span class="token keyword">as</span> LocationManager<span class="token operator">?</span>
        locationManager<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">run</span> <span class="token punctuation">{</span>
            locationManager<span class="token punctuation">.</span><span class="token function">getLastKnownLocation</span><span class="token punctuation">(</span>LocationManager<span class="token punctuation">.</span>PASSIVE_PROVIDER<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">run</span> <span class="token punctuation">{</span>
                <span class="token function">geoCode</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><em>Obtenir la localisation 2 pour avoir la position réel (pas la dernière obtenue par le système):</em></p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">getLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> locationManager <span class="token operator">=</span> applicationContext<span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span>LOCATION_SERVICE<span class="token punctuation">)</span> <span class="token keyword">as</span> LocationManager<span class="token operator">?</span>
        locationManager<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">run</span> <span class="token punctuation">{</span>
            locationManager<span class="token punctuation">.</span><span class="token function">requestLocationUpdates</span><span class="token punctuation">(</span>LocationManager<span class="token punctuation">.</span>NETWORK_PROVIDER<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">10000F</span><span class="token punctuation">,</span> LocationListener <span class="token punctuation">{</span> <span class="token function">geoCode</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><em>Obtenir la localisation 3 : Via les Play Services</em></p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">getLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fusedLocationClient <span class="token operator">=</span> LocationServices<span class="token punctuation">.</span><span class="token function">getFusedLocationProviderClient</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        fusedLocationClient<span class="token punctuation">.</span><span class="token function">getCurrentLocation</span><span class="token punctuation">(</span>LocationRequest<span class="token punctuation">.</span>PRIORITY_BALANCED_POWER_ACCURACY<span class="token punctuation">,</span> <span class="token function">CancellationTokenSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>token<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addOnSuccessListener</span> <span class="token punctuation">{</span> <span class="token function">geoCode</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span> <span class="token punctuation">}</span>
                <span class="token punctuation">.</span><span class="token function">addOnFailureListener</span> <span class="token punctuation">{</span>
                    <span class="token comment">// Remplacer par un vrai bon message</span>
                    Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">"Localisation impossible"</span><span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">Vous devez choisir une façon de faire</p>
<p>Nous avons donc trois façon de fair, si votre téléphone a les Play Services la dernière solution sera la bonne.</p>
</div>
<h3 id="bonus-obtenir-l-adresse-par-rapport-au-lat-long" tabindex="-1"><a class="header-anchor" href="#bonus-obtenir-l-adresse-par-rapport-au-lat-long" aria-hidden="true">#</a> BONUS ! Obtenir l'adresse par rapport au lat, long</h3>
<p>Latitude, Longitude c'est triste… Android intègre de base un Geocoder permettant d'obtenir une adresse textuelle en fonction d'une <code>lat,long</code>.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">geoCode</span><span class="token punctuation">(</span>location<span class="token operator">:</span> Location<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">val</span> geocoder <span class="token operator">=</span> <span class="token function">Geocoder</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> Locale<span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> results <span class="token operator">=</span> geocoder<span class="token punctuation">.</span><span class="token function">getFromLocation</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span>latitude<span class="token punctuation">,</span> location<span class="token punctuation">.</span>longitude<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>results<span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        locationText<span class="token punctuation">.</span>text <span class="token operator">=</span> results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getAddressLine</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="a-faire-10" tabindex="-1"><a class="header-anchor" href="#a-faire-10" aria-hidden="true">#</a> À faire</h3>
<p>Je vous laisse implémenter le code… N'hésiter pas à reprendre le « graph » il vous sera utile pour déterminer qu'elle méthode appeler en premier lors de l'appui sur le bouton « Localiser Moi ». Un petit indice… on commence toujours par vérifier si l'application a le droit d'accéder « à la fonctionnalité ».</p>
<div class="custom-container tip"><p class="custom-container-title">La toolbar</p>
<p>Pour activer l'action retour dans la Toolbar d'une activité. <strong>Vous devez</strong> ajouter le code suivant dans le <code>OnCreate</code> :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>supportActionBar<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">apply</span> <span class="token punctuation">{</span>
    <span class="token function">setTitle</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>whatever<span class="token punctuation">)</span>
    <span class="token function">setDisplayHomeAsUpEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token function">setDisplayShowHomeEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Puis vous devez override la méthode <code>onSupportNavigateUp</code> qui est appelée lors de l'appui sur le « l'icône retour »:</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onSupportNavigateUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></div>
<details class="custom-container details"><summary>Voir une solution complète</summary>
<p>Vous séchez ? _<em>Je vous invite à me demander avant de regarder la solution…</em> cependant, si vous souhaitez par contre vérifier votre solution.</p>
<p><a href="https://gist.github.com/c4software/a3fa7f584a464a6308648b7fcce28add" target="_blank" rel="noopener noreferrer">Sachez que vous avez une version du code ici<ExternalLinkIcon/></a></p>
</details>
<h2 id="les-recyclerview" tabindex="-1"><a class="header-anchor" href="#les-recyclerview" aria-hidden="true">#</a> Les Recyclerview</h2>
<p>✋ Parlons-en 👋</p>
<p>Nous allons faire cette étape ensemble.</p>
<p>Mais dans les grandes lignes :</p>
<ul>
<li>Ajouter une nouvelle activité.</li>
<li>Ajout d'un bouton sur la home permettant de la lancer.</li>
<li>Dans la nouvelle activity, un RecyclerView qui contiendra « des éléments de type Strings ». (<code>&lt;androidx.recyclerview.widget.RecyclerView android:layout_width=&quot;wrap_content&quot;android:layout_height=&quot;wrap_content&quot; … </code>)</li>
<li>Chaque élément de la liste doit ressembler à (je vous laisse créer le fichier nommé <code>item_list.xml</code> dans les layouts).</li>
</ul>
<p><img src="@source/tp/android/ressources/layout_list_item.png" alt="List Item Layout"></p>
<div class="custom-container tip"><p class="custom-container-title">Les RecyclerView c'est important</p>
<p>Comme je le disais en cours, les RecyclerView c'est un concept important. Il faut prendre du temps pour bien comprendre le fonctionnement et les « limites ». En vous inspirant de <a href="https://gist.github.com/c4software/95e51417890c68078c14555b2f1d9a03" target="_blank" rel="noopener noreferrer">l'exemple ici<ExternalLinkIcon/></a></p>
<p>Je vous laisse implémenter votre propre RecyclerView.</p>
<p>✋ <strong>Attention</strong>, dans notre cas le RecyclerView sera du type String et non pas <strong>Device</strong></p>
</div>
<h2 id="les-«-plugins-»-librairies" tabindex="-1"><a class="header-anchor" href="#les-«-plugins-»-librairies" aria-hidden="true">#</a> Les « Plugins » / Librairies</h2>
<p>Comme vu en cours, je vous laisse ajouter les librairies :</p>
<ul>
<li>MaterialDialog.</li>
<li>Recyclical dans votre projet.</li>
</ul>
<h3 id="les-dialogs" tabindex="-1"><a class="header-anchor" href="#les-dialogs" aria-hidden="true">#</a> Les Dialogs</h3>
<h4 id="avec-materialdialog" tabindex="-1"><a class="header-anchor" href="#avec-materialdialog" aria-hidden="true">#</a> Avec MaterialDialog</h4>
<p>Ajouter une dialog dans votre projet. Avec la librairie <a href="https://github.com/afollestad/material-dialogs/blob/main/documentation/CORE.md" target="_blank" rel="noopener noreferrer">MaterialDialog<ExternalLinkIcon/></a>. Celle-ci doit s'afficher lors du clic sur le bouton de la home.</p>
<h3 id="avec-le-material-design-de-google" tabindex="-1"><a class="header-anchor" href="#avec-le-material-design-de-google" aria-hidden="true">#</a> Avec le Material Design de Google</h3>
<p>Ajouter une dialog dans votre projet. Avec la librairie <a href="https://material.io/develop/android/docs/getting-started" target="_blank" rel="noopener noreferrer">Material Design de Google<ExternalLinkIcon/></a>. Celle-ci doit s'afficher lors du clic sur le bouton de la home.</p>
<h3 id="recyclical" tabindex="-1"><a class="header-anchor" href="#recyclical" aria-hidden="true">#</a> Recyclical</h3>
<p>Réimplémenter le code précédemment écrit (ou créer une autre activité) avec <a href="https://github.com/afollestad/recyclical" target="_blank" rel="noopener noreferrer">Recyclical<ExternalLinkIcon/></a>.</p>
<h2 id="activite-«-parametres-»" tabindex="-1"><a class="header-anchor" href="#activite-«-parametres-»" aria-hidden="true">#</a> Activité « Paramètres »</h2>
<p>Je vous laisse créer une nouvelle activité. Celle-ci <strong>doit être</strong> constituée :</p>
<ul>
<li>Une Toolbar avec un bouton Retour et un titre « Paramètres ».</li>
<li>un RecyclerView qui va contenir :
<ul>
<li>Paramètres Bluetooth -&gt; ouvre les paramètres du téléphone.</li>
<li>Informations -&gt; ouvre une activité (ou un dialogue avec un message texte).</li>
<li>Un élément ouvrant « les paramètres de l'application »</li>
<li>Un lien vers le site de l'ESEO.</li>
<li>Un lien vers le Google Maps de l'ESEO.</li>
</ul>
</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">Votre RecyclerView</p>
<p>Votre RecyclerView va contenir des objets du type SettingsItem (class a créer). Chaque élément va ressembler à :</p>
<p><em>Exemple d'un élément de liste :</em></p>
<p><img src="@source/tp/android/ressources/list_item_sample.png" alt="ressources list_item_sample.png"></p>
<p><img src="@source/tp/android/ressources/rv_sample_settings.png" alt="ressources list_item_sample.png"></p>
<p><em>Les objet de type <code>SettingsItem.kt</code></em>:</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">// Définition de la Class qui sera dans notre RecyclerView</span>
<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">SettingsItem</span><span class="token punctuation">(</span><span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">val</span> icon<span class="token operator">:</span> Int<span class="token punctuation">,</span> <span class="token keyword">val</span> onClick<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> Unit<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">// Exemple de déclaration dans la datasource (à déclarer dans votre Activity)</span>
<span class="token function">arrayOf</span><span class="token punctuation">(</span>
    <span class="token function">SettingsItem</span><span class="token punctuation">(</span><span class="token string">"Paramètre Bluetooth"</span><span class="token punctuation">,</span> R<span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>bluetooth<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Action au clique</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">SettingsItem</span><span class="token punctuation">(</span><span class="token string">"Informations"</span><span class="token punctuation">,</span> R<span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>info<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Action au clique</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">SettingsItem</span><span class="token punctuation">(</span><span class="token string">"Paramètres"</span><span class="token punctuation">,</span> R<span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>settings<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Action au clique</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">SettingsItem</span><span class="token punctuation">(</span><span class="token string">"Site de l'ESEO"</span><span class="token punctuation">,</span> R<span class="token punctuation">.</span>drawable<span class="token punctuation">.</span>logo_eseo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Action au clique</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token comment">// Je vous laisse implémenter votre ViewHolder, pour référencer dans votre vue (via des findViewById comme vu ensemble)</span>
<span class="token comment">// -> name</span>
<span class="token comment">// -> icon</span>
<span class="token comment">// -> l'action au clique</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></div>
<div class="custom-container tip"><p class="custom-container-title">La toolbar</p>
<p>Pour activer l'action retour dans la Toolbar d'une activity. <strong>Vous devez</strong> ajouter le code suivant dans le <code>OnCreate</code> :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>supportActionBar<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">apply</span> <span class="token punctuation">{</span>
    <span class="token function">setTitle</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>whatever<span class="token punctuation">)</span>
    <span class="token function">setDisplayHomeAsUpEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token function">setDisplayShowHomeEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Puis vous devez override la méthode <code>onSupportNavigateUp</code> qui est appelé lors de l'appui sur le « l'icone retour »:</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onSupportNavigateUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></div>
<h3 id="la-classe-localpreferences-aka-sauvegarder-des-parametres" tabindex="-1"><a class="header-anchor" href="#la-classe-localpreferences-aka-sauvegarder-des-parametres" aria-hidden="true">#</a> La classe LocalPreferences (AKA Sauvegarder des paramètres)</h3>
<p>Cette classe va nous permettre de sauvegarder de manière « persistant » des paramètres.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>
<span class="token keyword">import</span> android<span class="token punctuation">.</span>content<span class="token punctuation">.</span>Context
<span class="token keyword">import</span> android<span class="token punctuation">.</span>content<span class="token punctuation">.</span>SharedPreferences

<span class="token keyword">class</span> LocalPreferences <span class="token keyword">private</span> <span class="token keyword">constructor</span><span class="token punctuation">(</span>context<span class="token operator">:</span> Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> sharedPreferences<span class="token operator">:</span> SharedPreferences <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getSharedPreferences</span><span class="token punctuation">(</span><span class="token string">"MyPref"</span><span class="token punctuation">,</span> Context<span class="token punctuation">.</span>MODE_PRIVATE<span class="token punctuation">)</span>

    <span class="token keyword">fun</span> <span class="token function">saveStringValue</span><span class="token punctuation">(</span>yourValue<span class="token operator">:</span> String<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sharedPreferences<span class="token punctuation">.</span><span class="token function">edit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putString</span><span class="token punctuation">(</span><span class="token string">"saveStringValue"</span><span class="token punctuation">,</span> yourValue<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">getSaveStringValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String<span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sharedPreferences<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string">"saveStringValue"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">var</span> INSTANCE<span class="token operator">:</span> LocalPreferences<span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span>

        <span class="token keyword">fun</span> <span class="token function">getInstance</span><span class="token punctuation">(</span>context<span class="token operator">:</span> Context<span class="token punctuation">)</span><span class="token operator">:</span> LocalPreferences <span class="token punctuation">{</span>
            <span class="token keyword">return</span> INSTANCE<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span>
                INSTANCE
            <span class="token punctuation">}</span> <span class="token operator">?:</span> run <span class="token punctuation">{</span>
                INSTANCE <span class="token operator">=</span> <span class="token function">LocalPreferences</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>
                <span class="token keyword">return</span> INSTANCE<span class="token operator">!!</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>Et pour l'utiliser dans vos activity :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>
<span class="token comment">// … Reste de votre code</span>

<span class="token comment">// Exemple sauvegarde d'information à chaque click.</span>
button<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
    LocalPreferences<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">saveStringValue</span><span class="token punctuation">(</span><span class="token string">"Votre valeur"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Exemple de récupération</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>LocalPreferences<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSaveStringValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    Toast<span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> LocalPreferences<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSaveStringValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Toast<span class="token punctuation">.</span>LENGTH_SHORT<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// … Suite de votre code</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="a-faire-11" tabindex="-1"><a class="header-anchor" href="#a-faire-11" aria-hidden="true">#</a> À faire</h4>
<p>Cette classe est générique, il vous suffit d'implémenter les bonnes méthodes.</p>
<p>J'aimerais que nous puissions sauvegarder l'ensemble des positions de l'utilisateur :</p>
<ul>
<li>Créer la class <code>LocalPreferences</code>. (attention dans le bon package)</li>
<li>Ajouter les deux méthodes permettant la sauvegarde des données dans la class <code>LocalPreferences</code>. (nous allons avoir besoin de <code>putStringSet</code> et de <code>getStringSet</code> deux méthodes fourni par <code>SharedPreferences</code>, permettant de sauvegarder des listes de données).</li>
</ul>
<details class="custom-container details"><summary>Voir une solution (comme à chaque fois cherchez par vous-même en vous inspirant de mon exemple)</summary>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token keyword">fun</span> <span class="token function">addToHistory</span><span class="token punctuation">(</span>newEntry<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">val</span> history <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        history<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>newEntry<span class="token punctuation">)</span>
        sharedPreferences<span class="token punctuation">.</span><span class="token function">edit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putStringSet</span><span class="token punctuation">(</span><span class="token string">"histories"</span><span class="token punctuation">,</span> history<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">getHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> MutableSet<span class="token operator">&lt;</span>String<span class="token operator">></span><span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sharedPreferences<span class="token punctuation">.</span><span class="token function">getStringSet</span><span class="token punctuation">(</span><span class="token string">"histories"</span><span class="token punctuation">,</span> <span class="token function">emptySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></details>
<ul>
<li>Modifier votre activity « Localisation » pour sauvegarder chaque position « détecté ». (vous pouvez valider la bonne insertion de votre donnée via un point d'arrêt dans votre code)</li>
<li>Créer une nouvelle <code>activity</code> qui va afficher l'ensemble des données présent dans votre historique (via un <code>RecyclerView</code>).</li>
<li>Rendre cette nouvelle activity accessible depuis « la home de votre application ». (uniquement si il y a des données).</li>
</ul>
</template>
