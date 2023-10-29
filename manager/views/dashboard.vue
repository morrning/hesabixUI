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

  }},
  methods:{
    loadData(){

    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>