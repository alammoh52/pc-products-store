import { render, screen } from "@testing-library/react";
import { ProductTile } from "./ProductTile";

const props = {
  title: "title",
  rating: 5,
  price: 25,
  category: "Essentials",
};

describe("ProductTile", () => {
  it("renders product info", () => {
    render(<ProductTile {...props} />);
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/Essentials/i)).toBeInTheDocument();
    expect(screen.getByText("$25")).toBeInTheDocument();
  });
});
