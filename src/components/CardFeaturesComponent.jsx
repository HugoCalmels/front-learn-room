import React from "react";
import styled from "styled-components";

const HeaderStyles = styled.div`
  height: 100%;
  padding: 20px;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.isWhite === false
      ? (props) => props.theme.colors.greenLight
      : (props) => props.theme.colors.light};
  overflow: hidden;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.08);

  h4 {
    display: flex;
    align-items: center;
  }

  .icon-rounded {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 15px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.light};
  }

  .title,
  p {
    color: ${(props) =>
      props.isWhite === false
        ? (props) => props.theme.colors.greenDark
        : (props) => props.theme.colors.dark};
  }
`;

const CardCompoent = ({ data }) => {
  return (
    <HeaderStyles isWhite={data.isWhite}>
      <h4>
        {data.icon && <span className="icon-rounded">{data.icon}</span>}
        <span className="title">{data.title}</span>
      </h4>
      <p>{data.desc}</p>
    </HeaderStyles>
  );
};

export default CardCompoent;
