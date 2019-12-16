import {stunConfig} from "../../config/index.js";
import template from './template.js';

export default {
  template,
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
      this.pc
        .createOffer()
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
