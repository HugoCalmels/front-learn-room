import React from "react";
import * as moment from "moment";
import styled from "styled-components";

import AvatarSvgComponent from "./svg/AvatarSvgComponent";
import AvatarCreatorSvgComponent from "./svg/AvatarSvgCreatorComponen";

const TeamStyles = styled.li`
  margin-bottom: 15px;
  padding: 7.5px 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.greenDark};
  border-radius: 1rem;
  overflow: hidden;

  @media (max-width: ${(props) => props.theme.breakpoints.mobileMaxWidth}) {
    flex-direction: column;

    & > div {
      margin: 5px 0;
    }
  }

  & > div {
    display: flex;
    align-items: center;
  }

  .titleKey {
    margin-right: 7.5px;
  }

  svg {
    margin-right: 15px;
    fill: ${(props) => props.theme.colors.greenDark};
  }
`;

const TeamComponent = ({ data, idCreator, isCreator }) => {
  const sizeSvg = 25;
  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    setDate(moment(data?.created_at).format("YYYY-MM-DD"));
  }, []);

  return (
    <>
      {
        // Case: CAPTAIN
        isCreator === "true" && data?.id === idCreator ? (
          <TeamStyles>
            <div>
              <AvatarCreatorSvgComponent width={sizeSvg} height={sizeSvg} />
              <strong className="titleKey">Captain: </strong>
              <span>{data?.email}</span>
            </div>
            <div>
              <span>{date}</span>
            </div>
          </TeamStyles>
        ) : (
          ""
        )
      }
      {
        // Case: MEMBER
        isCreator === "false" && data?.id !== idCreator ? (
          <TeamStyles>
            <div>
              <AvatarSvgComponent width={sizeSvg} height={sizeSvg} />
              <span className="titleKey">Member: </span>
              <span>{data?.email}</span>
            </div>
            <div>
              <span>{date}</span>
            </div>
          </TeamStyles>
        ) : (
          ""
        )
      }
    </>
  );
};

export default TeamComponent;
