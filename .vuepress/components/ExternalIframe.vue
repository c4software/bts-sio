<template>
  <div :class="{bordered}">
    <iframe :src="this.src" frameborder="0" ref="iframe" />
    <button @click="requestFullscreen">
      <img src="/icons/fullscreen.svg" />
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
    bordered: {
      type: Boolean,
      default: false
    }
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

.bordered > iframe {
  border: 1px solid #a7a7a7;
  border-radius: 5px;
}

button {
  background-color: #22232387;
  color: white;
  cursor: pointer;
  user-select: none;

  background-color: rgba(34, 35, 35, 0.5);
  color: #fff;
  display: block;
  border: none;
  border-radius: 5px;
  position: relative;
  top: -50px;
  margin-bottom: -40px;
  right: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
</style>