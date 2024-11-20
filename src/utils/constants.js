import {Dimensions, Platform, StatusBar} from 'react-native';

export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? (iPhoneX ? 44 : 22) : StatusBar.currentHeight;
export const screenHeight = Dimensions.get('window').height - STATUSBAR_HEIGHT;
export const screenWidth = Dimensions.get('window').width;
export const screenFullHeight = Dimensions.get('window').height;

let sampleHeight = 926;
let sampleWidth = 428;

export function getWidth(value) {
    return (value / sampleWidth) * screenWidth;
}

export function getHeight(value) {
    return (value / sampleHeight) * screenHeight;
}

const scale = size => (screenWidth / sampleWidth) * size;

export function moderateScale(size, factor = 0.5) {
    return size + (scale(size) - size) * factor;
}

export const PROFILE_ID = "PROFILE_ID";