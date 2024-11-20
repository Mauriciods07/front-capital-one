// Library Imports
import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

// Local Imports
import { getAsyncStorageData } from '../utils/utils';
import { colors } from '../configuration/colors';
import { PROFILE_ID } from '../utils/constants';
import { KeysNav } from '../navigator/NavigationKeys';


const Splash = ({navigation}) => {
  const asyncProcess = async () => {
    try {
      let asyncData = await getAsyncStorageData(PROFILE_ID);
      console.log('asyncData ', asyncData);

      if (!!asyncData) {
        navigation.reset({
            index: 0,
            routes: [{name: KeysNav.TabBar }],
          });
      } else {
        navigation.reset({
            index: 0,
            routes: [{name: KeysNav.AuthRoute }],
          });
      }
    } catch (e) {
      console.log('error ', e);
    }
  };

  useEffect(() => {
    asyncProcess();
  }, []);

  return (
    <View style={[localStyles.container, {backgroundColor: colors.bg}]}>
      <ActivityIndicator size="large" color={colors.main} />
    </View>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
