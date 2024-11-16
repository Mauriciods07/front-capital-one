import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';

import { colors } from '../configuration/colors';

const ZSafeAreaView = ({style, children, ...props}) => {
    bg_color = colors.secondary
    if (style == 'white') {
        bg_color = colors.bg
    }

  return (
    <SafeAreaView {...props} style={[localStyles(bg_color).root]}>
      {children}
    </SafeAreaView>
  );
};

const localStyles = (color) =>
  StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

export default ZSafeAreaView;