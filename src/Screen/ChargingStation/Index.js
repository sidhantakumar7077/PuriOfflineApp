import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {

    const odia_data = [
        {
            "id": 128,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "ରେଲକ୍ସ ଚାର୍ଜିଂ ଷ୍ଟେସନ୍",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/rVz17ktKLEsXiaBP8",
            "contact_no": "07305975001",
            "whatsapp_no": "07305975001",
            "opening_time": "09:00",
            "closing_time": "18:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଣ୍ଡ ରିସର୍ଟ, ବଳିଆ ପଣ୍ଡା ହାଉସିଂ ବୋର୍ଡ କଲୋନୀ",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Grand Resort, Baliapanda Housing Board Colony, Puri, Odisha 752001",
            "status": "active",
            "created_at": "2025-04-18T02:05:18.000000Z",
            "updated_at": "2025-06-03T23:11:53.000000Z"
        },
        {
            "id": 129,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "ବିପିସିଏଲ ଚାର୍ଜିଂ ଷ୍ଟେସନ୍ ",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/7dsPRBrPPz1oD95Y8",
            "contact_no": "08070743743",
            "whatsapp_no": "08070743743",
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ମେରାଇନ ଡ୍ରାଇଭ, ବାଲୁଖଣ୍ଡ ମୌଜା, ହୋଟେଲ ଡିଭାଇନ",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Marine Drive, Balukhand Mauza, Near Hotel Divine Suites, Puri, Odisha 752002",
            "status": "active",
            "created_at": "2025-04-18T02:14:35.000000Z",
            "updated_at": "2025-06-03T23:12:04.000000Z"
        },
        {
            "id": 130,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "ଆଥର ଚାର୍ଜିଂ ଷ୍ଟେସନ୍",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/ZvfGg3DKY7QZ65Vu8",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଅଠରନଳା ରୋଡ଼, କୁମ୍ଭାରପଡା ପୋଲିସ ଷ୍ଟେସନ୍, କୁମ୍ଭାରପଡା",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Atharnala Road, near kumbharpada police station, Kumbharpada, Puri",
            "status": "active",
            "created_at": "2025-04-18T02:17:29.000000Z",
            "updated_at": "2025-06-03T23:12:11.000000Z"
        },
        {
            "id": 131,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "ଟାଟା ପାୱାର ଚାର୍ଜିଂ ଷ୍ଟେସନ୍",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/xe1NswjH29rN4PBk9",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଣ୍ଡ ରୋଡ଼, ବଳଗଣ୍ଡି",
            "pincode": "୭୫୨୦୦୨",
            "city_village": " ପୁରୀ",
            "district": " ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Grand Rd, Balagandi, Puri, Odisha",
            "status": "active",
            "created_at": "2025-04-18T02:19:14.000000Z",
            "updated_at": "2025-06-03T23:12:17.000000Z"
        },
        {
            "id": 132,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "କଚେରୀ ସେକ୍ଶନ ଟିପିସିଓଡିଏଲ ",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/AdH2rnP6Q49aYYT18",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ଗ୍ରାଣ୍ଡ ରୋଡ଼, ବଳଗଣ୍ଡି",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "Bhanumati Rd, Dolamandap Sahi, Puri",
            "status": "active",
            "created_at": "2025-04-18T02:20:40.000000Z",
            "updated_at": "2025-06-03T23:12:23.000000Z"
        },
        {
            "id": 133,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "ଆଥର ଗ୍ରୀଡ ଚାର୍ଜିଂ ଷ୍ଟେସନ୍",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/skKsuSVTQBVRstEw8",
            "contact_no": "07676600900",
            "whatsapp_no": "07676600900",
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "ରାଣୀ ସତୀ ଭବନ, ଗ୍ରାଣ୍ଡ ରୋଡ଼, ବଡଶଙ୍ଖ",
            "pincode": "୭୫୧୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "SHOP NO 1, RANI SATI BHAWAN, Grand Rd, Badasankha, Puri",
            "status": "active",
            "created_at": "2025-04-18T02:24:49.000000Z",
            "updated_at": "2025-06-03T23:12:31.000000Z"
        },
        {
            "id": 134,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "ଜି.କେ ରିକସା ଚାର୍ଜିଂ ଷ୍ଟେସନ୍",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/tEjcsvpFn7wiweoa9",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "09:00",
            "closing_time": "19:00",
            "start_date": null,
            "end_date": null,
            "landmark": " ଗୋପାଳକୃଷ୍ଣ ଲେନ୍, ଗଜପତି ନଗର ",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା",
            "country": "ଭାରତ",
            "description": "103, Gopalkrushna Ln, Gajapati Nagar, Puri",
            "status": "active",
            "created_at": "2025-04-18T02:28:43.000000Z",
            "updated_at": "2025-06-03T23:13:44.000000Z"
        },
    ];

    const english_data = [
        {
            "id": 34,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "Relux Charging Station",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/rVz17ktKLEsXiaBP8",
            "contact_no": "07305975001",
            "whatsapp_no": "07305975001",
            "opening_time": "09:00",
            "closing_time": "18:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Grand Resort, Baliapanda Housing Board Colony",
            "pincode": "752001",
            "city_village": "puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "Grand Resort, Baliapanda Housing Board Colony, Puri, Odisha 752001",
            "status": "active",
            "created_at": "2025-04-18T02:05:18.000000Z",
            "updated_at": "2025-05-27T05:41:18.000000Z"
        },
        {
            "id": 35,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "BPCL Charging Station",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/7dsPRBrPPz1oD95Y8",
            "contact_no": "08070743743",
            "whatsapp_no": "08070743743",
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Balukhand Mauza, Puri, Odisha 752002",
            "pincode": "752002",
            "city_village": "puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "Marine Drive, Balukhand Mauza, Near Hotel Divine Suites, Puri, Odisha 752002",
            "status": "active",
            "created_at": "2025-04-18T02:14:35.000000Z",
            "updated_at": "2025-05-27T05:41:33.000000Z"
        },
        {
            "id": 36,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "Ather Charging Station",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/ZvfGg3DKY7QZ65Vu8",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Atharnala Road, near kumbharpada police station, Kumbharpada",
            "pincode": "752002",
            "city_village": "puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "Atharnala Road, near kumbharpada police station, Kumbharpada, Puri",
            "status": "active",
            "created_at": "2025-04-18T02:17:29.000000Z",
            "updated_at": "2025-06-03T05:52:35.000000Z"
        },
        {
            "id": 37,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "Tata Power Charging Station",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/xe1NswjH29rN4PBk9",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Grand Rd, Balagandi",
            "pincode": "752002",
            "city_village": "puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "Grand Rd, Balagandi, Puri, Odisha",
            "status": "active",
            "created_at": "2025-04-18T02:19:14.000000Z",
            "updated_at": "2025-05-27T05:42:30.000000Z"
        },
        {
            "id": 38,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "Kacheri Section TPCODL",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/AdH2rnP6Q49aYYT18",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Bhanumati Rd, Dolamandap Sahi",
            "pincode": "752001",
            "city_village": "puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "Bhanumati Rd, Dolamandap Sahi, Puri",
            "status": "active",
            "created_at": "2025-04-18T02:20:40.000000Z",
            "updated_at": "2025-06-03T23:11:13.000000Z"
        },
        {
            "id": 40,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "Ather Grid Charging Station",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/skKsuSVTQBVRstEw8",
            "contact_no": "07676600900",
            "whatsapp_no": "07676600900",
            "opening_time": "07:00",
            "closing_time": "06:59",
            "start_date": null,
            "end_date": null,
            "landmark": "Rani Sati Bhawan, Grand Rd, Badasankha",
            "pincode": "751002",
            "city_village": "puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "SHOP NO 1, RANI SATI BHAWAN, Grand Rd, Badasankha, Puri",
            "status": "active",
            "created_at": "2025-04-18T02:24:49.000000Z",
            "updated_at": "2025-06-03T23:13:26.000000Z"
        },
        {
            "id": 41,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "charging_station",
            "service_name": "G.K Rickshaw Charging Station",
            "photo": require('../../assets/offlineData/chargingstation.jpeg'),
            "google_map_link": "https://maps.app.goo.gl/tEjcsvpFn7wiweoa9",
            "contact_no": null,
            "whatsapp_no": null,
            "opening_time": "09:00",
            "closing_time": "19:00",
            "start_date": null,
            "end_date": null,
            "landmark": " Gopalkrushna Ln, Gajapati Nagar",
            "pincode": "752002",
            "city_village": "puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "description": "103, Gopalkrushna Ln, Gajapati Nagar, Puri",
            "status": "active",
            "created_at": "2025-04-18T02:28:43.000000Z",
            "updated_at": "2025-06-03T23:13:34.000000Z"
        },
    ];

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [chargingStation, setChargingStation] = useState([]);

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                // getChargingStation(value);
                if (value === 'Odia') {
                    setChargingStation(odia_data);
                } else if (value === 'English') {
                    setChargingStation(english_data);
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
            // getChargingStation(selectedLanguage);
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

    const openMap = (url) => {
        Linking.openURL(url);
    };

    const getChargingStation = async (language) => {
        try {
            setLoading(true);
            const response = await fetch(`${base_url}api/get-all-service-list/${language}`);
            const responseData = await response.json();
            if (responseData.status) {
                const filtered = responseData.data.filter(item => item.service_type === 'charging_station');
                // const filteredData = filtered.filter(item => item.language === selectedLanguage);
                setChargingStation(filtered);
            }
        } catch (error) {
            console.error('Error fetching life guard booths:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            // getChargingStation(selectedLanguage);
            loadLanguage();
        }
    }, [isFocused, selectedLanguage])

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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଚାର୍ଜିଂ ଷ୍ଟେସନ୍' : 'Charging Station'}</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଚାର୍ଜିଂ ଷ୍ଟେସନ୍' : 'Charging Station'}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ନିକଟତମ ଚାର୍ଜିଂ ଷ୍ଟେସନ୍ |' : 'Find nearest Charging station.'}</Text>
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Check Now →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/charghingstation89.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {/* Main Locker & Shoes Stands */}
                {loading ? (
                    <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={chargingStation}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.google_map_link)}
                                style={{
                                    width: '100%',
                                    height: 100,
                                    flexDirection: 'row',
                                    // alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingVertical: 12,
                                    paddingHorizontal: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <View style={{ width: '30%', justifyContent: 'center', backgroundColor: '#dedfe0', borderRadius: 6 }}>
                                    {item.photo ?
                                        // <Image source={{ uri: item.photo }} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        <Image source={item.photo} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        :
                                        <Image source={require('../../assets/image/no_image.jpg')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                    }
                                </View>

                                {/* Text Content */}
                                <View style={{ width: '65%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                                        {item.service_name || 'Charging Station'}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            {item.landmark}, {item.district}, {item.state}, {item.pincode}
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
