import React from 'react';
import ImageSearch from './image';

function initGeolocation(getLocation) {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        getLocation(null, position.coords);
      },
      error => {
        getLocation(error);
      }
    );
  } else {
    console.warn('Geolocation is not supported');
  }
}

export { initGeolocation };
