import { render, screen } from "@testing-library/react";
import App from "./App";

// Simple smoke test: the app should render the navbar title
test("renders the navbar title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Intern Student Portal/i);
  expect(titleElement).toBeInTheDocument();
});
