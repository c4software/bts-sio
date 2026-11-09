<template>
  <!-- Cadre commun des bacs à sable (XssLab, AuthLab, SqlInjection) : bouton
       « Recommencer » en haut à droite, le contenu de l'exercice dans le slot. -->
  <div class="lab">
    <div class="lab-reset">
      <button
        class="secondary"
        :disabled="disabled"
        title="Remet l'exercice dans son état de départ"
        @click="$emit('reset')"
      >↺ Recommencer</button>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({ disabled: { type: Boolean, default: false } })
defineEmits(['reset'])
</script>

<style>
/* Styles partagés par tous les bacs à sable. Non scopés mais préfixés par .lab :
   ils s'appliquent aussi au contenu passé dans le slot. Chaque lab ne garde
   dans son fichier que ce qui lui est propre. */
.lab {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
}
.lab-reset { display: flex; justify-content: flex-end; margin-bottom: 0.4rem; }
.lab .lab-reset button { padding: 0.25rem 0.7rem; font-size: 0.85em; }

.lab .intro { margin-top: 0; }
.lab .mode { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0.6rem 0; font-size: 0.9em; }
.lab .form { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: flex-end; margin: 0.6rem 0; }
.lab .form label { display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.85em; color: var(--vp-c-text-2); }
.lab .form label.grow { flex: 1 1 22rem; }
.lab .form input {
  padding: 0.35rem 0.5rem; border: 1px solid var(--vp-c-divider); border-radius: 4px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono); font-size: 0.9em;
}
.lab .exemples, .lab .hint { font-size: 0.85em; color: var(--vp-c-text-2); margin: 0.3rem 0; }

.lab button {
  padding: 0.4rem 0.9rem; border-radius: 4px; border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1); color: #fff; cursor: pointer;
}
.lab button.secondary { background: transparent; color: var(--vp-c-brand-1); }
.lab button:disabled { opacity: 0.5; cursor: default; }
.lab button.link {
  background: none; border: none; padding: 0; color: var(--vp-c-brand-1);
  text-decoration: underline; cursor: pointer; font-size: inherit;
}

.lab .requete { margin-top: 0.6rem; }
.lab .requete-label { font-size: 0.8em; color: var(--vp-c-text-2); }
.lab .requete pre {
  margin: 0.2rem 0 0; padding: 0.6rem; border-radius: 4px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); font-size: 0.85em; overflow-x: auto; white-space: pre-wrap;
}

.lab .error {
  margin-top: 0.8rem; padding: 0.6rem; border-radius: 4px;
  background: var(--vp-c-danger-soft); color: var(--vp-c-danger-1);
  font-family: var(--vp-font-family-mono); font-size: 0.85em; white-space: pre-wrap;
}

.lab .verdict {
  margin-top: 0.6rem; padding: 0.7rem 0.9rem; border-radius: 6px;
  border-left: 4px solid var(--vp-c-danger-1); background: var(--vp-c-danger-soft);
}
.lab .verdict.ok { border-left-color: var(--vp-c-success-1); background: var(--vp-c-success-soft); }
.lab .verdict.warn { border-left-color: var(--vp-c-warning-1); background: var(--vp-c-warning-soft); }
.lab .verdict.info { border-left-color: var(--vp-c-text-3); background: var(--vp-c-default-soft); }
.lab .verdict p { margin: 0; font-weight: 600; }
.lab .verdict ul { margin: 0.3rem 0 0; padding-left: 1.2rem; }
.lab .verdict li { font-size: 0.85em; }

.lab .picker select {
  margin-left: 0.5rem; padding: 0.3rem 0.5rem; border: 1px solid var(--vp-c-divider);
  border-radius: 4px; background: var(--vp-c-bg); color: var(--vp-c-text-1);
}
.lab .journal { margin: 0.8rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; font-size: 0.9em; }
.lab .etape { padding: 0.15rem 0.6rem; border-radius: 999px; border: 1px dashed var(--vp-c-divider); color: var(--vp-c-text-2); }
.lab .etape.ok { border-style: solid; border-color: var(--vp-c-success-1); color: var(--vp-c-success-1); }
.lab .brief { margin-top: 0.6rem; }
.lab .brief p { margin: 0.3rem 0; }
.lab .objectif { color: var(--vp-c-text-1); }

.lab .table-wrap { overflow-x: auto; margin: 0.6rem 0; }
.lab .mono { font-family: var(--vp-font-family-mono); word-break: break-all; white-space: normal; }
</style>
