import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import DescIntoFigureComponent from 'components/DescIntoFigureComponent';
import ArrowRightThinSvgComponent from 'components/svg/ArrowRightThinSvgComponent';

SwiperCore.use([Pagination]);

const WeGotStyles = styled.div`
  width: 100%;
  margin: 3rem 0;

  h2,.title {
    max-width: ${(props) => props.theme.spacings.maxWidth};
    margin-left: auto;
    margin-right: auto;

    a {
      margin: 0 ${(props) => props.theme.paddings.NavLaptop};
      display: inline-flex;
      color: ${(props) => props.theme.colors.greenDark};

      span {
        margin-right: 15px;
      }
    }
  }

  h2 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    margin-left: ${(props) => props.theme.paddings.NavLaptop};
    margin-right: ${(props) => props.theme.paddings.NavLaptop};
    color: ${(props) => props.theme.colors.greenDark};
  }

  .slider-container {
    width: 100%;
    display: flex;
  }

  .swiper-container {
    max-width: 80%;
  }

  .swiper-slide {
    width: auto;
  }
`;

const WeGot = () => {

  const [moocData, setMoocData] = useState([]);

  useEffect(() => {
    getCourses();
  },[])

  const getCourses = async () => {
    const config = {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      }
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}courses`, config);
    const data = await res.json();

    try {
      setMoocData(data)
    }
    catch (err) {
      console.log('ERROR: ', err, '\nuser: ', data.status, ' - ', data.error)
    }
  }

  return (
    <WeGotStyles>
      <div className="title">
        <h2>We got</h2>
        <Link to="/courses">
          <span>See all courses</span>
          <ArrowRightThinSvgComponent width="25" 
                                      height="25" 
                                      className="greenDark"/>
        </Link>
      </div>
      <div className="slider-container">
        <Swiper slidesPerView={'auto'} 
                spaceBetween={15}>
          {moocData.map((item) => (
            <SwiperSlide key={uuid_v4()}>
              <DescIntoFigureComponent data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </WeGotStyles>
  );
};

export default WeGot;