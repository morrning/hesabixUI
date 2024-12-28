<template>
  <v-toolbar color="toolbar" :title="$t('drawer.open_balance')">
    <template v-slot:prepend>
      <v-tooltip :text="$t('dialog.back')" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" @click="this.$router.back()" class="d-none d-sm-flex" variant="text"
            icon="mdi-arrow-right" />
        </template>
      </v-tooltip>
    </template>
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-row class="pa-1">
    <v-col>
      <v-card :title="$t('dialog.deg')" :subtitle="$t('dialog.deg_info')" color="success">
        <v-card-text class="px-0 pb-0">
          <v-list>
            <v-list-item @click="sheet.banks = !sheet.banks" value="banks" :title="$t('drawer.banks')">
              <template v-slot:append>
                sss
              </template>
            </v-list-item>
            <v-list-item @click="sheet.cashdesks = !sheet.cashdesks" value="cashdesks" :title="$t('drawer.cashdesks')">
              <template v-slot:append>
                sss
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      ddd
    </v-col>
  </v-row>
  <v-bottom-sheet inset v-model="sheet.banks">
    <v-card :title="$t('drawer.banks')">
      <v-card-text>
        
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
  <v-bottom-sheet inset v-model="sheet.cashdesks">
    <v-card :title="$t('drawer.cashdesks')"
      text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, eos? Nulla aspernatur odio rem, culpa voluptatibus eius debitis dolorem perspiciatis asperiores sed consectetur praesentium! Delectus et iure maxime eaque exercitationem!"></v-card>
  </v-bottom-sheet>
</template>

<script>
import axios from "axios";
import Loading from 'vue-loading-overlay';

export default {
  name: "table",
  components: {
    Loading
  },
  data: () => {
    return {
      loading: false,
      sheet: {
        banks: false,
        cashdesks: false,
      },
      data: {
        banks:[],
        cashdesks:[],
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.post('/api/openbalance/get').then((Response) => {
        this.data = Response.data.data;
      })
    }
  }

}
</script>

<style scoped></style>