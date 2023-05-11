import useSWR from 'swr'
import axios from 'axios'
import { SelectedTokenPair, Token } from '@/types/types';
import { useEffect } from 'react';

const UNISWAP_V3_GRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
const UNISWAP_V2_GRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

interface LiquiditiPositionParams {
  first?: any
  tokenPair?: { token0?: Token, token1?: Token}
}

const positionsQuery = (first: any, token0?: Token, token1?: Token) => `
{
  positions(first: ${first} where: {
    token0: "${token0?.id}"
    token1: "${token1?.id}"
  }) {
    id
    owner
    pool {
      id
    }
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
    tickLower {
      id
    }
    tickUpper {
      id
    }
    liquidity
    depositedToken0
    depositedToken1
    withdrawnToken0
    withdrawnToken1
    collectedFeesToken0
    collectedFeesToken1
    transaction {
      id
    }
    feeGrowthInside0LastX128
    feeGrowthInside1LastX128
  }
}
`;

const fetcher = (args: any[]) => {
  const url = args[0]
  const first = args[1]
  const token0 = args[2]
  const token1 = args[3]

  if (!first || !token0 || !token1) {
    // console.log("[fetcher][error] with query", positionsQuery(first, token0, token1));
    return
  }

  // console.log("[fetcher] with query", positionsQuery(first, token0, token1));

  return axios({
    url: url,
    method: "post",
    data: {
      query: positionsQuery(first, token0, token1),
    },
  })
    .then((res) => res.data)
    .catch((err) => err);
};

export function useLiqudityPositions({ first, tokenPair }: LiquiditiPositionParams) {
  const { data, error, isLoading } = useSWR(
    [UNISWAP_V3_GRAPH_ENDPOINT, first, tokenPair?.token0, tokenPair?.token1],
    fetcher
  );
  let result: any[] = [];

  useEffect(() => {
  // console.log('[useLiquidityPositions] with first:', first, ' token0:', tokenPair?.token0, ' token1:', tokenPair?.token1);
  }, [])

  // console.log('[useLiquidityPositions] with result:', data);

  if (data && Array.isArray(data.data?.positions)) {
    data.data.positions.map((position: any, index: any) => {
      result.push({
        id: position.id,
        owner: position.owner,
        pool: position.pool.id,
        token0: position.token0,
        token1: position.token1,
        liquidity: position.liquidity,
        depositedToken0: position.depositedToken0,
        depositedToken1: position.depositedToken1,
      });
    });
  } else {
    result = [];
  }

  // console.log('[useTokenPool] with returning:', result);

  return result;
}