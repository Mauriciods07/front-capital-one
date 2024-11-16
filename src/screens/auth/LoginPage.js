import { View, 
    Image, 
    StyleSheet, 
    KeyboardAvoidingView, 
    ScrollView, 
    Text,
    TextInput,
    Pressable, 
    Alert,
    TouchableOpacity} from "react-native";
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

import ZSafeAreaView from "../../components/ZSafeAreaView";
import ZHeader from "../../components/ZHeader";
import { colors } from "../../configuration/colors";
import {
validateEmail
} from "../../utils/validators";

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

    const onPressContinue = () => {
        const message = {
            "Email":  email,
            "Password":  password
        }
        Alert.alert("" + message);
    };

    return (
        <ZSafeAreaView
        style='white'
        >
            <ZHeader title={"Iniciar sesión"}/>
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
                                Correo electrónico
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
                                placeholder={'Ingresar contraseña'}
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
                                Contraseña
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
                                        placeholder={'Ingresar contraseña'}
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
                                >Acceder</Text>
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