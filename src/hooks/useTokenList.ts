import useSWR from 'swr'
import axios from 'axios'

const UNISWAP_V3_GRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
const UNISWAP_V2_GRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

interface TokenListParam {
  first?: number
}

const fetcher = (url: string, first: number) => {
  console.log("[fetchet] with url", url);
  return axios({
    url: url[0],
    method: "post",
    data: {
      query: `
      {
        pools(first: 10, orderDirection: desc orderBy: volumeUSD) {
          id
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
      `,
    },
  })
    .then((res) => res.data)
    .catch((err) => err);
};

export function useTokenList({ first }: TokenListParam) {
  const { data, error, isLoading } = useSWR(
    [UNISWAP_V3_GRAPH_ENDPOINT, first],
    fetcher
  );
  let result: any[] = [];

  // console.log('[useTokenList] with result:', data);

  /**
   * [TODO][FIX]: remove duplicates */
  if (data && Array.isArray(data.data.pools)) {
    data.data.pools.map((tokenPool: any, index: any) => {
      const token0 = {
        id: tokenPool.token0.id,
        name: tokenPool.token0.name,
        symbol: tokenPool.token0.symbol,
      };
      const token1 = {
        id: tokenPool.token1.id,
        name: tokenPool.token1.name,
        symbol: tokenPool.token1.symbol,
      };

      result.push(token0);
      result.push(token1);
    });

    // const aFunc = (arr: {id: any, name: any, symbol: any}[]) => {
    //   return arr.filter((value, index) => arr.indexOf(value) === index)
    // }

  } else {
    result = [];
  }

  // console.log('[useTokenList] with returning:', result);

  return result;
}