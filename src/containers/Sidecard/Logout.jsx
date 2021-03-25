import React from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";

export const Logout = ({ logOutHandler }) => {
  return (
    <Button id="btn-spotify" onClick={logOutHandler}>
      Log Out
    </Button>
  );
};

Logout.propTypes = {
  logOutHandler: PropTypes.func.isRequired,
};

export default Logout;
