import * as UniswapV2PairABI from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { getProvider } from '@/app/libs/provider';
import { Contract, ethers } from 'ethers';
import { useUniswapV2FactoryContract } from './useFactoryContract';

export type VToken = {
  id: string,
  name: string,
  symbol: string,
  imgUri?: string
}

interface Params {
  tokenPair?: {token0?: VToken, token1?: VToken}
}

export function useUniswapV2PairContract({
  tokenPair,
}: Params): Contract | undefined | null {
  const factory = useUniswapV2FactoryContract();
  try {
    const pair = factory?.getPair(tokenPair?.token0?.id, tokenPair?.token1?.id);
    const uniswapV2PairContract = new ethers.Contract(
      pair,
      UniswapV2PairABI.abi,
      getProvider()
    );

    return uniswapV2PairContract;
  } catch (error) {
    console.log("[useUniswapV2PairContract] Pair could not be created!");
    return null;
  }
}
