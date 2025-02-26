// import React from "react";
import PropTypes from "prop-types"; // For prop validation

export function SelectItem({ value, children }) {
  return (
    <option value={value} className="p-2">
      {children}
    </option>
  );
}

SelectItem.propTypes = {
  value: PropTypes.string.isRequired, // value must be a string
  children: PropTypes.node.isRequired, // children is the label of the option
};
