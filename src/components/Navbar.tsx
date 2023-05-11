'use client'
import {useState} from 'react'
import {Dialog, Popover} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'

function MobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 text-gray-100">
              <span>Vibe-Interview</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-100 hover:bg-gray-50"
                >
                  Tokens
                </Link>
                <Link
                  href="/lp-positions"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-100 hover:bg-gray-50"
                >
                  Posts
                </Link>
                <Link
                  href="/migrations"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-100 hover:bg-gray-50"
                >
                  Migrations
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export function Navbar() {
  return (
    <header className="relative isolate z-10 bg-slate-900 px-12">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between py-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Softwarelama</span>
            <div>
              <p className={'h-8 w-auto font-medium text-gray-100'}>Vibe</p>
            </div>
          </Link>
        </div>
        <MobileNav />
        <nav className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className="text-sm font-medium leading-6 text-gray-100"
          >
            Tokens
          </Link>
          <Link
            href="/lp-positions"
            className="text-sm font-medium leading-6 text-gray-100"
          >
            LP Positions
          </Link>
          <Link
            href="/migrations"
            className="text-sm font-medium leading-6 text-gray-100"
          >
            Migrations
          </Link>
        </nav>
      </nav>
    </header>
  )
}
