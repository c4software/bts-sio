package cours.brosseau.database.tables

import cours.brosseau.common.domain.StatutLampadaire
import org.jetbrains.exposed.v1.core.Table

/**
 * La table « lampadaires », décrite en Kotlin.
 */
object Lampadaires : Table("lampadaires") {
    val id = integer("id").autoIncrement()
    val numeroSerie = varchar("numero_serie", 20)
    val titre = varchar("titre", 100)
    val description = text("description")
    val image = varchar("image", 255)
    val statut = enumerationByName("statut", 20, StatutLampadaire::class)
    val dateInstallation = varchar("date_installation", 10)

    override val primaryKey = PrimaryKey(id)
}
