import useSWR from 'swr'
import axios from 'axios'

const UNISWAP_V3_GRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
const UNISWAP_V2_GRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

interface TokenPoolsParam {
  first?: number
}

const poolsQuery = (first: number) => `
{
  pools(first: ${first}, orderDirection: desc orderBy: volumeUSD) {
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
`;

const fetcher = (url: string, first: number = 20) => {
  // console.log("[fetchet] with query", tokensQuery(first));
  return axios({
    url: url[0],
    method: "post",
    data: {
      query: poolsQuery(first),
    },
  })
    .then((res) => res.data)
    .catch((err) => err);
};

export function useLiquidityPools({ first }: TokenPoolsParam) {
  const { data, error, isLoading } = useSWR(
    [UNISWAP_V3_GRAPH_ENDPOINT, first],
    fetcher
  );
  let result: any[] = [];

  // console.log('[useTokenPool] with result:', data);

  if (data && Array.isArray(data.data?.pools)) {
    data.data.pools.map((pool: any, index: any) => {
      result.push({
        volume: pool.volumeUSD,
        tvl: pool.totalValueLockedUSD,
        token0: pool.token0,
        token1: pool.token1,
      });
    });
  } else {
    result = [];
  }

  // console.log('[useTokenPool] with returning:', result);

  return result;
}