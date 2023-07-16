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
        <div class="col-sm-12 col-md-12">
          <h3 class="text-primary">اطلاعات کسب و کار</h3>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="business_new_name" class="form-label required">نام کسب و کار</label>
                <input v-model="content.name" type="text" id="business_new_name" name="business_new[name]" required="required" maxlength="255" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="business_new_field" class="form-label">زمینه فعالیت</label>
                <input v-model="content.field" type="text" id="business_new_field" name="business_new[field]" maxlength="255" class="form-control form-control-sm">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="business_new_legalName" class="form-label required">نام قانونی کسب و کار</label>
                <input v-model="content.legal_name" type="text" id="business_new_legalName" name="business_new[legalName]" required="required" maxlength="255" class="form-control form-control-sm">        </div>
              <div class="mb-3">
                <label class="form-label required" for="business_new_type">نوع فعالیت</label>
                <select v-model="content.typeb" id="business_new_type" class="form-select form-select-sm">
                  <option value="شرکت">شرکت</option>
                  <option value="مغازه">مغازه</option>
                  <option value="فروشگاه">فروشگاه</option>
                  <option value="اتحادیه">اتحادیه</option>
                  <option value="باشگاه">باشگاه</option>
                  <option value="موسسه">موسسه</option>
                  <option value="شخصی">شخصی</option>
                </select>
              </div>
            </div>
          </div>
          <h3 class="text-primary">اطلاعات اقتصادی</h3>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="business_new_shenasemeli" class="form-label">شناسه ملی</label>
                <input v-model="content.shenasemeli" type="number" id="business_new_shenasemeli" name="business_new[shenasemeli]" maxlength="10" class="form-control form-control-sm">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="business_new_codeeghtesadi" class="form-label">کد اقتصادی</label>
                <input v-model="content.codeeqtesadi" type="number" id="business_new_codeeghtesadi" name="business_new[codeeghtesadi]" maxlength="15" class="form-control form-control-sm">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="business_new_shomaresabt" class="form-label">شماره ثبت</label>
                <input v-model="content.shomaresabt" type="number" id="business_new_shomaresabt" name="business_new[shomaresabt]" maxlength="255" class="form-control form-control-sm">
              </div>
            </div>
          </div>
          <h3 class="text-primary">اطلاعات تماس</h3>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="business_new_keshvar" class="form-label">کشور</label>
                <input v-model="content.country" type="text" id="business_new_keshvar" name="business_new[keshvar]" maxlength="50" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="business_new_codeposti" class="form-label">کد پستی</label>
                <input v-model="content.postalcode" type="text" id="business_new_codeposti" name="business_new[codeposti]" maxlength="10" class="form-control form-control-sm">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="business_new_ostan" class="form-label">استان</label>
                <input v-model="content.ostan" type="text" id="business_new_ostan" name="business_new[ostan]" maxlength="50" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="business_new_tel" class="form-label">تلفن</label>
                <input v-model="content.tel" type="text" id="business_new_tel" name="business_new[tel]" maxlength="15" class="form-control form-control-sm">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="business_new_shahr" class="form-label">شهر</label>
                <input v-model="content.shahrestan" type="text" id="business_new_shahr" name="business_new[shahr]" maxlength="50" class="form-control form-control-sm">
              </div>
              <div class="mb-3">
                <label for="business_new_fax" class="form-label">تلفن همراه</label>
                <input v-model="content.mobile" type="tel" id="business_new_fax" name="business_new[fax]" maxlength="15" class="form-control form-control-sm">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="business_new_address" class="form-label">آدرس</label>
                <input type="text" v-model="content.address" id="business_new_address" name="business_new[address]" maxlength="255" class="form-control form-control-sm">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="business_new_website" class="form-label">وب‌سایت</label>
                <input v-model="content.website" type="url" id="business_new_website" name="business_new[website]" inputmode="url" class="form-control form-control-sm">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="business_new_email" class="form-label">پست الکترونیکی</label>
                <input v-model="content.email" type="email" id="business_new_email" name="business_new[email]" maxlength="255" class="form-control form-control-sm">
              </div>
            </div>
          </div>
          <h3 class="text-primary">اطلاعات مالی</h3>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label class="form-label required" for="business_new_arzMain">نوع ارز اصلی</label>
                <select v-model="content.arzmain" class="form-select" >
                  <option v-for="item in content.moneys" :value="item.name">{{ item.label }}</option>
                </select>
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="business_new_maliyatafzode" class="form-label required">مالیات بر ارزش افزوده</label>
                <input v-model="content.maliyatafzode" type="number" id="business_new_maliyatafzode" name="business_new[maliyatafzode]" required="required" class="form-control form-control-sm">
              </div>
            </div>
          </div>
          <button type="button" @click="submit()" class="btn-alt-primary btn">
            <i class="fa fa-save"></i>
            ثبت
          </button>
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

</style>