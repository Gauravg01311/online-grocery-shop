// import React from "react";
import PropTypes from "prop-types";

export function Card({ children }) {
  return <div className="border rounded-2xl shadow-lg p-4 bg-white">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.defaultProps = {
  className: "",
};
