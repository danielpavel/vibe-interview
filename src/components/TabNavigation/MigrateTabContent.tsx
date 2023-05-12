'use client'
import {FC, useEffect, useState} from 'react'

import { Token, CurrencyAmount } from '@uniswap/sdk-core'

import { useUniswapV2PairContract } from '@/hooks/UniswapContracts/usePairContract';
import { Input } from '../Input';
import { useLPPosition } from '@/hooks/useLPPosition';
import { useTokenPair } from '@/hooks/useTokenPair'

interface Props {}

const MigrateTabContent: FC<Props> = ({}) => {
  const [selectedTokenPair, setSelectedTokenPair] = useTokenPair()
  const [loading, setLoading] = useState<boolean>(false);
  const [approvedPair, setApprovedPair] = useState<boolean>(false);

  const [token0Amount, setToken0Amount] = useState<CurrencyAmount<Token>>();
  const [token1Amount, setToken1Amount] = useState<CurrencyAmount<Token>>();

  const pairContract = useUniswapV2PairContract({ tokenPair: { token0: selectedTokenPair?.token0, token1: selectedTokenPair?.token1}});
  const [lpPosition, _] = useLPPosition();

  const getPoolShare = async () => {
    setLoading(true);

    const pairData = lpPosition?.pair;
    const token0 = lpPosition?.token0Token
    const token1 = lpPosition?.token1Token

    const token0Amount = pairData?.getLiquidityValue(
      token0,
      CurrencyAmount.fromRawAmount(pairData.liquidityToken, lpPosition?.totalSupply),
      CurrencyAmount.fromRawAmount(pairData.liquidityToken, lpPosition?.balance),
    )
    const token1Amount = pairData?.getLiquidityValue(
      token1,
      CurrencyAmount.fromRawAmount(pairData.liquidityToken, lpPosition?.totalSupply),
      CurrencyAmount.fromRawAmount(pairData.liquidityToken, lpPosition?.balance),
    )

    setToken0Amount(token0Amount);
    setToken1Amount(token1Amount);

    setLoading(false);
  }

  useEffect(() => {
    if (lpPosition) {
      getPoolShare();
    } else {
      // some error - come back to this later
    }
  }, [])

  const handleLPInputChange = () => {
    console.log('[handleLPInputChange]')
  }

  const handleApproveLPToken = () => {
    console.log('[handleApproveLPToken]')
  }

  const handleMigrate = () => {
    console.log('[handleMigrate]')
  }

  return (
    <div className="flex py-20 px-5 w-full bg-green-100 justify-center">
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

        <div className='flex mb-12 font-mono items-center gap-x-4'>
          LP Token: {lpPosition?.pair?.liquidityToken.symbol}
          <Input
            type="number"
            value={'LP Tokens Value'}
            onChange={handleLPInputChange}
            placeholder="amount to migrate"
          />
        </div>

        <div className="font-mono text-2xl mb-8">Migrate</div>

        <div className="flex flex-row mt-4">
          <button
            type="button"
            disabled={loading || approvedPair}
            onClick={handleApproveLPToken}
            className={`p-2 flex-grow text-mono text-white border rounded transition duration-300 ${
              approvedPair ? "bg-gray-500" : "bg-blue-700"
            }`}
          >
            {loading ? " Loading..." : "Approve"}
          </button>
          <button
              type="button"
              disabled={loading}
              onClick={handleMigrate}
              className={`font-bold p-2 flex-grow text-bold text-white border rounded transition duration-300 ${
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
