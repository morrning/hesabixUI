<!-- src/components/widgets/TopCostCentersChart.vue -->
<template>
    <v-container fluid class="pt-0">
      <v-row justify="end">
        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="period"
            :items="periodOptions"
            label="بازه زمانی"
            density="compact"
            variant="outlined"
            @update:modelValue="fetchData"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
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
            id: 'top-commodities-pie',
            fontFamily: "'Vazirmatn FD', Arial, sans-serif",
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