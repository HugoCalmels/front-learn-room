import React from 'react';
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const UserCardTeamComponent = ({selectedTeams}) => {
  return (
    <>
      <h2>History</h2>
      <ul className="history-list">
        {selectedTeams?.map((selectedTeam) => (
          <li key={selectedTeam.id}>
            <h4>{selectedTeam?.name}</h4>
            <p>
              <span>creator: </span>
              <strong>{selectedTeam?.creator?.username}</strong>
            </p>
            <p>
              <span>timezone: </span>
              <strong>{selectedTeam?.timezone}</strong>
            </p>
            <p>
              <span>startdate: </span>
              <strong>{selectedTeam?.start}</strong>
            </p>
            <p>
              <span>intensity: </span>
              <strong>{selectedTeam?.intensity}</strong>
            </p> 
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserCardTeamComponent;