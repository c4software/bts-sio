package cours.brosseau.domain.lampadaire

import cours.brosseau.common.domain.CreateLampadaireDTO
import cours.brosseau.common.domain.LampadaireDTO
import cours.brosseau.common.domain.StatutLampadaire
import cours.brosseau.database.tables.Lampadaires
import org.jetbrains.exposed.v1.core.ResultRow
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

/**
 * Les requêtes sur la table des lampadaires.
 */
interface LampadaireDao {
    fun getAll(): List<LampadaireDTO>
    fun getById(id: Int): LampadaireDTO?
    fun create(dto: CreateLampadaireDTO, statut: StatutLampadaire, dateInstallation: String): LampadaireDTO
}

/**
 * L'implémentation avec Exposed (la base SQLite).
 */
class ExposedLampadaireDao : LampadaireDao {

    override fun getAll(): List<LampadaireDTO> = transaction {
        Lampadaires.selectAll().map { it.toLampadaireDTO() }
    }

    override fun getById(id: Int): LampadaireDTO? = transaction {
        Lampadaires.selectAll()
            .where { Lampadaires.id eq id }
            .map { it.toLampadaireDTO() }
            .singleOrNull()
    }

    override fun create(dto: CreateLampadaireDTO, statut: StatutLampadaire, dateInstallation: String): LampadaireDTO = transaction {
        val id = Lampadaires.insert {
            it[numeroSerie] = dto.numeroSerie
            it[titre] = dto.titre
            it[description] = dto.description
            it[image] = dto.image
            it[Lampadaires.statut] = statut
            it[Lampadaires.dateInstallation] = dateInstallation
        } get Lampadaires.id

        Lampadaires.selectAll()
            .where { Lampadaires.id eq id }
            .map { it.toLampadaireDTO() }
            .single()
    }

    /**
     * Transforme une ligne de la table en objet LampadaireDTO.
     */
    private fun ResultRow.toLampadaireDTO() = LampadaireDTO(
        id = this[Lampadaires.id],
        numeroSerie = this[Lampadaires.numeroSerie],
        titre = this[Lampadaires.titre],
        description = this[Lampadaires.description],
        image = this[Lampadaires.image],
        statut = this[Lampadaires.statut],
        dateInstallation = this[Lampadaires.dateInstallation],
    )
}
