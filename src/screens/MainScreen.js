import { Alert, Pressable, Text } from "react-native";

const MainScreen = ({navigation}) => {

  return (
   <Pressable
   
    onPress={() => {
   
      Alert.alert("hola");
      navigation.navigate("SecondPage")
   
     }
   
    }
   >  
   
    <Text>Go to Second page</Text>
   
   </Pressable>
  )
 }

 export default MainScreen;