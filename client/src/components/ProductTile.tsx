import { useState } from "react";
import styled from "styled-components";
import { ProductTileProps } from "../common/constants";

const Wrapper = styled.a`
  padding: 8px;
  border: 3px solid grey;
  border-radius: 25px;
  text-align: center;
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
`;

const ViewProduct = styled.p`
  height: 20px;
`;

const Ratings = styled.span`
  color: gold;
`;

const Price = styled.p`
  color: green;
`;
const ImageWrapper = styled.div`
  width: 200px;
  margin: auto;
`;
const StyledImage = styled.img`
  max-width: 100%;
`;
const Details = styled.div`
  margin-top: auto;
`;

export const ProductTile = ({
  title,
  rating,
  price,
  className,
  sku,
  src,
}: ProductTileProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <Wrapper
      href={`/${sku}`}
      className={className}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <ImageWrapper>
        <StyledImage alt={`Product sku: ${sku}`} src={src} />
      </ImageWrapper>
      <Details>
        <p>{title}</p>
        <Ratings>
          {[...Array(rating)].map((e, i) => (
            <span key={i}>★</span>
          ))}
        </Ratings>
        <Price>${price}</Price>
      </Details>
      <ViewProduct>{isHovering && "View Product"}</ViewProduct>
    </Wrapper>
  );
};
