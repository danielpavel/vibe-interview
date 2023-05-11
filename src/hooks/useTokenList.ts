import useSWR from 'swr'
import axios from 'axios'

const UNISWAP_V3_GRAPH_ENDPOINT =
  'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
const UNISWAP_V2_GRAPH_ENDPOINT =
  'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'

interface TokenListParam {
  first?: number
}

const tokensQuery = (first: number) => `
{
  tokens(first: ${first} orderBy:volumeUSD orderDirection: desc) {
    id
    name
    symbol
  }
}
`

const fetcher = (url: string, first: number = 10) => {
  // console.log("[fetchet] with query", tokensQuery(first));
  return axios({
    url: url[0],
    method: 'post',
    data: {
      query: tokensQuery(first),
    },
  })
    .then((res) => res.data)
    .catch((err) => err)
}

export function useTokenList({first}: TokenListParam) {
  const {data, error, isLoading} = useSWR(
    [UNISWAP_V3_GRAPH_ENDPOINT, first],
    fetcher
  )
  let result: any[] = []

  // console.log('[useTokenList] with result:', data);

  if (data && Array.isArray(data.data?.tokens)) {
    data.data.tokens.map((token: any, index: any) => {
      result.push(token)
    })
  } else {
    result = []
  }

  // console.log('[useTokenList] with returning:', result);

  return result
}
