<?php

// Le haut de la page, commun à toutes les pages
function head($titre) {
    echo '<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>' . $titre . '</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    <link rel="stylesheet" href="./public/main.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </head>
  <body>

    <!-- Header -->
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <a href="index.php" class="nolink"><h5 class="my-0 mr-md-auto font-weight-normal">' . $titre . '</h5></a>
    </div>

    <!-- Contenu -->
    <div class="container">
';
}

// Le bas de la page, commun à toutes les pages
function foot() {
    echo '
    </div>

    <!-- Footer -->
    <footer class="my-md-2 pt-md-3 border-top text-center">
      ' . date("Y") . '
    </footer>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
</html>';
}

// Une carte avec la liste des liens d'un fichier
function genereListe($title, $file){
    echo '
        <div class="card mb-4 shadow-sm">
          <div class="card-header">
            <a class="nolink" href="detail.php?c=' . $file . '"><h4 class="my-0 font-weight-normal">' . $title . ' <i class="material-icons">edit</i></h4></a>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">';

    $data = LienDao::get($file);
    foreach($data as $d){
        echo "<li><a rel='nofollow' target='_blank' href='" . $d->lien . "'>" . $d->name . "</a></li>";
    }

    echo '
            </ul>
          </div>
        </div>';
}
