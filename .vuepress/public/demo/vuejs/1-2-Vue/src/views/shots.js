import {stunConfig} from "../config/index.js";

export default {
  // language=Vue
  template: `
      <div class="pad50">
          <div class="grid">
              <div>
                  <h1>Offer</h1>
                  <div>
                      <textarea readonly @keyup.enter="createMyOffer" v-html="myOffer"/>
                      <button @click="createMyOffer">Create my offer</button>
                  </div>
                  <div>
                      <textarea @keyup.enter="setRemoteOffer" type='text' v-model="remoteOffer"/>
                      <button @click="setRemoteOffer">Set remote</button>
                  </div>
              </div>

              <div>
                  <h1>Answer</h1>
                  <textarea type='text' readonly v-model="answer"/>
              </div>
          </div>

          <div v-if="connected">
              <h1>Chat !</h1>
              <div>
                  <p v-for="m in messages">{{m}}</p>
              </div>
              <input type="text" v-model="myMessage" @keyup.enter="triggerSendMessage">
          </div>
      </div>`,
  name: "shots",
  data() {
    return {
      pc: undefined,
      channel: undefined,
      myOffer: "",
      remoteOffer: "",
      answer: "",

      connected: false,
      messages: [],
      myMessage: "",
    }
  },
  mounted() {
    this.pc = new RTCPeerConnection(stunConfig);
    this.initChannel();
  },
  methods: {
    initChannel() {
      this.channel = this.pc.createDataChannel("chat");
      this.channel.onopen = (e) => {
        this.connected = true;
        this.messages.push("Connected");
      };

      this.channel.onclose = (e) => {
        this.connected = false;
        this.messages.push("Disconnected");
      };

      this.channel.onerror = (e) => this.messages.push("An error occured");
      this.channel.onmessage = (e) => this.messages.push(`Remote: ${e.data}`);
    },
    createMyOffer() {
      this.pc.createOffer()
        .then((offer) => {
          this.myOffer = JSON.stringify(offer);
          return this.pc.setLocalDescription(offer);
        });
    },
    setRemoteOffer() {
      let remoteOfferParsed = JSON.parse(this.remoteOffer);
      const desc = new RTCSessionDescription({type: remoteOfferParsed.type, sdp: remoteOfferParsed.sdp});

      this.pc
        .setRemoteDescription(desc)
        .then(() => this.pc.createAnswer())
        .then(d => this.pc.setLocalDescription(d))
        .then(value => {
          this.answer = JSON.stringify(this.pc.localDescription);
        })
        .catch(err => {
          alert(err);
        })
    },
    triggerSendMessage() {
      try {
        this.channel.send(this.myMessage);
        this.messages.push(`You: ${this.myMessage}`);
        this.myMessage = "";
      } catch (e) {

      }
    }
  }
};
