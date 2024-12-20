import React from "react";
import "./style.css";

export const RegisterForm = () => {
  return (
    <div className="center-container">
    <div className="frame">
      <div className="div-wrapper">
        <div className="text-wrapper">Sign up</div>
      </div>

      <p className="already-have-an">
        <span className="span">Already have an account? </span>

        <span className="text-wrapper-2">Login</span>
      </p>

      <div className="input-frame-wrapper">
        <div className="input-frame">
          <div className="div">Re-enter password</div>

          <div className="input-text" />
        </div>
      </div>

      <div className="input-frame-wrapper-2">
        <div className="input-frame">
          <div className="div">Password</div>

          <div className="input-text" />
        </div>
      </div>

      <div className="input-frame-wrapper-3">
        <div className="input-frame">
          <div className="div">Email</div>

          <div className="input-text" />
        </div>
      </div>

      <div className="input-frame-wrapper-4">
        <div className="input-frame">
          <div className="div">Username</div>

          <div className="input-text" />
        </div>
      </div>

      <div className="text-wrapper-3">Create Account</div>
    </div>
    </div>
  );
};
