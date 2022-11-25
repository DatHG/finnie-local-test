import { ethers } from 'ethers'
import { decodeTransactionData, getTransactionReceipt } from './utils.js'

// console.log(
//   await decodeTransactionData(
//     '0x9aab645f0d0a15471a321c44d444c212695c84fc4c661bf949255dac87fbeda6'
//   )
// )

const receipt = await getTransactionReceipt(
  '0x9aab645f0d0a15471a321c44d444c212695c84fc4c661bf949255dac87fbeda6'
)
console.log('receipt', receipt)
console.log('gasUsed', receipt.gasUsed.toString())
console.log('cumulativeGasUsed', receipt.cumulativeGasUsed.toString())
console.log('effectiveGasPrice', receipt.effectiveGasPrice.toString())

const gasFee = receipt.gasUsed.mul(receipt.effectiveGasPrice)

console.log(gasFee.toString())
