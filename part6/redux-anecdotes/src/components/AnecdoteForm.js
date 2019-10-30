import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const anecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.content.value

        event.target.content.value = ''

        props.createAnecdote(content)

        props.setMessage(`Added anecdote with title [${content}]`,5)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name='content' />
            <button type='sumbit'>create</button>
        </form>
    )
}

export default connect(null, { createAnecdote, setMessage })(anecdoteForm)