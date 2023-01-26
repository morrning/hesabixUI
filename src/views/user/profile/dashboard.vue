<template>
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">پروفایل کاربری</h3>
      </div>
      <FormKit type="form" :submit-attrs="{
                              inputClass: 'btn btn-sm btn-primary rounded-0'
                            }"
                            submit-label="ثبت"
               @submit="updateProfile"
      >
      <div class="block-content">
        <div class="row justify-content-center py-sm-3 py-md-5">
          <div class="col-sm-10 col-md-8">
              <div class="my-2">
                <label class="form-label">پست الکترونیکی</label>
                <input type="text" class="form-control" v-model="user_email" disabled="disabled">
                <div class="form-text text-danger">تغییر پست الکترونیکی هم اکنون امکانپذیر نیست.</div>
              </div>
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

          </div>
        </div>
      </div>
      </FormKit>
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
                document.location.reload()
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