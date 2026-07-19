---
description: "Dans ce TP nous allons découvrir les tests automatisés avec Laravel et PHPUnit : premiers tests unitaires, tests de pages, initiation au TDD et lecture de tests d'un vrai projet."
---

# Tester son application avec PHPUnit

![Laravel](./ressources/logo.png)

::: details Sommaire
[[toc]]
:::

Depuis le début de notre parcours Laravel, vous testez votre projet **à la main** : vous lancez le serveur, vous cliquez, vous remplissez des formulaires… Et à chaque modification, il faudrait tout revérifier. Dans ce TP, nous allons automatiser tout ça avec **PHPUnit**, le framework de tests inclus dans Laravel.

::: tip Un TP court (3 h), mais fondamental

Les tests automatisés sont **la** pratique qui différencie un code de TP d'un code professionnel. C'est aussi un incontournable des entretiens d'embauche. La bonne nouvelle : rien à installer, PHPUnit est déjà dans votre projet.

:::

Dans ce TP, je vous invite à avoir en parallèle :

- [L'aide mémoire Laravel](/cheatsheets/laravel/)
- [La synthèse des commandes](/cheatsheets/laravel/quick.md)

## Les slides

Avant de coder, comprenons ce qu'est un test automatisé et pourquoi le TDD existe :

<ClientOnly>
<SlidesDeck src="laravel_tests" />
</ClientOnly>

## Prérequis

Un projet Laravel de votre parcours, idéalement la TODO List avec authentification (voir [le TP Comprendre l'authentification](./authentification_manuelle.md)). Seule la partie « tests de pages » l'utilise, le reste du TP fonctionne avec n'importe quel projet Laravel.

## Objectifs

À la fin de ce TP vous saurez :

- Lancer les tests d'un projet Laravel avec `php artisan test`.
- Écrire un test **unitaire** sur une classe PHP.
- Écrire un test **Feature** : simuler une requête et vérifier la réponse.
- Appliquer le cycle **TDD** : écrire le test avant le code.
- Lire et comprendre les tests d'un vrai projet.

## Découvrir ce qui est déjà là

Bonne nouvelle : il n'y a **rien à installer**. Ouvrez le dossier `tests/` de votre projet :

- `tests/Unit/ExampleTest.php` : un test « unitaire » d'exemple.
- `tests/Feature/ExampleTest.php` : un test « fonctionnalité » d'exemple.
- `tests/TestCase.php` : la classe de base des tests Feature.

Prenez une minute pour lire ces deux fichiers d'exemple, vous allez voir que c'est très lisible.

Lancez maintenant les tests :

```sh
php artisan test
```

::: tip Point de contrôle

`php artisan test` s'exécute et affiche les tests d'exemple en `PASS`.

:::

Question :

- À votre avis, quelle est la différence entre le dossier `Unit` et le dossier `Feature` ? (la réponse est dans les slides, et nous allons la vivre dans ce TP)

## Votre premier test unitaire

Commençons au plus simple : tester une classe PHP toute bête, sans base de données, sans requête HTTP.

Créez le fichier `app/Utils/Calculatrice.php` :

```php
<?php

namespace App\Utils;

class Calculatrice
{
    public static function addition(float $a, float $b): float
    {
        return $a + $b;
    }
}
```

Et maintenant son test, dans `tests/Unit/CalculatriceTest.php` :

```php
<?php

namespace Tests\Unit;

use App\Utils\Calculatrice;
use PHPUnit\Framework\TestCase;

class CalculatriceTest extends TestCase
{
    public function test_addition(): void
    {
        $this->assertEquals(3, Calculatrice::addition(1, 2));
    }

    public function test_addition_grands_nombres(): void
    {
        $this->assertEquals(3050, Calculatrice::addition(2030, 1020));
    }
}
```

Lancez les tests :

```sh
php artisan test
```

Vos deux tests apparaissent en vert. Décortiquons ce que nous venons d'écrire :

- Une classe de test = un fichier dans `tests/`, dont le nom se termine par `Test`.
- Une méthode = un scénario, son nom commence par `test_` et **décrit le comportement attendu**.
- `assertEquals($attendu, $obtenu)` : le test échoue si les deux valeurs sont différentes.

## À vous : la division

Sur le même principe, je vous donne les tests, vous écrivez le code.

Créez `tests/Unit/DivisionTest.php` :

```php
<?php

namespace Tests\Unit;

use App\Utils\Calculatrice;
use PHPUnit\Framework\TestCase;

class DivisionTest extends TestCase
{
    public function test_division(): void
    {
        $this->assertEquals(0.5, Calculatrice::division(1, 2));
    }

    public function test_division_entiere(): void
    {
        $this->assertEquals(5, Calculatrice::division(10, 2));
    }
}
```

Lancez `php artisan test` : les tests **échouent**, la méthode `division` n'existe pas. Je vous laisse l'ajouter dans la classe `Calculatrice` et relancer les tests jusqu'au vert.

## Le cahier des charges change

Après réflexion, je ne veux pas laisser PHP planter tout seul en cas de division par zéro. Nouvelle règle :

> La division par zéro doit lever une exception `InvalidArgumentException` avec le message « Division par zéro impossible ».

Comme dans un vrai projet, nous commençons par **modifier les tests**. Ajoutez cette méthode dans `DivisionTest` :

```php
public function test_division_par_zero_interdite(): void
{
    // Le test échouera si cette exception n'est PAS levée
    $this->expectException(\InvalidArgumentException::class);

    Calculatrice::division(10, 0);
}
```

Lancez les tests : le nouveau test est **rouge**. Je vous laisse modifier la méthode `division` pour le faire passer au vert.

::: details Un indice pour lever l'exception ?

```php
if ($b == 0) {
    throw new \InvalidArgumentException("Division par zéro impossible");
}
```

:::

::: tip L'importance des tests

Vous venez de vivre quelque chose d'important : nous avons modifié le comportement de `division` **sans peur de casser le reste**. Les deux anciens tests sont restés verts, ils nous le prouvent.

Et vous avez remarqué l'ordre ? Nous sommes partis de ce que nous voulions obtenir (le test), pour ensuite écrire le code. Cette pratique se nomme le **TDD** (Test Driven Development).

:::

Questions :

- Que prouve un test que vous n'avez jamais vu échouer ?
- Pourquoi le nom `test_division_par_zero_interdite` est-il meilleur que `test_3` ?

## Tester des pages : les tests Feature

Les tests unitaires vérifient une classe isolée. Mais notre application, c'est surtout des **pages**. Les tests **Feature** simulent une vraie requête HTTP, sans navigateur et sans serveur lancé.

Créez `tests/Feature/ConnexionTest.php` :

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;

class ConnexionTest extends TestCase
{
    public function test_page_connexion_accessible(): void
    {
        $this->get('/login')->assertStatus(200);
    }

    public function test_todo_list_protegee(): void
    {
        // Sans utilisateur en session, le middleware doit rediriger
        $this->get('/todo')->assertRedirect('/login');
    }
}
```

Lancez `php artisan test`.

::: warning Un test échoue ?

Adaptez les URL (`/login`, `/todo`) à **vos** routes si vous les avez nommées différemment. Un test qui échoue affiche exactement ce qu'il attendait et ce qu'il a reçu : lisez le message, c'est fait pour ça.

:::

Prenez un moment pour mesurer ce qu'il vient de se passer : en une seconde, PHPUnit a simulé deux navigations complètes, middleware compris.

### Cassez votre application (volontairement)

Un test ne sert que s'il détecte les régressions. Vérifions :

- Commentez le middleware `CheckAuth` sur la route `/todo` dans `routes/web.php`.
- Relancez `php artisan test`.

Le test `test_todo_list_protegee` doit passer au **rouge** : vous venez de simuler une régression de sécurité, détectée automatiquement.

Remettez le middleware et vérifiez que tout repasse au vert.

Question :

- Que se passerait-il si cette régression partait en production sans test ?

## Mise en situation TDD

Passons en conditions réelles, cette fois c'est vous qui faites tout le cycle. Le besoin (votre « cahier des charges ») :

> Pour afficher une barre de progression sur la TODO List, il faut une méthode `Calculatrice::progression($total, $terminees)` qui retourne le pourcentage de TODO terminées, **arrondi à l'entier**. Si `$total` vaut zéro, la progression est de 0 (pas de division par zéro !). Si `$terminees` est plus grand que `$total`, une exception `InvalidArgumentException` doit être levée.

### 🔴 Red : écrivez les tests d'abord

Créez `tests/Unit/ProgressionTest.php` et écrivez **avant tout code** les tests correspondant au cahier des charges :

1. `progression(10, 5)` retourne `50`.
2. `progression(3, 2)` retourne `67` (l'arrondi !).
3. `progression(0, 0)` retourne `0`.
4. `progression(5, 8)` lève une `InvalidArgumentException`.

Lancez les tests : tout est rouge, c'est normal, c'est même le but.

### 🟢 Green : codez jusqu'au vert

Écrivez maintenant la méthode `progression` dans `Calculatrice`, et relancez `php artisan test` jusqu'à ce que les 4 tests passent, **sans casser les anciens**.

::: details Besoin d'un indice ?

`round()` arrondit un nombre en PHP. Et vous avez déjà écrit une vérification qui lève une exception dans ce TP, le principe est le même.

:::

### 🔵 Refactor

Relisez votre méthode : peut-elle être plus simple, mieux nommée, mieux commentée ? Améliorez-la, puis relancez les tests. S'ils restent verts, vous n'avez rien cassé. C'est ça, le filet de sécurité.

Questions :

- En TDD, comment savez-vous que votre fonctionnalité est terminée ?
- Le test de l'arrondi (`67`) vous a-t-il obligé à ajuster votre code ? C'est le rôle du test : figer les détails du cahier des charges.

::: tip Bonus si vous êtes en avance

Utilisez réellement `Calculatrice::progression()` dans votre TODO List : le contrôleur calcule la progression et la vue l'affiche (« 5 / 10 TODO terminées, 50 % »). Votre méthode étant déjà testée, cette intégration est sans risque.

:::

## Lire les tests d'un vrai projet

Dernière étape, et pas la moindre : en entreprise, vous passerez plus de temps à **lire** des tests qu'à en écrire. Voici un extrait (réel) des tests du projet ResaChev, l'application que vous retrouverez en AP. C'est le test du reset de mot de passe :

```php
class MotDePasseOublieTest extends TestCase
{
    use RefreshDatabase;

    private function creerUtilisateur(): Utilisateur
    {
        return Utilisateur::factory()->create([
            'email'    => 'user@test.com',
            'motpasse' => 'password123',
        ]);
    }

    public function test_envoi_email_reset_pour_email_connu(): void
    {
        Mail::fake();
        $this->creerUtilisateur();

        $this->post(route('connexion.motdepasseoublie.envoyer'), ['email' => 'user@test.com'])
             ->assertSessionHas('statut');

        $utilisateur = Utilisateur::where('email', 'user@test.com')->first();
        $this->assertNotNull($utilisateur->reset_token);
    }

    public function test_email_inconnu_affiche_meme_message_de_statut(): void
    {
        // Même réponse que pour un email connu (sécurité : pas de divulgation)
        $this->post(route('connexion.motdepasseoublie.envoyer'), ['email' => 'inconnu@test.com'])
             ->assertSessionHas('statut');
    }
}
```

Vous savez déjà lire l'essentiel ! Trois nouveautés tout de même :

- `use RefreshDatabase;` : ce test **écrit en base** (il crée un utilisateur). Ce trait donne à chaque test une base **jetable** : vos migrations sont rejouées sur une base vide avant le test, tout est effacé après. La vraie base n'est jamais touchée.
- `Utilisateur::factory()->create([...])` : crée un utilisateur de test en une ligne (vous avez vu les factories dans [le TP Aller plus loin](./aller_plus_loin.md)).
- `Mail::fake()` : désactive le véritable envoi d'emails pendant le test.

### À vous : l'analyse

En vous appuyant sur ce que vous avez vu dans [le TP reset de mot de passe](./reset_mot_de_passe.md), répondez :

1. Que vérifie exactement `test_envoi_email_reset_pour_email_connu` ? Reformulez-le en une phrase en français.
2. Pourquoi le second test est-il un test de **sécurité** ? Quelle attaque empêche-t-il de réintroduire ?
3. Pourquoi `Mail::fake()` est-il indispensable ici ? Que se passerait-il sans lui ?
4. Pourquoi ces tests ont-ils besoin de `RefreshDatabase` alors que ceux de votre `ConnexionTest` n'en avaient pas besoin ?

::: tip Point de contrôle final

Vous devez avoir au minimum 11 tests au vert (`php artisan test`) : les exemples de Laravel, la calculatrice (addition, division, exception), la connexion, et la progression. Et vous devez savoir répondre aux 4 questions d'analyse ci-dessus.

:::

## Conclusion

Dans ce TP, vous avez ajouté une corde essentielle à votre arc :

- **PHPUnit** est déjà dans votre projet, les tests se lancent avec `php artisan test`.
- Un test **unitaire** vérifie une classe isolée ; un test **Feature** simule une requête complète.
- Le **TDD** : le test décrit le besoin, le code le satisfait, et vous savez quand vous avez terminé.
- Vous savez lire les tests d'un projet professionnel (`RefreshDatabase`, factories, `Mail::fake`).

N'oubliez pas de **commiter votre projet** (les tests font partie du code !).

Pour la suite, vous recroiserez les tests très vite : ils sont au cœur de l'intégration continue, où `php artisan test` est exécuté automatiquement à chaque push. C'est exactement le sujet du TP [Tester en continu](/tp/ci/ci-test/tests.md).
