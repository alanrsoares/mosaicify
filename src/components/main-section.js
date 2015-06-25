import React from 'react';
import AppHeader from 'components/app-header';
import ImagePreview from 'components/image-preview';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  render() {
    return (
      <div className="splash-container">
        <div className="splash">
          <div className="splash-head pure-button" onClick={ this.handleFileButtonClick.bind(this) }>
            Just select an image
          </div>
          <p className="splash-subhead">
            <ImagePreview file={ this.state.file } />
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
    let file = e.target.files[0];
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      return console.error('invalid format');
    }
    this.setState({ file });
  }

  handleFileButtonClick() {
    this.refs.file.getDOMNode().click();
  }
}
