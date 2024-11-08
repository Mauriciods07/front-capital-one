import { Alert, Pressable, Text } from "react-native";

const SecondPage = ({navigation}) => {

  return (
   <Pressable
   
    onPress={() => {
   
      Alert.alert("hola 02");
      navigation.navigate("MainScreen")
   
     }
   
    }
   >  
   
    <Text>Go to Main page</Text>
   
   </Pressable>
  )
 }

 export default SecondPage;