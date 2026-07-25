# Ma première page PHP

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Le PHP s'exécute sur le serveur

Vous écrivez du PHP… mais le navigateur, lui, ne reçoit **que du HTML**.

Question : si vous faites « afficher le code source » dans le navigateur, que voyez-vous ?

---

## Les balises

```php
<?php
    // Votre code ici
?>
```

- Uniquement dans un fichier `.php`.
- Chaque instruction se termine par un `;`.
- Tout ce qui est **en dehors** des balises est envoyé tel quel.

---

## Afficher quelque chose

```php
<p>Nous sommes le <?php echo date("d/m/Y"); ?></p>
```

- `echo` écrit dans la page.
- `date()` est une fonction **fournie** par PHP.

Question : que se passe-t-il si vous rechargez la page demain ?

---

## Récapitulatif

- Le PHP est exécuté **côté serveur**, le client reçoit du HTML.
- `<?php ?>` dans un fichier `.php`, une instruction = un `;`.
- `echo` pour écrire, `date()` pour la date.

---

## Des questions ?

Place au TP 🚀
