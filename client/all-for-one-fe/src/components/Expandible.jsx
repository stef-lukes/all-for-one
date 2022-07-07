import { React, useState } from "react";

export default function Expandible({ children }) {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <>
      {showChildren ? children : null}
      <button className="log-reg-btn post-form-btn" onClick={() => setShowChildren((prevShow) => !prevShow)}>
        {showChildren ? "Hide" : "View"}
      </button>
    </>
  );
}
