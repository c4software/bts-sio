# Fake LED Api

Cette documentation décrit le fonctionnement de l'API « Fake LED »

## Modèle

Voilà le modèle des données renvoyé par le serveur.

## Status

```
{
  "name": "Salon",
  "status": true,
  "update": "Tue, 19 Mar 2019 12:31:36 GMT"
}
```

## API

### Allumer

GET

```
https://[SERVER]/setStatus?name=[NAME]&status=true
```

### Éteindre

GET

```
https://[SERVER]/setStatus?name=[NAME]&status=false
```

### Obtenir le status

GET

```
https://[SERVER]/getStatus?name=[NAME]
```

### Obtenir l'ensemble des états

GET

```
https://[SERVER]/getAll
```

### Allumer & Éteindre en indiquant la position

GET

```
https://[SERVER]/setStatus?name=[NAME]&status=true&lat=[LATITUDE]&lng=[LONGITUDE]
```
