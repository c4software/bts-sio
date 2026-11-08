<div class="container">
  <div class="row pt-5" id="content">
    <!-- Nous allons insérer ICI le contenu grace à l'AJAX -->
  </div>
</div>

<script>
  fetch("./api.php?page=videos")
    .then((response) => response.json())
    .then((datas) => {
      let i = 0;
      datas.forEach((el) => {
        i++;
        document.getElementById("content").insertAdjacentHTML(
          "beforeend",
          `
          <div class="col-sm-12 col-md-3 p-3">
              <div class="card">
                  <div class="card-body text-center">
                      <a href="index.php?page=tv&id=${el}" class="btn btn-outline-primary">Video ${i}</a>
                  </div>
              </div>
          </div>
          `
        );
      });
    });
</script>
