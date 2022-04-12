import React from "react";
import { useContext } from "react";
import FlashContext from "FlashContext";
import anime from "animejs/lib/anime.es.js";
import styled from "styled-components";

import CloseIconSvgComponent from "./svg/CloseIconSvgComponent";

const FlashStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 6rem;
  transform: translateY(${(props) => props.theme.height.headerHeight});
  opacity: 0;
  overflow: hidden;

  .flash-content {
    height: 100%;
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .closeIcon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .success {
    color: ${(props) => props.theme.colors.greenDark};
    border-bottom: 1px solid ${(props) => props.theme.colors.greenDark};
    background-color: ${(props) => props.theme.colors.alertGreen};
  }

  .danger {
    color: ${(props) => props.theme.colors.redDark};
    border-bottom: 1px solid ${(props) => props.theme.colors.redDark};
    background-color: ${(props) => props.theme.colors.alertRed};
  }
`;

const FlashComponent = () => {
  const flash = useContext(FlashContext);
  const topPos = 50;

  React.useEffect(() => {
    animateFlash();
  }, [flash.message]);

  const closeAlert = () => {
    const targets = document.getElementById("flash");

    anime({
      targets,
      translateY: -topPos,
      opacity: 1,
      duration: 400,
      easing: "easeOutQuad",
      complete() {
        flash.setMessage("");
        flash.setType("");
      },
    });
  };

  const animateFlash = () => {
    const targets = document.getElementById("flash");

    if (flash.message) {
      anime({
        targets,
        translateY: topPos,
        opacity: 1,
        duration: 400,
        delay: 1000,
        endDelay: 3000,
        direction: "alternate",
        easing: "easeOutQuad",
        complete() {
          flash.setMessage("");
          flash.setType("");
        },
      });
    }
  };

  return (
    <FlashStyle id="flash">
      <div className={`flash-content ${flash.type}`}>
        <h3>{flash.message}</h3>
        <div className="closeIcon" onClick={() => closeAlert()}>
          <CloseIconSvgComponent
            width={"15"}
            height={"15"}
            className={flash.type}
          />
        </div>
      </div>
    </FlashStyle>
  );
};

export default FlashComponent;
