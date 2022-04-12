import React from "react";
import anime from "animejs/lib/anime.es.js";
import styled from "styled-components";

import ArrowLeftSvgComponent from "./svg/ArrowLeftSvgComponent";

const TopPageButtonStyles = styled.button`
  position: fixed;
  top: 0;
  right: ${(props) => props.theme.paddings.NavLaptop};
  margin-top: calc(100vh - 6rem);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 50%;
  background-color: rgba(0, 89, 57, 0.5);
  -webkit-transition: all 300ms ease;
  -moz-transition: all 300ms ease;
  -ms-transition: all 300ms ease;
  -o-transition: all 300ms ease;
  transition: all 300ms ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 89, 57, 0.25);
  }

  svg {
    fill: ${(props) => props.theme.colors.light};
    transform: rotate(90deg);
  }
`;

const TopPageButtonComponent = () => {
  const handleClick = () => {
    const scrollElement =
      window.document.scrollingElement ||
      window.document.body ||
      window.document.documentElement;

    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 500,
      easing: "easeInOutQuad",
    });
  };

  return (
    <TopPageButtonStyles onClick={handleClick}>
      <ArrowLeftSvgComponent width="25" height="25" />
    </TopPageButtonStyles>
  );
};

export default TopPageButtonComponent;
