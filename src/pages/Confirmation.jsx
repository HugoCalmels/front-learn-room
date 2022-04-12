import FlashContext from "FlashContext";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import LoaderSpinnerComponent from "components/LoaderSpinnerComponent";

const ConfirmationStyle = styled.div`
  max-width: ${(props) => props.theme.spacings.maxWidth};
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem 0 ${(props) => props.theme.paddings.NavLaptop} 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  h1 {
    margin-bottom: 8px;
  }
`;

export const Confirmation = ({ location }) => {
  const history = useHistory();
  const flash = useContext(FlashContext);

  const confirmUser = async () => {
    const config = {
      method: "GET",
    };

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}confirmation${location.search}`,
      config
    ).catch((error) => error);

    if (res instanceof Error) {
      const error = await res.json();
      const messages = `${[...Object.entries(error)]}`;
      flash.setType("danger");
      flash.setMessage(messages);
      history.push("/");
    } else {
      flash.setType("success");
      flash.setMessage("Your email is now confirmed, please login!");
      history.push("/login");
    }
  };

  useEffect(() => {
    confirmUser();
  }, []);

  return (
    <ConfirmationStyle>
      <h1>You are being redirected, please wait...</h1>
      <LoaderSpinnerComponent isLoading={true} />
    </ConfirmationStyle>
  );
};
