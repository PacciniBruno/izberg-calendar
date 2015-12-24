import {Model} from 'backbone';
import Radio from 'backbone.radio';

var globalChannel = Radio.channel('calendar');

var CalendarModel = Model.extend({
  initialize: function() {
    this.listenTo(globalChannel, 'setWeek', this.onSetWeek);
  },

  onSetWeek: function(week) {
    //TODO

    if (week === 'prev' && this.get('fromDate') !== 'currentFrom') {
      // set week to a week earlier
    }

    if (week === 'next' && this.get('toDate') !== 'currentTo') {
      // set week to a week earlier
    }
  }
});

export default CalendarModel;
