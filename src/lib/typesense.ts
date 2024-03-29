import Typesense from 'typesense'

const typesense = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || '',
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY || '',
  connectionTimeoutSeconds: 3,
})

export default typesense
