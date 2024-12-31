<template>
  <v-toolbar color="toolbar" :title="$t('title.user.online')"></v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text class="pa-0">
        <v-row>
          <v-col>
            <EasyDataTable table-class-name="customize-table" alternating :search-value="searchValue" :headers="headers"
              :items="items" theme-color="#1d90ff" header-text-direction="center" body-text-direction="center"
              rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از" :loading="loading">
            </EasyDataTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ref } from "vue";

export default {
  name: "dashboard",
  data() {
    return {
      loading: true,
      items:[],
      headers: [
        { text: "نام", value: "name", sortable: true },
        { text: "تلفن", value: "mobile", sortable: true },
        { text: "ایمیل", value: "email", sortable: true },
        { text: "آخرین فعالیت", value: "lastActive", sortable: true },
      ]
    }
  },
  methods: {
    loadData() {
      axios.post('/api/admin/onlineusers/list').then((response) => {
        this.items = response.data;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.loadData();
  },
}
</script>

<style scoped></style>