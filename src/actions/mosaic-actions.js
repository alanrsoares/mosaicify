import alt from 'alt-instance';

class MosaicActions {
  constructor() {
    this.generateActions(
      'updateFile',
      'updateProgress'
    );
  }
}

export default alt.createActions(MosaicActions);
