import React, { Component } from 'react';
import {
  initGeolocation,
  error,
  success,
  latitude,
  longitude
} from './location';

export default class ImageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNearMeSubmit = this.handleNearMeSubmit.bind(this);
  }

  componentDidMount() {
    initGeolocation();
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
    const formData = new FormData(event.target);
    const data = {
      url: 'https://api.flickr.com/services/rest/?',
      method: 'method=flickr.photos.search&',
      apiKey: 'api_key=e03c0952f82752553d79c8f7a18523f0&',
      lat: 'lat=' + latitude + '&',
      lon: 'lon=' + longitude + '&',
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
        <a href={`${e}`}>
          <img src={`${e}`} class="img-fluid align-middle" key={e} />
        </a>
      );
    });
    return (
      <div>
        <nav class="navbar navbar-dark sticky-top bg-dark p-0 mt-2">
          <form
            onSubmit={this.handleSubmit}
            class="form-group row w-100 mr-2 mt-3"
          >
            <div class="input-group md-0 flex-wrap">
              <a
                class="navbar-brand col-auto mr-0 ml-2"
                style={{ color: '#e3f2fd' }}
                href="#"
              >
                Image Searcher
              </a>
              <input
                class="form-control mr-2"
                type="text"
                placeholder="Search for images here..."
                aria-label="Search"
                name="search"
                id="search"
                ref="search"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-info rounded"
                  type="submit"
                  name="standard"
                >
                  <i class="fa fa-search" />
                </button>
              </div>
              <div class="input-group-append">
                <button
                  class="btn btn-outline-info rounded ml-2"
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
