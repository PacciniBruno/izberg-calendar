import {Region} from 'backbone.marionette';
import Radio from'backbone.radio';
import HeaderView from './headerView';

var globalChannel = Radio.channel('calendar');

var HeaderRegion = Region.extend({
  initialize: function(options) {
    this.listenTo(globalChannel, 'rendered', () => { this.onLayoutRendered(options); });
  },

  onLayoutRendered: function(options) {
    this.show(new HeaderView({
      model: options.model
    }));
  }
});

export default HeaderRegion;
