<template>
  <div class="w-full flex items-center justify-center">
    <Pie class="max-w-[450px] max-h-[450px]" :data="getStatistics" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default defineComponent({
  name: "PieCharts",
  components: {
    Pie,
  },
  data() {
    return {
      loaded: false,
      chartData: {},
    };
  },
  computed: {
    ...mapGetters({
      stocks: "getStocks",
    }),
    getStatistics() {
      this.loaded = false;

      this.chartData = {
        labels: [],
        datasets: [{ backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"], data: [] }],
      };

      this.stocks.map((stock) => {
        this.chartData?.labels.push(stock.symbol);
        this.chartData.datasets[0].data.push(stock.total);
      });
      this.loaded = true;

      return this.chartData;
    },
  },
});
</script>
