<template>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            حساب‌های بانکی
          </h1>
          <div class="block-options">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body">
          <div v-if="this.selectedPerson.accounts != undefined" class="">
            <div v-for="item in selectedPerson.accounts" class="m-0 p-0">
              <ul class="list-group mb-1">
                <li class="list-group-item bg-primary-dark text-light">
                  <span class="text-white">{{ item.bank }}:</span>
                  {{ item.accountNum }}
                </li>
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
            <div class="alert alert-danger rounded-0 mb-0 pb-0" v-if="this.selectedPerson.accounts.length == 0">
              هیچ حساب بانکی ثبت نشده است.
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بازگشت</button>
        </div>
      </div>
    </div>
  </div>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="$router.back()" type="button"
          class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        کارت حساب اشخاص
      </h3>
      <div class="block-options">
        <!-- Button trigger modal -->
        <button type="button" :disabled="isLoading" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          حساب‌های بانکی
        </button>
        <div class="dropdown">
          <a class="btn btn-sm btn-danger ms-2 dropdown-toggle text-end" href="#" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-file-pdf"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a @click.prevent="print(false)" class="dropdown-item" href="#">انتخاب شده‌ها</a></li>
            <li><a @click.prevent="print(true)" class="dropdown-item" href="#">همه موارد</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <a class="btn btn-sm btn-success ms-2 dropdown-toggle text-end" href="#" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-file-excel"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a @click.prevent="excellOutput(false)" class="dropdown-item" href="#">انتخاب شده‌ها</a></li>
            <li><a @click.prevent="excellOutput(true)" class="dropdown-item" href="#">همه موارد</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <div class="row">
            <div class="col-sm-12 col-md-6 mb-1">
              <div class="card push">
                <div class="card-header border-bottom-0 bg-primary-dark text-light">
                  <h3 class="block-title"> کارت حساب <small v-if="selectedPerson != null" class="text-info-light">{{
            selectedPerson.nikename
          }}</small>
                  </h3>
                </div>
                <div class="card-body">
                  <small class="mb-2">شخص</small>
                  <v-cob dir="rtl" @search="searchPerson" :options="listPersons" label="nikename"
                    v-model="selectedPerson" @option:selected="updateRoute(selectedPerson.code)">
                    <template #no-options="{ search, searching, loading }">
                      نتیجه‌ای یافت نشد!
                    </template>
                    <template v-slot:option="option">
                      <div class="row mb-1">
                        <div class="col-12">
                          <i class="fa fa-user me-2"></i>
                          {{ option.nikename }}
                        </div>
                        <div class="col-12">
                          <div class="row">
                            <div class="col-6">
                              <i class="fa fa-phone me-2"></i>
                              {{ option.mobile }}
                            </div>
                            <div class="col-6">
                              <i class="fa fa-bars"></i>
                              تراز:
                              {{ $filters.formatNumber(Math.abs(parseInt(option.bs) -
            parseInt(option.bd))) }}
                              <span class="text-danger" v-if="parseInt(option.bs) - parseInt(option.bd) < 0">
                                بدهکار </span>
                              <span class="text-success" v-if="parseInt(option.bs) - parseInt(option.bd) > 0">
                                بستانکار </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-cob>
                  <hr />
                  <div class="fw-bold mb-2">کد حسابداری: <small class="text-primary">{{ selectedPerson.code }}</small>
                  </div>
                  <div class="fw-bold mb-2">نام مستعار: <small class="text-primary">{{ selectedPerson.nikename
                      }}</small>
                  </div>
                  <div class="fw-bold mb-2">نام و نام خانوادگی: <small class="text-primary">{{ selectedPerson.name
                      }}</small></div>
                  <div class="fw-bold mb-2">تلفن: <small class="text-primary">{{ selectedPerson.tel }}</small></div>
                  <div class="fw-bold mb-2">موبایل: <small class="text-primary">{{ selectedPerson.mobile }}</small>
                  </div>
                  <div class="fw-bold mb-2">آدرس: <small class="text-primary">{{ selectedPerson.address }}</small></div>
                  <div class="fw-bold mb-2">توضیحات: <small class="text-primary">{{ selectedPerson.des }}</small></div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 mb-1">
              <div class="card push">
                <div class="card-header border-bottom-0 bg-primary-dark text-light">
                  <h3 class="block-title"> وضعیت حساب <small class="text-info-light">{{ selectedPerson.nikename
                      }}</small>
                  </h3>
                </div>
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
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <h3>تراکنش ها:</h3>
          <div class="mb-1">
            <div class="input-group input-group-sm">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
              <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
            </div>
          </div>
          <EasyDataTable table-class-name="customize-table" show-index alternating
            v-model:items-selected="itemsSelected" :search-value="searchValue" :headers="headers" :items="items"
            theme-color="#1d90ff" header-text-direction="center" body-text-direction="center"
            rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از"
            :loading="loading">
            <template #item-operation="{ code }">
              <router-link class="text-success" :to="'/acc/accounting/view/' + code">
                <i class="fa fa-eye px-1"></i>
              </router-link>
            </template>
            <template #item-code="{ code }">
              {{ $filters.formatNumber(code) }}
            </template>
            <template #item-type="{ type,code }">
              <router-link  v-if="type=='sell'"  class="" :to="'/acc/sell/view/' + code">
                فاکتور فروش
              </router-link>
              <router-link  v-if="type=='buy'"  class="" :to="'/acc/buy/view/' + code">
                فاکتور خرید
              </router-link>
              <router-link  v-if="type=='rfbuy'"  class="" :to="'/acc/rfbuy/view/' + code">
                فاکتور برگشت از خرید
              </router-link>
              <router-link  v-if="type=='rfsell'"  class="" :to="'/acc/rfsell/view/' + code">
                فاکتور برگشت از فروش
              </router-link>
              <router-link  v-if="type=='person_send'"  class="" :to="'/acc/accounting/view/' + code">
                 دریافت
              </router-link>
              <router-link  v-if="type=='person_receive'"  class="" :to="'/acc/accounting/view/' + code">
                 پرداخت
              </router-link>
              <router-link  v-if="type=='cost'"  class="" :to="'/acc/accounting/view/' + code">
                 هزینه
              </router-link>
              <router-link  v-if="type=='income'"  class="" :to="'/acc/accounting/view/' + code">
                 درآمد
              </router-link>
              <router-link  v-if="type=='sell_receive'"  class="" :to="'/acc/accounting/view/' + code">
                 دریافت فاکتور فروش
              </router-link>
              <router-link  v-if="type=='buy_send'"  class="" :to="'/acc/accounting/view/' + code">
                 پرداخت فاکتور فروش
              </router-link>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import Swal from "sweetalert2";
export default {
  name: "card",
  data: () => {
    return {
      searchValue: '',
      listPersons: [],
      itemsSelected: [],
      selectedPerson: {
        accounts: []
      },
      items: [],
      loading: ref(true),
      headers: [
        { text: "عملیات", value: "operation" },
        { text: "نوع سند", value: "type", 'sortable': true },
        { text: "شماره", value: "code", 'sortable': true },
        { text: "تاریخ", value: "date", 'sortable': true },
        { text: "شرح", value: "des" },
        { text: "تفضیل", value: "ref", 'sortable': true },
        { text: "بدهکار", value: "bd", 'sortable': true },
        { text: "بستانکار", value: "bs", 'sortable': true },
      ]
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    searchPerson(query, loading) {
      loading(true);
      axios.post('/api/person/list/search', { search: query }).then((response) => {
        this.listPersons = response.data;
        loading(false);
      });
    },
    updateRoute(id) {
      this.$router.push(id);
      this.loadData();
    },
    loadData() {
      axios.post('/api/person/list/search').then((response) => {
        this.listPersons = response.data;
        if (this.$route.params.id != '') {
          this.loadPerson(this.$route.params.id);
        } else {
          this.selectedPerson = response.data[0];
          this.loadPerson(this.selectedPerson.code);
        }
      });
    },
    excellOutput(AllItems = true) {
      if (AllItems) {
        axios({
          method: 'post',
          url: '/api/person/card/list/excel',
          data: { 'code': this.selectedPerson.code },
          responseType: 'arraybuffer',
        }).then((response) => {
          var FILE = window.URL.createObjectURL(new Blob([response.data]));
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'person-card-view.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
        })
      }
      else {
        if (this.itemsSelected.length === 0) {
          Swal.fire({
            text: 'هیچ آیتمی انتخاب نشده است.',
            icon: 'info',
            confirmButtonText: 'قبول'
          });
        }
        else {

          axios({
            method: 'post',
            url: '/api/person/card/list/excel',
            responseType: 'arraybuffer',
            data: {
              'code': this.selectedPerson.code,
              'items': this.itemsSelected
            }
          }).then((response) => {
            var FILE = window.URL.createObjectURL(new Blob([response.data]));
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'persons-list.xlsx');
            document.body.appendChild(fileLink);
            fileLink.click();
          })
        }
      }
    },
    print(AllItems = true) {
      if (this.selectedPerson == null) {
        Swal.fire({
          text: 'هیچ آیتمی انتخاب نشده است.',
          icon: 'info',
          confirmButtonText: 'قبول'
        });
      }
      else {
        if (AllItems) {
          axios.post('/api/person/card/list/print', { 'code': this.selectedPerson.code }).then((response) => {
            this.printID = response.data.id;
            window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
          })
        }
        else {
          if (this.itemsSelected.length === 0) {
            Swal.fire({
              text: 'هیچ آیتمی انتخاب نشده است.',
              icon: 'info',
              confirmButtonText: 'قبول'
            });
          }
          else {
            axios.post('/api/person/card/list/print', {
              'code': this.selectedPerson.code,
              'items': this.itemsSelected
            }).then((response) => {
              this.printID = response.data.id;
              window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
            })
          }
        }
      }

    },
    loadPerson(id) {
      this.loading = true;
      axios.post('/api/person/info/' + id).then((response) => {
        this.selectedPerson = response.data;
      });
      axios.post('/api/accounting/rows/search',
        {
          type: 'person',
          id: id
        }
      ).then((response) => {
        this.items = response.data;
        this.items.forEach((item) => {
          item.bs = this.$filters.formatNumber(item.bs)
          item.bd = this.$filters.formatNumber(item.bd)
        })
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped></style>