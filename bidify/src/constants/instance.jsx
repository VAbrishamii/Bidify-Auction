import { useMemo } from "react";
import AuctionAPI from "../service/AuctionAPI";

const useAuctionAPI = (baseURL) => {
  return useMemo(() => new AuctionAPI(baseURL), [baseURL]);
};
export default useAuctionAPI;