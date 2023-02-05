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
          <FormKit type="form" :submit-attrs="{
                              inputClass: 'btn btn-alt-primary mt-4'
                            }"
                   submit-label="تغییر کلمه عبور"
                   @submit="changePassword"

          >
            <FormKit
                type="password"
                name="pass"
                id="pass"
                input-class="form-control"
                v-model="pass"
                validation="required | min:6"
                label="کلمه عبور:"
                placeholder="*******"
            />
            <FormKit
                type="password"
                name="repass"
                id="repass"
                input-class="form-control"
                v-model="repass"
                validation="required | min:6"
                label="تکرار کلمه عبور:"
                placeholder="********"
            />
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "change-password",
  data: ()=>{return{
    pass: '',
    repass: '',
  }},
  methods:{
    changePassword(){
      if(this.pass !== this.repass){
        Swal.fire({
          title: 'خطا',
          text: 'کلمات عبور وارد شده یکسان نیست',
          icon: 'error',
          confirmButtonText: 'قبول',
        }).then((result) => {
          if (result.isConfirmed) {
          }
        })
      }
      else{
        axios.post( '/api/user/change/password', {
          pass: this.pass,
          repass: this.repass
        })
            .then(function (response) {
              if(response.data.result === true){
                Swal.fire({
                  title: 'پیام',
                  text: 'کلمه عبور با موفقیت تغییر یافت',
                  icon: 'success',
                  confirmButtonText: 'قبول',
                }).then((result) => {
                  if (result.isConfirmed) {

                  }
                })
              }
            })
            .catch(function (error) {
              Swal.fire({
                title: 'خطا',
                text: 'ارتباط با حسابیکس قطع شده است...',
                icon: 'error',
                confirmButtonText: 'قبول'
              })
            });
      }
    }
  }
}
</script>

<style scoped>

</style>