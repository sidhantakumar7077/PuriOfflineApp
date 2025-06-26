import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { trainData } from '../../Component/TrainData'

const TrainList = () => {

    const [activeSections, setActiveSections] = useState([]);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                // getPetrolData(value);
                if (value === 'Odia') {
                    // setPetrolData(odia_data);
                } else if (value === 'English') {
                    // setPetrolData(english_data);
                }
                setSelectedLanguage(value);
            }
        } catch (error) {
            // console.log('Error loading language from storage:', error);
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            // console.log("Refreshing Successful");
            // getPetrolData(selectedLanguage);
            loadLanguage();
        }, 2000);
    }, []);

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
    }, [isFocused, selectedLanguage]);

    const renderTrainTable = (upTrainList, downTrainList) => {
        const maxRows = Math.max(upTrainList.length, downTrainList.length);
        const rows = [];

        for (let i = 0; i < maxRows; i++) {
            rows.push(
                <View key={i} style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', paddingVertical: 6 }}>
                    <Text style={[styles.cell, { width: '20%' }]}>{i + 1}</Text>
                    <Text style={[styles.cell, { width: '40%' }]}>{upTrainList[i]?.trainName || ''}</Text>
                    <Text style={[styles.cell, { width: '40%' }]}>{downTrainList[i]?.trainName || ''}</Text>
                </View>
            );
        }

        return (
            <View style={{ marginHorizontal: 15, marginTop: 10, backgroundColor: '#fff', borderRadius: 6, padding: 10, elevation: 1 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#aaa', paddingBottom: 6 }}>
                    <Text style={[styles.headerCell, { width: '20%' }]}>Sl No</Text>
                    <Text style={[styles.headerCell, { width: '40%' }]}>UP Train</Text>
                    <Text style={[styles.headerCell, { width: '40%' }]}>Down Train</Text>
                </View>
                {rows}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଟ୍ରେନ୍ ତାଲିକା' : 'Train List'}</Text>
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
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15
                    }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>
                                {selectedLanguage === 'Odia' ? 'ପୁରୀକୁ ଆନୁମାନିକ ଟ୍ରେନ୍ ଚଳାଚଳ ସମୟ' : 'Tentative Train Timing to Puri.'}
                            </Text>
                            {/* <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>
                                {selectedLanguage === 'Odia' ? 'ପେଟ୍ରୋଲ ପମ୍ପକୁ ଯିବା ପାଇଁ ଆପଣ ମାନଚିତ୍ରରେ କ୍ଲିକ୍ କରିପାରିବେ।' : 'You Can Click On The Map To Navigate To Petrol Pumps.'}
                            </Text> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 60 }}>
                            <Image source={require('../../assets/image/busRaily.png')}
                                style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    {trainData.map((item) => (
                        <View key={item.id} style={{ marginBottom: 15 }}>
                            <TouchableOpacity
                                onPress={() =>
                                    setActiveSections((prev) =>
                                        prev.includes(item.id)
                                            ? prev.filter((x) => x !== item.id)
                                            : [...prev, item.id]
                                    )
                                }
                                style={{
                                    backgroundColor: '#341551',
                                    padding: 12,
                                    marginHorizontal: 15,
                                    borderRadius: 6,
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 16 }}>
                                    {item.date} ({item.day})
                                </Text>
                            </TouchableOpacity>

                            {activeSections.includes(item.id) && renderTrainTable(item.upTrainList, item.downTrainList)}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

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
        textTransform: 'capitalize',
    },
    headerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#341551',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    ctaBtn: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    ctaText: {
        color: '#4B0082',
        fontFamily: 'FiraSans-Regular'
    },
    cardContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    imageBox: {
        width: '42%',
        height: 100,
        justifyContent: 'center',
        backgroundColor: '#dedfe0',
        borderRadius: 6,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#341551',
        fontFamily: 'FiraSans-SemiBold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2
    },
    subText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
        fontFamily: 'FiraSans-Regular'
    },
    contact: {
        fontSize: 13,
        marginLeft: 4,
        color: '#28a745',
        fontFamily: 'FiraSans-Regular'
    },
    headerCell: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 14,
        fontFamily: 'FiraSans-SemiBold'
    },
    cell: {
        fontSize: 13,
        color: '#333',
        fontFamily: 'FiraSans-Regular'
    }
});

export default TrainList;
