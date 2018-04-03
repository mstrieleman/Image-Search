import React from 'react';
import ImageSearch from './image';

var latitude = '';
var longitude = '';

function initGeolocation() {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.warn('Geolocation is not supported');
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

export { initGeolocation, error, success, latitude, longitude };
