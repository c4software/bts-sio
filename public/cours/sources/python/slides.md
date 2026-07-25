# Flask

### Micro-Framework Python

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

### Mais avant…

---

#### Introduction à Python

![](./img/python.png)

- Langage Interprété
- Orienté objet
- Également procédural

---

### Créé en 1989

## Très simple à apprendre

---

### Pourquoi Python ?

- Simple
- Open source
- Multi-plateforme
- De gros acteurs
- Batteries « incluses »
- Multi-paradigmes (Procédural ou Objet)

---

### Qui utilise Python ?

- Google
- NSA
- Dropbox
- Youtube
- Netflix
- NASA
- …

---

### Les étudiants du monde entier

---

### Par métiers

- Machine learning
- Mathématique
- Les hackers
- Vous !

---

### Installation

- Linux : Inclus
- OSX : Inclus
- Windows : Installation sur python.org
- Windows 10 : Fait partie de WSL 🎉
- Intégré sur les cartes type Raspberry Pi, Banana Pi…

---

### Un Langage « différent »

- Basé sur l’indentation
- Pas d’accolade
- Des opérateurs logiques en anglais (and, or, not au lieu de &&, ||, !)

---

### Batteries « incluses »

Librairie de base très complète

- async.io, os, sys, re, …

---

Énormément de librairies tierces

- Flask, PIL, …

---

### Quelques exemples

```python
>>> variable = "demo"

>>> print (variable)
demo
```

---

```python
>>> variable = 3 * 4

>>> variable
>>> 12
>>> variable == 13
>>> False
>>> print ("Le résultat est {}".format(variable))
>>> Le résultat est 12
```

---

### Les listes

```python
>>> ma_liste = [1, 4, 2]

>>> ma_liste
>>> [1, 4, 2]
>>> ma_liste.sort()
>>> ma_liste
>>> [1, 2, 4]
>>> len(ma_liste)
>>> 3
```

---

### Manipuler les listes

```python
>>> ma_liste = [1, 4, 2]

>>> 3 in ma_liste
>>> False
>>> ma_liste.append(3)
>>> 3 in ma_liste
>>> True
>>> len(ma_liste)
>>> 4
```

---

### Manipuler les listes (suite)

```python
>>> x = range(5)

>>> x
>>> range(0, 5)
>>> list(x)
>>> [0, 1, 2, 3, 4]
>>> for i in x:
>>> ... print (i)
>>> ...
>>> 0
>>> 1
>>> 2
>>> 3
>>> 4
```

---

### Les fonctions

```python
>>> def bonjour():
>>> ... print ("Bonjour Monde")

>>> bonjour()
>>> Bonjour Monde
```

---

### Batteries « Incluses »

```python
>>> from random import choice

>>> def lettre():
>>> ... return choice("abcdefghijklmnopqrstuvwxyz")
>>>
>>> lettre()
>>> v
>>> lettre()
>>> a
```

---

### Les conditions

```python
if "test" in "valentin":
    print ("Oui")
else:
    print ("Non")
```

---

### Les conditions

```python
if a == 1 and b == 2:
    print ("Oui")
else:
    print ("Non")
```

---

### Avancés

```python
>>> liste = range(20)
>>> liste2 = [x for x in liste if x % 2]
```

---

#### À Votre avis ?

---

```python
>>> print (liste2)
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
```

---

### Avancés 2

```python
>>> [x * 2 for x in range(20) if x in [2, 3]]
```

---

```python
[4, 6]
```

---

### Plus ?

## [Quelques modules intéressants](http://python.lycee.free.fr/modules_utiles.html)

---

### Flask

#### Micro-Framework

---

##### Qu'est-ce que c'est ?

- Minimaliste
- Parfait pour des API ou des petits projets
- Des « extensions » dispo (User auth, Database, …)
- Gestion des templates 👩‍🎨

---

### Installer Flask ?

C'est très simple

```sh
pip install flask
```

---

### Pip ?

![WTF](./img/wtf.gif)

---

- Gestion de packages écrits en python
- Intégré dans Python 3
- Plus de **86 000** paquets

---

### Mieux que des mots…

#### Des démos !

---

[Exemple de code](https://gist.github.com/c4software/02d822d008190fa3d83ffcab11875d7e)

---

### Les routes

```python
@app.route('/file/<filename>')
def get_file(filename = None):
```

---

### GET

```python
@app.route('/file/<filename>')
```

---

### POST

```python
@app.route('/file/<filename>', methods=["POST"])
```

---

### 🙃

---

### Les templates

[La documentation](http://flask.pocoo.org/docs/1.0/quickstart/#rendering-templates)

---

### Oui, bon et maintenant, le but ?

Créer simplement & rapidement des backends. Pratique en cas de prototypage rapide

---

#### L'hébergement

- Firebase 🔥
- Docker image 👍 (OpenFaaS)
- Heroku
- Clever Cloud
- …

---

### Des questions ?
