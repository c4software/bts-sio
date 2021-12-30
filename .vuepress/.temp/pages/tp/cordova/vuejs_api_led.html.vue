<template><h1 id="vuejs-le-reseau-et-une-led" tabindex="-1"><a class="header-anchor" href="#vuejs-le-reseau-et-une-led" aria-hidden="true">#</a> VueJS, le réseau, et une LED</h1>
<p>Dans le TP précédent nous avons, au travers des différents exemples utilisés que des fonctionnalités « locales » à votre téléphone.</p>
<p>Dans la vraie vie en plus d'utiliser les capteurs du téléphone nous utilisons souvent des API.</p>
<p>L'API que je vous propose permet de « simuler » une lampe connectée. En fonction de votre appel vous allez pouvoir allumer (ou éteindre) une ampoule fictive (qui sera affichée sur le vidéo projecteur).</p>
<h2 id="la-demarche" tabindex="-1"><a class="header-anchor" href="#la-demarche" aria-hidden="true">#</a> La démarche</h2>
<ul>
<li>Ajout « une page » avec un bouton + une icône <code>v-icon</code>.</li>
<li>Un modèle permettant de lire le retour de l'API.</li>
<li>Un DAO permettant d'appeler l'API.</li>
<li>Ajouter la route.</li>
<li>Ajouter l'entrée dans le menu permettant d'afficher la page.</li>
<li>Go !</li>
</ul>
<h2 id="le-fonctionnement" tabindex="-1"><a class="header-anchor" href="#le-fonctionnement" aria-hidden="true">#</a> Le fonctionnement</h2>
<ul>
<li>Trouver un nom à votre « leds ». (C'est votre LED à vous, nommé la comme <em>vous</em> le souhaitez)</li>
<li>Dans la vue « led » ajouter un bouton qui lors du <code>@click</code> appel la méthode de votre choix.</li>
<li>Dans la méthode en question, ajoutez l'appel au DAO que vous avez créé.</li>
<li>En fonction du retour, ajustez la vue.</li>
</ul>
<h2 id="le-modele" tabindex="-1"><a class="header-anchor" href="#le-modele" aria-hidden="true">#</a> Le modèle</h2>
<p>Pour réaliser cette partie du TP vous allez devoir construire un modèle. Cette partie peut-être assimilée à de la documentation je vous fournit donc la structure :</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Salon"</span><span class="token punctuation">,</span>
  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"update"</span><span class="token operator">:</span> <span class="token string">"Tue, 19 Mar 2019 12:31:36 GMT"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>⚠️ Maintenant que vous avez la structure, vous pouvez écrire le modèle.</p>
<h2 id="le-dao" tabindex="-1"><a class="header-anchor" href="#le-dao" aria-hidden="true">#</a> Le DAO</h2>
<p>Pour le DAO je vous aide, voilà la démarche</p>
<ul>
<li>Créer le fichier</li>
<li>Implémenter la méthode <code>getStatus</code></li>
<li>Implémenter la méthode <code>setStatus</code></li>
</ul>
<h3 id="pour-vous-aidez" tabindex="-1"><a class="header-anchor" href="#pour-vous-aidez" aria-hidden="true">#</a> Pour vous aidez …</h3>
<p>Voici un exemple de Modèle et de DAO</p>
<p><a href="https://gist.github.com/c4software/30947f2a86eb0ab065d26a6ed0edb3e9" target="_blank" rel="noopener noreferrer">Consulter l'exemple<ExternalLinkIcon/></a></p>
<h2 id="la-partie-ui" tabindex="-1"><a class="header-anchor" href="#la-partie-ui" aria-hidden="true">#</a> La partie UI</h2>
<ul>
<li>Importer le DAO.</li>
<li>Ajouter une icône (flash_on / flash_off en fonction du statut).</li>
<li>Ajouter une action au <code>@click</code> permettant appelant le DAO <code>setStatus</code>.</li>
</ul>
<p>C'est à vous de jouer ! (pour de vrai)</p>
<h2 id="evolution-de-l-api-1-ajout-de-la-position" tabindex="-1"><a class="header-anchor" href="#evolution-de-l-api-1-ajout-de-la-position" aria-hidden="true">#</a> Évolution de l'API 1 : Ajout de la position</h2>
<p>L'API en question possède deux autres paramètres <code>lat</code> et <code>lng</code>… Les deux paramètres sont la position de votre mobile.</p>
<ul>
<li>Ajouter dans le DAO les deux paramètres.</li>
<li>Modifier le modèle pour le faire correspondre à :</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Salon"</span><span class="token punctuation">,</span>
  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"update"</span><span class="token operator">:</span> <span class="token string">"Tue, 19 Mar 2019 12:31:36 GMT"</span><span class="token punctuation">,</span>
  <span class="token property">"position"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">"lat"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token property">"lng"</span><span class="token operator">:</span> <span class="token number">-0</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li>Ajouter le code JavaScript permettant de <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API" target="_blank" rel="noopener noreferrer">récupérer la position de votre mobile<ExternalLinkIcon/></a></li>
<li>Tester</li>
</ul>
<h2 id="evolution-de-l-api-2-ajouter-un-dashboard" tabindex="-1"><a class="header-anchor" href="#evolution-de-l-api-2-ajouter-un-dashboard" aria-hidden="true">#</a> Évolution de l'API 2 : ajouter un Dashboard</h2>
<p>L'API possède également une méthode <code>getAll</code> permettant de récupérer l'ensemble des leds actuellement connu par le système.</p>
<ul>
<li>Ajouter l'appel de la méthode dans le DAO.</li>
<li>Ajouter une nouvelle page à l'application <code>listant</code> l'ensemble des « Leds ». En utilisant une <code>v-list</code>.</li>
<li>Pour chaque ligne, faire en sorte d'afficher le statut de la « Led ». Exemple :</li>
</ul>
<p><img src="@source/tp/cordova/ressources/led_status_example.png" alt="Led status"></p>
<ul>
<li>Au <code>@click</code> changez le statut de la LED</li>
</ul>
</template>
