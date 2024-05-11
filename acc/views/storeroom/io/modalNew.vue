<script lang="ts">
import {defineComponent, ref} from 'vue'
import recList from "../../component/recList.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "modalNew",
  components: {},
  watch:{
    'item.type'(newValue,oldValue) {
      if(newValue == 'sell'){this.$data.item.title = 'فروش'}
      else if(newValue == 'buy'){this.$data.item.title = 'خرید'}
    },
  },
  data:()=>{return{
    loading: ref(false),
    storerooms:[],
    item:{
      storeroom:null,
      type:'sell',
      title:'فروش',
      docSell:null,
      docBuy:null,
      removeBeforeTickets:true
    },
    buys:[],
    sells:[]
  }},
  methods: {
    loadData(){
      this.loading = true;
      axios.get('/api/storeroom/list')
          .then((response)=>{
            this.storerooms = response.data;
            this.storerooms.forEach((element)=>{
              element.name = element.name + ' انباردار : ' + element.manager
            });
            this.loading = false;
          });
      axios.post('/api/storeroom/docs/get').then((response)=>{
        this.buys = response.data.buys;
        this.sells = response.data.sells;
      })
    },
    submit(){
      this.loading = true;
      if(this.item.storeroom == null){
        Swal.fire({
          text: 'انبار انتخاب نشده است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        }).then((res)=>{
          this.loading = false;
        });
      }
      else if(this.item.type == 'sell' && this.item.docSell == null){
        Swal.fire({
          text: 'فاکتور فروش انتخاب نشده است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        }).then((res)=>{
          this.loading = false;
        });
      }
      else if(this.item.type == 'buy' && this.item.docBuy == null){
        Swal.fire({
          text: 'فاکتور خرید انتخاب نشده است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        }).then((res)=>{
          this.loading = false;
        });
      }
      else{
        //going to save storeroom ticket
        if(this.item.type == 'sell'){
          this.$router.push({ name: 'storeroom_new_ticket_sell', params: { doc: this.item.docSell.code,storeID:this.item.storeroom.id } } )
        }
        else if(this.item.type == 'buy'){
          this.$router.push({ name: 'storeroom_new_ticket_buy', params: { doc: this.item.docBuy.code,storeID:this.item.storeroom.id } } )
        }
      }
    }
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
        <button @click="this.$router.back()" type="button" class="btn btn-sm btn-link text-warning mx-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-file-circle-plus"></i>
        حواله انبار جدید</h3>
      <div class="block-options">
        <button :disabled="this.loading" @click="submit()" type="button" class="btn btn-sm btn-alt-primary">
          <i class="fa fa-save me-2"></i>
          ثبت
        </button>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row content">
        <div class="col-sm-12 col-md-12">
          <b class="alert alert-light">نوع حواله انبار را انتخاب کنید </b>
          <div class="row mt-4">
            <div class="col-sm-12 col-md-6 mt-2">
              <div class="form-control mb-2">
                <label class="form-label">انبار</label>
                <v-select
                    dir="rtl"
                    :options="storerooms"
                    label="name"
                    v-model="item.storeroom"
                >
                  <template #no-options="{ search, searching, loading }">
                    وردی یافت نشد!
                  </template>
                </v-select>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
              <b class="mb-3 pb-3">نوع حواله انبار</b>
              <div class="form-check mt-3">
                <input v-model="this.item.type" value="sell" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                  حواله برای فاکتور فروش
                </label>
              </div>
              <div class="form-check">
                <input v-model="this.item.type" value="buy" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                <label class="form-check-label" for="flexRadioDefault2">
                  حواله برای فاکتور خرید
                </label>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 mt-2">
              <div class="rounded-2 border border-secondary bg-danger-light p-2">
                <span>فاکتور {{item.title}}</span>
                <v-select v-if="this.item.type == 'buy'"
                    dir="rtl"
                    :options="buys"
                    label="des"
                    v-model="item.docBuy"
                    class="bg-white"
                >
                  <template #no-options="{ search, searching, loading }">
                    وردی یافت نشد!
                  </template>
                </v-select>
                <v-select v-if="this.item.type == 'sell'"
                          dir="rtl"
                          :options="sells"
                          label="des"
                          v-model="item.docSell"
                          class="bg-white"
                >
                  <template #no-options="{ search, searching, loading }">
                    وردی یافت نشد!
                  </template>
                </v-select>
                <div class="form-check mt-2 ms-3">
                  <input v-model="this.item.removeBeforeTickets" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    حذف حواله‌های انباری که قبلا برای این فاکتور صادر شده است.
                  </label>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>