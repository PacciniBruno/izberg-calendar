import {Collection} from 'backbone';
import SlotsRowModel from '../models/slotsRowModel';

var SlotsCollection = Collection.extend({

  comparator: 'starts_on',

  model: SlotsRowModel,

  initialize: function(options) {
    // On initialisation, parse the data into rows ?
  },
});

export default SlotsCollection;
