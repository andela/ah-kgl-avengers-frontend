import { optRequest, actionDispatch } from '../../helpers/config';

describe('Config', () => {
  it('should get all the config objects', () => {
    expect(optRequest()).toEqual({
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer null' },
    });
  });
  it('should get all the config objects', () => {
    const data = {
      payload: {},
      type: 'TEST',
    };
    expect(actionDispatch(data.type, data.payload)).toEqual({
      type: data.type,
      payload: data.payload,
    });
  });
});
