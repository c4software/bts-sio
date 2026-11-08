package cours.brosseau.lampadaires.ui

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.toRoute
import cours.brosseau.lampadaires.ui.creation.CreationScreen
import cours.brosseau.lampadaires.ui.detail.DetailScreen
import cours.brosseau.lampadaires.ui.liste.ListeScreen
import kotlinx.serialization.Serializable

/** Les destinations de l'application : chaque écran est décrit par un objet. */
@Serializable
data object Liste

@Serializable
data class Detail(val id: Int)

@Serializable
data object Creation

/**
 * La navigation de l'application : la liste, le détail d'un lampadaire, la création.
 */
@Composable
fun LampadairesApp() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = Liste) {
        composable<Liste> {
            ListeScreen(
                onLampadaireClick = { id -> navController.navigate(Detail(id)) },
                onAjouterClick = { navController.navigate(Creation) },
            )
        }
        composable<Detail> { entry ->
            DetailScreen(
                id = entry.toRoute<Detail>().id,
                onRetour = { navController.navigateUp() },
            )
        }
        composable<Creation> {
            CreationScreen(onRetour = { navController.navigateUp() })
        }
    }
}
