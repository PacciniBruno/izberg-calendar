import Marionette from 'backbone.marionette';
import moment from 'moment';
import { Calendar } from './calendar/scripts/app';

'use strict';

var data = {};

Promise.all([
  './data/calendar.json',
  './data/service_offer.json'
].map(getJSON)).then((results) => {
  data.calendar = results[0];
  data.serviceOffer = results[1];

  initialize();
});

function initialize() {
  var myCalendar = new Calendar({
    el: '.wrapper-calendar',
  });

  myCalendar.start();
}

function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  let d = Promise.defer();

  xhr.onload = function () {
    d.resolve(JSON.parse(xhr.responseText));
  };
  xhr.open("GET", url, true);
  xhr.send();
  return d.promise;
}



