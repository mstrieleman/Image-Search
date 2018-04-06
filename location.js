import React from 'react';
import ImageSearch from './image';

function initGeolocation(done) {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        done(null, position.coords);
      },
      err => {
        done(err);
      }
    );
  } else {
    console.warn('Geolocation is not supported');
  }
}

export { initGeolocation };
