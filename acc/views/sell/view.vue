<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "view",
  data:()=>{return{
    item:{
      doc:{
        date:null,
        code:null,
      }
    },
    person:{
      nikename: null
    }
  }},
  methods:{
    loadData(){
      axios.post('/api/accounting/doc/get',{'code':this.$route.params.id}).then((response)=>{
          this.item = response.data;
      });
    }
  },
  mounted() {
    this.loadData()
  }
})
</script>

<template>
  <div class="container-xl" style="margin-top: 30px;">
    <div class="row">
      <div class="col-3 text-center"></div>
      <div class="col-6 text-center"><h3 class="font-weight-bold">صورتحساب فروش کالا و خدمات</h3></div>
      <div class="col-3 text-right">
        <p>شماره سفارش: {{item.doc.code}}</p>
        <p>تاریخ سفارش: {{item.doc.date}}</p>
      </div>
    </div>
    <div class="row">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th class="text-center" colspan="11">مشخصات فروشنده</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colspan="11" class="text-right">
            <div class="row">
              <div class="col-4">
                <p>نام شخص حقیق / حقوقی: راستین وب</p>
                <p>آدرس کامل: استان تهران، شهر تهران، میدان ونک، خیابان حقانی، طبقه سوم</p>
              </div>
              <div class="col-4">
                <p>شماره اقتصادی:</p>
                <p>کد پستی:</p>
              </div>
              <div class="col-4">
                <p>شماره ثبت / شناسه ملی:</p>
                <p>تلفن / نمابر:</p>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
        <thead>
        <tr>
          <th class="text-center" colspan="11">مشخصات خریدار</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colspan="11" class="text-right">
            <div class="row">
              <div class="col-4">
                <p>نام شخص حقیق / حقوقی: مرتضی شجاعی</p>
                <p>آدرس کامل:</p>
              </div>
              <div class="col-4">
                <p>شماره اقتصادی:</p>
                <p>کد پستی:</p>
              </div>
              <div class="col-4">
                <p>شماره ثبت / شناسه ملی:</p>
                <p>تلفن / نمابر:</p>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
        <thead>
        <tr>
          <th class="text-center" colspan="11">مشخصات کالا یا خدمات مورد معامله</th>
        </tr>
        </thead>
        <thead>
        <tr class="text-center">
          <th>ردیف</th>
          <th>کد کالا</th>
          <th>شرح کالا یا خدمات</th>
          <th>تعداد / مقدار</th>
          <th>واحد انداز گیری</th>
          <th>مبلغ واحد (ریال)</th>
          <th>مبلغ کل (ریال)</th>
          <th>مبلغ تخفیف (ریال)</th>
          <th>مبلغ کل پس از تخفیف (ریال)</th>
          <th>جمع مالیات و عوارض (ریال)</th>
          <th>جمع مبلغ کل به علاوه مالیات و عوارض (ریال)</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center">
          <td>۱</td>
          <td>۵۲۰</td>
          <td>موس بی سیم فراسو</td>
          <td>۱</td>
          <td>عدد</td>
          <td>۱۵,۰۰۰</td>
          <td>۱۵,۰۰۰</td>
          <td>۱,۰۰۰</td>
          <td>۱۴,۰۰۰</td>
          <td>۵۰۰</td>
          <td>۱۴,۵۰۰</td>
        </tr>
        <tr>
          <th colspan="5" class="text-right">جمع کل</th>
          <th class="text-center">۱۵,۰۰۰</th>
          <th class="text-center">۱۵,۰۰۰</th>
          <th class="text-center">۱,۰۰۰</th>
          <th class="text-center">۱۴,۰۰۰</th>
          <th class="text-center">۵۰۰</th>
          <th class="text-center">۱۴,۵۰۰</th>
        </tr>
        <tr>
          <th colspan="5" class="text-right">شرایط و نحوه فروش: &nbsp&nbsp&nbsp&nbsp نقدی &nbsp&nbsp&nbsp&nbsp غیرنقدی</th>
          <th colspan="6" class="text-right">توضیحات:</th>
        </tr>
        <tr style="padding: 60px 0;">
          <td colspan="5" class="text-right">مهر و امضا فروشنده</td>
          <td colspan="6" class="text-right">مهر و امضا خریدار</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>