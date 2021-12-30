<template><h1 id="ecrire-des-api-avec-flask" tabindex="-1"><a class="header-anchor" href="#ecrire-des-api-avec-flask" aria-hidden="true">#</a> Écrire des API avec Flask</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Dans ce TP nous allons créer des API à l’aide de Flask pour notre site web TodoList. Nous allons bien évidemment utiliser l’interface que vous avez développée dans le TP 1 VueJS. Ici nous allons recoder la partie « serveur » en python grâce au micro framework Flask.</p>
<p>Pour ne pas compliquer le TP je vais faire abstraction de la base de données, nous allons utiliser la session comme la première version de l’application.</p>
<h2 id="le-main-py" tabindex="-1"><a class="header-anchor" href="#le-main-py" aria-hidden="true">#</a> Le main.py</h2>
<p>Comme dans le premier TP notre code sera intégralement dans un fichier nommé « main.py ». Le fichier va contenir les différentes fonctions pour répondre aux différentes requêtes des clients.</p>
<p>Comme dans le premier TP, avant de commencer à coder nous allons déterminer le nom des fonctions ainsi que le chemin et les méthodes (POST, GET, DELETE, …):</p>
<table>
<thead>
<tr>
<th>Description</th>
<th>Chemin</th>
<th>Méthode</th>
<th>Fonction</th>
</tr>
</thead>
<tbody>
<tr>
<td>Liste</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>Création</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>Marquer comme terminé</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>Supprimer</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>Question :</p>
<ul>
<li>C’est à vous, avant de continuer un papier un crayon ! Remplissez le tableau.</li>
</ul>
<Reveal text="Voir l’une des solutions possibles">
<table>
<thead>
<tr>
<th>Description</th>
<th>Chemin</th>
<th>Méthode</th>
<th>Fonction</th>
</tr>
</thead>
<tbody>
<tr>
<td>Liste</td>
<td>/api/todo</td>
<td>GET</td>
<td>liste()</td>
</tr>
<tr>
<td>Création</td>
<td>/api/todo</td>
<td>POST</td>
<td>creer()</td>
</tr>
<tr>
<td>Marquer comme terminé</td>
<td>/api/todo/done/&lt;current_id&gt;</td>
<td>POST</td>
<td>terminer()</td>
</tr>
<tr>
<td>Supprimer</td>
<td>/api/todo/delete/&lt;current_id&gt;</td>
<td>DELETE</td>
<td>suppression()</td>
</tr>
</tbody>
</table>
<p>Question :</p>
<ul>
<li>À votre avis pourquoi est-ce important de faire ce travail ?</li>
<li>Quelles sont les autres solutions pour répondre à ce genre de soucis ?</li>
</ul>
</Reveal>
<h3 id="structure-de-base" tabindex="-1"><a class="header-anchor" href="#structure-de-base" aria-hidden="true">#</a> Structure de base</h3>
<p>Créer un fichier <code>main.py</code> c’est ce fichier qui va contenir l’ensemble de votre code, comme dans la version PHP, nous allons utiliser le JSON pour communiquer.</p>
<p>Le minimum pour notre TP fonctionne est la déclaration des imports suivants :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> uuid
<span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask<span class="token punctuation">,</span> jsonify<span class="token punctuation">,</span> request<span class="token punctuation">,</span> session
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Pour l’instant l’objet Flask n’est pas initialisé votre code n’est donc pas fonctionnel. Avant de continuer, regardons l’utilité des imports :</p>
<ul>
<li><a href="https://docs.python.org/3/library/uuid.html" target="_blank" rel="noopener noreferrer">uuid<ExternalLinkIcon/></a></li>
<li><a href="http://flask.pocoo.org/" target="_blank" rel="noopener noreferrer">Flask<ExternalLinkIcon/></a></li>
<li><a href="http://flask.pocoo.org/docs/0.12/api/#flask.json.jsonify" target="_blank" rel="noopener noreferrer">jsonify<ExternalLinkIcon/></a></li>
<li><a href="http://flask.pocoo.org/docs/0.12/api/#flask.request" target="_blank" rel="noopener noreferrer">request<ExternalLinkIcon/></a></li>
<li><a href="http://flask.pocoo.org/docs/0.12/api/#sessions" target="_blank" rel="noopener noreferrer">session<ExternalLinkIcon/></a></li>
</ul>
<h3 id="la-partie-flask" tabindex="-1"><a class="header-anchor" href="#la-partie-flask" aria-hidden="true">#</a> La partie Flask</h3>
<p>Maintenant que vous avez compris l’usage des différents imports, nous allons initialiser Flask. Ajouter <strong>à la fin</strong> du fichier :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>app <span class="token operator">=</span> Flask<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>secret_key <span class="token operator">=</span> <span class="token string">'YOLO_EXAMPLE_CHANGEME'</span>
    app<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Vous pouvez maintenant lancer votre application, via :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>python main.pys
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>À quoi sert <code>app.secret_key</code> ?</li>
<li>Comment changer le port d’écoute ? (La réponse est là… <a href="http://flask.pocoo.org/" target="_blank" rel="noopener noreferrer">sur la documentation officielle<ExternalLinkIcon/></a>… quelques part…)</li>
</ul>
<h3 id="liste" tabindex="-1"><a class="header-anchor" href="#liste" aria-hidden="true">#</a> Liste</h3>
<p>Comme dans le premier TP, l’API <code>list</code> ne va faire que retourner la liste des tâches actuellement dans la session.</p>
<p>Avec Flask ça va être <strong>très</strong> simple ! Il suffit de faire :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">return</span> jsonify<span class="token punctuation">(</span>session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Très bien, mais on fait ça où ? Dans une fonction, il faut donc créer une fonction dans le fichier <code>main.py</code> pour le nom de la fonction je vous laisse vous reporter <a href="#le-mainpy">à votre tableau</a>, pour le premier je vous aide :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">"/api/todo"</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">liste</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">""" Retourne la liste des todo dans la session """</span>
    <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span>session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>🕵️‍♀️ Notez le commentaire dans la fonction… J’espère que vous allez en mettre vous aussi…</p>
<p>Question :</p>
<ul>
<li>Comment être sure que la session est bien initialisée ?</li>
</ul>
<h3 id="votre-decorateur" tabindex="-1"><a class="header-anchor" href="#votre-decorateur" aria-hidden="true">#</a> Votre décorateur</h3>
<p>Et voilà, c’est le moment… Le moment ou vous allez écrire votre propre décorateur ! (Si certains ont oublié ce que c’était un décorateur <RouterLink to="/tp/python/flask.html#associer-un-lien-et-une-fonction">rendez-vous ici</RouterLink>)</p>
<p>Très bien, maintenant que vous avez la mémoire fraiche, voilà votre décorateur :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> functools <span class="token keyword">import</span> wraps
<span class="token keyword">from</span> flask <span class="token keyword">import</span> session
<span class="token keyword">def</span> <span class="token function">init_session</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">""" Décorateur qui init la session """</span>
    <span class="token decorator annotation punctuation">@wraps</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">wrap</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token string">"todo"</span> <span class="token keyword">not</span> <span class="token keyword">in</span> session<span class="token punctuation">:</span>
            session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">return</span> fn<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
    <span class="token keyword">return</span> wrap
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Où mettre le code ?</p>
<ul>
<li>Choix 1 : Directement dans le main.py</li>
<li>Choix 2 : Dans un autre fichier (exemple helper.py)</li>
</ul>
<p>Vous avez le choix… Si vous faites le choix de mettre le fichier dans un autre fichier, il faudra importer <code>init_session</code> dans le main.py :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> helper <span class="token keyword">import</span> init_session
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>PS Je vous conseille de le mettre dans un fichier <code>helper.py</code>.</p>
<h3 id="modification-de-la-liste" tabindex="-1"><a class="header-anchor" href="#modification-de-la-liste" aria-hidden="true">#</a> Modification de la liste</h3>
<p>Maintenant que votre décorateur est terminé, nous allons l’utiliser. Avant la fonction <code>liste()</code> ajouter <code>@init_session()</code> exemple :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">"/api/todo"</span><span class="token punctuation">)</span>
<span class="token decorator annotation punctuation">@init_session</span> <span class="token comment"># &lt;-- Voilà ICI, ajouter l’appel au décorateur.</span>
<span class="token keyword">def</span> <span class="token function">liste</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>🎓 Le décorateur va être appelé avant chaque requête, votre session sera toujours bien créée, pratique non ?</p>
<h3 id="creation" tabindex="-1"><a class="header-anchor" href="#creation" aria-hidden="true">#</a> Création</h3>
<p>Comme dans le premier TP la partie création doit comporter un test :</p>
<ul>
<li>Est-ce que <code>e</code> est dans data ?</li>
</ul>
<p>Ce test s’écrit en Python :</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">[</span>…<span class="token punctuation">]</span>
<span class="token keyword">if</span> <span class="token string">"texte"</span> <span class="token keyword">in</span> data<span class="token punctuation">:</span>
    <span class="token keyword">pass</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li>L’autre élément important, c’est l’unicité d’une tâche dans la session, en python ça se fait avec :</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> uuid
<span class="token punctuation">[</span>…<span class="token punctuation">]</span>
uniq_id <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>uuid4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Comme pour la liste, vous pouvez vous reporter à votre tableau contenant « le mapping » entre le chemin et la méthode, voilà ce que ça donne dans mon cas :</p>
<Reveal text="Cliquer pour afficher une solution possible">
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">"/api/todo"</span><span class="token punctuation">,</span> methods<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">'POST'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token decorator annotation punctuation">@init_session</span>
<span class="token keyword">def</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">""" Save a new element in the session["todo"] """</span>
    data <span class="token operator">=</span> request<span class="token punctuation">.</span>form
    <span class="token keyword">if</span> <span class="token string">"texte"</span> <span class="token keyword">in</span> data<span class="token punctuation">:</span>
        session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>uuid4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"texte"</span><span class="token punctuation">:</span> data<span class="token punctuation">[</span><span class="token string">"texte"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">"termine"</span><span class="token punctuation">:</span> <span class="token boolean">False</span><span class="token punctuation">}</span>
        session<span class="token punctuation">.</span>modified <span class="token operator">=</span> <span class="token boolean">True</span>
        <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"success"</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"success"</span><span class="token punctuation">:</span> <span class="token boolean">False</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></Reveal>
<p>Questions :</p>
<ul>
<li>Réaliser la methode dans votre code par rapport au tableau de définition que vous avez écrit.</li>
<li>À quoi sert request.form ? (Voir la doc de Flask)</li>
<li>Pourquoi ai-je fait « session.modified = True » ? À votre avis ? (La réponse est dans la documentation de Flask)</li>
</ul>
<h3 id="marquer-comme-termine" tabindex="-1"><a class="header-anchor" href="#marquer-comme-termine" aria-hidden="true">#</a> Marquer comme terminé</h3>
<p>Marquer comme terminé une tache c’est changer le statut de « termine » à <code>true</code>.</p>
<ul>
<li>Utiliser le décorateur d’initialisation de la session.</li>
<li>Vérifier que la tâche existe dans la session. (En python <code>if current_id in session[&quot;todo&quot;]:</code>)</li>
<li>Récupérer la tâche dans la session.</li>
<li>Changer <code>current['termine'] = True</code>.</li>
<li>Sauvegarder à nouveau la tache dans la session.</li>
</ul>
<p>Questions :</p>
<ul>
<li>Écrire l’algorithme (en Français), du code à obtenir.</li>
<li>Le retranscrire en Python.</li>
<li>L’implémenter dans votre fichier main.py (en respectant le tableau établi)</li>
</ul>
<Reveal text="Cliquer pour afficher une solution possible">
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">"/api/todo/done/&lt;current_id>"</span><span class="token punctuation">,</span> methods<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">"POST"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token decorator annotation punctuation">@init_session</span>
<span class="token keyword">def</span> <span class="token function">terminer</span><span class="token punctuation">(</span>current_id<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">""" Marquer une Todo comme termine """</span>
    <span class="token comment"># L'id est termine, et present dans la session</span>
    <span class="token keyword">if</span> current_id <span class="token keyword">in</span> session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        current <span class="token operator">=</span> session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span><span class="token punctuation">[</span>current_id<span class="token punctuation">]</span>
        current<span class="token punctuation">[</span><span class="token string">"termine"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">True</span> <span class="token comment"># Mark As done</span>
        session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span><span class="token punctuation">[</span>current_id<span class="token punctuation">]</span> <span class="token operator">=</span> current <span class="token comment"># and Save</span>
        session<span class="token punctuation">.</span>modified <span class="token operator">=</span> <span class="token boolean">True</span>
        <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"success"</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"success"</span><span class="token punctuation">:</span> <span class="token boolean">False</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></Reveal>
<h3 id="suppression" tabindex="-1"><a class="header-anchor" href="#suppression" aria-hidden="true">#</a> Suppression</h3>
<p>Supprimer une tâche, c’est tout simplement l’action de la retirer de la session, pour faire ça le mot-clé et python c’est <code>del</code>. Cependant votre code doit bloquer certaines actions, car toutes les tâches ne peuvent pas être supprimées :</p>
<ul>
<li>Limiter l’action seulement aux « identifiants » reconnus dans la session.</li>
<li>La tâche doit avoir le booléen « termine » à vrai pour permettre la suppression.</li>
</ul>
<p>Votre algorithme doit donc suivre :</p>
<ul>
<li>Utiliser le décorateur qui initialise la session.</li>
<li>Vérifier que la tâche existe dans la session. (En Python <code>if current_id in session[&quot;todo&quot;]:</code>)</li>
<li>Vérifier que la tâche à bien le statut <code>termine == True</code>. (en Python <code>session[&quot;todo&quot;][current_id][&quot;termine&quot;]</code>)</li>
<li>Suppression de la tâche (<code>del …</code>).</li>
<li>Sauvegarder à nouveau la tache dans la session.</li>
</ul>
<p>Questions :</p>
<ul>
<li>Écrire l’algorithme (en Français) du code à obtenir.</li>
<li>Le retranscrire en Python</li>
<li>L’implémenter dans votre fichier main.py (en respectant le tableau établi)</li>
</ul>
<Reveal text="Cliquer pour afficher une solution possible">
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">"/api/todo/delete/&lt;current_id>"</span><span class="token punctuation">,</span> methods<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">'DELETE'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token decorator annotation punctuation">@init_session</span>
<span class="token keyword">def</span> <span class="token function">suppression</span><span class="token punctuation">(</span>current_id<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">""" Suppression d'un element de la session["todo"] """</span>
    <span class="token comment"># current_id exist and mark as done ?</span>
    <span class="token keyword">if</span> current_id <span class="token keyword">in</span> session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span> <span class="token keyword">and</span> session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span><span class="token punctuation">[</span>current_id<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"termine"</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token keyword">del</span> session<span class="token punctuation">[</span><span class="token string">"todo"</span><span class="token punctuation">]</span><span class="token punctuation">[</span>current_id<span class="token punctuation">]</span> <span class="token comment"># Remove the data</span>
        session<span class="token punctuation">.</span>modified <span class="token operator">=</span> <span class="token boolean">True</span>
        <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"success"</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"success"</span><span class="token punctuation">:</span> <span class="token boolean">False</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></Reveal>
<h2 id="tests" tabindex="-1"><a class="header-anchor" href="#tests" aria-hidden="true">#</a> Tests</h2>
<p>Maintenant que l’ensemble de votre code est terminé (et commenté 🕵🏻), nous allons pouvoir le tester, pour tester les API c’est plutôt simple. Il suffit d’utiliser des outils tels que <a href="https://www.getpostman.com/" target="_blank" rel="noopener noreferrer">Postman<ExternalLinkIcon/></a>, l’idée c’est de se construire un « cahier » de test vous permettant de valider le fonctionnement de votre application rapidement (comprendre dès que vous modifiez le code). C’est dans ce but que je vous ai préparé une collection de « tests » qui devrait vous permettre de valider rapidement le bon fonctionnement de vos API.</p>
<p><a href="https://raw.githubusercontent.com/c4software/api-todo-flask/master/test/TODO%20API%20Test.postman_collection.json" target="_blank" rel="noopener noreferrer">Télécharger la collection de tests<ExternalLinkIcon/></a></p>
<p>Question :</p>
<ul>
<li>Valider le bon fonctionnement de votre application grâce au jeu de test.</li>
</ul>
<h2 id="utilisation-des-api" tabindex="-1"><a class="header-anchor" href="#utilisation-des-api" aria-hidden="true">#</a> Utilisation des API</h2>
<p>Mettre à jour le code de votre TP « Ajouter VueJS dans un site existant » pour utiliser ces nouvelles API.</p>
</template>
