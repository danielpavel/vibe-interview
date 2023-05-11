import { ethers, providers } from 'ethers'
import { CurrentConfig } from './uniswap-v2/config'

export function getProvider(): providers.Provider {
  return new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.mainnet)
}