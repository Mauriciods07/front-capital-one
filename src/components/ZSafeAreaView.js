import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';

import { colors } from '../configuration/colors';

const ZSafeAreaView = ({children, ...props}) => {
  return (
    <SafeAreaView {...props} style={[localStyles(colors).root]}>
      {children}
    </SafeAreaView>
  );
};

const localStyles = (colors) =>
  StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

export default ZSafeAreaView;