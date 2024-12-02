<script lang="ts">
import Change_lang from "@/components/application/buttons/change_lang.vue";
import axios from "axios";

export default {
  name: 'single',
  components: { Change_lang },
  data() {
    return {
      system:{
        footer:''
      },
      icons: [
        'mdi-telegram',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }
  },
  created() {
    if (localStorage.getItem('isLogedIn') == true) {
      this.$router.push('/user/dashboard')
    }
  },
  mounted(){
    axios.post('/front/system/get/data').then((response) => {
      this.system = response.data;
    });
  }
}
</script>

<template>
  <v-app id="">
    <v-app-bar class="px-2" color="indigo-darken-2" flat>
      <v-avatar size="32" image="/img/favw.png"></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs centered color="">
        <v-tab prepend-icon="mdi-login" :text="$t('user.login')" to="/user/login"></v-tab>
        <v-tab prepend-icon="mdi-account-plus" :text="$t('user.register')" to="/user/register"></v-tab>
        <v-tab prepend-icon="mdi-lock" :text="$t('user.forget_password')" to="/user/forget-password"></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <RouterView />
    </v-main>
    
  </v-app>
</template>

<style scoped></style>