import React from 'react';
import AppHeader from 'components/app-header';

export default class Main extends React.Component {
  render() {
    return (
      <div className="splash-container">
        <div className="splash">
          <input type="file"
                 className="splash-head"
                 ref="file"
                 onChange={ this.handleFileChanged.bind(this) }
          />
          <p className="splash-subhead">
            Just select an image
          </p>
          <p>
            <a href="http://purecss.io" className="pure-button pure-button-primary">MosaicIfy</a>
          </p>
        </div>
      </div>
    );
  }

  handleFileChanged(e) {
    console.log(e.target.files[0]);
  }
}
