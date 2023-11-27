<script lang="ts">
import {defineComponent} from 'vue'
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "fastMod",
  data:()=>{return{
    year:{},
    data:{
      date:'',
      items:[]
    },
    units:[],
    persons:[],
    commoditySpeedAccess:[],
    searchValue: '',
    loading: ref(true),
    headers: [
      { text: "کد کالا", value: "commodity.code" },
      { text: "کالا", value: "commodity.name" },
      { text: "واحد", value: "commodity.unit"},
      { text: "تعداد", value: "count"},
      { text: "مبلغ واحد", value: "price"},
      { text: "مبلغ کل", value: "bs"},
      { text: "عملیات", value: "operation"},
    ]
  }},
  methods:{
    addFastItem(){
      let item ={
        id:0,
        name:'ddd'
      }
      this.data.items.push(item);
    },
    loadData(){
      //load year
      axios.get('/api/year/get').then((response)=>{
        this.year = response.data;
        this.data.date = response.data.now;
      })
      //load persons
      axios.get('/api/person/list').then((response)=>{
        this.persons = response.data;
      });
      //load commodities
      axios.post('/api/commodity/list',{speedAccess:true}).then((response)=>{
        this.commoditySpeedAccess = response.data;
      });
      //load commodity units
      axios.get('/api/commodity/units').then((response)=>{
        this.units = response.data;
      });
      this.loading = false;
    },
    save(){

    },
    deleteItem(code){

    }
  },
  mounted() {
    Dashmix.layout('sidebar_close');
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
        <i class="fa fa-car"></i>
        فاکتور سریع</h3>
      <div class="block-options">
        <button :disabled="this.loading" @click="save()" type="button" class="btn btn-alt-primary">
          <i class="fa fa-save"></i>
          ثبت
        </button>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row d-flex">
        <div class="col-sm-12 col-md-3">
          <div class="card">
            <div class="card-header">
              کالا ها و خدمات
            </div>
            <div class="card-body p-1">
              <button @click="addFastItem()" v-for="cm in this.commoditySpeedAccess" type="button" class="btn btn-primary m-1">
                {{cm.name}} <span class="badge text-bg-secondary">0</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-9">
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
              :items="data.items"
              theme-color="#1d90ff"
              header-text-direction="center"
              body-text-direction="center"
              rowsPerPageMessage="تعداد سطر"
              emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از"
              :loading = "loading"
          >
            <template #item-operation="{ code }">
                <span class="text-danger px-1" @click="deleteItem(code)">
                  <i class="fa fa-trash"></i>
                </span>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>