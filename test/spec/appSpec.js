import Calendar from '../../app/calendar/scripts/app';
import $ from 'jquery';
import test from 'tape';
import {Model} from 'backbone';

function initializeCalendar() {
  var calendarModel = new Model(data.calendar);
  var serviceOfferModel = new Model(data.serviceOffer);

  var myCalendar = new Calendar();

  myCalendar.start({
    el: '#myCalendarContainer',
    calendarModel: calendarModel,
    serviceOfferModel: serviceOfferModel
  });
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

function createFixture(id) {
  if (!document) { return; }
  var el = document.createElement('div');
  el.setAttribute('id', id);
  return document.body.appendChild(el);
}

function removeFixture(id) {
  var el = document.getElementById(id);
  el.parentNode.removeChild(el);
}

test('Rendering the calendar correctly', (assert) => {
  var $container = createFixture('myCalendarContainer');

  // Get fixture Data:
  var data = {};
  Promise.all([
    '../app/data/calendar.json',
    '../app/data/service_offer.json'
  ].map(getJSON)).then((results) => {
    data.calendar = results[0];
    data.serviceOffer = results[1];

    // Then create the app:
    initializeCalendar();
    assert.ok($($container).find('h1').length > 0, 'It should render correctly');

    // Clean up
    removeFixture('myCalendarContainer');
    assert.end();
  });
});

