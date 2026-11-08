package cours.brosseau.database

import cours.brosseau.common.domain.StatutLampadaire
import cours.brosseau.database.tables.Lampadaires
import org.jetbrains.exposed.v1.jdbc.Database
import org.jetbrains.exposed.v1.jdbc.SchemaUtils
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

/**
 * La connexion à la base SQLite, la création des tables et les données de départ.
 */
object LampadairesDatabase {

    fun connect() {
        // La base est un simple fichier, créé à la racine du projet s'il n'existe pas
        Database.connect("jdbc:sqlite:lampadaires.db", driver = "org.sqlite.JDBC")

        transaction {
            // Crée la table si elle n'existe pas encore
            SchemaUtils.create(Lampadaires)

            // Quelques lampadaires de départ, uniquement si la table est vide
            if (Lampadaires.selectAll().empty()) {
                ajouterLampadaire("LUM-2026-0001", "Sentier du lac", "Lampadaire solaire autonome qui éclaire le sentier piéton le long du lac.", "/images/lampadaire-1.jpg", StatutLampadaire.EN_SERVICE, "2026-03-12")
                ajouterLampadaire("LUM-2026-0002", "Avenue des Pins", "Lampadaire solaire à tête ronde, panneau orienté plein sud.", "/images/lampadaire-2.jpg", StatutLampadaire.EN_SERVICE, "2026-04-02")
                ajouterLampadaire("LUM-2026-0003", "Route du col", "Lampadaire isolé, sans raccordement au réseau électrique, en bord de route de montagne.", "/images/lampadaire-3.jpg", StatutLampadaire.EN_PANNE, "2026-05-20")
                ajouterLampadaire("LUM-2026-0004", "Parc des Tilleuls", "Série de lampadaires solaires le long de l'allée centrale du parc.", "/images/lampadaire-5.jpg", StatutLampadaire.EN_MAINTENANCE, "2026-06-08")
            }
        }
    }

    private fun ajouterLampadaire(
        numeroSerie: String,
        titre: String,
        description: String,
        image: String,
        statut: StatutLampadaire,
        dateInstallation: String,
    ) {
        Lampadaires.insert {
            it[Lampadaires.numeroSerie] = numeroSerie
            it[Lampadaires.titre] = titre
            it[Lampadaires.description] = description
            it[Lampadaires.image] = image
            it[Lampadaires.statut] = statut
            it[Lampadaires.dateInstallation] = dateInstallation
        }
    }
}
