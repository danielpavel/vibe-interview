'use client'
import {FC, useEffect, useState} from 'react'

import { Token, CurrencyAmount } from '@uniswap/sdk-core'

import { Input } from '../Input';
import { useLPPosition } from '@/hooks/useLPPosition';
import { useTokenPair } from '@/hooks/useTokenPair'
import { Contract, ethers } from 'ethers';
import { SUSHI_ROLL } from '@/libs/constants';
import { buildLpPosition, formatAmount } from '@/utils/utils';
import { useUniswapV2PairContract } from '@/hooks/UniswapContracts/usePairContract';
import { useMetamask } from '@/hooks/useMetamask';

interface Props {}

const MigrateTabContent: FC<Props> = ({}) => {
  const [selectedTokenPair, setSelectedTokenPair] = useTokenPair()
  const [lpPosition, setLpPosition] = useLPPosition()

  const [loading, setLoading] = useState<boolean>(false);
  const [approvedPair, setApprovedPair] = useState<boolean>(false);
  const [lPAmount, setLPAmount] = useState<string>('');
  const {
    state: {status, isMetamaskInstalled, wallet},
  } = useMetamask()

  const [token0Amount, setToken0Amount] = useState<CurrencyAmount<Token>>();
  const [token1Amount, setToken1Amount] = useState<CurrencyAmount<Token>>();

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

      if (position) setLpPosition(position)
    }

    getPosition()
  }, [pairContract, wallet, selectedTokenPair])

  const handleLPInputChange = (event: any) => {
    console.log('[handleLPInputChange]')
    setLPAmount(event?.target?.value);
  }

  const handleApproveLPToken = async () => {
    console.log('[handleApproveLPToken]')

    try {
      if (lpPosition?.pairContract?.contract) {
        const contract = lpPosition?.pairContract?.contract;

        const amount = ethers.utils.parseUnits(lPAmount, 18)
        const transaction = await contract.approve(
          SUSHI_ROLL,
          amount
        )

        const receipt = await transaction.wait(3)

        if (receipt.status) {
          console.log('Successfully approved')
          setApprovedPair(true)
        } else {
          console.log('Failed to approve with tx status', receipt.status)
          setApprovedPair(false)
        }
      }
    } catch (error) {
      console.log('Failed to approve with error:', error)
      setApprovedPair(false)
    }
  }

  const handleMigrate = () => {
    console.log('[handleMigrate]')
  }

  return (
    <div className="flex py-20 px-5 w-full justify-center">
      <div className="w-3/4 px-14 py-5 border-slate-300 border rounded-2xl">
        <div className="font-mono text-lg">Your token pair selection:</div>
        <div className="font-mono text-sm mt-2 mb-4">
          {selectedTokenPair?.token0?.symbol}/
          {selectedTokenPair?.token1?.symbol}
        </div>
        <button
          className="p-1 px-2 bg-slate-800 shadow-lg text-white font-mono border-2 border-slate-300 rounded-xl mb-12"
          onClick={() => setSelectedTokenPair(undefined)}
        >
          Clear selection
        </button>

        <div className='flex mb-2 font-mono items-center gap-x-4'>
          Available LP Tokens: {formatAmount(lpPosition?.balance, lpPosition?.pair?.liquidityToken)} ${lpPosition?.pair?.liquidityToken?.symbol}
        </div>

        <div className='flex mb-12 font-mono items-center gap-x-4'>
          <Input
            type="number"
            value={lPAmount}
            onChange={handleLPInputChange}
            placeholder="amount to migrate"
          />
        </div>

        <div className="font-mono text-2xl mb-8">Migrate</div>

        <div className="flex flex-row mt-4 gap-x-2">
          <button
            type="button"
            disabled={loading || approvedPair}
            onClick={handleApproveLPToken}
            className={`font-semibold p-2 flex-grow font-mono text-white border rounded-2xl transition duration-300 ${
              approvedPair ? "bg-gray-500" : "bg-blue-700"
            }`}
          >
            {loading ? " Loading..." : "Approve"}
          </button>
          <button
              type="button"
              disabled={loading || !approvedPair}
              onClick={handleMigrate}
              className={`font-semibold p-2 flex-grow font-mono text-white border rounded-2xl transition duration-300 ${
                approvedPair ? "bg-blue-700" : "bg-gray-500"
              }`}
            >
              {loading ? " Loading..." : "Migrate"}
            </button>
        </div>

      </div>
    </div>
  )
}

export default MigrateTabContent
