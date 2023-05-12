import { Pair } from "@uniswap/v2-sdk";

export type Token = {
  id: string,
  name: string,
  symbol: string,
  imgUri?: string
  decimals?: string,
}

export interface Pool {
    id: string;
    volumeUSD: string;
    totalValueLockedUSD: string;
    token0: Token;
    token1: Token;
}

export type SelectedTokenPair = {
   token0: Token | undefined,
   token1: Token | undefined,
   lastSelected: Token | undefined,
}

export type LPPos = {
  pair?: Pair | null,
  totalSupply: any,
  balance: any,
  token0Token: any, // this would be Token from @uniswap/sdk-core
  token1Token: any, // this would be Token from @uniswap/sdk-core
}