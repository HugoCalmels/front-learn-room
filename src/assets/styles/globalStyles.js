import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.fonts.bodyFont};
    overflow-x: hidden;
  }

  body,#root {
    min-height: 100vh;
  }
  
  ul,li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.greenDark};
  }

  img {
    border-radius: 1rem;
  }
  
  h1,h2,h3{
    margin:0;
    font-family: ${(props) => props.theme.fonts.headerFont};
  }

  h1,.subTitle {
    text-align: center;
  }

  h1 {
    color: ${(props) => props.theme.colors.greenDark};
  }

  .row-bg {
    margin-top: 8rem;
    background-color: ${(props) => props.theme.colors.greenLight};

    &:before {
      content: '';
      width: 100%;
      height: 100px;
      margin-top: -50px;
      -webkit-border-radius: 100% / 50%;
      border-radius: 100% / 50%;
      background-color: ${(props) => props.theme.colors.greenLight};
    }
  }

  .top-rounded-block,.bottom-rounded-block {
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 100px;
      -webkit-border-radius: 100% / 50%;
      border-radius: 100% / 50%;
      background-color: ${(props) => props.theme.colors.greenLight};
    }
  }

  .top-rounded-block {
    &:before {
      top: -50px;
    }
  }

  .bottom-rounded-block {
    &:before {
      bottom: -50px;
    }
  }

  .form {
    width: 100%;
    max-width: 350px;
    margin-top: 45px;
    margin-left: auto;
    margin-right: auto;

    .input-group {
      margin-bottom: 20px;

      label,input,textarea,select {
        width: 100%;
        display: block;
        border-radius: 6px;
      }

      label {
        margin-bottom: 7.5px;
      }

      input,textarea,select {
        padding: 6px 10px;
        border-width: 2px;
        box-sizing: border-box;
      }

      textarea {
        height: 100px;
      }
    }
  }

  .swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction {
    bottom: 0;

    .swiper-pagination-bullet {
      background-color: ${(props) => props.theme.colors.greenDark};
      opacity: .25;

      &.swiper-pagination-bullet-active {
        opacity: 1;
      }
    }
  }

  .odd-container {
    .odd-parent {
      display: flex;
    }

    &:nth-child(odd) {
      .odd-parent {
        .odd-child {
          flex-direction:	row-reverse !important;
        }
      }
    }
  }

  .figures-component {
    max-width: ${(props) => props.theme.spacings.maxWidth};
    margin-left: auto;
    margin-right: auto;
    padding: 0 ${(props) => props.theme.paddings.NavLaptop};

    a figure {
      display: flex;
    }
    
    &:nth-child(even) a figure {
      flex-direction:	row-reverse !important;
    }

    img {
      width: 100%;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    }

    h3 {
      margin-top: 15px;
      color: ${(props) => props.theme.colors.greenDark};
    }

    p {
      color: ${(props) => props.theme.colors.greenDark};
    }
  }

  .dBlock {
    display: block;
  }

  .dFlex {
    display: flex;
  }
`;
