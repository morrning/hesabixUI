<template>
  <v-system-bar color="primaryLight2">
    <v-avatar image="/img/logo-blue.png" size="20" class="me-2" />
    <span>{{ $t('hesabix.banner') }}</span>
    <v-spacer />
  </v-system-bar>
  <v-navigation-drawer v-model="drawer" color="primaryLight">
    <v-card height="64" color="primary" rounded="0" prepend-icon="mdi-account">
      <template v-slot:title>
        {{ $t('app.name') }}
      </template>
      <template v-slot:prepend>
        <v-avatar image="/img/favw.png" />
      </template>
    </v-card>
    <v-list class="px-0 pt-0">
      <v-list-item v-for="(item, i) in items" v-show="item.visible" :to="item.url" :key="i" :value="item"
        color="primary">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar scroll-behavior="inverted elevate" scroll-threshold="0" color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-app-bar-title>
      {{ $t('app.name') }}
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-tooltip :text="$t('dialog.exit')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" color="primary" icon="mdi-logout-variant" variant="flat" @click="logout" class="me-2" />
      </template>
    </v-tooltip>
  </v-app-bar>

  <v-main>
    <RouterView />
  </v-main>
</template>

<script lang="ts">
import axios from "axios";
import { getSiteName, getApiUrl } from "@/hesabixConfig"
import { applicationStore } from "@/stores/applicationStore";
import { useUserStore } from "@/stores/userStore";
import { ref, defineComponent } from "vue";
import { mapActions, mapState, mapStores } from "pinia";
import Change_lang from "/src/components/application/buttons/change_lang.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names,vue/no-reserved-component-names
  name: "profile-main",
  data: (vm) => {
    const self = this;
    return {
      siteName: '',
      siteUrl: '',
      ROLE_ADMIN: false,
      user: {
        mobile: '1'
      },
      business_count: 0,
      drawer: ref(true),
      items: [
        { text: 'داشبورد', url: '/profile/dashboard', icon: 'mdi-format-list-text', visible: true },
        { text: 'کسب‌و‌کار جدید', url: '/profile/new-business', icon: 'mdi-store-plus', visible: true },
        { text: 'کسب‌و‌کارها', url: '/profile/business', icon: 'mdi-format-list-text', visible: true },
        { text: 'پشتیبانی', url: '/profile/support-list', icon: 'mdi-forum', visible: true },
        { text: 'اعلانات', url: '/user/notifications', icon: 'mdi-email-newsletter', visible: false },
        { text: 'تغییر کلمه عبور', url: '/profile/change-password', icon: 'mdi-lock-reset', visible: true },
        { text: 'مدیریت', url: '/manager/dashboard', icon: 'mdi-shield-crown', visible: false },
      ],
    }
  },
  computed: {
    applicationStore() {
      return applicationStore
    },
    ...mapStores(useUserStore),
    // gives read access to this.userData and this.synced
    ...mapState(useUserStore, ['userData', 'synced']),
  },
  components: { Change_lang },
  created() {
    this.siteName = getSiteName();
    this.siteUrl = getApiUrl();
  },
  methods: {
    ...mapActions(useUserStore, ['refresh']),

    logout() {
      axios.post('/api/user/logout')
        .then((response) => {
          localStorage.removeItem('X-AUTH-TOKEN');
          document.location.reload();
          delete axios.defaults.headers.common['X-AUTH-TOKEN'];
          window.location.href = this.$filters.getApiUrl() + '/logout/by/token/user/login';
        });
    },
  },
  mounted() {
    axios.post('/api/user/has/role/' + 'ROLE_ADMIN').then((response) => {
      this.ROLE_ADMIN = response.data.Success;
    });
  },
  async beforeMount() {
    await axios.post('/api/user/check/login')
      .then((response) => {
        if (response.data.Success == false) {
          this.$router.push('/user/login');
        }
        else {
          axios.post('/api/user/current/info')
            .then((res) => { this.user = res.data; });
          axios.post('/api/business/list/count')
            .then((response) => {
              this.business_count = response.data.count;
            });
        }

      }).catch(() => {
        this.$router.push('/user/login');
      });
  },
});
</script>

<style scoped></style>