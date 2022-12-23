import axios from "axios"
const baseURL = '/api/notes/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  return axios.get(baseURL)
    .then(response => response.data)
}

const create = async (newNote) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseURL, newNote, config)
  return response.data
}

const update = (changedNote, id) => {
  return axios.put(baseURL + id, changedNote)
    .then(response => response.data)
}

export default { getAll, create, update, setToken }
