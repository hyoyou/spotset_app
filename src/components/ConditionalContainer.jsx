import PropTypes from "prop-types";

export const ConditionalContainer = ({ condition, children }) => {
  if (condition) {
    return children;
  }

  return null;
};

ConditionalContainer.propTypes = {
  condition: PropTypes.any
};

ConditionalContainer.defaultProps = {
  condition: false
};

export default ConditionalContainer;
