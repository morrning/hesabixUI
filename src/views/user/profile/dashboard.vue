<template>
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">پروفایل کاربری</h3>
      </div>
      <div class="block-content mt-0">
        <div class="row pb-sm-3 pb-md-5">
          <div class="col-sm-12 justify-content-center text-center">
            <vue-gravatar class="img-avatar img-avatar128 img-avatar-thumb" :email="this.user_email" :size="150" />

          </div>
          <div class="col-sm-10 col-md-8">
              <div class="my-2">
                <label class="form-label">پست الکترونیکی</label>
                <input type="text" class="form-control" v-model="user_email" disabled="disabled">
                <div class="form-text text-danger">تغییر پست الکترونیکی هم اکنون امکانپذیر نیست.</div>
              </div>
            <FormKit type="form" :submit-attrs="{
                              inputClass: 'btn btn-alt-primary mt-4'
                            }"
                     submit-label="ثبت"
                     @submit="updateProfile"
            >
              <FormKit
                  type="text"
                  name="fullname"
                  id="fullname"
                  input-class="form-control"
                  v-model="user_fullname"
                  validation="required"
                  label="نام و نام خانوادگی:"
                  placeholder="بابک علی زاده"
              />
            </FormKit>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  data() {
    return{
      user_fullname: '',
      user_email: ''
    }
  },
  methods:{
    updateProfile(values){
      axios.post( '/api/user/update/info', values)
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
  },
  mounted(){
    axios.post( '/api/user/current/info')
        .then((res) =>{
          this.user_email = res.data.email;
          this.user_fullname = res.data.fullname;
        });
  }
}
</script>

<style scoped>

</style>