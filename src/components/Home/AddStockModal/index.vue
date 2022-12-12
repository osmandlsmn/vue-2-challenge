<script lang="ts">
import type { Coin } from "@/types";
import { defineComponent } from "vue";
import { getCoins } from "@/api/binance";
import Input from "@/components/UI/Input/index.vue";
import Spinner from "@/components/Icons/Spinner.vue";
import Button from "@/components/UI/Button/index.vue";
import { useFuse } from "@vueuse/integrations/useFuse";

export default defineComponent<{}, any>({
  name: "AddStockModal",
  components: {
    Input,
    Spinner,
    Button,
  },
  data() {
    return {
      isLoading: true,
      search: "",
      coins: [] as Coin[],
    };
  },
  computed: {
    filteredResults() {
      const { results } = useFuse(this.search, this.coins, {
        fuseOptions: { keys: ["symbol"], minMatchCharLength: 3 },
      });
      const coinResults = this.search ? results.value.map(({ item }) => item) : this.coins;

      const stocks = this.$store.getters.getStocks;
      const stockResults = this.coins.map((coin: Coin) => {
        const stock = stocks.find((x: any) => x.symbol === coin.symbol);
        if (stock) {
          coin.stock = true;
          coin.total = stock.total;
        }
        return coin;
      });

      return coinResults;
    },
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      const { data } = await getCoins();
      this.isLoading = false;
      this.$data.coins = data;
    },
    addStock(coin: Coin, index: number) {
      this.$store.commit("addStock", coin);
    },
    removeStock(coin: Coin) {
      this.coins = this.coins.filter((item: Coin) => item.symbol !== coin.symbol);
      this.$store.commit("removeStock", coin);
    },
    updateStock(coin: Coin) {
      this.$store.commit("updateStock", coin);
    },
  },
});
</script>

<template>
  <modal @before-open="loadData" name="add-stock-modal" height="600" width="900">
    <div class="relative bg-white shadow h-full dark:bg-gray-700">
      <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add Stock</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="staticModal"
          @click="$modal.hide('add-stock-modal')"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div class="p-6 space-y-6">
        <Input placeholder="Search" v-model="search" />
        <template v-if="isLoading">
          <div><Spinner /></div>
        </template>
        <template v-else>
          <div class="flex flex-col overflow-x-auto no-scrollbar space-y-3 max-h-[500px]">
            <RecycleScroller class="scroller no-scrollbar" :items="filteredResults" :item-size="50" key-field="symbol" v-slot="{ item, index }">
              <div class="flex justify-between mb-5">
                <h3 class="text-white font-bold">{{ item.symbol }} {{ item.lastPrice }}</h3>
                <div>
                  <div></div>
                  <div class="space-x-2">
                    <template v-if="item.stock">
                      <input
                        class="w-12 bg-transparent border-secondary rounded border-2 text-white font-semibold text-sm px-1 focus:outline-none"
                        type="number"
                        v-model.number="item.total"
                        placeholder="1"
                      />
                      <Button secondary @onClick="() => updateStock(item)">Update</Button>
                      <Button danger @onClick="() => removeStock(item)">Remove</Button>
                    </template>
                    <template v-else>
                      <input
                        class="w-12 bg-transparent border-secondary rounded border-2 text-white font-semibold text-sm px-1 focus:outline-none"
                        type="number"
                        v-model.number="item.total"
                        placeholder="1"
                      />
                      <Button @onClick="() => addStock(item, index)" success>Add</Button>
                    </template>
                  </div>
                </div>
              </div>
            </RecycleScroller>
          </div>
        </template>
      </div>
    </div>
  </modal>
</template>
