import type { identify, load, page, track } from 'rudder-sdk-js'

interface RudderStack {
  identify: typeof identify
  load: typeof load
  page: typeof page
  track: typeof track
}

declare global {
  interface Window {
    rudderanalytics: RudderStack
  }
}

export async function rudderInitialize() {
  window.rudderanalytics = await import('rudder-sdk-js')
  window.rudderanalytics.load(
    process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY || '',
    process.env.NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL || '',
    { integrations: { All: true } }
  )
}
