import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders expectation', () => {
  render(<App />);
  const expectationElement = screen.getByText(/Markdiary will be here/i);
  expect(expectationElement).toBeInTheDocument();
});
