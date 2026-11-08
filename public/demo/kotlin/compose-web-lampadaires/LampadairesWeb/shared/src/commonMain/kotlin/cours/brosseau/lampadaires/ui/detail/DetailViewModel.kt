package cours.brosseau.lampadaires.ui.detail

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import cours.brosseau.lampadaires.http.LampadairesApi
import cours.brosseau.lampadaires.model.EcranDetail
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * Le ViewModel de l'écran détail : il appelle GET /v1/lampadaires/{id}.
 */
class DetailViewModel : ViewModel() {

    private val api = LampadairesApi.instance

    private val _ecran = MutableStateFlow<EcranDetail>(EcranDetail.Chargement)
    val ecran: StateFlow<EcranDetail> = _ecran.asStateFlow()

    fun charger(id: Int) {
        viewModelScope.launch {
            _ecran.value = EcranDetail.Chargement
            _ecran.value = try {
                EcranDetail.Detail(api.lampadaire(id))
            } catch (e: Throwable) {
                EcranDetail.Erreur("Impossible de charger le lampadaire $id : ${e.message}")
            }
        }
    }
}
