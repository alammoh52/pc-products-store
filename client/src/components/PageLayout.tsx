import styled from "styled-components";

export const PageLayout = (props: any) => {
  const Navbar = styled.div`
    display: flex;
    width: 100%;
    background-color: lightblue;
    min-height: 40px;
  `;
  return (
    <>
      <Navbar>
        Products Shop
        <input />
      </Navbar>
      {props.children}
    </>
  );
};
