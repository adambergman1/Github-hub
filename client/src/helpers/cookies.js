export const setCookie = (value) => {
  const date = new Date()
  const hours = 2
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000))
  document.cookie = 'token=' + value + '; expires=' + date.toUTCString() + '; HttpOnly; Secure'
}

export const getCookie = () => {
  const cookie = {}
  document.cookie.split(';').forEach((el) => {
    const [k, v] = el.split('=')
    cookie[k.trim()] = v
  })
  return cookie.token
}

export default getCookie
