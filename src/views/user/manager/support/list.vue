<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from "axios";

export default defineComponent({
  name: "list",
  data: () => {
    return {
      searchValue: '',
      loading: ref(true),
      items: [],
      headers: [
        { text: "کاربر", value: "submitter.fullName", sortable: true },
        { text: "عنوان", value: "title", sortable: true },
        { text: "تاریخ", value: "dateSubmit", sortable: true },
        { text: "وضعیت", value: "state", sortable: true },
        { text: "عملیات", value: "operation" },
      ]
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      axios.post('/api/admin/support/list').then((response) => {
        this.items = response.data.data;
        this.loading = false;
      })
    }
  },
  mounted() {
    this.loadData();
  }
})
</script>

<template>
  <v-toolbar color="toolbar" :title="$t('pages.support.titlebar_admin')">
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text class="pa-0">
        <v-row>
          <v-col>
            <EasyDataTable table-class-name="customize-table" show-index alternating :search-value="searchValue"
              :headers="headers" :items="items" theme-color="#1d90ff" header-text-direction="center"
              body-text-direction="center" rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از" :loading="loading">
              <template #item-operation="{ id }">
                <v-tooltip :text="$t('dialog.view')" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="primary" icon="mdi-eye" size="small" density="comfortable"
                      variant="flat" :to="'/profile/manager/support-view/' + id" @click="loading = true;" />
                  </template>
                </v-tooltip>
              </template>
              <template #item-state="{ state }">
                <span v-if="state == 'پاسخ داده شده'" class="text-success"> پاسخ داده
                  شده </span>
                <span v-else class="text-danger"> در حال پیگیری </span>
              </template>
            </EasyDataTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>