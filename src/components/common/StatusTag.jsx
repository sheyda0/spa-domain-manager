import React from "react";

const StatusTag = ({ status, type }) => {
  const colorMap = {
    success: "#259614",
    error: "red",
    warning: "gold",
  };

  return <span style={{ color: colorMap[type] || "black" }}>{status}</span>;
};

export default StatusTag;
