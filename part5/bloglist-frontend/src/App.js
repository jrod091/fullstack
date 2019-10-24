import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Message from './components/Message'
import Blog from './components/Blog'
import Create from './components/Create'
import Login from './components/Login'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('success')

  const username = useField('text')
  const password = useField('password')

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  // Check if user logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  // Initial load of blogs
  useEffect(() => {
    blogService.getAll()
      .then(initBlogs => setBlogs(initBlogs) )
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.bind.value, password: password.bind.value })

      window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)

      username.reset()
      password.reset()

      setMessageType('success')
      setMessage('Successfully logged in')
      setTimeout(() => setMessage(null),5000)
    } catch (e) {
      setMessageType('error')
      setMessage(e.response.data.error)
      setTimeout(() => setMessage(null),5000)
    }
  }

  const hanldeLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogCreateRef = React.createRef()

  const handleCreate = async (event) => {
    event.preventDefault()
    blogCreateRef.current.toggleVisibility()

    const newBlog = {
      title: title.bind.value,
      author: author.bind.value,
      url: url.bind.value
    }
    
    try {
      const addedBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(addedBlog))

      setMessageType('success')
      setMessage(`Added ${addedBlog.title}`)
      setTimeout(() => setMessage(null),5000)

      title.reset()
      author.reset()
      url.reset()
    } catch (e) {
      setMessageType('error')
      setMessage(e.response.data.error)
      setTimeout(() => setMessage(null),5000)
    }
  }

  const handleLikes = async (blog) => {
    const updateBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      await blogService.update(blog.id,updateBlog)
      const updatedBlogs = await blogService.getAll()

      setBlogs(updatedBlogs)
    } catch(e) {
      setMessageType('error')
      setMessage(e.response.data.error)
      setTimeout(() => setMessage(null),5000)
    }
  }

  const handleDelete = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const result = window.confirm(`Delete ${blog.title}?`)

    if (result) {
      try {
        await blogService.del(id)
        
        setMessageType('success')
        setMessage(`Deleted ${blog.title}`)
        setTimeout(() => setMessage(null),5000)

        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (e) {
        setMessageType('error')
        setMessage(e.response.data.error)
        setTimeout(() => setMessage(null),5000)
      }
    }
  }

  const loggedIn = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in <button onClick={hanldeLogout}>logout</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogCreateRef}>
        <Create
          title={title}
          author={author}
          url={url}
          handle={handleCreate}
        />
      </Togglable>
      {blogs.sort((a,b) => {
        if(a.likes > b.likes) {
          return -1
        } else {
          return 1
        }
      }).map(blog => 
        <Blog 
          key={blog.id}
          blog={blog}
          user={user.id}
          plusOne={handleLikes}
          del={handleDelete}
        />
      )}
    </div>
  )

  return (
    <div>
      <Message message={message} className={messageType} />
      {
        user === null ? 
        <Togglable buttonLabel='login'>
          <Login
            handle={handleLogin}
            username={username}
            password={password}
          />
        </Togglable> : 
        loggedIn()
      }
    </div>
  )
}

export default App