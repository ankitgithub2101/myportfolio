import React from "react";

function Leaf({ front, back, index }) {
  return (
    <article className="leaf" data-index={index}>
      <div className="leaf__face leaf__face--front">{front}</div>

      <div className="leaf__face leaf__face--back">{back}</div>
    </article>
  );
}

export default Leaf;
