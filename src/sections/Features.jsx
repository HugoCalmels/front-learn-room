import React from "react";
import { v4 as uuid_v4 } from "uuid";
import styled from "styled-components";

import CardFeaturesComponents from "../components/CardFeaturesComponent";
import DirectionSvgComponent from '../components/svg/DirectionSvgComponent';
import GlobeSvgComponent from '../components/svg/GlobeSvgComponent';
import HandshakeSvgComponent from '../components/svg/HandshakeSvgComponent';

const FeaturesStyles = styled.ul`
  max-width: ${(props) => props.theme.spacings.maxWidth};
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${(props) => props.theme.paddings.NavLaptop};

  .bgGreenLight {
    background-color: ${(props) => props.theme.colors.greenLight};
  }

  li {
	  margin-bottom: 1rem;
  }
`;

const Features = () => {
  const dataFeatures = [
    {
      icon: <DirectionSvgComponent width="25" height="25"/>,
      title: "Choose wisely your path",
      desc: "See the details for pros / cons and notes on key notions + others concept",
	    isWhite: false
    },
    {
      icon: <GlobeSvgComponent width="25" height="25"/>,
      title: "Choose your timezone",
      desc: "Because you need to collaborate, we only group you with people that have close timezone",
	    isWhite: false
    },
    {
      icon: <HandshakeSvgComponent width="25" height="25"/>,
      title: "Agree on some rules",
      desc: "As with every group, you must agree on some minimal rules to respect",
	    isWhite: false
    },
  ];

  return (
    <FeaturesStyles className="row">
      {dataFeatures.map((item) => (
        <li className="col-xs-12 col-sm-4" key={uuid_v4()}>
          <CardFeaturesComponents data={item} />
        </li>
      ))}
    </FeaturesStyles>
  );
};

export default Features;
