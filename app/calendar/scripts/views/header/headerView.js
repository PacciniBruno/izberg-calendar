import {ItemView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import headerTemplate from '../../templates/header.hbs';

var globalChannel = Radio.channel('calendar');

var HeaderView = ItemView.extend({
  template: headerTemplate,

  initialize: function(options) {
    this.listenTo(this.model, 'change:weekDays', this.render);
  },

  // Hacky way ok getting rid of the wrapping div. Might impact performances
  onRender: function () {
    // Get rid of the wrapping-div.
    this.$el = this.$el.children();
    // Unwrap the element to prevent infinitely
    // nesting elements during re-render.
    this.$el.unwrap();
    this.setElement(this.$el);
  },
});

export default HeaderView;
