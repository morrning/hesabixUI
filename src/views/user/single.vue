<script lang="ts">
import Change_lang from "@/components/application/buttons/change_lang.vue";

export default {
  name: 'single',
  components: { Change_lang },
  data() {
    return {

    }
  },
  created() {
    if (localStorage.getItem('isLogedIn') == true) {
      this.$router.push('/user/dashboard')
    }
  },
}
</script>

<template>
  <v-app id="">
    <v-app-bar class="px-2" color="primary" flat>
      <v-avatar size="32" image="/img/favw.png"></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs centered color="white">
        <v-tab prepend-icon="mdi-login" :text="$t('user.login')" to="/user/login"></v-tab>
        <v-tab prepend-icon="mdi-account-plus" :text="$t('user.register')" to="/user/register"></v-tab>
        <v-tab prepend-icon="mdi-lock" :text="$t('user.forget_password')" to="/user/forget-password"></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <change_lang />
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>