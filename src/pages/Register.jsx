import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import SubmitButtonComponent from "components/SubmitButtonComponent";
import FlashContext from "FlashContext";
import LoaderSpinnerComponent from "components/LoaderSpinnerComponent";

const RegisterStyles = styled.div`
  max-width: ${(props) => props.theme.spacings.maxWidth};
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem ${(props) => props.theme.paddings.NavLaptop};
    ${(props) => props.theme.paddings.NavLaptop};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  h1 {
    margin-bottom: 8px;
  }
`;

export const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const flash = useContext(FlashContext);

  const [isLoading, setIsLoading] = useState(false);

  const SubmitForm = async (e) => {
    e.preventDefault();

    const signupURl = new URL(`${process.env.REACT_APP_API_URL}api/signup`);

    if (password !== passwordConfirmation) {
      setPasswordError("passwords don't match");
    } else {
      setIsLoading(true);
      const response = await fetch(signupURl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      }).catch((error) => error);

      if (response.status !== 201) {
        const status = await response.status;
        const data = await response.json();
        if (status === 401) {
          flash.setType("success");
          flash.setMessage("Thanks for registering, please check your emails!");

          history.push("/");
        } else if (status === 400) {
          console.log(data);
          flash.setType("danger");
          flash.setMessage(data.errors[0].detail);
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <RegisterStyles>
      {!isLoading ? (
        <>
          <h1>register</h1>
          <form onSubmit={SubmitForm} className="form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password-confirmation">
                Password confirmation
              </label>
              <input
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                id="password-confirmation"
                type="password"
              />
            </div>
            <div className="input-group">
              <SubmitButtonComponent type="submit">
                Submit
              </SubmitButtonComponent>
            </div>
          </form>
          {passwordError && <p>{passwordError}</p>}
        </>
      ) : (
        <LoaderSpinnerComponent isLoading={isLoading} />
      )}
    </RegisterStyles>
  );
};
