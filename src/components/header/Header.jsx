import React from 'react';
import moment from 'moment';
import './header.scss';

const Header = ({ isShowModal, prevHandler, nextHandler, todayHandler, monthShown }) => {
  return (
    <header className="header">
      <div className="navigation">
        <button className="button create-event-btn" onClick={isShowModal}>
          <i className="fa-solid fa-circle-plus create-event-btn__icon"></i>Create
        </button>
        <button className="navigation__today-btn button" onClick={todayHandler}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={prevHandler}>
          <i className="fa-solid fa-circle-arrow-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={nextHandler}>
          <i className="fa-solid fa-circle-arrow-right"></i>
        </button>
        <span className="navigation__displayed-month">{monthShown}</span>
      </div>
      <div className="author-text">
        <div className="sun">
          <i className="fa-solid fa-sun"></i>
          <i className="fa-solid fa-sun"></i>
          <i className="fa-solid fa-sun"></i>
        </div>
        <span className="author-text">{`Calendar ${moment().format('YYYY')}`}</span>
        <div className="moon">
          <i className="fa-solid fa-moon"></i>
          <i className="fa-solid fa-moon"></i>
          <i className="fa-solid fa-moon"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
