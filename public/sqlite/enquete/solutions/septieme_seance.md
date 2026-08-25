Structure : 1 témoin, puis une fausse piste, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- un prénom sur « Boulevard Georges-Brassens » : `nom LIKE 'Solène %'`.

Une fois trouvés, lisez leur `interrogatoire` (jointure sur `personne_id`).
:::

::: details Indice 2 : la fausse piste
Les indices viennent de : Solène Barbier (evenement, physique).

- **physique** : la description physique (genre, cheveux, yeux, taille, âge) est dans `permis_conduire`, les intervalles se filtrent avec `BETWEEN`.
- **evenement** : les participations sont dans `evenement_participation` ; pour « n fois », comptez avec `GROUP BY personne_id HAVING COUNT(*) = n`.

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
Une fois validé, lisez son interrogatoire : l'enquête continue.
:::

::: details Indice 3 : le coupable
Les indices viennent de : Theo Rocher (physique, salle, vehicule).

- **physique** : la description physique (genre, cheveux, yeux, taille, âge) est dans `permis_conduire`, les intervalles se filtrent avec `BETWEEN`.
- **vehicule** : la voiture et la plaque sont dans `permis_conduire` ; un fragment de plaque se cherche avec `LIKE` (`'abc%'` commence par, `'%abc'` se termine par, `'%abc%'` contient).
- **salle** : la salle de sport, c'est `salle_sport_membre` (statut, numéro de membre avec `LIKE`) et `salle_sport_passage` (date, créneau avec `heure_entree BETWEEN …`).

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
Une fois validé, lisez son interrogatoire : l'enquête continue.
:::

::: details Indice 4 : la personne derrière tout ça
Les indices viennent de : Nathan Guichard (evenement, physique, revenu).

- **physique** : la description physique (genre, cheveux, yeux, taille, âge) est dans `permis_conduire`, les intervalles se filtrent avec `BETWEEN`.
- **revenu** : le revenu est dans `revenu`, reliée par `nir`.
- **evenement** : les participations sont dans `evenement_participation` ; pour « n fois », comptez avec `GROUP BY personne_id HAVING COUNT(*) = n`.

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
:::

::: details Voir l'une des solutions possibles
```sql
-- Témoin : Solène Barbier
SELECT nom FROM personne
WHERE nom_rue='Boulevard Georges-Brassens'
  AND nom LIKE 'Solène %';

-- Leurs interrogatoires
SELECT p.nom, i.transcription FROM interrogatoire i
JOIN personne p ON p.id = i.personne_id
WHERE p.nom IN ('Solène Barbier');

-- Fausse piste : Theo Rocher
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN evenement_participation e ON e.personne_id=p.id
WHERE pc.genre='homme'
  AND pc.couleur_cheveux='noir'
  AND pc.age BETWEEN 70 AND 75
  AND e.nom_evenement='Avant-première au Grand Rex'
  AND e.date=20211030
GROUP BY p.id
HAVING COUNT(DISTINCT e.date)=1;
INSERT INTO solution VALUES (1, 'Theo Rocher');
SELECT valeur FROM solution;

-- Réponse 1 : Nathan Guichard
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN salle_sport_membre m ON m.personne_id=p.id
WHERE m.id LIKE '8U%'
  AND pc.modele_voiture='i20'
  AND pc.immatriculation LIKE '8V9B%'
  AND pc.genre='homme'
  AND pc.couleur_yeux='vert';
INSERT INTO solution VALUES (1, 'Nathan Guichard');
SELECT valeur FROM solution;

-- Réponse 2 : Valerie Humbert
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN revenu r ON r.nir=p.nir
JOIN evenement_participation e ON e.personne_id=p.id
WHERE r.revenu_annuel>200000
  AND pc.genre='femme'
  AND pc.taille BETWEEN 163 AND 167
  AND pc.age BETWEEN 39 AND 43
  AND e.nom_evenement='Festival du Film Court'
  AND e.date BETWEEN 20210901 AND 20210931
GROUP BY p.id
HAVING COUNT(DISTINCT e.date)=3;
INSERT INTO solution VALUES (1, 'Valerie Humbert');
SELECT valeur FROM solution;

```
:::
