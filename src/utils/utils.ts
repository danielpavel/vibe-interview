import { LPPos, Token } from "@/types/types";
import { CurrencyAmount } from "@uniswap/sdk-core";
import { Pair } from "@uniswap/v2-sdk";

export const tokensEqual = (token1?: Token, token2?: Token) => {
  if (!token1 || !token2) return false;

  return (
    token1.id === token2.id &&
    token1.name === token2.name &&
    token1.symbol === token2.symbol
  );
}

export async function buildLpPosition(
  pairContract: any,
  wallet: string | null,
  setter: (pos?: LPPos | null) => void
) {
  if (pairContract.contract && pairContract.token0 && pairContract.token1) {
    const reserves = await pairContract.contract.getReserves()

    const token0Addr = await pairContract.contract.token0()
    const token1Addr = await pairContract.contract.token1()
    const token0 = [pairContract.token0, pairContract.token1].find(
      (token) => token.address === token0Addr
    )
    const token1 = [pairContract.token0, pairContract.token1].find(
      (token) => token.address === token1Addr
    )

    const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserves.reserve0.toString()),
      CurrencyAmount.fromRawAmount(token1, reserves.reserve1.toString())
    )

    const totalSupply = await pairContract.contract.totalSupply()
    let balance
    if (wallet) {
      balance = await pairContract.contract.balanceOf(wallet)
    } else {
      balance = 0
    }

    setter({
      pair: pair,
      totalSupply: totalSupply,
      balance: balance,
      token0Token: token0,
      token1Token: token1
    })
  } else {
    setter(null)
  }
}