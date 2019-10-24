import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    id: '1234',
    title: 'test title',
    author: 'test author',
    url: 'http://test.com',
    likes: 1,
    user: {
        id: '4321',
        name: 'test user'
    }
}

const user = '4321'

const component = render( <Blog blog={blog} user={user} /> )
component.debug()

test('only the name and author of the blog post are shown by default', () => {
    const visible = component.container.querySelector('.entry:last-child')

    expect(visible).toHaveTextContent('test author')
})

test('other information of the blog post becomes visible when clicked', () => {
    const component = render( <Blog blog={blog} user={user} /> )
    component.debug()
    const div = component.container.querySelector('.eachBlog')
    fireEvent.click(div)

    const last = component.container.querySelector('.entry:last-child')

    expect(last).toHaveTextContent('test user')
})