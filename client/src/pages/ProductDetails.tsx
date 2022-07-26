import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProductTileProps } from "../common/constants";

const Wrapper = styled.div`
  display: flex;
  padding: 16px;
`;
const Details = styled.div`
  width: 100%;
`;
const Property = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  color: grey;
`;
const PropertyValuePair = styled.div`
  margin-bottom: 8px;
  margin-top: 4px;
`;

export const ProductDetails = () => {
  const [product, setProduct] = useState({} as ProductTileProps);
  const [pageError, setPageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function fetchItem() {
      let response = await fetch(`http://localhost:3001/${params.sku}`);
      const itemResponse = await response.json();
      setProduct(itemResponse);
      setLoading(false);
    }
    fetchItem().catch(() => setPageError(true));
  }, [params]);
  if (pageError) {
    return <>Sorry there was an error</>;
  }
  if (!loading && Object.keys(product).length === 0) {
    return (
      <>
        Item not found. Please return <Link to={"/"}>home</Link>
      </>
    );
  }
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <Wrapper>
      <img alt={`Product sku: ${product.sku}`} src="/images/product-img.svg" />
      <Details>
        <h3>{product.title}</h3>
        <hr />
        <PropertyValuePair>
          <Property>Sku: </Property>
          <Value>{product.sku}</Value>
        </PropertyValuePair>
        <PropertyValuePair>
          <Property>Category: </Property>
          <Value>{product.category}</Value>
        </PropertyValuePair>
        <PropertyValuePair>
          <Property>Rating: </Property>
          {[...Array(product.rating)].map((e, i) => (
            <span key={i}>★</span>
          ))}
        </PropertyValuePair>
        <hr />
        <PropertyValuePair>
          <Property>Price: </Property>
          <Value>${product.price}</Value>
        </PropertyValuePair>
      </Details>
    </Wrapper>
  );
};
