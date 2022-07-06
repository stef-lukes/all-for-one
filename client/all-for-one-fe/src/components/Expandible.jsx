import { React, useState } from "react";

export default function Expandible({ children }) {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <>
      {showChildren ? children : null}
      <button onClick={() => setShowChildren((prevShow) => !prevShow)}>
        {showChildren ? "Hide" : "View"}
      </button>
    </>
  );
}
