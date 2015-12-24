import {ItemView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import slotTemplate from '../../templates/slot.hbs';

var slotsChannel = Radio.channel('calendarSlots');

var SlotView = ItemView.extend({
  template: slotTemplate,

  events: {
    'click': 'onSelectSlot'
  },

  initialize: function(options) {
    this.listenTo(slotsChannel, 'slot:setUnavailable', this.onSetUnavailable);
    this.listenTo(slotsChannel, 'slot:select', this.onSlotSelect);
  },

  onSelectSlot: function() {
    slotsChannel.trigger('slot:select', this.model.get('starts_on'));
  },

  onSetUnavailable: function() {
    // TODO
    // Make necessary DOM Manipulation
  },

  onSlotSelect: function() {
    // TODO
    // Make necessary DOM Manipulation
  },

});

export default SlotView;
