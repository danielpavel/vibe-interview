'use client'
import {FC, useEffect, useState} from 'react'

import { Token, CurrencyAmount, Percent } from '@uniswap/sdk-core'

import { Input } from '../Input';
import { useLPPosition } from '@/hooks/useLPPosition';
import { useTokenPair } from '@/hooks/useTokenPair'
import { Contract, ethers } from 'ethers';
import { SUSHI_ROLL } from '@/libs/constants';
import { buildLpPosition, calculateSlippageAmount, formatAmount } from '@/utils/utils';
import { useUniswapV2PairContract } from '@/hooks/UniswapContracts/usePairContract';
import { useMetamask } from '@/hooks/useMetamask';
import SnackBar from '../SnackBar/SnackBar';
import { AlertState } from '@/types/types';
import JSBI from 'jsbi';
import { useSushiRollContract } from '@/hooks/SushiswapContracts/useSushiRollContract';

interface Props {}

const MigrateTabContent: FC<Props> = ({}) => {
  const [selectedTokenPair, setSelectedTokenPair] = useTokenPair()
  const [lpPosition, setLpPosition] = useLPPosition()
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  })
  const sushiRollContract = useSushiRollContract()

  const [loading, setLoading] = useState<boolean>(false);
  const [approvedPair, setApprovedPair] = useState<boolean>(false);
  const [lPAmount, setLPAmount] = useState<string>('');
  const {
    state: {status, isMetamaskInstalled, wallet},
  } = useMetamask()

  const [token0MinAmount, setToken0MinAmount] = useState<string>('0.0');
  const [token1MinAmount, setToken1MinAmount] = useState<string>('0.0');

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

  const handleLPInputChange = (event: any) => {
    console.log('[handleLPInputChange]')
    setLPAmount(event?.target?.value);
  }

  const handleApproveLPToken = async () => {
    console.log('[handleApproveLPToken]')

    if (!lPAmount || lPAmount === '') {
      setAlertState({
        open: true,
        message: "Amount of LP tokens is 0",
        severity: "error",
        hideDuration: 6000,
      })
    }

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

      if (error instanceof Error) {
        setAlertState({
          open: true,
          message: `Failed to migrate with err: ${error.message}`,
          severity: 'error',
          hideDuration: 6000,
        })
      }
    }
  }

  const handleMigrate = async () => {
    console.log('[handleMigrate]')

    if (!lPAmount || lPAmount === '') {
      setAlertState({
        open: true,
        message: "Amount of LP tokens is 0",
        severity: "error",
        hideDuration: 6000,
      })
    }

    try {
      const percent = new Percent(
        ethers.utils.parseUnits(lPAmount).toString(),
        lpPosition?.balance
      )
      if (Number(percent.toFixed()) > 100) {
        setAlertState({
          open: true,
          message: "Cannot migrate more LP tokens than available",
          severity: "error",
          hideDuration: 6000,
        })
        return;
      }

      console.log('[trying to migrate with percent]', percent.toFixed())
      console.log('[trying to migrate with tokenAmount0]', lpPosition?.token0AmountCurrency.toFixed())
      console.log('[trying to migrate with tokenAmount1]', lpPosition?.token1AmountCurrency.toFixed())

      const userAmountAmin = calculateSlippageAmount(lpPosition?.token0AmountCurrency, 2000);
      const userAmountBmin = calculateSlippageAmount(lpPosition?.token1AmountCurrency, 2000);

      console.log('[minAmountA]', userAmountAmin);
      console.log('[minAmountB]', userAmountBmin);

      let amountAMin = JSBI.divide(
        JSBI.multiply(userAmountAmin[0], JSBI.BigInt(percent.toFixed(0))),
        JSBI.BigInt(100)
      ).toString();
      let amountBMin = JSBI.divide(
        JSBI.multiply(userAmountBmin[0], JSBI.BigInt(percent.toFixed(0))),
        JSBI.BigInt(100)
      ).toString();

      // console.log('[min amounts A]', amountAMin);
      // console.log('[min amounts B]', amountBMin);
      setToken0MinAmount(amountAMin)
      setToken1MinAmount(amountBMin)

      const tx = await sushiRollContract?.migrate(
        lpPosition?.token0Token,
        lpPosition?.token1Token,
        parseFloat(lPAmount),
        amountAMin,
        amountBMin,
        Math.floor((new Date().getTime() / 1000) + Number(10) * 60),
        { gasLimit: 3500000 }
      );

      const receipt = await tx.wait(3);

      if (receipt?.status) {
        setAlertState({
          open: true,
          message: "Migrate successfull",
          severity: "error",
          hideDuration: 6000,
        })
      }

    } catch (err) {
      console.log('Failed to migrate with error:', err)
      setApprovedPair(false)

      if (err instanceof Error) {
        setAlertState({
          open: true,
          message: `Failed to migrate with err: ${err.message}`,
          severity: 'error',
          hideDuration: 6000,
        })
      }
    }
  }

  return (
    <div className="flex py-20 px-5 w-full h-screen justify-center">
      <div className="w-3/4 px-14 h-fit py-10 border-slate-300 border rounded-2xl shadow-lg">
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

        <div className='flex mb-6 font-mono items-center gap-x-4'>
          Minimum required to migrate:
        </div>
        <div className='flex font-mono items-center gap-x-4'>
          {lpPosition?.token0Token.symbol}: {token0MinAmount}
        </div>
        <div className='flex mb-12 font-mono items-center gap-x-4'>
          {lpPosition?.token1Token.symbol}: {token1MinAmount}
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

      <SnackBar
        alertStateProps={alertState}
        setAlertStateFunc={setAlertState}
      />
    </div>
  )
}

export default MigrateTabContent
