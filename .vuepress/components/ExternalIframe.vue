<template>
  <div>
    <iframe :src="this.src" frameborder="0" ref="iframe" />
    <button @click="requestFullscreen">
      <img src="/fullscreen.svg" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ExternalIframe",
  props: {
    src: {
      required: true,
    },
  },
  methods: {
    requestFullscreen() {
      this.$refs["iframe"].requestFullscreen();
      this.$refs["iframe"].focus();

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

button {
  padding: 5px;
  background-color: #22232387;
  color: white;
  cursor: pointer;
  user-select: none;

  display: block;
  font-size: 1.1em;
  border: none;
  border-radius: 5px;
  position: relative;
  top: -52px;
  right: -20px;
}
</style>