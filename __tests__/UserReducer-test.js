import userReducer, {getUser, updateUser} from '../src/store/UserReducer';

describe('userReducer', () => {
  it('handles the getUser.pending action', () => {
    const initialState = {
      user: '',
      loading: false,
    };
    const nextState = userReducer(initialState, {
      type: getUser.pending.type,
    });
    expect(nextState).toEqual({
      user: '',
      loading: true,
    });
  });

  it('handles the getUser.fulfilled action', () => {
    const initialState = {
      user: '',
      loading: true,
    };
    const nextState = userReducer(initialState, {
      type: getUser.fulfilled.type,
      payload: 'user123',
    });
    expect(nextState).toEqual({
      user: 'user123',
      loading: false,
    });
  });

  it('handles the getUser.rejected action', () => {
    const initialState = {
      user: '',
      loading: true,
    };
    const nextState = userReducer(initialState, {
      type: getUser.rejected.type,
    });
    expect(nextState).toEqual({
      user: '',
      loading: false,
    });
  });

  it('handles the updateUser.pending action', () => {
    const initialState = {
      user: '',
      loading: false,
    };
    const nextState = userReducer(initialState, {
      type: updateUser.pending.type,
    });
    expect(nextState).toEqual({
      user: '',
      loading: true,
    });
  });

  it('handles the updateUser.fulfilled action', () => {
    const initialState = {
      user: '',
      loading: true,
    };
    const nextState = userReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: 'user123',
    });
    expect(nextState).toEqual({
      user: 'user123',
      loading: false,
    });
  });

  it('handles the updateUser.rejected action', () => {
    const initialState = {
      user: '',
      loading: true,
    };
    const nextState = userReducer(initialState, {
      type: updateUser.rejected.type,
    });
    expect(nextState).toEqual({
      user: '',
      loading: false,
    });
  });
});
