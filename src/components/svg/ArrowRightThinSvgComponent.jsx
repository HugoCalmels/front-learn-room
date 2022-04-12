import React from 'react';
import styled from "styled-components";

const ArrowRightThinSvgStyles = styled.div`
  display: inline-inline-block;

  .greenDark {
    fill: ${(props) => props.theme.colors.greenDark};
  }
`;

const ArrowRightThinSvgComponent = ({width, height, className}) => {
  return (
    <ArrowRightThinSvgStyles>
      <svg width={width} height={height} className={className} 
          xmlns="http://www.w3.org/2000/svg"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/>
      </svg>
    </ArrowRightThinSvgStyles>
  );
};

export default ArrowRightThinSvgComponent;