export default {
  name: "tapotap",
  computed: {
    green() {
        return 100 - this.red;
    }
  },
  mounted(){
    window.addEventListener('keyup', this.keyHandler, true);
  },
  beforeDestroy(){
    window.removeEventListener('keyup', this.keyHandler, true);
  },
  methods: {
    keyHandler(e){
      if(this.red <= 0 ){
        this.red = 50;
        return;
      }

      if(e.keyCode == 37 || e.keyCode == 38){
        this.red += 10
      } else if(e.keyCode == 39 || e.keyCode == 40) {
        this.red -= 10
      }
    }
  },
  data() {
    return {
        red: 50,
    }
  },
  template: 
  `<div class='tapotap'>
    <div class='red' :style='{height: red + "vh"}' @keyup.left @click='red+=10'></div>
    <div class='green' :style='{height: green + "vh"}' @click='red-=10'></div>
    <div class="winner" v-if="red >= 100 || green >= 100">
        <div style="width: 100%">
            <div>WIN</div>
            <div @click="red=50" class="pointer">Retry ?</div>
        </div>
    </div>
  </div>`,
};