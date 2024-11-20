import { View,
         StyleSheet,
         Text, 
         FlatList,
         TouchableOpacity,
         Image } from "react-native"

import { colors } from "../../configuration/colors";
import ZSafeAreaView from "../../components/ZSafeAreaView";
import { useEffect, useState } from "react";
import { getRanking } from "../../api/ranking";
import { getWidth } from "../../utils/constants";
import strings from "../../utils/strings";

const Ranking = ({navigation}) => {
    const [rankingData, setRankingData] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getRankings();
    }, []);

    const Trophy = ({position}) => {
        
        return (
            <View style={localStyles.trophy}>
                {position == 1 ? (<Image
                    style={localStyles.trophy}
                    source={require('../../assets/images/trophy01.png')}
                />) : position == 2 ? (<Image
                    style={localStyles.trophy}
                    source={require('../../assets/images/trophy02.png')}
                />) : (<Image
                    style={localStyles.trophy}
                    source={require('../../assets/images/trophy03.png')}
                />)}
            </View>
        )
    }

    const getRankings = async () => {
        await getRanking().then((response) => {
            let year = response['current_date'].split('/').pop();
            let formatted_title = `Ranking del 1ero al ${response['last_day']} de ${response['formatted_month']} del ${year}`;
            setTitle(formatted_title);

            setRankingData(response['ranking']);
        });
    }

    const RankingText = ({item}) => {
        return (
            <View style={localStyles.rankingTextContainer}>
                <Text style={localStyles.rankingText}>
                    {item['name']}
                </Text>
                <Text style={localStyles.rankingText}>
                    {strings.flightsNumber}: {item['flights_count']}
                </Text>
            </View>
        );
    }

    const RankingItem = ({item}) => {
        console.log(item);
        return (
            <View>
                <View style={localStyles.rankingContainer}>
                    {(item['position'] == 1 || item['position'] == 3) && (
                        <Trophy position={item['position']} />
                    )}
                    <TouchableOpacity 
                        style={localStyles.photoContainer}
                    >
                        {item['profile_photo'] ? (
                                    <Image
                                        style={localStyles.profilePhoto}
                                        source={{
                                            uri: item['profile_photo']
                                        }}
                                    />
                        ) : (
                                    <Image
                                        style={localStyles.profilePhoto}
                                        source={require('../../assets/images/userDark.png')}
                                    />
                        )}
                    </TouchableOpacity>
                    {item['position'] == 2 && (
                        <Trophy position={item['position']} />
                    )}
                    
                </View>
                <RankingText item={item} />
            </View>
        )
    }

    return (
        <ZSafeAreaView style='white'>
            <View>
                <Text style={localStyles.title}>
                    {title}
                </Text>
            </View>
            <FlatList 
                data={rankingData}
                renderItem={({item}) => <RankingItem item={item} />}
            />
        </ZSafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    rankingContainer: {
        flexDirection: 'row'
    },
    photoContainer: {
       margin: 20
    },
    profilePhoto: {
     width: getWidth(250),
     height: getWidth(250),
     borderRadius: 300
    },
    rankingTextContainer: {
    },
    rankingText: {
        color: colors.black,
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    trophy: {
        alignSelf: 'center'
    }
})

export default Ranking;