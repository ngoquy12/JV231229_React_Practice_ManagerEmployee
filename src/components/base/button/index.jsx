import React from "react";

const PRIMARY = "primary";
const SUCCESS = "success";
const DANGER = "danger";

export default function Button({ onClick, type, className, children }) {
  return (
    <>
      <button
        className={`${className} btn btn-${
          type === PRIMARY ? PRIMARY : type === SUCCESS ? SUCCESS : DANGER
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
