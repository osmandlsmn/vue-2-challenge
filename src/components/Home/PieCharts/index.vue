<template>
  <div class="w-full flex items-center justify-center">
    <Pie v-if="stocks.length >= 1" class="max-w-[450px] max-h-[450px]" :data="getChartData" />
    <Pie v-else class="max-w-[450px] max-h-[450px]" :data="placeholderData" />
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
      placeholderData: {
        datasets: [
          {
            label: ["No stock."],
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
        datasets: [{ backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"], data: [] }],
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
