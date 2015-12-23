import {Collection} from 'backbone';

var SlotsCollection = Collection.extend({

  comparator: 'starts_on',

  initialize: function(options) {

  },
});

export default SlotsCollection;
