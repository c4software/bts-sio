# Flask

### Micro-Framework Python

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

### Mais avant…

---

#### Introduction à Python

![](./img/python.png)

- Language Interprété
- Orientés objets
- Également procédurale

---

### Créé en 1989

## Très simple à apprendre

---

### Pourquoi Python ?

- Simple
- Open source
- Multi-plateforme
- De gros acteurs
- Batteries « inclus »
- Multi-paradigmes (Procédurale ou Objet)

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
- Intégré sur les cartes type Raspberry Pi, Banana Pi…

---

### Un Language « différent »

- Basé sur l’indentation
- Pas d’accolade
- Des opérateurs logiques en anglais (and, or, not au lieux de &&, ||, !)

---

### Batteries « inclus »

- Librairie de base très complète
- Énormément de librairies tierces

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
>>> 3
```

---

### Manipuler les listes (suite)

```python
>>> x = range(5)

>>> x
>>> range(0, 5)
>>> list(x)
>>> [0, 1, 2, 3, 4, 5]
>>> for i in x:
>>> ... print (i)
>>> ...
>>> 0
>>> 1
>>> 2
>>> 3
>>> 4
>>> 5
```

---

### Les fonctions

```python
>>> def bonjour():
... print ("Bonjour Monde")
...

>>> bonjour()
>>> Bonjour Monde
```

---

### Batteries « Inclus »

```python
>>> from random import choice

>>> def lettre():
>>> ... choice("abcdefghijklmnopqrstuvwxyz")
>>> ...
>>> lettre()
>>> v
>>> lettre()
>>> a
```

---

### Les conditions

```python
if "test" in "valentin":
    print ("IF")
else:
    print ("ELSE")
```

---

### Les conditions

```python
if a == 1 and b == 2:
    print ("IF")
else:
    print ("ELSE")
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

### Plus ?

## [Quelques modules intéréssants](http://python.lycee.free.fr/modules_utiles.html)

---

### Flask

#### Micro-Framework

---

##### Qu'est-ce que c'est ?

- Minimaliste
- Parfait pour des API ou des petits projets
- Des « extensions » dispo (User auth, Database, …)

---

### Installer Flask

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

### Des questions ?
