import React from 'react';
import AppHeader from 'components/app-header';
import FileUploadButton from 'components/file-upload-button';
import Mosaic from 'components/mosaic';
import TileShapeSelector from 'components/tile-shape-selector';

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
        <FileUploadButton
          label="Pick a photo"
          className="btn-file-upload"
          onChange={ this.handleFileChanged.bind(this) }/>
        <div className="mosaic-container">
          { this.renderMosaic() }
        </div>
      </section>
    );
  }

  renderMosaic() {
    let { file } = this.state;
    if (file && !file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      return <div>Invalid image format</div>;
    }
    return <Mosaic file={ file } />;
  }

  handleFileChanged(e) {
    let file = e.target.files[0];
    this.setState({ file });
  }
}
