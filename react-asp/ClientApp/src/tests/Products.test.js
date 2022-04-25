import { render, screen } from '@testing-library/react';
import { Products } from '../components/Product/Products';

jest.mock("react-router", () => {
  return {
    ...jest.requireActual("react-router"),
    useLocation: jest.fn(),
  }
});

describe("Products", () => {
  beforeEach(() => {
    render(<Products />);
  });

  test('should render h1', () => {
    //Assert
    expect(screen.getByText(/products/i).textContent).toEqual("Products");
  });

  test('should not render table while loading', () => {
    //Assert
    expect(screen.queryByText(/name/i)).toBeNull();
  });

});