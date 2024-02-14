<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-money-check-dollar px-2"></i>
         چک‌های بانکی </h3>
      <div class="block-options">
        <router-link to="/acc/cheque/mod/" class="block-options-item">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <div class="mb-1">
            <div class="input-group input-group-sm">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
              <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
            </div>
          </div>
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
              <router-link class="btn btn-link" :to="'/acc/cashdesk/mod/' + code">
                <i class="fa fa-edit px-2"></i>
              </router-link>
              <router-link class="btn btn-link" :to="'/acc/cashdesk/card/view/' + code">
                <i class="fa fa-list-check text-warning"></i>
              </router-link>
            </template>
            <template #item-name="{ name,code }">
              <router-link :to="'/acc/cashdesk/card/view/' + code">
                {{name}}
              </router-link>
            </template>
            <template #item-balance="{ balance }">
              <label class="text-success" v-if="balance >= 0">{{this.$filters.formatNumber(balance)}}</label>
              <label class="text-danger" v-else>{{this.$filters.formatNumber( -1 * balance ) }} منفی</label>
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
      { text: "عملیات", value: "operation", width: "130"},
      { text: "کد", value: "code", width: "100px" },
      { text: "نام صندوق", value: "name", width: "120px"},
      { text: "موجودی(ریال)", value: "balance", width: "140px"},
      { text: "توضیحات", value: "des", width: "150px"},
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