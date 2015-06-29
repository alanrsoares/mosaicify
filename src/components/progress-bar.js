import React from 'react';
import MosaicBuilder from 'lib/mosaic-builder';
import MosaicStore from 'stores/mosaic-store';

export default class ProgressBar extends React.Component {
  constructor() {
    super();
    this.state = MosaicStore.getState();
  }

  componentDidMount() {
    MosaicStore.listen(this.onStoreChange.bind(this));
  }

  componentWillUnmount() {
    MosaicStore.unlisten(this.onStoreChange);
  }

  render() {
    if (!this.state.progress) {
      return null;
    }

    let percent = `${ this.state.progress }%`;

    return (
      <div className="progress">
        <div className="progress-bar"
             role="progressbar"
             aria-valuenow={ this.state.progress }
             aria-valuemin="0"
             aria-valuemax="100"
             style={{ width: percent }}>
          <span className="sr-only"> { percent } Complete</span>
        </div>
      </div>
    );
  }

  onStoreChange() {
    let { progress } = MosaicStore.getState();
    if (progress !== this.state.progress) {
      this.setState({ progress });
    }
  }
}
