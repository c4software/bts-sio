export default `
<div class="pad50">
    <select v-model="type">
        <option value="server">Server</option>
        <option value="client">Client</option>
    </select>
    <div class="grid">
        <div>
            <h1>Offer</h1>
            <div v-if="isServer">
                <textarea readonly v-html="myOffer"/>
            </div>
            <div>
                <textarea v-model="remoteOffer"/>
                <button @click="setRemoteOffer">Set remote</button>
            </div>
        </div>

        <div v-if="isClient">
            <h1>Answer</h1>
            <textarea readonly v-model="answer"/>
        </div>
    </div>

    <div v-if="connected">
        <h1>Chat !</h1>
        <div>
            <p v-for="m in messages">{{m}}</p>
        </div>
        <input type="text" v-model="myMessage" @keyup.enter="triggerSendMessage">
    </div>
    
    <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
</div>`;
