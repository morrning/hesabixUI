<template>
  <v-toolbar color="toolbar" :title="$t('pages.support.view_ticket')">
    <v-spacer></v-spacer>
    <v-tooltip :text="$t('pages.support.titlebar_admin')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-forum" color="primary" to="/profile/manager/support-list"></v-btn>
      </template>
    </v-tooltip>
  </v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-row>
      <v-col class="">
        <v-form fast-fail ref="form" @submit.prevent>
          <v-card class="pa-3" :loading="loading ? 'red' : null" :disabled="loading" flat>
            <v-row>
              <v-col cols="12" md="12">
                <v-card color="primary" class="mx-auto" prepend-icon="mdi-account"
                  :subtitle="item.dateSubmit + ' ' + item.state" :title="item.title">
                  <v-card-text>
                    {{ item.body }}
                  </v-card-text>
                  <v-card-actions>
                    {{ $t('pages.support.ticket_id') }}
                    {{ item.id }}
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-timeline side="end" class="align-end">
              <v-timeline-item v-for="item in replays" :key="item.id" :dot-color="item.owner ? 'primary' : 'warning'"
                size="small">
                <v-alert color="" icon="mdi-account" :value="true">
                  <span class="text-primary">{{ item.submitter.name }} :</span>
                  {{ item.body }}
                  <br>
                  <v-chip color="primary" prepend-icon="mdi-clock-outline" variant="tonal">
                    {{ item.dateSubmit }}
                  </v-chip>
                </v-alert>
              </v-timeline-item>
            </v-timeline>
            <v-row>
              <v-col class="">
                <v-card class="pa-3" :loading="loading ? 'red' : null" :disabled="loading" flat>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea auto-grow class="" :label="$t('pages.support.replay')" v-model="replay" type="text"
                        prepend-inner-icon="mdi-text"
                        :rules="[() => replay.length > 0 || $t('validator.required')]"></v-textarea>
                    </v-col>
                  </v-row>
                  <v-btn @click="submit()" type="submit" color="primary" class="mt-3" prepend-icon="mdi-content-save"
                    :loading="loading">
                    {{ $t('dialog.save') }}
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
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
  name: "show",
  data() {
    return {
      item: '',
      replays: [],
      replay: '',
      loading: false,
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      axios.post('/api/admin/support/view/' + this.$route.params.id).then((response) => {
        this.loading = false;
        this.item = response.data.data.item;
        this.replays = response.data.data.replays;
      })
    },
    async submit() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.loading = true;
        axios.post('/api/admin/support/mod/' + this.item.id, {
          'body': this.replay
        }).then((response) => {
          this.loading = false;
          if (response.data.error == 0) {
            Swal.fire({
              text: 'پاسخ ثبت شد . پیامک اطلاع رسانی ارسال شد..',
              icon: 'success',
              confirmButtonText: 'قبول',
            }).then((res) => {
              this.loadData();
              this.replay = '';
            })
          }
        })
      }
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>

<style scoped></style>