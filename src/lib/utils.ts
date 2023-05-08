export const getQueryParameter = (val: string | string[] | undefined) => {
  if (Array.isArray(val)) {
    return val[0]
  } else {
    return val
  }
}

export const generateIdFromName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
