import React from 'react';

const PROJECT_URL = 'https://github.com/alanrsoares/mosaicify';

export default class ForkMeOnGithubRibbon extends React.Component {
  render() {
    return (
      <div>
        <div className="github-fork-ribbon-wrapper right-bottom visible-xs">
          <div className="github-fork-ribbon">
            <a href={ PROJECT_URL }>Fork me on GitHub</a>
          </div>
        </div>
        <div className="github-fork-ribbon-wrapper right hidden-xs">
          <div className="github-fork-ribbon">
            <a href={ PROJECT_URL }>Fork me on GitHub</a>
          </div>
        </div>
      </div>
    );
  }
}
