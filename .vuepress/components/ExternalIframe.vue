<template>
  <div>
    <iframe :src="this.src" frameborder="0" ref='iframe' />
    <button @click="requestFullscreen">Afficher en plein écran</button>
  </div>
</template>

<script>
export default {
    name: "ExternalIframe",
    props: {
        src: {
            required: true
        }
    },
    methods: {
        requestFullscreen(){
            this.$refs['iframe'].requestFullscreen();
            this.$refs['iframe'].focus();

            try{
                ga('send', 'event', 'requestFullscreen', this.src);
            } catch(err){}
        }
    }
}
</script>

<style scoped>
    iframe{
        width: 100%;
        height: 50vh;
        background: white;
    }

    button{
        display: block;
        margin: 20px auto;
        font-size: 1.1em;
        border: none;
        border-radius: 5px;
        padding: 5px;
        background-color: #d5daea;
        cursor: pointer;
        user-select: none;
    }
</style>