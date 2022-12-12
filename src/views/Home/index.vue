<script lang="ts">
import Stocks from "@/components/Home/Stocks/index.vue";
import PieCharts from "@/components/Home/PieCharts/index.vue";
import AddStockModal from "@/components/Home/AddStockModal/index.vue";
import Actions from "@/components/Home/Actions/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    Stocks,
    PieCharts,
    AddStockModal,
    Actions,
  },
});
</script>

<template>
  <div class="py-10 px-10">
    <AddStockModal />
    <Actions />
    <hr class="mt-3 mb-3" />
    <div class="flex justify-between">
      <Stocks class="grow-2" />
      <PieCharts />
    </div>
  </div>
</template>
