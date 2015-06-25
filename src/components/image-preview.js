import React from 'react';

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

    let image = new Image;
    image.src = URL.createObjectURL(this.state.file);
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
