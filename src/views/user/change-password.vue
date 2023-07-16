<template>
  <div class="block block-rounded">
    <div class="block-header block-header-default">
      <h3 class="block-title">
        تغییر کلمه عبور
      </h3>
    </div>
    <div class="block-content mt-0">
      <div class="row pb-sm-3 pb-md-5">
        <div class="col-sm-10 col-md-8">
          <form @submit.prevent="changePassword">
            <div class="form-floating mb-3">
              <input class="form-control" type="password" v-model="pass">
              <label>کلمه عبور</label>
              <small class="form-text text-danger" v-if="v$.pass.$error">حداقل طول کلمه عبور ۱۰ کاراکتر است.</small>
            </div>
            <div class="form-floating mb-3">
              <input class="form-control" type="password" v-model="repass">
              <label>تکرار کلمه عبور</label>
              <small class="form-text text-danger" v-if="v$.repass.$error">حداقل طول تکرار کلمه عبور ۱۰ کاراکتر است.</small>
            </div>
            <button class="btn btn-alt-primary" type="submit">
              <i class="fa fa-save"></i>
              تغییر کلمه عبور
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import {required,minLength} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  name: "change-password",
  data: ()=>{return{
    pass: '',
    repass: '',
  }},
  methods:{
    async changePassword(){
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        if(this.pass !== this.repass){
          Swal.fire({
            title: 'خطا',
            text: 'کلمات عبور وارد شده یکسان نیست',
            icon: 'error',
            confirmButtonText: 'قبول',
          })
        }
        else{
          axios.post( '/api/user/change/password', {
            pass: this.pass,
            repass: this.repass
          }).then(function (response) {
            if(response.data.result === true){
              Swal.fire({
                title: 'پیام',
                text: 'کلمه عبور با موفقیت تغییر یافت',
                icon: 'success',
                confirmButtonText: 'قبول',
              }).then((result) => {
                window.location.href = '/profile/dashboard'
              })
            }
          })
        }
      }

    }
  },
  validations () {
    return {
      pass: {
        required ,
        minLengthValue: minLength(10),
      },
      repass: {
        required ,
        minLengthValue: minLength(10),
      },
    }
  },
  setup () {
    return {
      v$: useVuelidate()
    }
  },
}
</script>

<style scoped>

</style>