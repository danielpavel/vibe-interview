'use client'

import {FC, useEffect, useState} from 'react'
import Image from 'next/image'
import {useLiqudityPositions} from '@/hooks/useLiquidityPositions'

import {Pool, SelectedTokenPair} from '@/types/types'
import {LPositionCell} from '../Cells'

// import { useLPPosition } from '@/hooks/useLPPosition';
import {useUniswapV2PairContract} from '@/hooks/UniswapContracts/usePairContract'
import {Pair, CurrencyAmount} from '@sushiswap/sdk'
import {useTokenPair} from '@hooks/useTokenPair'
import { useMetamask } from '@/hooks/useMetamask'
import { useLPPosition } from '@/hooks/useLPPosition'

interface Props {
  liquidityPools: Pool[]
}

const LPPositionTabContent: FC<Props> = ({liquidityPools}) => {
  const [selectedTokenPair, setSelectedTokenPair] = useTokenPair()
  const [lpPosition, setLpPosition] = useLPPosition()

  const {
    state: {status, isMetamaskInstalled, wallet},
  } = useMetamask()
  // const positions = useLiqudityPositions({
  //   first: 10,
  //   tokenPair: {
  //     token0: selectedTokenPair?.token0,
  //     token1: selectedTokenPair?.token1,
  //   },
  // })

  // const position = useLPPosition({ tokenPair: { token0: selectedTokenPair?.token0, token1: selectedTokenPair?.token1}})
  const pairContract = useUniswapV2PairContract({
    tokenPair: {
      token0: selectedTokenPair?.token0,
      token1: selectedTokenPair?.token1,
    },
  })

  useEffect(() => {
    const getLP = async () => {
      if (pairContract.contract && pairContract.token0 && pairContract.token1) {
        const reserves = await pairContract.contract.getReserves()

        const token0Addr = await pairContract.contract.token0()
        const token1Addr = await pairContract.contract.token1()
        const token0 = [pairContract.token0, pairContract.token1].find(
          (token) => token.address === token0Addr
        )
        const token1 = [pairContract.token0, pairContract.token1].find(
          (token) => token.address === token1Addr
        )

        const pair = new Pair(
          CurrencyAmount.fromRawAmount(token0, reserves.reserve0.toString()),
          CurrencyAmount.fromRawAmount(token1, reserves.reserve1.toString())
        )

        const totalSupply = await pairContract.contract.totalSupply()
        const liquidityToken = await pair.liquidityToken
        let balance;
        if (wallet) {
          balance = await pairContract.contract.balanceOf(wallet)
        } else {
          balance = 0
        }

        setLpPosition({
          pair: selectedTokenPair,
          totalSupply: totalSupply,
          liquidityToken: liquidityToken,
          balance: balance
        })
      }
    }

    getLP()
  }, [pairContract])

  useEffect(() => {
    console.log('LP Position', lpPosition);
  }, [lpPosition])

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

        <div className="rounded-t-2xl bg-yellow-50 border-t border-r border-l overflow-hidden">
          <div className="flex h-[50px] justify-between items-center p-4 gap-x-2 font-mono text-sm border-b border-black shadow-sm">
            <div>LP Token</div>
            <div>User Balance</div>
            <div>Token0 Amount</div>
            <div>Token1 Amount</div>
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
          {/* {selectedTokenPair?.token0 &&
            selectedTokenPair?.token1 &&
            positions.map((pos, index) => (
              <LPositionCell position={pos} key={index} />
            ))} */}

          <LPositionCell position={lpPosition} />
        </div>
      </div>
    </div>
  )
}

export default LPPositionTabContent
