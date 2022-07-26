import styled from "styled-components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FormEvent, PropsWithChildren, useState } from "react";
import { categories, device } from "../common/constants";

const Navbar = styled.div`
  width: 100%;
  background-color: #484848;
`;

const NavbarItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px;
  @media ${device.mobile} {
    flex-direction: column;
  }
  @media ${device.desktop} {
    width: 70%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  @media ${device.mobile} {
    flex-direction: column;
  }
`;

const ChildrenWrapper = styled.div`
  margin: auto;
  @media ${device.desktop} {
    max-width: 1200px;
  }
`;

const StyledHomeButton = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  margin: 8px;
  color: white;
  font-size: 24px;
`;

const CategorySelect = styled.select`
  border: none;
  height: 40px;
  padding: 5px 15px 5px 5px;
  @media ${device.mobile} {
    margin-bottom: 8px;
    border-radius: 15px 15px;
  }
`;
const SearchInput = styled.input`
  border: none;
  padding: 5px 5px 5px 15px;
  height: 30px;
  border-top-left-radius: 15px 15px;
  border-bottom-left-radius: 15px 15px;
  @media ${device.mobile} {
    margin-bottom: 8px;
    border-radius: 15px 15px;
  }
`;
const SearchButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 5px 10px 5px 10px;
  height: 40px;
  border-top-right-radius: 15px 15px;
  border-bottom-right-radius: 15px 15px;
  background-color: white;

  :hover {
    background-color: orange;
    color: white;
  }
  :active {
    background-color: white;
    color: black;
  }

  @media ${device.mobile} {
    border-radius: 15px 15px;
  }
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
        <NavbarItems>
          <StyledHomeButton to="/">🏠 Products Shop</StyledHomeButton>
          <StyledForm onSubmit={onSubmit}>
            <SearchInput
              type="text"
              name="product-search-text"
              onChange={handleSearchChange}
              value={searchTerm}
              placeholder="Search item title"
            />
            <CategorySelect
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
            </CategorySelect>
            <SearchButton data-testid="search-button" onClick={searchItem}>
              🔎 Search
            </SearchButton>
          </StyledForm>
        </NavbarItems>
      </Navbar>
      <ChildrenWrapper>{props.children}</ChildrenWrapper>
    </>
  );
};
