Structure : 1 témoin, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- un prénom sur « Chemin du Port » : `nom LIKE 'Gaston %'`.

Une fois trouvés, lisez leur `interrogatoire` (jointure sur `personne_id`).
:::

::: details Indice 2 : le coupable
Les indices viennent de : Gaston Perrier (evenement, physique).

- **physique** : la description physique (genre, cheveux, yeux, taille, âge) est dans `permis_conduire`, les intervalles se filtrent avec `BETWEEN`.
- **evenement** : les participations sont dans `evenement_participation` ; pour « n fois », comptez avec `GROUP BY personne_id HAVING COUNT(*) = n`.

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
Une fois validé, lisez son interrogatoire : l'enquête continue.
:::

::: details Indice 3 : la personne derrière tout ça
Les indices viennent de : Bastien Mallet (adresse, revenu, salle).

- **salle** : la salle de sport, c'est `salle_sport_membre` (statut, numéro de membre avec `LIKE`) et `salle_sport_passage` (date, créneau avec `heure_entree BETWEEN …`).
- **revenu** : le revenu est dans `revenu`, reliée par `nir`.
- **adresse** : la rue (et le numéro) sont directement dans `personne`.

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
:::

::: details Voir l'une des solutions possibles
```sql
-- Témoin : Gaston Perrier
SELECT p.nom FROM personne p
JOIN revenu r ON r.nir=p.nir
WHERE p.nom_rue='Chemin du Port'
ORDER BY r.revenu_annuel ASC LIMIT 1;

-- Leurs interrogatoires
SELECT p.nom, i.transcription FROM interrogatoire i
JOIN personne p ON p.id = i.personne_id
WHERE p.nom IN ('Gaston Perrier');

-- Réponse 1 : Bastien Mallet
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN evenement_participation e ON e.personne_id=p.id
WHERE pc.genre='homme'
  AND pc.couleur_cheveux='roux'
  AND pc.couleur_yeux='bleu'
  AND pc.age BETWEEN 20 AND 29
  AND e.nom_evenement='Soirée western'
  AND e.date BETWEEN 20190501 AND 20190531
GROUP BY p.id
HAVING COUNT(DISTINCT e.date)=2;
INSERT INTO solution VALUES (1, 'Bastien Mallet');
SELECT valeur FROM solution;

-- Réponse 2 : Louis Vasseur
SELECT p.nom FROM personne p
JOIN revenu r ON r.nir=p.nir
JOIN salle_sport_membre m ON m.personne_id=p.id
JOIN salle_sport_passage s ON s.membre_id=m.id
WHERE r.revenu_annuel>200000
  AND p.nom_rue='Avenue Anatole-France'
  AND m.statut_abonnement='standard'
  AND m.id LIKE '%6J%'
  AND s.date_passage=20190613
  AND s.heure_entree BETWEEN 1900 AND 2000
GROUP BY p.id;
INSERT INTO solution VALUES (1, 'Louis Vasseur');
SELECT valeur FROM solution;

```
:::
