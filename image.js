import React, { Component } from 'react';

//THIS DOES NOTHING YET  ¯\_(ツ)_/¯
class ImageSearchData extends Component {
  componentDidMount() {}
}

//THIS DOES EVERYTHING  ¯\_(ツ)_/¯
function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  //CONSTRUCT API URL
  const data = {
    url: 'https://api.flickr.com/services/rest/?',
    method: 'method=flickr.photos.search&',
    apiKey: 'api_key=e03c0952f82752553d79c8f7a18523f0&',
    tags: 'tags=' + formData.get('search'),
    output: '&format=json&nojsoncallback=1'
  };
  //STORE API URL
  const request =
    data.url + data.method + data.apiKey + data.tags + data.output;

  //GET DATA WITH URL
  fetch(request)
    .then(data => {
      return data.json();
    })
    //DO STUFF WITH DATA
    .then(data => {
      console.log(data);
      //LOOP THROUGH AND CONSTRUCT URLS FOR IMAGES
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
        console.log(imgSource);
      }
    });
  event.target.reset();
}

//~ TYPE THE STUFF ~ PRESS THE BUTTON ~ DO THE THING ~
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
