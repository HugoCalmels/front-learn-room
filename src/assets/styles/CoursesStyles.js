import styled from 'styled-components'

export const CourseStyles = styled.div`
  min-height: 100vh;
  padding: 6rem 0;
  background-color: ${(props) => props.theme.colors.greenLight};

  .swiper-slide {
    width: auto;
  }
  .section {
    max-width: ${(props) => props.theme.spacings.maxWidth};
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 ${(props) => props.theme.paddings.NavLaptop};
  }

  h3,h4 {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.colors.greenDark};
  }

  p {
    color: ${(props) => props.theme.colors.dark};
  }

  .dFlex {
    align-items: center;

    input[type="radio"] {
      width: auto !important;
      margin-right: 10px;
      margin-bottom: 7.5px;
    }

    label {
      width: auto;
      margin-right: 22.5px;
    }
  }

  button[type="submit"] {
    background-color: ${(props) => props.theme.colors.greenDark};
    color: ${(props) => props.theme.colors.light};
  }

  .teams-list {
    display: flex;
    flex-wrap: wrap;

    a {
      display: flex;
    }
  }

  #section-team-form {
    overflow: hidden;

    #form-team {
      display: none;
      overflow: hidden;
    }
  }

  .timezones {
    margin-top: 2rem;
    margin-bottom: 3rem;
    padding: 15px 25px;
    border: 1px solid ${(props) => props.theme.colors.greenDark};
    border-radius: 20px;
    background-color: rgba(255,255,255,.33);

    h4 {
      text-transform: uppercase;
    }

    li {
      margin-bottom: 10px;
    }

    p {
      max-width: 350px;
    }
  }
`;
