import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import React from 'react';;
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from '../configuration/colors';

function ZHeader(props) {
  const {title, isRightIcon, isLeftIcon} = props;
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();
  return (
    <View style={localStyles.container}>
      <View style={localStyles.container}>
        <TouchableOpacity
            style={localStyles.icon} 
            onPress={goBack}
        >
            <Icon
              name="arrow-left"
              size={25}
              color={colors.black}
            />
          </TouchableOpacity>
          {!!isLeftIcon && isLeftIcon}

        <Text
          style={localStyles.titleText}>
            {title}
        </Text>
      </View>
      {!!isRightIcon && isRightIcon}
    </View>
  );
}

export default React.memo(ZHeader);

const localStyles = StyleSheet.create({
  container: {
    width: 380,
    paddingHorizontal: 20,
    paddingVertical: 15,
    top: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    width: 200,
    alignSelf: "center",
    color: colors.black
  },
  icon: {
    paddingRight: 10
  }
});
