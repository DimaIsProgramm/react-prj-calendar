import React from 'react';
import moment from 'moment';
import './header.scss';

const Header = ({ isShowModal, prevHandler, nextHandler, todayHandler, month }) => {
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
        <span className="navigation__displayed-month">{month.format('MMM')}</span>
      </div>
    </header>
  );
};

export default Header;
