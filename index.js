import React from 'react';
import ReactDOM from 'react-dom';
import ImageSearch from './image';

// MDB Lightbox Init
$(function() {
  $('#mdb-lightbox-ui').load('mdb-addons/mdb-lightbox-ui.html');
});

ReactDOM.render(<ImageSearch />, document.querySelector('#app'));
