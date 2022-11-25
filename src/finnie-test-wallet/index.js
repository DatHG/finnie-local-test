import { signClient, dAppURI } from './constants.js'
import { getSdkError } from '@walletconnect/utils'

let isApproveConnect = true

const approveSession = async (proposal) => {
  console.log('proposal', proposal)
  console.log('proposal', proposal.params.requiredNamespaces)

  if (proposal) {
    const { params } = proposal
    const { requiredNamespaces, id, relays } = params
    const namespaces = {}
    Object.keys(requiredNamespaces).forEach((key) => {
      const accounts = ['eip155:5:0x9d60e52628306A5b66226bF1A8f26e0DeAFd00d6']

      namespaces[key] = {
        accounts,
        methods: requiredNamespaces[key].methods,
        events: requiredNamespaces[key].events
      }
    })

    const { acknowledged } = await signClient.approve({
      id,
      relayProtocol: relays[0].protocol,
      namespaces
    })
    await acknowledged()
  }
}

const rejectSession = async (proposal) => {
  if (proposal) {
    const { id } = proposal
    await signClient.reject({
      id,
      reason: getSdkError('USER_REJECTED_METHODS')
    })
  }
}

const result = await signClient.pair({ uri: dAppURI })
// const result = await signClient.core.pairing.activate({
//   topic: '0d4315ef3849870e62cf80de5068e4971bc71a709941db5388a5bfbea3f52eb3'
// })

console.log('result', result)

signClient.on('session_proposal', async (event) => {
  console.log('CONNECTING...')
  console.log('event', event.params.requiredNamespaces)
  if (isApproveConnect) {
    console.log('APPROVE >>>')
    await approveSession(event)
    console.log('FINISH >>>')
  } else {
    console.log('REJECT >>>')
    await rejectSession(event)
    console.log('FINISH >>>')
  }
})

signClient.on('session_request', async (requestEvent) => {
  console.log('requestEvent', requestEvent)

  signClient.respond({
    topic: requestEvent.topic,
    response: {
      id: requestEvent.id,
      jsonrpc: '2.0',
      result:
        '0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b'
    }
  })
})
