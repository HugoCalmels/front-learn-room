import React from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
  padding: ${(props) => (props.smallPadding ? "4px 8px" : "8px 16px")};
  border: ${(props) =>
    props.borderGreenDark ? props.theme.colors.darkLight : 0};
  border: ${(props) => (props.borderEnabled ? "2px solid" : 0)};
  border-radius: 6px;
  background-color: ${(props) =>
    props.bgLight ? props.theme.colors.light : props.theme.colors.greenLight};
  color: ${(props) => props.theme.colors.greenDark};
  cursor: pointer;
  -webkit-transition: all 300ms ease;
  -moz-transition: all 300ms ease;
  -ms-transition: all 300ms ease;
  -o-transition: all 300ms ease;
  transition: all 300ms ease;
  font-size: ${(props) => (props.smallFontSize ? "12px" : "")};
  margin: ${(props) => (props.marginAuto ? "auto" : "")};

  &:hover {
    color: ${(props) =>
      props.hoverColorGreenDark
        ? props.theme.colors.greenDark
        : props.theme.colors.greenLight};
    background-color: ${(props) =>
      props.hoverbgColorGreenLight
        ? props.theme.colors.greenLight
        : props.theme.colors.greenDark};
  }
`;

const SubmitButtonComponent = ({
  children,
  type,
  smallPadding,
  smallFontSize,
  bgLight,
  borderGreenDark,
  borderEnabled,
  hoverbgColorGreenLight,
  hoverColorGreenDark,
  marginAuto,
}) => {
  return (
    <SubmitButton
      type={type === "submit" ? "submit" : "button"}
      smallPadding={smallPadding}
      smallFontSize={smallFontSize}
      bgLight={bgLight}
      borderGreenDark={borderGreenDark}
      borderEnabled={borderEnabled}
      hoverbgColorGreenLight={hoverbgColorGreenLight}
      hoverColorGreenDark={hoverColorGreenDark}
      marginAuto={marginAuto}
    >
      {children}
    </SubmitButton>
  );
};

export default SubmitButtonComponent;
