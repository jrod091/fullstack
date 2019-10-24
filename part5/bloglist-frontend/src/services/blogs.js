import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async (id,newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`,newObject)
  return res.data
}

const del = async (id,) => {
  const req = await axios.delete(`${baseUrl}/${id}`, {headers: { Authorization: token }})
  return req.data
}

export default { getAll, create, update, del, setToken }