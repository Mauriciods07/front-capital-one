import { View,
         StyleSheet,
         KeyboardAvoidingView,
         FlatList,
         Text,
         TextInput,
         TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState, memo } from "react";

import { getHeight, moderateScale } from "../../utils/constants";
import { colors } from "../../configuration/colors";
import strings from "../../utils/strings";
import ZSafeAreaView from "../../components/ZSafeAreaView";
import { getChatMessage } from "../../api/chat";

const Chat = ({navigation}) => {
    const BlurredStyle = {
        borderColor: colors.black,
      };
      const FocusedStyle = {
        borderColor: colors.highlights,
      };

    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [chatStyle, setChatStyle] = useState(BlurredStyle);
    const [chatData, setChatData] = useState([]);

    const onFocusInput = () => setChatStyle(FocusedStyle);
    const onBlurInput = () => setChatStyle(BlurredStyle);

    useEffect(() => {
        getFirstMessage();
    }, []);

    const getFirstMessage = async () => {
        await getChatMessage("Hola").then(({response}) => {
            let reponse_message = {
                type: 'receiver',
                message: response
            }

            setChatData([...chatData, reponse_message]);
        });
    }

    useEffect(() => {
        if (message.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [message]);

    const onChangeMessage = val => {
        setMessage(val);
    }

    const sendMessage = async () => {
        let new_message = {
            type: 'sender',
            message: message
        }

        await getChatMessage(message).then(({response}) => {
            let reponse_message = {
                type: 'receiver',
                message: response
            }

            setChatData([...chatData, new_message, reponse_message]);

            setMessage('');
        });
    }

    const SenderMessage = memo(({item, index}) => {
        return (
          <View
            style={[localStyles.messageContainer,
                {
                    backgroundColor:
                        item.type == 'sender'
                        ? colors.minor
                        : colors.secondary,
                    alignSelf: item.type == 'sender' ? 'flex-end' : 'flex-start'
                }
            ]}
          >
            <Text
                style={localStyles.text}
            >
              {item.message}
            </Text>
          </View>
        );
      });

  return (
    <ZSafeAreaView style='white'>
      <KeyboardAvoidingView
        style={localStyles.root}
      >
        <View style={localStyles.root}>
          <FlatList
            data={chatData}
            renderItem={({item, index}) => (
              <SenderMessage item={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={localStyles.contentContainerStyle}
          />
        </View>
        <View style={localStyles.inputContainer}>
            <TextInput
                style={[localStyles.chatInput, chatStyle]}
                value={message}
                defaultValue={message}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholderTextColor={colors.grey}
                onFocus={onFocusInput}
                onBlur={onBlurInput}
                placeholder={strings.addMessage + '...'}
                onChangeText={onChangeMessage}
            />
          <TouchableOpacity
            disabled={isDisabled}
            style={localStyles.sendBtn}
            onPress={sendMessage}
            >
            <Icon name='send' size={30} color={colors.main} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ZSafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10
    },
    chatInput: {
        backgroundColor: colors.bg,
        height: getHeight(60),
        borderRadius: moderateScale(20),
        borderWidth: moderateScale(1),
        width: moderateScale(300),
        paddingHorizontal: 15
    },
    sendBtn: {
        height: moderateScale(60),
        width: moderateScale(60),
        borderRadius: moderateScale(30),
        marginLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    contentContainerStyle: {
        marginHorizontal: 20
    },
    messageContainer: {
        borderRadius: moderateScale(12),
        maxWidth: '80%',
        padding: 15, 
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'flex-end',
    },
    text: {
        color: colors.black
    }
})

export default Chat;