export default httpClient => ({
  history: async () => {
    const response = await httpClient.get('/api/transactions/history')
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
  new: async ({type, value}) => {
    const response = await httpClient.post('/api/transactions/new', {
      type,
      value
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
})
