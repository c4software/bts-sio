package cours.brosseau.lampadaires.ui.creation

import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import coil3.compose.AsyncImage
import cours.brosseau.lampadaires.http.urlImage
import cours.brosseau.lampadaires.model.EcranCreation
import lampadairesweb.shared.generated.resources.Res
import lampadairesweb.shared.generated.resources.ic_arrow_back
import org.jetbrains.compose.resources.painterResource

/** Les photos disponibles sur le serveur (dossier src/main/resources/images). */
private val PHOTOS = (1..6).map { "/images/lampadaire-$it.jpg" }

/**
 * L'écran de création : un formulaire, puis un POST vers l'API.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreationScreen(onRetour: () -> Unit, viewModel: CreationViewModel = viewModel { CreationViewModel() }) {
    val ecran by viewModel.ecran.collectAsStateWithLifecycle()

    // Les champs du formulaire (rememberSaveable : ils survivent à une rotation de l'écran)
    var numeroSerie by rememberSaveable { mutableStateOf("") }
    var titre by rememberSaveable { mutableStateOf("") }
    var description by rememberSaveable { mutableStateOf("") }
    var image by rememberSaveable { mutableStateOf(PHOTOS.first()) }

    // Une fois le lampadaire créé, on revient à la liste
    if (ecran == EcranCreation.Cree) {
        LaunchedEffect(Unit) { onRetour() }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Nouveau lampadaire") },
                navigationIcon = {
                    IconButton(onClick = onRetour) {
                        Icon(painterResource(Res.drawable.ic_arrow_back), contentDescription = "Retour")
                    }
                },
            )
        },
    ) { padding ->
        Column(
            modifier = Modifier.padding(padding).padding(16.dp).verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            OutlinedTextField(numeroSerie, { numeroSerie = it }, label = { Text("Numéro de série") }, singleLine = true, modifier = Modifier.fillMaxWidth())
            OutlinedTextField(titre, { titre = it }, label = { Text("Titre") }, singleLine = true, modifier = Modifier.fillMaxWidth())
            OutlinedTextField(description, { description = it }, label = { Text("Description") }, minLines = 3, modifier = Modifier.fillMaxWidth())

            // Le choix de la photo, parmi celles disponibles sur le serveur
            Text("Photo", style = MaterialTheme.typography.titleSmall)
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(PHOTOS) { photo ->
                    AsyncImage(
                        model = urlImage(photo),
                        contentDescription = photo,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier
                            .size(96.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .border(
                                width = 3.dp,
                                color = if (photo == image) MaterialTheme.colorScheme.primary else Color.Transparent,
                                shape = RoundedCornerShape(8.dp),
                            )
                            .clickable { image = photo },
                    )
                }
            }

            val erreur = ecran as? EcranCreation.Erreur
            if (erreur != null) {
                Text(erreur.message, color = MaterialTheme.colorScheme.error)
            }

            Button(
                onClick = { viewModel.creer(numeroSerie, titre, description, image) },
                enabled = ecran != EcranCreation.Envoi,
                modifier = Modifier.fillMaxWidth(),
            ) {
                Text(if (ecran == EcranCreation.Envoi) "Envoi en cours…" else "Créer le lampadaire")
            }
        }
    }
}
