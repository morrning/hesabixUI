<template>
  <div class="block block-rounded mb-5">
    <div class="block-header block-header-default">
      <h3 class="block-title">کسب و کار جدید</h3>
    </div>
    <div class="block-content">
      <div class="container mb-5">
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="submit">
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
                    <input v-model="content.shenasemeli" type="text" class="form-control">
                    <label class="form-label">شناسه ملی</label>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 mb-2">
                  <div class="form-floating">
                    <input v-model="content.codeeqtesadi" type="text" class="form-control">
                    <label class="form-label">کد اقتصادی</label>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 mb-2">
                  <div class="form-floating">
                    <input v-model="content.shomaresabt" type="text" class="form-control">
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
                    <input v-model="content.shahrestan" type="text" id="business_new_shahr" name="business_new[shahr]"
                      maxlength="50" class="form-control form-control-sm">
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
                    <input type="text" v-model="content.address" id="business_new_address" name="business_new[address]"
                      maxlength="255" class="form-control form-control-sm">
                    <label class="form-label">آدرس</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-6 mb-2">
                  <div class="form-floating">
                    <input v-model="content.website" type="url" id="business_new_website" name="business_new[website]"
                      inputmode="url" class="form-control form-control-sm">
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
                      <option v-for="item in content.moneys" :value="item.name">{{ item.label }}</option>
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
              <h3 class="text-primary">سال مالی</h3>
              <div class="row">
                <div class="col-sm-12 col-md-6 mb-2">
                  <div class="form-control">
                    <label class="form-label">
                      <span class="text-danger">*</span>
                      شروع سال مالی
                      </label>
                    <date-picker class="" v-model="content.year.start" format="jYYYY/jMM/jDD" display-format="jYYYY/jMM/jDD"
                       />
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 mb-2">
                  <div class="form-control">
                    <label class="form-label">
                      <span class="text-danger">*</span>
                      اتمام سال مالی
                    </label>
                    <date-picker class="" v-model="content.year.end" format="jYYYY/jMM/jDD" display-format="jYYYY/jMM/jDD"
                      :min="content.year.start" />
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
              <button :disabled="loading" type="submit" class="btn-alt-primary btn  mt-2">
                <i class="fa fa-save me-2"></i>
                ایجاد کسب‌و‌کار
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "insert",
  data: () => {
    return {
      loading: false,
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
        moneys: '',
        year:{
          start:'',
          end:'',
          label:''
        }
      }
    }
  },
  methods: {
    submit() {
      if (this.content.year.label == '' || this.content.year.start == '' || this.content.year.end == '' || this.content.name === '' || this.content.legal_name === '' || this.content.maliyatafzode === '') {
        Swal.fire({
          text: 'تکمیل موارد ستاره دار الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else {
        //submit data
        this.loading = true;
        let data = axios.post('/api/business/insert', {
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
          'year':this.content.year
        })
          .then((response) => {
            if (response.data.result == 1) {
              Swal.fire({
                title: 'پیام',
                text: 'با موفقیت ثبت شد.',
                icon: 'success',
                confirmButtonText: 'قبول',

              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.push('/profile/business')
                }
              });
            }
            else if (response.data.result === 0) {
              Swal.fire({
                text: 'تکمیل موارد ستاره دار الزامی است.',
                icon: 'error',
                confirmButtonText: 'قبول'
              });
            }
            else if (response.data.result === 3) {
              Swal.fire({
                text: 'در هر روز تنها قادر به ایجاد یک کسب و کار هستید.لطفا بعدا دوباره اقدام کنید.',
                icon: 'error',
                confirmButtonText: 'قبول'
              });
            }
            this.loading = false;
          })
      }
    }
  },
  async beforeMount() {
    //get all money types
    this.content.moneys = (await axios.get("/api/money/get/all")).data;
    this.content.arzmain = this.content.moneys[0].name;

  },
  watch: {
    'content.year.start': {
      handler: function (val, oldVal) {
       let year = this.content.year.start.split('/');
       year[0] = parseInt(year[0]) + 1;
       this.content.year.end = year.join('/');
       year.reverse();
       this.content.year.label = "سال مالی منتهی به " + year.join('/');
      },
      deep: true
    },
  },
}
</script>

<style scoped>
.required label:before {
  content: "*";
  color: red;
}
</style>