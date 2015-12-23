import {Region} from 'backbone.marionette';
import Radio from'backbone.radio';
import ControlsView from './controlsView';

var globalChannel   = Radio.channel('calendar');
var controlsChannel = Radio.channel('calendarControls');

var ControlsRegion = Region.extend({
  initialize: function(options) {
    this.listenTo(globalChannel, 'rendered', () => { this.onLayoutRendered(options) });
  },

  onLayoutRendered: function(options) {
    this.show(new ControlsView({
      model: options.model
    }));
  }
});

export default ControlsRegion;
