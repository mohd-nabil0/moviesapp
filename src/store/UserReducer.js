import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import PreferenceKeys from '../constants/PreferenceKeys';
import {save, get} from '../utils/SharedPreferences';

//async actions
const updateUser = createAsyncThunk(
  'updateUser',
  async user => await save(PreferenceKeys.USER, user),
);

const getUser = createAsyncThunk(
  'getUser',
  async () => await get(PreferenceKeys.USER),
);

//slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: '',
    loading: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

//export
export const {} = slice.actions;
export {getUser, updateUser};
export default slice.reducer;
