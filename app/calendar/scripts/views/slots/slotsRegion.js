import {Region} from 'backbone.marionette';
import Radio from'backbone.radio';
import SlotsView from './slotsView';

var globalChannel = Radio.channel('calendar');
var slotsChannel = Radio.channel('calendarSlots');

var SlotsRegion = Region.extend({
  initialize: function(options) {
    this.listenTo(globalChannel, 'rendered', () => { this.onLayoutRendered(options); });
  },

  onLayoutRendered: function(options) {
    this.show(new SlotsView({
      collection: options.collection,
      model: options.model
    }));
  }
});

export default SlotsRegion;
