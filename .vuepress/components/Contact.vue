<template>
  <div>
    <div v-if="submited" class="container">
      <div class="col center">
        Votre message a bien été envoyé.
        <br /><br />
        <input @click="submited = false" type="button" value="Retour" class="btn btn-primary" />
      </div>
    </div>
    <form v-else data-netlify="true" action="post" name="contact" netlify-honeypot="field" @submit.prevent="handleSubmit">
      <p class="hidden">
        <label>Don’t fill this out if you're human: <input name="field"/></label>
      </p>
      <input type="hidden" name="form-name" value="contact" />
      <div class="container">
        <div class="col">
          <input v-model="name" class="form-control" type="text" name="Nom" placeholder="Nom *" required/>
        </div>
        <div class="col">
          <input v-model="firstname" class="form-control" type="text" name="Prénom" placeholder="Prénom *" required  />
        </div>
      </div>
      <div class="container">
        <div class="col">
          <input v-model="email" class="form-control" type="email" name="Email" placeholder="Email *" required />
        </div>
      </div>
      <div class="container">
        <div class="col">
          <textarea v-model="message" class="form-control" rows="10" name="Message" placeholder="Ma question / Mon message *" required />
        </div>
      </div>
      <div class="container">
        <div class="col center">
          <input type="submit" value="Envoyer" class="btn btn-primary" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      submited: false,
      name: "",
      firstname: "",
      email: "",
      message: "",
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit() {
      fetch("/contact", {
        body: this.encode({
          "form-name": "contact",
          name: this.name,
          firstname: this.firstname,
          email: this.email,
          message: this.message,
        }),
        cache: "no-cache",
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        referrer: "no-referrer",
      }).then(() => {
        this.submited = true;
      });

      this.submited = true;

      this.name = "";
      this.firstname = "";
      this.email = "";
      this.message = "";
    },
  },
};
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
