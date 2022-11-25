import { ethers } from "ethers"

import MetamaskABI from '../abi/Metamask.json' assert { type: 'json' }
// import ERC1155 from '../abi/ERC1155.json' assert { type: 'json' }

import { network, providerAPIKey } from "./constants.js"

export const decodeTransactionData = async (activityHash) => {
  try {
    const interfaceABI = new ethers.utils.Interface(MetamaskABI)

    const web3 = new ethers.providers.InfuraProvider(network, providerAPIKey)

    const transaction = await web3.getTransaction(activityHash)
    const decodedData = interfaceABI.parseTransaction({
      data: transaction.data
    })

    return decodedData
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const getTransactionReceipt = async (id) => {
  const web3 = new ethers.providers.InfuraProvider(network, providerAPIKey)

  return web3.getTransactionReceipt(id)
}
