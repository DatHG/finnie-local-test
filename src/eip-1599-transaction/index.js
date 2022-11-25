import {
  getGasFeeEthers,
  getGasFeeWeb3,
  loadNFTs,
  transferEthEthers,
  transferNFT,
  transferTokenEthers,
  getHexDataTransfer,
  transferTokenV2
} from './utils.js'
import _ from 'lodash'
import { ethers } from 'ethers'
const transactionResponse = await transferEthEthers()
console.log('transactionResponse', transactionResponse)

// const transactionResponse = await transferTokenEthers()
// console.log('transactionResponse', transactionResponse)

// const nfts = await loadNFTs('0x9d60e52628306A5b66226bF1A8f26e0DeAFd00d6')

// const tokenSchema = 'ERC1155'

// let nft
// if (tokenSchema === 'ERC721') {
//   nft = _.find(nfts, { name: 'Azuki #53' })
// } else {
//   nft = _.find(nfts, { name: 'Tarot Cards' })
// }

// const tokenAddress = _.get(nft, 'asset_contract.address')
// const tokenId = _.get(nft, 'token_id')

// const receipt = await transferNFT(
//   tokenAddress,
//   tokenId,
//   tokenSchema,
//   '0x9d60e52628306a5b66226bf1a8f26e0deafd00d6'
// )

// console.log(receipt)

// await transferTokenV2()
