import {CompositeView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import moment from 'moment';
import * as _ from 'underscore';
import SlotView from './slotView';
import slotsTemplate from '../../templates/slots.hbs';

var SlotsView = CompositeView.extend({
  childView: SlotView,

  template: slotsTemplate,

  initialize: function(options) {
    this.listenTo(this.model, 'change:weekDays', this.onDateRangeChange);
    this.listenTo(this.model, 'change:hours', this.render);

    this.model.set(this.getHoursRange());
  },

  onDateRangeChange: function() {
    this.model.set(this.getHoursRange());
    this.render();
  },

  filter: function(child, index, collection) {
    return this.isInDateRange(child);
  },

  // attachHtml: function(collectionView, childView, index) {
  //   // TODO
  //   // Get View index from childView.model and append to the table element
  //   // with the right coordinates
  //   collectionView.$("my selector with proper coordinates").append(childView.el);
  // },

  // This manipulation should probably happen in the model,
  // or upfront at the collection creation
  getHoursRange: function() {

    // Looping over the collection will happen Three times: here,
    // in the getRowsFromCollection method, and in the filter method.
    // Doesn't look optimal. Maybe we should serve a collection
    // to the collection view, with in-range models only
    var slotsInRange = this.collection.filter(el => {
      return this.isInDateRange(el);
    })

    var minHourModel = _.min(slotsInRange, el => {
      return moment(el.get('starts_on')).hour();
    });

    var maxHourModel = _.max(slotsInRange, el => {
      return moment(el.get('ends_on')).hour();
    });

    var minHour = moment(minHourModel.get('starts_on')).hour();
    var maxHour = moment(maxHourModel.get('starts_on')).hour();

    var hours = [];
    var hour;

    for (hour = minHour; hour <= maxHour; hour++) {
      hours.push(hour);
    }

    return {
      fromHour: minHour,
      toHour: minHour,
      hours: hours
    };
  },

  isInDateRange: function(child) {
    var isAfterCurrentFrom = moment(child.get('starts_on')).isAfter(this.model.get('currentFrom'));
    var isBeforeCurrentTo = moment(child.get('ends_on')).isBefore(this.model.get('currentTo'));

    return isAfterCurrentFrom && isBeforeCurrentTo;
  }
});

export default SlotsView;
