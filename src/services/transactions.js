import url from '../configs/url'

export const fetchCompleteTransactions = async (card_id, offset, limit) => {
  const response = await fetch(
    url +
      'offline_transaction/complete?card_id=' +
      card_id +
      '&offset=' +
      offset +
      '&limit=' +
      limit
  )
  return await response.json()
}
