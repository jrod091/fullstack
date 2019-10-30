import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

const createNew = async content => {
    const object = { content, id: getId(), votes: 0 }
    const res = await axios.post(baseURL,object)
    return res.data
}

const voteUp = async (id,updateObject) => {
    const object = {...updateObject, votes: updateObject.votes+1}
    const res = await axios.put(`${baseURL}/${id}`,object)

    return res.data
}

export default { getAll, createNew, voteUp }