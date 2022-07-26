import styled from "styled-components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FormEvent, PropsWithChildren, useState } from "react";
import { categories } from "../common/constants";

const Navbar = styled.div`
  display: flex;
  width: 100%;
  background-color: black;
  min-height: 40px;
  align-items: center;
`;

const ChildrenWrapper = styled.div`
  padding: 16px;
`;

const StyledHomeButton = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin: 8px;
`;

export const PageLayout = (props: PropsWithChildren) => {
  let [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("title") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  let navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchItem();
  };

  const searchItem = () =>
    navigate(`/?title=${searchTerm}&category=${category}`);

  const handleSearchChange = (event: FormEvent<HTMLInputElement>) => {
    const eventTarget = event.target as HTMLInputElement;
    setSearchTerm(eventTarget.value);
  };

  const handleCategoryChange = (event: FormEvent<HTMLSelectElement>) => {
    const eventTarget = event.target as HTMLSelectElement;
    console.log(eventTarget.value);
    setCategory(eventTarget.value);
  };
  return (
    <>
      <Navbar>
        <StyledHomeButton to="/">🏠 Products Shop</StyledHomeButton>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="product-search-text"
            onChange={handleSearchChange}
            value={searchTerm}
            placeholder="Search item title"
          />
          <select
            onChange={handleCategoryChange}
            value={category}
            name="categories"
            id="categories"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="">All</option>
            {categories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
          <button data-testid="search-button" onClick={searchItem}>Search 🔎</button>
        </form>
      </Navbar>
      <ChildrenWrapper>{props.children}</ChildrenWrapper>
    </>
  );
};
