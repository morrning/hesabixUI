<template>

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
      isLoading: false,
      YearInfo: {
        banks: {
          bs: 0,
          bd: 0
        },
        cashdesks: {
          bs: 0,
          bd: 0
        },
        salarys: {
          bs: 0,
          bd: 0
        },
        persons: {
          bs: 0,
          bd: 0
        },
        year: {
          label: ''
        }
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.post('/api/year/lastyear/info').then((Response) => {
        this.YearInfo = Response.data;
      })
    }
  }

}
</script>

<style scoped></style>