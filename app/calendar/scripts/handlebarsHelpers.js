import Handlebars from 'hbsfy/runtime';
import moment from 'moment';

Handlebars.registerHelper('formatDate', function (date, format) {
  return moment(date).format(format);
});

export default Handlebars;
