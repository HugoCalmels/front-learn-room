import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SubmitButtonComponent from "components/SubmitButtonComponent";
import FlashContext from "FlashContext";
import LoaderSpinnerComponent from "components/LoaderSpinnerComponent";

const ResetPasswordStyle = styled.div `
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
`

export const ResetPassword = ({ location }) => {
  const history = useHistory();
  const newPasswordEl = useRef(null);

  const flash = useContext(FlashContext);
  const [isLoading, setIsLoading] = useState(false);

  const sendNewPassword = async(e) => {
    e.preventDefault();

    const info = {
      user: {
        reset_password_token: location.search.split("=")[1],
        password: newPasswordEl.current.value 
      }
    }
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    }
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}password`, config)
    .catch(error => error);
    if (res.status === 204) {
      flash.setType('success');
      flash.setMessage('Your password has been changed, please login!')
      history.push('/login')
    } else if (res.status === 422) {
      const data = await res.json();
      flash.setType('danger');
      if (data.errors.password){
        flash.setMessage(data.errors.password);
      } else {
        flash.setMessage('Oups');
      }
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordStyle>
      { !isLoading ? (
        <>
          <h1>Reset your password</h1>
          <form onSubmit={sendNewPassword} className="form">
            <div className="input-group">
              <label htmlFor="new-password">New Password</label>
              <input type="password" id="new-password" ref={newPasswordEl}/>
            </div>
            <div className="input-group">
              <SubmitButtonComponent type="submit">
                Submit
              </SubmitButtonComponent>
            </div>
          </form>
        </>
      ) : (
        <LoaderSpinnerComponent isLoading={isLoading} />
      )}
    </ResetPasswordStyle>
  )
};
