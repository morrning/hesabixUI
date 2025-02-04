<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";
export default defineComponent({
  name: "register",
  data() {
    const self = this;
    return {
      loading:false,
      dialog:false,
      user:{
        name:'',
        email:'',
        mobile:'',
        password:''
      },
      rules:{
        name: [
          (value:any) => self.validate(value,'fill'),
        ],
        email: [
          (value:any) => self.validate(value,'email'),
        ],
        mobile: [
          (value:any) => self.validate(value,'mobile'),
        ],
        password: [
          (value:any) => self.validate(value,'password'),
        ],
      },
      response: {
        code: '',
        message: '',
        Success: false,
        data: {
          id: ''
        }
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods:{
    validate(input:string,type:string){
      if(type == 'fill'){
        if (input?.length > 0) return true
        return this.$t('validator.required')
      }
      else if(type == 'email'){
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input)) return true
        return this.$t('validator.email_not_valid')
      }
      else if(type == 'password'){
        if(input == undefined ) {
          return false
        }
        else if (input.length > 7) return true
        return this.$t('validator.password_len_lower')
      }
      else if(type == 'mobile'){
        var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
        if(regex.test(input))  return true
        return this.$t('validator.mobile_not_valid')
      }
    },
    loadData(){
      
    },
    async submit(){
      const { valid } = await this.$refs.form.validate()
      if(valid){
        this.loading = true;
        axios.post('/api/user/register',this.user)
            .then((response:any) => {
              if(response.data.Success == false){
                this.response = response.data;
                this.dialog = true;
              }
              else{
                this.$router.push('/user/active-account/' + this.user.mobile)
              }
              this.loading = false;
            });
      }
    }
  }
})
</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col md="5">
        <v-card :loading="loading ? 'blue' : null" :title="$t('app.name')" :subtitle="$t('user.register_label')">
          <v-card-text>
            <v-form ref="form" :disabled="loading" fast-fail @submit.prevent="submit()"  >
              <v-text-field
                  class="mb-2"
                  :label="$t('user.name')"
                  :placeholder="$t('user.name_des')"
                  single-line
                  v-model="user.name"
                  type="text"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                  :rules="rules.name"
              ></v-text-field>

              <v-text-field
                  class="mb-2"
                  :label="$t('user.email')"
                  :placeholder="$t('user.email_placeholder')"
                  single-line
                  v-model="user.email"
                  type="email"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                  :rules="rules.email"
              ></v-text-field>

              <v-text-field
                  class="mb-2"
                  :label="$t('user.mobile')"
                  :placeholder="$t('user.mobile_placeholder')"
                  single-line
                  v-model="user.mobile"
                  type="tel"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                  :rules="rules.mobile"
              ></v-text-field>

              <v-text-field
                  class="mb-2"
                  :label="$t('user.password')"
                  :placeholder="$t('user.password_register_des')"
                  single-line
                  type="password"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock"
                  :rules="rules.password"
                  v-model="user.password"
              ></v-text-field>
              <v-card-text class="text-justify text-info">
                <v-icon icon="mdi-information" />
                {{ $t('user.register_terms_des') }}
              </v-card-text>
              <v-btn
                  :loading="loading"
                  block
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  variant="flat"
                  prepend-icon="mdi-account-plus"
                  type="submit"
              >
                {{ $t('user.register') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-if="dialog" class="text-center">
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card color="dangerLight" prepend-icon="mdi-close-octagon " :title="$t('dialog.error')"
        :text="response.message">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :text="$t('dialog.ok')" variant="flat"
            @click="dialog = false; loading = false;" />
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>
