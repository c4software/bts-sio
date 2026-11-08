package cours.brosseau.lampadaires.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil3.compose.AsyncImage
import cours.brosseau.lampadaires.http.urlImage
import cours.brosseau.lampadaires.model.LampadaireDTO

/** Un lampadaire dans la liste : la photo, le titre, le numéro de série et le statut. */
@Composable
fun LampadaireCard(lampadaire: LampadaireDTO, onClick: () -> Unit) {
    Card(onClick = onClick, modifier = Modifier.fillMaxWidth()) {
        AsyncImage(
            model = urlImage(lampadaire.image),
            contentDescription = lampadaire.titre,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxWidth().aspectRatio(16f / 9f),
        )
        Row(
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column {
                Text(lampadaire.titre, style = MaterialTheme.typography.titleMedium)
                Text(lampadaire.numeroSerie, style = MaterialTheme.typography.bodySmall)
            }
            BadgeStatut(lampadaire.statut)
        }
    }
}
