<template><h1 id="build-deploy-avec-netlify" tabindex="-1"><a class="header-anchor" href="#build-deploy-avec-netlify" aria-hidden="true">#</a> Build, Deploy avec Netlify</h1>
<p>Dans ce document nous allons voir comment déployer une application simplement dans « le cloud » avec la plateforme Netlify.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Netlify est une plateforme gérant l'ensemble des problématiques de déploiement, mais également d'intégration continue pour que vous puisiez vous concentrer dans ce qui <strong>vous intéresse</strong> le développement de votre site Internet.</p>
<p>La solution de Netlify est intéressante, car elle nous permet entre autres de :</p>
<ul>
<li>Remplacer votre serveur.</li>
<li>Intégration continue (CI).</li>
<li>Déploiement continu (CD).</li>
<li>Intercepter les formulaires pour envoyer des emails sans rien coder.</li>
</ul>
<p>Et le tout vous allez le voir très très simplement (et en grande partie gratuitement)</p>
<h2 id="principe-de-fonctionnement" tabindex="-1"><a class="header-anchor" href="#principe-de-fonctionnement" aria-hidden="true">#</a> Principe de fonctionnement</h2>
<p>NetLify est une solution qui repose entièrement sur votre Workflow de travail GIT (vous pouvez passer par une archive ZIP, mais ça n'aurait aucun sens).</p>
<p>Nous allons donc :</p>
<ul>
<li>Connecter Github / Gitlab.</li>
<li>Choisir le projet.</li>
<li>Configurer le projet (branche, formulaire, script de déploiement)</li>
</ul>
<p>Vous allez le voir, la solution vous guidera pour que vous connectiez simplement votre projet Git et Netlify.</p>
<div class="custom-container danger"><p class="custom-container-title">Trop beau pour être vrai ?</p>
<p>C'est magique, ça semble parfait non ? Si c'est magique … C'est qu'il y a un truc ! Le truc ici c'est que Netlify est compatible uniquement avec des sites pensés jamStack.</p>
</div>
<h3 id="jamstack" tabindex="-1"><a class="header-anchor" href="#jamstack" aria-hidden="true">#</a> JamStack ?</h3>
<p>La jamstack c'est une nouvelle façon de voir la conception de site Internet, cette nouvelle façon de faire va nous permettre de réduire les couts d'hébergements / et bénéficier de l'avantage du Cloud (CI/CD, compression des assets, FAAS…)</p>
<p>Plein de mots qui font peur, mais ne vous inquiétez pas… C'est beaucoup plus simple qu'il n'y parait. Ici pas de PHP pour générer vos pages nous allons tout concevoir en HTML / JavaScript (VanillaJS, React, Vue, …) / CSS</p>
<p><img src="@source/tp/ci/jamstack/res/jamstack-horizontal.svg" alt="JamStack"></p>
<p><strong>JavaScript</strong>
Les fonctionnalités dynamiques sont gérées par JavaScript. Vous êtes libres d’utiliser la bibliothèque ou le framework que vous voulez.</p>
<p><strong>APIs</strong>
Les opérations côté serveur sont abstraites sous forme d’APIs réutilisables, accessibles en HTTPS à l’aide de JavaScript. Ces opérations peuvent être déléguées à des services tiers ou bien à vos propres fonctions. C'est ce que l'on appelle souvent FAAS (Function As A Service)</p>
<p><strong>Markup</strong>
Les sites web sont servis sous forme de fichiers HTML statiques. Ses fichiers peuvent être générés à partir de fichiers source (Markdown, générateur de site, ou simplement avec du HTML à l'ancienne).</p>
<div class="custom-container danger"><p class="custom-container-title">Est-ce la meilleure façon ?</p>
<p>C'est à la mode oui… Mais est-ce la meilleure façon ? Je ne sais pas. Sachez juste que pour l'instant c'est un standard et que beaucoup l'utilise.</p>
<p><strong>Il faut donc le connaitre / le maitriser.</strong></p>
</div>
<p><a href="https://jamstack.wtf/" target="_blank" rel="noopener noreferrer">Plus d'information sur la JamStack<ExternalLinkIcon/></a></p>
<h2 id="deployer-un-site" tabindex="-1"><a class="header-anchor" href="#deployer-un-site" aria-hidden="true">#</a> Déployer un site</h2>
<p>Nous allons donc déployer un site « pour tester Netlify », si vous n'avez pas de site static sous la main je vous propose d'en créer un rapidement avec <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">ViteJS<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init @vitejs/app
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><img src="@source/tp/ci/jamstack/res/vue-init.png" alt="Vue Init"></p>
<p>Cette commande va nous créer un projet « générique » que nous pourrons déployer sur Netlify en quelques minutes. Vous allez voir… C'est magique !</p>
<div class="custom-container danger"><p class="custom-container-title">Un instant</p>
<p>⚠️ Avant d'aller plus loin je vous laisse tester ce que vous aller déployer.</p>
</div>
<h3 id="creer-le-site-sur-github-gitlab" tabindex="-1"><a class="header-anchor" href="#creer-le-site-sur-github-gitlab" aria-hidden="true">#</a> Créer le site sur Github / Gitlab</h3>
<p>Nous allons utiliser à 100% le principe de CI / CD, nous allons donc mettre en place notre projet sur Github / Gitlab pour que celui-ci puisse être « watch » par Netlify.</p>
<p><img src="@source/tp/ci/jamstack/res/continuous-integration-2.png" alt="Integration continue"></p>
<div class="custom-container tip"><p class="custom-container-title">Github ?</p>
<p>Dans la suite des exemples je vais utiliser Github, mais le fonctionnement est <strong>identique</strong> si vous décidez d'utiliser GitLab.</p>
</div>
<p>Je vous laisse créer votre projet sur Github / Gitlab. Je pense que vous l'avez déjà fait plusieurs fois. Si ce n'est pas le cas, n'hésitez pas à me solliciter.</p>
<p><img src="@source/tp/ci/jamstack/res/github.png" alt="Github"></p>
<h3 id="connecter-github-gitlab-a-netlify" tabindex="-1"><a class="header-anchor" href="#connecter-github-gitlab-a-netlify" aria-hidden="true">#</a> Connecter Github / Gitlab à Netlify</h3>
<p>Maintenant que nous avons un projet sur Github / Gitlab, nous allons connecter la plateforme Netlify à votre code. Celle-ci prendra en charge <strong>automatiquement</strong> tout le processus de compilation de votre projet.</p>
<p>Concrètement qu'est-ce que ça veut dire ? Lors d'une modification de votre code source, Netlify va se déclencher et lancer « une machine » qui :</p>
<ul>
<li>Clonera la nouvelle version de votre site web.</li>
<li>Va installer les dépendances de votre projet.</li>
<li>Testera votre projet si vous avez des tests.</li>
<li>Lancera le script de « build ».</li>
<li>Sauvegardera dans leur CDN le résultat de la compilation.</li>
<li>… (et bien plus si vous avez activé d'autres options).</li>
</ul>
<p>Nous allons donc suivre la configuration « ultra simple » de Netlify</p>
<p><img src="@source/tp/ci/jamstack/res/step1.png" alt="Step 1">
<img src="@source/tp/ci/jamstack/res/step2.png" alt="Step 2">
<img src="@source/tp/ci/jamstack/res/step3.png" alt="Step 3"></p>
<div class="custom-container tip"><p class="custom-container-title">Ici rien de bien compliqué</p>
<p>La seule partie « vraiment intéressante », c'est la partie Build Settings. Nous avons ici les deux paramètres importants de notre flow CI/CD à savoir :</p>
<ul>
<li>La commande qui va compiler votre site.</li>
<li>Le dossier qui contiendra le résultat.</li>
</ul>
</div>
<h3 id="compilation-build" tabindex="-1"><a class="header-anchor" href="#compilation-build" aria-hidden="true">#</a> Compilation &amp; Build</h3>
<p>Et voilà ! Votre site est en cours de compilation… Dans quelques instants vous aurez déployé sur Internet un site complètement fonctionnel.</p>
<p><img src="@source/tp/ci/jamstack/res/build.png" alt="Step 3"></p>
<div class="custom-container danger"><p class="custom-container-title">Un peu de curiosité</p>
<p>Je vous laisse regarder ce que fait Netlify pendant le build notamment le Deploy Log.</p>
<p><img src="@source/tp/ci/jamstack/res/deploy_log.png" alt="Step 3"></p>
</div>
<p>Le site est <a href="https://607e90d957d531e74a211201--loving-hodgkin-09f331.netlify.app/" target="_blank" rel="noopener noreferrer">maintenant en ligne voici le mien par exemple<ExternalLinkIcon/></a></p>
<h3 id="apporter-des-modifications" tabindex="-1"><a class="header-anchor" href="#apporter-des-modifications" aria-hidden="true">#</a> Apporter des modifications</h3>
<p>Je vous laisse modifier votre site Internet. Si vous avez correctement configuré votre stack applicatif, vous devriez normalement déclencher une recompilation de votre site web.</p>
<p>C'est à vous.</p>
<h3 id="parametrage" tabindex="-1"><a class="header-anchor" href="#parametrage" aria-hidden="true">#</a> Paramètrage</h3>
<p>Mais Netlify c'est pas uniquement un simple CDN qui compile automatiquement vos sources ! C'est aussi tout un tas d'options permettant d'optimiser votre site.</p>
<p><img src="@source/tp/ci/jamstack/res/settings.png" alt="Settings"></p>
<p>Ces règles sont nommées PostProcessing sur Netlify. Ne vous y trompez pas, les règles en question ne sont que des outils préparamètres pour vous faire gagner du temps. Si vous le souhaitez, il est complètement possible de faire la même chose avec des solutions comme Gitlab-CI.</p>
<p>Nous allons faire le tour ensemble des options. Je vous attends.</p>
<h3 id="aller-plus-loin" tabindex="-1"><a class="header-anchor" href="#aller-plus-loin" aria-hidden="true">#</a> Aller plus loin</h3>
<p>Nous avons vu la base regardons ce que nous allons pouvoir faire très simplement avec Netlify.</p>
<h4 id="le-prerendering" tabindex="-1"><a class="header-anchor" href="#le-prerendering" aria-hidden="true">#</a> Le prérendering</h4>
<p>Nous avons ici un site complètement en JavaScript, pas idéal pour le référencement, pour le partage sur les Réseaux sociaux, etc. Nous allons pouvoir dire à Netlify de pré-render le site sur « leur serveur » pour que les robots des moteurs de recherche obtiennent une version HTML classique.</p>
<p>Cette problématique est relativement complexe à mettre en place en temps normal ! Avec Netlify vous allez voir c'est très très simple.</p>
<h4 id="les-formulaires" tabindex="-1"><a class="header-anchor" href="#les-formulaires" aria-hidden="true">#</a> Les formulaires</h4>
<p>Notre site est static oui… Donc exit le traitement serveur vous me direz ? Et bien pas vraiment… Souvent sur un site Internet ce que nous avons besoin c'est « juste » d'un envoi d'email.</p>
<p>Et bien avec Netlify c'est possible ! Et c'est très simple ! Nous allons le configurer ensemble et tester.</p>
<ul>
<li>Ajouter un formulaire dans notre site Internet.</li>
<li>Activation de l'option et mise en place de notification</li>
</ul>
<h4 id="les-branches" tabindex="-1"><a class="header-anchor" href="#les-branches" aria-hidden="true">#</a> Les branches</h4>
<p>Tester en prod personne n'aime ça… Pourtant vous pourriez vouloir montrer à votre client / collègue votre travail sans forcément le montrer sur votre ordinateur. Avec Netlify c'est possible. Nous allons le configurer sur votre projet.</p>
<h4 id="la-compression-des-assets" tabindex="-1"><a class="header-anchor" href="#la-compression-des-assets" aria-hidden="true">#</a> La compression des ASSETS</h4>
<p>Des images trop lourdes ? Un CSS non compressé ? Des fichiers non minifiés ? Aucun problème regardons comment répondre à cette problématique.</p>
</template>
