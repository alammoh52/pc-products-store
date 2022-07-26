import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductList } from "./ProductList";
import fetchMock from "jest-fetch-mock";

const mockProductList = [
  {
    sku: "3",
    title: "TV",
    price: 99.31,
    category: "Hobbies",
    rating: 5,
  },
];

const renderProductList = () =>
  render(
    <MemoryRouter initialEntries={["?title=title&category=category"]}>
      <ProductList />
    </MemoryRouter>
  );
describe("ProductList", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches product list + renders list", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockProductList));
    renderProductList();
    await waitFor(() => {
      expect(screen.getByText(/TV/i)).toBeInTheDocument();
      expect(screen.getByText(/Hobbies/i)).toBeInTheDocument();
      expect(screen.getByText(/99.31/i)).toBeInTheDocument();
    });
  });
});
