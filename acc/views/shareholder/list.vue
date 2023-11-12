<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-circle-dot px-2"></i>
        سهامداران </h3>
      <div class="block-options">
        <router-link to="/acc/cashdesk/mod/" class="block-options-item">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <EasyDataTable
              show-index
              alternating
              :search-value="searchValue"
              :headers="headers"
              :items="items"
              theme-color="#1d90ff"
              header-text-direction="center"
              body-text-direction="center"
              rowsPerPageMessage="تعداد سطر"
              emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از"
              :loading = "loading"
          >
            <template #item-operation="{ code }">
              <button type="button" class="btn btn-link" :to="'/acc/cashdesk/mod/' + code">
                <i class="fa fa-trash px-2 text-danger"></i>
              </button>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import {ref} from "vue";

export default {
  name: "list",
  data: ()=>{return {
    searchValue: '',
    loading: ref(true),
    items:[],
    headers: [
      { text: "شخص", value: "name", width: "120px"},
      { text: "درصد سهام", value: "balance", width: "140px"},
      { text: "توضیحات", value: "des", width: "150px"},
      { text: "عملیات", value: "operation", width: "130"},
    ]
  }},
  methods: {
    loadData(){
      axios.get('/api/cashdesk/list')
          .then((response)=>{
            this.items = response.data;
            this.loading = false;
          })
    },
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>