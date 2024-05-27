<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-bank px-2"></i>
        حساب‌های بانکی
      </h3>
      <div class="block-options">
        <router-link to="/acc/banks/mod/" class="block-options-item">
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
          <EasyDataTable show-index alternating :search-value="searchValue" :headers="headers" :items="items"
            theme-color="#1d90ff" header-text-direction="center" body-text-direction="center"
            rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از"
            :loading="loading">
            <template #item-operation="{ code }">
              <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm btn-link"
                data-bs-toggle="dropdown" id="dropdown-align-center-alt-primary" type="button">
                <i class="fa-solid fa-ellipsis"></i>
              </button>
              <div aria-labelledby="dropdown-align-center-outline-primary" class="dropdown-menu dropdown-menu-end"
                style="">
                <router-link class="dropdown-item" :to="'/acc/banks/card/view/' + code">
                  <i class="fa fa-eye text-success pe-2"></i>
                  مشاهده
                </router-link>
                <router-link class="dropdown-item" :to="'/acc/banks/mod/' + code">
                  <i class="fa fa-edit pe-2"></i>
                  ویرایش
                </router-link>
                <button type="button" @click="deleteItem(code)" class="dropdown-item text-danger">
                  <i class="fa fa-trash pe-2"></i>
                  حذف
                </button>
              </div>
            </template>
            <template #item-name="{ name, code }">
              <router-link :to="'/acc/banks/card/view/' + code">
                {{ name }}
              </router-link>
            </template>
            <template #item-balance="{ balance }">
              <label class="text-success" v-if="balance >= 0">{{ this.$filters.formatNumber(balance) }}</label>
              <label class="text-danger" v-else>{{ this.$filters.formatNumber(-1 * balance) }} منفی</label>
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

export default {
  name: "list",
  data: () => {
    return {
      searchValue: '',
      loading: ref(true),
      items: [],
      headers: [
        { text: "عملیات", value: "operation", width: "130" },
        { text: "کد", value: "code", width: "100" },
        { text: "بانک", value: "name", width: "140" },
        { text: "موجودی(ریال)", value: "balance", width: "140" },
        { text: "صاحب حساب", value: "owner", width: "120" },
        { text: "شماره کارت", value: "cardNum", width: "120" },
        { text: "شبا", value: "shaba", width: "160" },
        { text: "شعبه", value: "shobe", width: "120" },
        { text: "تلفن اینترنت بانک", value: "mobileInternetBank", width: "120" },
        { text: "شماره کارتخوان", value: "posNum", width: "100" },
      ]
    }
  },
  methods: {
    loadData() {
      axios.get('/api/bank/list')
        .then((response) => {
          this.items = response.data;
          this.loading = false;
        })
    },
    deleteItem(code) {
      Swal.fire({
        text: 'آیا برای حذف حساب بانکی مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/bank/delete/' + code).then((response) => {
            if (response.data.result == 1) {
              let index = 0;
              for (let z = 0; z < this.items.length; z++) {
                index++;
                if (this.items[z]['code'] == code) {
                  this.items.splice(index - 1, 1);
                }
              }
              Swal.fire({
                text: 'بانک با موفقیت حذف شد.',
                icon: 'success',
                confirmButtonText: 'قبول'
              });
            }
            else if (response.data.result == 2) {
              Swal.fire({
                text: 'بانک به دلیل داشتن تراکنش و اسناد حسابداری مرتبط قابل حذف نیست.',
                icon: 'error',
                confirmButtonText: 'قبول'
              });
            }
            else if (response.data.result == 3) {
              Swal.fire({
                text: 'بانک به دلیل انتخاب به عنوان تسویه کیف پول قابل حذف نیست.',
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