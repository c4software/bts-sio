<template><h1 id="controle-de-saisie-interactivite" tabindex="-1"><a class="header-anchor" href="#controle-de-saisie-interactivite" aria-hidden="true">#</a> Contrôle de saisie &amp; intéractivité</h1>
<p>Le JavaScript, comme je l'indiquai en introduction, est partout. Pour l'instant, nous allons le limiter principalement aux interactions utilisateurs (contrôle de saisie, validation de formulaire, interactivité).</p>
<p>Nous allons pratiquer les évènements JavaScript en ajoutant à notre TP Bart (<RouterLink to="/tp/php/tp2.html">Version JavaScript</RouterLink>) un simple formulaire puis des contrôles de saisie.</p>
<p>L'objectif étant donc d'ajouter des contrôles de saisie sur votre page formulaire.</p>
<p>Deux solutions sont possibles coder nous même, ou faire confiance à une librairie « provenant d'Internet ».</p>
<h2 id="ajouter-le-formulaire-sur-votre-page" tabindex="-1"><a class="header-anchor" href="#ajouter-le-formulaire-sur-votre-page" aria-hidden="true">#</a> Ajouter le formulaire sur votre page</h2>
<p>La première étape vas être d'ajouter dans la page un formulaire HTML doit ressembler à :</p>
<p><img src="@source/tp/javascript/res/bart-form.png" alt="Formulaire BART"></p>
<p>Je vais laisse écrire le code <em>et le style</em> du formulaire en question. Quelques règles :</p>
<ul>
<li>Vous pouvez ajouter bootstrap si vous souhaitez.</li>
<li>Vous devez utiliser un « form »</li>
<li>Vous devez externaliser la CSS.</li>
<li>Votre formulaire doit être avant le tableau.</li>
</ul>
<h2 id="la-validation-sans-librairie" tabindex="-1"><a class="header-anchor" href="#la-validation-sans-librairie" aria-hidden="true">#</a> La validation sans Librairie</h2>
<p>Ajouter des contrôles, finalement c'est simple. Il « faut juste » :</p>
<ul>
<li>Ajouter un évènement « onSubmit ».</li>
<li>Vérifier que les champs <code>input</code> ne sont pas vide (ou du moins, possède les valeurs attendues).</li>
</ul>
<p>En pratique ça va donner :</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">validateForm</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> name <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token keyword">const</span> password <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> name <span class="token operator">==</span> <span class="token string">""</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Name can't be blank"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    evt<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>password<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Password must be at least 6 characters long."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    evt<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Cas de réussite</span>

  <span class="token comment">// Empêche le submit du formulaire</span>
  evt<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Attacher l'évènement en JS</span>
document
  <span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"monForm"</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"submit"</span><span class="token punctuation">,</span> validateForm<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Vous pouvez également attacher l'événement directement dans le HTML avec</span>
<span class="token comment">// &lt;form onsubmit="validateForm(this)"></span>
<span class="token comment">// …</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">Un Instant !</p>
<p><code>return false</code> ? Et oui, c'est aussi simple que ça ! En JS si vous souhaitez stopper la soumissions d'un formulaire il suffit que votre fonction de validation retourne <code>false</code>. Votre navigateur sera automatiquement qu'il doit arrêter imédiatement la soumission du formulaire. Votre <em>serveur ne recevra donc <strong>pas</strong></em> les données.</p>
</div>
<h3 id="a-faire" tabindex="-1"><a class="header-anchor" href="#a-faire" aria-hidden="true">#</a> À faire</h3>
<ul>
<li>Je vous laisse le mettre en place dans votre code.</li>
<li>Rendre la page interactive avec les données saisies (via un <code>onsubmit</code> en HTML ou, <code>submit</code> via les events)</li>
<li>Je vous laisse écrire la même chose avec jQuery.</li>
</ul>
<h2 id="faire-l-action-souhaitee" tabindex="-1"><a class="header-anchor" href="#faire-l-action-souhaitee" aria-hidden="true">#</a> Faire l'action souhaitée</h2>
<p>Maintenant que nos informations sont validées, il faut les utiliser dans la page. En reprenant <RouterLink to="/tp/javascript/tp2.html">le code du TP précédent</RouterLink>, je vous laisse intégrer la logique suivante :</p>
<ul>
<li>Le tableau ne doit pas être visible au chargement de la page.</li>
<li>Une fois, la validation du formulaire effective (saisie correcte), le tableau doit s'afficher avec dedans la phrase choisie par l'utilisateur (ainsi que le nombre).</li>
<li>Le formulaire ne doit plus être visible (ainsi que la <code>card</code> dans lequel celui-ci est).</li>
<li>« Une action » recommencer la saisie doit permettre de :
<ul>
<li>Masquer le tableau</li>
<li>Afficher le formulaire à nouveau</li>
</ul>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">Rappels</p>
<p>Je vous rappels que vous avez <RouterLink to="/cheatsheets/javascript/">l'aide mémoire</RouterLink> ainsi que le <RouterLink to="/tp/javascript/support.html">support du cours</RouterLink> pour vous aider. Mais l'ensemble va reposer sur :</p>
<ul>
<li>Des sélecteurs, exemple <code>document.getElementById('tableau')</code>.</li>
<li>L'obtention de valeur, exemple <code>document.getElementById('monInputText').value</code>.</li>
<li>Masquer / afficher des éléments, exemple <code>document.getElementById('monInputText').className='hidden'</code>.</li>
</ul>
</div>
<h2 id="avec-une-librairie" tabindex="-1"><a class="header-anchor" href="#avec-une-librairie" aria-hidden="true">#</a> Avec une Librairie</h2>
<p>Nous avons vu la façon manuelle de valider les formulaires. Je pense que sans vous faire un dessin… vous vous rendez compte que si nous avons 200 champs; ça va être plus compliqué ! D'autant plus que plus notre formulaire sera complexe plus celui-ci aura des règles complexes.</p>
<p>Heureusement des gens ont déjà pensé à ce genre de problématique pour vous… Je vous propose d'utiliser :</p>
<ul>
<li><a href="https://github.com/jquery-validation/jquery-validation" target="_blank" rel="noopener noreferrer">jQuery Validation<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">C'est un plug-in parmi tant d'autres</p>
<p>Ce plug-in est juste « un parmi tant d'autre », comme toujours utilisez celui le plus adapté à votre problématique.</p>
<p>Par exemple quand nous ferons du VueJS, <strong>il ne faudra plus utiliser jQuery</strong> !</p>
</div>
<h3 id="a-faire-1" tabindex="-1"><a class="header-anchor" href="#a-faire-1" aria-hidden="true">#</a> À faire</h3>
<p>Réécrire votre code précédent pour implémenter une validation via jQuery Validation.</p>
</template>
