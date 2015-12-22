import Backbone from 'backbone';
import { AppLayout } from 'AppLayout';
import { Calendar } from 'App';
import $ from 'jquery';
import test from 'tape';

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

test('Rendering the main layout', (assert) => {
  var layout = new AppLayout();
  layout.render();

  assert.ok($(layout.el).find('h1').length > 0, 'title should be in the layout view el');
  assert.end();
});

test('Rendering the calendar correctly', (assert) => {
  var $container = createFixture('myCalendarContainer');

  var myCalendar = new Calendar({
    el: '#myCalendarContainer',

  });

  myCalendar.start();

  assert.ok($($container).find('h1').length > 0, 'title should be in the rootLayout view el');

  // Clean up
  // removeFixture('myCalendarContainer');
  assert.end();
});

