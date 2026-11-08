package cours.brosseau.plugins

import cours.brosseau.database.LampadairesDatabase
import io.ktor.server.application.Application

fun Application.databaseConnect() {
    LampadairesDatabase.connect()
}
