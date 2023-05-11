'use client'
import Link from 'next/link'
import {useMetamask} from '@/hooks/useMetamask'
import {Loading} from './Loading'

export default function Wallet() {
  const {
    dispatch,
    state: {status, isMetamaskInstalled, wallet},
  } = useMetamask()

  const showInstallMetamask = status !== 'pageNotLoaded' && !isMetamaskInstalled
  const showConnectButton = status !== 'pageNotLoaded' && isMetamaskInstalled

  const handleConnect = async () => {
    dispatch({type: 'loading'})
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    if (accounts.length > 0) {
      dispatch({type: 'connect', wallet: accounts[0]})
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl py-4 px-4 text-center lg:px-8">
        {wallet ? (
          <div className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto">
            {wallet}
          </div>
        ) : showConnectButton ? (
          <button
            onClick={handleConnect}
            className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto"
          >
            {status === 'loading' ? <Loading /> : 'Connect Wallet'}
          </button>
        ) : null}

        {showInstallMetamask && (
          <Link legacyBehavior href="https://metamask.io/" target="_blank">
            <a className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-ganache text-white px-5 py-3 text-base font-medium  sm:w-auto">
              Connect Wallet
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}
