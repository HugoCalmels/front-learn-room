import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

import { ButtonComponent } from 'components/ButtonComponent';

const InternalServerErrorStyled = styled.div`
  min-height: calc(100vh - 48px);
  background-color:  ${(props) => props.theme.colors.greenLight};

  .giphy-group {
    position: relative;
    top: ${(props) => props.theme.paddings.NavLaptop};
    width: 100%;
    height: 0;
    padding-bottom: 54%;
    border: 0;
  }

  .giphy-embed,.giphy-body {
    position: absolute;
    z-index: 1;
  }

  .giphy-body {
    top: calc(${(props) => props.theme.paddings.NavLaptop}*2);
    left: ${(props) => props.theme.paddings.NavLaptop};
    z-index: 2;
    width: 100%;
    max-width: 250px;
    padding: 15px 25px;
    border-radius: 10px;
    background-color: rgba(255,255,255,.5);

    h1 {
      margin-bottom: 1.5rem;
      text-align: left;
      text-transform: uppercase;
    }

    button {
      width: auto;
      margin-top: 1.25rem;
    }

    p {
      margin: .25rem 0;
    }
  }
`;

export const InternalServerErrorPage = () => {
  const history = useHistory();

  const handleClick = () => history.goBack();

  return (
    <InternalServerErrorStyled>
      <div className="giphy-group">
        <iframe src="https://giphy.com/embed/VYcRNU4P3vyM" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                className="giphy-embed" 
                allowFullScreen></iframe>
      </div>
      <div className="giphy-body">
        <h1>Error 500</h1>
        <p><strong>Be careful!</strong></p>
        <p>Internal server error.</p>
        <ButtonComponent onClick={handleClick}>Back</ButtonComponent>
      </div>
    </InternalServerErrorStyled>
  )
}
