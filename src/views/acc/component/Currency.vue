<template>
  <div class="py-1 text-light">
    <i class="fa fa-money-bill"></i>
    نوع ارز</div>
  <select v-model="activeMoney" @change="changemoney($event)" class="form-select form-select-sm" >
    <option class="" v-for="item in moneys" :value="item.name">{{item.label}}</option>
  </select>
</template>

<script>
import axios from "axios";

export default {
  name: "Year",
  data: ()=>{return{
    activeMoney: null,
    moneys:{}
  }},
  async mounted() {
    await axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response)=>{
      this.moneys = response.data.moneys;
      if(localStorage.getItem('activeMoney') == ''){
        this.activeMoney = response.data.arzmain.name;
        localStorage.setItem('activeMoney',this.activeMoney.name);
      }
      else{
        this.moneys.forEach((item)=>{
          if(item.name == localStorage.getItem('activeMoney')) {
            this.activeMoney = item.name;
            localStorage.setItem('activeMoney',item.name);
          }
        });
      }
    })
  },
  methods:{
      async changemoney(event){
        localStorage.setItem('activeMoney',event.target.value);
        await axios.post('/api/money/get/info',{'name':localStorage.getItem('activeMoney')}).then((response)=>{
          localStorage.setItem('activeMoneySymbol',response.data.symbol);
          localStorage.setItem('activeMoneyShortName',response.data.shortName);
          localStorage.setItem('activeMoneyLabel',response.data.label);
        })
        window.location.reload();
      }
  }
}
</script>

<style scoped>

</style>