import { Token, CurrencyAmount } from "@uniswap/sdk-core";
import { Pair } from "@uniswap/v2-sdk";
import { Contract } from "ethers";

export type TokenResponse = {
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
  pairContract: Contract | undefined | null,
  totalSupply: any,
  balance: any,
  token0Token: Token, // this would be Token from @uniswap/sdk-core
  token1Token: Token, // this would be Token from @uniswap/sdk-core
  token0AmountCurrency: CurrencyAmount<Token> // this `any` should be converted to token
  token1AmountCurrency: CurrencyAmount<Token> // this `any` should be converted to token
  token0Amount: string // this `any` should be converted to token
  token1Amount: string // this `any` should be converted to token
}

export interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
  hideDuration?: number | null;
}