import React from "react";
import "../Styles/NotFound.css";
const NotFound = () => {
  return (
    <div className="notFound">
      <h1 className="notFound__title">404 - Page Not Found</h1>
      <p className="notFound__text">
        It looks like you've entered an invalid URL. Don't worry, it happens to
        the best of us!
      </p>
    </div>
  );
};

export default NotFound;
