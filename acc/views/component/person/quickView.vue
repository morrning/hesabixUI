<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

export default defineComponent({
  name: "quickView",
  props: {
    code: String,
  },
  data: () => {
    return {
      selectedPerson: {
        accounts:[]
      }
    }
  },
  methods: {
    loadData() {
      axios.post('/api/person/info/' + this.$props.code).then((response) => {
        this.selectedPerson = response.data;
      });
    }
  },
  mounted() {
    
  }
})
</script>

<template>
  <!-- Button trigger modal -->
  <button @click="loadData()" :disabled="this.$props.code == undefined" title="مشاهده مشخصات شخص" type="button"
    class="btn-block-option" data-bs-toggle="modal" data-bs-target="#quickPersonView">
    <i class="fa fa-eye"></i>
  </button>
  <!-- Modal -->
  <div class="modal modal-lg fade" id="quickPersonView" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="quickPersonViewLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary-light text-white">
          <h1 class="modal-title fs-5" id="quickPersonViewLabel">
          <i class="fa fa-person"></i>
          اطلاعات شخص
          </h1>
          <div class="block-options">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12 col-md-6 mb-2">
              <div class="fw-bold mb-2">کد حسابداری: <small class="text-primary">{{ selectedPerson.code }}</small>
              </div>
              <div class="fw-bold mb-2">نام مستعار: <small class="text-primary">{{ selectedPerson.nikename
                  }}</small>
              </div>
              <div class="fw-bold mb-2">نام و نام خانوادگی: <small class="text-primary">{{ selectedPerson.name
                  }}</small></div>
              <div class="fw-bold mb-2">تلفن: <small class="text-primary">{{ selectedPerson.tel }}</small></div>
              <div class="fw-bold mb-2">موبایل: <small class="text-primary">{{ selectedPerson.mobile }}</small></div>
              <div class="fw-bold mb-2">موبایل دوم: <small class="text-primary">{{ selectedPerson.mobile2 }}</small>
              </div>
              <div class="fw-bold mb-2">آدرس: <small class="text-primary">{{ selectedPerson.keshvar + ' ' +
    selectedPerson.ostan + ' ' + selectedPerson.shahr + ' ' + selectedPerson.address }}</small></div>
              <div class="fw-bold mb-2">توضیحات: <small class="text-primary">{{ selectedPerson.des }}</small></div>

            </div>
            <div class="col-sm-12 col-md-6 mb-2">
              <div class="card-body">
                <div class="fw-bold mb-2">
                  وضعیت حسابداری:
                  <b v-if="selectedPerson.balance > 0" class="text-success">بستانکار</b>
                  <b v-if="selectedPerson.balance < 0" class="text-danger">بدهکار</b>
                  <b v-if="selectedPerson.balance == 0" class="text-dark">تسویه شده</b>

                </div>
                <div class="fw-bold mb-2">بستانکار: <small class="text-primary">{{
    this.$filters.formatNumber(selectedPerson.bs)
  }}</small></div>
                <div class="fw-bold mb-2">بدهکار: <small class="text-primary">{{
      this.$filters.formatNumber(selectedPerson.bd)
    }}</small></div>
                <div class="fw-bold mb-2">تراز حسابداری: <small class="text-primary">{{
                    this.$filters.formatNumber(selectedPerson.balance) }}</small></div>
              </div>

            </div>
          </div>
          <div v-if="this.selectedPerson.accounts.length != 0" class="row">
            <div class="col-12">
              <h4 class="text-primary">حساب‌های بانکی</h4>
              <div v-for="item in selectedPerson.accounts" class="block block-rounded bg-light mb-1">
                <div class="block-header">
                  <h3 class="block-title"> {{ item.bank }} <small> {{ item.accountNum }}</small></h3>
                </div>
                <div class="block-content pt-0">
                  <ul class="list-group mb-1">
                    <li class="list-group-item">
                      <span class="text-muted">شماره کارت:</span>
                      {{ item.cardNum }}
                    </li>
                    <li class="list-group-item">
                      <span class="text-muted">شماره شبا:</span>
                      {{ item.shabaNum }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>