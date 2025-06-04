import { useMemo } from "react";
import AuctionAPI from "../service/AuctionAPI";
/**
 * useAuctionAPI is a custom hook that creates an instance of AuctionAPI with a specified base URL.
 * It uses useMemo to ensure that the AuctionAPI instance is only created once per base URL,
 */
const useAuctionAPI = (baseURL) => {
  return useMemo(() => new AuctionAPI(baseURL), [baseURL]);
};
export default useAuctionAPI;
