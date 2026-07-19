---
description: "Dans ce TP nous allons renforcer notre authentification avec une double authentification (2FA) : code temporaire à 6 chiffres, expiration et usage unique."
---

# La double authentification (2FA)

![Laravel](./ressources/logo.png)

::: details Sommaire
[[toc]]
:::

Votre authentification fonctionne depuis le TP [Comprendre l'authentification](./authentification_manuelle.md). Dans ce TP, nous allons la renforcer, **pas à pas**, avec une double authentification : après le mot de passe, un code temporaire sera exigé avant d'ouvrir la session.

::: tip Un TP « pour aller plus loin »

Ce TP est un **bonus** du parcours : il s'adresse à ceux qui sont en avance, ou qui veulent pousser la sécurité plus loin. Il n'est pas indispensable pour la suite du fil rouge… mais vous retrouverez une 2FA construite **exactement sur ce modèle** dans le projet d'AP : le temps investi ici sera du temps gagné là-bas.

:::

Dans ce TP, je vous invite à avoir en parallèle :

- [L'aide mémoire Laravel](/cheatsheets/laravel/)
- [La synthèse des commandes](/cheatsheets/laravel/quick.md)

## Prérequis

Le projet TODO List avec l'authentification du TP [Comprendre l'authentification](./authentification_manuelle.md) : inscription, connexion avec `Auth::login()`, middleware `CheckAuth`. Nous allons modifier directement votre méthode `traitementLogin`.

## Objectifs

À la fin de ce TP vous saurez :

- Expliquer ce qu'apporte un **second facteur** d'authentification.
- Générer un **code temporaire** à 6 chiffres, avec expiration et usage unique.
- Insérer une étape intermédiaire dans un parcours de connexion (sans ouvrir la session trop tôt).

## Rappel : qu'est-ce qu'une 2FA ?

Vous l'avez forcément déjà vécue : après le mot de passe, le site vous demande un **code à 6 chiffres** reçu par email, SMS ou application. C'est la double authentification (2FA) : elle combine quelque chose que vous **savez** (le mot de passe) avec quelque chose que vous **possédez** (l'accès à la boîte mail ou au téléphone). Un mot de passe volé ne suffit donc plus pour entrer.

Le parcours de connexion devient :

```
POST /traitementLogin (mot de passe OK)
        → génération d'un code à 6 chiffres (stocké en base, avec expiration)
        → le code est transmis à l'utilisateur
        → GET /verification : formulaire de saisie du code
        → POST /verification : code correct et non expiré ?
              → oui : le code est invalidé, Auth::login(), c'est gagné
              → non : « Code invalide ou expiré »
```

Point important : tant que le code n'est pas validé, l'utilisateur n'est **pas connecté** (pas de `Auth::login()`).

::: tip Ce que dit OWASP

La 2FA (ou MFA, Multi-Factor Authentication) est **la** contre-mesure recommandée par l'[OWASP](https://owasp.org/) contre le vol de mots de passe, dans la catégorie [A07 du Top 10](https://owasp.org/Top10/fr/A07_2021-Identification_and_Authentication_Failures/). Sa [Multifactor Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html) détaille les bonnes pratiques : vous allez en implémenter les principales dans ce TP (expiration courte, usage unique, session ouverte seulement après validation).

:::

## Étape 1 : la migration

Deux colonnes suffisent, comme souvent avec les codes temporaires :

```sh
php artisan make:migration add_two_factor_to_utilisateurs
```

```php
Schema::table('utilisateurs', function (Blueprint $table) {
    $table->string('two_factor_code', 6)->nullable();
    $table->dateTime('two_factor_expires_at')->nullable();
});
```

Je vous laisse compléter la méthode `down()`, lancer `php artisan migrate`, et ajouter les deux colonnes dans le `$fillable` du modèle.

## Étape 2 : générer le code au login

Dans `traitementLogin`, quand le mot de passe est correct, nous ne connectons **plus** l'utilisateur directement. À la place :

```php
if ($estValide) {
    // Un code aléatoire à 6 chiffres (str_pad ajoute les zéros de tête : 007243)
    $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

    $utilisateur->two_factor_code = $code;
    $utilisateur->two_factor_expires_at = now()->addMinutes(10);
    $utilisateur->save();

    // « Envoi » du code : dans ce TP, il est écrit dans le fichier de log
    Log::info("Code 2FA pour {$utilisateur->email} : {$code}");

    // On mémorise qui est en cours de connexion (mais PAS encore connecté)
    $request->session()->put('2fa_email', $utilisateur->email);

    return redirect('/verification');
}
```

N'oubliez pas le `use Illuminate\Support\Facades\Log;`.

::: tip Et le vrai envoi ?

En production, ce code partirait par **email ou SMS**, jamais dans un log. Nous verrons comment envoyer des emails avec Laravel dans le TP [Le reset de mot de passe](./reset_mot_de_passe.md). En attendant, le fichier `storage/logs/laravel.log` jouera le rôle de la boîte mail. Si vous avez déjà fait le TP reset, vous pouvez d'ailleurs remplacer le `Log::info` par un envoi via votre `EmailHelpers` !

:::

Question :

- Pourquoi stocker `2fa_email` en session plutôt que de considérer l'utilisateur comme connecté ?

## Étape 3 : la page de vérification

À vous de jouer pour cette étape, vous avez tous les outils :

- Deux routes : GET `/verification` et POST `/verification`.
- Une méthode `showVerification` : si la session ne contient pas `2fa_email`, redirigez vers `/login` (personne n'a rien à faire sur cette page sans avoir passé l'étape du mot de passe). Sinon, affichez la vue.
- Une vue avec un formulaire : un champ `code`, un bouton, `@csrf`, et l'affichage de l'erreur avec `@error('code')`.

## Étape 4 : vérifier le code

Pour la vérification, je vous donne la requête clé, qui vérifie le code **et** son expiration en une seule fois :

```php
$email = $request->session()->get('2fa_email');

$utilisateur = Utilisateur::where('email', $email)
    ->where('two_factor_code', $request->input('code'))
    ->where('two_factor_expires_at', '>', now())
    ->first();
```

Je vous laisse écrire la méthode `verification(Request $request)` :

- Si `$utilisateur` est `null` : retour au formulaire avec `withErrors(['code' => 'Code invalide ou expiré'])`.
- Sinon, dans l'ordre :
  1. Invalider le code (les deux colonnes à `null`, puis `save()`).
  2. Nettoyer la session : `$request->session()->forget('2fa_email');`.
  3. Connecter l'utilisateur : `Auth::login($utilisateur);` puis `$request->session()->regenerate();`.
  4. Rediriger vers la TODO List avec un message de bienvenue.

::: tip Point de contrôle

Déroulez le parcours complet :

1. Connectez-vous avec votre mot de passe : vous arrivez sur `/verification`, **sans être connecté** (vérifiez : `/todo` doit encore rediriger vers `/login`).
2. Récupérez le code dans `storage/logs/laravel.log` et saisissez-le : vous êtes connecté.
3. Modifiez à la main `two_factor_expires_at` en base pour mettre une date passée : le code doit être refusé.
4. Après une connexion réussie, vérifiez en base : les deux colonnes 2FA sont repassées à `NULL`.

:::

Questions :

- Un code à 6 chiffres n'offre que 1 000 000 de possibilités, un script peut toutes les essayer en quelques minutes… Quelles protections rendent malgré tout ce mécanisme sûr ? (il y en a au moins deux dans votre code, et une troisième arrive dans le TP [Aller plus loin](./aller_plus_loin.md))
- Que se passe-t-il si l'utilisateur ferme son navigateur entre le mot de passe et la saisie du code ?

## Conclusion

Votre connexion demande maintenant deux preuves au lieu d'une :

- Un **code temporaire** généré aléatoirement, jamais deviné.
- Une **expiration courte** et un **usage unique** : un code intercepté ne vaut presque rien.
- La session n'est ouverte (`Auth::login()`) qu'**après** la validation du code.

N'oubliez pas de **commiter votre projet**.

Ce trio « code temporaire + expiration + usage unique » revient dans le TP [Le reset de mot de passe](./reset_mot_de_passe.md), et vous retrouverez une 2FA construite exactement sur ce modèle dans le projet d'AP : vous saurez la lire, la déboguer… et la faire évoluer.
