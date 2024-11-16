<script>
import { RouterView } from 'vue-router'
import axios from 'axios';
import { ref } from 'vue';

export default {
  data: () => {
    return {
      dialog: false,
      theme: ref('light'),
      hesabix: {
        version: '',
        lastUpdateDate: '',
        lastUpdateDes: '',
      },
    }
  },
  methods: {
    update() {
      this.dialog = false;
      localStorage.setItem('hesabixVersion', this.hesabix.version);
      window.location.reload();
    },
    gethesabix() {
      axios.get('/api/general/stat').then((response) => {
        this.hesabix = response.data;
        let currentVersion = window.localStorage.getItem('hesabixVersion');

        if (currentVersion == undefined) {
          window.localStorage.setItem('hesabixVersion', this.hesabix.version);
        }
        else if (currentVersion != this.hesabix.version) {
          //set version Number
          this.dialog = true;
        }

      });
    }
  },
  mounted() {
    this.gethesabix();
  }
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <div v-if="dialog" class="text-center pa-4">
        <v-dialog v-model="dialog" max-width="600" persistent>
          <v-card prepend-icon="mdi-update" :title="$t('dialog.update')" :subtitle="hesabix.lastUpdateDate">
            <template v-slot:actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :text="$t('dialog.update')" variant="flat" @click="update()" />
            </template>
            <template v-slot="text">
              <div class="text-primary pa-5" v-html="hesabix.lastUpdateDes"></div>
            </template>
          </v-card>
        </v-dialog>
      </div>
      <RouterView />
    </v-app>
  </v-responsive>

</template>

<style>
.customize-table {
  --easy-table-header-font-color: #e1e1e1;
  --easy-table-header-background-color: #055bbb;
}
</style>
