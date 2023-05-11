import * as UniswapV2FactoryAbi from '@uniswap/v2-core/build/IUniswapV2Factory.json'
import { V2_FACTORY_ADDRESS } from '@/app/libs/constants';
import { getProvider } from '@/app/libs/provider';
import { Contract, ethers } from 'ethers';

export function useUniswapV2FactoryContract(): Contract | undefined | null {
  const uniswapV2FactoryContract = new ethers.Contract(
        V2_FACTORY_ADDRESS,
        UniswapV2FactoryAbi.abi,
        getProvider()
      );

  return uniswapV2FactoryContract;
}