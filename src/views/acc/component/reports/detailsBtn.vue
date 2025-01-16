<template>
  <div class="text-center pa-4">
    <v-btn @click="dialog = true" color="primary" size="xs" variant="plain" icon="mdi-magnify"></v-btn>
    <v-dialog v-model="dialog" width="auto">
      <v-card :loading="loading">
        {{ $props.node }}
        <v-toolbar :title="$t('dialog.details')"></v-toolbar>
        <v-card-text class="p-0 m-0">
          <EasyDataTable table-class-name="customize-table" :table-class-name="tableClassName"
            v-model:items-selected="itemsSelected" multi-sort show-index alternating :search-value="searchValue"
            :headers="headers" :items="items" theme-color="#1d90ff" header-text-direction="center"
            body-text-direction="center" rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
            rowsOfPageSeparatorMessage="از" :loading="loading">
            <template #item-bs="{}">

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
    type: String,
  },
  data: () => {
    return {
      loading: true,
      dialog: false,
      items: [],
      itemsSelected: [],
      headers: [
        { text: "تاریخ", value: "operation" },
        { text: "شماره", value: "code" },
        { text: "شرح", value: "des" },
        { text: "بدهکار", value: "bd" },
        { text: "بستانکار", value: "bs" },
        { text: "تراز", value: "balance" },
        { text: "وضعیت", value: "status" },
        { text: "تعداد", value: "count" },
      ]
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      axios.post('/api/report/acc/get_details', { node: $this.props.node, type: $this.props.type, }).then((response) => {
        this.items = response.data.data;
        this.loading = false;
      });
    }
  },
  mounted() {

  }
}
</script>

<style scoped></style>