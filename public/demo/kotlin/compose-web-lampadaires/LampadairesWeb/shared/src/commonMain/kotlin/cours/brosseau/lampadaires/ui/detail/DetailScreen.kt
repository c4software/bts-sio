package cours.brosseau.lampadaires.ui.detail

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import coil3.compose.AsyncImage
import cours.brosseau.lampadaires.http.urlImage
import cours.brosseau.lampadaires.model.EcranDetail
import cours.brosseau.lampadaires.model.LampadaireDTO
import cours.brosseau.lampadaires.ui.components.BadgeStatut
import cours.brosseau.lampadaires.ui.components.Chargement
import cours.brosseau.lampadaires.ui.components.MessageErreur
import lampadairesweb.shared.generated.resources.Res
import lampadairesweb.shared.generated.resources.ic_arrow_back
import org.jetbrains.compose.resources.painterResource

/**
 * L'écran détail : il reçoit l'id du lampadaire et demande le reste à l'API.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DetailScreen(id: Int, onRetour: () -> Unit, viewModel: DetailViewModel = viewModel { DetailViewModel() }) {
    val ecran by viewModel.ecran.collectAsStateWithLifecycle()

    // L'appel réseau part dès que l'écran s'affiche (et si l'id change)
    LaunchedEffect(id) {
        viewModel.charger(id)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Détail") },
                navigationIcon = {
                    IconButton(onClick = onRetour) {
                        Icon(painterResource(Res.drawable.ic_arrow_back), contentDescription = "Retour")
                    }
                },
            )
        },
    ) { padding ->
        Box(Modifier.padding(padding)) {
            when (val etat = ecran) {
                EcranDetail.Chargement -> Chargement("Chargement du lampadaire…")
                is EcranDetail.Erreur -> MessageErreur(etat.message, onReessayer = { viewModel.charger(id) })
                is EcranDetail.Detail -> DetailLampadaire(etat.lampadaire)
            }
        }
    }
}

@Composable
private fun DetailLampadaire(lampadaire: LampadaireDTO) {
    // Toute la largeur pour défiler, mais un contenu centré de 700 dp au plus sur un grand écran
    Column(
        modifier = Modifier.fillMaxWidth().verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Column(Modifier.widthIn(max = 700.dp)) {
            AsyncImage(
                model = urlImage(lampadaire.image),
                contentDescription = lampadaire.titre,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxWidth().aspectRatio(16f / 9f),
            )
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(lampadaire.titre, style = MaterialTheme.typography.headlineSmall)
                BadgeStatut(lampadaire.statut)
                Text("N° de série : ${lampadaire.numeroSerie}", style = MaterialTheme.typography.bodyMedium)
                Text("Installé le ${lampadaire.dateInstallation}", style = MaterialTheme.typography.bodySmall)
                Text(lampadaire.description, style = MaterialTheme.typography.bodyLarge)
            }
        }
    }
}
