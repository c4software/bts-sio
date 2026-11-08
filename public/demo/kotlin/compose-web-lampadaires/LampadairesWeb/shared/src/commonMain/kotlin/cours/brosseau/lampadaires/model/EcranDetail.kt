package cours.brosseau.lampadaires.model

/**
 * La machine à états de l'écran détail.
 */
sealed interface EcranDetail {
    data object Chargement : EcranDetail
    data class Detail(val lampadaire: LampadaireDTO) : EcranDetail
    data class Erreur(val message: String) : EcranDetail
}
