import React, { Component } from 'react';

const formData = new FormData(event);
const data = {
  url: 'https://api.flickr.com/services/rest/?',
  method: 'method=flickr.photos.search&',
  apiKey: 'api_key=e03c0952f82752553d79c8f7a18523f0&',
  tags: 'tags=' + formData.get('search'),
  output: '&format=json&nojsoncallback=1'
};
const request = data.url + data.method + data.apiKey + data.tags + data.output;

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
    fetch(request)
      .then(data => {
        if (!data.ok) {
          throw Error('Request Failed!');
        }
        return data.json();
      })
      .then(data => {
        for (let i = 0; i < data.photos.photo.length; i++) {
          let farm = data.photos.photo[i].farm;
          let server = data.photos.photo[i].server;
          let id = data.photos.photo[i].id;
          let secret = data.photos.photo[i].secret;
          let imgSource =
            'http://farm' +
            farm +
            '.static.flickr.com/' +
            server +
            '/' +
            id +
            '_' +
            secret +
            '.jpg';
          this.state.images.push(imgSource);
          console.log(this.state.images);
          //MAYBE YOU SHOULD USE SET STATE
        }
      });
    event.target.reset();
  }

  render() {
    return (
      <div className="images">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="search" />
            <input
              name="search"
              placeholder="Search images here!"
              id="search"
              type="text"
              className="form-search"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn main-btn">
              Go!
            </button>
          </div>
        </form>
        <div>
          <img src={this.state.images[0]} />
        </div>
      </div>
    );
  }
}
