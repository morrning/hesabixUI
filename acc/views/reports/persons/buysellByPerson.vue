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
      selectedPerson: {}
    }
  },
  methods: {
    loadData() {
      axios.get('/api/person/list/limit')
        .then((response) => {
          this.persons = response.data;
          if(this.persons.length != 0){
            this.selectedPerson = this.persons[0];
          }
          this.selectedType = this.types[0];
          this.loading = false;
        })
    },
  },
  beforeMount() {
    this.loadData();
  },
  watch: {
    selectedPerson: {
      handler: function (val, oldVal) {
       alert();
      },
      deep: true
    },
    selectedType: {
      handler: function (val, oldVal) {
       alert();
      },
      deep: true
    }
  },
}
</script>

<style scoped></style>