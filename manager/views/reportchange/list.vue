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
      { text: "تاریخ", value: "dateSubmit", sortable: true},
      { text: "نسخه", value: "version", sortable: true},
      { text: "عملیات", value: "operation"},
    ]
  }},
  methods:{
    loadData(){
      this.loading = true;
      axios.post('/api/admin/reportchange/lists').then((response)=>{
        this.items = response.data;
        this.loading = false;
      })
    },
    deleteItem(code){
      Swal.fire({
        text: 'آیا برای حذف این مورد مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon:'warning'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/admin/reportchange/delete/' + code
          ).then((response)=>{
            if(response.data.result == 1){
              let index = 0;
              for(let z=0; z<this.items.length; z++){
                index ++;
                if(this.items[z]['id'] == code){
                  this.items.splice(index -1 ,1);
                }
              }
              Swal.fire({
                text: 'با موفقیت حذف شد.',
                icon: 'success',
                confirmButtonText: 'قبول'
              });
            }
            else if(response.data.result == 2){
              Swal.fire({
                text: response.data.message,
                icon: 'warning',
                confirmButtonText: 'قبول'
              });
            }
          })
        }
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
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-history"></i>
        گزارشات تغییر نسخه</h3>
      <div class="block-options">
        <router-link to="/manager/reportchange/mod/0" class="btn btn-sm btn-primary">
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
              <div class="btn-group btn-group-sm">
                <button type="button" @click="deleteItem(id)" href="/app/changes/delete/1" class="btn btn-alt-danger" aria-label=" حذف ">
                  <i class="fa fa-trash"></i>
                </button>
                <router-link :to="'/manager/reportchange/mod/' + id" class="btn btn-alt-secondary" aria-label=" حذف ">
                  <i class="fa fa-edit"></i>
                </router-link>
              </div>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>