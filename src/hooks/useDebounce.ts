import { useEffect, useRef, useState } from 'react'

export function useDebounce<T>(value: T, delay: number, minLength: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const savedValue = useRef(value)

  useEffect(() => {
    const shouldUpdate =
      Math.abs(
        (value as string).length - (savedValue.current as string).length
      ) >= minLength

    if (shouldUpdate) {
      savedValue.current = value
      setDebouncedValue(value)
      return
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, minLength])

  return debouncedValue
}

// import { useEffect, useState } from 'react'

// export function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)

//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay])

//   return debouncedValue
// }
