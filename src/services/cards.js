import url from '../configs/url'

export const fetchCards = async user_id => {
  const response = await fetch(url + 'cards?user_id=' + user_id)
  return await response.json()
}
