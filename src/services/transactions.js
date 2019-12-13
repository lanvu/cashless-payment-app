import url from '../configs/url'

export const fetchTransactions = async (card_id, status, offset, limit) => {
  const response = await fetch(
    url +
      'offline_transaction/' +
      status +
      '?card_id=' +
      card_id +
      '&offset=' +
      offset +
      '&limit=' +
      limit
  )
  return await response.json()
}
