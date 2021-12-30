<template><h1 id="tester-en-continu" tabindex="-1"><a class="header-anchor" href="#tester-en-continu" aria-hidden="true">#</a> Tester en continu</h1>
<p>L'autre gros avantage d'une stack d'intégration continue c'est la partie « test en continu ». Actuellement il y a fort à parier que vous avez appris que vous pouviez tester vos projets pour garantir la bonne qualité du code que vous produisez, mais également vous assurer de la non-régression.</p>
<p>L'intégration Continue (CI) va nous permettre justement de tester cette non-régression au fur et à mesure du projet. Ce TP va nous permettre de mettre en place la stack permettant de tester votre projet. Je vais illustrer la problématique avec deux langages, PHP et JavaScript mais sachez que ce que nous allons voir ici fonctionnera avec <strong>n'importe quel langage de programmation</strong>.</p>
<p>Je ne vais pas me concentrer ici sur la partie écriture des tests (car la question n'est pas ici). Si vous avez déjà écrits des tests vous vous êtes peut-être déjà demandé « Pourquoi ? », en effet quand on apprend à écrire des tests on s'intéresse souvent qu'aux tests et pas à quand les tests vont s'exécuter… Et bien c'est maintenant !</p>
<h2 id="les-tests-et-le-javascript" tabindex="-1"><a class="header-anchor" href="#les-tests-et-le-javascript" aria-hidden="true">#</a> Les tests et le JavaScript</h2>
<p>Comme en PHP il est possible de tester votre code JavaScript pour s'assurer que celui-ci ne connaisse pas de régression ou tout simplement ne perde pas en qualité au fur et à mesure des dévoloppement.</p>
<p>L'idée ici n'est pas de voir comment vous devez écrire des tests en JavaScript, l'idée est plutôt de voir comment les tests vont s'intégrer dans notre flow de développement. Pour illustrer, je vais utiliser Gitlab-CI (car je trouve la plateforme bien faite, et gratuite).</p>
<ul>
<li>La première étape va être la récupération du projet d'exemple. <a href="/sample/vite-project-with-test.zip">Celui-ci est disponible ici</a></li>
<li>Nous avons notre projet « préconfiguré », <strong>avant de continuer je vous laisse le tester sur votre machine</strong>.</li>
<li>Pour activer la partie CI il suffit de créer un fichier <code>gitlab-ci.yml</code>. Voilà le contenu.</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">before_script</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> npm install

<span class="token key atrule">test</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>latest
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> npm run test<span class="token punctuation">:</span>unit
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">when</span><span class="token punctuation">:</span> always
    <span class="token key atrule">reports</span><span class="token punctuation">:</span>
      <span class="token key atrule">junit</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> junit.xml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>C'est à vous, je vous laisse créer le :</p>
<ul>
<li>Le projet sur Gitlab</li>
<li>Tester.</li>
<li>Ajouter le fichier <code>.gitlab-ci.yml</code></li>
<li>Le push vers Gitlab.</li>
</ul>
<p>Une fois correctement configuré vous devriez voir :</p>
<p><img src="@source/tp/ci/ressources/tests_results.png" alt="Résultat"></p>
<div class="custom-container tip"><p class="custom-container-title">Nous avons ici les résultats</p>
<p>Pour chaque Pipelines nous allons donc avoir le résultat des tests. Si un test échoue l'ensemble du processus de CI/CD va être arrêté pour ne pas déployer un site qui ne fonctionnerait potentiellement plus.</p>
</div>
<h2 id="modifier-les-tests" tabindex="-1"><a class="header-anchor" href="#modifier-les-tests" aria-hidden="true">#</a> Modifier les tests</h2>
<p>Je vous laisse modifier un peu les tests pour tester le fonctionnement :</p>
<ul>
<li>Ajouter un nouveau test.</li>
<li>Modifier un test.</li>
<li>« Rendre un test » non valide.</li>
</ul>
<p>C'est à vous ! Je suis là si vous avez des questions.</p>
<h2 id="integrer-le-test-dans-un-flow-ci-cd-entier" tabindex="-1"><a class="header-anchor" href="#integrer-le-test-dans-un-flow-ci-cd-entier" aria-hidden="true">#</a> Intégrer le test dans un flow CI/CD entier</h2>
<p>Nous avons vu comment les tests pouvaient être ajoutés dans votre processus de développement, mais en général nous n'avons pas que les tests dans un projet ! Avec Gitlab-CI il va être très simple d'ajouter par exemple Gitlab-Page pour livrer en continu votre site internet.</p>
<p>Je vous laisse reprendre le <RouterLink to="/tp/ci/pages.html#deployer-un-site-vuejs">TP Gitlab Page pour intégrer la partie « pages ».</RouterLink></p>
<p><img src="@source/tp/ci/ressources/with_pages.png" alt="Résultat"></p>
<details class="custom-container details"><summary>Un peu d'aide? Bloqué ?</summary>
<p>Vous avez vraiment cherché ? Si oui voilà une solution possible.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">pages</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>latest
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> npm run gitlab
    <span class="token punctuation">-</span> mv public public<span class="token punctuation">-</span>vue
    <span class="token punctuation">-</span> mv dist public
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> public
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Je vous laisse chercher ou l'ajouter.</p>
</details>
</template>
