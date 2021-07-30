import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application title', () => {
  render(<App />);
  const textElement = screen.getByText("NASA Image Search");
  expect(textElement).toBeInTheDocument();
});
