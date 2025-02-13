<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

export default defineComponent({
  name: "clock",
  data() {
    const self = this;
    return {
      dateNow: '...',
      ts: 0,
      clock: {
        h: 0,
        m: 0
      },
      interval: 0,
    }
  },
  mounted() {
    axios.post('/api/general/get/time', { format: 'l Y/n/j' }).then((response) => {
      this.dateNow = response.data.timeNow;
      this.ts = response.data.ts;
      this.startTimer();
    });
  },
  methods: {
    startTimer() {
      this.interval = setInterval(() => {
        var date = new Date(this.ts * 1000);
        // Hours part from the timestamp
        this.clock.h = date.getHours();
        // Minutes part from the timestamp
        this.clock.m = date.getMinutes();
        this.ts++;
      }, 1000);
    }
  }
})
</script>

<template>
  <div class="d-none d-sm-flex">
    <v-icon icon="mdi-clock" color="primary"></v-icon>
    {{ $t('drawer.today') }}
    <span class="text-primary">{{ dateNow }}</span>
    {{ $t('drawer.clock') }}
    <span class="text-primary">{{ clock.h + ':' + clock.m }}</span>
  </div>

</template>

<style scoped></style>