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
import CheckBox from "expo-checkbox";
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from "react-native-snackbar";

import ZSafeAreaView from "../../components/ZSafeAreaView";
import { colors } from "../../configuration/colors";
import {
  validateEmail,
  validatePassword,
  validateSecondPassword
} from "../../utils/validators";
import ZHeader from "../../components/ZHeader";
import { signup } from "../../api/auth";
import { setAsyncStorageData } from "../../utils/utils";
import { PROFILE_ID } from "../../utils/constants";
import { KeysNav } from "../../navigator/NavigationKeys";
import strings from "../../utils/strings";

const RegisterPage = ({navigation}) => {
  const BlurredStyle = {
    borderColor: colors.main
  };

  const FocusedStyle = {
    borderColor: colors.highlights
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [EmailInputStyle, setEmailInputStyle] = useState({});
  const [passwordInputStyle, setPasswordInputStyle] = useState({});
  const [confirmPasswordInputStyle, setConfirmPasswordInputStyle] = useState({});
  const [nameInputStyle, setNameInputStyle] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onBlurInput = onUnhighLight => onUnhighLight(BlurredStyle);

  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0 && 
      !emailError &&
      !passwordError && 
      !confirmPasswordError &&
      isSelected
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, password, emailError, confirmPassword, passwordError, confirmPasswordError, isSelected]);

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

  onFocusConfirmPassword = () => {
    onFocusInput(setConfirmPasswordInputStyle);
  }

  onBlurConfirmPassword = () => {
    onBlurInput(setConfirmPasswordInputStyle);
  }

  onFocusName = () => {
    onFocusInput(setNameInputStyle);
  }

  onBlurName = () => {
    onBlurInput(setNameInputStyle);
  }

  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);

  const onPressConfirmPasswordEyeIcon = () => 
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const onChangedEmail = val => {
    const {msg} = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailError(msg);
  } 

  const verifyPassword = (pass, secondPass) => {
    const {msg} = validateSecondPassword(pass, secondPass);
    setConfirmPasswordError(msg);
  }

  const onChangedPassword = val => {
    const {msg} = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
    
    verifyPassword(val.trim(), confirmPassword);
  }

  const onChangedConfirmPassword = val => {
    setConfirmPassword(val.trim());
    verifyPassword(password, val.trim())
  }

  const onChangedName = val => {
    setName(val.trim());
  }

  const onPressContinue = async () => {
    user = {
      email: email,
      password: password,
      name: name
    }

    await signup(user).then(async token => {
        if ('profile_id' in token) {
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
      style=
      'white'
    >
      <ZHeader title={strings.register}/>
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
                    style={[localStyles.input, localStyles.password, passwordInputStyle,
                      passwordError && localStyles.inputError]}
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
                  {passwordError && 
                  <View style={localStyles.passErrorBox}>
                    <Text style={localStyles.errorMsg}>
                      {passwordError}
                    </Text>
                  </View>
                  }
                </View>
                <View>
                  <TouchableOpacity onPress={onPressPasswordEyeIcon} style={localStyles.eyeBtn}>
                    <Icon name={isPasswordVisible ? "eye" : "eye-slash"} size={30} color={colors.main} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={localStyles.inputField}>
              <Text style={localStyles.text}>
                {strings.confirmPassword}
              </Text>
              <View style={localStyles.passwordContainer}>
                <View>
                  <TextInput
                    style={[localStyles.input, localStyles.password, confirmPasswordInputStyle,
                      confirmPasswordError && localStyles.inputError]}
                    secureTextEntry={isConfirmPasswordVisible}
                    value={confirmPassword}
                    defaultValue={confirmPassword}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholderTextColor={colors.grey}
                    onFocus={onFocusConfirmPassword}
                    onBlur={onBlurConfirmPassword}
                    placeholder={strings.confirmPassword}
                    onChangeText={onChangedConfirmPassword}
                  />
                  {confirmPasswordError && 
                  <Text style={localStyles.errorMsg}>
                    {confirmPasswordError}
                  </Text>
                  }
                </View>
                <View style={localStyles.eyeBtn}>
                  <TouchableOpacity onPress={onPressConfirmPasswordEyeIcon}>
                    <Icon name={isConfirmPasswordVisible ? 'eye' : 'eye-slash'} size={30} color={colors.main} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={localStyles.inputField}>
              <Text style={localStyles.text}>
                {strings.name}
              </Text>
              <TextInput
                style={[localStyles.input, nameInputStyle]}
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
            </View>
            <View style={localStyles.checkboxContainer}>
              <CheckBox 
                style={localStyles.checkbox}
                value={isSelected} 
                onValueChange={() => setIsSelected(!isSelected)}
                />
                <Text style={localStyles.text}>
                  {strings.termsAndConditions}
                </Text>
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
                >{strings.register}</Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 10
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
  },
  passErrorBox: {
    width: 280
  }
})

 export default RegisterPage;