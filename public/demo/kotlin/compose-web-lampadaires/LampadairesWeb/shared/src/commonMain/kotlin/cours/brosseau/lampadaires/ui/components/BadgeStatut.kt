package cours.brosseau.lampadaires.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import cours.brosseau.lampadaires.model.StatutLampadaire

/** Le statut d'un lampadaire : une pastille colorée et son libellé. */
@Composable
fun BadgeStatut(statut: StatutLampadaire) {
    val (libelle, couleur) = when (statut) {
        StatutLampadaire.EN_SERVICE -> "En service" to Color(0xFF2E7D32)
        StatutLampadaire.EN_PANNE -> "En panne" to Color(0xFFC62828)
        StatutLampadaire.EN_MAINTENANCE -> "En maintenance" to Color(0xFFEF6C00)
    }
    Text(
        text = libelle,
        color = Color.White,
        style = MaterialTheme.typography.labelMedium,
        modifier = Modifier
            .background(couleur, RoundedCornerShape(50))
            .padding(horizontal = 10.dp, vertical = 4.dp),
    )
}
