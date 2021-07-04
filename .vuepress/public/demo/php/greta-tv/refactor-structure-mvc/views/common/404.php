<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>404</title>
    <style>
        :root {
            --bg-color: #F8F9FB;
            --text-color: #FF7A63;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #000000;
                --text-color: #ffffff;
            }
        }

        html, body {
            background: var(--bg-color);
            margin: 0;
            padding: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            align-content: center;
            justify-content: center;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            color: var(--text-color);
        }

        h3 {
            text-align: center;
        }

        .text-center {
            text-align: center;
        }

        a {
            border: 1px solid var(--text-color);
            padding: 10px;
            display: inline-block;
            color: var(--text-color);
            text-decoration: none;
            border-radius: 10px;
        }
    </style>
</head>
<body>
<div class="text-center">
    <h1>Ressource introuvable</h1>
    <h3><?= $target ?></h3>
    <a href="/">Retour</a>
</div>
</body>
</html>