<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello world</title>
</head>
<body>
    <h1>Hello, {{ $name }}</h1>

    <form action="/hello" method="post">
        @csrf
        <input type="text" name="name" placeholder="Votre nom">
        <button type="submit">Envoyer</button>
    </form>
</body>
</html>
