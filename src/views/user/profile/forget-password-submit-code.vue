<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";
import {useUserStore} from "@/stores/userStore";
export default defineComponent({
  name: "reset-password",
  data() {
    const self = this;
    return {
      dialog:false,
      loading:false,
      counting:true,
      code: '',
    }
  },
  methods:{
    onCountdownEnd(){
      this.counting = false;
    },
    onResendCodeClick(){
      axios.post('/api/user/forget-password/resend-code',{'key':this.$route.params.id}).then((response:any)=>{
        this.counting = true;
        this.$swal({
          text: this.$t('user.resendCode'),
          confirmButtonText: this.$t('dialog.ok'),
          icon:'success'
        });
      });

    },
    async submit(){
      const { valid } = await this.$refs.form.validate()
      if(valid){
        this.loading = true;
        axios.post('/api/user/forget-password/do-reset',{
          key:this.$route.params.id,
          code:this.code
        }).then((response:any) => {
          if(response.data.error != 200){
            this.$swal({
              text: response.data.message,
              confirmButtonText: this.$t('dialog.ok'),
              icon:'warning'
            }).then(()=>{
              this.code = ''
            });
          }
          else{
            this.$swal({
              text: this.$t('user.password_sended'),
              confirmButtonText: this.$t('dialog.ok'),
              icon:'success'
            }).then(()=>{
              this.$router.push('/single/login')
            });
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
        <v-card :loading="loading ? 'blue' : null" :title="$t('app.name')" :subtitle="$t('user.forget_password')">
          <v-card-text>
            <v-form ref="form" :disabled="loading" fast-fail @submit.prevent="submit()"  >
              <v-otp-input
                  focus-all
                  v-model="code"
                  style="direction: ltr"
              ></v-otp-input>
              <v-row>
                <v-col class="my-2 mx-4">
                  <v-btn class="float-end" color="indigo" :disabled="counting" @click="onResendCodeClick()">
                    <vue-countdown v-if="counting" :time="120000" v-slot="{minutes, seconds }" @end="onCountdownEnd">
                      {{ $t('user.resendCodeLabel')}}
                      {{minutes + ':' + seconds}}
                    </vue-countdown>
                    <span v-else>{{ $t('user.send_again')}}</span>
                  </v-btn>
                </v-col>
              </v-row>

              <v-btn
                  :loading="loading"
                  block
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  variant="flat"
                  prepend-icon="mdi-send"
                  type="submit"
              >
                {{ $t('user.send_new_password') }}
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