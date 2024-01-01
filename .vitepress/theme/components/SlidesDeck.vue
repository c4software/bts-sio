<template>
  <div>
    <ExternalIframe :src="deckPath"></ExternalIframe>
  </div>
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
        return `/cours/revealjs/index.html?source=${this.src}`;
    }
  }
};
</script>