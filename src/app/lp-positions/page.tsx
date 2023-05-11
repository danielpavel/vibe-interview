import axios from 'axios'
import {Pool} from '@/types/types'
import LPPositionTabContent from '@components/TabNavigation/LPPositionTabContent'

interface ApiResponse {
  data: {
    pools: Pool[]
  }
}

const poolsQuery = (first: number) => `
{
  pools(first: ${first}, orderDirection: desc orderBy: volumeUSD) {
    id
    volumeUSD
    totalValueLockedUSD
    token0 {
      id
      symbol
      name
    }
    token1 {
      id
      symbol
      name
    }
  }
}
`

const fetchPools = async (poolsNumber = 20) => {
  const result = await axios<ApiResponse>({
    url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    method: 'post',
    data: {
      query: poolsQuery(poolsNumber),
    },
  })

  if (result.status !== 200) {
    throw new Error('Failed to fetch API')
  }
  return result.data.data
}

export default async function LpPositions() {
  const result = await fetchPools(20)
  return <LPPositionTabContent liquidityPools={result.pools ?? []} />
}
