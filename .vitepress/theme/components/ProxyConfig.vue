<template>
  <div class="pc">
    <div class="pc-form">
      <fieldset>
        <legend>Les fournisseurs</legend>
        <label v-for="f in FOURNISSEURS" :key="f.id" class="pc-check">
          <input type="checkbox" v-model="choix.fournisseurs" :value="f.id" />
          <span><strong>{{ f.nom }}</strong> <small>{{ f.note }}</small></span>
        </label>
      </fieldset>

      <fieldset>
        <legend>Les options</legend>
        <label class="pc-check">
          <input type="checkbox" v-model="choix.binome" />
          <span>Une deuxième clé, pour un binôme</span>
        </label>
        <label class="pc-check">
          <input type="checkbox" v-model="choix.chat" />
          <span>Le chat du tableau de bord <small>(dépense des tokens)</small></span>
        </label>
        <label class="pc-check">
          <input type="checkbox" v-model="choix.autres" />
          <span>Claude Code et Codex <small>(surfaces Anthropic et Responses)</small></span>
        </label>
        <label class="pc-ligne">
          <span>Partage équitable, tokens par heure et par clé <small>(0 = aucune limite)</small></span>
          <input type="number" min="0" step="10000" v-model.number="choix.partage" />
        </label>
        <label class="pc-ligne">
          <span>Modèle par défaut</span>
          <select v-model="choix.modele" :disabled="!modeles.length">
            <option v-for="m in modeles" :key="m.id" :value="m.id">{{ m.id }}</option>
          </select>
        </label>
      </fieldset>
    </div>

    <p v-if="!modeles.length" class="pc-alerte">Choisissez au moins un fournisseur.</p>

    <template v-else>
      <p class="pc-note">
        Les clés du proxy sont tirées au hasard <strong>dans votre navigateur</strong> : rien n'est envoyé ni enregistré.
        Les clés des fournisseurs ne vous sont pas demandées : complétez-les vous-même dans le <code>.env</code>.
        <button type="button" class="pc-bouton" @click="nouvellesCles">Nouvelles clés</button>
      </p>

      <div class="pc-onglets" role="tablist">
        <button
          v-for="f in fichiers"
          :key="f.nom"
          type="button"
          role="tab"
          :aria-selected="onglet === f.nom"
          :class="{ actif: onglet === f.nom }"
          @click="onglet = f.nom"
        >{{ f.nom }}</button>
      </div>

      <div v-for="f in fichiers" v-show="onglet === f.nom" :key="f.nom" class="pc-fichier">
        <p class="pc-ou">{{ f.ou }}</p>
        <div class="pc-code">
          <button type="button" class="pc-copier" @click="copier(f)">{{ copie === f.nom ? 'Copié ✓' : 'Copier' }}</button>
          <pre><code>{{ f.contenu }}</code></pre>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

// Les fournisseurs du TP : la table [backends.<id>], sa variable dans .env,
// et un modèle de départ pour opencode.json. Hors NVIDIA et AMD, les limites
// sont prudentes : à ajuster avec la fiche du modèle.
const FOURNISSEURS = [
  {
    id: 'nvidia', nom: 'NVIDIA', note: 'gratuit, environ 40 requêtes par minute',
    url: 'https://integrate.api.nvidia.com', variable: 'NVIDIA_API_KEY', exemple: 'nvapi-…',
    modele: { id: 'nvidia/nvidia/nemotron-3.5-lightning-30b-a3b', nom: 'Nemotron 3.5 Lightning (NVIDIA)', context: 32768, output: 4096 },
  },
  {
    id: 'amd', nom: 'AMD Token Lab', note: 'gratuit, 30 jours, 20 requêtes par minute',
    url: 'https://api.tokenlab.amd.com', variable: 'AMD_API_KEY', exemple: 'tl-…',
    modele: { id: 'amd/Gemma-4-31B-IT', nom: 'Gemma 4 31B (AMD)', context: 131072, output: 8192 },
  },
  {
    id: 'groq', nom: 'Groq', note: 'gratuit, 30 requêtes par minute, très rapide',
    url: 'https://api.groq.com/openai', variable: 'GROQ_API_KEY', exemple: 'gsk_…',
    modele: { id: 'groq/openai/gpt-oss-120b', nom: 'gpt-oss 120B (Groq)', context: 32768, output: 4096 },
  },
  {
    id: 'mistral', nom: 'Mistral', note: 'plan Experiment gratuit, téléphone vérifié',
    url: 'https://api.mistral.ai', variable: 'MISTRAL_API_KEY', exemple: '…',
    modele: { id: 'mistral/mistral-small-latest', nom: 'Mistral Small (Mistral)', context: 32768, output: 4096 },
  },
  {
    id: 'go', nom: 'OpenCode Go', note: 'abonnement, 10 $ par mois',
    url: 'https://opencode.ai/inference/go/openai', variable: 'OPENCODE_GO_API_KEY', exemple: '…',
    modele: { id: 'go/glm-5.3-flash', nom: 'GLM 5.3 Flash (OpenCode Go)', context: 32768, output: 4096 },
  },
  {
    id: 'openrouter', nom: 'OpenRouter', note: 'modèles :free, 50 requêtes par jour',
    url: 'https://openrouter.ai/api', variable: 'OPENROUTER_API_KEY', exemple: 'sk-or-…',
    modele: { id: 'openrouter/nvidia/nemotron-3.5-lightning:free', nom: 'Nemotron 3.5 Lightning (OpenRouter, gratuit)', context: 32768, output: 4096 },
  },
]

const STOCKAGE = 'proxy-config:choix'

const choix = ref({
  fournisseurs: ['nvidia', 'amd'],
  binome: false,
  chat: false,
  autres: false,
  partage: 0,
  modele: 'amd/Gemma-4-31B-IT',
})
const cles = ref({ proxy: '', binome: '', searxng: '' })
const onglet = ref('.env')
const copie = ref('')

function hex(octets) {
  const t = new Uint8Array(octets)
  crypto.getRandomValues(t)
  return Array.from(t, (o) => o.toString(16).padStart(2, '0')).join('')
}

function nouvellesCles() {
  cles.value = { proxy: crypto.randomUUID(), binome: crypto.randomUUID(), searxng: hex(32) }
}

// Seuls les choix sont gardés d'une visite à l'autre, jamais les clés.
onMounted(() => {
  try {
    const lu = JSON.parse(localStorage.getItem(STOCKAGE) || 'null')
    if (lu && Array.isArray(lu.fournisseurs)) choix.value = { ...choix.value, ...lu }
  } catch (e) {
    // Stockage indisponible : on garde les valeurs par défaut.
  }
  nouvellesCles()
})

watch(choix, (v) => {
  try {
    localStorage.setItem(STOCKAGE, JSON.stringify(v))
  } catch (e) {
    // Stockage indisponible : sans effet.
  }
}, { deep: true })

const actifs = computed(() => FOURNISSEURS.filter((f) => choix.value.fournisseurs.includes(f.id)))
const modeles = computed(() => actifs.value.map((f) => f.modele))

// Le modèle par défaut doit appartenir à un fournisseur coché.
watch(modeles, (liste) => {
  if (liste.length && !liste.some((m) => m.id === choix.value.modele)) choix.value.modele = liste[0].id
}, { immediate: true })

const env = computed(() => {
  const lignes = [
    '# .env : les secrets, jamais dans Git',
    `PROXY_API_KEY=${cles.value.proxy}`,
  ]
  if (choix.value.binome) lignes.push(`BINOME_API_KEY=${cles.value.binome}`)
  for (const f of actifs.value) lignes.push(`${f.variable}=${f.exemple}`)
  lignes.push(`SEARXNG_SECRET=${cles.value.searxng}`)
  lignes.push('# Votre identifiant (id -u et id -g) ; 0 et 0 avec Docker rootless')
  lignes.push('PUID=1000', 'PGID=1000')
  return lignes.join('\n') + '\n'
})

const toml = computed(() => {
  const c = choix.value
  const acceptees = ['"${PROXY_API_KEY}"']
  if (c.binome) acceptees.push('"${BINOME_API_KEY}"')
  const blocs = [
    '# data/config.toml',
    '',
    '[proxy]',
    '# Les clés acceptées par le proxy. Une liste vide = proxy ouvert à tous !',
    `api_keys = [${acceptees.join(', ')}]`,
  ]
  for (const f of actifs.value) {
    blocs.push('', `# Les modèles ${f.id}/…`, `[backends.${f.id}]`, `url = "${f.url}"`, `api_key = "\${${f.variable}}"`)
  }
  if (c.autres) {
    blocs.push(
      '',
      '# Claude Code : l\'API Messages d\'Anthropic, traduite',
      '[anthropic]',
      'enabled = true',
      '',
      '# Les noms Claude envoyés par Claude Code → un modèle du proxy',
      '[anthropic.model_map]',
      `default = "${c.modele}"`,
      '',
      '# Codex : l\'API Responses, traduite',
      '[responses]',
      'enabled = true',
    )
  }
  if (c.chat) blocs.push('', '[ui]', 'chat = true')
  if (c.partage > 0) {
    blocs.push('', '[fair_share]', '# Tokens (entrée + sortie) par heure glissante et par clé.', `tokens_per_hour = ${Math.floor(c.partage)}`)
  }
  return blocs.join('\n') + '\n'
})

const override = computed(() => {
  const vars = actifs.value.map((f) => f.variable)
  if (choix.value.binome) vars.push('BINOME_API_KEY')
  return [
    '# docker-compose.override.yml',
    'services:',
    '  albert-proxy:',
    '    environment:',
    ...vars.map((v) => `      ${v}: "\${${v}}"`),
  ].join('\n') + '\n'
})

// Écrit à la main plutôt que par JSON.stringify(…, 2), pour garder la mise
// en page du TP (capabilities et limit sur une ligne).
const opencode = computed(() => {
  const j = JSON.stringify
  const models = modeles.value.map((m) => [
    `        ${j(m.id)}: {`,
    `          "name": ${j(m.nom)},`,
    '          "capabilities": { "tools": true, "input": ["text"], "output": ["text"] },',
    `          "limit": { "context": ${m.context}, "output": ${m.output} }`,
    '        }',
  ].join('\n'))
  return [
    '{',
    '  "$schema": "https://opencode.ai/config.json",',
    `  "model": ${j('llmproxy/' + choix.value.modele)},`,
    '  "providers": {',
    '    "llmproxy": {',
    '      "name": "Mon llm-proxy",',
    '      "package": "@opencode/ai/providers/openai-compatible",',
    '      "settings": {',
    '        "baseURL": "{env:LLM_PROXY_URL}/v1",',
    '        "apiKey": "{env:LLM_PROXY_API_KEY}"',
    '      },',
    '      "models": {',
    models.join(',\n'),
    '      }',
    '    }',
    '  }',
    '}',
  ].join('\n') + '\n'
})

const variables = computed(() => [
  '# Dans votre terminal (ou votre ~/.bashrc)',
  'export LLM_PROXY_URL="http://localhost:8000"',
  `export LLM_PROXY_API_KEY="${cles.value.proxy}"`,
].join('\n') + '\n')

const fichiers = computed(() => [
  { nom: '.env', ou: 'À la racine du dossier llm-proxy. Complétez les clés des fournisseurs.', contenu: env.value },
  { nom: 'config.toml', ou: 'Dans llm-proxy/data/config.toml.', contenu: toml.value },
  { nom: 'override', ou: 'Dans llm-proxy/docker-compose.override.yml.', contenu: override.value },
  { nom: 'opencode.json', ou: 'À la racine de votre projet, ou dans ~/.config/opencode/opencode.json.', contenu: opencode.value },
  { nom: 'variables', ou: 'Pour OpenCode et curl : l\'adresse et la clé de votre proxy.', contenu: variables.value },
])

async function copier(f) {
  try {
    await navigator.clipboard.writeText(f.contenu)
    copie.value = f.nom
    setTimeout(() => { if (copie.value === f.nom) copie.value = '' }, 1500)
  } catch (e) {
    // Presse-papiers refusé : le texte reste sélectionnable à la main.
  }
}
</script>

<style scoped>
.pc {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
}
.pc-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 760px) {
  .pc-form { grid-template-columns: 1fr; }
  .pc-code pre { padding-top: 44px; }
}
fieldset {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 12px 12px;
  margin: 0;
  min-width: 0;
}
legend {
  font-weight: 600;
  padding: 0 6px;
}
.pc-check {
  display: flex;
  gap: 8px;
  align-items: baseline;
  margin: 6px 0;
  cursor: pointer;
}
.pc-check small, .pc-ligne small {
  color: var(--vp-c-text-2);
}
.pc-ligne {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 10px 0 0;
}
.pc-ligne input, .pc-ligne select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  max-width: 100%;
}
.pc-note {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.pc-alerte {
  color: var(--vp-c-danger-1);
  font-weight: 600;
}
.pc-bouton, .pc-copier {
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 2px 10px;
  font-size: 13px;
  background: var(--vp-c-bg);
  cursor: pointer;
}
.pc-bouton { margin-left: 4px; }
.pc-onglets {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.pc-onglets button {
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  padding: 4px 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.pc-onglets button.actif {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.pc-ou {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 8px 0;
}
.pc-code {
  position: relative;
}
.pc-copier {
  position: absolute;
  top: 8px;
  right: 8px;
}
.pc-code pre {
  margin: 0;
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
}
</style>
