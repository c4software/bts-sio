package cours.brosseau.lampadaires.http

import cours.brosseau.lampadaires.model.CreateLampadaireDTO
import cours.brosseau.lampadaires.model.LampadaireDTO
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType

/**
 * Les routes de notre API Ktor.
 *
 * @param baseUrl l'adresse du serveur, définie dans Config.kt (API_URL)
 */
class LampadairesApi(private val client: HttpClient, private val baseUrl: String) {

    /** GET /v1/lampadaires : la liste complète. */
    suspend fun lampadaires(): List<LampadaireDTO> = client.get("$baseUrl/v1/lampadaires").body()

    /** GET /v1/lampadaires/{id} : un seul lampadaire. */
    suspend fun lampadaire(id: Int): LampadaireDTO = client.get("$baseUrl/v1/lampadaires/$id").body()

    /** POST /v1/lampadaires : crée un lampadaire et renvoie celui enregistré par le serveur. */
    suspend fun creer(nouveau: CreateLampadaireDTO): LampadaireDTO =
        client.post("$baseUrl/v1/lampadaires") {
            contentType(ContentType.Application.Json)
            setBody(nouveau)
        }.body()

    companion object {
        /** Une seule instance pour toute l'application, partagée par les ViewModels. */
        val instance = LampadairesApi(createHttpClient(), API_URL)
    }
}

/**
 * L'adresse complète d'une photo : le serveur renvoie un chemin (/images/lampadaire-1.jpg), il faut y ajouter son adresse.
 */
fun urlImage(chemin: String): String = API_URL + chemin
