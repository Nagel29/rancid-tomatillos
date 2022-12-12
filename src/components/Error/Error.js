import React from "react";
import { Link } from 'react-router-dom';
import './Error.css'
import errorIcon from '../../images/alert-icon.png';
import PropType from 'prop-types'

const Error = ( { closeError, status}) => {
  if(status >= 500) { 
    return (
      <div className="main-overlay">
        <div className="error">
          <img src={errorIcon} className="error-icon"></img>
          <div className="error-content">
            <h2>Oops! Looks like there as a problem.</h2>
            <h3>Please try again later.</h3>
          </div>
          <Link to='/' className="buttonLink" onClick={() => closeError()}><button className="dismissButton">Dismiss</button></Link>
        </div>
      </div>
    )
  } else {
    return (
      <div className="main-overlay">
        <div className="error">
          <img src={errorIcon} className="error-icon"></img>
          <div className="error-content">
            <h2>404 Not Found</h2>
            <h3>Uh oh.. This page doesn't exist. Please try again.</h3>
          </div>
          <Link to='/' className="buttonLink" onClick={() => closeError()}><button className="dismissButton">Dismiss</button></Link>
        </div>
      </div>
    )
  }
}

export default Error

Error.propType = {
  closeError: PropType.func.isRequired
}