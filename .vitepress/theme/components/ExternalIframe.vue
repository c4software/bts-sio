<template>
  <div :class="{bordered}">
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