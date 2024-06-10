<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button"
          class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-book"></i>
        فاکتورهای فروش
      </h3>
      <div class="block-options">
        <div class="dropdown-center block-options-item">
          <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm btn-link" data-bs-toggle="dropdown"
            id="dropdown-align-center-alt-primary" type="button">
            <i class="fa-solid fa-ellipsis"></i>
          </button>
          <div aria-labelledby="dropdown-align-center-outline-primary" class="dropdown-menu dropdown-menu-end" style="">
            <button v-for="item in types" class="dropdown-item" @click="changeLabel(item)">
              <i class="fa fa-undo text-dark pe-2"></i>
              تغییر به
              {{ item.label }}
            </button>
            <button class="dropdown-item text-danger" @click="changeLabel('clear')">
              <i class="fa fa-undo pe-2"></i>
              حذف برچسب‌ها
            </button>
          </div>
        </div>
        <router-link to="/acc/sell/mod/" type="button" class="block-options-item">
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
          <EasyDataTable table-class-name="customize-table" v-model:items-selected="itemsSelected" show-index
            alternating :headers="headers" :items="items" theme-color="#1d90ff" header-text-direction="center"
            body-text-direction="center" rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
            rowsOfPageSeparatorMessage="از" :loading="loading">
            <template #item-operation="{ code, type }">
              <div class="dropdown-center">
                <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm btn-link" data-bs-toggle="dropdown"
                  id="dropdown-align-center-alt-primary" type="button">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
                <div aria-labelledby="dropdown-align-center-outline-primary" class="dropdown-menu dropdown-menu-end"
                  style="">
                  <router-link class="dropdown-item" :to="'/acc/accounting/view/' + code">
                    <i class="fa fa-file text-success pe-2"></i>
                    سند حسابداری
                  </router-link>
                  <router-link class="dropdown-item" :to="'/acc/sell/view/' + code">
                    <i class="fa fa-eye text-info pe-2"></i>
                    مشاهده فاکتور
                  </router-link>
                  <button type="button" @click="canEditItem(code)" class="dropdown-item">
                    <i class="fa fa-edit pe-2"></i>
                    ویرایش
                  </button>
                  <button type="button" @click="deleteItem(code)" class="dropdown-item text-danger">
                    <i class="fa fa-trash pe-2"></i>
                    حذف
                  </button>
                </div>
              </div>
            </template>
            <template #item-label="{ label }">
              <span v-if="label">
                <span v-if="label.code == 'payed'" class="text-success">{{ label.label }}</span>
                <span v-if="label.code == 'returned'" class="text-danger">{{ label.label }}</span>
                <span v-if="label.code == 'accepted'" class="text-info">{{ label.label }}</span>
              </span>
            </template>
            <template #item-des="{ des }">
              {{ des.replace("فاکتور فروش:", "") }}
            </template>
            <template #item-relatedDocsCount="{ relatedDocsCount, relatedDocsPays }">
              <span v-if="relatedDocsCount != '0'" class="text-success"><i class="fa fa-money"></i>
                {{ this.$filters.formatNumber(relatedDocsPays) }}
              </span>
            </template>
            <template #item-person="{ person }">
              <router-link :to="'/acc/persons/card/view/' + person.code">
                {{ person.nikename }}
              </router-link>
            </template>
            <template #item-code="{ code }">
              <router-link :to="'/acc/sell/view/' + code">
                {{ code }}
              </router-link>
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";
export default {
  name: "list",
  data: () => {
    return {
      sumSelected: 0,
      sumTotal: 0,
      itemsSelected: [],
      searchValue: '',
      types: [],
      loading: ref(true),
      items: [],
      orgItems: [],
      headers: [
        { text: "عملیات", value: "operation" },
        { text: "فاکتور", value: "code", sortable: true },
        { text: "تاریخ", value: "date", sortable: true },
        { text: "خریدار", value: "person", sortable: true },
        { text: "مبلغ", value: "amount", sortable: true },
        { text: "پرداختی", value: "relatedDocsCount", sortable: true },
        { text: "برچسب", value: "label", width: 100 },
        { text: "شرح", value: "des", sortable: true },
      ]
    }
  },
  methods: {
    changeLabel(label) {
      if (this.itemsSelected.length == 0) {
        Swal.fire({
          text: 'هیچ موردی انتخاب نشده است.',
          icon: 'warning',
          confirmButtonText: 'قبول'
        });
      }
      else {
        this.loading = true;
        axios.post('/api/sell/label/change', {
          'items': this.itemsSelected,
          'label': label
        }
        ).then((response) => {
          this.loading == false;
          if (response.data.code == 0) {
            Swal.fire({
              text: 'فاکتور‌ها با موفقیت ویرایش شد.',
              icon: 'success',
              confirmButtonText: 'قبول'
            });
            this.itemsSelected = [];
          }
          else if (response.data.result == 2) {
            Swal.fire({
              text: response.data.message,
              icon: 'warning',
              confirmButtonText: 'قبول'
            });
          }
          this.loadData();
        })
      }
    },
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
            if (item.label) {
              if (st.code == item.label.code) {
                let existBefore = false;
                calcItems.forEach((ri) => {
                  if (item.label.code == ri.code) {
                    existBefore = true;
                  }
                })
                if (existBefore == false) {
                  calcItems.push(item);
                }
              }
            }

          });
        });
        this.items = calcItems;
      }

      this.loading = false;
    },
    loadData() {
      axios.post('/api/invoice/types', {
        type: 'sell'
      }).then((response) => {
        this.types = response.data;
      });

      axios.post('/api/sell/docs/search', {
        type: 'sell'
      })
        .then((response) => {
          this.items = response.data;
          this.orgItems = response.data;
          this.items.forEach((item) => {
            item.amount = this.$filters.formatNumber(item.amount);
            this.sumTotal += parseInt(item.amount.replaceAll(",", ''));
          })
          this.loading = false;
        })
    },
    canEditItem(code) {
      this.loading = true;
      axios.post('/api/sell/edit/can/' + code)
        .then((response) => {
          this.loading = false;
          if (response.data.result == false) {
            Swal.fire({
              text: 'این فاکتور به دلیل وجود اسناد پرداخت یا حواله های انبار مرتبط با آن قابل ویرایش نیست',
              confirmButtonText: 'قبول',
              icon: 'error'
            });
          }
          else {
            this.$router.push('/acc/sell/mod/' + code);
          }
        });
    },
    deleteItem(code) {
      Swal.fire({
        text: 'آیا برای حذف این مورد مطمئن هستید؟ تمامی اسناد پرداخت و حواله های انبار همراه فاکتور نیز حذف خواهند شد.',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon: 'warning'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/accounting/remove', {
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
                text: 'فاکتور فروش با موفقیت حذف شد.',
                icon: 'success',
                confirmButtonText: 'قبول'
              });
            }
            else if (response.data.result == 2) {
              Swal.fire({
                text: response.data.message,
                icon: 'warning',
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
  },
  watch: {
    itemsSelected: {
      handler: function (val, oldVal) {
        this.sumSelected = 0;
        this.itemsSelected.forEach((item) => {
          this.sumSelected += parseInt(item.amount.replaceAll(",", ""))
        });
      },
      deep: true
    },
    searchValue: {
      handler: function (val, oldVal) {
        if (this.searchValue == '') {
          this.items = this.orgItems;
        }
        else {
          let temp = [];
          this.orgItems.forEach((item) => {
            if (item.person.nikename.includes(this.searchValue)) {
              temp.push(item)
            }
            else if (item.date.includes(this.searchValue)) {
              temp.push(item)
            }
            else if (item.des.includes(this.searchValue)) {
              temp.push(item)
            }
            else if (item.code.includes(this.searchValue)) {
              temp.push(item)
            }
            else if (item.label) {
              if (item.label.label.includes(this.searchValue)) {
                temp.push(item)
              }
            }
          });
          this.items = temp;
        }
      },
      deep: false
    }
  }
}
</script>

<style scoped></style>