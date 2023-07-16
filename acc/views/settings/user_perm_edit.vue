<template>
  <div class="block block-content-full">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <router-link class="text-warning mx-2 px-2" to="/acc/business/users">
          <i class="fa fw-bold fa-arrow-right"></i>
        </router-link>
        تنظیمات دسترسی
      </h3>
      <div class="block-options">

      </div>
    </div>
    <div class="block-content p-0">
      <div class="alert alert-primary">
        ویرایش دسترسی‌های کاربر با نام
        <span class="fw-bold">{{this.info.user}}</span>
        با پست الکترونیکی
        <span class="fw-bold">{{this.info.email}}</span>
      </div>
      <div class="container-fluid">
        <div class="row">
          <label class="form-label">دسترسی ها</label>
          <div class="col-sm-12 col-md-4">
            <div class="mb-2">
              <div class="space-y-2">
                <div class="form-check form-switch">
                  <input v-model="info.persons" @change="savePerms()" class="form-check-input" type="checkbox">
                  <label class="form-check-label">اشخاص</label>
                </div>
              </div>
              <div class="space-y-2">
                <div class="form-check form-switch">
                  <input v-model="info.getpay" @change="savePerms()" class="form-check-input" type="checkbox">
                  <label class="form-check-label">دریافت و پرداخت</label>
                </div>
              </div>
              <div class="space-y-2">
                <div class="form-check form-switch">
                  <input v-model="info.commodity" @change="savePerms()" class="form-check-input" type="checkbox">
                  <label class="form-check-label">کالا و خدمات</label>
                </div>
              </div>
              <div class="space-y-2">
                <div class="form-check form-switch">
                  <input v-model="info.banks" @change="savePerms()" class="form-check-input" type="checkbox">
                  <label class="form-check-label">حساب‌های بانکی</label>
                </div>
              </div>
              <div class="space-y-2">
                <div class="form-check form-switch">
                  <input v-model="info.bankTransfer" @change="savePerms()" class="form-check-input" type="checkbox">
                  <label class="form-check-label">انتقال بین بانکی</label>
                </div>
              </div>

            </div>
          </div>
          <div class="col-sm-12 col-md-4">
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="info.buy" @change="savePerms()" class="form-check-input" type="checkbox">
                <label class="form-check-label">فاکتورهای خرید</label>
              </div>
            </div>
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="info.sell" @change="savePerms()" class="form-check-input" type="checkbox">
                <label class="form-check-label">فاکتورهای فروش</label>
              </div>
            </div>
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="info.cost" @change="savePerms()" class="form-check-input" type="checkbox">
                <label class="form-check-label">هزینه‌ها</label>
              </div>
            </div>
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="info.income" @change="savePerms()" class="form-check-input" type="checkbox">
                <label class="form-check-label">درآمدها</label>
              </div>
            </div>
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="info.report" @change="savePerms()" class="form-check-input" type="checkbox">
                <label class="form-check-label">گزارشات</label>
              </div>
            </div>

          </div>
          <div class="col-sm-12 col-md-4">
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="info.accounting" @change="savePerms()" class="form-check-input" type="checkbox">
                <label class="form-check-label">اسناد حسابداری</label>
              </div>
            </div>
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="info.settings" @change="savePerms()" class="form-check-input" type="checkbox">
                <label class="form-check-label">تنظیمات کسب و کار</label>
              </div>
            </div>
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="info.log" @change="savePerms()" class="form-check-input" type="checkbox">
                <label class="form-check-label">تاریخچه کسب‌و‌کار</label>
              </div>
            </div>
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="info.permission" @change="savePerms()" class="form-check-input" type="checkbox">
                <label class="form-check-label">تغییر سطوح دسترسی</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import axios from "axios";

export default {
  name: "user_perm_edit",
  data:()=>{return{
    info:{
      user: '',
      email: '',
      persons: null,
      getpay: null,
      commodity: null,
      banks: null,
      bankTransfer: null,
      buy: null,
      sell: null,
      cost: null,
      income: null,
      accounting: null,
      settings: null,
      report: null,
      log: null,
      permission: null
    }
  }},
  methods:{
    getData(id){
      axios.post('/api/business/get/user/permissions',
          {'bid':localStorage.getItem('activeBid'),
            'email':id
          }
      ).then((response)=>{
        this.info.email = id;
        this.info.settings = response.data.settings;
        this.info.user = response.data.user;
        this.info.persons = response.data.persons;
        this.info.commodity = response.data.commodity;
        this.info.getpay = response.data.getpay;
        this.info.banks = response.data.banks;
        this.info.bankTransfer = response.data.bankTransfer;
        this.info.cost = response.data.cost;
        this.info.income = response.data.income;
        this.info.buy = response.data.buy;
        this.info.sell = response.data.sell;
        this.info.accounting = response.data.accounting;
        this.info.report = response.data.report;
        this.info.log = response.data.log;
        this.info.permission = response.data.permission;
      })
    },
    savePerms(){
      axios.post('/api/business/save/user/permissions',{
        'bid': localStorage.getItem('activeBid'),
        'email': this.info.email,
        'persons':this.info.persons,
        'getpay':this.info.getpay,
        'commodity': this.info.commodity,
        'buy': this.info.buy,
        'sell': this.info.sell,
        'cost': this.info.cost,
        'income': this.info.income,
        'accounting': this.info.accounting,
        'settings': this.info.settings,
        'bank': this.info.banks,
        'bankTransfer': this.info.bankTransfer,
        'report': this.info.report,
        'log': this.info.log,
        'permission': this.info.permission,
      })
    }
  },
  beforeRouteEnter(to,from,next) {
    next(vm => {
      vm.getData(to.params.email);
    })
  },
}
</script>

<style scoped>

</style>