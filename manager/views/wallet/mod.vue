<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "mod",
  data:()=>{return{
    loading: ref(true),
    item:{
      bid:{
        id:'',
        name:'',
        owner:''
      },
      shaba:'',
      card:'',
      refID:'',
      amount:0,
      bank:'',
    }
  }},
  methods:{
    loadData(){
      axios.post('/api/admin/business/info/' + this.$route.params.id).then((response)=>{
        this.item.bid = response.data;
        this.loading = false;
      });
    },
    submit(){
      this.loading = true;
      if(this.item.bank.trim() == '' || this.item.refID.trim() == '' || this.item.amount == '' || this.item.shaba.trim() == '' || this.item.card.trim() == ''){
        Swal.fire({
          text: 'موارد الزامی را تکمیل کنید.',
          icon: 'error',
          confirmButtonText: 'قبول',
        });
      }
      else {
        this.loading = true;
        axios.post('/api/admin/wallets/transactions/insert',this.item).then((response)=>{
          Swal.fire({
            text: 'با موفقیت ثبت شد.',
            icon: 'success',
            confirmButtonText: 'قبول',
          }).then((resp)=>{
            this.$router.push('/manager/wallet/transactions/list');
          });
        });
      }

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
        <i class="fa fa-wallet px-2"></i>
        ثبت واریز به حساب </h3>
      <div class="block-options">
        <button :disabled="this.loading" @click="this.submit()" type="button" class="btn btn-sm btn-primary">
          <div v-show="this.loading" class="spinner-grow spinner-grow-sm me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <i class="fa fa-save"></i>
          ذخیره تراکنش
        </button>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <div class="row">
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="item.bid.name" class="form-control" type="text" disabled="disabled">
                <label class="form-label">کسب و کار</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="item.bid.owner" class="form-control" type="text" disabled="disabled">
                <label class="form-label">مالک کسب و کار</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input @keypress="this.$filters.onlyNumber($event)" v-model="item.amount" class="form-control" type="number" :disabled="loading">
                <label class="form-label"><span class="text-danger">(لازم)</span> مبلغ(ریال)</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="item.bank" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger">(لازم)</span> بانک مبدا </label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="item.shaba" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger">(لازم)</span>شماره شبا</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="item.card" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger">(لازم)</span> شماره کارت</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="item.refID" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger">(لازم)</span> شماره پیگیری</label>
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