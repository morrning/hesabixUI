<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn btn-sm btn-link text-warning mx-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        درخواست‌ها
      </h3>
      <div class="block-options">
        <router-link to="/acc/plugin/mod/" class="btn btn-sm btn-primary ms-2">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <div class="mb-1">
            <div class="input-group input-group-sm">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
              <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
            </div>
          </div>
          <div class="col-sm-12 col-md-12 border rounded mb-2 px-2 py-1">
            <div v-for="(item, index) in types" class="form-check form-check-inline">
              <input @change="filterTable()" v-model="types[index].checked" checked="" class="form-check-input"
                type="checkbox">
              <label class="form-check-label">{{ item.label }}</label>
            </div>
          </div>
          <EasyDataTable :table-class-name="tableClassName" v-model:items-selected="itemsSelected" multi-sort show-index
            alternating :search-value="searchValue" :headers="headers" :items="items" theme-color="#1d90ff"
            header-text-direction="center" body-text-direction="center" rowsPerPageMessage="تعداد سطر"
            emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از" :loading="loading">
            <template #item-operation="{ code }">
              <div class="dropdown-center">
                <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm btn-link"
                  data-bs-toggle="dropdown" id="dropdown-align-center-alt-primary" type="button">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
                <div aria-labelledby="dropdown-align-center-outline-primary" class="dropdown-menu dropdown-menu-end"
                  style="">
                  <router-link class="dropdown-item" :to="'/acc/persons/card/view/' + code">
                    <i class="fa fa-eye text-success pe-2"></i>
                    مشاهده
                  </router-link>
                  <router-link class="dropdown-item" :to="'/acc/persons/mod/' + code">
                    <i class="fa fa-edit pe-2"></i>
                    ویرایش
                  </router-link>
                </div>
              </div>
            </template>
            <template #item-nikename="{ nikename, code }">
              <router-link :to="'/acc/persons/card/view/' + code">
                {{ nikename }}
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
import Swal from "sweetalert2";
import { ref } from "vue";
import * as XLSX from 'xlsx';

export default {
  name: "list",
  components: {
    
  },
  watch: {
    'importWindowsState.submited'(newValue, oldValue) {
      this.importWindowsState.submited = false;
      if (newValue) {
        this.loadData();
      }
    }
  },
  data: () => {
    return {
      importWindowsState: {
        submited: false
      },
      
      searchValue: '',
      loading: ref(true),
      orgItems: [],
      types: [],
      items: [],
      itemsSelected: [],
      headers: [
        { text: "عملیات", value: "operation" },
        { text: "کد", value: "code" },
        { text: "نام مستعار", value: "nikename", sortable: true, width: 150 },
        { text: "تراز حساب", value: "balance", sortable: true, width: 100 },
        { text: "وضعیت حساب", value: "status", sortable: true, width: 110 },
        { text: "بستانکار", value: "bs", sortable: true, width: 100 },
        { text: "بدهکار", value: "bd", sortable: true, width: 100 },
        { text: "نام و نام خانوادگی", value: "name", sortable: true, width: 150 },
        { text: "دسترسی سریع", value: "speedAccess", width: 100 },
        { text: "تاریخ تولد/ثبت", value: "birthday", sortable: true, width: 150 },
        { text: "شرکت", value: "company", sortable: true, width: 100 },
        { text: "شناسه ملی", value: "shenasemeli", sortable: true, width: 100 },
        { text: "کد اقتصادی", value: "codeeghtesadi", sortable: true, width: 100 },
        { text: "شماره ثبت", value: "sabt", sortable: true, width: 100 },
        { text: "کشور", value: "keshvar", sortable: true, width: 100 },
        { text: "استان", value: "ostan", sortable: true, width: 100 },
        { text: "شهر", value: "shahr", sortable: true, width: 100 },
        { text: "کد پستی", value: "postalcode", sortable: true, width: 100 },
        { text: "تلفن", value: "tel", width: 100 },
        { text: "موبایل", value: "mobile", width: 100 },
        { text: "موبایل دوم", value: "mobile2", width: 100 },
        { text: "ایمیل", value: "email", sortable: true, width: 100 },
        { text: "وب سایت", value: "website", sortable: true, width: 100 },
        { text: "فکس", value: "fax", sortable: true, width: 100 },
      ]
    }
  },
  methods: {
    filterTable() {
      this.loading = true;
      let calcItems = [];
      let isAll = true;
      let selectedTypes = [];
      this.types.forEach((item) => {
        if (item.checked == true) {
          isAll = false;
          selectedTypes.push(item);
        }
      });
      if (isAll) {
        this.items = this.orgItems;
      }
      else {
        this.orgItems.forEach((item) => {
          item.types.forEach((itemB) => {
            selectedTypes.forEach((st) => {
              if (st.code == itemB.code && itemB.checked == true) {
                let existBefore = false;
                calcItems.forEach((ri) => {
                  if (item.code == ri.code) {
                    existBefore = true;
                  }
                })
                if (existBefore == false) {
                  calcItems.push(item);
                }

              }
            });
          });
        });
        this.items = calcItems;
      }

      this.loading = false;
    },
    loadData() {
      axios.get('/api/person/list')
        .then((response) => {
          this.items = response.data;
          this.orgItems = response.data;
          this.loading = false;
        });
      axios.post('/api/person/types/get')
        .then((response) => {
          this.types = response.data;
          this.isLoading = false;
        });
    },
    deleteItem(code) {
      Swal.fire({
        text: 'آیا برای حذف شخص مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/business/delete/user', {
            'code': code
          }
          ).then((response) => {
            if (response.data.result == 1) {
              let index = 0;
              for (let z = 0; z < this.items.length; z++) {
                index++;
                if (this.items[z]['code'] == code) {
                  this.items.splice(index - 1, 1);
                }
              }
              Swal.fire({
                text: 'شخص با موفقیت حذف شد.',
                icon: 'success',
                confirmButtonText: 'قبول'
              });
            }
          })
        }
      })
    },
    excellOutput(AllItems = true) {
      if (AllItems) {
        axios({
          method: 'get',
          url: '/api/person/list/excel',
          responseType: 'arraybuffer',
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
            url: '/api/person/list/excel',
            responseType: 'arraybuffer',
            data: { items: this.itemsSelected }
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
      if (AllItems) {
        axios.post('/api/person/list/print').then((response) => {
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
          axios.post('/api/person/list/print', { items: this.itemsSelected }).then((response) => {
            this.printID = response.data.id;
            window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
          })
        }
      }
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped></style>