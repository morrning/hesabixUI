<template>
  <div class="block block-content-full">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <i class="fa fa-cog"></i>
        اطلاعات کسب و کار
      </h3>
      <div class="block-options">
        <button @click="submit()" type="submit" class="btn-success btn mt-2">
          <i class="fa fa-save me-2"></i>
          ذخیره تغییرات
        </button>
      </div>
    </div>
    <div class="block-content pb-3">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="submit">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                  role="tab" aria-controls="home" aria-selected="true">اطلاعات پایه</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="year-tab" data-bs-toggle="tab" data-bs-target="#year" type="button"
                  role="tab" aria-controls="year" aria-selected="false">سال مالی</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" type="button"
                  role="tab" aria-controls="settings" aria-selected="false">تنظیمات سراسری</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                  role="tab" aria-controls="profile" aria-selected="false">درگاه پرداخت</button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="p-md-4">
                  <h3 class="text-primary">اطلاعات کسب و کار</h3>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating required">
                        <input class="form-control" type="text" v-model="content.name">
                        <label class="form-label">نام کسب و کار</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating required">
                        <input class="form-control" type="text" v-model="content.legal_name">
                        <label class="form-label">نام قانونی کسب و کار</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating">
                        <input class="form-control" type="text" v-model="content.field">
                        <label>زمینه فعالیت</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating">
                        <select v-model="content.type" class="form-select">
                          <option value="شرکت">شرکت</option>
                          <option value="مغازه">مغازه</option>
                          <option value="فروشگاه">فروشگاه</option>
                          <option value="اتحادیه">اتحادیه</option>
                          <option value="باشگاه">باشگاه</option>
                          <option value="موسسه">موسسه</option>
                          <option value="شخصی">شخصی</option>
                        </select>
                        <label>نوع فعالیت</label>
                      </div>
                    </div>
                  </div>
                  <h3 class="text-primary">اطلاعات اقتصادی</h3>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating">
                        <input v-model="content.shenasemeli" type="number" class="form-control">
                        <label class="form-label">شناسه ملی</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating">
                        <input v-model="content.codeeqtesadi" type="number" class="form-control">
                        <label class="form-label">کد اقتصادی</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating">
                        <input v-model="content.shomaresabt" type="number" class="form-control">
                        <label class="form-label">شماره ثبت</label>
                      </div>
                    </div>
                  </div>
                  <h3 class="text-primary">اطلاعات تماس</h3>
                  <div class="row">
                    <div class="col-sm-12 col-md-4 mb-2">
                      <div class="form-floating">
                        <input v-model="content.country" type="text" class="form-control">
                        <label class="form-label">کشور</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-4 mb-2">
                      <div class="form-floating">
                        <input v-model="content.ostan" type="text" id="business_new_ostan" name="business_new[ostan]"
                          maxlength="50" class="form-control form-control-sm">
                        <label class="form-label">استان</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-4 mb-2">
                      <div class="form-floating">
                        <input v-model="content.shahrestan" type="text" id="business_new_shahr"
                          name="business_new[shahr]" maxlength="50" class="form-control form-control-sm">
                        <label class="form-label">شهر</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-4 mb-2">
                      <div class="form-floating">
                        <input v-model="content.postalcode" type="text" id="business_new_codeposti"
                          name="business_new[codeposti]" maxlength="10" class="form-control form-control-sm">
                        <label class="form-label">کد پستی</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-4 mb-2">
                      <div class="form-floating">
                        <input v-model="content.tel" type="text" id="business_new_tel" name="business_new[tel]"
                          maxlength="15" class="form-control form-control-sm">
                        <label class="form-label">تلفن</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-4 mb-2">
                      <div class="form-floating">
                        <input v-model="content.mobile" type="tel" id="business_new_fax" name="business_new[fax]"
                          maxlength="15" class="form-control form-control-sm">
                        <label class="form-label">موبایل</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-12 mb-2">
                      <div class="form-floating">
                        <input type="text" v-model="content.address" id="business_new_address"
                          name="business_new[address]" maxlength="255" class="form-control form-control-sm">
                        <label class="form-label">آدرس</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating">
                        <input v-model="content.website" type="url" id="business_new_website"
                          name="business_new[website]" inputmode="url" class="form-control form-control-sm">
                        <label class="form-label">وب‌سایت</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating">
                        <input v-model="content.email" type="email" id="business_new_email" name="business_new[email]"
                          maxlength="255" class="form-control form-control-sm">
                        <label class="form-label">پست الکترونیکی</label>
                      </div>
                    </div>
                  </div>
                  <h3 class="text-primary">اطلاعات مالی</h3>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating">
                        <select v-model="content.arzmain" class="form-select">
                          <option v-for="item in moneys" :value="item.name">{{ item.label }}</option>
                        </select>
                        <label class="form-label required">نوع ارز اصلی</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-floating required">
                        <input v-model="content.maliyatafzode" type="number" id="business_new_maliyatafzode"
                          name="business_new[maliyatafzode]" required="required" class="form-control form-control-sm">
                        <label class="form-label">مالیات بر ارزش افزوده</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade show" id="year" role="tabpanel" aria-labelledby="year-tab">
                <div class="p-md-4">
                  <h3 class="text-primary">سال مالی</h3>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-control">
                        <label class="form-label">
                          <span class="text-danger">*</span>
                          شروع سال مالی
                        </label>
                        <date-picker class="" v-model="content.year.startShamsi" format="jYYYY-jMM-jDD"
                          display-format="jYYYY/jMM/jDD" />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-control">
                        <label class="form-label">
                          <span class="text-danger">*</span>
                          اتمام سال مالی
                        </label>
                        <date-picker class="" v-model="content.year.endShamsi" format="jYYYY-jMM-jDD"
                          display-format="jYYYY/jMM/jDD" :min="content.year.startShamsi" />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-12">
                      <div class="form-control mb-2">
                        <label class="form-label">
                          <span class="text-danger">*</span>
                          عنوان سال مالی
                        </label>
                        <input v-model="content.year.label" class="form-control" type="text">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                <div class="p-md-4">
                  <h3 class="text-primary">نمایش پیوند یکتا</h3>
                  <div class="row">
                    <div class="col-sm-12 col-md-8 mb-2">
                      <div class="space-y-2">
                        <div class="form-check form-switch">
                          <input v-model="content.shortlinks" class="form-check-input" type="checkbox">
                          <label class="form-check-label">فعال‌سازی پیوند‌های یکتا</label>
                          <label class="text-muted">این قابلیت برای تولید پیوند‌های یکتا برای ارسال به مشتری جهت مشاهده
                            فاکتورها است.</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 class="text-primary">دریافت مبلغ فاکتور از طریق کیف پول</h3>
                  <div class="row">
                    <div class="col-sm-12 col-md-12 mb-2">
                      <div class="space-y-2">
                        <div class="form-check form-switch">
                          <input @change="checkBanksExist()" v-model="content.walletEnabled" class="form-check-input"
                            type="checkbox">
                          <label class="form-check-label">فعال‌سازی دریافت آنلاین از طریق کیف پول</label>
                          <label class="text-muted">با فعال سازی این قابلیت قادر خواهید بود مبالغ فاکتورهای ثبت شده را
                            به صورت آنلاین از مشتریان خود دریافت کنید.</label>
                        </div>
                      </div>
                      <div class="row" v-show="content.walletEnabled">
                        <div class="col-sm-12 col-md-6">
                          <label class="mb-2">حساب بانکی متصل به کیف پول</label>
                          <div class="col">
                            <v-select dir="rtl" :options="listBanks" label="name" v-model="content.walletMatchBank"
                              @option:deselecting="" @search:focus="" @option:selecting="">
                              <template #no-options="{ search, searching, loading }">
                                وردی یافت نشد!
                              </template>
                            </v-select>
                          </div>
                        </div>
                        <label class="text-muted">برای تسویه اتوماتیک به حساب انتخاب شده حتما باید تمام موارد از جمله
                          شماره شبا و شماره کارت و
                          ... به درستی تکمیل شده باشد در غیر این صورت تراکنش با خطا مواجه خواهد شد.</label>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="p-md-4">
                  <h3 class="text-primary">درگاه پرداخت زرین پال</h3>
                  <div class="row">
                    <div class="col-sm-12 col-md-8 mb-2">
                      <div class="form-floating required">
                        <input class="form-control" type="text" v-model="content.zarinpal">
                        <label class="form-label">کد شناسایی: مثال a1104652-18b9-4b63-911c-0a5046e61be1</label>
                      </div>
                      <label class="text-muted mt-2">برای غیر فعال کردن درگاه پرداخت آن را خالی بگذارید. در صورت اشتباه
                        بودن کد وارد
                        شده × مشتری در هنگام تسویه فاکتورها با خطا مواجه خواهد شد.</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "bussiness",
  data: () => {
    return {
      moneys: [],
      content: {
        name: '',
        legal_name: '',
        field: '',
        type: 'مغازه',
        shenasemeli: '',
        codeeqtesadi: '',
        shomaresabt: '',
        country: '',
        ostan: '',
        shahrestan: '',
        postalcode: '',
        tel: '',
        mobile: '',
        address: '',
        website: '',
        email: '',
        arzmain: [],
        maliyatafzode: 9,
        zarinpalCode: '',
        shortlinks: false,
        walletEnabled: false,
        walletMatchBank: '',
        year: {}
      },
      listBanks: [],
    }
  },
  methods: {
    checkBanksExist() {
      if (this.listBanks.length === 0) {
        Swal.fire({
          text: 'هنوز هیچ حساب بانکی تعریف نشده است.',
          icon: 'error',
          confirmButtonText: 'تعریف حساب جدید',
          cancelButtonText: 'بازگشت',
          showCancelButton: true
        }).then((res) => {
          if (res.isConfirmed) {
            this.$router.push('/acc/banks/mod/');
          }
          else {
            this.content.walletEnabled = false;
          }
        });
      }
    },
    submit() {
      if (this.content.year.label === '' || this.content.name === '' || this.content.legal_name === '' || this.content.maliyatafzode === '') {
        Swal.fire({
          text: 'تکمیل موارد ستاره دار الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      if (this.content.walletEnabled && (this.content.walletMatchBank === undefined || this.content.walletMatchBank === null)) {
        Swal.fire({
          text: 'حساب بانکی متصل به کیف پول انتخاب نشده است',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else {
        //submit data
        let data = axios.post('/api/business/insert', {
          'bid': localStorage.getItem('activeBid'),
          'name': this.content.name,
          'legal_name': this.content.legal_name,
          'field': this.content.field,
          'type': this.content.type,
          'shenasemeli': this.content.shenasemeli,
          'codeeqtesadi': this.content.codeeqtesadi,
          'shomaresabt': this.content.shomaresabt,
          'country': this.content.country,
          'ostan': this.content.ostan,
          'shahrestan': this.content.shahrestan,
          'postalcode': this.content.postalcode,
          'tel': this.content.tel,
          'mobile': this.content.mobile,
          'address': this.content.address,
          'website': this.content.website,
          'email': this.content.email,
          'arzmain': this.content.arzmain,
          'maliyatafzode': this.content.maliyatafzode,
          'zarinpalCode': this.content.zarinpalCode,
          'shortlinks': this.content.shortlinks,
          'walletEnabled': this.content.walletEnabled,
          'walletMatchBank': this.content.walletMatchBank,
          'year': this.content.year
        })
          .then((response) => {
            if (response.data.result == 1) {
              Swal.fire({
                text: 'با موفقیت ثبت شد.',
                icon: 'success',
                confirmButtonText: 'قبول',

              })
            }
            else if (response.data.result === 0) {
              Swal.fire({
                text: 'تکمیل موارد ستاره دار الزامی است.',
                icon: 'error',
                confirmButtonText: 'قبول'
              });
            }
          })
      }
    }
  },
  async beforeMount() {
    //get all money types
    axios.get("/api/money/get/all").then((response) => {
      this.moneys = response.data;
      this.content.arzmain = this.moneys[0];
    })

    //get business info
    let data = axios.post('/api/business/get/info/' + localStorage.getItem('activeBid'))
      .then((response) => {
        this.content = response.data;
      });
    //get list of banks
    axios.get('/api/bank/list').then((response) => {
      this.listBanks = response.data;
    })

  }
}
</script>

<style scoped>
.required label:before {
  content: "*";
  color: red;
}
</style>