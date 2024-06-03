<template>
  <div class="block block-rounded">
    <div class="block-header block-header-default">
      <h3 class="block-title">
        درخواست‌های پشتیبانی
      </h3>
      <div class="block-options">
        <router-link to="/profile/support-new" class="btn btn-success">
          <i class="fa fa-plus"></i>
          جدید
        </router-link>
      </div>
    </div>
    <div class="block-content mt-0 p-1">
      <div class="row pb-sm-3 pb-md-5">
        <div class="col-sm-12 col-md-12">
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
            <template #item-operation="{ id }">
              <router-link :to="'/profile/support-view/' + id">
                <i class="fa fa-eye"></i>
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

<script>
import axios from "axios";
import {ref} from "vue";

export default {
  name: "list",
  data(){return{
    searchValue: '',
    loading: ref(true),
    items:[],
    headers: [
      { text: "تاریخ", value: "dateSubmit", sortable: true},
      { text: "عنوان", value: "title", sortable: true},
      { text: "وضعیت", value: "state", sortable: true},
      { text: "عملیات", value: "operation"},
    ]
  }},
  mounted() {
    this.loadData();
  },
  methods:{
    loadData(){
      axios.post('/api/support/list').then((response)=>{
        this.items = response.data;
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>

</style>