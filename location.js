import React from 'react';
import ImageSearch from './image';

function initGeolocation(success) {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        success(null, position.coords);
      },
      error => {
        success(error);
      }
    );
  } else {
    console.warn('Geolocation is not supported');
  }
}

export { initGeolocation };
