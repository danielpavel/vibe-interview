import { Token } from "@/types/types";
import { useUniswapV2PairContract } from "./UniswapContracts/usePairContract";
import { Pair } from '@sushiswap/sdk'
import { CurrencyAmount } from "@uniswap/sdk-core";

interface LPPosParams {
  tokenPair?: { token0?: Token, token1?: Token}
}

export async function useLPPosition({ tokenPair }: LPPosParams) {
  const pairContract = useUniswapV2PairContract({ tokenPair: tokenPair });

  if (pairContract.contract && pairContract.token0 && pairContract.token1) {
    /*
    const reserves = await pairContract.contract.getReserves();

    const token0Addr = await pairContract.contract.token0();
    const token1Addr = await pairContract.contract.token1();
    const token0 = [pairContract.token0, pairContract.token1].find(
      (token) => token.address === token0Addr
    );
    const token1 = [pairContract.token0, pairContract.token1].find(
      (token) => token.address === token1Addr
    );

    const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserves.reserve0.toString()),
      CurrencyAmount.fromRawAmount(token1, reserves.reserve1.toString())
    );

    const totalSupply = await pairContract.contract.totalSupply()

    return {
      liquidityToken: pair.liquidityToken,
      totalSupply: totalSupply
    }
  } else {

    return {
      liquidityToken: undefined,
      totalSupply: undefined
    }
  }
  */
}