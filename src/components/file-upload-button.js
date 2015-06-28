import React from 'react';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  render() {
    return (
      <button
        className={ this.props.className }
        onClick={ this.handleFileButtonClick.bind(this) }>
        { this.props.label }
        <input type="file"
               ref="file"
               className="hidden"
               onChange={ this.props.onChange.bind(this) }
        />
      </button>
    );
  }

  handleFileButtonClick() {
    React.findDOMNode(this.refs.file).click();
  }
}
