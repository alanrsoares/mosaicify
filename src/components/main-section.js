import React from 'react';
import AppHeader from 'components/app-header';

export default class Main extends React.Component {
  render() {
    return (
      <div className="splash-container">
        <div className="splash">
          <div className="splash-head pure-button" onClick={ this.handleFileButtonClick.bind(this) }>
            Just select an image
          </div>
          <p className="splash-subhead">
          </p>
          <p>
            <a href="http://purecss.io" className="pure-button pure-button-primary">MosaicIfy</a>
          </p>
        </div>
        <input type="file"
               className="hidden"
               ref="file"
               onChange={ this.handleFileChanged.bind(this) }
        />
      </div>
    );
  }

  handleFileChanged(e) {
    console.log(e.target.files[0]);
  }

  handleFileButtonClick() {
    this.refs.file.getDOMNode().click();
  }
}
