<script>
import { RouterView } from 'vue-router'
import axios from 'axios';

export default {
  data: () => {
    return {
      dialog: false,
      hesabix: {
        version: '',
        lastUpdateDate: '',
        lastUpdateDes: '',
      },
    }
  },
  methods: {
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
  <div v-if="dialog" class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card prepend-icon="mdi-map-marker"
        text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
        title="Use Google's location service?">
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false">
            Disagree
          </v-btn>

          <v-btn @click="dialog = false">
            Agree
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
  <RouterView />
</template>

<style scoped></style>
