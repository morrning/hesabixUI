<template>
  <v-toolbar color="toolbar" :title="$t('title.user.dashboard')"></v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="2" class="text-center">
            <v-avatar image="\img\avatar.png" size="155"></v-avatar>
          </v-col>
          <v-col cols="12" sm="12" md="10">
            <v-text-field v-model="user_email" :label="$t('user.email')" prepend-inner-icon="mdi-email" :disabled="true"
              color="primary" variant="solo"></v-text-field>
            <v-text-field v-model="user_mobile" :label="$t('user.mobile')" prepend-inner-icon="mdi-cellphone"
              :disabled="true" color="primary" variant="solo"></v-text-field>
            <v-text-field v-model="user_fullname" :label="$t('user.name')" prepend-inner-icon="mdi-account"
              :disabled="loading" color="primary" variant="solo"></v-text-field>
            <v-btn color="primary" :loading="loading" prepend-icon="mdi-content-save"
              @click="this.updateProfile()">{{ $t('dialog.save') }}</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card color="successLight" prepend-icon="mdi-check-circle " :title="$t('dialog.result')"
        :text="$t('dialog.save_ok')">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :text="$t('dialog.ok')" variant="flat" @click="dialog = false;" />
        </template>
      </v-card>
    </v-dialog>
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
      loading: ref(true),
      dialog: ref(false),
      user_fullname: '',
      user_email: '',
      user_mobile: ''
    }
  },
  methods: {
    async updateProfile() {
      const result = await this.v$.$validate()
      if (!result) {
        // notify user form is invalid

      }
      else {
        this.loading = true;
        axios.post('/api/user/update/info', {
          fullname: this.user_fullname,
          mobile: this.mobile
        })
          .then((response) => {
            this.loading = false;
            this.dialog = true;
          })
      }

    }
  },
  mounted() {
    axios.post('/api/user/current/info')
      .then((res) => {
        this.user_email = res.data.email;
        this.user_fullname = res.data.fullname;
        this.user_mobile = res.data.mobile;
        this.loading = false;
      });
  },
  validations() {
    return {
      user_fullname: { required },
    }
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
}
</script>

<style scoped></style>