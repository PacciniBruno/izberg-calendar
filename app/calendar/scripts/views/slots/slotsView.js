import {CollectionView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import moment from 'moment';
import SlotView from './slotView';
import slotsTemplate from '../../templates/slots.hbs';

var SlotsView = CollectionView.extend({
  childView: SlotView,

  template: slotsTemplate,

  initialize: function(options) {
    this.listenTo(this.model, 'change:weekDays', this.onDateRangeChange)
  },

  onDateRangeChange: function() {
    this.render();
  },

  filter: function(child, index, collection) {
    var isAfterCurrentFrom = moment(child.get('starts_on')).isAfter(this.model.get('currentFrom'));
    var isBeforeCurrentTo = moment(child.get('ends_on')).isBefore(this.model.get('currentTo'));

    return isAfterCurrentFrom && isBeforeCurrentTo;
  },
});

export default SlotsView;
