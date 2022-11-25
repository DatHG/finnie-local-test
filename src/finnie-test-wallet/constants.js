import { SignClient } from '@walletconnect/sign-client'

export const dAppURI =
  'wc:9d6ef8b9603af56071d8730a1d492fc930f450da28e92a1cc272d14cc2bd65ab@2?relay-protocol=irn&symKey=22b21757b4e4df04c387a914c176b028cb363d3440f2b0d1aa5dc7ff30a1b988'
export const PUBLIC_PROJECT_ID = '7d4d25ec789c2e81c7da7828e5d2db5b'

export const PUBLIC_RELAY_URL = 'wss://relay.walletconnect.com'

export const signClient = await SignClient.init({
  logger: 'debug',
  projectId: PUBLIC_PROJECT_ID,
  relayUrl: PUBLIC_RELAY_URL,
  metadata: {
    name: 'Finnie wallet',
    description: 'Finnie wallet for WalletConnect',
    url: 'my-auth-wallet.com',
    icons: ['https://my-auth-wallet.com/icons/logo.png']
  }
})
