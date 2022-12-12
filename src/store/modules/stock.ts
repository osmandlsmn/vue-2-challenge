import type { Module } from "vuex";
import type { Coin } from "@/types/index";
import { getCoins } from "@/api/binance";

interface StockState {
  stocks: Coin[];
  isLoading: boolean;
}

const Stock: Module<StockState, {}> = {
  state: () => ({
    isLoading: false,
    stocks: [],
  }),
  actions: {
    async refresh({ state, commit }) {
      state.isLoading = true;

      const { data } = await getCoins();
      const updatedStocks: any = state.stocks.map((stock) => {
        const coin = data.find((coin: Coin) => coin.symbol === stock.symbol);
        if (coin) return { ...coin, total: stock.total };
      });

      state.isLoading = false;
      state.stocks = updatedStocks;
    },
  },
  mutations: {
    addStock(state, coin) {
      const hasStock = state.stocks.find((stock) => coin.symbol === stock.symbol);
      if (hasStock) return;
      state.stocks.push({ ...coin, total: coin.total ?? 1 });
    },
    updateStock(state, coin) {
      const stockIndex = state.stocks.findIndex((item, index) => item.symbol === coin.symbol);
      state.stocks[stockIndex].total = coin.total;
    },
    removeStock(state, coin) {
      state.stocks = state.stocks.filter((stock) => stock.symbol !== coin.symbol);
    },
  },
  getters: {
    getStocks(state) {
      return state.stocks;
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
};

export default Stock;
