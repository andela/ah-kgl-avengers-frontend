import moment from 'moment';

const readArticleHelper = {
  timeFormat: date => moment(date).format('llll'),
};

export default readArticleHelper;
