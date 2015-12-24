import {Model} from 'backbone';
import Radio from 'backbone.radio';
import moment from 'moment';

var globalChannel = Radio.channel('calendar');

var CalendarModel = Model.extend({

  defaults: {
    hours: [10, 11, 12, 13, 14, 15, 16, 17]
  },

  initialize: function() {
    this.listenTo(this, 'setWeek', this.onSetWeek);

    this.getWeekDays();
  },

  onSetWeek: function(week) {
    var currentFrom = this.get('currentFrom');
    var currentTo = this.get('currentTo');
    var fromDate = moment(this.get('fromDate'));
    var toDate = moment(this.get('toDate'));

    if (week === 'prev' && fromDate.isBefore(moment(currentFrom))) {
      this.set('currentFrom', moment(currentFrom).subtract(7, 'days').format());
      this.set('currentTo', moment(currentTo).subtract(7, 'days').format());
    }

    if (week === 'next' && toDate.isAfter(moment(currentTo))) {
      this.set('currentFrom', moment(currentFrom).add(7, 'days').format());
      this.set('currentTo', moment(currentTo).add(7, 'days').format());
    }

    this.getWeekDays();
  },

  getWeekDays: function() {
    var currentFrom = this.get('currentFrom');
    var currentTo = this.get('currentTo');

    var weekDays = [];
    var weekDay = moment(currentFrom);

    // Just in case there is some discrepency in the data,
    // don't loop forever waiting for a matching date
    var i = 0;
    while (weekDay !== moment(currentTo) && i < 7) {
      weekDays.push(weekDay.format());
      weekDay.add(1, 'day');
      i++;
    }

    this.set('weekDays', weekDays);
  }
});

export default CalendarModel;
