import type { Module } from "vuex";
import type { Coin } from "@/types/index";

interface StockState {
  stocks: Coin[];
}

const Stock: Module<StockState, {}> = {
  state: () => ({
    stocks: [],
  }),
  actions: {},
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
  },
};

export default Stock;
