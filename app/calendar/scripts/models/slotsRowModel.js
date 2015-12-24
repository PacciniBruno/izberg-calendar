import {Model} from 'backbone';
import Radio from 'backbone.radio';
import moment from 'moment';

var globalChannel = Radio.channel('calendar');

var SlotsRowModel = Model.extend({
  initialize: function() {

  },
});

export default SlotsRowModel;
