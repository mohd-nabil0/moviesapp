import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import PreferenceKeys from '../constants/PreferenceKeys';
import {save, get} from '../utils/SharedPreferences';
import {LANGUAGES} from '../constants/Strings';

//async actions
const getLanguage = createAsyncThunk('getLanguage', async () => {
  const language = await get(PreferenceKeys.LANGUAGE);
  if (!language) {
    const _lang = JSON.stringify(LANGUAGES[0]);
    await save(PreferenceKeys.LANGUAGE, JSON.stringify(_lang));
    return _lang;
  }
  return language;
});

//slice
const slice = createSlice({
  name: 'languages',
  initialState: {
    languages: LANGUAGES,
    selectedLanguage: LANGUAGES[0],
    updatingLanguage: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLanguage.pending, (state, action) => {
      state.updatingLanguage = true;
    });
    builder.addCase(getLanguage.fulfilled, (state, action) => {
      state.selectedLanguage = JSON.parse(action.payload);
      state.updatingLanguage = false;
    });
    builder.addCase(getLanguage.rejected, (state, action) => {
      state.updatingLanguage = false;
    });
  },
});

//export
export const {} = slice.actions;
export {getLanguage};
export default slice.reducer;
