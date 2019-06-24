import articleHelper from '../../helpers/readArticle';

describe('Testing article helpers', () => {
  test('Should return formated date', () => {
    const body = 'This&nbsp;is&nbsp;the&nbsp;time';
    expect(articleHelper.description(body)).toBe('This is the time');
  });
});
