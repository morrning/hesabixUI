<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "smsSettings",
  data: () => {
    return {
      loading: ref(true),
      form: {
        plan: 'melipayamak',
        walletpay: '',
        changePassword: '',
        recPassword: '',
        f2a: '',
        ticketReplay: '',
        ticketRec: '',
        fromNum: '',
        sharefaktor: '',
        username: '',
        password: '',
        token: '',
        plugRepservice: {
          get: '',
          getback: '',
          repaired: '',
          unrepaired: '',
          creating: '',
          created: ''
        },
        plugAccpro: {
          sharefaktor: '',
          storeroomSmsBarbari: '',
          storeroomSmsOther: ''
        }
      }
    }
  },
  methods: {
    loadData() {
      axios.post('/api/admin/sms/plan/info').then((response) => {
        this.form = response.data;
        this.loading = false;
      });

    },
    submit() {
      axios.post('/api/admin/sms/plan/info/save', this.form).then((response) => {
        this.loading = false;
        if (response.data.error == 0) {
          Swal.fire({
            text: 'تنظیمات با موفقیت ذخیره شد.',
            icon: 'success',
            confirmButtonText: 'قبول',
          });
        }
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
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button"
          class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-message px-2"></i>
        تنظیمات پنل پیامک
      </h3>
      <div class="block-options">
        <button :disabled="this.loading" @click="this.submit()" type="button" class="btn btn-sm btn-primary">
          <div v-show="this.loading" class="spinner-grow spinner-grow-sm me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <i class="fa fa-save"></i>
          ذخیره تغییرات
        </button>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <div class="row pt-3">
            <h4 class="text-primary">اطلاعات اپراتور پیامک</h4>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <select v-model="form.plan" class="form-select" aria-label="اپراتور سرویس دهنده پیامک">
                  <option value="melipayamak">ملی پیامک</option>
                  <option value="idepayam">ایده پیام</option>
                </select>
                <label class="form-label"><span class="text-danger"></span>اپراتور سرویس دهنده پیامک</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.username" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>نام کاربری اتصال به اپراتور پیامک</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.password" class="form-control" type="password" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>کلمه عبور اتصال به اپراتور پیامک</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.token" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>توکن ارسال به وب سرویس</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.fromNum" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>سرشماره ارسال پیامک</label>
              </div>
            </div>
          </div>
        </div>
        <h4 class="text-primary">شناسه الگوهای پیامک</h4>
        <div class="col-sm-12 col-md-12">
          <div class="row pt-3">
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.f2a" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>فعال سازی حساب کاربری</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.recPassword" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>بازیابی کلمه عبور</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.changePassword" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>ارسال کلمه عبور</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.ticketRec" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>دریافت تیکت (مدیریت)</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.ticketReplay" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>پاسخ به تیکت (کاربر)</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.walletpay" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>تسویه حساب کیف پول</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.sharefaktor" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>ارسال فاکتور به مشتری</label>
              </div>
            </div>
          </div>
        </div>
        <h4 class="text-primary">افزونه حسابداری پیشرفته</h4>
        <div class="col-sm-12 col-md-12">
          <div class="row pt-3">
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.plugAccpro.sharefaktor" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>ارسال فاکتور فروش</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.plugAccpro.storeroomSmsOther" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>ارسال تیکت انبار سایر</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.plugAccpro.storeroomSmsBarbari" class="form-control" type="text"
                  :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>ارسال تیکت انبار باربری</label>
              </div>
            </div>
          </div>
        </div>
        <h4 class="text-primary">افزونه تعمیرکاران</h4>
        <div class="col-sm-12 col-md-12">
          <div class="row pt-3">
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.plugRepservice.get" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>تحویل کالا</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.plugRepservice.repired" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>اعلام تعمیر کالا</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.plugRepservice.unrepaired" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>اعلام غیر قابل تعمیر بودن</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.plugRepservice.getback" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>مرجوعی کالا</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.plugRepservice.creating" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>در حال ساخت</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="form.plugRepservice.created" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger"></span>اعلام پایان ساخت</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>