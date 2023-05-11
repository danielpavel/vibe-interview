import {SelectedTokenPair} from '@/types/types'
import {useCallback, useEffect, useState} from 'react'

/**
 * useState hook that takes from session storage and updates the value in session storage
 * on every update
 */
export const useTokenPair = (): [
  SelectedTokenPair | null | undefined,
  (tokenPair?: SelectedTokenPair | null) => void
] => {
  const [tokenPair, setTokenPairState] = useState<
    SelectedTokenPair | null | undefined
  >(null)

  const setTokenPair = useCallback((tokenPair?: SelectedTokenPair | null) => {
    if (tokenPair) {
      sessionStorage.setItem('tokenPair', JSON.stringify(tokenPair))
    } else {
      sessionStorage.removeItem('tokenPair')
    }
    setTokenPairState(tokenPair)
  }, [])

  useEffect(() => {
    const tokenPair = sessionStorage.getItem('tokenPair')
    if (tokenPair) {
      setTokenPairState(JSON.parse(tokenPair))
    }
  }, [])

  return [tokenPair, setTokenPair]
}
