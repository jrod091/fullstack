import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  const compare = (a,b) => {
    let comparison = 0

    if (a.votes < b.votes) {
      comparison = 1
    } else {
      comparison = -1
    }

    return comparison
  }

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data).sort(compare)
    case 'INIT_ANECDOTES':
      return action.data.sort(compare)
    case 'CAST_VOTE':
      const id = action.data.id

      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data).sort(compare)
    default:
      return state.sort(compare)
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdotesService.voteUp(anecdote.id,anecdote)
    dispatch({
      type: 'CAST_VOTE',
      data: votedAnecdote
    })
  }
}

export default reducer