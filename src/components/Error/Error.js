import React from "react";
import './Error.css'
import errorIcon from '../../images/alert-icon.png'

const Error = ( { closeError }) => {
  return (
    <div className="main-overlay">
      <div className="error">
        <img src={errorIcon} className="error-icon"></img>
        <div className="error-content">
          <h2>Oops! Looks like there as a problem.</h2>
          <h3>Please try again later.</h3>
        </div>
        <button onClick={() => closeError()} className="dismissButton">Dismiss</button>
      </div>
    </div>
  )
}

export default Error