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
      { text: "دسته‌بندی", value: "cat", sortable: true},
      { text: "عنوان", value: "title", sortable: true},
      { text: "تاریخ", value: "dateSubmit", sortable: true},
      { text: "نویسنده", value: "submitter", sortable: true},
      { text: "عملیات", value: "operation"},
    ]
  }},
  methods:{
    loadData(){
      this.loading = true;
      axios.post('/api/admin/blog/posts').then((response)=>{
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
        پست‌های وبلاگ</h3>
      <div class="block-options">
        <router-link to="/manager/blog/mod" class="btn btn-sm btn-primary">
          <i class="fa fa-plus"></i>
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
            <template #item-operation="{ id }">
              <router-link class="text-success" :to="'/manager/support/view/' + id">
                <i class="fa fa-eye px-1"></i>
              </router-link>
            </template>
            <template #item-state="{ state }">
              <span v-if="state == 'پاسخ داده شده'" class="text-success"><i class="fa fa-check-double"></i> پاسخ داده شده </span>
              <span v-else class="text-danger"><i class="fa fa-question-circle"></i> در حال پیگیری </span>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>