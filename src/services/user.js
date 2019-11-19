import url from '../configs/url'

export const fetchUserByEmail = async email => {
  const response = await fetch(url + 'users?email=' + email)
  return await response.json()
}
