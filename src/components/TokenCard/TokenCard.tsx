import Image from 'next/image'
import {FC, useEffect, useState} from 'react'
import {SelectedTokenPair, } from '@/types/types'
import {tokensEqual} from '@/utils/utils'
import * as tokenList from '@sushiswap/default-token-list'
import { SupportedChainId, Token } from '@uniswap/sdk-core'

interface Props {
  tokenName?: any
  symbol?: any
  address?: any
  imageURL?: any
  decimals?: any
  selectedTokenPair?: SelectedTokenPair | null
  setSelectedTokenPair: (selectedTokenPair?: SelectedTokenPair) => void
}

const isTokenSelected = (
  pair: SelectedTokenPair | null | undefined,
  token?: Token
) => {
  if (!pair || (!pair.token0 && !pair.token1) || !token) return false

  return tokensEqual(token, pair.token1) || tokensEqual(token, pair.token0)
}

const TokenCard: FC<Props> = ({
  symbol,
  tokenName,
  address,
  decimals,
  setSelectedTokenPair,
  selectedTokenPair,
}) => {
  const [token, setToken] = useState<Token>()
  const [tokenSelected, setTokenSelected] = useState<boolean>(false)
  const [tokenImgUri, setTokenImgUri] = useState<string>('')

  useEffect(() => {
    const imgUri = tokenList.tokens.filter(
      (token) => address === token.address.toLocaleLowerCase()
    )[0]?.logoURI

    setTokenImgUri(imgUri ?? './no-img.svg')

    const tokenObj = new Token(
      SupportedChainId.MAINNET,
      address,
      Number(decimals),
      symbol,
      tokenName,
    );

    setToken(tokenObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTokenOnClick = (e: any) => {
    console.log('[handleTokenOnClick] with token', token)

    if (!selectedTokenPair) {
      setSelectedTokenPair({
        token0: token,
        token1: undefined,
        lastSelected: token,
      })
    } else {
      if (selectedTokenPair.token0 && selectedTokenPair.token1) {
        setSelectedTokenPair(undefined)
        return
      }

      if (!tokensEqual(selectedTokenPair.lastSelected, token)) {
        if (!selectedTokenPair.token0) {
          setSelectedTokenPair({
            ...selectedTokenPair,
            token0: token,
            lastSelected: token,
          })
        }
        if (!selectedTokenPair.token1) {
          setSelectedTokenPair({
            ...selectedTokenPair,
            token1: token,
            lastSelected: token,
          })
        }
      } else {
        /* Find out which token to desellect */
        if (tokensEqual(selectedTokenPair.token0, token)) {
          setSelectedTokenPair({
            ...selectedTokenPair,
            token0: undefined,
            lastSelected: undefined,
          })
        }
        if (tokensEqual(selectedTokenPair.token1, token)) {
          setSelectedTokenPair({
            ...selectedTokenPair,
            token1: undefined,
            lastSelected: undefined,
          })
        }
      }
    }
  }

  useEffect(() => {
    setTokenSelected(isTokenSelected(selectedTokenPair, token))
  }, [selectedTokenPair, token])

  return (
    <button
      className={`p-1 w-[150px] min-w-[150px] h-[240px] rounded-2xl ${
        !isTokenSelected(selectedTokenPair, token)
          ? 'border bg-slate-50'
          : 'border-2 border-green-600 bg-green-300/60 shadow-magical scale-105'
      } hover:scale-105 duration-150`}
      onClick={handleTokenOnClick}
    >
      <div className="object-fill overflow-hidden w-full h-3/5 rounded-2xl">
        <Image
          src={tokenImgUri}
          alt={`${token?.name} Logo`}
          className="dark:invert"
          width={200}
          height={200}
          priority
        />
      </div>

      <div className="p-2 w-full h-2/5 flex flex-col justify-center">
        <div className="font-mono text-lg">{tokenName}</div>
        <div className="font-mono text-sm text-slate-400">{symbol}</div>
      </div>
    </button>
  )
}

export default TokenCard
