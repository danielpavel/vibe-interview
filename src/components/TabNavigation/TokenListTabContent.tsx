'use client'
import TokenCard from '@/components/TokenCard/TokenCard'
import {FC, useState} from 'react'
import {SelectedTokenPair, Token} from '@/types/types'
import {useTokenPair} from '@hooks/useTokenPair'

interface Props {
  tokens: Token[]
}

const TokenListTabContent: FC<Props> = ({tokens}) => {
  const [selectedTokenPair, setSelectedTokenPair] = useTokenPair()

  return (
    <div className="p-24 w-full bg-slate-900 flex justify-center">
      <div className="flex flex-col items-center">
        <div className="font-mono text-2xl p-5 text-center">
          Your Token Selection:
        </div>
        <div className="font-mono text-2xl p-5">
          {selectedTokenPair?.token0?.symbol}/
          {selectedTokenPair?.token1?.symbol}
        </div>
        <button
          className="p-1 px-2 bg-slate-800 shadow-lg text-white font-mono border-2 border-slate-300 rounded-xl mb-10"
          onClick={() => setSelectedTokenPair(undefined)}
        >
          Clear selection
        </button>
      </div>

      <div className="flex p-5 gap-x-2 gap-y-2 justify-center flex-wrap w-3/4">
        {tokens.map((t, idx) => (
          <TokenCard
            selectedTokenPair={selectedTokenPair}
            setSelectedTokenPair={setSelectedTokenPair}
            key={idx}
            symbol={t.symbol}
            tokenName={t.name}
            tokenId={t.id}
            decimals={t.decimals}
          />
        ))}
      </div>
    </div>
  )
}

export default TokenListTabContent
