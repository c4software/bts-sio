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
@app.route("/api/liste")
def get_list():
    """ Retourne la liste des todo dans la session """
    return jsonify(session["todo"])
```

🕵️‍♀️ Notez le commentaire dans la fonction… J’espère que vous en mettre vous aussi…

Question :

- Comment être sur que la session est bien initialisé ?

### Votre décorateur

### Création

### Marquer comme terminé

### Suppression

#### Notes

### Solution possible structure

L’une des solutions est la suivante :

| Description           | Chemin           | Methode | Fonction      |
|-----------------------|------------------|---------|---------------|
| Liste                 | /api/liste       | GET     | liste()       |
| Création              | /api/creer       | POST    | creer()       |
| Marquer comme terminé | /api/terminer    | POST    | terminer()    |
| Supprimer             | /api/suppression | DELETE  | suppression() |

Question :

- À votre avis pourquoi est-ce important de fair ce travail ?
- Quel sont les autres solutions pour répondre à ce genre de soucis ?