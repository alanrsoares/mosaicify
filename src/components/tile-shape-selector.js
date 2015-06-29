import React from 'react';

export default class TileShapeSelector extends React.Component {
  render() {
    return (
      <div className="btn-group" role="group">
        <button className="btn btn-primary">
          <svg width="20" height="20">
            <rect width="20" height="20" style={{ fill: '#333' }} />
          </svg>
        </button>
        <button className="btn btn-primary">
          <svg width="20" height="20">
            <circle r="10" cx="10" cy="10" style={{ fill: '#333' }} />
          </svg>
        </button>
      </div>
    );
  }
}
