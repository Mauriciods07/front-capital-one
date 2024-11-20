import { View, Button, StyleSheet, Alert } from "react-native"
import { clearAsyncStorageData } from "../../utils/utils";
import { PROFILE_ID } from "../../utils/constants";
import { KeysNav } from "../../navigator/NavigationKeys";
import { colors } from "../../configuration/colors";
import Icon from 'react-native-vector-icons/FontAwesome';

const Calendar = ({navigation}) => {
    const onPress = () => {
        Alert.alert("Returning to home");
        clearAsyncStorageData(PROFILE_ID);

        navigation.reset({
            index: 0,
            routes: [{name: KeysNav.AuthRoute}]
        })
    }

    return (
        <View>
            <Button 
                title="Press me"
                onPress={onPress}
            />
            <Icon name='home' size={40} color={colors.black} />
        </View>
    );
}

const localStyles = StyleSheet.create({
    root: {

    }
})

export default Calendar;