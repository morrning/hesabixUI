<script lang="ts" setup>
import { defineComponent, ref, watch } from 'vue'
import axios from "axios";
import Swal from "sweetalert2";
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";


const headers: Header[] = [
  { text: "عملیات", value: "operation" },
  { text: "نام", value: "fullname" },
  { text: "شماره تلفن", value: "mobile" },
  { text: "پست الکترونیکی", value: "email" },
  { text: "تاریخ عضویت", value: "dateRegister" },
  { text: "تعداد کسب‌و‌کار", value: "bidCount" },
  { text: "وضعیت", value: "status" },
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
  axios.get('/api/admin/users/count')
    .then((response) => {
      serverItemsLength.value = response.data.data;
    });
  //load items
  await axios.post('/api/admin/users/search', {
    options: serverOptions.value,
    search: searchValue.value
  })
    .then((response) => {
      items.value = response.data.data;
      loading.value = false;
    });
};

// initial load
loadFromServer();

watch(serverOptions, (value) => { loadFromServer(); }, { deep: true });
watch(searchValue, (value) => { loadFromServer(); }, { deep: true });
</script>

<template>
  <v-toolbar color="toolbar" :title="$t('user.users') + ' : (' + serverItemsLength + ')'">
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text class="pa-0">
        <v-row>
          <v-col>
            <v-text-field color="info" hide-details="auto" rounded="0" variant="outlined" density="compact"
              :placeholder="$t('dialog.search_txt')" v-model="searchValue" type="text" clearable>
              <template v-slot:prepend-inner>
                <v-tooltip location="bottom" :text="$t('dialog.search')">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" color="danger" icon="mdi-magnify"></v-icon>
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
            <EasyDataTable table-class-name="customize-table" show-index alternating :headers="headers" :items="items"
              rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از" theme-color="#1d90ff" header-text-direction="center"
              body-text-direction="center" :loading="loading" v-model:server-options="serverOptions"
              :server-items-length="serverItemsLength">
              <template #item-operation="{ id }">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn  variant="text" color="error" icon="mdi-menu" v-bind="props">

                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item class="text-dark" icon="mdi-person" :title="$t('dialog.change_password')" :to="'/profile/manager/user/change-password/' + id">
                      <template v-slot:prepend>
                        <v-icon icon="mdi-lock-reset"></v-icon>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
              <template #item-status="{ status }">
                <span v-if="status" class="text-success">فعال</span>
                <span v-else class="text-danger">غیرفعال</span>
              </template>
              <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
                <v-btn size="small" color="success" class="me-1" :disabled="isFirstPage" @click="prevPage"
                  prepend-icon="mdi-skip-next">
                  {{ $t('dialog.prev_page') }}
                </v-btn>
                <v-btn size="small" color="success" class="me-1" :disabled="isLastPage" @click="nextPage"
                  append-icon="mdi-skip-previous">
                  {{ $t('dialog.next_page') }}
                </v-btn>
              </template>
            </EasyDataTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>