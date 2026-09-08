<template>
  <div :class="{bordered}" tabindex="0" @keydown="handleKeyPress" ref="root">
    <iframe :src="src" frameborder="0" ref="iframe" />
    <div class="actions">
      <button class="action" @click="() => requestFullscreen($refs['iframe'])" v-if="isFullScreenAvailable">
        <img src="/icons/fullscreen.svg" />
      </button>
      <a class="action" :href="src" target="_blank" >
        <img src="/icons/launch.svg" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExternalIframe",
  props: {
    src: {
      required: true,
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isFullScreenAvailable(){
      try{
        return document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;
      } catch(err) {
        return true;
      }
    }
  },
  methods: {
    // Raccourci « f » : uniquement quand le focus est dans le composant
    // (l'écouteur est posé sur la racine, pas sur window), et jamais
    // pendant une saisie ni avec un modificateur.
    handleKeyPress(event) {
      if (event.key !== 'f' && event.key !== 'F') return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const root = this.$refs.root;
      if (!root || !root.contains(document.activeElement)) return;
      const tag = event.target && event.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (event.target && event.target.isContentEditable)) return;
      event.preventDefault();
      this.toggleFullscreen();
    },
    toggleFullscreen() {
      const element = this.$refs.iframe;
      if (!element) return;

      const isFullscreen = document.fullscreenElement || 
                          document.mozFullScreenElement || 
                          document.webkitFullscreenElement;

      if (isFullscreen) {
        this.exitFullscreen();
      } else {
        this.requestFullscreen(element);
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    requestFullscreen(element){
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }

      element.focus();

      try {
        ga("send", "event", "requestFullscreen", this.src);
      } catch (err) {}
    },
  },
};
</script>

<style scoped>

div[tabindex]:focus {
  outline: none;
}

div[tabindex]:focus-visible {
  outline: 2px solid var(--vp-c-brand-1, #3451b2);
  outline-offset: 2px;
  border-radius: 5px;
}

iframe {
  width: 100%;
  height: 50vh;
  background: white;
}

.bordered > iframe {
  border: 1px solid #a7a7a7;
  border-radius: 5px;
}

.actions {
    position: relative;
    top: -60px;
    margin-bottom: -40px;
    right: -20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 200px;
}

.action {
    padding: 4px;
    background-color: #22232387;
    color: white;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: block;
    border: none;
    border-radius: 5px;
    margin: 0 5px;
}

.action > img {
  height: 24px;
  width: 24px;
}
</style>