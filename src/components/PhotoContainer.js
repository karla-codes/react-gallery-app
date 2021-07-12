import React, { Component } from 'react';
import Photo from '.Photo';

class PhotoContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          <Photo />
        </ul>
      </div>
    );
  }
}

export default PhotoContainer;
