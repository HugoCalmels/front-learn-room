import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";

import { LoggedContext } from "App";
import SubmitButtonComponent from 'components/SubmitButtonComponent';
import FlashContext from 'FlashContext';
import LoaderSpinnerComponent from 'components/LoaderSpinnerComponent';
import { toGmt } from "../components/Utils";
var animals = require('animals');

const LoginStyles = styled.div`
  max-width: ${(props) => props.theme.spacings.maxWidth};
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem ${(props) => props.theme.paddings.NavLaptop} ${(props) => props.theme.paddings.NavLaptop};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  h1 {
    margin-bottom: 8px;
  }
`;

export const Login = () => {
  // generating random username
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const generatedAnimal = capitalizeFirstLetter(animals())
  const generatedUsername = generatedAnimal+"#"+Math.floor(Math.random() * 5000);

  // generating local timezone
  const generatedCity = Intl.DateTimeFormat().resolvedOptions().timeZone
  const localTimezoneInt = new Date().getTimezoneOffset()/60;
  const reverseNumber = (num) => {
    if (num > 0)
      return -Math.abs(num)+1
    if (num < 0)
      return Math.abs(num)-1
    else return num
  }
  const generatedTimezoneInteger = reverseNumber(localTimezoneInt)
  const generatedTimezone = generatedCity + " " + toGmt(generatedTimezoneInteger)
  // login part 
  const history = useHistory();
  const emailEl = React.useRef(null)
  const passwordEl = React.useRef(null)

	const { setIsLogged } = useContext(LoggedContext);
  const flash = useContext(FlashContext);
  const [isLoading, setIsLoading]  = React.useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    let token = '';

    const creds = {
      user: {
        email: emailEl.current.value,
        password: passwordEl.current.value
      }
    };

    const config = {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    };

    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}api/login`, config)
    .catch(error => error);

    if (res.status !== 200) {
      const error = await res.json();
      const messages = `${[...Object.entries(error)]}`;
      flash.setType('danger');
      flash.setMessage(messages);
      setIsLoading(false);
    } else {
      token = await res.headers.get('authorization')
      const user = await res.json();
      Cookies.set("user_id", user.data.id, {secure: true});
      Cookies.set("token", token.split(' ')[1], { secure: true });
      if (user.data.attributes.username === null) { 
        editUserToGenerate()
        setIsLogged(true);
        flash.setType('success');
        flash.setMessage(`Welcome ${generatedUsername}, this name your username but you can change it anytime`)
        history.push('/');
      } else {
        setIsLogged(true);
        flash.setType('success');
        flash.setMessage(`Welcome ${user.data.attributes.username}`)
        history.push('/');
      };
    };
  };

  // edit the user to generate random username & local timezeone
  const editUserToGenerate = async () => {

    const id  = Cookies.get('user_id')
    const creds = {
      user: {
        username: generatedUsername,
        timezone: generatedTimezone,
        timezone_number: generatedTimezoneInteger
      }
    };
    const config = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(creds)
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}api/users/${id}`, config)
    .catch(error => error);

    if (res instanceof Error) {
      const error = await res.json();
      const messages = `${[...Object.entries(error)]}`;
      flash.setType('danger');
      flash.setMessage(messages);
    } else {
      return
    }

  }

  return (
    <LoginStyles>
      <h1>Login</h1>
      { !isLoading ? (
        <>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={emailEl}/>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={passwordEl}/>
            </div>
            <div className="input-group">
              <SubmitButtonComponent type="submit">
                Submit
              </SubmitButtonComponent>
            </div>
          </form>
          <Link to="/forgotten_password">Forgotten password ?</Link>
        </>
      ) : (
        <LoaderSpinnerComponent isLoading={isLoading} />
      )}
    </LoginStyles>
  )
}
