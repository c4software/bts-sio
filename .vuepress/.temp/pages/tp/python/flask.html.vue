<template><h1 id="decouvrir-flask" tabindex="-1"><a class="header-anchor" href="#decouvrir-flask" aria-hidden="true">#</a> Découvrir Flask</h1>
<p>Dans ce TP nous allons découvrir Flask (l’installation et un premier test).</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Flask est un framework open-source de développement web en Python. Son but principal est d'être léger, afin de garder la souplesse de la programmation Python, associée à un système de templates.</p>
<h2 id="installation-de-python" tabindex="-1"><a class="header-anchor" href="#installation-de-python" aria-hidden="true">#</a> Installation de python</h2>
<p>L’installation de Python sous Windows se fait via <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">l’installer officiel<ExternalLinkIcon/></a>, nous allons prendre la version 3.</p>
<p>Sous Linux (et macOS) Python est normalement <strong>inclus</strong>.</p>
<h2 id="installation-de-pip-python-2" tabindex="-1"><a class="header-anchor" href="#installation-de-pip-python-2" aria-hidden="true">#</a> Installation de PIP (Python 2)</h2>
<p>Pip est « le gestionnaire de paquets » de Python. PIP (Pip Installs Packages) va nous permettre d’installer les différentes librairies dont nous allons avoir besoin (virtualenv, flask, …).</p>
<h3 id="python-3" tabindex="-1"><a class="header-anchor" href="#python-3" aria-hidden="true">#</a> Python 3</h3>
<p>Bonne nouvelle ! Depuis python 3.4 pip est maintenant intégrés à l’installation de python. Rien à installer de plus.</p>
<h3 id="python-2" tabindex="-1"><a class="header-anchor" href="#python-2" aria-hidden="true">#</a> Python 2</h3>
<p>Normalement vous avez installé python3 donc vous n’avez pas à faire ceci, cependant dans votre vie vous rencontrerez peut-être des environnements Python 2. La procédure d’installation est donc la suivante :</p>
<ul>
<li>Télécharger sur votre machine le <a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noopener noreferrer">script suivant<ExternalLinkIcon/></a></li>
<li>Lancer dans une console administrateur : <code>python get-pip.py</code></li>
</ul>
<p>Et voilà ! pip est installé sur votre machine !</p>
<p>Question :</p>
<ul>
<li>Avez-vous ouvert le fichier avant de l’utiliser ?</li>
</ul>
<h2 id="creation-du-virtualenv" tabindex="-1"><a class="header-anchor" href="#creation-du-virtualenv" aria-hidden="true">#</a> Création du virtualenv</h2>
<p>VirtualEnv ? Kézako ! C’est l’un des petits trucs géniaux avec Python! VirtualEnv vous permet d’avoir des environnements cloisonnés pour chacun de vos projets. Ça va pour permettre par exemple d’installer une version différente de Flask pour des projets différents, ou avoir des librairies « A » uniquement dans votre projet « A ». Bref ça permet de faire les choses proprement.</p>
<p>Vu que c’est la première fois que vous configurez votre environnement nous allons installer virtualenv, dans <strong>une console administrateur</strong> lancez la commande suivante :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>python -m pip <span class="token function">install</span> virtualenv
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Maintenant que pip est installé vous allez pouvoir créer votre virtualenv :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ virtualenv -p python3 flask
Running virtualenv with interpreter /usr/local/bin/python3
Using base prefix <span class="token string">'/usr/local/Cellar/python3/3.6.4_1/Frameworks/Python.framework/Versions/3.6'</span>
New python executable <span class="token keyword">in</span> /private/tmp/flask/bin/python3.6
Also creating executable <span class="token keyword">in</span> /private/tmp/flask/bin/python
Installing setuptools, pip, wheel<span class="token punctuation">..</span>.done.
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Voilà notre environnement cloisonné est prêt, mais pour l’instant il n’est pas actif, il faut lancer une commande pour « entrer » dedans :</p>
<p>Sous Windows :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ flask<span class="token punctuation">\</span>Scripts<span class="token punctuation">\</span>activate
<span class="token punctuation">(</span>flask<span class="token punctuation">)</span> C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>user<span class="token punctuation">\</span>Documents<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Sous Unix :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">source</span> flask<span class="token punctuation">\</span>Scripts<span class="token punctuation">\</span>activate
<span class="token punctuation">(</span>flask<span class="token punctuation">)</span> /tmp
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Le <code>(flask)</code> entre parenthèses vous indique que vous êtes actuellement dans un environnement cloisonné, à partir de maintenant si vous installez des paquets via pip ils s’installeront non pas dans votre système, mais dans votre environnement « cloisoné ».</p>
<h2 id="le-fameux-hello-world" tabindex="-1"><a class="header-anchor" href="#le-fameux-hello-world" aria-hidden="true">#</a> Le fameux Hello World</h2>
<p>Testons notre installation en réalisant un simple Hello World. Créez un fichier <code>test.py</code> avec le contenu suivant :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span> <span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Lancez-le via la commande :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>python test.py
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Question :</p>
<ul>
<li>Modifier le script pour afficher 4x le hello world. (Plusieurs solutions…)</li>
<li>Modifier le texte affiché.</li>
</ul>
<h2 id="le-hello-word" tabindex="-1"><a class="header-anchor" href="#le-hello-word" aria-hidden="true">#</a> Le Hello Word++</h2>
<p>Maintenant que l’on sait que notre environnement d’exécution est correctement installé, nous allons tester la partie Flask. Avec la commande <code>pip</code> installer flask <strong>,mais</strong> avant pensez à activer votre environnement cloisonné précédemment créé</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>flask<span class="token punctuation">\</span>Scripts<span class="token punctuation">\</span>activate <span class="token comment"># sous Windows</span>
<span class="token builtin class-name">source</span> flask<span class="token punctuation">\</span>Scripts<span class="token punctuation">\</span>activate <span class="token comment"># Sous Unix</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Installation de Flask :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>python -m pip <span class="token function">install</span> flask
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Cette commande va installer Flask ainsi que les dépendances nécessaires à son fonctionnement.</p>
<h3 id="le-code" tabindex="-1"><a class="header-anchor" href="#le-code" aria-hidden="true">#</a> Le code</h3>
<p>Maintenant que Flask est installé nous allons pouvoir l’utiliser, notre exemple sera tout simple tout sera contenu dans <strong>un seul fichier</strong>, lancer un éditeur de texte (pyCharn, Visual Studio Code, etc), et commencer par créer le fichier suivant <code>main.py</code></p>
<p>Le fichier <code>main.py</code> va être le fichier principal de notre application, l’ensemble du code sera dedans. C’est bien pour une démo, bien évidement dans une vraie application on évitera.</p>
<h3 id="but-de-notre-code" tabindex="-1"><a class="header-anchor" href="#but-de-notre-code" aria-hidden="true">#</a> But de notre code</h3>
<p>Dans ce second exemple appelé <code>Hello World++</code> nous allons créer deux fonctions Python :</p>
<ul>
<li>La première <code>hello_world()</code> qui affichera <code>Bonjour Monde</code>.</li>
<li>Et la seconde <code>hello(name)</code> qui affichera <code>Bonjour &lt;nom&gt;</code>.</li>
</ul>
<h3 id="fonctionnement" tabindex="-1"><a class="header-anchor" href="#fonctionnement" aria-hidden="true">#</a> Fonctionnement</h3>
<p>Rappel sur le fonctionnement de Flask, comme vu pendant le cours Flask permet de « mapper » (faire correspondre) des URL et des fonctions Python. Nous devons donc définir des URL d’accès à <code>hello_world</code> et <code>hello</code> je vous propose :</p>
<ul>
<li><code>/</code> ==&gt; <code>hello_world()</code>.</li>
<li><code>/hello/&lt;name&gt;</code> ==&gt; <code>hello(name)</code>.</li>
</ul>
<h3 id="associer-un-lien-et-une-fonction" tabindex="-1"><a class="header-anchor" href="#associer-un-lien-et-une-fonction" aria-hidden="true">#</a> Associer un lien et une fonction</h3>
<p>En python, on utilise beaucoup de « décorateur », un décorateur est un « morceau de code » qui sera appelé avant, après, ou à l’initialisation de votre code.</p>
<p>Flask apporte un décorateur <code>@app.route</code> celui-ci nous permet de déclarer des nouveaux chemins (routes) pour accéder à nos API. Exemple :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">[</span>…<span class="token punctuation">]</span>
<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">hello_world</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Ce morceau de code déclare donc une url <code>/</code> et appellera la fonction <code>hello_world()</code> à chaque fois qu’une personne y accèdera.</p>
<h3 id="l-application" tabindex="-1"><a class="header-anchor" href="#l-application" aria-hidden="true">#</a> L’application</h3>
<p>Maintenant que nous avons défini dans notre tête la structure de notre application, écrivons le code :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask
app <span class="token operator">=</span> Flask<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">hello_world</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">"Bonjour Monde!"</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">"/hello/&lt;name>"</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">hello</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">"Bonjour {}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>

<span class="token comment"># Lancement de l'application</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>debug <span class="token operator">==</span> <span class="token boolean">True</span>
    app<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="le-test" tabindex="-1"><a class="header-anchor" href="#le-test" aria-hidden="true">#</a> Le test</h3>
<p>Tester votre application en lançant votre application. Pour ça vous devez activer le virtualEnv puis lancer :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>flask<span class="token punctuation">)</span>  tp1 ツ python main.py
 * Running on http://127.0.0.1:5000/ <span class="token punctuation">(</span>Press CTRL+C to quit<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Normalement votre code est maintenant accessible, testez le fonctionnement :</p>
<ul>
<li><a href="http://127.0.0.1:5000/" target="_blank" rel="noopener noreferrer">L’index<ExternalLinkIcon/></a></li>
<li><a href="http://127.0.0.1:5000/hello/Yolo" target="_blank" rel="noopener noreferrer">Hello Yolo<ExternalLinkIcon/></a></li>
</ul>
<p>Question :</p>
<ul>
<li>Changer le paramètre observer le résultat.</li>
</ul>
<h3 id="evolution" tabindex="-1"><a class="header-anchor" href="#evolution" aria-hidden="true">#</a> Évolution</h3>
<p>Maintenant que vous avez tout compris, je vous propose de mettre en place une nouvelle fonctionnalité :</p>
<blockquote>
<p>Ajouter une fonction à votre application qui va effectuer une addition par rapport à deux chiffres passés en paramètre.</p>
</blockquote>
<p>Étapes :</p>
<ul>
<li>Définir l’URL.</li>
<li>Définir le nom de la fonction.</li>
<li>Écrire le code.</li>
<li>Tester.</li>
</ul>
<p>C’est à vous !</p>
<Reveal text="Voir l’une des solutions possibles">
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">"/calcul/&lt;int:a>/&lt;int:b>"</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">calcul</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">"{}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Psss : Maintenant que tu as vu la solution. Modifier la consigne pour effectuer une division plutôt…</p>
</Reveal>
</template>
