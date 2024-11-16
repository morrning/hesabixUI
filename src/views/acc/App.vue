<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
import Swal from "sweetalert2";

import { getApiUrl, getSiteName } from "@/hesabixConfig"
export default {

  data() {
    return {
      
    }
  },
  async beforeMount() {
    await axios.get('/api/user/check/login').then((response) => {
      if (response.data.result == 1) {
        axios.post('/api/business/get/user/permissions',
          {
            'bid': localStorage.getItem('activeBid'),
            'email': response.data.email
          }
        ).then((response) => {
          this.permissions = response.data;
          if (response.data.active != 1) {
            // jump user to active page
            Swal.fire({
              title: 'خطا',
              text: 'حساب کاربری شما فعال نیست.لطفا ابتدا حساب کاربری خود را تایید نمایید.',
              icon: 'error',
              confirmButtonText: 'انجام احراز هویت'
            }).then((result) => {
              window.location.href = window.location.origin + '/user/active/' + this.permissions.id;
            });
          }
        });
        //get active plugins
        axios.post('/api/plugin/get/actives',).then((response) => {
          this.plugins = response.data;
        });
      }
    });
    this.apiUrl = getApiUrl();
  },
  created() {
    this.siteName = getSiteName();
  },
  methods: {
    deleteBusiness() {
      Swal.fire({
        text: 'آیا برای حذف این کسب‌و‌کار مطمئن هستید؟ بعد از تایید این عملیات کسب و کار شما به مدت یک ماه در پایگاه داده آرشیو و بعد از آن به صورت دائم حذف خواهد شد',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon: 'warning'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/business/delete').then((response) => {
            if (response.data.code == 0) {
              Swal.fire({
                text: 'کسب و کار با موفقیت حذف شد. به پروفایل کاربری باز می گردید.',
                icon: 'success',
                confirmButtonText: 'قبول'
              }).then((res) => {
                document.location = '/';
              });
            }
          })
        }
      })
    },
    exitBusiness() {
      Swal.fire({
        text: 'آیا برای خروج و ترک کسب‌و‌کار مطمئن هستید؟ ترک کسب و کار موجب قطع دسترسی شما خواهد شد و تنها از طریق مالک کسب‌و‌کار قابل بازیابی است.',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon: 'warning'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/business/removeuser/me').then((response) => {
            if (response.data.result == 1) {
              Swal.fire({
                text: 'عملیات با موفقیت انجام شد. به صفحه پروفایل کاربری باز می گردید.',
                icon: 'success',
                confirmButtonText: 'قبول'
              }).then((res) => {
                document.location = '/';
              });
            }
          })
        }
      })

    },
    logout() {
      axios.post('/api/user/logout')
        .then((response) => {
          localStorage.removeItem('X-AUTH-TOKEN');
          window.location.href = "/";
          delete axios.defaults.headers.common['X-AUTH-TOKEN'];
        });
    },
    isPluginActive(plugName) {
      return this.plugins[plugName] !== undefined;
    },
    saveTicket() {
      if (this.ticket.title.trim() == '' || this.ticket.body.trim() == '') {
        Swal.fire({
          text: 'تکمیل موارد ستاره دار الزامی است.',
          confirmButtonText: 'قبول',
        })
      }
      else {
        this.isLoading = true;
        axios.post('/api/support/mod', this.ticket).then((response) => {
          this.isLoading = false;
          Swal.fire({
            text: 'درخواست با موفقیت ثبت شد.',
            confirmButtonText: 'قبول',
          }).then((result) => {
            this.ticket.title = '';
            this.ticket.body = '';
            Dashmix.layout('side_overlay_close');
          })
        })
      }
    }
  },
  async mounted() {
    axios.post('/api/user/check/login')
      .then((response) => {
        this.isLogedIn = response.data.result;
        axios.post('/api/user/current/info')
          .then((res) => {
            this.userEmail = res.data.email;
            this.userFullName = res.data.fullname;
            this.$isLogedIn = true;
          });
      });

    axios.post('/api/business/list/count')
      .then((response) => {
        this.business_count = response.data.count;
      });
    axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
      this.business = response.data;
    });
    axios.post('/api/general/get/time').then((response) => {
      this.timeNow = response.data.timeNow;
    });
    axios.post('/api/system/get/data').then((response) => {
      this.system = response.data;
    });
  },
  components: {
   
  }
}
</script>

<template>
  
</template>

<style global>

</style>
