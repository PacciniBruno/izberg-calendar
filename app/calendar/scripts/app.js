import Marionette from 'backbone.marionette';
import { AppLayout } from './appLayout';

'use strict';

export const Calendar = Marionette.Application.extend({
  initialize(options) {
    this.on('start', () => {
      this.rootLayout = new AppLayout(options);
      this.rootLayout.render();
    });
  }
});
