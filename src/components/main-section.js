import React from 'react';
import AppHeader from 'components/app-header';
import FileUploadButton from 'components/file-upload-button';
import Mosaic from 'components/mosaic';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  render() {
    return (
      <section id="main-section" className="container-fluid">
        <div className="mosaic-controls">
          <FileUploadButton
            label="Pick a photo"
            className="btn-file-upload"
            onChange={ this.handleFileChanged.bind(this) }/>
        </div>
        <div className="mosaic-container">
          { this.renderMosaic() }
        </div>
      </section>
    );
  }

  renderMosaic() {
    let { file } = this.state;
    if (file && !file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      return <div className="alert alert-warning" role="alert">Invalid file format.</div>;
    }
    return <Mosaic file={ file } />;
  }

  handleFileChanged(e) {
    let file = e.target.files[0];
    this.setState({ file });
  }
}
