import React from 'react';
import { v4 as uuid_v4 } from "uuid";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import CardFeaturesComponents from "../components/CardFeaturesComponent";

SwiperCore.use([Pagination]);

const TestominyStyles = styled.div`
  width: 100%;
  margin: 3rem 0;
  padding: 3rem 0;

  &.bgGreenLight {
    background-color: ${(props) => props.theme.colors.greenLight};
  }

  .testominyBody {
    width: 100%;
    max-width: ${(props) => props.theme.spacings.maxWidth};
    margin-left: auto;
    margin-right: auto;
    padding: 0 ${(props) => props.theme.paddings.NavLaptop};
  }

  h2 {
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.colors.greenDark};
  }
`;

const Testominy = ({bgColor}) => {
  const dataTestomine = [
    {
      title: "Jocelin Queau",
      desc: "I litteraly created this site because I thought it was useful.",
	    isWhite: true
    },
    {
      title: "Hugo Calmels",
      desc: "As a night bird, this tool saved my life.",
	    isWhite: true
    },
    {
      title: "Pierre-Henri Bord",
      desc: "The first time I coded with my girlfriend, my algorithm returned true.",
	    isWhite: true
    },
    {
      title: "Erwan Le Corre",
      desc: "Always keep your hovercraft full of eels.",
	    isWhite: true
    },
    {
      title: "Someone, somewhere",
      desc: "This site is ok, mayby, IDK...",
	    isWhite: true
    },
  ];

  return (
    <TestominyStyles className={bgColor}>
      <div className="testominyBody row">
        <h2>Testominy</h2>
        <Swiper 
                pagination={{ "clickable": true }}
				breakpoints={{
					"400": {
					  "slidesPerView": 2,
					  "spaceBetween": 10
					},
					"768": {
					  "slidesPerView": 4,
					  "spaceBetween": 30
					},
					"1024": {
					  "slidesPerView": 4,
					  "spaceBetween": 30
					}}}
				>
          {dataTestomine.map((item) => (
            <SwiperSlide key={uuid_v4()}>
              <CardFeaturesComponents data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </TestominyStyles>
  );
};

export default Testominy;