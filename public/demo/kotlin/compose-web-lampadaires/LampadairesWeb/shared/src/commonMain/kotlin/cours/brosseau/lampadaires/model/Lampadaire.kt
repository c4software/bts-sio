package cours.brosseau.lampadaires.model

import kotlinx.serialization.Serializable

/**
 * Les états possibles d'un lampadaire (mêmes valeurs que côté serveur).
 */
@Serializable
enum class StatutLampadaire { EN_SERVICE, EN_PANNE, EN_MAINTENANCE }

/**
 * Un lampadaire, tel que renvoyé par l'API.
 */
@Serializable
data class LampadaireDTO(
    val id: Int,
    val numeroSerie: String,
    val titre: String,
    val description: String,
    val image: String,
    val statut: StatutLampadaire,
    val dateInstallation: String,
)

/**
 * Ce que l'application envoie pour créer un lampadaire (POST /v1/lampadaires).
 */
@Serializable
data class CreateLampadaireDTO(
    val numeroSerie: String,
    val titre: String,
    val description: String,
    val image: String,
)
