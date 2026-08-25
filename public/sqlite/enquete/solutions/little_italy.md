Structure : 2 témoins, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- un prénom sur « Rue de Nantes » : `nom LIKE 'Giuseppe %'`.
- un prénom sur « Impasse des Vignes » : `nom LIKE 'Antoine %'`.

Une fois trouvés, lisez leur `interrogatoire` (jointure sur `personne_id`).
:::

::: details Indice 2 : le coupable
Les indices viennent de : Antoine Rey (adresse, physique).

- **physique** : la description physique (genre, cheveux, yeux, taille, âge) est dans `permis_conduire`, les intervalles se filtrent avec `BETWEEN`.
- **adresse** : la rue (et le numéro) sont directement dans `personne`.

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
Une fois validé, lisez son interrogatoire : l'enquête continue.
:::

::: details Indice 3 : la personne derrière tout ça
Les indices viennent de : Enzo Chauvin (revenu, salle, vehicule).

- **vehicule** : la voiture et la plaque sont dans `permis_conduire` ; un fragment de plaque se cherche avec `LIKE` (`'abc%'` commence par, `'%abc'` se termine par, `'%abc%'` contient).
- **salle** : la salle de sport, c'est `salle_sport_membre` (statut, numéro de membre avec `LIKE`) et `salle_sport_passage` (date, créneau avec `heure_entree BETWEEN …`).
- **revenu** : le revenu est dans `revenu`, reliée par `nir`.

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
:::

::: details Voir l'une des solutions possibles
```sql
-- Témoin : Giuseppe Ferreira
SELECT p.nom FROM personne p
JOIN revenu r ON r.nir=p.nir
WHERE p.nom_rue='Rue de Nantes'
ORDER BY r.revenu_annuel DESC LIMIT 1;

-- Témoin : Antoine Rey
SELECT nom FROM personne
WHERE nom_rue='Impasse des Vignes'
  AND nom LIKE 'Antoine %';

-- Leurs interrogatoires
SELECT p.nom, i.transcription FROM interrogatoire i
JOIN personne p ON p.id = i.personne_id
WHERE p.nom IN ('Giuseppe Ferreira', 'Antoine Rey');

-- Réponse 1 : Enzo Chauvin
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
WHERE p.nom_rue='Rue des Vignes'
  AND p.numero_rue BETWEEN 260 AND 360
  AND pc.genre='homme'
  AND pc.couleur_cheveux='brun'
  AND pc.age BETWEEN 66 AND 71;
INSERT INTO solution VALUES (1, 'Enzo Chauvin');
SELECT valeur FROM solution;

-- Réponse 2 : Salvatore Guerin
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN revenu r ON r.nir=p.nir
JOIN salle_sport_membre m ON m.personne_id=p.id
JOIN salle_sport_passage s ON s.membre_id=m.id
WHERE pc.marque_voiture='Honda'
  AND pc.immatriculation LIKE '5Y9F%'
  AND m.statut_abonnement='or'
  AND s.date_passage=20230918
  AND s.heure_entree BETWEEN 1000 AND 1100
  AND r.revenu_annuel>200000
GROUP BY p.id;
INSERT INTO solution VALUES (1, 'Salvatore Guerin');
SELECT valeur FROM solution;

```
:::
