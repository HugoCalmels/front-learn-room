import React from "react";

import { ButtonComponent } from "components/ButtonComponent";

export const ReadOnlyRow = ({
  getData,
  handleClickEdit,
  handleDeleteUser,
  handleClickDeleteConfirmation,
}) => {
  return (
    <>
      <div>
        <p>Username : <strong>{getData.data?.attributes?.username}</strong></p>
        <p>Timezone : <strong>{getData.data?.attributes?.timezone}</strong></p>
      </div>
      <div className="btn-group">
        <ButtonComponent bgGreenDark colorLight hoverColorGreenLight onClick={handleClickEdit}>
          Edit Profile
        </ButtonComponent>
        <ButtonComponent bgRedDark colorLight hoverbgColorLightRed onClick={handleClickDeleteConfirmation}>
          Delete account
        </ButtonComponent>
      </div>
    </>
  );
};

export default ReadOnlyRow;
