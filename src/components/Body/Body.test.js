import { render, screen } from '@testing-library/react';
import Body from './Body';


describe('Body component', () => {
  test('renders Bar and Line components', () => {
    render(<Body />);
    expect(screen.queryByRole('bar')).not.toBeInTheDocument();
    expect(screen.queryByRole('line')).not.toBeInTheDocument();
  });
  test("renders body", () => {
    render(<Body />);
    const bodyElement = screen.getByTestId("body");
    expect(bodyElement).toBeInTheDocument();
  });
  
});
