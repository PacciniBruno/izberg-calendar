import {Application} from 'backbone.marionette';
import {Collection, Model} from 'backbone.marionette';
import RadioShim from './vendor/marionetteRadioShim';
import Radio from 'backbone.radio';
import moment from 'moment';
import AppLayout from './views/appLayoutView';
import CalendarModel from './models/calendarModel';
import SlotsCollection from './collections/slotsCollection';
import HandlebarsHelpers from './handlebarsHelpers';

var globalChannel = Radio.channel('calendar');

var Calendar = Application.extend({
  initialize() {

  },

  onStart(options) {
    // Transform external data to fit our usage:
    var slotsCollection = new SlotsCollection(options.calendarModel.get('slots') || []);

    var from_date = options.calendarModel.get('from_date') || moment().format();
    var to_date = options.calendarModel.get('to_date') || moment().add(7, 'days').format();
    var service_duration = options.serviceOfferModel.get('service_duration') || 3600;

    // Set the current TimeFrame to the first 7 days.
    // Add that information to the calendar model
    var currentFrom = from_date;
    var currentTo = moment(from_date).add(7, 'days').format();

    var calendarModel = new CalendarModel({
      fromDate: from_date,
      toDate: to_date,
      currentFrom: currentFrom,
      currentTo: currentTo,
      serviceDuration: service_duration,
    });

    // Passing an el attribute as an optionat instantiation
    // of the Calendar Application will set the rootLayout's el
    this.rootLayout = new AppLayout({
      el: options.el,
      slotsCollection: slotsCollection,
      calendarModel: calendarModel
    });

    this.rootLayout.render();
  }
});

export default Calendar;
