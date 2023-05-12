import { LPPos } from "@/types/types";
import { CurrencyAmount } from "@uniswap/sdk-core";
import { Pair } from "@uniswap/v2-sdk";
import { Token } from "@uniswap/sdk-core";

export const tokensEqual = (token1?: Token, token2?: Token) => {
  if (!token1 || !token2) return false;

  return (
    token1.address === token2.address &&
    token1.name === token2.name &&
    token1.symbol === token2.symbol
  );
}

export async function buildLpPosition(
  pairContract: any,
  wallet: string | null,
  _setter: (pos?: LPPos | null) => void
) {
  if (pairContract.contract && pairContract.token0 && pairContract.token1) {
    // console.log('[buildLpPosition] building position ...');

    const reserves = await pairContract.contract.getReserves()

    const token0Addr = await pairContract.contract.token0()
    const token1Addr = await pairContract.contract.token1()
    const token0 = [pairContract.token0, pairContract.token1].find(
      (token) => token.address === token0Addr
    )
    const token1 = [pairContract.token0, pairContract.token1].find(
      (token) => token.address === token1Addr
    )

    // console.log('[buildLpPosition] token0Addr: ', token0Addr);
    // console.log('[buildLpPosition] token1Addr: ', token1Addr);

    const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserves.reserve0.toString()),
      CurrencyAmount.fromRawAmount(token1, reserves.reserve1.toString())
    )
    // console.log('[buildLpPosition] pair Instance: ', pair);

    const totalSupply = await pairContract.contract.totalSupply()
    let balance
    if (wallet) {
      balance = await pairContract.contract.balanceOf(wallet)
    } else {
      balance = 0
    }
    // console.log('[buildLpPosition] totalSupply: ', totalSupply);

    const token0Amount = pair.getLiquidityValue(
      token0,
      CurrencyAmount.fromRawAmount(pair.liquidityToken, totalSupply),
      CurrencyAmount.fromRawAmount(pair.liquidityToken, balance),
    )

    const token1Amount = pair.getLiquidityValue(
      token1,
      CurrencyAmount.fromRawAmount(pair.liquidityToken, totalSupply),
      CurrencyAmount.fromRawAmount(pair.liquidityToken, balance),
    )
    // console.log('[buildLpPosition] userTokenABalance: ', token0Amount.toExact());
    // console.log('[buildLpPosition] userTokenBBalance: ', token1Amount.toExact());

    const result = {
      pair: pair,
      pairContract: pairContract,
      totalSupply: totalSupply,
      balance: balance,
      token0Token: token0,
      token1Token: token1,
      token0Amount: token0Amount,
      token1Amount: token1Amount
    }
    // console.log('[buildLpPosition] position built with', result);

    // setter({
    //   pair: pair,
    //   pairContract: pairContract,
    //   totalSupply: totalSupply,
    //   balance: balance,
    //   token0Token: token0,
    //   token1Token: token1,
    //   token0Amount: token0Amount,
    //   token1Amount: token1Amount
    // })
    //
    return result
  } else {
    console.log('[buildLpPosition][params missing]', pairContract);
    return null
  }
}