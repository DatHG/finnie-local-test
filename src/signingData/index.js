import { ethers } from 'ethers'
import { network, providerAPIKey, mnemonic } from './constant.js'
import { ecsign, stripHexPrefix } from 'ethereumjs-util'
import { concatSig } from '@metamask/eth-sig-util'
import { getInternalError, getSdkError } from '@walletconnect/utils'
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'

// const provider = new ethers.providers.InfuraProvider(network, providerAPIKey)

// const wallet = ethers.Wallet.fromMnemonic(mnemonic)
// const signer = wallet.connect(provider)

// function convertHexToUtf8(value) {
//   if (ethers.utils.isHexString(value)) {
//     return ethers.utils.toUtf8String(value)
//   }
//   return value
// }

// const message =
//   '0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0'

// console.log(message)
// console.log(message.length)
// console.log(signer.privateKey)
// // const signedMessage = await signer.signMessage(Buffer.from(message, 'hex'))
// const signedMessage = ecsign(
//   Buffer.from(stripHexPrefix(message), 'hex'),
//   Buffer.from(stripHexPrefix(signer.privateKey), 'hex')
// )

// console.log(signedMessage)

// console.log(concatSig(signedMessage.v, signedMessage.s, signedMessage.r))

// const signedMsg = await signer.signMessage(ethers.utils.hashMessage(message))
// console.log(signedMsg)

const id = 123
console.log(
  formatJsonRpcError(id, getInternalError('NO_MATCHING_KEY').message)
) 
const WC_ETH_CHAIN_ID = {
  MAINNET: 'eip155:1',
  GOERLI: 'eip155:5'
}

console.log(Object.values(WC_ETH_CHAIN_ID))