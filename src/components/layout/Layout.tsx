import * as React from 'react'

import Header from '@/components/layout/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div>
      <Header />
      <div>{children}</div>
      <div>Doop</div>
    </div>
  )
}
