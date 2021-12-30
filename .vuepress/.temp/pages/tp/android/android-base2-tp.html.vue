<template><h1 id="suite-decouverte-des-bases-d-android" tabindex="-1"><a class="header-anchor" href="#suite-decouverte-des-bases-d-android" aria-hidden="true">#</a> Suite découverte des bases d'Android</h1>
<details class="custom-container details"><summary>Sommaire</summary>
<nav class="table-of-contents"><ul><li><RouterLink to="#les-animations">Les animations</RouterLink><ul><li><RouterLink to="#les-animations-automatiques">Les animations automatiques</RouterLink></li><li><RouterLink to="#les-gif">Les GIF</RouterLink></li><li><RouterLink to="#lottie">Lottie</RouterLink></li><li><RouterLink to="#les-transitions-programmees">Les transitions programmées</RouterLink></li></ul></li><li><RouterLink to="#les-extensions-kotlin">Les extensions Kotlin</RouterLink></li><li><RouterLink to="#les-fragments">Les Fragments</RouterLink><ul><li><RouterLink to="#manuellement">Manuellement</RouterLink></li><li><RouterLink to="#en-utilisant-le-navigation-graph">En utilisant le Navigation Graph</RouterLink></li><li><RouterLink to="#drawer-layout">Drawer Layout</RouterLink></li></ul></li></ul></nav>
</details>
<div class="custom-container danger"><p class="custom-container-title">XML ou Compose ?</p>
<p>Nous sommes en 2021, le monde d'Android évolue… Pendant des années l'écriture des « layouts » (interface) n'était possible que via du XML. Il est maintenant possible d'écrire les layouts de manières bien plus modernes avec <a href="https://developer.android.com/jetpack/compose" target="_blank" rel="noopener noreferrer">JetPack Compose<ExternalLinkIcon/></a>. Le TP que vous suivez est toujours valide, mais repose sur l'utilisation de XML.</p>
</div>
<h2 id="les-animations" tabindex="-1"><a class="header-anchor" href="#les-animations" aria-hidden="true">#</a> Les animations</h2>
<p>Même si celle-ci n’est pas obligatoire dans une expérience mobile… Celle-ci peut changer radicalement l'expérience de vos utilisateurs. Sur Android (comme souvent) nous avons plusieurs façons de faire nos animations :</p>
<ul>
<li>Les animations automatiques <code>animationLayoutChange</code>.</li>
<li>Les Gifs.</li>
<li>Lottie</li>
<li>Les « transitions programmées ».</li>
<li>Les Motion Layout</li>
</ul>
<h3 id="les-animations-automatiques" tabindex="-1"><a class="header-anchor" href="#les-animations-automatiques" aria-hidden="true">#</a> Les animations automatiques</h3>
<p>Celle-ci est certainement la plus simple à mettre en place. Vous n'aurez aucun contrôle sur celle-ci ; c'est le système Android qui vous animera automatiquement les changements d'état de votre Interface. Pratique pour les cas simples.</p>
<p>Pour mettre en place les animations automatiques il suffit d'ajouter <code>animationLayoutChange</code> à la racine du layout à animé layout. Je vous laisse le mettre en place dans votre projet :</p>
<ul>
<li>Modifier le layout de votre <code>splash</code> pour y ajouter le <code>animationLayoutChange</code>.</li>
<li>Masquer de base le logo de l'ESEO.</li>
<li>Afficher celui-ci après un délai (comme vu précédemment).</li>
<li>Le changement sera normalement « animé ».</li>
</ul>
<p>Je vous laisse tester.</p>
<h3 id="les-gif" tabindex="-1"><a class="header-anchor" href="#les-gif" aria-hidden="true">#</a> Les GIF</h3>
<p>AKA la technique cheap « et pas ouf ». Je vous l'indique, car c'est marrant ! Et que nous sommes dans un monde où nous utilisons des GIF souvent… Mais en réalité c'est nul comme technique… Lire des GIF ne sont pas supportés nativement par Android, par contre c'est assez simple d'ajouter le support :</p>
<ul>
<li>Ajouter la librairie <a href="https://github.com/Cutta/GifView" target="_blank" rel="noopener noreferrer">GifView<ExternalLinkIcon/></a>.</li>
<li>Remplacer le logo de l'ESEO par un logo animé sur votre Splash.</li>
<li>Lancer l'<code>activity</code> principale à la fin de l'animation.</li>
</ul>
<p>Je vous laisse tester.</p>
<h3 id="lottie" tabindex="-1"><a class="header-anchor" href="#lottie" aria-hidden="true">#</a> Lottie</h3>
<p><a href="https://airbnb.design/lottie/" target="_blank" rel="noopener noreferrer">Lottie<ExternalLinkIcon/></a> est une librairie permettant de faire des animations de qualités, bien au-dessus des GIF ! Lottie est simple à utiliser :</p>
<ul>
<li>Installez-la <a href="https://github.com/airbnb/lottie-android" target="_blank" rel="noopener noreferrer">librairie lottie<ExternalLinkIcon/></a> :</li>
</ul>
<div class="language-gradle ext-gradle line-numbers-mode"><pre v-pre class="language-gradle"><code>dependencies {
  implementation 'com.airbnb.android:lottie:3.6.0'
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li><a href="https://lottiefiles.com/" target="_blank" rel="noopener noreferrer">Chercher une animation sur le site<ExternalLinkIcon/></a></li>
<li><a href="http://airbnb.io/lottie/#/android?id=from-xml" target="_blank" rel="noopener noreferrer">En suivant la documentation officiel<ExternalLinkIcon/></a> Placer l'animation à la place de l'image GIF du <code>SplashScreen</code>.</li>
</ul>
<p>C'est à vous, je vous laisse mettre en place l'animation.</p>
<h3 id="les-transitions-programmees" tabindex="-1"><a class="header-anchor" href="#les-transitions-programmees" aria-hidden="true">#</a> Les transitions programmées</h3>
<p>Nous avons vu qu'il était possible d'animer « simplement » une partie de l'écran. Vous avez aussi la possibilité de contrôler les transitions d'un état A -&gt; B et ça de manière assez simple.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    imageView<span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scaleY</span><span class="token punctuation">(</span><span class="token number">10f</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scaleX</span><span class="token punctuation">(</span><span class="token number">10f</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setDuration</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setStartDelay</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Je vous laisse tester sur votre layout de <code>Splash</code> :</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/eY8tcqyDwYw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<h2 id="les-extensions-kotlin" tabindex="-1"><a class="header-anchor" href="#les-extensions-kotlin" aria-hidden="true">#</a> Les extensions Kotlin</h2>
<p>Kotlin permet d'étendre le langage de manière assez particulière. Vous pouvez ajouter de nouvelles méthodes dans des objets « existant ». Écrit comme ça, ça peut sembler étrange… Mais en réalité ça ouvre des options intéressantes… Ça vous nous permettre de :</p>
<ul>
<li>Partage simplement du code. (<a href="http://kotlinextensions.com/" target="_blank" rel="noopener noreferrer">Exemple ici<ExternalLinkIcon/></a>)</li>
<li>Masquer du code « complexe » que vous pourriez avoir à utiliser à différent endroit.</li>
</ul>
<p>Créer dans votre projet un fichier nommé <code>helpers.kt</code>, dans celui-ci ajouter le code suivant :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>
<span class="token comment">/**
 * Extension method to share for Context.
 */</span>
<span class="token keyword">fun</span> Context<span class="token punctuation">.</span><span class="token function">share</span><span class="token punctuation">(</span>text<span class="token operator">:</span> String<span class="token punctuation">,</span> subject<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
    <span class="token keyword">val</span> intent <span class="token operator">=</span> <span class="token function">Intent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    intent<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">"text/plain"</span>
    intent<span class="token punctuation">.</span><span class="token function">putExtra</span><span class="token punctuation">(</span>EXTRA_SUBJECT<span class="token punctuation">,</span> subject<span class="token punctuation">)</span>
    intent<span class="token punctuation">.</span><span class="token function">putExtra</span><span class="token punctuation">(</span>EXTRA_TEXT<span class="token punctuation">,</span> text<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token function">startActivity</span><span class="token punctuation">(</span><span class="token function">createChooser</span><span class="token punctuation">(</span>intent<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> ActivityNotFoundException<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>Le code en question permet de lancer la fenêtre de partage de votre téléphone. Rien de bien compliqué, cependant si vous avez à le faire à différents endroits c'est rapidement long…</p>
<p>Maintenant pour l'utiliser il suffit d'ajouter par exemple le code suivant :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>myButton<span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">share</span><span class="token punctuation">(</span><span class="token string">"Ceci est un partage"</span><span class="token punctuation">,</span> <span class="token string">"Ceci est un partage sub"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Je vous laisse mettre en place le code sur votre <code>Home</code>. Je souhaite avoir :</p>
<ul>
<li>Un bouton qui permet de partager « votre application ».</li>
<li>L'icône doit être « une action de partage ».</li>
<li>L'icône doit être « En Haut à droite ».</li>
</ul>
<h2 id="les-fragments" tabindex="-1"><a class="header-anchor" href="#les-fragments" aria-hidden="true">#</a> Les Fragments</h2>
<p>Dans le monde d'Android nous n'avons pas que les <code>Activity</code> de disponibles, nous avons également les <code>Fragment</code> ; les Fragments sont une autre façon d'organiser vos vues. Ils sont utilisés massivement par certains, et pour d'autre pas du tout. Les fragments vont donc permettre de découper la logique de votre vue en différents morceaux. Les différents morceaux ont leurs propres cycles de vies et permettent de faire grossièrement la même chose qu'une activité.</p>
<p>Il y a un endroit ou nous serons « obligé » d'utiliser les fragments c'est dans le cas d'une Bottom Navigation Bar (vous les connaissez très certainement… c'est les bar avec les boutons en bas de l'écran) :</p>
<p><img src="@source/tp/android/ressources/mock-fragment.png" alt="Fragment et Bottom Bar"></p>
<div class="custom-container danger"><p class="custom-container-title">Un instant</p>
<p>Les Fragments sont un concept pas forcément très compliqué, mais celui-ci demande un peu de concentration pour l'implémenter sans trop de problèmes.</p>
</div>
<p>La première étape va être l'ajoute des différentes librairies :</p>
<div class="language-gradle ext-gradle line-numbers-mode"><pre v-pre class="language-gradle"><code>    implementation &quot;androidx.fragment:fragment-ktx:1.2.5&quot;
    implementation &quot;androidx.navigation:navigation-fragment-ktx:2.3.2&quot;
    implementation &quot;androidx.navigation:navigation-ui-ktx:2.3.2&quot;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="manuellement" tabindex="-1"><a class="header-anchor" href="#manuellement" aria-hidden="true">#</a> Manuellement</h3>
<p>Avant de voir la façon « tout automatique », nous allons implémenter ensemble la version « manuel » des Fragments. La logique des fragments n'est pas vraiment complexe, mais celle-ci demande de la rigueur et de l'organisation. Je vous montre l'objectif à atteindre :</p>
<table>
<thead>
<tr>
<th style="text-align:center"><img src="@source/tp/android/ressources/objectif.png" alt="Objectif à atteindre"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Les fichiers en vert seront ceux à créer</td>
</tr>
</tbody>
</table>
<ul>
<li>
<p>Étape 1 : Créer une activité racine (vous pouvez utiliser l'outil intégré à Android Studio)</p>
<ul>
<li>Créer la méthode <code>getStartIntent</code> comme vu ensemble.</li>
</ul>
</li>
<li>
<p>Étape 2 : Modifier le layout de l'activity principale pour y ajouter :</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="utf-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>androidx.constraintlayout.widget.ConstraintLayout</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://schemas.android.com/apk/res/android<span class="token punctuation">"</span></span>
  <span class="token attr-name"><span class="token namespace">xmlns:</span>app</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://schemas.android.com/apk/res-auto<span class="token punctuation">"</span></span>
  <span class="token attr-name"><span class="token namespace">xmlns:</span>tools</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://schemas.android.com/tools<span class="token punctuation">"</span></span>
  <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>match_parent<span class="token punctuation">"</span></span>
  <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>match_parent<span class="token punctuation">"</span></span>
  <span class="token attr-name"><span class="token namespace">tools:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>.ui.bottom.BottomActivity<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>androidx.fragment.app.FragmentContainerView</span>
      <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@+id/frame<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0dp<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0dp<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintBottom_toTopOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@id/bottom_navigation<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintEnd_toEndOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintStart_toStartOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintTop_toTopOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>com.google.android.material.bottomnavigation.BottomNavigationView</span>
      <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@+id/bottom_navigation<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>match_parent<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrap_content<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintBottom_toBottomOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintEnd_toEndOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">app:</span>layout_constraintStart_toStartOf</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span>
      <span class="token attr-name"><span class="token namespace">app:</span>menu</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@menu/bottom_navigation_menu<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>androidx.constraintlayout.widget.ConstraintLayout</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div></li>
<li>
<p>Étape 3 : Ajouter le menu <code>bottom_navigation_menu.xml</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="utf-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>menu</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://schemas.android.com/apk/res/android<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item</span>
    <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@+id/page_1<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>enabled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@drawable/ic_baseline_all_inclusive_24<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@string/app_name<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item</span>
    <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@+id/page_2<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>enabled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@drawable/ic_baseline_all_inclusive_24<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@string/app_name<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>menu</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">À quoi sert le fichier ?</p>
<p>Le fichier liste l'ensemble des actions possibles dans votre <code>BottomNavigationView</code>.</p>
</div>
</li>
<li>
<p>Étape 4 : Créer deux fragments (en utilisant l'outil intégré à Android Studio)</p>
<p><img src="@source/tp/android/ressources/fragment_step_1.png" alt="Création fragment">
<img src="@source/tp/android/ressources/fragment_step_2.png" alt="Création fragment 2"></p>
</li>
<li>
<p>Étape 5 : Dans le code de votre <strong>Activity</strong> Racine, nous allons ajouter les éléments pour connecter les actions.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token keyword">private</span> <span class="token keyword">var</span> page1Instance <span class="token operator">=</span> Page1<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> page2Instance <span class="token operator">=</span> Page2<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token operator">:</span> Bundle<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span>
        <span class="token function">setContentView</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>layout<span class="token punctuation">.</span>activity_bottom<span class="token punctuation">)</span>

        <span class="token function">showFragment</span><span class="token punctuation">(</span>page1Instance<span class="token punctuation">)</span>
        bottom_navigation<span class="token punctuation">.</span><span class="token function">setOnNavigationItemSelectedListener</span> <span class="token punctuation">{</span> item <span class="token operator">-></span>
            <span class="token keyword">when</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span>itemId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>page_1 <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token comment">// Item 1 action</span>
                    <span class="token function">showFragment</span><span class="token punctuation">(</span>page1Instance<span class="token punctuation">)</span>
                    <span class="token boolean">true</span>
                <span class="token punctuation">}</span>
                R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>page_2 <span class="token operator">-></span> <span class="token punctuation">{</span>
                    <span class="token comment">// Item 2 action</span>
                    <span class="token function">showFragment</span><span class="token punctuation">(</span>page2Instance<span class="token punctuation">)</span>
                    <span class="token boolean">true</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token operator">-></span> <span class="token boolean">false</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">showFragment</span><span class="token punctuation">(</span>fragment<span class="token operator">:</span> Fragment<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        supportFragmentManager<span class="token punctuation">.</span><span class="token function">commit</span> <span class="token punctuation">{</span>
            <span class="token function">setReorderingAllowed</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token function">replace</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>frame<span class="token punctuation">,</span> fragment<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">qu'avons-nous ici ?</p>
<ul>
<li>Nous avons ajouté dans notre activity 1 méthode, et deux variables qui seront « les fragments » (page1 et page2).</li>
<li>Nous avons « ensuite connecté » les cliques sur la <code>BottomNavigationView</code> aux actions permettant d'afficher le fragment dans le frame.</li>
</ul>
</div>
<p>Implémentons ensemble le code. <a href="https://gist.github.com/c4software/aebb8f467c229e186d88a04b13a3f406" target="_blank" rel="noopener noreferrer">Vous avez ici l'ensemble du code<ExternalLinkIcon/></a></p>
<h3 id="en-utilisant-le-navigation-graph" tabindex="-1"><a class="header-anchor" href="#en-utilisant-le-navigation-graph" aria-hidden="true">#</a> En utilisant le Navigation Graph</h3>
<p>Utiliser la Navigation Graph est j'ai envie de dire la bonne façon de faire en 2021. Dans cette solution la théorie des fragments <strong>ne change pas</strong>, vous avez toujours le même découpage et sensiblement la même organisation. Ce qui va changer par contre c'est que nous allons écrire « plus de XML déclaratif » et <strong>beaucoup moins de code Kotlin</strong>.</p>
<p>Avantage du NavGraph :</p>
<ul>
<li>Gestion via des XML</li>
<li>Back stack fonctionnel</li>
<li>Visuel</li>
</ul>
<p><img src="@source/tp/android/ressources/1_ESf1y0VYcHE5ldkCDD8HKA.png" alt="Navigation Graph"></p>
<p>Je vous passe la création des activités et des Fragments. Ce que nous allons ajouter/remplacer est :</p>
<ul>
<li>Le graph de navigation <code>res/navigation/mobile_navigation.xml</code> :</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="utf-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>navigation</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://schemas.android.com/apk/res/android<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">xmlns:</span>app</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://schemas.android.com/apk/res-auto<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@+id/mobile_navigation.xml<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">app:</span>startDestination</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@id/page_1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>fragment</span>
        <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@+id/page_1<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.eseo.myapplication2.ui.bottom.fragment.Page1<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Page1<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>fragment</span>
        <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@+id/page_2<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.eseo.myapplication2.ui.bottom.fragment.Page2<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Page2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>navigation</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ul>
<li>
<p>Ajuster le layout XML de votre activity pour y ajouter le navGraph :</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>androidx.fragment.app.FragmentContainerView</span>
    <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@+id/nav_host_fragment<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>androidx.navigation.fragment.NavHostFragment<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>match_parent<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>match_parent<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">app:</span>defaultNavHost</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">app:</span>navGraph</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@navigation/mobile_navigation<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></li>
<li>
<p>Ajuster le code de votre <code>Activity</code> pour y déclarer votre Navigation Graph</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token operator">:</span> Bundle<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span>
        <span class="token function">setContentView</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>layout<span class="token punctuation">.</span>activity_bottom<span class="token punctuation">)</span>

        <span class="token function">setUpNavigation</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">setUpNavigation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> navHostFragment <span class="token operator">=</span> supportFragmentManager<span class="token punctuation">.</span><span class="token function">findFragmentById</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>nav_host_fragment<span class="token punctuation">)</span> <span class="token keyword">as</span> NavHostFragment<span class="token operator">?</span>
        NavigationUI<span class="token punctuation">.</span><span class="token function">setupWithNavController</span><span class="token punctuation">(</span>bottom_navigation<span class="token punctuation">,</span> navHostFragment<span class="token operator">!!</span><span class="token punctuation">.</span>navController<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></li>
<li>
<p>Et … c'est tout ! Exit la méthode permettant de charger le fragment, Google s'occupe de tout pour nous… Pratique !</p>
</li>
</ul>
<p>Je vous laisse implémenter le code dans votre projet. <a href="https://gist.github.com/c4software/6eb4bfca2d82bc04962b0818f676d8df" target="_blank" rel="noopener noreferrer">Voilà un exemple complet<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">pas de magie ici</p>
<p>De la magie ? Non, Google a tout simplement écrit le code pour vous. Quelques petites remarques pour que ça fonctionne :</p>
<ul>
<li>N'oubliez pas : <code>android:name=&quot;androidx.navigation.fragment.NavHostFragment&quot;</code>.</li>
<li>Vous devez nommer vos id dans le <code>mobile_navigation.xml</code> de la même manière que dans votre <code>bottom_navigation_menu</code>.</li>
</ul>
</div>
<h4 id="changer-de-fragment-manuellement" tabindex="-1"><a class="header-anchor" href="#changer-de-fragment-manuellement" aria-hidden="true">#</a> Changer de fragment manuellement</h4>
<p>Votre <code>BottomNavigationView</code> gère la navigation, c'est pratique, mais nous pouvons aller plus loin. Si vous souhaitez charger un Fragment manuellement il suffit d'écrire :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token comment">// Depuis une activité</span>
findViewById<span class="token operator">&lt;</span>Button<span class="token operator">></span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>test<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
    <span class="token function">findNavController</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>nav_host_fragment<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>navigation_dashboard<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Depuis un fragment</span>
root<span class="token punctuation">.</span>findViewById<span class="token operator">&lt;</span>Button<span class="token operator">></span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>test<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setOnClickListener</span> <span class="token punctuation">{</span>
    <span class="token function">findNavController</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>navigation_notifications<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="le-passage-de-parametre" tabindex="-1"><a class="header-anchor" href="#le-passage-de-parametre" aria-hidden="true">#</a> Le passage de paramètre</h4>
<p>Pour gérer le passage de paramètre, nous allons devoir ajouter quelques librairies dans notre projet :</p>
<p>Dans votre <code>build.gradle</code> (projet) ajouter dans les <code>dependencies</code>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>classpath "androidx.navigation:navigation-safe-args-gradle-plugin:2.1.0"
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Dans votre <code>build.gradle</code> (app) ajouter :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>plugins {
    id 'androidx.navigation.safeargs.kotlin'  // &lt;-- Cette ligne
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Nous avons ajouté un plug-in permettant de générer le code « du passage de paramètre ». Il faut donc maintenant configurer « la partie Navigation Graph ». Nous allons procéder en deux étapes :</p>
<ul>
<li>Ajouter le paramètre dans le fragment « de destination ».</li>
<li>Ajouter le lien entre les deux fragments <strong>importants, sans ça rien ne fonctionnera</strong>.</li>
</ul>
<p>Cette étape n'est pas très complexe, la voilà résumée en vidéo :</p>
<center><iframe width="560" height="315" src="https://www.youtube.com/embed/iUe8KrkacUU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><img src="@source/tp/android/ressources/create_parameter1.png" alt="Étape 1"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center"><img src="@source/tp/android/ressources/create_parameter2.png" alt="Étape 2"></td>
<td style="text-align:center"><img src="@source/tp/android/ressources/create_parameter3.png" alt="Étape 3"></td>
</tr>
<tr>
<td style="text-align:center"><img src="@source/tp/android/ressources/create_parameter4.png" alt="Étape 4"></td>
<td style="text-align:center"><img src="@source/tp/android/ressources/create_parameter5.png" alt="Étape 5"></td>
</tr>
</tbody>
</table>
<p><a href="https://developer.android.com/guide/navigation/navigation-pass-data" target="_blank" rel="noopener noreferrer">Plus d'informations dans la documentation sur l'ensemble du fonctionnement<ExternalLinkIcon/></a></p>
<h4 id="lancer-le-fragment-en-passant-des-parametres" tabindex="-1"><a class="header-anchor" href="#lancer-le-fragment-en-passant-des-parametres" aria-hidden="true">#</a> Lancer le fragment en passant des paramètres</h4>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token function">findNavController</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span>
    HomeFragmentDirections<span class="token punctuation">.</span><span class="token function">goToNotificationWithParam</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="recuperer-le-parametre" tabindex="-1"><a class="header-anchor" href="#recuperer-le-parametre" aria-hidden="true">#</a> Récupérer le paramètre</h4>
<p>Vous avez de la chance avec Kotlin cette partie est très simple. Si vous souhaitez récupérer le paramètres il suffit d'ajouter une propriété dans la class du fragement de destination, le code à ajouter est le suivant :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">val</span> args<span class="token operator">:</span> VotreClassFragmentArgs <span class="token keyword">by</span> <span class="token function">navArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">by NavArgs ?</p>
<p>Kotlin vous aide (comme souvent), les développeurs ont codé le fonctionnement qui va injecter ici automatiquement la référence vers « le bundle » contenant la/les donnée(s) passée(s) en paramètre(s)</p>
</div>
<p>Et pour utiliser la donnée ? C'est simple, voici un exemple pour « rafraichir les données à chaque affichage du Fragment » :</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onResume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onResume</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">// view est la référence à notre Layout.</span>
        <span class="token comment">// args est le paramètre injecté par Kotlin.</span>
        <span class="token comment">// args.monElement est mon paramètre.</span>
        view<span class="token operator">?</span><span class="token punctuation">.</span>findViewById<span class="token operator">&lt;</span>TextView<span class="token operator">></span><span class="token punctuation">(</span>R<span class="token punctuation">.</span>id<span class="token punctuation">.</span>text_notifications<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span>text <span class="token operator">=</span> args<span class="token punctuation">.</span>monElement<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="drawer-layout" tabindex="-1"><a class="header-anchor" href="#drawer-layout" aria-hidden="true">#</a> Drawer Layout</h3>
<p>En vous servant de l'outil intégré à Android Studio créé une Interface intégrant :</p>
<ul>
<li>Un Drawer</li>
<li>Un BottomNavigationView</li>
</ul>
<p>Les deux éléments doivent interagir avec le même FragmentContainerView.</p>
</template>
