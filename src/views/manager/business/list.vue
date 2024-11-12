<script lang="ts" setup>
import { defineComponent, ref, watch } from 'vue'
import axios from "axios";
import Swal from "sweetalert2";
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";


const headers: Header[] = [
  { text: "عملیات", value: "operation" },
  { text: "نام", value: "name" },
  { text: "مالک", value: "owner" },
  { text: "موبایل مالک", value: "ownerMobile" },
  { text: "تاریخ ایجاد", value: "dateRegister" },
  { text: "تعداد کالا و خدمات", value: "commodityCount" },
  { text: "تعداد اشخاص", value: "personsCount" },
  { text: "تعداد اسناد حسابداری", value: "hesabdariDocsCount" },
  { text: "تعداد اسناد انبار", value: "StoreroomDocsCount" },
];

const items = ref<Item[]>([]);

const loading = ref(false);
const serverItemsLength = ref(0);
const searchValue = ref('');
const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 25,
  sortBy: 'id',
  sortType: 'desc',
});

const loadFromServer = async () => {
  loading.value = true;
  axios.get('/api/admin/business/count')
    .then((response) => {
      serverItemsLength.value = response.data;
    });
  //load items
  await axios.post('/api/admin/business/search', {
    options: serverOptions.value,
    search: searchValue.value
  })
    .then((response) => {
      items.value = response.data;
      loading.value = false;
    });
};

// initial load
loadFromServer();

watch(serverOptions, (value) => { loadFromServer(); }, { deep: true });
watch(searchValue, (value) => { loadFromServer(); }, { deep: true });
</script>

<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button"
          class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-list-dots px-2"></i>
        کسب و کار‌ها
        <span class="badge bg-secondary">{{ items.length }}</span>
      </h3>
      <div class="block-options">
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
          <EasyDataTable table-class-name="customize-table" show-index alternating :headers="headers" :items="items"
            rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از"
            theme-color="#1d90ff" header-text-direction="center" body-text-direction="center" :loading="loading"
            v-model:server-options="serverOptions" :server-items-length="serverItemsLength">
            <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
              <button class="btn btn-sm btn-primary m-1" :disabled="isFirstPage" @click="prevPage">
                صفحه قبلی
              </button>
              <button class="btn btn-sm btn-success m-1" :disabled="isLastPage" @click="nextPage">
                صفحه بعدی
              </button>
            </template>
            <template #item-operation="{ code }">

            </template>
            <template #item-status="{ status }">
              <span v-if="status" class="text-success">فعال</span>
              <span v-else class="text-danger">غیرفعال</span>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>