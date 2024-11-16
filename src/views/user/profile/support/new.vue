<template>
  <v-toolbar color="toolbar" :title="$t('pages.support.new')">
  </v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-row>
      <v-col class="">
        <v-form fast-fail ref="form" @submit.prevent>
          <v-card class="pa-3" :loading="loading ? 'red' : null" :disabled="loading" flat>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-alert icon="mdi-information-slab-box-outline" :text="$t('pages.support.alert_top')"
                  type="info"></v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field class="" :label="$t('pages.support.title')" v-model="item.title" type="text"
                  prepend-inner-icon="mdi-format-title"
                  :rules="[() => item.title.length > 0 || $t('validator.required')]"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-select class="" :label="$t('pages.support.bid')" prepend-inner-icon="mdi-domain"
                  :items="bidItems" item-title="name" return-object v-model="item.bid"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-textarea class="" :label="$t('pages.support.body')" v-model="item.body" type="text"
                  prepend-inner-icon="mdi-text"
                  :rules="[() => item.body.length > 0 || $t('validator.required')]"></v-textarea>
              </v-col>
            </v-row>
            <v-btn @click="submit()" type="submit" color="primary" class="mt-3" prepend-icon="mdi-content-save" :loading="loading">
              {{ $t('dialog.save') }}
            </v-btn>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "new",
  data() {
    return {
      item: {
        title: '',
        body: '',
        bid: '',
      },
      bidItems: [],
      loading: true,
    }
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.post('/api/business/list').then((response) => {
        this.bidItems = response.data;
        this.loading = false;
        if (response.data.length == 0) {
          Swal.fire({
            text: 'برای درخواست پشتیبانی می بایست حداقل یک کسب و کار داشته باشید.',
            showCancelButton: true,
            confirmButtonText: 'ایجاد کسب و کار جدید',
            cancelButtonText: `بازگشت`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.$router.push('/profile/new-business');
            }
            else {
              this.$router.push('/profile/dashboard');
            }
          })
        }
        else {
          this.item.bid = response.data[0];
        }

      })
    },
    async submit() {
      const { valid } = await this.$refs.form.validate()
      if(valid){
        this.loading = true;
        axios.post('/api/support/mod', this.item).then((response) => {
          Swal.fire({
            text: this.$t('pages.support.saved'),
          confirmButtonText: this.$t('dialog.ok'),
          icon:'success'
          }).then((result) => {
            this.loading = false;
            this.$router.push('/profile/support-list')
          })
        })
      }
    }
  }
}
</script>

<style scoped></style>