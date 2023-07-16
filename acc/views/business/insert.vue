<template>
  <div class="mb-5">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-12">
          <div class="card">
            <div class="card-header bg-primary-dark text-light">
              <i class="bi bi-list-task"></i>
              <span class="app-title">کسب و کار جدید</span>
            </div>
            <div class="card-body app-body">
              <div class="container mb-5">
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
                            <select v-model="content.type" id="business_new_type" name="business_new[type]" class="form-select form-select-sm">
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
                            <label for="business_new_fax" class="form-label">موبایل</label>
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
                      <button type="button" @click="submit()" class="btn-alt-primary btn btn-sm">ثبت</button>
                      <router-link class="btn btn-sm ms-2 btn-alt-danger" to="/business/list">بازگشت</router-link>
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

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "insert",
  data:()=>{return{
    content:{
      name:'',
      legal_name:'',
      field:'',
      type:'مغازه',
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
          'name':this.content.name,
          'legal_name':this.content.legal_name,
          'field':this.content.field,
          'type':this.content.type,
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
                  title: 'پیام',
                  text: 'با موفقیت ثبت شد.',
                  icon: 'success',
                  confirmButtonText: 'قبول',

                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$router.push('/business/list')
                  }
                });
              }
              else if(response.data.result === 0){
                Swal.fire({
                  text: 'تکمیل موارد ستاره دار الزامی است.',
                  icon: 'error',
                  confirmButtonText: 'قبول'
                });
              }
              else if(response.data.result === 3){
                Swal.fire({
                  text: 'در هر روز تنها قادر به ایجاد یک کسب و کار هستید.لطفا بعدا دوباره اقدام کنید.',
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

  }
}
</script>

<style scoped>

</style>