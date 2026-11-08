package cours.brosseau.lampadaires.model

/**
 * La machine à états de l'écran de création.
 */
sealed interface EcranCreation {
    /** Le formulaire attend la saisie. */
    data object Saisie : EcranCreation

    /** La requête POST est partie, on attend la réponse. */
    data object Envoi : EcranCreation

    /** Le serveur a créé le lampadaire : l'écran peut se fermer. */
    data object Cree : EcranCreation

    /** Le serveur a refusé, ou ne répond pas. */
    data class Erreur(val message: String) : EcranCreation
}
