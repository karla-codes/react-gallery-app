import React, { Component } from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

class PhotoContainer extends Component {
  render() {
    console.log(this.props);
    if (this.props.topic) {
      if (this.props.images) {
        if (this.props.images.length > 0) {
          let images;
          const topic = this.props.topic;
          if (this.props.path === '/cats') {
            images = this.props.images[0];
          } else if (this.props.path === '/dogs') {
            images = this.props.images[1];
          } else if (this.props.path === '/computers') {
            images = this.props.images[2];
          }

          console.log(images);
          return (
            <div className="photo-container">
              <h2>{topic}</h2>
              <ul>
                {images.map(image => {
                  const server = image.server;
                  const key = image.id;
                  const secret = image.secret;
                  console.log(this.props.path);
                  return (
                    <Photo server={server} key={key} secret={secret} id={key} />
                  );
                })}
              </ul>
            </div>
          );
        } else {
          return <div className="photo-container"></div>;
        }
      } else {
        let images = this.props.searchData;
        if (images.length > 0) {
          const topic = this.props.topic;
          return (
            <div className="photo-container">
              <h2>{topic}</h2>
              <ul>
                {images.map(image => {
                  const server = image.server;
                  const key = image.id;
                  const secret = image.secret;
                  console.log(this.props.path);
                  return (
                    <Photo server={server} key={key} secret={secret} id={key} />
                  );
                })}
              </ul>
            </div>
          );
        } else {
          return <div className="photo-container"></div>;
        }
      }
    } else {
      return <NotFound />;
    }
  }
}

export default PhotoContainer;
