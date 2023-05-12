import * as UniswapV2PairABI from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { getProvider } from '@/libs/provider';
import { Contract, ethers } from 'ethers';
import { useUniswapV2FactoryContract } from './useFactoryContract';
import { Pair } from '@uniswap/v2-sdk';
import { Token, SupportedChainId } from '@uniswap/sdk-core';

export type VToken = {
  id: string,
  name: string,
  symbol: string,
  imgUri?: string
  decimals?: string
}

interface Params {
  tokenPair?: {token0?: Token, token1?: Token}
}

export function useUniswapV2PairContract({
  tokenPair,
}: Params): {contract: Contract | undefined | null, token0?: Token, token1?: Token} {
  // const factory = useUniswapV2FactoryContract();

  if (tokenPair && tokenPair.token0 && tokenPair.token1) {
    // console.log('[useUniswapV2PairContract]', tokenPair);
    const token0 = new Token(
      SupportedChainId.MAINNET,
      tokenPair.token0.address,
      tokenPair.token0.decimals,
      tokenPair.token0.symbol,
      tokenPair.token0.name,
    );
    const token1 = new Token(
      SupportedChainId.MAINNET,
      tokenPair.token1.address,
      tokenPair.token1.decimals,
      tokenPair.token1.symbol,
      tokenPair.token1.name,
    );
    const tokenPairAddress = Pair.getAddress(token0, token1);

    const uniswapV2PairContract = new ethers.Contract(
      tokenPairAddress,
      UniswapV2PairABI.abi,
      getProvider()
    );

    return {
      contract: uniswapV2PairContract,
      token0: token0,
      token1: token1
    }
  }

  return {
    contract: null,
    token0: undefined,
    token1: undefined
  }
}
