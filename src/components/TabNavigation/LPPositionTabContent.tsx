'use client'

import {FC, useEffect, useState} from 'react'
import Image from 'next/image'

import {Pool, SelectedTokenPair} from '@/types/types'
import {LPositionCell} from '../Cells'

// import { useLPPosition } from '@/hooks/useLPPosition';
import {useUniswapV2PairContract} from '@/hooks/UniswapContracts/usePairContract'
import {useTokenPair} from '@hooks/useTokenPair'
import { useMetamask } from '@/hooks/useMetamask'
import { useLPPosition } from '@/hooks/useLPPosition'
import { buildLpPosition } from '@/utils/utils'

interface Props {
  liquidityPools?: Pool[]
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
    const getPosition = async () => {
      const position = await buildLpPosition(
        pairContract,
        wallet,
        setLpPosition
      )

      setLpPosition(position)
    }

    getPosition()
  }, [wallet, selectedTokenPair])

  useEffect(() => {
    console.log('LP Position changed', lpPosition);
  }, [lpPosition])

  return (
    <div className="flex py-20 px-5 w-full h-screen justify-center">
      <div className="w-3/4 px-14 h-fit py-10 border-slate-300 border rounded-2xl shadow-lg">
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

        <div className="rounded-t-2xl bg-yellow-100 border-t border-r border-l overflow-hidden">
          <div className="flex h-[50px] justify-between items-center p-4 gap-x-2 font-mono text-sm border-b border-black shadow-sm">
            <div>LP Token</div>
            <div>LP Balance</div>
            <div>Token0 Amount</div>
            <div>Token1 Amount</div>
          </div>
        </div>
        <LPositionCell position={lpPosition} />
      </div>
    </div>
  )
}

export default LPPositionTabContent
