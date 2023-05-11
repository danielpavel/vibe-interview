import axios from 'axios'
import {Token} from '@/types/types'
import React from 'react'
import TokenListTabContent from '../components/TabNavigation/TokenListTabContent'

interface ApiResponse {
  data: {
    tokens: Token[]
  }
}

const tokensQuery = (first: number) => `
{
  tokens(first: ${first} orderBy: volumeUSD orderDirection: desc) {
    id
    name
    symbol
    decimals
  }
}
`


async function fetchTokens(tokensNumber = 10) {
  const result = await axios<ApiResponse>({
    url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    method: 'post',
    data: {
      query: tokensQuery(tokensNumber),
    },
  })
  if (result.status !== 200) {
    throw new Error('Failed to fetch API')
  }
  return result.data.data
}

export default async function Home() {
  const {tokens} = await fetchTokens(10)

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full">
        <TokenListTabContent tokens={tokens} />
      </div>
    </div>
  )
}
