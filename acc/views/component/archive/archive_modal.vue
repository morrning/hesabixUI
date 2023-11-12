<script>
import axios from "axios";

export default {
  name: "archive_modal",
  data: ()=>{return{
    info:{
      size:0,
      remain:0
    }
  }},
  created() {
    this.loadData()
  },
  methods:{
    loadData(){
      axios.post('/api/archive/info').then((response)=>{
       this.info = response.data;
      });
      setTimeout(this.loadData, 60000);
    }
  }
}
</script>

<template>
  <div class="dropdown d-inline-block">
    <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm btn-alt-primary me-2" data-bs-toggle="dropdown" id="page-header-archive-dropdown" type="button">
      <i class="fa fa-fw fa-folder"></i>
    </button>
    <div aria-labelledby="page-header-archive-dropdown" class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" style="">
      <div class="bg-primary-dark rounded-top fw-semibold text-white text-center p-3">فضای ذخیره سازی</div>
        <label class="p-2">کل فضا: <span class="text-primary-dark">{{this.$filters.formatNumber(this.info.size)}}</span> مگابایت </label>
        <label class="p-2">استفاده شده: <span class="text-primary-dark">{{this.$filters.formatNumber(this.info.remain)}}</span> مگابایت </label>
      <div class="progress my-3 mx-1" role="progressbar" aria-label="فضای استفاده شده" :aria-valuenow="this.info.remain" aria-valuemin="0" :aria-valuemax="this.info.size">
            <div class="progress-bar progress-bar-striped progress-bar-animated" :style="'width: ' + ((parseInt(this.info.remain) * 100) / parseInt(this.info.size)) + '%'"></div>
        </div>
    </div>
  </div>
</template>

<style scoped>

</style>