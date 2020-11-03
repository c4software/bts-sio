<template>
  <div class="container" ref="container">
    <h2>{{title ? title : 'QCM'}}</h2>
    <div v-for="question in Object.keys(data)">
        <h4>{{question}}</h4>
        <ul>
            <li v-for="reponse in data[question]">
                <label>
                    <input type="checkbox" @change="toggleState" /> {{reponse}}
                </label>
            </li>
        </ul>
    </div>

    <div class="text-center noPrint">
        <hr>
        <button @click="print">Valider mes réponses</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Qcm",
  props:{
      data: Object,
      title: String
  },
  methods: {
    toggleState(el){
        if(el.target.getAttribute('checked') === null){
            el.target.setAttribute('checked','');
        }
        else{
            el.target.removeAttribute('checked');
        }
    },
    print(){
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write(`
<html>
    <head>
        <title>${document.title}</title>
        <style>
        .noPrint{
            display: none;
        }
        </style>
    </head>
    <body>
        ${this.$refs.container.innerHTML}
    </body>
</html>
    `);

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
    }
    }
}
</script>

<style scoped>
    .text-center {
        text-align: center;
    }

    .container{
        padding: 10px 0;
    }

    li {
        list-style: none;
    }

    label {
        user-select: none;
    }

    button {
        display: inline-block;
        font-weight: 400;
        color: #212529;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        cursor: pointer;
        border: 1px solid #28a745;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;

        color: #fff;
        background-color: #28a745;

        margin: 20px;
    }
</style>