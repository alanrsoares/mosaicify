import React from 'react';
import MosaicBuilder from 'lib/mosaic-builder';

let merge = Object.assign;

export default class Mosaic extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, props, { progress: 0 });
  }

  componentDidMount() {
    this.update();
  }

  componentWillReceiveProps(newProps) {
    this.setState({ file: newProps.file, progress: 0 });
  }

  componentDidUpdate() {
    this.update();
  }

  render() {
    return !this.state.file
      ? null
      : <canvas className="mosaic" width="1024" height="768" ref="canvas"></canvas>;
  }

  get canvas() {
    return React.findDOMNode(this.refs.canvas);
  }

  get isRendering() {
    return this.state.progress;
  }

  update() {
    if (!this.state.file || this.isRendering) {
      return;
    }
    this.drawMosaic();
  }

  drawMosaic() {
    let builder = new MosaicBuilder(this.state.file);
    builder.onProgressChanged = this.onProgressChanged.bind(this);
    builder.drawTo(this.canvas, this.state.colors);
  }

  onProgressChanged(progress) {
    if (progress !== this.state.progress) {
      this.setState({ progress });
    }
  }
}
