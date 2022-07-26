import { ProductTile } from "../components/ProductTile";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { device } from "../common/constants";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const StyledProductTile = styled(ProductTile)`
  margin: 8px;
  @media ${device.mobile} {
    margin: 0px;
    width: 100%;
  }
`;

export const ProductList = () => {
  const [itemList, updateItemList] = useState([]);
  const [pageError, setPageError] = useState(false);
  const [loading, setLoading] = useState(true);
  let [searchParams] = useSearchParams();
  let searchTerm = searchParams.get("title") || "";
  let category = searchParams.get("category") || "";

  useEffect(() => {
    async function fetchItems() {
      const params = new URLSearchParams({
        searchTerm,
        category,
      });
      let response = await fetch(
        `http://localhost:3001/items?${params.toString()}`
      );
      const itemsResponse = await response.json();
      updateItemList(itemsResponse);
      setLoading(false);
    }
    fetchItems().catch(() => setPageError(true));
  }, [searchParams]);

  return (
    <Wrapper>
      {loading && <>Loading...</>}
      {pageError && <>Sorry there was an error</>}
      {!loading && itemList.length === 0 && (
        <>No items found. Update your search terms to find other items.</>
      )}
      {itemList.length > 0 &&
        itemList.map(({ sku, title, price, category, rating }, i) => (
          <StyledProductTile
            key={title + i}
            sku={sku}
            title={title}
            price={price}
            category={category}
            rating={rating}
          />
        ))}
    </Wrapper>
  );
};
