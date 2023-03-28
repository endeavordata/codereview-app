import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import '@/styles/globals.css'

import { rudderInitialize } from '../lib/rudderInitialize'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Call page() on initial visit
    const callRudderPage = async () => {
      await rudderInitialize()
      window.rudderanalytics.page()
    }
    callRudderPage()

    // Call page() on route change
    const handleRouteChange = () => {
      window.rudderanalytics.page()
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default MyApp
