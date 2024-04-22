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

      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <div class="block-content pt-1 pb-3">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="mb-2">
                  <label class="form-label">تامین کننده</label>
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
                </EasyDataTable>
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

export default {
  name: "buysellByPerson",
  data: () => {
    return {
      loading: ref(true),
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
        { text: "کالا / خدمات", value: "khadamat", sortable: true },
        { text: "نام کالا و خدمات", value: "name", sortable: true },
        { text: "واحد شمارش", value: "unit", sortable: true },
        { text: "تعداد", value: "count", sortable: true },
        { text: "مبلغ فی", value: "priceOne", sortable: true },
        { text: "مبلغ کل", value: "priceAll", sortable: true },
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
        this.loading = false;
      })
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
    }
  },
}
</script>

<style scoped></style>