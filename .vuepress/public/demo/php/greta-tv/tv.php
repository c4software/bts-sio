<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greta TV</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

    <style>
        body, html {
            height: 100%;
            background: url("./images/red-brown-vintage-brick-wall-with-shabby-structure-horizontal-wide-brickwall-background-grungy-red-brick-blank-wall-texture-retro-house-facade-abstract-panoramic-web-banner-stonewall-surface.jpg");
            background-size: 100%;
        }

        .frame {
            height: 320px;
            width: fit-content;
            margin: auto;
            margin-top: 80px;
            border: 5px solid #000000;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 1px 0px 20px 0px black;
        }

        .stand {
            width: 250px;
            height: 15px;
            background: #000000;
            margin: 0 auto;
            border-radius: 0 0 30px 30px;
            color: white;
            text-align: center;
            font-size: 10px;
            margin-top: 0px;
        }

    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">← Retour</a>
        </div>
    </nav>

    <div class="frame">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/<?= $_GET['id'] ?>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="stand">Greta TV</div>
</body>
</html>