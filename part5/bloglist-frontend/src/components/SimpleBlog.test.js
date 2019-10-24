import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
    title: 'test title',
    author: 'test author',
    likes: 1
}

test('renders title', () => {
    const component = render( <SimpleBlog blog={blog} /> )

    const info = component.container.querySelector('.info')

    expect(info).toHaveTextContent('test title')
})

test('renders author', () => {
    const component = render( <SimpleBlog blog={blog} /> )

    const info = component.container.querySelector('.info')
    expect(info).toHaveTextContent('test author')
})

test('renders likes', () => {
    const component = render( <SimpleBlog blog={blog} /> )

    const likes = component.container.querySelector('.likes')

    expect(likes).toHaveTextContent('1')
})

test('clicking the button twice calls the event handler twice', () => {
    const mockHandler = jest.fn()

    const { getByText } = render( <SimpleBlog blog={blog} onClick={mockHandler} /> )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})