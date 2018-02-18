# Écrire des API avec Flask

## Introduction

Dans ce TP nous allons créer des API à l’aide de Flask pour notre site web TodoList. Nous allons bien évidement utiliser l’interface que vous avez développé dans le TP 1 VueJS. Ici nous allons recoder la partie « serveur » en python grâce au micro framework Flask.

Pour ne pas compliquer le TP je vais faire abstraction de la base de données, nous allons utiliser la session comme la première version de l’application.

## Le main.py

Comme dans le premier TP notre code sera intégralement dans un fichier nommé « main.py ». Le fichier va contenir les différentes fonctions pour répondre aux différentes requêtes des clients.

Comme dans le premier TP, avant de commencer à coder nous allons déterminer le nom des fonctions ainsi que le chemin et les méthodes (POST, GET, DELETE, …):

| Description           | Chemin | Methode | Fonction |
|-----------------------|--------|---------|-----------
| Liste                 |        |         |          |
| Création              |        |         |          |
| Marquer comme terminé |        |         |          |
| Supprimer             |        |         |          |

Question :

- C’est à vous, Avant de continuer un papier un crayon !

Voir une des [solutions possible](#solution-possible-structure)

### Structure de base

Créer un fichier ```main.py``` c’est ce fichier qui va contenir l’ensemble de votre code, comme dans la version PHP, nous allons utiliser le JSON pour communiquer.

Le minimum pour notre TP fonctionne est la déclaration des imports suivants :

```python
import uuid
from flask import Flask, jsonify, request, session
```

Pour l’instant l’objet Flask n’est pas initialisé votre code n’est donc pas fonctionnel. Avant de continuer, regardons l’utilité des imports :

- [uuid](https://docs.python.org/3/library/uuid.html)
- [Flask](http://flask.pocoo.org/)
- [jsonify](http://flask.pocoo.org/docs/0.12/api/#flask.json.jsonify)
- [request](http://flask.pocoo.org/docs/0.12/api/#flask.request)
- [session](http://flask.pocoo.org/docs/0.12/api/#sessions)

### La partie Flask

Maintenant que vous avez compris l’usage des différents imports, nous allons initialiser Flask. Ajouter **à la fin** du fichier :

```python
app = Flask(__name__)

if __name__ == '__main__':
    app.secret_key = 'YOLO_EXAMPLE_CHANGEME'
    app.run()
```

Vous pouvez maintenant lancer votre application, via :

```sh
python main.pys
```

- À quoi sert ```app.secret_key``` ?
- Comment changer le port d’écoute ? (La réponse est là… [sur la documentation officiel](http://flask.pocoo.org/)… quelques part…)

### Liste

Comme dans le premier TP, l’API ```list``` ne va faire que retourner la liste des taches actuellement dans la session.

Avec Flask ça va être **très** simple ! Il suffit de faire :

```python
return jsonify(session["todo"])
```

Très bien, mais on fait ça où ? Dans une fonction, il faut donc créer une fonction dans le fichier ```main.py``` pour le nom de la fonction je vous laisse vous reporter [à votre tableau](#le-mainpy), pour le premier je vous aide :

```python
@app.route("/api/todo")
def liste():
    """ Retourne la liste des todo dans la session """
    return jsonify(session["todo"])
```

🕵️‍♀️ Notez le commentaire dans la fonction… J’espère que vous en mettre vous aussi…

Question :

- Comment être sur que la session est bien initialisé ?

### Votre décorateur

Et voilà, c’est le moment… Le moment ou vous allez écrire votre propre décorateur ! (Si c’est certains ont oublié ce que c’était un décorateur [rendez-vous ici](flask.html#associer-un-lien-et-une-fonction))

Très bien, maintenant que vous avez la mémoire fraîche, voilà votre décorateur :

```python
from functools import wraps
from flask import session
def init_session(fn):
    """ Decorateur qui init la session """
    @wraps(fn)
    def wrap(*args, **kwargs):
        if "todo" not in session:
            session["todo"] = {}
        return fn(*args, **kwargs)
    return wrap
```

Où mettre le code ?

- Choix 1 : Directement dans le main.py
- Choix 2 : Dans un autre fichier (exemple helper.py)

Vous avez le choix… Si vous faite le choix de mettre le fichier dans un autre fichier il faudra importer ```init_session``` dans le main.py :

```python
from helper import init_session
```

PS: Je vous conseil de le mettre dans un fichier ```helper.py```.

### Modification de la liste

Maintenant que votre décorateur est terminé nous allons l’utiliser. Avant la fonction ```liste()``` ajouter ```@init_session()``` exemple :

```python
@app.route("/api/todo")
@init_session # <-- Voilà ICI, ajouter l’appel au décorateur.
def liste():
    […]
```

🎓 Le décorateur va être appelé avant chaque requête, votre session sera toujours bien créée, pratique non ?

### Création

Comme dans le premier TP la partie création doit comporter un test :

- Est-ce que « text » est dans data ?

Ce test s’écrit en Python :

```python
[…]
if "texte" in data:
    pass
else:
    pass
[…]
```

- L’autre élément important, c’est l’unicité d’une tâche dans la session, en python ça se fait avec :

```python
import uuid
[…]
uniq_id = str(uuid.uuid4())
```

Comme pour la liste, vous pouvez vous reporter à votre tableau contenant « le mapping » entre le chemin et la méthode, voilà ce que ça donne dans mon cas :

```python
@app.route("/api/todo", methods=['POST'])
@init_session
def save():
    """ Save a new element in the session["todo"] """
    data = request.form
    if "texte" in data:
        session["todo"][str(uuid.uuid4())] = {"texte": data["texte"], "termine": False}
        session.modified = True
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})
```

Questions :

- Réaliser la methode dans votre code par rapport au tableau de définition que vous avez écrit.
- À quoi sert request.form ? (Voir la doc de Flask)
- Pourquoi est-je fait « session.modified = True » ? À votre avis ?

### Marquer comme terminé

Marquer comme terminé une tache c’est changer le status de « termine » à ```true```.

- Utiliser le décorateur d’initialisation de la session.
- Vérifier que la tâche existe dans la session. (En python ```if current_id in session["todo"]:```)
- Récupérer la tâche dan la session.
- Changer ```current['termine'] = True```.
- Sauvegarder à nouveau la tache dans la session.

Questions :

- Écrire l’algorithme (en Français), du code à obtenir.
- Le re-transcrire en Python.
- L’implémenter dans votre fichier main.py (en respectant le tableau établi)

Dans mon cas voilà le code obtenu :

```python
@app.route("/api/todo/done/<current_id>", methods=["POST"])
@init_session
def terminer(current_id):
    """ Marquer une Todo comme terminee """
    # L'id est terminee
    if current_id in session["todo"]:
        current = session["todo"][current_id]
        current["termine"] = True # Mark As done
        session["todo"][current_id] = current # and Save
        session.modified = True
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})
```

### Suppression

Supprimer une tâche, c’est tout simplement l’action de la retirer de la session, pour faire ça le mot clef et python c’est ```del```. Cependant votre code doit bloquer certaines actions car toute les tâches ne peuvent pas être supprimés :

- Limiter l’action seulement aux « identifiants » reconnu dans la session.
- La tâche doit avoir le booléen « termine » à vrai pour permettre la suppression.

Votre algorithme doit donc suivre :

- Utiliser le décorateur qui initialise la session.
- Vérifier que la tâche existe dans la session. (En Python ```if current_id in session["todo"]:```)
- Vérifier que la tâche à bien le statut ```termine == True```. (en Python ```session["todo"][current_id]["termine"]```)
- Suppression de la tâche (```del …```).
- Sauvegarder à nouveau la tache dans la session.

Questions :

- Écrire l’algorithme (en Français) du code à obtenir.
- Le re-transcrire en Python
- L’implémenter dans votre fichier main.py (en respectant le tableau établi)

Dans mon cas le code python obtenu est le suivant:

```python
@app.route("/api/todo/delete/<current_id>", methods=['DELETE'])
@init_session
def suppression(current_id):
    """ Suppression d'un element de la session["todo"] """
    # current_id exist and mark as done ?
    if current_id in session["todo"] and session["todo"][current_id]["termine"]:
        del session["todo"][current_id] # Remove the data
        session.modified = True
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})
```

## Tests

Maintenant que l’ensemble de votre code est terminé (et commenté 🕵🏻), nous allons pouvoir le tester, pour tester les API c’est plutôt simple. Il suffit d’utiliser des outils tels que [Postman](https://www.getpostman.com/), l’idée c’est de se construire un « cahier » de test vous permettant de valider le fonctionnement de votre application rapidement (comprendre dès que vous modifiez le code). C’est dans ce but que je vous ai préparé une collection de « tests » qui devrais vous permettre de valider rapidement le bon fonctionnement de vos API.

[Télécharger la collection de tests](https://raw.githubusercontent.com/c4software/api-todo-flask/master/test/TODO%20API%20Test.postman_collection.json)

Question :

- Valider le bon fonctionnement de votre application grace au jeu de test.

## Notes

### Solution possible structure

L’une des solutions est la suivante :

| Description           | Chemin                         | Methode | Fonction      |
|-----------------------|--------------------------------|---------|---------------|
| Liste                 | /api/todo                      | GET     | liste()       |
| Création              | /api/todo                      | POST    | creer()       |
| Marquer comme terminé | /api/todo/done/<current_id>    | POST    | terminer()    |
| Supprimer             | /api/todo/delete/<current_id>  | DELETE  | suppression() |

Question :

- À votre avis pourquoi est-ce important de fair ce travail ?
- Quel sont les autres solutions pour répondre à ce genre de soucis ?