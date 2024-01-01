<template>
  <div class="click_reveal">
    <span @click="requestReveal" v-if="!visible">{{text}}</span>
    <div v-if="visible">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "reveal",
  data() {
    return {
      visible: false
    };
  },
  props: {
    text: {
      default: "Click to reveal"
    }
  },
  methods: {
    requestReveal(){
      this.visible = true;
      try{
        ga('send', 'event', 'requestReveal', window.location);
      } catch(err){}
    }
  }
};
</script>

<style scopped>
.click_reveal > span {
  display: inline-block;
  border-radius: 5px;
  padding: 5px;
  background-color: #d5daea;
  cursor: pointer;
  user-select: none;
}
</style>