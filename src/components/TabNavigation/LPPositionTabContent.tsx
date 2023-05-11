'use client'
import {FC, useEffect, useState} from 'react'
import Image from 'next/image'
import {useLiquidityPools} from '@/hooks/useTokenPools'
import {useRecoilState} from 'recoil'
import {tokenPair} from '@/recoil'
import {useLiqudityPositions} from '@/hooks/useLiquidityPositions'
import {LPositionCell} from '../Cells'

import {ethers} from 'ethers'
import {Token, ChainId, Pair, Route, CurrencyAmount} from '@sushiswap/sdk'
import * as uniswapV2PairABI from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { getProvider } from '@/app/libs/provider'
import {useUniswapV2PairContract} from '@/hooks/UniswapContracts/usePairContract'
import {Pool, SelectedTokenPair} from '@/types/types'

interface Props {
  liquidityPools: Pool[]
}

const LPPositionTabContent: FC<Props> = ({liquidityPools}) => {
  const [selectedTokenPair, setSelectedTokenPair] =
    useState<SelectedTokenPair>()
  const positions = useLiqudityPositions({
    first: 10,
    tokenPair: {
      token0: selectedTokenPair?.token0,
      token1: selectedTokenPair?.token1,
    },
  })
  // const pos = useLPPosition({ tokenPair: { token0: selectedTokenPair?.token0, token1: selectedTokenPair?.token1}})
  const pair = useUniswapV2PairContract({
    tokenPair: {
      token0: selectedTokenPair?.token0,
      token1: selectedTokenPair?.token1,
    },
  })

  useEffect(() => {
    console.log('[useEffectLPPositionTabContent]')
    const getPairData = async () => {
      if (pair) {
        // const LPToken = await pair.liquidityToken();

        const token0 = await pair.token0()
        const token1 = await pair.token1()

        console.log('[useEffectLPPositionTabContent] token0', token0)
        console.log('[useEffectLPPositionTabContent] token1', token1)
        console.log(
          '[useEffectLPPositionTabContent] totalSupply',
          await pair.totalSupply()
        )
      } else {
        console.log('[useEffectLPPositionTabContent] Pair not found')
      }
    }

    getPairData()
  }, [pair])

  useEffect(() => {
    const WETH_TOKEN = new Token(
      ChainId.MAINNET,
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      18,
      'WETH',
      'Wrapped Ether'
    )
    const USDC_TOKEN = new Token(
      ChainId.MAINNET,
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      6,
      'USDC',
      'USD//C'
    )
    const tokenPairAddress = Pair.getAddress(WETH_TOKEN, USDC_TOKEN)

    const fetchUniswap = async () => {
      const uniV2PairContract = new ethers.Contract(
        tokenPairAddress,
        uniswapV2PairABI.abi,
        getProvider()
      )
      const reserves = await uniV2PairContract.getReserves()

      const token0Addr = await uniV2PairContract.token0()
      const token1Addr = await uniV2PairContract.token1()
      const token0 = [WETH_TOKEN, USDC_TOKEN].find(
        (token) => token.address === token0Addr
      )
      const token1 = [WETH_TOKEN, USDC_TOKEN].find(
        (token) => token.address === token1Addr
      )

      const pair = new Pair(
        CurrencyAmount.fromRawAmount(token0, reserves.reserve0.toString()),
        CurrencyAmount.fromRawAmount(token1, reserves.reserve1.toString())
      )

      const route = new Route([pair], WETH_TOKEN, USDC_TOKEN)

      console.log(
        `[fetchUniswap] 1 WETH can be swapped for ${route.midPrice.toSignificant(
          6
        )} USDC coins`
      )
    }

    // fetchUniswap();
  }, [])

  return (
    <div className="flex py-20 px-5 w-full bg-cyan-100 justify-center">
      <div className="w-3/4 px-14 py-5">
        <div className="font-mono text-lg">Your token pair selection:</div>

        <div className="font-mono text-sm mt-2 mb-4">
          {selectedTokenPair?.token0?.symbol}/
          {selectedTokenPair?.token1?.symbol}
        </div>

        <button
          className="p-1 px-2 bg-slate-800 shadow-lg text-white font-mono border-2 border-slate-300 rounded-xl mb-10"
          onClick={() => setSelectedTokenPair(undefined)}
        >
          Clear selection
        </button>

        <div className="flex justify-between items-center mb-3">
          <div className="font-mono text-lg">Available LP Tokens</div>
          <div className="flex items-center gap-x-1">
            <div className="font-mono text-xs">Powered by</div>
            <Image
              src="/uniswap-logo.svg"
              alt="Uniswap Logo"
              className="dark:invert"
              width={30}
              height={30}
              priority
            />
          </div>
        </div>

        <div className="rounded-2xl bg-yellow-50 shadow-lg border">
          <div className="flex h-[50px] justify-between items-center p-4 gap-x-2 font-mono text-md border-b border-black shadow-sm">
            <div>Id</div>
            <div>Liquidity</div>
            <div>Token0</div>
            <div>Token1</div>
          </div>

          {/* {
            (selectedTokenPair?.token0 && selectedTokenPair?.token1) ?
              liquidityPools
                .filter((pool, idx) => {
                  return (
                    (tokensEqual(pool.token0, selectedTokenPair.token0) &&
                    tokensEqual(pool.token0, selectedTokenPair.token1)) ||
                    (tokensEqual(pool.token1, selectedTokenPair.token0) &&
                    tokensEqual(pool.token0, selectedTokenPair.token1))
                  )
                })
                .map((pool, idx) => <LPoolCell key={idx} pool={pool} />)
                :
              liquidityPools.map((pool, idx) => (
                <LPoolCell key={idx} pool={pool} />
              ))
          } */}
          {selectedTokenPair?.token0 &&
            selectedTokenPair?.token1 &&
            positions.map((pos, index) => (
              <LPositionCell position={pos} key={index} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default LPPositionTabContent
