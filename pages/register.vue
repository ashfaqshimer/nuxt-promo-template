<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://via.placeholder.com/300" />
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    @blur="$v.form.username.$touch()"
                    type="text"
                    placeholder="Username"
                    v-model="form.username"
                  />
                  <div v-if="$v.form.username.$error" class="form-error">
                    <span
                      v-if="!$v.form.username.required"
                      class="help is-danger"
                    >Username is required</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    @blur="$v.form.name.$touch()"
                    type="text"
                    placeholder="Name"
                    v-model="form.name"
                  />
                  <div v-if="$v.form.name.$error" class="form-error">
                    <span v-if="!$v.form.name.required" class="help is-danger">Name is required</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    @blur="$v.form.email.$touch()"
                    type="email"
                    placeholder="Your Email"
                    v-model="form.email"
                  />
                  <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger">Email is required</span>
                    <span
                      v-if="!$v.form.email.emailValidator"
                      class="help is-danger"
                    >Email address is not valid</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    @blur="$v.form.avatar.$touch()"
                    type="text"
                    placeholder="Avatar"
                    autocomplete
                    v-model="form.avatar"
                  />
                  <div v-if="$v.form.avatar.$error" class="form-error">
                    <span v-if="!$v.form.avatar.url" class="help is-danger">Url format is not valid!</span>
                    <span
                      v-if="!$v.form.avatar.supportedFileType"
                      class="help is-danger"
                    >Selected file type is not valid!</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    @blur="$v.form.password.$touch()"
                    type="password"
                    placeholder="Your Password"
                    autocomplete="new-password"
                    v-model="form.password"
                  />
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span
                      v-if="!$v.form.password.required"
                      class="help is-danger"
                    >Password is required</span>
                    <span
                      v-if="!$v.form.password.minLength"
                      class="help is-danger"
                    >Password minimum length is 6 letters</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    @blur="$v.form.password2.$touch()"
                    type="password"
                    placeholder="Password Confirmation"
                    autocomplete="off"
                    v-model="form.password2"
                  />
                  <div v-if="$v.form.password2.$error" class="form-error">
                    <span
                      v-if="!$v.form.password2.required"
                      class="help is-danger"
                    >Password is required</span>
                    <span
                      v-if="!$v.form.password2.sameAs"
                      class="help is-danger"
                    >Password confirmation should be the same as password</span>
                  </div>
                </div>
              </div>
              <button
                @click.prevent="handleSubmit"
                :disabled="$v.form.$invalid"
                type="submit"
                class="button is-block is-info is-large is-fullwidth"
              >Register</button>
            </form>
          </div>
          <p class="has-text-grey">
            <nuxt-link to="/login">Login</nuxt-link>&nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  required,
  email,
  minLength,
  sameAs,
  url
} from "vuelidate/lib/validators";
import { supportedFileType } from "@/helpers/validators";

export default {
  data() {
    return {
      form: {
        username: "",
        name: "",
        email: "",
        avatar: null,
        password: "",
        password2: ""
      }
    };
  },
  validations: {
    form: {
      username: { required },
      name: { required },
      email: {
        required,
        emailValidator: email
      },
      avatar: { url, supportedFileType },
      password: { required, minLength: minLength(6) },
      password2: { required, sameAs: sameAs("password") }
    }
  },
  computed: {
    isFormValid() {
      return !this.$v.$invalid;
    }
  },
  methods: {
    handleSubmit() {
      this.$v.form.$touch();
      if (this.isFormValid) {
        this.$store
          .dispatch("auth/handleRegister", this.form)
          .then(() => this.$router.push("/login"))
          .catch(() =>
            this.$toasted.error("Unable to register", {
              duration: 3000
            })
          );
      }
    }
  }
};
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  height: 128px;
  width: 128px;
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
p.subtitle {
  padding-top: 1rem;
}
</style>
