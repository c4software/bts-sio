---
description: "Le fil de veille : les derniers articles des sources conseillées pour le développement (Dev.to, Hacker News, Développez.com, newsletters…), réunis sur une seule page, à filtrer par source ou par mot-clé."
aside: false
---

# Le fil de veille

Faire sa veille, c'est prendre l'habitude de lire régulièrement ce qui se passe dans notre métier. Pour vous aider à démarrer, cette page réunit les derniers articles des sources de [la page Ressources](./ressources.md) consacrées au développement, et quelques newsletters.

::: tip Comment l'utiliser
- Filtrez par catégorie ou par source, ou cherchez un mot-clé (`PHP`, `Linux`, `sécurité`…).
- Un article vous intéresse ? Il s'ouvre sur le site d'origine : c'est là qu'il faut le lire (et pas seulement le titre 😉).
- Prenez dix minutes, deux ou trois fois par semaine. C'est la régularité qui compte, pas la quantité.
:::

<VeilleReader />

## Et ensuite ?

Cette page est un point de départ. Pour une veille qui vous ressemble, choisissez vos propres sources et abonnez-vous à leurs flux dans un [agrégateur RSS](./ressources.md#agregateurs-rss) (Feedly, Inoreader, FreshRSS…) : vous retrouverez tout au même endroit, sans dépendre de cette page.

::: details Comment fonctionne cette page ?
Chaque source publie un **flux RSS** (ou Atom) : un fichier XML qui liste ses derniers articles. La plupart de ces sites interdisent à un autre site de lire leur flux depuis le navigateur (c'est la politique **CORS**). Les flux sont donc récupérés côté serveur : une première fois à la publication du site, puis par une petite fonction quand vous cliquez sur « Actualiser » (sa réponse est gardée 30 minutes en cache).

Vous voulez construire le vôtre ? C'est l'objet du TP [Mon lecteur de veille](/tp/javascript/tp4.2.md).
:::
