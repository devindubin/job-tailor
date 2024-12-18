import React from "react";

const Button = (props) => {
  return (
    <div className="action-buttons">
      <button onClick={() => props.onClick(props.content)}>
        {props.content}
      </button>
    </div>
  );
};

export default Button;
