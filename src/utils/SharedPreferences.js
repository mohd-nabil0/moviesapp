import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value); //{error}
  } catch (e) {
    return undefined;
  }
};

export const get = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null ? undefined : value;
  } catch (e) {
    return undefined;
  }
};

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys(); //{error, keys}
  } catch (e) {
    return undefined;
  }
};

export const getAll = async keys => {
  try {
    return await AsyncStorage.multiGet(keys); //{error}
  } catch (e) {
    return undefined;
  }
};

export const merge = async (mergeInKey, value) => {
  try {
    return await AsyncStorage.mergeItem(mergeInKey, value); //{error}
  } catch (e) {
    return undefined;
  }
};

export const remove = async key => {
  try {
    return await AsyncStorage.removeItem(key); //{error}
  } catch (e) {
    return undefined;
  }
};

export const removeAll = async keys => {
  try {
    if (keys !== undefined) {
      return await AsyncStorage.multiRemove(keys);
    } //{error}
    keys = getAllKeys();
    return await AsyncStorage.multiRemove(keys);
  } catch (e) {
    return undefined;
  }
};
