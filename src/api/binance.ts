import axios from "axios";
import type { Coin } from "@/types/index";

export const getCoins = () =>
  axios.get<Coin[]>("https://api2.binance.com/api/v3/ticker/24hr");
