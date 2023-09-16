<template>
  <div class="block block-rounded mb-5">
    <div class="block-header block-header-default">
      <h3 class="block-title">پروفایل کاربری</h3>
    </div>
    <div class="block-content">
      <div class="row pb-sm-3 pb-md-5 justify-content-center">
        <div class="col-sm-12 col-md-4 my-5 text-center">
          <vue-gravatar class="img-avatar img-avatar128 img-avatar-thumb" :email="this.user_email" :size="150" />
        </div>
        <div class="col-sm-10 col-md-8">
          <div class="form-floating mb-3">
            <input disabled="disabled" class="form-control" type="text" v-model="user_email">
            <label>پست الکترونیکی</label>
            <small class="form-text text-danger">تغییر پست الکترونیکی هم‌اکنون امکان‌پذیر نیست.</small>
          </div>
          <div class="form-floating mb-3">
            <input class="form-control" type="text" v-model="user_fullname">
            <label>نام و نام خانوادگی</label>
            <small class="form-text text-danger" v-if="v$.user_fullname.$error">الزامی است.</small>
          </div>
          <button class="btn btn-primary mb-2" @click="this.updateProfile()">
            <i class="fa fa-save"></i>
            ثبت
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  name: "dashboard",
  data() {
    return{
      user_fullname: '',
      user_email: ''
    }
  },
  methods:{
    async updateProfile(){
      const result = await this.v$.$validate()
      if (!result) {
        // notify user form is invalid

      }
      else {
        axios.post( '/api/user/update/info', {
            fullname: this.user_fullname
        })
            .then(function (response) {
              Swal.fire({
                title: 'پیام',
                text: 'با موفقیت ثبت شد.',
                icon: 'success',
                confirmButtonText: 'قبول',
              }).then((result) => {
                if (result.isConfirmed) {

                }
              })
            })
      }

    }
  },
  mounted(){
    axios.post( '/api/user/current/info')
        .then((res) =>{
          this.user_email = res.data.email;
          this.user_fullname = res.data.fullname;
        });
  },
  validations () {
    return {
      user_fullname: { required },
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