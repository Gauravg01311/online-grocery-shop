// import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

export function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
}

// Prop validation
Button.propTypes = {
  onClick: PropTypes.func.isRequired, // onClick should be a function and is required
  children: PropTypes.node.isRequired, // children can be any renderable content (e.g., text, elements)
  className: PropTypes.string, // className should be a string (optional)
};

// Default props
Button.defaultProps = {
  className: "", // default className if none is provided
};
