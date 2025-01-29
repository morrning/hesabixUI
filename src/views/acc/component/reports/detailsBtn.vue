<template>
  <div class="text-center pa-4">
    <v-btn @click="dialog = true; loadData($props.node,$props.nodeType)" color="primary" size="xs" variant="plain" icon="mdi-magnify"></v-btn>
    <v-dialog v-model="dialog" class="vh-100">
      <v-card :loading="loading">
        <v-toolbar class="position-sticky" :title="$t('dialog.details')"></v-toolbar>
        <v-card-text class="p-0 m-0">
          <EasyDataTable table-class-name="customize-table" :table-class-name="tableClassName"
            multi-sort show-index alternating :search-value="searchValue"
            :headers="headers" :items="items" theme-color="#1d90ff" header-text-direction="center"
            body-text-direction="center" rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
            rowsOfPageSeparatorMessage="از" :loading="loading">
            <template #item-bs="{bs}">
              {{ $filters.formatNumber(bs) }}
            </template>
            <template #item-bd="{bd}">
              {{ $filters.formatNumber(bd) }}
            </template>
            <template #item-doc_code="{doc_code}">
              <v-btn color="primary" block variant="plain" :text="$filters.formatNumber(doc_code)"
                           :to="'/acc/accounting/view/' + doc_code"></v-btn>
            </template>
          </EasyDataTable>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn :text="$t('dialog.close')" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DetailsBtn",
  props: {
    node: String,
    nodeType: String,
  },
  data: () => {
    return {
      loading: true,
      dialog: false,
      items: [],
      headers: [
        { text: "تاریخ", value: "date" },
        { text: "شماره", value: "doc_code" },
        { text: "شرح", value: "des" },
        { text: "بدهکار", value: "bd" },
        { text: "بستانکار", value: "bs" },
        { text: "تعداد", value: "commodity_count" },
      ]
    }
  },
  methods: {
    loadData(node,type) {
      this.loading = true;
      axios.post('/api/report/acc/get_details', { node: node, type: type }).then((response) => {
        this.items = response.data;
        this.loading = false;
      });
    }
  },
  mounted() {
   
  }
}
</script>

<style scoped></style>