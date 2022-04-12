import React, { useContext } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";

import { LoggedContext } from "App";
import FlashContext from "FlashContext";

const BaseMenuStyles = styled.li`
  &,
  a {
    height: 100%;
    display: flex;
    align-items: center;
  }

  a {
    position: relative;

    &:after {
      content: "";
      position: absolute;
      bottom: -${(props) => props.theme.height.headerHeight};
      left: calc(50% - (${(props) => props.theme.height.headerHeight} / 2));
      z-index: -1;
      width: ${(props) => props.theme.height.headerHeight};
      height: ${(props) => props.theme.height.headerHeight};
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.light};
      -webkit-transition: all 300ms ease;
      -moz-transition: all 300ms ease;
      -ms-transition: all 300ms ease;
      -o-transition: all 300ms ease;
      transition: all 300ms ease;
    }
    &:hover:after,&.selected:after {
      bottom: 0;
    }
  }
`;

const BaseMenuComponent = () => {
  const { isLogged, setIsLogged } = useContext(LoggedContext);
  const flash = useContext(FlashContext);

  const logout = async () => {
    const config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      mode: "cors",
    };

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}api/logout`,
      config
    ).catch((error) => error);

    if (res instanceof Error) {
      flash.setType("danger");
      flash.setMessage("Something went wrong, please try again");
    } else {
      Cookies.remove("user_id");
      Cookies.remove("token");

      setIsLogged(false);
      flash.setType('success');
      flash.setMessage('Successfuly disconnected');

      window.location = "/";
    }
  };

  return (
    <>
      <BaseMenuStyles>
        <NavLink activeClassName="selected" to="/courses">MOOC List</NavLink>
      </BaseMenuStyles>
      {!isLogged ? (
        <>
          <BaseMenuStyles>
            <NavLink activeClassName="selected" to="/register">Register</NavLink>
          </BaseMenuStyles>
          <BaseMenuStyles>
            <NavLink activeClassName="selected" to="/login">Login</NavLink>
          </BaseMenuStyles>
        </>
      ) : (
        <>
          <BaseMenuStyles>
            <NavLink activeClassName="selected" to="/profile">Profile</NavLink>
          </BaseMenuStyles>
          <BaseMenuStyles>
            <NavLink activeClassName="selected" to="/logout" onClick={logout}>Logout</NavLink>
          </BaseMenuStyles>
        </>
      )}
    </>
  );
};

export default BaseMenuComponent;
