package cours.brosseau.lampadaires.ui.liste

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import cours.brosseau.lampadaires.model.EcranListe
import cours.brosseau.lampadaires.ui.components.Chargement
import cours.brosseau.lampadaires.ui.components.LampadaireCard
import cours.brosseau.lampadaires.ui.components.MessageErreur
import lampadairesweb.shared.generated.resources.Res
import lampadairesweb.shared.generated.resources.ic_add
import org.jetbrains.compose.resources.painterResource

/**
 * L'écran liste : une machine à états, à chaque état son composant.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ListeScreen(
    onLampadaireClick: (Int) -> Unit,
    onAjouterClick: () -> Unit,
    viewModel: ListeViewModel = viewModel { ListeViewModel() },
) {
    val ecran by viewModel.ecran.collectAsStateWithLifecycle()

    // À chaque affichage de l'écran (y compris au retour de la création), on recharge la liste
    LaunchedEffect(Unit) {
        viewModel.charger()
    }

    Scaffold(
        topBar = { TopAppBar(title = { Text("Lampadaires") }) },
        floatingActionButton = {
            FloatingActionButton(onClick = onAjouterClick) {
                Icon(painterResource(Res.drawable.ic_add), contentDescription = "Ajouter un lampadaire")
            }
        },
    ) { padding ->
        Box(Modifier.padding(padding)) {
            when (val etat = ecran) {
                EcranListe.Chargement -> Chargement("Chargement des lampadaires…")
                is EcranListe.Erreur -> MessageErreur(etat.message, onReessayer = viewModel::charger)
                is EcranListe.Lampadaires -> LazyVerticalGrid(
                    // Autant de colonnes que possible, chacune large d'au moins 280 dp
                    columns = GridCells.Adaptive(minSize = 280.dp),
                    // En bas, de la place pour que le bouton « + » ne cache pas le dernier lampadaire
                    contentPadding = PaddingValues(start = 16.dp, top = 16.dp, end = 16.dp, bottom = 88.dp),
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp),
                ) {
                    items(etat.lampadaires) { lampadaire ->
                        LampadaireCard(lampadaire, onClick = { onLampadaireClick(lampadaire.id) })
                    }
                }
            }
        }
    }
}
