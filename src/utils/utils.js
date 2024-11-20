import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorageData = async (key, value) => {
    const stringData = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringData);
};

export const getAsyncStorageData = async key => {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
};

export const removeAsyncStorageData = async key => {
    await AsyncStorage.removeItem(key);
};

export const clearAsyncStorageData = async () => {
    await AsyncStorage.clear();
}