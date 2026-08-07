import React from "react";

function PageNumber({ number, title }) {
  return (
    <div className="page-number">
      <span>{number}</span>
      <p>{title}</p>
    </div>
  );
}

export default PageNumber;
