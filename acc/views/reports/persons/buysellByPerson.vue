<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa-solid fa-chart-simple px-2"></i>
        گزارش خرید و فروش های اشخاص
      </h3>
      <div class="block-options">
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
          <div class="block-content pt-1 pb-3">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="mb-2">
                  <label class="form-label">شخص</label>
                  <v-select dir="rtl" :options="persons" label="nikename" v-model="selectedPerson">
                    <template #no-options="{ search, searching, loading }">
                      وردی یافت نشد!
                    </template>
                  </v-select>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="mb-2">
                  <label class="form-label">نوع</label>
                  <v-select dir="rtl" :options="types" label="label" v-model="selectedType">
                    <template #no-options="{ search, searching, loading }">
                      وردی یافت نشد!
                    </template>
                  </v-select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-12 m-0 p-0">
                <div class="mb-1">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text"><i class="fa fa-search"></i></span>
                    <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
                  </div>
                </div>
                <EasyDataTable v-model:items-selected="itemsSelected" multi-sort show-index alternating
                  :search-value="searchValue" :headers="headers" :items="items" theme-color="#1d90ff"
                  header-text-direction="center" body-text-direction="center" rowsPerPageMessage="تعداد سطر"
                  emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از" :loading="loading">
                  <template #item-khadamat="{ khadamat }">
                    <label v-if="khadamat == false">کالا و اقلام فیزیکی</label>
                    <label v-else>خدمات</label>
                  </template>
                  <template #item-docCode="{ docCode }">
                    <RouterLink :to="'/acc/accounting/view/' + docCode">{{ docCode }}</RouterLink>
                  </template>
                  <template #item-type="{ docCode, type }">
                    <RouterLink v-if="type == 'buy'" :to="'/acc/buy/view/' + docCode">خرید</RouterLink>
                    <RouterLink v-else-if="type == 'sell'" :to="'/acc/sell/view/' + docCode">فروش</RouterLink>
                  </template>
                </EasyDataTable>
                <div class="container-fluid p-0 mx-0 my-3">
                  <a class="block block-rounded block-link-shadow border-start border-success border-3"
                    href="javascript:void(0)">
                    <div class="block-content block-content-full block-content-sm bg-body-light">
                      <div class="row">
                        <div class="col-sm-6 com-md-6">
                          <span class="text-dark">
                            <i class="fa fa-list-dots"></i>
                            مبلغ کل:
                          </span>
                          <span class="text-primary">
                            {{ this.$filters.formatNumber(this.sumTotal) }}
                            ریال
                          </span>
                        </div>

                        <div class="col-sm-6 com-md-6">
                          <span class="text-dark">
                            <i class="fa fa-list-check"></i>
                            جمع مبلغ موارد انتخابی:
                          </span>
                          <span class="text-primary">
                            {{ this.$filters.formatNumber(this.sumSelected) }}
                            ریال
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
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
import { ref } from "vue";
import { RouterLink } from "vue-router";

export default {
  name: "buysellByPerson",
  data: () => {
    return {
      loading: ref(true),
      sumSelected: 0,
      sumTotal: 0,
      persons: [],
      types: [
        { id: 'buy', label: 'خرید' },
        { id: 'sell', label: 'فروش' },
      ],
      selectedType: {},
      selectedPerson: {},
      searchValue: '',
      loading: ref(true),
      items: [],
      itemsSelected: [],
      headers: [
        { text: "کد", value: "code" },
        { text: "سند حسابداری", value: "docCode" },
        { text: "نوع", value: "type" },
        { text: "تاریخ", value: "date" },
        { text: "کالا / خدمات", value: "khadamat", sortable: true },
        { text: "نام کالا و خدمات", value: "name", sortable: true },
        { text: "واحد شمارش", value: "unit", sortable: true },
        { text: "تعداد", value: "count", sortable: true },
        { text: "مبلغ فی", value: "priceOne", sortable: true },
        { text: "مبلغ کل", value: "priceAll", sortable: true },
        { text: "تجمعی", value: "amountInc", sortable: true },
      ],
    }
  },
  methods: {
    loadData() {
      axios.get('/api/person/list/limit')
        .then((response) => {
          this.persons = response.data;
          if (this.persons.length != 0) {
            this.selectedPerson = this.persons[0];
          }
          this.selectedType = this.types[0];
          this.loading = false;
        });
    },
    filter() {
      this.loading = true;
      axios.post('/api/report/person/buysell', {
        type: this.selectedType.id,
        person: this.selectedPerson.code
      }).then((response) => {
        this.items = response.data;
        let sum = 0;
        this.sumTotal = 0;
        this.items.forEach((item) => {
          sum += parseInt(item.priceAll.replaceAll(',', ''));
          item.amountInc = this.$filters.formatNumber(sum);
        });
        this.sumTotal = sum;
        this.loading = false;
      })
    },
    excellOutput(AllItems = true) {
      if (AllItems) {
        axios({
          method: 'get',
          url: '/api/report/person/buysell/export/excel',
          responseType: 'arraybuffer',
        }).then((response) => {
          var FILE = window.URL.createObjectURL(new Blob([response.data]));
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'hesabix-buysell-report-list.xlsx');
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
            url: '/api/report/person/buysell/export/excel',
            responseType: 'arraybuffer',
            data: { items: this.itemsSelected }
          }).then((response) => {
            var FILE = window.URL.createObjectURL(new Blob([response.data]));
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'hesabix-buysell-report-list.xlsx');
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
  },
  watch: {
    selectedPerson: {
      handler: function (val, oldVal) {
        this.filter();
      },
      deep: true
    },
    selectedType: {
      handler: function (val, oldVal) {
        this.filter();
      },
      deep: true
    },
    itemsSelected: {
      handler: function (val, oldVal) {
        this.sumSelected = 0;
        this.itemsSelected.forEach((item) => {
          this.sumSelected += parseInt(item.priceAll.replaceAll(",", ""))
        });
      },
      deep: true
    }
  },
}
</script>

<style scoped></style>