import { Token } from "@/types/types";
import { useUniswapV2PairContract } from "./UniswapContracts/usePairContract";
import { useEffect } from "react";

interface LPPosParams {
  tokenPair?: { token0?: Token, token1?: Token}
}

export function useLPPosition({ tokenPair }: LPPosParams) {
  const pair = useUniswapV2PairContract({ tokenPair: tokenPair });

  const getLPPos = async () => {

    console.log('[useLPPosition] with LPToken', await pair?.liquidityToken.address);

    // return pair;
  }

  useEffect(() => {
    if (pair) {
      getLPPos()
    }
  }, [pair])

  return pair
}