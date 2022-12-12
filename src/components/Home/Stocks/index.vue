<template>
  <div class="space-y-4 w-full pr-5 border-r-2">
    <template v-if="isLoading"> <Spinner /></template>
    <template v-else>
      <StockItem v-for="(stock, index) in stocks" :key="index" :stock="stock" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import StockItem from "./StockItem.vue";
import Spinner from "@/components/Icons/Spinner.vue";

export default defineComponent({
  name: "Stocks",
  components: {
    StockItem,
    Spinner,
  },
  computed: {
    ...mapGetters({
      stocks: "getStocks",
      isLoading: "getLoading",
    }),
  },
});
</script>
