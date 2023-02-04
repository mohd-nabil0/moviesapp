import reducer, {getLanguage} from '../src/store/LanguageReducer';

jest.mock('../src/utils/SharedPreferences', () => ({
  save: jest.fn(),
  get: jest.fn(),
}));

describe('languages reducer', () => {
  it('should handle getLanguage.pending', () => {
    const initialState = {
      languages: [],
      selectedLanguage: {},
      updatingLanguage: false,
    };

    const state = reducer(initialState, {type: getLanguage.pending.type});
    expect(state.updatingLanguage).toEqual(true);
  });

  it('should handle getLanguage.fulfilled', () => {
    const initialState = {
      languages: [],
      selectedLanguage: {},
      updatingLanguage: true,
    };

    const payload = '{"id":1,"name":"English"}';
    const state = reducer(initialState, {
      type: getLanguage.fulfilled.type,
      payload,
    });
    expect(state.selectedLanguage).toEqual({id: 1, name: 'English'});
    expect(state.updatingLanguage).toEqual(false);
  });

  it('should handle getLanguage.rejected', () => {
    const initialState = {
      languages: [],
      selectedLanguage: {},
      updatingLanguage: true,
    };

    const state = reducer(initialState, {type: getLanguage.rejected.type});
    expect(state.updatingLanguage).toEqual(false);
  });
});
