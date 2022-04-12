import React from "react";
import styled from "styled-components";

const DescIntoFigureStyles = styled.figure`
  position: relative;
  margin-left: 0;
  margin-right: 0;
  border-radius: 1rem;
  display: inline-block;
  color: ${(props) => props.theme.colors.light};
  overflow: hidden;
  height: 200px;
  width: 350px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .swiper-slide {
    width: auto;
  }

  figcaption {
    position: absolute;
    bottom: 15px;
    left: 30px;
    right: 30px;
    max-width: 300px;
  }
  h3 {
    text-shadow: 2px 2px 2px #000000;
  }
  @media ${(props) => props.theme.breakpoints.mobile} {
    img {
      height: 180px;
    }
  }
  @media ${(props) => props.theme.breakpoints.mobile} {
    width: 280px;
  }
`;

const DescIntoFigureComponent = ({ data }) => {
  return (
    <DescIntoFigureStyles style={{ backgroundImage: `url(${data.image_url}` }}>
      <figcaption>
        <h3>{data.title}</h3>
      </figcaption>
    </DescIntoFigureStyles>
  );
};

export default DescIntoFigureComponent;
