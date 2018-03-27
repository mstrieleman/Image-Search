import React from 'react';

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    search: formData.get('search')
  };
  console.log(JSON.stringify(data, null, 2));
  event.target.reset();
}

function handleChange({ target }) {
  console.log(target.getAttribute('name'), target.value);
}

export default function ImageSearch() {
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
