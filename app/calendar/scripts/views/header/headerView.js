import {ItemView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import headerTemplate from '../../templates/header.hbs';

var globalChannel = Radio.channel('calendar');

var HeaderView = ItemView.extend({
  template: headerTemplate,

  initialize: function(options) {
    this.listenTo(this.model, 'change:weekDays', this.render);
  },

});

export default HeaderView;
