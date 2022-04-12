import React from "react";
import styled from "styled-components";

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: ${(props) => props.theme.colors.greenDark};
  opacity: 0;

  &.isShow {
    opacity: 0.5;
  }
`;

const OverlayComponent = ({ isShow }) => {
  return (
    <OverlayStyles
      id="overlay"
      className={isShow === true ? "isShow" : ""}
    ></OverlayStyles>
  );
};

export default OverlayComponent;
