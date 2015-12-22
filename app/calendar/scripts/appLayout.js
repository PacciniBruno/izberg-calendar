import Marionette from 'backbone.marionette';
import layoutTemplate from './templates/layout.hbs';

export const AppLayout = Marionette.LayoutView.extend({
  template: layoutTemplate,

  regions: {
    calendar: '.wrapper-calendar',
  }
});
