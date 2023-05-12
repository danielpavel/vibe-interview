import {LPPos} from '@/types/types'
import {useCallback, useEffect, useState} from 'react'

/**
 * useState hook that takes from session storage and updates the value in session storage
 * on every update
 */
export const useLPPosition = (): [
  LPPos | null | undefined,
  (lpPos?: LPPos | null) => void
] => {
  const [lpPos, setLpPos] = useState<
    LPPos | null | undefined
  >(null)

  const setLPPosition = useCallback((pos?: LPPos | null) => {
    if (pos) {
      sessionStorage.setItem('lpPos', JSON.stringify(pos))
    } else {
      sessionStorage.removeItem('lpPos')
    }
    // console.log('[inside setting position][setting]', lpPos)
    setLpPos(lpPos)
  }, [])

  useEffect(() => {
    const pos = sessionStorage.getItem('lpPos')
    if (pos) {
      setLpPos(JSON.parse(pos))
    }
  }, [])

  return [lpPos, setLPPosition]
}
