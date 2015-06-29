import alt from 'alt-instance';
import MosaicActions from 'actions/mosaic-actions';

class MosaicStore {
  constructor() {
    this.bindActions(MosaicActions);
    this.file = null;
    this.progress = null;
  }

  onUpdateFile(file) {
    this.file = file;
  }

  onUpdateProgress(progress) {
    this.progress = progress;
  }

}

export default alt.createStore(MosaicStore, 'MosaicStore');
