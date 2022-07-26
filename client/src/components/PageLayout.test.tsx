import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { PageLayout } from "./PageLayout";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));
const renderPageLayout = () =>
  render(
    <MemoryRouter initialEntries={["?title=title&category=category"]}>
      <PageLayout>Children</PageLayout>
    </MemoryRouter>
  );
describe("PageLayout", () => {
  it("renders page layout", () => {
    renderPageLayout();
    expect(screen.getByText(/Products Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Select a category/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Children/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("search-button"));
    expect(mockNavigate).toHaveBeenCalledWith(
      "/?title=title&category=category"
    );
  });
  it("renders children", () => {
    renderPageLayout();
    expect(screen.getByText(/Children/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("search-button"));
    expect(mockNavigate).toHaveBeenCalledWith(
      "/?title=title&category=category"
    );
  });
  it("fires search call", () => {
    renderPageLayout();
    fireEvent.click(screen.getByTestId("search-button"));
    expect(mockNavigate).toHaveBeenCalledWith(
      "/?title=title&category=category"
    );
  });
});
