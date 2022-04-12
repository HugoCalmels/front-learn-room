import React from "react";
import styled from "styled-components";

const CardTeamStyles = styled.div`
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  margin-bottom: 30px;
  padding: 15px 25px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.grayCard};
  overflow: hidden;
  box-shadow: inset -4px -2px 8px ${(props) => props.theme.colors.light},
    inset 4px 2px 8px rgba(189, 195, 197, 0.48);

  &.dNone {
    display: none;
  }

  h4,
  p {
    color: ${(props) => props.theme.colors.dark} !important;
  }

  h4 {
    text-transform: uppercase;
  }

  p {
    margin: 0.5rem 0;
    display: flex;

    span {
      &:first-child {
        width: 90px;
      }
      &:last-child {
        color: ${(props) => props.theme.colors.greenDark};
      }
    }

    @media (max-width: ${(props) => props.theme.breakpoints.mobileMaxWidth}) {
      flex-direction: column;

      span {
        width: auto;
      }
    }
  }
`;

const CardTeamComponent = ({ data }) => {
  return (
    <CardTeamStyles className={!data ? "dNone" : ""}>
      <h4>{data.name}</h4>
      <p>
        <span>creator:</span>
        <span>{data?.creator?.username ? data?.creator?.username : "--"}</span>
      </p>
      <p>
        <span>timezone:</span>
        <span>{data?.timezone ? data?.timezone : "--"}</span>
      </p>
      <p>
        <span>startdate:</span>
        <span>{data?.start ? data?.start : "--"}</span>
      </p>
      <p>
        <span>intensity:</span>
        <span>{data?.intensity ? data?.intensity : "--"}</span>
      </p>
    </CardTeamStyles>
  );
};

export default CardTeamComponent;
