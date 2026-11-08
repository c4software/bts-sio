<?php
    include("parametre/parametres.php");
    include("modeles/lien.php");
    include("dao/liens.php");
    include("fonctions/index.php");

    $categorie = isset($_GET["c"]) ? basename($_GET["c"]) : "";

    if($categorie == ""){
        header("location: index.php");
        die();
    }

    if(isset($_POST['link']) && isset($_POST['title'])){
        $lien = new Lien($_POST["link"], $_POST["title"]);

        // On n'ajoute le lien que s'il est valide
        if($lien->estValide()){
            LienDao::put($categorie, $lien->lien, $lien->name);
        }

        header("Refresh:0");
        die();
    }

    head(ucfirst($categorie));
?>

      <div class="card-deck mb-3 text-center">

        <?php genereListe(ucfirst($categorie), $categorie); ?>

      </div>

      <div class="border-top my-md-2 pt-md-3">
          <form method="POST">
              <div class="row">
                  <div class="col-sm">
                      <input type="text" class="form-control" name="title" placeholder="Titre du lien" required />
                  </div>
                  <div class="col-sm">
                      <input type="url" class="form-control" name="link" placeholder="Votre lien (https://)" pattern="https://.*" required />
                  </div>
              </div>
              <br>
              <button type="submit" class="btn btn-primary mb-2">Ajouter</button>
          </form>
      </div>

<?php
    foot();
