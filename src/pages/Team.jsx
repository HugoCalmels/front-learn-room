import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import anime from "animejs/lib/anime.es.js";
import { v4 as uuid_v4 } from "uuid";

import FlashContext from "FlashContext";
import TeamComponent from "components/TeamComponent";
import { ButtonComponent } from "components/ButtonComponent";
import ArrowLeftSvgComponent from "components/svg/ArrowLeftSvgComponent";
import LoaderSpinnerComponent from "components/LoaderSpinnerComponent";
import TeamInfosComponent from "components/TeamInfosComponent";
import { TeamForm } from "components/TeamForm";
import { TeamStyles } from "../assets/styles/TeamStyles";
import TopPageButtonComponent from 'components/TopPageButtonComponent';

export const Team = () => {
  const history = useHistory();
  const flash = React.useContext(FlashContext);

  const { courseId, teamId } = useParams();
  const [teamData, setTeamData] = React.useState({});

  const [isCreator, setIsCreator] = React.useState(false);
  const [isTeamMember, setIsTeamMember] = React.useState(false)

  const [chargeTeam, setChargeTeam] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const [nameEl, setNameEl] = React.useState("");
  const [intensityEl, setIntensityEl] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    getOneTeam();
  }, [chargeTeam]);

  const getOneTeam = async () => {
    const config = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };

    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}courses/${courseId}/teams/${teamId}`,
      config
    );
    const data = await res.json();

    data.team_users.filter(user => user.id === parseInt(Cookies.get('user_id')))[0] ? setIsTeamMember(true) : setIsTeamMember(false);

    try {
      if (data?.creator?.id && data?.creator?.id === parseInt(Cookies.get("user_id"))) {
        setIsCreator(true)
      }

      setTeamData(data);
      setIsLoading(false);
      const newDate = new Date(data?.start.toString());
      setNameEl(data?.name);
      setStartDate(newDate);
      setIntensityEl(data?.intensity);
    } 
    catch (err) {
      console.log("ERROR: ", err, "\nuser: ", data.status, " - ", data.error);
    }
  };

  const handleClickJoinTeam = async () => {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };

    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}courses/${courseId}/teams/${teamId}/subscriptions`,
      config
    );
    const data = await res.json();

    if (res.status === 201) {
      flash.setType("success");
      flash.setMessage("Welcome to the team!");

      setChargeTeam(!chargeTeam);
      setIsTeamMember(true);
    } 
    else if (res.status === 422) {
      flash.setType("danger");
      flash.setMessage(data.users[0]);
    } 
    else {
      flash.setType("danger");
      flash.setMessage("You must login before joining a team");
    }

    setIsLoading(false);
  };

  const handleClickLeaveTeam = async () => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      mode: "cors",
    };

    try {
      setIsLoading(true);
      await fetch(
        `${
          process.env.REACT_APP_API_URL
        }courses/${courseId}/teams/${teamId}/subscriptions/${Cookies.get(
          "user_id"
        )}`,
        config
      );

      setChargeTeam(!chargeTeam);
      setIsTeamMember(false);
    } 
    catch (err) {
      console.log("ERROR: ", err);
    }

    setIsLoading(false);
  };

  const handleClickDestroyTeam = async () => {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      mode: "cors",
    };

    try {
      setIsLoading(true);

      await fetch(
        `${
          process.env.REACT_APP_API_URL
        }courses/${courseId}/teams/${teamId}`,
        config
      );

      handleClickPreviousPage();
    } 
    catch (err) {
      console.log("ERROR: ", err);
    }

    setIsLoading(false);
  };

  const handleClickForm = () => {
    const targets = document.getElementById("form-team");
    const wrapperStyle = targets.style;

    if (isOpen) {
      anime({
        targets,
        height: 0,
        opacity: [1, 0],
        duration: 400,
        easing: "easeOutQuad",
        complete() {
          setIsOpen(false);
          wrapperStyle.display = "";
        },
      });
    } 
    else {
      setIsOpen(true);
      wrapperStyle.display = "block";
      wrapperStyle.height = "0";

      anime({
        targets,
        height: (el) => el.scrollHeight,
        opacity: [0, 1],
        duration: 400,
        easing: "easeOutCubic",
      });
    }
  };

  const handleClickPreviousPage = () => {
    history.goBack();
  };

  const handleChangeName = (e) => {
    setNameEl(e.target.value);
  };

  const handleChangeIntensity = (e) => {
    setIntensityEl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const creds = {
      name: nameEl,
      start: startDate,
      intensity: intensityEl,
    };
    const config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(creds),
    };

    setIsLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}courses/${courseId}/teams/${teamId}`,
      config
    );

    const data = await res.json();

    if (res.status === 200) {
      setChargeTeam(!chargeTeam);
      handleClickForm();

      flash.setType("success");
      flash.setMessage("Your team has been updated!");
    } else if (res.status === 422) {
      const message = `${[...Object.entries(data)]}`;

      flash.setType("danger");
      flash.setMessage(message);
    }

    setIsLoading(false);
  };

  return (
    <TeamStyles>
      <TopPageButtonComponent />

      <h1>
        Team name : <em>{teamData?.name}</em>
      </h1>

      {/* B U T T O N S */}
      <div className="btn-group">
        <ButtonComponent onClick={() => handleClickPreviousPage()} borderEnabled borderGreenDark bgWhite colorGreenDark>
          <ArrowLeftSvgComponent width="15" height="25"/>
          <span>Back</span>
        </ButtonComponent>
        {teamData?.creator?.id &&
        teamData?.creator?.id === parseInt(Cookies.get("user_id")) ? (
          <>
            <ButtonComponent onClick={handleClickForm}>
              Edit team
            </ButtonComponent>
            <ButtonComponent onClick={handleClickDestroyTeam} bgRedDark hoverbgColorLightRed>
              Destroy team
            </ButtonComponent>
          </>
        ) : (
          isTeamMember ? (
            <ButtonComponent onClick={handleClickLeaveTeam} bgRedDark hoverbgColorLightRed>Leave team</ButtonComponent>
          ) : (
            <ButtonComponent onClick={handleClickJoinTeam}>Join team</ButtonComponent>
          )
        )}
      </div>

      {/* F O R M */}

      <section className="section" id="section-team-form">
        <TeamForm
          handleSubmit={handleSubmit}
          handleChangeName={handleChangeName}
          setStartDate={setStartDate}
          handleChangeIntensity={handleChangeIntensity}
          startDate={startDate}
          nameEl={nameEl}
        />
      </section>

      {/* T E A M  L I S T */}
      {isLoading ? (
        <LoaderSpinnerComponent isLoading={isLoading} />
      ) : (
        <ul>
          <TeamComponent
            data={teamData?.creator}
            idCreator={teamData?.creator?.id}
            isCreator="true"
          />
          {teamData?.team_users?.map((user) => (
            <TeamComponent
              data={user}
              idCreator={teamData?.creator?.id}
              isCreator="false"
              key={uuid_v4()}
            />
          ))}
        </ul>
      )}
      
      {/* I N F O S */}
      {
        isTeamMember && 
        isTeamMember === true && 
        <TeamInfosComponent data={{courseId, teamId, isCreator}}/>
      }
    </TeamStyles>
  );
};
