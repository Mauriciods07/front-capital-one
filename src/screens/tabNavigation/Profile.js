import { View,
         StyleSheet,
         Image,
         TouchableOpacity,
         Text, 
         FlatList,
         Pressable,
         ActivityIndicator} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { clearAsyncStorageData, getAsyncStorageData } from "../../utils/utils";
import { getHeight, getWidth, PROFILE_ID } from "../../utils/constants";
import { KeysNav } from "../../navigator/NavigationKeys";
import { colors } from "../../configuration/colors";
import ZSafeAreaView from "../../components/ZSafeAreaView";
import { useEffect, useState } from "react";
import strings from "../../utils/strings";
import { getProfile } from "../../api/profile";

const Profile = ({navigation}) => {
    const [name, setName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [description, setDescription] = useState('');
    const [countriesList, setCountriesList] = useState([]);
    const [isProfileReady, setIsProfileReady] = useState(false);

    useEffect(() => {
        new Promise((resolve, reject) => {
            getAsyncStorageData(PROFILE_ID).then((profileId => {
                getProfile(profileId).then((profileInformation => {
                    setName(profileInformation['name']);
                    setProfilePhoto(profileInformation['profile_photo']);
                    setDescription('Soy una persona apasionada por los viajes y las culturas de otros países');
                    setCountriesList(profileInformation['interests']);
                    setIsProfileReady(true);
                }));
            }));
        });
    }, []);

    const onPressLogout = () => {
        clearAsyncStorageData();

        navigation.reset({
            index: 0,
            routes: [{name: KeysNav.AuthRoute}]
        })
    }

    const editProfile = () => {
        navigation.navigate(KeysNav.EditProfile, {
            name: name,
            description: description,
            profilePhoto: profilePhoto
        });
    }

    const Flag = ({item}) => {
        return (
            <TouchableOpacity style={localStyles.flagContainer}>
            <Image
                    style={localStyles.flagImage}
                    source={{
                        uri: item.flag
                    }}
                />
                <Text style={localStyles.flagText}>
                    {item.country}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <ZSafeAreaView style='white'>
            {isProfileReady ? (
                <ZSafeAreaView
                    style='white'
                >
                    <View>
                        <TouchableOpacity style={localStyles.photoContainer}>
                            {profilePhoto ? (
                                <Image
                                    style={localStyles.profilePhoto}
                                    source={{
                                        uri: profilePhoto
                                    }}
                                />
                            ) : (
                                <Image
                                    style={localStyles.profilePhoto}
                                    source={require('../../assets/images/userDark.png')}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={localStyles.nameContainer}>
                        <Text style={localStyles.nameText}>
                            {name}
                        </Text>
                    </View>
                    <Pressable
                        style={({pressed}) => [
                            {
                                backgroundColor: pressed ? colors.main : colors.secondary
                            },
                            localStyles.editButton
                        ]}
                        onPress={editProfile}
                    >
                        <Icon name='edit' size={30} color={colors.black} />
                        <Text style={localStyles.textButton}>{strings.editProfile}</Text>
                    </Pressable>
                    <Pressable
                        style={({pressed}) => [
                            {
                                backgroundColor: pressed ? colors.red : colors.lightRed
                            },
                            localStyles.editButton,
                            localStyles.editButtonLogout
                        ]}
                        onPress={onPressLogout}
                    >
                        <Text style={localStyles.textButtonLogout}>{strings.logout}</Text>
                    </Pressable>
                    {description && (
                        <View style={localStyles.descriptionContainer}>
                            <Text style={localStyles.description}>
                                {description ? description : strings.addDescription}
                            </Text>
                        </View>
                    )}
                    <View style={localStyles.favoritesContainer}>
                        <Text style={localStyles.favoritesText}>
                            {strings.favorites}:
                        </Text>
                    </View>
                    <FlatList
                        numColumns={3}
                        columnWrapperStyle={{flexWrap: 'wrap'}}
                        data={countriesList}
                        scroll={false}
                        renderItem={({item}) => <Flag item={item} />}
                    />
                </ZSafeAreaView>
            ) : (
                <View style={[localStyles.container, {backgroundColor: colors.bg}]}>
                    <ActivityIndicator size="large" color={colors.main} />
                </View>
            )}
        </ZSafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    photoContainer: {
        margin: 20
    },
    profilePhoto: {
      width: getWidth(250),
      height: getWidth(250),
      borderRadius: 300
    },
    nameContainer: {
        marginBottom: 20
    },
    nameText: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.black
    },
    editButton: {
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.black,
        borderWidth: 1
    },
    editButtonLogout: {
        margin: 10
    },
    textButton: {
        color: colors.black,
        marginLeft: 10
    },
    textButtonLogout: {
        color: colors.black
    },
    descriptionContainer: {
        padding: 30
    },
    description: {
        textAlign: 'center'
    },
    favoritesContainer: {
        borderRadius: 2,
        borderBlockColor: colors.black,
        width: getWidth(350)
    },
    favoritesText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        textAlign: 'left'
    },
    flagsItem: {
        flexDirection: 'row'
    },
    flagContainer: {
        margin: 10
    },
    flagImage: {
        width: getWidth(90),
        height: getHeight(60)
    },
    flagText: {
        color: colors.black,
        textAlign: 'center'
    }
})

export default Profile;