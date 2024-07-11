<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <i class="fa fa-history"></i>
        تاریخچه رویدادها
      </h3>

    </div>
    <div class="block-content pt-0">
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <div class="my-1">
            <div class="input-group input-group-sm">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
              <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
            </div>
          </div>
          <EasyDataTable table-class-name="customize-table" :headers="headers" :items="items" alternating
            :search-value="searchValue" theme-color="#1d90ff" header-text-direction="center"
            body-text-direction="center" rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
            rowsOfPageSeparatorMessage="از" :loading="loading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { ref } from "vue";

export default {
  name: "logs",
  data: () => {
    return {
      searchValue: '',
      loading: ref(true),
      items: [],
      headers: [
        { text: "کسب و کار", value: "bid" },
        { text: "تاریخ", value: "date" },
        { text: "کاربر", value: "user" },
        { text: "توضیحات", value: "des" },
        { text: "بخش", value: "part" },
        { text: "آی پی آدرس", value: "ipaddress" },
      ]
    }
  },
  methods: {
    loadData() {
      axios.get('/api/admin/logs/last')
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
<style scoped></style>