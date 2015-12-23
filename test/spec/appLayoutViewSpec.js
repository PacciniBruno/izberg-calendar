import Backbone from 'backbone';
import AppLayout from '../../app/calendar/scripts/views/AppLayoutView';
import $ from 'jquery';
import test from 'tape';

test('Rendering the main layout', (assert) => {
  var layout = new AppLayout();
  layout.render();

  assert.ok($(layout.el).find('h1').length > 0, 'title should be in the layout view el');
  assert.end();
});

