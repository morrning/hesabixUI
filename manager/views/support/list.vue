<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "list",
  data: ()=>{return {
    searchValue: '',
    loading: ref(true),
    items:[],
    headers: [
      { text: "کاربر", value: "submitter.fullName" , sortable: true},
      { text: "عنوان", value: "title", sortable: true},
      { text: "تاریخ", value: "dateSubmit", sortable: true},
      { text: "وضعیت", value: "state", sortable: true},
      { text: "عملیات", value: "operation"},
    ]
  }},
  methods:{
    loadData(){
      this.loading = true;
      axios.post('/api/admin/support/list').then((response)=>{
        this.items = response.data;
        this.loading = false;
      })
    }
  },
  mounted() {
    this.loadData();
  }
})
</script>

<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-book"></i>
        درخواست‌های پشتیبانی</h3>
      <div class="block-options">
        <router-link to="/acc/sell/mod/" class="block-options-item">
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
            <template #item-operation="{ code,type }">
              <router-link class="text-success" :to="'/acc/accounting/view/' + code">
                <i class="fa fa-eye px-1"></i>
              </router-link>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>