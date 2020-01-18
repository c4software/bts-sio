<template>
  <ExternalIframe :src="samplePath"></ExternalIframe>
</template>

<script>
import externalIframe from "./ExternalIframe.vue";

export default {
  name: "Sample",
  components: { externalIframe },
  props:{
      src: {
          required: true
      }
  },
  computed: {
      samplePath(){
          return `/demo/${this.src}/index.html`;
      }
  }
};
</script>

<style scoped>
    iframe {
        background: white;
    }
</style>