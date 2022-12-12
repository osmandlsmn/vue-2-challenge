<template>
  <div class="flex justify-between items-center w-full rounded-lg border-gray-400 p-2 border-2">
    <div class="">
      <h3 class="font-bold">{{ stock.symbol }}</h3>
      <p class="font-semibold">{{ stock.lastPrice }} - {{ stock.weightedAvgPrice }}</p>
    </div>
    <div class="flex justify-evenly h-10 items-center space-x-4">
      <input
        class="w-14 h-8 bg-transparent border-secondary rounded border-2 text-black font-semibold text-sm px-1 focus:outline-none"
        type="number"
        placeholder="1"
        v-model.number="stock.total"
      />
      <div class="space-x-2">
        <Button primary @onClick="() => updateStock(stock)">update</Button>
        <Button danger @onClick="() => removeStock(stock)">remove</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import Button from "@/components/UI/Button/index.vue";

export default defineComponent({
  name: "StockItemVue",
  components: {
    Button,
  },
  methods: {
    ...mapMutations(["removeStock", "updateStock"]),
  },
  props: {
    stock: {
      type: Object,
      required: true,
    },
  },
});
</script>
