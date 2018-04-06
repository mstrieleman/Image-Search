import React, { Component } from 'react';
import { initGeolocation } from './location';

export default class ImageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      coordinates: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNearMeSubmit = this.handleNearMeSubmit.bind(this);
  }

  componentDidMount() {
    initGeolocation((err, coordinates) => {
      if (err) return console.warn(`ERROR: ${err.message}`);
      this.setState({
        coordinates
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      url: 'https://api.flickr.com/services/rest/?',
      method: 'method=flickr.photos.search&',
      apiKey: 'api_key=e03c0952f82752553d79c8f7a18523f0&',
      tags: 'tags=' + formData.get('search'),
      sort: '&sort=relevance',
      output: '&format=json&nojsoncallback=1'
    };
    const request =
      data.url +
      data.method +
      data.apiKey +
      data.tags +
      data.sort +
      data.output;

    fetch(request)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          images: data.photos.photo.reduce(
            (images, { farm, server, id, secret }) => {
              return [
                ...images,
                `http://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`
              ];
            },
            []
          )
        });
      });
  }

  handleNearMeSubmit(event) {
    const data = {
      url: 'https://api.flickr.com/services/rest/?',
      method: 'method=flickr.photos.search&',
      apiKey: 'api_key=e03c0952f82752553d79c8f7a18523f0&',
      lat: 'lat=' + this.state.coordinates.latitude + '&',
      lon: 'lon=' + this.state.coordinates.longitude + '&',
      radius: 'radius=' + 20 + '&',
      tags: 'tags=' + this.refs.search.value,
      sort: '&sort=relevance',
      output: '&format=json&nojsoncallback=1'
    };
    const request =
      data.url +
      data.method +
      data.apiKey +
      data.lat +
      data.lon +
      data.radius +
      data.tags +
      data.sort +
      data.output;

    fetch(request)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          images: data.photos.photo.reduce(
            (images, { farm, server, id, secret }) => {
              return [
                ...images,
                `http://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`
              ];
            },
            []
          )
        });
      });
    event.preventDefault();
  }

  render() {
    const images = this.state.images;
    const imageElements = images.map(e => {
      return (
        <a href={`${e}`} key={`${e}`}>
          <img src={`${e}`} className="img-fluid align-middle" key={`${e}`} />
        </a>
      );
    });
    return (
      <div>
        <nav className="navbar navbar-dark sticky-top bg-dark p-0 mt-2">
          <form
            onSubmit={this.handleSubmit}
            className="form-group row w-100 mr-2 mt-3"
          >
            <div className="input-group md-0 flex-wrap">
              <a
                className="navbar-brand col-auto mr-0 ml-2"
                style={{ color: '#e3f2fd' }}
                href="#"
              >
                Image Searcher
              </a>
              <input
                className="form-control mr-2"
                type="text"
                placeholder="Search for images here..."
                aria-label="Search"
                name="search"
                id="search"
                ref="search"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-info rounded"
                  type="submit"
                  name="standard"
                >
                  <i className="fa fa-search" />
                </button>
              </div>
              <div className="input-group-append">
                <button
                  disabled={!this.state.coordinates}
                  className="btn btn-outline-info rounded ml-2"
                  type="button"
                  id="NearMe"
                  name="nearme"
                  ref="nearme"
                  onClick={this.handleNearMeSubmit}
                >
                  NearMe
                </button>
              </div>
            </div>
          </form>
        </nav>
        {imageElements}
      </div>
    );
  }
}
