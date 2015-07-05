import React from 'react';
import MosaicBuilder from 'lib/mosaic-builder';
import MosaicActions from 'actions/mosaic-actions';

let merge = Object.assign;
let defaultIfLess = (value, defaultValue) => value > defaultValue ? value : defaultValue;

export default class Mosaic extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, props);
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
    let innerWidth = defaultIfLess(window.innerWidth, 1024);
    let innerHeight = defaultIfLess(window.innerHeight, 768);

    return !this.state.file
      ? null
      : <canvas className="mosaic" width={ innerWidth } height={ innerHeight } ref="canvas"></canvas>;
  }

  get canvas() {
    return React.findDOMNode(this.refs.canvas);
  }

  update() {
    this.drawMosaic();
  }

  drawMosaic() {
    let builder = new MosaicBuilder(this.state.file);
    builder.drawTo(this.canvas, this.state.colors);
  }
}
