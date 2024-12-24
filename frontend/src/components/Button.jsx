import React from "react";

const Button = ({ children, content, onClick, ...style }) => {
  return (
    <div className="action-buttons">
      <button {...style} onClick={() => onClick(content)}>
        {content}
        {children}
      </button>
    </div>
  );
};

export default Button;
