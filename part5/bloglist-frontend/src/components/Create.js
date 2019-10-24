import React from 'react'

const Create = ({handle, title, author, url}) => (
    <form onSubmit={handle}>
      <div>
        title:
        <input {...title.bind} />
      </div>
      <div>
        author:
        <input {...author.bind} />
      </div>
      <div>
        url:
        <input {...url.bind} />
      </div>
      <button type='submit'>create</button>
    </form>
)

export default Create