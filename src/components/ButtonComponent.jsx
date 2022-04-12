import React from "react";
import styled from "styled-components";

const ButtonStyles = styled.button`
	display: flex;
	align-items: center;
	padding: ${props => (props.smallPadding ?  "6px 12px" : "8px 16px")};
	border: ${props => (props.borderBlack ?"rgb(0,0,0)" : props.borderGreenDark ?  props.theme.colors.greenDark : 0)};
	border: ${props => (props.borderEnabled ?  "2px solid" : 0)};
	border-radius: 6px;
	background: ${props => (
		props.bgLightRed ? "rgb(255,127,127)" : 
		props.bgGrey ? "rgb(225,225,225)" : 
		props.bgWhite ? props.theme.colors.light : 
		props.bgRedDark ? props.theme.colors.redDark : 
		props.bgGreenDark ? props.theme.colors.greenDark : 
		props.bgGreenLight ? props.theme.colors.greenLight 
		: props.theme.colors.greenDark)}; // default one
	color: ${(props) => (
		props.colorGreenDark ? props.theme.colors.greenDark : 
		props.colorGrey ? "rgb(128,128,128)" : 
		props.colorBlack ? "rgb(0,0,0)"
		: props.theme.colors.light)}; // default one
	cursor: ${props => (props.cursorDisabled ?  "disabled" : "pointer")};

	&:hover {
    color: ${props => (
			props.hoverColorGreenLight ?  props.theme.colors.greenLight : 
			props.hoverColorGreenDark ?  props.theme.colors.greenDark 
			: "")}; // default one
    background: ${props => (
			props.hoverbgColorLightRed ? "rgb(255,127,127)" : 
			props.hoverbgColorDarkRed ? "RGB(209, 26, 42)" : 
			props.hoverbgColorGreenLight ? props.theme.colors.greenLight : 
			props.hoverbgColorGreenDark ?  props.theme.colors.greenDark 
			: "")}; // default one
  }

  svg {
    margin-left: -7.5px;
    margin-right: 10px;
    fill: ${(props) => props.theme.colors.light};
  }

  &:first-child svg {
    fill: ${(props) => props.theme.colors.greenDark};
  }
`;

export const ButtonComponent = ({
	children, 
	onClick, 
	smallPadding, 
	cursorDisabled, 
	borderEnabled, 
	borderBlack, 
	borderGreenDark, 
	colorBlack, 
	colorGreenDark, 
	hoverColorGreenDark, 
	hoverColorGreenLight, 
	bgWhite, 
	bgGrey, 
	bgLightRed, 
	bgRedDark, 
	bgGreenDark, 
	bgGreenLight, 
	hoverbgColorGreenDark, 
	hoverbgColorGreenLight, 
	hoverbgColorDarkRed, 
	hoverbgColorLightRed,
	colorGrey
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

	return (
		<ButtonStyles 
			type="button"
			onClick={handleClick}
			borderGreenDark={borderGreenDark} 
			bgWhite={bgWhite} 
			colorGreenDark={colorGreenDark} 
			borderEnabled={borderEnabled} 
			smallPadding={smallPadding} 
			hoverbgColorGreenLight={hoverbgColorGreenLight} 
			bgGreenDark={bgGreenDark} 
			bgGreenLight={bgGreenLight} 
			hoverColorGreenDark={hoverColorGreenDark} 
			hoverbgColorGreenDark={hoverbgColorGreenDark} 
			hoverColorGreenLight={hoverColorGreenLight} 
			cursorDisabled={cursorDisabled} 
			colorBlack={colorBlack} 
			bgGrey={bgGrey} 
			borderBlack={borderBlack} 
			bgLightRed={bgLightRed} 
			bgRedDark={bgRedDark} 
			hoverbgColorDarkRed={hoverbgColorDarkRed} 
			hoverbgColorLightRed={hoverbgColorLightRed}
			colorGrey={colorGrey}
			>
			{children}
		</ButtonStyles>
	)
}
