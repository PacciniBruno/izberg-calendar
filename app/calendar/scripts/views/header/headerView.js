import {ItemView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import headerTemplate from '../../templates/header.hbs';

var globalChannel = Radio.channel('calendar');

var HeaderView = ItemView.extend({
  template: headerTemplate,

  initialize: function(options) {
    console.log(options);
  },

});

export default HeaderView;
