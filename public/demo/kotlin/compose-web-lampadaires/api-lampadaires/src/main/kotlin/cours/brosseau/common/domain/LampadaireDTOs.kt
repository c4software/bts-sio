package cours.brosseau.common.domain

import kotlinx.serialization.Serializable

/**
 * Les états possibles d'un lampadaire.
 */
@Serializable
enum class StatutLampadaire { EN_SERVICE, EN_PANNE, EN_MAINTENANCE }

/**
 * Ce que le client envoie pour créer un lampadaire : ni id, ni statut, ni date, c'est le serveur qui s'en charge.
 */
@Serializable
data class CreateLampadaireDTO(
    val numeroSerie: String,
    val titre: String,
    val description: String,
    val image: String,
)

/**
 * Un lampadaire, tel que renvoyé par l'API (en JSON).
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
