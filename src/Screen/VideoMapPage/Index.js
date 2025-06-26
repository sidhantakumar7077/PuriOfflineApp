import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
// import { WebView } from 'react-native-webview';
// import Video from 'react-native-video';
import { videoData } from '../../Component/MappingOfflineData';

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [playingVideoId, setPlayingVideoId] = useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            console.log("Refreshing Successful");
            loadLanguage();
        }, 2000);
    }, []);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                setSelectedLanguage(value);
            }
        } catch (error) {
            console.log('Error loading language from storage:', error);
        }
    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setIsScrolled(offsetY > 50);
            }
        }
    );

    useEffect(() => {
        if (isFocused) {
            loadLanguage();
        }
    }, [isFocused, selectedLanguage])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଆକାଶମାର୍ଗ ଦୃଶ୍ୟ' : 'Mapping Videos'}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={false}
                overScrollMode="never"
            >
                <View style={styles.headerContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ବିଭିନ୍ନ ସ୍ଥାନର ଦୃଶ୍ୟ' : 'View of Different Places.'}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ତଳେ ଦିଆଯାଇଥିବା ଭିଡିଓଗୁଡିକୁ କ୍ଲିକ୍ କରି ବିଭିନ୍ନ ସୁବିଧା ସହିତ ସ୍ଥାନଗୁଡିକର ଆକାଶମାର୍ଗ ଦୃଶ୍ୟ ଦେଖନ୍ତୁ।' : 'Click on the videos below to see aerial views of various facilities and locations.'}</Text>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 30 }}>
                            <Image source={require('../../assets/image/parking765.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                <FlatList
                    data={videoData}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20, paddingTop: 10 }}
                    renderItem={({ item }) => (
                        <>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'FiraSans-Regular',
                                color: '#341551',
                                textAlign: 'center',
                                marginTop: 15
                            }}>
                                {selectedLanguage === 'Odia' ? item.odiaTitle : item.title}
                            </Text>

                            <LinearGradient
                                colors={['#FFA726', '#F06292']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    width: 50,
                                    height: 2,
                                    marginTop: 8,
                                    marginBottom: 10,
                                    alignSelf: 'center'
                                }}
                            />

                            <FlatList
                                data={item.videos}
                                keyExtractor={(video) => `${item.id}-${video.id}`}
                                renderItem={({ item: video }) => {
                                    const uniqueId = `${item.id}-${video.id}`;
                                    const isPlaying = playingVideoId === uniqueId;

                                    return (
                                        <View style={styles.card}>
                                            {/* <TouchableOpacity
                                                onPress={() => setPlayingVideoId(isPlaying ? null : uniqueId)}
                                                style={styles.videoWrapper}
                                                activeOpacity={0.9}
                                            >
                                                {isPlaying ? (
                                                    <Video
                                                        source={video.localVideo}
                                                        style={styles.video}
                                                        resizeMode="cover"
                                                        paused={false}
                                                        controls
                                                        repeat
                                                    />
                                                ) : (
                                                    <Image
                                                        source={video.thumbnail}
                                                        style={[styles.video, styles.thumbnailOverlay]}
                                                    />
                                                )}

                                                {!isPlaying && video.localVideo && (
                                                    <Image
                                                        source={video.thumbnail}
                                                        style={[styles.video, styles.thumbnailOverlay]}
                                                    />
                                                )}
                                            </TouchableOpacity> */}

                                            <YoutubePlayer
                                                height={200}
                                                videoId={video.videoId}
                                                play={false}
                                                webViewStyle={{ borderRadius: 10 }}
                                            />

                                            <View style={styles.cardContent}>
                                                <Text style={styles.cardTitle}>{selectedLanguage === 'Odia' ? video.odiaTitle : video.title}</Text>
                                                {/* {video.description ? (
                                                    selectedLanguage === 'Odia' ? (
                                                        <Text style={styles.cardDescription}>{video.odiaDescription}</Text>
                                                    ) : (
                                                        <Text style={styles.cardDescription}>{video.description}</Text>
                                                    )
                                                ) : null} */}
                                            </View>
                                        </View>
                                    );
                                }}
                                scrollEnabled={false}
                            />
                        </>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </ScrollView>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF5F5',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'FiraSans-Regular',
        color: 'white',
        textTransform: 'capitalize'
    },
    headerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#341551',
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        overflow: 'hidden',
    },
    thumbnail: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDescription: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },
    videoWrapper: {
        position: 'relative',
        width: '100%',
        height: 200,
    },
    video: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },
    thumbnailOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        resizeMode: 'cover',
        zIndex: 1,
    },
})