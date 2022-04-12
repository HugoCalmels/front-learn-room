import styled from 'styled-components';

export const TeamStyles = styled.div`
  max-width: ${(props) => props.theme.spacings.maxWidth};
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 6rem 40px;

  .btn-group {
    margin-top: 4rem;
    display: flex;

    button {
      margin-right: 7.5px;
    }
  }

  ul {
    margin-top: 2rem;
  }

  #section-team-form {
    padding-bottom: 3rem;
    overflow: hidden;

    .dFlex {
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

    #form-team {
      display: none;
      overflow: hidden;
    }
  }

  .input-group__submit {
    button[type="submit"] {
      background-color: #005939;
      color: #fff;
    }
  }
`;