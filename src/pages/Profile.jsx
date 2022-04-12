import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";

import TopPageButtonComponent from "components/TopPageButtonComponent";
import EditableRow from "components/Profile/EditableRow";
import ReadOnlyRow from "components/Profile/ReadOnlyRow";
import { LoggedContext } from "App";
import { ButtonComponent } from "components/ButtonComponent";
import LoaderSpinnerComponent from "components/LoaderSpinnerComponent";
import FlashContext from "FlashContext";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import UserCardTeamComponent from "components/Profile/UserCardTeamComponent";
import { ProfileStyles } from "../assets/styles/ProfileStyles";

export const Profile = () => {
  // selected team for history get
  const [selectedTeams, setSelectedTeams] = React.useState([]);
  const [fetchCancel, setFetchCancel] = React.useState(false);

  // Loaders, flashs, errors
  const [isLoading, setIsLoading] = React.useState(false);
  const flash = useContext(FlashContext);

  // Get PROFILE
  const userId = Cookies.get("user_id");
  const [getData, setGetData] = useState("");

  // Conditionnal rendering
  const [componentState, setComponentState] = useState("index");

  const handleClickEdit = async () => {
    setComponentState("edit");
  };

  const handleClickDeleteConfirmation = () => {
    setComponentState("delete");
  };

  const handleClickCancel = () => {
    setComponentState("index");
    setDisabled(false);
  };

  // GET USER PROFILE
  const getUserProfile = async () => {
    const config = {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };

    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}api/users/${userId}`,
      config
    ).catch((error) => error);

    if (res instanceof Error) {
      const error = await res.json();
      const messages = `${[...Object.entries(error)]}`;
      flash.setType("danger");
      flash.setMessage(messages);
    } else {
      const data = await res.json();
      setGetData(data);
    }

    setIsLoading(false);
    getUserHistory();
  };

  // RE-RENDER
  useEffect(() => {
    getUserProfile();
  }, [fetchCancel === false]);

  // Edit PROFILE
  const [usernameEl, setUsernameEl] = useState("");
  const [timezoneEl, setTimezoneEl] = useState("");

  const handleChangeUsername = (e) => {
    setUsernameEl(e.target.value);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    // checking for blank usernames/timezones on FIRST click
    let personUsername;

    if (usernameEl === "") {
      personUsername = getData.data?.attributes?.username;
    } else {
      personUsername = usernameEl;
    }

    const regex = /([-+]*\d{2})(?=:)/gm;
    let personTimezone;
    let personTimezoneNumber;

    if (timezoneEl === "") {
      personTimezone = getData.data?.attributes?.timezone;
      personTimezoneNumber = getData.data?.attributes?.timezone_number;
    } else {
      personTimezone = timezoneEl;
      const timezoneString = timezoneEl.match(regex);
      personTimezoneNumber = Number.parseInt(timezoneString[0]);
    }

    const creds = {
      user: {
        username: personUsername,
        timezone: personTimezone,
        timezone_number: personTimezoneNumber,
      },
    };
    const config = {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(creds),
    };

    if (personUsername.length > 20 || personUsername.length < 3) {
      flash.setType("danger");
      flash.setMessage(`Username must be between 3 and 20 characters`);
    } else if (personUsername.length < 20 || personUsername.length > 3) {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/users/${userId}`,
        config
      ).catch((error) => error);

      if (res.status !== 200) {
        const error = await res.json();
        const messages = `${[...Object.entries(error)]}`;
        flash.setType("danger");
        flash.setMessage(messages);
      } else {
        getUserProfile();
        flash.setType("success");
        flash.setMessage(`Edited profile with success`);
        setComponentState("index");
      }
      setIsLoading(false);
    }
  };

  // Check DELETE CONFIRMATION Button ( Emails )
  const [disabled, setDisabled] = React.useState(false);

  const emailRef = React.useRef(null);

  const checkEmailConfirmation = (e) => {
    e.preventDefault();

    if (emailRef.current.value === getData.data?.attributes?.email) {
      flash.setType("danger");
      flash.setMessage(`Are you sure you want to leave us ?`);
      setDisabled(true);
    } else {
      flash.setType("danger");
      flash.setMessage(`Incorrect Email`);
      setDisabled(false);
    }
  };

  // DELETE USER
  const history = useHistory();
  const { setIsLogged } = useContext(LoggedContext);

  const handleDeleteUser = async () => {
    const config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      mode: "cors",
    };

    setIsLoading(true);

    const res = fetch(
      `${process.env.REACT_APP_API_URL}api/signup`,
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
      flash.setMessage(`Your account has been deleted`);
      history.push("/");
    }
  };
  // GET & Fetch User history

  const getUserHistory = async () => {
    const config = {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}teams`, config);
    const allTeams = await res.json();

    let newFilteredArray = [];

    const filteredTeams = async () => {
      await allTeams.map((group) => {
        group.team_users.map((groupedPeople) => {
          if (groupedPeople.email === getData.data?.attributes?.email) {
            return newFilteredArray.push(group);
          }
        });
      });
    };

    try {
      filteredTeams();
      setSelectedTeams(newFilteredArray);
    } catch (err) {
      console.log(err);
    }
    setFetchCancel(true);
  };

  // === HTML ===
  return (
    <ProfileStyles>
      <TopPageButtonComponent />

      {/* P R O F I L E */}
      {isLoading ? (
        <div className="loader-container">
          <div className="loader">
            <LoaderSpinnerComponent loading={isLoading} />
          </div>
        </div>
      ) : (
        <section className="profile">
          <header>
            <h1>Profile</h1>
            <p>
              When you register we set your current local timezone as default,
              but you can change that anytime.
            </p>
            <p>
              You can check and join,<strong>only</strong> other teams within{" "}
              <strong>+01:00</strong> hour difference from your own timezone.
            </p>
          </header>

          <div className="timezones">
            <h2>Selected</h2>
            <p>
              Connected as : <strong>{getData.data?.attributes?.email}</strong>
            </p>
          </div>

          <div>
            {componentState == "edit" /* EDIT */ ? (
              <form onSubmit={handleEditProfile} className="form">
                <EditableRow
                  getData={getData}
                  handleChangeUsername={handleChangeUsername}
                  handleClickCancel={handleClickCancel}
                  setTimezoneEl={setTimezoneEl}
                />
              </form>
            ) : componentState == "index" /* INDEX */ ? (
              <>
                <ReadOnlyRow
                  getData={getData}
                  handleClickEdit={handleClickEdit}
                  handleDeleteUser={handleDeleteUser}
                  handleClickDeleteConfirmation={handleClickDeleteConfirmation}
                />
              </>
            ) : componentState == "delete" /* DELETE */ ? (
              <>
                <div className="parameters-text">
                  <center>
                    <p>
                      Type your <u>email</u> and press "confirm" to delete your
                      account.
                    </p>
                  </center>

                  <div className="form-email">
                    <form onSubmit={checkEmailConfirmation}>
                      <input
                        className="email-input"
                        type="text"
                        ref={emailRef}
                      />
                      <div className="space-email"></div>
                      <button class="email-button" type="submit">
                        confirm email
                      </button>
                    </form>
                  </div>
                </div>
                <div className="parameters-buttons">
                  <ButtonComponent
                    colorGreenDark
                    bgWhite
                    borderGreenDark
                    borderEnabled
                    smallPadding
                    hoverbgColorGreenLight
                    onClick={handleClickCancel}
                  >
                    Cancel
                  </ButtonComponent>
                  <div className="middle"></div>
                  {disabled == true ? (
                    <ButtonComponent
                      hoverbgColorDarkRed
                      bgLightRed
                      className="delete-button"
                      disabled={!disabled}
                      onClick={handleDeleteUser}
                    >
                      Delete account
                    </ButtonComponent>
                  ) : (
                    <ButtonComponent
                      colorGrey
                      smallPadding
                      cursorDisabled
                      bgGrey
                      borderBlack
                      borderEnabled
                    >
                      Delete Account
                    </ButtonComponent>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          <div className="horizontal-line" />
          <UserCardTeamComponent selectedTeams={selectedTeams} />
        </section>
      )}
    </ProfileStyles>
  );
};
