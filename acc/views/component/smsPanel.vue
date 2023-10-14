<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "smsPanel",
  data:()=>{return {
      smsCharge: 0
  }},
  mounted() {
    this.loadData();
  },
  methods:{
    loadData(){
      axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
        this.smsCharge = response.data.smsCharge;
      });
      setTimeout(this.loadData, 10000);
    }
  }
})
</script>

<template>
  <div class="dropdown d-inline-block">
    <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm btn-alt-warning me-2" data-bs-toggle="dropdown" id="page-header-notifications-dropdown" type="button">
      <i class="fa fa-fw fa-message"></i>
    </button>
    <div aria-labelledby="page-header-notifications-dropdown" class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" style="">
      <div class="bg-warning rounded-top fw-semibold text-dark text-center p-3"> سرویس پیامک </div>
      <ul class="nav-items my-2">
        <li>
          <div class="d-flex text-dark py-2 text-center">
            <div class="flex-grow-1 fs-sm pe-2">
              <div class="fw-semibold">اعتبار پیامکی:
              {{ this.$filters.formatNumber(smsCharge)}}
                ریال
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="d-flex text-dark py-2 text-center">
            <div class="flex-grow-1 fs-sm pe-2">
              <div class="fw-semibold">
                <router-link class="btn btn-link" to="/acc/sms/panel">
                  افزایش اعتبار
                </router-link>
              </div>
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>