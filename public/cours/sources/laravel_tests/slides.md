# Tester son application

## Laravel + PHPUnit

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Aujourd'hui, comment testez-vous votre projet ?

---

- Vous lancez `php artisan serve`.
- Vous cliquez partout dans le navigateur.
- Vous remplissez des formulaires à la main.
- « Bon, ça a l'air de marcher. »

---

## Le problème

Vous modifiez une méthode…

Que faut-il retester ?

---

## Tout.

À chaque modification, **tout** peut casser.

C'est ce qu'on appelle une **régression**.

---

## À votre avis

Combien de temps pour retester **à la main** l'ensemble de votre TODO List ?

(connexion, inscription, ajout, suppression, reset de mot de passe…)

---

## La solution

### Des tests automatisés

Du **code** qui teste votre **code**.

---

- Écrits une fois, exécutés des milliers de fois.
- En quelques **secondes**.
- À chaque modification, avant chaque mise en production.

---

## PHPUnit

- **Le** framework de tests de PHP (depuis 2004).
- Inclus **d'office** dans tout projet Laravel.
- Vous avez déjà un dossier `tests/` dans votre projet. Allez voir !

---

## Un test PHPUnit

```php
class CalculatriceTest extends TestCase
{
    public function test_addition(): void
    {
        $this->assertEquals(3, Calculatrice::addition(1, 2));
    }
}
```

Lisez-le à voix haute. C'est tout.

---

## Les conventions

- Un fichier de test par classe / fonctionnalité : `CalculatriceTest`, `ConnexionTest`…
- Une méthode par scénario, préfixée par `test_`.
- Le nom décrit le comportement attendu : `test_division_par_zero_interdite`.

---

## Les assertions

```php
$this->assertEquals(3, $resultat);   // Vaut exactement 3
$this->assertTrue($estValide);       // Vaut true
$this->assertNull($token);           // Vaut null
$this->expectException(InvalidArgumentException::class); // Doit lever une exception
```

---

## Deux grandes familles

- **Unit** (`tests/Unit`) : teste une fonction / classe **isolée**.
- **Feature** (`tests/Feature`) : teste une fonctionnalité **complète** (route → contrôleur → réponse).

---

## Un test Feature

```php
public function test_page_connexion_accessible(): void
{
    $this->get('/login')->assertStatus(200);
}
```

Simule une vraie requête HTTP… **sans navigateur, sans serveur lancé**.

---

## Les assertions sur la réponse

```php
$this->get('/login')->assertStatus(200);       // La page répond
$this->get('/todo')->assertRedirect('/login'); // Redirection
$this->get('/')->assertSee('Bienvenue');       // Le texte est présent
```

---

## Un instant…

Si un test crée des utilisateurs ou des TODO…

Ma base de données va être polluée, non ?

---

## RefreshDatabase

Pour les tests qui touchent à la base, Laravel propose une base **dédiée**, en **mémoire vive** :

```php
use RefreshDatabase;
```

- Créée avant chaque test (vos migrations sont rejouées).
- Détruite après.

Votre vraie base n'est **jamais touchée**.

---

## Lancer les tests

```bash
$ php artisan test

PASS  Tests\Unit\CalculatriceTest
✓ addition

Tests: 1 passed
```

---

## Question

Quand faut-il **écrire** les tests ?

Avant ou après le code ?

---

## Le TDD

### Test Driven Development

Écrire le test **avant** le code.

---

## Le cycle TDD

1. 🔴 **Red** : écrire un test qui échoue (la fonctionnalité n'existe pas encore).
2. 🟢 **Green** : écrire le code **minimum** pour que le test passe.
3. 🔵 **Refactor** : améliorer le code, les tests garantissent que rien ne casse.

Et on recommence.

---

## Ça paraît étrange ?

Écrire un test pour du code qui n'existe pas…

---

## En réalité

Le test devient votre **cahier des charges** :

- Il décrit ce que le code **doit faire**.
- Vous codez jusqu'à ce qu'il passe.
- Vous savez **exactement** quand vous avez terminé.

---

## Dans la vraie vie

- Les tests sont exécutés **automatiquement** à chaque `git push` (CI/CD).
- Un code sans test est un code qu'on n'ose plus modifier.
- Beaucoup d'entreprises **refusent** du code non testé.

---

## Récapitulatif

- Un test = une vérification automatique, relançable à volonté.
- Unit : une fonction isolée. Feature : route → contrôleur → réponse.
- `RefreshDatabase` : une base jetable pour les tests qui écrivent en base.
- `php artisan test` : toute votre application vérifiée en quelques secondes.
- TDD : le test d'abord, le code ensuite.

---

## Des questions ?

Place au TP 🚀
