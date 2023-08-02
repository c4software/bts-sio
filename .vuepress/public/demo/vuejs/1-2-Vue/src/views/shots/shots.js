import {stunConfig} from "../../config/index.js";
import template from './template.js';

export default {
  template,
  name: "shots",
  data() {
    return {
      type: "client",
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
  computed: {
    isClient() {
      return this.type === 'client';
    },
    isServer() {
      return this.type === 'server';
    }
  },
  watch: {
    isServer() {
      if (this.isServer) {
        this.createMyOffer();
      }
    },
    isClient() {
      if(this.isClient){
        this.init();
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.pc = new RTCPeerConnection(stunConfig);

      this.pc.oniceconnectionstatechange = (e) => {
        console.log("ICE CHANGE", this.pc.iceConnectionState);
        if (this.pc.iceConnectionState === 'disconnected') {
          this.connected = false;
        }
      };

      this.pc.onicecandidate = (e) => {
        if (e.candidate) return;
        this.myOffer = JSON.stringify(this.pc.localDescription);
      };

      this.pc.ondatachannel = (e) => {
        if (this.isClient) {
          this.channel = e.channel;
          this.initChannel();
        }
      }
    },
    initChannel() {
      this.channel.onopen = (e) => {
        this.connected = true;
        this.messages.push({message: "Connected", party: 'system'})
      };

      this.channel.onclose = (e) => {
        this.connected = false;
        this.messages.push({message: "Disconnected", party: 'system'})
      };

      this.channel.onerror = (e) => this.messages.push({message: "An error occured", party: 'system'});
      this.channel.onmessage = (e) => this.messages.push({message: e.data, party: 'remote'});
    },
    createMyOffer() {
      this.channel = this.pc.createDataChannel("chat");

      this.pc
        .createOffer()
        .then((offer) => this.pc.setLocalDescription(offer));

      this.initChannel();
    },
    setRemoteOffer() {
      let remoteOfferParsed = JSON.parse(this.remoteOffer);
      const desc = new RTCSessionDescription({type: remoteOfferParsed.type, sdp: remoteOfferParsed.sdp});
      const ops = this.pc.setRemoteDescription(desc);

      if (this.isServer) {
        ops.catch(err => alert(err))
      } else {
        ops.then(() => this.pc.createAnswer())
          .then(d => this.pc.setLocalDescription(d))
          .then(value => this.answer = JSON.stringify(this.pc.localDescription))
          .catch(err => alert(err))
      }
    },
    triggerSendMessage() {
      try {
        this.channel.send(this.myMessage);
        this.messages.push({message: this.myMessage, party: 'local'});
        this.myMessage = "";
      } catch (e) {
        console.log(e);
      }
    }
  }
};
