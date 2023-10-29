<script lang="ts">
import {defineComponent,ref} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "ticketList",
  data: ()=>{return {
    printID:'',
    loading : ref(false),
    inputItems:[],
    inputSearchValue: '',
    outputItems:[],
    outputSearchValue: '',
    headers: [
      { text: "شماره", value: "code" },
      { text: "تاریخ", value: "date", sortable: true},
      { text: "شماره فاکتور", value: "doc.code", sortable: true},
      { text: "نوع حواله", value: "typeString"},
      { text: "شخص", value: "person.nikename", sortable: true},
      { text: "توضیحات", value: "des", sortable: true},
      { text: "عملیات", value: "operation"},
    ]
  }},
  methods: {
    loadData(){
      axios.get('/api/storeroom/tickets/list/input')
          .then((response)=>{
            this.inputItems = response.data;
            this.loading = false;
          });
      axios.get('/api/storeroom/tickets/list/output')
          .then((response)=>{
            this.outputItems = response.data;
            this.loading = false;
          });
      axios.get('/api/storeroom/tickets/list/input')
          .then((response)=>{
            this.inputItems = response.data;
            this.loading = false;
          });
    },
  },
  beforeMount() {
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
        <i class="mx-2 fa fa-folder-tree"></i>
        حواله‌های انبار </h3>
      <div class="block-options">
        <router-link to="/acc/storeroom/new/ticket/type" class="btn btn-sm btn-primary ms-1">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
      </div>
    </div>
    <div class="block-content p-0">
      <div class="col-sm-12 col-md-12 m-0 p-0">
        <ul class="nav nav-pills flex-column flex-sm-row border border-secondary" id="myTab" role="tablist">
          <button class="flex-sm-fill text-sm-center nav-link rounded-0" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">
            <i class="fa fa-file-export me-2"></i>
            حواله‌های خروج
          </button>
          <button class="flex-sm-fill text-sm-center nav-link rounded-0" id="pays-tab" data-bs-toggle="tab" data-bs-target="#pays" type="button" role="tab" aria-controls="pays" aria-selected="false">
            <i class="fa fa-file-import me-2"></i>
            حواله‌های ورود
          </button>
        </ul>
        <div class="tab-content p-0" id="myTabContent">
          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="m-1">
              <div class="input-group input-group-sm">
                <span class="input-group-text"><i class="fa fa-search"></i></span>
                <input v-model="outputSearchValue" class="form-control" type="text" placeholder="جست و جو ...">
              </div>
            </div>
            <EasyDataTable
                multi-sort
                show-index
                alternating
                :search-value="outputSearchValue"
                :headers="headers"
                :items="outputItems"
                theme-color="#1d90ff"
                header-text-direction="center"
                body-text-direction="center"
                rowsPerPageMessage="تعداد سطر"
                emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
                rowsOfPageSeparatorMessage="از"
                :loading="loading"
            >
              <template #item-operation="{ id }">
                <router-link :to="'/acc/storeroom/mod/' + id">
                  <i class="fa fa-edit px-2"></i>
                </router-link>
              </template>
            </EasyDataTable>
          </div>
          <div class="tab-pane fade" id="pays" role="tabpanel" aria-labelledby="pays-tab">
            <div class="m-1">
              <div class="input-group input-group-sm">
                <span class="input-group-text"><i class="fa fa-search"></i></span>
                <input v-model="inputSearchValue" class="form-control" type="text" placeholder="جست و جو ...">
              </div>
            </div>
            <EasyDataTable
                multi-sort
                show-index
                alternating
                :search-value="inputSearchValue"
                :headers="headers"
                :items="inputItems"
                theme-color="#1d90ff"
                header-text-direction="center"
                body-text-direction="center"
                rowsPerPageMessage="تعداد سطر"
                emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
                rowsOfPageSeparatorMessage="از"
                :loading="loading"
            >
              <template #item-operation="{ id }">
                <router-link :to="'/acc/storeroom/mod/' + id">
                  <i class="fa fa-edit px-2"></i>
                </router-link>
              </template>
            </EasyDataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>