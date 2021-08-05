
const get = (key) => localStorage.getItem(key)

const goToHome = () => {
  window.location.href = '/'
}

export const buildReq = (...handlers) => {
  let composed = handlers[handlers.length - 1]()
  for (let i = handlers.length - 2; i >= 0; i--) {
    const res = handlers[i]()
    composed = {...res, ...composed}
  }
  console.log(composed)
  return composed
}

export const withCredentials = (handler = () => ({})) => {
  const [userId, password] = [get('userId'), get('password')]
  if (userId === null || password === null)
    goToHome()
  return {
    userId: userId,
    password: password,
    ...handler()
  }
}

export const withDataToPost = (data) => (handler = () => ({})) => ({
  dataToPost: data,
  ...handler()
})

export const withMethod = (method) => (handler = () => ({})) => ({
  method: method,
  ...handler()
})

export const withArg = (name, value) => (handler = () => ({})) => {
  const res = {}
  res[name] = value
  return { ...res, ...handler() }
}
