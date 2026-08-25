Structure : 3 témoins, puis un personnage à identifier (réponse 1).

::: details Indice 1 : les témoins
- le numéro le plus petit de « Impasse Blaise-Pascal » : `ORDER BY numero_rue ASC LIMIT 1`.
- un prénom sur « Rue Pierre-Curie » : `nom LIKE 'Colette %'` et `numero_rue BETWEEN 200 AND 300`.
- un prénom sur « Avenue de l'Industrie » : `nom LIKE 'Karim %'`.

Une fois trouvés, lisez leur `interrogatoire` (jointure sur `personne_id`).
:::

::: details Indice 2 : le coupable
Les indices viennent de : Roger Delmas (physique), Colette Lemaire (vehicule), Karim Boyer (salle).

- **physique** : la description physique (genre, cheveux, yeux, taille, âge) est dans `permis_conduire`, les intervalles se filtrent avec `BETWEEN`.
- **vehicule** : la voiture et la plaque sont dans `permis_conduire` ; un fragment de plaque se cherche avec `LIKE` (`'abc%'` commence par, `'%abc'` se termine par, `'%abc%'` contient).
- **salle** : la salle de sport, c'est `salle_sport_membre` (statut, numéro de membre avec `LIKE`) et `salle_sport_passage` (date, créneau avec `heure_entree BETWEEN …`).

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
:::

::: details Voir l'une des solutions possibles
```sql
-- Témoin : Roger Delmas
SELECT nom FROM personne
WHERE nom_rue='Impasse Blaise-Pascal'
ORDER BY numero_rue ASC LIMIT 1;

-- Témoin : Colette Lemaire
SELECT nom FROM personne
WHERE nom_rue='Rue Pierre-Curie'
  AND nom LIKE 'Colette %'
  AND numero_rue BETWEEN 200 AND 300;

-- Témoin : Karim Boyer
SELECT p.nom FROM personne p
JOIN revenu r ON r.nir=p.nir
WHERE p.nom_rue='Avenue de l''Industrie'
ORDER BY r.revenu_annuel DESC LIMIT 1;

-- Leurs interrogatoires
SELECT p.nom, i.transcription FROM interrogatoire i
JOIN personne p ON p.id = i.personne_id
WHERE p.nom IN ('Roger Delmas', 'Colette Lemaire', 'Karim Boyer');

-- Réponse 1 : Margaux Tessier
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN salle_sport_membre m ON m.personne_id=p.id
JOIN salle_sport_passage s ON s.membre_id=m.id
WHERE m.statut_abonnement='standard'
  AND s.date_passage=20200206
  AND s.heure_entree BETWEEN 1300 AND 1400
  AND pc.marque_voiture='Dacia'
  AND pc.immatriculation LIKE '%7X1S'
  AND pc.genre='femme'
  AND pc.couleur_cheveux='blond'
  AND pc.taille BETWEEN 162 AND 165
GROUP BY p.id;
INSERT INTO solution VALUES (1, 'Margaux Tessier');
SELECT valeur FROM solution;

```
:::
