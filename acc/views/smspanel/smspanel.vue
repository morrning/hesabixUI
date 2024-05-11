<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "smspanel",
  data: ()=>{return {
    settings:{},
    smsCharge:100000,
    searchValue: '',
    loading: ref(true),
    items:[],
    headers: [
      { text: "تاریخ", value: "date" },
      { text: "کاربر", value: "user"},
      { text: "توضیحات", value: "des"},
    ],
    payssearchValue: '',
    paysitems:[],
    paysheaders: [
      { text: "تاریخ", value: "dateSubmit" },
      { text: "مبلغ (ریال)", value: "price"},
      { text: "توضیحات", value: "des"},
      { text: "وضعیت", value: "status"},
    ]
  }},
  methods: {
    loadData(){
      this.loading = true;
      axios.post('/api/business/logs/' + localStorage.getItem('activeBid'),{type:'sms'})
          .then((response)=>{
            this.items = response.data;
            axios.post('/api/sms/load/settings')
                .then((response)=>{
                  this.settings = response.data;
                  axios.post('/api/sms/load/pays')
                      .then((response)=>{
                        this.paysitems = response.data;
                        this.loading=false;
                      })
                });
          });
    },
    pay(){
      this.loading=true;
      axios.post('/api/sms/charge',{price:this.smsCharge})
          .then((response)=>{
            window.location = 'https://www.zarinpal.com/pg/StartPay/' + response.data.authority;
          })
    },
    saveSettings(settings){
      this.loading = true;
      axios.post('/api/sms/save/settings',{settings})
          .then((response)=>{
            this.loading=false;
          })
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
        <i class="fa fa-message"></i>
        سرویس پیامک و شارژ</h3>
      <div class="block-options">

      </div>
    </div>
    <div class="block-content py-0 my-0">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <ul class="nav nav-pills flex-column flex-sm-row" id="myTab" role="tablist">
            <button class="flex-sm-fill text-sm-center nav-link active rounded-0" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
              <i class="fa fa-plus-circle me-2"></i>
              افزایش اعتبار
            </button>
            <button class="flex-sm-fill text-sm-center nav-link rounded-0" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
              <i class="fa fa-cogs me-2"></i>
              تنظیمات
            </button>
            <button class="flex-sm-fill text-sm-center nav-link rounded-0" id="pays-tab" data-bs-toggle="tab" data-bs-target="#pays" type="button" role="tab" aria-controls="pays" aria-selected="false">
              <i class="fa fa-list-dots me-2"></i>
              سوابق خرید اعتبار
            </button>
            <button class="flex-sm-fill text-sm-center nav-link rounded-0" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">
              <i class="fa fa-history me-2"></i>
              تاریخچه
            </button>
          </ul>
          <div class="tab-content px-3" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="p-md-3">
                <div class="row">
                  <div class="col-sm-12 col-md-8">
                    <h4>مبلغ اعتبار</h4>
                    <div class="alert alert-light">
                      به مبالغ زیر ۹ درصد مالیات بر ارزش افزوده اضافه می‌گردد.
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" checked="checked" type="radio" value="100000" v-model="smsCharge">
                      <label class="form-check-label">100,000 ریال</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" value="500000" v-model="smsCharge">
                      <label class="form-check-label">500,000 ریال</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" value="1000000" v-model="smsCharge">
                      <label class="form-check-label">1,000,000 ریال</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" value="2000000" v-model="smsCharge">
                      <label class="form-check-label">2,000,000 ریال</label>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-4">
                    <img class="img" src="/img/zarinpal-logo-min.png" />
                  </div>
                </div>
              </div>
              <button :disabled="loading" class="btn btn-primary m-3" @click="pay()">
                <i class="fa fa-credit-card-alt"></i>
                پرداخت آنلاین
              </button>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="m-md-3">
                <h4>تنظیمات سرویس پیامک</h4>
                <div class="alert alert-info">
                  <i class="fa fa-info-circle me-3"></i>
                  در نظر داشته باشید در صورت اتمام اعتبار سرویس پیامک کسب و کار شما، این تنظیمات نادیده گرفته می‌شود.
                  <ul>
                    <li>پیامک‌های ارسالی به شماره ثبت شده در بخش اشخاص (تلفن همراه) ارسال می‌شود.</li>
                    <li>در صورت ثبت نکردن شماره تلفن در بخش اشخاص پیامک ارسال نمی شود و هزینه ای نیز از حساب شما کسر نخواهد شد.</li>
                  </ul>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div class="mb-2">
                    <div class="space-y-2">
                      <div class="form-check form-switch">
                        <input v-model="settings.sendAfterSell" @change="saveSettings(settings)" class="form-check-input" type="checkbox">
                        <label class="form-check-label">ارسال پیامک به مشتری بعد از صدور فاکتور فروش </label>
                      </div>
                      <div class="form-check form-switch">
                        <input disabled="disabled" v-model="settings.sendAfterSellPayOnline" @change="saveSettings(settings)" class="form-check-input" type="checkbox">
                        <label class="form-check-label">ارسال پیامک به مشتری جهت پرداخت آنلاین فاکتور فروش </label>
                      </div>
                      <hr/>
                      <div class="form-check form-switch">
                        <input disabled="disabled" v-model="settings.sendAfterBuy" @change="saveSettings(settings)" class="form-check-input" type="checkbox">
                        <label class="form-check-label">ارسال پیامک به تامین کننده بعد از صدور فاکتور خرید </label>
                      </div>
                      <div class="form-check form-switch">
                        <input disabled="disabled" v-model="settings.sendAfterBuyToUser" @change="saveSettings(settings)" class="form-check-input" type="checkbox">
                        <label class="form-check-label">ارسال پیامک به تامین کننده بعد از ثبت پرداخت فاکتور خرید </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="pays" role="tabpanel" aria-labelledby="pays-tab">
              <div class="">
                <div class="row">
                  <div class="col-sm-12 col-md-12 px-0">
                    <div class="my-2">
                      <div class="input-group input-group-sm">
                        <span class="input-group-text"><i class="fa fa-search"></i></span>
                        <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
                      </div>
                    </div>
                    <EasyDataTable
                        :headers="paysheaders"
                        :items="paysitems"
                        alternating

                        :search-value="payssearchValue"
                        theme-color="#1d90ff"
                        table-class-name="customize-table"
                        header-text-direction="center"
                        body-text-direction="center"
                        rowsPerPageMessage="تعداد سطر"
                        emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
                        rowsOfPageSeparatorMessage="از"
                        :loading="loading"
                    >
                      <template #item-status="{ status }">
                        <label class="text-danger" v-if="status == 0">
                          پرداخت نشده
                        </label>
                        <label class="text-success" v-else>
                          پرداخت شده
                        </label>
                      </template>
                    </EasyDataTable>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <div class="">
                <div class="row">
                  <div class="col-sm-12 col-md-12 px-0">
                    <div class="my-2">
                      <div class="input-group input-group-sm">
                        <span class="input-group-text"><i class="fa fa-search"></i></span>
                        <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
                      </div>
                    </div>
                    <EasyDataTable
                        :headers="headers"
                        :items="items"
                        alternating

                        :search-value="searchValue"
                        theme-color="#1d90ff"
                        table-class-name="customize-table"
                        header-text-direction="center"
                        body-text-direction="center"
                        rowsPerPageMessage="تعداد سطر"
                        emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
                        rowsOfPageSeparatorMessage="از"
                        :loading="loading"
                    />
                  </div>
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