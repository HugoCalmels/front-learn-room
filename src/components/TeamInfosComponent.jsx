import React from "react";
import Cookies from "js-cookie";
import anime from "animejs/lib/anime.es.js";
import styled from "styled-components";

import FlashContext from "FlashContext";
import { ButtonComponent } from "components/ButtonComponent";
import SubmitButtonComponent from "components/SubmitButtonComponent";

const TeamInfosStyles = styled.div`
  margin: 4rem 0;

  .team-infos-title-group {
    display: flex;
    justify-content: space-between;

    @media (max-width: ${(props) => props.theme.breakpoints.mobileMaxWidth}) {
      flex-direction: column;
      justify-content: flex-start;

      h2 {
        margin-bottom: 10px;
      }

      button {
        justify-content: center;
      }
    }
  }

  #form-team-infos {
    margin-bottom: 4rem;
    display: none;
    overflow: hidden;
  }

  .team-infos-list {
    li {
      padding: 10px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.colors.dark};

      &:first-child {
        border-top: 3px solid ${(props) => props.theme.colors.dark};
      }

      .title {
        width: 160px;
      }

      @media (max-width: ${(props) => props.theme.breakpoints.mobileMaxWidth}) {
        flex-direction: column;
        align-items: flex-start;

        .title {
          width: 100%;
        }
      }
    }
  }
`;

const TeamInfosComponent = ({ data }) => {
  const flash = React.useContext(FlashContext);

  const [infosData, setInfosData] = React.useState({});
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const [infoId, setInfoId] = React.useState("");

  const [viceChat, setVoiceChat] = React.useState("");
  const [git, setGit] = React.useState("");
  const [documentation, setDocumentation] = React.useState("");
  const [design, setDesign] = React.useState("");
  const [projectTracker, setProjectTracker] = React.useState("");
  const [teamRules, setTeamRules] = React.useState("");

  React.useEffect(() => {
    getOneTeamInfos();
  }, [isFormOpen]);

  const handleChangeVoiceChat = (e) => {
    setVoiceChat(e.target.value);
  };

  const handleChangeGit = (e) => {
    setGit(e.target.value);
  };

  const handleChangeDocumentation = (e) => {
    setDocumentation(e.target.value);
  };

  const handleChangeDesign = (e) => {
    setDesign(e.target.value);
  };

  const handleChangeProjectTracker = (e) => {
    setProjectTracker(e.target.value);
  };

  const handleChangeTeamRules = (e) => {
    setTeamRules(e.target.value);
  };

  const getOneTeamInfos = async () => {
    const config = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}courses/${data.courseId}/teams/${data.teamId}/infos`,
      config
    ).catch((error) => error);
    if (res instanceof Error) {
      const error = await res.json();
      const message = `${[...Object.entries(error)]}`;
      flash.setType("danger");
      flash.setMessage(message);
    } else {
      const infos = await res.json();
      setInfosData(infos);
      setInfoId(infos.id);
    }
  };

  const handleClickForm = () => {
    const targets = document.getElementById("form-team-infos");
    const wrapperStyle = targets.style;

    if (isFormOpen) {
      anime({
        targets,
        height: 0,
        opacity: [1, 0],
        duration: 400,
        easing: "easeOutQuad",
        complete() {
          setIsFormOpen(false);
          wrapperStyle.display = "";
        },
      });
    } else {
      setIsFormOpen(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const creds = {
      voice_chat: viceChat,
      git,
      documentation,
      design,
      project_tracker: projectTracker,
      team_rules: teamRules,
    };
    const config = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(creds),
    };

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}courses/${data.courseId}/teams/${data.teamId}/infos/${infoId}`,
      config
    ).catch((error) => error);

    if (res instanceof Error) {
      const error = await res.json();
      const message = `${[...Object.entries(error)]}`;

      flash.setType("danger");
      flash.setMessage(message);
    } else {
      handleClickForm();

      flash.setType("success");
      flash.setMessage("Your team has been updated!");
    }
  };

  return (
    <TeamInfosStyles>
      {infosData && (
        <>
          {/* T I T L E */}
          <div className="team-infos-title-group">
            <h2>Informations</h2>
            {data.isCreator && data.isCreator === true && (
              <ButtonComponent onClick={handleClickForm}>
                Edit team infos
              </ButtonComponent>
            )}
          </div>

          {/* F O R M */}
          {data.isCreator && data.isCreator === true && (
            <form className="form" id="form-team-infos" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="voice_chat">Voice chat</label>
                <input
                  value={viceChat}
                  type="text"
                  id="voice_chat"
                  onChange={handleChangeVoiceChat}
                />
              </div>
              <div className="input-group">
                <label htmlFor="git">Git</label>
                <input
                  value={git}
                  type="text"
                  id="git"
                  onChange={handleChangeGit}
                />
              </div>
              <div className="input-group">
                <label htmlFor="documentation">Documentation</label>
                <input
                  value={documentation}
                  type="text"
                  id="documentation"
                  onChange={handleChangeDocumentation}
                />
              </div>
              <div className="input-group">
                <label htmlFor="design">Design</label>
                <input
                  value={design}
                  type="text"
                  id="design"
                  onChange={handleChangeDesign}
                />
              </div>
              <div className="input-group">
                <label htmlFor="project_tracker">Project tracker</label>
                <input
                  value={projectTracker}
                  type="text"
                  id="project_tracker"
                  onChange={handleChangeProjectTracker}
                />
              </div>
              <div className="input-group">
                <label htmlFor="team_rules">Team rules</label>
                <textarea
                  value={teamRules}
                  id="team_rules"
                  onChange={handleChangeTeamRules}
                />
              </div>
              <div className="input-group">
                <SubmitButtonComponent type="submit">
                  Submit
                </SubmitButtonComponent>
              </div>
            </form>
          )}

          {/* L I S T */}
          <ul className="team-infos-list">
            <li>
              <span className="title">Voice chat</span>
              <a href={infosData.voice_chat}>
                {infosData.voice_chat
                  ? infosData.voice_chat
                  : "Your link to your voice chat app"}
              </a>
            </li>
            <li>
              <span className="title">Git</span>
              <a href={infosData.git}>
                {infosData.git
                  ? infosData.git
                  : "Your link to your git repository"}
              </a>
            </li>
            <li>
              <span className="title">Documentation</span>
              <a href={infosData.documentation}>
                {infosData.documentation
                  ? infosData.documentation
                  : "Your link to your documentation (Notion)"}
              </a>
            </li>
            <li>
              <span className="title">Design</span>
              <a href={infosData.design}>
                {infosData.design
                  ? infosData.design
                  : "Your link to your Figma board"}
              </a>
            </li>
            <li>
              <span className="title">Project tracker</span>
              <a href={infosData.project_tracker}>
                {infosData.project_tracker
                  ? infosData.project_tracker
                  : "Your link to your Trello"}
              </a>
            </li>
            <li>
              <span className="title">Team rules</span>
              <span>
                {infosData.team_rules
                  ? infosData.team_rules
                  : "Your team rules"}
              </span>
            </li>
          </ul>
        </>
      )}
    </TeamInfosStyles>
  );
};

export default TeamInfosComponent;
