import {ItemView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import controlsTemplate from '../../templates/controls.hbs';

var globalChannel = Radio.channel('calendar');

var SlotView = ItemView.extend({
  template: controlsTemplate,

  events: {
    'click .control-button-prev': 'onClickPrevious',
    'click .control-button-next': 'onClickNext'
  },

  initialize: function(options) {
  },

  onClickPrevious: function() {
    globalChannel.trigger('setWeek', 'prev');
  },

  onClickNext: function() {
    globalChannel.trigger('setWeek', 'next');
  },

});

export default SlotView;
