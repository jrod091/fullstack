import React from 'react'
import PropTypes from 'prop-types'

const Login = ({handle,username,password}) => {
    return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handle}>
        <div>
            username
            <input {...username.bind} />
        </div>
        <div>
            password
            <input {...password.bind} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
)}

Login.propTypes = {
    handle: PropTypes.func.isRequired
}

export default Login