import React from "react";
import styled from "styled-components";

const CloseIconSvgStyle = styled.div`
  display: inline-inline-block;
  cursor: pointer;
  fill: transparent;

  .success {
    border: none !important;
    fill: ${(props) => props.theme.colors.greenDark};
  }
  .danger {
    border: none !important;
    fill: ${(props) => props.theme.colors.redDark};
  }
`;

const CloseIconSvgComponent = ({ width, height, className }) => {
  return (
    <CloseIconSvgStyle>
      <svg
        width={width}
        height={height}
        viewBox="0 0 66 66"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.59441 63.4056C5.71861 66.5298 10.7839 66.5298 13.9081 63.4056L33 44.3137L52.0919 63.4056C55.2161 66.5298 60.2814 66.5298 63.4056 63.4056C66.5298 60.2814 66.5298 55.2161 63.4056 52.0919L44.3137 33L63.4056 13.9081C66.5298 10.7839 66.5298 5.71861 63.4056 2.59441C60.2814 -0.52978 55.2161 -0.529781 52.0919 2.59441L33 21.6863L13.9081 2.59441C10.7839 -0.529786 5.71861 -0.529786 2.59441 2.59441C-0.529782 5.7186 -0.529783 10.7839 2.59441 13.9081L21.6863 33L2.59441 52.0919C-0.529782 55.2161 -0.529782 60.2814 2.59441 63.4056Z"
        />
      </svg>
    </CloseIconSvgStyle>
  );
};

export default CloseIconSvgComponent;
