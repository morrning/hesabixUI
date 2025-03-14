<!-- src/components/widgets/TopCostCentersChart.vue -->
<template>
    <v-container fluid>
      <v-row dense justify="end">
        <v-col cols="auto">
          <v-select
            v-model="period"
            :items="periodOptions"
            label="بازه زمانی"
            density="compact"
            variant="outlined"
            @update:modelValue="fetchData"
          />
        </v-col>
        <v-col cols="auto">
          <v-select
            v-model="limit"
            :items="limitOptions"
            label="تعداد"
            density="compact"
            variant="outlined"
            @update:modelValue="fetchData"
          />
        </v-col>
      </v-row>
      <apexchart type="pie" :options="chartOptions" :series="series" />
    </v-container>
  </template>
  
  <script>
  import VueApexCharts from 'vue3-apexcharts';
  import axios from 'axios';
  
  export default {
    name: 'TopCostCentersChart',
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      return {
        period: 'today',
        limit: 10,
        series: [],
        chartOptions: {
          chart: {
            type: 'pie',
          },
          labels: [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          }],
        },
        periodOptions: [
          { title: 'امروز', value: 'today' },
          { title: 'این ماه', value: 'month' },
          { title: 'سال مالی', value: 'year' },
        ],
        limitOptions: [
          { title: '۵', value: 5 },
          { title: '۱۰', value: 10 },
          { title: '۲۰', value: 20 },
          { title: 'همه', value: 0 },
        ],
      };
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('/api/cost/top-centers', {
            params: { period: this.period, limit: this.limit },
          });
          this.series = response.data.series;
          this.chartOptions = { ...this.chartOptions, labels: response.data.labels };
        } catch (error) {
          console.error('Error fetching top cost centers:', error);
          this.series = [];
          this.chartOptions.labels = [];
        }
      },
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>