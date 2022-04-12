import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MainMenuContext from "../MainMenuContext";
import MainMenuComponent from "./MainMenuComponent";
import { ButtonComponent } from "./ButtonComponent";
import BaseMenuComponent from "./BaseMenuComponent";
import BurgerMenuSvgComponent from "./svg/BurgerMenuSvgComponent";
import LearnroomSvgComponent from "./svg/LearnroomSvgComponent";

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  height: ${(props) => props.theme.height.headerHeight};
  padding: 0 ${(props) => props.theme.paddings.NavLaptop};
  border-bottom: 1px solid ${(props) => props.theme.colors.greenDark};
  display: flex;
  align-items: center;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.greenLight};
  overflow: hidden;

  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: stretch;
  }

  h1 {
    margin: 0;
  }

  a {
    color: ${(props) => props.theme.colors.greenDark};
  }

  .logoGroup {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

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

    &:hover:after {
      bottom: 0;
    }

    svg {
      margin-right: 10px;
    }
  }

  .logo {
    font-size: 1.2rem;
  }

  .nav-right {
    height: 100%;
    font-size: 1rem;

    @media (max-width: ${(props) => props.theme.breakpoints.mobileMaxWidth}) {
      display: none;
    }
  }

  ul {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    li {
      margin-right: 10px;

      &:hover {
      }
    }
  }

  #burger-btn-group {
    button {
      padding: 3px 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${(props) => props.theme.colors.greenDark};
      border-radius: 0;
      background-color: transparent;
      -webkit-transition: all 300ms ease;
      -moz-transition: all 300ms ease;
      -ms-transition: all 300ms ease;
      -o-transition: all 300ms ease;
      transition: all 300ms ease;

      &:hover {
        opacity: 0.5;
      }

      svg {
        margin: 0;
        fill: ${(props) => props.theme.colors.greenDark};
      }
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tabletMinWidth}) {
    #burger-btn-group {
      display: none;
    }
  }
`;

const HeaderComponent = () => {
  const { isShowMainMenu, setIsShowMainMenu } = useContext(MainMenuContext);

  const handleClickMenu = () => {
    isShowMainMenu === false
      ? setIsShowMainMenu(true)
      : setIsShowMainMenu(false);
  };

  return (
    <>
      {/* H E A D E R */}
      <HeaderStyles>
        <nav>
          {/* L O G O */}
          <Link to="/" className="logoGroup">
            <LearnroomSvgComponent width="25" height="25" />
            <h1 className="logo">Learnroom</h1>
          </Link>

          {/* BURGER MENU */}
          <div id="burger-btn-group">
            <ButtonComponent onClick={handleClickMenu}>
              <BurgerMenuSvgComponent width="18" height="20" />
            </ButtonComponent>
          </div>

          {/* M E N U */}
          <ul className="nav-right">
            <BaseMenuComponent />
          </ul>
        </nav>
      </HeaderStyles>

      {/* R I G H T  M E N U */}
      <div>
        <MainMenuComponent />
      </div>
    </>
  );
};

export default HeaderComponent;
