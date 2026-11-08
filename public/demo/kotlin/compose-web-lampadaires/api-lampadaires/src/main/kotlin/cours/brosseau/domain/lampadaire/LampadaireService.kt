package cours.brosseau.domain.lampadaire

import cours.brosseau.common.domain.CreateLampadaireDTO
import cours.brosseau.common.domain.LampadaireDTO
import cours.brosseau.common.domain.StatutLampadaire
import java.time.LocalDate

/**
 * Les règles métier des lampadaires.
 */
class LampadaireService(private val lampadaireDao: LampadaireDao) {

    fun getAll(): List<LampadaireDTO> = lampadaireDao.getAll()

    fun getById(id: Int): LampadaireDTO? = lampadaireDao.getById(id)

    fun create(dto: CreateLampadaireDTO): LampadaireDTO {
        // Un lampadaire doit être identifiable : pas de numéro de série vide
        require(dto.numeroSerie.isNotBlank()) { "Le numéro de série est obligatoire" }

        // Un lampadaire neuf est en service, installé aujourd'hui
        return lampadaireDao.create(dto, StatutLampadaire.EN_SERVICE, LocalDate.now().toString())
    }
}
