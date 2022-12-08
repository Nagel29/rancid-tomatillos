import React from "react";
import './Error.css'
import errorIcon from '../../images/alert-icon.png';
import { Link } from 'react-router-dom';

const Error = ( { closeError }) => {
  return (
    <div className="main-overlay">
      <div className="error">
        <img src={errorIcon} className="error-icon"></img>
        <div className="error-content">
          <h2>Oops! Looks like there as a problem.</h2>
          <h3>Please try again later.</h3>
        </div>
        <Link to='/' onClick={() => closeError()}><button className="dismissButton">Dismiss</button></Link>
      </div>
    </div>
  )
}

export default Error