<template>
  <div class="container-fluid mt-3">
    <div class="row justify-content-center">
      <div class="col-11 bg-white rounded">
        <div>
          <h4 class="text-primary pt-3">سامانه مالی و حسابداری {{ siteName }}</h4>
          <p>
            {{ siteName }} با حمایت مالی شما به روز می شود.یک سامانه مالی متن باز و کاملا رایگان
          </p>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getSiteName } from "@/hesabixConfig";

export default {
  name: "dashboard",
  data:()=>{return {
    siteName:'',
  }},
  created(){
    this.siteName = getSiteName();
  },
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