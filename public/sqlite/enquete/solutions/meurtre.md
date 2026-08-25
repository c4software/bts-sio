Structure : 2 témoins, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- le numéro le plus grand de « Rue du Nord-Ouest » : `ORDER BY numero_rue DESC LIMIT 1`.
- un prénom sur « Avenue Franklin » : `nom LIKE 'Annabel %'`.

Une fois trouvés, lisez leur `interrogatoire` (jointure sur `personne_id`).
:::

::: details Indice 2 : le coupable
Les indices viennent de : Martin Chapuis (salle, vehicule).

- **salle** : la salle de sport, c'est `salle_sport_membre` (statut, numéro de membre avec `LIKE`) et `salle_sport_passage` (date, créneau avec `heure_entree BETWEEN …`).
- **vehicule** : la voiture et la plaque sont dans `permis_conduire` ; un fragment de plaque se cherche avec `LIKE` (`'abc%'` commence par, `'%abc'` se termine par, `'%abc%'` contient).

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
Une fois validé, lisez son interrogatoire : l'enquête continue.
:::

::: details Indice 3 : la personne derrière tout ça
Les indices viennent de : Jeremy Boivin (evenement, physique, vehicule).

- **physique** : la description physique (genre, cheveux, yeux, taille, âge) est dans `permis_conduire`, les intervalles se filtrent avec `BETWEEN`.
- **vehicule** : la voiture et la plaque sont dans `permis_conduire` ; un fragment de plaque se cherche avec `LIKE` (`'abc%'` commence par, `'%abc'` se termine par, `'%abc%'` contient).
- **evenement** : les participations sont dans `evenement_participation` ; pour « n fois », comptez avec `GROUP BY personne_id HAVING COUNT(*) = n`.

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
:::

::: details Voir l'une des solutions possibles
```sql
-- Témoin : Martin Chapuis
SELECT nom FROM personne
WHERE nom_rue='Rue du Nord-Ouest'
ORDER BY numero_rue DESC LIMIT 1;

-- Témoin : Annabel Meunier
SELECT nom FROM personne
WHERE nom_rue='Avenue Franklin'
  AND nom LIKE 'Annabel %';

-- Leurs interrogatoires
SELECT p.nom, i.transcription FROM interrogatoire i
JOIN personne p ON p.id = i.personne_id
WHERE p.nom IN ('Martin Chapuis', 'Annabel Meunier');

-- Réponse 1 : Jeremy Boivin
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN salle_sport_membre m ON m.personne_id=p.id
JOIN salle_sport_passage s ON s.membre_id=m.id
WHERE pc.immatriculation LIKE '%H42W%'
  AND m.statut_abonnement='or'
  AND m.id LIKE '48Z%'
  AND s.date_passage=20180109
GROUP BY p.id;
INSERT INTO solution VALUES (1, 'Jeremy Boivin');
SELECT valeur FROM solution;

-- Réponse 2 : Miranda Prieur
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN evenement_participation e ON e.personne_id=p.id
WHERE pc.genre='femme'
  AND pc.couleur_cheveux='roux'
  AND pc.taille BETWEEN 165 AND 168
  AND e.nom_evenement='Concert Symphonique SQL'
  AND e.date BETWEEN 20171201 AND 20171231
  AND pc.marque_voiture='Tesla'
  AND pc.modele_voiture='Model S'
GROUP BY p.id
HAVING COUNT(DISTINCT e.date)=3;
INSERT INTO solution VALUES (1, 'Miranda Prieur');
SELECT valeur FROM solution;

```
:::
