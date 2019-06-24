
import moment from 'moment';

const readArticleHelper = {
  timeFormat: date => moment(date).format('llll'),
  description: (body) => {
    const cleanText = body.replace(/<\/?[^>]+(>|$)/g, '');
    return cleanText.substring(0, 100).replace(/&nbsp;/g, ' ');
  },
};


export default readArticleHelper;
