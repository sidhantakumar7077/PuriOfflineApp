import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {

    const odia_data = [
        {
            "id": 119,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "ଉତ୍ତରଦ୍ଵାର ଲକର ଓ ଜୋତା ଷ୍ଟାଣ୍ଡ ",
            "photo": require('../../assets/offlineData/lockerstand/Northgatelocker.jpg'),
            "google_map_link": "https://www.google.com/maps/search/puri+jagannath+temple+north+gate/@19.8052571,85.8153477,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ଶ୍ରୀମନ୍ଦିର ଉତ୍ତର ଦ୍ଵାର",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:28:39.000000Z",
            "updated_at": "2025-04-28T01:10:55.000000Z"
        },
        {
            "id": 120,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "ଦକ୍ଷିଣଦ୍ଵାର ଲକର ଓ ଜୋତା ଷ୍ଟାଣ୍ଡ ",
            "photo": require('../../assets/offlineData/lockerstand/Southgatelocker.jpg'),
            "google_map_link": "https://www.google.com/maps/search/puri+jagannath+temple+south+gate/@19.8052571,85.8153477,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ଶ୍ରୀମନ୍ଦିର ଦକ୍ଷିଣ ଦ୍ଵାର",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "",
            "district": "ପୁରୀ ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:30:59.000000Z",
            "updated_at": "2025-04-28T01:10:52.000000Z"
        },
        {
            "id": 121,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "ପଶ୍ଚିମଦ୍ଵାର ଲକର ଓ ଜୋତା ଷ୍ଟାଣ୍ଡ ",
            "photo": require('../../assets/offlineData/lockerstand/Westgatelocker.jpg'),
            "google_map_link": "https://www.google.com/maps/search/puri+jagannath+temple+west+gate/@19.8052571,85.8153477,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ଶ୍ରୀମନ୍ଦିର ପଶ୍ଚିମ ଦ୍ଵାର",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:33:45.000000Z",
            "updated_at": "2025-04-28T01:10:50.000000Z"
        },
        {
            "id": 122,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "ପୂର୍ବଦ୍ଵାର ଲକର ଓ ଜୋତା ଷ୍ଟାଣ୍ଡ ",
            "photo": require('../../assets/offlineData/lockerstand/Eastgatelocker.jpg'),
            "google_map_link": "https://www.google.com/maps/search/puri+jagannath+temple+East+gate/@19.8052571,85.8153477,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ଶ୍ରୀମନ୍ଦିର ପୂର୍ବଦ୍ଵାର",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:35:50.000000Z",
            "updated_at": "2025-04-28T01:10:47.000000Z"
        },
        {
            "id": 123,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "ଦୋଳ ବେଦୀ କୋଣ ଲକର ଓ ଜୋତା ଷ୍ଟାଣ୍ଡ ",
            "photo": require('../../assets/offlineData/lockerstand/dolabediShoestand.jpg'),
            "google_map_link": "https://www.google.com/maps/place/19%C2%B048'23.8%22N+85%C2%B049'11.1%22E/@19.806616,85.819762,17z/data=!3m1!4b1!4m4!3m3!8m2!3d19.806616!4d85.819762?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ଶ୍ରୀ ଦାଣ୍ଡ",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:35:50.000000Z",
            "updated_at": "2025-04-28T01:10:47.000000Z"
        },
    ];

    const english_data = [
        {
            "id": 42,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "North Gate Locker & Shoe Stand",
            "photo": require('../../assets/offlineData/lockerstand/Northgatelocker.jpg'),
            "google_map_link": "https://www.google.com/maps/search/puri+jagannath+temple+north+gate/@19.8052571,85.8153477,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Shree Mandira North Gate",
            "pincode": "752002",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:28:39.000000Z",
            "updated_at": "2025-06-03T07:59:46.000000Z"
        },
        {
            "id": 43,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "South Gate Locker & Shoe Stand",
            "photo": require('../../assets/offlineData/lockerstand/Southgatelocker.jpg'),
            "google_map_link": "https://www.google.com/maps/search/puri+jagannath+temple+south+gate/@19.8052571,85.8153477,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Shree Mandira South Gate",
            "pincode": "752002",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:30:59.000000Z",
            "updated_at": "2025-06-03T07:59:41.000000Z"
        },
        {
            "id": 44,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "West Gate  Locker & Shoe Stand",
            "photo": require('../../assets/offlineData/lockerstand/Westgatelocker.jpg'),
            "google_map_link": "https://www.google.com/maps/search/puri+jagannath+temple+west+gate/@19.8052571,85.8153477,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Shree Mandira West Gate",
            "pincode": "752002",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:33:45.000000Z",
            "updated_at": "2025-06-03T07:59:27.000000Z"
        },
        {
            "id": 45,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "East Gate  Locker & Shoe Stand",
            "photo": require('../../assets/offlineData/lockerstand/Eastgatelocker.jpg'),
            "google_map_link": "https://www.google.com/maps/search/puri+jagannath+temple+East+gate/@19.8052571,85.8153477,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Shree Mandira East Gate",
            "pincode": "752002",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:35:50.000000Z",
            "updated_at": "2025-06-03T07:59:23.000000Z"
        },
        {
            "id": 46,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "locker",
            "service_name": "Dola Bedi Kona Locker & Shoe Stand",
            "photo": require('../../assets/offlineData/lockerstand/dolabediShoestand.jpg'),
            "google_map_link": "https://www.google.com/maps/place/19%C2%B048'23.8%22N+85%C2%B049'11.1%22E/@19.806616,85.819762,17z/data=!3m1!4b1!4m4!3m3!8m2!3d19.806616!4d85.819762?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "06:30",
            "closing_time": "07:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Shree Danda",
            "pincode": "752002",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "good",
            "status": "active",
            "created_at": "2025-04-18T03:35:50.000000Z",
            "updated_at": "2025-06-03T07:59:23.000000Z"
        },
    ]

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const [allShoesStands, setAllShoesStands] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                // getShoesStands(value);
                if (value === 'Odia') {
                    setAllShoesStands(odia_data);
                } else if (value === 'English') {
                    setAllShoesStands(english_data);
                }
                setSelectedLanguage(value);
            }
        } catch (error) {
            console.log('Error loading language from storage:', error);
        }
    };

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            console.log("Refreshing Successful");
            // getShoesStands(selectedLanguage);
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

    const openMap = (url) => {
        Linking.openURL(url);
    };

    const getShoesStands = async (language) => {
        try {
            setSpinner(true);
            const response = await fetch(`${base_url}api/get-all-service-list/${language}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === true) {
                const shoeStandsOnly = responseData.data.filter(item => item.service_type === 'locker');
                // const filteredData = shoeStandsOnly.filter(item => item.language === selectedLanguage);
                // console.log("object", filteredData);
                setAllShoesStands(shoeStandsOnly);
                setSpinner(false);
            }
        } catch (error) {
            console.error('Error fetching shoe stand data:', error);
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            // getShoesStands(selectedLanguage);
            loadLanguage();
        }
    }, [isFocused, selectedLanguage]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଲକର୍ ଏବଂ ଜୋତା ଷ୍ଟାଣ୍ଡ' : 'Locker & Shoe Stand'}</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଜିନିଷ ରଖିବା ସ୍ଥାନ ଓ ଜୋତାଷ୍ଟାଣ୍ଡ' : 'Cloakroom & Lockers'}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ମନ୍ଦିର ନିକଟରେ ଉପଲବ୍ଧ କିଛି ଲକର ଏବଂ ଜୋତାଷ୍ଟାଣ୍ଡ|' : 'Some Of The Available Lockers & Stands Near To The Temple.'}</Text>
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Check Now →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/locker675.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {spinner ? (
                    <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={allShoesStands}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.google_map_link)}
                                style={{
                                    width: '100%',
                                    height: 120,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingVertical: 12,
                                    paddingHorizontal: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <View style={{ width: '42%', justifyContent: 'center', backgroundColor: '#dedfe0', borderRadius: 6 }}>
                                    {item.photo ?
                                        // <Image source={{ uri: item.photo }} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        <Image source={item.photo} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        :
                                        <Image source={require('../../assets/image/no_image.jpg')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                    }
                                </View>
                                <View style={{ width: '55%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                                        {item.service_name || 'Shoe Stand'}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            {item.landmark}, {item.district}
                                        </Text>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="access-time" size={13} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            Open: {item.opening_time} - {item.closing_time}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <FontAwesome5 name="air-freshener" size={13} color="#28a745" />
                                        <Text style={{ fontSize: 13, marginLeft: 5, color: '#28a745', textTransform: 'capitalize' }}>{item.status}</Text>
                                    </View> */}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </ScrollView>
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
        overflow: 'hidden'
    }
});
