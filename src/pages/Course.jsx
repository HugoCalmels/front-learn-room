import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import anime from "animejs/lib/anime.es.js";
import { v4 as uuid_v4 } from "uuid";
import Cookies from "js-cookie";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import TopPageButtonComponent from "components/TopPageButtonComponent";
import FiguresOutsideComponent from "components/FiguresOutsideComponent";
import { ButtonComponent } from "components/ButtonComponent";
import CardTeamComponent from "components/CardTeamComponent";
import FlashContext from "FlashContext";
import { LoggedContext } from "App";
import LoaderSpinnerComponent from "components/LoaderSpinnerComponent";
import { TeamForm } from "components/TeamForm";
import { CourseStyles } from "../assets/styles/CoursesStyles";
import { toGmt } from "../components/Utils";

export const Course = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = React.useState({});
  const [teams, setTeams] = React.useState([]);

  const [nameEl, setNameEl] = React.useState("");
  const [intensityEl, setIntensityEl] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());

  const [isOpen, setIsOpen] = React.useState(false);
  const [teamsItems, setTeamsItem] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const flash = useContext(FlashContext);
  const { isLogged } = useContext(LoggedContext);

  React.useEffect(() => {
    getCourse();
  }, [teamsItems]);

  const regex = /([-+]*\d{2})(?=:)/gm;
  const getUserId = Cookies.get("user_id");
  const [
    currentUserTimezoneNumberMinusOne,
    setCurrentUserTimezoneNumberMinusOne,
  ] = React.useState("");
  const [
    currentUserTimezoneNumberPlusOne,
    setCurrentUserTimezoneNumberPlusOne,
  ] = React.useState("");
  const [currentUserTimezone, setCurrentUserTimezone] = React.useState("");
  const [currentUserTimezoneNumber, setCurrentUserTimezoneNumber] =
    React.useState("");

  // Get one COURSE
  const getCourse = async () => {
    const config = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    setIsLoading(true);
    if (isLogged) {
      getCurrentUserTimezone();
    }
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}courses/${id}`,
      config
    ).catch((error) => error);
    if (res instanceof Error) {
      const error = await res.json();
      const messages = `${[...Object.entries(error)]}`;
      flash.setType("danger");
      flash.setMessage(messages);
    } else {
      const data = await res.json();
      setCourseData(data);
      setTeamsItem(data.teams.length);
      setTeams(data.teams.reverse());
    }
    setIsLoading(false);
  };

  const handleChangeName = (e) => {
    setNameEl(e.target.value);
  };

  const handleChangeIntensity = (e) => {
    setIntensityEl(e.target.value);
  };

  // get current user
  const getCurrentUserTimezone = async () => {
    const config = {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}api/users/${getUserId}`,
      config
    ).catch((error) => error);

    if (res instanceof Error) {
      const error = await res.json();
      const messages = `${[...Object.entries(error)]}`;
      flash.setType("danger");
      flash.setMessage(messages);
    } else {
      const currentUserData = await res.json();
      setCurrentUserTimezone(currentUserData.data.attributes.timezone);
      setCurrentUserTimezoneNumber(
        currentUserData.data.attributes.timezone_number
      );
      setCurrentUserTimezoneNumberMinusOne(
        currentUserData.data.attributes.timezone_number - 1
      );
      setCurrentUserTimezoneNumberPlusOne(
        currentUserData.data.attributes.timezone_number + 1
      );
    }
  };

  // CREATE A TEAM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (intensityEl === "") {
      flash.setType("danger");
      flash.setMessage("You must choose an intensity!");
    } else {
      const creds = {
        name: nameEl,
        start: startDate,
        intensity: intensityEl,
        timezone: currentUserTimezone,
        timezone_number: currentUserTimezoneNumber,
      };

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(creds),
      };

      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}courses/${id}/teams`,
        config
      ).catch((error) => error);

      if (res instanceof Error) {
        const error = await res.json();
        const messages = `${[...Object.entries(error)]}`;
        flash.setType("danger");
        flash.setMessage(messages);
        window.scrollTo(0, 0);
      } else {
        flash.setType("success");
        flash.setMessage("Your team has been created!");
        setNameEl("");
        setIntensityEl("");
        setStartDate(new Date());

        setTeamsItem(teamsItems + 1);
        handleClickForm();
      }
      setIsLoading(false);
    }
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
    } else {
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

  return (
    <CourseStyles>
      <TopPageButtonComponent />

      {/* F I G U R E S */}
      <FiguresOutsideComponent
        data={courseData}
        link={courseData.link_to_course}
      />

      {/* F O R M */}
      <section className="section" id="section-team-form">
        {/* BUTTON toggle */}
        {isLogged ? (
          <ButtonComponent onClick={handleClickForm}>
            Create your team
          </ButtonComponent>
        ) : (
          <h4>Login to create a team</h4>
        )}

        {/* FORM */}
        <TeamForm
          handleSubmit={handleSubmit}
          handleChangeName={handleChangeName}
          setStartDate={setStartDate}
          handleChangeIntensity={handleChangeIntensity}
          startDate={startDate}
          nameEl={nameEl}
        />
      </section>

      <p className="section">OR</p>

      {/* T E A M S  L I S T */}
      <section className="section">
        {isLogged ? (
          <React.Fragment>
            <h3>
              <b> Join a team ! </b>
            </h3>
            <div className="timezones">
              <div className="selections">
                <h4>Searching for :</h4>
                {toGmt(currentUserTimezoneNumberMinusOne)} -
                <b>{toGmt(currentUserTimezoneNumber)}</b> -
                {toGmt(currentUserTimezoneNumberPlusOne)}
              </div>

              <p>
                If you need to adjust your timezone filters, go to your{" "}
                <Link to="/profile">
                  <b>
                    <u>Profile</u>
                  </b>
                </Link>{" "}
                page
              </p>
            </div>
          </React.Fragment>
        ) : (
          <h4>Login to join a team</h4>
        )}

        {!isLoading ? (
          <div className="teams-list">
            <Swiper
              breakpoints={{
                530: {
                  spaceBetween: 20,
                },
                1024: {
                  spaceBetween: 40,
                },
              }}
              spaceBetween={15}
              slidesPerView={"auto"}
            >
              {teams &&
                teams.map((team) => (
                  <React.Fragment key={team.id}>
                    {currentUserTimezoneNumber === team.timezone_number ||
                    currentUserTimezoneNumber === team.timezone_number + 1 ||
                    currentUserTimezoneNumber === team.timezone_number - 1 ? (
                      <SwiperSlide key={uuidv4()}>
                        <Link
                          to={`${courseData.id}/teams/${team.id}`}
                          key={uuid_v4()}
                        >
                          <CardTeamComponent data={team} />
                        </Link>
                      </SwiperSlide>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                ))}
            </Swiper>
          </div>
        ) : (
          <LoaderSpinnerComponent isLoading={isLoading} />
        )}
      </section>
    </CourseStyles>
  );
};
