<template>
  <ExternalIframe :src="deckPath"></ExternalIframe>
</template>

<script>
import externalIframe from "./ExternalIframe.vue";

export default {
  name: "RevealDeck",
  components: { externalIframe },
  props:{
      src: {
          required: true
      }
  },
  computed: {
      deckPath(){
          return `/cours/sources/revealjs/index.html?source=${this.src}`;
      }
  }
};
</script>