---
description: "Dans ce TP nous allons coder un système de réinitialisation de mot de passe (mot de passe oublié) : token, expiration, envoi d'email et sécurité."
---

# Le reset de mot de passe

![Laravel](./ressources/logo.png)

::: details Sommaire
[[toc]]
:::

« J'ai oublié mon mot de passe »… C'est LA fonctionnalité présente sur tous les sites du monde. Dans ce TP, nous allons la coder **nous-même** dans notre projet TODO List : formulaire « mot de passe oublié », génération d'un token, envoi d'un email, et choix d'un nouveau mot de passe.

::: tip Encore à la main ?

Oui ! Comme pour [le TP Comprendre l'authentification](./authentification_manuelle.md), l'objectif est de comprendre le mécanisme. Laravel (via Breeze, vu dans [le TP précédent](./authentification.md)) sait générer tout ça automatiquement, mais un reset de mot de passe mal compris est une **faille de sécurité classique**. Une fois codé à la main, vous saurez exactement ce que fait l'outil automatique.

:::

Dans ce TP, je vous invite à avoir en parallèle :

- [L'aide mémoire Laravel](/cheatsheets/laravel/)
- [La synthèse des commandes](/cheatsheets/laravel/quick.md)

## Les slides

Avant de coder, prenons un moment pour comprendre le mécanisme et surtout **pourquoi** il est conçu ainsi :

<ClientOnly>
<SlidesDeck src="laravel_reset" />
</ClientOnly>

## Prérequis

Nous continuons sur le projet TODO List avec l'authentification codée à la main. Avant de commencer, vérifiez que vous avez :

- Le modèle `Utilisateur` (name, email, password hashé), voir le [TP Comprendre l'authentification](./authentification_manuelle.md).
- L'inscription et la connexion fonctionnelles (`/login`, `/register`).

::: details Vous n'avez pas le projet ?

Reprenez le [TP Comprendre l'authentification](./authentification_manuelle.md), ce TP s'appuie directement dessus (même modèle, même logique de session).

:::

## Objectifs

À la fin de ce TP vous saurez :

- Expliquer pourquoi un site ne peut **jamais** vous renvoyer votre mot de passe.
- Générer et stocker un **token** de réinitialisation avec une expiration.
- Envoyer un **email** depuis Laravel (et le lire en développement sans serveur mail).
- Mettre en place le parcours complet : demande, email, nouveau mot de passe.
- Identifier les pièges de sécurité : énumération de comptes, token éternel, token réutilisable.

## Le mécanisme

Vous l'avez vu dans les slides, le parcours complet est le suivant :

```
1. GET  /mot-de-passe-oublie          → formulaire « votre email ? »
2. POST /mot-de-passe-oublie          → génère un token + envoie l'email
                                        (réponse identique que l'email existe ou non)
3. L'utilisateur clique sur le lien reçu par email :
   GET  /reset-mot-de-passe/{token}   → formulaire « nouveau mot de passe »
4. POST /reset-mot-de-passe/{token}   → vérifie le token, enregistre le hash,
                                        invalide le token
```

Question :

- À l'étape 2, pourquoi la réponse doit-elle être identique que l'email existe ou non en base ? (la réponse est dans les slides)

## Étape 1 : La migration

Notre table `utilisateurs` a besoin de deux nouvelles colonnes : le token, et sa date d'expiration. Créez une migration :

```sh
php artisan make:migration add_reset_token_to_utilisateurs
```

Complétez-la ainsi :

```php
public function up(): void
{
    Schema::table('utilisateurs', function (Blueprint $table) {
        $table->string('reset_token', 64)->nullable();
        $table->dateTime('reset_token_expires_at')->nullable();
    });
}

public function down(): void
{
    Schema::table('utilisateurs', function (Blueprint $table) {
        $table->dropColumn(['reset_token', 'reset_token_expires_at']);
    });
}
```

Puis appliquez la migration :

```sh
php artisan migrate
```

Questions :

- Pourquoi les deux colonnes sont-elles `nullable()` ? Que contiennent-elles pour un utilisateur qui n'a jamais demandé de reset ?
- Pourquoi ajouter une migration plutôt que modifier la migration existante de la table `utilisateurs` ?

::: tip Point de contrôle

Ouvrez votre base avec votre outil SQLite (vu dans [le TP base de données](./base_de_donnees.md)) : la table `utilisateurs` doit avoir les deux nouvelles colonnes, à `NULL` pour tout le monde.

:::

## Étape 2 : Envoyer des emails (sans serveur mail)

Pas de panique, nous n'allons pas installer de serveur mail. En développement, Laravel propose le « mailer » `log` : les emails ne partent pas sur internet, ils sont **écrits dans le fichier de log** du projet. Vérifiez dans votre `.env` :

```ini
MAIL_MAILER=log
```

C'est la valeur par défaut d'un projet Laravel récent, vous n'avez probablement rien à changer.

### Un petit utilitaire d'envoi

Pour envoyer des emails HTML à partir de templates Blade (oui, Blade sert aussi pour les emails !), nous allons créer un petit utilitaire. Créez le fichier `app/Utils/EmailHelpers.php` :

```php
<?php

namespace App\Utils;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class EmailHelpers
{
    /**
     * Envoie un email HTML généré à partir d'un template Blade.
     *
     * @param string $to       Adresse email du destinataire.
     * @param string $subject  Sujet de l'email.
     * @param string $template Nom du template Blade (ex: 'emails.reset-mot-de-passe').
     * @param array  $data     Variables à transmettre au template.
     */
    public static function sendEmail($to, $subject, $template, $data = []): void
    {
        // On génère le HTML de l'email avec Blade, comme pour une page web
        $body = View::make($template, $data)->render();

        Mail::send([], [], function ($message) use ($to, $subject, $body) {
            $message->to($to)
                ->subject($subject)
                ->html($body);
        });
    }
}
```

### Tester l'envoi

Vous avez appris Tinker dans [le TP Aller plus loin](./aller_plus_loin.md), utilisons-le :

```sh
php artisan tinker
```

```php
Mail::raw('Coucou depuis Laravel', fn ($message) => $message->to('test@test.com')->subject('Mon premier email'));
```

Ouvrez maintenant le fichier `storage/logs/laravel.log` (allez tout en bas) : votre email est là.

::: tip Point de contrôle

Vous devez retrouver votre email de test (sujet et contenu) dans `storage/logs/laravel.log`. C'est comme ça que nous « recevrons » tous les emails de ce TP.

:::

::: details Pour aller plus loin : le serveur SMTP de test du BTS SIO

Le mailer `log` est pratique, mais dans les équipes de développement on utilise plutôt un **serveur SMTP de test** : un faux serveur mail qui **piège** tous les emails envoyés par l'application (rien ne part réellement sur internet) et permet de les consulter dans une interface type webmail.

Le BTS SIO de Chevrollier dispose du sien : un [Mailtrap](https://mailtrap.io/) classique, déployé sur la ferme de serveurs du BTS et accessible à l'adresse `mail.dombtsig.local` depuis le réseau du lycée (et via le VPN). Pour l'utiliser, il suffit de pointer votre `.env` vers ce serveur :

```ini
MAIL_MAILER=smtp
MAIL_HOST=mail.dombtsig.local
MAIL_PORT=1025
```

C'est totalement optionnel pour ce TP (le mailer `log` suffit), mais retenez le principe : c'est **exactement** la configuration du projet que vous retrouverez en AP. Pour travailler hors du lycée sans VPN, l'équivalent à installer sur votre machine est [Mailpit](https://mailpit.axllent.org/) (avec `MAIL_HOST=localhost`).

:::

## Étape 3 : « Mot de passe oublié »

Passons au cœur du sujet. Créez un contrôleur dédié :

```sh
php artisan make:controller ResetMotDePasseControleur
```

Et les routes correspondantes dans `routes/web.php` :

```php
Route::get('/mot-de-passe-oublie', [ResetMotDePasseControleur::class, 'showMotDePasseOublie']);
Route::post('/mot-de-passe-oublie', [ResetMotDePasseControleur::class, 'envoyerMotDePasseOublie']);
```

### Le traitement de la demande

Pour cette étape, je vous donne le code du traitement (c'est le morceau le plus sensible, nous le décortiquons ensemble) :

```php
public function envoyerMotDePasseOublie(Request $request)
{
    // Valide le formulaire : si l'email est absent ou invalide, Laravel
    // redirige automatiquement vers le formulaire avec les erreurs.
    $request->validate(['email' => 'required|email']);

    $utilisateur = Utilisateur::where('email', $request->email)->first();

    if ($utilisateur) {
        // Str::random(64) génère une chaîne aléatoire de 64 caractères
        $token = Str::random(64);

        $utilisateur->reset_token = $token;
        $utilisateur->reset_token_expires_at = now()->addMinutes(30);
        $utilisateur->save();

        EmailHelpers::sendEmail(
            $utilisateur->email,
            'Réinitialisation de votre mot de passe',
            'emails.reset-mot-de-passe',
            [
                'name' => $utilisateur->name,
                // url() génère l'URL complète (avec le http://localhost:8000)
                'lien' => url('/reset-mot-de-passe/' . $token),
            ]
        );
    }

    // ⚠️ Ce message est envoyé DANS TOUS LES CAS, que l'email existe ou non.
    return redirect()->back()->with('success', 'Si cette adresse est associée à un compte, un email vous a été envoyé.');
}
```

::: tip Deux nouveautés dans ce code

- `$request->validate([...])` : jusqu'ici nous vérifiions les champs à la main. Laravel propose un système de validation intégré, avec des règles comme `required`, `email`, `min:8`… En cas d'échec, l'utilisateur est automatiquement redirigé vers le formulaire. [La documentation est ici](https://laravel.com/docs/11.x/validation).
- `now()` : retourne la date et l'heure actuelles, et `->addMinutes(30)` fait ce que son nom indique. Pratique pour notre expiration.

N'oubliez pas les `use` en haut du fichier : `App\Models\Utilisateur`, `App\Utils\EmailHelpers` et `Illuminate\Support\Str`.

:::

Question :

- Le `if ($utilisateur)` n'a pas de `else`. Que se passe-t-il si l'email n'existe pas en base ? Pourquoi est-ce exactement le comportement voulu ?

### Le template de l'email

Créez la vue `resources/views/emails/reset-mot-de-passe.blade.php` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <p>Bonjour {{ $name }},</p>
    <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour en choisir un nouveau :</p>
    <p><a href="{{ $lien }}">{{ $lien }}</a></p>
    <p>Ce lien est valable 30 minutes.</p>
    <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email. Votre mot de passe ne sera pas modifié.</p>
</body>
</html>
```

### À vous : le formulaire

Il reste la méthode `showMotDePasseOublie` et sa vue. Vous avez déjà fait des dizaines de formulaires, je vous laisse faire :

- Un champ `email` et un bouton « Envoyer le lien ».
- L'affichage du message flash `success` (revoyez [le TP d'introduction](./introduction.md) si besoin).
- N'oubliez pas `@extends('layouts.base')` et `@csrf`.
- Ajoutez un lien « Mot de passe oublié ? » sur votre page de connexion.

::: tip Point de contrôle

Saisissez l'email d'un utilisateur existant dans votre formulaire :

- Le message « Si cette adresse est associée à un compte… » s'affiche.
- Dans `storage/logs/laravel.log`, vous trouvez l'email avec un lien du type `http://localhost:8000/reset-mot-de-passe/gT7fKq2Zp9…`.
- Dans votre outil SQLite, l'utilisateur a maintenant un `reset_token` et une date d'expiration.

Testez aussi avec un email **inexistant** : même message, pas d'email dans le log, rien en base.

:::

## Étape 4 : Le lien reçu par email

L'utilisateur clique sur le lien de l'email. Il faut maintenant afficher le formulaire de nouveau mot de passe, **uniquement si le token est valide**.

Ajoutez les deux dernières routes :

```php
Route::get('/reset-mot-de-passe/{token}', [ResetMotDePasseControleur::class, 'showResetMotDePasse']);
Route::post('/reset-mot-de-passe/{token}', [ResetMotDePasseControleur::class, 'resetMotDePasse']);
```

Cette fois, je ne vous donne que la requête clé, celle qui vérifie le token **et** son expiration en une seule fois :

```php
$utilisateur = Utilisateur::where('reset_token', $token)
    ->where('reset_token_expires_at', '>', now())
    ->first();
```

Je vous laisse écrire la méthode `showResetMotDePasse(string $token)` :

- Si aucun utilisateur ne correspond (token inconnu **ou** expiré) : redirection vers `/mot-de-passe-oublie` avec un message d'erreur « Ce lien est invalide ou a expiré ».
- Sinon : afficher une vue avec un formulaire « nouveau mot de passe » + « confirmation », qui poste vers <code v-pre>/reset-mot-de-passe/{{ $token }}</code>.

::: details Besoin d'un indice pour la vue ?

Le formulaire a besoin de connaître le token pour construire son `action`. Passez-le à la vue (`return view('reset-mot-de-passe', ['token' => $token]);`) et utilisez-le dans l'attribut `action` du formulaire.

:::

Question :

- Un token expiré est toujours présent en base, pourtant la page affiche « lien invalide ». Quelle partie de la requête Eloquent s'en charge ?

## Étape 5 : Enregistrer le nouveau mot de passe

Dernière ligne droite, et cette fois c'est vous qui écrivez tout. La méthode `resetMotDePasse(Request $request, string $token)` doit :

1. Vérifier le token avec **la même requête** qu'à l'étape 4 (un token peut expirer entre l'affichage du formulaire et sa soumission !).
2. Valider le formulaire : mot de passe obligatoire, 8 caractères minimum, et identique à la confirmation.
3. Enregistrer le nouveau mot de passe **hashé** (souvenez-vous : `password_hash`, comme à l'inscription).
4. **Invalider le token** : remettre `reset_token` et `reset_token_expires_at` à `null`.
5. Rediriger vers `/login` avec un message flash « Mot de passe mis à jour, vous pouvez vous connecter ».

::: warning Les pièges à éviter

- Stocker le mot de passe en clair : c'est **le** point de vérification numéro 1 (regardez en base après votre test).
- Oublier l'étape 4 : le token resterait valable 30 minutes **après** le changement de mot de passe. Quelqu'un qui met la main sur l'email pourrait re-changer le mot de passe.
- Oublier de re-vérifier le token dans le POST : la vérification du GET ne protège pas le POST.

:::

::: details Un indice pour la validation ?

La règle `confirmed` de Laravel vérifie automatiquement que le champ `password` est identique au champ `password_confirmation` :

```php
$request->validate([
    'password' => 'required|string|min:8|confirmed',
]);
```

Votre formulaire doit donc contenir un champ nommé `password` et un champ nommé `password_confirmation`.

:::

::: tip Point de contrôle final

Déroulez le parcours complet :

1. Demandez un reset pour votre compte, récupérez le lien dans `storage/logs/laravel.log`.
2. Choisissez un nouveau mot de passe via le lien.
3. Vérifiez en base : le hash a changé, `reset_token` est repassé à `NULL`.
4. Connectez-vous avec le **nouveau** mot de passe : ça fonctionne.
5. Connectez-vous avec l'**ancien** : refusé.
6. Réutilisez le même lien de reset : « Ce lien est invalide ou a expiré ».

:::

## Étape 6 : Testez comme un attaquant

Un système d'authentification se teste aussi « en mode attaquant ». Vérifiez par vous-même :

- Que se passe-t-il avec un token inventé (`/reset-mot-de-passe/nimportequoi`) ?
- Modifiez à la main `reset_token_expires_at` en base pour mettre une date passée : le lien doit être refusé.
- Le message de l'étape 3 est-il vraiment identique pour un email existant et inexistant ? (comparez aussi le **temps de réponse**, pour la culture)

Questions :

- Pourquoi un token de 64 caractères aléatoires ne peut-il pas être « deviné » par force brute, alors qu'un code à 6 chiffres pourrait l'être ?
- Notre formulaire de demande de reset peut être utilisé pour **spammer** quelqu'un (une demande = un email). Quelle protection, vue dans [le TP Aller plus loin](./aller_plus_loin.md), pourrait limiter ça ?

### Bonus

Si vous êtes en avance :

- Ajoutez un **rate limiting** sur les deux routes POST du TP (5 requêtes par minute semble raisonnable).
- Après un reset réussi, envoyez un **email de confirmation** « Votre mot de passe a été modifié » (réutilisez votre `EmailHelpers`). Pourquoi cet email est-il une bonne pratique de sécurité ?

## Conclusion

Vous venez de coder la fonctionnalité « mot de passe oublié » comme le font les vrais sites :

- Un site ne renvoie **jamais** un mot de passe, il permet d'en choisir un nouveau.
- Le **token** est une preuve temporaire : aléatoire, avec expiration, à usage unique.
- La réponse est **identique** que l'email existe ou non (anti-énumération).
- Blade et le mailer `log` permettent de développer tout ça sans serveur mail.

N'oubliez pas de **commiter votre projet**.

Et maintenant que vous avez tout codé à la main (authentification, puis reset), vous mesurez ce que [Breeze](./authentification.md) génère pour vous en une commande… et surtout, vous savez ce qu'il y a dedans.

Une fonctionnalité de sécurité comme celle-ci mérite d'être **testée automatiquement** : nous le ferons dans le TP [Tester son application avec PHPUnit](./tests.md).
