<template>
  <div>
    <ExternalIframe :src="samplePath"></ExternalIframe>
    <center><a target="_blank" :href="samplePath">Ouvrir</a></center>
  </div>
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
a {
  display: inline-block;
  margin: 10px;
}
</style>