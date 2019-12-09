import {stunConfig} from "../config/index.js";

export default {
  name: "shots",
  data() {
    return {
      pc: undefined,
      channel: undefined,
      myOffer: "",
      remoteOffer: "",
      answer: "",

      messages: [],
      myMessage: "",
    }
  },
  mounted() {
    this.pc = new RTCPeerConnection(stunConfig);
    this.channel = this.pc.createDataChannel("chat");
    this.channel.onopen = (e) => this.messages.push("Connected");
    this.channel.onclose = (e) => this.messages.push("Disconnected");
    this.channel.onerror = (e) => this.messages.push("An error occured");
    this.channel.onmessage = (e) => this.messages.push(`Remote: ${e.data}`);
  },
  methods: {
    createMyOffer() {

      this.pc.createOffer()
        .then((offer) => {
          this.myOffer = offer.sdp;
          return this.pc.setLocalDescription(offer);
        });
    },
    setRemoteOffer() {
      const desc = new RTCSessionDescription({type: "offer", sdp: this.remoteOffer});
      this.pc
        .setRemoteDescription(desc)
        .then(() => this.pc.createAnswer())
        .then(d => this.pc.setLocalDescription(d))
        .then(value => {
          this.answer = this.pc.localDescription.sdp;
        })
    },
    triggerSendMessage() {
      this.messages.push(`You: ${this.myMessage}`);
      this.channel.send(this.myMessage);
      this.myMessage = "";
    }
  },
  // language=Vue
  template: `
      <div class="pad50">
          <script src="https://webrtc.github.io/adapter/adapter-latest.js"/>
          <h1>Offer</h1>
          <div>
              <textarea readonly @keyup.enter="createMyOffer" v-html="myOffer"/>
              <button @click="createMyOffer">Create my offer</button>
          </div>
          <div>
              <textarea @keyup.enter="setRemoteOffer" type='text' v-model="remoteOffer"/>
              <button @click="setRemoteOffer">Set remote Offer</button>
          </div>

          <h1>Answer</h1>
          <textarea type='text' v-model="answer"/>

          <h1>Chat !</h1>
          <div>
              <p v-for="m in messages">{{m}}</p>
          </div>
          <input type="text" v-model="myMessage" @keyup.enter="triggerSendMessage">
      </div>`
};
