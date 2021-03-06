import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import SearchForm from './SearchForm';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import Error404 from './Error404';
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
      loading: '', // indicates whether a search request is loading
    };
  }

  updateTopic = topic => {
    this.setState({
      topic: topic,
    });
  };

  /**
   * Fetches data based on user search query
   *
   * @param {string} topic
   */

  requestSearchTopic = topic => {
    this.setState({ loading: true }, () => {
      axios
        .get(
          `${url}?method=flickr.photos.search&tags=${topic}&per_page=24&format=json&nojsoncallback=1&api_key=${key}`
        )
        .then(response => {
          const responseData = response.data;
          this.setState({
            searchData: responseData.photos.photo,
            loading: false,
          });
        })
        .catch(error => console.log(error.message));
    });
  };

  /**
   * Fetches data for three different topics
   */
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
          <Route render={() => <SearchForm updateTopic={this.updateTopic} />} />
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
                  requestSearchTopic={this.requestSearchTopic}
                  updateTopic={this.updateTopic}
                  searchData={this.state.searchData}
                  topic={this.state.topic}
                  loading={this.state.loading}
                  path={match.path}
                />
              )}
            />
            <Route component={Error404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
