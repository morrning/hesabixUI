<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "system",
  data: () => {
    return {
      systemInfo: {
        keywords: '',
        description: '',
        scripts: '',
        zarinpal: '',
        appSite: '',
        footer: '',
        footerScripts: ''
      },
      loading: true,
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      axios.get('/api/admin/settings/system/info')
        .then((response) => {
          this.systemInfo = response.data;
          this.loading = false;
        })
    },
    submit() {
      this.loading = true;
      axios.post('/api/admin/settings/system/info/save', this.systemInfo).then((resp) => {
        this.loading = false;
        if (resp.data.result == 1) {
          Swal.fire({
            text: 'تنظیمات با موفقیت ذخیره شد.',
            icon: 'success',
            confirmButtonText: 'قبول',
          });
        }
      })

    }
  },
  beforeMount() {
    this.loadData();
  }
})
</script>

<template>
  <v-toolbar color="toolbar" :title="$t('pages.manager.system_settings_basic')">
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-container class="pa-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text class="">
        <v-row class="mb-2">
          <v-col cols="12" sm="12" md="12">
            <v-text-field class="" hide-details="auto" :label="$t('pages.manager.app_site')" v-model="systemInfo.appSite" type="text"
              prepend-inner-icon="mdi-card-text"
              :rules="[() => systemInfo.appSite.length > 0 || $t('validator.required')]"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field class="" hide-details="auto" :label="$t('pages.manager.keywords')" v-model="systemInfo.keywords" type="text"
              prepend-inner-icon="mdi-text"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field class="" hide-details="auto" :label="$t('pages.manager.site_des')" v-model="systemInfo.description" type="text"
              prepend-inner-icon="mdi-text"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field class="" hide-details="auto" :label="$t('pages.manager.zarinpal_api')" v-model="systemInfo.zarinpal" type="text"
              prepend-inner-icon="mdi-text"></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-textarea class="" hide-details="auto" :label="$t('pages.manager.scripts')" v-model="systemInfo.scripts" type="text"
              prepend-inner-icon="mdi-text"></v-textarea>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-textarea class="" hide-details="auto" :label="$t('pages.manager.footer_scripts')" v-model="systemInfo.footerScripts"
              type="text" prepend-inner-icon="mdi-text"></v-textarea>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-textarea class="" hide-details="auto" :label="$t('pages.manager.site_footer')" v-model="systemInfo.footer" type="text"
              prepend-inner-icon="mdi-text"></v-textarea>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-btn type="submit" @click="submit()" color="primary" prepend-icon="mdi-content-save"
              :loading="loading">
              {{ $t('dialog.save') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>