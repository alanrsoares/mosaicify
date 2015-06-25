import React from 'react';

let getImage = (file) => {
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function() {
      resolve(image);
    };
  });
};

export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: props.file
    };
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

    getImage(this.state.file).then((image) => {
      console.log(image);
      let canvas = React.findDOMNode(this);
      let context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, 200, 200);
    });
  }

  render() {
    let width = 600;
    let height = 600;

    if (!this.props.file) {
      return null;
    }

    return (
      <canvas ref="canvas" width={ width } height={ height }></canvas>
    );
  }
}
