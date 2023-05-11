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
  pair?: SelectedTokenPair | null,
  totalSupply: any,
  liquidityToken: any,
  balance: any,
  token0Supply?: any,
  token1Supply?: any,
}