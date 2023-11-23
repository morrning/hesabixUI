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
  <b class="text-primary">
    <i class="fa fa-message"></i>
    پیامک</b>
  <div class="">اعتبار :
    <span class="text-primary-dark">{{ this.$filters.formatNumber(smsCharge)}}</span>
    ریال
  </div>
  <div class="d-flex text-dark py-2 text-center">
    <div class="flex-grow-1 fs-sm pe-2">
      <div class="fw-semibold">
        <router-link class="btn btn-sm btn-primary" to="/acc/sms/panel">
          افزایش اعتبار
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>