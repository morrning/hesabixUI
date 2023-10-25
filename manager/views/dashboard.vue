<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12">
        داشبورد مدیریت
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
    statements:[],
    permissions:{},
    plugins:{},
    wallet:{}
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
          axios.post('/api/wallet/info',).then((response)=>{
            this.wallet = response.data;
          });
          //get statments
          axios.post('/api/general/statements',).then((response)=>{
            this.statements = response.data;
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