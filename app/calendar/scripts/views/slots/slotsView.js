import {CollectionView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import SlotView from './slotView';
import slotsTemplate from '../../templates/slots.hbs';

var SlotsView = CollectionView.extend({
  childView: SlotView,
  template: slotsTemplate,

  initialize: function(options) {
  },

  filter: function(child, index, collection) {
    //TODO

    // Only care for slots in the week range we're in
  },
});

export default SlotsView;
