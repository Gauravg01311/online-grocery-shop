import  { useState } from "react";
import PropTypes from "prop-types"; // For prop validation

export function Select({ children, onValueChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value); // Pass the selected value to the parent
    }
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="p-2 border rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  );
}

Select.propTypes = {
  children: PropTypes.node.isRequired, // The children will be SelectItem components
  onValueChange: PropTypes.func.isRequired, // onValueChange is required to handle value change
};
