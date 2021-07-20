import React, { Component } from 'react';
import { withRouter } from 'react-router';
import NotFound from './NotFound';
import Photo from './Photo';

/**
 * Displays images or error pages based on the current route path
 */
class PhotoContainer extends Component {
  // updates page with content fetched from search query
  componentDidUpdate(prevProps) {
    const currentTopic = this.props.match.params.topic;
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      currentTopic
    ) {
      this.props.requestSearchTopic(currentTopic);
      this.props.updateTopic(currentTopic);
    }
  }

  render() {
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

          return (
            <div className="photo-container">
              <h2>{topic}</h2>
              <ul>
                {images.map(image => {
                  const server = image.server;
                  const key = image.id;
                  const secret = image.secret;
                  return (
                    <Photo server={server} key={key} secret={secret} id={key} />
                  );
                })}
              </ul>
            </div>
          );
        } else {
          return (
            <div className="photo-container">
              <h2>Loading...</h2>
            </div>
          );
        }
      } else {
        let images = this.props.searchData;
        if (this.props.loading) {
          return (
            <div className="photo-container">
              <h2>Loading...</h2>
            </div>
          );
        } else {
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
                    return (
                      <Photo
                        server={server}
                        key={key}
                        secret={secret}
                        id={key}
                      />
                    );
                  })}
                </ul>
              </div>
            );
          } else {
            return <NotFound />;
          }
        }
      }
    } else {
      return <NotFound />;
    }
  }
}

export default withRouter(PhotoContainer);
