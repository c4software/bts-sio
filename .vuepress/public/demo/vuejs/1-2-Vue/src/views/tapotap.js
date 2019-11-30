export default {
  name: "tapotap",
  computed: {
    green() {
        return 100 - this.red;
    }
  },
  data() {
    return {
        red: 50,
    }
  },
  template: 
  `<div class='tapotap'>
    <div class='red' :style='{height: red + "vh"}' @click='red+=10'></div>
    <div class='green' :style='{height: green + "vh"}' @click='red-=10'></div>
    <div class="winner" v-if="red >= 100 || green >= 100">
        <div style="width: 100%">
            <div>WIN</div>
            <div @click="red=50" class="pointer">Retry ?</div>
        </div>
    </div>
  </div>`,
};