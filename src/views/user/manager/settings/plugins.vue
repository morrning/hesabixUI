<script>
import axios from "axios";

export default {
  name: "plugins",
  data: () => {
    return {
      dialog: false,
      loading: true,
      items: [],
      headers: [
        { text: "نام افزونه", value: "name" },
        { text: "قیمت(تومان)", value: "price" },
        { text: "پیشفرض فعال", value: "defaultOn" },
        { text: "دوره اعتبار(ثانیه)", value: "time" },
        { text: "برچسب زمان", value: "timeLabel" },
        { text: "ویرایش", value: "operation" },
      ]
    }
  },
  methods: {
    loadData() {
      axios.get('/api/admin/plugins/list')
        .then((response) => {
          this.items = response.data;
          this.loading = false;
        })
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<template>
  <v-toolbar color="toolbar" :title="$t('dialog.plugins') + ' : (' + items.length + ')'">
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text class="pa-0">
        <v-row>
          <v-col>
            <EasyDataTable table-class-name="customize-table" show-index alternating :headers="headers" :items="items"
              rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از" theme-color="#1d90ff" header-text-direction="center"
              body-text-direction="center" :loading="loading">
              <template #item-operation="{ id }">
                <v-btn variant="text" @click="this.dialog = true;" color="success" icon="mdi-file-edit"
                  v-bind="props"></v-btn>
              </template>
              <template #item-defaultOn="{ defaultOn }">
                <span v-if="defaultOn">بله</span>
                <span v-else>‌خیر</span>
              </template>
              <template #item-time="{ time }">
                <span>{{ $filters.formatNumber(time) }}</span>
              </template>
              <template #item-price="{ price }">
                <span>{{ $filters.formatNumber(price) }}</span>
              </template>
            </EasyDataTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog" width="auto">
    <v-card min-width="400">
      <template v-slot:actions>
        <v-btn class="ms-auto" color="success" :text="$t('dialog.save')" @click="dialog = false"></v-btn>
      </template>
      <v-card-header>
        <v-toolbar class="fixed-top" color="toolbar" :title="$t('dialog.edit_plugin')">
          <template v-slot:append>
            <v-tooltip :text="$t('dialog.close')" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" @click="dialog = false" class="d-none d-sm-flex" variant="text"
                  icon="mdi-close" />
              </template>
            </v-tooltip>
          </template>
        </v-toolbar>
      </v-card-header>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>