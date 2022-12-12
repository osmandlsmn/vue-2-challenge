<template>
  <div class="w-full flex items-center justify-center">
    <Pie v-if="stocks.length !== 0" class="max-w-[400px] max-h-[400px]" :data="getChartData" />
    <Pie v-else class="max-w-[400px] max-h-[400px]" :data="placeholderData" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip);

export default defineComponent({
  name: "PieCharts",
  components: {
    Pie,
  },
  data() {
    return {
      placeholderData: {
        datasets: [
          {
            label: ["No data."],
            data: [100],
            backgroundColor: "#F2EEE8",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      stocks: "getStocks",
    }),
    getChartData() {
      this.chartData = {
        labels: [],
        datasets: [{ backgroundColor: ["#00FFAB", "#14C38E", "#B8F1B0", "#E3FCBF"], data: [] }],
      };

      this.stocks.map((stock) => {
        this.chartData?.labels.push(stock.symbol);
        this.chartData.datasets[0].data.push(stock.total);
      });

      return this.chartData;
    },
  },
});
</script>
