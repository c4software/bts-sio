package cours.brosseau.lampadaires.http

import io.ktor.client.HttpClient
import io.ktor.client.plugins.HttpTimeout
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json

/**
 * Le client HTTP de l'application. Pas de moteur précisé : Ktor prend celui du navigateur (ktor-client-js).
 */
fun createHttpClient(): HttpClient = HttpClient {
    // Une réponse 4xx ou 5xx (404, 400…) lève une exception, au lieu d'être lue comme un JSON valide
    expectSuccess = true

    // Les réponses JSON deviennent directement des objets Kotlin (et inversement)
    install(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true })
    }

    // Un serveur injoignable ne doit pas bloquer l'écran trop longtemps
    install(HttpTimeout) {
        requestTimeoutMillis = 5_000
    }
}
