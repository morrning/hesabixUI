<template>
  <v-toolbar color="toolbar" :title="$t('pages.support.titlebar')">
    <v-spacer></v-spacer>
    <v-tooltip :text="$t('user.ticket_new')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-chat-plus" color="primary" to="/profile/support-new"></v-btn>
      </template>
    </v-tooltip>

  </v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text class="pa-0">
        <v-row>
          <v-col>
            <EasyDataTable table-class-name="customize-table" alternating :search-value="searchValue" :headers="headers"
              :items="items" theme-color="#1d90ff" header-text-direction="center" body-text-direction="center"
              rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از" :loading="loading">
              <template #item-operation="{ id }">
                <v-tooltip :text="$t('dialog.view')" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="primary" icon="mdi-eye" size="small" density="comfortable"
                      variant="flat" :to="'/profile/support-view/' + id" @click="loading = true;" />
                  </template>
                </v-tooltip>
              </template>
              <template #item-state="{ state }">
                <span v-if="state == 'پاسخ داده شده'" class="text-success"><i class="fa fa-check-double"></i> پاسخ داده
                  شده </span>
                <span v-else class="text-danger"><i class="fa fa-question-circle"></i> در حال پیگیری </span>
              </template>
            </EasyDataTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "list",
  data() {
    return {
      searchValue: '',
      loading: true,
      items: [],
      headers: [
        { text: "شناسه", value: "id", sortable: true },
        { text: "تاریخ", value: "dateSubmit", sortable: true },
        { text: "عنوان", value: "title", sortable: true },
        { text: "وضعیت", value: "state", sortable: true },
        { text: "عملیات", value: "operation" },
      ]
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.post('/api/support/list').then((response) => {
        this.items = response.data;
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped></style>