import React from "react";

const Window = ({ children }) => {
  return (
    <div className="window">
      <h1>Main Window</h1>
      {children}
    </div>
  );
};

export default Window;
