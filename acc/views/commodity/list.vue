<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="mx-2 fa fa-list"></i>
        کالا و خدمات
      </h3>
      <div class="block-options">
        <router-link to="/acc/commodity/mod/" class="btn btn-sm btn-primary ms-1">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
        <importExcel :windowsState="this.importWindowsState"></importExcel>
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
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <div class="mb-1">
            <div class="input-group input-group-sm">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
              <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
            </div>
          </div>
          <EasyDataTable table-class-name="customize-table" :table-class-name="tableClassName" v-model:items-selected="itemsSelected" multi-sort show-index
            alternating :search-value="searchValue" :headers="headers" :items="items" theme-color="#1d90ff"
            header-text-direction="center" body-text-direction="center" rowsPerPageMessage="تعداد سطر"
            emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از" :loading="loading">

            <template #item-operation="{ code }">
              <div class="dropdown-center">
                <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm btn-link" data-bs-toggle="dropdown"
                  id="dropdown-align-center-alt-primary" type="button">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
                <div aria-labelledby="dropdown-align-center-outline-primary" class="dropdown-menu dropdown-menu-end"
                  style="">
                  <router-link class="dropdown-item" :to="'/acc/commodity/mod/' + code">
                    <i class="fa fa-edit pe-2"></i>
                    ویرایش
                  </router-link>
                  <button type="button" @click="deleteItem(code)" class="dropdown-item text-danger"
                    :to="'/acc/persons/card/view/' + code">
                    <i class="fa fa-trash pe-2"></i>
                    حذف
                  </button>
                </div>
              </div>
            </template>
            <template #item-speedAccess="{ speedAccess }">
              <i v-if="speedAccess" class="fa fa-check text-success"></i>
            </template>
            <template #item-priceBuy="{ priceBuy }">
              {{ this.$filters.formatNumber(priceBuy) }}
            </template>
            <template #item-priceSell="{ priceSell }">
              {{ this.$filters.formatNumber(priceSell) }}
            </template>
            <template #item-count="{ count, khadamat }">
              <label v-if="khadamat == false">
                <span class="text-danger" v-if="count < 0">
                  <i class="fa fa-arrow-down me-1"></i>
                  {{ this.$filters.formatNumber(Math.abs(count)) }}
                  کمبود موجودی
                </span>
                <span class="text-success" v-if="count > 0">
                  <i class="fa fa-arrow-up me-1"></i>
                  {{ this.$filters.formatNumber(Math.abs(count)) }}
                </span>
                <span class="text-dark" v-if="count == 0">
                  {{ this.$filters.formatNumber(Math.abs(count)) }}
                </span>
              </label>
              <label v-else>آیتم خدماتی</label>
            </template>
            <template #item-khadamat="{ khadamat }">
              <label v-if="khadamat == false">کالا و اقلام فیزیکی</label>
              <label v-else>خدمات</label>
            </template>
            <template #item-withoutTax="{ withoutTax }">
              <i v-if="withoutTax == false || withoutTax == null" class="fa fa-check text-success"></i>
              <i v-else class="fa fa-close text-danger"></i>
            </template>
            <template #item-commodityCountCheck="{ commodityCountCheck }">
              <i v-if="commodityCountCheck == true" class="fa fa-check text-success"></i>
              <i v-else class="fa fa-close text-danger"></i>
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
import importExcel from "../component/importModal/commodity-import-excel.vue";

export default {
  name: "list",
  components: {
    importExcel: importExcel
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
      printID: '',
      searchValue: '',
      loading: ref(true),
      items: [],
      tableClassName: 'extable',
      itemsSelected: [],
      headers: [
        { text: "عملیات", value: "operation", width: "100" },
        { text: "کد", value: "code" },
        { text: "کالا / خدمات", value: "khadamat", sortable: true, width: 150 },
        { text: "نام کالا و خدمات", value: "name", sortable: true, width: 150 },
        { text: "واحد شمارش", value: "unit", sortable: true, width: 100 },
        { text: "موجودی", value: "count", sortable: true, width: 150 },
        { text: "دسترسی سریع", value: "speedAccess", width: 100 },
        { text: "مالیات", value: "withoutTax", width: 100 },
        { text: "دسته‌بندی", value: "cat", sortable: true, width: 100 },
        { text: "قیمت خرید", value: "priceBuy", sortable: true, width: 100 },
        { text: "قیمت فروش", value: "priceSell", sortable: true, width: 100 },
        { text: "نقطه سفارش", value: "orderPoint", width: 100 },
        { text: "حداقل سفارش", value: "minOrderCount", width: 100 },
        { text: "زمان انتظار", value: "dayLoading", width: 100 },
        { text: "کنترل موجودی", value: "commodityCountCheck", width: 100 },
      ]
    }
  },
  methods: {
    loadData() {
      axios.get('/api/commodity/list')
        .then((response) => {
          this.items = response.data;
          this.loading = false;
        })
    },
    excellOutput(AllItems = true) {
      if (AllItems) {
        axios({
          method: 'get',
          url: '/api/commodity/list/excel',
          responseType: 'arraybuffer',
        }).then((response) => {
          var FILE = window.URL.createObjectURL(new Blob([response.data]));
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'commodity-list.xlsx');
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
            url: '/api/commodity/list/excel',
            responseType: 'arraybuffer',
            data: { items: this.itemsSelected }
          }).then((response) => {
            var FILE = window.URL.createObjectURL(new Blob([response.data]));
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'commodity-list.xlsx');
            document.body.appendChild(fileLink);
            fileLink.click();
          })
        }
      }
    },
    print(AllItems = true) {
      if (AllItems) {
        axios.post('/api/commodity/list/print').then((response) => {
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
          axios.post('/api/commodity/list/print', { items: this.itemsSelected }).then((response) => {
            this.printID = response.data.id;
            window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
          })
        }
      }
    },
    deleteItem(code) {
      Swal.fire({
        text: 'آیا برای حذف این مورد مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/commodity/delete/' + code, {
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
                text: 'کالا  با موفقیت حذف شد.',
                icon: 'success',
                confirmButtonText: 'قبول'
              });
            }
            else if (response.data.result == 2) {
              Swal.fire({
                text: 'کالا به دلیل داشتن سند حسابداری یا انبار مرتبط قابل حذف نیست.',
                icon: 'error',
                confirmButtonText: 'قبول'
              });
            }
          })
        }
      })
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped></style>