import React from "react";

import SubmitButtonComponent from "components/SubmitButtonComponent";
import { ButtonComponent } from "components/ButtonComponent";
import timezones from "timezones-list";

export const EditableRow = ({
  getData,
  handleChangeUsername,
  handleClickCancel,
  setTimezoneEl,
}) => {
  return (
    <>
    <div className="input-group">
      <label htmlFor="username">Username</label>
      <input className="edit-input" 
            id="username" 
            type="text" 
            placeholder={getData.data?.attributes?.username} 
            onChange={handleChangeUsername} 
            defaultValue={getData.data?.attributes?.username}/>
    </div>
    <div className="input-group">
      <label htmlFor="timezone">Timezone</label>
      <select onChange={(e) => setTimezoneEl(e.target.value)} id="timezone">
        <option defaultValue hidden>
          {getData.data?.attributes?.timezone}
        </option>
        {timezones.map((option, index) => (
          <option value={option.label} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <div className="input-group btn-group">
      <SubmitButtonComponent type="submit">Submit</SubmitButtonComponent>
      <ButtonComponent onClick={handleClickCancel} 
                       colorGreenDark 
                       bgWhite 
                       borderGreenDark 
                       borderEnabled 
                       smallPadding 
                       hoverbgColorGreenLight>Cancel</ButtonComponent>
    </div>
    </>
  );
};

export default EditableRow;
