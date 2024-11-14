<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "forget_password",
  data() {
    const self = this;
    return {
      loading:false,
      mobile:'',
      rules:{
        mobile: [
          (value) => self.validate(value,'mobile'),
        ]
      }

    }
  },
  mounted() {

  },
  methods:{
    validate(input){
      var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
      if(regex.test(input))  return true
      return this.$t('validator.mobile_not_valid')
    },
    async submit(){
      const { valid } = await this.$refs.form.validate()
      if(valid){
        this.loading = true;
        axios.post('/api/user/forget-password',{mobile:this.mobile}).then((response)=>{
          if(response.data.error == "200"){
            this.$swal({
              text: this.$t('user.forget_password_sended'),
              confirmButtonText: this.$t('dialog.ok'),
              icon:'success'
            }).then((result)=>{
              this.$router.push('/single/reset-password/' + response.data.data.token)
            });
          }
          else {
            this.$swal({
              text: response.data.message,
              confirmButtonText: this.$t('dialog.ok'),
              icon:'warning'
            }).then(()=>{
              this.mobile='';
              this.loading=false;
            });
          }
        })
      }
    }
  }
})
</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col md="5">
        <v-card :loading="loading ? 'blue' : null" :title="$t('app.name')" :subtitle="$t('user.forget_password')">
          <v-card-text>
            <v-form ref="form" :disabled="loading" fast-fail @submit.prevent="submit()" >
              <v-text-field
                  v-model="mobile"
                  class="mb-2"
                  :label="$t('user.mobile')"
                  :placeholder="$t('user.mobile_placeholder')"
                  single-line
                  type="phone"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                  :rules="rules.mobile"
              ></v-text-field>
              <v-btn
                  :loading="loading"
                  block
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  variant="flat"
                  prepend-icon="mdi-send-circle"
                  type="submit"
              >
                {{ $t('user.send_code_forget_password') }}
              </v-btn>
            </v-form>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
