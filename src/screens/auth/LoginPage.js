import { View, 
    Image, 
    StyleSheet, 
    KeyboardAvoidingView, 
    ScrollView, 
    Text,
    TextInput,
    Pressable,
    TouchableOpacity} from "react-native";
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from "react-native-snackbar";

import ZSafeAreaView from "../../components/ZSafeAreaView";
import ZHeader from "../../components/ZHeader";
import { colors } from "../../configuration/colors";
import {
validateEmail
} from "../../utils/validators";
import { setAsyncStorageData } from "../../utils/utils";
import { PROFILE_ID } from "../../utils/constants";
import { KeysNav } from "../../navigator/NavigationKeys";
import { login } from "../../api/auth";
import strings from "../../utils/strings";

const LoginPage = ({navigation}) => {
    const BlurredStyle = {
        borderColor: colors.main
    };

    const FocusedStyle = {
        borderColor: colors.highlights
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [EmailInputStyle, setEmailInputStyle] = useState({});
    const [passwordInputStyle, setPasswordInputStyle] = useState({});

    const onFocusInput = onHighlight => onHighlight(FocusedStyle);
    const onBlurInput = onUnhighLight => onUnhighLight(BlurredStyle);

    useEffect(() => {
        if (
            email.length > 0 &&
            password.length > 0 &&
            !emailError
        ) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [email, password, emailError]);

    onFocusEmail = () => {
        onFocusInput(setEmailInputStyle);
    }

    onBlurEmail = () => {
        onBlurInput(setEmailInputStyle);
    }

    onFocusPassword = () => {
        onFocusInput(setPasswordInputStyle);
    }

    onBlurPassword = () => {
        onBlurInput(setPasswordInputStyle);
    }

    const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);

    const onChangedEmail = val => {
        const {msg} = validateEmail(val.trim());
        setEmail(val.trim());
        setEmailError(msg);
    }

    const onChangedPassword = val => {
        setPassword(val.trim());
    }

    const onPressContinue = async () => {
        await login(email, password).then(async token => {
            if ('token' in token) {
                profile_id = token['profile_id'];
                setAsyncStorageData(PROFILE_ID, profile_id);
    
                navigation.reset({
                    index: 0,
                    routes: [{name: KeysNav.TabBar}]
                });
            } else {
                Snackbar.show({
                    text: token['error'],
                    duration: Snackbar.LENGTH_SHORT,
                  });
            }
        });
    };

    return (
        <ZSafeAreaView
            style='white'
        >
            <ZHeader title={strings.login}/>
            <KeyboardAvoidingView>
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    bouces={false}
                >
                    <View>
                        <View>
                            <Image 
                                style={localStyles.logo}
                                source={require('../../assets/images/logo-azulinos.png')}
                            />
                        </View>
                        <View style={localStyles.inputField}>
                            <Text style={localStyles.text}>
                                {strings.email}
                            </Text>
                            <TextInput
                                style={[localStyles.input, EmailInputStyle,
                                        emailError && localStyles.inputError
                                ]}
                                value={email}
                                defaultValue={email}
                                autoCorrect={false}
                                autoCapitalize={'none'}
                                placeholderTextColor={colors.grey}
                                onFocus={onFocusEmail}
                                onBlur={onBlurEmail}
                                placeholder={strings.ingressEmail}
                                onChangeText={onChangedEmail}
                                keyboardType="email-address"
                            />
                            {emailError && 
                                <Text style={localStyles.errorMsg}>
                                    {emailError}
                                </Text>
                            }
                        </View>
                        <View style={localStyles.inputField}>
                            <Text style={localStyles.text}>
                                {strings.password}
                            </Text>
                            <View style={localStyles.passwordContainer}>
                                <View>
                                    <TextInput
                                        style={[localStyles.input, localStyles.password, passwordInputStyle]}
                                        secureTextEntry={isPasswordVisible}
                                        value={password}
                                        defaultValue={password}
                                        autoCorrect={false}
                                        autoCapitalize={'none'}
                                        placeholderTextColor={colors.grey}
                                        onFocus={onFocusPassword}
                                        onBlur={onBlurPassword}
                                        placeholder={strings.ingressPassword}
                                        onChangeText={onChangedPassword}
                                    />
                                </View>
                                <View>
                                    <TouchableOpacity onPress={onPressPasswordEyeIcon} style={localStyles.eyeBtn}>
                                        <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={30} color={colors.main} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Pressable
                                style={[localStyles.button,
                                        isSubmitDisabled && localStyles.buttonDisabled
                                ]}
                                disabled={isSubmitDisabled}
                                onPress={onPressContinue}
                            >
                                <Text
                                    style={localStyles.btnText}
                                >{strings.access}</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ZSafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    text: {
        color: colors.black,
        fontSize: 18,
        fontWeight: "400"
    },
    logo: {
        width: 300,
        height: 300,
        alignSelf: "center"
    },
    inputField: {
        marginBottom: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        margin: 15,
        width: 300,
        backgroundColor: colors.main
    },
    buttonDisabled: {
        backgroundColor: colors.grey
    },
    btnText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "bold"
    },
    input: {
        padding: 5,
        borderBottomWidth: 2,
        borderColor: colors.main,
        color: colors.black
    },
    password: {
        width: 290
    },
    eyeBtn: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: colors.lightGrey,
        borderRadius: 5,
        width: 35,
        height: 35,
        justifyContent: "center",
        padding: 2
    },
    passwordContainer: {
        flexDirection: "row"
    },
    errorMsg: {
        color: colors.red
    },
    inputError: {
        borderColor: colors.red
    }
})

export default LoginPage;