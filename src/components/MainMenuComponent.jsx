import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";
import anime from "animejs/lib/anime.es.js";

import { LoggedContext } from "App";
import MainMenuContext from "../MainMenuContext";
import FlashContext from "FlashContext";

const MainMenuStyles = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  right: -${(props) => props.theme.width.mainMenuWidth};
  z-index: 1000;
  width: ${(props) => props.theme.width.mainMenuWidth};
  background-color: ${(props) => props.theme.colors.greenDark};

  &.isShowMainMenu {
    background-color: rgba(0, 89, 57, 0.95);
  }

  ul {
    padding-top: calc(${(props) => props.theme.height.headerHeight} + 3rem);

    li {
    }

    a {
      padding: 7.5px 20px;
      display: block;
      color: ${(props) => props.theme.colors.light};
      -webkit-transition: all 300ms ease;
      -moz-transition: all 300ms ease;
      -ms-transition: all 300ms ease;
      -o-transition: all 300ms ease;
      transition: all 300ms ease;

      :hover,&.selected {
        background-color: rgba(255,255,255,.5);
      }
    }
  }
`;

const MainMenuComponent = () => {
  const { isLogged, setIsLogged } = useContext(LoggedContext);
  const { isShowMainMenu, setIsShowMainMenu } = useContext(MainMenuContext);

  const flash = useContext(FlashContext);

  React.useEffect(() => {
    if (isShowMainMenu === true) {
      anime({
        targets: "#main-menu",
        easing: "easeInOutSine",
        duration: 500,
        translateX: -300,
      });
    } else {
      anime({
        targets: "#main-menu",
        easing: "easeInOutSine",
        duration: 500,
        translateX: 300,
      });
    }
  }, [isShowMainMenu]);

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
      flash.setType("success");
      flash.setMessage("Successfuly disconnected");

      window.location = "/";
    }
  };

  const handleClick = () => {
    if (isShowMainMenu === true) setIsShowMainMenu(false);
  };

  return (
    <MainMenuStyles
      id="main-menu"
      className={isShowMainMenu === true ? "isShowMainMenu" : ""}
    >
      <ul>
        <li>
          <NavLink activeClassName="selected" to="/courses" onClick={handleClick}>MOOC List</NavLink>
        </li>
        {!isLogged ? (
          <>
            <li>
              <NavLink activeClassName="selected" to="/register" onClick={handleClick}>Register</NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to="/login" onClick={handleClick}>Login</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink activeClassName="selected" to="/profile" onClick={handleClick}>Profile</NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to="/logout" onClick={logout}>Logout</NavLink>
            </li>
          </>
        )}
      </ul>
    </MainMenuStyles>
  );
};

export default MainMenuComponent;
