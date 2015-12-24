import {LayoutView} from 'backbone.marionette';
import SlotsRegion from './slots/slotsRegion';
import HeaderRegion from './header/headerRegion';
import ControlsRegion from './controls/controlsRegion';
import layoutTemplate from '../templates/layout.hbs';
import Radio from'backbone.radio';

var globalChannel = Radio.channel('calendar');

var AppLayout = LayoutView.extend({

  template: layoutTemplate,

  initialize: function(options) {
    this.model = options.calendarModel;
    this.collection = options.slotsCollection;
  },

  regions: (options) => ({
    slots: {
      selector: '.wrapper-slots',
      regionClass: SlotsRegion,
      collection: options.slotsCollection,
      model: options.calendarModel
    },
    header: {
      selector: '.wrapper-header',
      regionClass: HeaderRegion,
      model: options.calendarModel
    },
    controls: {
      selector: '.wrapper-nav',
      regionClass: ControlsRegion,
      model: options.calendarModel
    }
  }),

  onRender: function() {
    globalChannel.trigger('rendered');
  },
});

export default AppLayout;
