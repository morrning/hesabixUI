<script>
import axios from "axios";

export default {
  name: "archive_modal",
  data: ()=>{return{
    info:{
        size:0
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
      setTimeout(this.loadData, 10000);
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
        <div class="progress my-3 mx-1" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
        </div>
      <div class="p-2 border-top">
        <RouterLink class="btn btn-alt-primary w-100 text-center" to="/acc/archive/list">
          <i class="fa fa-fw fa-eye opacity-50 me-1"></i> مشاهده آرشیو </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>