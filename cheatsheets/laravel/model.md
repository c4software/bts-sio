### Le modèle

Le modèle est l’objet qui nous permettra de faire « nos requêtes SQL », l’accès à nos données.

La grande force de Laravel, son Framework [Eloquent](https://laravel.com/docs/12.x/eloquent). Laravel intègre une commande pour créer un modèle vide :

```sh
php artisan make:model LeNomDeVotreTableEnBase
```

Cette action va créer un squelette de modèle à l’emplacement suivant : `app/Models/LeNomDeVotreTableEnBase.php`. Le contenu sera le minimum :

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeNomDeVotreTableEnBase extends Model
{
    use HasFactory;
}
```

⚠️ Le nom de la classe sera le nom de votre table

De base le nome de la classe sera le nom de votre table. Si vous souhaitez changer le comportement, il vous suffit de :

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeNomDeVotreTableEnBase extends Model
{
    protected $table = "CECI_EST_LE_NOM_DE_MA_TABLE";

    use HasFactory;
}
```

### Accéder aux données

```php
// Tout obtenir
$todos = LeNomDeVotreTableEnBase::all();

// Ou pour l’enregistrement avec l’identifiant « 42 »
$todo = LeNomDeVotreTableEnBase::find(42);

// Obtenir, mais filtrer et ordonné et avec une limite
$todos = LeNomDeVotreTableEnBase::where('termine', 1)->orderBy('id', 'desc')->take(10)->get();

// Ou avec un where
$users = User::where('votes', '>', 100)->get();
```

### Créer un enregistrement

```php
// Création d’une nouvelle entrée en BDD (équivalent d’un INSERT INTO)
LeNomDeVotreTableEnBase::create(array(
    'texte'     => 'Super Cool',
    'termine'   => false
));
```

### Mettre à jour un enregistrement

```php
// Rechercher celui avec l’id 1
$todo = App\LeNomDeVotreTableEnBase::find(1);

// Le passer à terminer
$todo->termine = true;

// Le sauvegarder en base de données
$todo->save();
```

### Supprimer un enregistrement

Plusieurs façon :

```php
// Façon 1
// Rechercher celui avec l’id 1
$todo = App\LeNomDeVotreTableEnBase::find(1);
$todo->delete(); // Le supprimer

// Façon 2
// Le supprimer directement
App\LeNomDeVotreTableEnBase::destroy(1);

// Façon 3
// En supprimer plusieurs directement
App\LeNomDeVotreTableEnBase::destroy(1,2,3);

// Façon 4
// Supprimer avec une condition
App\LeNomDeVotreTableEnBase::where('termine', '=', 1)->delete();
```

### Les jointures

Les jointures sont à définir directement dans le modèle. Elles seront des méthodes accessibles via l’objet de votre modèle.

#### One To One

![One To One](./res/one-to-one.png)

```php
class Todo extends Model {

  // Dans le modèle
  public function categorie()
  {
      return $this->hasOne(Categorie::class);
  }

}
```

⚠️ Éloquent supposera que dans le modèle Catégorie contiendra une colonne todo_id.

#### One To Many

![One To Many](./res/one-to-many.png)

```php
class Post extends Model {

  // Dans le modèle
  public function comments()
  {
      return $this->hasMany(Comment::class);
  }

}
```

⚠️ Éloquent supposera que la colonne de clé étrangère sur le modèle Comment est post_id.


#### L’inverse du One To Many : le « Belong To »

![One To Many](./res/one-to-many.png)

```php
class Comment extends Model
{
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
```

- Éloquent tentera de trouver un modèle Post dont l’identifiant correspond à la colonne post_id du modèle Comment.
- Éloquent supposera que la clé étrangère du modèle Post sur la table des commentaires est post_id.

#### Many To Many

![Many To Many](./res/many-to-many.png)

```php
class User extends Model
{
    /**
     * The roles that belong to the user.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}

class Role extends Model
{
    /**
     * The users that belong to the role.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
```

### Générer les modèles

Il est également possible de générer les modèles à partir de la base de données. Cette fonctionnalitée n'est pas disponible de base dans Laravel, il faut donc installer une dépendance supplémentaire :

```sh
composer require reliese/laravel --dev
php artisan vendor:publish --tag=reliese-models
php artisan config:clear
```

Le plugin en question [Reliese Laravel Model Generator](https://github.com/reliese/laravel). Je vous laisse regarder la documentation pour plus d'informations.

⚠️ Attention

Autoriser les factories.

Pour permettre à votre Modèle d'être « rempli », vous devez vérifier que la classe possède bien les use suivants (à mettre dans la classe du modèle) :

```php
use HasApiTokens, HasFactory, Notifiable;
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Client extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    // ... le reste du code
}
```

### Requêter les données

Nous avons vu comment définir les relations, mais comment les utiliser ? C’est très simple, vous pouvez utiliser les méthodes de relations comme si elles étaient des méthodes de modèle.

```php
// Récupérer les commentaires d’un post
$comments = App\Post::find(1)->comments()->get();

// Récupérer les commentaires d’un post et les ordonner par date
$comments = App\Post::find(1)->comments()->orderBy('created_at', 'desc')->get();

// Récupérer les commentaires d’un post et les ordonner par date et avec une limite
$comments = App\Post::find(1)->comments()->orderBy('created_at', 'desc')->take(10)->get();

// Utiliser le with pour récupérer les données en une seule requête
// Ici on récupère les posts avec leurs commentaires
$posts = App\Post::with('comments')->get();

// Obtenir les articles d’un utilisateur
$articles = App\User::find(1)->articles()->get();

// Réaliser plusieurs jointures avec le with
// Ici on récupère les utilisateurs avec leurs rôles et leurs articles
$users = App\User::with('roles', 'posts')->get();

// Jointure conditionnelle obtenir les articles d’un utilisateur dont le titre contient « Laravel »
$articles = App\User::find(1)->articles()->where('title', 'like', '%Laravel%')->get();

// Obtenir un utilisateurs avec les posts et les commentaires via le with
$users = App\User::with('posts.comments')->get();
```

Le `with()` permet de récupérer les données d'une autre table. Vous pouvez également déclarer le `with()` dans le modèle. 

Exemple, **dans le modèle `Commande`** :

```php
$with = ['produit'];
```

En indiquant le `$with` dans le modèle, votre jointure sera automatiquement effectuée. Vous n'aurez plus besoin de passer par le `with()` dans le contrôleur. Pratique pour automatiser les jointures.

### Mettre à jour les données d'une relation 

```php
// Ajouter un commentaire à un post
$comment = new App\Comment(['message' => 'A new comment.']);
$post = App\Post::find(1);
$post->comments()->save($comment);

// Ajouter un commentaire à un post avec un utilisateur
$comment = new App\Comment(['message' => 'A new comment.']);
$user = App\User::find(1);
$post = App\Post::find(1);
$post->comments()->save($comment, ['user_id' => $user->id]);

// Attacher un rôle à un utilisateur
$user = App\User::find(1);
$user->roles()->attach($roleId);

// Attacher des roles à un utilisateur nouvellement créé
$user = App\User::create($attributes);
$user->roles()->attach([1, 2, 3]);

// Syncroniser les rôles d'un utilisateur (remplace les rôles existants)
$user->roles()->sync([1, 2, 3]);
```
