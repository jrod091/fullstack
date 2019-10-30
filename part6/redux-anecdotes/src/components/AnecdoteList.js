import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { filterChange } from '../reducers/filterReducer'
import { setMessage }from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const voteUp = (anecdote) => {
        props.vote(anecdote)
        props.setMessage(`voted up [${anecdote.content}]`,5)
    }

    const style = { marginBottom: 10 }

    return (
        <>
            <div style={style}>
                filter <input onChange={(event) => props.filterChange(event.target.value)} />
            </div>
            <div>
                {props.anecdotesToShow.map(anecdote =>
                    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => voteUp(anecdote)} />
                )}
            </div>
        </>
    )
}

const anecdotesToShow = ({anecdotes, filter}) => {
    return filter === '' ? anecdotes : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
}

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    vote,
    setMessage,
    filterChange
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)