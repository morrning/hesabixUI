<template>
  <v-toolbar color="toolbar" :title="$t('drawer.persons')">
    <template v-slot:prepend>
      <v-tooltip :text="$t('dialog.back')" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" @click="this.$router.back()" variant="text" icon="mdi-arrow-right" />
        </template>
      </v-tooltip>
    </template>
    <v-spacer></v-spacer>
    <v-tooltip :text="$t('dialog.add_new')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-account-plus" color="primary" to="/acc/persons/mod/"></v-btn>
      </template>
    </v-tooltip>
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
  </v-toolbar>
  <v-row class="pa-1">
    <v-col>
      <v-text-field :loading="loading" color="green" class="mb-0 pt-0 rounded-0" hide-details="auto" density="compact"
        :placeholder="$t('dialog.search_txt')" v-model="searchValue" type="text" clearable>
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
                    <label class="form-check-label">{{ item.label }}</label>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-text-field>
      <EasyDataTable table-class-name="customize-table" :table-class-name="tableClassName"
        v-model:items-selected="itemsSelected" multi-sort show-index alternating :search-value="searchValue"
        :headers="headers" :items="items" theme-color="#1d90ff" header-text-direction="center"
        body-text-direction="center" rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
        rowsOfPageSeparatorMessage="از" :loading="loading">
        <template #item-operation="{ code }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn variant="text" size="small" color="error" icon="mdi-menu" v-bind="props" />
            </template>
            <v-list>
              <v-list-item class="text-dark" :title="$t('dialog.view')" :to="'/acc/persons/card/view/' + code">
                <template v-slot:prepend>
                  <v-icon color="green-darken-4" icon="mdi-eye"></v-icon>
                </template>
              </v-list-item>
              <v-list-item class="text-dark" :title="$t('dialog.edit')" :to="'/acc/persons/mod/' + code">
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
        <template #item-nikename="{ nikename, code }">
          <router-link :to="'/acc/persons/card/view/' + code">
            {{ nikename }}
          </router-link>
        </template>
        <template #item-speedAccess="{ speedAccess }">
          <i v-if="speedAccess" class="fa fa-check text-success"></i>
        </template>
        <template #item-status="{ balance }">
          <span v-if="balance < 0" class="text-danger">بدهکار</span>
          <span v-if="balance > 0" class="text-success">بستانکار</span>
        </template>
        <template #item-bs="{ bs }">
          <span>{{ this.$filters.formatNumber(bs) }}</span>
        </template>
        <template #item-bd="{ bd }">
          <span>{{ this.$filters.formatNumber(bd) }}</span>
        </template>
        <template #item-balance="{ balance }">
          <span>{{ this.$filters.formatNumber(balance) }}</span>
        </template>
      </EasyDataTable>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";

import HelpBtn from "../component/helpBtn.vue";
import importExcel from "../component/importModal/person-import-excel.vue";

export default {
  name: "list",
  components: {
    HelpBtn,
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
      tableClassName: 'extable',
      searchValue: '',
      loading: true,
      orgItems: [],
      types: [],
      typesSelected: [],
      items: [],
      itemsSelected: [],
      headers: [
        { text: "عملیات", value: "operation" },
        { text: "کد", value: "code" },
        { text: "نام مستعار", value: "nikename", sortable: true, width: 150 },
        { text: "تراز", value: "balance", sortable: true, width: 100 },
        { text: "وضعیت", value: "status", sortable: true, width: 110 },
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
      this.loading= true;
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
          axios.post('/api/person/delete/' + code).then((response) => {
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
            else if (response.data.result == 2) {
              Swal.fire({
                text: 'شخص  به دلیل داشتن تراکنش مرتبط قابل حذف نیست.',
                icon: 'warning',
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