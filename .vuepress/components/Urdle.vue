<template>
    <div>
        <div class="container">
            <div class="col no-gap center">
                <select v-model="selected" class="form-select">
                    <option value="-1">Consulter les exercices</option>
                    <option v-for="level in levels" :value="level">Jour {{level}}</option>
                </select>
            </div>
        </div>

        <template v-if="selected > 0 && isValid">
            <div class="text-center">
                <img :src="`/urdle/${selected}/uml.png`" alt="">
            </div>
            
            <div class="text-left custom-container tip">
                <p class="custom-container-title">Dans cet exercice vous devez :</p>
                <div v-if="details" v-html="details"></div>
                <div v-else>
                    <ul>
                        <li>Écrire le code (ou pseudo-code) permettant de définir les propriétés des classes proposées</li>
                        <li>Écrire 2 constructeurs (autre que celui par défaut) des classes proposés</li>
                    </ul>
                </div>
            </div>

            <div v-if="pratique" class="text-left custom-container warning">
                <p class="custom-container-title">Mise en pratique :</p>
                <p v-html="pratique"></p>
            </div>
        </template>

        <div class="container">
            <div class="col center">
                <input v-if="canNext" @click="selected++" type="button" value="Suivant" class="btn btn-primary" />
                <input v-else @click="selected--" type="button" value="Précédent" class="btn btn-primary" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Urdle",
  watch: {
    selected: {
        immediate: true,
        handler() {
            try{
                window.localStorage.setItem('urdle', this.selected);
            } catch(e){}

            if(this.selected > 0){
                fetch(`/urdle/${this.selected}/questions.html`)
                .then((res) => res.text())
                .then(obj => this.details = obj);
                
                fetch(`/urdle/${this.selected}/exercice.html`)
                .then((res) => res.text())
                .then(obj => this.pratique = obj.replace('{{ today }}', this.today));
            }
        }
    }
  },
  mounted() {
    if(!this.isValid){
      this.selected = 1;
    }

    try{
      if(window && window.localStorage){
        this.selected = window.location.hash.replace('#', '') || window.localStorage.getItem('urdle') || -1
      }
    } catch(e){}
  },
  computed: {
    canNext(){
        return this.selected <= this.levels.length - 1;
    },
    isValid(){
        return this.selected <= this.levels.length;
    },
    today(){
        let today = new Date(); 
        return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    }
  },
  data() {
    return {
        details: undefined,
        pratique: undefined,
        selected: -1,
        levels: [...Array(10).keys()].map(it => it+1)
    }
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.container {
  display: flex;
  width: 100%;
}

.col {
  flex-grow: 1;
  padding: 20px;
}

.col.no-gap {
    padding: 20px 0;
}

.col.center {
  text-align: center;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

textarea.form-control {
  height: auto;
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-select {
    display: block;
    width: 100%;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    -moz-padding-start: calc(0.75rem - 3px);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

select {
    word-wrap: normal;
}
button, select {
    text-transform: none;
}

button, input, optgroup, select, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

.text-left{
    text-align: left;
}

.text-center{
    text-align: center;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

@media only screen and (max-width: 960px) {
  .container {
    display: block;
  }
}
</style>
