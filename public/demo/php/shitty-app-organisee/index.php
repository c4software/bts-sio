<?php
    include("parametre/parametres.php");
    include("modeles/lien.php");
    include("dao/liens.php");
    include("fonctions/index.php");

    head($_SITE_TITLE);
?>

      <div class="card-deck mb-3 text-center">
        <?php
          foreach($_ELEMENTS as $el){
            genereListe($el['title'], $el['file']);
          }
        ?>
      </div>

<?php
    foot();
