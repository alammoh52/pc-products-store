import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { device, ProductTileProps } from "../common/constants";

const Wrapper = styled.div`
  display: flex;
  padding: 16px;
  @media ${device.mobile} {
    flex-direction: column;
  }
`;
const Details = styled.div`
  width: 100%;
  padding-left: 16px;
  @media ${device.mobile} {
    text-align: center;
    padding: 0px;
  }
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
const ImageWrapper = styled.div`
  max-width: 500px;
  @media ${device.mobile} {
    margin: auto;
  }
`;
const StyledImage = styled.img`
  max-width: 100%;
`;

const Ratings = styled.span`
  color: gold;
`;

const Price = styled.span`
  color: green;
`;

const BackButton = styled.button`
  height: 30px;
  width: 80px;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid grey;
  background-color: white;
  margin: 20px;
  :hover{
    background-color: grey;
    color: white;
  }
  :active{
    background-color: white;
    color: black;
  }
`;

export const ProductDetails = () => {
  const navigate = useNavigate();
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
    <>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Wrapper>
        <ImageWrapper>
          <StyledImage alt={`Product sku: ${product.sku}`} src={product.src} />
        </ImageWrapper>
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
              <Ratings key={i}>★</Ratings>
            ))}
          </PropertyValuePair>
          <hr />
          <PropertyValuePair>
            <Property>Price: </Property>
            <Price>${product.price}</Price>
          </PropertyValuePair>
        </Details>
      </Wrapper>
    </>
  );
};
