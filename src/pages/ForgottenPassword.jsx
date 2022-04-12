import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SubmitButtonComponent from "components/SubmitButtonComponent";
import FlashContext from "FlashContext";
import LoaderSpinnerComponent from "components/LoaderSpinnerComponent";

const ForgottenPasswordStyle = styled.div`
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

export const ForgottenPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const flash = useContext(FlashContext);

  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    const info = {
      user: {
        email: email,
      },
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };

    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}password`,
      config
    ).catch((error) => error);
    if (res.status !== 201) {
      const error = await res.json();
      const messages = `${[...Object.entries(error)]}`;
      flash.setType("danger");
      flash.setMessage(messages);
    } else {
      flash.setType("success");
      flash.setMessage(
        "Please check your emails for your password reset instructions"
      );
      history.push("/");
    }
    setIsLoading(false);
  };

  return (
    <ForgottenPasswordStyle>
      {!isLoading ? (
        <>
          <h1>What is your email ?</h1>
          <form onSubmit={sendEmail} className="form">
            <div className="input-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <SubmitButtonComponent type="submit">
                Submit
              </SubmitButtonComponent>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1>Please wait...</h1>
          <LoaderSpinnerComponent isLoading={isLoading} />
        </>
      )}
    </ForgottenPasswordStyle>
  );
};
