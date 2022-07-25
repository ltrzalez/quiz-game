import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders headers h1', () => {
  render(<App />);
  const linkElement = screen.getByText(/Preguntas/i);
  expect(linkElement).toBeInTheDocument();
});
