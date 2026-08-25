Structure : 2 témoins, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- le numéro le plus grand de « Chemin de l'Industrie » : `ORDER BY numero_rue DESC LIMIT 1`.
- un prénom sur « Avenue Kennedy » : `nom LIKE 'Justine %'` et `numero_rue BETWEEN 300 AND 400`.

Une fois trouvés, lisez leur `interrogatoire` (jointure sur `personne_id`).
:::

::: details Indice 2 : le coupable
Les indices viennent de : Marcel Bourgeois (physique, salle).

- **physique** : la description physique (genre, cheveux, yeux, taille, âge) est dans `permis_conduire`, les intervalles se filtrent avec `BETWEEN`.
- **salle** : la salle de sport, c'est `salle_sport_membre` (statut, numéro de membre avec `LIKE`) et `salle_sport_passage` (date, créneau avec `heure_entree BETWEEN …`).

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
Une fois validé, lisez son interrogatoire : l'enquête continue.
:::

::: details Indice 3 : la personne derrière tout ça
Les indices viennent de : Justine Payet (vehicule), Kevin Lacroix (evenement, revenu).

- **vehicule** : la voiture et la plaque sont dans `permis_conduire` ; un fragment de plaque se cherche avec `LIKE` (`'abc%'` commence par, `'%abc'` se termine par, `'%abc%'` contient).
- **revenu** : le revenu est dans `revenu`, reliée par `nir`.
- **evenement** : les participations sont dans `evenement_participation` ; pour « n fois », comptez avec `GROUP BY personne_id HAVING COUNT(*) = n`.

Partez de `personne`, ajoutez une jointure par indice, et vérifiez que le nombre de lignes diminue à chaque condition.
:::

::: details Voir l'une des solutions possibles
```sql
-- Témoin : Marcel Bourgeois
SELECT nom FROM personne
WHERE nom_rue='Chemin de l''Industrie'
ORDER BY numero_rue DESC LIMIT 1;

-- Témoin : Justine Payet
SELECT nom FROM personne
WHERE nom_rue='Avenue Kennedy'
  AND nom LIKE 'Justine %'
  AND numero_rue BETWEEN 300 AND 400;

-- Leurs interrogatoires
SELECT p.nom, i.transcription FROM interrogatoire i
JOIN personne p ON p.id = i.personne_id
WHERE p.nom IN ('Marcel Bourgeois', 'Justine Payet');

-- Réponse 1 : Kevin Lacroix
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN salle_sport_membre m ON m.personne_id=p.id
WHERE m.statut_abonnement='standard'
  AND m.id LIKE '1H%'
  AND pc.genre='homme'
  AND pc.couleur_cheveux='roux'
  AND pc.couleur_yeux='bleu'
  AND pc.taille BETWEEN 173 AND 176;
INSERT INTO solution VALUES (1, 'Kevin Lacroix');
SELECT valeur FROM solution;

-- Réponse 2 : Helene Marchal
SELECT p.nom FROM personne p
JOIN permis_conduire pc ON pc.id=p.permis_id
JOIN revenu r ON r.nir=p.nir
JOIN evenement_participation e ON e.personne_id=p.id
WHERE pc.marque_voiture='Mercedes'
  AND pc.modele_voiture='Classe C'
  AND pc.immatriculation LIKE '%3R5G%'
  AND e.nom_evenement='Conférence Cybersécurité'
  AND e.date BETWEEN 20220301 AND 20220331
  AND r.revenu_annuel>100000
GROUP BY p.id
HAVING COUNT(DISTINCT e.date)=2;
INSERT INTO solution VALUES (1, 'Helene Marchal');
SELECT valeur FROM solution;

```
:::
