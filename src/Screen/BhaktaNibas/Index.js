import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {

    const odia_data = [
        {
            "id": 8,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "name": "ଶ୍ରୀପୁରୁଷୋତ୍ତମ ଭକ୍ତ ନିବାସ",
            "google_map_link": "https://maps.app.goo.gl/Zep7T5fuZoPrdwix9",
            "accomodation_type": "bhakta_niwas",
            "contact_no": "୮୯୮୪୨୦୯୯୪୪",
            "whatsapp_no": "୮୯୮୪୨୦୯୯୪୪",
            "email": "sjta.purushottambhaktaniwas@gmail.com",
            "check_in_time": "05:00",
            "check_out_time": "05:00",
            "description": "ଜଗନ୍ନାଥ ମନ୍ଦିରରୁ ଦୁରତା ୨ କିମି , ସମୁଦ୍ର କୂଳରୁ ଦୁରତା ୩ କିମି",
            "food_type": null,
            "opening_time": null,
            "closing_time": null,
            "landmark": "ହସ୍ପିଟାଲ ଛକ ପାଖ",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ପୁରୁଣା ଜେଲ ରୋଡ଼, କୁମ୍ଭାରପଡା",
            "district": "ପୁରୀ",
            "state": "ଓଡିଶା",
            "country": "ଭାରତ",
            "status": "active",
            "created_at": "2025-04-27T02:00:11.000000Z",
            "updated_at": "2025-04-28T00:56:50.000000Z",
            "images": [
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivascoverphoto.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivas4.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivas3.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivas2.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivas1.jpeg')
            ]
        },
        {
            "id": 9,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "name": "ନୀଳାଦ୍ରୀ ଭକ୍ତ ନିବାସ",
            "google_map_link": "https://maps.app.goo.gl/hf2qcJxtF8tX1YoJ6",
            "accomodation_type": "bhakta_niwas",
            "contact_no": "୭୮୯୪୪୧୪୧୩୧",
            "whatsapp_no": "୭୮୯୪୪୧୪୧୩୧",
            "email": "sjta.neeladribhaktaniwas@gmail.com",
            "check_in_time": "05:00",
            "check_out_time": "05:00",
            "description": "ଜଗନ୍ନାଥ ମନ୍ଦିରରୁ ଦୁରତା ୧ କିମି, ସମୁଦ୍ର କୂଳରୁ  ଦୁରତା ୩ କିମି",
            "food_type": null,
            "opening_time": null,
            "closing_time": null,
            "landmark": "ପୋଲିସ ଷ୍ଟେସନ୍ ପାଖ",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ଗ୍ରାଣ୍ଡ ରୋଡ଼, ପୁରୀ , ଓଡ଼ିଶା ,",
            "district": "ପୁରୀ",
            "state": "ଓଡିଶା",
            "country": "ଭାରତ",
            "status": "active",
            "created_at": "2025-04-27T02:05:39.000000Z",
            "updated_at": "2025-04-28T00:56:54.000000Z",
            "images": [
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivascoverphoto.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivas1.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivas2.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivas3.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivas4.jpeg')
            ]
        },
        {
            "id": 10,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "name": "ନୀଳାଚଳ ଭକ୍ତ ନିବାସ",
            "google_map_link": "https://maps.app.goo.gl/zD1xXnjuiiGeb9Ne9",
            "accomodation_type": "bhakta_niwas",
            "contact_no": "୯୯୩୮୨୦୬୬୩୩",
            "whatsapp_no": "୯୯୩୮୨୦୬୬୩୩",
            "email": "sjta.nilachalbhaktaniwas@gmail.com",
            "check_in_time": "05:00",
            "check_out_time": "05:00",
            "description": "ଜଗନ୍ନାଥ ମନ୍ଦିରରୁ ଦୁରତା ୧ କିମି, ସମୁଦ୍ର କୂଳରୁ ଦୁରତା ୩ କିମି",
            "food_type": null,
            "opening_time": null,
            "closing_time": null,
            "landmark": "ଟାଉନ ଥାନା ବିପରୀତ",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ଗ୍ରାଣ୍ଡ ରୋଡ଼, ପୁରୀ , ଓଡ଼ିଶା",
            "district": "ପୁରୀ",
            "state": "ଓଡିଶା",
            "country": "ଭାରତ",
            "status": "active",
            "created_at": "2025-04-27T02:08:36.000000Z",
            "updated_at": "2025-04-28T00:56:58.000000Z",
            "images": [
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivas3.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivascoverphoto.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivas2.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivas1.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivas4.jpeg')
            ]
        },
        {
            "id": 11,
            "language": "Odia",
            "temple_id": "TEMPLE25402",
            "name": "ଶ୍ରୀଗୁଣ୍ଡିଚା ଭକ୍ତ ନିବାସ",
            "google_map_link": "https://maps.app.goo.gl/7qJvpz1LZNT7FJjT6",
            "accomodation_type": "bhakta_niwas",
            "contact_no": "୮୦୯୩୮୭୩୭୨୨",
            "whatsapp_no": "୮୦୯୩୮୭୩୭୨୨",
            "email": "sjta.shreegundichabhaktaniwas@gmail.com",
            "check_in_time": "05:00",
            "check_out_time": "05:00",
            "description": "ଜଗନ୍ନାଥ ମନ୍ଦିରରୁ ଦୁରତା ୩ କିମି, ସମୁଦ୍ର କୂଳରୁ ଦୁରତା ୩ କିମି",
            "food_type": null,
            "opening_time": null,
            "closing_time": null,
            "landmark": "ଶ୍ରୀଗୁଣ୍ଡିଚା ମନ୍ଦିର ପାଖ",
            "pincode": "୭୫୨୦୦୧",
            "city_village": "ପୁରୀ ,ଓଡ଼ିଶା",
            "district": "ପୁରୀ",
            "state": "ଓଡିଶା",
            "country": "ଭାରତ",
            "status": "active",
            "created_at": "2025-04-27T07:42:39.000000Z",
            "updated_at": "2025-04-28T00:57:02.000000Z",
            "images": [
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivas2.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivascover.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivas1.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivas3.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivas4.jpeg')
            ]
        }
    ];

    const english_data = [
        {
            "id": 1,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "name": "SHREE PURUSOTTAM BHAKTA NIVAS",
            "google_map_link": "https://maps.app.goo.gl/XSwfssQ2avKQX41CA",
            "accomodation_type": "bhakta_niwas",
            "contact_no": "8984209944",
            "whatsapp_no": "8984209944",
            "email": "sjta.purushottambhaktaniwas@gmail.com",
            "check_in_time": null,
            "check_out_time": null,
            "description": "2 KM from Jagannatha Temple, 3 KM from Sea Beach",
            "food_type": null,
            "opening_time": null,
            "closing_time": null,
            "landmark": "Near Hospital Chhaka",
            "pincode": "752001",
            "city_village": null,
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-01T03:34:34.000000Z",
            "updated_at": "2025-06-03T07:43:20.000000Z",
            "images": [
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivascoverphoto.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivas4.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivas3.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivas2.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreePurusottamBhaktaNivas/Shreepurusottambhaktanivas1.jpeg')
            ]
        },
        {
            "id": 5,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "name": "NEELADRI BHAKTA NIVAS",
            "google_map_link": "https://maps.app.goo.gl/qaVZghmf9eNwJDAQA",
            "accomodation_type": "bhakta_niwas",
            "contact_no": "7894414131",
            "whatsapp_no": "7894414131",
            "email": "sjta.neeladribhaktaniwas@gmail.com",
            "check_in_time": "05:00",
            "check_out_time": "04:59",
            "description": "1KM from Puri Temple, 3KM from Sea Beach",
            "food_type": null,
            "opening_time": null,
            "closing_time": null,
            "landmark": "Near Town Police Station",
            "pincode": "752001",
            "city_village": "Near Town Police Station",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-18T01:20:50.000000Z",
            "updated_at": "2025-05-19T05:45:38.000000Z",
            "images": [
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivascoverphoto.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivas1.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivas2.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivas3.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NeeladriBhaktaNivas/neeladribhaktanivas4.jpeg')
            ]
        },
        {
            "id": 6,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "name": "NILACHAL BHAKTA & YATRI NIVAS",
            "google_map_link": "https://maps.app.goo.gl/LZceNcMTJMMaqMuNA",
            "accomodation_type": "bhakta_niwas",
            "contact_no": "9938206633",
            "whatsapp_no": "9938206633",
            "email": "sjta.nilachalbhaktaniwas@gmail.com",
            "check_in_time": "05:00",
            "check_out_time": "04:59",
            "description": "1KM from Puri Temple, 3KM from Sea Beach",
            "food_type": null,
            "opening_time": null,
            "closing_time": null,
            "landmark": "Infront of Town Police Station",
            "pincode": "752001",
            "city_village": "Near Town Police Station, Puri, Odisha",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-18T01:30:10.000000Z",
            "updated_at": "2025-05-19T05:45:48.000000Z",
            "images": [
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivas3.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivascoverphoto.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivas2.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivas1.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/NilachalYatriNivas/Nilachalbhakta&yatrinivas4.jpeg')
            ]
        },
        {
            "id": 7,
            "language": "English",
            "temple_id": "TEMPLE25402",
            "name": "SHREE GUNDICHA BHAKTA NIVAS",
            "google_map_link": "https://maps.app.goo.gl/EE3KqFJcmozMVics6",
            "accomodation_type": "bhakta_niwas",
            "contact_no": "8093873722",
            "whatsapp_no": "8093873722",
            "email": "sjta.shreegundichabhaktaniwas@gmail.com",
            "check_in_time": "05:00",
            "check_out_time": "04:59",
            "description": "3KM from Puri Temple, 3KM from Sea Beach",
            "food_type": null,
            "opening_time": null,
            "closing_time": null,
            "landmark": "Near Shree Gundicha Temple",
            "pincode": "752001",
            "city_village": "Grand Road, Puri",
            "district": "Puri",
            "state": "Odisha",
            "country": "India",
            "status": "active",
            "created_at": "2025-04-18T01:39:33.000000Z",
            "updated_at": "2025-04-28T00:53:59.000000Z",
            "images": [
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivas2.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivascover.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivas1.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivas3.jpeg'),
                require('../../assets/offlineData/bhaktaNibash/ShreeGundichaBhaktaNivas/shreegundichabhaktanivas4.jpeg')
            ]
        }
    ];

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [allBhaktaNibas, setAllBhaaktaNibas] = useState([]);

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                // getAllBhaktaNibas(value);
                if (value === 'Odia') {
                    setAllBhaaktaNibas(odia_data);
                } else if (value === 'English') {
                    setAllBhaaktaNibas(english_data);
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
            // getAllBhaktaNibas(selectedLanguage);
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

    const linkPhone = (number) => {
        const phoneNumber = `tel:${number}`;
        Linking.openURL(phoneNumber).catch(err => console.warn("Failed to open dialer:", err));
    };

    const [selectedImages, setSelectedImages] = useState({});

    const handleImageSelect = (nibasId, imageUri) => {
        setSelectedImages(prev => ({
            ...prev,
            [nibasId]: imageUri
        }));
    };

    const getAllBhaktaNibas = async (language) => {
        try {
            setSpinner(true);
            const response = await fetch(`${base_url}api/get-accomodation/${language}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === true) {
                const bhaktaNiwasOnly = responseData.data.filter(item => item.accomodation_type === 'bhakta_niwas');
                // const filteredData = bhaktaNiwasOnly.filter(item => item.language === selectedLanguage);
                setAllBhaaktaNibas(bhaktaNiwasOnly);
                // console.log("Bhakta Nibas Data: ", bhaktaNiwasOnly);

                const initialImageSelection = {};
                bhaktaNiwasOnly.forEach(item => {
                    if (item.images && item.images.length > 0) {
                        initialImageSelection[item.id] = item.images[0];
                    }
                });
                setSelectedImages(initialImageSelection);
            }
            setSpinner(false);
        } catch (error) {
            console.log('Error fetching Bhakta Nibas:', error);
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            // getAllBhaktaNibas(selectedLanguage);
            const initialImageSelection = {};
            allBhaktaNibas.forEach(item => {
                if (item.images && item.images.length > 0) {
                    initialImageSelection[item.id] = item.images[0];
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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଭକ୍ତ ନିବାସ' : 'Bhakta Nivas'}</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ତୀର୍ଥଯାତ୍ରୀମାନଙ୍କ ପାଇଁ ମନ୍ଦିର ପାଖରେ ରହିବା ସ୍ଥାନ' : 'Temple Owned Stay For Pilgrims'}</Text>
                            {/* <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>All The Properties Below Are Owned By Shree Jagannatha Temple Administration</Text> */}
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Now →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/bhaktanibash54.png')} style={{ width: 75, height: 75, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                {/* Nibas List */}
                {spinner === true ?
                    <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={allBhaktaNibas}
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15, marginTop: 10 }}
                        keyExtractor={(key) => {
                            return key.id
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    {/* Property Name */}
                                    <Text style={styles.propertyName}>{item.name}</Text>

                                    {/* Main Large Image */}
                                    <View>
                                        {selectedImages[item.id] ? (
                                            // <Image source={{ uri: selectedImages[item.id] }} style={styles.mainImage} />
                                            <Image source={selectedImages[item.id]} style={styles.mainImage} />
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
                                        data={item.images}
                                        keyExtractor={(uri, index) => index.toString()}
                                        contentContainerStyle={{ marginBottom: 8, marginTop: 4 }}
                                        renderItem={({ item: thumb }) => (
                                            <TouchableOpacity onPress={() => handleImageSelect(item.id, thumb)}>
                                                <Image
                                                    // source={{ uri: thumb }}
                                                    source={thumb}
                                                    style={[
                                                        styles.thumbnail,
                                                        selectedImages[item.id] === thumb && styles.selectedThumbnail
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    />

                                    {/* Distance Row */}
                                    <View style={styles.distanceRow}>
                                        <MaterialIcons name="location-on" size={16} color="#FFA726" />
                                        <Text style={styles.distanceText}>{item.description}</Text>
                                    </View>

                                    {/* Offers & Address */}
                                    <View style={styles.infoRow}>
                                        <View style={styles.infoColumn}>
                                            <Text style={styles.label}>{selectedLanguage === 'Odia' ? "ଉପଲବ୍ଧ ସୁବିଧା" : "Property Offers"}:</Text>
                                            {selectedLanguage === 'Odia' ?
                                                <Text style={styles.value}>ଜଳଖିଆ/ମଧ୍ୟାହ୍ନ ଭୋଜନ/ରାତ୍ରୀଭୋଜନ{"\n"}ଏସି ରୁମ</Text>
                                                :
                                                <Text style={styles.value}>Breakfast/Lunch/Dinner{"\n"}AC Rooms</Text>
                                            }
                                        </View>
                                        <View style={styles.infoColumn}>
                                            <Text style={styles.label}>{selectedLanguage === 'Odia' ? "ଠିକଣା" : "Address"}:</Text>
                                            <Text style={styles.value}>{item.landmark}{"\n"}{item.district}, {item.state}, {item.pincode}</Text>
                                        </View>
                                    </View>

                                    {/* Buttons */}
                                    <View style={styles.buttonRow}>
                                        <LinearGradient
                                            colors={['#FFA726', '#F06292']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.bookNowButton}
                                        >
                                            <TouchableOpacity onPress={() => openMap(item.google_map_link)}>
                                                <Text style={styles.bookNowText}>Direction</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                        <TouchableOpacity style={styles.callButton} onPress={() => linkPhone(item.contact_no)}>
                                            <Text style={styles.callText}>📞 {item.contact_no}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {index !== allBhaktaNibas.length - 1 && <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginVertical: 20 }} />}
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
        width: 62,
        height: 60,
        borderRadius: 4,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    selectedThumbnail: {
        borderColor: '#FFA726',
        borderWidth: 2
    },
    distanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    distanceText: {
        fontSize: 13,
        color: '#FFA726',
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    bookNowButton: {
        backgroundColor: '#7e22ce',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20
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
