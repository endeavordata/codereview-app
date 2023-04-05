export const getQueryParameter = (val: string | string[] | undefined) => {
  if (Array.isArray(val)) {
    return val[0]
  } else {
    return val
  }
}
