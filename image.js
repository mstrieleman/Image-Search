import React, { Component } from 'react';

class ImageSearchData extends Component {
  componentDidMount() {}
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    url: 'https://api.flickr.com/services/rest/?',
    method: 'method=flickr.photos.search&',
    apiKey: 'api_key=e03c0952f82752553d79c8f7a18523f0&',
    tags: 'tags=' + formData.get('search'),
    output: '&format=json&nojsoncallback=1'
  };
  const request =
    data.url + data.method + data.apiKey + data.tags + data.output;

  fetch(request)
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log(response);
    });

  event.target.reset();
}

function handleChange({ target }) {}

export default function ImageSearchUI() {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="search" />
        <input
          name="search"
          placeholder="Search images here!"
          id="search"
          type="text"
          className="form-search"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn main-btn">
          Go!
        </button>
      </div>
    </form>
  );
}
