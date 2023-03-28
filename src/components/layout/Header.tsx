import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
  { name: 'Topics', href: '#', current: true },
  { name: 'About', href: '#', current: false },
]

export default function Header() {
  return (
    <div className='min-h-full'>
      <Disclosure
        as='nav'
        className='border-b border-gray-200 bg-white py-2 pt-3'
      >
        {({ open }) => (
          <>
            <div className='mx-auto max-w-[90rem] pr-4'>
              <div className='flex h-16 justify-between'>
                <div className='flex flex-shrink-0 items-center'>
                  <Image
                    alt='The Code Review logo'
                    src='/images/TCRLogo.png'
                    height={56}
                    width={240}
                  />
                </div>
                <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={
                        item.current
                          ? 'text-md inline-flex items-center px-1 pt-3 font-mono font-medium text-gray-900'
                          : 'text-md inline-flex items-center px-1 pt-3 font-mono font-medium text-gray-500 hover:text-gray-700'
                      }
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='-mr-2 flex items-center sm:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-8 w-8' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-8 w-8' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='space-y-1 pt-2 pb-3'>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className={
                      item.current
                        ? 'block border-gray-500 bg-gray-50 py-2                       pl-3 pr-4 font-mono text-base font-medium text-gray-700'
                        : 'text-gray-60 block border-transparent                       py-2 pl-3 pr-4 font-mono text-base font-medium hover:bg-gray-50 hover:text-gray-800'
                    }
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
