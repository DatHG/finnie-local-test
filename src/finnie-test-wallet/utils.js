// import SignClient from '@walletconnect/sign-client'
const SignClient = require('@walletconnect/sign-client')

export const testFunc = async () => {
  const authClient = await AuthClient.init({
    projectId: '7d4d25ec789c2e81c7da7828e5d2db5b',
    iss: `did:pkh:eip155:1:0x9d60e52628306A5b66226bF1A8f26e0DeAFd00d6`,
    metadata: {
      name: 'nodejs-wallet',
      description: 'A nodejs-wallet using WalletConnect AuthClient',
      url: 'my-auth-wallet.com',
      icons: ['https://my-auth-wallet.com/icons/logo.png']
    }
  })

  authClient.core.pairing.pair({
    uri: 'wc:72720d28-eb4b-4359-98f6-f2cb4e28e503@1?bridge=https%3A%2F%2F5.bridge.walletconnect.org&key=7cb848aebbcc96397e067221f7dc309f8cbedf0fbc81814033c28233c043813e'
  })

  authClient.on('auth_request', async ({ id, params }) => {
    console.log('id', id)
    console.log('params', params)
  })
}
