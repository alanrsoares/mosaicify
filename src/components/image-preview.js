import React from 'react';

let merge = Object.assign;

let getImage = (file) => {
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => resolve(image);
  });
};

let getImagePixelmap = (image) => {

};

export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ file: nextProps.file });
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    if (!this.state.file) {
      return;
    }
    getImage(this.state.file).then(this.drawImage.bind(this));
  }

  drawImage(image) {
    let canvas = React.findDOMNode(this);
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
  }

  render() {
    return !this.state.file
      ? null
      : <canvas ref="canvas"></canvas>;
  }
}
