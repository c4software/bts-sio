package cours.brosseau

import cours.brosseau.domain.lampadaire.ExposedLampadaireDao
import cours.brosseau.domain.lampadaire.LampadaireService
import cours.brosseau.domain.lampadaire.lampadaireRoutes
import cours.brosseau.plugins.databaseConnect
import cours.brosseau.plugins.installCors
import cours.brosseau.plugins.installSerialization
import io.ktor.server.application.Application
import io.ktor.server.http.content.staticResources
import io.ktor.server.netty.EngineMain
import io.ktor.server.response.respondText
import io.ktor.server.routing.get
import io.ktor.server.routing.route
import io.ktor.server.routing.routing

fun main(args: Array<String>): Unit = EngineMain.main(args)

/**
 * Le point d'entrée de l'application : chaque brique est installée par sa propre fonction.
 */
fun Application.module() {
    databaseConnect()
    installCors()
    installSerialization()
    installRouter()
}

fun Application.installRouter() {
    // Les objets de l'application, créés une seule fois et reliés entre eux
    val lampadaireService = LampadaireService(ExposedLampadaireDao())

    routing {
        get("/") {
            call.respondText("L'API Lampadaires fonctionne !")
        }

        // Les photos des lampadaires : les fichiers du dossier src/main/resources/images
        staticResources("/images", "images")

        // Les routes de l'API, toutes préfixées par la version
        route("/v1") {
            lampadaireRoutes("/lampadaires", lampadaireService)
        }
    }
}
