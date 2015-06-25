import React from 'react';
import AppHeader from 'components/app-header';
import MainSection from 'components/main-section';

export default class Main extends React.Component {
  render() {
    return (
      <div id="app-container">
        <AppHeader />
        <MainSection />
      </div>
    );
  }
}
