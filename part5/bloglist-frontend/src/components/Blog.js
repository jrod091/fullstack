import React, {useState} from 'react'

const Blog = ({ blog, user, plusOne, del }) => {
  const [all, setAll] = useState(false)

  const toggleAll = () => setAll(!all)

  if(all) {
    if(user === blog.user.id) {
      return (
        <div className='blogEntry'>
          <div className='eachBlog' onClick={toggleAll}>
            <div className='entry'>
              <strong>Title: </strong>{blog.title}
            </div>
            <div className='entry'>
              <strong>Author: </strong>{blog.author}
            </div>
            <div className='entry'>
              <strong>URL: </strong><a href={blog.url}>{blog.url}</a>
            </div>
            <div className='entry'>
              <strong>Likes: </strong>{blog.likes} <button onClick={() => plusOne(blog)}>like</button>
            </div>
            <div className='entry'>
              <strong>Owner: </strong>{blog.user.name}
            </div>
            <button onClick={() => del(blog.id)}>remove</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='blogEntry'>
          <div className='eachBlog' onClick={toggleAll}>
            <div className='entry'>
              <strong>Title: </strong>{blog.title}
            </div>
            <div className='entry'>
              <strong>Author: </strong>{blog.author}
            </div>
            <div className='entry'>
              <strong>URL: </strong><a href={blog.url}>{blog.url}</a>
            </div>
            <div className='entry'>
              <strong>Likes: </strong>{blog.likes} <button onClick={() => plusOne(blog)}>like</button>
            </div>
            <div className='entry'>
              <strong>Owner: </strong>{blog.user.name}
            </div>
          </div>
        </div>
      )
    }
  } else {
    return (
      <div className='blogEntry'>
        <div className='eachBlog' onClick={toggleAll}>
          <div className='entry'>
            <strong>Title: </strong>{blog.title}
          </div>
          <div className='entry'>
            <strong>Author: </strong>{blog.author}
          </div>
        </div>
      </div>
    )
  }
}

export default Blog