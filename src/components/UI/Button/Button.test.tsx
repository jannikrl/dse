import { render } from '@testing-library/react';
import { Button } from './Button';

test('renders text on button', () => {
  const { getByText } = render(<Button>Lorem</Button>);

  expect(getByText(/Lorem/i)).toBeInTheDocument();
});
