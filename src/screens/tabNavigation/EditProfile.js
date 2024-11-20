import { View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    Pressable, 
    KeyboardAvoidingView,
    ScrollView} from "react-native";
import {launchImageLibrary} from 'react-native-image-picker';

import { getWidth, PROFILE_ID } from "../../utils/constants";
import { KeysNav } from "../../navigator/NavigationKeys";
import { colors } from "../../configuration/colors";
import ZSafeAreaView from "../../components/ZSafeAreaView";
import { useState, useEffect } from "react";
import strings from "../../utils/strings";
import { validateNotEmptyName, validateDescription } from "../../utils/validators";
import ZHeader from "../../components/ZHeader";
import { getAsyncStorageData } from "../../utils/utils";
import { updateProfile } from "../../api/profile";

const Profile = (props) => {
    const propsName = props.route.params.name;
    const propsDescription = props.route.params.description;
    const propsProfilePhoto = props.route.params.profilePhoto;

    const BlurredStyle = {
        borderColor: colors.main
    };

    const FocusedStyle = {
        borderColor: colors.highlights
    };
    
    const { navigation } = props;
    const [name, setName] = useState(propsName);
    const [description, setDescription] = useState(propsDescription);
    const [profilePhoto, setProfilePhoto] = useState(propsProfilePhoto);
    const [profilePhotoObject, setProfilePhotoObject] = useState({});

    const [nameError, setNameError] = useState('');
    const [nameInputStyle, setNameInputStyle] = useState({});
    const [descriptionError, setDescriptionError] = useState('');
    const [descriptionInputStyle, setDescriptionInputStyle] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isChanged, setIsChanged] = useState(false);
    
    const onFocusInput = onHighlight => onHighlight(FocusedStyle);
    const onBlurInput = onUnhighLight => onUnhighLight(BlurredStyle);

    useEffect(() => {
        if (
            propsName == name &&
            propsDescription == description &&
            propsProfilePhoto == profilePhoto
        ) {
            setIsChanged(false);
        } else {
            setIsChanged(true);
        }
    }, [propsName, name, propsDescription, description, propsProfilePhoto, profilePhoto]);

    useEffect(() => {
        if (
            !nameError &&
            !descriptionError
        ) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [nameError, descriptionError]);

    onFocusName = () => {
        onFocusInput(setNameInputStyle);
    }

    onBlurName = () => {
        onBlurInput(setNameInputStyle);
    }

    const onChangedName = val => {
        const {msg} = validateNotEmptyName(val);
        setName(val);
        setNameError(msg);
    }

    onFocusDescription = () => {
        onFocusInput(setDescriptionInputStyle);
    }

    onBlurDescription = () => {
        onBlurInput(setDescriptionInputStyle);
    }

    const onChangedDescription = val => {
        console.log(propsProfilePhoto);
        const {msg} = validateDescription(val);
        setDescription(val);
        setDescriptionError(msg);
    }
    
    const onChangePhoto = () => {
        openImagePicker();
    }

    const openImagePicker = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setProfilePhoto(imageUri);
            setProfilePhotoObject(response);
          }
        });
      };

    const onPressSaveChanges = () => {
        getAsyncStorageData(PROFILE_ID).then((profile_id) => {
            const user = {
                profileId: profile_id,
                name: name,
                description: description,
                profilePhoto: profilePhotoObject
            }

            updateProfile(user).then((response) => {
                navigation.reset({
                    index: 0,
                    routes: [{name: KeysNav.TabBar}]
                })
            });
    
        });
    }

    return (
        <ZSafeAreaView style='white'>
            <ZHeader />
            <KeyboardAvoidingView>
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    bouces={false}
                >
                    <View>
                        <TouchableOpacity 
                            style={localStyles.photoContainer}
                            onPress={onChangePhoto}
                        >
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
                    <View style={localStyles.inputField}>
                        <Text style={localStyles.text}>
                            {strings.name}
                        </Text>
                        <TextInput
                            style={[localStyles.input, nameInputStyle,
                                    nameError && localStyles.inputError
                            ]}
                            value={name}
                            defaultValue={name}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            placeholderTextColor={colors.grey}
                            onFocus={onFocusName}
                            onBlur={onBlurName}
                            placeholder={strings.ingressName}
                            onChangeText={onChangedName}
                        />
                        {nameError && 
                            <Text style={localStyles.errorMsg}>
                                {nameError}
                            </Text>
                        }
                    </View>
                    <View style={localStyles.inputField}>
                        <Text style={localStyles.text}>
                            {strings.description}
                        </Text>
                        <TextInput
                            multiline={true}
                            style={[localStyles.input, descriptionInputStyle,
                                descriptionError && localStyles.inputError
                            ]}
                            value={description}
                            defaultValue={description}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            placeholderTextColor={colors.grey}
                            onFocus={onFocusDescription}
                            onBlur={onBlurDescription}
                            placeholder={strings.ingressDescription}
                            onChangeText={onChangedDescription}
                        />
                        {descriptionError && 
                            <Text style={localStyles.errorMsg}>
                                {descriptionError}
                            </Text>
                        }
                    </View>
                    {isChanged && (<Pressable
                        style={({pressed}) => [
                            {
                                backgroundColor: pressed ? colors.red : colors.lightRed
                            },
                            localStyles.editButton,
                            isSubmitDisabled && localStyles.buttonDisabled
                        ]}
                        onPress={onPressSaveChanges}
                        disabled={isSubmitDisabled}
                    >
                        <Text style={localStyles.textButton}>{strings.saveChanges}</Text>
                    </Pressable>)}
                    <View style={{height: 300}}></View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ZSafeAreaView>
    );
}

const localStyles = StyleSheet.create({
photoContainer: {
   margin: 20
},
profilePhoto: {
 width: getWidth(250),
 height: getWidth(250),
 borderRadius: 300
},
editButton: {
   borderRadius: 10,
   padding: 10,
   flexDirection: 'row',
   alignItems: 'center',
   borderColor: colors.black,
   borderWidth: 1,
   margin: 10,
   alignSelf: 'center'
},
textButton: {
    color: colors.black,
},
inputField: {
    marginBottom: 20
},
text: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "400"
},
input: {
    padding: 5,
    borderBottomWidth: 2,
    width: getWidth(300),
    borderColor: colors.main,
    color: colors.black
},
inputError: {
    borderColor: colors.red
},
errorMsg: {
    color: colors.red,
    width: getWidth(300)
},
buttonDisabled: {
    backgroundColor: colors.grey
},
})

export default Profile;