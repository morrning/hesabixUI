<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button"
          class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa-solid fa-money-bill"></i>
        ارز‌های جانبی
      </h3>
      <div class="block-options">

      </div>
    </div>
    <div class="block-content p-0">
      <loading color="blue" loader="dots" v-model:active="loading" :is-full-page="false" />
      <table class="table table-striped table-vcenter">
        <thead>
          <tr>
            <th class="text-center" style="width: 50px;">#</th>
            <th class="text-center">واحد پولی</th>
            <th class="text-center">اختصار</th>
            <th class="text-center" style="width: 100px;">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in moneys">
            <th class="text-center" scope="row">{{ key + 1 }}</th>
            <td class="text-center fw-semibold">
              {{ item.label }}
            </td>
            <td class="text-center">
              {{ item.name }}
            </td>
            <td class="text-center">
              <button v-if="item.name != bid.arzmain.name" @click="deleteItem(item.name)"
                class="btn btn-sm btn-alt-secondary" type="button" title=" حذف ارز ">
                <i class="fa fa-times"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";
import { getApiUrl, getSiteName } from "../../../hesabixConfig"
import Loading from "vue-loading-overlay";

export default {
  name: "avatar",
  components: {
    Loading
  },
  data: () => {
    return {
      loading: true,
      moneys: [],
      bid: {}
    }
  },
  methods: {
    loadData() {
      axios.get('/api/business/get/info/' + localStorage.getItem('activeBid'))
        .then((response) => {
          this.loading = false;
          this.moneys = response.data.moneys;
          this.bid = response.data;
        })
    },
    save() {
      this.loading = true;
    },
    deleteItem(name) {
      Swal.fire({
        text: 'این عملیات غیر قابل بازگشت است. تنها در صورتی قادر خواهید بود یک ارز را حذف نمایید که هیچ سند حسابداری با این ارز در کسب و کار شما ثبت نشده باشد.آیا مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon: 'warning'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.loading = true;
          axios.post('/api/money/remove', {
            'name': name
          }
          ).then((response) => {
            this.loading = false;
            if (response.data.Success == 1) {
              this.loadData();
              Swal.fire({
                text: ' با موفقیت حذف شد.',
                icon: 'success',
                confirmButtonText: 'قبول'
              });
            }
            else if (response.data.Success == false) {
              Swal.fire({
                text: response.data.message,
                icon: 'warning',
                confirmButtonText: 'قبول'
              });
            }
          })
        }
      })
    },
  },
  beforeMount() {
    this.loadData();
  }
}
</script>
<style scoped></style>