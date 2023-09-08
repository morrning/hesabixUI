<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12">
        <div class="row items-push">
          <div v-show="permissions.persons" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/persons/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold text-primary mb-1">{{stat.personCount}}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-users"></i>
                  <br>
                  اشخاص و مشتریان
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.bank" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/banks/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold text-primary mb-1">{{stat.bankCount}}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-bank"></i>
                  <br>
                  حساب‌های بانکی
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.accounting" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/accounting/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold text-primary mb-1">{{ stat.docCount }}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-book-open-reader"></i>
                  <br>
                  لیست اسناد
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.commodity" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/commodity/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold text-primary mb-1">{{stat.commodity}}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-users"></i>
                  <br>
                  کالا و خدمات
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.accounting" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/reports/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold mb-1 text-primary">{{ this.$filters.formatNumber(stat.income) }}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-chart-line"></i>
                  <br>
                  گردش مالی
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dashboard",
  data:()=>{return {
    stat:{},
    permissions:{},
    plugins:{}
  }},
  methods:{
    async loadData(){
      await axios.get('/api/user/check/login').then((response)=>{
        if(response.data.result == 1){
          axios.post('/api/business/get/user/permissions',
              {'bid':localStorage.getItem('activeBid'),
                'email': response.data.email
              }
          ).then((response)=>{
            this.permissions = response.data;
          });
          //get active plugins
          axios.post('/api/plugin/get/actives',).then((response)=>{
            this.plugins = response.data;
          });
        }
      })

      axios.post('/api/business/stat').then((response)=>{
        this.stat = response.data
      });
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>