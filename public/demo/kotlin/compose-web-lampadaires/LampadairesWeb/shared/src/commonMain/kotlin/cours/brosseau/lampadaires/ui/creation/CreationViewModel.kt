package cours.brosseau.lampadaires.ui.creation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import cours.brosseau.lampadaires.http.LampadairesApi
import cours.brosseau.lampadaires.model.CreateLampadaireDTO
import cours.brosseau.lampadaires.model.EcranCreation
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * Le ViewModel de l'écran de création : il envoie POST /v1/lampadaires.
 */
class CreationViewModel : ViewModel() {

    private val api = LampadairesApi.instance

    private val _ecran = MutableStateFlow<EcranCreation>(EcranCreation.Saisie)
    val ecran: StateFlow<EcranCreation> = _ecran.asStateFlow()

    fun creer(numeroSerie: String, titre: String, description: String, image: String) {
        // Une règle simple, vérifiée avant même d'appeler le serveur
        if (numeroSerie.isBlank() || titre.isBlank() || description.isBlank()) {
            _ecran.value = EcranCreation.Erreur("Tous les champs sont obligatoires.")
            return
        }

        viewModelScope.launch {
            _ecran.value = EcranCreation.Envoi
            _ecran.value = try {
                api.creer(CreateLampadaireDTO(numeroSerie, titre, description, image))
                EcranCreation.Cree
            } catch (e: Throwable) {
                EcranCreation.Erreur("La création a échoué : ${e.message}")
            }
        }
    }
}
