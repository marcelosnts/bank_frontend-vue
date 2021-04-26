export default httpClient => ({
  signup: async ({ name, email, password, password_confirmation }) => {
    const response = await httpClient.post('/api/auth/signup', {
      name,
      email,
      password,
      password_confirmation
    })
    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.message
      }
    }

    return {
      data: response.data,
      errors
    }
  },
  login: async ({ email, password, remember_me }) => {
    const response = await httpClient.post('/api/auth/login', {
      email,
      password,
      remember_me
    })
    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.message
      }
    }

    return {
      data: response.data,
      errors
    }
  },
  getMe: async () => {
    const response = await httpClient.get('/api/auth/me')

    return { data: response.data }
  },
  logout: async () => {
    const response = await httpClient.get('/api/auth/logout')

    return { data: response.data }
  }
})
