import styled from "styled-components";
import { ProductTileProps } from "../common/constants";

const Wrapper = styled.a`
  padding: 8px;
  border: 1px solid;
  text-align: center;
  text-decoration: none;
  color: black;
`;

export const ProductTile = ({
  title,
  rating,
  price,
  category,
  className,
  sku,
}: ProductTileProps) => {
  return (
    <Wrapper href={`/${sku}`} className={className}>
      <img alt={`Product sku: ${sku}`} src="/images/product-img.svg" />
      <>
        <p>{title}</p>
        {[...Array(rating)].map((e, i) => (
          <span key={i}>★</span>
        ))}
        <p>${price}</p>
        <p>{category}</p>
      </>
    </Wrapper>
  );
};
