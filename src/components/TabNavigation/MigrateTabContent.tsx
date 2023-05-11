'use client'
import {FC, useState} from 'react'
import {SelectedTokenPair} from '@/types/types'
import { Pair, CurrencyAmount } from '@sushiswap/sdk';
import { useUniswapV2PairContract } from '@/hooks/UniswapContracts/usePairContract';
import { Input } from '../Input';
import { useLPPosition } from '@/hooks/useLPPosition';

interface Props {}

const MigrateTabContent: FC<Props> = ({}) => {
  const [selectedTokenPair, setSelectedTokenPair] =
    useState<SelectedTokenPair>()
  const [loading, setLoading] = useState<boolean>(false);
  const [approvedPair, setApprovedPair] = useState<boolean>(false);
  const [token0Amount, setToken0Amount] = useState<string>('');
  const [token1Amount, setToken1Amount] = useState<string>('');
  const pairContract = useUniswapV2PairContract({ tokenPair: { token0: selectedTokenPair?.token0, token1: selectedTokenPair?.token1}});
  const [lpPosition, _] = useLPPosition();

  const getPoolShare = async () => {
    if (pairContract.contract && pairContract.token0 && pairContract.token1) {
      setLoading(true);
      const reserves = await pairContract.contract.getReserves();

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
      console.log('[MigrateTabContent][getPoolShare]', pair.liquidityToken)

      setToken0Amount('')
      setToken1Amount('')
      setLoading(false);
    }
  }

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
          LP Token: {lpPosition?.liquidityToken.symbol}
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
