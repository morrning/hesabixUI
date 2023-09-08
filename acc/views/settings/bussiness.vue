<template>
  <div class="block block-content-full">
    <div class="block-header block-header-default bg-gray-light" >
      <h3 class="block-title text-primary-dark">
        <i class="fa fa-cog"></i>
        اطلاعات کسب و کار</h3>
      <div class="block-options">
      </div>
    </div>
    <div class="block-content pb-3">
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
                  <input v-model="content.ostan" type="text" id="business_new_ostan" name="business_new[ostan]" maxlength="50" class="form-control form-control-sm">
                  <label class="form-label">استان</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-4 mb-2">
                <div class="form-floating">
                  <input v-model="content.shahrestan" type="text" id="business_new_shahr" name="business_new[shahr]" maxlength="50" class="form-control form-control-sm">
                  <label class="form-label">شهر</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-4 mb-2">
                <div class="form-floating">
                  <input v-model="content.postalcode" type="text" id="business_new_codeposti" name="business_new[codeposti]" maxlength="10" class="form-control form-control-sm">
                  <label  class="form-label">کد پستی</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-4 mb-2">
                <div class="form-floating">
                  <input v-model="content.tel" type="text" id="business_new_tel" name="business_new[tel]" maxlength="15" class="form-control form-control-sm">
                  <label  class="form-label">تلفن</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-4 mb-2">
                <div class="form-floating">
                  <input v-model="content.mobile" type="tel" id="business_new_fax" name="business_new[fax]" maxlength="15" class="form-control form-control-sm">
                  <label  class="form-label">موبایل</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-12 mb-2">
                <div class="form-floating">
                  <input type="text" v-model="content.address" id="business_new_address" name="business_new[address]" maxlength="255" class="form-control form-control-sm">
                  <label class="form-label">آدرس</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-6 mb-2">
                <div class="form-floating">
                  <input v-model="content.website" type="url" id="business_new_website" name="business_new[website]" inputmode="url" class="form-control form-control-sm">
                  <label class="form-label">وب‌سایت</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 mb-2">
                <div class="form-floating">
                  <input v-model="content.email" type="email" id="business_new_email" name="business_new[email]" maxlength="255" class="form-control form-control-sm">
                  <label class="form-label">پست الکترونیکی</label>
                </div>
              </div>
            </div>
            <h3 class="text-primary">اطلاعات مالی</h3>
            <div class="row">
              <div class="col-sm-12 col-md-6 mb-2">
                <div class="form-floating">
                  <select v-model="content.arzmain" class="form-select" >
                    <option v-for="item in content.moneys" :value="item.name">{{ item.label }}</option>
                  </select>
                  <label class="form-label required">نوع ارز اصلی</label>

                </div>
              </div>
              <div class="col-sm-12 col-md-6 mb-2">
                <div class="form-floating required">
                  <input v-model="content.maliyatafzode" type="number" id="business_new_maliyatafzode" name="business_new[maliyatafzode]" required="required" class="form-control form-control-sm">
                  <label class="form-label">مالیات بر ارزش افزوده</label>
                </div>
              </div>
            </div>
            <button type="submit" class="btn-alt-primary btn">ثبت</button>
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
  data:()=>{return{
    content:{
      name:'',
      legal_name:'',
      field:'',
      typeb:'مغازه',
      shenasemeli:'',
      codeeqtesadi:'',
      shomaresabt:'',
      country:'',
      ostan:'',
      shahrestan:'',
      postalcode:'',
      tel:'',
      mobile:'',
      address:'',
      website:'',
      email:'',
      arzmain:[],
      maliyatafzode:9,
      moneys: '',
    }
  }},
  methods:{
    submit(){
      if(this.content.name === '' || this.content.legal_name === '' || this.content.maliyatafzode === ''){
        Swal.fire({
          text: 'تکمیل موارد ستاره دار الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else{
        //submit data
        let data = axios.post('/api/business/insert',{
          'bid': localStorage.getItem('activeBid'),
          'name':this.content.name,
          'legal_name':this.content.legal_name,
          'field':this.content.field,
          'type':this.content.typeb,
          'shenasemeli':this.content.shenasemeli,
          'codeeqtesadi':this.content.codeeqtesadi,
          'shomaresabt':this.content.shomaresabt,
          'country':this.content.country,
          'ostan':this.content.ostan,
          'shahrestan':this.content.shahrestan,
          'postalcode':this.content.postalcode,
          'tel':this.content.tel,
          'mobile':this.content.mobile,
          'address':this.content.address,
          'website':this.content.website,
          'email':this.content.email,
          'arzmain':this.content.arzmain,
          'maliyatafzode':this.content.maliyatafzode,
        })
            .then((response)=>{
              if(response.data.result == 1){
                Swal.fire({
                  text: 'با موفقیت ثبت شد.',
                  icon: 'success',
                  confirmButtonText: 'قبول',

                })
              }
              else if(response.data.result === 0){
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
    this.content.moneys = (await axios.get("/api/money/get/all")).data;
    this.content.arzmain = this.content.moneys[0].name;
    //get business info
    let data = axios.post('/api/business/get/info/' + localStorage.getItem('activeBid'))
        .then((response)=>{
          this.content.name = response.data.name;
          this.content.legal_name = response.data.legal_name;
          this.content.field = response.data.field;
          this.content.typeb = response.data.type;
          this.content.shenasemeli = response.data.shenasemeli;
          this.content.codeeqtesadi = response.data.codeeqtesadi;
          this.content.shomaresabt = response.data.shomaresabt;
          this.content.country = response.data.country;
          this.content.ostan = response.data.ostan;
          this.content.shahrestan = response.data.shahrestan;
          this.content.postalcode = response.data.postalcode;
          this.content.tel = response.data.tel;
          this.content.mobile = response.data.mobile;
          this.content.address = response.data.address;
          this.content.website = response.data.website;
          this.content.email = response.data.email;
          this.content.arzmain = response.data.arzmain;
          this.content.maliyatafzode = response.data.maliyatafzode;
        })

  }
}
</script>

<style scoped>
.required label:before {
  content:"*";
  color:red;
}
</style>