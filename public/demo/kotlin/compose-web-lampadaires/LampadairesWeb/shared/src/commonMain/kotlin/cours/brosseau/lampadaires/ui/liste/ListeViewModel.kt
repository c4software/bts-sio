package cours.brosseau.lampadaires.ui.liste

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import cours.brosseau.lampadaires.http.LampadairesApi
import cours.brosseau.lampadaires.model.EcranListe
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * Le ViewModel de l'écran liste : il appelle GET /v1/lampadaires et expose l'état de l'écran.
 */
class ListeViewModel : ViewModel() {

    private val api = LampadairesApi.instance

    private val _ecran = MutableStateFlow<EcranListe>(EcranListe.Chargement)
    val ecran: StateFlow<EcranListe> = _ecran.asStateFlow()

    /** Charge (ou recharge) la liste des lampadaires. */
    fun charger() {
        viewModelScope.launch {
            _ecran.value = EcranListe.Chargement
            _ecran.value = try {
                EcranListe.Lampadaires(api.lampadaires())
            } catch (e: Throwable) {
                EcranListe.Erreur("Le serveur ne répond pas : ${e.message}")
            }
        }
    }
}
