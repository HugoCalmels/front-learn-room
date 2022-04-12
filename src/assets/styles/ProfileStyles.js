import styled from 'styled-components'

export const ProfileStyles = styled.div`
  // PHB
  background-color: ${(props) => props.theme.colors.greenLight};

  .profile {
    max-width: 970px;
    min-height: 100vh;
    padding: 6rem ${(props) => props.theme.paddings.NavLaptop};
    margin-left: auto;
    margin-right: auto;

    h1 {
      text-align: left;
    }

    h2 {
      margin-top: 2rem;
      margin-bottom: 2rem;
      color: ${(props) => props.theme.colors.greenDark};
    }
  }

  .btn-group {
    margin: 2rem 0;
    display: flex;

    button {
      margin-right: 10px;
      margin-bottom: 5px;
    }

    button[type="submit"] {
      color: ${(props) => props.theme.colors.light};
      background-color: ${(props) => props.theme.colors.greenDark};
    }
  }

  .history-list {
    border-top: 3px solid ${(props) => props.theme.colors.dark};

    li {
      padding-bottom: .5rem;
      border-bottom: 1px solid ${(props) => props.theme.colors.dark};

      p {
        margin: .5rem 0;
      }
    }
  }


  // Hugo
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 3rem;
  }
  .loader {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .main-wrapper {
    border-radius: 20px;
    max-width: ${(props) => props.theme.spacings.maxWidth};
    padding: 0 ${(props) => props.theme.paddings.NavLaptop};
    margin-left: auto;
    margin-right: auto;
    border: 2px solid rgb(0, 89, 57, 0.1);
    padding: 10px;
    min-height: 50vh;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 25px;
    margin-left: 25px;
  }
  .main-container {
    margin: 10px auto;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
  }
  .parameters-wrapper {
    border: 2px solid rgb(0, 89, 57, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
  }
  .horizontal-line {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.colors.greenLight};
  }
  .history-wrapper {
    border: 3px solid cyan;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-left: 25px;
    padding-right: 25px;
  }
  .parameters-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.greenLight};
    margin-top: -50px;
    margin-bottom: 5px;
    padding-bottom: 15px;
    width: auto;
  }
  .parameters-buttons .middle {
    margin-right: 10px;
    margin-left: 10px;
  }
  .parameters-text {
    background-color: ${(props) => props.theme.colors.greenLight};
    border-radius: 12px;
    padding-top: 1px;
    margin-top: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 80px;
  }
  .parameters-text select {
    font-size: 12px;
    height: 22px;
    border: 2px solid black;
    border-radius: 6px;
    width: 70%;
  }
  .form-email {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
  }
  .email-button {
    height: 22px;
    padding: auto;
    border: 2px black solid;
    border-radius: 6px;
    background-color: ${(props) => props.theme.colors.light};
    color: black;
    cursor: pointer;
    font-size: auto;
    margin: auto;
    &:hover {
      background-color: ${(props) => props.theme.colors.greenLight};
    }
  }
  .space-email {
    margin-top: 10px;
  }
  .email-input {
    height: 30px;
    width: 250px;
    border-radius: 6px;
  }
  .edit-input {
    border-radius: 6px;
  }
  .connected-as {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    margin-top: -20px;
    margin-bottom: 20px;
  }
`;