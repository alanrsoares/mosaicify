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
          <div className="splash-head pure-button"
               onClick={ this.handleFileButtonClick.bind(this) }>
            Just select an image
          </div>
          <p className="splash-subhead">
            { this.renderImagePreview() }
          </p>
        </div>
        <input type="file"
               ref="file"
               className="hidden"
               onChange={ this.handleFileChanged.bind(this) }
        />
      </div>
    );
  }

  renderImagePreview() {
    let { file } = this.state;
    if (file && !file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      return <div>Invalid image format</div>;
    }
    return <ImagePreview file={ file } />;
  }

  handleFileChanged(e) {
    let file = e.target.files[0];
    this.setState({ file });
  }

  handleFileButtonClick() {
    React.findDOMNode(this.refs.file).click();
  }
}
