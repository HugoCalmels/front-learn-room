import React from "react";
import styled from "styled-components";

const FooterStyles = styled.footer`
  padding: 15px 0;
  background-color: ${(props) => props.theme.colors.greenDark};
  color: ${(props) => props.theme.colors.light};

  .sub-footer {
    max-width: 970px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 ${(props) => props.theme.paddings.NavLaptop};
    display: flex;
    justify-content: center;
  }
`;

const FooterComponent = () => {
  return (
    <FooterStyles>
      <div className="sub-footer">
        <span>&copy; Learnroom 2021</span>
      </div>
    </FooterStyles>
  );
};

export default FooterComponent;
