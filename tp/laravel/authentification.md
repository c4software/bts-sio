# Laravel & l'authentification

Nous avons vu dans [le TP introduction](./introduction.md) qu'il était très simple de créer un petit site avec Laravel. L'autre problème que Laravel résout « simplement » c'est la partie authentification.

La gestion des utilisateurs est en effet un élément complexe d'une application entre :

- L'authentification.
- Limiter l'accès à certaines ressources.
- La sécurité des mots de passe.
- La gestion du mot de passe oubliée.
- …

Vous l'avez compris, la liste est longue… Vous pouvez évidemment tout coder vous-même! Mais nous allons le voir la force de Laravel c'est également ça, intégrer l'ensemble des briques pour une application qualitative dans les standards du marché.

::: details Sommaire
[[toc]]
:::

## Créer votre projet

Pour cette étape, je vous laisse suivre [le précédent TP](./introduction.md).

**Attention** a bien installer au moins la version >8 de Laravel.

## Ajout de l'authentification

Nous allons intégrer l'authentification en utilisant [Laravel Breeze](https://laravel.com/docs/8.x/starter-kits#laravel-breeze) ce paquet `Composer` va ajouter l'ensemble des :

- routes
- contrôleur
- middleware
- Vue (templates blades)

Permettant de gérer simplement l'ensemble des problématiques.

::: warning Nous avons deux possibilités
Je fais le choix de partir vers Laravel Breeze qui est plus « récente » et plus moderne que Laravel/ui ; Laravel/ui est un paquet qui fonctionne toujours avec Laravel 8, cependant celui-ci est en fin de vie… Nous partons donc vers des bases « moderne »
:::

### Ajout de la dépendance

L'ajout de dépendances, pour cette étape aucun problème, il suffit d'ajouter dans votre projet « breeze » dans le dossier de votre projet :

```sh
composer require laravel/breeze --dev
```

Une fois ajoutée, nous allons devoir installer breeze pour que celui-ci active l'ensemble des fonctionnalités :

```sh
php artisant migrate

php artisan breeze:install

php artisant migrate
```

::: tip Que c'est il passé ?

Nous venons d'ajouter de nouvelles routes, celle-ci sont dans le dossier `route/auth.php` **,mais ce n'est pas tout** vous avez également maintenant l'ensemble des contrôleurs, mais également l'ensemble des `Layout Blade` nécessaires à toute la partie authentification.

Pour le reste c'est dans les dossiers que vous connaissez déjà.
:::

### L'UI

Si vous lancer dès maintenant votre projet via la commande `php artisan serve` vous allez voir que votre page d'accueil intègre maintenant deux nouveaux liens :

![Laravel Breeze](./ressources/laravel_auth_breeze.png)

Vous pouvez cliquer dès à présent sur les différents liens, **cependant** les fichiers que vous avez ajoutés avec Breeze reposent sur un « framework UI » autre que Bootstrap celui-ci se nomme [Tailwind](https://tailwindcss.com/) l'approche de Laravel est moderne et Tailwind repose sur un concept similaire à Bootstrap, mais en ce focalisant plus sur un système de `class css` que l'on va appeler « utilitaire ».

Nous allons donc avoir besoin de `node`, mais surtout de `npm` pour compiler l'ensemble des ressources nécessaires au bon fonctionnement de l'interface ajouté. Si vous avez déjà pratiqué `node` et `npm` vous savez peut-être que ces outils sont plus utilisés dans le monde du JavaScript que du PHP ; rien d'étonnant dans notre cas, nous allons utilisé `npm` pour ajouter l'ensemble des dépendances UI de notre projet, mais également les « compiler » / « packager » dans un gros fichier CSS et JS pour nos clients.

::: tip ✋ Un instant !

Notre projet va contenir seulement Tailwind après installation, si vous souhaitez avoir également Bootstrap vous avez deux options :

- Ajouter les librairies Bootstrap via le CDN de votre choix.
- Ajouter Bootstrap dans les dépendances npm de votre projet. (à faire via le `package.json` et `webpack.mix.js`, attention c'est plus complexe)

:::

Pour installer puis « compiler » vos ressources, il va falloir entrer les commandes suivantes dans le dossier de votre projet :

```sh
npm install
npm run dev
```

::: danger Vous êtes sur un lecteur réseau ?
Attention, si vous êtes sur un lecteur réseau ça va être long… Très long ! Je vous conseille vivement de passer via un développement en local.
:::

Une fois le processus terminé, vous devriez avoir un résultat comme celui-ci :

![Laravel Mix](./ressources/mix.png)

Vos pages d'authentification sont maintenant fonctionnelles, votre site intègre maintenant toute la mécanique permettant de gérer cette problématique.

Exemple :

![Laravel Breeze Create Account](./ressources/breeze_create_account.png)

::: tip Petit point important
Laravel Breeze est intéressant, car il ne cache pas le code **l'ensemble des éléments sont accessibles** vous pouvez modifier le code fourni aucun problème ! C'est d'ailleurs ce que nous allons faire.
:::

### Tester le code

Vous avez normalement tout suivi, votre site est donc fonctionnel ! Avant d'aller plus loin, je vous laisse tester l'ensemble de votre site.

- Home.
- Création de comptes.
- Connexion.

::: tip Avant d'aller plus loin
Regarder également les templates, les règles de validation de saisie présente dans les contrôleurs, bref tout ce que vous avez pu installer de manière automatique !
:::

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/YWy93Zf9eW8RMlK0gK" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

## Les « Composants » et les templates blades

Si vous avez regardé l'ensemble du code, vous noterez une syntaxe un peu particulière dans les templates Blades ; celle-ci vous permet de créer des composants, mais également des templates de base (ce sont les `x-` quelque chose dans le code blade).

Tout est déjà configuré, vous pouvez dès à présent l'utiliser, mais également créer de nouveau composant en ajoutant les fichiers `blade` dans `views/components/`

[Pour plus d'information, rendez-vous ici](https://laravel.com/docs/8.x/blade#rendering-components)

::: tip Nous avons vu la dernière fois, l'héritage
Nous avions vu la dernière fois [l'héritage de template](https://laravel.com/docs/8.x/blade#layouts-using-template-inheritance) et bien la c'est là mêmes choses, mais via un système de « composant » très à la mode en ce moment.
:::

👋 Regardons ensemble comment ça fonctionne ! (vous pouvez m'appeler)

::: details Pour résumer
Le système de composant va vous permettre :

- De rendre générique un morceau de code que vous utilisez plusieurs fois dans votre projet.
- Penser composant plutôt que HTML copié depuis Internet.
- Rendre « générique les layouts » pour les partager entre les pages.
  :::

### Migrer la page « / » vers le nouveau système

Le nouveau système de template est très très sympa, il permet de découper son travail pour sortir les parties génériques dans un « layouts » partageables entre toutes vos pages. Par exemple :

![Différentes parties](./ressources/parties.png)

::: tip Hey toi lecteur ! Stop !

L'organisation est tout aussi important que le code, tu peux copier coller du code entre tout t'es templates oui… Mais sache que c'est pas efficace, que tu perds du temps et que si on te demande un modification **tu perdras du temps** !

Prendre du temps pour utiliser le système de layout tels proposé par Laravel est un vrai gain de temps ! Le toi du futur te remercies d'avance.

Promis, ça va bien ce passer !

:::

Avec le Scaffolding de Breeze nous avons à notre disposition **deux templates** :

- `app.blade.php` pour les clients **connectés**. Accessible dans votre template via `<x-app-layout>`
- `guest.blade.php` pour les clients **non connectés**. Accessible dans votre template via `<x-guest-layout>`

Nous allons donc migré notre page d'accueil pour utiliser le nouveau système de composant. Pour ça rien de plus simple, il nous suffit d'utiliser `<x-guest-layout>` dans le template `welcome.blade.php`, je vous laisse le faire celui-ci va remplacer l'ensemble du haut de notre html jusqu'au `<body>` ce qui va donner :

```html
<x-guest-layout>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0"
  >
    @if (Route::has('login'))
    <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      @auth
      <a href="{{ url('/dashboard') }}" class="text-sm text-gray-700 underline"
        >Dashboard</a
      >
      @else
      <a href="{{ route('login') }}" class="text-sm text-gray-700 underline"
        >Log in</a
      >

      @if (Route::has('register'))
      <a
        href="{{ route('register') }}"
        class="ml-4 text-sm text-gray-700 underline"
        >Register</a
      >
      @endif @endauth
    </div>
    @endif

    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
      <div class="flex justify-center pt-8 sm:justify-start sm:pt-0">
        <svg
          viewBox="0 0 651 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-auto text-gray-700 sm:h-20"
        >
          <g clip-path="url(#clip0)" fill="#EF3B2D">
            <path
              d="M248.032 44.676h-16.466v100.23h47.394v-14.748h-30.928V44.676zM337.091 87.202c-2.101-3.341-5.083-5.965-8.949-7.875-3.865-1.909-7.756-2.864-11.669-2.864-5.062 0-9.69.931-13.89 2.792-4.201 1.861-7.804 4.417-10.811 7.661-3.007 3.246-5.347 6.993-7.016 11.239-1.672 4.249-2.506 8.713-2.506 13.389 0 4.774.834 9.26 2.506 13.459 1.669 4.202 4.009 7.925 7.016 11.169 3.007 3.246 6.609 5.799 10.811 7.66 4.199 1.861 8.828 2.792 13.89 2.792 3.913 0 7.804-.955 11.669-2.863 3.866-1.908 6.849-4.533 8.949-7.875v9.021h15.607V78.182h-15.607v9.02zm-1.431 32.503c-.955 2.578-2.291 4.821-4.009 6.73-1.719 1.91-3.795 3.437-6.229 4.582-2.435 1.146-5.133 1.718-8.091 1.718-2.96 0-5.633-.572-8.019-1.718-2.387-1.146-4.438-2.672-6.156-4.582-1.719-1.909-3.032-4.152-3.938-6.73-.909-2.577-1.36-5.298-1.36-8.161 0-2.864.451-5.585 1.36-8.162.905-2.577 2.219-4.819 3.938-6.729 1.718-1.908 3.77-3.437 6.156-4.582 2.386-1.146 5.059-1.718 8.019-1.718 2.958 0 5.656.572 8.091 1.718 2.434 1.146 4.51 2.674 6.229 4.582 1.718 1.91 3.054 4.152 4.009 6.729.953 2.577 1.432 5.298 1.432 8.162-.001 2.863-.479 5.584-1.432 8.161zM463.954 87.202c-2.101-3.341-5.083-5.965-8.949-7.875-3.865-1.909-7.756-2.864-11.669-2.864-5.062 0-9.69.931-13.89 2.792-4.201 1.861-7.804 4.417-10.811 7.661-3.007 3.246-5.347 6.993-7.016 11.239-1.672 4.249-2.506 8.713-2.506 13.389 0 4.774.834 9.26 2.506 13.459 1.669 4.202 4.009 7.925 7.016 11.169 3.007 3.246 6.609 5.799 10.811 7.66 4.199 1.861 8.828 2.792 13.89 2.792 3.913 0 7.804-.955 11.669-2.863 3.866-1.908 6.849-4.533 8.949-7.875v9.021h15.607V78.182h-15.607v9.02zm-1.432 32.503c-.955 2.578-2.291 4.821-4.009 6.73-1.719 1.91-3.795 3.437-6.229 4.582-2.435 1.146-5.133 1.718-8.091 1.718-2.96 0-5.633-.572-8.019-1.718-2.387-1.146-4.438-2.672-6.156-4.582-1.719-1.909-3.032-4.152-3.938-6.73-.909-2.577-1.36-5.298-1.36-8.161 0-2.864.451-5.585 1.36-8.162.905-2.577 2.219-4.819 3.938-6.729 1.718-1.908 3.77-3.437 6.156-4.582 2.386-1.146 5.059-1.718 8.019-1.718 2.958 0 5.656.572 8.091 1.718 2.434 1.146 4.51 2.674 6.229 4.582 1.718 1.91 3.054 4.152 4.009 6.729.953 2.577 1.432 5.298 1.432 8.162 0 2.863-.479 5.584-1.432 8.161zM650.772 44.676h-15.606v100.23h15.606V44.676zM365.013 144.906h15.607V93.538h26.776V78.182h-42.383v66.724zM542.133 78.182l-19.616 51.096-19.616-51.096h-15.808l25.617 66.724h19.614l25.617-66.724h-15.808zM591.98 76.466c-19.112 0-34.239 15.706-34.239 35.079 0 21.416 14.641 35.079 36.239 35.079 12.088 0 19.806-4.622 29.234-14.688l-10.544-8.158c-.006.008-7.958 10.449-19.832 10.449-13.802 0-19.612-11.127-19.612-16.884h51.777c2.72-22.043-11.772-40.877-33.023-40.877zm-18.713 29.28c.12-1.284 1.917-16.884 18.589-16.884 16.671 0 18.697 15.598 18.813 16.884h-37.402zM184.068 43.892c-.024-.088-.073-.165-.104-.25-.058-.157-.108-.316-.191-.46-.056-.097-.137-.176-.203-.265-.087-.117-.161-.242-.265-.345-.085-.086-.194-.148-.29-.223-.109-.085-.206-.182-.327-.252l-.002-.001-.002-.002-35.648-20.524a2.971 2.971 0 00-2.964 0l-35.647 20.522-.002.002-.002.001c-.121.07-.219.167-.327.252-.096.075-.205.138-.29.223-.103.103-.178.228-.265.345-.066.089-.147.169-.203.265-.083.144-.133.304-.191.46-.031.085-.08.162-.104.25-.067.249-.103.51-.103.776v38.979l-29.706 17.103V24.493a3 3 0 00-.103-.776c-.024-.088-.073-.165-.104-.25-.058-.157-.108-.316-.191-.46-.056-.097-.137-.176-.203-.265-.087-.117-.161-.242-.265-.345-.085-.086-.194-.148-.29-.223-.109-.085-.206-.182-.327-.252l-.002-.001-.002-.002L40.098 1.396a2.971 2.971 0 00-2.964 0L1.487 21.919l-.002.002-.002.001c-.121.07-.219.167-.327.252-.096.075-.205.138-.29.223-.103.103-.178.228-.265.345-.066.089-.147.169-.203.265-.083.144-.133.304-.191.46-.031.085-.08.162-.104.25-.067.249-.103.51-.103.776v122.09c0 1.063.568 2.044 1.489 2.575l71.293 41.045c.156.089.324.143.49.202.078.028.15.074.23.095a2.98 2.98 0 001.524 0c.069-.018.132-.059.2-.083.176-.061.354-.119.519-.214l71.293-41.045a2.971 2.971 0 001.489-2.575v-38.979l34.158-19.666a2.971 2.971 0 001.489-2.575V44.666a3.075 3.075 0 00-.106-.774zM74.255 143.167l-29.648-16.779 31.136-17.926.001-.001 34.164-19.669 29.674 17.084-21.772 12.428-43.555 24.863zm68.329-76.259v33.841l-12.475-7.182-17.231-9.92V49.806l12.475 7.182 17.231 9.92zm2.97-39.335l29.693 17.095-29.693 17.095-29.693-17.095 29.693-17.095zM54.06 114.089l-12.475 7.182V46.733l17.231-9.92 12.475-7.182v74.537l-17.231 9.921zM38.614 7.398l29.693 17.095-29.693 17.095L8.921 24.493 38.614 7.398zM5.938 29.632l12.475 7.182 17.231 9.92v79.676l.001.005-.001.006c0 .114.032.221.045.333.017.146.021.294.059.434l.002.007c.032.117.094.222.14.334.051.124.088.255.156.371a.036.036 0 00.004.009c.061.105.149.191.222.288.081.105.149.22.244.314l.008.01c.084.083.19.142.284.215.106.083.202.178.32.247l.013.005.011.008 34.139 19.321v34.175L5.939 144.867V29.632h-.001zm136.646 115.235l-65.352 37.625V148.31l48.399-27.628 16.953-9.677v33.862zm35.646-61.22l-29.706 17.102V66.908l17.231-9.92 12.475-7.182v33.841z"
            />
          </g>
        </svg>
      </div>

      <div
        class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg"
      >
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="p-6">
            <div class="flex items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-8 h-8 text-gray-500"
              >
                <path
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
              <div class="ml-4 text-lg leading-7 font-semibold">
                <a
                  href="https://laravel.com/docs"
                  class="underline text-gray-900 dark:text-white"
                  >Documentation</a
                >
              </div>
            </div>

            <div class="ml-12">
              <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Laravel has wonderful, thorough documentation covering every
                aspect of the framework. Whether you are new to the framework or
                have previous experience with Laravel, we recommend reading all
                of the documentation from beginning to end.
              </div>
            </div>
          </div>

          <div
            class="p-6 border-t border-gray-200 dark:border-gray-700 md:border-t-0 md:border-l"
          >
            <div class="flex items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-8 h-8 text-gray-500"
              >
                <path
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
                <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <div class="ml-4 text-lg leading-7 font-semibold">
                <a
                  href="https://laracasts.com"
                  class="underline text-gray-900 dark:text-white"
                  >Laracasts</a
                >
              </div>
            </div>

            <div class="ml-12">
              <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Laracasts offers thousands of video tutorials on Laravel, PHP,
                and JavaScript development. Check them out, see for yourself,
                and massively level up your development skills in the process.
              </div>
            </div>
          </div>

          <div class="p-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-8 h-8 text-gray-500"
              >
                <path
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                ></path>
              </svg>
              <div class="ml-4 text-lg leading-7 font-semibold">
                <a
                  href="https://laravel-news.com/"
                  class="underline text-gray-900 dark:text-white"
                  >Laravel News</a
                >
              </div>
            </div>

            <div class="ml-12">
              <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Laravel News is a community driven portal and newsletter
                aggregating all of the latest and most important news in the
                Laravel ecosystem, including new package releases and tutorials.
              </div>
            </div>
          </div>

          <div
            class="p-6 border-t border-gray-200 dark:border-gray-700 md:border-l"
          >
            <div class="flex items-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-8 h-8 text-gray-500"
              >
                <path
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div
                class="ml-4 text-lg leading-7 font-semibold text-gray-900 dark:text-white"
              >
                Vibrant Ecosystem
              </div>
            </div>

            <div class="ml-12">
              <div class="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Laravel's robust library of first-party tools and libraries,
                such as
                <a href="https://forge.laravel.com" class="underline">Forge</a>,
                <a href="https://vapor.laravel.com" class="underline">Vapor</a>,
                <a href="https://nova.laravel.com" class="underline">Nova</a>,
                and
                <a href="https://envoyer.io" class="underline">Envoyer</a> help
                you take your projects to the next level. Pair them with
                powerful open source libraries like
                <a href="https://laravel.com/docs/billing" class="underline"
                  >Cashier</a
                >,
                <a href="https://laravel.com/docs/dusk" class="underline"
                  >Dusk</a
                >,
                <a
                  href="https://laravel.com/docs/broadcasting"
                  class="underline"
                  >Echo</a
                >,
                <a href="https://laravel.com/docs/horizon" class="underline"
                  >Horizon</a
                >,
                <a href="https://laravel.com/docs/sanctum" class="underline"
                  >Sanctum</a
                >,
                <a href="https://laravel.com/docs/telescope" class="underline"
                  >Telescope</a
                >, and more.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-4 sm:items-center sm:justify-between">
        <div class="text-center text-sm text-gray-500 sm:text-left">
          <div class="flex items-center">
            <svg
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="-mt-px w-5 h-5 text-gray-400"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>

            <a href="https://laravel.bigcartel.com" class="ml-1 underline">
              Shop
            </a>

            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="ml-4 -mt-px w-5 h-5 text-gray-400"
            >
              <path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>

            <a
              href="https://github.com/sponsors/taylorotwell"
              class="ml-1 underline"
            >
              Sponsor
            </a>
          </div>
        </div>

        <div
          class="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0"
        >
          Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{
          PHP_VERSION }})
        </div>
      </div>
    </div>
  </div>
</x-guest-layout>
```

⚠️ Je vous laisse constater la différence.

::: danger À partir de maintenant
J'espère qu'à partir de maintenant, vous allez utiliser le système de template ! Je vous encourage vivement à le faire.
:::

## Protéger une page

Le but de l'authentification est donc de limiter l'accès à certaines pages vous l'avez bien compris… Sauf que pour l'instant nous n'avons pas encore vu comment le faire sur les pages que nous souhaitons protéger !

Nous allons créer un contrôleur fictif, celui-ci vous nous permettre de tester la protection.

```sh
php artisan make:controller YoloControler
```

Vous venez de créer un contrôleur vide. En reprenant si nécessaire les exemples du premier TP, je vous laisse créer dedans :

| Route             | Méthode         |
| :---------------- | :-------------- |
| `/yolo`           | `publicView()`  |
| `/yolo-connected` | `privateView()` |

### La partie publique

Pour la partie publique (non connecté), pas rapport à précédemment :

- Une méthode `publicView`, celle-ci doit retourner une `view` qui affichera pour l'instant `Bonjour non connecté`. Attention ! Cette vue doit utiliser le template `<x-guest-layout>`
- Ajouter cette route dans le fichier `routes/web.php`.

::: details Besoin d'aide ?

Avez-vous bien cherché ?

Je vous aide pour la partie route :

```php
Route::get('/yolo', ['App\Http\Controllers\YoloControler', 'publicView']);
```

Je vous aide pour la partie méthode :

```php
    return view("yolo.publicView");
```

:::

Nous avons le temps, n'hésitez pas à :

- Créer des composants si nécessaire.
- Utiliser les class de Tailwind (vous avez même de la completion dans PhpStorm).

Pour ma part voilà mon rendu :

![Résultat Valentin](./ressources/resultat-valentin.png)

::: details Vous voulez-voir mon template ?

Est-ce vraiment une bonne idée ? Je vous encourage vraiment à faire le vôtre, d'autant plus que j'ai décidé de créer un composant nommé `card.blade.php` dans la partie composant. Mais voilà mon code :

_resources/views/yolo/publicView.blade.php:_

```html
<x-guest-layout>
  <x-card>
    <div class="text-center font-bold text-indigo-600">Bonjour à toi 👋</div>
  </x-card>
</x-guest-layout
```

:::

Je vous laisse coder votre version.

### La partie privée

Pour la partie privée, je vous laisse gérer l'ensemble de la base :

- Création de la méthode.
- Création du template. Attention cette fois-ci nous allons utiliser le composant `<x-app-layout>` qui contient toute la logique de la partie « information de connexion » (menu, etc).

#### Le Layout

Pour le layout j'ai décidé de le nommer `privateView.blade.php` et de le mettre ici : `resources/views/yolo/privateView.blade.php`

```html
<x-app-layout>
  <x-slot name="header">
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
      Hello
    </h2>
  </x-slot>

  <div class="p-5">
    <div class="text-center font-bold text-indigo-600">
      Bonjour {{Auth::user()->name}} 👋
    </div>
  </div>
</x-app-layout>
```

### Le contrôleur

Pour le contrôleur, je vous laisse ajouter la méthode `privateView` comme demandé dans le tableau plus haut :

::: details Dans mon cas ça donne

```php
public function privateView(){
    return view("yolo.privateView");
}
```

:::

### La route

C'est la partie qui nous intéresse… Vous avez remarqué que dans les lignes précédentes, nous n'avons jamais parlé de l'authentification. Comment alors est-ce possible que la page ne soit accessible qu'aux gens connectés ?

Et bien … C'est simple ! Quand vous avez installé `breeze` vous avez également ajouté des `Middleware`, un middleware est un morceau de code qui va intercepter la demande initiale pour faire des contrôles supplémentaires. Dans notre cas le contrôle en plus va être « Est-ce que l'utilisateur est connecté » :

![Logique d'authentification](./ressources/auth-logic.png)

Nous allons donc ajouter dans le fichier `routes/web.php`

```php
Route::get('/yolo-connected', ['App\Http\Controllers\YoloControler', 'privateView'])->middleware(['auth'])->name("yoloPrivate");
```

Noter l'ajout du middleware `auth`.

Voilà le résultat pour moi

![Résultat Valentin partie privée](./ressources/resultat-valentin-private.png)

⚠️ Je vous laisse implémenter la partie privée dans votre code. ⚠️

::: danger Un instant !

Vous noterez que dans ma version j'ai un menu avec un lien vers ma page… Pas de magie ! J'ai ajouté le code nécessaire dans le fichier `resources/views/layouts/navigation.blade.php`

Dans la partie « Navigation Link » :

![Navigation Links](./ressources/navigation-links.png)

:::

## Conclusion

Nous avons fait le tour de la base de ce qu'il faut savoir. Cependant le TP continue sur deux éléments qui peuvent être intéressants pour vous à la suite de cette conclusion.

::: tip Le code entier, mais uniquement si vous le demandez
Vous souhaitez voir mon code ? [J'ai un repository privé si nécessaire](https://github.com/c4software/laravel-auth-student)
:::

## Modifier les informations demandées

En reprenant ce que nous avons fait précédemment, je vous laisse modifier la structure de la base de données pour ajouter dans la table `users` un nouveau champ nommé par exemple `pseudo`.

- Ajouter la colonne en base
- Modifier le formulaire de création de comptes `resources/views/auth/register.blade.php` pour ajouter le champ dans le formulaire.
- Modifier le modèle `app/Models/User.php` pour ajouter dans les `$fillable` le nouveau champ.
- Modifier le contrôleur pour sauvegarder la nouvelle valeur. (méthode `store` dans `app/Http/Controllers/Auth/RegisteredUserController.php`)

## Accéder aux informations du connecté

Nous l'avons fait dans notre exemple de contrôleur, mais, si vous ne l'aviez pas compris :

```html
{{Auth::user()->name}}
```

## Créer plusieurs enregistrements en base de données

Le but de Breeze est de vous permettre de modifier le code « préfourni » c'est ce que l'on appelle du Scaffolding, nous allons donc en profiter pour modifier son comportement afin de créer lors de l'ajout d'utilisateur une autre entrée en base de données, par exemple une `personne`.

- Créer la migration ainsi que le modèle. `php artisan make:model Personne --migration`
- Renseigner les champs dans votre migration **,mais également** dans le modèle.
- Lancer la migration `php artisan migrate`
- Modifier le code de la méthode `store` dans le contrôleur `app/Http/Controllers/Auth/RegisteredUserController.php` pour ajouter également un utilisateur :

Exemple dans mon cas :

```php
Personne::create([
    'name' => $request->name,
    'userId' => $user->id
])
```

Et voilà nous avons maintenant une méthode de « Création d'un utilisateur » qui ajoute également une personne.

::: tip C'est bien évidement un exemple
Je vous laisse l'implémenter… Cependant vous comprenez bien que c'est évidemment un exemple !
:::
