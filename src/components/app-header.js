import React from 'react';
import AppHeader from 'components/app-header';

export default class Main extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img alt="Brand" src="assets/images/logo3.png"/>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
