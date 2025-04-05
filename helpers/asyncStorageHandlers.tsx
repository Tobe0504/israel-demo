import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeAsyncData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Error saving data", e);
  }
};

export const getAsyncData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error("Error reading value", e);
  }
};

export const removeAsyncData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing data", e);
  }
};
