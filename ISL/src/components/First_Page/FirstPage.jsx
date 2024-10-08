import React from "react";
import Message from "../Message/Message";
import Started_btn from "../Started_btn/Started_btn";
import './FirstPage.css'

const FirstPage = () => {
  return (
    <div className="first-page">
      {/* Content box */}
      <div className="contents">
        {/* Message component */}
        <Message />

        {/* Get Started button */}
        <Started_btn />
      </div>
    </div>
  );
};

export default FirstPage;
