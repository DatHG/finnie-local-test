export const TRANSACTION_METHOD = {
  ERC20_TRANSFER: 'transfer',
  ERC1155_TRANSFER: 'safeTransferFrom',
  ERC721_TRANSFER_WITH_DATA: 'safeTransferFrom(address,address,uint256,bytes)',
  ERC721_TRANSFER: 'safeTransferFrom(address,address,uint256,bytes)',
  SET_APPROVAL_FOR_ALL: 'setApprovalForAll',
  ERC721_TRANSFER_FROM: 'transferFrom',
  MINT_COLLECTIBLES: 'mintCollectibles',
  APPROVE: 'approve'
}

export const network = 'goerli'

export const providerAPIKey = 'f811f2257c4a4cceba5ab9044a1f03d2'