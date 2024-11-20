import { View, 
         StyleSheet, 
         FlatList, 
         Text, 
         Image, 
         TouchableOpacity,
         ActivityIndicator } from "react-native"
import { getAsyncStorageData } from "../../utils/utils";
import { getHeight, getWidth, PROFILE_ID } from "../../utils/constants";
import { KeysNav } from "../../navigator/NavigationKeys";
import { colors } from "../../configuration/colors";
import { useEffect, useState } from "react";
import { getRecommendations } from "../../api/feed";
import ZSafeAreaView from "../../components/ZSafeAreaView";

const Feed = ({navigation}) => {
    const [recommendationsData, setRecommendationsData] = useState([]);
    const [isPageReady, setIsPageReady] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!isPageReady) {
            getRecommendationsData();
        }
    });

    const getRecommendationsData = () => {
        getAsyncStorageData(PROFILE_ID).then((profile_id) => {
            getRecommendations(profile_id).then(({success, recommendations, msg}) => {
                console.log(recommendations);
                if (!success) {
                    setErrorMessage(msg);
                } else {
                    setRecommendationsData(recommendations);
                }
                setIsPageReady(true);
            })
        });
    }

    const Recommendation = ({item}) => {
        return (
            <TouchableOpacity style={localStyles.rootContainer}>
                <Image
                    style={localStyles.root}
                    source={{
                        uri: item['image']
                    }}
                />
                <View style={localStyles.textContainer}>
                    <Text style={localStyles.text}>{item['text']}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <ZSafeAreaView style='white'>
            {isPageReady ? (
                <ZSafeAreaView style='white'>
                    {!errorMessage ? (
                        <FlatList
                            data={recommendationsData}
                            renderItem={({item}) => <Recommendation item={item} />}
                        />
                    ) : (
                        <View>
                            <Text>{errorMessage}</Text>
                        </View>
                    )}
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
    root: {
        width: getWidth(350),
        height: getHeight(150),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    rootContainer: {
        width: getWidth(350),
        height: getHeight(250),
        backgroundColor: colors.secondary,
        margin: 20,
        borderRadius: 20
    },
    textContainer: {
        padding: 10
    },
    text: {
        color: colors.black,
        fontSize: 20
    }
})

export default Feed;