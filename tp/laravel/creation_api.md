# TodoList : (Ré-)écrire les API du projet

Le but de notre application est de créer des API Rest qui vont exposer la gestion de nos ```todos``` défini en base de données

## Introduction

Dans ce TP nous allons voir la création d’API pour le projet « TodoList ». Nous allons donc créer un nouveau projet avec Laravel pour créer des API qui permettront de :

- Lister les éléments dans la TodoList.
- Créer un nouvel élément dans la TodoList.
- Marquer un élément comme ```terminer```.
- Supprimer un élément.

## Création du projet

Pour créer des API, Laravel est un peu « lourd » (dans notre cas bien évidemment, dans certains cas te choix est complètement justifié). Nous allons donc utiliser son petit frère Lumen. Lumen est un micro-framework reprenant les concepts de Laravel (et les même briques), mais en beaucoup plus petit et donc plus adapté à des micro-projets comme celui-ci.

## Installer Lumen

L’installation de Lumen est similaire à celle de Laravel

```shell
composer global require "laravel/lumen-installer"
```

## Créer le nouveau Projet

Maintenant que vous avez installé Lumen nous allons pouvoir utiliser la ligne de commande pour créer un nouveau projet :

```shell
lumen new api-todo
```

✋ Attention, le projet va être créé dans le dossier api-todo dans le dossier courant.

## Initialisation

Contrairement à un projet Laravel, les dépendances ```composer``` ne sont pas installées par défaut. Il faut donc les installer via la ligne de commande en faisant :

```shell
composer install
```

Le projet n’étant pas initialisé nous allons devoir jouer quelques commandes pour terminer l’installation :

```shell
mv .env.example .env
```

PS: Sous Windows c'est :

```shell
move .env.example .env
```

Contrairement à Laravel, Lumen ne contient pas l’outils permettant d’initialiser la « secret key » nécéssaire à la sécurisation de votre application. Je pous propose par exemple de passer via la commande suivante :

PS: Sous Windows la commande ne fonctionnera pas.

```shell
openssl rand -base64 24
```

(Vous pouvez également faire du monkey typing… et saisir une chaine de caractère aléatoire avec votre clavier…)

éditer le fichier ```.env``` pour y renseigner la valeur obtenue :

- ```APP_KEY``` (exemple ```APP_KEY="I82xtis8Tsur2"```)

## Tester votre application

Pour tester votre application avec Lumen sur votre poste, c’est un peu plus « complexe » qu’avec Laravel. Vous devez saisir la commande suivante :

```shell
php -S localhost:8000 -t ./public
```

Une fois lancé vous avez un serveur Web qui écoute sur [le port 8000](http://localhost:8000)

🤔 Pourquoi Lumen n’intègre pas la commande ```php artisan serve``` ? La raison est plutôt logique, Lumen étant un ```micro framework``` il n’embarque pas toutes les options de base de Laravel. Options qui peuvent d’ailleurs simplement être remplacée.

## Gestion de la base de données

Pour la démonstration nous allons utiliser SQLite au lieux de MySQL. Pour ça rien de plus simple, Lumen utilise PDO il suffit donc de changer la configuration par défaut dans le fichier ```.env```. Modifier le fichier pour qu’il ressemble à celui-ci

```conf
APP_ENV=local
APP_DEBUG=true
APP_KEY="CHANGEME"
APP_TIMEZONE=UTC

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=homestead
# DB_USERNAME=homestead
# DB_PASSWORD=secret

CACHE_DRIVER=file
QUEUE_DRIVER=sync
```

Par défaut la configuration de base de SQLite dans Lumen est l’utilisation d’une base de données nommée ```database.sqlite``` il faut donc créer un fichier vide qui recevra les données :

```shell
echo > database/database.sqlite
```

C’est parti ! Tout est prêt, nous pouvons commencer à écrire du code.

### Le script de création / migration

Contrairement à la première version de notre application, nous allons stocker les données dans une base de données. Qui dit base de données dit « ORM » et donc mapping objet. Pour rappel un ORM :

> Un mapping objet-relationnel (en anglais object-relational mapping ou ORM) est une technique de programmation informatique qui crée l'illusion d'une base de données orientée objet à partir d'une base de données relationnelle en définissant des correspondances entre cette base de données et les objets du langage utilisé.

Pour rappel, le but de notre application est de créer des API Rest qui vont exposer la gestion de nos ```todos``` défini en base de données. La première étape est de créer via la ligne de commande le « script » qui initialisera la structure de votre base de données.

L’option ```--create=todos``` permet d’indiquer le nom de la table à créer

```shell
php artisan make:migration create_todos_table --create=todos
```

✋ Le contenu du fichier est fictif, il est la pour illustrer comment travailler. Nous allons le modifier pour mettre les informations relative à notre base de données.

La commande a créé un nouveau fichier (dans mon cas) : ```database/migration/2017_11_02_205700_create_todos_table.php```

Dans le fichier créé nous allons définir notre schéma (à savoir la définition de la table) pour ajouter les 2 colonnes qui nous serons utiles ```texte``` et ```termine```. Le fichier après modification doit ressembler à :

```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTodosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('texte');
            $table->boolean('termine');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todos');
    }
}
```

Maintenant que le script est terminé, nous pouvons lancer la commande de migration :

```shell
php artisan migration
```

Une fois cette commande lancée, Lumen va créer la structure de base de votre base de données.

### Le modèle

Maintenant que nous avons fait le script de création / migration, nous allons définir notre modèle. Pour ça créez un fichier ```Todos.php``` dans le dossier ```app/``` avec le contenu suivant :

```php
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Todos extends Model
{
    protected $fillable = ['texte', 'termine'];
}
```

le ```$fillable``` définie les propriétés qui doivent êtres automatiquement remplis par Eloquent (l’ORM) lors de l’execution du code.

## Le controller

Maintenant que nous avons notre base de données, nous allons créer le controller. Pour rappel le controller va faire « le lien » entre la base de données et les appels HTTP. C’est ici que nous allons mettre la logique métier de nos API.

Pour commencer nous allons créer « la structure de base » de notre controller. Pour ça créez le fichier ```TodosController.php``` dans le chemin suivant ```app/Http/Controllers/``` et mettez y le contenu suivant :

```php
<?php

namespace App\Http\Controllers;

use App\Todos;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class TodosController extends Controller{
    // C’est ici que seront nos méthodes
}
```

Bien ! Notre code est maintenant prêt. Nous allons créer les méthodes permettant la manipulation de notre base de données tout en répondant à nos API bien évidement (liste, creation, terminer, suppression).

Nous allons maintenant écrire une méthode pour chaque actions. Avec les différentes conditions nécéssaires au bon fonctionnement de votre application.

### Liste

La méthode ```liste``` est certainement la plus simple, nous allons simplement faire appel à la méthode ```all()``` de Eloquent (ORM pour l’accès à la base de données). Pour ça créez une nouvelle méthode dans la Class ```TodoController``` avec le code suivant :

```php
public function list(){
    $todos  = Todos::all();
    return response()->json($todos);
}
```

Rien de bien compliqué, comme vous pouvez le voir le ```response()->json(…)``` permet de créer une réponse au format JSON pour votre API (que l’on utilisera plus tard au moment de la mise en place des routes).

### Création

Pour la partie création, nous allons faire un mapping automatique entre la requette HTTP et le modèle ```Todos```

```php
public function saveTodo(Request $request){
    $todo = Todos::create($request->all());
    return response()->json($todo);
}
```

Que va t’il se passer lors de l’appel ? L’objet ```$request``` contient tous les paramètres de l’appel HTTP, la méthode ```all()``` permet de les récupérer. L’objet ```Todos``` possède une méthode permettant de créer un nouvel enregistrement en base de données. Les valeurs passées en paramètre de ```create()``` permette de renseigner automatiquement les champs en base de données.

### Création, version alternative

La première approche est la plus rapide mais elle sous entend que tous les paramètres soient bien initialisés dans « l’input » HTTP. Dans cette version la méthode est plus complète et gère la création de l’objet Todo manuellement en récupérant les différents éléments dans la requette HTTP

```php
public function saveTodo(Request $request){
    $texte = $request->input('texte');

    if($texte){
      $todo = new Todos;
      $todo->texte = $texte;
      $todo->termine = 0;
      $todo->save();
      return response()->json("success");
    }else{
      return response()->json("error");
    }
  }
```

### Terminer

Pour l’action terminer nous allons devoir updater un enregistrement en base de données, pour ça nous allons le récupérer puis mettre le ```boolean``` termine à 1.

```php
public function markAsDone($id){
        $todo  = Todos::find($id);
        if($todo){
            $todo->termine = 1;
            $todo->save();
            return response()->json("success");
        }else{
            return response()->json("error");
        }
    }
```

### Suppression

Pour la partie suppression, nous allons devoir dans un premier temps récupérer la todo par son ID. Seul les ```Todos``` marqués comme terminés peuvent être supprimé, il faudra donc controller l’état avant de faire le ```delete()```

```php
public function deleteTodo($id){
        $todo  = Todos::find($id);
        if($todo && $todo->termine){
            $todo->delete();
            return response()->json('success');
        }else{
            return response()->json('error');
        }
}
```

## Déclarer les routes

Maintenant que le mapping avec la base de données est créé, et que notre controller est disponible nous allons pouvoir déclarer les différentes « routes » (c’est à dire les chemins d’accès à votre API). Dans notre applicaton nous avons 4 routes :

- Liste (/liste)
- Création (/creation)
- Terminer (/terminer)
- Suppression (/suppression)

Nous allons « mapper » / « connecter » les routes avec les différentes actions de notre controller. Avec un framework c’est très simple il suffit d’ajouter dans le fichier ```routes/web.php``` le code suivant :

```php
$router->get('api/todo','TodosController@list');
$router->post('api/todo','TodosController@saveTodo');
$router->post('api/todo/done/{id}','TodosController@markAsDone');
$router->delete('api/todo/delete/{id}','TodosController@deleteTodo');
```

## Activer le support d’Eloquent

Avant de pouvoir tester votre application vous devez éditer le fichier ```bootstrap/app.php``` pour décommenter la ligne :

```php
$app->withEloquent();
```

Eloquent ? [Un peu de documentation sur le Framework d'accès à la base de données](https://laravel.com/docs/5.6/eloquent) (oui… On ne fera pas de requête !)

## Tester

Pour tester votre application il suffit de lancer la commande suivante :

```shell
php -S localhost:8000 -t ./public
```

Pour tester vous pouvez utiliser PostMan.

## Changer les API dans votre application VueJS

Maintenant que vos nouvelles API sont terminées nous allons pouvoir les utiliser dans VueJS. Pour ça éditer le code Javascript de votre projet VueJS pour pointer vers votre serveur Lumen.