import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

test('renders expectation', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  const expectationElement = screen.getByText(/Records list will be here/i)
  expect(expectationElement).toBeInTheDocument()
})
