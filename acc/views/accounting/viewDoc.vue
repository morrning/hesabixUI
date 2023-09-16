<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        سند حسابداری</h3>
    </div>
    <div class="block-content py-3 px-0 vl-parent">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <div class="fw-bold">مشخصات سند</div>
            <div class="row">
              <div class="col-sm-6 col-md-4">
                <div class="form-floating mb-3">
                  <input v-model="item.doc.code" type="text" class="form-control" disabled readonly>
                  <label for="floatingInput">شماره سند</label>
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="form-floating mb-3">
                  <input v-model="item.doc.date" type="text" class="form-control" disabled readonly>
                  <label for="floatingInput">تاریخ</label>
                </div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="form-floating mb-3">
                  <input v-model="item.doc.amount" type="text" class="form-control" disabled readonly>
                  <label for="floatingInput">تراز تجمیعی(بستانکار / بدهکار )</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-12">
                <div class="form-floating mb-3">
                  <input v-model="item.doc.des" type="text" class="form-control" disabled readonly>
                  <label for="floatingInput">شرح</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
            <div class="table-responsive">
              <table class="table table-sm table-bordered table-striped table-vcenter">
                <thead>
                <tr>
                  <th class="text-center">#</th>
                  <th>حساب</th>
                  <th>تفضیل</th>
                  <th>شرح</th>
                  <th>بدهکار</th>
                  <th>بستانکار</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in item.rows">
                    <td>{{index}}</td>
                    <td>{{ row.table }}</td>
                    <td>{{ row.refCode + '-' + row.ref }}</td>
                    <td>{{ row.des }}</td>
                    <td>{{ $filters.formatNumber(row.bd) }}</td>
                    <td>{{ $filters.formatNumber(row.bs) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import {ref} from "vue";
import Loading from "vue-loading-overlay";

export default {
  name: "viewDoc",
  components: {
    Loading,
  },
  data: ()=>{return {
    isLoading: true,
    item:null,
  }},
  methods: {
    loadData(){
      axios.post('/api/accounting/doc/get',{
        code: this.$route.params.id
      }).then((response)=>{
        this.item = response.data;
        this.item.doc.amount = this.$filters.formatNumber(this.item.doc.amount);
        this.isLoading = false;
      })

    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped>
th,td{
  text-align: center;
}
td{
  font-weight: lighter;
}
</style>