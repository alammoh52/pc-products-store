import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductDetails } from "./ProductDetails";
import fetchMock from "jest-fetch-mock";

const mockProduct = {
  sku: "3",
  title: "TV",
  price: 99.31,
  category: "Hobbies",
  rating: 5,
};

const renderProductDetails = () =>
  render(
    <MemoryRouter initialEntries={["?title=title&category=category"]}>
      <ProductDetails />
    </MemoryRouter>
  );
describe("ProductDetails", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches product info + renders product details", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockProduct));
    renderProductDetails();
    await waitFor(() => {
    expect(screen.getByText(/TV/i)).toBeInTheDocument();
    expect(screen.getByText(/Hobbies/i)).toBeInTheDocument();
    expect(screen.getByText(/99.31/i)).toBeInTheDocument();
    });
  });
});
