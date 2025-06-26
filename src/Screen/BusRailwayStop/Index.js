import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = (props) => {

    const odia_data = [
        {
            "id": 6,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "commute_type": "bus",
            "name": "ମାଳତୀପାଟପୁର ବସଷ୍ଟାଣ୍ଡ  ",
            "photo": require('../../assets/offlineData/busrailway/MalatipatpurBusStand.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/Cg8MFgxZ6QB3wLUG9",
            "distance_from_temple": "10 Km",
            "landmark": "ମାଳତୀପାଟପୁର",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "India",
            "description": "Bus Stand",
            "status": "active",
            "created_at": "2025-04-01T08:04:49.000000Z",
            "updated_at": "2025-05-27T05:52:13.000000Z"
        },
        {
            "id": 7,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "commute_type": "bus",
            "name": "ତାଳବଣିଆ ବସଷ୍ଟାଣ୍ଡ ",
            "photo": require('../../assets/offlineData/busrailway/TalabaniaBusStand.jpg'),
            "google_map_link": "https://www.google.co.in/maps/place/Talabania+Bus+stand/@19.8123549,85.8503401,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMQy00XyY1ZvaFmUIZLwg88wEeh9ytagzenEU9a!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipMQy00XyY1ZvaFmUIZLwg88wEeh9ytagzenEU9a%3Dw203-h114-k-no!7i4032!8i2268!4m7!3m6!1s0x3a19c1d7f67329cd:0xf6414733817629a!8m2!3d19.8122775!4d85.8501295!10e5!16s%2Fg%2F11p9ps7b90?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
            "distance_from_temple": "3.2 Km",
            "landmark": "ପୁରୁଷୋତ୍ତମ ନଗର",
            "pincode": "୭୫୨୦୦୩",
            "city_village": "",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "India",
            "description": "Talabania Bus Stand",
            "status": "active",
            "created_at": "2025-04-19T04:40:01.000000Z",
            "updated_at": "2025-05-27T05:53:38.000000Z"
        },
        {
            "id": 11,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "commute_type": "bus",
            "name": "ସ୍ଵାମୀ ନାରାୟଣ ମନ୍ଦିର",
            // "photo": require('../../assets/offlineData/busrailway/TalabaniaBusStand.jpg'),
            "google_map_link": "https://maps.app.goo.gl/FwCvKvwG7ptiMcUn7",
            "distance_from_temple": "7.7 Km",
            "landmark": "ବାଇଦାସ ନଗର ଛକ",
            "pincode": "୭୫୨୦୦୩",
            "city_village": "ମୋହନୀପୁର",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "India",
            "description": "ସ୍ଵାମୀ ନାରାୟଣ ମନ୍ଦିର",
            "status": "active",
            "created_at": "2025-04-19T04:40:01.000000Z",
            "updated_at": "2025-05-27T05:53:38.000000Z"
        },
        {
            "id": 9,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "commute_type": "railway",
            "name": "ମାଳତୀପାଟପୁର ରେଳ ଷ୍ଟେସନ୍ ",
            "photo": require('../../assets/offlineData/busrailway/MalatipatpurRailwayStation.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Malatipatpur/@19.865887,85.830264,17z/data=!4m15!1m8!3m7!1s0x3a19c72335523611:0x7352198755b69ccd!2sMalatipatpur!8m2!3d19.8657841!4d85.8313511!10e5!16s%2Fg%2F1tflqf8p!3m5!1s0x3a19c72335523611:0x7352198755b69ccd!8m2!3d19.8657841!4d85.8313511!16s%2Fg%2F1tflqf8p?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
            "distance_from_temple": "8.5 Km",
            "landmark": "ଭୁବନେଶ୍ବର ପୁରୀ ହାଇୱେ , ଚନ୍ଦନପୁର",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "India",
            "description": "Malatipatpur Railway Station",
            "status": "active",
            "created_at": "2025-04-19T05:01:03.000000Z",
            "updated_at": "2025-05-27T05:53:53.000000Z"
        },
        {
            "id": 10,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "commute_type": "railway",
            "name": "ପୁରୀ ରେଳ ଷ୍ଟେସନ୍ ",
            "photo": require('../../assets/offlineData/busrailway/PuriRailwayStation.jpg'),
            "google_map_link": "https://www.google.co.in/maps/place/Puri+Railway+Station/@19.807566,85.83749,17z/data=!4m15!1m8!3m7!1s0x3a19c7d949983551:0x1a0f7bb1799f2bff!2sPuri+Railway+Station!8m2!3d19.8076289!4d85.837861!10e5!16s%2Fg%2F11rcsnd26w!3m5!1s0x3a19c7d949983551:0x1a0f7bb1799f2bff!8m2!3d19.8076289!4d85.837861!16s%2Fg%2F11rcsnd26w?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
            "distance_from_temple": "2.8 Km",
            "landmark": "ରେଡ କ୍ରସ ରୋଡ଼",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "India",
            "description": "Puri Railway Station",
            "status": "active",
            "created_at": "2025-04-19T04:47:00.000000Z",
            "updated_at": "2025-05-27T05:54:04.000000Z"
        }
    ];

    const english_data = [
        {
            "id": 1,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "commute_type": "bus",
            "name": "Malatipatpur Bus Stand",
            "photo": require('../../assets/offlineData/busrailway/MalatipatpurBusStand.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/Cg8MFgxZ6QB3wLUG9",
            "distance_from_temple": "10 Km",
            "landmark": "Malatipatapur",
            "pincode": "752001",
            "city_village": "Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "Bus Stand",
            "status": "active",
            "created_at": "2025-04-01T08:04:49.000000Z",
            "updated_at": "2025-04-27T10:04:01.000000Z"
        },
        {
            "id": 2,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "commute_type": "bus",
            "name": "Talabania Bus Stand",
            "photo": require('../../assets/offlineData/busrailway/TalabaniaBusStand.jpg'),
            "google_map_link": "https://www.google.co.in/maps/place/Talabania+Bus+stand/@19.8123549,85.8503401,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMQy00XyY1ZvaFmUIZLwg88wEeh9ytagzenEU9a!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipMQy00XyY1ZvaFmUIZLwg88wEeh9ytagzenEU9a%3Dw203-h114-k-no!7i4032!8i2268!4m7!3m6!1s0x3a19c1d7f67329cd:0xf6414733817629a!8m2!3d19.8122775!4d85.8501295!10e5!16s%2Fg%2F11p9ps7b90?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
            "distance_from_temple": "3.2 Km",
            "landmark": "Purussottam Nagar",
            "pincode": "752003",
            "city_village": "Puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Talabania Bus Stand",
            "status": "active",
            "created_at": "2025-04-19T04:40:01.000000Z",
            "updated_at": "2025-05-27T05:52:53.000000Z"
        },
        {
            "id": 12,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "commute_type": "bus",
            "name": "Swami Narayan Temple",
            // "photo": require('../../assets/offlineData/busrailway/TalabaniaBusStand.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/FwCvKvwG7ptiMcUn7",
            "distance_from_temple": "7.7 Km",
            "landmark": "Baidas Nagar Chhaka",
            "pincode": "752003",
            "city_village": "Mohanipur",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Swami Narayan Temple",
            "status": "active",
            "created_at": "2025-04-19T04:40:01.000000Z",
            "updated_at": "2025-05-27T05:52:53.000000Z"
        },
        {
            "id": 3,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "commute_type": "railway",
            "name": "Puri Railway Station",
            "photo": require('../../assets/offlineData/busrailway/PuriRailwayStation.jpg'),
            "google_map_link": "https://www.google.co.in/maps/place/Puri+Railway+Station/@19.807566,85.83749,17z/data=!4m15!1m8!3m7!1s0x3a19c7d949983551:0x1a0f7bb1799f2bff!2sPuri+Railway+Station!8m2!3d19.8076289!4d85.837861!10e5!16s%2Fg%2F11rcsnd26w!3m5!1s0x3a19c7d949983551:0x1a0f7bb1799f2bff!8m2!3d19.8076289!4d85.837861!16s%2Fg%2F11rcsnd26w?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
            "distance_from_temple": "2.8 Km",
            "landmark": "Red Cross Rd",
            "pincode": "752002",
            "city_village": "Puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Puri Railway Station",
            "status": "active",
            "created_at": "2025-04-19T04:47:00.000000Z",
            "updated_at": "2025-05-27T05:53:01.000000Z"
        },
        {
            "id": 4,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "commute_type": "railway",
            "name": "Malatipatpur Railway Station",
            "photo": require('../../assets/offlineData/busrailway/MalatipatpurRailwayStation.jpeg'),
            "google_map_link": "https://www.google.co.in/maps/place/Malatipatpur/@19.865887,85.830264,17z/data=!4m15!1m8!3m7!1s0x3a19c72335523611:0x7352198755b69ccd!2sMalatipatpur!8m2!3d19.8657841!4d85.8313511!10e5!16s%2Fg%2F1tflqf8p!3m5!1s0x3a19c72335523611:0x7352198755b69ccd!8m2!3d19.8657841!4d85.8313511!16s%2Fg%2F1tflqf8p?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D",
            "distance_from_temple": "8.5 Km",
            "landmark": "Bhubaneswar Puri Highway Chandanpur",
            "pincode": "752002",
            "city_village": "Puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Malatipatpur Railway Station",
            "status": "active",
            "created_at": "2025-04-19T05:01:03.000000Z",
            "updated_at": "2025-05-27T05:53:15.000000Z"
        },
    ];

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [allBusRailway, setAllBusRailway] = useState([]);
    const [selectedTab, setSelectedTab] = useState('BusStand'); // Default selected tab

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                // getAllBusRailway(value);
                if (value === 'Odia') {
                    setAllBusRailway(odia_data);
                } else if (value === 'English') {
                    setAllBusRailway(english_data);
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
            // getAllBusRailway(selectedLanguage);
            loadLanguage();
        }, 2000);
    }, []);

    const filteredData = selectedTab === 'BusStand'
        ? allBusRailway.filter(item => item.commute_type === 'bus')
        : allBusRailway.filter(item => item.commute_type === 'railway');

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

    const openMap = (url) => {
        Linking.openURL(url);
    };

    const getAllBusRailway = async (language) => {
        try {
            setSpinner(true);
            const response = await fetch(`${base_url}api/get-commute/${language}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === true) {
                // console.log("get Bus & Railway List-------", responseData.data);
                setSpinner(false);
                // const filteredData = responseData.data.filter(item => item.language === selectedLanguage);
                setAllBusRailway(responseData.data);
            }
        } catch (error) {
            console.log('Error fetching Bus & Railway List:', error);
            setSpinner(false);
        };
    }

    useEffect(() => {
        if (isFocused) {
            // getAllBusRailway(selectedLanguage);
            loadLanguage();
            setSelectedTab(props.route.params || 'BusStand');
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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ବସ୍ ଷ୍ଟାଣ୍ଡ ଏବଂ ରେଳ ଷ୍ଟେସନ' : 'Bus & Railway Station'}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            {spinner === true ?
                <View style={{ flex: 1, alignSelf: 'center', top: '40%' }}>
                    <Text style={{ color: '#341551', fontSize: 17 }}>Loading...</Text>
                </View>
                :
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
                                <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ବସ୍ ଷ୍ଟାଣ୍ଡ ଏବଂ ରେଳ ଷ୍ଟେସନ' : 'Bus Stand & Railway Station'}</Text>
                                <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ନିକଟତମ ବସ୍ ଷ୍ଟାଣ୍ଡ ଏବଂ ରେଳ ଷ୍ଟେସନ |' : 'Find the nearest bus stand and railway stations.'}</Text>
                                {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                    <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Check Now →</Text>
                                </TouchableOpacity> */}
                            </View>
                            <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                                <Image source={require('../../assets/image/busRaily.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, margin: 15, padding: 5 }}>
                        <LinearGradient
                            colors={selectedTab === 'BusStand' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity onPress={() => setSelectedTab('BusStand')}>
                                <Text style={{ color: selectedTab === 'BusStand' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                                    {selectedLanguage === 'Odia' ? 'ବସ୍ ଷ୍ଟାଣ୍ଡ' : 'Bus Stand'}
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient
                            colors={selectedTab === 'Railway' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity onPress={() => setSelectedTab('Railway')}>
                                <Text style={{ color: selectedTab === 'Railway' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                                    {selectedLanguage === 'Odia' ? 'ରେଳ ଷ୍ଟେସନ' : 'Railway Station'}
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    {/* Main Locker & Shoes Stands */}
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.google_map_link)}
                                style={{
                                    width: '100%',
                                    height: 120,
                                    flexDirection: 'row',
                                    // alignItems: 'center',
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

                                {/* Text Content */}
                                <View style={{ width: '55%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                                        {item.name}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            {item.landmark}, {item.district}, {item.pincode}
                                        </Text>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="access-time" size={13} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            24/7
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
                </ScrollView>
            }
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
        overflow: 'hidden', // Ensures the image does not bleed outside the rounded corners
    },
    headerImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4B7100',
    },
    /* List Styles */
    mostPPlrItem: {
        backgroundColor: '#fff',
        width: '48%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5,
        marginBottom: 10,
        marginHorizontal: '1.3%'
    },
    mostPPImage: {
        height: '100%',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: 'cover'
    },
    hotBtm: {
        position: 'absolute',
        top: 10,
        left: 6,
        backgroundColor: '#f00062',
        padding: 2,
        borderRadius: 6
    },
    saveBtm: {
        position: 'absolute',
        top: 10,
        right: 6,
        backgroundColor: '#fff',
        width: 26,
        height: 26,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lockerImage: {
        height: 100,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    secondLocker: {
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
        overflow: 'hidden',
        padding: 8
    },
});
