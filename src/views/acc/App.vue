<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
import Swal from "sweetalert2";

import { getApiUrl, getSiteName } from "@/hesabixConfig"
import { ref } from 'vue';
import Profile_btn from '@/components/application/buttons/profile_btn.vue';
import Notifications_btn from '@/components/application/buttons/notifications_btn.vue';
import Year_cob from '@/components/application/combobox/year_cob.vue';
import Currency_cob from '@/components/application/combobox/currency_cob.vue';
export default {

  data() {
    return {
      drawer: ref(null),
      plugins: [],
      business: {
        id:'',
        name: ''
      },
      timeNow: '',
      apiUrl: '',
    }
  },
  watch: {

  },
  mounted() {
    //get active plugins
    axios.post('/api/plugin/get/actives',).then((response) => {
      this.plugins = response.data;
    });
    axios.post('/api/business/list/count')
      .then((response) => {
        this.business_count = response.data.count;
      });
    axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
      this.business = response.data;
    });
    axios.post('/api/general/get/time').then((response) => {
      this.timeNow = response.data.timeNow;
    });
    this.apiUrl = getApiUrl();
  },
  created() {
    this.siteName = getSiteName();
  },
  methods: {
    deleteBusiness() {
      Swal.fire({
        text: 'آیا برای حذف این کسب‌و‌کار مطمئن هستید؟ بعد از تایید این عملیات کسب و کار شما به مدت یک ماه در پایگاه داده آرشیو و بعد از آن به صورت دائم حذف خواهد شد',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon: 'warning'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/business/delete').then((response) => {
            if (response.data.code == 0) {
              Swal.fire({
                text: 'کسب و کار با موفقیت حذف شد. به پروفایل کاربری باز می گردید.',
                icon: 'success',
                confirmButtonText: 'قبول'
              }).then((res) => {
                document.location = '/';
              });
            }
          })
        }
      })
    },
    exitBusiness() {
      Swal.fire({
        text: 'آیا برای خروج و ترک کسب‌و‌کار مطمئن هستید؟ ترک کسب و کار موجب قطع دسترسی شما خواهد شد و تنها از طریق مالک کسب‌و‌کار قابل بازیابی است.',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon: 'warning'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/business/removeuser/me').then((response) => {
            if (response.data.result == 1) {
              Swal.fire({
                text: 'عملیات با موفقیت انجام شد. به صفحه پروفایل کاربری باز می گردید.',
                icon: 'success',
                confirmButtonText: 'قبول'
              }).then((res) => {
                document.location = '/';
              });
            }
          })
        }
      })

    },
    logout() {
      axios.post('/api/user/logout')
        .then((response) => {
          localStorage.removeItem('X-AUTH-TOKEN');
          window.location.href = "/";
          delete axios.defaults.headers.common['X-AUTH-TOKEN'];
        });
    },
    isPluginActive(plugName) {
      return this.plugins[plugName] !== undefined;
    },
  },
  components: {
    Profile_btn: Profile_btn,
    Notifications_btn: Notifications_btn,
    Year_cob: Year_cob,
    Currency_cob: Currency_cob
  }
}
</script>

<template>
  <v-system-bar color="primaryLight2">
    <v-avatar image="/img/logo-blue.png" size="20" class="me-2 d-none d-sm-flex" />
    <span class="d-none d-sm-flex">{{ $t('hesabix.banner') }}</span>
    <v-avatar :image="apiUrl + '/front/avatar/file/get/' + business.id" size="20" class="me-2 d-flex d-sm-none" />
    <span class="d-flex d-sm-none">{{ business.name }}</span>
    <v-spacer />
  </v-system-bar>
  <v-navigation-drawer v-model="drawer" color="primaryLight">
    <v-card height="64" color="primary" rounded="0" prepend-icon="mdi-account">
      <template v-slot:title>
        {{ $t('app.name') }}
      </template>
      <template v-slot:prepend>
        <v-avatar class="d-none d-sm-flex" :image="apiUrl + '/front/avatar/file/get/' + business.id" />
        <v-avatar class="d-flex d-sm-none" image="/img/favw.png" />

      </template>
    </v-card>
    <v-list class="px-0 pt-0">
      <v-list-item to="/acc/dashboard" color="primary">
        <template v-slot:prepend>
          <v-icon icon="mdi-view-dashboard"></v-icon>
        </template>
        <v-list-item-title v-text="$t('drawer.dashboard')" />
      </v-list-item>
      <v-list-item to="/acc/persons/list" color="primary">
        <template v-slot:prepend>
          <v-icon icon="mdi-account-multiple"></v-icon>
        </template>
        <v-list-item-title v-text="$t('drawer.persons')" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar scroll-behavior="inverted elevate" scroll-threshold="0" color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <span class="d-none d-sm-flex">{{ business.name }}</span>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-bottom-sheet inset>
      <template v-slot:activator="{ props }">
        <v-btn stacked v-bind="props">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-card :subtitle="$t('dialog.fiscal_settings_info')" prepend-icon="mdi-cog"
        :title="$t('dialog.fiscal_settings')">
        <v-card-text>
          <v-row class="text-center">
            <v-col cols="12" sm="12" md="6">
              <Year_cob />
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <Currency_cob />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    <Notifications_btn />
    <Profile_btn />
  </v-app-bar>
  <v-main class="bg-surface-light">
    <div class="position-relative py-1 px-1">
      <RouterView />
    </div>
  </v-main>

</template>

<style global></style>
