<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        مشخصات شخص
      </h3>
      <div class="block-options">
        <button @click="save()" type="button" class="btn btn-alt-primary">
          <i class="fa fa-floppy-disk"></i>
          ثبت</button>
      </div>
    </div>
    <div class="block-content py-3 vl-parent">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false" />
      <div class="block block-rounded">
        <ul class="nav nav-tabs nav-tabs-alt" role="tablist">
          <li class="nav-item" role="presentation">
            <button aria-controls="btabs-alt-static-home" aria-selected="true" class="nav-link active"
              data-bs-target="#btabs-alt-static-home" data-bs-toggle="tab" id="btabs-alt-static-home-tab" role="tab">
              اطلاعات پایه </button>
          </li>
          <li class="nav-item" role="presentation">
            <button aria-controls="btabs-alt-static-profile" aria-selected="false" class="nav-link"
              data-bs-target="#btabs-alt-static-profile" data-bs-toggle="tab" id="btabs-alt-static-profile-tab"
              role="tab" tabindex="-1"> اطلاعات اقتصادی </button>
          </li>
          <li class="nav-item" role="presentation">
            <button aria-controls="btabs-alt-static-profile" aria-selected="false" class="nav-link"
              data-bs-target="#btabs-alt-static-profile2" data-bs-toggle="tab" id="btabs-alt-static-profile-tab2"
              role="tab" tabindex="-2"> اطلاعات تماس </button>
          </li>
          <li class="nav-item" role="presentation">
            <button aria-controls="btabs-alt-static-profile" aria-selected="false" class="nav-link"
              data-bs-target="#btabs-alt-static-profile3" data-bs-toggle="tab" id="btabs-alt-static-profile-tab3"
              role="tab" tabindex="-3"> آدرس </button>
          </li>
          <li class="nav-item" role="presentation">
            <button aria-controls="btabs-alt-static-profile" aria-selected="false" class="nav-link"
              data-bs-target="#btabs-alt-static-profile4" data-bs-toggle="tab" id="btabs-alt-static-profile-tab4"
              role="tab" tabindex="-4"> حساب‌های بانکی </button>
          </li>
        </ul>
        <div class="block-content tab-content">
          <div aria-labelledby="btabs-alt-static-home-tab" class="tab-pane active show" id="btabs-alt-static-home"
            role="tabpanel" tabindex="0">
            <div class="row">
              <div class="col-sm-12 col-md-12 mb-3">
                <div class="space-y-2">
                  <div class="form-check form-switch">
                    <input v-model="person.speedAccess" class="form-check-input" type="checkbox">
                    <label class="form-check-label">دسترسی سریع (در صدور فاکتور سریع فروش و سایر افزونه‌ها استفاده می
                      شود)</label>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-12 mb-3">
                <div class="space-x-2 border rounded p-3">
                  <p class="py-0 my-0 text-primary">نوع مشتری</p>
                  <div v-for="(item, index) in person.types" class="form-check form-check-inline">
                    <input @change="console.log(this.person.types)" v-model="person.types[index].checked" checked=""
                      class="form-check-input" type="checkbox">
                    <label class="form-check-label">{{ item.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.nikename" class="form-control" type="text">
                  <label class="form-label"><span class="text-danger">(لازم)</span> نام مستعار</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.company" class="form-control" type="text">
                  <label class="form-label"> شرکت </label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.name" class="form-control" type="text">
                  <label class="form-label">نام / نام خانوادگی</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.des" class="form-control" type="text">
                  <label class="form-label">توضیحات</label>
                </div>
              </div>
            </div>
          </div>
          <div aria-labelledby="btabs-alt-static-profile-tab" class="tab-pane" id="btabs-alt-static-profile"
            role="tabpanel" tabindex="0">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.shenasemeli" class="form-control" type="text">
                  <label class="form-label">شناسه ملی</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.sabt" class="form-control" type="text">
                  <label class="form-label">شماره ثبت</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.codeeghtesadi" class="form-control" type="text">
                  <label class="form-label">کد اقتصادی</label>
                </div>
              </div>
            </div>
          </div>
          <div aria-labelledby="btabs-alt-static-profile-tab2" class="tab-pane" id="btabs-alt-static-profile2"
            role="tabpanel" tabindex="0">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input style="direction: ltr;" v-model="person.mobile" class="form-control" type="text">
                  <label class="form-label">تلفن همراه</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input style="direction: ltr;" v-model="person.mobile2" class="form-control" type="text">
                  <label class="form-label">تلفن همراه دوم</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input style="direction: ltr;" v-model="person.tel" class="form-control" type="text">
                  <label class="form-label">تلفن</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input style="direction: ltr;" v-model="person.fax" class="form-control" type="text">
                  <label class="form-label">فکس</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input style="direction: ltr;" v-model="person.email" class="form-control" type="text">
                  <label class="form-label">پست الکترونیکی</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input style="direction: ltr;" v-model="person.website" class="form-control" type="text">
                  <label class="form-label">وب سایت</label>
                </div>
              </div>
            </div>
          </div>
          <div aria-labelledby="btabs-alt-static-profile-tab3" class="tab-pane" id="btabs-alt-static-profile3"
            role="tabpanel" tabindex="0">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.keshvar" class="form-control" type="text">
                  <label class="form-label">کشور</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.ostan" class="form-control" type="text">
                  <label class="form-label">استان</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.shahr" class="form-control" type="text">
                  <label class="form-label">شهر</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="form-floating mb-4">
                  <input v-model="person.postalcode" class="form-control" type="text">
                  <label class="form-label">کد پستی</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <div class="form-floating mb-4">
                  <input v-model="person.address" class="form-control" type="text">
                  <label class="form-label">آدرس</label>
                </div>
              </div>
            </div>
          </div>
          <div aria-labelledby="btabs-alt-static-profile-tab4" class="tab-pane" id="btabs-alt-static-profile4"
            role="tabpanel" tabindex="0">
            <div class="row mb-3 justify-content-end text-end">
              <div class="col-sm-12 col-md-12">
                <button @click="addNewcard()" type="button" class="btn btn-primary">
                  <i class="fa fa-add"></i>
                  افزودن
                </button>
              </div>
            </div>
            <div class="row" v-for="(item, index) in person.accounts">
              <div class="block block-rounded border border-gray mx-0 px-0">
                <div class="block-header bg-light">
                  <h3 class="block-title">
                    <small class="text-dark">
                      <i class="fa fa-bank"></i>
                      حساب بانکی
                    </small>
                  </h3>
                  <span class="block-options">
                    <button class="btn rounded-circle btn-sm btn-danger" @click="removeCard(index)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </span>
                </div>
                <div class="block-content">
                  <div class="row">
                    <div class="col-sm-12 col-md-6">
                      <div class="form-floating mb-4">
                        <input v-model="person.accounts[index].bank" class="form-control" type="text">
                        <label class="form-label"><span class="text-danger">(لازم)</span> بانک </label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <div class="form-floating mb-4">
                        <input v-model="person.accounts[index].accountNum" class="form-control" type="text">
                        <label class="form-label">شماره حساب</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <div class="form-floating mb-4">
                        <input v-model="person.accounts[index].cardNum" class="form-control" type="text">
                        <label class="form-label">شماره کارت</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <div class="form-floating mb-4">
                        <input v-model="person.accounts[index].shabaNum" class="form-control" type="text">
                        <label class="form-label">شماره شبا</label>
                      </div>
                    </div>
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
import Swal from "sweetalert2";
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
export default {
  name: "insert",
  components: {
    Loading
  },
  data: () => {
    return {
      isLoading: false,
      account: {
        name: '',
        cardNum: '',
        shabaNum: '',
        accountNum: ''
      },
      person: {
        nikename: '',
        name: '',
        des: '',
        tel: '',
        mobile: '',
        mobile2: '',
        address: '',
        company: '',
        shenasemeli: '',
        codeeghtesadi: '',
        sabt: '',
        keshvar: '',
        ostan: '',
        shahr: '',
        postalcode: '',
        email: '',
        website: '',
        fax: '',
        code: 0,
        types: [],
        accounts: [],
      }
    }
  },
  mounted() {
    this.loadData(this.$route.params.id);
  },
  beforeRouteUpdate(to, from) {
    this.loadData(to.params.id);
  },
  methods: {
    addNewcard() {
      this.person.accounts.push({
        cardNum: '',
        accountNum: '',
        shabaNum: '',
        bank: ''
      });
    },
    removeCard(index) {
      this.person.accounts.splice(index, 1);
    },
    loadData(id = '') {
      if (id != '') {
        //load user info
        this.isLoading = true;
        axios.post('/api/person/info/' + id).then((response) => {
          this.person = response.data;
          this.isLoading = false;
        });
      }
      else {
        //user is new
        axios.post('/api/person/types/get').then((response) => {
          this.person.types = response.data;
          this.isLoading = false;
        });
        this.person.code = 0;
      }
    },
    save() {
      let canSubmit = true;
      if (this.person.mobile.length !== 0) {
        const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
        if (!regex.test(this.person.mobile)) {
          canSubmit = false;
          Swal.fire({
            text: 'شماره موبایل وارد شده نامعتبر است.',
            icon: 'error',
            confirmButtonText: 'قبول'
          });
        }
      }
      if (this.person.nikename.length === 0) {
        canSubmit = false;
        Swal.fire({
          text: 'نام مستعار الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      this.person.accounts.forEach((item) => {
        if (item.bank == '') {
          canSubmit = false;
          Swal.fire({
            text: 'بخش حساب‌های بانکی به درستی تکمیل نشده است.لطفا موارد الزامی را وارد کنید.',
            icon: 'error',
            confirmButtonText: 'قبول'
          });
        }
      });
      if (canSubmit) {
        this.isLoading = true;
        axios.post('/api/person/mod/' + this.person.code, this.person).then((response) => {
          this.isLoading = false;
          if (response.data.result == 2) {
            Swal.fire({
              text: 'قبلا ثبت شده است.',
              icon: 'error',
              confirmButtonText: 'قبول'
            });
          }
          else {
            Swal.fire({
              text: 'مشخصات شخص ثبت شد.',
              icon: 'success',
              confirmButtonText: 'قبول'
            }).then(() => {
              this.$router.push('/acc/persons/list')
            });
          }
        })
      }

    }
  }
}
</script>

<style scoped></style>