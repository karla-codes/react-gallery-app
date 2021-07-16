import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import SearchFormWithRouter from './SearchForm';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import NotFound from './NotFound';
import apiKey from '../config';

const key = apiKey;
const url = 'https://api.flickr.com/services/rest/';
const topicOne = 'cats';
const topicTwo = 'dogs';
const topicThree = 'computers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      topic: '', // topic pulled from search request, need to send to PhotoContainer to update title
      searchData: '', // data response from search request
    };
  }

  updateTopic = topic => {
    this.setState({
      topic: topic,
    });
  };

  requestSearchTopic = topic => {
    axios
      .get(
        `${url}?method=flickr.photos.search&tags=${topic}&per_page=24&format=json&nojsoncallback=1&api_key=${key}`
      )
      .then(response => {
        const responseData = response.data;
        this.setState({ searchData: responseData.photos.photo });
      })
      .catch(error => console.log(error.message));
  };

  componentDidMount() {
    const requestOne = axios.get(
      `${url}?method=flickr.photos.search&tags=${topicOne}&per_page=24&format=json&nojsoncallback=1&api_key=${key}`
    );

    const requestTwo = axios.get(
      `${url}?method=flickr.photos.search&tags=${topicTwo}&per_page=24&format=json&nojsoncallback=1&api_key=${key}`
    );

    const requestThree = axios.get(
      `${url}?method=flickr.photos.search&tags=${topicThree}&per_page=24&format=json&nojsoncallback=1&api_key=${key}`
    );

    axios
      .all([requestOne, requestTwo, requestThree])
      .then((...responses) => {
        const responseOne = responses[0][0].data;
        const responseTwo = responses[0][1].data;
        const responseThree = responses[0][2].data;
        const images = [
          responseOne.photos.photo,
          responseTwo.photos.photo,
          responseThree.photos.photo,
        ];
        this.setState({ images });
      })
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route
            render={() => (
              <SearchFormWithRouter
                updateTopic={this.updateTopic}
                requestSearchTopic={this.requestSearchTopic}
              />
            )}
          />
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="cats" />} />
            <Route
              path="/cats"
              render={({ match }) => (
                <PhotoContainer
                  images={this.state.images}
                  topic={topicOne}
                  path={match.path}
                />
              )}
            />
            <Route
              path="/dogs"
              render={({ match }) => (
                <PhotoContainer
                  images={this.state.images}
                  topic={topicTwo}
                  path={match.path}
                />
              )}
            />
            <Route
              path="/computers"
              render={({ match }) => (
                <PhotoContainer
                  images={this.state.images}
                  topic={topicThree}
                  path={match.path}
                />
              )}
            />
            <Route
              path="/search/:topic"
              render={({ match }) => (
                <PhotoContainer
                  searchData={this.state.searchData}
                  topic={this.state.topic}
                  path={match.path}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
