export default `
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
</div>`;
