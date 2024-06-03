<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "list",
  data: ()=>{return {
    searchValue: '',
    loading: ref(true),
    items:[],
    headers: [
      { text: "عملیات", value: "operation"},
      { text: "نام", value: "name" },
      { text: "مالک", value: "owner"},
      { text: "موبایل مالک", value: "ownerMobile"},
      { text: "تاریخ ایجاد", value: "dateRegister"},
      { text: "تعداد کالا و خدمات", value: "commodityCount"},
      { text: "تعداد اشخاص", value: "personsCount"},
      { text: "تعداد اسناد حسابداری", value: "hesabdariDocsCount"},
      { text: "تعداد اسناد انبار", value: "StoreroomDocsCount"},
    ]
  }},
  methods: {
    loadData(){
      axios.get('/api/admin/business/list')
          .then((response)=>{
            this.items = response.data;
            this.loading = false;
          })
    },
  },
  beforeMount() {
    this.loadData();
  }
})
</script>

<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-list-dots px-2"></i>
        کسب و کار‌ها
        <span class="badge bg-secondary">{{ this.items.length }}</span>
      </h3>
      <div class="block-options">
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
          <EasyDataTable table-class-name="customize-table"
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

            </template>
            <template #item-status="{ status }">
              <span v-if="status" class="text-success">فعال</span>
              <span v-else class="text-danger">غیرفعال</span>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>