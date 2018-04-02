import React, { Component } from 'react';

export default class ImageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    event.target.reset();
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
        <nav class="navbar navbar-dark sticky-top bg-dark justify-content-between flex-wrap2 flex-md-nowrap p-0">
          <form onSubmit={this.handleSubmit} class="form-group w-100 mr-2 p-0">
            <div class="input-group py-1 px-2 px-md-0 flex-wrap">
              <a
                class="navbar-brand col-auto mr-0 "
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
              />
              <div class="input-group-append">
                <button class="btn btn-outline-info rounded" type="submit">
                  <i class="fa fa-search" />
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
