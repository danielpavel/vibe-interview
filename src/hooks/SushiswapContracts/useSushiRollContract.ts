import * as SushiRollABI from '@sushiswap/core/artifacts/contracts/SushiRoll.sol/SushiRoll.json'
import { SUSHI_ROLL } from '@/app/libs/constants';
import { getProvider } from '@/app/libs/provider';
import { Contract, ethers } from 'ethers';
import { Token } from '@/types/types';


export function useSushiRollContract(): Contract | undefined | null {
  return new ethers.Contract(
    SUSHI_ROLL,
    SushiRollABI.abi,
    getProvider()
  )
}