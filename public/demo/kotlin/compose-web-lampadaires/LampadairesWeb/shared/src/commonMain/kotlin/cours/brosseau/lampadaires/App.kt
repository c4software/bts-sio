package cours.brosseau.lampadaires

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import cours.brosseau.lampadaires.ui.LampadairesApp

/**
 * Le point d'entrée commun : le thème, puis la navigation de l'application.
 */
@Composable
fun App() {
    MaterialTheme {
        LampadairesApp()
    }
}
