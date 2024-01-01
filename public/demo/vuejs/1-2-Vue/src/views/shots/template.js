export default `
<div class="pad50">
    <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>

    <div v-if="!connected">
        <select v-model="type">
            <option value="server">Server</option>
            <option value="client">Client</option>
        </select>
        <div>
            <div v-if="isServer">
                <h1>Your offer</h1>
                <textarea readonly v-model="myOffer"/>
            </div>
            
            <div>
                <h1>Remote offer</h1>
                <textarea v-model="remoteOffer"/>
                <br>
                <button @click="setRemoteOffer">Set remote</button>
            </div>
            
            <div v-if="isClient">
                <h1>Your answer</h1>
                <textarea readonly v-model="answer"/>
            </div>
        </div>
    </div>

    <div v-if="connected">
        <h1>Chat !</h1>
        <div class="chat" v-if="messages.length > 0">
            <div v-for="m in messages" :party="m.party">    
                <p :party="m.party">{{m.message}}</p>
                <span v-if="m.party === 'local'">You</span>
                <span v-if="m.party === 'remote'">Stranger</span>
            </div>
        </div>
        <br><br>
        <input type="text" placeholder="Your message" v-model="myMessage" @keyup.enter="triggerSendMessage">
    </div>    
</div>`;
