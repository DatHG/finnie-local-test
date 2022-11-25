import Web3 from 'web3'
import { ethers } from 'ethers'

import axios from 'axios'
import _ from 'lodash'

import {
  network,
  providerAPIKey,
  mnemonic,
  tokenAddressUNI,
  opensea_api_testnet
} from './constants.js'
import ERC20 from '../abi/ERC20.json' assert { type: 'json' }
import ERC721 from '../abi/ERC721.json' assert { type: 'json' }
import ERC1155 from '../abi/ERC1155.json' assert { type: 'json' }

export const getGasFeeEthers = async () => {
  const provider = new ethers.providers.InfuraProvider(network, providerAPIKey)

  const baseFeePerGas = (await provider.getBlock('pending')).baseFeePerGas

  const maxPriorityFeePerGas = ethers.utils.parseUnits('3', 'gwei')

  const maxFeePerGas = maxPriorityFeePerGas.add(baseFeePerGas.mul('2'))

  const rawTx = {
    from: '0x9d60e52628306A5b66226bF1A8f26e0DeAFd00d6',
    to: '0x9d60e52628306a5b66226bf1a8f26e0deafd00d6',
    value: ethers.utils.parseEther('1.0'),
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas
  }

  const gasUsed = await provider.estimateGas(rawTx)

  const gasFee = gasUsed.mul(maxFeePerGas)

  return ethers.utils.formatEther(gasFee)
}

export const getGasFeeWeb3 = async () => {
  const provider = new Web3(`https://${network}.infura.io/v3/${providerAPIKey}`)

  const baseFeePerGas = Number(
    (await provider.eth.getBlock('pending')).baseFeePerGas
  )

  const maxPriorityFeePerGas = Number(provider.utils.toWei('3', 'gwei'))

  const maxFeePerGas = 2 * baseFeePerGas + maxPriorityFeePerGas

  const rawTx = {}
  rawTx.from = '0x9d60e52628306A5b66226bF1A8f26e0DeAFd00d6'
  rawTx.to = '0x9d60e52628306A5b66226bF1A8f26e0DeAFd00d6'
  rawTx.value = '0x0'
  rawTx.maxFeePerGas = provider.utils.toHex(maxFeePerGas)
  rawTx.maxPriorityFeePerGas = provider.utils.toHex(maxPriorityFeePerGas)
  console.log('rawTx', rawTx)

  const gasUsed = await provider.eth.estimateGas(rawTx)
  console.log('gasUsed', gasUsed)

  const gasFee = gasUsed * maxFeePerGas

  return provider.utils.fromWei(gasFee.toString(), 'ether')
}

export const transferEthEthers = async () => {
  const provider = new ethers.providers.InfuraProvider(network, providerAPIKey)

  const baseFeePerGas = (await provider.getBlock('pending')).baseFeePerGas

  const maxPriorityFeePerGas = ethers.utils.parseUnits('3', 'gwei')

  const maxFeePerGas = maxPriorityFeePerGas.add(baseFeePerGas.mul('2'))

  const wallet = ethers.Wallet.fromMnemonic(mnemonic)

  const address = wallet.address

  const rawTx = {
    from: address,
    to: address,
    value: ethers.utils.parseEther('0.0'),
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas
  }

  const signer = wallet.connect(provider)
  console.log('signer', await signer.getAddress())
  console.log('signer', ethers.utils.formatEther(await signer.getBalance()))

  const gasUsed = await signer.estimateGas(rawTx)

  const gasFee = gasUsed.mul(maxFeePerGas)

  console.log('gasFee', ethers.utils.formatEther(gasFee))

  const transactionResponse = signer.sendTransaction(rawTx)

  return transactionResponse
}

export const transferTokenEthers = async () => {
  const provider = new ethers.providers.InfuraProvider(network, providerAPIKey)

  const baseFeePerGas = (await provider.getBlock('pending')).baseFeePerGas

  const maxPriorityFeePerGas = ethers.utils.parseUnits('3', 'gwei')

  const maxFeePerGas = maxPriorityFeePerGas.add(baseFeePerGas.mul('2'))

  const wallet = ethers.Wallet.fromMnemonic(mnemonic)
  const signer = wallet.connect(provider)

  const tokenContract = new ethers.Contract(tokenAddressUNI, ERC20, signer)

  const to = wallet.address

  const decimals = await tokenContract.decimals()

  const value = ethers.utils.parseUnits('0.0001', decimals)

  const gasUsed = await tokenContract.estimateGas.transfer(to, value, {
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas
  })

  console.log('gasUsed', gasUsed.toNumber())
  const gasFee = gasUsed.mul(maxFeePerGas)

  console.log('gasFee', ethers.utils.formatEther(gasFee))

  const receipt = await tokenContract.transfer(to, value, {
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas
  })

  return receipt
}

export const loadNFTs = async (address) => {
  const url = `${opensea_api_testnet}/assets?owner=${address}&order_direction=desc&limit=50`
  const requestConfig = {}
  const { data } = await axios.get(url, requestConfig)

  const assets = _.get(data, 'assets') || []

  return assets
}


/**
 *
 * @param {*} tokenAddress: This can be derived from nftId in Finnie
 * @param {*} tokenId: This can be derived from nftId in Finnie
 * @param {*} tokenSchema: This can be derived from nftId in Finnie
 * @param {*} recipientAddress
 */
export const transferNFT = async (
  tokenAddress,
  tokenId,
  tokenSchema,
  recipientAddress
) => {
  console.log({ tokenAddress, tokenId, tokenSchema })
  const provider = new ethers.providers.InfuraProvider(network, providerAPIKey)

  /**
   * Basic gas field for EIP-1559 transaction
   *  */
  const baseFeePerGas = (await provider.getBlock('pending')).baseFeePerGas

  const maxPriorityFeePerGas = ethers.utils.parseUnits('3', 'gwei')

  const maxFeePerGas = maxPriorityFeePerGas.add(baseFeePerGas.mul('2'))

  /**
   *  NFT contract ABI
   * */
  const contractABI = tokenSchema === 'ERC721' ? ERC721 : ERC1155

  /**
   *  This signer can be create from private key in Finnie
   * */
  const wallet = ethers.Wallet.fromMnemonic(mnemonic)
  const signer = wallet.connect(provider)

  /**
   * Create NFT contract
   */
  const tokenContract = new ethers.Contract(tokenAddress, contractABI, signer)

  let gasUsed, receipt
  if (tokenSchema === 'ERC721') {
    receipt = await tokenContract['safeTransferFrom(address,address,uint256)'](
      wallet.address,
      recipientAddress,
      tokenId,
      {
        maxFeePerGas,
        maxPriorityFeePerGas
      }
    )
  } else {
    // ERC-1155
    gasUsed = await tokenContract.estimateGas[
      'safeTransferFrom(address,address,uint256,uint256,bytes)'
    ](wallet.address, recipientAddress, tokenId, '1', '0x00', {
      maxFeePerGas,
      maxPriorityFeePerGas
    })

    receipt = await tokenContract[
      'safeTransferFrom(address,address,uint256,uint256,bytes)'
    ](wallet.address, recipientAddress, tokenId, '1', '0x00', {
      maxFeePerGas,
      maxPriorityFeePerGas
    })
  }

  return receipt
}

export const getHexDataTransfer = (to, value) => {
  const iface = new ethers.utils.Interface(ERC20)

  return iface.encodeFunctionData('transfer', [to, value])
}

export const transferTokenV2 = async () => {
  const provider = new ethers.providers.InfuraProvider(network, providerAPIKey)

  // const baseFeePerGas = (await provider.getBlock('pending')).baseFeePerGas

  // const maxPriorityFeePerGas = ethers.utils.parseUnits('3', 'gwei')

  // const maxFeePerGas = maxPriorityFeePerGas.add(baseFeePerGas.mul('2'))

  const wallet = ethers.Wallet.fromMnemonic(mnemonic)
  const signer = wallet.connect(provider)

  const tokenContract = new ethers.Contract(tokenAddressUNI, ERC20, signer)

  const to = wallet.address

  const decimals = await tokenContract.decimals()

  const value = ethers.utils.parseUnits('0.0000', decimals)

  const data = getHexDataTransfer(to, value)
  const nonce = await provider.getTransactionCount(wallet.address, 'pending')
  const chainId = (await provider.getNetwork()).chainId

  const transaction = {
    nonce: nonce,
    // maxPriorityFeePerGas: ethers.utils.parseUnits('30', 'gwei'),
    // maxFeePerGas: ethers.utils.parseUnits('500', 'gwei'),
    gasLimit: 50000,
    type: 2,
    chainId: chainId,
    to: tokenAddressUNI,
    data: data
  }

  console.log('transaction', transaction)

  let rawTransaction = await wallet
    .signTransaction(transaction)
    .then(ethers.utils.serializeTransaction(transaction))
    .catch((e) => console.log(e))

  console.log('rawTransaction', rawTransaction)

  // rawTransaction = ethers.utils.serializeTransaction(rawTransaction)

  let parsedTransaction = ethers.utils.parseTransaction(rawTransaction)
  console.log('result', parsedTransaction)

  let sending = await provider.sendTransaction(rawTransaction)

  const receipt = await sending.wait()
  console.log('receipt', receipt)
}
