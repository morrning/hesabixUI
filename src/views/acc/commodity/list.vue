<template>
  <v-toolbar color="toolbar" :title="$t('drawer.commodity')">
    <template v-slot:prepend>
      <v-tooltip :text="$t('dialog.back')" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" @click="$router.back()" class="d-none d-sm-flex" variant="text"
            icon="mdi-arrow-right" />
        </template>
      </v-tooltip>
    </template>
    <v-spacer></v-spacer>
    <v-tooltip :text="$t('dialog.add_new')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-package-variant-plus" color="primary" to="/acc/commodity/mod/"></v-btn>
      </template>
    </v-tooltip>
    <changePrice :items="itemsSelected" :windowsState="this.importWindowsState"></changePrice>
    <importExcel :windowsState="this.importWindowsState"></importExcel>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="" color="red">
          <v-tooltip activator="parent" :text="$t('dialog.export_pdf')" location="bottom" />
          <v-icon icon="mdi-file-pdf-box"></v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-subheader color="primary">{{ $t('dialog.export_pdf') }}</v-list-subheader>
        <v-list-item class="text-dark" :title="$t('dialog.selected')" @click="print(false)">
          <template v-slot:prepend>
            <v-icon color="green-darken-4" icon="mdi-check"></v-icon>
          </template>
        </v-list-item>
        <v-list-item class="text-dark" :title="$t('dialog.selected_all')" @click="print(true)">
          <template v-slot:prepend>
            <v-icon color="indigo-darken-4" icon="mdi-expand-all"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="" color="green">
          <v-tooltip activator="parent" :text="$t('dialog.export_excel')" location="bottom" />
          <v-icon icon="mdi-file-excel-box"></v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-subheader color="primary">{{ $t('dialog.export_excel') }}</v-list-subheader>
        <v-list-item class="text-dark" :title="$t('dialog.selected')" @click="excellOutput(false)">
          <template v-slot:prepend>
            <v-icon color="green-darken-4" icon="mdi-check"></v-icon>
          </template>
        </v-list-item>
        <v-list-item class="text-dark" :title="$t('dialog.selected_all')" @click="excellOutput(true)">
          <template v-slot:prepend>
            <v-icon color="indigo-darken-4" icon="mdi-expand-all"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-tooltip :text="$t('dialog.delete')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-trash-can" color="danger" @click="deleteGroup()"></v-btn>
      </template>
    </v-tooltip>
  </v-toolbar>
  <v-text-field :loading="loading" color="green" class="mb-0 pt-0 rounded-0" hide-details="auto" density="compact"
    :placeholder="$t('dialog.search_txt')" v-model="searchValue" type="text">
    <template v-slot:prepend-inner>
      <v-tooltip location="bottom" :text="$t('dialog.search')">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" color="danger" icon="mdi-magnify"></v-icon>
        </template>
      </v-tooltip>
    </template>
    <template v-slot:append-inner>
      <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-icon size="sm" v-bind="props" icon="" color="primary">
            <v-tooltip activator="parent" variant="plain" :text="$t('dialog.filters')" location="bottom" />
            <v-icon icon="mdi-filter"></v-icon>
          </v-icon>
        </template>
        <v-list>
          <v-list-subheader color="primary">
            <v-icon icon="mdi-filter"></v-icon>
            {{ $t('dialog.filters') }}</v-list-subheader>
          <v-list-item v-for="(item, index) in types" class="text-dark">
            <template v-slot:title>
              <div class="form-check form-check-inline mx-1">
                <input @change="filterTable()" v-model="types[index].checked" checked="" class="form-check-input"
                  type="checkbox">
                <label class="form-check-label">{{ item.name }}</label>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-text-field>
  <EasyDataTable table-class-name="customize-table" :table-class-name="tableClassName"
    v-model:items-selected="itemsSelected" multi-sort show-index alternating :search-value="searchValue"
    :headers="headers" :items="items" theme-color="#1d90ff" header-text-direction="center" body-text-direction="center"
    rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از"
    :loading="loading">

    <template #item-operation="{ code }">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" size="small" color="error" icon="mdi-menu" v-bind="props" />
        </template>
        <v-list>
          <v-list-item class="text-dark" :title="$t('dialog.edit')" :to="'/acc/commodity/mod/' + code">
            <template v-slot:prepend>
              <v-icon icon="mdi-file-edit"></v-icon>
            </template>
          </v-list-item>
          <v-list-item class="text-dark" :title="$t('dialog.delete')" @click="deleteItem(code)">
            <template v-slot:prepend>
              <v-icon color="deep-orange-accent-4" icon="mdi-trash-can"></v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template #item-speedAccess="{ speedAccess }">
      <i v-if="speedAccess" class="fa fa-check text-success"></i>
    </template>
    <template #item-priceBuy="{ priceBuy }">
      {{ $filters.formatNumber(priceBuy) }}
    </template>
    <template #item-priceSell="{ priceSell }">
      {{ $filters.formatNumber(priceSell) }}
    </template>
    <template #item-count="{ count, khadamat }">
      <label v-if="khadamat == false">
        <span class="text-danger" v-if="count < 0">
          <i class="fa fa-arrow-down me-1"></i>
          {{ $filters.formatNumber(Math.abs(count)) }}
          کمبود موجودی
        </span>
        <span class="text-success" v-if="count > 0">
          <i class="fa fa-arrow-up me-1"></i>
          {{ $filters.formatNumber(Math.abs(count)) }}
        </span>
        <span class="text-dark" v-if="count == 0">
          {{ $filters.formatNumber(Math.abs(count)) }}
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";
import importExcel from "../component/importModal/commodity-import-excel.vue";
import ChangePriceGroup from "../component/commodity/changePriceGroup.vue";

export default {
  name: "list",
  components: {
    importExcel: importExcel,
    changePrice: ChangePriceGroup
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
      orgItems: [],
      types: [],
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
          selectedTypes.forEach((st) => {
            if (st.code == item.catData?.code) {
              let existBefore = false;
              calcItems.forEach((ri) => {
                if (item.catData.code == ri.code) {
                  existBefore = true;
                }
              })
              if (existBefore == false) {
                calcItems.push(item);
              }
            }
          });
        });
        this.items = calcItems;
        this.itemsSelected = [];
      }

      this.loading = false;
    },
    loadData() {
      this.itemsSelected = [];
      axios.post('/api/commodity/cat/get/line')
        .then((response) => {
          this.types = response.data;
          this.isLoading = false;
        });
      axios.post('/api/commodity/list')
        .then((response) => {
          this.items = response.data;
          this.orgItems = response.data;
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
    },
    deleteGroup() {
      if (this.itemsSelected.length == 0) {
        Swal.fire({
          text: 'هیچ آیتمی انتخاب نشده است!',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else {
        Swal.fire({
          text: 'آیا برای حذف این موارد مطمئن هستید؟',
          showCancelButton: true,
          confirmButtonText: 'بله',
          cancelButtonText: `خیر`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios.post('/api/commodity/deletegroup', this.itemsSelected
            ).then((response) => {
              if (response.data.data.ignored == false) {
                Swal.fire({
                  text: 'کالاها  با موفقیت حذف شدند.',
                  icon: 'success',
                  confirmButtonText: 'قبول'
                });
              }
              else {
                Swal.fire({
                  text: 'تعدادی از کالا‌های انتخاب شده به دلیل داشتن سند حسابداری یا اسناد انبار مرتبط قابل حذف نیستند.اما موارد بدون سند حذف شدند',
                  icon: 'success',
                  confirmButtonText: 'قبول'
                });
              }


              this.loadData();
            })
          }
        })
      }

    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped></style>