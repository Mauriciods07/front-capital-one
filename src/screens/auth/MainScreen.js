import { Text, Pressable, View, StyleSheet, Image } from "react-native";
import ZSafeAreaView from "../../components/ZSafeAreaView";
import { colors } from "../../configuration/colors";

const MainScreen = ({navigation}) => {
  return (
    <ZSafeAreaView
      style='blue'
    >
      <Text
        style={localStyles.title}
      >
        ¡Hola!
      </Text>
      <Text
        style={localStyles.subtitle}
      >
        Te damos la bienvenida a Viajerapp
      </Text>
      <Text
        style={localStyles.subtitle}
      >
        Ingresa para tu próxima aventura
      </Text>
      <Pressable
        style={[localStyles.button, localStyles.registerBtn]}
        onPress={() => {
          navigation.navigate("RegisterPage");
        }}
      >
        <Text
          style={[localStyles.btnText, localStyles.registerTxt]}
        >Registrarse</Text>
      </Pressable>
      <Pressable
        style={[localStyles.button, localStyles.loginBtn]}
        onPress={() => {
          navigation.navigate("LoginPage");
        }}
      >
        <Text
          style={[localStyles.btnText, localStyles.loginTxt]}
        >Iniciar sesión</Text>
      </Pressable>
      <View style={localStyles.logoContainer}>
        <View style={[localStyles.circle, localStyles.mainCircle]}></View>
        <View style={localStyles.plane}>
          <Image 
            style={localStyles.plane}
            source={require('../../assets/images/logo-azulinos.png')}
          />
        </View>
        <View style={[localStyles.circle, localStyles.secondCircle]}></View>
      </View>
    </ZSafeAreaView>
  )
 }

 const localStyles = StyleSheet.create({
    title: {
      fontSize: 50,
      marginBottom: 10,
      color: '#000000'
    },
    subtitle: {
      fontSize: 20,
      marginBottom: 50,
      color: '#000000'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: colors.minor,
      margin: 15,
      width: 300
    },
    btnText: {
      alignSelf: "center"
    },
    registerTxt: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 20
    },
    loginTxt: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 20
    },
    registerBtn: {
      backgroundColor: colors.minor
    },
    loginBtn: {
       backgroundColor: colors.bg
    },
    logoContainer: {
      marginTop: 100
    },
    circle: {
      width: 700,
      height: 700,
      borderRadius: 700 / 2,
      alignItems: 'center',
      alignSelf: 'center'
    },
    mainCircle: {
      width: 400,
      height: 400,
      backgroundColor: colors.third,
      position: 'absolute'
    },
    secondCircle: {
      width: 300,
      height: 300,
      backgroundColor: colors.highlights,
      position: 'absolute',
      top: 50
    },
    plane: {
      width: 350,
      height: 350,
      position: 'absolute',
      alignSelf: 'center',
      resizeMode: 'stretch',
      top: -40,
      right: -80,
      zIndex: 1
    }
});

 export default MainScreen;