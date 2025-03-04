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
    <v-spacer />
    <v-tooltip :text="$t('dialog.add_new')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-package-variant-plus" color="primary" to="/acc/commodity/mod/" />
      </template>
    </v-tooltip>
    <change-price :items="itemsSelected" :windows-state="importWindowsState" />
    <import-excel :windows-state="importWindowsState" />
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="" color="red">
          <v-tooltip activator="parent" :text="$t('dialog.export_pdf')" location="bottom" />
          <v-icon icon="mdi-file-pdf-box" />
        </v-btn>
      </template>
      <v-list>
        <v-list-subheader color="primary">{{ $t('dialog.export_pdf') }}</v-list-subheader>
        <v-list-item class="text-dark" :title="$t('dialog.selected')" @click="exportPDF(false)">
          <template v-slot:prepend>
            <v-icon color="green-darken-4" icon="mdi-check" />
          </template>
        </v-list-item>
        <v-list-item class="text-dark" :title="$t('dialog.all')" @click="exportPDF(true)">
          <template v-slot:prepend>
            <v-icon color="indigo-darken-4" icon="mdi-expand-all" />
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="" color="green">
          <v-tooltip activator="parent" :text="$t('dialog.export_excel')" location="bottom" />
          <v-icon icon="mdi-file-excel-box" />
        </v-btn>
      </template>
      <v-list>
        <v-list-subheader color="primary">{{ $t('dialog.export_excel') }}</v-list-subheader>
        <v-list-item class="text-dark" :title="$t('dialog.selected')" @click="exportExcel(false)">
          <template v-slot:prepend>
            <v-icon color="green-darken-4" icon="mdi-check" />
          </template>
        </v-list-item>
        <v-list-item class="text-dark" :title="$t('dialog.all')" @click="exportExcel(true)">
          <template v-slot:prepend>
            <v-icon color="indigo-darken-4" icon="mdi-expand-all" />
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-tooltip :text="$t('dialog.delete')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-trash-can" color="danger" @click="deleteGroup" />
      </template>
    </v-tooltip>
  </v-toolbar>

  <v-text-field :loading="loading" color="green" class="mb-0 pt-0 rounded-0" hide-details="auto" density="compact"
    :placeholder="$t('dialog.search_txt')" v-model="searchQuery" type="text" @input="debouncedSearch">
    <template v-slot:prepend-inner>
      <v-tooltip location="bottom" :text="$t('dialog.search')">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" color="danger" icon="mdi-magnify" />
        </template>
      </v-tooltip>
    </template>
    <template v-slot:append-inner>
      <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-icon size="sm" v-bind="props" icon="" color="primary">
            <v-tooltip activator="parent" variant="plain" :text="$t('dialog.filters')" location="bottom" />
            <v-icon icon="mdi-filter" />
          </v-icon>
        </template>
        <v-list>
          <v-list-subheader color="primary">
            <v-icon icon="mdi-filter" />
            {{ $t('dialog.filters') }}
          </v-list-subheader>
          <v-list-item v-for="(item, index) in categories" :key="index" class="text-dark">
            <div class="form-check form-check-inline mx-1">
              <input v-model="item.checked" class="form-check-input" type="checkbox" @change="fetchData" />
              <label class="form-check-label">{{ item.name }}</label>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-text-field>

  <EasyDataTable table-class-name="customize-table" v-model:items-selected="itemsSelected" multi-sort show-index
    alternating :headers="headers" :items="items" :loading="loading" :server-items-length="totalItems"
    v-model:server-options="serverOptions" @update:server-options="fetchData" theme-color="#1d90ff"
    header-text-direction="center" body-text-direction="center" rows-per-page-message="تعداد سطر"
    empty-message="اطلاعاتی برای نمایش وجود ندارد" rows-of-page-separator-message="از">
    <template #item-operation="{ code }">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" size="small" color="error" icon="mdi-menu" v-bind="props" />
        </template>
        <v-list>
          <v-list-item class="text-dark" :title="$t('dialog.edit')" :to="'/acc/commodity/mod/' + code">
            <template v-slot:prepend>
              <v-icon icon="mdi-file-edit" />
            </template>
          </v-list-item>
          <v-list-item class="text-dark" :title="$t('dialog.delete')" @click="deleteItem(code)">
            <template v-slot:prepend>
              <v-icon color="deep-orange-accent-4" icon="mdi-trash-can" />
            </template>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template #item-speedAccess="{ speedAccess }">
      <i v-if="speedAccess" class="fa fa-check text-success" />
    </template>
    <template #item-priceBuy="{ priceBuy }">
      {{ $filters.formatNumber(priceBuy) }}
    </template>
    <template #item-priceSell="{ priceSell }">
      {{ $filters.formatNumber(priceSell) }}
    </template>
    <template #item-count="{ count, khadamat }">
      <label v-if="!khadamat">
        <span class="text-danger" v-if="count < 0">
          <i class="fa fa-arrow-down me-1" />
          {{ $filters.formatNumber(Math.abs(count)) }}
          کمبود موجودی
        </span>
        <span class="text-success" v-if="count > 0">
          <i class="fa fa-arrow-up me-1" />
          {{ $filters.formatNumber(Math.abs(count)) }}
        </span>
        <span class="text-dark" v-if="count === 0">
          {{ $filters.formatNumber(Math.abs(count)) }}
        </span>
      </label>
      <label v-else>آیتم خدماتی</label>
    </template>
    <template #item-khadamat="{ khadamat }">
      <label v-if="!khadamat">کالا و اقلام فیزیکی</label>
      <label v-else>خدمات</label>
    </template>
    <template #item-withoutTax="{ withoutTax }">
      <i v-if="!withoutTax || withoutTax === null" class="fa fa-check text-success" />
      <i v-else class="fa fa-close text-danger" />
    </template>
    <template #item-commodityCountCheck="{ commodityCountCheck }">
      <i v-if="commodityCountCheck" class="fa fa-check text-success" />
      <i v-else class="fa fa-close text-danger" />
    </template>
  </EasyDataTable>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import ImportExcel from '../component/importModal/commodity-import-excel.vue';
import ChangePriceGroup from '../component/commodity/changePriceGroup.vue';
import { getApiUrl } from '/src/hesabixConfig';

// تنظیم پایه URL از hesabixConfig برای درخواست‌های axios
const apiUrl = getApiUrl();
axios.defaults.baseURL = apiUrl;

// Refs
const loading = ref(false);
const items = ref([]);
const itemsSelected = ref([]);
const totalItems = ref(0);
const searchQuery = ref('');
const categories = ref([]);
const importWindowsState = ref({ submited: false });
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: 'code',
  sortDesc: true,
});

// Headers جدول
const headers = ref([
  { text: 'عملیات', value: 'operation', width: '100' },
  { text: 'کد', value: 'code', sortable: true },
  { text: 'کالا / خدمات', value: 'khadamat', sortable: true, width: 150 },
  { text: 'نام کالا و خدمات', value: 'name', sortable: true, width: 150 },
  { text: 'واحد شمارش', value: 'unit', sortable: true, width: 100 },
  { text: 'موجودی', value: 'count', sortable: true, width: 150 },
  { text: 'دسترسی سریع', value: 'speedAccess', width: 100 },
  { text: 'مالیات', value: 'withoutTax', width: 100 },
  { text: 'دسته‌بندی', value: 'cat', sortable: true, width: 100 },
  { text: 'قیمت خرید', value: 'priceBuy', sortable: true, width: 100 },
  { text: 'قیمت فروش', value: 'priceSell', sortable: true, width: 100 },
  { text: 'نقطه سفارش', value: 'orderPoint', width: 100 },
  { text: 'حداقل سفارش', value: 'minOrderCount', width: 100 },
  { text: 'زمان انتظار', value: 'dayLoading', width: 100 },
  { text: 'کنترل موجودی', value: 'commodityCountCheck', width: 100 },
]);

// فچ کردن داده‌ها از سرور
const fetchData = async () => {
  try {
    loading.value = true;
    const selectedCategories = categories.value
      .filter((cat) => cat.checked)
      .map((cat) => cat.id);

    const filters = {};
    if (searchQuery.value.trim()) {
      filters.search = { value: searchQuery.value.trim() };
    }
    if (selectedCategories.length > 0) {
      filters.cat = { operator: '=', value: selectedCategories };
    }

    const payload = {
      filters,
      pagination: {
        page: serverOptions.value.page,
        limit: serverOptions.value.rowsPerPage,
      },
      sort: {
        sortBy: serverOptions.value.sortBy,
        sortDesc: serverOptions.value.sortDesc,
      },
    };

    const response = await axios.post('/api/commodities/search', payload);

    items.value = response.data.results;
    totalItems.value = response.data.pagination.total_items;
  } catch (error) {
    console.error('Error fetching data:', error);
    Swal.fire({
      text: 'خطا در بارگذاری داده‌ها',
      icon: 'error',
      confirmButtonText: 'قبول',
    });
  } finally {
    loading.value = false;
  }
};

// فچ کردن دسته‌بندی‌ها
const fetchCategories = async () => {
  try {
    const response = await axios.post('/api/commodity/cat/get/line');
    categories.value = response.data.map((cat) => ({
      id: cat.id,
      name: cat.name,
      checked: false,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// دیبونس برای جستجو
const debouncedSearch = debounce(fetchData, 500);

// متدهای خروجی
const exportExcel = async (allItems = true) => {
  try {
    const data = allItems ? {} : { items: itemsSelected.value };
    const response = await axios.post('/api/commodity/list/excel', data, {
      responseType: 'arraybuffer',
    });

    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', 'commodity-list.xlsx');
    document.body.appendChild(fileLink);
    fileLink.click();
  } catch (error) {
    console.error('Error exporting Excel:', error);
    Swal.fire({
      text: 'خطا در خروجی اکسل',
      icon: 'error',
      confirmButtonText: 'قبول',
    });
  }
};

const exportPDF = async (allItems = true) => {
  try {
    if (!allItems && itemsSelected.value.length === 0) {
      Swal.fire({
        text: 'هیچ آیتمی انتخاب نشده است!',
        icon: 'info',
        confirmButtonText: 'قبول',
      });
      return;
    }

    const data = allItems ? {} : { items: itemsSelected.value };
    const response = await axios.post('/api/commodity/list/print', data);
    const printID = response.data.id;

    // استفاده از getApiUrl برای ساخت URL و هدایت کاربر به صفحه PDF
    const pdfUrl = `${getApiUrl()}/front/print/${printID}`;
    window.open(pdfUrl, '_blank', 'noreferrer');
  } catch (error) {
    console.error('Error exporting PDF:', error);
    Swal.fire({
      text: 'خطا در خروجی PDF',
      icon: 'error',
      confirmButtonText: 'قبول',
    });
  }
};

// متدهای حذف
const deleteItem = async (code) => {
  const result = await Swal.fire({
    text: 'آیا برای حذف این مورد مطمئن هستید؟',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر',
  });

  if (result.isConfirmed) {
    try {
      const response = await axios.post(`/api/commodity/delete/${code}`, { code });
      if (response.data.result === 1) {
        Swal.fire({
          text: 'کالا با موفقیت حذف شد.',
          icon: 'success',
          confirmButtonText: 'قبول',
        });
        fetchData();
      } else if (response.data.result === 2) {
        Swal.fire({
          text: 'کالا به دلیل داشتن سند حسابداری یا انبار مرتبط قابل حذف نیست.',
          icon: 'error',
          confirmButtonText: 'قبول',
        });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
};

const deleteGroup = async () => {
  if (itemsSelected.value.length === 0) {
    Swal.fire({
      text: 'هیچ آیتمی انتخاب نشده است!',
      icon: 'error',
      confirmButtonText: 'قبول',
    });
    return;
  }

  const result = await Swal.fire({
    text: 'آیا برای حذف این موارد مطمئن هستید؟',
    showCancelButton: true,
    confirmButtonText: 'بله',
    cancelButtonText: 'خیر',
  });

  if (result.isConfirmed) {
    try {
      const response = await axios.post('/api/commodity/deletegroup', itemsSelected.value);
      if (!response.data.data.ignored) {
        Swal.fire({
          text: 'کالاها با موفقیت حذف شدند.',
          icon: 'success',
          confirmButtonText: 'قبول',
        });
      } else {
        Swal.fire({
          text: 'تعدادی از کالاها به دلیل داشتن سند حسابداری یا انبار مرتبط حذف نشدند.',
          icon: 'warning',
          confirmButtonText: 'قبول',
        });
      }
      fetchData();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  }
};

// Watchers
watch(
  () => importWindowsState.value.submited,
  (newValue) => {
    if (newValue) {
      importWindowsState.value.submited = false;
      fetchData();
    }
  }
);

// OnMounted
onMounted(() => {
  fetchCategories();
  fetchData();
});
</script>

<style scoped>
/* استایل‌های مورد نیاز */
</style>