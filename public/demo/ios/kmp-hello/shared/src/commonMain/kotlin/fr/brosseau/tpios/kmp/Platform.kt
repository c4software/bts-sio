package fr.brosseau.tpios.kmp

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform