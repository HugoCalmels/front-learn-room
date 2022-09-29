import FiguresComponent from "components/FiguresComponent";
import React, { useState } from "react";
import { v4 as uuid_v4 } from "uuid";
import styled from "styled-components";

import TopPageButtonComponent from "components/TopPageButtonComponent";
import LoaderSpinnerComponent from "components/LoaderSpinnerComponent";
import { useContext } from "react/cjs/react.development";
import FlashContext from "FlashContext";

const MoocListStyled = styled.div`
  margin-top: 6rem;
`;

export const MoocList = () => {
  const [moocData, setMoocData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const flash = useContext(FlashContext);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getCourses();
  }, []);

  const getCourses = async () => {
    const config = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };

    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}courses`,
      config
    ).catch((error) => error);

    console.log('---------')
    console.log(`${process.env.REACT_APP_API_URL}courses`)
    console.log('---------')
    console.log(res)
    console.log('---------')
  
      const data = await res.json();
      setMoocData(data);
    console.log('---------')
    console.log(data)
    console.log('---------')
    setIsLoading(false);
  };

  return (
    <MoocListStyled>
      <TopPageButtonComponent />
      <h1>MoocList</h1>
      <p className="subTitle">here you make your mind about your path</p>
      {!isLoading ? (
        <div className="row row-bg">
          {moocData.map((item) => (
            <FiguresComponent
              data={item}
              link={`courses/${item.id}`}
              key={uuid_v4()}
            />
          ))}
        </div>
      ) : (
        <LoaderSpinnerComponent isLoading={isLoading} />
      )}
    </MoocListStyled>
  );
};
