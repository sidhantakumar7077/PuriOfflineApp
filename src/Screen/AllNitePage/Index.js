import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, Image, RefreshControl, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Modal1 from 'react-native-modal';
import { base_url } from '../../../App';
import moment from 'moment';

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);
    const [allNiti, setAllNiti] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isDescModalVisible, setIsDescModalVisible] = useState(false);
    const [niti, setNiti] = useState(null);

    const showDescModal = (niti) => {
        setIsDescModalVisible(!isDescModalVisible);
        setNiti(niti);
    };

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                setSelectedLanguage(value);
                getAllNiti();
            }
        } catch (error) {
            // console.log('Error loading language from storage:', error);
        }
    };

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            console.log("Refreshing Successful");
            getAllNiti();
            loadLanguage();
        }, 2000);
    }, []);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setIsScrolled(offsetY > 50); // Change header color after 50px scroll
            }
        }
    );

    const [alramModalVisible, setAlramModalVisible] = useState(false);

    const handleAlram = () => {
        setAlramModalVisible(!alramModalVisible);
    };

    const getAllNiti = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${base_url}api/get-home-section`);
            if (!response.ok) {
                // throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // console.log('Get Home Page Data:', result);

            if (result.status) {
                setAllNiti(result.data.niti_master);
                setIsLoading(false);
            } else {
                // console.warn('API responded with status false:', result.message);
                setIsLoading(false);
            }

        } catch (error) {
            // console.error('Error fetching home section data:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isFocused) {
            getAllNiti();
            loadLanguage();
        }
    }, [isFocused, selectedLanguage]);

    return (
        <View style={styles.container}>
            {/* Animated Header */}
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଆଜିର ନୀତି' : "Today's Niti"}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Header Image */}
                <View style={styles.headerContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ସମ୍ପୂର୍ଣ୍ଣ ନୀତିକାନ୍ତିର ତାଲିକା' : "Complete List Of Niti's"}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଏଠାରେ ଶ୍ରୀମନ୍ଦିରର ଆଜିର ସମସ୍ତ ନୀତି ତାଲିକା ଦେଖନ୍ତୁ।' : "View all the rituals (Niti) happening inside the Shree Mandir Today."}</Text>
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Call To Know →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/mainLogo.png')} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                {/* Niti List */}
                {isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 150 }}>
                        <Text style={{ fontSize: 16, color: '#999', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                ) : allNiti.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 150 }}>
                        <Text style={{ fontSize: 16, color: '#999', fontFamily: 'FiraSans-Regular', width: '90%', textAlign: 'center' }}>
                            {selectedLanguage === 'Odia' ? "ଇଣ୍ଟରନେଟ୍ କନେକ୍ଶନ ଉପଲବ୍ଧ ନାହିଁ, ଦୟାକରି ଲାଇଭ ତଥ୍ୟ ପାଇଁ ଇଣ୍ଟରନେଟ୍ କନେକ୍ଟ କରନ୍ତୁ।" : "Internet connection is not available please connect to internet for live data."}
                        </Text>
                        <TouchableOpacity onPress={onRefresh} style={{ marginTop: 10, backgroundColor: '#341551', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                            <Text style={{ color: '#fff', fontFamily: 'FiraSans-Regular' }}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            data={allNiti}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => {
                                const isLast = index === allNiti.length - 1;
                                const isCompleted = item.niti_status === 'Completed';
                                const isRunning = item.niti_status === 'Started';
                                const isUpcoming = item.niti_status === 'Upcoming';

                                const getIcon = () => {
                                    if (isCompleted) {
                                        return <Feather name="check-circle" size={20} color="#999" />;
                                    }
                                    if (isRunning) {
                                        return (
                                            <View style={{ backgroundColor: '#dce8e0', padding: 6, borderRadius: 100 }}>
                                                <MaterialCommunityIcons name="timer-outline" size={30} color="#059629" />
                                            </View>
                                        );
                                    }
                                    return (
                                        // null
                                        // onPress={handleAlram}
                                        <TouchableOpacity>
                                            <MaterialCommunityIcons name="bell-outline" size={22} color="#999" />
                                        </TouchableOpacity>
                                    );
                                };

                                const getColor = () => {
                                    if (isCompleted) return '#FFA726'; // purple
                                    if (isRunning) return '#F06292'; // green
                                    return '#C5C5C5'; // grey
                                };

                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 15 }}>
                                        {/* Left Indicator */}
                                        <View style={{ alignItems: 'center', width: 40 }}>
                                            {/* Line above */}
                                            {/* {index !== 0 && <View style={{ height: 12, width: 2, backgroundColor: isCompleted ? getColor() : '#DADADA' }} />} */}

                                            {/* Number Circle */}
                                            <LinearGradient
                                                colors={isUpcoming ? ['#C5C5C5', '#C5C5C5'] : ['#FFA726', '#F06292']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={{
                                                    height: 24,
                                                    width: 24,
                                                    borderRadius: 12,
                                                    borderWidth: 2,
                                                    borderColor: getColor(),
                                                    backgroundColor:
                                                        isCompleted ? '#341551' :
                                                            isRunning ? '#059629' :
                                                                '#C5C5C5',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {isCompleted ? (
                                                    <MaterialIcons name="check" size={14} color="white" />
                                                ) : (
                                                    <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>
                                                        {index + 1}
                                                    </Text>
                                                )}
                                            </LinearGradient>

                                            {/* Line below */}
                                            {!isLast && <View style={{ flex: 1, width: 2, backgroundColor: isCompleted ? getColor() : '#DADADA' }} />}
                                        </View>

                                        {/* Right Content */}
                                        <View style={{ flex: 1, paddingBottom: 40, marginLeft: 7 }}>
                                            <Text style={{ fontSize: 15, color: isRunning ? '#059629' : '#222', fontFamily: 'FiraSans-SemiBold' }}>{selectedLanguage === 'Odia' ? item.niti_name : item.english_niti_name}</Text>
                                            {item.start_time &&
                                                <Text style={{ fontSize: 13, color: isRunning ? '#059629' : '#333', fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? "ଆରମ୍ଭ ସମୟ" : "Started at"} {moment(item.start_time, 'HH:mm:ss').format('h:mm A')}</Text>
                                            }

                                            {isCompleted && (
                                                <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-Regular' }}>
                                                    {selectedLanguage === 'Odia' ? "ସମାପନ ସମୟ" : "Completed at"} {moment(item.end_time, 'HH:mm:ss').format('h:mm A')}
                                                </Text>
                                            )}

                                            {isRunning && (
                                                <>
                                                    <Text style={{ fontSize: 13, color: '#059629', fontFamily: 'FiraSans-Regular' }}>
                                                        {selectedLanguage === 'Odia' ? "ଚାଲୁଅଛି" : "Running Now"}
                                                    </Text>
                                                </>
                                            )}
                                        </View>

                                        {/* Right-side icon */}
                                        <View style={{ marginTop: 5 }}>
                                            {getIcon()}
                                            {/* Info Icon For show description Modal */}
                                            {/* <TouchableOpacity onPress={() => showDescModal(item)}>
                                                <AntDesign name="infocirlce" size={20} color="#999" />
                                            </TouchableOpacity> */}
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                )}
            </ScrollView>

            {/* Niti Description Modal */}
            <Modal
                transparent
                visible={isDescModalVisible}
                animationType="slide"
                onRequestClose={() => setIsDescModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{selectedLanguage === 'Odia' ? niti?.niti_name : niti?.english_niti_name}</Text>
                        <Text style={{ fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20 }}>
                            {selectedLanguage === 'Odia'
                                ? (niti?.description || "No Niti Description Found")
                                : (niti?.english_description || "No Niti Description Found")}
                        </Text>
                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ backgroundColor: '#2196F3', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}
                        >
                            <TouchableOpacity onPress={() => setIsDescModalVisible(false)}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </Modal>

            {/* Alarm Modal */}
            <Modal1
                isVisible={alramModalVisible}
                onBackdropPress={handleAlram}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropTransitionOutTiming={0}
                backdropOpacity={0.5}
            >
                <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'FiraSans-SemiBold', color: '#222' }}>Set Alarm</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'FiraSans-Regular', color: '#999', marginTop: 5 }}>You can set alarm for this darshan</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Regular', color: '#222' }}>Bhitara Kaatha Darshan</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Regular', color: '#222' }}>10:00 AM</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Regular', color: '#222' }}>Set Alarm</Text>
                        <TouchableOpacity style={{ backgroundColor: '#341551', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} onPress={handleAlram}>
                            <Text style={{ color: '#fff', fontFamily: 'FiraSans-Regular' }}>Set</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Regular', color: '#222' }}>Cancel</Text>
                        <TouchableOpacity style={{ backgroundColor: '#341551', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} onPress={handleAlram}>
                            <Text style={{ color: '#fff', fontFamily: 'FiraSans-Regular' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal1>
        </View>
    );
};

export default Index;

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
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 18,
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
        overflow: 'hidden', // Ensures the image does not bleed outside the rounded corners
    },
    headerImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4B7100',
    },
    /* List Item Styles */
    nitiItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    statusIndicator: {
        width: 5,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
    nitiDetails: {
        flex: 1,
    },
    nitiName: {
        fontSize: 14,
        // fontWeight: 'bold',
        fontFamily: 'FiraSans-Regular',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    nitiTime: {
        fontSize: 13,
        color: '#666',
        fontFamily: 'FiraSans-Regular'
    },
    nitiStatus: {
        fontWeight: 'bold',
        color: '#333',
    },
    modalContainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
        minHeight: 330,
    },
});
