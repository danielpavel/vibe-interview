import {Token} from '@/types/types'
import axios from 'axios'

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

export default async function Tokens() {
  const {tokens} = await fetchTokens(10)
  return <div>Tokens</div>
}
