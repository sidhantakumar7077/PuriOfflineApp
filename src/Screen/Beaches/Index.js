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
            "id": 95,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "beach",
            "service_name": "ନୀଳାଦ୍ରୀ ବେଳାଭୂମି",
            "photo": [
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeach1.jpeg'),
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeach2.jpeg'),
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeach3.jpeg'),
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeach4.jpeg'),
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeachcoverphoto1.jpeg')
            ],
            "google_map_link": "https://maps.app.goo.gl/6D6z5UQNgzq8WZMS8",
            "contact_no": "1800111363",
            "whatsapp_no": "1800111363",
            "opening_time": "05:00",
            "closing_time": "05:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ବାଙ୍କି ମୁହାଣ ରୋଡ଼ ,",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା ",
            "country": "ଭାରତ ",
            "description": "ପାର୍କିଂ / ଶୌଚାଳୟ / ପାର୍କ / ବସିବା ସ୍ଥାନ",
            "status": "active",
            "created_at": "2025-04-27T12:23:09.000000Z",
            "updated_at": "2025-05-27T05:44:24.000000Z"
        },
        {
            "id": 96,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "beach",
            "service_name": "ବ୍ଲୁଫ୍ଲାଗ ବେଳାଭୂମି",
            "photo": [
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeach1.jpeg'),
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeach2.jpeg'),
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeach3.jpeg'),
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeach4.jpeg'),
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeachcoverphoto.jpeg')
            ],
            "google_map_link": "https://maps.app.goo.gl/8wKb1kwfsBGts3de9",
            "contact_no": "1800111363",
            "whatsapp_no": null,
            "opening_time": "05:00",
            "closing_time": "05:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ଶଙ୍କର ରୋଡ଼ , ପୁରୀ ,",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା ",
            "country": "ଭାରତ",
            "description": "ପାର୍କିଂ / ଶୌଚାଳୟ / ପାର୍କ / ବସିବା ସ୍ଥାନ",
            "status": "active",
            "created_at": "2025-04-27T12:30:47.000000Z",
            "updated_at": "2025-05-27T05:44:27.000000Z"
        },
        {
            "id": 97,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "service_type": "beach",
            "service_name": "ଗୋଲ୍ଡେନ ବେଳାଭୂମି",
            "photo": [
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeach1.jpeg'),
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeach2.jpeg'),
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeach3.jpeg'),
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeach3.jpeg'),
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeachcoverphoto.jpeg')
            ],
            "google_map_link": "https://maps.app.goo.gl/GjjPwy9o6k11r8zy7",
            "contact_no": "1800111363",
            "whatsapp_no": null,
            "opening_time": "05:00",
            "closing_time": "05:00",
            "start_date": null,
            "end_date": null,
            "landmark": "ଶଙ୍କର ରୋଡ଼ , ପୁରୀ",
            "pincode": "୭୫୨୦୦୨",
            "city_village": "ପୁରୀ",
            "district": "ପୁରୀ",
            "state": "ଓଡ଼ିଶା ",
            "country": "ଭାରତ",
            "description": "ପାର୍କିଂ / ଶୌଚାଳୟ / ପାର୍କ / ବସିବା ସ୍ଥାନ",
            "status": "active",
            "created_at": "2025-04-27T12:34:25.000000Z",
            "updated_at": "2025-05-27T05:44:32.000000Z"
        },
    ];

    const english_data = [
        {
            "id": 1,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "beach",
            "service_name": "Niladri Beach",
            "photo": [
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeach1.jpeg'),
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeach2.jpeg'),
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeach3.jpeg'),
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeach4.jpeg'),
                require('../../assets/offlineData/beaches/NiladriBeach/niladribeachcoverphoto1.jpeg')
            ],
            "google_map_link": "https://maps.app.goo.gl/tDUJKidsU1rp4z7Z6",
            "contact_no": "1800111363",
            "whatsapp_no": null,
            "opening_time": "08:00",
            "closing_time": "20:30",
            "start_date": null,
            "end_date": null,
            "landmark": "Banki Muhan Road",
            "pincode": "752002",
            "city_village": "puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "A beautiful, beach with the best part being that there is a well maintained park at the entry point and the beach itself is less crowded.",
            "status": "active",
            "created_at": "2025-04-18T00:26:45.000000Z",
            "updated_at": "2025-05-27T05:10:11.000000Z"
        },
        {
            "id": 2,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "beach",
            "service_name": "Blue Flag Beach",
            "photo": [
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeach1.jpeg'),
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeach2.jpeg'),
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeach3.jpeg'),
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeach4.jpeg'),
                require('../../assets/offlineData/beaches/BlueFlagBeach/blueflagbeachcoverphoto.jpeg')
            ],
            "google_map_link": "https://www.google.co.in/maps/place/Blue+Flag+Beach/@19.7965033,85.8287345,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c52655258809:0x526a68bae3011bc7!8m2!3d19.7965033!4d85.8313094!16s%2Fg%2F11lh_wl1wt?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "1800111363",
            "whatsapp_no": null,
            "opening_time": "05:30",
            "closing_time": "09:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar rd",
            "pincode": "752001",
            "city_village": "puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Wide, sandy beach home to a kids' playground, decorative statues & cafes, plus a fitness center.",
            "status": "active",
            "created_at": "2025-04-18T00:33:10.000000Z",
            "updated_at": "2025-05-27T05:10:43.000000Z"
        },
        {
            "id": 4,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "service_type": "beach",
            "service_name": "Golden Beach",
            "photo": [
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeach1.jpeg'),
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeach2.jpeg'),
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeach3.jpeg'),
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeach3.jpeg'),
                require('../../assets/offlineData/beaches/GoldenBeach/goldenBeachcoverphoto.jpeg')
            ],
            "google_map_link": "https://www.google.co.in/maps/place/Golden+Beach,+Puri,+Odisha/@19.7969375,85.8284876,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19c5cac5afa9d7:0x880a15dc82619942!8m2!3d19.7969375!4d85.8310625!16s%2Fg%2F11lfbgx8bp?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D",
            "contact_no": "1800111363",
            "whatsapp_no": null,
            "opening_time": "08:00",
            "closing_time": "08:00",
            "start_date": null,
            "end_date": null,
            "landmark": "Shankar Rd",
            "pincode": "752001",
            "city_village": "puri",
            "district": "puri",
            "state": "Odisha",
            "country": "India",
            "description": "Golden Beach, located in Puri, Odisha, is a true gem of India's eastern coastline. Renowned for its shimmering sands and pristine waters, it's a perfect escape for nature lovers and beachgoers alike.",
            "status": "active",
            "created_at": "2025-04-18T00:40:49.000000Z",
            "updated_at": "2025-05-27T05:10:58.000000Z"
        },
    ];

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [beachList, setBeachList] = useState([]);

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                // getAllBeaches(value);
                if (value === 'Odia') {
                    setBeachList(odia_data);
                } else if (value === 'English') {
                    setBeachList(english_data);
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
            // getAllBeaches(selectedLanguage);
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

    const [selectedImages, setSelectedImages] = useState({});

    const handleImageSelect = (nibasId, imageUri) => {
        setSelectedImages(prev => ({
            ...prev,
            [nibasId]: imageUri
        }));
    };

    const getAllBeaches = async (language) => {
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
                // console.log("get Bhakta Nibas List-------", responseData.data);
                setSpinner(false);
                const filtered = responseData.data.filter(item => item.service_type === 'beach');
                // const filteredData = filtered.filter(item => item.language === selectedLanguage);
                setBeachList(filtered);

                const initialImageSelection = {};
                filtered.forEach(item => {
                    if (item.photo && item.photo.length > 0) {
                        initialImageSelection[item.id] = item.photo[0];
                    }
                });
                setSelectedImages(initialImageSelection);
            }
        } catch (error) {
            console.log('Error fetching Bhakta Nibas:', error);
            setSpinner(false);
        }
    }

    useEffect(() => {
        if (isFocused) {
            // getAllBeaches(selectedLanguage);
            const initialImageSelection = {};
            beachList.forEach(item => {
                if (item.photo && item.photo.length > 0) {
                    initialImageSelection[item.id] = item.photo[0];
                }
            });
            setSelectedImages(initialImageSelection);
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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ବେଳାଭୂମି' : 'Beaches'}</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ସହରର ପ୍ରସିଦ୍ଧ ବେଳାଭୂମି' : 'Famous Beaches In The City'}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ପୁରୀ ସହରର କିଛି ଆକର୍ଷଣୀୟ ଏବଂ ପରିଷ୍କାର ବେଳାଭୂମି' : 'Some Of The Attractive & Clean Beaches In The City Of Puri'}</Text>
                            {/* <View style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Check out →</Text>
                            </View> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/beaches21.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                {/* Nibas List */}
                {spinner ?
                    <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={beachList}
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15, marginTop: 10 }}
                        keyExtractor={(key) => {
                            return key.id
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    {/* Property Name */}
                                    <Text style={styles.propertyName}>{item.service_name}</Text>

                                    {/* Main Large Image */}
                                    <View>
                                        {selectedImages[item.id] ? (
                                            // <Image source={{ uri: selectedImages[item.id] }} style={styles.mainImage} />
                                            <Image
                                                source={selectedImages[item.id]}
                                                style={styles.mainImage}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <View style={[styles.mainImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }]}>
                                                <Text style={{ color: '#999' }}>No Image</Text>
                                            </View>
                                        )}
                                        {/* <TouchableOpacity style={styles.view360Badge}>
                                            <Text style={styles.view360Text}>360°</Text>
                                            <MaterialIcons name="360" size={20} color="#f43f5e" style={{ marginTop: -8 }} />
                                        </TouchableOpacity> */}
                                    </View>

                                    {/* Thumbnail Scroll Section */}
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={item.photo}
                                        keyExtractor={(uri, index) => index.toString()}
                                        contentContainerStyle={{ marginBottom: 8, marginTop: 4 }}
                                        renderItem={({ item: thumb }) => (
                                            <TouchableOpacity onPress={() => handleImageSelect(item.id, thumb)}>
                                                <Image
                                                    // source={{ uri: thumb }}
                                                    source={thumb}
                                                    resizeMode="cover"
                                                    style={[
                                                        styles.thumbnail,
                                                        selectedImages[item.id] === thumb && styles.selectedThumbnail
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    />

                                    {/* Distance Row */}
                                    {/* <View style={styles.distanceRow}>
                                        <MaterialIcons name="location-on" size={16} color="#7e22ce" />
                                        <Text style={styles.distanceText}>
                                            2 KM from Puri Temple, 3.2 Kms from Puri Beach
                                        </Text>
                                    </View> */}

                                    {/* Offers & Address */}
                                    <View style={styles.infoRow}>
                                        <View style={styles.infoColumn}>
                                            <Text style={styles.label}>{selectedLanguage === 'Odia' ? "ଉପଲବ୍ଧ ସୁବିଧା" : "Facility Available"}:</Text>
                                            {selectedLanguage === 'Odia' ?
                                                <Text style={styles.value}>ପାର୍କିଂ/ଶୌଚାଳୟ/ପାର୍କ/{"\n"}ବସିବା ଆସନ</Text>
                                                :
                                                <Text style={styles.value}>Parking/Toilet/Park/{"\n"}Sitting Chair</Text>
                                            }
                                        </View>
                                        <View style={styles.infoColumn}>
                                            <Text style={styles.label}>{selectedLanguage === 'Odia' ? "ଠିକଣା" : "Address"}:</Text>
                                            <Text style={styles.value}>{item.landmark}{"\n"}{item.district}, {item.state}, {item.pincode}</Text>
                                        </View>
                                    </View>

                                    {/* Buttons */}
                                    <View style={styles.buttonRow}>
                                        <TouchableOpacity onPress={() => openMap(item.google_map_link)} style={styles.bookNowButton}>
                                            <Text style={styles.bookNowText}>Direction</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {index !== beachList.length - 1 && <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginVertical: 20 }} />}
                                </View>
                            )
                        }}
                    />
                }
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
    propertyName: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'FiraSans-Bold',
        marginBottom: 8,
    },
    mainImage: {
        width: '100%',
        height: 166,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    view360Badge: {
        position: 'absolute',
        top: 7,
        right: 7,
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    view360Text: {
        fontSize: 12,
        color: '#f43f5e',
        fontWeight: 'bold'
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    selectedThumbnail: {
        borderColor: '#7e22ce',
        borderWidth: 2
    },
    distanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    distanceText: {
        fontSize: 13,
        color: '#7e22ce',
        marginLeft: 5,
        fontFamily: 'FiraSans-Regular'
    },
    infoRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    infoColumn: {
        // flex: 1,
        // paddingRight: 10
    },
    label: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'FiraSans-SemiBold'
    },
    value: {
        fontSize: 12,
        color: '#444',
        marginTop: 2,
        lineHeight: 19,
        fontFamily: 'FiraSans-Regular'
    },
    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 12,
    },
    bookNowButton: {
        backgroundColor: '#7e22ce',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginRight: 20
    },
    bookNowText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600'
    },
    callButton: {
        // backgroundColor: '#f1f1f1',
        borderWidth: 1,
        borderColor: '#b8b8b8',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    callText: {
        fontSize: 13,
        color: '#000',
        fontWeight: '600'
    }
});
