<template>
  <LabFrame class="alab" :disabled="enCours" @reset="recommencer">
    <!-- ============================================ STOCKAGE DES MOTS DE PASSE -->
    <template v-if="type === 'hash'">
      <p class="intro">
        Voici la table <code>users</code> telle qu'elle est stockée en base. Changez la méthode de
        stockage, puis cliquez « Simuler une fuite » : vous verrez ce que récupère un attaquant qui
        met la main sur la base.
      </p>
      <LabModes v-model="methode" :options="METHODES" />
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
      <LabVerdict :verdict="butin" />
      <p class="hint">
        Le SHA-256 est <strong>rapide</strong> : l'attaquant précalcule les hachés des mots de passe
        courants (« table arc-en-ciel ») et compare. <code>password_hash</code> ajoute un
        <strong>sel</strong> aléatoire et reste <strong>lent</strong> : la table arc-en-ciel ne sert plus à rien.
      </p>
    </template>

    <!-- ============================================ CSRF -->
    <template v-else-if="type === 'csrf'">
      <p class="intro">
        L'administrateur est connecté à <code>votre-site</code> : son navigateur garde le cookie de
        session et le joint <strong>automatiquement</strong> à chaque requête vers ce site. Supprimez
        un utilisateur normalement, puis faites ouvrir à l'admin l'email piégé ou le site piégé.
        Changez ensuite la version de <code>admin.php</code> et recommencez.
      </p>
      <LabModes v-model="csrfMode" :options="CSRF_MODES" />
      <div class="protections">
        <label><input type="checkbox" v-model="sameSite" /> Cookie de session <code>SameSite=Strict</code> (voir « Pour finir »)</label>
      </div>
      <div class="ecrans">
        <div class="ecran">
          <div class="ecran-barre">votre-site/admin.php · connecté en tant qu'admin</div>
          <ul class="liste">
            <li v-for="u in csrfUsers" :key="u.id" :class="{ supprime: u.supprime }">
              Utilisateur {{ u.id }}
              <span v-if="u.supprime" class="etat">supprimé</span>
              <button v-else class="link" @click="csrfLegitime(u.id)">Supprimer</button>
            </li>
          </ul>
          <p v-if="csrfMode === 'jeton'" class="hint jeton">
            Jeton caché dans chaque formulaire : <span class="mono">{{ court(sessionToken) }}</span>
          </p>
        </div>
        <div class="ecran">
          <div class="ecran-barre">Pièges préparés par l'attaquant</div>
          <div class="pieges">
            <button @click="csrfPiege('email')">Ouvrir l'email piégé</button>
            <button @click="csrfPiege('site')">Visiter le site piégé</button>
          </div>
        </div>
      </div>
      <LabCode :label="piege.label" :code="piege.code" />
      <LabCode label="Requête reçue par votre-site (cookies compris)" :code="csrfRequete" />
      <LabCode label="Ce que fait admin.php" :code="csrfServeur" />
      <p class="hint note">
        Hypothèse de la démo : <code>admin.php</code> vérifie aussi que la session appartient à un
        administrateur connecté (le contrôle d'accès du TP 3). C'est ce qui fait échouer la requête
        quand le cookie n'est pas joint, avec <code>SameSite=Strict</code>.
      </p>
      <LabVerdict :verdict="csrfVerdict" />
    </template>

    <!-- ============================================ DOUBLE AUTHENTIFICATION (TOTP) -->
    <template v-else-if="type === 'totp'">
      <p class="intro">
        Le mot de passe de <code>admin</code> a fuité. Vous jouez l'attaquant : connectez-vous avec.
        Passez ensuite sur la version avec 2FA et réessayez. Le téléphone de l'admin est affiché à
        droite pour comparer, mais l'attaquant, lui, ne l'a pas.
      </p>
      <LabModes v-model="totpMode" :options="TOTP_MODES" />
      <div class="ecrans">
        <div class="ecran">
          <div class="ecran-barre">votre-site{{ totpUrl }}</div>
          <div class="ecran-corps">
            <template v-if="etape === 'login'">
              <div class="form">
                <label>username <input v-model="login" placeholder="Username" /></label>
                <label>password <input v-model="motDePasse" type="password" placeholder="Password" /></label>
                <button @click="connexion(false)">Login</button>
              </div>
              <p class="exemples">
                Mot de passe volé :
                <button class="link" @click="motDePasse = 'soleil123'"><code>soleil123</code></button>
              </p>
            </template>
            <template v-else-if="etape === '2fa'">
              <p class="hint">Mot de passe accepté. Saisissez le code à 6 chiffres de votre application.</p>
              <div class="form">
                <label>code <input v-model="code" maxlength="6" inputmode="numeric" placeholder="000000" /></label>
                <button @click="connexion(true)">Valider</button>
              </div>
              <p class="exemples">
                Essayer :
                <button class="link" @click="code = codeHasard()">un code au hasard</button> ·
                <button class="link" @click="code = codeIntercepte">un code intercepté il y a 2 minutes</button> ·
                <button class="link" @click="code = codeTelephone">le code du téléphone (vous êtes l'admin)</button>
              </p>
            </template>
            <template v-else>
              <p class="dashboard"><strong>Dashboard</strong> · Bienvenue, admin.</p>
              <button class="secondary" @click="deconnexion">Se déconnecter</button>
            </template>
          </div>
        </div>
        <div class="ecran">
          <div class="ecran-barre">Téléphone de l'admin (application d'authentification)</div>
          <div class="ecran-corps telephone">
            <div class="code-totp">{{ codeTelephone.slice(0, 3) }} {{ codeTelephone.slice(3) }}</div>
            <div class="jauge"><span :style="{ width: (restant / 30 * 100) + '%' }"></span></div>
            <p class="hint">
              Nouveau code dans {{ restant }} s. Calculé à partir de l'heure et d'un secret partagé
              avec le serveur lors de l'activation (QR code) :
              <span class="mono secret">{{ secretAffiche }}</span>
            </p>
          </div>
        </div>
      </div>
      <LabCode label="Requête reçue par votre-site" :code="totpRequete" />
      <LabCode label="Ce que fait le serveur" :code="totpServeur" />
      <p class="hint note">
        Hypothèse de la démo : <code>isCodeValid</code> se comporte comme une librairie TOTP classique.
        Elle accepte aussi le code des 30 secondes précédentes (décalage d'horloge) et refuse un code
        déjà utilisé. Le TP ne détaille pas la classe <code>TwoFactorAuth</code> fournie.
      </p>
      <LabVerdict :verdict="totpVerdict" />
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
      </div>
      <div v-if="log.length" class="console">
        <div v-for="(l, i) in log" :key="i" :class="l.type">{{ l.texte }}</div>
      </div>
      <LabVerdict :verdict="bilan" />
    </template>
  </LabFrame>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import LabFrame from './lab/LabFrame.vue'
import LabModes from './lab/LabModes.vue'
import LabVerdict from './lab/LabVerdict.vue'
import LabCode from './lab/LabCode.vue'

const props = defineProps({ type: { type: String, default: 'hash' } })

/* ---------- Démo : stockage des mots de passe ---------- */
const users = [
  { id: 1, username: 'admin', pass: 'soleil123' },
  { id: 2, username: 'sophie', pass: 'motdepasse' },
  { id: 3, username: 'invite', pass: 'azerty' },
]
const METHODES = [
  { value: 'clair', label: 'En clair' },
  { value: 'sha', label: 'Haché SHA-256 (rapide, sans sel)' },
  { value: 'bcrypt', label: 'password_hash (bcrypt, lent + salé)' },
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
      ok: true,
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
      ok: true,
      texte: 'Les mots de passe sont hachés, mais SHA-256 est rapide et sans sel : la table arc-en-ciel casse tous ceux qui sont « courants ».',
      lignes,
    }
  } else {
    butin.value = {
      ok: false,
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

/* ---------- Démo : CSRF (exercice 3, admin.php) ---------- */
const CSRF_MODES = [
  { value: 'vulnerable', label: 'Version vulnérable (suppression en GET)' },
  { value: 'post', label: 'POST seul, sans jeton' },
  { value: 'jeton', label: 'POST + jeton (solution)' },
]
const csrfMode = ref('vulnerable')
const sameSite = ref(false)
const csrfUsers = ref([])
const sessionId = ref('')
const sessionToken = ref('')
const piege = ref({ label: '', code: '' })
const csrfRequete = ref('')
const csrfServeur = ref('')
const csrfVerdict = ref(null)

// Équivalent de bin2hex(random_bytes(n)).
function aleaHex(n) {
  return Array.from(crypto.getRandomValues(new Uint8Array(n))).map((b) => b.toString(16).padStart(2, '0')).join('')
}
const court = (h) => h.slice(0, 12) + '…'

const PIEGES = {
  email: {
    label: 'Email reçu par l\'admin (affiché par son webmail)',
    code: '<p>Bonjour, vous trouverez ci-joint la facture du mois.</p>\n<img src="http://votre-site/admin.php?id=1">',
  },
  site: {
    label: 'Page du site piégé (http://gagner-un-iphone.example)',
    code: '<h1>Bravo, vous avez gagné !</h1>\n<form id="f" action="http://votre-site/admin.php" method="post">\n    <input type="hidden" name="id" value="2">\n</form>\n<script>document.getElementById(\'f\').submit();<\/script>',
  },
}

function csrfInit() {
  csrfUsers.value = [1, 2, 3].map((id) => ({ id, supprime: false }))
  sessionId.value = aleaHex(13)
  sessionToken.value = aleaHex(32)
  piege.value = { label: '', code: '' }
  csrfRequete.value = ''
  csrfServeur.value = ''
  csrfVerdict.value = null
}

// L'admin clique lui-même sur « Supprimer » dans admin.php.
function csrfLegitime(id) {
  piege.value = { label: '', code: '' }
  if (csrfMode.value === 'vulnerable') csrfTraiter({ origine: 'legitime', methode: 'GET', id })
  else csrfTraiter({ origine: 'legitime', methode: 'POST', id, token: csrfMode.value === 'jeton' ? sessionToken.value : null })
}

// L'admin ouvre l'email (image => GET) ou visite le site piégé (formulaire POST sans jeton).
function csrfPiege(quel) {
  piege.value = PIEGES[quel]
  if (quel === 'email') csrfTraiter({ origine: 'email', methode: 'GET', id: 1 })
  else csrfTraiter({ origine: 'site', methode: 'POST', id: 2, token: null })
}

function csrfTraiter({ origine, methode, id, token }) {
  const autreSite = origine !== 'legitime'
  const cookieEnvoye = !(sameSite.value && autreSite)

  // Requête HTTP telle que le serveur la reçoit.
  const req = []
  req.push(methode === 'GET' ? `GET /admin.php?id=${id} HTTP/1.1` : 'POST /admin.php HTTP/1.1')
  req.push('Host: votre-site')
  if (origine === 'site') req.push('Origin: http://gagner-un-iphone.example')
  req.push(cookieEnvoye
    ? `Cookie: PHPSESSID=${sessionId.value}`
    : '(aucun cookie : SameSite=Strict, la requête part d\'un autre site)')
  if (methode === 'POST') {
    req.push('Content-Type: application/x-www-form-urlencoded', '')
    req.push(token ? `id=${id}&token=${court(token)}` : `id=${id}`)
  }
  csrfRequete.value = req.join('\n')

  const srv = []
  let supprime = false
  let raison = ''
  if (!cookieEnvoye) {
    srv.push('session_start() : aucun cookie reçu, session vide')
    srv.push('→ l\'admin n\'est pas reconnu, accès refusé (contrôle d\'accès du TP 3)')
    raison = 'samesite'
  } else {
    srv.push('session_start() : session de l\'admin retrouvée grâce au cookie')
    if (csrfMode.value === 'vulnerable') {
      if (methode === 'GET') {
        srv.push(`isset($_GET['id']) → true`)
        supprime = true
      } else {
        srv.push(`isset($_GET['id']) → false (l'id est dans le corps POST)`, '→ rien n\'est supprimé')
        raison = 'rate'
      }
    } else if (methode !== 'POST') {
      srv.push(`$_SERVER['REQUEST_METHOD'] === 'POST' → false`, '→ la page s\'affiche, rien n\'est supprimé')
      raison = 'get'
    } else {
      srv.push(`$_SERVER['REQUEST_METHOD'] === 'POST' → true`)
      if (csrfMode.value === 'post') supprime = true
      else if (!token) {
        srv.push(`isset($_POST['token']) → false`, 'die("Requête invalide.");')
        raison = 'jeton'
      } else {
        srv.push(`$_POST['token'] !== $_SESSION['token'] → false (jeton correct)`)
        supprime = true
      }
    }
  }
  const u = csrfUsers.value.find((x) => x.id === id)
  if (supprime) {
    srv.push(`DELETE FROM users WHERE id = ?  [${id}]` + (u.supprime ? '  (déjà supprimé, 0 ligne)' : '  → 1 ligne supprimée'))
    u.supprime = true
  }
  if (csrfMode.value === 'jeton' && cookieEnvoye && raison !== 'jeton') {
    sessionToken.value = aleaHex(32)
    srv.push(`$_SESSION['token'] = bin2hex(random_bytes(32)) → nouveau jeton ${court(sessionToken.value)}`)
  }
  csrfServeur.value = srv.join('\n')

  if (origine === 'legitime') {
    csrfVerdict.value = {
      ton: 'info',
      texte: csrfMode.value === 'jeton'
        ? `Suppression légitime : le formulaire de admin.php contenait le bon jeton. La protection ne gêne pas l'admin.`
        : `Suppression légitime : c'est l'admin qui a cliqué. Le serveur ne voit aucune différence avec une requête forgée, c'est tout le problème.`,
    }
  } else if (supprime) {
    csrfVerdict.value = {
      ok: true,
      texte: `L'utilisateur ${id} a été supprimé à l'insu de l'admin. Son navigateur a joint le cookie de session tout seul : pour le serveur, c'est l'admin qui l'a demandé.`,
    }
  } else if (raison === 'samesite') {
    csrfVerdict.value = {
      ok: false,
      texte: 'Attaque bloquée par le navigateur : avec SameSite=Strict, le cookie n\'est pas joint à une requête venue d\'un autre site. Pour votre-site, c\'est un visiteur anonyme.',
    }
  } else if (raison === 'rate') {
    csrfVerdict.value = {
      ton: 'warn',
      texte: 'Ce piège-là tombe à plat : le code vulnérable lit $_GET[\'id\'], ce formulaire l\'envoie en POST. La page reste vulnérable : l\'email piégé, lui, fonctionne.',
    }
  } else if (raison === 'get') {
    csrfVerdict.value = {
      ok: false,
      texte: csrfMode.value === 'post'
        ? 'L\'image déclenche un GET : la page ne supprime plus rien en GET. Mais le POST seul ne suffit pas, essayez le site piégé.'
        : 'L\'image déclenche un GET : la page ne supprime plus rien en GET.',
    }
  } else {
    csrfVerdict.value = {
      ok: false,
      texte: '« Requête invalide. » Le site piégé ne connaît pas le jeton : il est rangé dans la session de l\'admin et n\'apparaît que dans les pages de votre-site.',
    }
  }
}

/* ---------- Démo : double authentification (exercice 4, TOTP) ---------- */
const TOTP_MODES = [
  { value: 'sans', label: 'Code actuel (mot de passe seul)' },
  { value: 'avec', label: 'Avec 2FA (solution)' },
]
const totpMode = ref('sans')
const etape = ref('login') // login | 2fa | dashboard
const login = ref('admin')
const motDePasse = ref('')
const code = ref('')
const totpRequete = ref('')
const totpServeur = ref('')
const totpVerdict = ref(null)
const maintenant = ref(Date.now())
const secret = ref(new Uint8Array(20))
const codeTelephone = ref('------')
const codeIntercepte = ref('')
const compteursUtilises = new Set()
let cleHmac = null
let minuterie = null

const compteur = computed(() => Math.floor(maintenant.value / 1000 / 30))
const restant = computed(() => 30 - (Math.floor(maintenant.value / 1000) % 30))
const totpUrl = computed(() => ({ login: '/login', '2fa': '/login?step=2fa', dashboard: '/dashboard' })[etape.value])

// Base32 (RFC 4648), le format des secrets affichés sous les QR codes.
function base32(octets) {
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let bits = '', out = ''
  for (const o of octets) bits += o.toString(2).padStart(8, '0')
  for (let i = 0; i + 5 <= bits.length; i += 5) out += A[parseInt(bits.slice(i, i + 5), 2)]
  return out
}
const secretAffiche = computed(() => base32(secret.value).match(/.{1,4}/g).join(' '))

// TOTP (RFC 6238) : HMAC-SHA1(secret, compteur de pas de 30 s), troncature dynamique, 6 chiffres.
async function totp(c) {
  const msg = new DataView(new ArrayBuffer(8))
  msg.setUint32(0, Math.floor(c / 2 ** 32))
  msg.setUint32(4, c >>> 0)
  const h = new Uint8Array(await crypto.subtle.sign('HMAC', cleHmac, msg.buffer))
  const o = h[19] & 0x0f
  const n = ((h[o] & 0x7f) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3]
  return String(n % 1000000).padStart(6, '0')
}

async function nouveauSecret() {
  secret.value = crypto.getRandomValues(new Uint8Array(20))
  cleHmac = await crypto.subtle.importKey('raw', secret.value, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign'])
  await majTelephone()
}

let dernierCompteur = -1
async function majTelephone(force = true) {
  if (!cleHmac) return
  const c = compteur.value
  if (!force && c === dernierCompteur) return
  dernierCompteur = c
  codeTelephone.value = await totp(c)
  codeIntercepte.value = await totp(c - 4)
}

function codeHasard() {
  return String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0')
}

// Rejoue le code PHP du TP : User::findByLogin, puis (version 2FA) $doubleAuth->isCodeValid($code).
async function connexion(avecCode) {
  const champs = [`username=${login.value}`, `password=${motDePasse.value}`]
  if (avecCode) champs.push(`code=${code.value}`)
  totpRequete.value = `POST /login HTTP/1.1\nHost: votre-site\nContent-Type: application/x-www-form-urlencoded\n\n${champs.join('&')}`

  const srv = []
  const trouve = login.value === 'admin' && motDePasse.value === 'soleil123'
  srv.push(`$user = User::findByLogin('${login.value}', '${motDePasse.value}') → ${trouve ? 'utilisateur trouvé' : 'false'}`)
  if (!trouve) {
    srv.push(`→ header('Location: /login')`)
    totpServeur.value = srv.join('\n')
    etape.value = 'login'
    totpVerdict.value = { ok: false, texte: 'Mot de passe incorrect : retour au formulaire. Utilisez le mot de passe volé.' }
    return
  }
  if (totpMode.value === 'sans') {
    srv.push(`if ($user) → header('Location: /dashboard')`)
    totpServeur.value = srv.join('\n')
    etape.value = 'dashboard'
    totpVerdict.value = {
      ok: true,
      texte: 'L\'attaquant est sur le dashboard de l\'admin avec le seul mot de passe volé. Rien d\'autre ne lui a été demandé.',
    }
    return
  }
  srv.push('$doubleAuth = new TwoFactorAuth("Mon application");', '$doubleAuth->setUser($user);')
  if (!avecCode) {
    srv.push(`$code = $_POST['code'] ?? null → null`, `→ header('Location: /login?step=2fa')`)
    totpServeur.value = srv.join('\n')
    code.value = ''
    etape.value = '2fa'
    totpVerdict.value = null
    return
  }
  maintenant.value = Date.now()
  const c = compteur.value
  const attendu = await totp(c)
  const precedent = await totp(c - 1)
  const saisi = code.value.trim()
  let pas = null
  if (saisi === attendu) pas = c
  else if (saisi === precedent) pas = c - 1
  const dejaUtilise = pas !== null && compteursUtilises.has(pas)
  const valide = pas !== null && !dejaUtilise
  srv.push(`$code = $_POST['code'] → '${saisi}'`)
  srv.push(`$doubleAuth->isCodeValid('${saisi}')`)
  srv.push(`    compteur = floor(time() / 30) = ${c}`)
  srv.push(`    code attendu (compteur)     = ${attendu}`)
  srv.push(`    code attendu (compteur - 1) = ${precedent}   (tolérance de 30 s)`)
  if (dejaUtilise) srv.push('    code déjà utilisé : refusé (usage unique)')
  srv.push(`    → ${valide ? 'true' : 'false'}`)
  if (valide) {
    compteursUtilises.add(pas)
    srv.push('session_regenerate_id(true); $_SESSION[\'user\'] = $user->id;', `→ header('Location: /dashboard')`)
    etape.value = 'dashboard'
    totpVerdict.value = {
      ton: 'info',
      texte: 'Connexion réussie avec les deux facteurs : le mot de passe et le code du téléphone. Déconnectez-vous et renvoyez le même code : il sera refusé.',
    }
  } else {
    srv.push(`→ header('Location: /login?step=2fa')`)
    etape.value = '2fa'
    totpVerdict.value = {
      ok: false,
      texte: dejaUtilise
        ? 'Code refusé : il a déjà servi. Un code intercepté après usage ne vaut plus rien.'
        : 'Code refusé : l\'attaquant a le mot de passe mais pas le téléphone. Au hasard, il a une chance sur un million par essai, et la limite de tentatives de l\'exercice 2 s\'applique aussi ici. Un vieux code intercepté a expiré.',
    }
  }
  totpServeur.value = srv.join('\n')
}

function deconnexion() {
  etape.value = 'login'
  motDePasse.value = ''
  code.value = ''
  totpRequete.value = ''
  totpServeur.value = ''
  totpVerdict.value = null
}

// Changer de version du code remet le formulaire au départ.
watch(totpMode, deconnexion)

// Remet l'exercice dans son état de départ (méthode de stockage, protections, résultats).
async function recommencer() {
  log.value = []
  bilan.value = null
  limite.value = false
  delai.value = false
  butin.value = null
  if (props.type === 'hash') {
    if (methode.value === 'clair') await refreshStocke()
    else methode.value = 'clair'
  }
  if (props.type === 'csrf') {
    csrfMode.value = 'vulnerable'
    sameSite.value = false
    csrfInit()
  }
  if (props.type === 'totp') {
    totpMode.value = 'sans'
    login.value = 'admin'
    deconnexion()
    compteursUtilises.clear()
    await nouveauSecret()
  }
}

watch(methode, refreshStocke)
// Changer de version ou de cookie efface le dernier résultat (la base garde son état).
watch([csrfMode, sameSite], () => {
  piege.value = { label: '', code: '' }
  csrfRequete.value = ''
  csrfServeur.value = ''
  csrfVerdict.value = null
})

onMounted(async () => {
  if (props.type === 'hash') {
    for (const c of COURANTS) rainbow[c] = await sha256(c)
    await refreshStocke()
  }
  if (props.type === 'csrf') csrfInit()
  if (props.type === 'totp') {
    await nouveauSecret()
    minuterie = setInterval(() => {
      maintenant.value = Date.now()
      majTelephone(false)
    }, 1000)
  }
})

onBeforeUnmount(() => clearInterval(minuterie))
</script>

<style scoped>
.protections { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; margin: 0.6rem 0; font-size: 0.9em; }
.protections label { display: inline-flex; gap: 0.3rem; align-items: center; }
table { font-size: 0.85em; margin: 0; }
th, td { white-space: nowrap; }
td.mono { white-space: normal; }
.hint { margin: 0.4rem 0 0; }
.note { margin-top: 0.6rem; font-style: italic; }
.console {
  margin-top: 0.6rem; padding: 0.6rem; border-radius: 4px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); font-family: var(--vp-font-family-mono);
  font-size: 0.82em; max-height: 16rem; overflow-y: auto;
}
.console .ok { color: var(--vp-c-success-1); font-weight: 600; }
.console .ko { color: var(--vp-c-text-2); }
.console .bloque { color: var(--vp-c-danger-1); font-weight: 600; }
.ecrans { display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 0.8rem; margin: 0.6rem 0; }
.ecran { border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden; background: var(--vp-c-bg); }
.ecran-barre {
  padding: 0.3rem 0.6rem; font-size: 0.8em; color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider);
}
.ecran-corps { padding: 0.4rem 0.8rem 0.8rem; }
.liste { margin: 0.4rem 0; padding: 0 0.8rem 0 2rem; }
.liste li { margin: 0.2rem 0; }
.liste .supprime { color: var(--vp-c-text-3); text-decoration: line-through; }
.liste .etat { font-size: 0.8em; color: var(--vp-c-danger-1); text-decoration: none; display: inline-block; margin-left: 0.3rem; }
.jeton { padding: 0 0.8rem 0.4rem; }
.pieges { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.8rem; }
.dashboard { margin: 0.6rem 0; }
.telephone { text-align: center; }
.code-totp { font-family: var(--vp-font-family-mono); font-size: 2em; font-weight: 700; letter-spacing: 0.08em; margin: 0.4rem 0; }
.jauge { height: 6px; border-radius: 3px; background: var(--vp-c-divider); overflow: hidden; }
.jauge span { display: block; height: 100%; background: var(--vp-c-brand-1); }
.telephone .hint { text-align: left; }
.secret { display: block; word-break: normal; }
</style>
