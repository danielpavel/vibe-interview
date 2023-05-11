export type Token = {
  id: string,
  name: string,
  symbol: string,
  imgUri?: string
}

export type SelectedTokenPair = {
   token0: Token | undefined,
   token1: Token | undefined,
   lastSelected: Token | undefined,
}