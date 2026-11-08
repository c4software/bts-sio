package cours.brosseau.lampadaires.model

/**
 * La machine à états de l'écran liste.
 */
sealed interface EcranListe {
    /** Requête en cours (loader). */
    data object Chargement : EcranListe

    /** L'API a répondu. */
    data class Lampadaires(val lampadaires: List<LampadaireDTO>) : EcranListe

    /** L'API ne répond pas (serveur arrêté, mauvaise adresse…). */
    data class Erreur(val message: String) : EcranListe
}
