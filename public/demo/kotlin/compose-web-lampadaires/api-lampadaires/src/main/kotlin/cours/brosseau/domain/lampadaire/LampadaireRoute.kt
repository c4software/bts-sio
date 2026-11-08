package cours.brosseau.domain.lampadaire

import cours.brosseau.common.domain.CreateLampadaireDTO
import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.route

/**
 * Les routes des lampadaires : elles reçoivent la requête HTTP, appellent le service et répondent.
 */
fun Route.lampadaireRoutes(path: String, lampadaireService: LampadaireService) {
    route(path) {
        // La liste des lampadaires
        get {
            call.respond(lampadaireService.getAll())
        }

        // Un lampadaire, à partir de son id
        get("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull()
            if (id == null) {
                call.respond(HttpStatusCode.BadRequest, "L'id doit être un nombre")
                return@get
            }

            val lampadaire = lampadaireService.getById(id)
            if (lampadaire == null) {
                call.respond(HttpStatusCode.NotFound, "Lampadaire introuvable")
            } else {
                call.respond(lampadaire)
            }
        }

        // Créer un lampadaire
        post {
            val dto = call.receive<CreateLampadaireDTO>()
            try {
                call.respond(HttpStatusCode.Created, lampadaireService.create(dto))
            } catch (e: IllegalArgumentException) {
                call.respond(HttpStatusCode.BadRequest, e.message ?: "Lampadaire invalide")
            }
        }
    }
}
