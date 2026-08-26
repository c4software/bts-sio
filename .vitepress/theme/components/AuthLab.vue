<template>
  <div class="alab">
    <!-- ============================================ STOCKAGE DES MOTS DE PASSE -->
    <template v-if="type === 'hash'">
      <p class="intro">
        Voici la table <code>users</code> telle qu'elle est stockée en base. Changez la méthode de
        stockage, puis cliquez « Simuler une fuite » : vous verrez ce que récupère un attaquant qui
        met la main sur la base.
      </p>
      <div class="mode">
        <label><input type="radio" value="clair" v-model="methode" /> En clair</label>
        <label><input type="radio" value="sha" v-model="methode" /> Haché SHA-256 (rapide, sans sel)</label>
        <label><input type="radio" value="bcrypt" v-model="methode" /> password_hash (bcrypt, lent + salé)</label>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>id</th><th>username</th><th>password (ce qui est stocké)</th></tr></thead>
          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.id }}</td><td>{{ u.username }}</td><td class="mono">{{ stocke[u.username] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="form">
        <button @click="fuite">Simuler une fuite de la base</button>
      </div>
      <div v-if="butin" class="verdict" :class="butin.ok ? 'ok' : 'ko'">
        <p>{{ butin.texte }}</p>
        <ul v-if="butin.lignes.length">
          <li v-for="(l, i) in butin.lignes" :key="i" class="mono">{{ l }}</li>
        </ul>
      </div>
      <p class="hint">
        Le SHA-256 est <strong>rapide</strong> : l'attaquant précalcule les hachés des mots de passe
        courants (« table arc-en-ciel ») et compare. <code>password_hash</code> ajoute un
        <strong>sel</strong> aléatoire et reste <strong>lent</strong> : la table arc-en-ciel ne sert plus à rien.
      </p>
    </template>

    <!-- ============================================ ATTAQUE PAR FORCE BRUTE -->
    <template v-else>
      <p class="intro">
        Un formulaire de connexion. Le compte <code>admin</code> a un mot de passe présent dans un
        dictionnaire d'attaque. Lancez l'attaque, puis activez les protections et relancez pour voir
        la différence.
      </p>
      <div class="protections">
        <strong>Protections côté serveur :</strong>
        <label><input type="checkbox" v-model="limite" /> Bloquer après 5 tentatives</label>
        <label><input type="checkbox" v-model="delai" /> Ajouter un délai entre les essais</label>
      </div>
      <div class="form">
        <button @click="attaquer" :disabled="enCours">{{ enCours ? 'Attaque en cours…' : 'Lancer l\'attaque par dictionnaire' }}</button>
        <button class="secondary" @click="reset" :disabled="enCours">Réinitialiser</button>
      </div>
      <div v-if="log.length" class="console">
        <div v-for="(l, i) in log" :key="i" :class="l.type">{{ l.texte }}</div>
      </div>
      <div v-if="bilan" class="verdict" :class="bilan.ok ? 'ok' : 'bloque'">
        <p>{{ bilan.texte }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

const props = defineProps({ type: { type: String, default: 'hash' } })

/* ---------- Démo : stockage des mots de passe ---------- */
const users = [
  { id: 1, username: 'admin', pass: 'soleil123' },
  { id: 2, username: 'sophie', pass: 'motdepasse' },
  { id: 3, username: 'invite', pass: 'azerty' },
]
const methode = ref('clair')
const stocke = reactive({})
const butin = ref(null)

// Petit dictionnaire (mot -> SHA-256), pour simuler une table arc-en-ciel.
const COURANTS = ['azerty', 'motdepasse', '123456', 'soleil123', 'password', 'admin', 'qwerty']
const rainbow = {}

async function sha256(txt) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Faux hash bcrypt (illustratif) : $2y$10$ + 53 caractères, différent par utilisateur grâce au sel.
function fauxBcrypt(u) {
  const sel = ('AbCdEfGhIjKlMnOpQrStUv' + u.id + u.username).slice(0, 22)
  const corps = btoa(u.username + u.pass + u.id).replace(/[^A-Za-z0-9]/g, 'x').padEnd(31, 'x').slice(0, 31)
  return '$2y$10$' + sel + corps
}

async function refreshStocke() {
  butin.value = null
  for (const u of users) {
    if (methode.value === 'clair') stocke[u.username] = u.pass
    else if (methode.value === 'sha') stocke[u.username] = await sha256(u.pass)
    else stocke[u.username] = fauxBcrypt(u)
  }
}

async function fuite() {
  if (methode.value === 'clair') {
    butin.value = {
      ok: false,
      texte: 'Catastrophe : tous les mots de passe sont lisibles directement. Comptes compromis en une seconde, et les identiques réutilisés ailleurs aussi.',
      lignes: users.map((u) => `${u.username} : ${u.pass}`),
    }
  } else if (methode.value === 'sha') {
    const lignes = []
    for (const u of users) {
      const h = stocke[u.username]
      const trouve = COURANTS.find((c) => rainbow[c] === h)
      lignes.push(`${u.username} : ${trouve ? '❌ CASSÉ → ' + trouve : '… résiste (mot de passe absent du dictionnaire)'}`)
    }
    butin.value = {
      ok: false,
      texte: 'Les mots de passe sont hachés, mais SHA-256 est rapide et sans sel : la table arc-en-ciel casse tous ceux qui sont « courants ».',
      lignes,
    }
  } else {
    butin.value = {
      ok: true,
      texte: 'L\'attaquant ne récupère que des hachés bcrypt, salés et lents à calculer. La table arc-en-ciel est inutile, chaque essai coûte cher. La base résiste.',
      lignes: [],
    }
  }
}

/* ---------- Démo : attaque par force brute ---------- */
const CIBLE = 'soleil123'
const DICTIONNAIRE = ['123456', 'password', 'azerty', 'qwerty', 'admin', 'motdepasse', 'soleil', 'soleil123', 'bonjour', 'root']
const limite = ref(false)
const delai = ref(false)
const enCours = ref(false)
const log = ref([])
const bilan = ref(null)

function wait(ms) { return new Promise((r) => setTimeout(r, ms)) }

async function attaquer() {
  log.value = []
  bilan.value = null
  enCours.value = true
  const debut = Date.now()
  let essais = 0
  let trouve = null
  for (const mdp of DICTIONNAIRE) {
    essais++
    if (limite.value && essais > 5) {
      log.value.push({ type: 'bloque', texte: `Tentative ${essais} : 🔒 compte bloqué (trop de tentatives).` })
      bilan.value = {
        ok: false,
        texte: `Attaque stoppée après 5 tentatives. Sans les 5 essais gratuits, le dictionnaire n'a jamais atteint le bon mot de passe. C'est tout l'intérêt de la limite.`,
      }
      enCours.value = false
      return
    }
    if (delai.value) await wait(400)
    const ok = mdp === CIBLE
    log.value.push({ type: ok ? 'ok' : 'ko', texte: `Tentative ${essais} : "${mdp}" → ${ok ? '✔ CONNECTÉ' : '✗ refusé'}` })
    if (ok) { trouve = mdp; break }
  }
  const secondes = ((Date.now() - debut) / 1000).toFixed(1)
  if (trouve) {
    bilan.value = {
      ok: true,
      texte: delai.value
        ? `Mot de passe trouvé : « ${trouve} », mais il a fallu ${secondes} s pour ${essais} essais. Avec un délai, un vrai dictionnaire de millions de mots devient irréaliste.`
        : `Mot de passe trouvé : « ${trouve} » en ${essais} essais et ${secondes} s. Sans aucune limite, une machine en teste des milliers par seconde.`,
    }
  }
  enCours.value = false
}

function reset() {
  log.value = []
  bilan.value = null
}

watch(methode, refreshStocke)

onMounted(async () => {
  if (props.type === 'hash') {
    for (const c of COURANTS) rainbow[c] = await sha256(c)
    await refreshStocke()
  }
})
</script>

<style scoped>
.alab {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
}
.intro { margin-top: 0; }
.mode { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0.6rem 0; font-size: 0.9em; }
.protections { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin: 0.6rem 0; font-size: 0.9em; }
.protections label { display: inline-flex; gap: 0.3rem; align-items: center; }
.form { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin: 0.6rem 0; }
.table-wrap { overflow-x: auto; margin: 0.6rem 0; }
table { font-size: 0.85em; margin: 0; }
th, td { white-space: nowrap; }
.mono { font-family: var(--vp-font-family-mono); word-break: break-all; white-space: normal; }
button {
  padding: 0.4rem 0.9rem; border-radius: 4px; border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1); color: #fff; cursor: pointer;
}
button.secondary { background: transparent; color: var(--vp-c-brand-1); }
button:disabled { opacity: 0.5; cursor: default; }
.hint { font-size: 0.85em; color: var(--vp-c-text-2); margin: 0.4rem 0 0; }
.console {
  margin-top: 0.6rem; padding: 0.6rem; border-radius: 4px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); font-family: var(--vp-font-family-mono);
  font-size: 0.82em; max-height: 16rem; overflow-y: auto;
}
.console .ok { color: var(--vp-c-success-1); font-weight: 600; }
.console .ko { color: var(--vp-c-text-2); }
.console .bloque { color: var(--vp-c-danger-1); font-weight: 600; }
.verdict { margin-top: 0.6rem; padding: 0.7rem 0.9rem; border-radius: 6px; border-left: 4px solid var(--vp-c-danger-1); background: var(--vp-c-danger-soft); }
.verdict.ok { border-left-color: var(--vp-c-success-1); background: var(--vp-c-success-soft); }
.verdict.bloque { border-left-color: var(--vp-c-success-1); background: var(--vp-c-success-soft); }
.verdict p { margin: 0 0 0.3rem; font-weight: 600; }
.verdict ul { margin: 0.3rem 0 0; padding-left: 1.2rem; }
.verdict li { font-size: 0.85em; }
</style>
